# Guidelines del proyecto

## Alcance actual

- La app se implementa en `Next.js` con `TypeScript` usando App Router.
- No hay backend real por ahora, así que los datos salen de `services` asíncronos conectados a `mocks`.
- La autenticación es mockeada, pero la estructura ya contempla sesión por cookie y rutas protegidas.
- Los estilos base, tokens visuales y estados interactivos viven en `src/app/globals.css`.
- La base debe mantenerse full responsive desde mobile hasta desktop.

## Principios de desarrollo

- Construir componentes semánticos y reutilizables antes de duplicar layouts por pantalla.
- Mantener la lógica de acceso a datos en `src/services` para poder reemplazar mocks por APIs reales sin rehacer las vistas.
- Centralizar colores, tipografía, espaciados, radios, sombras y estados de foco en variables globales.
- Priorizar HTML nativo antes de agregar complejidad con ARIA; usar ARIA para complementar, no para reemplazar semántica.
- Dejar cada pantalla pensada para teclado, lector de pantalla y resize desde el arranque.

## Reglas de accesibilidad a cumplir

- Respetar principios de usabilidad web con arquitectura de información clara y navegación simple.
- Garantizar contenidos y multimedia accesibles.
- Usar tecnologías recomendadas por W3C: HTML5, CSS y Web ARIA cuando aporte valor.
- Apuntar a cumplimiento WCAG 2.2 durante la implementación y en la revisión final.
- Validar estructura semántica, foco visible, contraste, orden de tabulación, nombres accesibles y mensajes de error.

## Checklist base por pantalla

- Debe existir un único `h1` por página.
- Toda acción debe ser alcanzable por teclado.
- Inputs deben tener `label` asociado y mensajes de error anunciables.
- El foco visible no puede perderse ni desactivarse.
- El contraste de texto e interfaz debe ser suficiente.
- La UI debe funcionar correctamente en mobile, tablet y desktop.
- Las imágenes informativas deben incluir `alt`; las decorativas deben omitirse del árbol accesible.

## Arquitectura inicial

- `src/app`: rutas y layout global.
- `src/components`: componentes de interfaz.
- `src/providers`: providers del cliente, como auth.
- `src/services`: capa de acceso a datos.
- `src/mocks`: datos mockeados.
- `src/lib`: utilidades compartidas, como sesión.

## Qué pasar desde Figma para arrancar las pantallas

Lo más útil:

- Link al archivo o al modo Dev de Figma.
- Frames de cada pantalla en desktop y mobile.
- Sistema de colores, tipografía, espaciados y radios.
- Estados de componentes: hover, focus, disabled, error, success.
- Assets exportables: SVG, PNG, íconos, ilustraciones, logos.
- Copys finales o al menos textos provisionales por pantalla.
- Reglas de comportamiento responsive si ya están definidas.

También sirve:

- Capturas de pantalla cuando necesitemos contexto rápido.
- Código exportado de Figma Make como referencia visual o estructural.

Sirve menos si viene solo:

- Código exportado sin tokens, sin medidas y sin aclaraciones de comportamiento.

## Próximo paso recomendado

Cuando quieras empezar con las pantallas, pasame primero el link de Figma y, si podés, también:

- una captura por pantalla,
- la lista de vistas a construir,
- y cualquier regla especial de responsive o accesibilidad que ya te hayan pedido.
