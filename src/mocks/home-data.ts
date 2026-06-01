import type { HomePageData } from "@/types/home";

export const homePageData: HomePageData = {
  eyebrow: "Base del proyecto",
  title: "Next.js accesible, responsive y lista para iterar desde Figma",
  description:
    "Esta base deja preparado el proyecto para avanzar con las pantallas, usando componentes semánticos, estilos globales, datos mockeados y autenticación inicial sin backend real.",
  highlights: [
    {
      id: "global-styles",
      title: "Tokens globales",
      description:
        "Colores, espaciados, radios y estados de foco definidos en una sola hoja global."
    },
    {
      id: "mock-services",
      title: "Servicios desacoplados",
      description:
        "Los datos salen de servicios asíncronos que hoy consumen mocks y mañana pueden conectarse al backend."
    },
    {
      id: "accessibility",
      title: "Accesibilidad desde el arranque",
      description:
        "Skip link, landmarks, foco visible, contraste y estructura pensada para WCAG 2.2."
    }
  ],
  workflow: [
    {
      id: "figma-handoff",
      title: "Relevar Figma",
      description:
        "Tomar pantallas, componentes, tokens visuales y estados para convertirlos en una UI consistente."
    },
    {
      id: "build-screens",
      title: "Construir pantallas",
      description:
        "Traducir el mockup a componentes reutilizables y layouts responsive en App Router."
    },
    {
      id: "qa-accessibility",
      title: "Validar accesibilidad",
      description:
        "Revisar navegación por teclado, jerarquía semántica, formularios y contraste antes de cerrar cada pantalla."
    }
  ]
};
