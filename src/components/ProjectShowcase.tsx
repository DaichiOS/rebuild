"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const screenshots = [
  { src: "/projects/index-hero1.png", title: "Homepage", description: "The landing that launched a platform" },
  { src: "/projects/index-narratives1.png", title: "Narratives", description: "Bet on market trends" },
  { src: "/projects/index-create.png", title: "Create", description: "Build custom indexes in minutes" },
  { src: "/projects/index-portfolio.png", title: "Portfolio", description: "Track holdings across chains" },
  { src: "/projects/index-leaderboard.png", title: "Leaderboard", description: "Compete with other traders" },
  { src: "/projects/index-rebalance.png", title: "Rebalance", description: "One-click portfolio adjustment" },
];

// Story sections - 1 image per section
const storySections = [
  {
    title: "The Challenge",
    body: "Traditional index funds are gatekept by institutions. Crypto indexes are fragmented across chains. We set out to build something different — a platform where anyone can create, trade, and manage custom indexes spanning both crypto and traditional markets.",
    image: "/projects/index-hero1.png",
  },
  {
    title: "Narrative Trading",
    body: "Markets move on stories. We built a prediction market that lets users bet on narratives — AI, DeFi summer, meme coins, whatever's moving. Put your money where your conviction is.",
    image: "/projects/index-narratives1.png",
  },
  {
    title: "Create Anything",
    body: "Want exposure to AI tokens? Gaming? Layer 2s? Build your own index in minutes. Set weights, pick assets across chains, deploy. No code required. Your index, your rules.",
    image: "/projects/index-create.png",
  },
  {
    title: "Track Everything",
    body: "Real-time portfolio tracking across every chain. See your holdings, performance, and allocation at a glance. Compare against benchmarks. Know exactly where you stand.",
    image: "/projects/index-portfolio.png",
  },
  {
    title: "One-Click Rebalance",
    body: "Markets shift. Your index should too. Rebalance your entire portfolio with a single transaction. No manual swaps. No spreadsheets. Just click and done.",
    image: "/projects/index-rebalance.png",
  },
];

