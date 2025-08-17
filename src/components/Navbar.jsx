"use client";

import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { Link } from "react-router-dom";
import logo from "../assets/dq.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { label: t("home"), path: "/" },
    { label: t("announcements"), path: "/announcements" },
    { label: t("myPage"), path: "/my-page" },
    { label: t("airdrop"), path: "/air-drop" },
  ];
  const user = JSON.parse(localStorage.getItem("user"));
  const navButtons = user
    ? []
    : [
        { label: t("signIn"), path: "/login", variant: "outline" },
        { label: t("signUp"), path: "/login", variant: "gradient" },
      ];

  const firstName = user?.name?.split(" ")[0] || "";

  return (
    <header className="flex bg-black justify-between items-center px-4 py-4 border-b border-white/10">
      {/* Logo */}
      <div className="text-lg sm:text-xl   flex items-center gap-2">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <img src={logo} alt="" className=" w-10  h-6" />
          {/* <span className="text-white">DQ</span> */}
          <span className="text-gray-300 -ml- -mb-3 fon text-lg">
            DropQuest
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {!user ? (
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-800 rounded-4xl hover:bg-white/10 py-5 px-3 bg-gray-200 text-lg font-semibold"
          >
            <Link to={"/Login"}>signIn</Link>
          </Button>
        ) : user?.admin ? (
          <Link to="/admin" className="text-black font-semibold  py-2 rounded-2xl px-3 bg-white">Admin</Link>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-800 rounded-4xl hover:bg-white/10 py-5 px-3 bg-gray-200"
          >
            <Link to={"/my-page"}>{user?.name}</Link>
          </Button>
        )}

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden  items-center gap-6">
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
            <span className="text-white font-medium">{firstName}님</span>
          ) : (
            navButtons.map(({ label, path, variant }) => (
              <Link key={label} to={path}>
                <Button
                  variant={variant === "outline" ? "outline" : undefined}
                  className="px-4 py-2 text-sm font-medium rounded-full border-white/40 text-white hover:bg-white/10"
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

        {/* Mobile Hamburger */}
        <div className="sm:hidden">
          <button className="text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={26} /> : <Menu size={36} />}
          </button>
        </div>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => setLanguage(language === "en" ? "ko" : "en")}
          className="text-white flex flex-col hover:bg-white/10"
        >
          <Globe size={16} className="" />
          {/* {language === "en" ? "한국어" : "En"} */}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center gap-6"
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
              <span className="text-white text-lg font-medium">
                {firstName}님
              </span>
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
