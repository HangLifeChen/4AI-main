
"use client";

import { useCallback, useEffect, useState } from "react";

import {
  ModalContent,
  Modal as HeroModal,
} from '@heroui/react';

interface IProps {
  openDia: boolean
  setOpenDia: (flag: boolean) => void
  children: React.ReactNode,
  maxWidth?: string
}


const CommonModal = (props: IProps) => {

  const { openDia, setOpenDia, children, maxWidth = '578px' } = props

  return (
    <>
      <HeroModal
        isDismissable={false}
        isKeyboardDismissDisabled
        hideCloseButton
        classNames={{
          header: '',
          body: '!rounded-2xl',
        }}
        size='2xl'
        isOpen={openDia}
        onOpenChange={setOpenDia}
        placement='center'
      >
        <ModalContent
          style={{
            maxWidth: maxWidth,
            borderRadius: '24px',
            overflow: 'hidden',
            zIndex: '100',
            border: '1px solid #FCBC19',
            background: 'linear-gradient(180deg, #2A2B2B 0%, #151515 100%)',
            boxShadow: '0 0 35px 0 rgba(255, 255, 255, 0.30)'
          }}
        >
          {
            children
          }
        </ModalContent>
      </HeroModal>

    </>
  );
};

export default CommonModal