import React, { useState, useEffect, useRef } from 'react';

/**
 * LazyImage component for strict on-demand viewport loading.
 * Defers setting image 'src' until the element enters the viewport via IntersectionObserver.
 * Shows a smooth shimmer skeleton placeholder until loaded.
 */
const LazyImage = ({
  src,
  alt = '',
  className = '',
  style = {},
  objectFit = 'cover',
  objectPosition = 'center',
  priority = false,
  isDark = false,
  containerStyle = {},
  onLoad,
  onError,
  ...rest
}) => {
  const [inView, setInView] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (priority || !src) {
      setInView(true);
      return;
    }

    let observer;
    if (containerRef.current && typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setInView(true);
              if (observer && containerRef.current) {
                observer.unobserve(containerRef.current);
              }
            }
          });
        },
        {
          rootMargin: '200px 0px', // Start fetching 200px before scrolling into view
          threshold: 0.01,
        }
      );

      observer.observe(containerRef.current);
    } else {
      // Fallback for environments without IntersectionObserver
      setInView(true);
    }

    return () => {
      if (observer && containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [src, priority]);

  const handleImageLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleImageError = (e) => {
    setHasError(true);
    if (onError) onError(e);
  };

  return (
    <div
      ref={containerRef}
      className={`lazy-image-container ${!isLoaded && !hasError ? (isDark ? 'lazy-shimmer-bg-dark' : 'lazy-shimmer-bg') : ''}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: !isLoaded ? (isDark ? '#1E293B' : '#E2E8F0') : 'transparent',
        ...containerStyle,
      }}
    >
      {inView && !hasError && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={className}
          style={{
            width: '100%',
            height: '100%',
            objectFit: objectFit,
            objectPosition: objectPosition,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.4s ease-out',
            display: 'block',
            ...style,
          }}
          {...rest}
        />
      )}

      {hasError && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            color: isDark ? '#94A3B8' : '#64748B',
            fontSize: '13px',
            textAlign: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: isDark ? '#0F172A' : '#F1F5F9',
          }}
        >
          <span>📷</span>
          <span style={{ marginTop: '4px', fontSize: '11px' }}>Image Unavailable</span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
