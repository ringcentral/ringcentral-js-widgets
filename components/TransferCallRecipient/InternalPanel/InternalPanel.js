"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InternalPanel = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _EvTransferCallUI = require("../../../modules/EvTransferCallUI");
var _SelectList = require("../../SelectList");
var _i18n = _interopRequireDefault(require("../i18n"));
var _styles = _interopRequireDefault(require("../styles.scss"));
var _i18n2 = _interopRequireDefault(require("./i18n"));
var _styles2 = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var InternalPanel = function InternalPanel(_ref) {
  var currentLocale = _ref.currentLocale,
    transferAgentList = _ref.transferAgentList,
    goBack = _ref.goBack,
    transferAgentListUpdateTTL = _ref.transferAgentListUpdateTTL,
    fetchAgentList = _ref.fetchAgentList,
    transferAgentId = _ref.transferAgentId,
    changeTransferAgentId = _ref.changeTransferAgentId,
    searchAgent = _ref.searchAgent,
    isWide = _ref.isWide;
  (0, _react.useEffect)(function () {
    var timerId = setInterval(function () {
      fetchAgentList();
    }, transferAgentListUpdateTTL);
    return function () {
      return clearInterval(timerId);
    };
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_SelectList.SelectList, {
    onBackClick: goBack,
    title: _i18n2["default"].getString('internalCallRecipient', currentLocale),
    placeholder: _i18n["default"].getString('search', currentLocale),
    options: transferAgentList,
    searchOption: searchAgent,
    currentLocale: currentLocale,
    renderListItem: function renderListItem(_ref2) {
      var agent = _ref2.option,
        i = _ref2.index;
      var agentId = agent.agentId,
        available = agent.available;
      var status = available ? 'available' : 'unavailable';
      var statusText = _i18n2["default"].getString(status, currentLocale);
      var internalTransferName = (0, _EvTransferCallUI.getInternalTransferName)(agent);
      return /*#__PURE__*/_react["default"].createElement(_SelectList.ListItem, {
        onClick: function onClick() {
          return changeTransferAgentId(agentId);
        },
        selected: agentId === transferAgentId,
        key: i,
        className: _styles["default"].listItem,
        "data-sign": "agentItem"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles2["default"].agentItem
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles2["default"].dot, _styles2["default"][status])
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: isWide ? _styles2["default"].content : undefined
      }, /*#__PURE__*/_react["default"].createElement("p", {
        className: (0, _clsx["default"])(_styles2["default"].agentName, _styles["default"].ellipsis)
      }, internalTransferName), /*#__PURE__*/_react["default"].createElement("p", {
        className: _styles2["default"].statusText
      }, statusText))));
    }
  });
};
exports.InternalPanel = InternalPanel;
//# sourceMappingURL=InternalPanel.js.map
