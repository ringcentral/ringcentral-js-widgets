"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallIcon = void 0;

var _react = _interopRequireDefault(require("react"));

var _callDirections = require("@ringcentral-integration/commons/enums/callDirections");

var _Icon = require("@ringcentral/juno/es6/components/Icon/Icon.js");

var _IncallBorder = _interopRequireDefault(require("@ringcentral/juno/es6/icon/IncallBorder.js"));

var _MissedcallBorder = _interopRequireDefault(require("@ringcentral/juno/es6/icon/MissedcallBorder.js"));

var _OutcallBorder = _interopRequireDefault(require("@ringcentral/juno/es6/icon/OutcallBorder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CallIcon = function CallIcon(_ref) {
  var direction = _ref.direction,
      active = _ref.active,
      missed = _ref.missed,
      title = _ref.title;

  var icon = function () {
    if (missed) {
      return _MissedcallBorder["default"];
    }

    switch (direction) {
      case _callDirections.callDirection.inbound:
        return _IncallBorder["default"];

      case _callDirections.callDirection.outbound:
        return _OutcallBorder["default"];

      default:
        return null;
    }
  }();

  var color = function () {
    if (active) {
      return 'success.b04';
    }

    if (missed) {
      return 'danger.b04';
    }

    return 'neutral.f04';
  }();

  return /*#__PURE__*/_react["default"].createElement(_Icon.RcIcon, {
    "data-sign": "callIcon",
    title: title || direction,
    symbol: icon,
    size: "medium",
    color: color
  });
};

exports.CallIcon = CallIcon;
//# sourceMappingURL=CallIcon.js.map
