import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { ArrowLeft, ChevronRight, Palette, Bell, Lock, Shield, Smartphone } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

export function SettingsScreen({ onBack }: { onBack: () => void }) {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    newPlaces: true,
    reviews: true,
    recommendations: false
  });
  const [selectedPreferences, setSelectedPreferences] = useState([
    "Vegetariano",
    "Acepta mascotas"
  ]);

  const availablePreferences = [
    "Accesible en silla de ruedas",
    "Sin TACC",
    "Vegetariano",
    "Vegano",
    "Kosher",
    "Acepta mascotas",
    "Accesibilidad visual"
  ];

  const togglePreference = (pref: string) => {
    setSelectedPreferences(prev =>
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4 flex items-center">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3 className="ml-2">Configuración</h3>
      </div>

      <div className="p-[var(--spacing-mobile-padding)] space-y-6">
        {/* Theme */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-[var(--warm-accent)]" />
            <h4>Apariencia</h4>
          </div>
          <Card className="rounded-[var(--radius-card)] border-border">
            <CardContent className="p-4 space-y-3">
              {[
                {
                  id: "light",
                  label: "Claro",
                  description: "Tema cálido y minimalista con fondo beige",
                  colors: { bg: "#F7F4EF", card: "#FFFFFF", accent: "#D97706" }
                },
                {
                  id: "dark",
                  label: "Oscuro",
                  description: "Tema oscuro con acentos cálidos",
                  colors: { bg: "#1F1F1F", card: "#2F2F2F", accent: "#D97706" }
                },
                {
                  id: "high-contrast",
                  label: "Alto contraste",
                  description: "Máximo contraste para mejor accesibilidad",
                  colors: { bg: "#000000", card: "#1A1A1A", accent: "#FFAA00" }
                }
              ].map((option) => (
                <div
                  key={option.id}
                  className="flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  onClick={() => setTheme(option.id as typeof theme)}
                >
                  <div className="flex items-center gap-2 shrink-0">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      theme === option.id ? "border-[var(--warm-accent)]" : "border-border"
                    }`}>
                      {theme === option.id && (
                        <div className="w-3 h-3 rounded-full bg-[var(--warm-accent)]"></div>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <div
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: option.colors.bg, borderColor: option.colors.accent }}
                      />
                      <div
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: option.colors.card, borderColor: option.colors.accent }}
                      />
                      <div
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: option.colors.accent, borderColor: option.colors.accent }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={option.id} className="cursor-pointer">
                      {option.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[var(--warm-accent)]" />
            <h4>Notificaciones</h4>
          </div>
          <Card className="rounded-[var(--radius-card)] border-border">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Nuevos lugares cerca</Label>
                  <p className="text-sm text-muted-foreground">Recibí notificaciones de lugares nuevos</p>
                </div>
                <Switch
                  checked={notifications.newPlaces}
                  onCheckedChange={(checked) =>
                    setNotifications(prev => ({ ...prev, newPlaces: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Nuevas reseñas</Label>
                  <p className="text-sm text-muted-foreground">De lugares que seguís</p>
                </div>
                <Switch
                  checked={notifications.reviews}
                  onCheckedChange={(checked) =>
                    setNotifications(prev => ({ ...prev, reviews: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Recomendaciones personalizadas</Label>
                  <p className="text-sm text-muted-foreground">Sugerencias basadas en tus gustos</p>
                </div>
                <Switch
                  checked={notifications.recommendations}
                  onCheckedChange={(checked) =>
                    setNotifications(prev => ({ ...prev, recommendations: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendation Preferences */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[var(--warm-accent)]" />
            <h4>Preferencias de recomendación</h4>
          </div>
          <Card className="rounded-[var(--radius-card)] border-border">
            <CardContent className="p-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                Estas preferencias nos ayudan a brindarte mejores recomendaciones
              </p>
              <div className="flex flex-wrap gap-2">
                {availablePreferences.map((pref) => (
                  <Badge
                    key={pref}
                    variant={selectedPreferences.includes(pref) ? "default" : "secondary"}
                    className="rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => togglePreference(pref)}
                    style={
                      selectedPreferences.includes(pref)
                        ? { backgroundColor: "var(--warm-accent)", color: "white" }
                        : undefined
                    }
                  >
                    {pref}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Permissions */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-[var(--warm-accent)]" />
            <h4>Permisos</h4>
          </div>
          <Card className="rounded-[var(--radius-card)] border-border">
            <CardContent className="p-4 space-y-3">
              {[
                { label: "Ubicación", status: "Permitido" },
                { label: "Cámara y fotos", status: "Permitido" },
                { label: "Notificaciones", status: "Permitido" }
              ].map((permission, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Label>{permission.label}</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{permission.status}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Account */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[var(--warm-accent)]" />
            <h4>Cuenta</h4>
          </div>
          <Card className="rounded-[var(--radius-card)] border-border">
            <CardContent className="p-4 space-y-3">
              {[
                { label: "Cambiar contraseña" },
                { label: "Email y notificaciones" },
                { label: "Privacidad de datos" },
                { label: "Eliminar cuenta", danger: true }
              ].map((option, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <Label className={option.danger ? "text-destructive" : ""}>
                    {option.label}
                  </Label>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
