// Single source of truth for the backend API URL.
// Change the base URL here and every API call (frontend + admin panel) picks it up.
//
// - Local development: any host named "localhost" -> local Express server on :5000
// - Production (e.g. https://nexuscore.webredirect.org): same origin as the site,
//   so it follows your Vercel domain automatically with no code change.
const LOCAL_API_BASE_URL = "http://localhost:5000/api";

const CONFIG = {
  API_BASE_URL:
    window.location.hostname === "localhost" || window.location.hostname === ""
      ? LOCAL_API_BASE_URL
      : `${window.location.origin}/api`,

  LIMITS: {
    NEWS: 3,
    EVENTS: 3,
    GALLERY: 6,
  },

  TIMEOUT: 10000,
};

Object.freeze(CONFIG);
