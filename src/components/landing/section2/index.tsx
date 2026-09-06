import { memo } from 'react';
import { StarBorder } from '@/components/ui/star-border';
import { Button } from '@/components/common';
import { resourceLinks, cn } from '@/utils';
import { cardList } from './constDatas';

export const Section2 = memo(() => {
  const renderCardItem = item => {
    const { bg, color, title, desc, wrapClassName, ...otherProps } = item;

    return (
      <StarBorder
        key={title}
        className={cn('lg:mt-0 mx-auto mt-[30px]', wrapClassName)}
        {...otherProps}
      >
        <div
          className='xs:w-[340px] xs:h-[450px] xs:px-0 h-[400px] rounded-[18px] px-[12px] w-full  overflow-hidden cursor-pointer group relative text-center z-0'
          style={{
            boxShadow: `0px 6px 40px -11px ${color} inset`,
          }}
        >
          <div
            className=' absolute -z-10 left-0 top-0 w-full h-full opacity-0 duration-300 group-hover:opacity-100 '
            style={{
              background: `linear-gradient(to bottom, ${color}, transparent)`,
            }}
          ></div>
          <img className='absolute left-0 top-0 w-full h-full -z-10' src={bg} alt='' />
          <img className='lg:mt-[252px] mt-[200px] mx-auto ' src='./home/section2_star.svg' />
          <h4 className=' font-bold text-[21px] my-[16px]'>{title}</h4>
          <p className='text-[rgba(255,255,255,0.8)]'>{desc}</p>
        </div>
      </StarBorder>
    );
  };

  return (
    <div className='flex flex-col w-full'>
      <div className='lg:w-[1200px] lg:pb-[200px] pb-[100px] w-full mx-auto pt-[100px]  flex flex-col items-center'>
        <h2 className='wow  lg:text-[46px] text-[22px] text-center'>
          Create and Manage AI Agent Requests
        </h2>
        <p className='wow wow-delay-1 lg:text-[19px] text-[12px] text-[rgba(255,255,255,0.8)] py-[32px] text-center'>
          Easily create, prioritize, and connect your requests with AI agent developers.
        </p>
        <Button
          href={resourceLinks.request}
          type='hoverPrimary'
          variant='ghost'
          color='primary'
          className='wow wow-delay-2 lg:scale-100 scale-85  hover:bg-primary bg-[#000]'
        >
          Create Requests
        </Button>

        <div className='lg:flex-row lg:mt-[60px] mt-[30px] flex-col flex justify-between items-start w-full'>
          {cardList.map(renderCardItem)}
        </div>
      </div>
    </div>
  );
});
