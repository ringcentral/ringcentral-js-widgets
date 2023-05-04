"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.charMap = void 0;
exports["default"] = toPseudoString;
exports.padString = padString;
exports.processVars = processVars;
exports.toAccentString = toAccentString;
var charMap = {
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
exports.charMap = charMap;
var padCharacters = '~!@#$%^&*';
var replaceFunctions = Object.keys(charMap).map(function (_char) {
  var regExp = new RegExp(_char, 'g');
  var accentChar = String.fromCharCode(charMap[_char]);
  return function (str) {
    return str.replace(regExp, accentChar);
  };
});

function toAccentString(str) {
  var output = "".concat(str);
  replaceFunctions.forEach(function (fn) {
    output = fn(output);
  });
  return output;
}

var varsRegExp = /\{.*?\}/;

function processVars(str) {
  // extract {xxx}
  var input = "".concat(str);
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

function padString() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      str = _ref.str,
      _ref$padRatio = _ref.padRatio,
      padRatio = _ref$padRatio === void 0 ? 0.3 : _ref$padRatio,
      _ref$padChar = _ref.padChar,
      padChar = _ref$padChar === void 0 ? ' ' : _ref$padChar;

  var normalized = str || '';
  var padLen = Math.ceil(normalized.length * padRatio / 2);
  var padding = [];

  for (var i = 0; i < padLen; i += 1) {
    padding.push(padCharacters[i % padCharacters.length]);
  }

  var padStr = padding.join('');
  return "[".concat(padStr, "]").concat(normalized, "[").concat(padStr, "]");
}

var escapeRegExp = /'.*?'/;

function toPseudoString(_ref2) {
  var str = _ref2.str,
      padRatio = _ref2.padRatio,
      padChar = _ref2.padChar;
  var input = "".concat(str);
  var tokens = [];
  var match = escapeRegExp.exec(input);

  while (match) {
    tokens.push(processVars(input.substring(0, match.index)));
    tokens.push(toAccentString(input.substr(match.index, match[0].length)));
    input = input.substring(match.index + match[0].length);
    match = escapeRegExp.exec(input);
  }

  tokens.push(processVars(input));
  var result = padString({
    str: tokens.join(''),
    padRatio: padRatio,
    padChar: padChar
  });
  return "[".concat(result, "]");
}
//# sourceMappingURL=index.js.map
