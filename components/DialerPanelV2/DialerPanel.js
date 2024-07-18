"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialerPanel = void 0;
require("regenerator-runtime/runtime");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireWildcard(require("react"));
var _commonStyles = require("../../lib/commonStyles");
var _CommunicationSetupPanel = require("../CommunicationSetupPanel");
var _SpinnerOverlay = require("../SpinnerOverlay");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  flex: 1 1 auto;\n  margin: ", ";\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  [sf-classic] & {\n    height: 70%;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n"]);
  _templateObject4 = function _templateObject4() {
    return data;
  };
  return data;
}
function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  [sf-classic] & {\n    height: 90%;\n  }\n"]);
  _templateObject3 = function _templateObject3() {
    return data;
  };
  return data;
}
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n  margin-bottom: ", ";\n"]);
  _templateObject2 = function _templateObject2() {
    return data;
  };
  return data;
}
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n  box-sizing: border-box;\n  background: ", ";\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var DialerPanelContainer = _juno.styled.div(_templateObject(), _commonStyles.fullSizeStyle, (0, _juno.palette2)('neutral', 'f01'));
var BodyBottom = _juno.styled.div(_templateObject2(), _juno.flexCenterStyle, (0, _juno.spacing)(7));
var StyledRcDialPad = (0, _juno.styled)(_juno.RcDialPad)(_templateObject3());

// TODO: check withTabs
var DialerWrapper = _juno.styled.div(_templateObject4(), function (_ref) {
  var withTabs = _ref.withTabs;
  return withTabs ? (0, _juno.spacing)(0, 11) : (0, _juno.spacing)(2, 11);
});
var DialerPanel = function DialerPanel(props) {
  var currentLocale = props.currentLocale,
    onToNumberChange = props.onToNumberChange,
    toNumber = props.toNumber,
    fromNumber = props.fromNumber,
    fromNumbers = props.fromNumbers,
    changeFromNumber = props.changeFromNumber,
    formatPhone = props.formatPhone,
    isWebphoneMode = props.isWebphoneMode,
    showSpinner = props.showSpinner,
    recipients = props.recipients,
    setRecipient = props.setRecipient,
    clearRecipient = props.clearRecipient,
    autoFocus = props.autoFocus,
    _props$showFromField = props.showFromField,
    showFromField = _props$showFromField === void 0 ? true : _props$showFromField,
    _props$disableFromFie = props.disableFromField,
    disableFromField = _props$disableFromFie === void 0 ? false : _props$disableFromFie,
    children = props.children,
    showAnonymous = props.showAnonymous,
    callVolume = props.callVolume,
    outputDeviceId = props.outputDeviceId,
    onCallButtonClick = props.onCallButtonClick,
    callButtonDisabled = props.callButtonDisabled,
    withTabs = props.withTabs,
    ContactSearch = props.ContactSearch,
    triggerEventTracking = props.triggerEventTracking; // TODO: when have tag should check if need disable dial button
  // const hasTags = recipients.length > 0;
  var handleSelect = (0, _react.useCallback)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return setRecipient.apply(void 0, _args);
          case 2:
            onCallButtonClick();
          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [setRecipient, onCallButtonClick]);
  return /*#__PURE__*/_react["default"].createElement(DialerPanelContainer, null, /*#__PURE__*/_react["default"].createElement(_CommunicationSetupPanel.CommunicationSetupPanel, {
    ContactSearch: ContactSearch,
    triggerEventTracking: triggerEventTracking
    // To field
    ,
    recipients: recipients
    // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
    ,
    toNumber: toNumber
    // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
    ,
    onToNumberChange: onToNumberChange,
    setRecipient: handleSelect,
    clearRecipient: clearRecipient,
    autoFocus: autoFocus
    // From field
    ,
    showAnonymous: showAnonymous,
    fromNumber: fromNumber,
    fromNumbers: fromNumbers,
    changeFromNumber: changeFromNumber,
    formatPhone: formatPhone,
    showFromField: showFromField && isWebphoneMode,
    disableFromField: disableFromField
    // Common
    ,
    currentLocale: currentLocale
  }, /*#__PURE__*/_react["default"].createElement(DialerWrapper, {
    withTabs: withTabs
  }, /*#__PURE__*/_react["default"].createElement(StyledRcDialPad, {
    "data-sign": "dialPad",
    onChange: function onChange(value) {
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      onToNumberChange(toNumber + value, true);
    },
    sounds: _juno.RcDialerPadSoundsMPEG,
    getDialPadButtonProps: function getDialPadButtonProps(v) {
      return {
        'data-test-id': "".concat(v),
        'data-sign': "dialPadBtn".concat(v)
      };
    },
    volume: callVolume,
    sinkId: outputDeviceId
  })), /*#__PURE__*/_react["default"].createElement(BodyBottom, null, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    "data-sign": "callButton",
    color: "success.b03",
    symbol: _junoIcon.Phone,
    size: withTabs ? 'medium' : 'large',
    variant: "contained",
    elevation: "0",
    activeElevation: "0",
    onClick: function onClick() {
      return onCallButtonClick({
        clickDialerToCall: true
      });
    },
    disabled: callButtonDisabled
  })), showSpinner ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null) : null, children));
};
exports.DialerPanel = DialerPanel;
var Empty = function Empty() {
  return null;
};
DialerPanel.defaultProps = {
  callButtonDisabled: false,
  toNumber: '',
  fromNumbers: [],
  isWebphoneMode: false,
  changeFromNumber: Empty,
  onToNumberChange: Empty,
  formatPhone: function formatPhone(phoneNumber) {
    return phoneNumber;
  },
  showSpinner: false,
  callVolume: 1,
  outputDeviceId: '',
  recipients: [],
  autoFocus: false,
  showFromField: true,
  disableFromField: false,
  withTabs: false,
  inConference: false,
  isLastInputFromDialpad: false,
  showAnonymous: true
};
//# sourceMappingURL=DialerPanel.js.map
