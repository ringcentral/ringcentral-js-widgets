export const charMap = {
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

const replaceFunctions = Object.keys(charMap).map((char) => {
  const regExp = new RegExp(char, 'g');
  const accentChar = String.fromCharCode(charMap[char]);
  return str => str.replace(regExp, accentChar);
});

export function toAccentString(str) {
  let output = `${str}`;
  replaceFunctions.forEach((fn) => {
    output = fn(output);
  });
  return output;
}
const varsRegExp = /\{.*?\}/;

export function processVars(str) {
  // extract {xxx}
  let input = `${str}`;
  const tokens = [];
  let match = varsRegExp.exec(input);
  while (match) {
    tokens.push(toAccentString(input.substring(0, match.index)));
    tokens.push(input.substr(match.index, match[0].length));
    input = input.substring(match.index + match[0].length);
    match = varsRegExp.exec(input);
  }
  tokens.push(toAccentString(input));
  return tokens.join('');
}

const escapeRegExp = /'.*?'/;
export default function toPseudoString(str) {
  let input = `${str}`;
  const tokens = [];
  let match = escapeRegExp.exec(input);
  while (match) {
    tokens.push(processVars(input.substring(0, match.index)));
    tokens.push(toAccentString(input.substr(match.index, match[0].length)));
    input = input.substring(match.index + match[0].length);
    match = escapeRegExp.exec(input);
  }
  tokens.push(processVars(input));
  return `[${tokens.join('')}]`;
}
