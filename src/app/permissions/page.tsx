import { ProtectedPage } from "@/components/app/protected-page";
import { PermissionsScreen } from "@/components/screens/permissions-screen";

export default function PermissionsPage() {
  return (
    <ProtectedPage>
      <PermissionsScreen />
    </ProtectedPage>
  );
}
