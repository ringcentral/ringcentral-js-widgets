export default function chunked(array, maxLength) {
  if (!array || array.length === 0) {
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
  const total = array.length;

  while (fromIndex < total) {
    const toIndex = Math.min(fromIndex + maxLength, total);
    const snippet = array.slice(fromIndex, toIndex);
    fromIndex = toIndex;
    chunks.push(snippet);
  }

  return chunks;
}