export default function ProjectShowcase() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const gsapContextRef = useRef<gsap.Context | null>(null);

  // Handle open
  const handleOpen = useCallback(() => {
    setActiveIndex(0);
    setIsExpanded(true);
  }, []);

  // Handle close - only revert OUR animations, not all ScrollTriggers
  const handleClose = useCallback(() => {
    if (gsapContextRef.current) {
      gsapContextRef.current.revert();
      gsapContextRef.current = null;
    }
    setActiveIndex(0);
    setIsExpanded(false);
  }, []);

  // Scroll to story section when expanded
  useEffect(() => {
    if (isExpanded && scrollContainerRef.current) {
      // Scroll to the story container
      scrollContainerRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [isExpanded]);

  // Simple GSAP - just fade in sections
  useEffect(() => {
    if (!isExpanded || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    container.scrollTop = 0;

    const timer = setTimeout(() => {
      gsapContextRef.current = gsap.context(() => {
        // Intro
        gsap.from(".intro-fade", { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 });

        // Track active section
        const sections = container.querySelectorAll(".story-section");
        sections.forEach((section, index) => {
          ScrollTrigger.create({
            trigger: section,
            scroller: container,
            start: "top 60%",
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index),
          });
        });

        // CTA
        ScrollTrigger.create({
          trigger: ".story-cta",
          scroller: container,
          start: "top 70%",
          onEnter: () => setActiveIndex(storySections.length),
        });
      }, container);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (gsapContextRef.current) {
        gsapContextRef.current.revert();
        gsapContextRef.current = null;
      }
    };
  }, [isExpanded]);

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        handleClose();
      }
      if (!isExpanded) {
        if (e.key === "ArrowLeft") {
          setSelectedImage((prev) => (prev - 1 + screenshots.length) % screenshots.length);
        } else if (e.key === "ArrowRight") {
          setSelectedImage((prev) => (prev + 1) % screenshots.length);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded, handleClose]);

  return (
    <>
      {/* Preview Section - hidden when expanded */}
      <section className={`py-24 md:py-32 px-6 bg-[--color-off-white] ${isExpanded ? "hidden" : ""}`}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-sm uppercase tracking-widest text-[--color-medium-gray] mb-2">
                Featured Project
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-[--color-near-black]">
                index.fun
              </h2>
            </div>
            <p className="text-base text-[--color-medium-gray] max-w-md">
              Create custom indexes spanning crypto and traditional markets. Plus a prediction market for betting on narratives. 6 months, end-to-end.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-4 group">
            <button
              className="absolute inset-0 w-full h-full cursor-pointer"
              onClick={handleOpen}
            >
              <Image
                src={screenshots[selectedImage].src}
                alt={screenshots[selectedImage].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                priority
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </button>

            {/* Nav arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) => (prev - 1 + screenshots.length) % screenshots.length);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 z-10 cursor-pointer"
            >
              <svg className="w-5 h-5 text-[--color-near-black]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) => (prev + 1) % screenshots.length);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 z-10 cursor-pointer"
            >
              <svg className="w-5 h-5 text-[--color-near-black]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Labels */}
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#131518] rounded-full z-10 pointer-events-none">
              <span className="text-xs font-medium text-white">
                {screenshots[selectedImage].title} · {selectedImage + 1}/{screenshots.length}
              </span>
            </div>
            <div className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
              <span className="text-xs font-medium text-[--color-near-black]">
                Click to explore →
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-6 gap-2 md:gap-3">
            {screenshots.map((shot, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`relative aspect-[16/10] rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
                  selectedImage === i
                    ? "ring-2 ring-[--color-near-black] ring-offset-2 ring-offset-[--color-off-white]"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={shot.src} alt={shot.title} fill className="object-cover" />
              </button>
            ))}
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 pt-10 border-t border-[--color-light-gray]">
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider text-[--color-medium-gray] mb-1">Type</p>
              <p className="text-sm font-medium text-[--color-near-black]">DeFi + Prediction Market</p>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider text-[--color-medium-gray] mb-1">Timeline</p>
              <p className="text-sm font-medium text-[--color-near-black]">6 Months</p>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider text-[--color-medium-gray] mb-1">Stack</p>
              <p className="text-sm font-medium text-[--color-near-black]">Next.js + Solidity</p>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider text-[--color-medium-gray] mb-1">Scope</p>
              <p className="text-sm font-medium text-[--color-near-black]">End-to-End</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expanded View - fixed full screen to cover header */}
      {isExpanded && (
        <div
          ref={scrollContainerRef}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] overflow-y-auto"
        >
          {/* Close */}
          <button
            onClick={handleClose}
            className="fixed top-6 right-6 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer backdrop-blur-sm"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Progress */}
          <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[60] flex flex-col gap-2">
            {storySections.map((_, i) => (
              <div
                key={i}
                className="w-1 rounded-full transition-all duration-300"
                style={{
                  height: i === activeIndex ? "24px" : "8px",
                  backgroundColor: i === activeIndex ? "#2AE98B" : "#ffffff30",
                }}
              />
            ))}
          </div>

          {/* Intro */}
          <div className="min-h-screen flex items-center justify-center px-6 relative">
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, #2AE98B15 0%, transparent 70%)" }}
            />
            <div className="text-center relative z-10 max-w-4xl">
              <p className="text-sm uppercase tracking-widest mb-6 intro-fade" style={{ color: "#2AE98B" }}>
                Case Study
              </p>
              <div className="intro-fade mb-8">
                <Image
                  src="/banners/index-fun-logo.png"
                  alt="index.fun"
                  width={400}
                  height={100}
                  className="mx-auto h-16 md:h-24 w-auto"
                />
              </div>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8 intro-fade">
                Custom indexes spanning crypto and stocks. A prediction market for betting on narratives.
              </p>
              <div className="flex items-center justify-center gap-8 text-sm text-gray-400 intro-fade">
                <span>DeFi + Prediction Market</span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span>6 Months</span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span>Next.js + Solidity</span>
              </div>
            </div>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce intro-fade">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>

          {/* Story Sections */}
          {storySections.map((section, i) => (
            <div
              key={i}
              className="story-section min-h-screen py-32 flex items-center px-8 md:px-20 bg-[#0a0a0a]"
            >
              <div className="w-full max-w-[1600px] mx-auto grid md:grid-cols-[1fr_1.3fr] gap-12 md:gap-16 items-center">
                {/* Text */}
                <div className="order-2 md:order-1">
                  <span className="text-base uppercase tracking-widest mb-4 block font-medium" style={{ color: "#2AE98B" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1]">
                    {section.title}
                  </h2>
                  <p className="text-xl md:text-2xl leading-[1.8] text-gray-200">
                    {section.body}
                  </p>
                </div>

                {/* Image - Larger */}
                <div className="order-1 md:order-2 flex items-center justify-center">
                  <div
                    className="story-image relative w-full aspect-[16/10] rounded-2xl overflow-hidden"
                    style={{ boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.9)" }}
                  >
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="story-cta min-h-screen flex items-center justify-center px-6 bg-[#0a0a0a]">
            <div className="cta-content text-center max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Want something like this?
              </h2>
              <p className="text-xl text-gray-400 mb-10">
                I build custom web experiences that actually convert. Let&apos;s talk about your project.
              </p>
              <button
                onClick={handleClose}
                className="px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{ backgroundColor: "#2AE98B", color: "#0a0a0a" }}
              >
                Back to re.build
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
