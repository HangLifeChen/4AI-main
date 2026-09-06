'use client';
import { memo } from 'react';
import { Button } from '@/components/common';
import { LightSpot } from '@/components/ui/light-spot';
import { resourceLinks } from '@/utils';
import './index.scss';

export const Section1 = memo(() => {
  return (
    <div className='lg:w-[1200px] lg:pt-[400px] pt-[260px] w-full  pb-[110px]  mx-auto flex flex-col items-center relative z-0 overflow-hidden'>
      <LightSpot
        className='lg:w-[958px] w-full mx-auto'
        spotOptions={[
          {
            size: 3,
            duration: 50,
            count: 100,
            color: '#FCBC19',
          },
        ]}
      />

      <div className='lg:size-[958px] size-[350px] absolute left-[50%] top-[18%] -z-10 translate-x-[-50%]'>
        <div className='planetary-ring'>
          <img src='./agentSpace/section1_bg1.png' />
          <img className=' absolute left-0 top-0' src='./agentSpace/section1_bg2.png' />
        </div>

        <img
          className='ring-lamplight absolute left-[50%] top-[-20%] translate-x-[-50%] z-10'
          src='./agentSpace/section1_bg3.png'
        />

        <div
          className=' absolute left-0 top-0 w-full h-full z-20'
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 55%)',
          }}
        ></div>
      </div>

      <div className='lg:size-[105px] size-[60px] flex justify-center items-center overflow-hidden'>
        <img className='lg:scale-100 scale-80 absolute' src='./agentSpace/section1_github_bg.png' />
        <img
          className='duration-1000 absolute z-10'
          src='./agentSpace/section1_github.png'
        />
      </div>

      <div className='lg:px-[12px] px-0  text-center mt-[50px]'>
        <h2 className='lg:text-[54px] text-[24px] font-bold'>
          Contribute to Agent Space <br /> on GitHub
        </h2>
        <p className='lg:text-[16px] text-[12px] mt-[24px]'>
          Star the repository, create issues, or submit pull requests to <br />
          become eligible for future token airdrops
        </p>
        <Button href={resourceLinks.github} className='lg:scale-100 scale-80 mt-[52px] mx-auto'>
          Contribute Now
        </Button>
      </div>

      {/* <Spline scene='https://prod.spline.design/vTkR-sUMzUB3BEiw/scene.splinecode' /> */}
    </div>
  );
});
