import wrapDescriptor from './wrapDescriptor';

/**
 * @function
 * @description @required decorator denote a class method must be implemented
 *              by the descendant, or else it will throw error.
 */
export default function required(prototype, property, descriptor) {
  function throwError() {
    throw new Error(
      `${prototype.constructor.name} requires ${this.constructor.name}.${property} to be implemented.`
    );
  }
  return wrapDescriptor(descriptor, throwError);
}

/**
 * @function
 * @description @required.warn decorator denote a class method must be implemented
 *              by the descendant, or else it will warn in console.
 */
required.warn = function warn(prototype, property, descriptor) {
  function warning() {
    console.warn(
      `${prototype.constructor.name} requires ${this.constructor.name}.${property} to be implemented.`
    );
  }
  return wrapDescriptor(descriptor, warning);
};
