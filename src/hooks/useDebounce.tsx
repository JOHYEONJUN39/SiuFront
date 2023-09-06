import { useEffect, useState } from "react"

export const useDebounce = (value: string, delay: number) => {
  const [debouncevalue, setDebouncevalue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncevalue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    }
  }, [value, delay]);

  return debouncevalue;
}