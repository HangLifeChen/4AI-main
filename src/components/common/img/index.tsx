'use client';
import { memo, useState, useEffect } from 'react';
import { type SpinnerProps } from '@heroui/react';
import { FileManage } from '@/utils';

export interface ImgProps {
  src?: string;
  spinnerProps?: SpinnerProps;
  [key: string]: any;
}

export const Img = memo((props: ImgProps) => {
  const { src, spinnerProps, ...otherProps } = props;
  const [imgUrl, setImgUrl] = useState<string>();

  const getImgUrl = async () => {
    const img = new Image();
    const filePath = await FileManage.getFilePath(src!);

    img.src = filePath;
    img.onload = () => {
      setImgUrl(filePath);
    };
    img.onerror = () => {
      setImgUrl(src);
    };
  };

  useEffect(() => {
    if (src) getImgUrl();
  }, [src]);

  return imgUrl ? <img {...otherProps} src={imgUrl} /> : null;
});