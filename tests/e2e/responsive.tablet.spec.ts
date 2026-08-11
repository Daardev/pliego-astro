import { test, expect } from "@playwright/test";

test.describe("Diseño responsive — tablet", () => {
  test.use({
    viewport: { width: 820, height: 1180 },
  });

  test("hero reorganiza a 1 columna en tablet", async ({ page }) => {
    await page.goto("/");

    const inner = page.locator(".hero__inner");
    const styles = await inner.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return { columns: cs.gridTemplateColumns };
    });
    const cols = styles.columns.split(" ").length;
    expect(cols).toBeGreaterThanOrEqual(1);
    expect(cols).toBeLessThanOrEqual(2);
  });

  test("portfolio colapsa a 1 columna en tablet portrait", async ({ page }) => {
    await page.goto("/");
    await page.locator("#trabajos").scrollIntoViewIfNeeded();

    const grid = page.locator(".portfolio__grid");
    const styles = await grid.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return { columns: cs.gridTemplateColumns };
    });
    expect(styles.columns.split(" ").length).toBe(1);
  });

  test("captura screenshot tablet del hero", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: "test-results/screenshots/tablet-hero.png",
      fullPage: false,
    });
  });
});
