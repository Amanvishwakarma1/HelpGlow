import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import MainLayout from "./components/MainLayout"; 
import Home from "./pages/Home";
import Campaigns from "./pages/Campaigns";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
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
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
