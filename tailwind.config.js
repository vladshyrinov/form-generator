const formInstructions = require('./src/data/form_instructions.json');

module.exports = {
  purge: ['./src/**/*.{ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: formInstructions?.theme || {},
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
