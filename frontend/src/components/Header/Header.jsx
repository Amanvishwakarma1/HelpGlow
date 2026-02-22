import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { User, LogOut, Settings, X, Menu, ChevronDown } from "lucide-react";
import axios from "axios";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, login } = useContext(AuthContext); 
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (user) setNewName(user.username);
  }, [user]);

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // LOCK SCROLL: Prevents swiping/scrolling the background when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none"; // Disables touch interactions on background
    } else {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    }
  }, [isMenuOpen]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('http://localhost:5000/api/auth/update-profile', 
        { username: newName, password: newPassword },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      login(res.data.user, token);
      alert("Profile Updated Successfully!");
      setShowProfileModal(false);
      setNewPassword(""); 
    } catch (err) {
      alert(err.response?.data?.error || "Error updating profile");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <style>
        {`
          /* 1. GLOBAL OVERFLOW LOCK - This stops the 'ghost' side swipe */
          html, body {
            max-width: 100vw;
            overflow-x: hidden !important;
            margin: 0;
            padding: 0;
            width: 100%;
            position: relative;
          }

          .glass-header {
            position: sticky; 
            top: 0; 
            z-index: 1000; 
            display: flex;
            align-items: center; 
            justify-content: space-between;
            padding: 0 20px; 
            background: rgba(186, 230, 253, 0.6);
            backdrop-filter: blur(14px); 
            -webkit-backdrop-filter: blur(14px);
            border-bottom: 1px solid rgba(56, 189, 248, 0.3);
            height: 65px;
            width: 100%;
            box-sizing: border-box;
          }
          
          .logo-wrapper { display: flex; align-items: center; gap: 10px; text-decoration: none; z-index: 1100; }
          .logo-img { height: 38px; width: 38px; border-radius: 50%; background: white; padding: 2px; }
          .logo-text { font-size: 1.3rem; font-weight: 800; color: #0369a1; text-decoration: none; }
          
          .nav-links ul { list-style: none; display: flex; gap: 5px; align-items: center; margin: 0; padding: 0; }
          .nav-links a, .user-trigger { 
            text-decoration: none; color: #0369a1; font-weight: 600; 
            padding: 8px 14px; border-radius: 10px; font-size: 14px;
            transition: 0.2s; display: flex; align-items: center; gap: 6px;
            background: transparent; border: none; cursor: pointer;
          }
          
          .nav-links a:hover, .user-trigger:hover { background: rgba(56, 189, 248, 0.15); }

          .mobile-toggle { display: none; cursor: pointer; color: #0284c7; z-index: 1100; background: none; border: none; }

          .user-menu-container { position: relative; }
          
          .profile-dropdown {
            position: absolute; top: 50px; right: 0; width: 190px;
            background: white; border-radius: 12px; padding: 6px;
            box-shadow: 0 10px 25px rgba(2, 132, 199, 0.1); border: 1px solid #e0f2fe;
          }

          /* MOBILE STYLES */
          @media (max-width: 850px) {
            .mobile-toggle { display: block; }

            .nav-links {
              position: fixed; 
              top: 0; 
              left: 0; /* Menu starts from left */
              width: 100%;
              height: 100vh; 
              background: #ffffff;
              z-index: 1050;
              padding-top: 80px;
              /* USE TRANSFORM INSTEAD OF RIGHT/LEFT TO PREVENT OVERFLOW */
              transform: translateX(${isMenuOpen ? '0' : '100%'});
              visibility: ${isMenuOpen ? 'visible' : 'hidden'};
              transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.4s;
              display: block;
            }

            .nav-links ul { flex-direction: column; width: 100%; gap: 0; }
            .nav-links li { width: 100%; border-bottom: 1px solid #f8fafc; }
            .nav-links a, .user-trigger { width: 100%; padding: 18px 25px; border-radius: 0; font-size: 17px; }
            
            .profile-dropdown { 
              position: static; 
              box-shadow: none; 
              border: none; 
              width: 100%; 
              padding-left: 45px; 
              background: #fbfdff;
            }
          }

          /* Modal Fixes */
          .modal-overlay {
            position: fixed; inset: 0;
            background: rgba(15, 23, 42, 0.5); backdrop-filter: blur(4px);
            display: flex; justify-content: center; align-items: center; z-index: 2000;
            padding: 15px;
          }
          .modal-card { 
            background: white; width: 100%; max-width: 380px; padding: 25px; 
            border-radius: 20px; position: relative; box-sizing: border-box;
          }
          .input-field { width: 100%; padding: 12px; margin: 8px 0 18px 0; border: 1.5px solid #e2e8f0; border-radius: 10px; box-sizing: border-box; }
        `}
      </style>

      <header className="glass-header">
        <div className="logo-wrapper">
          <img src="/logo.png" className="logo-img" alt="logo" />
          <Link to="/" className="logo-text">HelpGlow</Link>
        </div>

        <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <nav className="nav-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/campaigns">Campaigns</Link></li>
            <li><Link to="/monthly">Monthly</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>

            {user ? (
              <li className="user-menu-container" ref={dropdownRef}>
                <button className="user-trigger" onClick={() => setShowDropdown(!showDropdown)}>
                  <User size={19} />
                  <span>{user.username}</span>
                  <ChevronDown size={14} style={{ transform: showDropdown ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
                </button>
                {showDropdown && (
                  <div className="profile-dropdown">
                    <div className="dropdown-item" onClick={() => { setShowProfileModal(true); setShowDropdown(false); setIsMenuOpen(false); }}>
                      <Settings size={18} /> Edit Profile
                    </div>
                    <div className="dropdown-item" style={{color: '#ef4444'}} onClick={handleLogout}>
                      <LogOut size={18} /> Logout
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </nav>
      </header>

      {showProfileModal && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <X 
               size={20} 
               style={{position:'absolute', top: 20, right: 20, cursor:'pointer'}} 
               onClick={() => setShowProfileModal(false)} 
            />
            <h2 style={{marginTop: 0, fontSize: '20px'}}>Account Settings</h2>
            <form onSubmit={handleUpdateProfile}>
              <label style={{fontSize: '13px', fontWeight: '600'}}>Username</label>
              <input className="input-field" value={newName} onChange={(e) => setNewName(e.target.value)} required />
              <label style={{fontSize: '13px', fontWeight: '600'}}>New Password</label>
              <input className="input-field" type="password" placeholder="Leave blank to keep current" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <button type="submit" style={{
                width: '100%', background: '#0ea5e9', color: 'white', padding: '12px', border: 'none', borderRadius: '10px', fontWeight: 'bold'
              }}>Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;