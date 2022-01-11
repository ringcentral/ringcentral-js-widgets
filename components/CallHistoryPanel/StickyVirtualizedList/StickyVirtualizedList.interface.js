"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollReasonsValues = exports.scrollReasons = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var scrollReasonsValues = ['observed', 'requested'];
exports.scrollReasonsValues = scrollReasonsValues;

var scrollReasons = _ObjectMap.ObjectMap.fromKeys(scrollReasonsValues);

exports.scrollReasons = scrollReasons;
//# sourceMappingURL=StickyVirtualizedList.interface.js.map
