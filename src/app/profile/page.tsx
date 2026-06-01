import { ProtectedPage } from "@/components/app/protected-page";
import { ProfileScreen } from "@/components/screens/profile-screen";

export default function ProfilePage() {
  return (
    <ProtectedPage>
      <ProfileScreen />
    </ProtectedPage>
  );
}
