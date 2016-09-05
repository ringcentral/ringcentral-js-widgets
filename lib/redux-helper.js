'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionMap = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.prefixActions = prefixActions;

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * @class
 * @description helper class for creating redux action definition maps
 */

var ActionMap = exports.ActionMap = function (_KeyValueMap) {
  (0, _inherits3.default)(ActionMap, _KeyValueMap);

  /**
   * @constructor
   * @param {String[]} actions - list of action strings
   * @extends KeyValueMap
   */
  function ActionMap() {
    var actions = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var prefix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
    (0, _classCallCheck3.default)(this, ActionMap);

    var definition = {};
    actions.forEach(function (action) {
      definition[action] = prefix !== '' ? prefix + '-' + action : action;
    });
    return (0, _possibleConstructorReturn3.default)(this, (ActionMap.__proto__ || (0, _getPrototypeOf2.default)(ActionMap)).call(this, definition));
  }

  return ActionMap;
}(_keyValueMap2.default);

/**
 * @function
 * @description helper function to return a prefixed action definition maps
 */


function prefixActions(actions, prefix) {
  if (!prefix || prefix === '') return actions;
  var definition = {};
  for (var action in actions) {
    /* istanbul ignore else */
    if (hasOwnProperty.call(actions, action)) {
      definition[action] = prefix + '-' + actions[action];
    }
  }
  return new _keyValueMap2.default(definition);
}
//# sourceMappingURL=redux-helper.js.map
