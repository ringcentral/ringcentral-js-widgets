"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequeueCallGroupDetailPanel = void 0;

require("core-js/modules/es6.array.is-array");

var _react = _interopRequireWildcard(require("react"));

var _Tooltip = require("@ringcentral-integration/widgets/components/Rcui/Tooltip");

var _toolTipDelayTime = require("@ringcentral-integration/widgets/lib/toolTipDelayTime");

var _juno = require("@ringcentral/juno");

var _SelectList = require("../../../SelectList");

var _styles = _interopRequireDefault(require("../styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
