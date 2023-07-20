"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InternalPanel = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _EvTransferCallUI = require("../../../modules/EvTransferCallUI");
var _SelectList = require("../../SelectList");
var _i18n = _interopRequireDefault(require("../i18n"));
var _styles = _interopRequireDefault(require("../styles.scss"));
var _i18n2 = _interopRequireDefault(require("./i18n"));
var _styles2 = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
        className: (0, _classnames["default"])(_styles2["default"].dot, _styles2["default"][status])
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: isWide ? _styles2["default"].content : undefined
      }, /*#__PURE__*/_react["default"].createElement("p", {
        className: (0, _classnames["default"])(_styles2["default"].agentName, _styles["default"].ellipsis)
      }, internalTransferName), /*#__PURE__*/_react["default"].createElement("p", {
        className: _styles2["default"].statusText
      }, statusText))));
    }
  });
};
exports.InternalPanel = InternalPanel;
//# sourceMappingURL=InternalPanel.js.map
