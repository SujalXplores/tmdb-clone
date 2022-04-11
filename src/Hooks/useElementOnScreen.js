import { useEffect, useRef, useState } from 'react';

export const useElementOnScreen = (options) => {
  const elRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    const el = elRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [elRef, options]);

  return {
    elRef,
    isVisible,
  };
};
