"use client";

import { useRef, useEffect } from "react";
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".process-panel");

      // Main horizontal scroll - smoother scrub value
      const scrollTween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 2, // Increased for smoother scrolling
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.3, max: 0.6 },
            ease: "power1.inOut",
          },
          end: () => "+=" + window.innerWidth * (panels.length - 1),
          anticipatePin: 1,
        },
      });

      // Animate panel contents as they come into view
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
              containerAnimation: scrollTween,
              start: "left 80%",
              end: "left 50%",
              scrub: 2,
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
              containerAnimation: scrollTween,
              start: "left 70%",
              end: "left 40%",
              scrub: 2,
            },
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Separate effect for outro animations
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

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="overflow-hidden"
    >
      {/* Intro - reduced height, lighter background */}
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

      {/* Horizontal scroll section - lighter color scheme */}
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
                      i === index ? "bg-[--color-accent] w-8" : "bg-[--color-light-gray] w-2"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Outro CTA */}
      <div
        ref={outroRef}
        className="py-20 md:py-32 px-6 relative overflow-hidden"
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
