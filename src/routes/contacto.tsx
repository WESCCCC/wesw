import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MAPS_EMBED, MAPS_URL, SITE, waLink } from "@/lib/site";
import { HoursList, OpenBadge, PageIntro, WhatsIcon } from "@/components/site/Layout";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto y ubicación — La Mona Cafetería, Iquitos" },
      { name: "description", content: "Jirón Fitzcarrald 516-520, Iquitos. Horarios, cómo llegar, pedidos y delivery por WhatsApp +51 993 841 823." },
      { property: "og:title", content: "Contacto — La Mona Cafetería" },
      { property: "og:description", content: "Dirección, horarios y pedidos por WhatsApp." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contacto" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: Contacto,
});

const REASONS = ["Consulta general", "Pedido o delivery", "Evento o grupo", "Otro"];

function Contacto() {
  const [errors, setErrors] = useState<{ name?: string; contact?: string; message?: string }>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const contact = String(f.get("contact") || "").trim();
    const reason = String(f.get("reason") || "");
    const msg = String(f.get("message") || "").trim();
    const errs: { name?: string; contact?: string; message?: string } = {};
    if (name.length < 2) errs.name = "Escribe tu nombre.";
    if (contact.length < 5) errs.contact = "Indica un teléfono o correo.";
    if (msg.length < 5) errs.message = "Cuéntanos un poco más.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const text = `Hola, La Mona Cafetería. Soy ${name} (${contact}).\nMotivo: ${reason}.\n${msg}`;
    window.open(waLink(text), "_blank", "noopener");
  }

  const field = "w-full rounded-md border bg-paper px-4 py-3 text-base";

  return (
    <>
      <PageIntro eyebrow="Contacto" title={<>Te esperamos <em>en Fitzcarrald.</em></>}>
        <OpenBadge />
      </PageIntro>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <p className="eyebrow text-accent">Dirección</p>
          <address className="mt-3 font-serif text-3xl not-italic text-primary">{SITE.address}<br />{SITE.city}</address>
          <p className="mt-2 text-sm text-muted-foreground">Plus Code: {SITE.plusCode}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Cómo llegar</a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-dark"><WhatsIcon /> Contactar por WhatsApp</a>
          </div>
          <p className="eyebrow mb-4 mt-12 text-accent">Horarios</p>
          <HoursList />
          <p className="eyebrow mb-3 mt-12 text-accent">Pedidos y delivery</p>
          <p className="text-muted-foreground">
            Haz tu pedido o consulta disponibilidad por WhatsApp al{" "}
            <a href={waLink()} className="text-primary underline" target="_blank" rel="noopener noreferrer">{SITE.phoneDisplay}</a>, o revisa nuestro{" "}
            <a href={SITE.catalog} className="text-primary underline" target="_blank" rel="noopener noreferrer">catálogo en WhatsApp</a>.
          </p>
        </div>
        <div className="md:col-span-7">
          <iframe
            title="Mapa de La Mona Cafetería"
            src={MAPS_EMBED}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-lg border"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-5 py-24 md:px-8">
          <h2 className="text-5xl text-primary">Escríbenos.</h2>
          <p className="mt-3 text-muted-foreground">Al enviar, se abrirá WhatsApp con tu mensaje listo. No guardamos tus datos.</p>
          <form onSubmit={onSubmit} noValidate className="mt-10 grid gap-5">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium">Nombre</label>
              <input id="name" name="name" className={field} aria-invalid={!!errors.name} />
              {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="contact" className="mb-1 block text-sm font-medium">Teléfono o correo</label>
              <input id="contact" name="contact" className={field} aria-invalid={!!errors.contact} />
              {errors.contact && <p className="mt-1 text-sm text-destructive">{errors.contact}</p>}
            </div>
            <div>
              <label htmlFor="reason" className="mb-1 block text-sm font-medium">Motivo</label>
              <select id="reason" name="reason" className={field}>
                {REASONS.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium">Mensaje</label>
              <textarea id="message" name="message" rows={5} className={field} aria-invalid={!!errors.message} />
              {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message}</p>}
            </div>
            <button type="submit" className="btn btn-primary justify-self-start"><WhatsIcon /> Enviar por WhatsApp</button>
          </form>
        </div>
      </section>
    </>
  );
}
