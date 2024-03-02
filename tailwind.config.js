export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: 'auto 1fr auto',
      },
      gridTemplateColumns: {
        layout: 'minmax(1rem, 1fr) minmax(0,1440px) minmax(1rem, 1fr)',
      },
    },
  },
  plugins: [],
}
