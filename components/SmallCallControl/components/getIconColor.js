"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIconColor = getIconColor;

function getIconColor(_ref) {
  var disable = _ref.disable,
      active = _ref.active;

  if (active) {
    return 'interactive.f01';
  }

  return disable ? 'disabled.f02' : 'neutral.f06';
}
//# sourceMappingURL=getIconColor.js.map
