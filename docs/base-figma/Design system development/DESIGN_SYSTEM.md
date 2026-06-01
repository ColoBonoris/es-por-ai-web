# Es por AI - Design System

## Overview
"Es por AI" es una app de reseñas de puntos de interés de la ciudad con un estilo minimalista, cálido y limpio inspirado en Notion.

## Identidad Visual
- **Estilo**: Minimal, clean, editorial, calm
- **Inspiración**: Notion
- **Prioridades**: Moderno, confiable, urbano, amigable, fácil de usar
- **Evitar**: Gradientes llamativos, sombras pesadas, azul corporativo, visuales AI futuristas, dashboards saturados, navegación experimental

## Paleta de Colores

### Light Mode
- **Background**: `#F7F4EF` (warm light background)
- **Card/Surface**: `#FFFFFF` (white cards)
- **Secondary Surface**: `#EFE8DD`
- **Primary Text**: `#1F1F1F`
- **Secondary Text**: `#6B625A`
- **Border**: `#DED6CC` (subtle borders)
- **Primary Button**: `#2F2F2F`
- **Primary Button Text**: `#FFFFFF`
- **Warm Accent**: `#D97706`
- **Light Warm Accent**: `#FDE8C7`
- **Rating Star**: `#F59E0B`
- **Success/Verified**: `#3F7D58`
- **Error**: `#C24141`

### Dark Mode
Adaptación oscura con los mismos tonos cálidos

### High Contrast Mode
Alto contraste con `#000000` background y `#FFFFFF` text

## Tipografía
- **Font Family**: Clean sans-serif (Inter, Notion, system UI)
- **Headings**: Medium o semibold (no muy bold)
- **Body**: Simple y legible
- **Prioridad**: Claridad y buen contraste

## Espaciado
- **Mobile Horizontal Padding**: 20px
- **Desktop Page Padding**: 32px - 48px
- **Card Padding**: 16px
- **Section Spacing**: 24px

## Formas y Bordes
- **Card Border Radius**: 16px
- **Buttons/Inputs Border Radius**: 12px
- **Chips/Tags**: Pill-shaped (rounded-full)
- **Photos**: Rounded corners
- **Estilo de Bordes**: Subtle borders en lugar de sombras fuertes

## Componentes Principales Reutilizables

### Navegación
- **Mobile**: Bottom navigation (Inicio, Mapa, Más)
- **Web/PWA**: Sidebar o top navigation

### Cards
- `PlaceCard`: Tarjeta de lugar con foto, nombre, rating, badges
- `ReviewCard`: Reseña con usuario, rating, texto, fotos
- `MapPreviewCard`: Vista previa del mapa

### Inputs y Forms
- `SearchBar`: Barra de búsqueda
- `FilterChips`: Chips de filtro
- `StarRating`: Componente de calificación con estrellas
- Form inputs y text areas estándar

### Badges y Estados
- `AccessibilityBadge`: Badges para:
  - Accesible en silla de ruedas
  - Sin TACC
  - Vegetariano
  - Vegano
  - Kosher
  - Acepta mascotas
  - Accesibilidad visual
- `VerifiedBadge`: Badge de lugar verificado
- `EmptyState`: Estado vacío

### Botones y Acciones
- `PrimaryButton`: Botón principal (#2F2F2F)
- `SecondaryWarmButton`: Botón secundario cálido
- `FloatingActionButton`: FAB para asistente AI

### Otros
- `PermissionRequestCard`: Tarjeta de solicitud de permisos
- `AIAssistantCard`: Call-to-action del asistente
- `MapResultsDrawer`: Bottom sheet con resultados del mapa
- `SettingsListItem`: Item de lista para configuración
- `PhotoUploadField`: Campo de carga de fotos

## Arquitectura de Información

### Mobile App (Bottom Navigation)
1. **Inicio**: Entry point, recomendaciones, acciones rápidas
2. **Mapa**: Experiencia central de exploración
3. **Más**: Stack/menú con opciones secundarias

### Web/PWA
- Layouts más amplios
- Sidebar o top navigation
- Misma identidad de producto que mobile

## Flujos Principales

### 1. Auth Flow
- Onboarding
- Login
- Register (con preferencias de accesibilidad opcionales)
- Forgot password
- Permissions screen

### 2. Main Navigation
- Home (recomendaciones, quick actions, recent reviews)
- Map (mapa interactivo, filtros, bottom drawer)
- More (profile, settings, add place, legal)

### 3. Detail Screens
- Place detail (galería, info, reviews, map)
- Reviews list
- Write review
- Add new place

### 4. AI Assistant
- IAn (nombre del asistente)
- Natural language input
- Preguntas sugeridas
- Respuestas con place cards
- Feature gratuito (no premium)

## Principios de Implementación

### React Components
- Usar componentes reutilizables
- Colocar componentes en `src/app/components/`
- Mantener la jerarquía de información clara
- Usar layouts estándar y familiares

### Accesibilidad
- Filtros y atributos importantes pero no dominantes
- Tags y filtros útiles sin saturar la interfaz
- Soporte para silla de ruedas, dietas especiales, mascotas, etc.

### Contenido
- **Idioma**: Spanish (Argentina)
- **Contenido placeholder**: Lugares similares a La Plata, Argentina
- No ser demasiado específico con los placeholders

### Stack Técnico
- **Mobile**: Expo (React Native)
- **Web/PWA**: Next.js
- **Shared**: Mismo visual system, componentes, colores, spacing, tipografía

## Estado Actual

✅ **Completado**:
- Tokens de diseño en `src/styles/theme.css`
- Paleta de colores (light, dark, high contrast)
- Espaciado y border radius
- Componentes base de UI (botones, cards, badges, inputs, etc.)

🔄 **Próximos pasos**:
1. Crear componentes específicos de "Es por AI" (PlaceCard, ReviewCard, StarRating, etc.)
2. Implementar auth screens
3. Implementar home y detail screens
4. Implementar map screen
5. Crear más stack (profile, settings, etc.)
6. Conectar todos los flujos
7. Setup versión final

## Notas de Diseño
- No sobre-diseñar pantallas estándar (profile, settings, login, forms)
- Usar patrones móviles y web reconocibles y estándar
- El objetivo es un MVP realista y fácil de implementar
- Evitar elementos decorativos excesivos
- Mantener la interfaz simple, familiar y basada en cards
