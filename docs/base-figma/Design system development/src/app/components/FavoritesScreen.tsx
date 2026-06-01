import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, Heart } from "lucide-react";

export function FavoritesScreen({ onPlaceClick }: { onPlaceClick: (placeId: string) => void }) {
  const savedPlaces = [
    {
      id: "1",
      name: "Café de la Plaza",
      category: "Cafetería",
      rating: 4.8,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
      badges: ["Vegetariano", "Acepta mascotas"]
    },
    {
      id: "2",
      name: "La Parrilla del Centro",
      category: "Restaurante",
      rating: 4.6,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
      badges: ["Sin TACC"]
    },
    {
      id: "3",
      name: "Verde Natural",
      category: "Comida saludable",
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
      badges: ["Vegetariano", "Vegano", "Sin TACC"]
    },
    {
      id: "4",
      name: "Panadería Artesanal",
      category: "Panadería",
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
      badges: ["Sin TACC"]
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-[var(--spacing-mobile-padding)] space-y-6">
        <div className="flex items-center gap-3">
          <Heart className="w-6 h-6 text-[var(--warm-accent)] fill-[var(--warm-accent)]" />
          <div>
            <h2>Mis favoritos</h2>
            <p className="text-sm text-muted-foreground">{savedPlaces.length} lugares guardados</p>
          </div>
        </div>

        <div className="space-y-4">
          {savedPlaces.map((place) => (
            <Card
              key={place.id}
              className="rounded-[var(--radius-card)] border-border overflow-hidden cursor-pointer hover:border-[var(--warm-accent)] transition-colors"
              onClick={() => onPlaceClick(place.id)}
            >
              <div className="flex gap-4">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-24 h-24 object-cover"
                />
                <CardContent className="flex-1 p-3 space-y-2">
                  <div>
                    <h4 className="line-clamp-1">{place.name}</h4>
                    <p className="text-sm text-muted-foreground">{place.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[var(--rating-star)] text-[var(--rating-star)]" />
                      <span className="text-sm">{place.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({place.reviews})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {place.badges.slice(0, 2).map((badge, i) => (
                      <Badge key={i} variant="secondary" className="rounded-full text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {savedPlaces.length === 0 && (
          <Card className="rounded-[var(--radius-card)] border-border">
            <CardContent className="p-12 text-center">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3>No hay favoritos</h3>
              <p className="text-muted-foreground mt-2">
                Guardá lugares para encontrarlos rápido después
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
