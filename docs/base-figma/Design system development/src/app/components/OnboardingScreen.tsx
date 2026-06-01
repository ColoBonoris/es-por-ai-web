import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { MapPin, Star, MessageSquare, Map } from "lucide-react";
import { useState } from "react";

export function OnboardingScreen({ onComplete }: { onComplete: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: <MapPin className="w-16 h-16 text-[var(--warm-accent)]" />,
      title: "Descubrí lugares increíbles",
      description: "Explorá puntos de interés verificados en tu ciudad con reseñas de la comunidad"
    },
    {
      icon: <Star className="w-16 h-16 text-[var(--rating-star)]" />,
      title: "Compartí tu experiencia",
      description: "Escribí reseñas, subí fotos y ayudá a otros a encontrar los mejores lugares"
    },
    {
      icon: <Map className="w-16 h-16 text-[var(--warm-accent)]" />,
      title: "Explorá en el mapa",
      description: "Buscá lugares cerca tuyo y descubrí nuevas opciones en tu zona"
    },
    {
      icon: <MessageSquare className="w-16 h-16 text-[var(--warm-accent)]" />,
      title: "Preguntale a IAn",
      description: "Nuestro asistente AI te ayuda a encontrar el lugar perfecto para cada ocasión"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-[var(--spacing-mobile-padding)]">
        <div className="w-full max-w-md">
          <Card className="rounded-[var(--radius-card)] border-border">
            <CardContent className="p-12 text-center space-y-6">
              <div className="flex justify-center">
                {slides[currentSlide].icon}
              </div>
              <div className="space-y-3">
                <h2>{slides[currentSlide].title}</h2>
                <p className="text-muted-foreground">
                  {slides[currentSlide].description}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 bg-[var(--warm-accent)]"
                    : "w-2 bg-border"
                }`}
              />
            ))}
          </div>

          <div className="mt-8 space-y-3">
            {currentSlide === slides.length - 1 ? (
              <>
                <Button
                  className="w-full rounded-[var(--radius-button)]"
                  onClick={() => onComplete()}
                >
                  Crear cuenta
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-[var(--radius-button)]"
                  onClick={() => onComplete()}
                >
                  Iniciar sesión
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="w-full rounded-[var(--radius-button)]"
                  onClick={nextSlide}
                >
                  Siguiente
                </Button>
                <Button
                  variant="ghost"
                  className="w-full rounded-[var(--radius-button)]"
                  onClick={() => onComplete()}
                >
                  Omitir
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
