import { ProtectedPage } from "@/components/app/protected-page";
import { SettingsScreen } from "@/components/screens/settings-screen";

export default function SettingsPage() {
  return (
    <ProtectedPage>
      <SettingsScreen />
    </ProtectedPage>
  );
}
