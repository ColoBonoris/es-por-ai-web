import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ArrowLeft, Send, Star, Sparkles } from "lucide-react";
import { useState } from "react";

export function AIAssistantScreen({ onBack, onPlaceClick }: {
  onBack: () => void;
  onPlaceClick: (placeId: string) => void;
}) {
  const [messages, setMessages] = useState<Array<{
    type: "user" | "assistant";
    text?: string;
    places?: Array<{ id: string; name: string; category: string; rating: number; reason: string; image: string; badges: string[] }>;
  }>>([
    {
      type: "assistant",
      text: "¡Hola! Soy IAn, tu asistente para descubrir lugares increíbles. ¿Qué estás buscando hoy?"
    }
  ]);
  const [inputText, setInputText] = useState("");

  const suggestedQuestions = [
    "¿Dónde puedo ir a tomar café con opciones Sin TACC?",
    "Buscame un lugar tranquilo cerca",
    "Recomendame un lugar para ir con mi perro",
    "¿Dónde puedo almorzar algo vegetariano?",
    "Quiero un lugar lindo para ir a la tarde"
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { type: "user", text }]);
    setInputText("");

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          type: "assistant",
          text: "Encontré estos lugares que podrían interesarte:",
          places: [
            {
              id: "1",
              name: "Café de la Plaza",
              category: "Cafetería",
              rating: 4.8,
              reason: "Ambiente tranquilo ideal para trabajar o leer. Acepta mascotas en el área exterior.",
              image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=150&fit=crop",
              badges: ["Vegetariano", "Acepta mascotas"]
            },
            {
              id: "3",
              name: "Verde Natural",
              category: "Comida saludable",
              rating: 4.9,
              reason: "Opciones 100% vegetarianas y veganas. Muy buenas reseñas sobre la calidad de la comida.",
              image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=150&fit=crop",
              badges: ["Vegetariano", "Vegano", "Sin TACC"]
            }
          ]
        }
      ]);
    }, 1000);
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 flex items-center gap-3">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--warm-accent)] to-[var(--rating-star)] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3>IAn</h3>
            <p className="text-xs text-muted-foreground">Asistente de recomendaciones</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] ${message.type === "user" ? "" : "space-y-3"}`}>
              {message.text && (
                <div
                  className={`rounded-[var(--radius-card)] p-4 ${
                    message.type === "user"
                      ? "bg-[var(--warm-accent)] text-white"
                      : "bg-card border border-border"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              )}

              {message.places && (
                <div className="space-y-3">
                  {message.places.map((place) => (
                    <Card
                      key={place.id}
                      className="rounded-[var(--radius-card)] border-border overflow-hidden cursor-pointer hover:border-[var(--warm-accent)] transition-colors"
                      onClick={() => onPlaceClick(place.id)}
                    >
                      <div className="flex gap-3">
                        <img
                          src={place.image}
                          alt={place.name}
                          className="w-24 h-24 object-cover"
                        />
                        <CardContent className="flex-1 p-3 space-y-1">
                          <h4 className="line-clamp-1">{place.name}</h4>
                          <p className="text-sm text-muted-foreground">{place.category}</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-[var(--rating-star)] text-[var(--rating-star)]" />
                            <span className="text-sm">{place.rating}</span>
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
                      <div className="px-4 pb-3">
                        <p className="text-xs text-muted-foreground italic">{place.reason}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {messages.length === 1 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground text-center">Preguntas sugeridas:</p>
            <div className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(question)}
                  className="w-full text-left p-3 rounded-[var(--radius-button)] border border-border hover:border-[var(--warm-accent)] transition-colors"
                >
                  <p className="text-sm">{question}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Preguntale a IAn..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend(inputText)}
            className="rounded-[var(--radius-button)]"
          />
          <Button
            onClick={() => handleSend(inputText)}
            disabled={!inputText.trim()}
            className="rounded-[var(--radius-button)] px-4"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
