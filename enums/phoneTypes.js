"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.phoneTypes = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

// FIXME: delete this after syncing up
var phoneTypes = _ObjectMap.ObjectMap.fromKeys(['business', 'extension', 'home', 'mobile', 'phone', 'unknown', 'company', 'direct', 'fax', 'other']);

exports.phoneTypes = phoneTypes;
var _default = phoneTypes;
exports["default"] = _default;
//# sourceMappingURL=phoneTypes.js.map
