"use client";

import { Bell, Camera, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { PermissionCard } from "@/components/app/permission-card";
import { Button } from "@/components/ui/button";
import { userService } from "@/services/user-service";
import type { PermissionPreference } from "@/types/domain";

export function PermissionsScreen() {
  const router = useRouter();
  const [permissions, setPermissions] = useState<PermissionPreference>({
    location: false,
    camera: false,
    notifications: false
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadPermissions() {
      const profile = await userService.getProfile();
      setPermissions(profile.settings.permissions);
    }

    void loadPermissions();
  }, []);

  function togglePermission(permission: keyof PermissionPreference) {
    setPermissions((current) => ({
      ...current,
      [permission]: !current[permission]
    }));
  }

  async function savePermissions() {
    setIsSaving(true);
    await userService.updatePermissions(permissions);
    router.push("/home");
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="badge badge--accent">Permisos</p>
        <h1>Configurá permisos</h1>
        <p>Son mockeados por ahora, pero la decisión queda persistida localmente.</p>
      </header>

      <section className="form-section" aria-label="Permisos disponibles">
        <PermissionCard
          title="Ubicación"
          description="Para sugerir lugares cerca tuyo."
          enabled={permissions.location}
          icon={<MapPin aria-hidden="true" />}
          onToggle={() => togglePermission("location")}
        />
        <PermissionCard
          title="Cámara y fotos"
          description="Para sumar fotos en reseñas y lugares."
          enabled={permissions.camera}
          icon={<Camera aria-hidden="true" />}
          onToggle={() => togglePermission("camera")}
        />
        <PermissionCard
          title="Notificaciones"
          description="Para novedades sobre reseñas y recomendaciones."
          enabled={permissions.notifications}
          icon={<Bell aria-hidden="true" />}
          onToggle={() => togglePermission("notifications")}
        />
      </section>

      <div className="button-row">
        <Button type="button" onClick={savePermissions} disabled={isSaving}>
          {isSaving ? "Guardando..." : "Guardar y continuar"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/home")}>
          Omitir por ahora
        </Button>
      </div>
    </div>
  );
}
