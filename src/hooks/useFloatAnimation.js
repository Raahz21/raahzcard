import { useEffect, useRef } from 'react';

/**
 * React port of animation.js: gently floats the portrait up and down while
 * rocking it a couple of degrees, using one requestAnimationFrame loop.
 *
 * The original wrote straight to `aim.style.transform`; here the transform is
 * held in state-free CSS custom properties on the element so React does not
 * re-render 60 times a second.
 *
 * @param {number} range  peak-to-peak travel in pixels
 * @param {number} speed  pixels added per frame
 * @param {number} tilt   maximum rotation in degrees
 */
export function useFloatAnimation(range = 10, speed = 0.8, tilt = 2) {
  const ref = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }

    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (media?.matches) {
      node.style.setProperty('--float-y', '0px');
      node.style.setProperty('--float-rot', '0deg');
      return undefined;
    }

    /* Pause the loop while the tab is in the background. A browser does not
       paint a hidden tab, so every frame this loop computes is thrown away -
       but it still wakes the CPU sixty times a second, which is very noticeable
       on a laptop battery and on a phone. The last position is simply held. */
    let paused = document.hidden;

    const onVisibility = () => {
      paused = document.hidden;
    };

    document.addEventListener('visibilitychange', onVisibility);

    let offset = 0;
    let direction = 1;
    let angle = 0;

    const tick = () => {
      /* Skip the work, but keep the loop alive so it resumes on its own when the
         tab comes back. requestAnimationFrame already stops firing in a hidden
         tab, so in practice this is a belt-and-braces guard for browsers that
         keep it alive for a hidden window. */
      if (!paused) {
        offset += speed * direction;
        if (offset > range) {
          direction = -1;
        }
        if (offset < -range) {
          direction = 1;
        }

        angle += 0.6;
        if (angle >= 360) {
          angle = 0;
        }

        node.style.setProperty('--float-y', `${offset.toFixed(2)}px`);
        node.style.setProperty(
          '--float-rot',
          `${(Math.sin((angle * Math.PI) / 180) * tilt).toFixed(3)}deg`
        );
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [range, speed, tilt]);

  return ref;
}
