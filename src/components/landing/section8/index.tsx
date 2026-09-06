'use client';
import { memo, useEffect } from 'react';
import { AestheticFluidBg } from '@/lib/AestheticFluidBg.module.js';
import { Button } from '@/components/common';
import { resourceLinks } from '@/utils';

export const Section8 = memo(() => {
  useEffect(() => {
    setTimeout(() => {
      new AestheticFluidBg({
        dom: 'animation-bg',
        colors: ["#cc5200", "#e69900", "#f4cf15", "#cc6300", "#e65c00", "#eb9c00"],
        loop: true,
      });
    }, 500);
  }, []);

  return (
    <div>
      <div
        id='animation-bg'
        className='lg:w-[1200px] lg:h-[400px] lg:my-[120px]  lg:rounded-[30px] rounded-[16px] my-[50px] h-[200px] w-[95vw] mx-auto flex flex-col justify-center items-center overflow-hidden'
      >
        <h2 className='lg:text-[50px] text-[24px] relative z-10 font-bold'>
          Ready to start with 4AI?
        </h2>
        <div className='lg:w-full w-[80%] relative z-10 flex mt-[40px] text-[18px] justify-center'>
          <Button href={resourceLinks.request} className='lg:scale-100 lg:mx-[20px] scale-80'>
            Get Started
          </Button>

          <Button
            href={resourceLinks.github}
            className=' lg:scale-100  lg:mx-[20px] scale-80 !bg-[#000] text-[#fff]'
          >
            Github
          </Button>
        </div>
      </div>
    </div>
  );
});
