import '../styles/services.css';

/**
 * The faint character art scattered around the services page.
 *
 * Decorative only, so it is hidden from assistive tech; the position classes
 * come straight from services.css so the float animations still apply.
 */
export default function DecorativeIcons({ icons }) {
  return (
    <div className="decorative-icons" aria-hidden="true">
      {icons.map((icon, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <img
          key={`${icon.position}-${index}`}
          className={`icon${icon.small ? ' icon-small' : ''} ${icon.position}`}
          src={icon.src}
          alt=""
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
