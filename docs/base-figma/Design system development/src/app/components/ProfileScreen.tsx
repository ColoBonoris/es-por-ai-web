import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ArrowLeft, Star, Edit } from "lucide-react";

export function ProfileScreen({ onBack }: { onBack: () => void }) {
  const userPreferences = [
    "Vegetariano",
    "Acepta mascotas",
    "Accesible en silla de ruedas"
  ];

  const userReviews = [
    {
      id: "1",
      place: "Café de la Plaza",
      rating: 5,
      text: "Excelente lugar para trabajar. Muy tranquilo y el café es delicioso.",
      date: "Hace 2 días",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=150&fit=crop"
    },
    {
      id: "2",
      place: "Verde Natural",
      rating: 5,
      text: "Las opciones vegetarianas son increíbles. Todo muy fresco y rico.",
      date: "Hace 1 semana",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=150&fit=crop"
    }
  ];

  const savedPlaces = [
    {
      id: "1",
      name: "Café de la Plaza",
      category: "Cafetería",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=150&fit=crop"
    },
    {
      id: "2",
      name: "La Parrilla del Centro",
      category: "Restaurante",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=150&fit=crop"
    },
    {
      id: "3",
      name: "Verde Natural",
      category: "Comida saludable",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=150&fit=crop"
    }
  ];

  const addedPlaces = [
    {
      id: "1",
      name: "Heladería Artesanal",
      category: "Heladería",
      status: "Aprobado",
      date: "15 Abr 2026"
    },
    {
      id: "2",
      name: "Librería del Pasaje",
      category: "Librería",
      status: "Pendiente",
      date: "8 May 2026"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3>Mi perfil</h3>
        <div className="w-9"></div>
      </div>

      <div className="p-[var(--spacing-mobile-padding)] space-y-6">
        {/* User Info */}
        <Card className="rounded-[var(--radius-card)] border-border">
          <CardContent className="p-6 text-center space-y-4">
            <div className="flex justify-center">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-[var(--warm-accent)] text-white text-3xl">
                  MG
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h2>María González</h2>
              <p className="text-muted-foreground">maria.gonzalez@email.com</p>
            </div>
            <Button variant="outline" className="rounded-[var(--radius-button)] w-full">
              <Edit className="w-4 h-4 mr-2" />
              Editar perfil
            </Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="rounded-[var(--radius-card)] border-border">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-semibold text-[var(--warm-accent)]">12</p>
              <p className="text-sm text-muted-foreground">Reseñas</p>
            </CardContent>
          </Card>
          <Card className="rounded-[var(--radius-card)] border-border">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-semibold text-[var(--warm-accent)]">8</p>
              <p className="text-sm text-muted-foreground">Favoritos</p>
            </CardContent>
          </Card>
          <Card className="rounded-[var(--radius-card)] border-border">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-semibold text-[var(--warm-accent)]">3</p>
              <p className="text-sm text-muted-foreground">Lugares</p>
            </CardContent>
          </Card>
        </div>

        {/* Preferences */}
        <Card className="rounded-[var(--radius-card)] border-border">
          <CardContent className="p-4 space-y-3">
            <h4>Mis preferencias</h4>
            <div className="flex flex-wrap gap-2">
              {userPreferences.map((pref, i) => (
                <Badge key={i} variant="secondary" className="rounded-full">
                  {pref}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="w-full grid grid-cols-3 rounded-[var(--radius-button)]">
            <TabsTrigger value="reviews">Reseñas</TabsTrigger>
            <TabsTrigger value="saved">Guardados</TabsTrigger>
            <TabsTrigger value="added">Mis lugares</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-3 mt-4">
            {userReviews.map((review) => (
              <Card key={review.id} className="rounded-[var(--radius-card)] border-border">
                <CardContent className="p-4 space-y-3">
                  <div className="flex gap-3">
                    <img
                      src={review.image}
                      alt={review.place}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="line-clamp-1">{review.place}</h4>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-[var(--rating-star)] text-[var(--rating-star)]" />
                          <span className="text-sm">{review.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="saved" className="space-y-3 mt-4">
            {savedPlaces.map((place) => (
              <Card key={place.id} className="rounded-[var(--radius-card)] border-border">
                <div className="flex gap-3">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-24 h-24 object-cover rounded-l-[var(--radius-card)]"
                  />
                  <CardContent className="flex-1 p-3 space-y-1">
                    <h4 className="line-clamp-1">{place.name}</h4>
                    <p className="text-sm text-muted-foreground">{place.category}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[var(--rating-star)] text-[var(--rating-star)]" />
                      <span className="text-sm">{place.rating}</span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="added" className="space-y-3 mt-4">
            {addedPlaces.map((place) => (
              <Card key={place.id} className="rounded-[var(--radius-card)] border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4>{place.name}</h4>
                      <p className="text-sm text-muted-foreground">{place.category}</p>
                      <p className="text-xs text-muted-foreground mt-1">{place.date}</p>
                    </div>
                    <Badge
                      variant={place.status === "Aprobado" ? "default" : "secondary"}
                      className="rounded-full"
                      style={
                        place.status === "Aprobado"
                          ? { backgroundColor: "var(--success)", color: "white" }
                          : undefined
                      }
                    >
                      {place.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
