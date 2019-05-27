"use strict";

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _ramda = require("ramda");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _BackHeader = _interopRequireDefault(require("../BackHeader"));

var _Panel = _interopRequireDefault(require("../Panel"));

var _InputField = _interopRequireDefault(require("../InputField"));

var _DropdownSelect = _interopRequireDefault(require("../DropdownSelect"));

var _Button = _interopRequireDefault(require("../Button"));

var _SaveButton = _interopRequireDefault(require("../SaveButton"));

var _IconLine = _interopRequireDefault(require("../IconLine"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AudioSettingsPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(AudioSettingsPanel, _Component);

  function AudioSettingsPanel(props) {
    var _this;

    _classCallCheck(this, AudioSettingsPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AudioSettingsPanel).call(this, props));

    _this.onSave = function () {
      if (typeof _this.props.onSave === 'function') {
        var _this$state = _this.state,
            dialButtonVolume = _this$state.dialButtonVolume,
            dialButtonMuted = _this$state.dialButtonMuted,
            ringtoneVolume = _this$state.ringtoneVolume,
            ringtoneMuted = _this$state.ringtoneMuted,
            callVolume = _this$state.callVolume,
            inputDeviceId = _this$state.inputDeviceId,
            outputDeviceId = _this$state.outputDeviceId;

        _this.props.onSave({
          dialButtonVolume: dialButtonVolume,
          dialButtonMuted: dialButtonMuted,
          ringtoneVolume: ringtoneVolume,
          ringtoneMuted: ringtoneMuted,
          callVolume: callVolume,
          inputDeviceId: inputDeviceId,
          outputDeviceId: outputDeviceId
        });
      }
    };

    _this.onReset = function () {
      var _this$props = _this.props,
          dialButtonVolume = _this$props.dialButtonVolume,
          dialButtonMuted = _this$props.dialButtonMuted,
          ringtoneVolume = _this$props.ringtoneVolume,
          ringtoneMuted = _this$props.ringtoneMuted,
          callVolume = _this$props.callVolume,
          inputDeviceId = _this$props.inputDeviceId,
          outputDeviceId = _this$props.outputDeviceId;

      _this.setState({
        dialButtonVolume: dialButtonVolume,
        dialButtonMuted: dialButtonMuted,
        ringtoneVolume: ringtoneVolume,
        ringtoneMuted: ringtoneMuted,
        callVolume: callVolume,
        inputDeviceId: inputDeviceId,
        outputDeviceId: outputDeviceId
      });
    };

    _this.onDialButtonVolumeChange = function (dialButtonVolume) {
      _this.setState({
        dialButtonVolume: dialButtonVolume
      });
    };

    _this.onDialButtonMutedChange = function (dialButtonMuted) {
      _this.setState({
        dialButtonMuted: dialButtonMuted
      });
    };

    _this.onRingtoneVolumeChange = function (ringtoneVolume) {
      _this.setState({
        ringtoneVolume: ringtoneVolume
      });
    };

    _this.onRingtoneMutedChange = function (ringtoneMuted) {
      _this.setState({
        ringtoneMuted: ringtoneMuted
      });
    };

    _this.onCallVolumeChange = function (callVolume) {
      _this.setState({
        callVolume: callVolume
      });
    };

    _this.onOutputDeviceIdChange = function (device) {
      _this.setState({
        outputDeviceId: device.deviceId
      });
    };

    _this.onInputDeviceIdChange = function (device) {
      _this.setState({
        inputDeviceId: device.deviceId
      });
    };

    _this.renderOutputDevice = function (value) {
      var device = (0, _ramda.find)(function (device) {
        return device.deviceId === value;
      }, _this.props.availableOutputDevices);
      return device && device.label || value;
    };

    _this.renderInputDevice = function (value) {
      var device = (0, _ramda.find)(function (device) {
        return device.deviceId === value;
      }, _this.props.availableInputDevices);
      return device && device.label || value;
    };

    _this.state = {
      dialButtonVolume: props.dialButtonVolume,
      dialButtonMuted: props.dialButtonMuted,
      ringtoneVolume: props.ringtoneVolume,
      ringtoneMuted: props.ringtoneMuted,
      callVolume: props.callVolume,
      inputDeviceId: props.inputDeviceId,
      outputDeviceId: props.outputDeviceId
    };
    return _this;
  }

  _createClass(AudioSettingsPanel, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      var _this2 = this;

      if (newProps.dialButtonVolume !== this.props.dialButtonVolume) {
        this.setState({
          dialButtonVolume: newProps.dialButtonVolume
        });
      }

      if (newProps.dialButtonMuted !== this.props.dialButtonMuted) {
        this.setState({
          dialButtonMuted: newProps.dialButtonMuted
        });
      }

      if (newProps.ringtoneVolume !== this.props.ringtoneVolume) {
        this.setState({
          ringtoneVolume: newProps.ringtoneVolume
        });
      }

      if (newProps.ringtoneMuted !== this.props.ringtoneMuted) {
        this.setState({
          ringtoneMuted: newProps.ringtoneMuted
        });
      }

      if (newProps.callVolume !== this.props.callVolume) {
        this.setState({
          callVolume: newProps.callVolume
        });
      }

      if (newProps.inputDeviceId !== this.props.inputDeviceId || (0, _ramda.all)(function (device) {
        return device.deviceId !== _this2.state.inputDeviceId;
      }, newProps.availableInputDevices)) {
        this.setState({
          inputDeviceId: newProps.inputDeviceId
        });
      }

      if (newProps.outputDeviceId !== this.props.outputDeviceId || (0, _ramda.all)(function (device) {
        return device.deviceId !== _this2.state.outputDeviceId;
      }, newProps.availableOutputDevices)) {
        this.setState({
          outputDeviceId: newProps.outputDeviceId
        });
      }
    }
  }, {
    key: "renderDeviceOption",
    value: function renderDeviceOption(device) {
      return device.label;
    }
  }, {
    key: "renderDeviceValue",
    value: function renderDeviceValue(device) {
      return device.deviceId;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          currentLocale = _this$props2.currentLocale,
          onBackButtonClick = _this$props2.onBackButtonClick,
          className = _this$props2.className,
          availableOutputDevices = _this$props2.availableOutputDevices,
          availableInputDevices = _this$props2.availableInputDevices,
          supportDevices = _this$props2.supportDevices,
          userMedia = _this$props2.userMedia,
          isWebRTC = _this$props2.isWebRTC,
          checkUserMedia = _this$props2.checkUserMedia,
          outputDeviceDisabled = _this$props2.outputDeviceDisabled,
          inputDeviceDisabled = _this$props2.inputDeviceDisabled;
      var _this$state2 = this.state,
          dialButtonVolume = _this$state2.dialButtonVolume,
          dialButtonMuted = _this$state2.dialButtonMuted,
          ringtoneVolume = _this$state2.ringtoneVolume,
          ringtoneMuted = _this$state2.ringtoneMuted,
          callVolume = _this$state2.callVolume,
          outputDeviceId = _this$state2.outputDeviceId,
          inputDeviceId = _this$state2.inputDeviceId;
      var hasChanges = this.props.dialButtonVolume !== dialButtonVolume || this.props.dialButtonMuted !== dialButtonMuted || this.props.ringtoneVolume !== ringtoneVolume || this.props.ringtoneMuted !== ringtoneMuted || this.props.callVolume !== callVolume || this.props.inputDeviceId !== inputDeviceId || this.props.outputDeviceId !== outputDeviceId; // TODO: improve UI

      var permission = !userMedia ? _react["default"].createElement(_IconLine["default"], {
        noBorder: true,
        icon: _react["default"].createElement(_Button["default"], {
          onClick: checkUserMedia
        }, _i18n["default"].getString('checkMicPermission'))
      }, _i18n["default"].getString('micNoPermissionMessage')) : null; // const webphoneVolume = isWebRTC ?
      //   (
      //     <div>
      //       <InputField
      //         label={i18n.getString('ringtoneVolume', currentLocale)}
      //     >
      //         {`${ringtoneVolume * 100}%`}
      //       </InputField>
      //       <InputField
      //         label={i18n.getString('callVolume', currentLocale)}
      //     >
      //         {`${callVolume * 100}%`}
      //       </InputField>
      //     </div>
      //   ) : null;

      var outputDevice = supportDevices ? _react["default"].createElement(_InputField["default"], {
        label: _i18n["default"].getString('outputDevice', currentLocale),
        noBorder: true
      }, _react["default"].createElement(_DropdownSelect["default"], {
        className: _styles["default"].select,
        disabled: outputDeviceDisabled,
        value: availableOutputDevices.length ? outputDeviceId : _i18n["default"].getString('noDevice', currentLocale),
        onChange: this.onOutputDeviceIdChange,
        options: availableOutputDevices,
        dropdownAlign: "left",
        renderFunction: this.renderDeviceOption,
        valueFunction: this.renderDeviceValue,
        renderValue: this.renderOutputDevice,
        titleEnabled: true
      })) : null;
      var inputDevice = supportDevices ? _react["default"].createElement(_InputField["default"], {
        label: _i18n["default"].getString('inputDevice', currentLocale),
        noBorder: true
      }, _react["default"].createElement(_DropdownSelect["default"], {
        className: _styles["default"].select,
        disabled: inputDeviceDisabled,
        value: availableInputDevices.length ? inputDeviceId : _i18n["default"].getString('noDevice', currentLocale),
        onChange: this.onInputDeviceIdChange,
        options: availableInputDevices,
        dropdownAlign: "left",
        renderFunction: this.renderDeviceOption,
        valueFunction: this.renderDeviceValue,
        renderValue: this.renderInputDevice,
        titleEnabled: true
      })) : null;
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, className)
      }, _react["default"].createElement(_BackHeader["default"], {
        onBackClick: onBackButtonClick
      }, _i18n["default"].getString('title', currentLocale)), _react["default"].createElement(_Panel["default"], {
        className: _styles["default"].content
      }, outputDevice, inputDevice, permission, _react["default"].createElement(_SaveButton["default"], {
        currentLocale: currentLocale,
        onClick: this.onSave,
        disabled: !hasChanges
      })));
    }
  }]);

  return AudioSettingsPanel;
}(_react.Component);

