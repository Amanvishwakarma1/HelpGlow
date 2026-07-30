/**
 * Google Identity Services (GIS) / OAuth 2.0 Integration Utility
 */

export const triggerGoogleSignIn = ({ onSuccess, onError }) => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // 1. If Google Identity Services SDK is loaded AND valid Client ID is configured
  if (googleClientId && window.google && window.google.accounts && window.google.accounts.id) {
    try {
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        auto_select: false,
        callback: (response) => {
          if (response && response.credential) {
            try {
              // Parse Google JWT ID Token payload
              const base64Url = response.credential.split('.')[1];
              const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
              const jsonPayload = decodeURIComponent(
                atob(base64)
                  .split('')
                  .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                  .join('')
              );
              const payload = JSON.parse(jsonPayload);
              
              onSuccess({
                credential: response.credential,
                email: payload.email,
                name: payload.name || payload.given_name || payload.email.split('@')[0],
                username: payload.name || payload.email.split('@')[0],
                avatar: payload.picture,
                googleId: payload.sub
              });
            } catch (err) {
              console.error("Failed to parse Google JWT credential:", err);
              if (onError) onError(err);
            }
          }
        }
      });

      // Prompt native Google One-Tap / Browser Account Chooser
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          if (onError) onError(new Error("GIS prompt dismissed"));
        }
      });
      return;
    } catch (e) {
      console.warn("GIS prompt fallback:", e);
      if (onError) onError(e);
      return;
    }
  }

  // If Client ID not configured yet, trigger seamless Account Chooser modal
  if (onError) onError(new Error("Google Client ID pending configuration"));
};
