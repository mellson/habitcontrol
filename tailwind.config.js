module.exports = {
  purge: ["./src/**/*.svelte"],
  theme: {
    extend: {},
  },
  variants: {
    backgroundClip: ["responsive"],
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
  experimental: {
    uniformColorPalette: true,
  },
};
