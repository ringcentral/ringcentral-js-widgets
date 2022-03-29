export const isSplitterKey = (e: React.KeyboardEvent): boolean =>
  e.key === ',' ||
  e.key === ';' ||
  (e.key === 'Unidentified' && // for Safari (FF cannot rely on keyCode...)
    (e.keyCode === 186 || // semicolon
      e.keyCode === 188)); // comma

const invalidCharsRegExp = /[^\d*+#\-(). ]/;
const numberRegExp = /\d/;
export const validateValidChars = (input: string): boolean => {
  const chars = input.trim();
  return (
    chars.length > 0 &&
    !invalidCharsRegExp.test(chars) &&
    numberRegExp.test(chars)
  );
};
