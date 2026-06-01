import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Search, MapPin, Star, ChevronUp, MessageSquare, SlidersHorizontal, ArrowLeft } from "lucide-react";
import { useState } from "react";

export function MapScreen({ onNavigate }: { onNavigate: (screen: string, placeId?: string) => void }) {
  const [drawerHeight, setDrawerHeight] = useState<"min" | "mid" | "max">("mid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedAccessibility, setSelectedAccessibility] = useState<string[]>([]);

  const categoryFilters = ["Cafetería", "Restaurante", "Bar", "Panadería", "Comida rápida"];
  const accessibilityFilters = [
    "Accesible en silla de ruedas",
    "Sin TACC",
    "Vegetariano",
    "Vegano",
    "Acepta mascotas"
  ];

  const mapPlaces = [
    {
      id: "1",
      name: "Café de la Plaza",
      category: "Cafetería",
      rating: 4.8,
      reviews: 127,
      position: { top: "30%", left: "40%" },
      badges: ["Vegetariano", "Acepta mascotas"],
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=150&fit=crop"
    },
    {
      id: "2",
      name: "La Parrilla del Centro",
      category: "Restaurante",
      rating: 4.6,
      reviews: 89,
      position: { top: "50%", left: "60%" },
      badges: ["Sin TACC"],
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=150&fit=crop"
    },
    {
      id: "3",
      name: "Verde Natural",
      category: "Comida saludable",
      rating: 4.9,
      reviews: 203,
      position: { top: "40%", left: "25%" },
      badges: ["Vegetariano", "Vegano", "Sin TACC"],
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=150&fit=crop"
    },
    {
      id: "4",
      name: "Panadería Artesanal",
      category: "Panadería",
      rating: 4.7,
      reviews: 156,
      position: { top: "60%", left: "45%" },
      badges: ["Sin TACC"],
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=150&fit=crop"
    },
    {
      id: "5",
      name: "Bar La Esquina",
      category: "Bar",
      rating: 4.5,
      reviews: 98,
      position: { top: "35%", left: "70%" },
      badges: ["Acepta mascotas"],
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=200&h=150&fit=crop"
    }
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const toggleAccessibility = (filter: string) => {
    setSelectedAccessibility(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const drawerHeights = {
    min: "15%",
    mid: "40%",
    max: "85%"
  };

  return (
    <div className="h-screen bg-background relative overflow-hidden">
      {/* Search Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-background/80 backdrop-blur-sm">
        <div className="relative flex items-center gap-2">
          <button
            onClick={() => onNavigate("home")}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar lugares en el mapa..."
              className="pl-12 pr-12 rounded-[var(--radius-button)] bg-card"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-3 space-y-3 bg-card p-4 rounded-[var(--radius-card)] border border-border">
            <div className="space-y-2">
              <p className="text-sm font-medium">Categorías</p>
              <div className="flex flex-wrap gap-2">
                {categoryFilters.map((filter) => (
                  <Badge
                    key={filter}
                    variant={selectedFilters.includes(filter) ? "default" : "secondary"}
                    className="rounded-full cursor-pointer"
                    onClick={() => toggleFilter(filter)}
                    style={
                      selectedFilters.includes(filter)
                        ? { backgroundColor: "var(--warm-accent)", color: "white" }
                        : undefined
                    }
                  >
                    {filter}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Accesibilidad</p>
              <div className="flex flex-wrap gap-2">
                {accessibilityFilters.map((filter) => (
                  <Badge
                    key={filter}
                    variant={selectedAccessibility.includes(filter) ? "default" : "secondary"}
                    className="rounded-full cursor-pointer"
                    onClick={() => toggleAccessibility(filter)}
                    style={
                      selectedAccessibility.includes(filter)
                        ? { backgroundColor: "var(--warm-accent)", color: "white" }
                        : undefined
                    }
                  >
                    {filter}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Area */}
      <div className="w-full h-full bg-secondary relative">
        {/* Map Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(var(--border) 1px, transparent 1px),
              linear-gradient(90deg, var(--border) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Street Lines */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/3 left-0 right-0 h-1 bg-border transform -rotate-12"></div>
          <div className="absolute top-2/3 left-0 right-0 h-1 bg-border transform rotate-3"></div>
          <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-border transform -rotate-6"></div>
          <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-border transform rotate-2"></div>
        </div>

        {/* Map Pins */}
        {mapPlaces.map((place) => (
          <div
            key={place.id}
            className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer z-10 hover:scale-110 transition-transform"
            style={{ top: place.position.top, left: place.position.left }}
            onClick={() => onNavigate("place-detail", place.id)}
          >
            <div className="relative">
              <MapPin className="w-10 h-10 fill-[var(--warm-accent)] text-[var(--warm-accent)] drop-shadow-lg" />
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        ))}

        {/* User Location */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ top: "45%", left: "50%" }}
        >
          <div className="relative">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
            <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>
      </div>

      {/* Floating AI Button */}
      <button
        onClick={() => onNavigate("ai")}
        className="absolute bottom-[calc(var(--drawer-height)+1rem)] right-4 z-30 w-14 h-14 bg-[var(--warm-accent)] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        style={{ "--drawer-height": drawerHeights[drawerHeight] } as React.CSSProperties}
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </button>

      {/* Bottom Drawer */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-card rounded-t-[var(--radius-card)] shadow-2xl z-20 transition-all duration-300"
        style={{ height: drawerHeights[drawerHeight] }}
      >
        {/* Drawer Handle */}
        <div
          className="flex justify-center py-3 cursor-pointer"
          onClick={() => {
            setDrawerHeight(prev => {
              if (prev === "min") return "mid";
              if (prev === "mid") return "max";
              return "min";
            });
          }}
        >
          <div className="w-12 h-1 bg-border rounded-full"></div>
        </div>

        {/* Drawer Content */}
        <div className="px-4 pb-20 overflow-y-auto h-[calc(100%-3rem)]">
          <div className="flex items-center justify-between mb-4">
            <h3>{mapPlaces.length} lugares encontrados</h3>
            <button
              onClick={() => setDrawerHeight(drawerHeight === "min" ? "max" : "min")}
              className="p-2"
            >
              <ChevronUp className={`w-5 h-5 transition-transform ${drawerHeight === "max" ? "rotate-180" : ""}`} />
            </button>
          </div>

          <div className="space-y-3">
            {mapPlaces.map((place) => (
              <Card
                key={place.id}
                className="rounded-[var(--radius-card)] border-border overflow-hidden cursor-pointer hover:border-[var(--warm-accent)] transition-colors"
                onClick={() => onNavigate("place-detail", place.id)}
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
      </div>
    </div>
  );
}
