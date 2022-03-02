module.exports = {
  trailingComma: 'es5',
  semi: true,
  singleQuote: true,

  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
};
