import { test, expect } from "@playwright/test";

test.describe("Diseño responsive — mobile", () => {
  test.use({
    viewport: { width: 390, height: 844 },
  });

  test("header oculta nav y meta en mobile", async ({ page }) => {
    await page.goto("/");

    const nav = page.locator(".site-header__nav");
    await expect(nav).toBeHidden();

    const meta = page.locator(".site-header__meta");
    await expect(meta).toBeHidden();
  });

  test("hero reorganiza grid a 1 columna", async ({ page }) => {
    await page.goto("/");

    const inner = page.locator(".hero__inner");
    const styles = await inner.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return { columns: cs.gridTemplateColumns };
    });
    expect(styles.columns.split(" ").length).toBe(1);
  });

  test("portfolio pasa a 1 columna en mobile", async ({ page }) => {
    await page.goto("/");
    await page.locator("#trabajos").scrollIntoViewIfNeeded();

    const grid = page.locator(".portfolio__grid");
    const styles = await grid.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return { columns: cs.gridTemplateColumns };
    });
    expect(styles.columns.split(" ").length).toBe(1);
  });

  test("footer columnas colapsan en mobile", async ({ page }) => {
    await page.goto("/");

    const cols = page.locator(".footer__columns");
    const styles = await cols.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return { columns: cs.gridTemplateColumns };
    });
    expect(styles.columns.split(" ").length).toBe(1);
  });

  test("no hay overflow horizontal", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(800);

    const overflow = await page.evaluate(() => ({
      docWidth: document.documentElement.scrollWidth,
      viewWidth: window.innerWidth,
    }));
    expect(overflow.docWidth).toBeLessThanOrEqual(overflow.viewWidth + 1);
  });

  test("captura screenshot mobile del hero", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: "test-results/screenshots/mobile-hero.png",
      fullPage: false,
    });
  });

  test("captura screenshot mobile del portfolio", async ({ page }) => {
    await page.goto("/");
    await page.locator("#trabajos").scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.screenshot({
      path: "test-results/screenshots/mobile-portfolio.png",
      fullPage: false,
    });
  });
});
