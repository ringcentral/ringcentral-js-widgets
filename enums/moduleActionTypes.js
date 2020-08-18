"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moduleActionTypes = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

/**
 * @typedef {Object} ModuleActionTypes
 * @property {String} init
 * @property {String} initSuccess
 * @property {String} reset
 * @property {String} resetSuccess
 */
var moduleActionTypes = _ObjectMap.ObjectMap.fromKeys(['init', 'initSuccess', 'reset', 'resetSuccess']);

exports.moduleActionTypes = moduleActionTypes;
//# sourceMappingURL=moduleActionTypes.js.map
