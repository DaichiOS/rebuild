"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function AboutMe() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Update shine position
    const shine = cardRef.current.querySelector(".card-shine") as HTMLElement;
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    const shine = cardRef.current.querySelector(".card-shine") as HTMLElement;
    if (shine) {
      shine.style.background = "transparent";
    }
  };

  return (
    <section className="py-24 md:py-32 px-6 bg-[--color-off-white]">
      <div className="max-w-5xl mx-auto">
        {/* Two column layout */}
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-center">
          {/* Card side */}
          <Link href="/about" className="block mx-auto">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-[280px] md:w-[320px] transition-transform duration-200 ease-out"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Card frame - Pokemon style */}
              <div className="relative rounded-2xl p-1 shadow-2xl overflow-hidden">
                {/* Holographic animated border */}
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, #298dff 0%, #667eea 25%, #764ba2 50%, #298dff 75%, #4facfe 100%)",
                    backgroundSize: "300% 300%",
                    animation: "gradient-shift 4s ease infinite",
                  }}
                />

                {/* Inner card background - Light cream */}
                <div className="relative bg-gradient-to-b from-[#fafafa] to-[#f0f0f0] rounded-xl p-2 overflow-hidden">
                  {/* Shine overlay */}
                  <div className="card-shine absolute inset-0 z-30 pointer-events-none transition-all duration-200 rounded-xl" />

                  {/* Card header - Name & HP */}
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-[--color-near-black] font-bold text-sm tracking-wide">Eddie</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[--color-medium-gray] text-xs">HP</span>
                      <span className="text-[--color-near-black] font-bold">∞</span>
                    </div>
                  </div>

                  {/* Photo frame */}
                  <div className="relative mx-2 rounded-lg overflow-hidden border-4 border-[#298dff]/20 shadow-md">
                    <div className="relative aspect-square">
                      <Image
                        src="/me/eddie-bg.png"
                        alt="Eddie"
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Inner frame shine */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
                  </div>

                  {/* Stats/Info section */}
                  <div className="px-3 py-3 space-y-2">
                    {/* Type badge */}
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-gradient-to-r from-[#298dff] to-[#667eea] rounded-full text-[10px] text-white font-bold uppercase">
                        Founder
                      </span>
                      <span className="px-2 py-0.5 bg-gradient-to-r from-[#298dff] to-[#4facfe] rounded-full text-[10px] text-white font-bold uppercase">
                        Builder
                      </span>
                    </div>

                    {/* Ability */}
                    <div className="bg-[--color-near-black]/5 rounded-lg p-2">
                      <p className="text-[10px] text-[--color-medium-gray] uppercase tracking-wider mb-1">Special Ability</p>
                      <p className="text-xs text-[--color-near-black] leading-relaxed">
                        Turns complex problems into elegant solutions. +10 years XP.
                      </p>
                    </div>
                  </div>

                  {/* Bottom decorative line */}
                  <div className="h-px bg-gradient-to-r from-transparent via-[#298dff]/30 to-transparent mx-3 mb-2" />

                  {/* Rarity stars */}
                  <div className="flex justify-center gap-1 pb-2">
                    {[...Array(3)].map((_, i) => (
                      <span key={i} className="text-[#298dff] text-xs">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Quote side */}
          <div>
            <p className="text-sm uppercase tracking-widest text-[--color-medium-gray] mb-6">
              Our why
            </p>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold text-[--color-near-black] leading-snug mb-6">
              &ldquo;Ten years across startups taught me one thing: most businesses don&apos;t need more—they need the right things done well.&rdquo;
            </blockquote>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[--color-accent] font-medium hover:gap-3 transition-all"
            >
              Read my story <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
