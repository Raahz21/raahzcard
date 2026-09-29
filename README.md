# RaahzCard (React)

A React + Vite conversion of the original static site in
[`Raahz21/raahzcard`](https://github.com/Raahz21/raahzcard) — the "Raahz
Commissions" card for Genshin Impact **piloting services**, plus its price list.

The point of this rewrite is fidelity: the content, imagery, copy and price
tables are the original ones, not a redesign. `src/data/services.js` is
generated straight from the original `services.html`, and every one of the 219
price rows is verified to still render.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview
```

## What it is

Two routes, matching the two original pages:

| Route       | Original file   | Contents |
| ----------- | --------------- | -------- |
| `/`         | `index.html`    | Animated "Raahz Commissions" wordmark, the pilot pitch, the menu (Prices & Services, Vouches, expandable Stickers, Contact), the floating Clorinde portrait and the rotating menu backdrop. |
| `/services` | `services.html` | The full price list: 8 categories, 39 slides, 44 tables, 219 rows, the prev/next carousel, "Back to Home" and the floating decorative artwork. |

`HashRouter` is deliberate. The card is published to GitHub Pages
(`raahz21.github.io/raahzcard/`), where a `BrowserRouter` route such as
`/services` would 404 on refresh. Hash routes need no server rewrite rule.

## Original → React file map

| Original | Now |
| --- | --- |
| `index.html` | `src/components/HomePage.jsx` |
| `services.html` | `src/components/ServicesPage.jsx` |
| `index.css` / `services.css` | `src/styles/home.css` / `src/styles/services.css`, with the duplicated header block factored into `src/styles/base.css` |
| inline in both CSS files | `src/styles/animations.css` |
| `animation.js` | `src/hooks/useFloatAnimation.js` |
| `header-animation.js` | `src/components/AnimatedTitle.jsx` + `useLetterReveal` |
| `wave-animation.js` | merged into one `letterWave` keyframe (see below) |
| inline `<script>` in `index.html` | `MenuSlideshow.jsx`, `StickersDropdown.jsx`, `useOutsideClick` |
| `services.js` | `ServiceNav.jsx` + `ServiceCarousel.jsx` (state, not DOM) |
| empty `index.js` | `src/main.jsx` |
| `img/`, `stickers/` | `public/img/`, `public/stickers/` (verbatim) |

## Theme: monochrome, light or dark

The card is **entirely greyscale** and ships with a light/dark switch in the
top-right corner, available on both routes.

- **Follows the OS** on first visit (`prefers-color-scheme: light`), then
  **remembers your choice** in `localStorage` under `raahzcard-theme`.
- **No flash of the wrong palette** — a small inline script in `index.html`
  applies `data-theme` to `<html>` before first paint, mirroring
  `useTheme`. Dark is the fallback, which is the look the card shipped with.
- `color-scheme` is declared per theme, so native scrollbars and form controls
  match too.

Every colour in the app is a custom property defined once in
`src/styles/base.css` — `--bg-from`, `--surface`, `--text`, `--accent`,
`--glow-strong`, and so on. Both palettes redefine the same set, so switching is
one attribute on `<html>` and no JavaScript touches the DOM styles.

What changed to get here:

| Was | Now |
| --- | --- |
| `#1a1b2f → #2d325a` indigo gradient page | `--bg-from`/`--bg-to` greyscale gradient |
| `rgb(0,162,255)` GITP link, `#4a90e2` sticker links | `--text` with an underline |
| Purple `#9b37c9` text-shadow on menu hover | `--glow-soft` |
| `aim-rgb-glow`: pink → cyan → green → yellow pulse | `portrait-glow`: one grey pulse, two stops |
| Wordmark wave through `#8338d8` / `#4a90e2` | `letterWave` through `--wave-soft`/`--wave-strong` |
| Discount badge cycling the rainbow | `discountCycle` through the text greys |
| Colourful character PNGs | `filter: grayscale(1) contrast(1.05)` on the portrait, stickers and decorative art |

Stickers and the portrait lift back to near-colour on hover, so the artwork is
not permanently drained.

### Keeping it monochrome

```bash
npm run audit:colors
```

Fails if a colour literal (hex, `rgb()`/`rgba()`, or a colour keyword) appears
anywhere outside the two token blocks, and separately if any token value is not
greyscale (`r === g === b`). Worth wiring into CI, since it is the only thing
stopping a future rule from quietly reintroducing a colour.

## The price list is generated

`src/data/services.js` is committed, so nothing extra is needed to run the app.
To regenerate it after changing prices upstream:

```bash
git clone --depth 1 https://github.com/Raahz21/raahzcard.git ..\raahzcard-original
node scripts/generate-services-data.mjs
```

The script parses the original `services.html` and refuses to write the file
unless all eight self-checks pass (table count, slide count, row count, category
count, every slide titled, no empty table, rows match their column count, total
rows preserved). It copes with two quirks in the original markup: four `<tr>`
elements are never closed, and several body rows use `<th>` where you would
expect `<td>`.

## Bugs found in the original

Fixed during the conversion, since these lines were being rewritten anyway:

1. **Two scripts fought over the same hover.** `header-animation.js` and
   `wave-animation.js` both bound `mouseover` to the wordmark, so the bounce and
   the colour wave overwrote each other's `transform`. Now a single
   `letterWave` keyframe with a per-letter delay.
2. **Unguarded re-entry and a leaked interval.** The wave had no re-entry guard
   in one script, and the sparkle `setInterval` was never cleared. Now guarded
   and cleaned up on unmount.
3. **`scrollHeight` hack.** Opening the Stickers panel measured the panel and
   pushed the Contact row down with an inline `marginTop` — unnecessary in a
   flex column.
4. **Dead deep links.** `services.js` resolved `document.getElementById(targetId)`,
   so the `#abyss` … `#quest` anchors were decorative. They are now real
   category state.

## Accessibility changes

Behaviour and appearance are unchanged, but:

- The wordmark's letters are `aria-hidden`, with the phrase exposed once as real
  text (previously every letter was announced separately).
- Category and carousel controls are real `<button>`s with `aria-pressed`,
  `aria-expanded`, `aria-controls` and `aria-label`s, and work from the keyboard.
- Prev/next say which slide they move to, and the slide counter is an
  `aria-live` region.
- Price tables have `<caption>`s plus `scope="col"` and `scope="row"` headers.
- The closed Stickers panel is `hidden`, so its links are not tab-reachable, and
  Escape closes it.
- Visible focus rings, and `prefers-reduced-motion` disables the float, the
  wordmark reveal, the wave and the slideshow rotation.

## Deliberate small additions

- `.total-row` existed in the original markup but had no CSS rule, so totals
  looked like ordinary rows. It now gets a bold, tinted treatment.
- A "Slide X of Y" counter under the carousel, which the original lacked.
- Prev/next are hidden for the one single-slide category (`Oculi`) rather than
  being shown as dead controls.

## Known limitations

- The category nav is a visual list of buttons, not a full ARIA tab pattern, so
  arrow-key navigation between categories is not implemented (Tab and Enter
  work).
- The original contact links are Facebook URLs that may change; they are
  collected in `src/data/site.js` if you need to update them in one place.

## Toolchain note

Pinned to **Vite 6 / @vitejs/plugin-react 4** because that pair supports Node 18
and 20.0+, which includes the Node 20.17 on this machine. React is 19.3 and
react-router is 7.x. On Node `^20.19.0 || >=22.12.0` you can move up:

```bash
npm install -D vite@^8 @vitejs/plugin-react@^6
```

