import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ChevronRight, User, Settings, Plus, FileText, Shield, LogOut } from "lucide-react";

export function MoreScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const menuItems = [
    { id: "profile", icon: User, label: "Mi perfil", color: "var(--warm-accent)" },
    { id: "settings", icon: Settings, label: "Configuración", color: "var(--foreground)" },
    { id: "add-place", icon: Plus, label: "Agregar lugar", color: "var(--warm-accent)" },
  ];

  const legalItems = [
    { id: "privacy", icon: Shield, label: "Política de privacidad" },
    { id: "terms", icon: FileText, label: "Términos y condiciones" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-[var(--spacing-mobile-padding)] space-y-6">
        {/* User Header */}
        <Card className="rounded-[var(--radius-card)] border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-[var(--warm-accent)] text-white text-xl">
                  MG
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3>María González</h3>
                <p className="text-sm text-muted-foreground">maria.gonzalez@email.com</p>
              </div>
              <button onClick={() => onNavigate("profile")}>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="rounded-[var(--radius-card)] border-border">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-semibold text-[var(--warm-accent)]">12</p>
              <p className="text-sm text-muted-foreground">Reseñas</p>
            </CardContent>
          </Card>
          <Card className="rounded-[var(--radius-card)] border-border">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-semibold text-[var(--warm-accent)]">8</p>
              <p className="text-sm text-muted-foreground">Favoritos</p>
            </CardContent>
          </Card>
          <Card className="rounded-[var(--radius-card)] border-border">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-semibold text-[var(--warm-accent)]">3</p>
              <p className="text-sm text-muted-foreground">Lugares</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Menu */}
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Card
              key={item.id}
              className="rounded-[var(--radius-card)] border-border cursor-pointer hover:border-[var(--warm-accent)] transition-colors"
              onClick={() => onNavigate(item.id)}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
                <span className="flex-1">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Legal */}
        <div className="space-y-2">
          <h4 className="text-sm text-muted-foreground px-1">Legal</h4>
          {legalItems.map((item) => (
            <Card
              key={item.id}
              className="rounded-[var(--radius-card)] border-border cursor-pointer hover:border-[var(--warm-accent)] transition-colors"
              onClick={() => onNavigate(item.id)}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="flex-1 text-sm">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Logout */}
        <Card
          className="rounded-[var(--radius-card)] border-destructive/50 cursor-pointer hover:bg-destructive/5 transition-colors"
          onClick={() => onNavigate("logout")}
        >
          <CardContent className="p-4 flex items-center gap-3">
            <LogOut className="w-5 h-5 text-destructive" />
            <span className="flex-1 text-destructive">Cerrar sesión</span>
          </CardContent>
        </Card>

        <div className="text-center pt-4">
          <p className="text-xs text-muted-foreground">Es por AI v1.0.0</p>
        </div>
      </div>
    </div>
  );
}
