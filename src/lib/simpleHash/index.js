/**
 * @function
 * @description A substitute for uuid. Given the use for the function, this should be sufficent to avoid collision.
 * @return {String} Random hash string.
 */
export default function simpleHash() {
  const token = `${Math.floor(Math.random() * 10000)}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  return btoa(token);
}

