/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/*.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Add our own variants for convenience
    plugin(({ addVariant }) => {
      addVariant('hocus', ['&:hover', '&:focus']);
      addVariant('group-hocus', [
        ':merge(.group):focus &',
        ':merge(.group):hover &',
      ]);
      addVariant('children', '& > *');
    }),
    require('@tailwindcss/typography'),
  ],
}