'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  avatarImage?: string;
  colors?: Colors;
};

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  href,
  children,
  avatar,
  avatarImage,
  colors = BLUE_COLORS,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center">
      <Link
        href={href}
        className={`relative inline-block w-[260px] h-[3rem] group rounded-full transition-transform duration-300 ${
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
          {avatarImage ? (
            <span
              className={`w-8 h-8 rounded-full overflow-hidden flex-shrink-0 transition-transform duration-300 ring-2 ring-white/80 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            >
              <Image
                src={avatarImage}
                alt="Avatar"
                width={32}
                height={32}
                className="w-full h-full object-cover object-top"
              />
            </span>
          ) : avatar ? (
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-transform duration-300 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              style={{ backgroundColor: '#298dff', color: '#ffffff' }}
            >
              {avatar}
            </span>
          ) : null}
          <span>{children}</span>
        </span>
      </Link>
    </div>
  );
};

export { BLUE_COLORS };
