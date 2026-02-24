const env = import.meta.env;

export const PRODUCTION = env.VITE_APP_PRODUCTION === 'true';
export const API_URL = env.VITE_APP_API_URL;
