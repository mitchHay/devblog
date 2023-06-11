import { ReactElement, useEffect, useRef, useState } from "react";

import styles from '../styles/components/FadeIn.module.scss';

type FadeInProps = {
  className?: string,
  children: any
}

/**
 * Used to fade the children nodes provided into the viewport
 */
export default function FadeIn({ className, children }: FadeInProps): ReactElement {
  const [visibilityClass, setVisibilityClass] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setVisibilityClass(
        entry.isIntersecting
          ? styles.visible
          : ''
      );
      
      if (!!containerRef?.current && entry.isIntersecting) {
        observer.unobserve(containerRef.current);
      }
    }, {
      root: document,
      rootMargin: '0px',
      threshold: 0.75
    });

    if (!!containerRef?.current) {
      observer.observe(containerRef.current);
    }
  });

  return (
    <div 
      className={ `${className} ${styles.fadeInContainer} ${visibilityClass}` }
      ref={ containerRef }>
      {
        !!children &&
        children
      }
    </div>
  )
}