import { useEffect, useState } from 'react';
import {
  fallbackPresence,
  manualPresence,
  presenceStates,
} from '../data/status';

/**
 * Is `hour` inside the window? Windows may wrap past midnight, so `from: 22,
 * to: 6` is handled by testing the two halves rather than comparing directly.
 */
function isHourWithin(hour, from, to) {
  if (from === to) {
    return true;
  }

  return from < to ? hour >= from && hour < to : hour >= from || hour < to;
}

function matchesSchedule(schedule, date) {
  if (!schedule) {
    return false;
  }

  const { days = [0, 1, 2, 3, 4, 5, 6], from = 0, to = 24 } = schedule;

  return days.includes(date.getDay()) && isHourWithin(date.getHours(), from, to);
}

/** The manual override wins; otherwise the first scheduled match; else idle. */
function resolve(date) {
  if (manualPresence.id) {
    const pinned = presenceStates.find((state) => state.id === manualPresence.id);
    if (pinned) {
      return pinned;
    }
  }

  return presenceStates.find((state) => matchesSchedule(state.schedule, date)) ??
    fallbackPresence;
}

/**
 * The status to show, re-evaluated on a timer.
 *
 * The timer matters: without it the status would be frozen at whatever the
 * clock said when the page loaded, so someone who keeps the tab open across
 * 7pm would still read "Raahz currently touching some grass". A minute is
 * frequent enough to feel live and cheap enough to ignore.
 */
export function usePresence() {
  const [presence, setPresence] = useState(() => resolve(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => {
      const next = resolve(new Date());

      // Only re-render when the answer actually changed.
      setPresence((current) => (current.id === next.id ? current : next));
    }, 60_000);

    return () => window.clearInterval(id);
  }, []);

  return presence;
}
