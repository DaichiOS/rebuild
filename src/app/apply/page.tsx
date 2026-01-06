"use client";

import { useEffect } from "react";

export default function ApplyPage() {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f5f7",
        paddingTop: "80px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "40px 24px",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "#131518",
              marginBottom: "12px",
              letterSpacing: "-0.02em",
            }}
          >
            Book a Free Strategy Call
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#4b515b",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            30 minutes. No pressure. We&apos;ll look at what you&apos;ve got, what you
            need, and whether I&apos;m the right fit.
          </p>
        </div>

        {/* Calendly Embed */}
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/eddie-rebuild/strategy-call"
          style={{
            minWidth: "320px",
            height: "700px",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        />

        {/* Alternative */}
        <div
          style={{
            marginTop: "32px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(0, 0, 0, 0.08)",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "14px", color: "#6c7584" }}>
            Rather just email?{" "}
            <a
              href="mailto:eddie@rebuild.dev"
              style={{
                color: "#131518",
                fontWeight: 500,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              eddie@rebuild.dev
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
