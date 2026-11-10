import { ArrowUp, ArrowDown, Trash2, Plus } from "lucide-react";
import { Field, LinesField, ParagraphsField, PairsField, ImageField, Card } from "./Fields";
import { CATS } from "@/lib/content";

const patchAt = (list, i, patch) => list.map((x, k) => (k === i ? { ...x, ...patch } : x));

export const SettingsTab = ({ data, set }) => {
  const s = data.settings;
  const up = (patch) => set({ ...data, settings: { ...s, ...patch } });
  const phone = (i, patch) => up({ phones: patchAt(s.phones, i, patch) });
  return (
    <div className="grid gap-6">
      <Card title="Contatti" testid="admin-settings-contacts">
        <Field label="Email dell'associazione" value={s.email} onChange={(v) => up({ email: v })} testid="admin-email" />
        {s.phones.map((p, i) => (
          <div key={p.id} className="grid gap-3 sm:grid-cols-3">
            <Field label={`Telefono ${i + 1} — nome`} value={p.name} onChange={(v) => phone(i, { name: v })} />
            <Field label="Numero come appare" value={p.display} onChange={(v) => phone(i, { display: v })} />
            <Field label="Numero per chiamare" hint="Formato +33…" value={p.tel} onChange={(v) => phone(i, { tel: v })} />
          </div>
        ))}
        <Field label="Link Instagram" placeholder="https://www.instagram.com/…" hint="Lascia vuoto per mostrare « à confirmer »." value={s.instagram} onChange={(v) => up({ instagram: v })} testid="admin-instagram" />
      </Card>
      <Card title="Associazione" testid="admin-settings-asso">
        <Field label="Data di creazione" placeholder="es. septembre 2025" value={s.creationDate} onChange={(v) => up({ creationDate: v })} testid="admin-creation-date" />
        <Field label="Numero RNA / SIRET" value={s.rna} onChange={(v) => up({ rna: v })} testid="admin-rna" />
        <Field label="Stagione (pagina Atelier)" value={s.season} onChange={(v) => up({ season: v })} testid="admin-season" />
      </Card>
    </div>
  );
};

export const WorkshopsTab = ({ data, set }) => {
  const up = (i, patch) => set({ ...data, workshops: patchAt(data.workshops, i, patch) });
  return (
    <div className="grid gap-6">
      {data.workshops.map((w, i) => (
        <Card key={w.id} title={w.name} testid={`admin-workshop-${w.id}`}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nome dell'atelier" value={w.name} onChange={(v) => up(i, { name: v })} />
            <Field label="Pubblico" value={w.public} onChange={(v) => up(i, { public: v })} />
            <Field label="Età" value={w.age} onChange={(v) => up(i, { age: v })} testid={`admin-workshop-${w.id}-age`} />
            <Field label="Giorno" value={w.day} onChange={(v) => up(i, { day: v })} testid={`admin-workshop-${w.id}-day`} />
            <Field label="Orario" value={w.time} onChange={(v) => up(i, { time: v })} testid={`admin-workshop-${w.id}-time`} />
            <Field label="Data di inizio (facoltativa)" value={w.start} onChange={(v) => up(i, { start: v })} />
            <Field label="Tariffa" placeholder="es. 250 € l'année" value={w.price} onChange={(v) => up(i, { price: v })} testid={`admin-workshop-${w.id}-price`} />
            <Field label="Quota associativa" value={w.membership} onChange={(v) => up(i, { membership: v })} />
            <Field label="Lezione di prova" placeholder="es. Première séance gratuite" value={w.trial} onChange={(v) => up(i, { trial: v })} />
          </div>
          <Field label="Frase di presentazione" multiline value={w.tagline} onChange={(v) => up(i, { tagline: v })} />
          <LinesField label="Cosa si fa" value={w.does} onChange={(v) => up(i, { does: v })} />
          <LinesField label="Strumenti teatrali" value={w.tools} onChange={(v) => up(i, { tools: v })} />
          <Field label="Creazione collettiva" multiline value={w.creation} onChange={(v) => up(i, { creation: v })} />
          <Field label="Spettacolo" multiline rows={2} value={w.performance} onChange={(v) => up(i, { performance: v })} />
          <ImageField value={w.img} onChange={(v) => up(i, { img: v })} testid={`admin-workshop-${w.id}-img`} />
        </Card>
      ))}
    </div>
  );
};

