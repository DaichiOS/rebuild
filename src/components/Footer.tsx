"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#f4f5f7",
        color: "#131518",
        padding: "60px 24px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Large background text */}
      <div
        style={{
          position: "absolute",
          bottom: "-30px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "clamp(100px, 25vw, 280px)",
          fontWeight: 700,
          color: "rgba(0, 0, 0, 0.03)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          letterSpacing: "-0.02em",
        }}
      >
        re.build
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Main content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
            marginBottom: "48px",
          }}
        >
          {/* Brand */}
          <div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 700,
                marginBottom: "12px",
                letterSpacing: "-0.02em",
                color: "#131518",
              }}
            >
              re.build
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#6c7584",
                lineHeight: 1.6,
                maxWidth: "260px",
              }}
            >
              Custom websites for small businesses. Pay only if you&apos;re happy.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              style={{
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#9ca3af",
                marginBottom: "14px",
              }}
            >
              Navigation
            </h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Home", href: "/" },
                { label: "How it works", href: "/#how-it-works" },
                { label: "Book a call", href: "/apply" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    fontSize: "14px",
                    color: "#4b515b",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#298dff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#4b515b")}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#9ca3af",
                marginBottom: "14px",
              }}
            >
              Get in touch
            </h4>
            <a
              href="mailto:eddie@rebuild.dev"
              style={{
                fontSize: "14px",
                color: "#4b515b",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#298dff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#4b515b")}
            >
              eddie@rebuild.dev
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(0, 0, 0, 0.08)",
            paddingTop: "20px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "#9ca3af",
            }}
          >
            © {new Date().getFullYear()} re.build · Sydney, Australia
          </p>
          <p
            style={{
              fontSize: "12px",
              color: "#9ca3af",
            }}
          >
            Websites for small businesses. Pay only if you&apos;re happy.
          </p>
        </div>
      </div>
    </footer>
  );
}
