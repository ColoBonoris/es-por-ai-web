Create a complete UI design system and responsive product prototype for an app called “Es por AI”.

“Es por AI” is a city points-of-interest review app. It works like a simple review platform for places in a city: users can discover places, see them on a map, upload photos, rate with stars, write reviews, save favorites, and ask an AI assistant for recommendations in natural language.

The app should feel modern and familiar. Do not over-innovate common screens like profile, settings, login or forms. Use standard, recognizable mobile and web patterns. The goal is a realistic MVP that is easy to implement with Expo for mobile and Next.js for web/PWA.

Create both:
1. Mobile app screens
2. Responsive web / PWA screens

Both versions should share the same visual system, components, colors, spacing, typography and UI patterns as much as possible.

Core concept:
A clean and simple app to discover, review and recommend city places.
The main entry point is Home.
The Map is a central screen and should be accessible from the main navigation.
The AI assistant is a free feature for now, not premium.
Accessibility filters and place attributes are important, but they are not the main focus of the app. They should exist as useful tags and filters, without dominating the entire interface.

Visual style:
Minimal, clean, editorial and calm, inspired by Notion.
Use a warm light background, white cards, subtle borders, rounded corners, simple typography and warm accent colors.
The interface should feel modern, trustworthy, urban, friendly and easy to use.
Avoid flashy gradients, heavy shadows, corporate blue, overly futuristic AI visuals, cluttered dashboards or experimental navigation.

Color palette:
Background: #F7F4EF
Card / Surface: #FFFFFF
Secondary Surface: #EFE8DD
Primary Text: #1F1F1F
Secondary Text: #6B625A
Border: #DED6CC
Primary Button: #2F2F2F
Primary Button Text: #FFFFFF
Warm Accent: #D97706
Light Warm Accent: #FDE8C7
Rating Star: #F59E0B
Success / Verified: #3F7D58
Error: #C24141
High Contrast Background: #000000
High Contrast Text: #FFFFFF

Typography:
Use a clean sans-serif similar to Inter, Notion or system UI.
Headings should be medium or semibold, not too bold.
Body text should be simple and readable.
Prioritize clarity and good contrast.

Spacing and shape:
Mobile horizontal padding: 20px.
Desktop page padding: 32px to 48px.
Card padding: 16px.
Section spacing: 24px.
Card border radius: 16px.
Buttons and inputs border radius: 12px.
Chips and tags should be pill-shaped.
Photos should have rounded corners.
Use subtle borders instead of strong shadows.

Main reusable components:
- Bottom navigation for mobile
- Sidebar or top navigation for web/PWA
- Place card
- Review card
- Map preview card
- Star rating component
- Search bar
- Filter chips
- Accessibility badges
- Verified place badge
- User preference selector
- Photo upload field
- Primary button
- Secondary warm button
- Floating action button
- Empty state
- Permission request card
- AI assistant call-to-action card
- Map results drawer / bottom sheet
- Settings list item
- Form inputs and text areas

Accessibility badges:
Use clear small chips with icons and text for:
- Accesible en silla de ruedas
- Sin TACC
- Vegetariano
- Vegano
- Kosher
- Acepta mascotas
- Accesibilidad visual
- Verificado

Use Spanish UI labels from Argentina.

MOBILE APP INFORMATION ARCHITECTURE:

AUTH FLOW:

1. Onboarding screen
- Simple slides explaining the app
- Explain that users can discover places, review them, upload photos, search on the map and ask the AI assistant for recommendations
- CTA buttons: Crear cuenta, Iniciar sesión

2. Login screen
- Email and password
- Forgot password link
- Optional biometric login placeholder if it fits naturally
- Keep it simple and standard

3. Register screen
- Name, email, password
- Optional user recommendation preferences:
  silla de ruedas, Sin TACC, vegetariano, vegano, kosher, acepta mascotas, accesibilidad visual
- Explain briefly that these preferences improve recommendations

4. Forgot password screen
- Simple email input
- Submit button

5. Permissions screen
- Location permission
- Camera/photo permission
- Notifications permission
- Explain each permission with simple cards
- Keep this screen clean and not too technical

MAIN MOBILE NAVIGATION:

