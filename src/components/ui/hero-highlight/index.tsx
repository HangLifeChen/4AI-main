'use client';
import React from 'react';
import { useMotionValue, motion, useMotionTemplate } from 'framer-motion';
import { cn } from '@/utils';

export const HeroHighlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div
      className={cn(
        'relative flex items-center justify-center h-full w-full group'
      )}
      onMouseMove={handleMouseMove}
    >
      <div
        className='absolute inset-0 bg-dot-thick-neutral-300  pointer-events-none'
        style={{
          maskImage: `
             radial-gradient(
               circle at 50% 50%,
               black 0%,
               transparent 100%
             )
           `,
        }}
      />
      <motion.div
        className='pointer-events-none bg-dot-thick-indigo-900  absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100'
        style={{
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />
      <div className={cn('relative z-20 w-full h-full', className)}>
        {children}
      </div>
    </div>
  );
};
