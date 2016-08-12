import KeyValueMap from 'data-types/key-value-map';

const hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * @class
 * @description helper class for creating redux action definition maps
 */
export class ActionMap extends KeyValueMap {
  /**
   * @constructor
   * @param {String[]} actions - list of action strings
   * @extends KeyValueMap
   */
  constructor(actions = [], prefix = '') {
    const definition = {};
    actions.forEach(action => {
      definition[action] = prefix !== '' ? `${prefix}-${action}` : action;
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
    /* istanbul ignore else */
    if (actions::hasOwnProperty(action)) {
      definition[action] = `${prefix}-${actions[action]}`;
    }
  }
  return new KeyValueMap(definition);
}

