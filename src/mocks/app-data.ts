import type {
  AccessibilityFeature,
  FeatureDefinition,
  Place,
  Review,
  UserProfile
} from "@/types/domain";

export const accessibilityFeatures: FeatureDefinition[] = [
  {
    id: "wheelchair",
    label: "Accesible en silla de ruedas",
    shortLabel: "Silla de ruedas"
  },
  {
    id: "gluten_free",
    label: "Sin TACC",
    shortLabel: "Sin TACC"
  },
  {
    id: "vegetarian",
    label: "Vegetariano",
    shortLabel: "Vegetariano"
  },
  {
    id: "vegan",
    label: "Vegano",
    shortLabel: "Vegano"
  },
  {
    id: "pet_friendly",
    label: "Acepta mascotas",
    shortLabel: "Mascotas"
  },
  {
    id: "visual_accessibility",
    label: "Accesibilidad visual",
    shortLabel: "Acc. visual"
  },
  {
    id: "accessible_bathroom",
    label: "Baño accesible",
    shortLabel: "Baño acc."
  },
  {
    id: "ramp_available",
    label: "Rampa disponible",
    shortLabel: "Rampa"
  },
  {
    id: "quiet_environment",
    label: "Espacio silencioso",
    shortLabel: "Silencioso"
  }
];

export const placeCategories = [
  "Cafetería",
  "Restaurante",
  "Bar",
  "Panadería",
  "Heladería",
  "Comida saludable",
  "Librería",
  "Farmacia",
  "Supermercado",
  "Centro cultural",
  "Otro"
];

export const suggestedQuestions = [
  "¿Dónde puedo ir a tomar café con opciones Sin TACC?",
  "Buscame un lugar tranquilo cerca",
  "Recomendame un lugar para ir con mi perro",
  "¿Dónde puedo almorzar algo vegetariano?",
  "Quiero un lugar lindo para ir a la tarde"
];

export const seedPlaces: Place[] = [
  {
    id: "cafe-de-la-plaza",
    name: "Café de la Plaza",
    category: "Cafetería",
    description:
      "Cafetería acogedora en el corazón de la ciudad. Espacio tranquilo para trabajar, leer o encontrarse con amigos.",
    address: "Calle 7 N° 854, La Plata",
    hours: "Lun-Vie: 8:00-20:00, Sáb-Dom: 9:00-22:00",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=600&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 127,
    badges: ["vegetarian", "pet_friendly", "wheelchair", "quiet_environment"],
    verified: true,
    distance: "A 8 cuadras",
    coordinates: { lat: -34.92145, lng: -57.95453 }
  },
  {
    id: "parrilla-del-centro",
    name: "La Parrilla del Centro",
    category: "Restaurante",
    description:
      "Restaurante de barrio con platos clásicos, atención simple y opciones aptas para personas que buscan comer sin TACC.",
    address: "Diagonal 74 N° 1021, La Plata",
    hours: "Todos los días: 12:00-00:00",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop"
    ],
    rating: 4.6,
    reviewCount: 89,
    badges: ["gluten_free", "accessible_bathroom"],
    verified: true,
    distance: "A 1.2 km",
    coordinates: { lat: -34.9186, lng: -57.9488 }
  },
  {
    id: "verde-natural",
    name: "Verde Natural",
    category: "Comida saludable",
    description:
      "Cocina fresca con menú vegetariano y vegano, jugos naturales y mesas amplias para almorzar sin apuro.",
    address: "Calle 50 N° 612, La Plata",
    hours: "Lun-Sáb: 9:00-18:30",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 203,
    badges: ["vegetarian", "vegan", "gluten_free", "quiet_environment"],
    verified: false,
    distance: "A 900 m",
    coordinates: { lat: -34.9144, lng: -57.9538 }
  },
  {
    id: "panaderia-artesanal",
    name: "Panadería Artesanal",
    category: "Panadería",
    description:
      "Panadería de producción chica con medialunas, panes de masa madre y una selección diaria de productos sin TACC.",
    address: "Calle 12 N° 441, La Plata",
    hours: "Lun-Dom: 7:30-19:00",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?w=800&h=600&fit=crop"
    ],
    rating: 4.7,
    reviewCount: 156,
    badges: ["gluten_free", "ramp_available"],
    verified: true,
    distance: "A 650 m",
    coordinates: { lat: -34.9266, lng: -57.9603 }
  },
  {
    id: "bar-la-esquina",
    name: "Bar La Esquina",
    category: "Bar",
    description:
      "Bar relajado con mesas al aire libre, buena música y espacio para ir con mascotas durante la tarde.",
    address: "Calle 54 N° 789, La Plata",
    hours: "Mar-Dom: 18:00-02:00",
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=800&h=600&fit=crop"
    ],
    rating: 4.5,
    reviewCount: 98,
    badges: ["pet_friendly", "ramp_available"],
    verified: false,
    distance: "A 1.8 km",
    coordinates: { lat: -34.9127, lng: -57.9468 }
  }
];

export const seedReviews: Review[] = [
  {
    id: "review-1",
    placeId: "cafe-de-la-plaza",
    userName: "María González",
    userAvatar: "MG",
    rating: 5,
    dateLabel: "Hace 2 días",
    text: "Excelente lugar para trabajar. Muy tranquilo y el café es delicioso. El personal fue muy amable.",
    images: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop"
    ],
    accessibilityFeedback: ["pet_friendly", "vegetarian"]
  },
  {
    id: "review-2",
    placeId: "parrilla-del-centro",
    userName: "Juan Pérez",
    userAvatar: "JP",
    rating: 4,
    dateLabel: "Hace 5 horas",
    text: "Buena comida y atención. Las opciones sin TACC son variadas y están bien señalizadas.",
    images: [],
    accessibilityFeedback: ["gluten_free"]
  },
  {
    id: "review-3",
    placeId: "verde-natural",
    userName: "Ana López",
    userAvatar: "AL",
    rating: 5,
    dateLabel: "Hace 1 semana",
    text: "Me encantó para almorzar algo liviano. Muchas opciones vegetarianas y veganas.",
    images: [],
    accessibilityFeedback: ["vegetarian", "vegan"]
  }
];

export const defaultProfile: UserProfile = {
  id: "demo-user",
  name: "María González",
  email: "demo@esporai.dev",
  avatar: "MG",
  stats: {
    reviews: 12,
    favorites: 0,
    submittedPlaces: 3
  },
  preferences: {
    accessibilityFeatures: ["gluten_free", "pet_friendly"]
  },
  settings: {
    theme: "light",
    notifications: {
      reviews: true,
      recommendations: false
    },
    permissions: {
      location: false,
      camera: false,
      notifications: false
    }
  }
};

export function getFeatureLabel(feature: AccessibilityFeature) {
  return accessibilityFeatures.find((item) => item.id === feature)?.label ?? feature;
}
