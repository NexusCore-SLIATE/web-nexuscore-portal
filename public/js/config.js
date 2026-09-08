
const LOCAL_API_BASE_URL = "http://localhost:5000/api";
const PRODUCTION_API_BASE_URL = "https://web-nexuscore-portal.vercel.app/api";

const CONFIG = {
  API_BASE_URL:
    window.location.hostname === "localhost" || window.location.hostname === ""
      ? LOCAL_API_BASE_URL
      : PRODUCTION_API_BASE_URL,

  LIMITS: {
    NEWS: 3,
    EVENTS: 3,
    GALLERY: 6,
  },

  TIMEOUT: 10000,
};

Object.freeze(CONFIG);
