import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { ArrowLeft, Star, Upload, X } from "lucide-react";
import { useState } from "react";

export function WriteReviewScreen({ onBack, onSubmit }: {
  onBack: () => void;
  onSubmit: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const place = {
    name: "Café de la Plaza",
    category: "Cafetería"
  };

  const accessibilityOptions = [
    "Accesible en silla de ruedas",
    "Sin TACC",
    "Vegetariano",
    "Vegano",
    "Acepta mascotas",
    "Accesibilidad visual"
  ];

  const toggleBadge = (badge: string) => {
    setSelectedBadges(prev =>
      prev.includes(badge)
        ? prev.filter(b => b !== badge)
        : [...prev, badge]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3>Escribir reseña</h3>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={rating === 0 || reviewText.trim() === ""}
          className="rounded-[var(--radius-button)]"
        >
          Publicar
        </Button>
      </div>

      <div className="p-[var(--spacing-mobile-padding)] space-y-6">
        {/* Place Info */}
        <Card className="rounded-[var(--radius-card)] border-border">
          <CardContent className="p-4">
            <h4>{place.name}</h4>
            <p className="text-sm text-muted-foreground">{place.category}</p>
          </CardContent>
        </Card>

        {/* Rating */}
        <div className="space-y-3">
          <Label>¿Cómo fue tu experiencia?</Label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-10 h-10 ${
                    star <= (hoverRating || rating)
                      ? "fill-[var(--rating-star)] text-[var(--rating-star)]"
                      : "fill-none text-border"
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-sm text-muted-foreground">
              {rating === 1 && "Muy malo"}
              {rating === 2 && "Malo"}
              {rating === 3 && "Regular"}
              {rating === 4 && "Bueno"}
              {rating === 5 && "Excelente"}
            </p>
          )}
        </div>

        {/* Review Text */}
        <div className="space-y-2">
          <Label htmlFor="review">Contanos más sobre tu experiencia</Label>
          <Textarea
            id="review"
            placeholder="Compartí detalles sobre tu visita, la comida, el servicio, el ambiente..."
            className="rounded-[var(--radius-button)] min-h-32"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <p className="text-xs text-muted-foreground text-right">
            {reviewText.length}/500
          </p>
        </div>

        {/* Photos */}
        <div className="space-y-3">
          <Label>Fotos (opcional)</Label>
          <div className="grid grid-cols-3 gap-3">
            {uploadedImages.map((img, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={img}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  className="absolute top-1 right-1 p-1 bg-destructive rounded-full"
                  onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== index))}
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
            {uploadedImages.length < 6 && (
              <button className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-[var(--warm-accent)] transition-colors">
                <Upload className="w-6 h-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Subir foto</span>
              </button>
            )}
          </div>
        </div>

        {/* Accessibility Feedback */}
        <div className="space-y-3">
          <div>
            <Label>Características del lugar (opcional)</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Ayudá a otros con información sobre accesibilidad y opciones especiales
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {accessibilityOptions.map((option) => (
              <Badge
                key={option}
                variant={selectedBadges.includes(option) ? "default" : "secondary"}
                className="rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => toggleBadge(option)}
                style={
                  selectedBadges.includes(option)
                    ? {
                        backgroundColor: "var(--warm-accent)",
                        color: "white"
                      }
                    : undefined
                }
              >
                {option}
              </Badge>
            ))}
          </div>
        </div>

        {/* Guidelines */}
        <Card className="rounded-[var(--radius-card)] border-border bg-secondary/50">
          <CardContent className="p-4">
            <h4 className="mb-2">Pautas para reseñas</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Sé respetuoso y objetivo</li>
              <li>• Compartí detalles útiles para otros usuarios</li>
              <li>• Evitá contenido ofensivo o discriminatorio</li>
              <li>• Mantené la privacidad de otros</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
