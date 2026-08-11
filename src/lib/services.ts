export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  previewImageId: string;
}

export const SERVICES: Service[] = [
  {
    id: "identidad",
    number: "01",
    title: "Identidad de marca",
    description:
      "Sistemas visuales completos: logos, tipografía, color, tono de voz y guías de uso que se sostienen en el tiempo.",
    previewImageId: "1611532736597-de2d4265fba3",
  },
  {
    id: "editorial",
    number: "02",
    title: "Diseño editorial",
    description:
      "Libros, revistas y publicaciones impresas o digitales con jerarquía clara y respeto por el lector.",
    previewImageId: "1488998427799-e3362cec87c3",
  },
  {
    id: "tipografia",
    number: "03",
    title: "Tipografía",
    description:
      "Selección, calibración y ajustes tipográficos. Diseño de lettering y tipografía a medida cuando el proyecto lo pide.",
    previewImageId: "1471107340929-a87cd0f5b5f3",
  },
  {
    id: "direccion",
    number: "04",
    title: "Dirección de arte",
    description:
      "Concepto visual y supervisión estética para campañas, portadas y piezas que necesitan un punto de vista claro.",
    previewImageId: "1493421419110-74f4e85ba126",
  },
  {
    id: "empaque",
    number: "05",
    title: "Empaque",
    description:
      "Diseño de packaging estructural y gráfico. Prototipos, dieline y pre-impresión para producción real.",
    previewImageId: "1507238691740-187a5b1d37b8",
  },
  {
    id: "digital",
    number: "06",
    title: "Identidad digital",
    description:
      "Sistemas web y sociales coherentes con la marca. Interfaces tipográficas, sobrias y editoriales.",
    previewImageId: "1503694978374-8a2fa686963a",
  },
];
