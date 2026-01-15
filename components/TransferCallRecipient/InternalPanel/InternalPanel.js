"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InternalPanel = void 0;
require("core-js/modules/web.timers.js");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _EvTransferCallUI = require("../../../modules/EvTransferCallUI");
var _SelectList = require("../../SelectList");
var _i18n = _interopRequireDefault(require("../i18n"));
var _styles = _interopRequireDefault(require("../styles.scss"));
var _i18n2 = _interopRequireDefault(require("./i18n"));
var _styles2 = _interopRequireDefault(require("./styles.scss"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var InternalPanel = exports.InternalPanel = function InternalPanel(_ref) {
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
//# sourceMappingURL=InternalPanel.js.map
