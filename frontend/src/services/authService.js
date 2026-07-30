import { API_ENDPOINTS } from '../config/api';

const API_AUTH_URL = API_ENDPOINTS.AUTH;

/**
 * Perform Google OAuth Authentication via backend API
 * @param {string} credential - Google ID token string
 */
export const googleLoginService = async (credential) => {
  const response = await fetch(`${API_AUTH_URL}/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ credential })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Google authentication failed');
  }
  return data;
};

/**
 * Fetch current authenticated user state
 * @param {string} token 
 */
export const getCurrentUserService = async (token) => {
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_AUTH_URL}/me`, {
    method: 'GET',
    headers,
    credentials: 'include'
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch current user');
  }
  return data;
};

/**
 * Refresh Access Token using HttpOnly cookie
 */
export const refreshAccessTokenService = async () => {
  const response = await fetch(`${API_AUTH_URL}/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to refresh token');
  }
  return data;
};

/**
 * Logout User & Invalidate Cookies
 */
export const logoutService = async () => {
  try {
    await fetch(`${API_AUTH_URL}/logout`, {
      method: 'POST',
      credentials: 'include'
    });
  } catch (e) {
    console.warn("Logout API call warning:", e);
  }
};
