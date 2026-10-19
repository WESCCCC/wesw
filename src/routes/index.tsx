import { createFileRoute, Link } from "@tanstack/react-router";
import { IMG } from "@/lib/images";
import { SITE, waLink, MAPS_URL } from "@/lib/site";
import { HoursList, OpenBadge, WhatsIcon } from "@/components/site/Layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "La Mona Cafetería — Café, sabor y calma en Iquitos" },
      { name: "description", content: "Cafetería en Iquitos rodeada de plantas: café, sándwiches, hamburguesas, postres, jugos y cervezas artesanales. Pide por WhatsApp." },
      { property: "og:title", content: "La Mona Cafetería — Café, sabor y calma en Iquitos" },
      { property: "og:description", content: "Tu refugio cotidiano en Iquitos: café, comida fresca y naturaleza." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const FEATURED = [
  { name: "Café y capuchino", note: "El primer ritual del día.", img: IMG.cafe, span: "md:col-span-5 md:row-span-2", aspect: "aspect-[4/5]" },
  { name: "Hamburguesa Loretana", note: "Sabor de casa, con carácter amazónico.", img: IMG.hamburguesa, span: "md:col-span-7", aspect: "aspect-[4/3]" },
  { name: "Torta de chocolate", note: "Ese antojo que merece una pausa.", img: IMG.torta, span: "md:col-span-3", aspect: "aspect-square" },
  { name: "Frappé de coco y jugos", note: "Frescura para la tarde de Iquitos.", img: IMG.bebidas, span: "md:col-span-4", aspect: "aspect-square" },
];

const ALSO = ["Sánguche de lomo", "Hamburguesa gaucha", "Cervezas artesanales", "Pisco Sour"];

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-28 md:grid-cols-12 md:px-8 md:pt-36 lg:min-h-[92vh] lg:items-center">
        <div className="md:col-span-6 lg:col-span-5">
          <p className="eyebrow reveal text-accent" style={{ animationDelay: "350ms" }}>Café · Cocina · Naturaleza</p>
          <h1 className="reveal mt-5 text-[3.2rem] leading-[0.92] text-primary sm:text-6xl lg:text-[5.5rem]" style={{ animationDelay: "100ms" }}>
            La pausa que<br />te conecta con<br /><em className="text-wood">lo esencial.</em>
          </h1>
          <p className="reveal mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg" style={{ animationDelay: "250ms" }}>
            Café, comida fresca y un ambiente rodeado de naturaleza en el corazón de Iquitos. Un espacio para compartir, descubrir sabores y disfrutar sin prisa.
          </p>
          <div className="reveal mt-8 flex flex-wrap gap-3" style={{ animationDelay: "450ms" }}>
            <Link to="/menu" className="btn btn-primary">Descubrir el menú</Link>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-primary">
              <WhatsIcon /> Pedir por WhatsApp
            </a>
          </div>
          <OpenBadge className="reveal mt-8 text-muted-foreground" />
        </div>

        <div className="relative md:col-span-6 lg:col-span-7">
          <div className="fade-in relative ml-auto overflow-hidden rounded-t-[12rem] rounded-b-lg md:max-w-[34rem]">
            <img src={IMG.cafe.src} alt={IMG.cafe.alt} className="aspect-[4/5] w-full object-cover" fetchPriority="high" />
          </div>
          <p className="reveal mt-10 text-right font-serif text-xl italic text-wood" style={{ animationDelay: "750ms" }}>
            Tu refugio cotidiano en Iquitos.
          </p>
        </div>
        <span className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 eyebrow text-muted-foreground lg:block" style={{ animation: "drift 2.6s ease-in-out infinite" }} aria-hidden="true">
          Desliza ↓
        </span>
      </section>

      {/* BRAND */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-12 md:px-8 md:py-32">
          <div className="md:col-span-5">
            <img src={IMG.exterior.src} alt={IMG.exterior.alt} loading="lazy" className="aspect-[3/4] w-full rounded-lg object-cover" />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="eyebrow text-accent">El lugar</p>
            <h2 className="mt-4 text-5xl leading-none text-primary md:text-6xl">Un lugar para<br /><em>bajar el ritmo.</em></h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              Entre el aroma del café, las plantas y una cocina preparada para disfrutar, La Mona es ese rincón al que siempre apetece volver.
            </p>
            <blockquote className="mt-10 border-l-2 border-accent pl-6 font-serif text-3xl italic leading-snug text-espresso">
              “Buenos sabores, conversaciones largas y momentos sin prisa.”
            </blockquote>
            <Link to="/nosotros" className="mt-10 inline-block text-sm font-medium text-primary underline underline-offset-8 hover:text-accent">Conoce La Mona →</Link>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-accent">De la carta</p>
            <h2 className="mt-4 text-5xl leading-none text-primary md:text-6xl">Algo rico<br /><em>siempre te espera.</em></h2>
          </div>
          <p className="max-w-xs text-muted-foreground">Del primer café de la mañana a ese antojo que merece una pausa.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-12">
          {FEATURED.map((f) => (
            <Link key={f.name} to="/menu" className={`group block ${f.span}`}>
              <div className="overflow-hidden rounded-lg">
                <img src={f.img.src} alt={f.img.alt} loading="lazy" className={`${f.aspect} w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]`} />
              </div>
              <h3 className="mt-4 text-2xl text-primary md:text-3xl">{f.name}</h3>
              <p className="text-sm text-muted-foreground">{f.note}</p>
            </Link>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t pt-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-serif text-xl italic text-wood">
            {ALSO.map((a) => <li key={a}>{a}</li>)}
          </ul>
          <Link to="/menu" className="btn btn-dark">Ver todo el menú</Link>
        </div>
      </section>

      {/* VISIT */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-2 md:px-8">
          <div>
            <p className="eyebrow opacity-60">Visítanos</p>
            <h2 className="mt-4 text-5xl leading-none md:text-6xl">{SITE.address}</h2>
            <p className="mt-3 opacity-75">{SITE.city}</p>
            <OpenBadge className="mt-6" />
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Cómo llegar</a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <WhatsIcon /> Contactar
              </a>
            </div>
          </div>
          <div><HoursList dark /></div>
        </div>
      </section>
    </>
  );
}
