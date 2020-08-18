"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.availabilityTypes = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var availabilityTypes = _ObjectMap.ObjectMap.fromObject({
  alive: 'Alive',
  deleted: 'Deleted',
  purged: 'Purged'
});

exports.availabilityTypes = availabilityTypes;
var _default = availabilityTypes;
exports["default"] = _default;
//# sourceMappingURL=availabilityTypes.js.map
