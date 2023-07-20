// TODO: should find a better solution for electron package to avoid similar package dependencies too big cause app to large issues

/**
 * copy from "ramda", to reduce dependencies in electron app
 * @link https://github.com/ramda/ramda/blob/v0.28.0/source/invertObj.js
 */
export function invertObj(obj: Record<string, string>) {
  const props = Object.keys(obj);
  const len = props.length;
  let idx = 0;
  const out: Record<string, string> = {};

  while (idx < len) {
    const key = props[idx];
    out[obj[key]] = key;
    idx += 1;
  }

  return out;
}
