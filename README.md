# Pliego

Landing personal de un diseñador gráfico ficticio construida con Astro + Tailwind + GSAP.

## Stack

- **Astro 7** con `output: 'static'`
- **TypeScript strict** con path aliases (`@components/*`, `@layouts/*`, `@lib/*`, `@styles/*`)
- **Tailwind CSS v4** (vía `@tailwindcss/vite`)
- **GSAP** + **ScrollTrigger** para animaciones
- Imágenes desde Unsplash (IDs curados)

## Estructura

```
src/
├── components/      # Header, Hero, Services, About, Portfolio, Contact, Footer
├── layouts/         # BaseLayout
├── lib/             # portfolio.ts, services.ts, unsplash.ts
├── pages/index.astro
└── styles/global.css
```

## Comandos

```bash
npm run dev          # dev server (http://localhost:4321)
npm run build        # build de producción (genera dist/)
npm run preview      # preview del build
npx astro check      # verificación de tipos TypeScript
```

## Personalización rápida

- **Textos del hero**: `src/components/Hero.astro` (líneas 13-26)
- **Tagline**: solo cambia el array `headlineWords`
- **Email de contacto**: busca `hola@pliego.studio` (4 archivos) y reemplaza
- **Proyectos del portafolio**: `src/lib/portfolio.ts`
- **Servicios**: `src/lib/services.ts`
- **Estadísticas (años, proyectos, etc.)**: `src/components/About.astro`
- **Imágenes Unsplash**: cambia los IDs en `src/lib/unsplash.ts` y `src/lib/portfolio.ts`

## Accesibilidad

- `prefers-reduced-motion: reduce` se respeta en todas las animaciones
- Foco visible en inputs y CTAs
- Semántica correcta (`header`, `main`, `section`, `nav`, `footer`)
- `aria-expanded` / `aria-controls` en accordion de servicios
- `alt` descriptivo en imágenes con contenido, vacío en decorativas

## Notas

- Las fuentes (Fraunces, Inter, JetBrains Mono) se cargan vía Google Fonts con `display=swap`
- Las imágenes del hero tienen `loading="eager"` para evitar pop-in durante la animación de entrada
- `mix-blend-mode: multiply` en las capas 1 y 2 del hero simula transparencia sobre el fondo cream
