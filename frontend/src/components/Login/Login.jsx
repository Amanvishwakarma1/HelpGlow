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
  
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  // Branded Colors
  const colors = {
    magenta: '#8e2382',
    pink: '#e61e6e',
    orange: '#f37021',
    gold: '#d4af37',
    lightBg: '#fff5f8'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post('https://helpglow.onrender.com/api/auth/login', { 
        email, 
        password 
      });
      
      login(res.data.user, res.data.token);
      navigate('/'); 
      
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Login failed. Please try again.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper(colors)}>
      <div style={styles.loginCard}>
        {/* Animated Background Elements */}
        <div style={styles.decorativeCircle1(colors)}></div>
        <div style={styles.decorativeCircle2(colors)}></div>

        <div style={styles.cardContent}>
          <div style={styles.header}>
            <div style={styles.logoCircle(colors)}>H</div>
            <h1 style={styles.title(colors)}>Welcome Back</h1>
            <p style={styles.subtitle}>Sign in to continue your impact with HelpGlow</p>
          </div>

          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <Mail size={18} style={styles.icon} />
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
                <a href="#" style={styles.forgotLink(colors)}>Forgot password?</a>
              </div>
              <div style={styles.inputWrapper}>
                <Lock size={18} style={styles.icon} />
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
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="premium-btn" 
              style={styles.signInBtn(colors, loading)}
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Sign In"} 
              {!loading && <LogIn size={20} style={{ marginLeft: '10px' }} />}
            </button>
          </form>

          <div style={styles.footerText}>
            Don't have an account?{' '}
            <Link to="/register" style={styles.signUpLink(colors)}>
              Create one now
            </Link>
          </div>
        </div>
      </div>

      <style>
        {`
          .premium-btn {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
          }
          .premium-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 25px rgba(230, 30, 110, 0.3);
            filter: brightness(1.1);
          }
          .premium-btn:active {
            transform: scale(0.98);
          }
          input:focus {
            border-color: ${colors.pink} !important;
            box-shadow: 0 0 0 4px rgba(230, 30, 110, 0.1);
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  pageWrapper: (colors) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightBg,
    fontFamily: '"Poppins", sans-serif',
    padding: '20px',
    backgroundImage: `radial-gradient(circle at 10% 20%, rgba(142, 35, 130, 0.03) 0%, transparent 40%), 
                      radial-gradient(circle at 90% 80%, rgba(243, 112, 33, 0.03) 0%, transparent 40%)`
  }),
  loginCard: {
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: '440px',
    borderRadius: '30px',
    padding: '50px 40px',
    boxShadow: '0 30px 60px -12px rgba(142, 35, 130, 0.12)',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid rgba(212, 175, 55, 0.2)',
  },
  decorativeCircle1: (colors) => ({
    position: 'absolute',
    top: '-40px',
    right: '-40px',
    width: '120px',
    height: '120px',
    background: `linear-gradient(135deg, ${colors.magenta}, ${colors.pink})`,
    borderRadius: '50%',
    opacity: 0.1,
    zIndex: 0,
  }),
  decorativeCircle2: (colors) => ({
    position: 'absolute',
    bottom: '-20px',
    left: '-20px',
    width: '80px',
    height: '80px',
    background: colors.gold,
    borderRadius: '50%',
    opacity: 0.05,
    zIndex: 0,
  }),
  cardContent: { position: 'relative', zIndex: 1 },
  header: { marginBottom: '35px', textAlign: 'center' },
  logoCircle: (colors) => ({
    width: '50px',
    height: '50px',
    background: `linear-gradient(135deg, ${colors.magenta}, ${colors.pink})`,
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: '800',
    margin: '0 auto 15px',
    border: `2px solid ${colors.gold}`,
    boxShadow: '0 8px 15px rgba(142, 35, 130, 0.2)'
  }),
  title: (colors) => ({ 
    fontSize: '28px', 
    fontWeight: '800', 
    color: colors.magenta, 
    marginBottom: '8px',
    letterSpacing: '-0.5px'
  }),
  subtitle: { color: '#64748b', fontSize: '14px', lineHeight: '1.5' },
  form: { display: 'flex', flexDirection: 'column', gap: '22px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  labelRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: '13px', fontWeight: '700', color: '#475569', marginLeft: '4px' },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  icon: { position: 'absolute', left: '18px', color: '#94a3b8' },
  input: {
    width: '100%',
    padding: '14px 16px 14px 50px',
    borderRadius: '15px',
    border: '1.5px solid #e2e8f0',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: '#f8fafc'
  },
  eyeBtn: { position: 'absolute', right: '16px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' },
  forgotLink: (colors) => ({ fontSize: '13px', color: colors.pink, textDecoration: 'none', fontWeight: '600' }),
  signInBtn: (colors, loading) => ({
    background: `linear-gradient(to right, ${colors.magenta}, ${colors.pink})`,
    color: '#fff',
    padding: '16px',
    borderRadius: '15px',
    fontSize: '16px',
    fontWeight: '700',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: loading ? 0.7 : 1,
    marginTop: '10px'
  }),
  footerText: { marginTop: '30px', textAlign: 'center', fontSize: '14px', color: '#64748b' },
  signUpLink: (colors) => ({ color: colors.magenta, textDecoration: 'none', fontWeight: '700', marginLeft: '5px' }),
};

export default Login;