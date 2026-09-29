import { useFloatAnimation } from '../hooks/useFloatAnimation';
import '../styles/home.css';

/**
 * The floating Clorinde portrait from the bottom right of the home card.
 *
 * animation.js drove this with requestAnimationFrame; useFloatAnimation does
 * the same, but writes CSS custom properties so React is not re-rendering every
 * frame. The "Raahz" caption was a CSS `::after` and is now real markup, which
 * means it can no longer be read by the ::after content in the same way - a
 * small, intentional upgrade.
 */
export default function FloatingCharacter({ src, alt, caption }) {
  const ref = useFloatAnimation();

  return (
    <figure className="card-image__portrait">
      <img className="aim" ref={ref} src={src} alt={alt} />
      {caption ? <figcaption className="aim-caption">{caption}</figcaption> : null}
    </figure>
  );
}
