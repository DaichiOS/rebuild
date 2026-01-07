"use client";

import { useEffect, useState } from "react";
import type { ApiResponse, FoundingSpotsResponse } from "@/lib/supabase/types";

const foundingIncludes = [
  "Custom website build",
  "SEO audit",
  "Conversion audit",
  "Local SEO review",
  "Google Business check",
  "Competitor analysis",
  "Strategy recommendations",
  "Ongoing updates & hosting",
];

type FoundingSpotsProps = {
  className?: string;
};

export default function FoundingSpots({ className = "" }: FoundingSpotsProps) {
  const [spots, setSpots] = useState<FoundingSpotsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    async function fetchSpots() {
      try {
        const response = await fetch("/api/founding-spots");
        const result: ApiResponse<FoundingSpotsResponse> = await response.json();

        if (result.success) {
          setSpots(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch founding spots:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSpots();
  }, []);

  if (isLoading || !spots || spots.remaining <= 0) {
    return null;
  }

  const urgencyLevel = spots.remaining <= 2 ? "critical" : spots.remaining <= 3 ? "high" : "normal";

  return (
    <div
      className={`relative inline-flex items-center gap-3 ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Pulsing dot */}
      <span className="relative flex h-3 w-3">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
            urgencyLevel === "critical"
              ? "bg-red-500"
              : urgencyLevel === "high"
              ? "bg-orange-500"
              : "bg-[#298dff]"
          }`}
        />
        <span
          className={`relative inline-flex h-3 w-3 rounded-full ${
            urgencyLevel === "critical"
              ? "bg-red-500"
              : urgencyLevel === "high"
              ? "bg-orange-500"
              : "bg-[#298dff]"
          }`}
        />
      </span>

      {/* Counter badge */}
      <div
        className={`px-4 py-2 rounded-full text-sm font-medium cursor-help transition-all ${
          urgencyLevel === "critical"
            ? "bg-red-500/10 text-red-600 border border-red-500/20 hover:bg-red-500/15"
            : urgencyLevel === "high"
            ? "bg-orange-500/10 text-orange-600 border border-orange-500/20 hover:bg-orange-500/15"
            : "bg-[#298dff]/10 text-[#298dff] border border-[#298dff]/20 hover:bg-[#298dff]/15"
        }`}
      >
        <span className="font-bold">{spots.remaining}</span>
        <span className="opacity-80"> of {spots.total} founding spots left</span>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50">
          {/* Arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-[#0f172a]" />

          {/* Content */}
          <div className="bg-[#0f172a] text-white rounded-xl p-5 shadow-xl w-72">
            <p className="text-sm font-semibold mb-3">Founding clients get:</p>
            <div className="space-y-2">
              {foundingIncludes.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-[#298dff]">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-white/10">
              <p className="text-xs text-gray-400">
                Priority support & locked-in pricing forever
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
