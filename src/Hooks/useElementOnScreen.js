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
    if (elRef.current) observer.observe(elRef.current);
    return () => {
      if (elRef.current) observer.unobserve(elRef.current);
    };
  }, [elRef, options]);

  return {
    elRef,
    isVisible,
  };
};
