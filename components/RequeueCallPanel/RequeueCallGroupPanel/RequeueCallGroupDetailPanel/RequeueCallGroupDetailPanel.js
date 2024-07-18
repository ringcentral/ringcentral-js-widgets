"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequeueCallGroupDetailPanel = void 0;
var _Tooltip = require("@ringcentral-integration/widgets/components/Rcui/Tooltip");
var _toolTipDelayTime = require("@ringcentral-integration/widgets/lib/toolTipDelayTime");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _SelectList = require("../../../SelectList");
var _styles = _interopRequireDefault(require("../styles.scss"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var RequeueCallGroupDetailPanel = function RequeueCallGroupDetailPanel(_ref) {
  var currentLocale = _ref.currentLocale,
    goBack = _ref.goBack,
    searchGate = _ref.searchGate,
    selectedQueueGroup = _ref.selectedQueueGroup,
    selectedGateId = _ref.selectedGateId,
    submitSelection = _ref.submitSelection;
  var selectText = _i18n["default"].getString('selectCheck', currentLocale);
  var _useState = (0, _react.useState)(selectedGateId),
    _useState2 = _slicedToArray(_useState, 2),
    queueId = _useState2[0],
    setQueueId = _useState2[1];
  return /*#__PURE__*/_react["default"].createElement(_SelectList.SelectList, {
    searchOption: searchGate,
    currentLocale: currentLocale,
    onBackClick: goBack,
    title: selectedQueueGroup.groupName,
    options: selectedQueueGroup.gates,
    renderListItem: function renderListItem(_ref2) {
      var option = _ref2.option,
        index = _ref2.index;
      var selected = option.gateId === queueId;
      return /*#__PURE__*/_react["default"].createElement(_SelectList.ListItem, {
        onClick: function onClick() {
          setQueueId(selected ? null : option.gateId);
        },
        selected: selected,
        key: index
      }, /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
        title: option.gateName,
        enterDelay: _toolTipDelayTime.TOOLTIP_LONG_DELAY_TIME
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: _styles["default"].gateName
      }, option.gateName)));
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].checkContainer
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    title: selectText,
    disabled: !queueId,
    onClick: function onClick() {
      return submitSelection(queueId);
    },
    fullWidth: true,
    size: "medium",
    "data-sign": "select-group-item"
  }, selectText)));
};
exports.RequeueCallGroupDetailPanel = RequeueCallGroupDetailPanel;
//# sourceMappingURL=RequeueCallGroupDetailPanel.js.map
