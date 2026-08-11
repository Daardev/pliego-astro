import { test, expect } from "@playwright/test";

test.describe("Navegación y scroll", () => {
  test("header muestra logo y CTA", async ({ page }) => {
    await page.goto("/");

    const logo = page.locator(".site-header__logo");
    await expect(logo).toBeVisible();
    await expect(logo).toContainText(/Pliego/i);

    const cta = page.locator(".site-header__cta");
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "#contacto");
  });

  test("los enlaces del header apuntan a secciones existentes", async ({
    page,
  }) => {
    await page.goto("/");

    const navLinks = page.locator(".site-header__nav a");
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const href = await navLinks.nth(i).getAttribute("href");
      expect(href).toMatch(/^#\w+/);
      const targetId = (href ?? "").replace("#", "");
      const target = page.locator(`#${targetId}`);
      await expect(target).toHaveCount(1);
    }
  });

  test("click en nav link hace scroll a la sección", async ({ page }) => {
    await page.goto("/");

    const serviciosLink = page.locator(
      '.site-header__nav a[href="#servicios"]',
    );
    await serviciosLink.click();

    await page.waitForTimeout(500);

    const serviciosBox = await page.locator("#servicios").boundingBox();
    expect(serviciosBox).not.toBeNull();

    if (serviciosBox) {
      const inViewport =
        serviciosBox.y >= -50 &&
        serviciosBox.y < page.viewportSize()!.height / 2;
      expect(inViewport).toBe(true);
    }
  });

  test("logo del footer vuelve al top", async ({ page }) => {
    await page.goto("/");

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    await page.locator(".footer__logo").click();

    await page
      .waitForFunction(() => window.scrollY < 80, undefined, { timeout: 3_000 })
      .catch(() => {});

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(80);
  });

  test("header se mantiene visible al hacer scroll", async ({ page }) => {
    await page.goto("/");

    const header = page.locator("header.site-header");
    await expect(header).toBeVisible();

    await page.evaluate(() => window.scrollTo(0, 1500));
    await page.waitForTimeout(200);

    await expect(header).toBeVisible();

    const box = await header.boundingBox();
    expect(box?.y).toBeLessThan(80);
  });
});
