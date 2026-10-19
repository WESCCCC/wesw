import { createFileRoute } from "@tanstack/react-router";
import { IMG } from "@/lib/images";
import { PageIntro } from "@/components/site/Layout";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galería — La Mona Cafetería, Iquitos" },
      { name: "description", content: "Fotos del ambiente, el café y la cocina de La Mona Cafetería en Iquitos." },
      { property: "og:title", content: "Galería — La Mona Cafetería" },
      { property: "og:description", content: "Un vistazo al refugio verde de La Mona en Iquitos." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/galeria" },
    ],
    links: [{ rel: "canonical", href: "/galeria" }],
  }),
  component: Galeria,
});

const ITEMS = [IMG.cafe, IMG.terraza, IMG.exterior, IMG.hamburguesa, IMG.bebidas, IMG.torta];

function Galeria() {
  return (
    <>
      <PageIntro eyebrow="Galería" title={<>Momentos <em>en La Mona.</em></>}>
        El local, la barra y la mesa. Las fotos de productos son referenciales mientras sumamos la sesión fotográfica oficial.
      </PageIntro>
      <section className="mx-auto max-w-7xl columns-1 gap-6 px-5 pb-24 sm:columns-2 lg:columns-3 md:px-8">
        {ITEMS.map((i) => (
          <figure key={i.alt} className="mb-6 break-inside-avoid">
            <img src={i.src} alt={i.alt} loading="lazy" className="w-full rounded-lg" />
            <figcaption className="mt-2 text-xs text-muted-foreground">{i.real ? "La Mona Cafetería" : "Imagen referencial"}</figcaption>
          </figure>
        ))}
      </section>
    </>
  );
}
