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
exports.SimpleCallControlPanel = void 0;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.find-index");

var _react = _interopRequireWildcard(require("react"));

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _CallCtrlPanel = _interopRequireDefault(require("../CallCtrlPanel"));

var _callCtrlLayouts = _interopRequireDefault(require("../../enums/callCtrlLayouts"));

var _ActiveCallPad = require("../ActiveCallPad");

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SimpleCallControlPanel = function SimpleCallControlPanel(_ref) {
  var activeSession = _ref.activeSession,
      areaCode = _ref.areaCode,
      countryCode = _ref.countryCode,
      nameMatches = _ref.nameMatches,
      sessionId = _ref.sessionId,
      currentLocale = _ref.currentLocale,
      fallBackName = _ref.fallBackName,
      phoneNumber = _ref.phoneNumber,
      actions = _ref.actions,
      showContactDisplayPlaceholder = _ref.showContactDisplayPlaceholder,
      controlBusy = _ref.controlBusy,
      brandName = _ref.brandName,
      onBackButtonClick = _ref.onBackButtonClick,
      setActiveSessionId = _ref.setActiveSessionId,
      onMute = _ref.onMute,
      onUnmute = _ref.onUnmute,
      onHold = _ref.onHold,
      onUnhold = _ref.onUnhold,
      onHangup = _ref.onHangup,
      onTransfer = _ref.onTransfer;

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      selectedMatcherIndex = _useState2[0],
      setSelectedMatcherIndex = _useState2[1];

  var formatPhone = (0, _react.useCallback)(function (phoneNumber) {
    return (0, _formatNumber["default"])({
      phoneNumber: phoneNumber,
      areaCode: areaCode,
      countryCode: countryCode
    });
  }, [areaCode, countryCode]);
  var onSelectMatcherName = (0, _react.useCallback)(function (option) {
    var selectedMatcherIndex = (nameMatches !== null && nameMatches !== void 0 ? nameMatches : []).findIndex(function (match) {
      return match.id === option.id;
    });

    if (selectedMatcherIndex < 0) {
      selectedMatcherIndex = 0;
    }

    setSelectedMatcherIndex(selectedMatcherIndex);
  }, [nameMatches]);
  var renderTime = (0, _react.useRef)(0);
  (0, _react.useEffect)(function () {
    if (renderTime.current > 0 && !activeSession) {
      onBackButtonClick();
    }

    renderTime.current += 1;
  });
  (0, _react.useEffect)(function () {
    setActiveSessionId(sessionId);
  }, []);

  if (!activeSession) {
    // or using skeleton screen here
    return null;
  }

  return /*#__PURE__*/_react["default"].createElement(_CallCtrlPanel["default"], {
    sessionId: sessionId,
    currentLocale: currentLocale,
    fallBackName: fallBackName,
    phoneNumber: phoneNumber,
    onMute: onMute,
    onUnmute: onUnmute,
    onHold: onHold,
    onUnhold: onUnhold,
    onHangup: onHangup,
    onTransfer: onTransfer,
    showBackButton: true,
    backButtonLabel: _i18n["default"].getString('allCalls', currentLocale),
    onBackButtonClick: onBackButtonClick,
    formatPhone: formatPhone,
    areaCode: areaCode,
    countryCode: countryCode,
    selectedMatcherIndex: selectedMatcherIndex,
    layout: _callCtrlLayouts["default"].normalCtrl,
    startTime: activeSession.startTime,
    actions: actions,
    isOnMute: activeSession.isOnMute,
    isOnHold: activeSession.isOnHold,
    nameMatches: nameMatches,
    onSelectMatcherName: onSelectMatcherName,
    brand: brandName,
    showContactDisplayPlaceholder: showContactDisplayPlaceholder,
    controlBusy: controlBusy
  });
};

exports.SimpleCallControlPanel = SimpleCallControlPanel;
SimpleCallControlPanel.defaultProps = {
  setActiveSessionId: function setActiveSessionId() {},
  currentLocale: 'en-US',
  activeSession: null,
  sessionId: null,
  nameMatches: [],
  fallBackName: '',
  phoneNumber: '',
  showContactDisplayPlaceholder: false,
  controlBusy: false,
  actions: [_ActiveCallPad.ACTIONS_CTRL_MAP.muteCtrl, _ActiveCallPad.ACTIONS_CTRL_MAP.transferCtrl, _ActiveCallPad.ACTIONS_CTRL_MAP.holdCtrl]
};
//# sourceMappingURL=SimpleCallControlPanel.js.map
