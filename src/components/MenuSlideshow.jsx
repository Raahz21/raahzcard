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

    /* Each tick swaps a full-bleed background image and runs an 800ms cross-fade,
       so the rotation is one of the more expensive things on the home page. There
       is no reason to pay for it while the tab is in the background: nothing is
       being watched, and returning to a tab that has cycled through four unseen
       images is disorienting. The timer is therefore cleared while hidden and
       started fresh on return, so the first image the user sees is always the
       one that was showing when they left. */
    let id = null;

    const start = () => {
      if (id === null) {
        id = setInterval(() => {
          setIndex((current) => (current + 1) % images.length);
        }, INTERVAL);
      }
    };

    const stop = () => {
      if (id !== null) {
        clearInterval(id);
        id = null;
      }
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
