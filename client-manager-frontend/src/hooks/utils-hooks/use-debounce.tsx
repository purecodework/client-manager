import { useState, useEffect } from "react";

const useDebounce = (state: any, timeOut: number) => {
  const [debouncedState, setDebouncedState] = useState(state);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedState(state), timeOut);
    return () => {
      clearTimeout(timer);
    };
  }, [state, timeOut]);
  return debouncedState;
};

export default useDebounce;