exports["default"] = AudioSettingsPanel;
var devicePropType = {
  deviceId: _propTypes["default"].string.isRequired,
  label: _propTypes["default"].string.isRequired
};
AudioSettingsPanel.propTypes = {
  className: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string.isRequired,
  dialButtonVolume: _propTypes["default"].number.isRequired,
  ringtoneVolume: _propTypes["default"].number.isRequired,
  ringtoneMuted: _propTypes["default"].bool.isRequired,
  callVolume: _propTypes["default"].number.isRequired,
  dialButtonMuted: _propTypes["default"].bool.isRequired,
  onBackButtonClick: _propTypes["default"].func.isRequired,
  availableInputDevices: _propTypes["default"].arrayOf(_propTypes["default"].shape(devicePropType)).isRequired,
  inputDeviceId: _propTypes["default"].string.isRequired,
  availableOutputDevices: _propTypes["default"].arrayOf(_propTypes["default"].shape(devicePropType)).isRequired,
  outputDeviceId: _propTypes["default"].string.isRequired,
  supportDevices: _propTypes["default"].bool.isRequired,
  onSave: _propTypes["default"].func.isRequired,
  userMedia: _propTypes["default"].bool.isRequired,
  isWebRTC: _propTypes["default"].bool.isRequired,
  checkUserMedia: _propTypes["default"].func.isRequired,
  outputDeviceDisabled: _propTypes["default"].bool,
  inputDeviceDisabled: _propTypes["default"].bool
};
AudioSettingsPanel.defaultProps = {
  className: null,
  outputDeviceDisabled: false,
  inputDeviceDisabled: false
};
//# sourceMappingURL=index.js.map
