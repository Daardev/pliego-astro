import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test("muestra todos los campos requeridos", async ({ page }) => {
    await page.goto("/");

    await page.locator("#contacto").scrollIntoViewIfNeeded();

    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="subject"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator("button.contact__submit")).toBeVisible();
  });

  test("labels asociados a sus inputs", async ({ page }) => {
    await page.goto("/");
    await page.locator("#contacto").scrollIntoViewIfNeeded();

    const labels = page.locator(".field label");
    const count = await labels.count();
    expect(count).toBeGreaterThanOrEqual(4);

    for (let i = 0; i < count; i++) {
      const forAttr = await labels.nth(i).getAttribute("for");
      expect(forAttr).toBeTruthy();
      const input = page.locator(`#${forAttr}`);
      await expect(input).toHaveCount(1);
    }
  });

  test("submit con campos vacíos muestra validación nativa", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator("#contacto").scrollIntoViewIfNeeded();

    const nameInput = page.locator('input[name="name"]');
    const validity = await nameInput.evaluate((el) => ({
      valid: (el as HTMLInputElement).checkValidity(),
      message: (el as HTMLInputElement).validationMessage,
    }));
    expect(validity.valid).toBe(false);
  });
});
