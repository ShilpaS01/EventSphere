
import { useState } from "react";
import {
  Link,
  NavLink,
  useNavigate
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";

import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();

  const {
    wishlist,
    cart,
    theme,
    toggleTheme
  } = useApp();

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenu();
    navigate("/login");
  }

  return (
    <nav className="navbar">

      {/* Logo */}
      <Link
        to="/"
        className="navbar-logo"
        onClick={closeMenu}
      >
        Event<span>Sphere</span>
      </Link>

      {/* Mobile Menu */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Navigation Links */}
      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>

        <NavLink
          to="/"
          end
          onClick={closeMenu}
        >
          Home
        </NavLink>

        {user ? (
          <>

            <NavLink
              to="/explore"
              onClick={closeMenu}
            >
              Explore Events
            </NavLink>

            <NavLink
              to="/wishlist"
              onClick={closeMenu}
            >
              ❤️ Wishlist ({wishlist.length})
            </NavLink>

            <NavLink
              to="/cart"
              onClick={closeMenu}
            >
              🛒 Cart ({cartCount})
            </NavLink>

            <NavLink
              to="/my-bookings"
              onClick={closeMenu}
            >
              My Bookings
            </NavLink>

            <span className="user-email">
              Hi, {user.name || user.email}
            </span>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </>
        ) : (
          <>

            <NavLink
              to="/login"
              onClick={closeMenu}
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="register-btn"
              onClick={closeMenu}
            >
              Register
            </NavLink>

          </>
        )}

        {/* Theme Toggle */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

      </div>

    </nav>
  );
}

export default Navbar;
