import { test, expect } from "@playwright/test";

test.describe("Home — renderizado base", () => {
  test("carga sin errores de consola ni de red críticos", async ({ page }) => {
    const errors: string[] = [];
    const failedRequests: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    page.on("requestfailed", (req) => {
      const url = req.url();
      if (url.includes("localhost") || url.includes("127.0.0.1")) {
        failedRequests.push(`${url} — ${req.failure()?.errorText}`);
      }
    });

    const response = await page.goto("/", { waitUntil: "networkidle" });
    expect(response?.status()).toBe(200);

    expect(errors, `Errores en consola:\n${errors.join("\n")}`).toEqual([]);
    expect(
      failedRequests,
      `Requests fallidos:\n${failedRequests.join("\n")}`,
    ).toEqual([]);
  });

  test("tiene título y metadatos esperados", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Pliego/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /Diseñador gr[aá]fico en Santiago/i,
    );
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
  });

  test("renderiza todas las secciones principales", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("header.site-header")).toBeVisible();
    await expect(page.locator("section.hero")).toBeVisible();
    await expect(page.locator("section.services")).toBeVisible();
    await expect(page.locator("section.about")).toBeVisible();
    await expect(page.locator("section.portfolio")).toBeVisible();
    await expect(page.locator("section.contact")).toBeVisible();
    await expect(page.locator("footer.footer")).toBeVisible();
  });

  test("headline del hero contiene palabras clave", async ({ page }) => {
    await page.goto("/");

    const headline = page.locator(".hero__headline");
    await expect(headline).toBeVisible();
    const text = await headline.textContent();
    expect(text ?? "").toMatch(/identidades/i);
    expect(text ?? "").toMatch(/publicaciones/i);
  });

  test("muestra los 6 servicios", async ({ page }) => {
    await page.goto("/");

    const services = page.locator(".service");
    await expect(services).toHaveCount(6);
  });

  test("muestra los 4 stats de about", async ({ page }) => {
    await page.goto("/");

    const stats = page.locator(".stat");
    await expect(stats).toHaveCount(4);
  });

  test("muestra los 6 proyectos del portafolio", async ({ page }) => {
    await page.goto("/");

    const projects = page.locator(".project");
    await expect(projects).toHaveCount(6);
  });

  test("la imagen principal del hero tiene aspect-ratio correcto", async ({
    page,
  }) => {
    await page.goto("/");

    const layer2 = page.locator(".hero__layer--2").first();
    await expect(layer2).toBeVisible();

    const box = await layer2.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      const ratio = box.width / box.height;
      expect(ratio).toBeGreaterThan(1.0);
      expect(ratio).toBeLessThan(1.6);
    }
  });
});
