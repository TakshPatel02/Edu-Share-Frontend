import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, isAdmin, logout } = useAppContext();
  const location = useLocation();

  const guestLinks = [
    { to: "/", label: "Home", icon: "home" },
    { to: "/study-guide", label: "AI Guide", icon: "auto_awesome" },
    { to: "/upload", label: "Upload", icon: "add_circle" },
    { to: "/login", label: "Sign In", icon: "person" },
  ];
  const userLinks = [
    { to: "/", label: "Home", icon: "home" },
    { to: "/study-guide", label: "AI Guide", icon: "auto_awesome" },
    { to: "/upload", label: "Upload", icon: "add_circle" },
  ];
  const navLinks = isAuthenticated
    ? [
        ...userLinks,
        ...(isAdmin
          ? [{ to: "/admin", label: "Admin", icon: "shield_person" }]
          : []),
      ]
    : guestLinks;

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4">
        <nav className="flex justify-between items-center px-6 md:px-8 h-16 md:h-20 max-w-360 mx-auto bg-white/80 backdrop-blur-xl rounded-full shadow-xl shadow-blue-900/5">
          <div className="flex items-center gap-6 md:gap-8">
            <Link
              to="/"
              className="text-xl md:text-2xl font-black tracking-tight text-blue-700 font-[Manrope]"
            >
              EduShare
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "text-blue-700 font-bold"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!isAuthenticated ? (
              <Link
                to="/signup"
                className="px-6 py-2.5 rounded-full font-semibold text-sm primary-gradient text-white shadow-lg shadow-primary/20 active:scale-95 transition-transform"
              >
                Join Free
              </Link>
            ) : (
              <button
                onClick={logout}
                className="px-6 py-2.5 rounded-full font-semibold text-sm bg-surface-container-low hover:bg-surface-container-high text-slate-700 transition-colors"
              >
                Logout {user?.name ? `(${user.name.split(" ")[0]})` : ""}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-slate-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-slate-600">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </nav>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 mx-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive(link.to)
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="material-symbols-outlined">{link.icon}</span>
                {link.label}
              </Link>
            ))}
            {!isAuthenticated ? (
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center mt-2 px-6 py-3 rounded-xl font-semibold text-sm primary-gradient text-white shadow-lg"
              >
                Join Free
              </Link>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center mt-2 px-6 py-3 rounded-xl font-semibold text-sm bg-surface-container-low hover:bg-surface-container-high text-slate-700"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full rounded-t-4xl z-50 bg-white/90 backdrop-blur-xl shadow-[0_-10px_40px_rgba(25,28,30,0.06)]">
        <div className="flex justify-around items-center px-4 py-2 pb-5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex flex-col items-center justify-center px-4 py-2 rounded-full transition-all ${
                isActive(link.to)
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-500"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={
                  isActive(link.to) ? { fontVariationSettings: "'FILL' 1" } : {}
                }
              >
                {link.icon}
              </span>
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
