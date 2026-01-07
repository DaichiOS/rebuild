import Image from "next/image";

const logos = [
  { src: "/banners/campaignmonitor.png", alt: "Campaign Monitor" },
  { src: "/banners/heydoc.png", alt: "HeyDoc" },
  { src: "/banners/sonic.png", alt: "Sonic" },
  { src: "/banners/index-fun-logo.png", alt: "Index.fun" },
  { src: "/banners/zebri-logo.png", alt: "Zebri" },
  { src: "/banners/wombat.png", alt: "Wombat" },
  { src: "/banners/sportsbet.png", alt: "Sportsbet" },
];

export default function LogoMarquee() {
  return (
    <section className="py-12 md:py-16 overflow-hidden bg-[--color-off-white]">
      <div className="max-w-4xl mx-auto text-center mb-8 px-6">
        <p className="text-sm text-[--color-medium-gray]">
          Trusted by innovative teams
        </p>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[--color-off-white] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[--color-off-white] to-transparent z-10 pointer-events-none" />

        {/* Marquee track - two identical groups */}
        <div className="marquee">
          {/* First group */}
          <div className="marquee__group">
            {logos.map((logo, index) => (
              <div
                key={`a-${index}`}
                className="flex-shrink-0 px-6 md:px-10 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={60}
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
          {/* Duplicate group for seamless loop */}
          <div className="marquee__group" aria-hidden="true">
            {logos.map((logo, index) => (
              <div
                key={`b-${index}`}
                className="flex-shrink-0 px-6 md:px-10 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={60}
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
