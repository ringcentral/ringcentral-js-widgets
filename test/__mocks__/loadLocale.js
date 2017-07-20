module.exports = {
  process(src, filename, config, options) {
    return "const enUS =require('./en-US'); module.exports = async function loadLocale() { return enUS; };";
  },
};
