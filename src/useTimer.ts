import { useEffect } from "react";

export const useTimeout = (callback: () => void, timeout = 100) => {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const run = () => {
      callback();
      timer = setTimeout(run, timeout);
    };

    run();

    return () => {
      clearTimeout(timer);
    };
  }, []);
};

export const useRaf = (callback: () => void) => {
  useEffect(() => {
    let timer: number;

    const run = () => {
      callback();
      timer = requestAnimationFrame(run);
    };

    run();

    return () => {
      cancelAnimationFrame(timer);
    };
  }, []);
};
