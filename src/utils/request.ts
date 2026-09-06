import Axios from 'axios';
import { debounce } from 'lodash';
import { addToast } from '@heroui/react';
import { requestDomain } from './configs';

const TOKEN_REFRESH_AHEAD = 60 * 60 * 1000;

const rawAxios = Axios.create({
  baseURL: requestDomain,
});

export const request = Axios.create({
  baseURL: requestDomain,
});

const getLoginTokenExpires = () => parseInt(localStorage.getItem('loginTokenExpiration') || '0');

const isLoginTokenExpiringSoon = () => {
  const token = localStorage.getItem('loginToken');
  const expires = getLoginTokenExpires();
  const flag = !!token && !!expires && Date.now() + TOKEN_REFRESH_AHEAD > expires;
  return flag
};


const alertRequestErrMsg = debounce(title => {
  addToast({ title, color: 'warning' });
}, 500);

let refreshingLoginPromise: Promise<string | false> | null = null;

const refreshLoginToken = async (): Promise<string | false> => {
  if (refreshingLoginPromise) return refreshingLoginPromise;

  refreshingLoginPromise = rawAxios.get('/api/front/refresh/token', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    },
  })
    .then(res => {
      const { code, data } = res.data || {};
      if (code === 0 && data?.token) {
        localStorage.setItem('loginToken', data.token);
        localStorage.setItem('loginTokenExpiration', (data.expire_time * 1000).toString());
        return data.token;
      }
      return false;
    })
    .catch(() => false)
    .finally(() => {
      refreshingLoginPromise = null;
    });

  return refreshingLoginPromise;
};

request.interceptors.request.use(async config => {
  const { ignoreConfig } = config;
  if (ignoreConfig) return config;

  if (isLoginTokenExpiringSoon()) {
    await refreshLoginToken();
  }

  config.headers.Tid = `${Date.now()}-${crypto.randomUUID()}`;
  config.headers.Authorization = `Bearer ${localStorage.getItem('loginToken')}`;

  return config;
});

request.interceptors.response.use(res => {
  const { config, data } = res;
  const { code, message, text, error } = data || {};
  const { ignoreErrorMsg, ignoreVerifyLogin } = config;

  if (![undefined, 0].includes(code)) {
    const errorMsg = text || error;

    if (!ignoreErrorMsg && ![-429].includes(code)) {
      alertRequestErrMsg(errorMsg);
    }

    if (message === 'TOKEN_INVALID' && !ignoreVerifyLogin) {
      // location.href = '/login';
    }

    return Promise.reject(`${config.url} ${errorMsg}`);
  }

  return data;
});