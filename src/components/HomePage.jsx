import AnimatedTitle from './AnimatedTitle';
import CardFrame from './CardFrame';
import DealBanner from './DealBanner';
import FloatingCharacter from './FloatingCharacter';
import NavMenu from './NavMenu';
import PresenceCard from './PresenceCard';
import { brand, links, portrait } from '../data/site';
import '../styles/home.css';

/**
 * The home card - a direct port of index.html.
 *
 * The pilot copy stays as JSX rather than moving into site.js: it is prose with
 * inline emphasis and one inline link, so splitting it into data segments would
 * make it harder to read, not easier.
 */
export default function HomePage() {
  return (
    <div className="card">
      <CardFrame />

      <div className="card-header">
        <AnimatedTitle name={brand.name} tagline={brand.tagline} />
      </div>

      <div className="card-body">
        <PresenceCard />

        <p>
          🌟 <strong>Your Trusted Genshin Pilot</strong> 🌟
          <br />
          <br />
          <strong>Fast. Reliable. Professional.</strong>
          <br />
          I’m an <strong>independent pilot</strong> and{' '}
          <strong>verified member</strong> on the{' '}
          <a
            className="page"
            href={links.gitpPage}
            target="_blank"
            rel="noopener noreferrer"
          >
            GITP Facebook page
          </a>{' '}
          — delivering premium piloting services with <strong>100% account safety</strong>{' '}
          and <strong>full confidentiality</strong>.
          <br />
          <br />
          Whether you need help with exploration, farming, or tough events — I deliver{' '}
          <strong>swift results with care</strong> and{' '}
          <strong>respect for your account</strong>.
          <br />
          <br />
          ✨ Trusted by many. Secured like it’s mine.{' '}
          <strong>Your progress, my priority.</strong> ✨
        </p>
      </div>

      <div className="card-image">
        {/* Portrait first, then the menu: the grid stacks them, so the art sits
            above the navbar. Keeping the DOM in that order means the visual
            order and the tab order agree. */}
        <FloatingCharacter src={portrait.src} alt={portrait.alt} caption={brand.portraitCaption} />
        <NavMenu />
      </div>

      <DealBanner />
    </div>
  );
}
