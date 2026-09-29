import { SOUND_STORAGE_KEY } from '../hooks/useSoundEffects';

const SoundOnIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M4 9.5h3.2L12 5.4v13.2L7.2 14.5H4z" />
    <path d="M15.8 9.4a3.6 3.6 0 0 1 0 5.2" />
    <path d="M18.4 6.9a7 7 0 0 1 0 10.2" />
  </svg>
);

const SoundOffIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M4 9.5h3.2L12 5.4v13.2L7.2 14.5H4z" />
    <path d="M16.2 10.2l4.4 3.6M20.6 10.2l-4.4 3.6" />
  </svg>
);

/**
 * Mutes the interface sounds.
 *
 * Sound is on by default, which is a real accessibility concern: a site that
 * chirps on every hover is hostile to anyone using a screen reader, and
 * autoplaying UI audio is jarring rather than charming. This gives a visible,
 * keyboard-reachable way to turn it off, and the choice is remembered.
 */
export default function SoundToggle({ enabled, onToggle }) {
  const label = enabled ? 'Mute interface sounds' : 'Unmute interface sounds';

  return (
    <button
      type="button"
      className="sound-toggle"
      onClick={onToggle}
      aria-pressed={enabled}
      aria-label={label}
      title={label}
    >
      {enabled ? (
        <SoundOnIcon className="sound-toggle__icon" />
      ) : (
        <SoundOffIcon className="sound-toggle__icon" />
      )}
    </button>
  );
}

/** Reads the stored preference so the toggle renders in the right state. */
export function readInitialSoundPreference() {
  if (typeof window === 'undefined') {
    return true;
  }

  try {
    return window.localStorage.getItem(SOUND_STORAGE_KEY) !== 'off';
  } catch (error) {
    return true;
  }
}