'use client';
import { memo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button as HeroButton, type ButtonProps as HeroButtonProps } from '@heroui/react';
import { cn } from '@/utils';

const typePropsMap = {
  border: {
    className:
      'border border-[rgba(255,255,255,0.4)] hover:border-primary hover:text-primary text-[#fff] rounded-full !bg-transparent',
  },
  hoverPrimary: {
    className: 'border-[1px] border-[rgba(255,255,255,0.4)]',
  },
  link: {
    className: 'font-normal w-auto hover:text-[#fff] !bg-transparent p-0  rounded-none',
    childrenClassName: 'justify-start',
    variant: 'light',
    disableAnimation: true,
  },
} as const;

export interface ButtonProps extends Omit<HeroButtonProps, 'type'> {
  type?: keyof typeof typePropsMap;
  className?: string;
  childrenClassName?: string;
  href?: string;
  onClick?: (e: any) => void;
  loading?: boolean;
}

export const Button = memo((props: ButtonProps) => {
  const {
    children,
    className,
    childrenClassName,
    type,
    href,
    onClick,
    disabled,
    loading: loadingProp,
    ...otherProps
  } = props;

  const router = useRouter();
  const buttonTypeProps: any = typePropsMap[type!] || {};
  const [internalLoading, setInternalLoading] = useState(!!loadingProp);
  useEffect(() => {
    setInternalLoading(!!loadingProp);
  }, [loadingProp]);

  useEffect(() => {
    if (!internalLoading) return;
    const timer = setTimeout(() => {
      setInternalLoading(false);
    }, 40000);
    return () => clearTimeout(timer);
  }, [internalLoading]);
  const handleClick = e => {
    if (internalLoading) return;
    onClick?.(e);
    if (href) {
      if (/^(https?:\/\/)/.test(href)) {
        window.open(href, '_blank');
      } else {
        router.push(href);
      }
    }
  };

  return (
    <HeroButton
      color='primary'
      type='submit'
      disabled={disabled || internalLoading}
      onPress={handleClick}
      {...buttonTypeProps}
      {...otherProps}

      className={cn(
        'rounded-full font-bold text-[16px] min-w-[50px] h-[48px] whitespace-nowrap ',
        buttonTypeProps.className,
        className,
        (disabled)
          ? 'pointer-events-none  bg-[#1A1A1A]  border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.4)]'
          : '',
      )}
    >
      <div className={`duration-300  h-full  ${internalLoading ? '' : 'hover:translate-y-[-100%]'} `}>

        <div
          className={cn(
            'h-full flex justify-center items-center font-bold',
            buttonTypeProps.childrenClassName,
            childrenClassName,
          )}
        >
          {children}
          {internalLoading && (
            <span className="ml-2 inline-block lg:w-4 lg:h-4 w-3 h-3 border-2 border-t-transparent border-black rounded-full animate-spin" />
          )}
        </div>

        <div
          className={cn(
            'h-full flex justify-center items-center font-bold',
            buttonTypeProps.childrenClassName,
            childrenClassName,
          )}
        >
          {children}
          {internalLoading && (
            <span
              className="ml-2 inline-block lg:w-5 lg:h-5 w-3 h-3 rounded-full border-[2px] border-solid border-black border-t-transparent animate-spin [animation-duration:0.6s]"
            // style={{
            //   borderTopColor: 'transparent',
            //   borderRightColor: 'rgba(255,255,255,0.6)',
            //   borderBottomColor: 'rgba(255,255,255,0.3)',
            //   borderLeftColor: 'rgba(255,255,255,0.1)',
            // }}
            />)}
        </div>
      </div>
    </HeroButton>
  );
});
