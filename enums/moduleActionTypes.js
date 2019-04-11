"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moduleActionTypes = void 0;

var _Enum = _interopRequireDefault(require("../lib/Enum"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {Object} ModuleActionTypes
 * @property {String} init
 * @property {String} initSuccess
 * @property {String} reset
 * @property {String} resetSuccess
 */

/**
 * @type {ModuleActionTypes}
 */
var moduleActionTypes = new _Enum.default(['init', 'initSuccess', 'reset', 'resetSuccess']);
exports.moduleActionTypes = moduleActionTypes;
//# sourceMappingURL=moduleActionTypes.js.map
