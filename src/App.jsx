
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { ProductProvider, useStore } from "./ProductContext";
import ErrorBoundary from "./ErrorBoundary";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import Checkout from "./Checkout";
import Cart from "./Cart";
import "./App.css";

// ── Protected Route ────────────────────────────────────────────────
// If the user is not logged in, redirect them to /login
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useStore();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

// ── Login Page ─────────────────────────────────────────────────────
// Demonstrates useState for a controlled form
function LoginPage() {
  const { isLoggedIn, setIsLoggedIn } = useStore();
  const navigate = useNavigate();

  // useState — controlled form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // If already logged in, redirect home
  if (isLoggedIn) return <Navigate to="/" replace />;

  function handleLogin(e) {
    e.preventDefault();
    // Simple demo validation (no real backend)
    if (email === "student@college.com" && password === "react123") {
      setIsLoggedIn(true);
      navigate("/cart");
    } else {
      setError("Invalid credentials. Try: student@college.com / react123");
    }
  }

  return (
    <div className="page login-page">
      <div className="login-card">
        <h1>Sign In</h1>
        <p className="login-hint">
          Use <strong>student@college.com</strong> / <strong>react123</strong>
        </p>

        {error && <p className="login-error">{error}</p>}

        {/* Controlled form using useState */}
        <form onSubmit={handleLogin} className="login-form">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@college.com"
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────
function Navbar() {
  const { cartCount, isLoggedIn, setIsLoggedIn } = useStore();
  const navigate = useNavigate();

  function handleLogout() {
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <span className="brand-icon">🛍️</span> NigStore
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Shop</Link>
        {isLoggedIn ? (
          <>
            <Link to="/cart" className="nav-link cart-link">
              Cart
              {cartCount() > 0 && (
                <span className="cart-badge">{cartCount()}</span>
              )}
            </Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="nav-link login-nav-btn">Login</Link>
        )}
      </div>
    </nav>
  );
}

// ── App Root ───────────────────────────────────────────────────────
function AppInner() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Route — only accessible when logged in */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            {/* Fallback for unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <footer className="footer">
        <p>ShopReact — Built with React.js · College Assignment Project</p>
      </footer>
    </>
  );
}

// useState import needed for LoginPage — pulled from React here at module level


export default function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <AppInner />
      </ProductProvider>
    </BrowserRouter>
  );
}
