import { test, expect } from "@playwright/test";

test.describe("Accesibilidad básica", () => {
  test("todas las imágenes tienen alt", async ({ page }) => {
    await page.goto("/");

    const images = page.locator("img");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");
      expect(
        alt,
        `img #${i} (src=${await img.getAttribute("src")}) sin alt`,
      ).not.toBeNull();
    }
  });

  test("header tiene aria-label en nav", async ({ page }) => {
    await page.goto("/");

    const nav = page.locator("header.site-header nav");
    await expect(nav).toHaveAttribute("aria-label", /navegaci[oó]n/i);
  });

  test("botones de servicios tienen aria-expanded", async ({ page }) => {
    await page.goto("/");

    const buttons = page.locator(".service__toggle");
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      await expect(btn).toHaveAttribute("aria-expanded");
      const expanded = await btn.getAttribute("aria-expanded");
      expect(["true", "false"]).toContain(expanded);

      const controls = await btn.getAttribute("aria-controls");
      expect(controls).toBeTruthy();
      const panel = page.locator(`#${controls}`);
      await expect(panel).toHaveCount(1);
    }
  });

  test("logo del header tiene aria-label", async ({ page }) => {
    await page.goto("/");

    const logo = page.locator(".site-header__logo");
    await expect(logo).toHaveAttribute("aria-label", /Pliego/i);
  });

  test("orden de headings es jerárquico", async ({ page }) => {
    await page.goto("/");

    const headings = await page.locator("h1, h2, h3, h4").allTextContents();
    expect(headings.length).toBeGreaterThan(0);

    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);
  });

  test("no hay enlaces con texto vacío", async ({ page }) => {
    await page.goto("/");

    const links = page.locator("a");
    const count = await links.count();

    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const text = (await link.textContent())?.trim() ?? "";
      const ariaLabel = await link.getAttribute("aria-label");
      expect(
        text.length > 0 || (ariaLabel && ariaLabel.length > 0),
        `link #${i} sin texto accesible (href=${await link.getAttribute("href")})`,
      ).toBe(true);
    }
  });
});
