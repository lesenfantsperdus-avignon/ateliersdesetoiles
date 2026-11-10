import { useEffect } from "react";

export const useTitle = (title, description) => {
  useEffect(() => {
    document.title = title ? `${title} — Les Enfants Perdus` : "Les Enfants Perdus — Théâtre, mouvement et création collective à Avignon";
    if (description) document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
};
