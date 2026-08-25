// Targeted Gate #2 smoke for the frozen PropertyWebBuilder candidate.
// Runs from projtti while resolving @playwright/test from the candidate's node_modules via NODE_PATH.

const { chromium } = require('@playwright/test');

const mode = process.env.PWB_SMOKE_MODE || 'functional';
const functionalBase = process.env.PWB_BASE_URL || 'http://tenant-a.e2e.localhost:3001';
const authBase = process.env.PWB_AUTH_BASE_URL || 'http://tenant-a.e2e.localhost:3002';
const imagePath = process.env.PWB_SMOKE_IMAGE;
const leadEmail = process.env.PWB_SMOKE_LEAD_EMAIL || 'gate2-smoke@example.com';

function pass(name) {
  console.log(`SMOKE3_${name}=PASS`);
}

function fail(name, error) {
  console.error(`SMOKE3_${name}=FAILED_UNCLASSIFIED`);
  console.error(`SMOKE3_REASON=${name}: ${error && error.message ? error.message : error}`);
  process.exitCode = 1;
}

async function assertOk(response, label) {
  if (!response || !response.ok()) {
    throw new Error(`${label} returned ${response ? response.status() : 'no response'}`);
  }
}

async function login(page, baseUrl, email) {
  const response = await page.goto(`${baseUrl}/login`, { waitUntil: 'domcontentloaded' });
  await assertOk(response, 'login page');
  await page.locator('input[type="email"]').first().fill(email);
  await page.locator('input[type="password"]').first().fill('password123');
  await Promise.all([
    page.waitForLoadState('domcontentloaded'),
    page.locator('input[type="submit"], button[type="submit"]').first().click(),
  ]);
}

async function runFunctional() {
  if (!imagePath) throw new Error('PWB_SMOKE_IMAGE is required in functional mode');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const stamp = Date.now();
  const initialReference = `GATE2-${stamp}`;
  const editedReference = `${initialReference}-EDIT`;
  let propertyId;

  try {
    try {
      const health = await page.goto(`${functionalBase}/_test/health`, { waitUntil: 'domcontentloaded' });
      await assertOk(health, 'health endpoint');
      pass('BOOT');
    } catch (e) { fail('BOOT', e); throw e; }

    try {
      const home = await page.goto(`${functionalBase}/`, { waitUntil: 'domcontentloaded' });
      await assertOk(home, 'public home');
      await page.locator('body').waitFor({ state: 'visible' });
      pass('PUBLIC_HOME');
    } catch (e) { fail('PUBLIC_HOME', e); throw e; }

    try {
      const createPage = await page.goto(`${functionalBase}/site_admin/props/new`, { waitUntil: 'domcontentloaded' });
      await assertOk(createPage, 'new property page');
      await page.locator('input[name="pwb_realty_asset[reference]"]').fill(initialReference);
      await page.locator('select[name="pwb_realty_asset[prop_type_key]"]').selectOption('house');
      await page.locator('input[name="pwb_realty_asset[count_bedrooms]"]').fill('3');
      await page.locator('input[name="pwb_realty_asset[count_bathrooms]"]').fill('2');
      await page.locator('input[name="pwb_realty_asset[city]"]').fill('Gate City');
      await page.locator('input[name="pwb_realty_asset[country]"]').fill('Brazil');
      await Promise.all([
        page.waitForLoadState('domcontentloaded'),
        page.locator('input[type="submit"][value="Create Property"]').click(),
      ]);
      const match = page.url().match(/\/site_admin\/props\/(\d+)\/edit\/general/);
      if (!match) throw new Error(`property create did not redirect to edit/general: ${page.url()}`);
      propertyId = match[1];
      pass('PROPERTY_CREATE');
    } catch (e) { fail('PROPERTY_CRUD', e); throw e; }

    try {
      const listingPage = await page.goto(`${functionalBase}/site_admin/props/${propertyId}/sale_listings/new`, { waitUntil: 'domcontentloaded' });
      await assertOk(listingPage, 'new sale listing page');
      const active = page.locator('input[name="sale_listing[active]"]');
      const visible = page.locator('input[name="sale_listing[visible]"]');
      if (!(await active.isChecked())) await active.check();
      if (!(await visible.isChecked())) await visible.check();
      await page.locator('input[name="sale_listing[price_sale_current_cents]"]').fill('250000');
      const title = page.locator('input[name="sale_listing[title_en]"]');
      if (await title.count()) await title.fill(`Gate 2 Sale ${stamp}`);
      await Promise.all([
        page.waitForLoadState('domcontentloaded'),
        page.locator('input[type="submit"][value="Create Sale Listing"]').click(),
      ]);
      if (!page.url().includes(`/site_admin/props/${propertyId}/edit/sale_rental`)) {
        throw new Error(`sale listing create unexpected redirect: ${page.url()}`);
      }

      const editLink = page.locator('a[href*="/sale_listings/"][href$="/edit"]').first();
      if (!(await editLink.count())) throw new Error('sale listing edit link not found');
      const editHref = await editLink.getAttribute('href');
      const editPage = await page.goto(new URL(editHref, functionalBase).toString(), { waitUntil: 'domcontentloaded' });
      await assertOk(editPage, 'sale listing edit page');
      const editTitle = page.locator('input[name="sale_listing[title_en]"]');
      if (await editTitle.count()) await editTitle.fill(`Gate 2 Sale Edited ${stamp}`);
      await page.locator('input[name="sale_listing[price_sale_current_cents]"]').fill('275000');
      await Promise.all([
        page.waitForLoadState('domcontentloaded'),
        page.locator('input[type="submit"]').last().click(),
      ]);
      if (!page.url().includes(`/site_admin/props/${propertyId}/edit/sale_rental`)) {
        throw new Error(`sale listing update unexpected redirect: ${page.url()}`);
      }
      pass('LISTING_CRUD');
    } catch (e) { fail('LISTING_CRUD', e); throw e; }

    try {
      const editProperty = await page.goto(`${functionalBase}/site_admin/props/${propertyId}/edit/general`, { waitUntil: 'domcontentloaded' });
      await assertOk(editProperty, 'property edit page');
      const refInput = page.locator('input[name="pwb_realty_asset[reference]"]');
      await refInput.fill(editedReference);
      await Promise.all([
        page.waitForLoadState('domcontentloaded'),
        page.locator('input[type="submit"][value="Save Changes"]').click(),
      ]);
      const verifyPage = await page.goto(`${functionalBase}/site_admin/props/${propertyId}/edit/general`, { waitUntil: 'domcontentloaded' });
      await assertOk(verifyPage, 'property edit verification page');
      if ((await refInput.inputValue()) !== editedReference) throw new Error('property update did not persist');
      pass('PROPERTY_CRUD');
    } catch (e) { fail('PROPERTY_CRUD', e); throw e; }

    try {
      const photosPage = await page.goto(`${functionalBase}/site_admin/props/${propertyId}/edit/photos`, { waitUntil: 'domcontentloaded' });
      await assertOk(photosPage, 'property photos page');
      const input = page.locator('#photo-upload');
      if (!(await input.count())) throw new Error('photo upload input not found (external image mode may be enabled)');
      await input.setInputFiles(imagePath);
      const submit = page.locator('input[type="submit"][value="Upload Photos"]');
      await Promise.all([
        page.waitForLoadState('domcontentloaded'),
        submit.click(),
      ]);
      const body = await page.locator('body').innerText();
      if (!body.includes('Current Photos')) throw new Error('uploaded photo not visible after upload');
      pass('MEDIA_UPLOAD');
    } catch (e) { fail('MEDIA_UPLOAD', e); throw e; }

    try {
      const contact = await page.goto(`${functionalBase}/contact-us`, { waitUntil: 'domcontentloaded' });
      await assertOk(contact, 'contact page');
      const name = page.locator('input[id="contact_name"], input[name*="name"]').first();
      if (await name.count()) await name.fill('Gate Two Smoke');
      const email = page.locator('input[type="email"], input[name*="email"]').first();
      if (!(await email.count())) throw new Error('contact email field not found');
      await email.fill(leadEmail);
      const message = page.locator('textarea').first();
      if (await message.count()) await message.fill('Gate 2 lead intake smoke');
      const submit = page.locator('button[type="submit"], input[type="submit"]').first();
      await Promise.all([
        page.waitForLoadState('domcontentloaded'),
        submit.click(),
      ]);
      pass('LEAD_INTAKE_HTTP');
    } catch (e) { fail('LEAD_INTAKE', e); throw e; }
  } finally {
    await browser.close();
  }
}

