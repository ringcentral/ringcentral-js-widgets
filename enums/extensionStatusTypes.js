"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extensionStatusTypes = void 0;

var _HashMap = require("../lib/HashMap");

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
var extensionStatusTypes = (0, _HashMap.createHashMap)({
  enabled: 'Enabled',
  notActivated: 'NotActivated',
  disabled: 'Disabled'
});
exports.extensionStatusTypes = extensionStatusTypes;
//# sourceMappingURL=extensionStatusTypes.js.map
