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
exports.InboundQueuesPanel = void 0;

require("core-js/modules/es6.array.is-array");

var _react = _interopRequireWildcard(require("react"));

var _formatMessage = _interopRequireDefault(require("format-message"));

var _juno = require("@ringcentral/juno");

var _SelectList = require("../SelectList");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
  }, (0, _formatMessage["default"])(_i18n["default"].getString('selectedTips', currentLocale), {
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
