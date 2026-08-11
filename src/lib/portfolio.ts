export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  imageId: string;
  size: "large" | "medium";
}

export const PROJECTS: Project[] = [
  {
    id: "folio-editorial",
    title: "Folio",
    category: "Sistema editorial",
    year: "2025",
    description:
      "Identidad visual y sistema gráfico para una revista trimestral de crítica cultural.",
    imageId: "1488998427799-e3362cec87c3",
    size: "large",
  },
  {
    id: "taller-mono",
    title: "Taller Mono",
    category: "Identidad",
    year: "2025",
    description:
      "Branding completo para un taller de impresión letterpress. Del símbolo al papel.",
    imageId: "1611532736597-de2d4265fba3",
    size: "medium",
  },
  {
    id: "punta-de-presa",
    title: "Punta de Presa",
    category: "Tipografía",
    year: "2024",
    description:
      "Familia tipográfica display diseñada para una editorial independiente de poesía.",
    imageId: "1471107340929-a87cd0f5b5f3",
    size: "medium",
  },
  {
    id: "palacio",
    title: "Palacio",
    category: "Empaque",
    year: "2024",
    description:
      "Sistema de packaging para una línea de café de origen. Estructura, gráfica y pre-impresión.",
    imageId: "1507238691740-187a5b1d37b8",
    size: "large",
  },
  {
    id: "cuaderno-publico",
    title: "Cuaderno Público",
    category: "Dirección de arte",
    year: "2024",
    description:
      "Concepto visual y arte para la campaña de lanzamiento de un festival de arquitectura.",
    imageId: "1493421419110-74f4e85ba126",
    size: "medium",
  },
  {
    id: "prensa-lenta",
    title: "Prensa Lenta",
    category: "Diseño editorial",
    year: "2023",
    description:
      "Libro recopilatorio de ensayos sobre tipografía latinoamericana. 280 páginas, dos tintas.",
    imageId: "1503694978374-8a2fa686963a",
    size: "medium",
  },
];
