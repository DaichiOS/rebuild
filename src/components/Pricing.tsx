import Link from "next/link";

const websiteFeatures = [
  "Everything in Free Audit",
  "Direct access to me",
  "Twice-weekly updates",
  "You own everything",
  "Hosting included",
];

const auditIncludes = [
  "SEO audit",
  "Conversion audit",
  "Local SEO review",
  "Google Business check",
  "Competitor analysis",
  "Strategy recommendations",
];

const biggerIdeas = [
  "Custom web apps",
  "SaaS platforms",
  "Client portals",
  "Booking systems",
  "E-commerce stores",
  "Internal dashboards",
];

export default function Pricing() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[#f8f9fa]">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <p className="text-sm uppercase tracking-widest text-[#4b515b] mb-8">
          Pricing
        </p>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#050a30] leading-tight mb-16">
          Fair pricing,<br />
          <span className="italic font-normal">no hidden fees.</span>
        </h2>

        {/* Cards Grid - 3 columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">

          {/* Card 1: Free Audit */}
          <div className="bg-white rounded-2xl p-8 border border-[#e5e7eb] flex flex-col relative">
            {/* Limited badge */}
            <div className="absolute -top-3 left-6 px-3 py-1 bg-[#298dff] text-white text-xs font-medium rounded-full">
              Limited spots
            </div>

            <div>
              <p className="text-[#050a30] text-lg font-medium mb-1">
                Free audit
              </p>
              <p className="text-[#4b515b] text-sm mb-6">
                No strings attached.
              </p>
            </div>

            {/* Price */}
            <div className="h-20 flex items-end mb-6">
              <span className="text-[#050a30] text-4xl font-bold">$0</span>
            </div>

            {/* CTA */}
            <Link
              href="/apply"
              className="inline-flex items-center justify-center w-full px-6 py-3 border border-[#e5e7eb] text-[#050a30] font-medium rounded-full hover:bg-[#f8f9fa] transition-colors mb-8"
            >
              Book a chat
            </Link>

            {/* Features */}
            <div className="space-y-3 flex-1">
              {auditIncludes.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-sm text-[#4b515b]">
                  <span className="text-[#298dff]">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Custom Website - Featured */}
          <div className="bg-[#0f172a] rounded-2xl p-8 flex flex-col">
            <div>
              <p className="text-white text-lg font-medium mb-1">
                Custom website
              </p>
              <p className="text-gray-400 text-sm mb-6">
                Pay only if you love it. Zero commitment.
              </p>
            </div>

            {/* Price */}
            <div className="h-20 flex flex-col justify-end mb-6">
              <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                <span>From</span>
                <span>↓</span>
              </div>
              <span className="text-white text-4xl font-bold">$2k</span>
            </div>

            {/* CTA */}
            <Link
              href="/apply"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-white text-[#050a30] font-medium rounded-full hover:bg-gray-100 transition-colors mb-8"
            >
              Get your free quote
            </Link>

            {/* Features */}
            <div className="space-y-3 flex-1">
              {websiteFeatures.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="text-[#298dff]">✓</span>
                  <span className={index === 0 ? "text-[#298dff] font-medium" : ""}>{item}</span>
                </div>
              ))}
            </div>

            {/* No risk callout */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-sm text-gray-400 text-center">
                Don't like it? Walk away. You owe nothing.
              </p>
            </div>
          </div>

          {/* Card 3: Something Bigger */}
          <div className="bg-white rounded-2xl p-8 border border-[#e5e7eb] flex flex-col">
            <div>
              <p className="text-[#050a30] text-lg font-medium mb-1">
                Something bigger
              </p>
              <p className="text-[#4b515b] text-sm mb-6">
                Full products & MVPs.
              </p>
            </div>

            {/* Price */}
            <div className="h-20 flex items-end mb-6">
              <span className="text-[#050a30] text-4xl font-bold">Let's talk</span>
            </div>

            {/* CTA */}
            <Link
              href="/apply"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#050a30] text-white font-medium rounded-full hover:bg-[#1a1f35] transition-colors mb-8"
            >
              Start a conversation
            </Link>

            {/* Ideas */}
            <div className="space-y-3 flex-1">
              <p className="text-xs text-[#4b515b] uppercase tracking-wider mb-2">Ideas:</p>
              {biggerIdeas.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-sm text-[#4b515b]">
                  <span className="text-[#298dff]">→</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
