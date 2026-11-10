import { ImageField } from "./Fields";
import { SETTINGS, WORKSHOPS, FOUNDERS, PROJECTS } from "@/lib/content";

const orig = (list, id) => list.find((x) => x.id === id)?.img;
const patchAt = (list, i, patch) => list.map((x, k) => (k === i ? { ...x, ...patch } : x));

const Section = ({ title, hint, children }) => (
  <section className="rounded-xl border border-ink/15 bg-cream-3 p-5 sm:p-7">
    <h3 className="font-display text-2xl">{title}</h3>
    {hint && <p className="mt-1 text-sm text-ink/70">{hint}</p>}
    <div className="mt-6 grid gap-8 md:grid-cols-2">{children}</div>
  </section>
);

export const PhotosTab = ({ data, set }) => {
  const imgs = data.settings.images;
  const upImg = (key, patch) => set({ ...data, settings: { ...data.settings, images: { ...imgs, [key]: { ...imgs[key], ...patch } } } });
  const upList = (name, i, patch) => set({ ...data, [name]: patchAt(data[name], i, patch) });

  return (
    <div className="grid gap-6">
      <div className="rounded-xl border border-sky-deep/30 bg-sky-pale/50 p-4 text-sm leading-relaxed text-ink">
        Le foto mantengono le cornici e lo stile del sito (formato, leggera desaturazione, luce). Le foto molto pesanti vengono alleggerite automaticamente. Con « Inquadratura » scegli quale parte della foto resta visibile quando viene ritagliata.
      </div>
      <Section title="Foto delle sezioni" hint="Apertura della home, approccio artistico, pagina L'association.">
        {[["hero", "Apertura home (sfondo notturno)", "aspect-video"], ["approach", "Approccio artistico", "aspect-[4/3]"], ["origins", "L'association — origini", "aspect-[4/5]"]].map(([k, l, r]) => (
          <ImageField key={k} label={l} ratio={r} value={imgs[k].img} pos={imgs[k].pos} original={SETTINGS.images[k].img}
            onChange={(v) => upImg(k, { img: v })} onPos={(v) => upImg(k, { pos: v })} testid={`admin-photo-${k}`} />
        ))}
      </Section>
      <Section title="Atelier">
        {data.workshops.map((w, i) => (
          <ImageField key={w.id} label={w.name} ratio="aspect-[4/5]" value={w.img} pos={w.pos} original={orig(WORKSHOPS, w.id)}
            onChange={(v) => upList("workshops", i, { img: v })} onPos={(v) => upList("workshops", i, { pos: v })} testid={`admin-photo-ws-${w.id}`} />
        ))}
      </Section>
      <Section title="Fondatrici">
        {data.founders.map((f, i) => (
          <ImageField key={f.id} label={f.name} ratio="aspect-[3/4]" value={f.img} pos={f.pos} original={orig(FOUNDERS, f.id)}
            onChange={(v) => upList("founders", i, { img: v })} onPos={(v) => upList("founders", i, { pos: v })} testid={`admin-photo-f-${f.id}`} />
        ))}
      </Section>
      <Section title="Progetti">
        {data.projects.map((p, i) => (
          <ImageField key={p.id} label={p.title || "Senza titolo"} ratio="aspect-[4/3]" value={p.img} pos={p.pos} original={orig(PROJECTS, p.id)}
            onChange={(v) => upList("projects", i, { img: v })} onPos={(v) => upList("projects", i, { pos: v })} testid={`admin-photo-p-${p.id}`} />
        ))}
      </Section>
    </div>
  );
};
