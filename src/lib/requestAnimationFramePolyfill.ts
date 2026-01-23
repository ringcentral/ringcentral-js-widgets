/**
 * Thanks for following contributor of codes
 * https://gist.github.com/1866474
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/requestAnimationFrame/polyfill.js
 **/
import { isSharedWorker } from './isSharedWorker';
import { isWebWorker } from './isWebWorker';

// source: https://github.com/aluc-io/request-animation-frame-polyfill/blob/master/src/request-animation-frame-polyfill.ts
let uId = 1;
const uniqueId = () => uId++;

// We use `self` instead of `window` for `WebWorker` support.
export const root: any =
  typeof self === 'object' && self.self == self
    ? self
    : typeof global === 'object' && (global as any).global == global
    ? global
    : {};

const nowOffset = Date.now();

// use performance api if exist, otherwise use Date.now.
// Date.now polyfill required.
const pnow = (): number => {
  if (root.performance && typeof root.performance.now === 'function') {
    return root.performance.now();
  }

  // fallback
  return Date.now() - nowOffset;
};

interface IReservedCBs {
  [key: string]: (...args: any[]) => void;
}
let reservedCBs: IReservedCBs = {};

let lastTime = Date.now();

const polyfillRaf = (callback: (...args: any[]) => void) => {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const currentTime = Date.now();
  const gap = currentTime - lastTime;
  const delay = gap > 16 ? 0 : 16 - gap;

  const id = uniqueId();
  reservedCBs[id] = callback;

  // keys(reservedCBs).length > 1 의미는 이미 setTimeout 이 걸려있는 경우.
  // 함께 callback 이 실행될 수 있게 reservedCBs 에만 추가해주고 return
  if (Object.keys(reservedCBs).length > 1) return id;

  setTimeout(() => {
    lastTime = currentTime;
    const copied = reservedCBs;
    reservedCBs = {};

    Object.keys(copied).forEach((key: string) => copied[key](pnow()));
  }, delay);

  return id;
};

const polyfillCaf = (id: number) => {
  delete reservedCBs[id];
};

const vendorPrefixes = ['', 'webkit', 'moz', 'ms', 'o'];

type TRequestAnimationFrame = (callback: (...args: any[]) => void) => number;
type TCancelAnimationFrame = (id: number) => void;

const getRequestAnimationFrame = (
  vp: string | void,
): TRequestAnimationFrame => {
  if (typeof vp !== 'string') return polyfillRaf;
  if (vp === '') return root['requestAnimationFrame'];
  return root[vp + 'RequestAnimationFrame'];
};

const getCancelAnimationFrame = (vp: string | void): TCancelAnimationFrame => {
  if (typeof vp !== 'string') return polyfillCaf;
  if (vp === '') return root['cancelAnimationFrame'];
  return (
    root[vp + 'CancelAnimationFrame'] ||
    root[vp + 'CancelRequestAnimationFrame']
  );
};

const find = (arr: any[], predicate: (...args: any[]) => boolean) => {
  let i = 0;
  while (arr[i] !== void 0) {
    if (predicate(arr[i])) return arr[i];
    i = i + 1;
  }
};

const vp = find(vendorPrefixes, (vp: string) => !!getRequestAnimationFrame(vp));

if (isWebWorker || isSharedWorker) {
  globalThis.requestAnimationFrame = getRequestAnimationFrame(vp);
  globalThis.cancelAnimationFrame = getCancelAnimationFrame(vp);
}
