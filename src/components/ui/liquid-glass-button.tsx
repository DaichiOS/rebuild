"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const liquidbuttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-sm font-medium disabled:pointer-events-none disabled:opacity-50 outline-none",
  {
    variants: {
      variant: {
        default: "bg-transparent text-primary",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 text-xs gap-1.5 px-4",
        lg: "h-10 px-6",
        xl: "h-12 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  }
)

function GlassFilter() {
  return (
    <svg className="hidden">
      <defs>
        <filter
          id="container-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidbuttonVariants> {
  asChild?: boolean
}

const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const [isHovered, setIsHovered] = React.useState(false)
    const [isPressed, setIsPressed] = React.useState(false)

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(
          "relative transition-transform duration-300",
          liquidbuttonVariants({ variant, size, className })
        )}
        style={{
          transform: isPressed
            ? 'scale(0.97)'
            : isHovered
              ? 'scale(1.05)'
              : 'scale(1)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        {...props}
      >
        {/* Glass background with animated shadow */}
        <div
          className="absolute top-0 left-0 z-0 h-full w-full rounded-full transition-all duration-300"
          style={{
            boxShadow: isHovered
              ? '0 0 8px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.12), inset 3px 3px 0.5px -3px rgba(0,0,0,0.9), inset -3px -3px 0.5px -3px rgba(0,0,0,0.85), inset 1px 1px 1px -0.5px rgba(0,0,0,0.6), inset -1px -1px 1px -0.5px rgba(0,0,0,0.6), inset 0 0 8px 8px rgba(0,0,0,0.15), inset 0 0 3px 3px rgba(0,0,0,0.08), 0 0 20px rgba(41,141,255,0.2)'
              : '0 0 6px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.08), inset 3px 3px 0.5px -3px rgba(0,0,0,0.9), inset -3px -3px 0.5px -3px rgba(0,0,0,0.85), inset 1px 1px 1px -0.5px rgba(0,0,0,0.6), inset -1px -1px 1px -0.5px rgba(0,0,0,0.6), inset 0 0 6px 6px rgba(0,0,0,0.12), inset 0 0 2px 2px rgba(0,0,0,0.06), 0 0 12px rgba(255,255,255,0.15)',
            background: isHovered
              ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
              : 'transparent',
          }}
        />

        {/* Glass filter backdrop */}
        <div
          className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-full"
          style={{ backdropFilter: 'url("#container-glass")' }}
        />

        {/* Shine overlay on hover */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden transition-opacity duration-300 pointer-events-none"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent ${isHovered ? 'animate-shine' : ''}`}
          />
        </div>

        {/* Content */}
        <div className="pointer-events-none z-10 relative">
          {children}
        </div>

        <GlassFilter />
      </Comp>
    )
  }
)
LiquidButton.displayName = "LiquidButton"

export { LiquidButton, liquidbuttonVariants }
