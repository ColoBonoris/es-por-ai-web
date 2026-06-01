import { ProtectedPage } from "@/components/app/protected-page";
import { AddPlaceScreen } from "@/components/screens/add-place-screen";

export default function NewPlacePage() {
  return (
    <ProtectedPage>
      <AddPlaceScreen />
    </ProtectedPage>
  );
}
