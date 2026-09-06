'use client';
import { memo, useEffect, type ReactNode } from 'react';
import 'animate.css';

export interface AnimationProps {
  children: ReactNode;
}

export const Animation = memo((props: AnimationProps) => {
  const { children } = props;

  useEffect(() => {
    import('wowjs').then(({ WOW }) => {
      const wow = new (WOW || window.WOW)({
        animateClass: 'animate__animated animate__fadeInUp animation__duration',
      });

      wow.init();
    });
  }, []);

  return children;

});
