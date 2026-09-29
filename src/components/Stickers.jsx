import { forwardRef } from 'react';

/**
 * The Stickers entry, split in two so the panel can sit *outside* the chip grid.
 *
 * It used to live inside the menu's <li>, which used to be a full-width list row.
 * Once the menu became a chip grid that cell is only ~160px wide, so the three
 * stickers were crushed into it. Rendering the panel as a sibling of the <ul>
 * gives it the full width of the dark panel instead.
 *
 * The button is a real disclosure: aria-expanded, aria-controls, and the panel
 * carries `hidden` so its links are not reachable by keyboard while closed.
 */

export const StickersToggle = forwardRef(function StickersToggle(
  { label = 'Stickers', open, onToggle },
  ref
) {
  return (
    <button
      type="button"
      id="stickers-toggle"
      ref={ref}
      className="nav-link"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="stickers-panel"
    >
      <span>{label}</span>
      <span className={`stickers-toggle__caret${open ? ' is-open' : ''}`} aria-hidden="true" />
    </button>
  );
});

export const StickersPanel = forwardRef(function StickersPanel({ open, stickers }, ref) {
  return (
    <div
      className="stickers-panel"
      id="stickers-panel"
      ref={ref}
      hidden={!open}
      role="group"
      aria-label="Stickers"
    >
      {stickers.map((sticker) => (
        <article className="sticker-item" key={sticker.id}>
          {/*
            * All three stickers are transparent PNGs, so the image renders
            * plainly with no blend mode. The GITP sticker used to be a JPEG
            * whose black background could only be faked with
            * `mix-blend-mode: screen`; it is now keyed to real alpha at build
            * time by scripts/extract-sticker-alpha.mjs.
            */}
          <span className="sticker-item__frame">
            <img
              className="sticker-item__image"
              src={sticker.src}
              alt={sticker.label}
              width="144"
              height="144"
              loading="lazy"
              decoding="async"
            />
          </span>
          <h3 className="sticker-label">{sticker.label}</h3>
          <a
            className="sticker-link"
            href={sticker.postUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Facebook
          </a>
        </article>
      ))}
    </div>
  );
});
