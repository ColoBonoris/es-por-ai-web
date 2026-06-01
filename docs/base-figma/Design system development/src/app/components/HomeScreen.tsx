import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Search, Map, MessageSquare, Heart, Star, MapPin } from "lucide-react";

export function HomeScreen({ onNavigate }: { onNavigate: (screen: string, placeId?: string) => void }) {
  const quickActions = [
    { icon: <Map className="w-6 h-6" />, label: "Explorar mapa", action: "map" },
    { icon: <MessageSquare className="w-6 h-6" />, label: "Preguntarle a IAn", action: "ai" },
    { icon: <Heart className="w-6 h-6" />, label: "Mis favoritos", action: "favorites", fill: true }
  ];

  const recommendations = [
    {
      id: "1",
      name: "Café de la Plaza",
      category: "Cafetería",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 127,
      badges: ["Vegetariano", "Acepta mascotas"],
      verified: true
    },
    {
      id: "2",
      name: "La Parrilla del Centro",
      category: "Restaurante",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 89,
      badges: ["Sin TACC"],
      verified: true
    },
    {
      id: "3",
      name: "Verde Natural",
      category: "Comida saludable",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 203,
      badges: ["Vegetariano", "Vegano", "Sin TACC"],
      verified: false
    }
  ];

  const recentReviews = [
    {
      place: "Café de la Plaza",
      user: "María González",
      rating: 5,
      text: "Excelente lugar para trabajar. Muy tranquilo y el café es delicioso.",
      time: "Hace 2 horas"
    },
    {
      place: "La Parrilla del Centro",
      user: "Juan Pérez",
      rating: 4,
      text: "Buena comida y atención. Las opciones sin TACC son variadas.",
      time: "Hace 5 horas"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-[var(--spacing-mobile-padding)] space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div>
            <h2>Hola! 👋</h2>
            <p className="text-muted-foreground">¿Qué querés descubrir hoy?</p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar lugares..."
              className="pl-12 rounded-[var(--radius-button)] bg-card"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="rounded-[var(--radius-card)] border-border cursor-pointer hover:border-[var(--warm-accent)] transition-colors"
              onClick={() => onNavigate(action.action)}
            >
              <CardContent className="p-4 flex flex-col items-center gap-2 text-center">
                <div className="text-[var(--warm-accent)]">
                  {action.label === "Mis favoritos" ? (
                    <Heart className="w-6 h-6 fill-[var(--warm-accent)]" />
                  ) : (
                    action.icon
                  )}
                </div>
                <p className="text-xs">{action.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3>Recomendaciones del día</h3>
            <button className="text-sm text-[var(--warm-accent)]">Ver todo</button>
          </div>

          <div className="space-y-4">
            {recommendations.map((place) => (
              <Card
                key={place.id}
                className="rounded-[var(--radius-card)] border-border overflow-hidden cursor-pointer hover:border-[var(--warm-accent)] transition-colors"
                onClick={() => onNavigate("place-detail", place.id)}
              >
                <div className="flex gap-4">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-24 h-24 object-cover"
                  />
                  <CardContent className="flex-1 p-3 space-y-2">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="line-clamp-1">{place.name}</h4>
                        {place.verified && (
                          <Badge className="rounded-full bg-[var(--success)] hover:bg-[var(--success)]/90 text-xs px-2 py-0 shrink-0">
                            ✓
                          </Badge>
                        )}
                      </div>
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
        </div>

        {/* Recent Reviews */}
        <div className="space-y-4">
          <h3>Reseñas recientes</h3>
          <div className="space-y-3">
            {recentReviews.map((review, index) => (
              <Card key={index} className="rounded-[var(--radius-card)] border-border">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{review.place}</p>
                      <p className="text-sm text-muted-foreground">{review.user}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[var(--rating-star)] text-[var(--rating-star)]" />
                      <span className="text-sm">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm">{review.text}</p>
                  <p className="text-xs text-muted-foreground">{review.time}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Nearby Places */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[var(--warm-accent)]" />
            <h3>Cerca tuyo</h3>
          </div>
          <Card className="rounded-[var(--radius-card)] border-border">
            <CardContent className="p-4 text-center text-muted-foreground">
              <p className="text-sm">Permitir acceso a tu ubicación para ver lugares cerca</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
