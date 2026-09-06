"use client";

import { memo, type ReactNode } from 'react';
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Modal as HeroModal,
  type ButtonProps,
  type ModalProps as HeroModalProps,
} from '@heroui/react';

export interface ModalProps extends Omit<HeroModalProps, 'children' | 'title'> {
  visible: boolean;
  title?: ReactNode;
  children: ReactNode;
  cancelBtnText?: ReactNode;
  okBtnText?: ReactNode;
  cancelBtnProps?: ButtonProps;
  renderFooter?: () => ReactNode;
  okBtnProps?: ButtonProps;
  onCancel?: () => void;
  onOk?: () => void;
  onVisibleChange: (visible: boolean) => void;
}

export const Modal = memo((props: ModalProps) => {
  const {
    visible,
    title,
    children,
    cancelBtnText = 'Cancel',
    okBtnText = 'Confirm',
    cancelBtnProps,
    renderFooter,
    okBtnProps,
    onVisibleChange,
    onCancel,
    onOk,
    ...otherProps
  } = props;

  return (
    <HeroModal
      classNames={{
        header: 'pt-[20px]',
        body: 'px-[30px]',
      }}
      size='2xl'
      {...otherProps}
      isOpen={visible}
      onOpenChange={onVisibleChange}
    >
      <ModalContent
        style={{
          background: 'linear-gradient(90deg, #242731 0%, #141618 100%)',
        }}
      >
        {onClose => (
          <>
            <ModalHeader className='flex flex-col text-[18px] items-center'>{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              {renderFooter?.() || (
                <>
                  <Button
                    color='default'
                    variant='light'
                    onPress={onCancel || onClose}
                    {...cancelBtnProps}
                  >
                    {cancelBtnText}
                  </Button>
                  <Button color='primary' onPress={onOk} {...okBtnProps}>
                    {okBtnText}
                  </Button>
                </>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </HeroModal>
  );
});