Use a classic bottom navigation with three main items:
1. Inicio
2. Mapa
3. Más

The Home screen is the entry point.
The Map screen is the central exploration experience.
The More screen is a stack/menu with secondary options.

HOME:

6. Home screen
- Greeting
- Search bar
- Recommendations of the day
- Quick action cards:
  Explorar mapa
  Preguntarle a IAn
  Mis favoritos
- Recent reviews
- Suggested places near the user
- Keep the layout simple, familiar and card-based

MAP:

7. Explore Map screen
- Interactive map area
- Search bar at the top
- Pinpoints on the map
- Filter chips
- Accessibility filters as optional chips
- Bottom drawer / bottom sheet with place cards
- Floating AI assistant button in the lower right corner
- Tapping a place opens the place detail screen
- This should feel like a modern map/search experience

MORE:

8. More menu screen
- My profile
- Settings
- Add new place
- Privacy policy
- Terms and conditions
- Logout
- Use a standard settings/menu list layout

9. My profile screen
- User avatar
- Name
- Basic stats: reseñas, favoritos, lugares cargados
- User preferences/specifications
- Reviewed places
- Saved places
- Keep this screen standard and simple

10. Settings screen
- Theme: claro, oscuro, alto contraste
- Permissions
- Account settings
- Recommendation preferences
- Keep it familiar and simple

SHARED DETAIL SCREENS:

11. Place detail screen
- Photo gallery
- Place name
- Verified badge if verified
- Average rating
- Category
- Address
- Accessibility badges
- Short description
- Buttons:
  Cómo ir
  Abrir en Maps
  Guardar
  Escribir reseña
- Reviews section
- Map preview
- Keep information hierarchy clear

12. Reviews screen
- List of reviews
- Sorting/filtering
- Photo thumbnails
- Star ratings
- Review text
- User avatar/name

13. Write review screen
- Selected place
- Star rating
- Text area
- Photo upload
- Optional accessibility feedback fields
- Submit review button
- Keep the form simple and easy

14. Add new place screen
- Place name
- Address/location
- Category
- Accessibility specifications
- Menu upload or menu text if available
- Brief description
- Photo upload
- Submit for admin approval
- Show state: Pendiente de aprobación
- Mention that verified status is only assigned by an admin
- Keep this as a standard form

AI ASSISTANT:

15. AI recommendation assistant screen
- Assistant name: IAn
- Natural language input
- Suggested questions:
  “¿Dónde puedo ir a tomar café con opciones Sin TACC?”
  “Buscame un lugar tranquilo cerca”
  “Recomendame un lugar para ir con mi perro”
  “¿Dónde puedo almorzar algo vegetariano?”
  “Quiero un lugar lindo para ir a la tarde”
- Recent history
- AI responses should show recommended place cards with short explanations
- Do not make this premium. It is a free feature for now.
- Keep the AI design friendly and simple, not futuristic or overly flashy

WEB / PWA VERSION:

Create equivalent responsive web screens using the same design system.
Desktop layout should use a sidebar or top navigation instead of bottom navigation.
Use wider layouts but keep the same product identity.

Web layout guidance:
- Home with two columns:
  main recommendations/feed
  sidebar shortcuts
- Map page:
  map on the left
  results panel on the right
- Place detail:
  main content
  side panel with actions and map preview
- Profile and settings:
  clean cards and standard layouts
- Add place form:
  wider form layout with grouped sections
- AI assistant:
  chat area with suggested prompts and recommendation cards

Generate these web/PWA screens:
1. Web onboarding / landing
2. Web login
3. Web home
4. Web explore map
5. Web place detail
6. Web write review
7. Web add new place
8. Web profile
9. Web settings
10. Web AI assistant

Design priorities:
- Make the mobile and web versions feel like the same product.
- Reuse the same cards, badges, buttons, inputs and colors.
- Keep screens simple and realistic for an MVP.
- The design should be easy to implement with reusable React components.
- Use common, modern UI patterns.
- Do not over-design standard screens.
- Avoid too many decorative elements.
- Use realistic placeholder content for a city similar to La Plata, Argentina, but do not make it too specific.
- Use Spanish labels in the UI.