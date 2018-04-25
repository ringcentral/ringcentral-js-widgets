'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = chunked;
function chunked(array, maxLength) {
  if (!array || array.length === 0) {
    return [];
  }

  if (typeof maxLength !== 'number') {
    throw new Error('Should be a integer "maxLength"');
  }

  if (maxLength < 1) {
    throw new Error('Should greater than 0 "maxLength"');
  }

  var chunks = [];
  var fromIndex = 0;
  var total = array.length;

  while (fromIndex < total) {
    var toIndex = Math.min(fromIndex + maxLength, total);
    var snippet = array.slice(fromIndex, toIndex);
    fromIndex = toIndex;
    chunks.push(snippet);
  }

  return chunks;
}
//# sourceMappingURL=chunked.js.map
