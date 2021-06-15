"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.index-of");

var _ramda = require("ramda");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _rcTooltip = _interopRequireDefault(require("rc-tooltip"));

var _Info = _interopRequireDefault(require("../../assets/images/Info.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _BackHeader = _interopRequireDefault(require("../BackHeader"));

var _Panel = _interopRequireDefault(require("../Panel"));

var _InputField = _interopRequireDefault(require("../InputField"));

var _DropdownSelect = _interopRequireDefault(require("../DropdownSelect"));

var _Button = require("../Button");

var _SaveButton = _interopRequireDefault(require("../SaveButton"));

var _IconLine = _interopRequireDefault(require("../IconLine"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TooltipCom = typeof _rcTooltip["default"] === 'function' ? _rcTooltip["default"] : _rcTooltip["default"]["default"];

var AudioSettingsPanel = /*#__PURE__*/function (_Component) {
  _inherits(AudioSettingsPanel, _Component);

  var _super = _createSuper(AudioSettingsPanel);

  function AudioSettingsPanel(props) {
    var _this;

    _classCallCheck(this, AudioSettingsPanel);

    _this = _super.call(this, props);
    _this._isFirefox = false;

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

    _this.renderDeviceOption = function (device, index) {
      var _this$props2 = _this.props,
          availableInputDevices = _this$props2.availableInputDevices,
          availableOutputDevices = _this$props2.availableOutputDevices,
          currentLocale = _this$props2.currentLocale;

      var noLabel = _i18n["default"].getString('noLabel', currentLocale);

      if (device.kind === 'audioinput' && availableInputDevices.length > 1) {
        return device.label || "".concat(noLabel, " ").concat(index + 1);
      }

      if (device.kind === 'audiooutput' && availableOutputDevices.length > 1) {
        return device.label || "".concat(noLabel, " ").concat(index + 1);
      }

      return device.label || noLabel;
    };

    _this.renderOutputDevice = function (value) {
      var _this$props3 = _this.props,
          availableOutputDevices = _this$props3.availableOutputDevices,
          currentLocale = _this$props3.currentLocale;

      if (value === null) {
        return _i18n["default"].getString('noDevice', currentLocale);
      }

      var device = (0, _ramda.find)(function (device) {
        return device.deviceId === value;
      }, availableOutputDevices);

      var noLabel = _i18n["default"].getString('noLabel', currentLocale);

      if (availableOutputDevices.length > 1) {
        var index = availableOutputDevices.indexOf(device);

        if (index >= 0) {
          noLabel = "".concat(noLabel, " ").concat(index + 1);
        }
      }

      return device && device.label || noLabel;
    };

    _this.renderInputDevice = function (value) {
      var _this$props4 = _this.props,
          availableInputDevices = _this$props4.availableInputDevices,
          currentLocale = _this$props4.currentLocale;

      if (value === null) {
        return _i18n["default"].getString('noDevice', currentLocale);
      }

      var device = (0, _ramda.find)(function (device) {
        return device.deviceId === value;
      }, availableInputDevices);

      var noLabel = _i18n["default"].getString('noLabel', currentLocale);

      if (availableInputDevices.length > 1) {
        var index = availableInputDevices.indexOf(device);

        if (index >= 0) {
          noLabel = "".concat(noLabel, " ").concat(index + 1);
        }
      }

      return device && device.label || noLabel;
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
    _this._isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
    return _this;
  } // eslint-disable-next-line react/no-deprecated


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
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.userMedia) {
        return;
      }

      if (this.props.availableInputDevices.length > 0 && this.props.availableInputDevices[0].label === '') {
        this.props.checkUserMedia();
      }
    }
  }, {
    key: "renderDeviceValue",
    value: function renderDeviceValue(device) {
      return device.deviceId;
    }
  }, {
    key: "isNoLabel",
    value: function isNoLabel() {
      var availableInputDevices = this.props.availableInputDevices;
      var noLabel = false;

      if (availableInputDevices && availableInputDevices.length) {
        noLabel = availableInputDevices[0].label === '';
      } else {
        noLabel = this._isFirefox;
      }

      return noLabel;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props5 = this.props,
          currentLocale = _this$props5.currentLocale,
          onBackButtonClick = _this$props5.onBackButtonClick,
          className = _this$props5.className,
          availableOutputDevices = _this$props5.availableOutputDevices,
          availableInputDevices = _this$props5.availableInputDevices,
          supportDevices = _this$props5.supportDevices,
          userMedia = _this$props5.userMedia,
          isWebRTC = _this$props5.isWebRTC,
          checkUserMedia = _this$props5.checkUserMedia,
          outputDeviceDisabled = _this$props5.outputDeviceDisabled,
          inputDeviceDisabled = _this$props5.inputDeviceDisabled;
      var _this$state2 = this.state,
          dialButtonVolume = _this$state2.dialButtonVolume,
          dialButtonMuted = _this$state2.dialButtonMuted,
          ringtoneVolume = _this$state2.ringtoneVolume,
          ringtoneMuted = _this$state2.ringtoneMuted,
          callVolume = _this$state2.callVolume,
          outputDeviceId = _this$state2.outputDeviceId,
          inputDeviceId = _this$state2.inputDeviceId;
      var hasChanges = this.props.dialButtonVolume !== dialButtonVolume || this.props.dialButtonMuted !== dialButtonMuted || this.props.ringtoneVolume !== ringtoneVolume || this.props.ringtoneMuted !== ringtoneMuted || this.props.callVolume !== callVolume || this.props.inputDeviceId !== inputDeviceId || this.props.outputDeviceId !== outputDeviceId; // TODO: improve UI

      var permission = !userMedia ? /*#__PURE__*/_react["default"].createElement(_IconLine["default"], {
        noBorder: true,
        icon: /*#__PURE__*/_react["default"].createElement(_Button.Button, {
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

      var outputDeviceDropdown = supportDevices ? /*#__PURE__*/_react["default"].createElement(_InputField["default"], {
        label: /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString('outputDevice', currentLocale)),
        noBorder: true
      }, /*#__PURE__*/_react["default"].createElement(_DropdownSelect["default"], {
        className: _styles["default"].select,
        disabled: outputDeviceDisabled,
        value: availableOutputDevices.length ? outputDeviceId : null,
        onChange: this.onOutputDeviceIdChange,
        options: availableOutputDevices,
        dropdownAlign: "left",
        renderFunction: this.renderDeviceOption,
        valueFunction: this.renderDeviceValue,
        renderValue: this.renderOutputDevice,
        titleEnabled: true
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].tooltipContainer,
        ref: function ref(tooltipContainer) {
          _this3.outputTooltipContainner = tooltipContainer;
        }
      })) : null; // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices
      // Prior to Firefox 63, enumerateDevices() only returned input devices. Starting with Firefox 63, output devices are also included if the `media.setsinkid.enabled` preference is enabled.
      // disabledFrom version 63: this feature is behind the `media.setsinkid.enabled` preferences (needs to be set to true). To change preferences in Firefox, visit about:config.

      var outputDevice = this._isFirefox && !(availableOutputDevices === null || availableOutputDevices === void 0 ? void 0 : availableOutputDevices.length) ? /*#__PURE__*/_react["default"].createElement(_InputField["default"], {
        className: _styles["default"].noHeightInputField,
        label: /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString('outputDevice', currentLocale)),
        noBorder: true
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].fakeDropdownContainer
      }, _i18n["default"].getString('defaultOutputDevice', currentLocale))) : outputDeviceDropdown;
      var inputTooltip = this.isNoLabel() ? /*#__PURE__*/_react["default"].createElement(TooltipCom, {
        placement: "bottom",
        trigger: "click",
        align: {
          offset: [0, 47]
        },
        overlay: _i18n["default"].getString('noLabelTip', currentLocale),
        arrowContent: /*#__PURE__*/_react["default"].createElement("div", {
          className: "rc-tooltip-arrow-inner"
        }),
        getTooltipContainer: function getTooltipContainer() {
          return _this3.inputTooltipContainner;
        }
      }, /*#__PURE__*/_react["default"].createElement(_Info["default"], {
        width: 14,
        height: 14,
        className: _styles["default"].infoIcon
      })) : null;
      var inputDevice = supportDevices ? /*#__PURE__*/_react["default"].createElement(_InputField["default"], {
        label: /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString('inputDevice', currentLocale), inputTooltip),
        noBorder: true
      }, /*#__PURE__*/_react["default"].createElement(_DropdownSelect["default"], {
        className: _styles["default"].select,
        disabled: inputDeviceDisabled,
        value: availableInputDevices.length ? inputDeviceId : null,
        onChange: this.onInputDeviceIdChange,
        options: availableInputDevices,
        dropdownAlign: "left",
        renderFunction: this.renderDeviceOption,
        valueFunction: this.renderDeviceValue,
        renderValue: this.renderInputDevice,
        titleEnabled: true
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].tooltipContainer,
        ref: function ref(tooltipContainer) {
          _this3.inputTooltipContainner = tooltipContainer;
        }
      })) : null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, className)
      }, /*#__PURE__*/_react["default"].createElement(_BackHeader["default"], {
        onBackClick: onBackButtonClick
      }, _i18n["default"].getString('title', currentLocale)), /*#__PURE__*/_react["default"].createElement(_Panel["default"], {
        className: _styles["default"].content
      }, outputDevice, inputDevice, permission, /*#__PURE__*/_react["default"].createElement(_SaveButton["default"], {
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
