import { useEffect } from "react";
import { useTimeout } from "./useTimeout";

// eslint-disable-next-line @typescript-eslint/ban-types
export const useDebounce = (callback: Function, delay: number, dependencies: unknown[]) => {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
};
