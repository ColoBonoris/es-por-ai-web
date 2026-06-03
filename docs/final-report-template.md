# Informe de desarrollo web accesible

## Datos del trabajo

- Materia: [Completar]
- Trabajo práctico final: Parte B - Desarrollo web accesible
- Proyecto: Es por AI
- Integrantes: [Completar]
- Fecha de entrega: [Completar]
- Link de la aplicación: [Completar]
- Repositorio: [Completar]

## 1. Introducción

Este informe documenta el desarrollo de una versión inicial de **Es por AI**, una aplicación web orientada a descubrir, consultar, reseñar y guardar lugares de interés, priorizando criterios de accesibilidad, usabilidad y navegación simple.

El desarrollo toma como base el prototipo realizado previamente y lo transforma en una aplicación web funcional con pantallas reales, datos mockeados y una arquitectura preparada para una futura integración con backend.

El objetivo principal fue construir una experiencia usable y accesible, respetando tecnologías recomendadas por la W3C, HTML5 semántico, CSS, TypeScript, React/Next.js y atributos ARIA cuando aportan información adicional a la semántica nativa.

## 2. Descripción de lo realizado

La aplicación desarrollada permite:

- Registrarse e iniciar sesión mediante autenticación mockeada.
- Configurar permisos iniciales de ubicación, cámara/fotos y notificaciones.
- Explorar lugares recomendados desde una pantalla principal.
- Buscar y filtrar lugares por categoría y características de accesibilidad.
- Visualizar lugares en un mapa Leaflet y en una lista equivalente.
- Ver el detalle de un lugar, galería de imágenes, reseñas y datos útiles.
- Guardar lugares como favoritos.
- Escribir reseñas con calificación, texto, características y fotos mockeadas.
- Agregar nuevos lugares con estado pendiente de aprobación.
- Consultar un asistente mockeado llamado IAn para recibir recomendaciones.
- Modificar preferencias de apariencia, tema, notificaciones y accesibilidad.

La versión actual no incluye backend real ni inteligencia artificial real. Los datos se obtienen desde servicios mockeados, pero la aplicación mantiene una estructura de servicios asíncronos para facilitar la integración futura.

## 3. Tecnologías utilizadas

- Next.js con App Router.
- TypeScript.
- React.
- CSS organizado en tokens globales, estilos base, componentes y pantallas.
- HTML5 semántico.
- Web ARIA en casos donde complementa la semántica nativa.
- Leaflet y React Leaflet para el mapa.
- LocalStorage para persistencia mockeada de favoritos, reseñas, preferencias y submissions.
- Cookies HTTP-only mockeadas para simular sesión de usuario.

## 4. Arquitectura de la aplicación

La aplicación se organizó separando responsabilidades:

- `src/app`: rutas, layout global y rutas API mockeadas de autenticación.
- `src/components`: componentes reutilizables, pantallas y navegación.
- `src/services`: servicios mockeados para auth, usuarios, lugares, reseñas e IAn.
- `src/mocks`: datos iniciales utilizados por los servicios.
- `src/types`: tipos de dominio y contrato de API.
- `src/styles`: tokens, base CSS, componentes y estilos de pantallas.
- `docs`: documentación, guidelines de accesibilidad y contrato de endpoints.

Esta separación permite reemplazar los mocks por un backend real sin reescribir las pantallas principales.

## 5. Pantallas desarrolladas

Completar esta sección con capturas. Se recomienda incluir capturas en desktop y mobile cuando corresponda.

| Pantalla | Descripción | Captura |
|---|---|---|
| Onboarding | Presentación inicial de la aplicación y acceso a login/registro. | [Pegar captura] |
| Login | Formulario de ingreso con email y contraseña. | [Pegar captura] |
| Registro | Formulario de creación de cuenta y preferencias iniciales. | [Pegar captura] |
| Permisos | Configuración inicial de permisos mockeados. | [Pegar captura] |
| Home | Recomendaciones, acciones rápidas y reseñas recientes. | [Pegar captura] |
| Mapa | Búsqueda, filtros, mapa Leaflet y lista equivalente de resultados. | [Pegar captura] |
| Detalle de lugar | Información del lugar, galería, reseñas, acciones y mapa compacto. | [Pegar captura] |
| Escribir reseña | Calificación, texto, características y fotos. | [Pegar captura] |
| Agregar lugar | Formulario para sugerir un lugar nuevo. | [Pegar captura] |
| Favoritos | Listado de lugares guardados. | [Pegar captura] |
| IAn | Asistente mockeado de recomendaciones. | [Pegar captura] |
| Perfil | Datos del usuario, estadísticas y preferencias. | [Pegar captura] |
| Configuración | Tema, notificaciones, preferencias y permisos. | [Pegar captura] |
| Más | Accesos secundarios, legales y cierre de sesión. | [Pegar captura] |

