import { createFileRoute } from "@tanstack/react-router";
import { MAPS_URL, SITE } from "@/lib/site";
import { PageIntro } from "@/components/site/Layout";

export const Route = createFileRoute("/opiniones")({
  head: () => ({
    meta: [
      { title: "Opiniones — La Mona Cafetería, Iquitos" },
      { name: "description", content: "Lo que dicen quienes visitan La Mona Cafetería en Iquitos. Comparte tu experiencia en Google." },
      { property: "og:title", content: "Opiniones — La Mona Cafetería" },
      { property: "og:description", content: "Reputación de La Mona en Google y Facebook." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/opiniones" },
    ],
    links: [{ rel: "canonical", href: "/opiniones" }],
  }),
  component: Opiniones,
});

function Opiniones() {
  return (
    <>
      <PageIntro eyebrow="Opiniones" title={<>Lo que se dice <em>en la mesa.</em></>} />
      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-primary p-10 text-primary-foreground md:p-14">
            <p className="font-serif text-8xl italic leading-none md:text-9xl">{SITE.rating.score}</p>
            <p className="mt-3 font-serif text-2xl">de 5 en {SITE.rating.source}</p>
            <p className="mt-1 opacity-75">{SITE.rating.count}</p>
            <p className="mt-6 text-xs opacity-60">Cifra de referencia; consulta la valoración actual en la ficha oficial.</p>
          </div>
          <div className="flex flex-col justify-between gap-8 rounded-lg border bg-paper p-10 md:p-14">
            <p className="font-serif text-3xl italic leading-snug text-espresso">¿Ya nos visitaste? Tu opinión ayuda a que más personas encuentren su pausa en Iquitos.</p>
            <div className="flex flex-wrap gap-3">
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Comparte tu experiencia</a>
              <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-primary">Ver en Facebook</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
