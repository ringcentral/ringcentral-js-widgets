"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallIcon = void 0;

require("core-js/modules/es6.object.define-property");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _callDirections = require("ringcentral-integration/enums/callDirections");

var _juno = require("@ringcentral/juno");

var _icon = require("@ringcentral/juno/icon");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CallIcon = function CallIcon(_ref) {
  var _classNames;

  var direction = _ref.direction,
      active = _ref.active,
      missed = _ref.missed,
      title = _ref.title;
  var icon = (0, _react.useMemo)(function () {
    if (missed) {
      return _icon.MissedcallBorder;
    }

    switch (direction) {
      case _callDirections.callDirection.inbound:
        return _icon.IncallBorder;

      case _callDirections.callDirection.outbound:
        return _icon.OutcallBorder;

      default:
        return null;
    }
  }, [missed, direction]);
  return /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    "data-sign": "callIcon",
    title: title || direction,
    symbol: icon,
    size: "medium",
    className: (0, _classnames["default"])(_styles["default"].icon, (_classNames = {}, _defineProperty(_classNames, _styles["default"].active, active), _defineProperty(_classNames, _styles["default"].missed, missed), _classNames))
  });
};

exports.CallIcon = CallIcon;
//# sourceMappingURL=CallIcon.js.map
