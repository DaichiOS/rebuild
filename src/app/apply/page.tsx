"use client";

import Link from "next/link";
import { useState } from "react";

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    website: "",
    description: "",
    preferredTime: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Cal.com or email
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[--color-warm-white] flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-[--color-butter] mx-auto mb-6 flex items-center justify-center">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[--color-near-black] mb-4">
            Got it. I&apos;ll be in touch.
          </h1>
          <p className="text-[--color-medium-gray] mb-8">
            I&apos;ll email you within 24 hours to set up our strategy call.
            Looking forward to chatting.
          </p>
          <Link
            href="/"
            className="text-[--color-near-black] font-medium hover:underline"
          >
            ← Back to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[--color-warm-white]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[--color-warm-white]/80 backdrop-blur-sm border-b border-[--color-light-gray]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-[--color-near-black]"
          >
            re.build
          </Link>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[--color-near-black] mb-4">
              Book a Free Strategy Call
            </h1>
            <p className="text-lg text-[--color-medium-gray]">
              20 minutes. No pressure. We&apos;ll look at what you&apos;ve got, what you
              need, and whether I&apos;m the right fit.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[--color-near-black] mb-2"
              >
                Your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[--color-light-gray] bg-white text-[--color-near-black] focus:outline-none focus:border-[--color-near-black] transition-colors"
                placeholder="Jane Smith"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[--color-near-black] mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[--color-light-gray] bg-white text-[--color-near-black] focus:outline-none focus:border-[--color-near-black] transition-colors"
                placeholder="jane@business.com.au"
              />
            </div>

            <div>
              <label
                htmlFor="business"
                className="block text-sm font-medium text-[--color-near-black] mb-2"
              >
                Business name
              </label>
              <input
                type="text"
                id="business"
                name="business"
                required
                value={formData.business}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[--color-light-gray] bg-white text-[--color-near-black] focus:outline-none focus:border-[--color-near-black] transition-colors"
                placeholder="Smith Physiotherapy"
              />
            </div>

            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-[--color-near-black] mb-2"
              >
                Current website (if you have one)
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[--color-light-gray] bg-white text-[--color-near-black] focus:outline-none focus:border-[--color-near-black] transition-colors"
                placeholder="https://..."
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-[--color-near-black] mb-2"
              >
                What are you looking for?
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[--color-light-gray] bg-white text-[--color-near-black] focus:outline-none focus:border-[--color-near-black] transition-colors resize-none"
                placeholder="New website, refresh, not sure yet—whatever's on your mind."
              />
            </div>

            <div>
              <label
                htmlFor="preferredTime"
                className="block text-sm font-medium text-[--color-near-black] mb-2"
              >
                When works best for a call?
              </label>
              <select
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[--color-light-gray] bg-white text-[--color-near-black] focus:outline-none focus:border-[--color-near-black] transition-colors"
              >
                <option value="">Select a preference</option>
                <option value="morning">Mornings (9am-12pm)</option>
                <option value="afternoon">Afternoons (12pm-5pm)</option>
                <option value="evening">Evenings (after 5pm)</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[--color-dark-gray] text-white px-8 py-4 text-base font-medium hover:bg-[--color-near-black] transition-colors"
              >
                Request a Call
              </button>
              <p className="text-sm text-[--color-medium-gray] text-center mt-4">
                I&apos;ll email you within 24 hours to confirm.
              </p>
            </div>
          </form>

          {/* Alternative */}
          <div className="mt-12 pt-8 border-t border-[--color-light-gray] text-center">
            <p className="text-[--color-medium-gray]">
              Rather just email?{" "}
              <a
                href="mailto:eddie@rebuild.dev"
                className="text-[--color-near-black] font-medium hover:underline"
              >
                eddie@rebuild.dev
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