export const ProjectsTab = ({ data, set }) => {
  const list = data.projects;
  const save = (l) => set({ ...data, projects: l });
  const move = (i, d) => { const l = [...list]; [l[i], l[i + d]] = [l[i + d], l[i]]; save(l); };
  const add = () => save([{ id: `p-${Date.now()}`, cat: "asso", year: "", title: "Nuovo progetto", kind: "", img: "/img/stage-empty.jpg", desc: "", credits: [["", ""]], status: "" }, ...list]);
  return (
    <div className="grid gap-4">
      <button type="button" onClick={add} className="inline-flex w-fit items-center gap-2 rounded-full bg-sky px-5 py-2.5 text-sm font-medium text-night hover:bg-sky-pale" data-testid="admin-project-add"><Plus size={16} /> Aggiungi un progetto</button>
      {list.map((p, i) => (
        <details key={p.id} className="group rounded-xl border border-ink/15 bg-cream-3" data-testid={`admin-project-${p.id}`}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5">
            <span><span className="block font-display text-xl">{p.title || "Senza titolo"}</span><span className="text-xs text-ink/70">{CATS[p.cat]?.label} · {p.year}</span></span>
            <span className="flex shrink-0 gap-1" onClick={(e) => e.preventDefault()}>
              <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="rounded p-1.5 hover:bg-cream-2 disabled:opacity-30" aria-label="Sposta su"><ArrowUp size={16} /></button>
              <button type="button" disabled={i === list.length - 1} onClick={() => move(i, 1)} className="rounded p-1.5 hover:bg-cream-2 disabled:opacity-30" aria-label="Sposta giù"><ArrowDown size={16} /></button>
              <button type="button" onClick={() => window.confirm("Eliminare questo progetto?") && save(list.filter((_, k) => k !== i))} className="rounded p-1.5 text-red-700 hover:bg-red-50" aria-label="Elimina" data-testid={`admin-project-delete-${p.id}`}><Trash2 size={16} /></button>
            </span>
          </summary>
          <div className="grid gap-5 border-t border-ink/10 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Titolo" value={p.title} onChange={(v) => save(patchAt(list, i, { title: v }))} testid={`admin-project-${p.id}-title`} />
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Categoria</span>
                <select className="w-full rounded-md border border-ink/20 bg-white px-3 py-2.5" value={p.cat} onChange={(e) => save(patchAt(list, i, { cat: e.target.value }))}>
                  {Object.entries(CATS).map(([k, c]) => <option key={k} value={k}>{c.label}</option>)}
                </select>
              </label>
              <Field label="Data" value={p.year} onChange={(v) => save(patchAt(list, i, { year: v }))} />
              <Field label="Stato" placeholder="En cours, À venir…" value={p.status} onChange={(v) => save(patchAt(list, i, { status: v }))} />
            </div>
            <Field label="Tipo" placeholder="Spectacle, festival, atelier…" value={p.kind} onChange={(v) => save(patchAt(list, i, { kind: v }))} />
            <Field label="Descrizione" multiline rows={4} value={p.desc} onChange={(v) => save(patchAt(list, i, { desc: v }))} />
            <PairsField label="Crediti (ruoli e persone)" value={p.credits} onChange={(v) => save(patchAt(list, i, { credits: v }))} />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!p.placeholder} onChange={(e) => save(patchAt(list, i, { placeholder: e.target.checked }))} /> Mostra l'etichetta « à renseigner »</label>
            <ImageField value={p.img} onChange={(v) => save(patchAt(list, i, { img: v }))} testid={`admin-project-${p.id}-img`} />
          </div>
        </details>
      ))}
    </div>
  );
};

export const FoundersTab = ({ data, set }) => {
  const up = (i, patch) => set({ ...data, founders: patchAt(data.founders, i, patch) });
  return (
    <div className="grid gap-6">
      {data.founders.map((f, i) => (
        <Card key={f.id} title={f.name} testid={`admin-founder-${f.id}`}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nome" value={f.name} onChange={(v) => up(i, { name: v })} />
            <Field label="Origine" value={f.origin} onChange={(v) => up(i, { origin: v })} />
          </div>
          <Field label="Ruolo" value={f.role} onChange={(v) => up(i, { role: v })} />
          <LinesField label="Formazione" value={f.training} onChange={(v) => up(i, { training: v })} rows={3} />
          <LinesField label="Ambiti di lavoro" value={f.focus} onChange={(v) => up(i, { focus: v })} rows={3} />
          <ParagraphsField label="Biografia" value={f.bio} onChange={(v) => up(i, { bio: v })} testid={`admin-founder-${f.id}-bio`} />
          <ImageField label="Ritratto" value={f.img} onChange={(v) => up(i, { img: v })} testid={`admin-founder-${f.id}-img`} />
        </Card>
      ))}
    </div>
  );
};
