'use client';
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Liquid, type Colors } from './liquid-button';

// Blue theme colors matching the site's accent
const BLUE_COLORS: Colors = {
  color1: '#FFFFFF',
  color2: '#0066FF',
  color3: '#66A3FF',
  color4: '#E6F0FF',
  color5: '#CCE0FF',
  color6: '#99C2FF',
  color7: '#0044CC',
  color8: '#0055EE',
  color9: '#3388FF',
  color10: '#5599FF',
  color11: '#0033AA',
  color12: '#B3D4FF',
  color13: '#0055DD',
  color14: '#88B8FF',
  color15: '#AAC8FF',
  color16: '#0044BB',
  color17: '#2266CC',
};

type ShimmerButtonProps = {
  href: string;
  children: React.ReactNode;
  avatar?: string;
  colors?: Colors;
};

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  href,
  children,
  avatar,
  colors = BLUE_COLORS,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [buttonRect, setButtonRect] = useState({ x: 0, y: 0, width: 260, height: 48 });
  const [viewportSize, setViewportSize] = useState({ width: 1920, height: 1080 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonRect({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      });
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    setIsTransitioning(true);

    setTimeout(() => {
      router.push(href);
    }, 700);
  };

  return (
    <>
      {/* Page transition - expanding blob with animated gradient */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed z-[9999] pointer-events-none overflow-hidden"
            initial={{
              left: buttonRect.x,
              top: buttonRect.y,
              width: buttonRect.width,
              height: buttonRect.height,
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            }}
            animate={{
              left: -200,
              top: -200,
              width: viewportSize.width + 400,
              height: viewportSize.height + 400,
              borderRadius: ['60% 40% 30% 70% / 60% 30% 70% 40%', '30% 60% 70% 40% / 50% 60% 30% 60%', '0% 0% 0% 0% / 0% 0% 0% 0%'],
            }}
            transition={{
              duration: 0.7,
              ease: [0.4, 0, 0.2, 1],
              borderRadius: {
                duration: 0.7,
                times: [0, 0.5, 1],
              },
            }}
          >
            {/* Base dark background */}
            <div className="absolute inset-0 bg-[#131518]" />

            {/* Diagonal container - skews the whole effect */}
            <div className="absolute inset-0" style={{ transform: 'rotate(-20deg) scale(1.5)' }}>
              {/* Layer 1 - Primary gradient with blend */}
              <motion.div
                className="absolute inset-0 mix-blend-difference"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
                style={{
                  background: `conic-gradient(
                    from 0deg at 50% 50%,
                    ${colors.color2} 0deg,
                    ${colors.color1} 60deg,
                    ${colors.color3} 120deg,
                    ${colors.color7} 180deg,
                    ${colors.color1} 240deg,
                    ${colors.color2} 300deg,
                    ${colors.color2} 360deg
                  )`,
                }}
              />

              {/* Layer 2 - Counter-rotating gradient */}
              <motion.div
                className="absolute inset-0 mix-blend-difference"
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 15, ease: 'linear', repeat: Infinity }}
                style={{
                  background: `conic-gradient(
                    from 180deg at 40% 60%,
                    ${colors.color1} 0deg,
                    ${colors.color9} 90deg,
                    ${colors.color1} 180deg,
                    ${colors.color8} 270deg,
                    ${colors.color1} 360deg
                  )`,
                }}
              />

              {/* Layer 3 - Hard light overlay for golden tones */}
              <motion.div
                className="absolute inset-0 mix-blend-hard-light opacity-70"
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
                style={{
                  background: `conic-gradient(
                    from 90deg at 60% 40%,
                    ${colors.color3} 0deg,
                    ${colors.color1} 120deg,
                    ${colors.color2} 240deg,
                    ${colors.color3} 360deg
                  )`,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center">
        <button
          ref={buttonRef}
          onClick={handleClick}
          className={`relative inline-block w-[260px] h-[3rem] group rounded-full transition-transform duration-300 cursor-pointer ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
        {/* Glow effect behind button - subtle when not hovered, bright on hover */}
        <div
          className={`absolute w-[112.81%] h-[128.57%] top-[8.57%] left-1/2 -translate-x-1/2 filter blur-[19px] transition-opacity duration-500 ${
            isHovered ? 'opacity-90' : 'opacity-30'
          }`}
        >
          <span className="absolute inset-0 rounded-full bg-[#d9d9d9] filter blur-[6.5px]"></span>
          <div className="relative w-full h-full overflow-hidden rounded-full">
            <Liquid isHovered={isHovered} colors={colors} />
          </div>
        </div>

        {/* Shadow underneath - stronger on hover */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[92.23%] h-[112.85%] rounded-full bg-[#010128] transition-all duration-300 ${
            isHovered ? 'blur-[10px] opacity-80' : 'blur-[5px] opacity-50'
          }`}
        ></div>

        {/* Main button container */}
        <div className="relative w-full h-full overflow-hidden rounded-full">
          {/* Base dark background */}
          <span className="absolute inset-0 rounded-full bg-[#131518]"></span>

          {/* Shimmer layer - subtle when not hovered */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-40'}`}>
            <Liquid isHovered={isHovered} colors={colors} />
          </div>

          {/* Overlay borders for depth */}
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className={`absolute inset-0 rounded-full border border-white/5 mix-blend-overlay filter ${
                i === 1 ? 'blur-[2px]' : i === 2 ? 'blur-[3px]' : 'blur-[2px]'
              }`}
            ></span>
          ))}

          {/* Inner highlight - brighter on hover */}
          <span
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[70%] h-[40%] rounded-full filter blur-[12px] transition-opacity duration-300 ${
              isHovered ? 'opacity-60 bg-[#298dff]' : 'opacity-20 bg-[#004]'
            }`}
          ></span>
        </div>

        {/* Button content */}
        <span className="absolute inset-0 flex items-center justify-center gap-3 px-4 rounded-full text-white text-base font-medium tracking-wide whitespace-nowrap">
          {avatar && (
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-transform duration-300 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              style={{ backgroundColor: '#298dff', color: '#ffffff' }}
            >
              {avatar}
            </span>
          )}
          <span>{children}</span>
        </span>
      </button>
    </div>
    </>
  );
};

export { BLUE_COLORS };
