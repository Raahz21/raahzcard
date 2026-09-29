import { dealBanner } from '../data/site';
import '../styles/home.css';

/**
 * The limited-time deal that was commented out in index.html.
 *
 * It renders nothing while `dealBanner.enabled` is false, so the live card
 * looks exactly like the original, but a promotion can be switched on from
 * src/data/site.js without touching this component.
 */
export default function DealBanner() {
  if (!dealBanner.enabled) {
    return null;
  }

  return (
    <div className="card-footer">
      <p>
        <strong>{dealBanner.heading}</strong>
        <br />
        {dealBanner.deals.map((deal) => (
          <span key={deal.amount}>
            💸 <span className={deal.tone}>{deal.amount}</span> on{' '}
            <strong>{deal.condition}</strong>
            <br />
          </span>
        ))}
        {dealBanner.footer}
      </p>
    </div>
  );
}
