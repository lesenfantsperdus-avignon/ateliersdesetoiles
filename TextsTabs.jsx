import { useState } from "react";
import { RotateCcw, Search } from "lucide-react";
import { TEXT_GROUPS, TEXT_DEFAULTS } from "@/lib/texts";

const base = "w-full rounded-md border border-ink/20 bg-white px-3 py-2.5 text-[15px] text-ink focus:border-sky-deep focus:outline-none focus:ring-2 focus:ring-sky/40";

const TextRow = ({ f, value, onChange }) => {
  const changed = value !== TEXT_DEFAULTS[f.k];
  const rows = Math.min(10, Math.max(1, Math.ceil(value.length / 90) + (value.match(/\n/g) || []).length));
  return (
    <label className="block" data-testid={`admin-text-${f.k}`}>
      <span className="mb-1.5 flex items-center justify-between gap-3 text-sm font-medium text-ink">
        {f.label}
        {changed && (
          <button type="button" onClick={(e) => { e.preventDefault(); onChange(TEXT_DEFAULTS[f.k]); }} className="inline-flex shrink-0 items-center gap-1 text-xs font-normal text-sky-deep hover:underline">
            <RotateCcw size={12} /> Testo originale
          </button>
        )}
      </span>
      <textarea className={`${base} resize-y ${changed ? "border-sky-deep/60" : ""}`} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
};

export const TextsTab = ({ data, set }) => {
  const [q, setQ] = useState("");
  const texts = data.texts;
  const up = (k, v) => set({ ...data, texts: { ...texts, [k]: v } });
  const needle = q.trim().toLowerCase();
  const groups = TEXT_GROUPS.map((g) => ({
    ...g,
    fields: needle ? g.fields.filter((f) => f.label.toLowerCase().includes(needle) || (texts[f.k] || "").toLowerCase().includes(needle)) : g.fields,
  })).filter((g) => g.fields.length);

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border border-sky-deep/30 bg-sky-pale/50 p-4 text-sm leading-relaxed text-ink">
        <p><strong>*parola*</strong> → corsivo colorato · <strong>**parola**</strong> → grassetto · andare a capo → nuova riga (nei titoli, ogni riga appare separatamente).</p>
        <p className="mt-1 text-ink/75">Se svuoti un campo, quel testo sparisce dal sito.</p>
      </div>
      <label className="relative block">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/50" />
        <input className={`${base} pl-9`} placeholder="Cerca un testo (es. « Peter Pan », « tarif »…)" value={q} onChange={(e) => setQ(e.target.value)} data-testid="admin-text-search" />
      </label>
      {groups.map((g) => (
        <details key={g.id} open={!!needle} className="rounded-xl border border-ink/15 bg-cream-3" data-testid={`admin-text-group-${g.id}`}>
          <summary className="cursor-pointer list-none p-5 font-display text-xl">{g.title} <span className="font-sans text-sm text-ink/60">({g.fields.length})</span></summary>
          <div className="grid gap-5 border-t border-ink/10 p-5">
            {g.fields.map((f) => <TextRow key={f.k} f={f} value={texts[f.k] ?? ""} onChange={(v) => up(f.k, v)} />)}
          </div>
        </details>
      ))}
      {groups.length === 0 && <p className="text-ink/70">Nessun testo trovato.</p>}
    </div>
  );
};
