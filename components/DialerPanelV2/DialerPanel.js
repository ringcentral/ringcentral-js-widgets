"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialerPanel = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _react = _interopRequireDefault(require("react"));

var _juno = require("@ringcentral/juno");

var _Phone = _interopRequireDefault(require("@ringcentral/juno/icon/Phone"));

var _SpinnerOverlay = require("../SpinnerOverlay");

var _CommunicationSetupPanel = require("../CommunicationSetupPanel");

var _commonStyles = require("../../lib/commonStyles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  flex: 1 1 auto;\n  margin: ", ";\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n"]);

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

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var DialerPanelContainer = _juno.styled.div(_templateObject(), _commonStyles.fullSizeStyle, (0, _juno.palette2)('neutral', 'f01'));

var BodyBottom = _juno.styled.div(_templateObject2(), _juno.flexCenterStyle, (0, _juno.spacing)(7)); // TODO: check withTabs


var DialerWrapper = _juno.styled.div(_templateObject3(), (0, _juno.spacing)(2, 11));

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
      dialButtonMuted = props.dialButtonMuted,
      dialButtonVolume = props.dialButtonVolume,
      onCallButtonClick = props.onCallButtonClick,
      callButtonDisabled = props.callButtonDisabled,
      withTabs = props.withTabs; // TODO: when have tag should check if need disable dial button
  // const hasTags = recipients.length > 0;

  return /*#__PURE__*/_react["default"].createElement(DialerPanelContainer, null, /*#__PURE__*/_react["default"].createElement(_CommunicationSetupPanel.CommunicationSetupPanel // To field
  , {
    recipients: recipients,
    toNumber: toNumber,
    onToNumberChange: onToNumberChange,
    setRecipient: setRecipient,
    clearRecipient: clearRecipient,
    autoFocus: autoFocus // From field
    ,
    showAnonymous: showAnonymous,
    fromNumber: fromNumber,
    fromNumbers: fromNumbers,
    changeFromNumber: changeFromNumber,
    formatPhone: formatPhone,
    showFromField: showFromField && isWebphoneMode,
    disableFromField: disableFromField // Common
    ,
    currentLocale: currentLocale
  }, /*#__PURE__*/_react["default"].createElement(DialerWrapper, {
    withTabs: withTabs
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcDialPad, {
    onChange: function onChange(value) {
      onToNumberChange(toNumber + value, true);
    },
    sounds: _juno.RcDialerPadSounds,
    getDialPadButtonProps: function getDialPadButtonProps(v) {
      return {
        'data-test-id': "".concat(v)
      };
    },
    volume: dialButtonVolume,
    muted: dialButtonMuted
  })), /*#__PURE__*/_react["default"].createElement(BodyBottom, null, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    "data-sign": "callButton",
    color: "success.b03",
    symbol: _Phone["default"],
    size: "large",
    variant: "contained",
    elevation: "0",
    activeElevation: "0",
    onClick: onCallButtonClick,
    disabled: callButtonDisabled
  })), showSpinner ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null) : null, children));
};

exports.DialerPanel = DialerPanel;

var Empty = function Empty() {
  return null;
};

DialerPanel.defaultProps = {
  className: null,
  dialButtonsClassName: null,
  fromNumber: null,
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
  dialButtonVolume: 1,
  dialButtonMuted: false,
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
