'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = chunkMessage;
/**
 * this module seems better
 * https://www.npmjs.com/package/chunk-text
 * use our own implementation for now.
 */

function chunkMessage(text, maxLength) {
  if (!text) {
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
  var total = text.length;

  while (fromIndex < total) {
    var toIndex = fromIndex + maxLength;
    var offset = 0;
    for (; offset < maxLength; offset += 1) {
      var char = text.charAt(toIndex - offset);
      if (!char) {
        break;
      }
      var isWhiteSpace = /\s/.test(char);
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
    var snippet = text.substring(fromIndex, toIndex);
    fromIndex = toIndex;
    chunks.push(snippet);
  }

  return chunks;
}
//# sourceMappingURL=chunkMessage.js.map
