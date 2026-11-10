import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Upload, Loader2, Plus, Trash2 } from "lucide-react";
import { API, resolveImg, isUploaded } from "@/lib/api";

const base = "w-full rounded-md border border-ink/20 bg-white px-3 py-2.5 text-[15px] text-ink focus:border-sky-deep focus:outline-none focus:ring-2 focus:ring-sky/40";

export const Field = ({ label, value, onChange, hint, multiline, rows = 3, testid, placeholder }) => (
  <label className="block">
    <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
    {multiline ? (
      <textarea className={`${base} resize-y`} rows={rows} value={value ?? ""} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} data-testid={testid} />
    ) : (
      <input className={base} value={value ?? ""} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} data-testid={testid} />
    )}
    {hint && <span className="mt-1 block text-xs text-ink/65">{hint}</span>}
  </label>
);

export const LinesField = ({ label, value, onChange, hint = "Un elemento per riga.", rows = 4, testid }) => (
  <Field label={label} hint={hint} multiline rows={rows} testid={testid}
    value={(value || []).join("\n")} onChange={(t) => onChange(t.split("\n"))} />
);

export const ParagraphsField = ({ label, value, onChange, testid }) => (
  <Field label={label} hint="Lascia una riga vuota tra un paragrafo e l'altro." multiline rows={10} testid={testid}
    value={(value || []).join("\n\n")} onChange={(t) => onChange(t.split(/\n\s*\n/))} />
);

export const PairsField = ({ label, value, onChange, testid }) => {
  const rows = value || [];
  const set = (i, j, v) => onChange(rows.map((r, k) => (k === i ? (j === 0 ? [v, r[1]] : [r[0], v]) : r)));
  return (
    <div data-testid={testid}>
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={i} className="flex gap-2">
            <input className={`${base} w-2/5`} value={r[0]} placeholder="Ruolo" onChange={(e) => set(i, 0, e.target.value)} />
            <input className={base} value={r[1]} placeholder="Persone / organizzazione" onChange={(e) => set(i, 1, e.target.value)} />
            <button type="button" onClick={() => onChange(rows.filter((_, k) => k !== i))} className="shrink-0 rounded-md px-2 text-ink/60 hover:text-red-700" aria-label="Rimuovi riga"><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => onChange([...rows, ["", ""]])} className="mt-2 inline-flex items-center gap-1 text-sm text-sky-deep"><Plus size={14} /> Aggiungi riga</button>
    </div>
  );
};

export const POSITIONS = [
  ["center", "Centro"], ["top", "Alto"], ["center 30%", "Medio-alto"], ["center 70%", "Medio-basso"], ["bottom", "Basso"], ["left", "Sinistra"], ["right", "Destra"],
];

const shrink = (file) => new Promise((resolve) => {
  if (file.size < 1.5e6) { resolve(file); return; }
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    const s = Math.min(1, 2200 / Math.max(img.width, img.height));
    const c = document.createElement("canvas");
    c.width = Math.round(img.width * s);
    c.height = Math.round(img.height * s);
    c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
    URL.revokeObjectURL(url);
    c.toBlob((b) => resolve(b ? new File([b], file.name.replace(/\.\w+$/, ".jpg"), { type: "image/jpeg" }) : file), "image/jpeg", 0.86);
  };
  img.onerror = () => resolve(file);
  img.src = url;
});

export const ImageField = ({ label = "Foto", value, onChange, testid, pos, onPos, original, ratio = "aspect-square" }) => {
  const input = useRef(null);
  const [busy, setBusy] = useState(false);
  const upload = async (raw) => {
    if (!raw) return;
    setBusy(true);
    try {
      const file = await shrink(raw);
      const fd = new FormData();
      fd.append("file", file);
      const r = await axios.post(`${API}/admin/upload`, fd, { withCredentials: true });
      onChange(r.data.url);
      toast.success("Foto caricata. Ricordati di salvare.");
    } catch (e) {
      const d = e?.response?.data?.detail;
      toast.error(typeof d === "string" ? d : "Caricamento non riuscito.");
    } finally {
      setBusy(false);
      input.current.value = "";
    }
  };
  return (
    <div data-testid={testid}>
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <div className="flex flex-wrap items-center gap-4">
        <img src={resolveImg(value)} alt="" style={pos ? { objectPosition: pos } : undefined} className={`w-28 rounded-md bg-night object-cover ${ratio}`} />
        <div className="space-y-2">
          <button type="button" onClick={() => input.current.click()} disabled={busy}
            className="inline-flex items-center gap-2 rounded-full bg-night px-4 py-2 text-sm text-cream hover:bg-sky-deep disabled:opacity-60" data-testid={`${testid}-upload`}>
            {busy ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />} {isUploaded(value) ? "Sostituisci foto" : "Carica la vera foto"}
          </button>
          {onPos && (
            <label className="flex items-center gap-2 text-xs text-ink/75">Inquadratura
              <select value={pos || "center"} onChange={(e) => onPos(e.target.value)} className="rounded-md border border-ink/20 bg-white px-2 py-1 text-xs" data-testid={`${testid}-pos`}>
                {POSITIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </label>
          )}
          <p className="text-xs text-ink/65">{isUploaded(value) ? "Foto vostra caricata." : "Ora: immagine provvisoria."} JPG, PNG o WEBP, max 10 MB.</p>
          {original && value !== original && (
            <button type="button" onClick={() => onChange(original)} className="text-xs text-sky-deep hover:underline">Torna all'immagine provvisoria</button>
          )}
        </div>
      </div>
      <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => upload(e.target.files?.[0])} />
    </div>
  );
};

export const Card = ({ title, children, actions, testid }) => (
  <section className="rounded-xl border border-ink/15 bg-cream-3 p-5 sm:p-7" data-testid={testid}>
    <div className="mb-5 flex items-start justify-between gap-4">
      <h3 className="font-display text-2xl">{title}</h3>
      {actions}
    </div>
    <div className="grid gap-5">{children}</div>
  </section>
);
