import { useEffect } from "react";

export const useDebugLogger = <T>(value: T) => {
  useEffect(() => {
    console.log(value);
  }, [value]);
};
