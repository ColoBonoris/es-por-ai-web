# Guidelines del proyecto

## Prioridad de la consigna

La web debe demostrar buenas prácticas de usabilidad, accesibilidad y desarrollo frontend. Estas reglas son parte central de la entrega y tienen prioridad sobre preferencias visuales menores.

- La arquitectura de información y la navegación deben permitir encontrar la información con facilidad.
- La experiencia debe ser simple, consistente y usable en mobile, tablet y desktop.
- El contenido multimedia debe ser accesible: imágenes con texto alternativo útil, controles alcanzables por teclado y alternativas cuando una interacción visual no alcance.
- La implementación debe usar tecnologías recomendadas por W3C: HTML5 semántico, CSS, TypeScript/React y Web ARIA solo cuando complemente la semántica nativa.
- La app debe apuntar a cumplir WCAG 2.2 AA, validación de hojas de estilo y validación gramatical/semántica W3C según aplique.
- La accesibilidad no se considera un extra visual: es criterio de aceptación para cerrar pantallas.

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

## Accesibilidad Operativa

- Cada página debe tener un único `h1`, aunque sea visualmente oculto cuando el diseño lo requiera.
- Cada página debe exponer landmarks claros: `main`, `nav`, `header`, `aside`, `section` y labels cuando hagan falta.
- La navegación principal debe usar `nav`, `aria-label` y `aria-current` cuando corresponda.
- Toda acción debe poder ejecutarse con teclado usando `Tab`, `Shift+Tab`, `Enter` y `Space`.
- Los controles compuestos deben soportar flechas cuando el patrón lo requiera, por ejemplo ratings o grupos tipo radio.
- El orden de tab debe seguir el orden visual y no debe saltar a elementos ocultos o irrelevantes.
- No debe haber trampas de foco: el usuario siempre debe poder entrar, operar y salir de un componente con teclado.
- El foco visible no debe ocultarse ni depender de hover.
- Al cambiar de ruta o abrir una pantalla nueva, el usuario debe poder ubicar rápidamente el contenido principal mediante skip link, heading o foco gestionado.
- Los mensajes dinámicos deben ser anunciables con `aria-live`, `role="status"` o `role="alert"` según urgencia.

## Lectores de Pantalla

- La app debe probarse manualmente con TalkBack en Android para navegación mobile.
- La app debe probarse manualmente con VoiceOver en iOS o macOS para navegación mobile/desktop.
- En desktop, se recomienda una pasada con NVDA + Chrome o equivalente si está disponible.
- Los nombres accesibles deben ser claros y no duplicar ruido visual: iconos decorativos van con `aria-hidden="true"`.
- Los botones de icono deben tener `aria-label` o texto visible equivalente.
- Las cards clickeables deben ser `Link` o `button`, no `div` interactivos.
- Los estados seleccionados deben comunicarse con semántica (`aria-current`, `aria-pressed`, `aria-checked`, radio/checkbox nativo) y no solo con color.
- Los toasts y mensajes de éxito no deben desaparecer tan rápido que resulten inútiles para lectores de pantalla.

## Formularios y Controles

- Inputs, textareas y selects deben tener `label` asociado.
- Los errores deben usar texto claro, `aria-invalid` y `aria-describedby` cuando corresponda.
- Los mensajes de error o éxito deben ser anunciables y estar cerca del control o acción relacionada.
- Fieldsets con grupos de opciones deben tener `legend`.
- Los chips seleccionables deben exponer estado con `aria-pressed` o usar controles nativos si representan opciones excluyentes.
- Los switches deben usar semántica de switch o checkbox y comunicar `on/off`.
- El rating por estrellas debe ser usable con teclado y lector de pantalla; objetivo a revisar si se mantiene con ARIA custom.
- El upload de fotos debe permitir agregar/quitar con teclado, anunciar cambios y no depender de drag-and-drop.
- Los botones y controles táctiles deben apuntar a un área mínima cercana a 44x44px.

## Mapa Leaflet

- El mapa no puede ser la única forma de acceder a los lugares: siempre debe existir una lista equivalente de resultados.
- Debe haber instrucciones accesibles para entender qué muestra el mapa y cómo usar la alternativa de lista.
- Los marcadores deben tener nombre accesible o no ser necesarios para completar la tarea.
- El mapa no debe capturar scroll o foco de forma que bloquee la navegación por teclado.
- En mobile, el mapa y la lista deben conservar lectura y operación claras con TalkBack.

## Multimedia, Color y Movimiento

- Imágenes informativas deben tener `alt` útil; imágenes decorativas deben ocultarse a tecnologías asistivas.
- No se debe comunicar información únicamente con color, posición o iconografía.
- El contraste debe ser suficiente en tema claro, oscuro y alto contraste.
- El foco visible debe contrastar en todos los temas.
- La app debe respetar `prefers-reduced-motion`.
- Animaciones y transiciones deben ser decorativas y no bloquear interacción ni comprensión.

## Responsive y Reflow

