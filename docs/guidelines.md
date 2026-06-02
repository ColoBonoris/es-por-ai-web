# Guidelines del proyecto

## Prioridad de la consigna

La web debe demostrar buenas prácticas de usabilidad, accesibilidad y desarrollo frontend. Estas reglas son parte central de la entrega y tienen prioridad sobre preferencias visuales menores.

- La arquitectura de información y la navegación deben permitir encontrar la información con facilidad.
- La experiencia debe ser simple, consistente y usable en mobile, tablet y desktop.
- El contenido multimedia debe ser accesible: imágenes con texto alternativo útil, controles alcanzables por teclado y alternativas cuando una interacción visual no alcance.
- La implementación debe usar tecnologías recomendadas por W3C: HTML5 semántico, CSS, TypeScript/React y Web ARIA solo cuando complemente la semántica nativa.
- La app debe apuntar a cumplir WCAG 2.2, validación de hojas de estilo y validación gramatical/semántica W3C según aplique.

## Alcance V1

- La app es una web/PWA en `Next.js` con `TypeScript` y App Router.
- La v1 no tiene backend real: los datos salen de `services` asíncronos conectados a mocks.
- Las acciones principales deben ser funcionales aunque mockeadas: auth, favoritos, reseñas, preferencias, permisos, alta de lugares y recomendaciones de IAn por reglas simples.
- La sesión se simula con cookie HTTP-only para conservar una estructura cercana a backend real.
- El mapa usa Leaflet con datos mockeados y coordenadas reales alrededor de La Plata.
- La IA real queda fuera de v1; IAn funciona como placeholder mockeado.

## Principios de desarrollo

- Mantener la lógica de datos en `src/services` para poder reemplazar mocks por endpoints reales sin rehacer pantallas.
- Centralizar contratos compartidos en tipos (`src/types/domain.ts` y `src/types/api.ts`).
- Evitar lógica de negocio escondida en componentes visuales.
- Usar componentes reutilizables para botones, inputs, chips, cards, reseñas, navegación y mapas.
- Mantener estilos globales por capas: tokens, base, componentes y pantallas.
- No agregar librerías pesadas sin que resuelvan una necesidad clara de la v1.

## Accesibilidad

- Cada página debe tener un único `h1`.
- La navegación principal debe usar `nav`, `aria-label` y `aria-current` cuando corresponda.
- Toda acción debe poder ejecutarse con teclado.
- Inputs, textareas y controles deben tener `label` asociado.
- Los errores de formularios deben tener texto claro y ser anunciables con `aria-live` cuando aplique.
- Los chips seleccionables deben exponer estado con `aria-pressed`.
- El foco visible no debe ocultarse.
- El contraste debe ser suficiente en tema claro, oscuro y alto contraste.
- El mapa debe tener una lista de resultados equivalente para no depender solo de interacción visual.
- La app debe respetar `prefers-reduced-motion`.

## Responsive

- La interfaz debe funcionar desde 320px de ancho.
- Mobile usa bottom navigation.
- Desktop usa sidebar/top navigation.
- No debe haber texto solapado, botones truncados ni tarjetas que rompan layout.
- Formularios largos deben seguir siendo legibles y navegables en mobile.

## Arquitectura

- `src/app`: rutas, layout global y API routes mock de auth.
- `src/components`: componentes visuales, pantallas y shell de navegación.
- `src/services`: capa de datos mockeada y reemplazable por backend.
- `src/mocks`: datos seed.
- `src/types`: contratos de dominio y API.
- `src/styles`: tokens, base, componentes y estilos de pantallas.
- `docs/api-contract.md`: contrato backend v1.

## Checklist antes de cerrar una pantalla

- Tiene estructura semántica clara.
- Tiene estado de carga, vacío, error o éxito cuando corresponde.
- Funciona con teclado.
- Funciona en mobile y desktop.
- No depende solo de color para comunicar estado.
- Imágenes informativas tienen `alt`.
- Formularios tienen labels, validación mínima y mensajes claros.
- Los datos salen de services, no de arrays locales dentro de la pantalla salvo UI estática.

## Validaciones recomendadas

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Navegación manual por teclado.
- Revisión responsive de `/home`, `/map`, `/places/[placeId]`, `/places/[placeId]/review`, `/places/new`, `/settings`.
- Revisión de contraste con tema claro, oscuro y alto contraste.
