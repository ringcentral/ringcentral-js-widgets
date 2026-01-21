// https://regex101.com/r/2rc7Mg/1
/**
 * Filters a string to only keep normal text and removes special characters.
 * The function performs the following operations:
 * 1. Removes leading whitespace
 * 2. Removes special characters (~@#%^&*()_+{}[]|<>/)
 * 3. Excludes emoji characters based on Unicode ranges
 *
 * @param content - The input string to be sanitized
 * @returns A string containing only emoji characters from the input, or an empty string if no emojis are found
 */
export const sanitizedMessage = (content: string) => {
  const regex =
    /[^\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu;

  const matches = content.match(regex);
  return matches
    ? matches
        .join('')
        .trimStart()
        .replace(/[~@#%^&*()_+{}[\]|<>/]/g, '')
    : '';
};
