import { cooldownTime } from "./configs";

export const formatNumberAbbreviation = (num: number): string => {
  if (!num) return '0';

  const floorFixed = (value: number, decimals: number) => {
    const factor = Math.pow(10, decimals);
    return Math.floor(value * factor) / factor;
  };

  const trimZeros = (val: string) => val.replace(/\.?0+$/, '');

  num = Number(num);

  if (num >= 1e12) return trimZeros(floorFixed(num / 1e12, 2).toFixed(2)) + 'T';
  if (num >= 1e9) return trimZeros(floorFixed(num / 1e9, 2).toFixed(2)) + 'B';
  if (num >= 1e6) return trimZeros(floorFixed(num / 1e6, 2).toFixed(2)) + 'M';
  if (num >= 1e3) return trimZeros(floorFixed(num / 1e3, 2).toFixed(2)) + 'K';

  return trimZeros(floorFixed(num, 2).toFixed(2));
};


export const getWindow = (key?: keyof (Window & typeof globalThis)) => {
  try {
    return key ? window[key] : window;
  } catch (e) {
    return null;
  }
};

export const isMobile = () => {
  const userAgentInfo = navigator.userAgent;
  const flag = /Android|iPhone|SymbianOS|iPad|iPod/i.test(userAgentInfo);
  return flag;
};

export const isValidCustomUrl = (url: string): boolean => {
  const pattern = /^https:\/\/(lab\.4bsc\.ai|4bsc\.ai)\/agenthub\/\d+$/;
  return pattern.test(url);
}

// export const formatNumberWithCommas = (value: string | number): string => {
//   if (value === null || value === undefined) return "";

//   const str = String(value).replace(/,/g, "").trim();
//   if (str === "" || !/^\d+$/.test(str)) return "";

//   return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };
export const formatNumberWithCommas = (value: string | number): string => {
  if (value === null || value === undefined) return "";

  const num = Number(String(value).replace(/,/g, "").trim());
  if (isNaN(num)) return "";

  if (Number.isInteger(num)) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    const fixed = num.toFixed(2);
    const [intPart, decimalPart] = fixed.split(".");
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedInt}.${decimalPart}`;
  }
};




export const getLevel = (level: number) => {
  switch (level) {
    case 1.0:
      return 'Bronze';
    case 1.2:
      return 'Silver';
    case 1.5:
      return 'Gold';
    case 2.0:
      return 'Diamond';
    case 3.0:
      return 'Master';
    default:
      return '--';
  }
}

export const calcCooldown = (lastUnstakeTime: number) => {
  if (!lastUnstakeTime) {
    return { remindTime: 0, timePassed: 0 };
  }

  const now = Math.floor(Date.now() / 1000);
  const elapsed = Math.max(0, now - lastUnstakeTime);
  const remaining = Math.max(0, cooldownTime - elapsed);

  const timeFormat = (s) => {
    if (s < 60) return `${s} ${s === 1 ? "sec" : "secs"}`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m} ${m === 1 ? "min" : "mins"}`;
    const h = Math.floor(s / 3600);
    if (h < 24) return `${h} ${h === 1 ? "hour" : "hours"}`;
    const d = Math.floor(s / 86400);
    if (d < 30) return `${d} ${d === 1 ? "day" : "days"}`;
    const mo = Math.floor(d / 30);
    if (mo < 12) return `${mo} ${mo === 1 ? "month" : "months"}`;
    const y = Math.floor(d / 365);
    return `${y} ${y === 1 ? "year" : "years"}`;
  };

  const timePassed = Math.min(
    15,
    Math.max(0, Math.floor((elapsed / cooldownTime) * 15))
  );

  return {
    remindTime: timeFormat(remaining),
    timePassed
  };
}

export const formatTimestamp = (timestampInSeconds: number): string => {

  const date = new Date(timestampInSeconds * 1000);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

export const formatAPY = (apy: number) => {
  const result = (apy * 100).toFixed(2);
  return result;
}

export const formatAddress = (address: string) => {
  if (!address) return '--';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function getCooldownRemaining(lastTimestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const cooldown = 24 * 60 * 60;

  const elapsed = now - lastTimestamp;
  const remaining = Math.max(cooldown - elapsed, 0);

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  const pad = (n: number) => String(n).padStart(2, "0");

  return `${pad(hours)}h : ${pad(minutes)}m : ${pad(seconds)}s`;
}
