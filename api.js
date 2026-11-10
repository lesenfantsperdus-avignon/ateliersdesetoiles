export const BACKEND = process.env.REACT_APP_BACKEND_URL || "";
export const API = BACKEND ? `${BACKEND}/api` : null;
export const isUploaded = (src) => typeof src === "string" && src.startsWith("/api/files/");
export const resolveImg = (src) => (isUploaded(src) ? `${BACKEND}${src}` : src);
