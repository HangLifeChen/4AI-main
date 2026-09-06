'use client';
import { memo, useState } from 'react';
import { useWindow } from '@/hooks';
import { taskPlanList } from './constDatas';

export const Section7 = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const { isMobile } = useWindow();

  const handleChangeIndex = (count: 1 | -1) => {
    const index = currentIndex + count;
    const indexRange = Math.max(0, Math.min(index, taskPlanList.length - 1));
    setCurrentIndex(indexRange);
  };

  const renderTaskPlanItem = (item: (typeof taskPlanList)[number], index) => {
    const { title, desc, date, rgb } = item;
    const isActive = currentIndex === index;

    return (
      <li
        key={title}
        className='lg:mx-[40px] lg:w-[300px] ml-[10vw] w-[80vw] flex  items-center flex-col flex-shrink-0'
      >
        <span
          className='lg:scale-100 scale-80 px-[16px] py-[8px] rounded-full text-[18px] font-bold text-[#000] duration-1000'
          style={{
            background: `rgba(${rgb}, ${isActive ? 1 : 0.4})`,
          }}
        >
          {date}
        </span>
        <div
          className=' my-[30px] size-[45px] bg-[rgba(39,230,255,0.2)] rounded-full flex justify-center items-center duration-1000'
          style={{
            transform: `scale(${isActive ? 1.5 : 1})`,
            background: `rgba(${rgb}, 0.2)`,
          }}
        >
          <span
            className='size-[26px] rounded-full bg-primary'
            style={{
              background: `rgba(${rgb}, 1)`,
            }}
          ></span>
        </div>
        <div className='duration-1000' style={{ opacity: isActive ? 1 : 0.4 }}>
          <h4 className='text-[20px] font-bold'>{title}</h4>
          <p className='text-[15px] mt-[10px]'>{desc}</p>
        </div>
      </li>
    );
  };

  return (
    <div className='xl:w-[1390px] lg:rounded-[48px] rounded-[24px] w-full mx-auto text-center bg-[#13171E] overflow-hidden relative z-0'>
      <h2 className='wow lg:text-[46px] lg:pt-[100px] pt-[50px] text-[28px]'>Roadmap</h2>
      <p className='wow wow-delay-1 lg:mt-[32px] lg:text-[19px] text-[12px] mt-[16px] text-[rgba(255,255,255,0.8)]'>
        The milestones we set out to achieve in 2025
      </p>

      <img
        className='lg:top-0 lg:scale-80 top-[80px] scale-150 absolute -z-10 left-0 '
        src='./home/section7_star_bg.png'
      />

      <div
        className=' absolute -z-10 left-0 top-[100px] w-full h-[200%]'
        style={{
          background: `radial-gradient(ellipse 80% 80%, rgba(${taskPlanList[currentIndex]['rgb']}, 0.3) 0%, rgba(0, 151, 177, 0) 60%)`,
        }}
      ></div>

      <div className='lg:pt-[60px] relative pt-[40px] overflow-hidden'>
        <span
          className='lg:top-[155px] top-[135px] absolute h-[2px] w-full left-0 '
          style={{
            background:
              'linear-gradient(to right, transparent 0%, transparent 50px, #27E6FF 300px, #27E6FF 100%)',
          }}
        ></span>
        <ul
          className='lg:px-[125px] flex duration-500'
          style={{
            marginLeft: isMobile ? -currentIndex * 90 + 'vw' : -(currentIndex - 1) * 380 + 'px',
          }}
        >
          {taskPlanList.map(renderTaskPlanItem)}
        </ul>

        <div className='lg:mt-[100px] lg:scale-100 lg:mb-[-120px] mt-[20px] mb-[-110px] scale-80  relative mx-auto size-[186px] rounded-full bg-[rgba(188,237,255,0.15)] flex items-baseline justify-between px-[40px] pt-[36px]'>
          <img
            src='./home/section7_btn.svg'
            className='  cursor-pointer'
            style={{ opacity: currentIndex === 0 ? 0.1 : 1 }}
            onClick={() => handleChangeIndex(-1)}
          />
          <img
            src='./home/section7_btn.svg'
            className=' rotate-180 w-[20px] cursor-pointer'
            style={{
              opacity: currentIndex >= taskPlanList.length - 1 ? 0.1 : 1,
            }}
            onClick={() => handleChangeIndex(1)}
          />
          <span className=' absolute left-[50%] translate-x-[-50%] top-[33px] bg-[rgba(255,255,255,0.2)] h-[25px] w-[1px]'></span>
        </div>
      </div>
    </div>
  );
});