## 6. Criterios de usabilidad aplicados

La arquitectura de información se planteó para que las tareas principales sean fáciles de encontrar:

- Navegación inferior en mobile para accesos frecuentes.
- Navegación lateral en desktop para aprovechar mejor el espacio disponible.
- Separación clara entre pantallas públicas y pantallas protegidas.
- Acciones principales visibles: explorar mapa, consultar IAn, guardar favoritos, escribir reseñas y agregar lugares.
- Formularios divididos por secciones para reducir carga cognitiva.
- Estados vacíos, mensajes de éxito y mensajes de error visibles para orientar al usuario.

La aplicación mantiene una interacción simple: las páginas principales tienen encabezados claros, textos explicativos y componentes consistentes.

## 7. Criterios de accesibilidad implementados

### 7.1 Estructura semántica

- Se utiliza un único `main` principal por página.
- Las pantallas tienen un `h1` principal.
- Se usan `section`, `article`, `aside`, `header` y `nav` para organizar el contenido.
- La navegación usa `aria-label` y `aria-current` para indicar la sección activa.
- Las cards interactivas se implementan como links o botones, evitando `div` interactivos.

### 7.2 Navegación por teclado

- La aplicación puede recorrerse con `Tab` y `Shift+Tab`.
- Las acciones principales se ejecutan con `Enter` o `Space`.
- Se preserva un skip link para saltar al contenido principal.
- Se implementó foco programático al cambiar de ruta para orientar al usuario.
- El foco visible se mantiene mediante estilos globales de `:focus-visible`.

Resultado de prueba manual:

| Escenario | Resultado | Observaciones |
|---|---|---|
| Navegación con `Tab` en desktop | [Completar: correcto / con observaciones] | [Completar] |
| Navegación con `Shift+Tab` | [Completar] | [Completar] |
| Activación con `Enter` y `Space` | [Completar] | [Completar] |
| Foco visible en tema claro | [Completar] | [Completar] |
| Foco visible en tema oscuro | [Completar] | [Completar] |
| Foco visible en alto contraste | [Completar] | [Completar] |

### 7.3 Formularios

- Todos los inputs y textareas tienen labels asociados.
- Los formularios usan mensajes de error claros.
- Los errores se anuncian con `role="alert"`.
- Los mensajes de éxito usan `role="status"` o `aria-live`.
- Los campos reutilizables generan IDs robustos y relacionan helper/error con `aria-describedby`.
- Los grupos de opciones usan `fieldset` y `legend`.

Ejemplos implementados:

- Login y registro.
- Recuperación de contraseña.
- Alta de lugares.
- Escritura de reseñas.
- Configuración de preferencias.

### 7.4 Controles custom

- El rating por estrellas interactivo utiliza radios nativos, manteniendo una apariencia visual de estrellas.
- Los chips seleccionables informan estado con `aria-pressed`.
- La selección de categoría en alta de lugar usa radios nativos con apariencia de chip.
- Los permisos usan botones con `aria-pressed`.
- Los switches de configuración usan `role="switch"` y `aria-checked`.
- Los botones de icono tienen etiquetas accesibles.

### 7.5 Multimedia

- Las imágenes informativas tienen texto alternativo.
- Los iconos decorativos usan `aria-hidden="true"`.
- La carga de fotos mockeadas anuncia cuando se agrega o quita una imagen.
- El límite de fotos se informa al usuario.

### 7.6 Mapa

El mapa Leaflet se implementó como apoyo visual. Para accesibilidad, la aplicación ofrece una lista equivalente de resultados, de modo que la navegación y selección de lugares no dependa exclusivamente del mapa.

Medidas aplicadas:

- Instrucciones accesibles para explicar que el mapa es una referencia visual.
- Lista equivalente de lugares junto al mapa.
- Desactivación de captura de teclado y scroll del mapa para evitar bloqueos de navegación.
- Resultados accesibles mediante cards y links.

### 7.7 Temas, contraste y movimiento

- La aplicación incluye tema claro, oscuro y alto contraste.
- Los estados seleccionados no dependen únicamente del color.
- El foco visible está definido globalmente.
- Se respeta `prefers-reduced-motion`.
- Los toasts y mensajes dinámicos no dependen solo de color.

