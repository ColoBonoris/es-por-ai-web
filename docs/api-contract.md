# API Contract V1

Este contrato define la superficie esperada para desarrollar el backend de `Es por AI`. La v1 de frontend sigue usando mocks, pero los servicios deben poder migrar a estos endpoints sin cambiar pantallas.

## Convenciones

- Base path sugerido: `/api/v1`.
- Autenticación: cookies HTTP-only de access token y refresh token.
- Requests y responses usan JSON.
- Fechas en ISO 8601.
- IDs como `string`.
- Listados paginados usan `page`, `pageSize`, `total` y `totalPages`.
- El backend nunca acepta `verified` desde formularios públicos; solo administración puede asignarlo.

## Error común

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Revisá los campos marcados.",
    "fieldErrors": {
      "email": ["Ingresá un email válido."]
    }
  }
}
```

Códigos mínimos:

- `UNAUTHORIZED`: falta sesión o credenciales inválidas.
- `FORBIDDEN`: sesión válida sin permiso suficiente.
- `NOT_FOUND`: recurso inexistente.
- `VALIDATION_ERROR`: datos inválidos.
- `CONFLICT`: recurso duplicado o estado incompatible.
- `INTERNAL_ERROR`: error inesperado.

## Tipos base

Los tipos fuente del frontend viven en `src/types/domain.ts` y `src/types/api.ts`.

### AccessibilityFeature

```ts
type AccessibilityFeature =
  | "wheelchair"
  | "gluten_free"
  | "vegetarian"
  | "vegan"
  | "kosher"
  | "pet_friendly"
  | "visual_accessibility";
```

### Place

Campos esperados:

- `id`, `name`, `category`, `description`, `address`, `hours`
- `image`, `images`
- `rating`, `reviewCount`
- `badges: AccessibilityFeature[]`
- `verified`
- `distance?`
- `coordinates: { lat: number; lng: number }`
- `isFavorite?`

### Review

Campos esperados:

- `id`, `placeId`, `userName`, `userAvatar`
- `rating` entre 1 y 5
- `dateLabel` o fecha real si backend ya la expone
- `text`
- `images`
- `accessibilityFeedback?`

## Auth

### POST `/auth/register`

Request:

```json
{
  "name": "María González",
  "email": "maria@email.com",
  "password": "Acceso123!",
  "preferences": {
    "accessibilityFeatures": ["gluten_free", "pet_friendly"]
  }
}
```

Response `201`:

```json
{
  "user": {
    "id": "user_123",
    "name": "María González",
    "email": "maria@email.com",
    "role": "CLIENT",
    "preferences": {
      "accessibilityFeatures": ["gluten_free", "pet_friendly"]
    }
  }
}
```

Errores: `VALIDATION_ERROR`, `CONFLICT`.

### POST `/auth/login`

Request:

```json
{
  "email": "demo@esporai.dev",
  "password": "Acceso123!"
}
```

Response `200`:

```json
{
  "user": {
    "id": "user_123",
    "name": "María González",
    "email": "demo@esporai.dev",
    "role": "CLIENT"
  }
}
```

Errores: `UNAUTHORIZED`, `VALIDATION_ERROR`.

### POST `/auth/logout`

Response `200`:

```json
{ "ok": true }
```

### GET `/auth/me`

Response `200`:

```json
{
  "user": null
}
```

o:

```json
{
  "user": {
    "id": "user_123",
    "name": "María González",
    "email": "demo@esporai.dev",
    "role": "CLIENT"
  }
}
```

### POST `/auth/forgot-password`

Request:

```json
{
  "email": "maria@email.com"
}
```

Response `200`:

```json
{ "user": null }
```

Por seguridad, no debe revelar si el email existe.

## User

Todas las rutas requieren sesión.

### GET `/users/me`

Response `200`:

```json
{
  "user": {
    "id": "user_123",
    "name": "María González",
    "email": "demo@esporai.dev",
    "avatar": "MG",
    "stats": {
      "reviews": 12,
      "favorites": 4,
      "submittedPlaces": 3
    },
    "preferences": {
      "accessibilityFeatures": ["gluten_free"]
    },
    "settings": {
      "theme": "light",
      "notifications": {
        "reviews": true,
        "recommendations": false
      },
      "permissions": {
        "location": false,
        "camera": false,
        "notifications": false
      }
    }
  }
}
```

### PATCH `/users/me/preferences`

Request:

```json
{
  "preferences": {
    "accessibilityFeatures": ["gluten_free", "pet_friendly"]
  }
}
```

Response `200`: mismo shape que `GET /users/me`.

### PATCH `/users/me/settings`

Request:

```json
{
  "settings": {
    "theme": "high-contrast",
    "notifications": {
      "reviews": true,
      "recommendations": true
    },
    "permissions": {
      "location": true,
      "camera": false,
      "notifications": true
    }
  }
}
```

Response `200`: mismo shape que `GET /users/me`.

### PATCH `/users/me/permissions`

Request:

```json
{
  "permissions": {
    "location": true,
    "camera": true,
    "notifications": false
  }
}
```

Response `200`: mismo shape que `GET /users/me`.

## Places

### GET `/places`

Query params:

- `query?: string`
- `category?: string`
- `features?: string`
- `page?: number`
- `pageSize?: number`
- `lat?: number`
- `lng?: number`

`features` puede enviarse como CSV: `gluten_free,pet_friendly`.

Response `200`:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 0,
    "totalPages": 0
  }
}
```

