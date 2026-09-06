'use client';
import { memo, useState } from 'react';
import { Tooltip as HeroTooltip, TooltipProps as HeroTooltipProps } from '@heroui/react';
import { CircleAlert } from 'lucide-react';
import { cn } from '@/utils';

export interface TooltipProps extends HeroTooltipProps { }

export const Tooltip = memo((props: TooltipProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [hover, setHover] = useState(false);
  return (
    <HeroTooltip
      isOpen={tooltipOpen}
      classNames={{
        content: 'px-[12px] py-[10px] rounded-[8px]',
      }}
      {...props}
    >
      <div
        className=' inline-flex h-full items-center'
        onMouseOver={() => setTooltipOpen(true)}
        onMouseOut={() => setTooltipOpen(false)}
      >

        <CircleAlert
          className={
            cn(
              'w-[16px] h-[16px] inline-flex cursor-pointer ml-[6px]',
              hover ? 'text-white' : 'text-[var(--common-white-four)]'
            )
          }
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
        {/* <img
          className="w-[16px] h-[16px] inline-flex cursor-pointer ml-[6px]"
          src={hover ? "/common/tooltip_icon-no.png" : "/common/tooltip_icon.png"}
          alt="tooltip icon"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        /> */}
      </div>
    </HeroTooltip>
  );
});
