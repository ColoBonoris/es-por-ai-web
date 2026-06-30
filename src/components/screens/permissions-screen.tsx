"use client";

import { Bell, Camera, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { PermissionCard } from "@/components/app/permission-card";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/loading-state";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPermissions() {
      try {
        const profile = await userService.getProfile();
        setPermissions(profile.settings.permissions);
      } finally {
        setIsLoading(false);
      }
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
        <p>No se usarán en esta versión preliminar, pero tus decisiones se almacenan.</p>
      </header>

      {isLoading ? (
        <LoadingState
          label="Cargando permisos"
          description="Estamos recuperando tus preferencias guardadas."
        />
      ) : (
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
      )}

      <div className="button-row">
        <Button
          type="button"
          onClick={savePermissions}
          disabled={isLoading}
          isLoading={isSaving}
          loadingLabel="Guardando"
        >
          Guardar y continuar
        </Button>
        <Button
          type="button"
          variant="ghost"
          disabled={isLoading || isSaving}
          onClick={() => router.push("/home")}
        >
          Omitir por ahora
        </Button>
      </div>
    </div>
  );
}
