import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';

import './styles/base.css';
import './styles/animations.css';

/**
 * HashRouter is deliberate: the card is published to GitHub Pages
 * (raahz21.github.io/raahzcard/), where a BrowserRouter route like
 * /services would 404 on refresh. Hash routes need no server rewrite rule.
 */
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
