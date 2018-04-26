/**
 * this module seems better
 * https://www.npmjs.com/package/chunk-text
 * use our own implementation for now.
 */

export default function chunkMessage(text, maxLength) {
  if (!text) {
    return [];
  }

  if (typeof (maxLength) !== 'number') {
    throw new Error('Should be a integer "maxLength"');
  }

  if (maxLength < 1) {
    throw new Error('Should greater than 0 "maxLength"');
  }

  const chunks = [];
  let fromIndex = 0;
  const total = text.length;

  while (fromIndex < total) {
    let toIndex = fromIndex + maxLength;
    let offset = 0;
    for (; offset < maxLength; offset += 1) {
      const char = text.charAt(toIndex - offset);
      if (!char) {
        break;
      }
      const isWhiteSpace = /\s/.test(char);
      if (isWhiteSpace) {
        if (offset > 0) {
          offset -= 1;
        }
        break;
      }
    }
    if (offset !== maxLength) {
      toIndex -= offset;
    }
    const snippet = text.substring(fromIndex, toIndex);
    fromIndex = toIndex;
    chunks.push(snippet);
  }

  return chunks;
}
