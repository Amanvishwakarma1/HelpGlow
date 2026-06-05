import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    emailOrMobile: '',
    password: '',
    confirmPassword: ''
  });
  
  // OTP States
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [expiryTimer, setExpiryTimer] = useState(0);
  
  // Custom Alert Message
  const [message, setMessage] = useState({ text: '', type: '', link: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Branded Colors
  const colors = {
    magenta: '#8e2382',
    pink: '#e61e6e',
    orange: '#f37021',
    gold: '#d4af37',
    lightBg: '#fff5f8'
  };

  // Timers Effect for OTP Resend and Expiry
  useEffect(() => {
    let resendInterval;
    if (otpSent && resendTimer > 0) {
      resendInterval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(resendInterval);
  }, [otpSent, resendTimer]);

  useEffect(() => {
    let expiryInterval;
    if (otpSent && expiryTimer > 0 && !otpVerified) {
      expiryInterval = setInterval(() => {
        setExpiryTimer(prev => prev - 1);
      }, 1000);
    } else if (expiryTimer === 0 && otpSent && !otpVerified) {
      setMessage({
        text: 'Verification code has expired. Please request a new OTP.',
        type: 'error'
      });
    }
    return () => clearInterval(expiryInterval);
  }, [otpSent, expiryTimer, otpVerified]);

  const getApiUrl = (path) => {
    const hostname = window.location.hostname;
    const isLocal = 
      hostname === 'localhost' || 
      hostname === '127.0.0.1' || 
      hostname === '[::1]' || 
      hostname.startsWith('192.168.') || 
      hostname.startsWith('10.') || 
      hostname.startsWith('172.') || 
      hostname.endsWith('.local');
      
    const baseUrl = isLocal ? `http://${hostname}:5000` : 'https://helpglow.onrender.com';
    return `${baseUrl}${path}`;
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Request OTP from backend
  const handleSendOtp = async () => {
    if (!formData.emailOrMobile) {
      setMessage({ text: 'Please enter your email address first.', type: 'error' });
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.emailOrMobile)) {
      setMessage({ text: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    setOtpLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      const res = await axios.post(getApiUrl('/api/auth/send-otp'), {
        email: formData.emailOrMobile
      });

      setOtpSent(true);
      setResendTimer(60);
      setExpiryTimer(300); // 5 minutes
      
      setMessage({
        text: res.data.otp 
          ? `[Dev Mode] Verification code is: ${res.data.otp}` 
          : (res.data.message || 'Verification code sent successfully to your email!'),
        type: 'success',
        link: res.data.devMode ? res.data.devPreviewUrl : ''
      });
    } catch (err) {
      setMessage({
        text: err.response?.data?.error || 'Failed to send verification code. Please try again.',
        type: 'error'
      });
    } finally {
      setOtpLoading(false);
    }
  };

  // Verify OTP with backend
  const handleVerifyOtp = async () => {
    if (!otp || otp.trim().length !== 6) {
      setMessage({ text: 'Please enter the 6-digit verification code.', type: 'error' });
      return;
    }

    setOtpLoading(true);
    setMessage({ text: '', type: '' });

    try {
      await axios.post(getApiUrl('/api/auth/verify-otp'), {
        email: formData.emailOrMobile,
        otp: otp.trim()
      });

      setOtpVerified(true);
      setMessage({ text: 'Email verified successfully! You can now create your account.', type: 'success' });
    } catch (err) {
      setMessage({
        text: err.response?.data?.error || 'Verification failed. Please check the code.',
        type: 'error'
      });
    } finally {
      setOtpLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      setMessage({ text: 'Please verify your email via OTP first.', type: 'error' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: 'Passwords do not match!', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });
    try {
      await axios.post(getApiUrl('/api/auth/register'), {
        username: formData.name,
        email: formData.emailOrMobile,
        password: formData.password
      });

      alert("Registration Successful! Welcome to HelpGlow.");
      navigate('/login');
    } catch (err) {
      setMessage({
        text: err.response?.data?.error || "Registration failed. Try a different email.",
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper(colors)}>
      <div style={styles.card(colors)}>
        <div style={styles.header}>
          <h1 style={styles.title(colors)}>Create Account</h1>
          <p style={styles.subtitle}>Join the HelpGlow community today</p>
        </div>

        {/* Custom Status Alerts */}
        {message.text && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: '600',
            backgroundColor: message.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            color: message.type === 'success' ? '#166534' : '#991b1b',
            border: `1px solid ${message.type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            marginBottom: '18px'
          }}>
            <div>{message.text}</div>
            {message.link && (
              <a href={message.link} target="_blank" rel="noopener noreferrer" style={{ color: colors.pink, textDecoration: 'underline', wordBreak: 'break-all', fontSize: '12px', fontWeight: 'bold' }}>
                🔗 [Dev Preview] Click here to view sent email OTP
              </a>
            )}
          </div>
        )}

        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <div style={styles.inputWrapper}>
              <User size={18} style={styles.icon} />
              <input 
                type="text" required placeholder="Satyam Singh" style={styles.input}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                value={formData.name}
                disabled={otpVerified}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ ...styles.inputWrapper, flex: 1 }}>
                <Mail size={18} style={styles.icon} />
                <input 
                  type="email" 
                  required 
                  placeholder="example@mail.com" 
                  style={{ ...styles.input, backgroundColor: (otpSent || otpVerified) ? '#f1f5f9' : '#f8fafc' }}
                  onChange={(e) => setFormData({...formData, emailOrMobile: e.target.value})}
                  value={formData.emailOrMobile}
                  disabled={otpSent || otpVerified}
                />
              </div>
              {!otpVerified && (
                <button
                  type="button"
                  disabled={otpLoading || !formData.emailOrMobile || resendTimer > 0}
                  onClick={handleSendOtp}
                  style={styles.inlineBtn(colors, otpLoading || !formData.emailOrMobile || resendTimer > 0)}
                  className="premium-btn"
                >
                  {otpLoading ? 'Sending...' : otpSent ? (resendTimer > 0 ? `Resend (${resendTimer}s)` : 'Resend OTP') : 'Send OTP'}
                </button>
              )}
            </div>
          </div>

          {/* OTP Verification Input (conditional rendering) */}
          {otpSent && !otpVerified && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Enter Verification Code (OTP)</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ ...styles.inputWrapper, flex: 1 }}>
                  <ShieldCheck size={18} style={styles.icon} />
                  <input 
                    type="text" 
                    required 
                    maxLength={6}
                    placeholder="Enter 6-digit OTP" 
                    style={styles.input}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // Numeric only
                    value={otp}
                  />
                </div>
                <button
                  type="button"
                  disabled={otpLoading || otp.length !== 6 || expiryTimer === 0}
                  onClick={handleVerifyOtp}
                  style={styles.inlineBtn(colors, otpLoading || otp.length !== 6 || expiryTimer === 0)}
                  className="premium-btn"
                >
                  {otpLoading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', marginTop: '4px', padding: '0 4px' }}>
                <span>Please check your email.</span>
                <span style={{ color: expiryTimer < 60 ? '#ef4444' : '#64748b', fontWeight: 'bold' }}>
                  Expires in: {formatTime(expiryTimer)}
                </span>
              </div>
            </div>
          )}

          {/* Verified Badge */}
          {otpVerified && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              color: '#166534',
              padding: '12px 16px',
              borderRadius: '15px',
              fontSize: '14px',
              fontWeight: '700'
            }}>
              <ShieldCheck size={18} style={{ color: '#22c55e' }} />
              Email Verified Successfully!
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <Lock size={18} style={styles.icon} />
              <input 
                type="password" required placeholder="••••••••" style={styles.input}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                value={formData.password}
              />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <div style={styles.inputWrapper}>
              <ShieldCheck size={18} style={styles.icon} />
              <input 
                type="password" required placeholder="••••••••" style={styles.input}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                value={formData.confirmPassword}
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading || !otpVerified} 
            className="premium-btn" 
            style={styles.primaryBtn(colors, !otpVerified)}
          >
            {loading ? "Creating Account..." : "Create Account"} 
            {!loading && <ArrowRight size={20} style={{marginLeft: '10px'}} />}
          </button>
        </form>
      </div>

      <style>{` 
        .premium-btn { 
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
            cursor: pointer; 
        } 
        .premium-btn:hover:not(:disabled) { 
            transform: translateY(-3px); 
            box-shadow: 0 12px 25px rgba(230, 30, 110, 0.3); 
            filter: brightness(1.1);
        } 
        .premium-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none !important;
            box-shadow: none !important;
        }
        input:focus {
            border-color: ${colors.pink} !important;
            box-shadow: 0 0 0 4px rgba(230, 30, 110, 0.1);
        }
      `}</style>
    </div>
  );
};

const styles = {
  pageWrapper: (colors) => ({
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.lightBg, fontFamily: '"Poppins", sans-serif', padding: '20px',
    backgroundImage: `radial-gradient(circle at top right, rgba(142, 35, 130, 0.05), transparent), radial-gradient(circle at bottom left, rgba(212, 175, 55, 0.05), transparent)`
  }),
  card: (colors) => ({
    backgroundColor: '#fff', width: '100%', maxWidth: '480px', borderRadius: '30px',
    padding: '40px 35px', boxShadow: '0 25px 60px rgba(142, 35, 130, 0.12)', 
    border: `1.5px solid rgba(212, 175, 55, 0.2)`, position: 'relative'
  }),
  header: { textAlign: 'center', marginBottom: '25px' },
  title: (colors) => ({ fontSize: '26px', fontWeight: '800', color: colors.magenta, marginBottom: '8px', letterSpacing: '-0.5px' }),
  subtitle: { color: '#64748b', fontSize: '14px', lineHeight: '1.4' },
  form: { display: 'flex', flexDirection: 'column', gap: '18px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '700', color: '#475569', marginLeft: '4px' },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  icon: { position: 'absolute', left: '16px', color: '#94a3b8', zIndex: 10 },
  input: {
    width: '100%', padding: '14px 16px 14px 48px', borderRadius: '15px',
    border: '1.5px solid #e2e8f0', fontSize: '15px', outline: 'none', transition: '0.3s', backgroundColor: '#f8fafc'
  },
  inlineBtn: (colors, disabled) => ({
    background: disabled 
      ? '#cbd5e1' 
      : `linear-gradient(to right, ${colors.magenta}, ${colors.pink})`,
    color: disabled ? '#94a3b8' : '#fff',
    padding: '14px 20px',
    borderRadius: '15px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '700',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap'
  }),
  primaryBtn: (colors, disabled) => ({
    background: disabled 
      ? '#cbd5e1' 
      : `linear-gradient(to right, ${colors.magenta}, ${colors.pink})`, 
    color: disabled ? '#94a3b8' : '#fff', padding: '16px', borderRadius: '15px',
    border: 'none', fontSize: '16px', fontWeight: '700', display: 'flex', justifyContent: 'center', alignItems: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease'
  })
};

export default Register;