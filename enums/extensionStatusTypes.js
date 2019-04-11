"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extensionStatusTypes = void 0;

var _HashMap = _interopRequireDefault(require("../lib/HashMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef ExtensionStatusTypes
 * @type {object}
 * @property {string} enabled
 * @property {string} notActivated
 * @property {string} disabled
 */

/**
 * @type {ExtensionStatusTypes}
 */
var extensionStatusTypes = new _HashMap.default({
  enabled: 'Enabled',
  notActivated: 'NotActivated',
  disabled: 'Disabled'
});
exports.extensionStatusTypes = extensionStatusTypes;
//# sourceMappingURL=extensionStatusTypes.js.map