## 8. Evaluación automática

Completar esta sección pegando resultados reales de las herramientas utilizadas.

### 8.1 Validaciones del proyecto

| Comando | Resultado | Observaciones |
|---|---|---|
| `npm run typecheck` | [Completar] | [Completar] |
| `npm run lint` | [Completar] | [Completar] |
| `npm run build` | [Completar] | [Completar] |

Texto sugerido si pasan:

> Los comandos de validación del proyecto se ejecutaron correctamente. TypeScript no reportó errores de tipos, ESLint no reportó errores bloqueantes y la aplicación compiló exitosamente para producción.

### 8.2 Lighthouse

Herramienta: Lighthouse desde Chrome DevTools.

| Página evaluada | Accessibility | Performance | Best Practices | SEO | Observaciones |
|---|---:|---:|---:|---:|---|
| `/onboarding` | [Completar] | [Completar] | [Completar] | [Completar] | [Completar] |
| `/login` | [Completar] | [Completar] | [Completar] | [Completar] | [Completar] |
| `/home` | [Completar] | [Completar] | [Completar] | [Completar] | [Completar] |
| `/map` | [Completar] | [Completar] | [Completar] | [Completar] | [Completar] |
| `/settings` | [Completar] | [Completar] | [Completar] | [Completar] | [Completar] |

Capturas:

- Lighthouse `/onboarding`: [Pegar captura]
- Lighthouse `/home`: [Pegar captura]
- Lighthouse `/map`: [Pegar captura]
- Lighthouse `/settings`: [Pegar captura]

### 8.3 WAVE o axe DevTools

Herramienta utilizada: [Completar: WAVE / axe DevTools / otra]

| Página evaluada | Errores | Alertas | Resultado general | Observaciones |
|---|---:|---:|---|---|
| `/onboarding` | [Completar] | [Completar] | [Completar] | [Completar] |
| `/login` | [Completar] | [Completar] | [Completar] | [Completar] |
| `/home` | [Completar] | [Completar] | [Completar] | [Completar] |
| `/map` | [Completar] | [Completar] | [Completar] | [Completar] |
| `/places/[placeId]` | [Completar] | [Completar] | [Completar] | [Completar] |
| `/settings` | [Completar] | [Completar] | [Completar] | [Completar] |

Capturas:

- [Pegar capturas de resultados]

### 8.4 Validación HTML W3C

Herramienta: W3C Markup Validation Service.

URL evaluada: [Completar]

Resultado:

- [Completar: sin errores / con advertencias / con errores]
- Observaciones: [Completar]

Captura:

- [Pegar captura]

### 8.5 Validación CSS W3C

Herramienta: W3C CSS Validation Service.

URL o archivo evaluado: [Completar]

Resultado:

- [Completar: sin errores / con advertencias / con errores]
- Observaciones: [Completar]

Captura:

- [Pegar captura]

## 9. Evaluación manual

La evaluación manual permite validar situaciones que las herramientas automáticas no cubren completamente, como navegación real por teclado, lectura con software asistivo y comportamiento responsive.

### 9.1 Escenarios generales

| Escenario | Resultado | Observaciones |
|---|---|---|
| Uso con mouse | [Completar] | [Completar] |
| Uso solo con teclado | [Completar] | [Completar] |
| Uso en mobile | [Completar] | [Completar] |
| Uso en desktop | [Completar] | [Completar] |
| Zoom 200% | [Completar] | [Completar] |
| Tema claro | [Completar] | [Completar] |
| Tema oscuro | [Completar] | [Completar] |
| Tema alto contraste | [Completar] | [Completar] |
| Sin CSS | [Completar] | [Completar] |
| Sin JavaScript | [Completar] | [Completar] |

Nota sugerida para "sin JavaScript":

> Al tratarse de una aplicación desarrollada con Next.js/React, varias funcionalidades interactivas dependen de JavaScript. Sin JavaScript, la experiencia queda limitada. Se considera una limitación aceptada para esta versión inicial, dejando constancia de que las interacciones principales requieren JS habilitado.

### 9.2 Evaluación con teclado por pantalla

