import { createFileRoute, Link } from "@tanstack/react-router";
import { IMG } from "@/lib/images";
import { PageIntro } from "@/components/site/Layout";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros — La Mona Cafetería, Iquitos" },
      { name: "description", content: "Un refugio verde en Iquitos: plantas, asientos cómodos, música tranquila y arquitectura inspirada en Nueva Orleans." },
      { property: "og:title", content: "Nosotros — La Mona Cafetería" },
      { property: "og:description", content: "Conoce el ambiente de La Mona, tu pausa favorita entre café y naturaleza." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/nosotros" },
    ],
    links: [{ rel: "canonical", href: "/nosotros" }],
  }),
  component: Nosotros,
});

const PILLARS = [
  { n: "01", t: "Naturaleza", d: "Plantas en cada rincón y luz que entra sin pedir permiso." },
  { n: "02", t: "Calma", d: "Asientos cómodos y música tranquila para quedarse un rato más." },
  { n: "03", t: "Carácter", d: "Arquitectura con aire de Nueva Orleans y detalles latinoamericanos." },
  { n: "04", t: "Sabor", d: "Café, cocina recién preparada, postres y cervezas artesanales." },
];

function Nosotros() {
  return (
    <>
      <PageIntro eyebrow="Nosotros" title={<>Tu pausa favorita,<br /><em>entre café y naturaleza.</em></>}>
        Un refugio verde en medio de Iquitos, pensado para compartir, conversar y disfrutar sin prisa.
      </PageIntro>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-12 md:px-8">
        <img src={IMG.exterior.src} alt={IMG.exterior.alt} loading="lazy" className="aspect-[3/4] w-full rounded-lg object-cover md:col-span-12" />
      </section>
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {PILLARS.map((p) => (
            <div key={p.n}>
              <p className="font-serif text-5xl italic text-accent">{p.n}</p>
              <h2 className="mt-3 text-3xl text-primary">{p.t}</h2>
              <p className="mt-2 text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-20 text-center">
          <p className="mx-auto max-w-2xl font-serif text-4xl italic leading-tight text-espresso">“Buenos sabores, conversaciones largas y momentos sin prisa.”</p>
          <Link to="/menu" className="btn btn-dark mt-10">Descubrir el menú</Link>
        </div>
      </section>
    </>
  );
}
