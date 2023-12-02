import { useEffect, useRef, useState } from "react";

const useDebounce = <T>(value: T, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timerRef = useRef<number>();

  useEffect(() => {
    timerRef.current = window.setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};
