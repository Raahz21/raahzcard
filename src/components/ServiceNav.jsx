import '../styles/services.css';

/**
 * The category picker. The original used `<a href="#abyss">` links and
 * services.js showed the matching carousel by id; here the links are buttons
 * driven by state, which keeps the same look while being keyboard operable and
 * announcing its pressed state.
 *
 * Note the `category-nav*` class names: these deliberately differ from the home
 * page's `card-image-navbar`. Both stylesheets ship in one bundle, so sharing a
 * class name let the services rules silently override the home menu's - which is
 * what made the home menu's white text render black in light mode.
 */
export default function ServiceNav({ categories, activeId, onSelect }) {
  return (
    <nav className="category-nav" aria-label="Service categories">
      <ul className="category-nav__list">
        {categories.map((category) => {
          const isActive = category.id === activeId;

          return (
            <li className="category-nav__item" key={category.id}>
              <button
                type="button"
                className={`category-nav__link nav-link${isActive ? ' active' : ''}`}
                onClick={() => onSelect(category.id)}
                aria-pressed={isActive}
              >
                {category.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
