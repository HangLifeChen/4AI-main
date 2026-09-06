'use client';
import { memo, useState } from 'react';

export const Section9 = memo(() => {
  const [maskImagePosition, setMaskImagePosition] = useState([0, 0]);

  const handleMouseMove = e => {
    const { target, pageX, pageY } = e;
    const relativeY = pageY - target.parentNode.offsetTop;

    setMaskImagePosition([pageX, relativeY]);
  };

  return (
    <div className='flex justify-center overflow-hidden'>
      <div
        className='lg:mb-[-20px] mb-[-5px] group relative mx-auto'
        onMouseMove={handleMouseMove}
      >
        <img src='./home/section9_default_bg.svg' />
        <img
          className='absolute top-0 left-0 opacity-0 group-hover:opacity-100 duration-500'
          src='./home/section9_active_bg.svg'
          style={{
            maskImage: `radial-gradient(circle at ${maskImagePosition[0]}px ${maskImagePosition[1]}px, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 30%)`,
          }}
        />
        <div
          className=' absolute bottom-[-70%] w-full h-full'
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, rgb(33 141 251) 0%, #010102 100%)',
            filter: 'blur(90px)',
          }}
        ></div>
      </div>
    </div>
  );
});
