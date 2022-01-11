export declare const charMap: {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
  g: number;
  h: number;
  i: number;
  j: number;
  k: number;
  l: number;
  m: number;
  n: number;
  o: number;
  p: number;
  q: number;
  r: number;
  s: number;
  t: number;
  u: number;
  v: number;
  w: number;
  x: number;
  y: number;
  z: number;
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
  G: number;
  H: number;
  I: number;
  J: number;
  K: number;
  L: number;
  M: number;
  N: number;
  O: number;
  P: number;
  Q: number;
  R: number;
  S: number;
  T: number;
  U: number;
  V: number;
  W: number;
  X: number;
  Y: number;
  Z: number;
};
export declare function toAccentString(str: string): string;
export declare function processVars(str: string): string;
export declare function padString({
  str,
  padRatio,
  padChar,
}?: {
  str?: string;
  padRatio?: number;
  padChar?: string;
}): string;
export default function toPseudoString({
  str,
  padRatio,
  padChar,
}: {
  str: string;
  padRatio?: number;
  padChar?: string;
}): string;
