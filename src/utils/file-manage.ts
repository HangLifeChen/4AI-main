'use client';
import axios, { type AxiosProgressEvent, type CancelTokenSource } from 'axios';
import { request } from '@/utils';
import { getWindow } from './tools';
import { requestDomain } from './configs';

export type UploadFile = {
  file: File;
  hash: string;
  progress: number;
  status: 'loading' | 'uploading' | 'done' | 'error';
};

export interface UploadOptions {
  onProgress?: (progress: number) => void;
  cancelSource?: CancelTokenSource;
}

export interface UploadsOptions {
  onChange?: (fileList: UploadFile[], currentFile: UploadFile) => void;
  onProgress?: (fileList: UploadFile[], currentFile: UploadFile) => void;
  onComplete?: () => void;
}

export interface UploadsHandles {
  cancelUploadAll?: () => void;
}

export class FileManage {
  private static pinataJwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjYmM1NmUwMS05ZmIyLTQ0MmYtYmU5Mi04NWRjOWIyMmQ1ZDUiLCJlbWFpbCI6Imphc29uY2hpbmc5MkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYTk0NjQ5ZTliYmQwNDE3Y2RkZmEiLCJzY29wZWRLZXlTZWNyZXQiOiI2ZWY3M2MwZTVhM2E2NGM3ZTZhMmU2MDdmNWExZmY4MWFmMmI3ZTNjNmI4OTI2MzIzYmIzMmRmNDQ1ZmM3NzdjIiwiZXhwIjoxNzc1NjE4NTMxfQ.-SW0ezJn4joVRvHojSMm6ulJfZIK5yr3LJ2swUB0ycY';

  private static pinataUrl = `${requestDomain}/ipfs/`;

  private static pinataUploadUrl = 'https://uploads.pinata.cloud/v3/files';

  private static aswSignatureUrl = `${getWindow('origin')}/api/aws/signature`;

  private static aswFileInfoUrl = `${getWindow('origin')}/api/aws/head`;

  private static handleProgress = (progressEvent: AxiosProgressEvent, options?: UploadOptions) => {
    const { onProgress } = options || {};

    if (progressEvent.total) {
      const progress = Math.ceil((progressEvent.loaded / progressEvent.total) * 100);
      onProgress?.(progress);
    }
  };

  static getFilePath = async <T extends string | string[]>(
    hash: T,
    storeType?: 'aws' | 'pinata',
  ): Promise<T extends string[] ? Record<string, string> : string> => {
    if (!hash || (typeof hash === 'string' && /^(https?:\/\/|\/)/.test(hash))) {
      return hash as any;
    }
    const res = await request.post(FileManage.aswSignatureUrl, {
      hash,
      commandType: 'get',
    });
    return res.data;

    // if (storeType === 'aws') {
    //   const res = await request.post(FileManage.aswSignatureUrl, {
    //     hash,
    //     commandType: 'get',
    //   });
    //   return res.data;
    // }

    // return (FileManage.pinataUrl + hash) as any;
  };

  static getFileHash = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        crypto.subtle
          .digest('SHA-256', reader.result as ArrayBuffer)
          .then(hashBuffer => {
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

            resolve(hashHex);
          })
          .catch(reject);
      };

      reader.onerror = e => {
        reject(e);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  static uploadFiles = (files: File[] | FileList, options?: UploadsOptions): UploadsHandles => {
    if (!files) return {} as UploadsHandles;
    const { onChange, onProgress, onComplete } = options || {};
    const cancelSourceAll = axios.CancelToken.source();
    let cancelUploadAllStatus = false;

    const fileList = Array.from(files).map(item => {
      return {
        file: item,
        status: 'loading',
        hash: '',
        progress: 0,
      } as UploadFile;
    });

    const batchUpload = async () => {
      for (const item of fileList) {
        if (cancelUploadAllStatus) return;

        item.status = 'uploading';
        onChange?.(fileList, item);

        const res = await FileManage.uploadAws(item.file, {
          cancelSource: cancelSourceAll,
          onProgress: progress => {
            item.progress = progress;
            onProgress?.(fileList, item);
          },
        }).catch(() => { });

        if (res) {
          item.hash = res;
          item.status = 'done';
        } else {
          item.status = item.status || 'error';
        }

        onChange?.(fileList, item);
      }

      onComplete?.();
    };

    batchUpload();

    return {
      cancelUploadAll: () => {
        cancelSourceAll.cancel();
        cancelUploadAllStatus = true;
      },
    };
  };

  static uploadAws = async (file: File, options?: UploadOptions) => {
    const { cancelSource } = options || {};
    const hash = await FileManage.getFileHash(file);
    const fileType = file?.type;
    const fileInfoRes = await request.post(FileManage.aswFileInfoUrl, { hash });
    if (fileInfoRes.data) return hash;
    const signatureRes = await request.post(FileManage.aswSignatureUrl, {
      fileType,
      hash,
      commandType: 'put',
    });

    const res = await request.put(signatureRes.data, file, {
      ignoreConfig: true,
      headers: { 'Content-Type': fileType },
      cancelToken: cancelSource?.token,
      onUploadProgress: e => FileManage.handleProgress(e, options),
    });
    console.log('res', res)

    return hash;
  };

  static uploadPinata = async (file: File, options?: UploadOptions) => {
    if (!file) return;
    const { cancelSource } = options || {};
    const formData = new FormData();

    formData.append('file', file);
    formData.append('network', 'public');
    formData.append('name', file.name);

    const res = await request.post(FileManage.pinataUploadUrl, formData, {
      ignoreConfig: true,
      headers: {
        Authorization: `Bearer ${FileManage.pinataJwt}`,
      },
      cancelToken: cancelSource?.token,
      onUploadProgress: e => FileManage.handleProgress(e, options),
    });

    return res.data?.cid as string;
  };

  static download = async (hash: string, fileName: string) => {
    const res = await request.post(FileManage.aswSignatureUrl, {
      hash,
      fileName,
      commandType: 'download',
    });
    const link = document.createElement('a');

    link.href = res.data;
    link.download = fileName;
    link.click();
  };
}