import { memo } from 'react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { SpotLightCard } from '@/components/ui/spot-light-card';
import { cardList } from './constDatas';

export const Section2 = memo(() => {
  const renderCardItem = (item: (typeof cardList)[number]) => {
    const { bg, title, desc } = item;

    return (
      <SpotLightCard
        key={title}
        className='lg:w-[403px] lg:my-0 my-[10px] w-[95%] flex justify-center bg-[#111113] rounded-[28px] h-[538px] pt-[20px] pb-[20px] cursor-pointer'
      >
        <div
          className='lg:w-[357px] lg:rounded-[46px] rounded-[24px] w-[90%] flex-col flex h-full relative pb-[20px]'
          style={{
            background: 'linear-gradient(180deg, #1F1F25 0%, rgba(23, 23, 27, 0.00) 89.66%)',
          }}
        >
          <GlowingEffect
            blur={0}
            borderWidth={1}
            spread={80}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
            variant='primary'
          />
          <div className=' w-full flex justify-center items-center flex-1'>
            <img className=' max-w-full' src={bg} />
          </div>
          <div className=''>
            <h4 className=' text-[24px] font-bold'>{title}</h4>
            <p className='mt-[20px] text-[rgba(255,255,255,0.8)]'>{desc}</p>
          </div>
        </div>
      </SpotLightCard>
    );
  };

  return (
    <div className='lg:w-[1255px] lg:pt-[100px] w-full flex flex-col items-center mx-auto text-center mb-[110px]'>
      <h2 className=' lg:text-[46px] text-[24px] font-bold '>4AI Agent Space</h2>
      <p className=' text-[rgba(255,255,255,0.8)] mt-[32px]'>
        Agent Space is a decentralized AI network that autonomously orchestrates multiple AI agents,
        <br /> enabling seamless collaboration and efficient task execution.
      </p>

      <div className='lg:flex-row  lg:justify-between justify-center items-center flex-col flex  w-full mt-[62px]'>
        {cardList.map(renderCardItem)}
      </div>
    </div>
  );
});
