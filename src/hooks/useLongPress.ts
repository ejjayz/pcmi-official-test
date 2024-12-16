import { useCallback, useRef, useState } from 'react';

export const useLongPress = (
  callback: () => void,
  ms: number = 500
) => {
  const [pressing, setPressing] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();

  const start = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setPressing(true);
    timeout.current = setTimeout(() => {
      callback();
    }, ms);
  }, [callback, ms]);

  const stop = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setPressing(false);
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }, []);

  return {
    onTouchStart: start,
    onTouchEnd: stop,
    onTouchMove: stop,
    pressing
  };
};
