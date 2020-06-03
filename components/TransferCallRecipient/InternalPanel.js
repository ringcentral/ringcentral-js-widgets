"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InternalPanel = void 0;

require("core-js/modules/es6.array.map");

var _react = _interopRequireWildcard(require("react"));

var _EvTransferCallUI = require("../../modules/EvTransferCallUI");

var _ListItemWithScrollCheck = require("../ListItemWithScrollCheck");

var _SearchSelectField = require("../SearchSelectField");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
  return /*#__PURE__*/_react["default"].createElement(_SearchSelectField.SearchSelectField, {
    open: true,
    onBackClick: goBack,
    title: _i18n["default"].getString('internalCallRecipient', currentLocale),
    placeholder: _i18n["default"].getString('search', currentLocale),
    options: transferAgentList,
    searchOption: searchAgent,
    currentLocale: currentLocale,
    listRenderer: function listRenderer(transferAgentList, scrollCheck) {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, transferAgentList.map(function (agent, i) {
        var agentId = agent.agentId,
            available = agent.available;
        var status = available ? 'available' : 'unavailable';

        var statusText = _i18n["default"].getString(status, currentLocale);

        var internalTransferName = (0, _EvTransferCallUI.getInternalTransferName)(agent);
        return /*#__PURE__*/_react["default"].createElement(_ListItemWithScrollCheck.ListItemWithScrollCheck, {
          onClick: function onClick() {
            return changeTransferAgentId(agentId);
          },
          selected: agentId === transferAgentId,
          key: i,
          scrollCheck: scrollCheck,
          "data-sign": "agentItem"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].agentItem
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"][status]
        }), /*#__PURE__*/_react["default"].createElement("div", {
          className: isWide ? _styles["default"].content : undefined
        }, /*#__PURE__*/_react["default"].createElement("p", {
          className: _styles["default"].agentName
        }, internalTransferName), /*#__PURE__*/_react["default"].createElement("p", {
          className: _styles["default"].statusText
        }, statusText))));
      }));
    }
  });
};

exports.InternalPanel = InternalPanel;
//# sourceMappingURL=InternalPanel.js.map
