import { useEffect, useRef, useState } from 'react';
import { useLetterReveal } from '../hooks/useLetterReveal';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import '../styles/home.css';

/** How long a sparkle is visible, and how long between sparkles. */
const SPARKLE_DURATION = 500;
const SPARKLE_INTERVAL = 2000;

/**
 * The "Raahz Commissions" wordmark.
 *
 * Ports header-animation.js (staggered reveal, hover wave, random sparkle) and
 * wave-animation.js (the same hover wave, with the colour shift). The original
 * attached both scripts to `mouseover`, so the two effects ran on top of each
 * other; here they are one clean keyframe driven by a single handler.
 *
 * Individual letters are hidden from assistive tech and the full phrase is
 * exposed once as real text - the original announced every letter separately.
 */
export default function AnimatedTitle({ name, tagline }) {
  const nameLetters = [...name];
  const taglineLetters = [...tagline];
  const total = nameLetters.length + taglineLetters.length;

  const prefersReduced = usePrefersReducedMotion();
  const revealed = useLetterReveal(total, 100, prefersReduced);

  const [waving, setWaving] = useState(false);
  const isWaving = useRef(false);
  const timers = useRef([]);
  /* The wordmark element, so the sparkle loop can reach the letter nodes
     directly instead of driving them through React state. */
  const groupRef = useRef(null);

  /* A random letter sparkles every two seconds, ported from header-animation.js.

     This used to be React state: a `sparkle` index in useState, a className
     recomputed for all sixteen letters on every tick, and a React re-render
     twice a second, forever, whether or not anyone was looking at it.

     The class is now toggled directly on one DOM node instead. The visual result
     is identical, but a highlight on a single letter is exactly the kind of
     change that does not need React's reconciliation - it costs one property
     write rather than a full re-render of the wordmark.

     Paused while the tab is hidden, like the other loops on this site. */
  useEffect(() => {
    if (prefersReduced || total === 0) {
      return undefined;
    }

    let timeout = null;
    let sparkleTimeout = null;

    const clearSparkle = () => {
      if (sparkleTimeout !== null) {
        clearTimeout(sparkleTimeout);
        sparkleTimeout = null;
      }
    };

    const tick = () => {
      const letters = groupRef.current?.querySelectorAll('.letter');
      if (!letters || letters.length === 0) {
        timeout = setTimeout(tick, SPARKLE_INTERVAL);
        return;
      }

      const index = Math.floor(Math.random() * letters.length);
      const node = letters[index];
      node.classList.add('is-sparkling');
      sparkleTimeout = setTimeout(() => {
        node.classList.remove('is-sparkling');
        sparkleTimeout = null;
      }, SPARKLE_DURATION);

      timeout = setTimeout(tick, SPARKLE_INTERVAL);
    };

    const start = () => {
      if (timeout === null) {
        timeout = setTimeout(tick, SPARKLE_INTERVAL);
      }
    };

    const stop = () => {
      clearTimeout(timeout);
      timeout = null;
      clearSparkle();
      groupRef.current
        ?.querySelectorAll('.letter.is-sparkling')
        .forEach((node) => node.classList.remove('is-sparkling'));
    };

    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    if (document.hidden) {
      stop();
    } else {
      start();
    }

    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [prefersReduced, total]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    []
  );

  const handleEnter = () => {
    if (prefersReduced || isWaving.current) {
      return;
    }
    isWaving.current = true;
    setWaving(true);

    const done = setTimeout(() => {
      setWaving(false);
      isWaving.current = false;
    }, 500 + total * 50 + 100);
    timers.current.push(done);
  };

  const letter = (char, index) => (
    <span
      // eslint-disable-next-line react/no-array-index-key
      key={`${char}-${index}`}
      className={`letter${index < revealed ? ' active' : ''}`}
      style={{ '--i': index }}
      aria-hidden="true"
    >
      {char}
    </span>
  );

  return (
    <h1
      ref={groupRef}
      className={`animate-text${waving ? ' is-waving' : ''}`}
      onMouseEnter={handleEnter}
      onFocus={handleEnter}
    >
      <span className="name-group" aria-hidden="true">
        {nameLetters.map(letter)}
      </span>
      <span className="commission-group" aria-hidden="true">
        {taglineLetters.map((char, index) => letter(char, nameLetters.length + index))}
      </span>
      <span className="sr-only">{`${name} ${tagline}`}</span>
    </h1>
  );
}
