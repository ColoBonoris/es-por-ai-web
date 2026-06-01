import { ProtectedPage } from "@/components/app/protected-page";
import { FavoritesScreen } from "@/components/screens/favorites-screen";

export default function FavoritesPage() {
  return (
    <ProtectedPage>
      <FavoritesScreen />
    </ProtectedPage>
  );
}
