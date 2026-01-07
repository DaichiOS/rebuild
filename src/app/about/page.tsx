import Image from "next/image";
import Link from "next/link";
import { GradientButton } from "@/components/ui/gradient-button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[--color-off-white]">
      {/* Hero + Photo combined */}
      <section className="px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Photo */}
            <div className="relative">
              <div
                className="absolute -inset-4 bg-[--color-near-black]"
                style={{ borderRadius: "42% 58% 50% 50% / 45% 45% 55% 55%" }}
              />
              <div
                className="relative aspect-[3/4] overflow-hidden"
                style={{ borderRadius: "40% 60% 50% 50% / 43% 43% 57% 57%" }}
              >
                <Image
                  src="/me/eddie1.png"
                  alt="Eddie"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Story */}
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-widest text-[--color-medium-gray]">
                About
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[--color-near-black] leading-tight">
                G&apos;day, I&apos;m Eddie.
              </h1>
              <div className="space-y-4 text-lg text-[--color-medium-gray] leading-relaxed">
                <p>
                  I&apos;ve spent the last decade in the trenches of startups—building products,
                  shipping fast, and learning what actually moves the needle for a business.
                </p>
                <p>
                  I&apos;ve seen companies waste months and thousands on websites that looked
                  pretty but didn&apos;t convert. I&apos;ve also seen scrappy teams with simple
                  sites outperform their competitors because they focused on what mattered.
                </p>
                <p>
                  That&apos;s why I started re.build.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why re.build */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[--color-near-black] mb-8">
            Why I do this differently
          </h2>
          <div className="space-y-6 text-lg text-[--color-medium-gray] leading-relaxed">
            <p>
              I got tired of watching small business owners get burned. They&apos;d pay
              thousands upfront to agencies, wait weeks, and end up with something that
              didn&apos;t feel like them—or worse, didn&apos;t work.
            </p>
            <p>
              The agency model is broken. You&apos;re paying for something you haven&apos;t
              seen yet, from people who disappear after the invoice clears.
            </p>
            <p>
              So I flipped it. I build first. You see the work. Then you decide if it&apos;s
              worth paying for. If not, you walk away—no invoice, no hard feelings.
            </p>
            <p className="text-[--color-near-black] font-medium">
              It&apos;s how I&apos;d want to be treated. So that&apos;s how I treat you.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[--color-near-black] mb-12 text-center">
            What I believe
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[--color-accent] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-[--color-near-black] mb-2">
                Clarity over complexity
              </h3>
              <p className="text-[--color-medium-gray]">
                Most businesses don&apos;t need more features. They need the right things done well.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[--color-accent] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-[--color-near-black] mb-2">
                Results over deliverables
              </h3>
              <p className="text-[--color-medium-gray]">
                A website isn&apos;t the goal. Growing your business is. Everything I build serves that.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[--color-accent] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-[--color-near-black] mb-2">
                Trust is earned
              </h3>
              <p className="text-[--color-medium-gray]">
                That&apos;s why you don&apos;t pay until you&apos;re happy. I have to earn your business every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-6 bg-[--color-near-black]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Let&apos;s chat.
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
            No pitch. No pressure. Just a conversation about your business and
            whether I can help.
          </p>
          <GradientButton asChild variant="variant">
            <Link href="/apply">Book a free call →</Link>
          </GradientButton>
        </div>
      </section>
    </div>
  );
}
