import { AxiosResponse } from 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    ignoreConfig?: boolean;
    ignoreErrorMsg?: boolean;
    ignoreVerifyLogin?: boolean;
  }

  interface AxiosResponse<T = any> {
    code: number;
    data: T;
    message?: string;
    text?: string;
    [key: string]: any;
  }
}
