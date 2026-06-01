import { suggestedQuestions } from "@/mocks/app-data";
import type { AiMessage } from "@/types/domain";
import { createMockId, waitForMock } from "@/services/mock-storage";
import { placeService } from "@/services/place-service";

export const assistantService = {
  getSuggestedQuestions() {
    return suggestedQuestions;
  },

  async askIAn(question: string): Promise<AiMessage> {
    await waitForMock();
    const places = await placeService.getPlaces();
    const normalizedQuestion = question.toLowerCase();

    const rankedPlaces = places
      .filter((place) => {
        if (normalizedQuestion.includes("tacc")) {
          return place.badges.includes("gluten_free");
        }

        if (normalizedQuestion.includes("perro") || normalizedQuestion.includes("mascota")) {
          return place.badges.includes("pet_friendly");
        }

        if (
          normalizedQuestion.includes("vegetariano") ||
          normalizedQuestion.includes("vegano")
        ) {
          return (
            place.badges.includes("vegetarian") ||
            place.badges.includes("vegan")
          );
        }

        if (normalizedQuestion.includes("café") || normalizedQuestion.includes("cafe")) {
          return place.category === "Cafetería";
        }

        return true;
      })
      .slice(0, 2);

    return {
      id: createMockId("assistant"),
      role: "assistant",
      content:
        rankedPlaces.length > 0
          ? "Encontré estos lugares que podrían interesarte:"
          : "No encontré una coincidencia exacta, pero podés probar con otra búsqueda o revisar el mapa.",
      createdAt: new Date().toISOString(),
      recommendations: rankedPlaces.map((place) => ({
        place,
        reason:
          place.id === "cafe-de-la-plaza"
            ? "Ambiente tranquilo, buen café y opciones para ir con mascota."
            : place.id === "verde-natural"
              ? "Tiene opciones vegetarianas, veganas y sin TACC con muy buenas reseñas."
              : "Coincide con tu búsqueda y mantiene buenas valoraciones de la comunidad."
      }))
    };
  }
};
