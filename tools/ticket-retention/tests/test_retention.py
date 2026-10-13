from __future__ import annotations

import sys
import tempfile
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from ticket_retention import RetentionError, register, sweep, update_hold


class TicketRetentionTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        (self.root / "ticket-123.txt").write_text("fictitious test conversation")
        (self.root / "unregistered.txt").write_text("leave me alone")
        self.closed = datetime(2026, 1, 1, tzinfo=timezone.utc)
        self.metadata = register(self.root, "123", "ticket-123.txt", self.closed)

    def test_expiry_and_default_dry_run(self):
        self.assertEqual(sweep(self.root, at=self.closed + timedelta(days=89)), ([], []))
        a, e = sweep(self.root, at=self.closed + timedelta(days=91))
        self.assertEqual((a, e), (["WOULD DELETE 123"], []))
        self.assertTrue(self.metadata.exists())
        self.assertTrue((self.root / "ticket-123.txt").exists())

    def test_apply_deletes_only_registered_transcript(self):
        a, e = sweep(self.root, at=self.closed + timedelta(days=91), apply=True)
        self.assertEqual((a, e), (["DELETED 123"], []))
        self.assertFalse(self.metadata.exists())
        self.assertFalse((self.root / "ticket-123.txt").exists())
        self.assertTrue((self.root / "unregistered.txt").exists())

    def test_concrete_hold_and_release(self):
        start = self.closed + timedelta(days=91)
        update_hold(self.root, "123", reason="Specific ongoing contested benefit redemption",
                    basis="concrete_dispute", until=start + timedelta(days=30), now=start)
        self.assertEqual(sweep(self.root, at=start, apply=True), (["HOLD 123"], []))
        self.assertTrue((self.root / "ticket-123.txt").exists())
        update_hold(self.root, "123")
        self.assertEqual(sweep(self.root, at=start, apply=True), (["DELETED 123"], []))

    def test_hold_expires_without_indefinite_retention(self):
        current = self.closed + timedelta(days=91)
        update_hold(self.root, "123", reason="Specific documented evidence for single dispute",
                    basis="specific_evidence", until=current + timedelta(days=2), now=current)
        self.assertEqual(sweep(self.root, at=current + timedelta(days=3), apply=True),
                         (["DELETED 123"], []))

    def test_tampered_file_requires_manual_review(self):
        (self.root / "ticket-123.txt").write_text("new content")
        actions, errors = sweep(self.root, at=self.closed + timedelta(days=91), apply=True)
        self.assertEqual(actions, [])
        self.assertIn("changed", errors[0])
        self.assertTrue((self.root / "ticket-123.txt").exists())

    def test_reject_duplicate_and_escaping_path(self):
        with self.assertRaises(RetentionError):
            register(self.root, "123", "ticket-123.txt", self.closed)
        with self.assertRaises(RetentionError):
            register(self.root, "456", "../../etc/passwd", self.closed)
        with self.assertRaises(RetentionError):
            register(self.root, "../evil", "ticket-123.txt", self.closed)

    def test_reject_broad_indefinite_hold(self):
        start = self.closed + timedelta(days=91)
        with self.assertRaises(RetentionError):
            update_hold(self.root, "123", reason="just in case", basis="specific_evidence",
                        until=start + timedelta(days=30), now=start)
        with self.assertRaises(RetentionError):
            update_hold(self.root, "123", reason="Specific but without finite deadline",
                        basis="concrete_dispute", until=start - timedelta(days=1), now=start)


if __name__ == "__main__":
    unittest.main()
