import { memo } from 'react';
import { Button } from '@/components/common';
import { resourceLinks, cn } from '@/utils';
import { cardList } from './constDatas';

export const Section3 = memo(() => {
  const renderCardItem = (item, index) => {
    const { icon, title, desc, className } = item;

    return (
      <li
        key={title}
        className={cn(
          'lg:w-[342px] lg:mt-0 mt-[50px] w-[100%] flex flex-col items-center relative',
          className,
        )}
      >
        <img className=' lg:size-[56px] size-[38px]' src={icon} alt='' />
        <h4 className='lg:mt-[34px] lg:text-[21px] text-[16px] mt-[12px] font-bold '>{title}</h4>
        <p className='lg:text-[16px] lg:mt-[14px] mt-[8px] text-[12px]  text-[rgba(255,255,255,0.8)]'>
          {desc}
        </p>

        {!!index && (
          <span
            className=' absolute left-[-52px] top-0 w-[1px] h-[168px]'
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.60) 49.63%, rgba(255, 255, 255, 0.00) 100%)',
            }}
          ></span>
        )}
      </li>
    );
  };

  return (
    <div
      className='lg:w-fit w-[95%] relative flex flex-col  mx-auto  rounded-[48px] bg-[#040a10]'
      style={{ background: 'linear-gradient(180deg, #0F0C06 22.6%, #4D2B05 100%)' }}
    >
      <img
        data-wow-offset="800"
        className='lg:block hidden object-fill w-full absolute left-0 top-0  h-full'
        src='./home/section3_bg1.png'
      />

      <img
        data-wow-offset="800"
        className='rounded-3xl lg:hidden block absolute left-0 top-0  h-full object-fill'
        src='./home/section3_mobile_bg.png'
      />

      <div className='lg:w-[1236px] lg:px-0 w-full mx-auto pt-[100px] pb-[148px] relative px-[12px]'>
        <div className=' relative flex flex-col items-center'>
          <h2 className='wow lg:text-[46px] text-[22px] text-center'>
            Turn Your AI Agents into Discoverable Solutions
          </h2>
          <p className='wow wow-delay-1 lg:text-[19px] text-[rgba(255,255,255,0.8)]  text-[12px] py-[32px]'>
            Upload, share, and earn with AI agents
          </p>
          <Button
            href={resourceLinks.agentHub}
            type='hoverPrimary'
            variant='ghost'
            color='primary'
            className='wow wow-delay-2 lg:scale-100 scale-85'
          >
            Explore Agent Hub
          </Button>
        </div>

        <ul className='lg:flex-nowrap lg:mt-[134px]  text-center ] flex-wrap flex  justify-between relative'>
          {cardList.map(renderCardItem)}
        </ul>
      </div>
    </div>
  );
});
