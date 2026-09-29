import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuSlideshow from './MenuSlideshow';
import { StickersPanel, StickersToggle } from './Stickers';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { menuSlideshow, navItems, stickers } from '../data/site';
import '../styles/home.css';

/**
 * The home menu: Prices & Services (a route into the price list), Vouches,
 * the expandable Stickers panel, and Contact.
 *
 * "Prices & Services" pointed at services.html in the original and is now a
 * react-router link. Vouches and Contact keep their original behaviour of
 * loading in the same tab.
 *
 * The Stickers panel is a sibling of the <ul> rather than a child of its <li>:
 * the menu is a chip grid, so an <li> is only about one chip wide and a panel
 * inside it would be crushed. Out here it spans the full dark panel.
 */
export default function NavMenu() {
  const [stickersOpen, setStickersOpen] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  useOutsideClick([toggleRef, panelRef], () => setStickersOpen(false), stickersOpen);

  return (
    <nav className="card-image-navbar" aria-label="Main">
      <MenuSlideshow images={menuSlideshow} />

      <ul>
        {navItems.map((item) => (
          <li key={item.id}>
            {item.dropdown ? (
              <StickersToggle
                ref={toggleRef}
                label={item.label}
                open={stickersOpen}
                onToggle={() => setStickersOpen((value) => !value)}
              />
            ) : item.to ? (
              <Link className="nav-link" to={item.to}>
                {item.label}
              </Link>
            ) : (
              <a className="nav-link" href={item.href} rel="noopener noreferrer">
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>

      <StickersPanel ref={panelRef} open={stickersOpen} stickers={stickers} />
    </nav>
  );
}
