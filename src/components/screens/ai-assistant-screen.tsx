"use client";

import { Send, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";

import { PlaceCard } from "@/components/places/place-card";
import { Button } from "@/components/ui/button";
import { assistantService } from "@/services/assistant-service";
import { createMockId } from "@/services/mock-storage";
import type { AiMessage } from "@/types/domain";

export function AIAssistantScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<AiMessage[]>([
    {
      id: "initial-message",
      role: "assistant",
      content:
        "¡Hola! Soy IAn, tu asistente para descubrir lugares. ¿Qué estás buscando hoy?",
      createdAt: new Date().toISOString()
    }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const prompts = assistantService.getSuggestedQuestions();

  async function sendQuestion(question: string) {
    if (!question.trim()) {
      return;
    }

    const userMessage: AiMessage = {
      id: createMockId("user"),
      role: "user",
      content: question,
      createdAt: new Date().toISOString()
    };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsSubmitting(true);

    try {
      const response = await assistantService.askIAn(question);
      setMessages((current) => [...current, response]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: createMockId("assistant"),
          role: "assistant",
          content:
            "No pude preparar una respuesta ahora. Probá de nuevo en unos minutos.",
          createdAt: new Date().toISOString()
        }
      ]);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sendQuestion(input);
  }

  return (
    <div className="page-stack ai-layout">
      <header className="page-header">
        <p className="badge badge--accent">
          <Sparkles aria-hidden="true" size={14} />
          IAn
        </p>
        <h1>Asistente de recomendaciones</h1>
        <p>Hacé una pregunta simple y recibí sugerencias de lugares.</p>
      </header>

      <section
        className="chat-window"
        aria-label="Conversación con IAn"
        aria-live="polite"
        aria-relevant="additions text"
        aria-busy={isSubmitting}
      >
        {messages.map((message) => (
          <article
            key={message.id}
            className={
              message.role === "user"
                ? "chat-message chat-message--user"
                : "chat-message"
            }
          >
            <div className="chat-bubble">
              <p>{message.content}</p>
            </div>
            {message.recommendations ? (
              <div className="place-list">
                {message.recommendations.map((recommendation) => (
                  <PlaceCard
                    key={recommendation.place.id}
                    place={recommendation.place}
                    compact
                    reason={recommendation.reason}
                  />
                ))}
              </div>
            ) : null}
          </article>
        ))}

        {messages.length === 1 ? (
          <div className="suggested-prompts" aria-label="Preguntas sugeridas">
            {prompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="filter-chip"
                onClick={() => void sendQuestion(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        ) : null}

        {isSubmitting ? (
          <article className="chat-message" role="status" aria-live="polite">
            <div className="chat-bubble chat-bubble--loading">
              <span className="spinner spinner--button" aria-hidden="true" />
              <p>IAn está preparando una respuesta.</p>
            </div>
          </article>
        ) : null}
      </section>

      <form className="chat-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="ai-question">
          Preguntale a IAn
        </label>
        <input
          id="ai-question"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Preguntale a IAn..."
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          disabled={!input.trim()}
          isLoading={isSubmitting}
          loadingLabel="Enviando"
          icon={<Send aria-hidden="true" size={18} />}
        >
          Enviar
        </Button>
      </form>
    </div>
  );
}
