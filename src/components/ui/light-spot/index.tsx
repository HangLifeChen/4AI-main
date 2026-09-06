'use client';
import { memo, useEffect, useState } from 'react';
import { cn } from '@/utils';
import './index.scss';

export interface LightSpotProps {
  className?: string;
  spotOptions: {
    count?: number;
    color?: string;
    size?: number;
    duration: number;
    className?: string;
  }[];
}

export const LightSpot = memo((props: LightSpotProps) => {
  const { spotOptions = [], className } = props;
  const [clientReady, setClientReady] = useState(false);

  const generateMultipleSpot = (spotOption: (typeof spotOptions)[number]) => {
    const { color = '#fff', count = 100 } = spotOption;

    if (!clientReady) return '';

    return Array.from({ length: count })
      .map(() => {
        return `${Math.floor(Math.random() * 1000)}px ${Math.floor(
          Math.random() * 2000,
        )}px ${color}`;
      })
      .join(', ');
  };

  useEffect(() => {
    setClientReady(true);
  }, []);

  return (
    <div
      className={cn(
        'absolute left-[50%] top-0 w-full h-full -z-10 overflow-hidden translate-x-[-50%]',
        className,
      )}
    >
      {spotOptions.map((item, index) => {
        const { size = 3, duration, className } = item;

        return (
          <div
            key={index}
            className={cn('rounded-full', className)}
            style={{
              width: size,
              height: size,
              boxShadow: generateMultipleSpot(item),
              animation: `animStar ${duration}s linear infinite`,
            }}
          ></div>
        );
      })}

      <div
        className=' absolute left-0 top-0 w-full h-full'
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 150px)',
        }}
      ></div>
    </div>
  );
});
