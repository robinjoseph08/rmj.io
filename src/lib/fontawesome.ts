import { config } from '@fortawesome/fontawesome-svg-core';

// The styles are imported in global.css so they can be put in a cascade layer.
// React islands render icons with @fortawesome/react-fontawesome, while .astro
// components use Icon.astro, since islands can't render Astro components.
config.autoAddCss = false;