async function runAuth() {
  const browser = await chromium.launch({ headless: true });
  try {
    try {
      const context = await browser.newContext();
      const page = await context.newPage();
      const response = await page.goto(`${authBase}/site_admin/props`, { waitUntil: 'domcontentloaded' });
      if (!response || response.status() !== 403) {
        throw new Error(`anonymous admin request expected 403, got ${response ? response.status() : 'no response'}`);
      }
      await context.close();
      pass('ADMIN_AUTH');
    } catch (e) { fail('ADMIN_AUTH', e); throw e; }

    try {
      const context = await browser.newContext();
      const page = await context.newPage();
      await login(page, authBase, 'user@tenant-a.test');
      const response = await page.goto(`${authBase}/site_admin/props`, { waitUntil: 'domcontentloaded' });
      if (!response || response.status() !== 403) {
        throw new Error(`regular user expected 403 on admin route, got ${response ? response.status() : 'no response'}`);
      }
      await context.close();
      pass('ROLE_BOUNDARY');
    } catch (e) { fail('ROLE_BOUNDARY', e); throw e; }

    try {
      const context = await browser.newContext();
      const page = await context.newPage();
      await login(page, authBase, 'admin@tenant-a.test');
      const response = await page.goto(`${authBase}/site_admin/props`, { waitUntil: 'domcontentloaded' });
      await assertOk(response, 'admin property index after login');
      const body = await page.locator('body').innerText();
      if (body.includes('Admin Access Required')) throw new Error('admin still denied after valid login');
      await context.close();
      pass('ADMIN_AUTH_REAL_LOGIN');
    } catch (e) { fail('ADMIN_AUTH', e); throw e; }
  } finally {
    await browser.close();
  }
}

(async () => {
  try {
    if (mode === 'functional') await runFunctional();
    else if (mode === 'auth') await runAuth();
    else throw new Error(`unknown PWB_SMOKE_MODE=${mode}`);
  } catch (error) {
    console.error(`SMOKE3_FINAL=FAILED_UNCLASSIFIED`);
    console.error(error && error.stack ? error.stack : error);
    process.exitCode = 1;
    return;
  }
  console.log(`SMOKE3_${mode.toUpperCase()}_PHASE=PASS`);
})();
