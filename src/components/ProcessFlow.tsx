"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { GradientButton } from "@/components/ui/gradient-button";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Brief",
    description: "Fill out a quick questionnaire about your business and goals.",
    detail: "I'll analyse your current site, scope out competitors, and find opportunities.",
  },
  {
    number: "02",
    title: "Chat",
    description: "30-minute strategy call. No sales pitch, just straight talk.",
    detail: "We figure out if I'm the right fit. If not, no hard feelings.",
  },
  {
    number: "03",
    title: "Plan",
    description: "I research and come back with a proposal and fixed quote.",
    detail: "The quote is only relevant if you decide you are 100% happy with the outcome, and want to pay. There is 0% risk on your end, and you only pay if you are happy with my work.",
  },
  {
    number: "04",
    title: "Build",
    description: "I build your site. You see it come together. Then you decide.",
    detail: "Love it? Pay and it's yours. Not convinced? Walk away—you owe nothing.",
  },
];

export default function ProcessFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Desktop: GSAP horizontal scroll
  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".process-panel");

      // Main horizontal scroll - much higher scrub for smoother feel
      scrollTweenRef.current = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 3, // Higher = smoother, less sensitive
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.4, max: 0.8 },
            ease: "power2.inOut",
            delay: 0.1,
          },
          // Longer scroll distance = less sensitive
          end: () => "+=" + window.innerWidth * (panels.length - 1) * 1.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const newStep = Math.round(self.progress * (panels.length - 1));
            setActiveStep(newStep);
          },
        },
      });

      // Animate panel contents
      panels.forEach((panel) => {
        const number = panel.querySelector(".panel-number");
        const content = panel.querySelector(".panel-content");

        gsap.fromTo(
          number,
          { scale: 0.3, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTweenRef.current!,
              start: "left 80%",
              end: "left 50%",
              scrub: 3,
            },
          }
        );

        gsap.fromTo(
          content,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTweenRef.current!,
              start: "left 70%",
              end: "left 40%",
              scrub: 3,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Outro animations
  useEffect(() => {
    if (!outroRef.current) return;

    const outroHeadline = outroRef.current.querySelector(".outro-headline");
    const outroBody = outroRef.current.querySelector(".outro-body");
    const outroButton = outroRef.current.querySelector(".outro-button");
    const outroChecks = outroRef.current.querySelector(".outro-checks");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: outroRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      outroHeadline,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
    )
      .fromTo(
        outroBody,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        outroButton,
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        outroChecks,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.3"
      );

    return () => {
      tl.kill();
    };
  }, []);

  // Mobile navigation
  const goToStep = (index: number) => {
    if (index >= 0 && index < steps.length) {
      setActiveStep(index);
    }
  };

  // Mobile swipe handling
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeStep < steps.length - 1) {
        goToStep(activeStep + 1);
      } else if (diff < 0 && activeStep > 0) {
        goToStep(activeStep - 1);
      }
    }
  };

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="overflow-hidden"
    >
      {/* Intro */}
      <div className="py-16 md:py-24 flex items-center justify-center px-6 bg-[--color-off-white]">
        <div className="text-center">
          <p className="body-l text-[--color-medium-gray] max-w-lg mx-auto">
            No deposits. No lock-in. Four simple steps.
          </p>
          <div className="mt-4">
            <span className="text-[--color-accent] text-xl">↓</span>
          </div>
        </div>
      </div>

      {/* Mobile: Card-based navigation */}
      {isMobile ? (
        <div
          className="min-h-[80vh] bg-white px-6 py-12 flex flex-col items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Step content */}
          <div className="w-full max-w-md text-center">
            <span
              className="text-[8rem] font-bold leading-none block mb-4"
              style={{
                background: "linear-gradient(180deg, #298dff 0%, #298dff40 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {steps[activeStep].number}
            </span>
            <h3 className="text-4xl font-bold text-[--color-near-black] mb-4">
              {steps[activeStep].title}
            </h3>
            <p className="text-lg text-[--color-medium-gray] mb-4">
              {steps[activeStep].description}
            </p>
            <p className="text-base text-[--color-accent] font-medium">
              {steps[activeStep].detail}
            </p>
          </div>

          {/* Navigation controls */}
          <div className="mt-10 flex items-center gap-6">
            <button
              onClick={() => goToStep(activeStep - 1)}
              disabled={activeStep === 0}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                activeStep === 0
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-[--color-accent] text-[--color-accent] hover:bg-[--color-accent] hover:text-white"
              }`}
              aria-label="Previous step"
            >
              ←
            </button>

            {/* Step dots */}
            <div className="flex gap-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToStep(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === activeStep ? "bg-[--color-accent] w-8" : "bg-[--color-light-gray] w-2 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => goToStep(activeStep + 1)}
              disabled={activeStep === steps.length - 1}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                activeStep === steps.length - 1
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-[--color-accent] text-[--color-accent] hover:bg-[--color-accent] hover:text-white"
              }`}
              aria-label="Next step"
            >
              →
            </button>
          </div>

          {/* Swipe hint */}
          <p className="mt-6 text-sm text-gray-400">
            Swipe or tap arrows to navigate
          </p>
        </div>
      ) : (
        /* Desktop: Horizontal scroll with nav buttons */
        <div className="relative">
          <div ref={triggerRef} className="h-screen overflow-hidden bg-white">
            <div className="flex h-full" style={{ width: `${steps.length * 100}vw` }}>
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="process-panel w-screen h-full flex-shrink-0 flex items-center justify-center px-6 md:px-12 relative"
                  style={{
                    background: index % 2 === 0
                      ? "linear-gradient(135deg, #f4f5f7 0%, #ffffff 100%)"
                      : "linear-gradient(135deg, #ffffff 0%, #f4f5f7 100%)",
                  }}
                >
                  {/* Content container */}
                  <div className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row items-center gap-8 md:gap-16">
                    {/* Giant number */}
                    <div className="panel-number flex-shrink-0">
                      <span
                        className="text-[10rem] md:text-[14rem] lg:text-[18rem] font-bold leading-none block"
                        style={{
                          background: "linear-gradient(180deg, #298dff 0%, #298dff40 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Text content */}
                    <div className="panel-content text-center md:text-left">
                      <h3 className="text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-bold text-[--color-near-black] mb-4 md:mb-6 leading-none">
                        {step.title}
                      </h3>
                      <p className="text-lg md:text-2xl text-[--color-medium-gray] mb-4 max-w-lg leading-relaxed">
                        {step.description}
                      </p>
                      <p className="text-base md:text-lg text-[--color-accent] max-w-lg font-medium">
                        {step.detail}
                      </p>
                    </div>
                  </div>

                  {/* Step indicator dots */}
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
                    {steps.map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 rounded-full transition-all ${
                          i === activeStep ? "bg-[--color-accent] w-8" : "bg-[--color-light-gray] w-2"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop scroll hint */}
          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-sm text-gray-400 pointer-events-none">
            Scroll to navigate
          </div>
        </div>
      )}

      {/* Outro CTA */}
      <div
        ref={outroRef}
        className="min-h-[70vh] py-24 md:py-32 px-6 relative overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: "#1e3a5f" }}
      >
        {/* Background gradient accent */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(41, 141, 255, 0.25) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="outro-headline">
            <p className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: "#ffffff" }}>
              Worst case?<br />
              <span style={{ color: "#298dff" }}>Free advice.</span>
            </p>
          </div>

          <div className="outro-body">
            <p className="text-lg md:text-xl mb-4 max-w-2xl mx-auto leading-relaxed" style={{ color: "#e0e2e6" }}>
              Even if we don&apos;t end up working together, you&apos;ll walk away with a clear audit of your current site, insights on your competitors, and actionable recommendations.
            </p>
            <p className="text-base md:text-lg mb-10 max-w-xl mx-auto" style={{ color: "#b8c4d4" }}>
              No invoice. No strings attached. Just genuine help—whether you hire me or not.
            </p>
          </div>

          <div className="outro-button">
            <GradientButton asChild variant="variant">
              <Link href="/apply">Get your free audit →</Link>
            </GradientButton>
          </div>

          <div className="outro-checks flex flex-wrap items-center justify-center gap-6 text-sm mt-10" style={{ color: "#d1d9e6" }}>
            <span className="flex items-center gap-2">
              <span style={{ color: "#298dff" }}>✓</span> 5 min questionnaire
            </span>
            <span className="flex items-center gap-2">
              <span style={{ color: "#298dff" }}>✓</span> Free market analysis
            </span>
            <span className="flex items-center gap-2">
              <span style={{ color: "#298dff" }}>✓</span> Zero obligation
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
