"use client";

import { memo, type ReactNode } from 'react';
import {
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Dropdown as HeroDropdown,
  type DropdownMenuProps,
  type DropdownProps as HeroDropdownProps,
} from '@heroui/react';
import { cn } from '@/utils';

export interface DropdownProps extends Omit<HeroDropdownProps, 'children'> {
  children: ReactNode;
  options?: {
    value: string;
    label: ReactNode;
    className?: string;
    [key: string]: any;
  }[];
  onAction?: DropdownMenuProps['onAction'];
}

export const Dropdown = memo((props: DropdownProps) => {
  const { children, options, onAction, ...otherProps } = props;

  return (
    <HeroDropdown
      classNames={{
        base: 'top-[15px]',
      }}
      {...otherProps}
    >
      <DropdownTrigger>{children}</DropdownTrigger>
      <DropdownMenu aria-label='Static Actions' onAction={onAction}>
        {options?.map(item => {
          const { value, label, className, ...otherProps } = item;
          return (
            <DropdownItem
              key={value}
              className={cn(
                ' h-[40px] bg-black my-[3px] opacity-70 hover:opacity-100 px-[15px]',
                className,
              )}
              {...otherProps}
            >
              <div className='text-[15px] flex items-center'>{label}</div>
            </DropdownItem>
          );
        }) || null}
      </DropdownMenu>
    </HeroDropdown>
  );
});