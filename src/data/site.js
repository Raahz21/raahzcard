/**
 * Links, imagery and navigation for the card.
 *
 * The price list is NOT here - it is generated into services.js because it is
 * 44 tables of markup. See scripts/generate-services-data.mjs.
 */

/**
 * Base-aware asset prefix. The original used relative paths such as
 * `img/aim.png`; going through BASE_URL keeps them working when the build is
 * served from a sub-path (GitHub Pages: https://raahz21.github.io/raahzcard/).
 */
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${path}`.replace(/([^:])\/{2,}/g, '$1/');

export const brand = {
  name: 'Raahz',
  tagline: 'Commissions',
  /** Rendered under the floating portrait, exactly as the CSS ::after did. */
  portraitCaption: 'Raahz',
};

export const links = {
  gitpPage: 'https://www.facebook.com/share/g/1JF7We1uPi/',
  vouches: 'https://www.facebook.com/share/p/16hvQsRFXb/',
  contact: 'https://www.facebook.com/profile.php?id=61576585464156',
};

export const navItems = [
  { id: 'prices', label: 'Prices & Services', to: '/services' },
  { id: 'vouches', label: 'Vouches', href: links.vouches },
  { id: 'stickers', label: 'Stickers', dropdown: true },
  { id: 'contact', label: 'Contact', href: links.contact },
];

export const stickers = [
  {
    id: 'astral-abyss',
    src: asset('stickers/Astral Abyss Sticker.png'),
    label: 'Astral Abyss Sticker',
    postUrl:
      'https://www.facebook.com/photo.php?fbid=122127571526886182&set=p.122127571526886182&type=3&__cft__[0]=AZVYO-aT3vJVpC0dhAguKDV9n_0lC1QOxQtIMTWOmVvniCRfoeKqJcEBobTJTtYBYHi1Fn3tOCUcG_u2Rv8FwRMR2Aa4f-MlSLH0AKsRxHiwwLFHQlemh-Etvf-TSa4QCRMBBDq-lbzXlWAgDCb1RNH_LLRgqgqkTED-3a8HtsCqc4_XQQK_I4ZNzu6-XbMZYSo&__tn__=R]-R',
  },
  {
    id: 'raahz-gitp',
    /*
     * This sticker shipped as a JPEG, so its black background was baked into the
     * pixels and could not be made transparent. It is now generated as a real
     * transparent PNG by `npm run generate:stickers`; the original JPEG is kept
     * as the script's input and is never referenced by the UI.
     */
    src: asset('stickers/Raahz GITP sticker.png'),
    label: 'Raahz GITP Sticker',
    postUrl:
      'https://www.facebook.com/photo.php?fbid=122126291774886182&set=p.122126291774886182&type=3&__cft__[0]=AZVYO-aT3vJVpC0dhAguKDV9n_0lC1QOxQtIMTWOmVvniCRfoeKqJcEBobTJTtYBYHi1Fn3tOCUcG_u2Rv8FwRMR2Aa4f-MlSLH0AKsRxHiwwLFHQlemh-Etvf-TSa4QCRMBBDq-lbzXlWAgDCb1RNH_LLRgqgqkTED-3a8HtsCqc4_XQQK_I4ZNzu6-XbMZYSo&__tn__=R]-R',
  },
  {
    id: 'wonderpets',
    src: asset('stickers/Wonderpets.png'),
    label: 'Wonderpets Piloting Agency',
    postUrl:
      'https://www.facebook.com/photo.php?fbid=122133069950886182&set=p.122133069950886182&type=3&__cft__[0]=AZWhA1CqAgo5Y7QD9XZCwX7ansq080Ryw44i7O-VM-Yvb5RujpMNm8shxkoI8ULLhZI3RSHeOcf470JfGUt3AzHq9VBDpC7WIIwxplfKryXauNtQRIo-COhTsSRIKXyz7yfNHSnDtGEP_j6FsrSTnYyaDe2ilUUfmi9IYNRPtd6I7jI5wRNEE87MLrwrUBI_wXI&__tn__=R]-R',
  },
];

/** Rotating backdrop behind the home menu, in the original order. */
export const menuSlideshow = [
  asset('img/aim.png'),
  asset('img/drinkingtea.png'),
  asset('img/posing.png'),
  asset('img/sword.png'),
];

/** The floating portrait on the home card. */
export const portrait = {
  src: asset('img/aim.png'),
  alt: 'clorinde',
};

/**
 * Faint character art scattered around the services page.
 * Position classes are kept from services.css so the float animations match.
 */
export const decorativeIcons = [
  { src: asset('img/aim.png'), alt: '', position: 'top-left' },
  { src: asset('img/sword.png'), alt: '', position: 'top-center' },
  { src: asset('img/drinkingtea.png'), alt: '', position: 'top-right' },
  { src: asset('img/posing.png'), alt: '', position: 'right-center' },
  { src: asset('img/aim.png'), alt: '', position: 'left-center' },
  { src: asset('img/sword.png'), alt: '', position: 'bottom-left' },
  { src: asset('img/drinkingtea.png'), alt: '', position: 'bottom-right' },
  { src: asset('img/posing.png'), alt: '', position: 'bottom-center' },
  { src: asset('img/aim.png'), alt: '', position: 'top-corner-right', small: true },
  { src: asset('img/sword.png'), alt: '', position: 'top-corner-left', small: true },
  { src: asset('img/drinkingtea.png'), alt: '', position: 'bottom-corner-right', small: true },
  { src: asset('img/posing.png'), alt: '', position: 'bottom-corner-left', small: true },
];

/**
 * The limited-time deal was commented out in index.html. It is kept here behind
 * a flag so it can be switched on for a promotion without touching a component.
 */
export const dealBanner = {
  enabled: false,
  heading: '🎉 Limited-Time Deal! 🎉',
  deals: [
    { amount: '10% OFF', condition: '$30 bulk purchases', tone: 'discount1' },
    { amount: '20% OFF', condition: '$50 bulk purchases', tone: 'discount2' },
  ],
  footer: '💼 Affordable. Fast. Trusted. Don’t miss out!',
};
