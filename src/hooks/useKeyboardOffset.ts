import { useEffect, useState } from 'react';

export default function useKeyboardOffset() {
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    let originalHeight = window.innerHeight;

    const handleResize = () => {
      const currentHeight = window.innerHeight;
      const offset = originalHeight - currentHeight;

      if (offset > 150) {
        setKeyboardOffset(offset);
      }
      else if (offset < 50) {
        setKeyboardOffset(0);
      }
    };

    window.addEventListener('resize', handleResize);

    const handleOrientationChange = () => {
      originalHeight = window.innerHeight;
    };
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return keyboardOffset;
}
