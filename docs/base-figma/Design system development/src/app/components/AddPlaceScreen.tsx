import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { ArrowLeft, Upload, MapPin, X } from "lucide-react";
import { useState } from "react";

export function AddPlaceScreen({ onBack, onSubmit }: {
  onBack: () => void;
  onSubmit: () => void;
}) {
  const [placeName, setPlaceName] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const categories = [
    "Cafetería",
    "Restaurante",
    "Bar",
    "Panadería",
    "Heladería",
    "Comida rápida",
    "Librería",
    "Otro"
  ];

  const accessibilityFeatures = [
    "Accesible en silla de ruedas",
    "Sin TACC",
    "Vegetariano",
    "Vegano",
    "Kosher",
    "Acepta mascotas",
    "Accesibilidad visual"
  ];

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
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
          <h3>Agregar lugar</h3>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!placeName || !address || !category}
          className="rounded-[var(--radius-button)]"
        >
          Enviar
        </Button>
      </div>

      <div className="p-[var(--spacing-mobile-padding)] space-y-6">
        {/* Info Card */}
        <Card className="rounded-[var(--radius-card)] border-[var(--warm-accent)] bg-[var(--warm-accent-light)]">
          <CardContent className="p-4">
            <p className="text-sm">
              <strong>Importante:</strong> Los lugares nuevos requieren aprobación de un administrador. El estado "Verificado" solo es asignado por moderadores.
            </p>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del lugar *</Label>
              <Input
                id="name"
                placeholder="Ej: Café de la Plaza"
                className="rounded-[var(--radius-button)]"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="address"
                  placeholder="Ej: Calle 7 N° 854, La Plata"
                  className="rounded-[var(--radius-button)] pl-10"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Categoría *</Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Badge
                    key={cat}
                    variant={category === cat ? "default" : "secondary"}
                    className="rounded-full cursor-pointer"
                    onClick={() => setCategory(cat)}
                    style={
                      category === cat
                        ? { backgroundColor: "var(--warm-accent)", color: "white" }
                        : undefined
                    }
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción (opcional)</Label>
            <Textarea
              id="description"
              placeholder="Breve descripción del lugar, qué lo hace especial..."
              className="rounded-[var(--radius-button)] min-h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Accessibility Features */}
          <div className="space-y-3">
            <div>
              <Label>Características de accesibilidad (opcional)</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Ayudá a otros con información útil sobre este lugar
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {accessibilityFeatures.map((feature) => (
                <Badge
                  key={feature}
                  variant={selectedFeatures.includes(feature) ? "default" : "secondary"}
                  className="rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => toggleFeature(feature)}
                  style={
                    selectedFeatures.includes(feature)
                      ? { backgroundColor: "var(--warm-accent)", color: "white" }
                      : undefined
                  }
                >
                  {feature}
                </Badge>
              ))}
            </div>
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
                    type="button"
                    className="absolute top-1 right-1 p-1 bg-destructive rounded-full"
                    onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== index))}
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
              {uploadedImages.length < 6 && (
                <button
                  type="button"
                  className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-[var(--warm-accent)] transition-colors"
                >
                  <Upload className="w-6 h-6 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Subir foto</span>
                </button>
              )}
            </div>
          </div>

          {/* Menu Upload */}
          <div className="space-y-3">
            <Label>Menú (opcional)</Label>
            <Card className="rounded-[var(--radius-card)] border-border border-2 border-dashed cursor-pointer hover:border-[var(--warm-accent)] transition-colors">
              <CardContent className="p-6 text-center">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Subir foto del menú o carta
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Guidelines */}
          <Card className="rounded-[var(--radius-card)] border-border bg-secondary/50">
            <CardContent className="p-4">
              <h4 className="mb-2">Pautas para agregar lugares</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Verificá que el lugar no esté ya registrado</li>
                <li>• Proporcioná información precisa y actualizada</li>
                <li>• Las fotos deben ser del lugar (no de internet)</li>
                <li>• El lugar será revisado antes de publicarse</li>
              </ul>
            </CardContent>
          </Card>

          <Button
            type="submit"
            className="w-full rounded-[var(--radius-button)]"
            disabled={!placeName || !address || !category}
          >
            Enviar para aprobación
          </Button>
        </form>
      </div>
    </div>
  );
}
