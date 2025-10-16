"use client";

import { useState } from "react";
import { Menu, X, Globe, LogOut, LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { Link } from "react-router-dom";
import logo from "../assets/dq.png";
import { motion, AnimatePresence } from "framer-motion";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const closeMenu = () => setMenuOpen(false);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  const navLinks = [
    { label: t("home"), path: "/" },
    { label: t("announcements"), path: "/announcements" },
    { label: t("myPage"), path: "/my-page" },
    { label: t("pointExchangeTitle"), path: "/point-exchange" },
    { label: t("airdrop"), path: "/air-drop" },
    { label: t("QnA"), path: "/question-answer" },
  ];
  const user = JSON.parse(localStorage.getItem("user"));
  const navButtons = user
    ? []
    : [
        { label: t("signIn"), path: "/login", variant: "gradient" },
        { label: t("signUp"), path: "/login", variant: "gradient" },
      ];

  const firstName = user?.name?.split(" ")[0] || "";

  return (
    // <header className="flex bg-black justify-center items-center   border-b border-white/10">
    <header className="fixed top-0 left-0 w-full z-50 flex bg-black justify-center items-center border-b border-white/10">
      <div className="w-full max-w-[400px] mx-auto flex bg-black justify-between items-center px-2 py-3 sm:border-white/10 sm:border">
        {/* Logo */}
        
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <img src={logo} alt="" className=" w-7  h-6" />
            {/* <span className="text-white">DQ</span> */}
            <span className="text-gray-300 -ml- -mb-3 fon text-base font-bold">
              DropQuest
            </span>
          </Link>
       

        <div className="flex items-center gap-2">
          {!user ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-800 rounded-4xl hover:bg-white/10 py-2 px-3 bg-gray-200 text-md font-semibold"
            >
              <Link to={"/login"}>{t("signIn")}</Link>
            </Button>
          ) : user?.admin ? (
            <Link
              to="/admin"
              className="text-black font-semibold  py-1 text-sm rounded-2xl px-3 bg-white"
            >
              Admin
            </Link>
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
          <div className="sm:">
            <button
              className="text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X size={30} color="white" className="text-white" />
              ) : (
                <Menu size={30} />
              )}
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

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="sm:w-[400px] h-[500px] mx-auto fixed inset-0 bg-gray-950 bg-opacity-95 z-50 flex flex-col items-center justify-center gap-6 rounded-b-2xl backdrop-blur-md"
              onClick={closeMenu}
            >
              {/* Close Button */}
              <div
                className="absolute top-5 right-8 cursor-pointer p-2 rounded-full hover:bg-blue-900/30 transition"
                onClick={() => setMenuOpen(false)}
              >
                <X color="white" size={30} />
              </div>

              {/* Navigation Links */}
              <div
                className="flex flex-col items-center gap-6"
                onClick={(e) => e.stopPropagation()}
              >
                {navLinks.map(({ label, path }) => (
                  <Link
                    key={label}
                    to={path}
                    onClick={closeMenu}
                    className="text-white text-lg font-medium px-6 py-1 rounded-2xl hover:bg-blue-800/80 hover:scale-105 transition-all duration-200"
                  >
                    {label}
                  </Link>
                ))}

                {/* User or Auth Buttons */}
                {user ? (
                  <span
                    className="text-white text-lg font-semibold px-6 py-2 rounded-2xl shadow-md transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(to right, #0d0b3e, #3d2abf)",
                    }}
                  >
                    {firstName}님
                  </span>
                ) : (
                  navButtons.map(({ label, path, variant }) => (
                    <Link key={label} to={path} onClick={closeMenu}>
                      <Button
                        variant={variant === "outline" ? "outline" : undefined}
                        className="w-40 px-4 py-2 text-sm font-medium rounded-full border-white/40 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                        style={
                          variant === "gradient"
                            ? {
                                background:
                                  "linear-gradient(to right, #0d0b3e, #3d2abf)",
                                boxShadow: "0 0 10px rgba(61, 42, 191, 0.3)",
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

              {/* Logout */}
              {user && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-white flex items-center gap-2 mt-4 font-semibold cursor-pointer px-6 py-2 rounded-2xl hover:bg-blue-800/80 hover:scale-105 transition-all duration-200"
                  onClick={logout}
                >
                  <LogOutIcon size={20} /> {t("logOut")}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
