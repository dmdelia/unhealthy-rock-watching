import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const ORIGIN = 'http://127.0.0.1:8765';
const paths = [
  '/index.html', '/about.html', '/projects.html',
  '/projects/icarus.html', '/projects/joanus.html',
  '/n/karton-test.html', '/404.html',
  '/support/index.html', '/support/hardware.html', '/support/member.html',
  '/privacy.html', '/impressum.html'
];

const browser = await chromium.launch({ headless: true });
let checks = 0;
try {
  for (const locale of ['de-DE', 'en-US']) {
    for (const width of [320, 375, 768, 1024, 1366, 1920]) {
      const context = await browser.newContext({
        locale,
        viewport: { width, height: 900 },
        reducedMotion: 'reduce'
      });
      const page = await context.newPage();
      const exceptions = [];
      page.on('pageerror', error => exceptions.push(error.message));
      for (const path of paths) {
        const response = await page.goto(ORIGIN + path, { waitUntil: 'domcontentloaded' });
        assert(response?.ok(), `${locale} ${width} ${path} should return HTTP 200`);
        await page.locator('main').waitFor();
        assert.equal(await page.locator('img:not([alt])').count(), 0, `${path}: image without alt`);
        assert.equal(await page.locator('a[href="/privacy"]').count() > 0, true, `${path}: privacy link missing`);
        if (!['/privacy.html', '/impressum.html'].includes(path)) {
          assert.equal(await page.locator('a[href="/impressum"]').count() > 0, true, `${path}: legal link missing`);
        }
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        if (overflow > 2) {
          const culprits = await page.evaluate(() => [...document.querySelectorAll('body *')]
            .filter(el => { const r=el.getBoundingClientRect(); return r.right > innerWidth + 2 && getComputedStyle(el).position !== 'fixed'; })
            .slice(0, 12).map(el => el.tagName.toLowerCase() + '.' + String(el.className).slice(0, 60) + ' "' + el.textContent.trim().slice(0, 30) + '"'));
          assert.fail(`${locale} ${width} ${path}: horizontal overflow ${overflow}px; offenders: ${culprits.join(' / ')}`);
        }
        checks += 1;
      }
      assert.deepEqual(exceptions, [], `${locale} ${width}: JavaScript errors`);
      await context.close();
    }
  }
  const context = await browser.newContext({ locale: 'de-DE', viewport: { width: 1200, height: 800 } });
  const page = await context.newPage();
  await page.goto(ORIGIN + '/index.html');
  assert.equal(await page.locator('html').getAttribute('lang'), 'de');
  await page.getByRole('button', { name: 'English' }).click();
  await page.waitForFunction(() => document.documentElement.lang === 'en');
  assert.match(await page.locator('main h1').first().innerText(), /Spaceflight/i);
  await page.goto(ORIGIN + '/support/index.html');
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  assert.match(await page.locator('[data-support="title"]').first().innerText(), /Support ASTREA/i);
  await page.goto(ORIGIN + '/about.html');
  assert.match(await page.locator('[data-i18n="contact_title"]').innerText(), /Technical exchange/);
  assert.match(await page.locator('.as-contact-email').getAttribute('href'), /^mailto:contact@astreassp[.]de/);
  mkdirSync('qa-screenshots', {recursive:true});
  await page.goto(ORIGIN + '/index.html');
  await page.screenshot({ path:'qa-screenshots/astrea-home-english-desktop.png', fullPage:true });
  await page.goto(ORIGIN + '/about.html');
  await page.screenshot({ path:'qa-screenshots/astrea-about-english-desktop.png', fullPage:true });
  await page.goto(ORIGIN + '/privacy.html');
  assert.match(await page.locator('.as-en h1').innerText(), /Privacy Policy/);
  assert.equal(await page.locator('.as-de').isVisible(), false);
  await page.goto(ORIGIN + '/404.html');
  assert.match(await page.locator('[data-404="title"]').innerText(), /Hello stranger/);
  await context.close();
  const mobile = await browser.newContext({locale:'de-DE',viewport:{width:375,height:850},reducedMotion:'reduce'});
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(ORIGIN + '/index.html');
  await mobilePage.screenshot({path:'qa-screenshots/astrea-home-german-mobile.png',fullPage:true});
  await mobilePage.goto(ORIGIN + '/about.html');
  await mobilePage.screenshot({path:'qa-screenshots/astrea-about-german-mobile.png',fullPage:true});
  await mobile.close();
  console.log(`PASS: ${checks} desktop/mobile page renders + manual language / support / legal / 404 translations`);
} finally {
  await browser.close();
}
