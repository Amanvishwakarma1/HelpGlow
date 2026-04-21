import React, { useState } from 'react';
import { User, Mail, Lock, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    emailOrMobile: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  // Branded Colors
  const colors = {
    magenta: '#8e2382',
    pink: '#e61e6e',
    orange: '#f37021',
    gold: '#d4af37',
    lightBg: '#fff5f8'
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setStep(2); 
  };

  const handleFinalRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://helpglow.onrender.com/api/auth/register', {
        username: formData.name,
        email: formData.emailOrMobile,
        password: formData.password
      });

      alert("Registration Successful! Welcome to HelpGlow.");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed. Try a different email.");
    }
  };

  return (
    <div style={styles.pageWrapper(colors)}>
      <div style={styles.card(colors)}>
        {/* Step Indicator */}
        <div style={styles.stepContainer}>
            <div style={styles.stepBubble(colors, step >= 1)}>1</div>
            <div style={styles.stepLine(colors, step === 2)}></div>
            <div style={styles.stepBubble(colors, step === 2)}>2</div>
        </div>

        <div style={styles.header}>
          <h1 style={styles.title(colors)}>{step === 1 ? "Create Account" : "Verify Details"}</h1>
          <p style={styles.subtitle}>{step === 1 ? "Join the HelpGlow community today" : "Confirm your information below"}</p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleNext} style={styles.form}>
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
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <Mail size={18} style={styles.icon} />
                <input 
                  type="email" required placeholder="example@mail.com" style={styles.input}
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
            <button type="submit" className="premium-btn" style={styles.primaryBtn(colors)}>
              Continue <ArrowRight size={20} style={{marginLeft: '10px'}} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleFinalRegister} style={styles.form}>
            <div style={styles.verifyBox}>
                <p style={{margin: '0 0 5px 0', fontSize: '13px', color: '#64748b'}}>Account Email</p>
                <p style={{margin: 0, fontWeight: '700', color: colors.magenta, fontSize: '16px'}}>{formData.emailOrMobile}</p>
            </div>
            
            <button type="submit" className="premium-btn" style={styles.primaryBtn(colors)}>
              Complete Registration
            </button>
            <button type="button" style={styles.backBtn(colors)} onClick={() => setStep(1)}>
              <ArrowLeft size={16} /> Go Back to Edit
            </button>
          </form>
        )}
      </div>

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
    width: '40px', height: '3px', background: active ? colors.pink : '#e2e8f0', borderRadius: '2px', transition: '0.3s'
  }),
  header: { textAlign: 'center', marginBottom: '35px' },
  title: (colors) => ({ fontSize: '28px', fontWeight: '800', color: colors.magenta, marginBottom: '8px', letterSpacing: '-0.5px' }),
  subtitle: { color: '#64748b', fontSize: '14px' },
  form: { display: 'flex', flexDirection: 'column', gap: '22px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '700', color: '#475569', marginLeft: '4px' },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  icon: { position: 'absolute', left: '16px', color: '#94a3b8' },
  input: {
    width: '100%', padding: '14px 16px 14px 48px', borderRadius: '15px',
    border: '1.5px solid #e2e8f0', fontSize: '15px', outline: 'none', transition: '0.3s', backgroundColor: '#f8fafc'
  },
  primaryBtn: (colors) => ({
    background: `linear-gradient(to right, ${colors.magenta}, ${colors.pink})`, 
    color: '#fff', padding: '16px', borderRadius: '15px',
    border: 'none', fontSize: '16px', fontWeight: '700', display: 'flex', justifyContent: 'center', alignItems: 'center'
  }),
  verifyBox: {
    padding: '20px', borderRadius: '15px', background: '#fdf7f9', border: '1px dashed #e2e8f0', textAlign: 'center', marginBottom: '10px'
  },
  backBtn: (colors) => ({
    background: 'none', border: 'none', color: colors.magenta, fontSize: '14px',
    fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '5px'
  })
};

export default Register;