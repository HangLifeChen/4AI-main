'use client';
import { memo, useState, useRef, useEffect } from 'react';
import { useDebounceFn } from 'ahooks';
import { useWindow } from '@/hooks';
import { flowList } from './constDatas';

export const Section6 = memo(() => {
  const [activeFlowIndex, setActiveFlowIndex] = useState(1);
  const flowWrapRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(activeFlowIndex);
  const { isMobile } = useWindow();

  const handleStopScroll = (e: globalThis.WheelEvent) => {
    if (!flowWrapRef.current || isMobile) return;
    const { offsetTop = 0 } = flowWrapRef.current;

    if (
      e.deltaY > 0 &&
      window.scrollY > offsetTop &&
      window.scrollY - offsetTop < 1000 &&
      activeIndexRef.current < 7
    ) {
      e.preventDefault();
      handleFlowStep.run();
      document.body.style.overflowY = 'hidden';
      flowWrapRef.current.style.paddingRight = '6px';
      window.scrollTo(0, offsetTop + 10);
    } else {
      document.body.style.overflowY = 'auto';
      flowWrapRef.current.style.paddingRight = '0px';
    }
  };

  const handleFlowStep = useDebounceFn(
    () => {
      setActiveFlowIndex(activeFlowIndex + 1);
    },
    { wait: 100 },
  );

  const renderFlowItem = (item: (typeof flowList)[number], index) => {
    const { defaultBg, activeBg, icon, desc, arrowsBg, arrowsX, arrowsY } = item;
    const activeBtn = 2 * index <= activeFlowIndex;
    const activeLine = 2 * index + 1 <= activeFlowIndex;

    return (
      <div key={icon} className='flex mb-[34px]'>
        <div className='rounded-[16px] relative'>
          <img
            className=' duration-1000'
            src={defaultBg}
            style={{
              opacity: activeBtn ? 0 : 1,
            }}
          />
          <img
            className=' duration-1000 absolute left-0 top-0'
            src={activeBg}
            style={{
              opacity: activeBtn ? 1 : 0,
            }}
          />
          <img
            src={arrowsBg}
            className=' absolute z-10 left-0 top-0 duration-1000'
            style={{
              left: arrowsX,
              top: arrowsY,
              opacity: activeLine ? 1 : 0.1,
            }}
          />
        </div>

        <div
          className='w-[506px] ml-[70px] flex items-center duration-1000'
          style={{ opacity: activeLine ? 1 : 0.2 }}
        >
          <img src={icon} />
          <p className='ml-[32px] text-[20px]'>{desc}</p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    document.body.removeEventListener('wheel', handleStopScroll);

    document.body.addEventListener('wheel', handleStopScroll, {
      passive: false,
    });

    return () => {
      document.body.removeEventListener('wheel', handleStopScroll);
    };
  }, [isMobile]);

  useEffect(() => {
    activeIndexRef.current = activeFlowIndex;
  }, [activeFlowIndex]);

  return (
    <div className='lg:py-[100px] lg:px-0 px-[12px] py-[50px] bg-[#000] flex justify-center'>
      <img className='lg:hidden block' src='/home/section6_flow_mobile.png' />

      <div className='lg:block hidden pt-[40px]' ref={flowWrapRef}>
        {flowList.map(renderFlowItem)}
      </div>
    </div>
  );
});
