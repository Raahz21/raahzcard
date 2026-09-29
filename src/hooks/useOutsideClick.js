import { useEffect } from 'react';

/**
 * Calls `onOutside` when a pointer press lands outside every given ref, or when
 * Escape is pressed. Replaces the document-level listener in index.html and
 * adds the keyboard escape the original was missing.
 */
export function useOutsideClick(refs, onOutside, active = true) {
  useEffect(() => {
    if (!active) {
      return undefined;
    }

    const getNodes = () => refs.map((ref) => ref.current).filter(Boolean);

    const handlePointerDown = (event) => {
      const nodes = getNodes();
      if (nodes.length === 0) {
        return;
      }
      if (nodes.some((node) => node.contains(event.target))) {
        return;
      }
      onOutside();
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onOutside();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, ...refs]);
}
