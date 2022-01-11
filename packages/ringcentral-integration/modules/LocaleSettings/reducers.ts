export function getSavedLocaleReducer(types) {
  return (state = null, { type, locale }) => {
    if (type === types.saveLocale) {
      return locale;
    }
    return state;
  };
}
