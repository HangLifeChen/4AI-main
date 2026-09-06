"use client"

import { useState, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';

interface MenuItem {
  key: string;
  label: string;
}

interface MenuProps {
  items: MenuItem[];
  activeKey: string;
  onChange: (key: string) => void;
}

const Menu = ({ items, activeKey, onChange }: MenuProps) => {
  const [sliderDimensions, setSliderDimensions] = useState({
    left: 0,
    width: 0,
  });

  const handleItemClick = (event: React.MouseEvent<HTMLDivElement>, key: string) => {
    const target = event.currentTarget;
    onChange(key);
    setSliderDimensions({
      left: target.offsetLeft,
      width: target.offsetWidth,
    });
  };

  useLayoutEffect(() => {
    const firstItem = document.querySelector('.menu-item');
    if (firstItem) {
      setSliderDimensions({
        left: firstItem.getBoundingClientRect().left - firstItem.parentElement!.getBoundingClientRect().left,
        width: firstItem.getBoundingClientRect().width,
      });
    }
  }, []);

  return (
    <div className="relative pb-1 bg-transparent">
      <div className="flex gap-6 overflow-x-auto">
        {items.map((item) => (
          <div
            key={item.key}
            className={`text-nowrap bg-transparent menu-item cursor-pointer pb-[18px] font-medium transition-colors ${activeKey === item.key ? 'text-white font-semibold' : 'text-[var(--common-white-six)]'
              }`}
            onClick={(e) => handleItemClick(e, item.key)}
          >
            {item.label}
          </div>
        ))}
      </div>

      <motion.div
        className="absolute bottom-0 h-[3px] bg-primary"
        initial={false}
        animate={{
          left: sliderDimensions.left,
          width: sliderDimensions.width,
        }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
      />
    </div>
  );
};

export default Menu;