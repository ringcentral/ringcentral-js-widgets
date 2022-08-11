/**
 * get enabled state of using `jest.useFakeTimers()`
 *
 * @link https://github.com/testing-library/dom-testing-library/blob/30bd61453645d29fc9419854ac18e739d0066c2f/src/helpers.js#L5
 */
export function jestFakeTimersAreEnabled() {
  /* istanbul ignore else */
  if (typeof jest !== 'undefined' && jest !== null) {
    return (
      // legacy timers
      (setTimeout as any)._isMockFunction === true ||
      // modern timers
      Object.prototype.hasOwnProperty.call(setTimeout, 'clock')
    );
  }
  // istanbul ignore next
  return false;
}
