import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import '../styles/home.css';

const INTERVAL = 1500;

/**
 * Rotating backdrop behind the home menu.
 *
 * The original swapped `background-image` on a single element while fading it
 * out (800ms out, swap, fade back in). Two stacked layers give the same
 * cross-fade without timer juggling, and let the markup stay declarative.
 */
export default function MenuSlideshow({ images }) {
  const prefersReduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReduced || images.length < 2) {
      return undefined;
    }

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, INTERVAL);

    return () => clearInterval(id);
  }, [images.length, prefersReduced]);

  if (images.length === 0) {
    return null;
  }

  const current = images[index % images.length];
  const previous = images[(index - 1 + images.length) % images.length];

  return (
    <div className="menu-bg-slideshow" aria-hidden="true">
      <span
        className="menu-bg-slideshow__layer is-current"
        style={{ backgroundImage: `url("${current}")` }}
      />
      <span
        className="menu-bg-slideshow__layer"
        style={{ backgroundImage: `url("${previous}")` }}
      />
    </div>
  );
}
