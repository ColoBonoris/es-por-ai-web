import Link from "next/link";
import { Heart, Map, MessageSquare } from "lucide-react";

const slides = [
  {
    title: "Descubrí lugares",
    description: "Encontrá cafés, restaurantes y espacios de la ciudad con reseñas reales.",
    icon: Map
  },
  {
    title: "Guardá lo que te sirve",
    description: "Filtrá por accesibilidad, preferencias y lugares favoritos.",
    icon: Heart
  },
  {
    title: "Preguntale a IAn",
    description: "Pedí recomendaciones en lenguaje natural cuando no sabés por dónde empezar.",
    icon: MessageSquare
  }
];

export function OnboardingScreen() {
  return (
    <main id="main-content" className="onboarding-page">
      <section className="onboarding-panel" aria-labelledby="onboarding-title">
        <div className="page-header">
          <p className="badge badge--accent">Es por AI</p>
          <h1 id="onboarding-title">Una forma simple de descubrir lugares accesibles</h1>
          <p>
            Un MVP web para explorar, reseñar, guardar favoritos y pedir recomendaciones
            de puntos de interés en la ciudad.
          </p>
        </div>

        <div className="onboarding-grid">
          {slides.map((slide) => {
            const Icon = slide.icon;
            return (
              <article key={slide.title} className="card">
                <Icon aria-hidden="true" color="var(--accent)" />
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
              </article>
            );
          })}
        </div>

        <div className="button-row">
          <Link href="/register" className="button button--primary">
            Crear cuenta
          </Link>
          <Link href="/login" className="button button--ghost">
            Iniciar sesión
          </Link>
        </div>
      </section>
    </main>
  );
}
