from __future__ import annotations

"""Dependency-free static checks for ASTREA pages. Run: python scripts/check_site.py"""
from html.parser import HTMLParser
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
PAGES = [
    "index.html", "about.html", "projects.html", "projects/icarus.html",
    "projects/joanus.html", "n/karton-test.html", "404.html",
    "support/index.html", "support/hardware.html", "support/member.html",
    "privacy.html", "impressum.html",
]


class MediaAudit(HTMLParser):
    def __init__(self):
        super().__init__()
        self.errors: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        props = dict(attrs)
        if tag == "img":
            if "alt" not in props:
                self.errors.append("image missing alt attribute")
            if (props.get("src") or "").startswith("https://c14.patreon.com"):
                self.errors.append("externally loaded Patreon branding")


def main() -> int:
    errors = []
    for name in PAGES:
        path = ROOT / name
        if not path.is_file():
            errors.append(f"{name}: missing file")
            continue
        html = path.read_text(encoding="utf-8")
        parser = MediaAudit()
        parser.feed(html)
        errors.extend(f"{name}: {e}" for e in parser.errors)
        if name not in {"impressum.html", "privacy.html"}:
            if 'href="/privacy"' not in html:
                errors.append(f"{name}: missing privacy link")
            if 'href="/impressum"' not in html:
                errors.append(f"{name}: missing legal notice link")
    js = (ROOT / "assets/site.js").read_text(encoding="utf-8")
    if "astrea-language" not in js:
        errors.append("manual language preference missing")
    policy = (ROOT / "privacy.html").read_text(encoding="utf-8")
    if "90 Tage" not in policy or "90 days" not in policy:
        errors.append("bilingual ticket retention policy missing")
    if "ladungsfähige Anschrift" not in policy:
        errors.append("address blocker not marked")
    if errors:
        print("\n".join("FAIL: " + e for e in errors), file=sys.stderr)
        return 1
    print(f"PASS: {len(PAGES)} pages, alt text, legal navigation and privacy placeholders")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
