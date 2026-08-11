import { test } from "@playwright/test";

const UNSPLASH_HOST = "images.unsplash.com";

async function stubUnsplash(page: import("@playwright/test").Page) {
  await page.route(`https://${UNSPLASH_HOST}/**`, async (route) => {
    const url = new URL(route.request().url());
    const w = url.searchParams.get("w") ?? "800";
    const h = url.searchParams.get("h") ?? "600";
    const svg = `
<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>
  <rect width='100%' height='100%' fill='#d9d4ca'/>
  <text x='50%' y='50%' fill='#3a3a3a' font-family='serif' font-size='24' text-anchor='middle' dominant-baseline='middle'>${w}x${h}</text>
</svg>`.trim();
    await route.fulfill({
      status: 200,
      contentType: "image/svg+xml",
      body: svg,
    });
  });
}

test.describe("Visual — capturas por sección", () => {
  test.beforeEach(async ({ page }) => {
    await stubUnsplash(page);
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("hero desktop completo", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: "test-results/screenshots/visual-hero-desktop.png",
      fullPage: false,
    });
  });

  test("servicios desktop con un accordion abierto", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.locator("#servicios").scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.locator(".service__toggle").first().click();
    await page.waitForTimeout(800);
    await page.screenshot({
      path: "test-results/screenshots/visual-services-open.png",
      fullPage: false,
    });
  });

  test("about desktop con stats", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.locator("#sobre").scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: "test-results/screenshots/visual-about-desktop.png",
      fullPage: false,
    });
  });

  test("contacto desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.locator("#contacto").scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.screenshot({
      path: "test-results/screenshots/visual-contact-desktop.png",
      fullPage: false,
    });
  });

  test("footer desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(800);
    await page.screenshot({
      path: "test-results/screenshots/visual-footer-desktop.png",
      fullPage: false,
    });
  });

  test("página completa desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: "test-results/screenshots/visual-fullpage-desktop.png",
      fullPage: true,
    });
  });
});