| Pantalla | Prueba realizada | Resultado | Observaciones |
|---|---|---|---|
| Onboarding | Tab hasta registro/login y activación con Enter. | [Completar] | [Completar] |
| Login | Tab entre campos, links y submit. | [Completar] | [Completar] |
| Registro | Tab por campos, preferencias y submit. | [Completar] | [Completar] |
| Home | Tab por acciones rápidas y cards. | [Completar] | [Completar] |
| Mapa | Tab por búsqueda, filtros y lista de resultados. | [Completar] | [Completar] |
| Detalle | Tab por acciones, reseñas y links externos. | [Completar] | [Completar] |
| Reseña | Selección de rating, textarea, chips, fotos y submit. | [Completar] | [Completar] |
| Agregar lugar | Campos, categoría, chips, fotos y envío. | [Completar] | [Completar] |
| Settings | Cambio de tema, switches y permisos. | [Completar] | [Completar] |
| IAn | Prompts sugeridos, input y envío. | [Completar] | [Completar] |

### 9.3 Evaluación con lector de pantalla

Software utilizado: [Completar: TalkBack / VoiceOver / NVDA]

Dispositivo o sistema operativo: [Completar]

Navegador: [Completar]

| Pantalla | Resultado | Observaciones |
|---|---|---|
| Onboarding | [Completar] | [Completar] |
| Login | [Completar] | [Completar] |
| Home | [Completar] | [Completar] |
| Mapa | [Completar] | [Completar] |
| Formulario de reseña | [Completar] | [Completar] |
| Configuración | [Completar] | [Completar] |

Texto sugerido:

> Durante la prueba con lector de pantalla se verificó que los controles principales tienen nombres accesibles, que los formularios anuncian sus labels y errores, y que los cambios importantes se comunican mediante regiones vivas o estados semánticos.

## 10. Resultados por criterio del enunciado

| Criterio del enunciado | Implementación / evidencia |
|---|---|
| Principios de usabilidad Web | Navegación simple, mobile bottom nav, desktop sidebar, pantallas agrupadas por tarea y formularios seccionados. |
| Arquitectura de información clara | Rutas públicas/protegidas, home, mapa, detalle, perfil, settings y más. |
| Contenido multimedia accesible | Imágenes con `alt`, iconos decorativos ocultos, upload con anuncios. |
| Tecnologías W3C | HTML5 semántico, CSS, ARIA complementario, TypeScript/React/Next.js. |
| WCAG 2.2 | Se aplicaron criterios de teclado, foco, labels, mensajes, contraste, semántica y alternativas equivalentes. |
| Hojas de estilo | CSS organizado por tokens, base, componentes y pantallas. |
| Evaluación automática | [Completar con Lighthouse, WAVE/axe, W3C HTML/CSS] |
| Evaluación manual | [Completar con tablas de teclado, responsive y lector de pantalla] |

## 11. Limitaciones conocidas

- La aplicación todavía no tiene backend real; los datos se manejan con mocks y persistencia local.
- IAn funciona como asistente mockeado, sin integración real con IA.
- El mapa Leaflet se considera apoyo visual; la lista equivalente es el flujo accesible principal.
- La validación con lectores de pantalla debe completarse manualmente en dispositivos reales o simulados.
- La validación W3C final debe realizarse sobre una URL desplegada y estable.
- Sin JavaScript, la experiencia queda limitada por tratarse de una aplicación React interactiva.

## 12. Conclusiones

La versión inicial de **Es por AI** cumple el objetivo de transformar el prototipo en una aplicación web funcional, usable y orientada a accesibilidad. Se implementaron pantallas principales, navegación responsive, servicios mockeados, persistencia local y componentes accesibles para formularios, navegación, mensajes dinámicos, rating, permisos, upload de fotos y mapa con alternativa equivalente.

La aplicación utiliza tecnologías recomendadas para desarrollo web moderno y aplica criterios de accesibilidad como estructura semántica, navegación por teclado, foco visible, labels asociados, mensajes anunciables, contraste por temas y soporte responsive.

Como trabajo futuro, se propone integrar backend real, completar una auditoría WCAG más profunda, sumar pruebas automatizadas de accesibilidad y validar exhaustivamente con lectores de pantalla en dispositivos reales.

## 13. Anexos

### 13.1 Comandos ejecutados

Pegar salida o resumen:

```bash
npm run typecheck
npm run lint
npm run build
```

### 13.2 Links útiles

- Aplicación desplegada: [Completar]
- Repositorio: [Completar]
- Figma/prototipo original: [Completar]
- Lighthouse: [Completar]
- WAVE/axe: [Completar]
- Validador HTML W3C: [Completar]
- Validador CSS W3C: [Completar]

### 13.3 Capturas adicionales

- [Pegar capturas]

