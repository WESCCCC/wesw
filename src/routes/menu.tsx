import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CATEGORIES, MENU, SITE, productWaLink } from "@/lib/site";
import { PageIntro, WhatsIcon } from "@/components/site/Layout";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menú — La Mona Cafetería, Iquitos" },
      { name: "description", content: "Café, capuchino, hamburguesa Loretana, sánguche de lomo, torta de chocolate, frappé de coco, cervezas artesanales y Pisco Sour." },
      { property: "og:title", content: "Menú — La Mona Cafetería" },
      { property: "og:description", content: "Consulta la carta de La Mona y pide por WhatsApp." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [cat, setCat] = useState<string>("Todo");
  const [q, setQ] = useState("");
  const items = useMemo(
    () =>
      MENU.filter((m) => (cat === "Todo" || m.category === cat) && m.name.toLowerCase().includes(q.trim().toLowerCase())),
    [cat, q],
  );
  const groups = (cat === "Todo" ? CATEGORIES : [cat]).map((c) => ({ c, list: items.filter((i) => i.category === c) }));

  return (
    <>
      <PageIntro eyebrow="La carta" title={<>Nuestro <em>menú.</em></>}>
        Productos confirmados de la casa. Precios y carta completa disponibles por WhatsApp o en el{" "}
        <a href={SITE.catalog} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">catálogo de WhatsApp</a>.
      </PageIntro>

      <div className="sticky top-16 z-20 border-y bg-background/95 backdrop-blur-sm md:top-20">
        <div className="mx-auto max-w-7xl px-5 py-3 md:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Categorías">
            {["Todo", ...CATEGORIES].map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${cat === c ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="mt-2 block">
            <span className="sr-only">Buscar producto</span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar en la carta…"
              className="w-full rounded-full border bg-paper px-4 py-2 text-sm md:max-w-xs"
            />
          </label>
        </div>
      </div>

      <section className="mx-auto max-w-4xl px-5 py-14 md:px-8">
        {items.length === 0 && q && (
          <p className="py-10 text-center text-muted-foreground">No encontramos “{q}”. Pregúntanos por WhatsApp, quizá está en la carta del día.</p>
        )}
        {groups
          .filter((g) => g.list.length > 0 || (!q && cat !== "Todo"))
          .map(({ c, list }) => (
            <div key={c} className="mb-14">
              <h2 className="mb-6 border-b pb-3 text-4xl italic text-primary">{c}</h2>
              {list.length === 0 ? (
                <p className="text-muted-foreground">
                  Estamos preparando esta sección de la carta. Consulta disponibilidad por{" "}
                  <a className="text-accent underline" href={productWaLink(`la sección ${c}`)} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
                </p>
              ) : (
                <ul className="divide-y">
                  {list.map((m) => (
                    <li key={m.name} className="flex items-center justify-between gap-4 py-5">
                      <div>
                        <h3 className="text-2xl text-espresso">{m.name}</h3>
                        {m.description && <p className="text-sm text-muted-foreground">{m.description}</p>}
                        <p className="mt-1 text-xs text-muted-foreground">
                          {m.price != null ? `S/ ${m.price.toFixed(2)}` : "Precio por confirmar"}
                        </p>
                      </div>
                      <a
                        href={productWaLink(m.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost shrink-0 !px-4 !py-2 text-primary"
                        aria-label={`Consultar ${m.name} por WhatsApp`}
                      >
                        <WhatsIcon /> <span className="hidden sm:inline">Consultar</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
      </section>
    </>
  );
}
