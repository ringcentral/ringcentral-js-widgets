"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTabSize = getTabSize;
function getTabSize(_ref) {
  var isVertical = _ref.isVertical,
    tabHeight = _ref.tabHeight,
    tabWidth = _ref.tabWidth,
    _ref$tabLength = _ref.tabLength,
    tabLength = _ref$tabLength === void 0 ? 1 : _ref$tabLength;
  var width = (tabWidth !== null && tabWidth !== void 0 ? tabWidth : tabLength > 0) ? "".concat(1 / tabLength * 100, "%") : '0';
  var height = isVertical ? tabHeight !== null && tabHeight !== void 0 ? tabHeight : '50px' : '100%';
  return {
    width: width,
    height: height
  };
}
//# sourceMappingURL=getTabSize.js.map
