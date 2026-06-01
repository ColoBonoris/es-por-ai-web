import { ProtectedPage } from "@/components/app/protected-page";
import { HomeScreen } from "@/components/screens/home-screen";

export default function HomePage() {
  return (
    <ProtectedPage>
      <HomeScreen />
    </ProtectedPage>
  );
}
