import { useEffect, useRef, useState } from 'react';
import { useLetterReveal } from '../hooks/useLetterReveal';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import '../styles/home.css';

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
  const [sparkle, setSparkle] = useState(-1);
  const isWaving = useRef(false);
  const timers = useRef([]);

  // Random sparkle every two seconds, ported from header-animation.js.
  useEffect(() => {
    if (prefersReduced || total === 0) {
      return undefined;
    }

    const id = setInterval(() => {
      setSparkle(Math.floor(Math.random() * total));
      const clear = setTimeout(() => setSparkle(-1), 500);
      timers.current.push(clear);
    }, 2000);

    return () => {
      clearInterval(id);
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
      className={`letter${index < revealed ? ' active' : ''}${
        index === sparkle ? ' is-sparkling' : ''
      }`}
      style={{ '--i': index }}
      aria-hidden="true"
    >
      {char}
    </span>
  );

  return (
    <h1
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
