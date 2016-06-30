import Enum from './enum';

const hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * @class
 * @description helper class for creating redux action definition maps
 */
export class ActionMap extends Enum {
  /**
   * @constructor
   * @param {String[]} actions - list of action strings
   * @extends Enum
   */
  constructor(actions = []) {
    const definition = {};
    actions.forEach(action => {
      definition[action] = action;
    });
    super(definition);
  }
}

/**
 * @function
 * @description helper function to return a prefixed action definition maps
 */
export function prefixActions(actions, prefix) {
  if (!prefix || prefix === '') return actions;
  const definition = {};
  for (const action in actions) {
    if (actions::hasOwnProperty(action)) {
      definition[action] = `${prefix}-${action}`;
    }
  }
  return new Enum(definition);
}

