"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProcessFlow from "@/components/ProcessFlow";
import LogoMarquee from "@/components/LogoMarquee";
import ProjectShowcase from "@/components/ProjectShowcase";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

export default function Home() {
  return (
    <div className="min-h-screen bg-[--color-off-white]">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-between pb-8 md:pb-12">
        {/* Spacer for fixed header */}
        <div className="h-16 md:h-20" />

        {/* Main headline - centered */}
        <div className="max-w-5xl mx-auto text-center px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-center">
          <h1 className="text-[2rem] md:text-[3.5rem] lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight text-[--color-near-black]">
            <motion.span
              className="italic font-normal inline-block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              we&apos;ll <span className="text-pop">build</span> your <span className="text-pop">website</span>
            </motion.span>{" "}
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            >
              for <span className="text-highlight">free</span>.
            </motion.span>
            <br />
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            >
              <span className="text-emphasis">you</span> decide if it&apos;s worth paying for.
            </motion.span>
          </h1>

          <motion.div
            className="flex flex-col items-center justify-center gap-5 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
          >
            <ShimmerButton href="/apply" avatar="E">
              Book a call with Eddie
            </ShimmerButton>
            <Link href="#how-it-works">
              <LiquidButton size="lg" className="text-[--color-near-black]">
                How it works →
              </LiquidButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Logo Marquee - Trust Banner */}
      <LogoMarquee />

      {/* Process Flow - GSAP Animated */}
      <ProcessFlow />

      {/* Project Showcase */}
      <ProjectShowcase />
    </div>
  );
}
