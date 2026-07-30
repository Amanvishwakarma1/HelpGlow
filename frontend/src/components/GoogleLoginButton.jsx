import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { triggerGoogleSignIn } from '../utils/googleAuth';

const GoogleLoginButton = ({ onSuccess, onError, text = "Continue with Google", disabled = false }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (loading || disabled) return;
    setLoading(true);

    triggerGoogleSignIn({
      onSuccess: (profileOrCredential) => {
        setLoading(false);
        if (onSuccess) onSuccess(profileOrCredential);
      },
      onError: (err) => {
        setLoading(false);
        if (onError) onError(err);
      }
    });
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.02, backgroundColor: '#F8FAFC' }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      aria-label="Continue with Google Authentication"
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        color: '#1F2937',
        border: '1px solid #E2E8F0',
        borderRadius: '50px',
        padding: '14px 24px',
        fontSize: '15.5px',
        fontWeight: 700,
        fontFamily: "'Inter', sans-serif",
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0,0,0,0.08)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: disabled || loading ? 0.7 : 1,
        outline: 'none'
      }}
    >
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#0A90B5" strokeWidth="4" opacity="0.25" />
            <path fill="#0A90B5" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Authenticating...</span>
        </div>
      ) : (
        <>
          {/* Official Google Logo */}
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>{text}</span>
        </>
      )}
    </motion.button>
  );
};

export default GoogleLoginButton;
