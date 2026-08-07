"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Fires once when the element first enters the viewport.
 *
 * Important: even when the element is already on screen at mount, the flag is
 * flipped on a later frame rather than synchronously. Setting it synchronously
 * lets React commit the "shown" state before the browser has painted the
 * "hidden" start state, so the CSS transition has nothing to interpolate from
 * and the element just pops in with no animation.
 */
export function useInViewOnce<T extends HTMLElement>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf1 = 0;
    let raf2 = 0;
    const reveal = () => {
      // A background tab never runs rAF, so the two-frame dance below would
      // strand the reveal forever — and there's no paint to sequence against
      // anyway. Flip straight away in that case.
      if (document.hidden) {
        setInView(true);
        return;
      }
      // two frames: one to paint the start state, one to flip to the end state
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setInView(true));
      });
    };

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      reveal();
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  return [ref, inView];
}
