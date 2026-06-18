import { suggestedQuestions } from "@/mocks/app-data";
import { apiFetch, jsonHeaders } from "@/services/api-client";
import { createMockId } from "@/services/mock-storage";
import { placeService } from "@/services/place-service";
import type {
  AssistantMessageRequest,
  AssistantMessageResponse
} from "@/types/api";
import type { AiMessage } from "@/types/domain";

export const assistantService = {
  getSuggestedQuestions() {
    return suggestedQuestions;
  },

  async askIAn(question: string): Promise<AiMessage> {
    const location = await getAssistantLocation();
    const payload = await apiFetch<AssistantMessageResponse>("/assistant/message", {
      method: "POST",
      headers: jsonHeaders(),
      body: JSON.stringify({
        message: question,
        ...(location ? { location } : {})
      } satisfies AssistantMessageRequest)
    });
    const places = await Promise.all(
      payload.recommendations.map((placeId) => placeService.getPlaceById(placeId))
    );
    const recommendations = places.flatMap((place) =>
      place
        ? [
            {
              place,
              reason: "Coincide con los criterios de tu búsqueda."
            }
          ]
        : []
    );

    return {
      id: createMockId("assistant"),
      role: "assistant",
      content: payload.message,
      createdAt: new Date().toISOString(),
      ...(recommendations.length ? { recommendations } : {})
    };
  }
};

async function getAssistantLocation() {
  if (typeof navigator === "undefined" || !navigator.geolocation) {
    return undefined;
  }

  if (!navigator.permissions) {
    return undefined;
  }

  try {
    const permission = await navigator.permissions.query({ name: "geolocation" });

    if (permission.state !== "granted") {
      return undefined;
    }

    return await new Promise<{ lat: number; lng: number } | undefined>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }),
        () => resolve(undefined),
        {
          enableHighAccuracy: false,
          maximumAge: 5 * 60 * 1000,
          timeout: 1500
        }
      );
    });
  } catch {
    return undefined;
  }
}
