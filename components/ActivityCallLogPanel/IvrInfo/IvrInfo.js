"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
exports.IvrInfo = void 0;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.map");

var _Accordion = require("@ringcentral/juno/components/Accordion");

var _AccordionDetails = require("@ringcentral/juno/components/Accordion/AccordionDetails");

var _AccordionSummary = require("@ringcentral/juno/components/Accordion/AccordionSummary");

var _ArrowDown = _interopRequireDefault(require("@ringcentral/juno/icon/ArrowDown2"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
  }, /*#__PURE__*/_react["default"].createElement(_Accordion.RcAccordion, {
    onChange: function onChange() {
      return setExpanded(!expanded);
    },
    expanded: expanded,
    classes: {
      root: (0, _classnames["default"])(_styles["default"].panelRoot, isCallEnd && _styles["default"].endCall),
      expanded: _styles["default"].expanded
    }
  }, /*#__PURE__*/_react["default"].createElement(_AccordionSummary.RcAccordionSummary, {
    classes: {
      root: (0, _classnames["default"])(_styles["default"].summaryRoot, agentScriptData && _styles["default"].summaryAgentScriptIconPaddingRight),
      content: (0, _classnames["default"])(_styles["default"].summaryContent, agentScriptData && _styles["default"].summaryAgentScriptIconWidth)
    },
    IconButtonProps: {
      size: 'small'
    },
    expandIcon: _ArrowDown["default"]
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: (0, _classnames["default"])(_styles["default"].ivrMainSubject, agentScriptData && _styles["default"].summaryAgentScriptIconWidth)
  }, ivrAlertData[0].subject || ''), ivrAlertData.length > 1 ? /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].count
  }, " +", ivrAlertData.length - 1) : null), /*#__PURE__*/_react["default"].createElement(_AccordionDetails.RcAccordionDetails, {
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
