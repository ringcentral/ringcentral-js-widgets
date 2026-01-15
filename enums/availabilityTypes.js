"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.availabilityTypes = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var availabilityTypes = exports.availabilityTypes = _ObjectMap.ObjectMap.fromObject({
  alive: 'Alive',
  deleted: 'Deleted',
  purged: 'Purged'
});
var _default = exports["default"] = availabilityTypes;
//# sourceMappingURL=availabilityTypes.js.map
