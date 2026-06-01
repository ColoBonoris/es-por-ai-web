import { ProtectedPage } from "@/components/app/protected-page";
import { MoreScreen } from "@/components/screens/more-screen";

export default function MorePage() {
  return (
    <ProtectedPage>
      <MoreScreen />
    </ProtectedPage>
  );
}
