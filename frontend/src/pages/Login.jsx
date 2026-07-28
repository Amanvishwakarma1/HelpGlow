import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, KeyRound, ArrowLeft } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AnimatedMascot from '../components/AnimatedMascot';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  // Mode: 'sign_in' | 'register' | 'forgot_password'
  const [mode, setMode] = useState('sign_in');
  
  // Registration & Reset Steps: 1 = Email, 2 = OTP, 3 = Password / Profile
  const [regStep, setRegStep] = useState(1);
  const [resetStep, setResetStep] = useState(1);

  // Form Fields
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI state
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginUser, registerUser, sendOtp, verifyOtp, resetPassword, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/menu';
  const reasonMessage = searchParams.get('message');

  // Reset state when switching mode
  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setSuccessMsg('');
    setRegStep(1);
    setResetStep(1);
    setIsVerified(false);
    setOtp('');
  };

  // Helper email validator
  const validateEmailFormat = (val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val.trim());
  };

  // ==========================================
  // SIGN IN SUBMIT HANDLER
  // ==========================================
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email || !password) {
      setError('Please enter both email address and password.');
      return;
    }

    if (!validateEmailFormat(email)) {
      setError('Please enter a valid email address format (e.g. name@example.com).');
      return;
    }

    setLoading(true);
    try {
      await loginUser(email, password);
      setLoading(false);
      navigate(redirectPath);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Invalid email or password.');
    }
  };

  // ==========================================
  // REGISTER FLOW HANDLERS
  // ==========================================
  // Step 1: Send Registration OTP
  const handleSendRegOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    if (!validateEmailFormat(email)) {
      setError('Please enter a valid email address format (e.g. name@example.com).');
      return;
    }

    setLoading(true);
    try {
      await sendOtp(email, 'register');
      setLoading(false);
      setSuccessMsg(`OTP verification code sent to ${email}`);
      setRegStep(2);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Failed to send OTP code.');
    }
  };

  // Step 2: Verify Registration OTP
  const handleVerifyRegOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!otp || otp.length < 4) {
      setError('Please enter the 6-digit verification code sent to your email.');
      return;
    }

    setLoading(true);
    try {
      await verifyOtp(email, otp);
      setLoading(false);
      setIsVerified(true);
      setSuccessMsg('Email verified successfully! Now complete your account details.');
      setRegStep(3);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Invalid OTP code.');
    }
  };

  // Step 3: Complete Registration
  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!name || !password) {
      setError('Please fill in your full name and password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await registerUser(name, email, password);
      setLoading(false);
      navigate(redirectPath);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Registration failed.');
    }
  };

  // ==========================================
  // FORGOT PASSWORD FLOW HANDLERS
  // ==========================================
  // Step 1: Send Reset OTP
  const handleSendResetOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email) {
      setError('Please enter your registered email address.');
      return;
    }

    if (!validateEmailFormat(email)) {
      setError('Please enter a valid email address format (e.g. name@example.com).');
      return;
    }

    setLoading(true);
    try {
      await sendOtp(email, 'forgot_password');
      setLoading(false);
      setSuccessMsg(`Reset OTP verification code sent to ${email}`);
      setResetStep(2);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Failed to send reset code.');
    }
  };

  // Step 2: Verify Reset OTP
  const handleVerifyResetOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!otp || otp.length < 4) {
      setError('Please enter the 6-digit OTP code sent to your email.');
      return;
    }

    setLoading(true);
    try {
      await verifyOtp(email, otp);
      setLoading(false);
      setIsVerified(true);
      setSuccessMsg('OTP verified successfully! Set your new password.');
      setResetStep(3);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Invalid OTP code.');
    }
  };

  // Step 3: Complete Password Reset
  const handleCompleteReset = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!password) {
      setError('Please enter your new password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email, otp, password);
      setLoading(false);
      setSuccessMsg('Password updated successfully! Please sign in with your new password.');
      setTimeout(() => switchMode('sign_in'), 1500);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Failed to reset password.');
    }
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      loginWithGoogle();
      setLoading(false);
      navigate(redirectPath);
    }, 800);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#16203A', color: '#FFFFFF', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 60px 24px', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Ambient Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: '-10%',
          left: '15%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(10, 144, 181,0.25) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none'
        }}
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '15%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230,30,110,0.22) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ maxWidth: '480px', width: '100%', position: 'relative', zIndex: 2 }}>
        
        {/* Notice Message Banner if redirected */}
        {reasonMessage && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              backgroundColor: 'rgba(10, 144, 181, 0.15)',
              border: '1px solid rgba(10, 144, 181, 0.4)',
              color: '#0A90B5',
              padding: '12px 18px',
              borderRadius: '14px',
              fontSize: '14px',
              fontWeight: 700,
              textAlign: 'center',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Sparkles size={16} color="#0A90B5" />
            {reasonMessage}
          </motion.div>
        )}

        {/* Interactive Animated Mascot Header */}
        <AnimatedMascot 
          isPasswordFocused={isPasswordFocused} 
          isRegistering={mode === 'register'}
          inputValueLength={email.length || name.length}
        />

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundColor: '#10182E',
            borderRadius: '28px',
            padding: '36px 32px',
            border: '1px solid rgba(10, 144, 181, 0.3)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
          }}
        >
          {/* Header & Tabs */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: "'Clash Display', 'Outfit', sans-serif", fontSize: '26px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 16px 0' }}>
              {mode === 'sign_in' && 'Welcome Back'}
              {mode === 'register' && 'Create Your Account'}
              {mode === 'forgot_password' && 'Reset Your Password'}
            </h2>

            {/* Mode Selector Tabs (Sign In / Register) */}
            {mode !== 'forgot_password' && (
              <div style={{ display: 'inline-flex', backgroundColor: '#16203A', padding: '5px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <button
                  type="button"
                  onClick={() => switchMode('sign_in')}
                  style={{
                    backgroundColor: mode === 'sign_in' ? '#0A90B5' : 'transparent',
                    color: mode === 'sign_in' ? '#FFFFFF' : '#9CA3AF',
                    border: 'none',
                    padding: '8px 24px',
                    borderRadius: '50px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => switchMode('register')}
                  style={{
                    backgroundColor: mode === 'register' ? '#0A90B5' : 'transparent',
                    color: mode === 'register' ? '#FFFFFF' : '#9CA3AF',
                    border: 'none',
                    padding: '8px 24px',
                    borderRadius: '50px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                >
                  Register
                </button>
              </div>
            )}

            {/* Back Button for Forgot Password */}
            {mode === 'forgot_password' && (
              <button
                type="button"
                onClick={() => switchMode('sign_in')}
                style={{
                  backgroundColor: 'transparent',
                  color: '#9CA3AF',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <ArrowLeft size={16} /> Back to Sign In
              </button>
            )}
          </div>

          {/* Messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#EF4444',
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '18px',
                textAlign: 'center'
              }}
            >
              {error}
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                color: '#22C55E',
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '18px',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <CheckCircle2 size={16} />
              {successMsg}
            </motion.div>
          )}

          {/* ==================================================== */}
          {/* MODE 1: SIGN IN FORM */}
          {/* ==================================================== */}
          {mode === 'sign_in' && (
            <div>
              {/* Google Login */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                style={{
                  width: '100%',
                  backgroundColor: '#FFFFFF',
                  color: '#111827',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '14px 20px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  marginBottom: '20px',
                  boxShadow: '0 4px 14px rgba(255,255,255,0.1)',
                  transition: 'all 0.2s ease'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                Continue with Google
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                <span style={{ fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px' }}>or email</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
              </div>

              <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#D1D5DB', marginBottom: '6px' }}>Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        backgroundColor: '#16203A',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '12px',
                        padding: '14px 16px 14px 46px',
                        color: '#FFFFFF',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#D1D5DB' }}>Password</label>
                    <button
                      type="button"
                      onClick={() => switchMode('forgot_password')}
                      style={{ backgroundColor: 'transparent', border: 'none', color: '#0A90B5', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                      style={{
                        width: '100%',
                        backgroundColor: '#16203A',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '12px',
                        padding: '14px 16px 14px 46px',
                        color: '#FFFFFF',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: '#0A90B5',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '16px',
                    fontSize: '16px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    marginTop: '8px',
                    boxShadow: '0 8px 24px rgba(10, 144, 181, 0.4)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {loading ? 'Authenticating...' : 'Sign In Now'}
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>
          )}

          {/* ==================================================== */}
          {/* MODE 2: REGISTER WITH OTP & UNIQUENESS CHECK */}
          {/* ==================================================== */}
          {mode === 'register' && (
            <div>
              {/* Step indicator */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
                <div style={{ width: '28px', height: '6px', borderRadius: '4px', backgroundColor: regStep >= 1 ? '#0A90B5' : '#2D2D35' }}></div>
                <div style={{ width: '28px', height: '6px', borderRadius: '4px', backgroundColor: regStep >= 2 ? '#0A90B5' : '#2D2D35' }}></div>
                <div style={{ width: '28px', height: '6px', borderRadius: '4px', backgroundColor: regStep >= 3 ? '#0A90B5' : '#2D2D35' }}></div>
              </div>

              {/* Step 1: Input Email & Check Uniqueness -> Send OTP */}
              {regStep === 1 && (
                <form onSubmit={handleSendRegOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#D1D5DB', marginBottom: '6px' }}>Email Address</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={18} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          width: '100%',
                          backgroundColor: '#16203A',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '12px',
                          padding: '14px 16px 14px 46px',
                          color: '#FFFFFF',
                          fontSize: '15px',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      backgroundColor: '#0A90B5',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '14px',
                      padding: '16px',
                      fontSize: '15px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      boxShadow: '0 8px 24px rgba(10, 144, 181, 0.4)'
                    }}
                  >
                    {loading ? 'Sending OTP via Resend...' : 'Send Email Verification OTP'}
                    <ShieldCheck size={18} />
                  </button>
                </form>
              )}

              {/* Step 2: Verify 6-digit OTP */}
              {regStep === 2 && (
                <form onSubmit={handleVerifyRegOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#D1D5DB', marginBottom: '6px' }}>Enter 6-Digit OTP Code</label>
                    <div style={{ position: 'relative' }}>
                      <KeyRound size={18} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="123456"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={{
                          width: '100%',
                          backgroundColor: '#16203A',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '12px',
                          padding: '14px 16px 14px 46px',
                          color: '#FFFFFF',
                          fontSize: '18px',
                          letterSpacing: '4px',
                          fontWeight: 700,
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setRegStep(1)}
                      style={{
                        flex: 1,
                        backgroundColor: '#23232A',
                        color: '#9CA3AF',
                        border: 'none',
                        borderRadius: '14px',
                        padding: '14px',
                        fontSize: '14px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Resend / Change
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        flex: 2,
                        backgroundColor: '#0A90B5',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '14px',
                        padding: '14px',
                        fontSize: '15px',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      {loading ? 'Verifying...' : 'Verify OTP Code'}
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Complete Name & Password */}
              {regStep === 3 && (
                <form onSubmit={handleCompleteRegistration} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#D1D5DB', marginBottom: '6px' }}>Full Name</label>
                    <div style={{ position: 'relative' }}>
                      <User size={18} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="text"
                        placeholder="Ankit Singh"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                          width: '100%',
                          backgroundColor: '#16203A',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '12px',
                          padding: '14px 16px 14px 46px',
                          color: '#FFFFFF',
                          fontSize: '15px',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#D1D5DB', marginBottom: '6px' }}>Password</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={18} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        style={{
                          width: '100%',
                          backgroundColor: '#16203A',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '12px',
                          padding: '14px 16px 14px 46px',
                          color: '#FFFFFF',
                          fontSize: '15px',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#D1D5DB', marginBottom: '6px' }}>Confirm Password</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={18} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        style={{
                          width: '100%',
                          backgroundColor: '#16203A',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '12px',
                          padding: '14px 16px 14px 46px',
                          color: '#FFFFFF',
                          fontSize: '15px',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      backgroundColor: '#0A90B5',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '14px',
                      padding: '16px',
                      fontSize: '16px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      marginTop: '6px',
                      boxShadow: '0 8px 24px rgba(10, 144, 181, 0.4)'
                    }}
                  >
                    {loading ? 'Creating Account...' : 'Complete Registration'}
                    <ArrowRight size={20} />
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ==================================================== */}
          {/* MODE 3: FORGOT PASSWORD WITH OTP & PASSWORD RESET */}
          {/* ==================================================== */}
          {mode === 'forgot_password' && (
            <div>
              {/* Step indicator */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
                <div style={{ width: '28px', height: '6px', borderRadius: '4px', backgroundColor: resetStep >= 1 ? '#0A90B5' : '#2D2D35' }}></div>
                <div style={{ width: '28px', height: '6px', borderRadius: '4px', backgroundColor: resetStep >= 2 ? '#0A90B5' : '#2D2D35' }}></div>
                <div style={{ width: '28px', height: '6px', borderRadius: '4px', backgroundColor: resetStep >= 3 ? '#0A90B5' : '#2D2D35' }}></div>
              </div>

              {/* Step 1: Send Reset OTP */}
              {resetStep === 1 && (
                <form onSubmit={handleSendResetOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#D1D5DB', marginBottom: '6px' }}>Registered Email Address</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={18} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          width: '100%',
                          backgroundColor: '#16203A',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '12px',
                          padding: '14px 16px 14px 46px',
                          color: '#FFFFFF',
                          fontSize: '15px',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      backgroundColor: '#0A90B5',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '14px',
                      padding: '16px',
                      fontSize: '15px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      boxShadow: '0 8px 24px rgba(10, 144, 181, 0.4)'
                    }}
                  >
                    {loading ? 'Sending OTP Code...' : 'Send Password Reset OTP'}
                    <ShieldCheck size={18} />
                  </button>
                </form>
              )}

              {/* Step 2: Verify Reset OTP */}
              {resetStep === 2 && (
                <form onSubmit={handleVerifyResetOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#D1D5DB', marginBottom: '6px' }}>Enter Reset OTP Code</label>
                    <div style={{ position: 'relative' }}>
                      <KeyRound size={18} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="123456"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={{
                          width: '100%',
                          backgroundColor: '#16203A',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '12px',
                          padding: '14px 16px 14px 46px',
                          color: '#FFFFFF',
                          fontSize: '18px',
                          letterSpacing: '4px',
                          fontWeight: 700,
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setResetStep(1)}
                      style={{
                        flex: 1,
                        backgroundColor: '#23232A',
                        color: '#9CA3AF',
                        border: 'none',
                        borderRadius: '14px',
                        padding: '14px',
                        fontSize: '14px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Resend Code
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        flex: 2,
                        backgroundColor: '#0A90B5',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '14px',
                        padding: '14px',
                        fontSize: '15px',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      {loading ? 'Verifying...' : 'Verify Reset Code'}
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Enter New Password */}
              {resetStep === 3 && (
                <form onSubmit={handleCompleteReset} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#D1D5DB', marginBottom: '6px' }}>New Password</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={18} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        style={{
                          width: '100%',
                          backgroundColor: '#16203A',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '12px',
                          padding: '14px 16px 14px 46px',
                          color: '#FFFFFF',
                          fontSize: '15px',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#D1D5DB', marginBottom: '6px' }}>Confirm New Password</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={18} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        style={{
                          width: '100%',
                          backgroundColor: '#16203A',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '12px',
                          padding: '14px 16px 14px 46px',
                          color: '#FFFFFF',
                          fontSize: '15px',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      backgroundColor: '#0A90B5',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '14px',
                      padding: '16px',
                      fontSize: '16px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      marginTop: '6px',
                      boxShadow: '0 8px 24px rgba(10, 144, 181, 0.4)'
                    }}
                  >
                    {loading ? 'Updating Password...' : 'Reset Password'}
                    <ArrowRight size={20} />
                  </button>
                </form>
              )}
            </div>
          )}

        </motion.div>
      </div>

    </div>
  );
};

export default Login;
