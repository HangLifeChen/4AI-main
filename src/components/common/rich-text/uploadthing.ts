import { useState, useCallback, useMemo } from 'react';
import { FileManage } from '@/utils';

export const useUploadFile = () => {
  const [uploadedFile, setUploadedFile] = useState<any>();
  const [uploadingFile, setUploadingFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = useCallback(async (file: File) => {
    setIsUploading(true);
    setUploadingFile(file);

    try {
      const res = await FileManage.uploadAws(file, {
        onProgress: setProgress,
      });
      const fileInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
        hash: res,
        url: URL.createObjectURL(file),
      } as any;

      setUploadedFile(fileInfo);

      return fileInfo;
    } catch (err) {
      console.error('rich-text-upload-error', err);
    } finally {
      setProgress(0);
      setIsUploading(false);
      setUploadingFile(undefined);
    }
  }, []);

  const values = useMemo(
    () => ({
      isUploading,
      progress,
      uploadedFile,
      uploadingFile,
      uploadFile,
    }),
    [isUploading, progress, uploadedFile, uploadingFile, uploadFile],
  );

  return values;
};
