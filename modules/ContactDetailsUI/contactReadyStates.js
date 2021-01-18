"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contactReadyStates = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var contactReadyStates = _ObjectMap.ObjectMap.prefixKeys(['pending', 'loading', 'loaded'], 'contactReadyStates');

exports.contactReadyStates = contactReadyStates;
//# sourceMappingURL=contactReadyStates.js.map
