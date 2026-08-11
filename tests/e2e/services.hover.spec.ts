import { test, expect, type Page } from "@playwright/test";

const enableHoverAnimations = async (page: Page) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
};

const previewOpacity = (page: Page, index: number) =>
  page
    .locator(".service")
    .nth(index)
    .locator(".service__preview")
    .evaluate((el) => parseFloat(getComputedStyle(el).opacity));

test.describe("Services hover preview", () => {
  test("hover sobre el primer servicio muestra su preview", async ({
    page,
  }) => {
    await enableHoverAnimations(page);

    await page.locator(".service__toggle").first().hover();
    await page.waitForTimeout(700);

    expect(await previewOpacity(page, 0)).toBeGreaterThan(0.9);
    expect(await previewOpacity(page, 1)).toBeLessThan(0.1);
    expect(await previewOpacity(page, 2)).toBeLessThan(0.1);
  });

  test("al mover a otro servicio, el preview anterior se oculta", async ({
    page,
  }) => {
    await enableHoverAnimations(page);

    const first = page.locator(".service__toggle").nth(0);
    const second = page.locator(".service__toggle").nth(1);

    await first.hover();
    await page.waitForTimeout(700);
    expect(await previewOpacity(page, 0)).toBeGreaterThan(0.9);

    await second.hover();
    await page.waitForTimeout(700);

    expect(await previewOpacity(page, 0)).toBeLessThan(0.1);
    expect(await previewOpacity(page, 1)).toBeGreaterThan(0.9);
  });

  test("al mover entre varios servicios seguidos, solo el actual queda visible", async ({
    page,
  }) => {
    await enableHoverAnimations(page);

    const toggles = page.locator(".service__toggle");

    await toggles.nth(0).hover();
    await page.waitForTimeout(400);
    await toggles.nth(2).hover();
    await page.waitForTimeout(400);
    await toggles.nth(4).hover();
    await page.waitForTimeout(700);

    for (let i = 0; i < 6; i++) {
      const op = await previewOpacity(page, i);
      if (i === 4) {
        expect(op, `service[${i}] debe estar visible`).toBeGreaterThan(0.9);
      } else {
        expect(op, `service[${i}] debe estar oculto`).toBeLessThan(0.1);
      }
    }
  });

  test("al sacar el cursor del listado, todos los previews se ocultan", async ({
    page,
  }) => {
    await enableHoverAnimations(page);

    await page.locator(".service__toggle").first().hover();
    await page.waitForTimeout(700);

    await page.locator(".services__title").hover();
    await page.waitForTimeout(600);

    for (let i = 0; i < 6; i++) {
      expect(await previewOpacity(page, i)).toBeLessThan(0.1);
    }
  });
});
