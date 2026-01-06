"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ProcessFlow from "@/components/ProcessFlow";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

export default function Home() {
  return (
    <div className="min-h-screen bg-[--color-off-white]">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-between pb-8 md:pb-12">
        {/* Full-width logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full px-4 md:px-8"
        >
          <Image
            src="/logos/rebuild4.png"
            alt="re.build"
            width={2400}
            height={400}
            className="w-[50%] md:w-[45%] h-auto"
            priority
          />
          <motion.p
            className="body-s text-[--color-medium-gray] mt-1 px-6 md:px-12 lg:px-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            websites for small business
          </motion.p>
        </motion.div>

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

        {/* Spacer for bottom padding */}
        <div className="h-4 md:h-8" />
      </section>

      {/* Process Flow - GSAP Animated */}
      <ProcessFlow />

      {/* TODO: Uncomment these sections when ready

      {/* The Problem - Two Panel Comparison */}
      {/*
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-l text-[--color-near-black] mb-12 text-center">
            You Shouldn&apos;t Have to Pay Before You See Results.
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[--color-off-white] p-8 border border-[--color-light-gray]">
              <h3 className="heading-s text-[--color-medium-gray] mb-6">
                The Usual
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✕</span>
                  <span className="text-[--color-medium-gray]">Pay 50% upfront</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✕</span>
                  <span className="text-[--color-medium-gray]">Wait weeks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✕</span>
                  <span className="text-[--color-medium-gray]">Hope it turns out okay</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✕</span>
                  <span className="text-[--color-medium-gray]">Stuck if it doesn&apos;t</span>
                </li>
              </ul>
            </div>

            <div className="bg-[--color-accent]/20 p-8 border-2 border-[--color-accent]">
              <h3 className="heading-s text-[--color-near-black] mb-6">
                How I Work
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[--color-accent] mt-1">✓</span>
                  <span className="text-[--color-near-black]">Pay nothing upfront</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[--color-accent] mt-1">✓</span>
                  <span className="text-[--color-near-black]">See it as it&apos;s built</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[--color-accent] mt-1">✓</span>
                  <span className="text-[--color-near-black]">Request changes along the way</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[--color-accent] mt-1">✓</span>
                  <span className="text-[--color-near-black]">Only pay when you&apos;re happy</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-center body-l text-[--color-medium-gray]">
            If I don&apos;t deliver what we agreed on, you walk away. I take the risk, not you.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-l text-[--color-near-black] mb-6">
            Websites That Actually Work for Your Business.
          </h2>

          <p className="body-l text-[--color-medium-gray] mb-8">
            Whether you need a brand new site, a refresh of what you&apos;ve got, or
            something custom—let&apos;s talk. I&apos;ll tell you what you actually need.
            No upselling. No jargon.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 border border-[--color-light-gray]">
              <div className="h-32 bg-[--color-light-gray]/50 mb-4 flex items-center justify-center text-[--color-medium-gray]">
                Landing Pages
              </div>
            </div>
            <div className="bg-white p-6 border border-[--color-light-gray]">
              <div className="h-32 bg-[--color-light-gray]/50 mb-4 flex items-center justify-center text-[--color-medium-gray]">
                Business Sites
              </div>
            </div>
            <div className="bg-white p-6 border border-[--color-light-gray]">
              <div className="h-32 bg-[--color-light-gray]/50 mb-4 flex items-center justify-center text-[--color-medium-gray]">
                Custom Builds
              </div>
            </div>
          </div>

          <p className="body-m text-[--color-medium-gray]">
            Not sure what you need? That&apos;s what the strategy call is for.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-l text-[--color-near-black] mb-12 text-center">
            Local. Straight-Up. Fair.
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-[--color-accent] mx-auto mb-4 flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="heading-s text-[--color-near-black] mb-2">
                Sydney-based
              </h3>
              <p className="body-m text-[--color-medium-gray]">
                I&apos;m local. Happy to meet for a coffee or a call.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 bg-[--color-accent] mx-auto mb-4 flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="heading-s text-[--color-near-black] mb-2">
                No BS
              </h3>
              <p className="body-m text-[--color-medium-gray]">
                I&apos;ll tell you what you need—and what you don&apos;t.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 bg-[--color-accent] mx-auto mb-4 flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="heading-s text-[--color-near-black] mb-2">
                You own it
              </h3>
              <p className="body-m text-[--color-medium-gray]">
                No ongoing hosting fees that lock you in. It&apos;s your site.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="md:flex md:gap-12 items-start">
            <div className="flex-shrink-0 mb-8 md:mb-0">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-[--color-light-gray] mx-auto md:mx-0 flex items-center justify-center text-[--color-medium-gray] text-sm">
                Photo
              </div>
            </div>

            <div>
              <h2 className="heading-l text-[--color-near-black] mb-6">
                G&apos;day, I&apos;m Eddie.
              </h2>

              <div className="space-y-4 body-l text-[--color-medium-gray]">
                <p>
                  I&apos;ve built tech for startups and big companies, but I prefer
                  working with small business owners who just need someone reliable.
                </p>
                <p>
                  I started re.build because I was sick of seeing people pay upfront
                  for work that never delivered. So I flipped it—you don&apos;t pay until
                  you&apos;re happy. Simple as that.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[--color-near-black] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-l mb-6">
            Let&apos;s See If I Can Help.
          </h2>

          <p className="body-l text-gray-300 mb-10 max-w-xl mx-auto">
            Book a free 20-minute strategy call. We&apos;ll look at what you&apos;ve got,
            what you need, and whether I&apos;m the right fit. No pressure. No sales pitch.
          </p>

          <Link
            href="/apply"
            className="inline-block bg-[--color-accent] text-[--color-near-black] px-8 py-4 text-base font-semibold hover:bg-white transition-colors mb-6"
          >
            Book Your Free Strategy Call
          </Link>

          <p className="body-s text-gray-400">
            Rather email? →{" "}
            <a
              href="mailto:eddie@rebuild.dev"
              className="text-white hover:underline"
            >
              eddie@rebuild.dev
            </a>
          </p>
        </div>
      </section>

      <footer className="py-10 px-6 bg-[--color-near-black] text-gray-400 border-t border-gray-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="body-s">© 2025 re.build · Sydney, Australia</p>
          <p className="body-s">Websites for small businesses. Pay only if you&apos;re happy.</p>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[--color-light-gray] p-4 flex items-center justify-between md:hidden z-50">
        <span className="body-s font-medium text-[--color-near-black]">
          5 spots this quarter
        </span>
        <Link
          href="/apply"
          className="bg-[--color-dark-gray] text-white px-6 py-2.5 text-sm font-medium hover:bg-[--color-near-black] transition-colors"
        >
          Book a Call
        </Link>
      </div>

      <div className="h-20 md:hidden" />
      */}
    </div>
  );
}
