# ASTREA SSP: Discord ticket TXT retention

This is a **standalone reference utility**, not the Discord bot itself. It is designed for the private home server. Nothing is uploaded to the website and no real transcripts are checked into GitHub.

## Policy
- Closed Discord ticket conversations are stored as private \`.txt\` files.
- Full conversations: **90 days after ticket closure**, measured from explicit closure timestamp, not filesystem modification time.
- Concrete legal/statutory exceptions require a written reason, specific basis and **finite expiry**.
- This utility defaults to a dry run and deletes **only files registered by the bot**.
- Minimal redemption records and proof of consent are **separate records**, outside of full transcripts, and need a tailored retention policy.
- The utility covers the primary TXT files **only**. Encryption, OS permissions, backups and backup expiry must be implemented on the actual server.

## Commands

Install this Python file on the private server (Python 3.11+, no additional packages). Example paths and IDs below are placeholders, not real user data:

\`\`\`bash
# Immediately after the bot closes a ticket and finishes writing the .txt:
python3 ticket_retention.py register --root /srv/astrea/tickets --ticket 123456789 --file ticket-123456789.txt --closed-at 2026-10-13T10:00:00+02:00

# First inspect the pending actions without any deletion:
python3 ticket_retention.py sweep --root /srv/astrea/tickets

# When bot integration and tests are complete, the scheduled actual cleanup:
python3 ticket_retention.py sweep --root /srv/astrea/tickets --apply

# Concrete documented dispute only, with expiry:
python3 ticket_retention.py hold --root /srv/astrea/tickets --ticket 123456789 --basis concrete_dispute --reason "Contested redemption reference in a specific documented incident" --until 2027-01-01T12:00:00+01:00

# Remove the hold once it is no longer necessary:
python3 ticket_retention.py release --root /srv/astrea/tickets --ticket 123456789
\`\`\`

Daily cron example **for the home server**, not GitHub Pages:

\`\`\`cron
0 3 * * * /usr/bin/python3 /opt/astrea/ticket_retention.py sweep --root /srv/astrea/tickets --apply
\`\`\`

## Operational requirements before using --apply
- [ ] Locate the real Discord bot code and integrate \`register\` after TXT output finishes; ensure accurate ticket IDs and closure timestamps.
- [ ] Verify the TXT root directory, rights (service account only), encryption and server updates.
- [ ] Test closure and dry-run with real bot **test tickets**, including an expired test TXT.
- [ ] Set up daily scheduled cleanup, error alerting, access logs and exception review.
- [ ] Establish backup lifetimes and expiry with the backup mechanism. Backup copies are not affected by this script.
- [ ] Establish separately scoped minimal evidence for redeemed benefits and voluntary public-name consent.
- [ ] Implement security incident response and GDPR access, correction, deletion and consent withdrawal processes.
- [ ] Never use an open-ended hold or a hold for merely hypothetical future disputes.
- [ ] Review actual legal requirements and deployed policy before claiming compliance.

## Tests
\`\`\`bash
python3 -m unittest discover -s tools/ticket-retention/tests -v
\`\`\`
