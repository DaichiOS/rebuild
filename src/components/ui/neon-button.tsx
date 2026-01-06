import React from 'react'
import { cn } from '@/lib/utils'
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
    "relative group border text-foreground mx-auto text-center rounded-full cursor-pointer",
    {
        variants: {
            variant: {
                default: "bg-blue-500/5 hover:bg-blue-500/0 border-blue-500/20",
                solid: "bg-blue-500 hover:bg-blue-600 text-white border-transparent hover:border-foreground/50 transition-all duration-200",
                ghost: "border-transparent bg-transparent hover:border-zinc-600 hover:bg-white/10",
                dark: "bg-[#131518] hover:bg-[#1a1d22] text-white border-white/20 hover:border-[#298dff]/60 transition-all duration-200 hover:shadow-[0_0_25px_rgba(41,141,255,0.5),0_0_50px_rgba(41,141,255,0.2)] hover:scale-[1.02]",
            },
            size: {
                default: "px-7 py-1.5 ",
                sm: "px-4 py-1.5 ",
                lg: "px-10 py-2.5 ",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { neon?: boolean }

const NeonButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, neon = true, size, variant, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size }), className)}
                ref={ref}
                {...props}
            >
                <span className={cn("absolute h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out inset-x-0 top-0 bg-gradient-to-r w-full mx-auto from-transparent via-[#298dff] to-transparent hidden", neon && "block")} />
                {children}
                <span className={cn("absolute h-[2px] opacity-50 group-hover:opacity-100 transition-all duration-300 ease-in-out inset-x-0 -bottom-px bg-gradient-to-r w-full mx-auto from-transparent via-[#298dff] to-transparent hidden", neon && "block")} />
            </button>
        );
    }
)

NeonButton.displayName = 'NeonButton';

export { NeonButton, buttonVariants };
