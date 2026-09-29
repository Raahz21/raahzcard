import { useState } from 'react';
import { Link } from 'react-router-dom';
import CardFrame from './CardFrame';
import DecorativeIcons from './DecorativeIcons';
import ServiceCarousel from './ServiceCarousel';
import ServiceNav from './ServiceNav';
import { decorativeIcons } from '../data/site';
import { serviceCategories } from '../data/services';
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

  const category =
    serviceCategories.find((item) => item.id === activeId) ?? serviceCategories[0];
  const index = indexes[category.id] ?? 0;

  const handleIndexChange = (next) => {
    setIndexes((previous) => ({ ...previous, [category.id]: next }));
  };

  return (
    <>
      <div className="card">
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

          <div className="price-content">
            <div className="scroll-reminder">
              Scroll horizontally <i>⟷</i> to view all prices
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
