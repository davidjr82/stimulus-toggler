module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    './docs/.vitepress/**/**/*.{js,ts,vue}',
    './docs/**/*.{md,html}',
    './examples/**/*.{md,html}',
  ],
  options: {
    safelist: ['html', 'body'],
  },
  theme: {
    extend: {},
  },
  plugins: [
  ],
}