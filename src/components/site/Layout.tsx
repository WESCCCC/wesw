import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { DAY_NAMES, formatDay, getOpenStatus, MAPS_URL, SITE, waLink, type OpenStatus } from "@/lib/site";

const NAV = [
  { to: "/menu", label: "Menú" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/galeria", label: "Galería" },
  { to: "/opiniones", label: "Opiniones" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function WhatsIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.4.9 2.9.8 3.4.7.5-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  );
}

export function useOpenStatus() {
  const [s, setS] = useState<OpenStatus | null>(null);
  useEffect(() => {
    setS(getOpenStatus());
    const id = setInterval(() => setS(getOpenStatus()), 60_000);
    return () => clearInterval(id);
  }, []);
  return s;
}

export function OpenBadge({ className = "" }: { className?: string }) {
  const s = useOpenStatus();
  if (!s) return <span className={`text-sm opacity-70 ${className}`}>Consultando horario…</span>;
  return (
    <span className={`inline-flex items-center gap-2 text-sm ${className}`} aria-live="polite">
      <span className={`h-2 w-2 rounded-full ${s.open ? "bg-leaf" : "bg-terracotta"}`} />
      {s.label}
    </span>
  );
}

export function HoursList({ dark = false }: { dark?: boolean }) {
  const s = useOpenStatus();
  const order = [1, 2, 3, 4, 5, 6, 0];
  return (
    <dl className="space-y-2 text-sm">
      {order.map((d) => (
        <div
          key={d}
          className={`flex justify-between gap-4 border-b border-dashed pb-2 ${dark ? "border-primary-foreground/20" : ""} ${s?.day === d ? "font-semibold" : ""}`}
        >
          <dt>{DAY_NAMES[d]}</dt>
          <dd className="text-right tabular-nums">{formatDay(d)}</dd>
        </div>
      ))}
    </dl>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${scrolled || open ? "bg-background/95 backdrop-blur-sm border-b" : "bg-transparent"}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link to="/" className="flex items-baseline gap-2 text-primary" onClick={() => setOpen(false)}>
          <span className="font-serif text-2xl italic md:text-3xl">La Mona</span>
          <span className="eyebrow text-[0.6rem] text-muted-foreground">Cafetería</span>
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-foreground/80 transition-colors hover:text-accent"
              activeProps={{ className: "text-accent" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-dark hidden !py-2.5 sm:inline-flex">
            <WhatsIcon /> Pedir por WhatsApp
          </a>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-primary lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-6">
              <span className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Móvil" className="flex h-[calc(100dvh-4rem)] flex-col justify-end gap-1 bg-background px-6 pb-10 lg:hidden">
          <Link to="/" onClick={() => setOpen(false)} className="font-serif py-2 text-4xl text-primary">Inicio</Link>
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="font-serif py-2 text-4xl text-primary" activeProps={{ className: "italic text-accent" }}>
              {n.label}
            </Link>
          ))}
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6 w-full">
            <WhatsIcon /> Pedir por WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <p className="font-serif text-5xl italic">La Mona</p>
          <p className="mt-4 max-w-sm font-serif text-xl opacity-80">{SITE.tagline}</p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-4 opacity-60">Visítanos</p>
          <address className="not-italic text-sm leading-relaxed">
            {SITE.address}<br />{SITE.city}
          </address>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm underline underline-offset-4 hover:text-accent">Cómo llegar</a>
          <p className="eyebrow mb-3 mt-8 opacity-60">Contacto</p>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="block text-sm hover:text-accent">WhatsApp {SITE.phoneDisplay}</a>
          <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="block text-sm hover:text-accent">Facebook</a>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow mb-4 opacity-60">Horarios</p>
          <HoursList dark />
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs opacity-60 md:px-8">© {new Date().getFullYear()} La Mona Cafetería · Iquitos, Perú</p>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir a La Mona por WhatsApp"
      className="fixed z-30 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
      style={{ right: "max(1.25rem, env(safe-area-inset-right))", bottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
    >
      <WhatsIcon className="h-6 w-6" />
    </a>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:p-3">Saltar al contenido</a>
      <Header />
      <main id="contenido">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-12 pt-32 md:px-8 md:pt-44">
      <p className="eyebrow reveal text-accent">{eyebrow}</p>
      <h1 className="reveal mt-4 max-w-4xl text-5xl leading-[0.95] text-primary md:text-7xl" style={{ animationDelay: "120ms" }}>{title}</h1>
      {children && <div className="reveal mt-6 max-w-xl text-lg text-muted-foreground" style={{ animationDelay: "240ms" }}>{children}</div>}
    </section>
  );
}
