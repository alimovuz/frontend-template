import { useState, useEffect, useRef } from 'react';

const useDebounce = <T>(value: T, delay = 500): [T, boolean] => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [changed, setChanged] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setChanged(prevValue.current !== value);
      prevValue.current = value;
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue, changed];
};

export default useDebounce;