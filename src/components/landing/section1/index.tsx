'use client';
import { memo } from 'react';
import { Button } from '@/components/common';
import { FlipWords } from '@/components/ui/flip-words';
import { resourceLinks } from '@/utils';
import Link from 'next/link';
import { GrainGradientBg } from "./bg-component"


export const Section1 = memo(() => {
  return (
    <div className='lg:h-[950px] h-[600px] flex flex-col w-full  relative'>
      <div className='lg:w-[1200px] lg:mt-[252px] mt-[150px] px-[16px] w-full relative z-10  mx-auto flex items-center flex-col'>

        <h1 className='lg:block hidden wow wow-delay-1 lg:text-[59px] text-[28px] font-bold mt-[20px] flex flex-col items-center'>
          <div>The Decentralized <span className='text-primary'>AI Community</span> </div>
          <div className='text-center'>Building the Future</div>
        </h1>

        <h1 className='lg:hidden block wow wow-delay-1 text-[28px] font-bold mt-[20px] flex flex-col items-center'>
          <span>The Decentralized <span className='text-primary'>AI</span> </span>
          <span><span className='text-primary'>Community </span>Building the</span>
          <span>Future</span>
        </h1>

        <div className='lg:block hidden wow wow-delay-2 lg:text-[18px] text-[14px] mt-[60px]'>
          4AI is a platform where developers and users
          <FlipWords words={['build', 'share', 'innovate']} /> AI agent solutions.
        </div>

        <div className='lg:hidden block wow wow-delay-2 lg:text-[18px] text-[14px] mt-[60px] flex flex-col items-center'>
          4AI is a platform where developers and users
          <div><FlipWords words={['build', 'share', 'innovate']} /> AI agent solutions.</div>
        </div>

        <div className='wow wow-delay-3 flex mt-10'>
          {/* <Button href={resourceLinks.request} className='lg:scale-100 scale-85 h-[46px] py-[13px] px-[50px] overflow-hidden  '>
            Get Started
          </Button> */}
          <Link href={resourceLinks.request} target='_blank'>
            <div
              className='bg-primary lg:w-[190px] w-[160px] rounded-[100px] font-bold lg:h-12 h-9 lg:text-lg text-[15px] text-black overflow-hidden'
            >
              <div className='duration-200 h-full hover:translate-y-[-100%] cursor-pointer'>
                <div className='h-full flex items-center justify-center'>Get Started</div>
                <div className='h-full flex items-center justify-center'>Get Started</div>
              </div>
            </div>
          </Link>

          <Link href={resourceLinks.github} target='_blank'>
            <div
              className='ml-[40px] bg-[#000] lg:w-[190px] w-[160px] rounded-[100px] font-bold lg:h-12 h-9 lg:text-lg text-[15px] text-white overflow-hidden'
            >
              <div className='duration-200 h-full hover:translate-y-[-100%] cursor-pointer'>
                <div className='h-full flex items-center justify-center'>Github</div>
                <div className='h-full flex items-center justify-center'>Github</div>
              </div>
            </div>
          </Link>

          {/* <Button
            href={resourceLinks.github}
            className='lg:scale-100 scale-85 ml-[40px] !bg-[#000]'
          >
            Github
          </Button> */}
        </div>
      </div>
      <div className='absolute top-0 left-0 w-full h-full'>
        <GrainGradientBg />
      </div>
    </div>
  );
});
