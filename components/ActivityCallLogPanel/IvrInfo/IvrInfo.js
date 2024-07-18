"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.map");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IvrInfo = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var IvrInfo = function IvrInfo(_ref) {
  var isCallEnd = _ref.isCallEnd,
    ivrAlertData = _ref.ivrAlertData,
    agentScriptData = _ref.agentScriptData;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    expanded = _useState2[0],
    setExpanded = _useState2[1];
  (0, _react.useEffect)(function () {
    if (isCallEnd) {
      setExpanded(false);
    }
  }, [isCallEnd]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].ivrPanel
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: _styles["default"].remain
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].container
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcAccordion, {
    onChange: function onChange() {
      return setExpanded(!expanded);
    },
    expanded: expanded,
    classes: {
      root: (0, _clsx["default"])(_styles["default"].panelRoot, isCallEnd && _styles["default"].endCall),
      expanded: _styles["default"].expanded
    }
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcAccordionSummary, {
    classes: {
      root: (0, _clsx["default"])(_styles["default"].summaryRoot, agentScriptData && _styles["default"].summaryAgentScriptIconPaddingRight),
      content: (0, _clsx["default"])(_styles["default"].summaryContent, agentScriptData && _styles["default"].summaryAgentScriptIconWidth)
    },
    IconButtonProps: {
      size: 'small'
    },
    expandIcon: _junoIcon.ArrowDown2
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: (0, _clsx["default"])(_styles["default"].ivrMainSubject, agentScriptData && _styles["default"].summaryAgentScriptIconWidth)
  }, ivrAlertData[0].subject || ''), ivrAlertData.length > 1 ? /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].count
  }, " +", ivrAlertData.length - 1) : null), /*#__PURE__*/_react["default"].createElement(_juno.RcAccordionDetails, {
    classes: {
      root: _styles["default"].detailsRoot
    }
  }, ivrAlertData.map(function (_ref2, i) {
    var _ref2$subject = _ref2.subject,
      subject = _ref2$subject === void 0 ? '' : _ref2$subject,
      _ref2$body = _ref2.body,
      body = _ref2$body === void 0 ? '' : _ref2$body;
    var bodyRender = function bodyRender() {
      if (body.length > 0) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].body
        }, body);
      }
      return null;
    };
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].item,
      key: i
    }, i !== 0 && subject.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].subject
    }, subject), bodyRender());
  })))));
};
exports.IvrInfo = IvrInfo;
//# sourceMappingURL=IvrInfo.js.map
