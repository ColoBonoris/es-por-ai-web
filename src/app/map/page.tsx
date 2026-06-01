import { ProtectedPage } from "@/components/app/protected-page";
import { MapScreen } from "@/components/screens/map-screen";

export default function MapPage() {
  return (
    <ProtectedPage>
      <MapScreen />
    </ProtectedPage>
  );
}
