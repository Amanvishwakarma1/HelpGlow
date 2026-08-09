import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import MainLayout from "./components/MainLayout"; 
import Home from "./pages/Home";
import Campaigns from "./pages/Campaigns";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

// Helper component that automatically scrolls window to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// Helper component that restores deep routes on static page reload (e.g. /menu)
function PathRestorer() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash && window.location.hash.startsWith('#/')) {
      const targetPath = window.location.hash.slice(1);
      if (targetPath && targetPath !== location.pathname) {
        window.history.replaceState(null, '', targetPath);
        navigate(targetPath, { replace: true });
      }
    }
  }, [navigate, location]);

  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <PathRestorer />
            <Routes>
              {/* Parent route renders the Header and Footer layout */}
              <Route element={<MainLayout />}>
                {/* All child routes will render inside the <Outlet /> of MainLayout */}
                <Route path="/" element={<Home />} />
                <Route path="/causes" element={<Campaigns />} />
                <Route path="/campaign" element={<Campaigns />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/about" element={<About />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
