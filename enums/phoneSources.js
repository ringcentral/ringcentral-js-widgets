"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.phoneSources = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var phoneSources = _ObjectMap.ObjectMap.fromKeys(['account', 'contact', 'lead', 'opportunity', 'systemUser', 'rcContact']);

exports.phoneSources = phoneSources;
var _default = phoneSources;
exports["default"] = _default;
//# sourceMappingURL=phoneSources.js.map
