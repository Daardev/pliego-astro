import { test, expect } from "@playwright/test";

test.describe("Services accordion", () => {
  test("todos los servicios inician cerrados", async ({ page }) => {
    await page.goto("/");

    const toggles = page.locator(".service__toggle");
    const count = await toggles.count();
    expect(count).toBe(6);

    for (let i = 0; i < count; i++) {
      await expect(toggles.nth(i)).toHaveAttribute("aria-expanded", "false");
    }
  });

  test("click en un servicio abre su descripción", async ({ page }) => {
    await page.goto("/");

    const firstToggle = page.locator(".service__toggle").first();
    await firstToggle.click();

    await page.waitForTimeout(500);

    await expect(firstToggle).toHaveAttribute("aria-expanded", "true");

    const firstBody = page.locator(".service__body").first();
    await expect(firstBody).toHaveAttribute("aria-hidden", "false");

    const height = await firstBody.evaluate(
      (el) => el.getBoundingClientRect().height,
    );
    expect(height).toBeGreaterThan(20);
  });

  test("abrir un servicio cierra los demás", async ({ page }) => {
    await page.goto("/");

    const toggles = page.locator(".service__toggle");
    await toggles.nth(0).click();
    await page.waitForTimeout(500);

    await toggles.nth(1).click();
    await page.waitForTimeout(500);

    await expect(toggles.nth(0)).toHaveAttribute("aria-expanded", "false");
    await expect(toggles.nth(1)).toHaveAttribute("aria-expanded", "true");
  });

  test("click en servicio abierto lo cierra", async ({ page }) => {
    await page.goto("/");

    const toggle = page.locator(".service__toggle").first();
    await toggle.click();
    await page.waitForTimeout(500);
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    await toggle.click();
    await page.waitForTimeout(500);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