### GET `/places/:placeId`

Response `200`:

```json
{
  "place": {
    "id": "cafe-de-la-plaza",
    "name": "Café de la Plaza",
    "category": "Cafetería",
    "description": "Cafetería acogedora...",
    "address": "Calle 7 N° 854, La Plata",
    "hours": "Lun-Vie: 8:00-20:00",
    "image": "https://...",
    "images": ["https://..."],
    "rating": 4.8,
    "reviewCount": 127,
    "badges": ["vegetarian", "pet_friendly"],
    "verified": true,
    "distance": "A 8 cuadras",
    "coordinates": {
      "lat": -34.92145,
      "lng": -57.95453
    },
    "isFavorite": false
  }
}
```

Errores: `NOT_FOUND`.

### POST `/places`

Requiere sesión.

Request:

```json
{
  "name": "Nuevo café",
  "address": "Calle 10 N° 123",
  "category": "Cafetería",
  "description": "Descripción breve.",
  "coordinates": {
    "lat": -34.92145,
    "lng": -57.95453
  },
  "badges": ["gluten_free"],
  "images": ["https://..."],
  "menuText": "Opcional"
}
```

Response `201`:

```json
{
  "place": {
    "id": "submission_123",
    "name": "Nuevo café",
    "status": "pending",
    "submittedAt": "2026-06-01T00:00:00.000Z"
  }
}
```

Reglas:

- `name`, `address` y `category` son obligatorios.
- `coordinates` es obligatorio y sale de la selección manual en el mapa.
- `verified` no se acepta en el request.
- El estado inicial es `pending`.

## Favorites

Todas las rutas requieren sesión.

### GET `/favorites`

Response `200`:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 0,
    "totalPages": 0
  }
}
```

### POST `/favorites/:placeId`

Response `200`:

```json
{
  "placeId": "cafe-de-la-plaza",
  "isFavorite": true
}
```

### DELETE `/favorites/:placeId`

Response `200`:

```json
{
  "placeId": "cafe-de-la-plaza",
  "isFavorite": false
}
```

## Reviews

### GET `/places/:placeId/reviews`

Response `200`:

```json
{
  "reviews": []
}
```

### POST `/places/:placeId/reviews`

Requiere sesión.

Request:

```json
{
  "rating": 5,
  "text": "Excelente lugar para trabajar.",
  "images": ["https://..."],
  "accessibilityFeedback": ["pet_friendly"]
}
```

Response `201`:

```json
{
  "review": {
    "id": "review_123",
    "placeId": "cafe-de-la-plaza",
    "userName": "María González",
    "userAvatar": "MG",
    "rating": 5,
    "dateLabel": "Recién",
    "text": "Excelente lugar para trabajar.",
    "images": [],
    "accessibilityFeedback": ["pet_friendly"]
  }
}
```

Reglas:

- `rating` debe estar entre 1 y 5.
- `text` es obligatorio.
- `images` puede ser vacío.

### GET `/reviews/recent`

Response `200`:

```json
{
  "reviews": []
}
```

## Metadata

### GET `/metadata/categories`

Response `200`:

```json
{
  "categories": ["Cafetería", "Restaurante"]
}
```

### GET `/metadata/accessibility-features`

Response `200`:

```json
{
  "accessibilityFeatures": [
    {
      "id": "gluten_free",
      "label": "Sin TACC",
      "shortLabel": "Sin TACC"
    }
  ]
}
```

## Admin

Todas las rutas requieren sesión `ADMIN`.

### GET `/admin/users`

Query params:

- `page?: number`
- `pageSize?: number`
- `query?: string`

Response `200`: listado paginado de usuarios.

### GET `/admin/place-submissions`

Query params:

- `page?: number`
- `pageSize?: number`
- `query?: string`

Response `200`:

```json
{
  "data": [
    {
      "id": "place_123",
      "name": "Nuevo café",
      "address": "Calle 10 N° 123",
      "category": "Cafetería",
      "description": "Descripción breve.",
      "coordinates": {
        "lat": -34.92145,
        "lng": -57.95453
      },
      "badges": ["gluten_free"],
      "images": [],
      "status": "pending",
      "submittedAt": "2026-06-18T00:00:00.000Z",
      "submittedBy": "user_123"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

### POST `/admin/place-submissions/:submissionId/approve`

Request:

```json
{
  "coordinates": {
    "lat": -34.92145,
    "lng": -57.95453
  }
}
```

Response `201`: crea el lugar publicado y marca la solicitud como `approved`.

### POST `/admin/place-submissions/:submissionId/reject`

Response `201`: marca la solicitud como `rejected` sin publicar el lugar.

## Assistant Placeholder

### POST `/assistant/recommendations`

Requiere sesión. En v1 no usa IA real; puede responder con reglas simples.

Request:

```json
{
  "question": "¿Dónde puedo tomar café con opciones Sin TACC?"
}
```

Response `200`:

```json
{
  "message": "Encontré estos lugares que podrían interesarte:",
  "recommendations": [
    {
      "place": {},
      "reason": "Coincide con tu búsqueda y tiene buenas reseñas."
    }
  ]
}
```
