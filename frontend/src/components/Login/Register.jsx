import React, { useState } from 'react';
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

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      await axios.post(getApiUrl('/api/auth/register'), {
        username: formData.name,
        email: formData.emailOrMobile,
        password: formData.password
      });

      alert("Registration Successful! Welcome to HelpGlow.");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed. Try a different email/mobile.");
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

        <form onSubmit={handleRegister} style={styles.form}>
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
  primaryBtn: (colors) => ({
    background: `linear-gradient(to right, ${colors.magenta}, ${colors.pink})`, 
    color: '#fff', padding: '16px', borderRadius: '15px',
    border: 'none', fontSize: '16px', fontWeight: '700', display: 'flex', justifyContent: 'center', alignItems: 'center'
  })
};

export default Register;