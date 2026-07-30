const { googleClient, GOOGLE_CLIENT_ID } = require('../config/google');

/**
 * Verifies Google OAuth ID Token server-side
 * @param {string} idToken - The credential ID token sent from Google GIS frontend
 * @returns {Promise<Object>} Decoded and verified Google user profile
 */
const verifyGoogleIdToken = async (idToken) => {
  if (!idToken) {
    throw new Error('Google ID token is required');
  }

  try {
    // If GOOGLE_CLIENT_ID is configured, verify token with Google servers
    if (GOOGLE_CLIENT_ID && !GOOGLE_CLIENT_ID.includes('mock')) {
      const ticket = await googleClient.verifyIdToken({
        idToken: idToken,
        audience: GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload();
      
      if (!payload) {
        throw new Error('Invalid Google token payload');
      }

      return {
        provider: 'google',
        providerId: payload.sub,
        email: payload.email.toLowerCase(),
        name: payload.name || payload.given_name || payload.email.split('@')[0],
        profilePicture: payload.picture,
        emailVerified: payload.email_verified || false
      };
    } else {
      // Development fallback parser for custom tokens
      const base64Url = idToken.split('.')[1];
      if (base64Url) {
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const payload = JSON.parse(jsonPayload);
        
        return {
          provider: 'google',
          providerId: payload.sub || `google_id_${Date.now()}`,
          email: payload.email.toLowerCase(),
          name: payload.name || payload.given_name || payload.email.split('@')[0],
          profilePicture: payload.picture,
          emailVerified: payload.email_verified || true
        };
      }

      throw new Error('Invalid Google token format');
    }
  } catch (err) {
    console.error('❌ Google ID Token Verification Failed:', err.message);
    throw new Error(`Google authentication failed: ${err.message}`);
  }
};

module.exports = {
  verifyGoogleIdToken
};