- La interfaz debe funcionar desde 320px de ancho.
- Mobile usa bottom navigation.
- Desktop usa sidebar/top navigation.
- No debe haber texto solapado, botones truncados ni tarjetas que rompan layout.
- Formularios largos deben seguir siendo legibles y navegables en mobile.
- La app debe revisarse con zoom 200% y texto aumentado.
- El contenido debe reflowear sin scroll horizontal inesperado salvo componentes que lo justifiquen explícitamente.

## Arquitectura

- `src/app`: rutas, layout global y API routes mock de auth.
- `src/components`: componentes visuales, pantallas y shell de navegación.
- `src/services`: capa de datos mockeada y reemplazable por backend.
- `src/mocks`: datos seed.
- `src/types`: contratos de dominio y API.
- `src/styles`: tokens, base, componentes y estilos de pantallas.
- `docs/api-contract.md`: contrato backend v1.

## Checklist antes de cerrar una pantalla

- Tiene estructura semántica clara y un único `h1`.
- Tiene landmarks y nombres accesibles cuando corresponde.
- Tiene estado de carga, vacío, error o éxito cuando corresponde.
- Funciona con `Tab`, `Shift+Tab`, `Enter` y `Space`.
- Mantiene orden de foco lógico y foco visible.
- Funciona con TalkBack o VoiceOver en al menos una pasada manual.
- Funciona en mobile, tablet y desktop desde 320px.
- No depende solo de color para comunicar estado.
- Imágenes informativas tienen `alt`.
- Formularios tienen labels, validación mínima y mensajes claros.
- Mensajes dinámicos usan `aria-live`, `role="status"` o `role="alert"` según corresponda.
- Controles táctiles son cómodos y alcanzables.
- Los datos salen de services, no de arrays locales dentro de la pantalla salvo UI estática.

## Matriz de QA manual por ruta

- `/onboarding`: revisar lectura de hero/cards, orden de tab, links de registro/login, responsive desktop/mobile y ausencia de texto roto.
- `/login`: revisar labels, errores anunciables, tab entre campos, links secundarios y submit con teclado.
- `/register`: revisar fieldsets de preferencias, errores, submit, navegación a permisos y TalkBack en formulario largo.
- `/forgot-password`: revisar mensaje de éxito, error de email y vuelta a login.
- `/home`: revisar quick actions, cards de lugares, búsqueda, lista de reseñas y navegación por teclado.
- `/map`: revisar búsqueda, filtros/chips, Leaflet, lista equivalente, foco del mapa y lectura con TalkBack.
- `/places/[placeId]`: revisar galería con alt, acciones, favorito, compartir, mapa compacto y lista de reseñas.
- `/places/[placeId]/review`: revisar rating con teclado, textarea, chips, upload de fotos, errores y submit.
- `/places/new`: revisar secciones del formulario, categoría, características, fotos, errores y estado de alta pendiente.
- `/favorites`: revisar estado vacío, cards, navegación a mapa y persistencia mockeada.
- `/ai`: revisar chat, prompts sugeridos, input, submit deshabilitado y mensajes de respuesta.
- `/profile`: revisar datos del perfil, estadísticas, listas asociadas y lectura de badges.
- `/settings`: revisar cambio de tema, toast accesible, switches, preferencias, permisos y contraste en todos los temas.
- `/permissions`: revisar permisos como botones, estados seleccionados, guardado y navegación por teclado.
- `/more`: revisar menú, enlaces legales, logout y orden de foco.

## Validaciones recomendadas

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Navegación manual por teclado.
- Revisión con TalkBack y VoiceOver.
- Revisión responsive de `/onboarding`, `/home`, `/map`, `/places/[placeId]`, `/places/[placeId]/review`, `/places/new`, `/settings`.
- Revisión de contraste con tema claro, oscuro y alto contraste.
- Validación HTML/CSS/W3C cuando el estado de la v1 esté estable.

## Verificación aplicada en V1

- Implementado: foco global al cambiar de ruta, `main` enfocable, skip link preservado y foco visible consistente.
- Implementado: campos reutilizables con IDs robustos, helper/error combinables, `aria-invalid`, `aria-describedby` y errores anunciables.
- Implementado: rating interactivo con radios nativos, categoría de alta de lugar con radios nativos visualmente tipo chip y targets táctiles reforzados.
- Implementado: upload de fotos con live region, límite anunciado, botones alcanzables y `alt` más descriptivo.
- Implementado: Leaflet tratado como mapa visual complementario, sin captura de teclado/scroll y con lista equivalente como flujo principal.
- Implementado: toasts, mensajes de éxito y errores con semántica `role="status"` o `role="alert"` según corresponda.
- Pendiente manual: ejecutar recorridos completos con TalkBack y VoiceOver en dispositivos reales o simulados.
- Pendiente manual: revisar contraste con herramienta dedicada y validar HTML/CSS/W3C cuando la v1 visual esté congelada.

## Deuda conocida a revisar

- Revisar si conviene sumar pruebas automatizadas con axe o Playwright cuando se agregue infraestructura de testing.
- Revisar si Leaflet necesita controles custom accesibles si en v2 el mapa pasa a ser una interacción principal y no complementaria.
- Auditar todos los flujos con TalkBack y VoiceOver antes de la entrega final.
