import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { MapPin, Camera, Bell } from "lucide-react";

export function PermissionsScreen({ onComplete }: { onComplete: () => void }) {
  const permissions = [
    {
      icon: <MapPin className="w-8 h-8 text-[var(--warm-accent)]" />,
      title: "Ubicación",
      description: "Para mostrarte lugares cerca tuyo y mejorar tus recomendaciones"
    },
    {
      icon: <Camera className="w-8 h-8 text-[var(--warm-accent)]" />,
      title: "Cámara y fotos",
      description: "Para que puedas compartir fotos de los lugares que visitás"
    },
    {
      icon: <Bell className="w-8 h-8 text-[var(--warm-accent)]" />,
      title: "Notificaciones",
      description: "Para avisarte sobre nuevos lugares y recomendaciones personalizadas"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col p-[var(--spacing-mobile-padding)] py-8">
      <div className="flex-1 flex flex-col">
        <div className="space-y-2 mb-8">
          <h1>Permisos</h1>
          <p className="text-muted-foreground">
            Para brindarte la mejor experiencia, necesitamos algunos permisos
          </p>
        </div>

        <div className="space-y-4 flex-1">
          {permissions.map((permission, index) => (
            <Card
              key={index}
              className="rounded-[var(--radius-card)] border-border"
            >
              <CardContent className="p-[var(--spacing-card-padding)] flex gap-4">
                <div className="flex-shrink-0">
                  {permission.icon}
                </div>
                <div className="flex-1 space-y-1">
                  <h4>{permission.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {permission.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-3 mt-8">
          <Button
            className="w-full rounded-[var(--radius-button)]"
            onClick={onComplete}
          >
            Permitir todos
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-[var(--radius-button)]"
            onClick={onComplete}
          >
            Configurar individualmente
          </Button>
          <Button
            variant="ghost"
            className="w-full rounded-[var(--radius-button)]"
            onClick={onComplete}
          >
            Omitir por ahora
          </Button>
        </div>
      </div>
    </div>
  );
}
