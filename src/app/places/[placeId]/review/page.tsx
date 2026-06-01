import { ProtectedPage } from "@/components/app/protected-page";
import { WriteReviewScreen } from "@/components/screens/write-review-screen";

export default async function WriteReviewPage({
  params
}: {
  params: Promise<{ placeId: string }>;
}) {
  const { placeId } = await params;

  return (
    <ProtectedPage>
      <WriteReviewScreen placeId={placeId} />
    </ProtectedPage>
  );
}
