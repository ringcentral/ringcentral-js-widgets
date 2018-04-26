import cleanNumber from '../cleanNumber';

const invalidCharsRegExp = /[^\d*+#\-(). ]/;

export default function parseNumber(phoneNumber) {
  const cleaned = cleanNumber(`${phoneNumber}`);
  const hasPlus = cleaned[0] === '+';
  const withoutPlus = hasPlus ? cleaned.substring(1) : cleaned;
  const isServiceNumber = withoutPlus[0] === '*';

  const [
    number,
    extension,
  ] = withoutPlus.split('*');
  return {
    hasPlus: hasPlus && number !== '',
    number: (isServiceNumber && extension) || number || '',
    extension: (!isServiceNumber && extension) || '',
    isServiceNumber,
    hasInvalidChars: invalidCharsRegExp.test(phoneNumber),
  };
}
