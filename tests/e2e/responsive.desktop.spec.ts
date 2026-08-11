import { test, expect } from "@playwright/test";

test.describe("Diseño responsive — desktop", () => {
  test.use({
    viewport: { width: 1440, height: 900 },
  });

  test("hero muestra nav completa y card visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator(".site-header__nav")).toBeVisible();
    await expect(page.locator(".site-header__meta")).toBeVisible();
    await expect(page.locator(".hero__card")).toBeVisible();
  });

  test("portfolio es grid de 2 columnas en desktop", async ({ page }) => {
    await page.goto("/");
    await page.locator("#trabajos").scrollIntoViewIfNeeded();

    const grid = page.locator(".portfolio__grid");
    const styles = await grid.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return { columns: cs.gridTemplateColumns };
    });
    const cols = styles.columns.split(" ").length;
    expect(cols).toBe(2);
  });

  test("about es grid de 2 columnas en desktop", async ({ page }) => {
    await page.goto("/");
    await page.locator("#sobre").scrollIntoViewIfNeeded();

    const inner = page.locator(".about__inner");
    const styles = await inner.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return { columns: cs.gridTemplateColumns };
    });
    const cols = styles.columns.split(" ").length;
    expect(cols).toBe(2);
  });

  test("footer con 3 columnas en desktop", async ({ page }) => {
    await page.goto("/");

    const cols = page.locator(".footer__columns");
    const styles = await cols.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return { columns: cs.gridTemplateColumns };
    });
    const colCount = styles.columns.split(" ").length;
    expect(colCount).toBe(3);
  });

  test("captura screenshot desktop del hero", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: "test-results/screenshots/desktop-hero.png",
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    });
  });

  test("captura screenshot desktop del portfolio", async ({ page }) => {
    await page.goto("/");
    await page.locator("#trabajos").scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.screenshot({
      path: "test-results/screenshots/desktop-portfolio.png",
      fullPage: false,
    });
  });
});
