import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import '../styles/services.css';

/**
 * The faint character art scattered around the services page.
 *
 * Decorative only, so it is hidden from assistive tech; the position classes
 * come straight from services.css so the float animations still apply.
 *
 * The sixteen float animations are the single most expensive thing on the page
 * when left running, and they are invisible most of the time. Two situations
 * make them pure waste, so both pause them:
 *
 *   - the tab is in the background, where a browser cannot paint them anyway;
 *   - the reader has asked for reduced motion.
 *
 * The pause is `animation-play-state`, so the artwork freezes where it is and
 * resumes without a jump rather than restarting.
 */
export default function DecorativeIcons({ icons }) {
  const prefersReduced = usePrefersReducedMotion();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    /* Runs after paint on the first render, so the initial value stays false
       and the icons animate immediately on a normal visit. */
    const sync = () => setHidden(document.hidden);
    sync();

    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);

  const idle = hidden || prefersReduced;

  return (
    <div
      className={`decorative-icons${idle ? ' is-idle' : ''}`}
      aria-hidden="true"
    >
      {icons.map((icon, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <img
          key={`${icon.position}-${index}`}
          className={`icon${icon.small ? ' icon-small' : ''} ${icon.position}`}
          src={icon.src}
          alt=""
          aria-hidden="true"
          /* These are 64px (or 32px) boxes, but the files are far larger. Without
             an explicit size the browser cannot reserve the space while decoding,
             which nudges the layout as each one arrives. */
          width={icon.small ? 32 : 64}
          height={icon.small ? 32 : 64}
          /* Decorative and below the fold of a phone screen: not worth
             competing for bandwidth with the price table. */
          loading="lazy"
          decoding="async"
        />
      ))}
    </div>
  );
}
