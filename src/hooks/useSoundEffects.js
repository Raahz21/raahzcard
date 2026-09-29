import { useCallback, useEffect, useRef } from 'react';
import { asset } from '../data/site';

export const SOUND_STORAGE_KEY = 'raahzcard-sound';

/** Kept low: these are UI blips, not music. */
const VOLUME = 0.35;

/**
 * Only elements that behave like a control get a sound. Deliberately narrow:
 * a page full of links that chirp is noise, and the site has a lot of links.
 */
const CLICKABLE = 'button, .nav-link, [role="button"]';

/**
 * Plays a short sound when the pointer enters a control, and another when it is
 * activated. Both files came from Floraphonic (90s Game UI 3 and Arcade UI 6).
 *
 * Two things make this more than a `new Audio()` in a click handler:
 *
 * 1. **Autoplay policy.** Browsers refuse to start audio until the page has had
 *    a user gesture, so `play()` rejects with a NotAllowedError on the very
 *    first attempt. The rejection is swallowed rather than left unhandled -
 *    an unhandled promise rejection would surface as a console error and, in
 *    some setups, trip error reporting. Once any real interaction has happened
 *    the sounds work normally, so the first hover is simply the one that is
 *    missed.
 *
 * 2. **Replay.** A 1s clip that has already played will not play again unless
 *    `currentTime` is rewound, so every trigger resets it. Without this, the
 *    second hover over the same button is silent.
 *
 * Hover is ignored on touch: those devices synthesise a hover event when a tap
 * lands, which would double up with the click sound.
 *
 * Listeners are delegated from the document rather than attached per element,
 * so the buttons do not each need to know about sound, and buttons added later
 * (the carousel, the services nav) are covered for free.
 */
export function useSoundEffects() {
  const clickRef = useRef(null);
  const hoverRef = useRef(null);
  const enabledRef = useRef(true);

  // Read the saved preference once, before the first effect, so the very first
  // hover already respects it.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(SOUND_STORAGE_KEY);
      if (stored === 'off') {
        enabledRef.current = false;
      }
    } catch (error) {
      // localStorage can be blocked; sound simply stays at its default
    }

    const click = new Audio(asset('audio/click.mp3'));
    const hover = new Audio(asset('audio/hover.mp3'));

    click.preload = 'auto';
    hover.preload = 'auto';
    click.volume = VOLUME;
    hover.volume = VOLUME;

    clickRef.current = click;
    hoverRef.current = hover;

    return () => {
      click.pause();
      hover.pause();
      clickRef.current = null;
      hoverRef.current = null;
    };
  }, []);

  const play = useCallback((clip) => {
    if (!enabledRef.current || !clip) {
      return;
    }

    try {
      clip.currentTime = 0;
      // Autoplay policy rejects until the first gesture; that is expected.
      const result = clip.play();
      if (result?.catch) {
        result.catch(() => {});
      }
    } catch (error) {
      // A missing or undecodable clip must never break the interaction.
    }
  }, []);

  useEffect(() => {
    const onPointerOver = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') {
        return;
      }

      const target = event.target?.closest?.(CLICKABLE);
      if (!target || target === event.relatedTarget?.closest?.(CLICKABLE)) {
        return;
      }

      play(hoverRef.current);
    };

    const onClick = (event) => {
      const target = event.target?.closest?.(CLICKABLE);
      if (!target) {
        return;
      }

      play(clickRef.current);
    };

    document.addEventListener('pointerover', onPointerOver);
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('click', onClick);
    };
  }, [play]);

  const setEnabled = useCallback((next) => {
    enabledRef.current = next;

    try {
      window.localStorage.setItem(SOUND_STORAGE_KEY, next ? 'on' : 'off');
    } catch (error) {
      // Persisting is a nicety, not a requirement
    }
  }, []);

  return { setEnabled };
}
