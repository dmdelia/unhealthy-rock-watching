#!/usr/bin/env python3
"""ASTREA SSP: local 90-day retention for closed Discord ticket TXT transcripts.

Standalone reference tool for a PRIVATE home server. It is not part of the
website runtime or deployed bot. Requires Python 3.11+; no external packages.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
from datetime import datetime, timedelta, timezone
from pathlib import Path

RETENTION = timedelta(days=90)
VALID_ID = re.compile(r"^[A-Za-z0-9_-]{1,72}$")
HOLD_BASES = ("specific_evidence", "concrete_dispute", "statutory_obligation")


class RetentionError(Exception):
    pass


def instant(text: str) -> datetime:
    try:
        parsed = datetime.fromisoformat(text.replace("Z", "+00:00"))
    except ValueError as exc:
        raise RetentionError("Expected ISO 8601 timestamp with timezone") from exc
    if parsed.tzinfo is None or parsed.utcoffset() is None:
        raise RetentionError("Timestamp requires explicit timezone")
    return parsed.astimezone(timezone.utc)


def now_utc() -> datetime:
    return datetime.now(timezone.utc)


def root_dir(root: str | Path) -> Path:
    path = Path(root).expanduser().resolve(strict=True)
    if not path.is_dir():
        raise RetentionError("Root must be an existing directory")
    return path


def record_file(root: Path, ticket: str) -> Path:
    if not VALID_ID.fullmatch(ticket):
        raise RetentionError("Invalid ticket ID")
    return root / ".retention" / (ticket + ".json")


def transcript_file(root: Path, relative: str) -> Path:
    file = root / relative
    if file.is_symlink():
        raise RetentionError("Symlink transcripts are not allowed")
    try:
        path = file.resolve(strict=True)
        path.relative_to(root)
    except (ValueError, OSError) as exc:
        raise RetentionError("Transcript must exist inside the ticket root") from exc
    if not path.is_file() or path.suffix.lower() != ".txt":
        raise RetentionError("Transcript must be an existing TXT file")
    return path


def digest(file: Path) -> str:
    value = hashlib.sha256()
    with file.open("rb") as stream:
        for chunk in iter(lambda: stream.read(65536), b""):
            value.update(chunk)
    return value.hexdigest()


def write_record(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True, mode=0o700)
    tmp = path.with_suffix(".json.tmp")
    with tmp.open("x", encoding="utf-8") as out:
        json.dump(data, out, ensure_ascii=False, indent=2)
        out.write("\n")
    os.chmod(tmp, 0o600)
    os.replace(tmp, path)


def load_record(path: Path) -> dict:
    if path.is_symlink() or not path.is_file():
        raise RetentionError("Metadata missing or invalid")
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict) or data.get("ticket") != path.stem:
        raise RetentionError("Metadata mismatch")
    return data


def register(root: str | Path, ticket: str, relative_file: str,
             closed_at: datetime | None = None) -> Path:
    base = root_dir(root)
    transcript = transcript_file(base, relative_file)
    record = record_file(base, ticket)
    if record.exists():
        raise RetentionError("Ticket already registered")
    closed = closed_at or now_utc()
    if closed.tzinfo is None:
        raise RetentionError("Closure time must include timezone")
    write_record(record, {
        "ticket": ticket,
        "file": transcript.relative_to(base).as_posix(),
        "closed_at": closed.astimezone(timezone.utc).isoformat(),
        "sha256": digest(transcript),
        "hold": None,
    })
    return record


def update_hold(root: str | Path, ticket: str, *, reason: str | None = None,
                basis: str | None = None, until: datetime | None = None,
                now: datetime | None = None) -> None:
    path = record_file(root_dir(root), ticket)
    data = load_record(path)
    if reason is None:
        data["hold"] = None
    else:
        current = now or now_utc()
        if basis not in HOLD_BASES or len(reason.strip()) < 20:
            raise RetentionError("Specific documented reason and permitted basis required")
        if until is None or until.tzinfo is None or until <= current:
            raise RetentionError("Hold requires a future, finite reviewable expiry")
        data["hold"] = {
            "basis": basis,
            "reason": reason.strip(),
            "until": until.astimezone(timezone.utc).isoformat(),
            "review_at": min(current + RETENTION, until).astimezone(timezone.utc).isoformat(),
        }
    write_record(path, data)


def sweep(root: str | Path, *, apply: bool = False,
          at: datetime | None = None) -> tuple[list[str], list[str]]:
    """Dry run unless --apply. Never infer closure from TXT modification time."""
    base = root_dir(root)
    current = at or now_utc()
    actions: list[str] = []
    errors: list[str] = []
    folder = base / ".retention"
    if not folder.is_dir():
        return actions, errors
    for path in sorted(folder.glob("*.json")):
        try:
            data = load_record(path)
            if current < instant(data["closed_at"]) + RETENTION:
                continue
            held = data.get("hold")
            if held and instant(held["until"]) > current:
                actions.append("HOLD " + data["ticket"])
                continue
            target = transcript_file(base, data["file"])
            if digest(target) != data["sha256"]:
                raise RetentionError("TXT changed since registration: investigate before deletion")
            if apply:
                target.unlink()
                path.unlink()
                actions.append("DELETED " + data["ticket"])
            else:
                actions.append("WOULD DELETE " + data["ticket"])
        except (RetentionError, OSError, ValueError, KeyError, TypeError) as exc:
            errors.append(path.name + ": " + str(exc))
    return actions, errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest="command", required=True)
    for name in ("register", "sweep", "hold", "release"):
        cmd = commands.add_parser(name)
        cmd.add_argument("--root", required=True)
        if name in ("register", "hold", "release"):
            cmd.add_argument("--ticket", required=True)
        if name == "register":
            cmd.add_argument("--file", required=True)
            cmd.add_argument("--closed-at", help="UTC/offset-aware ISO 8601 date")
        if name == "sweep":
            cmd.add_argument("--apply", action="store_true")
        if name == "hold":
            cmd.add_argument("--reason", required=True)
            cmd.add_argument("--basis", required=True, choices=HOLD_BASES)
            cmd.add_argument("--until", required=True)
    args = parser.parse_args()
    try:
        if args.command == "register":
            register(args.root, args.ticket, args.file,
                     instant(args.closed_at) if args.closed_at else None)
        elif args.command == "hold":
            update_hold(args.root, args.ticket, reason=args.reason,
                        basis=args.basis, until=instant(args.until))
        elif args.command == "release":
            update_hold(args.root, args.ticket)
        else:
            actions, errors = sweep(args.root, apply=args.apply)
            for message in actions:
                print(message)
            for message in errors:
                print("ERROR:", message)
            if errors:
                return 2
            if not args.apply:
                print("DRY RUN; add --apply to delete eligible transcripts.")
    except (RetentionError, OSError) as exc:
        parser.error(str(exc))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
