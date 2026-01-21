const baseConfig = require('../../tailwind.base.config');

const base = baseConfig();

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [baseConfig()],
  content: [...base.content, './src/index.html', './src/**/*.{tsx,ts}'],
};
