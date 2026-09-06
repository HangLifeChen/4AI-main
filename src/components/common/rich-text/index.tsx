'use client';
import { useRef, useImperativeHandle, forwardRef, memo, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Spinner } from '@heroui/react';
import type { EditorRef } from '@nebul/rich-text-editor';
import { cn, FileManage } from '@/utils';
import { useUploadFile } from './uploadthing';
import './index.css';

const Editor = dynamic(() => import('@nebul/rich-text-editor/editor'), {
  ssr: false,
  loading: () => <Spinner className='flex' size='lg' />,
});

const View = dynamic(() => import('@nebul/rich-text-editor/view'), {
  ssr: false,
  loading: () => <Spinner className='flex' size='lg' />,
});

export interface RichTextEditorRef {
  getEditorValue: () => Promise<string>;
}

export interface RichTextEditorProps {
  className?: string;
}

export interface RichTextViewProps {
  className?: string;
  value?: string;
}

export const RichTextEditor = memo(
  forwardRef<RichTextEditorRef, RichTextEditorProps>((props, ref) => {
    const { className } = props;
    const editorRef = useRef<EditorRef>(null);

    const getEditorValue = async () => {
      const editorValue = editorRef.current?.getEditorValue?.();
      return JSON.stringify(editorValue);
    };

    useImperativeHandle(ref, () => ({ getEditorValue }));

    return (
      <div className={cn('rich-text-editor-wrap w-full h-full', className)}>
        <Editor ref={editorRef} customConfig={{ useUploadFile }} />
      </div>
    );
  }),
);

export const RichTextView = memo((props: RichTextViewProps) => {
  const { value, className } = props;
  const [editorValue, setEditorValue] = useState<any[]>();

  const transformValue = async (valueList: any[]) => {
    const fileTypes = ['img', 'video', 'audio', 'file'];
    const hashList = valueList
      .map(item => {
        const { type, hash } = item;
        if (fileTypes.includes(type)) {
          return hash;
        }
      })
      .filter(item => item);
    const filePathData = await FileManage.getFilePath(hashList, 'aws');

    for (const item of valueList) {
      const { type, hash } = item;
      if (fileTypes.includes(type)) {
        item.url = filePathData?.[hash];
      }
    }

    return valueList;
  };

  useEffect(() => {
    if (!value) return;
    const valueList = JSON.parse(value || '[]');
    transformValue(valueList).then(setEditorValue);
  }, [value]);

  return (
    <div className={cn('rich-text-view-wrap w-full h-full', className)}>
      <View value={editorValue} />
    </div>
  );
});
