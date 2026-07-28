const BACKEND_URL = import.meta.env.VITE_API_URL || 'https://helpglow-backend.onrender.com';

export const API_ENDPOINTS = {
  AUTH: `${BACKEND_URL}/api/auth`,
  UPLOAD: `${BACKEND_URL}/api/upload`,
  DONATIONS: `${BACKEND_URL}/api/donations`,
  BASE: BACKEND_URL
};
