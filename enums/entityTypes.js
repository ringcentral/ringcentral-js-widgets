"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.entityTypes = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var entityTypes = _ObjectMap.ObjectMap.fromKeys(['account', 'contact', 'lead', 'opportunity', 'systemUser', 'company']);

exports.entityTypes = entityTypes;
//# sourceMappingURL=entityTypes.js.map
