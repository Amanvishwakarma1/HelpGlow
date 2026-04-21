import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { User, LogOut, Settings, X, Menu, ChevronDown } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, login } = useContext(AuthContext); 
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Branding Colors
  const colors = {
    magenta: '#8e2382',
    pink: '#e61e6e',
    orange: '#f37021',
    gold: '#d4af37',
    glass: 'rgba(255, 255, 255, 0.7)'
  };

  useEffect(() => {
    const names = ["Raju", "Amit", "Priya", "Sneha", "Vikram", "Anjali", "Rahul", "Sandeep", "Karan", "Meera"];
    const campaigns = ["Medical Emergency", "Education Fund", "Clean Water Project", "Animal Shelter", "Food Relief"];

    const showRandomDonation = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCampaign = campaigns[Math.floor(Math.random() * campaigns.length)];
      const randomAmount = Math.floor(Math.random() * (5000 - 600 + 1)) + 600;

      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} custom-social-toast`}>
          <div className="toast-avatar">
            {randomName.charAt(0)}
          </div>
          <div className="toast-details">
            <p className="toast-user">{randomName} <span className="toast-action">just donated</span></p>
            <p className="toast-subtext">₹{randomAmount} to {randomCampaign}</p>
          </div>
          <button onClick={() => toast.dismiss(t.id)} className="toast-close-btn">
            <X size={14} />
          </button>
        </div>
      ), { 
        position: 'top-center', 
        duration: 4000 
      });
    };

    const initialTimeout = setTimeout(showRandomDonation, 4000);
    const interval = setInterval(() => {
      showRandomDonation();
    }, Math.floor(Math.random() * (15000 - 10000 + 1)) + 10000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (user) setNewName(user.username);
  }, [user]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    }
  }, [isMenuOpen]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const tId = toast.loading("Updating profile...");
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('http://localhost:5000/api/auth/update-profile', 
        { username: newName, password: newPassword },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      login(res.data.user, token);
      toast.success("Profile Updated Successfully!", { id: tId });
      setShowProfileModal(false);
      setNewPassword(""); 
    } catch (err) {
      toast.error(err.response?.data?.error || "Error updating profile", { id: tId });
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <>
      <style>
        {`
          .glass-header {
            position: sticky; 
            top: 0; 
            z-index: 1000; 
            display: flex;
            align-items: center; 
            justify-content: space-between;
            padding: 0 40px; 
            background: ${colors.glass};
            backdrop-filter: blur(15px); 
            -webkit-backdrop-filter: blur(15px);
            border-bottom: 1px solid rgba(212, 175, 55, 0.2);
            height: 70px;
            width: 100%;
            box-sizing: border-box;
          }
          
          .logo-wrapper { display: flex; align-items: center; gap: 12px; text-decoration: none; }
          .logo-img { height: 42px; width: 42px; border-radius: 50%; border: 2px solid ${colors.gold}; background: white; }
          .logo-text { 
            font-size: 1.5rem; 
            font-weight: 900; 
            background: linear-gradient(to right, ${colors.magenta}, ${colors.pink});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-decoration: none; 
          }
          
          .nav-links ul { list-style: none; display: flex; gap: 8px; align-items: center; margin: 0; padding: 0; }
          
          .nav-links a, .user-trigger { 
            text-decoration: none; 
            color: #4a5568; 
            font-weight: 600; 
            padding: 8px 16px; 
            border-radius: 50px; 
            font-size: 14px; 
            transition: all 0.3s ease; 
            display: flex; 
            align-items: center; 
            gap: 6px;
            background: transparent; 
            border: none; 
            cursor: pointer;
          }
          
          .nav-links a:hover, .user-trigger:hover { 
            color: ${colors.pink};
            background: rgba(230, 30, 110, 0.05);
          }

          .mobile-toggle { display: none; cursor: pointer; color: ${colors.magenta}; background: none; border: none; }
          
          .profile-dropdown {
            position: absolute; top: 55px; right: 0; width: 200px;
            background: white; border-radius: 15px; padding: 8px;
            box-shadow: 0 15px 35px rgba(142, 35, 130, 0.15); border: 1px solid rgba(212, 175, 55, 0.1);
          }

          .dropdown-item {
            padding: 12px;
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            font-size: 14px;
            border-radius: 10px;
            color: #4a5568;
            transition: 0.2s;
          }
          .dropdown-item:hover { background: ${colors.lightPink}; color: ${colors.magenta}; }

          @media (max-width: 850px) {
            .glass-header { padding: 0 20px; }
            .mobile-toggle { display: block; }
            .nav-links {
              position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: white;
              z-index: 1050; padding-top: 80px;
              transform: translateX(${isMenuOpen ? '0' : '100%'});
              transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
              display: ${isMenuOpen ? 'block' : 'none'};
            }
            .nav-links ul { flex-direction: column; width: 100%; }
            .nav-links a { width: 100%; padding: 20px 30px; font-size: 18px !important; border-bottom: 1px solid #f7fafc; }
          }

          /* --- BRANDED TOP NOTIFICATION --- */
          .custom-social-toast {
            background: white; 
            padding: 12px 20px; 
            border-radius: 50px; 
            box-shadow: 0 15px 40px rgba(142, 35, 130, 0.2);
            display: flex; 
            align-items: center; 
            gap: 14px;
            border: 1.5px solid ${colors.gold}; 
            min-width: 320px; 
            animation: slideInTop 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          }

          .toast-avatar { 
            width: 36px; height: 36px; 
            background: linear-gradient(135deg, ${colors.magenta}, ${colors.pink}); 
            color: white; 
            border-radius: 50%; 
            display: flex; align-items: center; justify-content: center; 
            font-weight: 800;
          }

          .toast-user { margin: 0; font-size: 14px; font-weight: 700; color: #1a202c; }
          .toast-subtext { margin: 0; font-size: 12px; color: ${colors.magenta}; font-weight: 600; }
          .toast-close-btn { background: none; border: none; color: #a0aec0; cursor: pointer; }

          @keyframes slideInTop {
            from { transform: translateY(-130%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          .modal-overlay {
            position: fixed; inset: 0;
            background: rgba(26, 32, 44, 0.6); backdrop-filter: blur(8px);
            display: flex; justify-content: center; align-items: center; z-index: 2000;
          }
          .modal-card { 
            background: white; width: 90%; max-width: 400px; padding: 30px; 
            border-radius: 24px; border: 2px solid ${colors.gold};
          }
          .input-field { 
            width: 100%; padding: 12px; margin: 8px 0 20px 0; 
            border: 1.5px solid #e2e8f0; border-radius: 12px; outline: none;
            transition: 0.3s;
          }
          .input-field:focus { border-color: ${colors.pink}; box-shadow: 0 0 0 3px rgba(230, 30, 110, 0.1); }
          .save-btn {
             width: 100%; background: linear-gradient(to right, ${colors.magenta}, ${colors.pink}); 
             color: white; padding: 14px; border: none; borderRadius: 12px; fontWeight: 800; cursor: pointer;
          }
        `}
      </style>

      <header className="glass-header">
        <div className="logo-wrapper">
          <img src="/logo.png" className="logo-img" alt="logo" />
          <Link to="/" className="logo-text">HelpGlow</Link>
        </div>

        <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className="nav-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/campaigns">Campaigns</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>

            {user ? (
              <li className="user-menu-container" ref={dropdownRef}>
                <button className="user-trigger" onClick={() => setShowDropdown(!showDropdown)}>
                  <div style={{ background: colors.lightPink, padding: '5px', borderRadius: '50%', display: 'flex' }}>
                    <User size={18} color={colors.magenta} />
                  </div>
                  <span style={{color: colors.magenta, fontWeight: '700'}}>{user.username}</span>
                  <ChevronDown size={14} color={colors.magenta} style={{ transform: showDropdown ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
                </button>
                {showDropdown && (
                  <div className="profile-dropdown">
                    <div className="dropdown-item" onClick={() => { setShowProfileModal(true); setShowDropdown(false); setIsMenuOpen(false); }}>
                      <Settings size={18} /> Edit Profile
                    </div>
                    <div className="dropdown-item" style={{color: colors.pink}} onClick={handleLogout}>
                      <LogOut size={18} /> Logout
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <li><Link to="/login" style={{ color: colors.magenta, fontWeight: '800' }}>Login</Link></li>
            )}
          </ul>
        </nav>
      </header>

      {showProfileModal && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <X 
               size={22} 
               style={{position:'absolute', top: 25, right: 25, cursor:'pointer', color: colors.textLight}} 
               onClick={() => setShowProfileModal(false)} 
            />
            <h2 style={{marginTop: 0, fontSize: '22px', color: colors.magenta}}>Account Settings</h2>
            <form onSubmit={handleUpdateProfile}>
              <label style={{fontSize: '13px', fontWeight: '700', color: '#4a5568'}}>Username</label>
              <input className="input-field" value={newName} onChange={(e) => setNewName(e.target.value)} required />
              <label style={{fontSize: '13px', fontWeight: '700', color: '#4a5568'}}>New Password</label>
              <input className="input-field" type="password" placeholder="Leave blank to keep current" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <button type="submit" className="save-btn">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;