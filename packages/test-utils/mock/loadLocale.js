module.exports = {
  process(src, filename, config, options) {
    return `
    module.exports = async function loadLocale(currentLocale = 'en-US') {
      return require(\`./\${currentLocale}\`).default;
    };
    `;
  },
};
