import { usePresence } from '../hooks/usePresence';
import '../styles/presence.css';

/**
 * Application marks, for statuses that name a specific program.
 *
 * These are hand-drawn monochrome renditions rather than the vendors' official
 * logo files: shipping the real Spotify or VS Code artwork would pull in their
 * trademarks, and the official assets are usually one specific brand colour,
 * which this monochrome palette cannot use anyway. Drawn as plain
 * `currentColor` geometry they inherit the theme instead, and they cost no
 * network request.
 *
 * Two rendering styles, because the marks differ in nature:
 *   - `fill`   - solid logos (VS Code, Discord, Steam) that are a single shape.
 *   - `stroke` - marks made of an outline plus interior lines (Spotify), which
 *                only read correctly as outlines.
 */
const APP_MARKS = {
  spotify: {
    mode: 'stroke',
    children: (
      <>
        <circle cx="12" cy="12" r="9.2" />
        <path d="M6.9 9.3c3-1.2 6.7-1 9.6.2" />
        <path d="M7.4 12.6c2.4-.9 5.3-.7 7.7.2" />
        <path d="M7.9 15.7c1.7-.6 3.9-.5 5.6.2" />
      </>
    ),
  },
  vscode: {
    mode: 'stroke',
    children: (
      <>
        {/* The folded ribbon: a long point, a fold line, and the notched tail. */}
        <path d="M23.4 8.1 13 12l10.4 3.9-2.7 1.2-9.8-4.6-9.5 6.3V5.1l9.5 6.3 9.8-4.6 2.7 1.2Z" />
        <path d="M2.2 12h4.4" />
      </>
    ),
  },
  steam: {
    mode: 'stroke',
    children: (
      <>
        {/* Outer ring, two hubs joined by the connecting arm. */}
        <circle cx="12" cy="12" r="10.6" />
        <circle cx="15.6" cy="8.4" r="3.6" />
        <circle cx="15.6" cy="8.4" r="1.5" fill="currentColor" stroke="none" />
        <path d="M13.1 10.6 9.2 14.4" />
        <circle cx="7.8" cy="15.8" r="2.8" />
      </>
    ),
  },
  discord: {
    mode: 'fill',
    children: (
      <>
        <path d="M19.3 5.4A16.2 16.2 0 0 0 15.4 4l-.3.6a14 14 0 0 1 3.4 1.2 12.6 12.6 0 0 0-10.9 0A14 14 0 0 1 11 4.6L10.7 4a16.2 16.2 0 0 0-3.9 1.4C4.3 9.2 3.6 12.8 4 16.4a16.3 16.3 0 0 0 5 2.5l.9-1.5a10.6 10.6 0 0 1-1.7-.8l.4-.3a11.6 11.6 0 0 0 9.9 0l.4.3a10.6 10.6 0 0 1-1.7.8l.9 1.5a16.3 16.3 0 0 0 5-2.5c.4-4.2-.6-7.9-2.9-11Z" />
        <ellipse cx="9.4" cy="12.6" rx="1.5" ry="1.7" />
        <ellipse cx="14.6" cy="12.6" rx="1.5" ry="1.7" />
      </>
    ),
  },
};

/**
 * Line icons, for statuses that describe a state rather than a program
 * (sleeping, on a break, and so on). Matching the stroke style of the theme
 * switch, drawn with `currentColor` and no fills.
 */
const ICONS = {
  moon: (
    <path d="M20.5 14.3A8.6 8.6 0 0 1 9.7 3.5a8.6 8.6 0 1 0 10.8 10.8Z" />
  ),
  leaf: (
    <>
      <path d="M4.5 19.5c0-8 5-13 15-13 0 9-4.6 13.5-11 13.5" />
      <path d="M4.5 19.5C7 14 11 10.5 16 9" />
    </>
  ),
  coffee: (
    <>
      <path d="M4 9h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z" />
      <path d="M17 10.5h1.8a2.7 2.7 0 0 1 0 5.4H17" />
      <path d="M7.5 2.5v3M11 2.5v3" />
    </>
  ),
  code: (
    <>
      <path d="M8.6 6.5 3.5 12l5.1 5.5" />
      <path d="M15.4 6.5 20.5 12l-5.1 5.5" />
      <path d="M13.4 4.2l-2.8 15.6" />
    </>
  ),
  music: (
    <>
      <path d="M9 17.5V5.2l10-2v12.1" />
      <path d="M9 17.5a2.6 2.6 0 1 1-5.2 0 2.6 2.6 0 0 1 5.2 0Z" />
      <path d="M19 15.3a2.6 2.6 0 1 1-5.2 0 2.6 2.6 0 0 1 5.2 0Z" />
    </>
  ),
  gamepad: (
    <>
      <rect x="2.5" y="7.5" width="19" height="10" rx="4.5" />
      <path d="M7 10.5v4M5 12.5h4" />
      <path d="M15.4 11.6h.01M17.9 13.9h.01" />
    </>
  ),
};

/**
 * The status strip, in the style of a Discord presence line.
 *
 * `aria-live="polite"` is deliberate: the status changes on its own as the
 * clock crosses into the next scheduled window, and a screen reader user would
 * otherwise get no warning that the text under them had been rewritten.
 */
export default function PresenceCard() {
  const presence = usePresence();

  /*
   * An `app` mark is preferred when the status names a program, because that is
   * what makes the line recognisable at a glance. Otherwise fall back to the
   * generic line icon, and finally to the moon so an unknown key can never
   * render an empty box.
   */
  const app = presence.app ? APP_MARKS[presence.app] : null;
  const art = app ? app.children : (ICONS[presence.icon] ?? ICONS.moon);
  const filled = app?.mode === 'fill';

  return (
    <div className="presence" data-presence={presence.presence} aria-live="polite">
      <span className="presence__dot" aria-hidden="true" />

      <svg
        className="presence__icon"
        viewBox="0 0 24 24"
        fill={filled ? 'currentColor' : 'none'}
        stroke={filled ? 'none' : 'currentColor'}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        {art}
      </svg>

      <p className="presence__label">{presence.label}</p>
    </div>
  );
}
