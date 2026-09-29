import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CardFrame from './CardFrame';
import DecorativeIcons from './DecorativeIcons';
import ServiceCarousel from './ServiceCarousel';
import ServiceNav from './ServiceNav';
import { decorativeIcons } from '../data/site';
/* The merged catalogue, not services.js directly: that file is generated from
   the old plain-HTML site, and the Nodkrai / Snezhnaya data lives alongside it
   in services-new-regions.js. serviceCatalog combines the two. */
import { serviceCategories } from '../data/serviceCatalog';
import '../styles/services.css';

/**
 * The price list - a port of services.html.
 *
 * services.js hid every carousel except the first and swapped the visible one
 * when a nav link was clicked. That display logic is now React state: the
 * active category, plus a remembered slide index per category so switching back
 * and forth does not reset you to the first slide.
 */
export default function ServicesPage() {
  const [activeId, setActiveId] = useState(serviceCategories[0].id);
  const [indexes, setIndexes] = useState({});

  /* The horizontal scroller. Tapping a category swaps in a table with a
     different number of columns, but the *element* is the same, so the browser
     keeps whatever scrollLeft it had. That is what made the page look like it
     changed by itself: you tapped a chip and landed halfway across a different
     table, with the first column frozen and no idea which one you were on. */
  const panelRef = useRef(null);

  const category =
    serviceCategories.find((item) => item.id === activeId) ?? serviceCategories[0];
  const index = indexes[category.id] ?? 0;

  const handleIndexChange = (next) => {
    setIndexes((previous) => ({ ...previous, [category.id]: next }));
  };

  /* Runs after the new table is in the DOM but before the browser paints, so
     the reset is never visible as a jump. */
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    // Always start a newly shown table at its first column.
    panel.scrollLeft = 0;

    /* Categories have very different row counts - one is a six-row list, the
       next is thirty. The page therefore changes height underneath the user, and
       on a phone that scroll position is no longer pointing at the new table.
       Only scroll when the panel has actually left the viewport, so a tap that
       is already looking at the panel does not yank the page. */
    const box = panel.getBoundingClientRect();

    /* Leave room for the sticky category chips, so the panel never lands
       hidden underneath them. Matches --panel-anchor-offset in services.css. */
    const offset = Number.parseFloat(
      getComputedStyle(panel).getPropertyValue('--panel-anchor-offset'),
    );

    if (box.top < offset || box.bottom > window.innerHeight) {
      panel.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, [category.id, index]);

  return (
    <>
      <div className="card card--services">
        <CardFrame />

        <div className="card-header">
          <h1>Services &amp; Prices</h1>
        </div>

        <div className="card-body">
        <div className="service-layout">
          <ServiceNav
            categories={serviceCategories}
            activeId={category.id}
            onSelect={setActiveId}
          />

          <div className="price-content" ref={panelRef}>
            <div className="scroll-reminder">
              Swipe or scroll sideways <i>↔</i> for more columns
            </div>

            <ServiceCarousel
              // Remounting on category/slide change replays the fade animation.
              key={`${category.id}-${index}`}
              category={category}
              index={index}
              onIndexChange={handleIndexChange}
            />
          </div>
        </div>

        <div className="service-footer">
          <Link className="btn" to="/">
            Back to Home
          </Link>
        </div>
        </div>
      </div>

      <DecorativeIcons icons={decorativeIcons} />
    </>
  );
}
