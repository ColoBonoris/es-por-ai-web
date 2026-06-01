import { ProtectedPage } from "@/components/app/protected-page";
import { PlaceDetailScreen } from "@/components/screens/place-detail-screen";

export default async function PlacePage({
  params
}: {
  params: Promise<{ placeId: string }>;
}) {
  const { placeId } = await params;

  return (
    <ProtectedPage>
      <PlaceDetailScreen placeId={placeId} />
    </ProtectedPage>
  );
}
