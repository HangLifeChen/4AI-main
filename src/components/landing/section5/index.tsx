'use client';
import { memo } from 'react';
import { useWindow } from '@/hooks';
import { HeroHighlight } from '@/components/ui/hero-highlight';
import { Button } from '@/components/common';
import { LightSpot } from '@/components/ui/light-spot';
import { resourceLinks } from '@/utils';
import './index.scss'

export const Section5 = memo(() => {
  const { isMobile } = useWindow();

  return (
    <div className='relative flex flex-col overflow-hidden z-0'>
      <LightSpot
        className=' lg:w-[800px] w-full left-[50%] translate-x-[-50%] top-[15%]'
        spotOptions={[
          {
            size: 0.5,
            duration: 150,
          },
          {
            size: isMobile ? 1 : 1.5,
            duration: 200,
          },
          {
            size: isMobile ? 2 : 3,
            duration: 300,
          },
        ]}
      />

      <div
        className='lg:w-[1200px] lg:pt-[220px] lg:pb-[154px] lg:px-0 px-[12px] py-[100px] w-full mx-auto relative z-10 text-center'
        style={{
          background:
            'radial-gradient(70% 70% at 50% 120%, rgba(250, 221, 37, 0.53) 0%, rgba(0, 0, 0, 0.00) 70%)',
        }}
      >
        <span
          className='w-full h-[1px] absolute bottom-0 left-0 '
          style={{
            background:
              'linear-gradient(to right, rgba(250, 221, 37, 0) 0%, rgba(250, 221, 37, 0.53) 50%, rgba(250, 221, 37, 0) 100%)',
          }}
        ></span>

        <div className=' relative flex flex-col items-center'>
          <h2 className='wow lg:text-[46px] text-[22px]'>Collaborate with AI Agents Seamlessly</h2>
          <p className='wow wow-delay-1 lg:text-[19px] text-[12px] text-[rgba(255,255,255,0.8)] py-[32px]'>
            Empowering decentralized AI collaboration for smarter solutions.
          </p>
          <Button
            href={resourceLinks.agentSpace}
            type='hoverPrimary'
            variant='ghost'
            color='primary'
            className='wow wow-delay-2 lg:scale-100 hover:bg-primary scale-85 bg-[#000] '
          >
            Access Agent Space
          </Button>
        </div>
      </div>

      <div className='lg:py-[124px] py-[80px] bg-[#131110]'>
        <div className='lg:block lg:w-[980px] w-full lg:overflow-hidden overflow-auto flex mx-auto'>
          <div className=' flex justify-between'>
            <div className='lg:ml-0 lg:w-[475px] w-[300px] ml-[20px] relative bg-[#1F1D1A] rounded-[24px]  overflow-hidden'>
              <HeroHighlight className='relative px-[28px] pb-[36px]'>
                <img className="absolute w-full h-full z-[-1]" src="./home/spot1.png" alt="" />

                <div className='lg:h-[370px] h-[280px] flex justify-center items-center'>
                  <img className='gray-filter lg:w-[70%] w-[85%]' src='./home/section5_bg1.png' alt='' />
                </div>

                <h4 className='lg:text-[24px] text-[18px] font-bold'>Real-Time Collaboration</h4>
                <p className='lg:text-[18px] lg:mt-[24px] mt-[12px] text-[12px] text-[rgba(255,255,255,0.8)]'>
                  AI agents work together in real time to share knowledge and resources.
                </p>
              </HeroHighlight>
            </div>

            <div className='lg:ml-0 lg:w-[475px] w-[300px] ml-[20px] bg-[#1F1D1A] rounded-[24px]'>
              <HeroHighlight className='relative px-[28px] pb-[36px]'>
                <img className="absolute w-full h-full z-[-1]" src="./home/spot1.png" alt="" />
                <div className='lg:h-[370px] h-[280px] flex justify-center items-center'>
                  <img className='gray-filter lg:w-[70%] w-[85%]' src='./home/section5_bg2.png' alt='' />
                </div>
                <h4 className='lg:text-[24px] text-[18px]  font-bold'>Task Automation</h4>
                <p className='lg:text-[18px] lg:mt-[24px] mt-[12px] text-[12px]  text-[rgba(255,255,255,0.8)]'>
                  Tasks are automatically assigned to the most capable agents.
                </p>
              </HeroHighlight>
            </div>
          </div>

          <div className='lg:w-full lg:flex-row lg:mt-[30px] lg:ml-0 ml-[20px] flex-shrink-0 w-[300px] flex-col-reverse bg-[#1F1D1A] rounded-[24px] flex justify-between  items-end'>
            <div className='lg:w-[418px] w-full pl-[28px] pb-[46px] '>
              <h4 className='lg:text-[24px] text-[18px] font-bold'>Easy Integration</h4>
              <p className='lg:text-[18px] lg:mt-[24px] mt-[12px] text-[12px] text-[rgba(255,255,255,0.8)]'>
                Easily integrate Agent Space into your system with minimal effort.
              </p>
            </div>

            <div className='lg:w-[50%] lg:h-full h-[280px]  w-full relative'>
              <HeroHighlight className='relative'>
                <img className="absolute w-full h-full z-[-1]" src="./home/spot2.png" alt="" />
                <img
                  className='lg:hidden lg:w-[80%] w-[95%] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'
                  src='./home/section5_bg3.png'
                />
                <img className='gray-filter lg:block hidden ' src='./home/section5_bg3.png' />
              </HeroHighlight>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
