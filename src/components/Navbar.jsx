import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Navbar({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Announcements", path: "/announcements" },
    { label: "My Page", path: "/mypage" },
    { label: "Airdrop", path: "/airdrop" },
  ];

  const navButtons = user
    ? [] // no login/signup if user is logged in
    : [
        { label: "Login", path: "/login", variant: "outline" },
        { label: "Sign Up", path: "/signup", variant: "gradient" },
      ];

  const firstName = user?.name?.split(" ")[0] || "";

  return (
    <header className="flex bg-black justify-between items-center px-4 py-3 border-b border-white/10">
      {/* Logo */}
      <div className="text-lg sm:text-xl font-bold flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <span className="text-white">DQ</span>
          <span className="text-gray-300 font-light">DropQuest</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex items-center gap-6">
        {navLinks.map(({ label, path }) => (
          <Link
            key={label}
            to={path}
            className="text-white hover:text-gray-300 transition text-sm font-medium"
          >
            {label}
          </Link>
        ))}
        {user ? (
          <span className="text-white font-medium">Hi, {firstName}</span>
        ) : (
          navButtons.map(({ label, path, variant }) => (
            <Link key={label} to={path}>
              <Button
                variant={variant === "outline" ? "outline" : undefined}
                className="px-4 py-2 text-sm font-medium rounded-full border-white/40 text-white hover:bg-white/10"
                style={
                    variant === "gradient"
                    ? { background: "linear-gradient(to right, #0d0b3e, #3d2abf)" }
                    : {}
                }
              >
                {label}
              </Button>
            </Link>
          ))
        )}
      </div>

      {/* Mobile Hamburger */}
        {/* <span className="text-white font-medium">Hi, </span> */}
      <div className="sm:hidden">
        <button className="text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center gap-6"
          onClick={closeMenu}
        >
          <div
            className="flex flex-col items-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                onClick={closeMenu}
                className="text-white text-lg font-medium hover:text-gray-300 transition"
              >
                {label}
              </Link>
            ))}

            {user ? (
              <span className="text-white text-lg font-medium">Hi, {firstName}</span>
            ) : (
              navButtons.map(({ label, path, variant }) => (
                <Link key={label} to={path} onClick={closeMenu}>
                  <Button
                    variant={variant === "outline" ? "outline" : undefined}
                    className="w-40 px-4 py-2 text-sm font-medium rounded-full border-white/40 text-white hover:bg-white/10"
                    style={
                      variant === "gradient"
                        ? {
                            background:
                              "linear-gradient(to right, #0d0b3e, #3d2abf)",
                          }
                        : {}
                    }
                  >
                    {label}
                  </Button>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </header>
  );
}
