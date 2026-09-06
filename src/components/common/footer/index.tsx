'use client';
import { memo } from 'react';
import { Button } from '@/components/common';
import { shareIcons, relatedLinks } from './constDatas';

export const Footer = memo(() => {
  const renderShareIconItem = item => {
    const { name, svg, href } = item;
    return (
      <a
        key={name}
        href={href}
        target='_blank'
        className='flex justify-center items-center border w-[58px] h-[50px] rounded-[12px] border-[rgba(255,255,255,0.2)] mr-[24px] text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.8)] hover:bg-[rgba(255,255,255,0.2)]'
      >
        {svg}
      </a>
    );
  };

  const renderRelatedLinkItem = item => {
    const { title, links } = item;

    return (
      <li key={title} className='xl:ml-[160px] flex-1 flex flex-col'>
        <span className='block mb-[30px] font-bold text-[rgba(255,255,255,0.8)] text-[20px]'>
          {title}
        </span>
        {links.map(linkItem => {
          const { name, link } = linkItem;
          return (
            <Button
              key={name}
              href={link}
              type='link'
              className='justify-start text-[rgba(255,255,255,0.4)] mb-[30px] h-[20px]'
            >
              {name}
            </Button>
          );
        })}
      </li>
    );
  };

  return (
    <div className='z-40 xl:pb-[10px] pt-[50px] px-[12px] w-full bg-black border-t  border-t-[rgba(255,255,255,0.20)]'>
      <div className='xl:w-[1200px] xl:flex-row w-full mx-auto flex flex-col justify-between bg-black'>
        <div className='w-full'>
          <img className='lg:w-[123px] lg:h-[54px] w-[100px] h-11' src='/home/logo.svg' />
          <div className='flex mt-[62px]'>{shareIcons.map(renderShareIconItem)}</div>
        </div>

        <ul className='xl:mt-0 mt-[70px] flex'>{relatedLinks.map(renderRelatedLinkItem)}</ul>
      </div>
    </div>
  );
});