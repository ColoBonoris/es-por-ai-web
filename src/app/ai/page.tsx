import { ProtectedPage } from "@/components/app/protected-page";
import { AIAssistantScreen } from "@/components/screens/ai-assistant-screen";

export default function AiPage() {
  return (
    <ProtectedPage>
      <AIAssistantScreen />
    </ProtectedPage>
  );
}
