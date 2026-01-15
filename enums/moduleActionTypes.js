"use strict";

require("core-js/modules/es.object.define-property.js");
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
var moduleActionTypes = exports.moduleActionTypes = _ObjectMap.ObjectMap.fromKeys(['init', 'initSuccess', 'reset', 'resetSuccess']);
//# sourceMappingURL=moduleActionTypes.js.map
