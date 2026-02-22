import React, { useState, useContext } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext); // Access global login function
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 1. Send request to your Node.js backend
      const res = await axios.post('http://localhost:5000/api/auth/login', { 
        email, 
        password 
      });
      
      // 2. Update Context state (this handles localStorage and user state)
      login(res.data.user, res.data.token);
      
      // 3. Success Feedback & Redirect to Home
      alert(`Welcome back, ${res.data.user.username}!`);
      navigate('/'); 
      
    } catch (err) {
      // Handle errors from backend (e.g., 400 Invalid Credentials)
      const errorMsg = err.response?.data?.error || "Login failed. Please try again.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.loginCard}>
        <div style={styles.decorativeCircle}></div>

        <div style={styles.cardContent}>
          <div style={styles.header}>
            <h1 style={styles.title}>Welcome Back</h1>
            <p style={styles.subtitle}>Log in to continue your journey with HelpGlow</p>
          </div>

          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <Mail size={20} style={styles.icon} />
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com" 
                  style={styles.input} 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <div style={styles.labelRow}>
                <label style={styles.label}>Password</label>
                <a href="#" style={styles.forgotLink}>Forgot password?</a>
              </div>
              <div style={styles.inputWrapper}>
                <Lock size={20} style={styles.icon} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="••••••••" 
                  style={styles.input} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeBtn}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="zoom-btn" 
              style={{...styles.signInBtn, opacity: loading ? 0.7 : 1}}
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Sign In"} 
              {!loading && <LogIn size={20} style={{ marginLeft: '8px' }} />}
            </button>
          </form>

          <div style={styles.footer}>
            <p style={styles.footerText}>
              Don't have an account?{' '}
              <Link to="/register" style={styles.signUpLink}>
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>
        {`
          .zoom-btn {
            transition: all 0.3s ease;
          }
          .zoom-btn:hover {
            transform: scale(1.05);
            background-color: #0284c7 !important;
            box-shadow: 0 10px 20px rgba(14, 165, 233, 0.3);
          }
        `}
      </style>
    </div>
  );
};

// Styles remain identical to your previous version
const styles = {
  pageWrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f9ff',
    fontFamily: '"Poppins", sans-serif',
    padding: '20px',
  },
  loginCard: {
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: '450px',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: '0 25px 50px -12px rgba(14, 165, 233, 0.15)',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid #e0f2fe',
  },
  decorativeCircle: {
    position: 'absolute',
    top: '-50px',
    right: '-50px',
    width: '150px',
    height: '150px',
    background: 'linear-gradient(135deg, #0ea5e9 0%, #7dd3fc 100%)',
    borderRadius: '50%',
    opacity: 0.1,
    zIndex: 0,
  },
  cardContent: { position: 'relative', zIndex: 1 },
  header: { marginBottom: '32px', textAlign: 'center' },
  title: { fontSize: '32px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' },
  subtitle: { color: '#64748b', fontSize: '15px' },
  form: { display: 'flex', flexDirection: 'column', gap: '24px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  labelRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: '14px', fontWeight: '600', color: '#334155' },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  icon: { position: 'absolute', left: '16px', color: '#94a3b8' },
  input: {
    width: '100%',
    padding: '14px 16px 14px 48px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    fontSize: '16px',
    outline: 'none',
  },
  eyeBtn: { position: 'absolute', right: '16px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' },
  forgotLink: { fontSize: '13px', color: '#0ea5e9', textDecoration: 'none', fontWeight: '600' },
  signInBtn: {
    backgroundColor: '#0ea5e9',
    color: '#fff',
    padding: '16px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: { marginTop: '32px', textAlign: 'center' },
  footerText: { fontSize: '14px', color: '#64748b' },
  signUpLink: { color: '#0ea5e9', textDecoration: 'none', fontWeight: '700' },
};

export default Login;