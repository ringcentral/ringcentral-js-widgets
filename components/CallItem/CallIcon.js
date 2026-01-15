"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallIcon = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _messageDirection = require("@ringcentral-integration/commons/enums/messageDirection");
var _messageTypes = require("@ringcentral-integration/commons/enums/messageTypes");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _FaxInbound = _interopRequireDefault(require("../../assets/images/FaxInbound.svg"));
var _FaxOutbound = _interopRequireDefault(require("../../assets/images/FaxOutbound.svg"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var callIconMap = _defineProperty(_defineProperty(_defineProperty({}, _callDirections["default"].inbound, _DynamicsFont["default"].inbound), _callDirections["default"].outbound, _DynamicsFont["default"].outbound), "missed", _DynamicsFont["default"].missed);
var CallIcon = exports.CallIcon = function CallIcon(_ref) {
  var direction = _ref.direction,
    _ref$missed = _ref.missed,
    missed = _ref$missed === void 0 ? false : _ref$missed,
    _ref$active = _ref.active,
    active = _ref$active === void 0 ? false : _ref$active,
    _ref$ringing = _ref.ringing,
    ringing = _ref$ringing === void 0 ? false : _ref$ringing,
    _ref$inboundTitle = _ref.inboundTitle,
    inboundTitle = _ref$inboundTitle === void 0 ? '' : _ref$inboundTitle,
    _ref$outboundTitle = _ref.outboundTitle,
    outboundTitle = _ref$outboundTitle === void 0 ? '' : _ref$outboundTitle,
    _ref$missedTitle = _ref.missedTitle,
    missedTitle = _ref$missedTitle === void 0 ? '' : _ref$missedTitle,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? '' : _ref$type;
  var icon = null;
  switch (type) {
    case _messageTypes.messageTypes.fax:
      {
        icon = direction === _messageDirection.messageDirection.inbound ? /*#__PURE__*/_react["default"].createElement("span", {
          title: inboundTitle
        }, /*#__PURE__*/_react["default"].createElement(_FaxInbound["default"], {
          width: 21
        })) : /*#__PURE__*/_react["default"].createElement("span", {
          title: outboundTitle
        }, /*#__PURE__*/_react["default"].createElement(_FaxOutbound["default"], {
          width: 21
        }));
        break;
      }
    default:
      {
        var title = null;
        if (missed) {
          title = missedTitle;
        } else if (direction === _callDirections["default"].inbound) {
          title = inboundTitle;
        } else {
          title = outboundTitle;
        }
        icon = /*#__PURE__*/_react["default"].createElement("span", {
          className: (0, _clsx["default"])(missed ? callIconMap.missed : callIconMap[direction], active && _styles["default"].activeCall, ringing && _styles["default"].ringing, missed && _styles["default"].missed),
          title: title,
          "data-sign": "callIcon"
        });
      }
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].callIcon
  }, icon);
};
//# sourceMappingURL=CallIcon.js.map
