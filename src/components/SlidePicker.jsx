/**
 * Picks which section of a category is shown - the region for Exploration, the
 * chapter for Quest, the ascension type for Ascension.
 *
 * The categories are uneven: Oculi has one section, while Exploration has 16 and
 * Quest has 17. Prev/next arrows alone made those two effectively
 * un-navigable, because there was no way to see what the arrows were moving
 * between and no way to jump. This is a native <select>, so it:
 *
 *   - lists every section by name, so the whole category is visible at once;
 *   - opens as the platform's own picker on a phone, which is far easier to
 *     use than a custom menu inside a scrolling card;
 *   - is keyboard and screen-reader accessible for free, with no listbox
 *     semantics to get wrong.
 *
 * The title is stripped of its leading emoji before display. The emoji are
 * decorative, and in a closed select control they either render as a tofu box or
 * push the text out of alignment depending on the platform font - so they are
 * hidden from assistive tech here and shown in the option text only where the
 * platform renders emoji reliably.
 */
export default function SlidePicker({ slides, index, onChange, label }) {
  if (slides.length < 2) {
    return null;
  }

  const handle = (event) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className="slide-picker">
      <label className="slide-picker__label" htmlFor="slide-picker-select">
        {label}
      </label>

      <div className="slide-picker__control">
        <select
          id="slide-picker-select"
          className="slide-picker__select"
          value={index}
          onChange={handle}
        >
          {slides.map((slide, slideIndex) => (
            <option key={`${slide.title}-${slideIndex}`} value={slideIndex}>
              {slide.title}
            </option>
          ))}
        </select>

        {/* A purely decorative caret. The real control is the select above, so
            this is hidden from assistive tech rather than being a button. */}
        <span className="slide-picker__caret" aria-hidden="true" />
      </div>
    </div>
  );
}
