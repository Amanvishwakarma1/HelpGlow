import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const TypewriterHeading = ({ text, className = "", style = {} }) => {
  const [displayedText, setDisplayedText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isInView) {
      setDisplayedText("");
      setIsDone(false);
      return;
    }

    let currentIndex = 0;
    setDisplayedText("");
    setIsDone(false);

    // Initial slight pause (150ms) then distinct typing delay (85ms per character)
    let timer;
    const startDelay = setTimeout(() => {
      timer = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsDone(true);
          clearInterval(timer);
        }
      }, 85);
    }, 150);

    return () => {
      clearTimeout(startDelay);
      if (timer) clearInterval(timer);
    };
  }, [isInView, text]);

  return (
    <h2 ref={ref} className={className} style={{ position: 'relative', display: 'inline-block', ...style }}>
      {displayedText}
      {!isDone && (
        <span
          style={{
            display: 'inline-block',
            width: '3.5px',
            height: '0.9em',
            background: 'linear-gradient(180deg, #0A90B5, #D95B28)',
            marginLeft: '6px',
            verticalAlign: 'baseline',
            borderRadius: '2px',
            boxShadow: '0 0 8px rgba(10, 144, 181, 0.8)',
            animation: 'blink 0.65s infinite'
          }}
        />
      )}
    </h2>
  );
};

export default TypewriterHeading;
