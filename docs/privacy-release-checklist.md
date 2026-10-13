# ASTREA SSP privacy and release checklist (draft)

**Do not merge this PR as a legally complete deployment until the outstanding obligations below are resolved.** No residence address may be committed without an explicit decision. A placeholder does not satisfy a mandatory imprint obligation.

## Confirmed
- Website operator: individual, name included in working draft; legally valid service address not yet available.
- Contact: contact@astreassp.de (IONOS mail).
- Hosting: GitHub Pages behind Cloudflare; Cloudflare Web Analytics/RUM and Bot Fight Mode enabled; no configured Cloudflare Rules.
- No known further analytics; live checks still required.
- Patreon member and tier details checked through Patreon dashboard.
- Custom Discord ticket bot creates private text channels with ticket owner and authorized moderators/handlers.
- Bot runs on a home server and archives closed tickets as plain text (.txt).
- Standard full transcript retention: 90 days after closure, with narrower legal/claim exceptions; this is a policy, not yet verified as deployed.
- Public supporter name/handle is user-supplied and requires a separate explicit authorization through the ticket system.
- No bank/card details are requested in Discord tickets. Discord text channels are not end-to-end encrypted; ordinary IONOS mail is not E2E either.

## Blocking legal and configuration items
- [ ] Valid service address for public legal notice; verify imprint applicability and minority-related business requirements with qualified advice.
- [ ] Review legally required contracting/cancellation/withdrawal information and actual Patreon tier benefits.
- [ ] Confirm Cloudflare RUM EU/EEA capture configuration and actual cookie/security challenge behavior.
- [ ] Live network and storage inspection for BOTH domains, including GitHub, Cloudflare, YouTube activation.
- [ ] Verify GitHub, Cloudflare and IONOS agreements, recipient roles, transfers and retention information.
- [ ] Confirm actual E2E encrypted contact procedure before promising it.
- [ ] Verify Patreon member-data flows and tier consent fulfillment in Discord.
- [ ] Legal review of bilingual policy against actual deployed behavior; remove noindex only when approved if desired.

## Technical work completed in these branches
- [x] Bilingual draft privacy policy and intentionally incomplete imprint page linked from the site.
- [x] Both language controls and language-specific supporter copy.
- [x] A professional academic/technical contact section on /about, without suggesting an existing university partnership.
- [x] Accessibility skip links, keyboard Escape navigation, focus styling, reduced-motion behavior.
- [x] Real Chromium browser QA (desktop, mobile, two locales) and static checks in GitHub Actions.
- [x] Safe retention utility and unit tests in tools/ticket-retention/. **Not deployed on the home server.**
- [x] Server-side thumbnail caching added to WATCH sync pipeline; video/live player gates applied client-side.
- [x] Local Patreon text branding instead of external Patreon image.

## Ticket bot requirements (separate codebase, not in these websites)
- [x] Reference implementation stores explicit ticket closure time in tools/ticket-retention/ticket_retention.py. **Bot integration remains open.**
- [x] Reference primary-TXT expiration sweep with dry-run and tests. [ ] Deploy on home server and rotate all backups/replicas.
- [ ] Store only minimum redemption record (Discord ID, benefit ID, redemption date/status) and explicit opt-in (name, permitted channels, timestamp, version of consent).
- [ ] Access controls for TXT files, encrypted disks/backups, regular server updates and documented backup rotation.
- [ ] Exception holds must be tied to concrete claims/legal obligations, reviewed and lifted when no longer applicable.
- [ ] Document deletion request handling, rights request workflow and audit trail without storing full chats indefinitely.

## Web acceptance tests (automated where noted, live deployment checks still needed)
- [x] Automated WATCH browser checks enforce no YouTube request before activation. [ ] Repeat on live Cloudflare-served site.
- [x] Browser-tested: live iframe has no src before user activation.
- [x] Browser-tested: video playback requires intentional activation and informs about external processing.
- [x] Browser-tested: Escape close and focus restoration. [ ] Complete manual screen reader assessment.
- [x] Chromium checks cover language selection, browser fallback, reduced-motion and 320/375/768/1024/1366/1920px layout.
- [x] Automated checks cover legal links and image alt attributes. [ ] Human visual/contrast review remains.
- [ ] Test robots/sitemap/canonical/noindex, error/404 routes and YouTube synchronization.
