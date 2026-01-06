"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { NeonButton } from "@/components/ui/neon-button";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Book a call", href: "/apply" },
];

const navigateTo = (href: string) => {
  const isHomePage = window.location.pathname === "/";

  if (href === "/") {
    isHomePage ? window.scrollTo({ top: 0, behavior: "smooth" }) : (window.location.href = "/");
  } else if (href.startsWith("#")) {
    if (isHomePage) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/" + href;
    }
  } else {
    window.location.href = href;
  }
};

export default function FloatingNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Floating pill nav */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 100,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 8px 8px 12px",
            backgroundColor: "#ffffff",
            borderRadius: "9999px",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04)",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Image
              src="/logos/icon.png"
              alt="re.build"
              width={32}
              height={32}
              style={{ width: "32px", height: "32px", cursor: "pointer" }}
            />
          </Link>

          {/* Book a call button */}
          <Link href="/apply" style={{ textDecoration: "none" }}>
            <NeonButton size="sm" variant="dark">
              Book a call
            </NeonButton>
          </Link>

          {/* Hamburger menu button */}
          <button
            onClick={() => setMenuOpen(true)}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              padding: "10px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              width: "40px",
              height: "40px",
            }}
            aria-label="Open menu"
          >
            <span style={{ display: "block", width: "18px", height: "2px", backgroundColor: "#131518", borderRadius: "1px" }} />
            <span style={{ display: "block", width: "18px", height: "2px", backgroundColor: "#131518", borderRadius: "1px" }} />
          </button>
        </div>
      </motion.div>

      {/* Full screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              backgroundColor: "rgba(244, 245, 247, 0.98)",
              backdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Menu links */}
            <nav style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      setTimeout(() => navigateTo(item.href), 300);
                    }}
                    style={{
                      fontSize: "clamp(1.75rem, 5vw, 3rem)",
                      fontWeight: 500,
                      color: "#4b515b",
                      textDecoration: "none",
                      display: "block",
                      padding: "12px 24px",
                      transition: "all 0.2s ease",
                      letterSpacing: "-0.02em",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#131518";
                      e.currentTarget.style.transform = "translateX(8px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#4b515b";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Close button - floating pill at bottom */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              style={{
                position: "fixed",
                bottom: "24px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#ffffff",
                  borderRadius: "9999px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
                }}
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#131518" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
