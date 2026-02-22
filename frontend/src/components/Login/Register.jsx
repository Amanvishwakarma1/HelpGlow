import React, { useState } from 'react';
import { User, Mail, Lock, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';
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
      // Map 'name' to 'username' to match your backend
      await axios.post('https://helpglow.onrender.com/api/auth/register', {
        username: formData.name,
        email: formData.emailOrMobile,
        password: formData.password
      });

      alert("Registration Successful! Please login.");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed. Try a different email.");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>{step === 1 ? "Create Account" : "Verify Details"}</h1>
          <p style={styles.subtitle}>{step === 1 ? "Join HelpGlow" : "Finalize your registration"}</p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleNext} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <div style={styles.inputWrapper}>
                <User size={20} style={styles.icon} />
                <input 
                  type="text" required placeholder="Satyam Singh" style={styles.input}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <Mail size={20} style={styles.icon} />
                <input 
                  type="email" required placeholder="example@mail.com" style={styles.input}
                  onChange={(e) => setFormData({...formData, emailOrMobile: e.target.value})}
                />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <Lock size={20} style={styles.icon} />
                <input 
                  type="password" required placeholder="••••••••" style={styles.input}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Confirm Password</label>
              <div style={styles.inputWrapper}>
                <ShieldCheck size={20} style={styles.icon} />
                <input 
                  type="password" required placeholder="••••••••" style={styles.input}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            </div>
            <button type="submit" className="zoom-btn" style={styles.primaryBtn}>
              Next Step <ArrowRight size={20} style={{marginLeft: '8px'}} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleFinalRegister} style={styles.form}>
            <p style={{textAlign: 'center', color: '#64748b'}}>Registering as: <b>{formData.emailOrMobile}</b></p>
            <button type="submit" className="zoom-btn" style={styles.primaryBtn}>
              Complete Registration
            </button>
            <button type="button" style={styles.resendBtn} onClick={() => setStep(1)}>
              Go Back
            </button>
          </form>
        )}
      </div>
      <style>{` .zoom-btn { transition: all 0.3s ease; cursor: pointer; } .zoom-btn:hover { transform: scale(1.05); background-color: #0284c7 !important; } `}</style>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#f0f9ff', fontFamily: '"Poppins", sans-serif', padding: '20px'
  },
  card: {
    backgroundColor: '#fff', width: '100%', maxWidth: '480px', borderRadius: '24px',
    padding: '40px', boxShadow: '0 25px 50px rgba(14, 165, 233, 0.1)', border: '1px solid #e0f2fe'
  },
  header: { textAlign: 'center', marginBottom: '32px' },
  title: { fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' },
  subtitle: { color: '#64748b', fontSize: '14px' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#334155' },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  icon: { position: 'absolute', left: '14px', color: '#94a3b8' },
  input: {
    width: '100%', padding: '12px 16px 12px 42px', borderRadius: '10px',
    border: '2px solid #e2e8f0', fontSize: '15px', outline: 'none'
  },
  primaryBtn: {
    backgroundColor: '#0ea5e9', color: '#fff', padding: '14px', borderRadius: '12px',
    border: 'none', fontSize: '16px', fontWeight: '700', display: 'flex', justifyContent: 'center', alignItems: 'center'
  },
  resendBtn: {
    background: 'none', border: 'none', color: '#0ea5e9', fontSize: '14px',
    fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
  }
};

export default Register;