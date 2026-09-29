import '../styles/base.css';

/**
 * The decorative frame around the card.
 *
 * Modelled on a sci-fi HUD bezel: chamfered corner brackets, a hatched bar
 * across the top, a matching bar with a diamond at the bottom, dashed side
 * rails, and small hatched accent tabs near the corners.
 *
 * The reference artwork was a wide, landscape bezel. This is the vertical
 * reading of it: the side rails carry most of the length and the top and bottom
 * bars are short, so it suits the tall card. The rails are sized as a
 * percentage of the card's height and the bars of its width, so one set of
 * rules serves both pages and any card size.
 *
 * It is drawn entirely from the card's own ink colour, so it stays monochrome
 * and flips with the theme. It is `aria-hidden` and ignores pointer events:
 * it carries no information, so it must not be announced or clickable.
 */
export default function CardFrame() {
  return (
    <div className="hud" aria-hidden="true">
      {/* Corner brackets. One shape, mirrored and flipped per corner. */}
      <span className="hud-corner hud-corner--tl" />
      <span className="hud-corner hud-corner--tr" />
      <span className="hud-corner hud-corner--br" />
      <span className="hud-corner hud-corner--bl" />

      {/* Diagonal hatch accents flanking the top bar. */}
      <span className="hud-tick hud-tick--tl" />
      <span className="hud-tick hud-tick--tr" />

      <span className="hud-bar hud-bar--top" />

      <span className="hud-bar hud-bar--bottom">
        <span className="hud-bar__diamond" />
      </span>

      <span className="hud-rail hud-rail--left" />
      <span className="hud-rail hud-rail--right" />

      {/* Hatched tabs at the bottom corners, as in the reference. */}
      <span className="hud-tab hud-tab--bl" />
      <span className="hud-tab hud-tab--br" />
    </div>
  );
}
