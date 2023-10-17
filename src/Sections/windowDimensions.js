import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimension() {
  const [windowDimensions, setDimension] = useState(getWindowDimensions());


  useEffect(() => {
    
    const debouncedResizeHandler = debounce(() => {
      console.log('***** debounced resize'); // See the cool difference in console
      setDimension(getWindowDimensions());
    }, 100); // 100ms
    window.addEventListener('resize', debouncedResizeHandler);
    return () => window.removeEventListener('resize', debouncedResizeHandler);
  }, []); // Note this empty array. this effect should run only on mount and unmount
  return windowDimensions;
}

function debounce(fn, ms) {
  let timer;
  return _ => {
    clearTimeout(timer);
    timer = setTimeout(_ => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}