import { useCallback, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ServicesPage from './components/ServicesPage';
import SoundToggle, {
  readInitialSoundPreference,
} from './components/SoundToggle';
import ThemeToggle from './components/ThemeToggle';
import { useSoundEffects } from './hooks/useSoundEffects';
import { useTheme } from './hooks/useTheme';

/**
 * The original site was two pages: index.html and services.html. They are now
 * two routes, and "Prices & Services" is an in-app link instead of a page
 * load.
 *
 * Unknown paths fall back to the home card, which also covers the
 * `index.html#/services` style links people may have bookmarked.
 *
 * The theme switch is rendered once here so it is reachable from both routes.
 * The sound switch sits beside it for the same reason.
 */
export default function App() {
  const { isDark, toggleTheme } = useTheme();
  const { setEnabled } = useSoundEffects();
  const [soundOn, setSoundOn] = useState(readInitialSoundPreference);

  const toggleSound = useCallback(() => {
    setSoundOn((current) => {
      const next = !current;
      setEnabled(next);
      return next;
    });
  }, [setEnabled]);

  return (
    <>
      <div className="app-toggles">
        <SoundToggle enabled={soundOn} onToggle={toggleSound} />
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}
