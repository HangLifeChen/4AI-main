import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export const useWindow = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const userAgentInfo = navigator.userAgent;
    const flag = /Android|iPhone|SymbianOS|iPad|iPod/i.test(userAgentInfo);

    setIsMobile(flag);
    setIsLoad(true);
  }, []);

  return { isLoad, isMobile, pathname, searchParams };
};
