'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = padLeft;
function padLeft(input, char, length) {
  var str = '' + input;
  var padding = [];
  for (var i = str.length; i < length; i += 1) {
    padding.push(char);
  }
  return '' + padding.join('') + str;
}
//# sourceMappingURL=padLeft.js.map
