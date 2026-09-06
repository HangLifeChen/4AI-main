import { request } from './request';

const autuRefreshPage = async () => {
  const res = await request.get('/api/front/version').catch(() => {});
  const { version, refresh_time, clear_local } = res?.data || {};
  const currentVersion = localStorage.getItem('currentVersion');

  if (version) {
    if (currentVersion && version !== currentVersion) {
      if (clear_local) localStorage.clear();

      location.reload();
    }

    localStorage.setItem('currentVersion', version);
  }

  setTimeout(
    () => {
      autuRefreshPage();
    },
    (refresh_time || 60) * 1000,
  );
};

export const runCron = () => {
  autuRefreshPage();
};
