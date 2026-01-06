"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NeonButton } from "@/components/ui/neon-button";

type FormData = {
  name: string;
  email: string;
  mobile: string;
  businessName: string;
  websiteUrl: string;
  industry: string;
  hasWebsite: string;
  lookingFor: string;
  frustration: string;
  heardFrom: string;
};

const industries = [
  "Health & Medical",
  "Trades & Construction",
  "Professional Services",
  "Retail & E-commerce",
  "Hospitality & Food",
  "Beauty & Wellness",
  "Real Estate",
  "Other",
];

const websiteStatuses = [
  { value: "no", label: "No, I need one" },
  { value: "yes-bad", label: "Yes, but it needs work" },
  { value: "yes-good", label: "Yes, but I want something better" },
];

const lookingForOptions = [
  { value: "new", label: "Brand new website" },
  { value: "refresh", label: "Refresh my existing site" },
  { value: "features", label: "Add features (booking, payments, etc.)" },
  { value: "not-sure", label: "Not sure yet" },
];

const heardFromOptions = [
  "Google search",
  "Social media",
  "Referral from a friend",
  "Other",
];

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [formComplete, setFormComplete] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobile: "",
    businessName: "",
    websiteUrl: "",
    industry: "",
    hasWebsite: "",
    lookingFor: "",
    frustration: "",
    heardFrom: "",
  });

  const totalSteps = 3;

  useEffect(() => {
    if (formComplete) {
      // Load Calendly widget script for popup
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);

      // Load Calendly CSS
      const link = document.createElement("link");
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, [formComplete]);

  const openCalendly = () => {
    // @ts-expect-error Calendly is loaded from external script
    if (window.Calendly) {
      // @ts-expect-error Calendly is loaded from external script
      window.Calendly.initPopupWidget({
        url: `https://calendly.com/eddie-rebuild/30min?hide_gdpr_banner=1&name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`,
      });
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setFormComplete(true);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStep1Valid = formData.name && formData.email && formData.mobile;
  const isStep2Valid = formData.businessName && formData.industry && formData.hasWebsite;
  const isStep3Valid = formData.lookingFor && formData.frustration;

  const canProceed =
    (step === 1 && isStep1Valid) ||
    (step === 2 && isStep2Valid) ||
    (step === 3 && isStep3Valid);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    fontSize: "16px",
    border: "1px solid #e0e2e6",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "14px",
    fontWeight: 500,
    color: "#131518",
    marginBottom: "6px",
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    cursor: "pointer",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234b515b' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 16px center",
  };

  const radioGroupStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  const radioLabelStyle = (selected: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 16px",
    border: selected ? "2px solid #298dff" : "1px solid #e0e2e6",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: selected ? "rgba(41, 141, 255, 0.05)" : "#ffffff",
    transition: "all 0.2s",
  });

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    nextStep();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevStep();
  };

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
          maxWidth: "600px",
          margin: "0 auto",
          padding: "24px 24px",
        }}
      >
        <AnimatePresence mode="wait">
          {!formComplete ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Header */}
              <div style={{ textAlign: "center", marginBottom: "32px" }}>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  style={{
                    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                    fontWeight: 700,
                    color: "#131518",
                    marginBottom: "12px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Let&apos;s get to know you
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{
                    fontSize: "16px",
                    color: "#4b515b",
                    maxWidth: "400px",
                    margin: "0 auto",
                    lineHeight: 1.6,
                  }}
                >
                  A few quick questions so I can come prepared to our call.
                </motion.p>
              </div>

              {/* Progress bar */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                  height: "4px",
                  backgroundColor: "#e0e2e6",
                  borderRadius: "2px",
                  marginBottom: "32px",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                    height: "100%",
                    backgroundColor: "#298dff",
                    borderRadius: "2px",
                  }}
                />
              </motion.div>

              {/* Form card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  padding: "32px",
                  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
                }}
              >
                {/* Step indicator */}
                <div
                  style={{
                    fontSize: "13px",
                    color: "#6c7584",
                    marginBottom: "24px",
                    fontWeight: 500,
                  }}
                >
                  Step {step} of {totalSteps}
                </div>

                {/* Form steps */}
                <AnimatePresence mode="wait" custom={direction}>
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#131518", marginBottom: "24px" }}>
                        About you
                      </h2>
                      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div>
                          <label style={labelStyle}>Full name *</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => updateField("name", e.target.value)}
                            placeholder="John Smith"
                            style={inputStyle}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#298dff";
                              e.target.style.boxShadow = "0 0 0 3px rgba(41, 141, 255, 0.1)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "#e0e2e6";
                              e.target.style.boxShadow = "none";
                            }}
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>Email *</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            placeholder="john@example.com"
                            style={inputStyle}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#298dff";
                              e.target.style.boxShadow = "0 0 0 3px rgba(41, 141, 255, 0.1)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "#e0e2e6";
                              e.target.style.boxShadow = "none";
                            }}
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>Mobile number *</label>
                          <input
                            type="tel"
                            value={formData.mobile}
                            onChange={(e) => updateField("mobile", e.target.value)}
                            placeholder="0412 345 678"
                            style={inputStyle}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#298dff";
                              e.target.style.boxShadow = "0 0 0 3px rgba(41, 141, 255, 0.1)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "#e0e2e6";
                              e.target.style.boxShadow = "none";
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#131518", marginBottom: "24px" }}>
                        About your business
                      </h2>
                      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div>
                          <label style={labelStyle}>Business name *</label>
                          <input
                            type="text"
                            value={formData.businessName}
                            onChange={(e) => updateField("businessName", e.target.value)}
                            placeholder="Acme Pty Ltd"
                            style={inputStyle}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#298dff";
                              e.target.style.boxShadow = "0 0 0 3px rgba(41, 141, 255, 0.1)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "#e0e2e6";
                              e.target.style.boxShadow = "none";
                            }}
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>Current website URL (if you have one)</label>
                          <input
                            type="url"
                            value={formData.websiteUrl}
                            onChange={(e) => updateField("websiteUrl", e.target.value)}
                            placeholder="https://example.com"
                            style={inputStyle}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#298dff";
                              e.target.style.boxShadow = "0 0 0 3px rgba(41, 141, 255, 0.1)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "#e0e2e6";
                              e.target.style.boxShadow = "none";
                            }}
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>Industry *</label>
                          <select
                            value={formData.industry}
                            onChange={(e) => updateField("industry", e.target.value)}
                            style={selectStyle}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#298dff";
                              e.target.style.boxShadow = "0 0 0 3px rgba(41, 141, 255, 0.1)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "#e0e2e6";
                              e.target.style.boxShadow = "none";
                            }}
                          >
                            <option value="">Select your industry</option>
                            {industries.map((ind) => (
                              <option key={ind} value={ind}>{ind}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label style={labelStyle}>Do you currently have a website? *</label>
                          <div style={radioGroupStyle}>
                            {websiteStatuses.map((status) => (
                              <label
                                key={status.value}
                                style={radioLabelStyle(formData.hasWebsite === status.value)}
                              >
                                <input
                                  type="radio"
                                  name="hasWebsite"
                                  value={status.value}
                                  checked={formData.hasWebsite === status.value}
                                  onChange={(e) => updateField("hasWebsite", e.target.value)}
                                  style={{ display: "none" }}
                                />
                                <span
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                    border: formData.hasWebsite === status.value ? "6px solid #298dff" : "2px solid #e0e2e6",
                                    transition: "all 0.2s",
                                  }}
                                />
                                <span style={{ color: "#131518", fontSize: "15px" }}>{status.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#131518", marginBottom: "24px" }}>
                        What are you looking for?
                      </h2>
                      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div>
                          <label style={labelStyle}>What do you need? *</label>
                          <div style={radioGroupStyle}>
                            {lookingForOptions.map((option) => (
                              <label
                                key={option.value}
                                style={radioLabelStyle(formData.lookingFor === option.value)}
                              >
                                <input
                                  type="radio"
                                  name="lookingFor"
                                  value={option.value}
                                  checked={formData.lookingFor === option.value}
                                  onChange={(e) => updateField("lookingFor", e.target.value)}
                                  style={{ display: "none" }}
                                />
                                <span
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                    border: formData.lookingFor === option.value ? "6px solid #298dff" : "2px solid #e0e2e6",
                                    transition: "all 0.2s",
                                  }}
                                />
                                <span style={{ color: "#131518", fontSize: "15px" }}>{option.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label style={labelStyle}>What&apos;s your biggest frustration right now? *</label>
                          <textarea
                            value={formData.frustration}
                            onChange={(e) => updateField("frustration", e.target.value)}
                            placeholder="Tell me what's not working for you..."
                            rows={4}
                            style={{
                              ...inputStyle,
                              resize: "vertical",
                              minHeight: "100px",
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#298dff";
                              e.target.style.boxShadow = "0 0 0 3px rgba(41, 141, 255, 0.1)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "#e0e2e6";
                              e.target.style.boxShadow = "none";
                            }}
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>How did you hear about re.build?</label>
                          <select
                            value={formData.heardFrom}
                            onChange={(e) => updateField("heardFrom", e.target.value)}
                            style={selectStyle}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#298dff";
                              e.target.style.boxShadow = "0 0 0 3px rgba(41, 141, 255, 0.1)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "#e0e2e6";
                              e.target.style.boxShadow = "none";
                            }}
                          >
                            <option value="">Select an option</option>
                            {heardFromOptions.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation buttons */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "32px",
                    paddingTop: "24px",
                    borderTop: "1px solid #e0e2e6",
                  }}
                >
                  {step > 1 ? (
                    <button
                      onClick={handlePrev}
                      style={{
                        padding: "12px 24px",
                        fontSize: "15px",
                        fontWeight: 500,
                        color: "#4b515b",
                        backgroundColor: "transparent",
                        border: "1px solid #e0e2e6",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#131518";
                        e.currentTarget.style.color = "#131518";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#e0e2e6";
                        e.currentTarget.style.color = "#4b515b";
                      }}
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}
                  <NeonButton
                    variant="dark"
                    onClick={handleNext}
                    disabled={!canProceed}
                    className="!mx-0"
                    style={{
                      opacity: canProceed ? 1 : 0.5,
                      pointerEvents: canProceed ? "auto" : "none",
                    }}
                  >
                    {step === totalSteps ? "Book my call" : "Continue"}
                  </NeonButton>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="calendly"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh",
              }}
            >
              {/* Success message */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ textAlign: "center", marginBottom: "32px" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3, type: "spring", stiffness: 200 }}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: "#298dff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                    boxShadow: "0 8px 32px rgba(41, 141, 255, 0.3)",
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </motion.div>
                <h1
                  style={{
                    fontSize: "clamp(2rem, 5vw, 2.5rem)",
                    fontWeight: 700,
                    color: "#131518",
                    marginBottom: "12px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Thanks, {formData.name.split(" ")[0]}!
                </h1>
                <p
                  style={{
                    fontSize: "18px",
                    color: "#4b515b",
                    lineHeight: 1.6,
                  }}
                >
                  Now pick a time that works for you.
                </p>
              </motion.div>

              {/* Pick a time button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <button
                  onClick={openCalendly}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "16px 28px",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#298dff",
                    backgroundColor: "rgba(41, 141, 255, 0.1)",
                    border: "1px solid rgba(41, 141, 255, 0.2)",
                    borderRadius: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(41, 141, 255, 0.15)";
                    e.currentTarget.style.borderColor = "rgba(41, 141, 255, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(41, 141, 255, 0.1)";
                    e.currentTarget.style.borderColor = "rgba(41, 141, 255, 0.2)";
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Pick a time
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>

              {/* Alternative */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                style={{
                  marginTop: "32px",
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
