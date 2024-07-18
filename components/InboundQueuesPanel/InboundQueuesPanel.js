"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InboundQueuesPanel = void 0;
var _utils = require("@ringcentral-integration/utils");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _SelectList = require("../SelectList");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var InboundQueuesPanel = function InboundQueuesPanel(_ref) {
  var searchOption = _ref.searchOption,
    currentLocale = _ref.currentLocale,
    inboundQueueSource = _ref.inboundQueues,
    submitInboundQueues = _ref.submitInboundQueues,
    getAssignedInboundQueues = _ref.getAssignedInboundQueues,
    isAllAssign = _ref.isAllAssign,
    isSeveralAssign = _ref.isSeveralAssign,
    checkBoxOnChange = _ref.checkBoxOnChange,
    allCheckBoxOnChange = _ref.allCheckBoxOnChange,
    goBack = _ref.goBack;
  var _useState = (0, _react.useState)(inboundQueueSource),
    _useState2 = _slicedToArray(_useState, 2),
    inboundQueuesState = _useState2[0],
    setInboundQueuesState = _useState2[1];
  var assignedInboundQueues = getAssignedInboundQueues(inboundQueuesState);
  var assignedInboundQueuesNumber = assignedInboundQueues.length;
  var allAssign = isAllAssign(assignedInboundQueues, inboundQueuesState);
  var severalAssign = isSeveralAssign(assignedInboundQueues, inboundQueuesState);
  var renderListView = function renderListView(_ref2) {
    var option = _ref2.option,
      index = _ref2.index;
    var gateName = option.gateName,
      gateId = option.gateId,
      checked = option.checked;
    return /*#__PURE__*/_react["default"].createElement(_juno.RcListItem, {
      key: index,
      title: gateName,
      button: true,
      singleLine: true,
      size: "small",
      onClick: function onClick(e) {
        e.preventDefault();
        checkBoxOnChange(gateId, inboundQueuesState, setInboundQueuesState);
      }
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
      formControlLabelProps: {
        classes: {
          root: _styles["default"].checkbox,
          label: _styles["default"].label
        }
      },
      label: gateName,
      checked: checked
    }));
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root
  }, /*#__PURE__*/_react["default"].createElement(_SelectList.SelectList, {
    title: _i18n["default"].getString('inboundQueues', currentLocale),
    placeholder: _i18n["default"].getString('search', currentLocale),
    options: inboundQueuesState,
    searchOption: searchOption,
    currentLocale: currentLocale,
    renderListItem: renderListView,
    onBackClick: function onBackClick() {
      setInboundQueuesState(inboundQueueSource);
      goBack();
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].footer
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].selected
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
    label: _i18n["default"].getString('selectAll', currentLocale),
    "data-sign": "bulkChangeCheckBox",
    onClick: function onClick() {
      return allCheckBoxOnChange(severalAssign, inboundQueuesState, setInboundQueuesState);
    },
    checked: allAssign,
    indeterminate: !!assignedInboundQueuesNumber && !allAssign
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].selectedTips,
    "data-sign": "selectedTips"
  }, (0, _utils.format)(_i18n["default"].getString('selectedTips', currentLocale), {
    totalInboundQueuesNumber: inboundQueueSource.length,
    assignedInboundQueuesNumber: assignedInboundQueuesNumber
  }))), /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    "data-sign": "update",
    onClick: function onClick() {
      return submitInboundQueues(assignedInboundQueues, goBack);
    },
    size: "medium",
    fullWidth: true
  }, _i18n["default"].getString('update', currentLocale))));
};
exports.InboundQueuesPanel = InboundQueuesPanel;
//# sourceMappingURL=InboundQueuesPanel.js.map
