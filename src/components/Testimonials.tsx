import Image from "next/image";

const testimonials = [
  {
    quote:
      "Eddie delivered exceptional work for us. If you're looking for someone reliable who actually cares about results, I'd highly recommend him.",
    name: "Jarryd P.",
    role: "CTO, index.fun",
    avatar: "/testimonials/jarryd.jpeg",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[--color-off-white]">
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <p className="text-sm uppercase tracking-widest text-[--color-medium-gray] mb-12">
          Our reputation
        </p>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[--color-near-black] mb-16 leading-tight">
          Trusted by<br />
          <span className="italic font-normal">founders & leaders</span>
        </h2>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 md:p-10 relative"
            >
              {/* Number */}
              <span className="absolute top-4 left-4 text-sm text-[--color-medium-gray]">
                {index + 1}
              </span>

              {/* Quote icon */}
              <div className="mb-6">
                <svg
                  width="32"
                  height="24"
                  viewBox="0 0 32 24"
                  fill="none"
                  className="text-[--color-near-black]"
                >
                  <path
                    d="M0 24V14.4C0 11.7333 0.4 9.33333 1.2 7.2C2.05556 5.01111 3.2 3.11111 4.63333 1.5L9.1 4.2C8.16667 5.4 7.42222 6.68889 6.86667 8.06667C6.31111 9.38889 6.03333 10.8 6.03333 12.3H12V24H0ZM20 24V14.4C20 11.7333 20.4 9.33333 21.2 7.2C22.0556 5.01111 23.2 3.11111 24.6333 1.5L29.1 4.2C28.1667 5.4 27.4222 6.68889 26.8667 8.06667C26.3111 9.38889 26.0333 10.8 26.0333 12.3H32V24H20Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              {/* Quote text */}
              <p className="text-xl md:text-2xl text-[--color-near-black] leading-relaxed mb-10">
                {testimonial.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-[--color-near-black]">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-[--color-medium-gray] flex items-center gap-2">
                    <span>↳</span> {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
