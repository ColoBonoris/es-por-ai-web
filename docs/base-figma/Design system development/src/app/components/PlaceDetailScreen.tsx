import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Star, MapPin, Share2, Heart, Navigation, Map as MapIcon, ExternalLink } from "lucide-react";
import { useState } from "react";

export function PlaceDetailScreen({ placeId, onBack, onWriteReview }: {
  placeId: string;
  onBack: () => void;
  onWriteReview: () => void;
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const place = {
    id: placeId,
    name: "Café de la Plaza",
    category: "Cafetería",
    verified: true,
    rating: 4.8,
    reviews: 127,
    address: "Calle 7 N° 854, La Plata",
    description: "Cafetería acogedora en el corazón de la ciudad. Espacio tranquilo ideal para trabajar o reunirse con amigos. Amplia variedad de cafés de especialidad y opciones de repostería.",
    badges: ["Vegetariano", "Acepta mascotas", "Accesible en silla de ruedas"],
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=600&fit=crop"
    ],
    hours: "Lun-Vie: 8:00-20:00, Sáb-Dom: 9:00-22:00"
  };

  const reviews = [
    {
      id: "1",
      user: "María González",
      avatar: "MG",
      rating: 5,
      date: "Hace 2 días",
      text: "Excelente lugar para trabajar. Muy tranquilo y el café es delicioso. El personal es muy amable y atento.",
      images: ["https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop"]
    },
    {
      id: "2",
      user: "Juan Pérez",
      avatar: "JP",
      rating: 4,
      date: "Hace 1 semana",
      text: "Buen café y muy buen ambiente. Las opciones vegetarianas son variadas y ricas.",
      images: []
    },
    {
      id: "3",
      user: "Ana López",
      avatar: "AL",
      rating: 5,
      date: "Hace 2 semanas",
      text: "Me encanta venir con mi perro. Tienen espacio afuera y siempre traen un bowl de agua. Muy recomendable!",
      images: []
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          <button className="p-2">
            <Share2 className="w-5 h-5" />
          </button>
          <button
            className="p-2"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="overflow-x-auto flex gap-2 px-[var(--spacing-mobile-padding)] py-4 snap-x snap-mandatory">
        {place.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${place.name} ${index + 1}`}
            className="h-64 w-full object-cover rounded-[var(--radius-card)] snap-start shrink-0"
          />
        ))}
      </div>

      <div className="px-[var(--spacing-mobile-padding)] space-y-6">
        {/* Place Info */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1>{place.name}</h1>
                {place.verified && (
                  <Badge className="rounded-full bg-[var(--success)] hover:bg-[var(--success)]/90">
                    Verificado
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">{place.category}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.floor(place.rating)
                      ? "fill-[var(--rating-star)] text-[var(--rating-star)]"
                      : "fill-none text-border"
                  }`}
                />
              ))}
            </div>
            <span className="font-medium">{place.rating}</span>
            <span className="text-muted-foreground">({place.reviews} reseñas)</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {place.badges.map((badge, i) => (
              <Badge key={i} variant="secondary" className="rounded-full">
                {badge}
              </Badge>
            ))}
          </div>
        </div>

        {/* Address */}
        <Card className="rounded-[var(--radius-card)] border-border">
          <CardContent className="p-4 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[var(--warm-accent)] shrink-0 mt-0.5" />
            <div className="flex-1">
              <p>{place.address}</p>
              <p className="text-sm text-muted-foreground mt-1">{place.hours}</p>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <div className="space-y-2">
          <h3>Acerca de este lugar</h3>
          <p className="text-muted-foreground">{place.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="rounded-[var(--radius-button)] flex items-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            Cómo ir
          </Button>
          <Button
            variant="outline"
            className="rounded-[var(--radius-button)] flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Abrir en Maps
          </Button>
        </div>

        <Button
          className="w-full rounded-[var(--radius-button)]"
          onClick={onWriteReview}
        >
          Escribir reseña
        </Button>

        {/* Map Preview */}
        <Card className="rounded-[var(--radius-card)] border-border overflow-hidden">
          <div className="bg-secondary h-48 flex items-center justify-center">
            <MapIcon className="w-12 h-12 text-muted-foreground" />
          </div>
        </Card>

        {/* Reviews */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3>Reseñas ({place.reviews})</h3>
            <button className="text-sm text-[var(--warm-accent)]">Ver todas</button>
          </div>

          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="rounded-[var(--radius-card)] border-border">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <span className="text-sm font-medium">{review.avatar}</span>
                      </div>
                      <div>
                        <p className="font-medium">{review.user}</p>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[var(--rating-star)] text-[var(--rating-star)]" />
                      <span className="text-sm">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm">{review.text}</p>
                  {review.images.length > 0 && (
                    <div className="flex gap-2">
                      {review.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`Review image ${i + 1}`}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
