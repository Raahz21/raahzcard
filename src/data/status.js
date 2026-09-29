/**
 * Presence data for the Discord-style status strip.
 *
 * ---------------------------------------------------------------------------
 * Why this is a file and not live detection
 * ---------------------------------------------------------------------------
 * The browser runs sandboxed: it cannot see whether Spotify is playing, which
 * window VSCode has open, or what game is running. Only a native app could read
 * that, and this site is a static build published to GitHub Pages, so there is
 * no process to ask. The status is therefore declared here rather than
 * detected.
 *
 * Two ways to drive it:
 *
 * 1. `manualPresence` - set an `id` from the list below and it always wins.
 *    Useful for "I am piloting right now" during a stream, and it survives
 *    forgetting that a schedule is active.
 *
 * 2. `schedule` on each entry - a day/hour window. The first entry whose window
 *    contains the visitor's local time is shown, so "Raahz currently sleeping"
 *    appears at night with no edits at all. Note these are the *visitor's*
 *    clock, not yours; a shared site therefore shows each person their own
 *    local time, which is usually what you want for flavour text.
 *
 * `presence` drives the status dot. The site is deliberately monochrome and
 * `scripts/audit-colors.mjs` rejects any non-greyscale token, so the dot cannot
 * be Discord's green/yellow/red - it uses weight and opacity of the theme ink
 * instead. Relax that check if you ever want the real colours.
 */

/**
 * The override. Set `id` to any entry's id to pin that status, or leave it null
 * to let the schedule decide.
 *
 *   manualPresence.id = 'piloting';
 */
export const manualPresence = { id: null };

/**
 * Shown when nothing else matches - for example a schedule with no entry
 * covering the current hour.
 */
export const fallbackPresence = {
  id: 'idle',
  label: 'Raahz currently idling',
  icon: 'moon',
  presence: 'idle',
};

const EVERY_DAY = [0, 1, 2, 3, 4, 5, 6];

/**
 * Ordered list; the first match wins, so put the specific entries above the
 * catch-all ones.
 *
 * `schedule.days` uses 0 = Sunday. `from`/`to` are local hours and may wrap
 * past midnight (from: 22, to: 6 covers the small hours).
 */
export const presenceStates = [
  {
    id: 'piloting',
    label: 'Raahz currently piloting for a client',
    icon: 'gamepad',
    presence: 'busy',
    // No schedule: only ever shown via manualPresence.
  },
  {
    id: 'sleeping',
    label: 'Raahz currently sleeping',
    icon: 'moon',
    presence: 'offline',
    schedule: { days: EVERY_DAY, from: 0, to: 7 },
  },
  {
    id: 'grass',
    label: 'Raahz currently touching some grass',
    icon: 'leaf',
    presence: 'idle',
    schedule: { days: EVERY_DAY, from: 7, to: 11 },
  },
  {
    id: 'breakfast',
    label: 'Raahz currently having breakfast',
    icon: 'coffee',
    presence: 'online',
    schedule: { days: EVERY_DAY, from: 11, to: 13 },
  },
  {
    id: 'vscode',
    label: 'Raahz currently developing in Visual Studio Code',
    app: 'vscode',
    presence: 'online',
    schedule: { days: EVERY_DAY, from: 13, to: 19 },
  },
  {
    id: 'games',
    label: 'Raahz currently playing games on Steam',
    app: 'steam',
    presence: 'online',
    // Ends at 21 so it does not overlap the Discord block below. The resolver
    // takes the FIRST match, so an entry listed earlier silently wins any hours
    // it shares with a later one - which would make the later entry unreachable.
    schedule: { days: [1, 2, 3, 4, 5], from: 19, to: 21 },
  },
  {
    id: 'discord',
    label: 'Raahz currently chatting on Discord',
    app: 'discord',
    presence: 'online',
    // Weekday evenings, after the gaming block.
    schedule: { days: [1, 2, 3, 4, 5], from: 21, to: 23 },
  },
  {
    id: 'spotify',
    label: 'Raahz currently listening to Spotify',
    app: 'spotify',
    presence: 'online',
    // Weekends only, and only late.
    schedule: { days: [0, 6], from: 19, to: 23 },
  },
  {
    id: 'decompressing',
    label: 'Raahz currently decompressing',
    icon: 'coffee',
    presence: 'idle',
    schedule: { days: EVERY_DAY, from: 23, to: 24 },
  },
];
