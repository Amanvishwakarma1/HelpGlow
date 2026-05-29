import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Lock, ShieldCheck, ArrowRight, ArrowLeft, KeyRound, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth, isConfigured } from '../../config/firebase';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    emailOrMobile: '',
    password: '',
    confirmPassword: ''
  });
  
  // 6-Digit OTP State & Timer
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const otpInputsRef = useRef([]);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const navigate = useNavigate();

  // Branded Colors
  const colors = {
    magenta: '#8e2382',
    pink: '#e61e6e',
    orange: '#f37021',
    gold: '#d4af37',
    lightBg: '#fff5f8'
  };

  // Timer Countdown Logic for OTP Resend
  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Initialize Firebase reCAPTCHA Verifier
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: (response) => {
            // reCAPTCHA solved, trigger SMS verification
          },
          'expired-callback': () => {
            alert("reCAPTCHA session expired. Please request OTP again.");
          }
        });
      } catch (err) {
        console.error("reCAPTCHA creation error: ", err);
      }
    }
  };

  // Handle Step 1 Submit: Validate and Trigger OTP send
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    setLoading(true);
    try {
      const isEmail = formData.emailOrMobile.includes('@');
      
      if (isEmail) {
        // 🚀 Email Verification Flow (Brevo SMTP Scaled Router)
        await axios.post('/api/auth/send-otp', {
          emailOrMobile: formData.emailOrMobile
        });
        alert(`A 6-digit OTP has been sent to ${formData.emailOrMobile}`);
        setStep(2); // Go to OTP verification step
        setTimer(60);
        setIsResendDisabled(true);
      } else {
        // 📲 Mobile Phone OTP Flow
        if (isConfigured && auth) {
          // Firebase Real SMS Gateway Router
          setupRecaptcha();
          const appVerifier = window.recaptchaVerifier;
          
          let phoneNumber = formData.emailOrMobile.trim();
          // Ensure E.164 phone formatting for Firebase
          if (!phoneNumber.startsWith('+')) {
            if (phoneNumber.length === 10) {
              phoneNumber = '+91' + phoneNumber; // Default to India country code
            } else {
              alert("Please input phone number in international format starting with country code (e.g. +91XXXXXXXXXX).");
              setLoading(false);
              return;
            }
          }
          
          const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
          setConfirmationResult(confirmation);
          alert(`A verification SMS has been sent to ${phoneNumber}`);
          setStep(2);
          setTimer(60);
          setIsResendDisabled(true);
        } else {
          // ℹ️ Firebase Fallback: Local Console Logger Mode
          await axios.post('/api/auth/send-otp', {
            emailOrMobile: formData.emailOrMobile
          });
          alert(`[DEVELOPER TEST MODE] Mobile OTP has been sent to the backend terminal console for ${formData.emailOrMobile}`);
          setStep(2);
          setTimer(60);
          setIsResendDisabled(true);
        }
      }
    } catch (err) {
      console.error("OTP Request Failure: ", err);
      alert(err.response?.data?.error || err.message || "Failed to send OTP code. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  // Handle individual digit entries inside the OTP grid
  const handleOtpChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, ''); // Numeric inputs only
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Get last digit
    setOtp(newOtp);

    // Auto-focus next box
    if (index < 5 && element.value !== "") {
      otpInputsRef.current[index + 1].focus();
    }
  };

  // Handle backspace cursor routing in OTP grid
  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        // Move focus backward if current is empty
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        otpInputsRef.current[index - 1].focus();
      } else {
        // Clear current value
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  // Resend OTP Action
  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const isEmail = formData.emailOrMobile.includes('@');
      
      if (isEmail) {
        await axios.post('/api/auth/send-otp', {
          emailOrMobile: formData.emailOrMobile
        });
      } else {
        if (isConfigured && auth) {
          setupRecaptcha();
          const appVerifier = window.recaptchaVerifier;
          let phoneNumber = formData.emailOrMobile.trim();
          if (!phoneNumber.startsWith('+') && phoneNumber.length === 10) {
            phoneNumber = '+91' + phoneNumber;
          }
          const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
          setConfirmationResult(confirmation);
        } else {
          // Dev Mode fallback
          await axios.post('/api/auth/send-otp', {
            emailOrMobile: formData.emailOrMobile
          });
        }
      }
      alert("A new OTP has been sent!");
      setTimer(60);
      setIsResendDisabled(true);
      setOtp(['', '', '', '', '', '']);
      otpInputsRef.current[0].focus();
    } catch (err) {
      console.error("Resend OTP error: ", err);
      alert("Failed to resend OTP. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP Code
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      alert("Please enter all 6 digits of the OTP.");
      return;
    }

    setLoading(true);
    try {
      const isEmail = formData.emailOrMobile.includes('@');
      
      if (isEmail || !isConfigured) {
        // Verify via backend Map OTP engine
        await axios.post('/api/auth/verify-otp', {
          emailOrMobile: formData.emailOrMobile,
          otp: enteredOtp
        });
      } else {
        // Verify via Firebase SDK
        if (confirmationResult) {
          await confirmationResult.confirm(enteredOtp);
        } else {
          throw new Error("Phone verification session not found. Please request a new code.");
        }
      }

      setStep(3); // Route to final confirmation
    } catch (err) {
      console.error("OTP verification error: ", err);
      alert(err.response?.data?.error || err.message || "Incorrect OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Final Registration Call
  const handleFinalRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/auth/register', {
        username: formData.name,
        email: formData.emailOrMobile,
        password: formData.password
      });

      alert("Registration Successful! Welcome to HelpGlow.");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper(colors)}>
      <div style={styles.card(colors)}>
        {/* Step Indicator */}
        <div style={styles.stepContainer}>
            <div style={styles.stepBubble(colors, step >= 1)}>1</div>
            <div style={styles.stepLine(colors, step >= 2)}></div>
            <div style={styles.stepBubble(colors, step >= 2)}>2</div>
            <div style={styles.stepLine(colors, step === 3)}></div>
            <div style={styles.stepBubble(colors, step === 3)}>3</div>
        </div>

        <div style={styles.header}>
          <h1 style={styles.title(colors)}>
            {step === 1 ? "Create Account" : step === 2 ? "Verify Email/Phone" : "Confirm Registration"}
          </h1>
          <p style={styles.subtitle}>
            {step === 1 ? "Join the HelpGlow community today" : step === 2 ? "Enter the 6-digit OTP code sent" : "Confirm your information below"}
          </p>
        </div>

        {/* STEP 1: Registration Details */}
        {step === 1 && (
          <form onSubmit={handleRequestOTP} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <div style={styles.inputWrapper}>
                <User size={18} style={styles.icon} />
                <input 
                  type="text" required placeholder="Satyam Singh" style={styles.input}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  value={formData.name}
                />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address / Mobile</label>
              <div style={styles.inputWrapper}>
                <Mail size={18} style={styles.icon} />
                <input 
                  type="text" required placeholder="example@mail.com or 10-digit mobile" style={styles.input}
                  onChange={(e) => setFormData({...formData, emailOrMobile: e.target.value})}
                  value={formData.emailOrMobile}
                />
              </div>
            </div>
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
            <button type="submit" disabled={loading} className="premium-btn" style={styles.primaryBtn(colors)}>
              {loading ? "Sending OTP..." : "Get Verification OTP"} 
              {!loading && <ArrowRight size={20} style={{marginLeft: '10px'}} />}
            </button>
          </form>
        )}

        {/* STEP 2: Beautiful 6-Digit OTP Grid */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP} style={styles.form}>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 15px 0' }}>
                We've dispatched an OTP code to: <br/>
                <strong style={{ color: colors.magenta }}>{formData.emailOrMobile}</strong>
              </p>
              
              {/* OTP Grid */}
              <div style={styles.otpGrid}>
                {otp.map((data, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength="1"
                    ref={(el) => (otpInputsRef.current[idx] = el)}
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, idx)}
                    onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                    style={styles.otpInput}
                    className="otp-box-focus"
                  />
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="premium-btn" style={styles.primaryBtn(colors)}>
              {loading ? "Verifying..." : "Verify OTP Code"}
            </button>

            {/* Resend Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <button 
                type="button" 
                disabled={isResendDisabled || loading} 
                onClick={handleResendOTP}
                style={{
                  ...styles.resendBtn(colors),
                  opacity: isResendDisabled ? 0.5 : 1,
                  cursor: isResendDisabled ? 'not-allowed' : 'pointer'
                }}
              >
                <RefreshCw size={14} style={{ marginRight: '6px' }} /> Resend OTP
              </button>
              {isResendDisabled && (
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Resend OTP in <strong style={{ color: colors.pink }}>{timer}s</strong>
                </span>
              )}
            </div>

            <button type="button" style={styles.backBtn(colors)} onClick={() => setStep(1)}>
              <ArrowLeft size={16} /> Edit Email/Mobile
            </button>
          </form>
        )}

        {/* STEP 3: Verification & Confirm Registration */}
        {step === 3 && (
          <form onSubmit={handleFinalRegister} style={styles.form}>
            <div style={styles.verifyBox}>
                <CheckCircle2 size={36} color="#22c55e" style={{ marginBottom: '10px' }} />
                <p style={{margin: '0 0 5px 0', fontSize: '13px', color: '#64748b'}}>Verified Account Identity</p>
                <p style={{margin: '0 0 15px 0', fontWeight: '800', color: colors.magenta, fontSize: '17px'}}>{formData.emailOrMobile}</p>
                <p style={{margin: 0, fontSize: '12px', color: '#94a3b8', fontStyle: 'italic'}}>Click below to complete registration and log in.</p>
            </div>
            
            <button type="submit" disabled={loading} className="premium-btn" style={styles.primaryBtn(colors)}>
              {loading ? "Completing Account..." : "Complete Registration"}
            </button>
            <button type="button" style={styles.backBtn(colors)} onClick={() => setStep(1)}>
              <ArrowLeft size={16} /> Go Back to Edit
            </button>
          </form>
        )}
      </div>
      <div id="recaptcha-container"></div>

      <style>{` 
        .premium-btn { 
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
            cursor: pointer; 
        } 
        .premium-btn:hover { 
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
        .otp-box-focus:focus {
            border-color: ${colors.gold} !important;
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.3) !important;
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
    backgroundColor: '#fff', width: '100%', maxWidth: '460px', borderRadius: '30px',
    padding: '50px 40px', boxShadow: '0 25px 60px rgba(142, 35, 130, 0.12)', 
    border: `1.5px solid rgba(212, 175, 55, 0.2)`, position: 'relative'
  }),
  stepContainer: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px', gap: '10px'
  },
  stepBubble: (colors, active) => ({
    width: '32px', height: '32px', borderRadius: '50%', 
    background: active ? `linear-gradient(135deg, ${colors.magenta}, ${colors.pink})` : '#e2e8f0',
    color: active ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '14px', fontWeight: '800', transition: '0.3s'
  }),
  stepLine: (colors, active) => ({
    width: '30px', height: '3px', background: active ? colors.pink : '#e2e8f0', borderRadius: '2px', transition: '0.3s'
  }),
  header: { textAlign: 'center', marginBottom: '35px' },
  title: (colors) => ({ fontSize: '26px', fontWeight: '800', color: colors.magenta, marginBottom: '8px', letterSpacing: '-0.5px' }),
  subtitle: { color: '#64748b', fontSize: '14px', lineHeight: '1.4' },
  form: { display: 'flex', flexDirection: 'column', gap: '22px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '700', color: '#475569', marginLeft: '4px' },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  icon: { position: 'absolute', left: '16px', color: '#94a3b8' },
  input: {
    width: '100%', padding: '14px 16px 14px 48px', borderRadius: '15px',
    border: '1.5px solid #e2e8f0', fontSize: '15px', outline: 'none', transition: '0.3s', backgroundColor: '#f8fafc'
  },
  otpGrid: {
    display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px', marginBottom: '5px'
  },
  otpInput: {
    width: '46px', height: '54px', fontSize: '24px', fontWeight: '900', textAlign: 'center',
    border: '2px solid #e2e8f0', borderRadius: '12px', outline: 'none', backgroundColor: '#f8fafc',
    transition: 'all 0.2s ease', color: '#8e2382'
  },
  resendBtn: (colors) => ({
    background: 'none', border: 'none', color: colors.pink, fontSize: '13px',
    fontWeight: '800', display: 'inline-flex', alignItems: 'center', transition: '0.2s'
  }),
  primaryBtn: (colors) => ({
    background: `linear-gradient(to right, ${colors.magenta}, ${colors.pink})`, 
    color: '#fff', padding: '16px', borderRadius: '15px',
    border: 'none', fontSize: '16px', fontWeight: '700', display: 'flex', justifyContent: 'center', alignItems: 'center'
  }),
  verifyBox: {
    padding: '25px', borderRadius: '20px', background: '#fdf7f9', border: '1.5px dashed #e2e8f0',
    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '10px'
  },
  backBtn: (colors) => ({
    background: 'none', border: 'none', color: colors.magenta, fontSize: '14px',
    fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '5px'
  })
};

export default Register;