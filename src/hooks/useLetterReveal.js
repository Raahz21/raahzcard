import { useEffect, useState } from 'react';

/**
 * Returns how many letters are currently revealed, incrementing one at a time.
 *
 * This is the React equivalent of the staggered `setTimeout` loop in
 * header-animation.js, but expressed as state rather than poking classes on
 * the DOM.
 *
 * @param {number} count   total letters to reveal
 * @param {number} step    delay between letters, in milliseconds
 * @param {boolean} instant reveal everything at once (reduced motion)
 */
export function useLetterReveal(count, step = 100, instant = false) {
  const [revealed, setRevealed] = useState(instant ? count : 0);

  useEffect(() => {
    if (count === 0 || instant) {
      return undefined;
    }

    const timers = Array.from({ length: count }, (_, index) =>
      setTimeout(() => setRevealed(index + 1), step * index)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [count, step, instant]);

  return revealed;
}
