'use client';

import { ShootingStars } from '@/components/ui/shooting-stars';
import { StarsBackground } from '@/components/ui/stars-background';
import { Section1 } from '@/components/landing/section1';
import { Section2 } from '@/components/landing/section2';
import { Section3 } from '@/components/landing/section3';
import { Section5 } from '@/components/landing/section5';
// import { Section6 } from '@/components/landing/section6';
// import { Section7 } from '@/components/landing/section7';
import { Section8 } from '@/components/landing/section8';
import { Section9 } from '@/components/landing/section9';

export default function Page() {
  return (
    <div className='h-full bg-black'>
      <div className='fixed w-screen h-screen left-0 top-0 -z-10'>
        <ShootingStars />
        <StarsBackground />
      </div>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section5 />
      <Section8 />
    </div>
  );
}