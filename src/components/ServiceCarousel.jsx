import PriceTable from './PriceTable';
import SlidePicker from './SlidePicker';
import '../styles/services.css';

/**
 * One carousel slide set for a category, with the manual prev/next controls
 * from services.js.
 *
 * Prev/next wrap around, exactly as the original did, and the container is
 * keyed on the slide index so the CSS fade animation replays on every change
 * (the original relied on re-adding `.active` to do the same).
 */
export default function ServiceCarousel({ category, index, onIndexChange }) {
  const slides = category.slides;
  const slide = slides[index];
  const hasMultiple = slides.length > 1;

  const go = (delta) => {
    onIndexChange((index + delta + slides.length) % slides.length);
  };

  return (
    <div className="carousel" id={category.id}>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <h3>{slide.title}</h3>

          {slide.tables.map((table, tableIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <PriceTable key={tableIndex} table={table} slideTitle={slide.title} />
          ))}
        </div>
      </div>

      {hasMultiple ? (
        <>
          {/* Named per category so the label reads correctly: "Region" for
              Exploration, "Chapter" for Quest, and so on. */}
          <SlidePicker
            slides={slides}
            index={index}
            onChange={onIndexChange}
            label={category.pickerLabel || 'Section'}
          />

          <div className="carousel-nav">
            <button
              type="button"
              className="nav-button prev"
              onClick={() => go(-1)}
              aria-label={`Previous: ${slide.title}`}
            >
              ←
            </button>

            <p className="carousel-status" aria-live="polite">
              {index + 1} of {slides.length}
            </p>

            <button
              type="button"
              className="nav-button next"
              onClick={() => go(1)}
              aria-label={`Next: ${slide.title}`}
            >
              →
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
