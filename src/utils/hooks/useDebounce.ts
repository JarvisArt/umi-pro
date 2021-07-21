import { useRef, useEffect } from 'react';
import { debounce } from 'lodash';

type Fn = (...args: any) => any;

type Options = {
  leading?: boolean;
  maxWait?: number;
  trailing?: boolean;
};

function useDebounce<T extends Fn>(fn: T, wait: number, options?: Options) {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  const { current } = useRef({
    debounced: debounce<T>(
      ((...args: any[]) => {
        return fnRef.current(...args);
      }) as T,
      wait,
      options,
    ),
  });

  useEffect(() => {
    return current.debounced.cancel;
  }, []);

  return current.debounced;
}

export default useDebounce;
