'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.charMap = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.toAccentString = toAccentString;
exports.processVars = processVars;
exports.default = toPseudoString;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var charMap = exports.charMap = {
  a: 0x00e5,
  b: 0x0180,
  c: 0x00e7,
  d: 0x00f0,
  e: 0x00e9,
  f: 0x0192,
  g: 0x011d,
  h: 0x0125,
  i: 0x00ee,
  j: 0x0135,
  k: 0x0137,
  l: 0x013c,
  m: 0x0271,
  n: 0x00f1,
  o: 0x00f6,
  p: 0x00fe,
  q: 0x01eb,
  r: 0x0155,
  s: 0x0161,
  t: 0x0163,
  u: 0x00fb,
  v: 0x1e7d,
  w: 0x0175,
  x: 0x1e8b,
  y: 0x00fd,
  z: 0x017e,
  A: 0x00c5,
  B: 0x0181,
  C: 0x00c7,
  D: 0x00d0,
  E: 0x00c9,
  F: 0x0191,
  G: 0x011c,
  H: 0x0124,
  I: 0x00ce,
  J: 0x0134,
  K: 0x0136,
  L: 0x013b,
  M: 0x1e40,
  N: 0x00d1,
  O: 0x00d6,
  P: 0x00de,
  Q: 0x01ea,
  R: 0x0154,
  S: 0x0160,
  T: 0x0162,
  U: 0x00db,
  V: 0x1e7c,
  W: 0x0174,
  X: 0x1e8a,
  Y: 0x00dd,
  Z: 0x017d
};

var replaceFunctions = (0, _keys2.default)(charMap).map(function (char) {
  var regExp = new RegExp(char, 'g');
  var accentChar = String.fromCharCode(charMap[char]);
  return function (str) {
    return str.replace(regExp, accentChar);
  };
});

function toAccentString(str) {
  var output = '' + str;
  replaceFunctions.forEach(function (fn) {
    output = fn(output);
  });
  return output;
}
var varsRegExp = /\{.*?\}/;

function processVars(str) {
  // extract {xxx}
  var input = '' + str;
  var tokens = [];
  var match = varsRegExp.exec(input);
  while (match) {
    tokens.push(toAccentString(input.substring(0, match.index)));
    tokens.push(input.substr(match.index, match[0].length));
    input = input.substring(match.index + match[0].length);
    match = varsRegExp.exec(input);
  }
  tokens.push(toAccentString(input));
  return tokens.join('');
}

var escapeRegExp = /'.*?'/;
function toPseudoString(str) {
  var input = '' + str;
  var tokens = [];
  var match = escapeRegExp.exec(input);
  while (match) {
    tokens.push(processVars(input.substring(0, match.index)));
    tokens.push(toAccentString(input.substr(match.index, match[0].length)));
    input = input.substring(match.index + match[0].length);
    match = escapeRegExp.exec(input);
  }
  tokens.push(processVars(input));
  return '[' + tokens.join('') + ']';
}
//# sourceMappingURL=index.js.map
