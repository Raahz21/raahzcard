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

    let offset = 0;
    let direction = 1;
    let angle = 0;

    const tick = () => {
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

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [range, speed, tilt]);

  return ref;
}
