'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _BackHeader = require('../BackHeader');

var _BackHeader2 = _interopRequireDefault(_BackHeader);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _InputField = require('../InputField');

var _InputField2 = _interopRequireDefault(_InputField);

var _DropdownSelect = require('../DropdownSelect');

var _DropdownSelect2 = _interopRequireDefault(_DropdownSelect);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _SaveButton = require('../SaveButton');

var _SaveButton2 = _interopRequireDefault(_SaveButton);

var _IconLine = require('../IconLine');

var _IconLine2 = _interopRequireDefault(_IconLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AudioSettingsPanel = function (_Component) {
  (0, _inherits3.default)(AudioSettingsPanel, _Component);

  function AudioSettingsPanel(props) {
    (0, _classCallCheck3.default)(this, AudioSettingsPanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AudioSettingsPanel.__proto__ || (0, _getPrototypeOf2.default)(AudioSettingsPanel)).call(this, props));

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
      var device = _this.props.availableOutputDevices.find(function (device) {
        return device.deviceId === value;
      });
      return device && device.label || value;
    };

    _this.renderInputDevice = function (value) {
      var device = _this.props.availableInputDevices.find(function (device) {
        return device.deviceId === value;
      });
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

  (0, _createClass3.default)(AudioSettingsPanel, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
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
      if (newProps.inputDeviceId !== this.props.inputDeviceId) {
        this.setState({
          inputDeviceId: newProps.inputDeviceId
        });
      }
      if (newProps.outputDeviceId !== this.props.outputDeviceId) {
        this.setState({
          outputDeviceId: newProps.outputDeviceId
        });
      }
    }
  }, {
    key: 'renderDeviceOption',
    value: function renderDeviceOption(device) {
      return device.label;
    }
  }, {
    key: 'renderDeviceValue',
    value: function renderDeviceValue(device) {
      return device.deviceId;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          currentLocale = _props.currentLocale,
          onBackButtonClick = _props.onBackButtonClick,
          className = _props.className,
          availableOutputDevices = _props.availableOutputDevices,
          availableInputDevices = _props.availableInputDevices,
          supportDevices = _props.supportDevices,
          userMedia = _props.userMedia,
          isWebRTC = _props.isWebRTC,
          checkUserMedia = _props.checkUserMedia;
      var _state = this.state,
          dialButtonVolume = _state.dialButtonVolume,
          dialButtonMuted = _state.dialButtonMuted,
          ringtoneVolume = _state.ringtoneVolume,
          ringtoneMuted = _state.ringtoneMuted,
          callVolume = _state.callVolume,
          outputDeviceId = _state.outputDeviceId,
          inputDeviceId = _state.inputDeviceId;

      var hasChanges = this.props.dialButtonVolume !== dialButtonVolume || this.props.dialButtonMuted !== dialButtonMuted || this.props.ringtoneVolume !== ringtoneVolume || this.props.ringtoneMuted !== ringtoneMuted || this.props.callVolume !== callVolume || this.props.inputDeviceId !== inputDeviceId || this.props.outputDeviceId !== outputDeviceId;

      // TODO improve UI and add i18n support
      var permission = userMedia && isWebRTC ? null : _react2.default.createElement(
        _IconLine2.default,
        {
          noBorder: true,
          icon: _react2.default.createElement(
            _Button2.default,
            { onClick: checkUserMedia },
            'Check Permission'
          )
        },
        'The app does not have permission to use microphone'
      );

      // const webphoneVolume = isWebRTC ?
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

      var devices = supportDevices && userMedia && isWebRTC ? _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _InputField2.default,
          {
            label: _i18n2.default.getString('outputDevice', currentLocale),
            noBorder: true
          },
          _react2.default.createElement(_DropdownSelect2.default, {
            className: _styles2.default.select,
            value: outputDeviceId,
            onChange: this.onOutputDeviceIdChange,
            options: availableOutputDevices,
            dropdownAlign: 'left',
            renderFunction: this.renderDeviceOption,
            valueFunction: this.renderDeviceValue,
            renderValue: this.renderOutputDevice,
            titleEnabled: true
          })
        ),
        _react2.default.createElement(
          _InputField2.default,
          {
            label: _i18n2.default.getString('inputDevice', currentLocale),
            noBorder: true
          },
          _react2.default.createElement(_DropdownSelect2.default, {
            className: _styles2.default.select,
            value: inputDeviceId,
            onChange: this.onInputDeviceIdChange,
            options: availableInputDevices,
            dropdownAlign: 'left',
            renderFunction: this.renderDeviceOption,
            valueFunction: this.renderDeviceValue,
            renderValue: this.renderInputDevice,
            titleEnabled: true
          })
        )
      ) : null;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.root, className) },
        _react2.default.createElement(
          _BackHeader2.default,
          {
            onBackClick: onBackButtonClick
          },
          _i18n2.default.getString('title', currentLocale)
        ),
        _react2.default.createElement(
          _Panel2.default,
          { className: _styles2.default.content },
          devices,
          permission,
          _react2.default.createElement(_SaveButton2.default, {
            currentLocale: currentLocale,
            onClick: this.onSave,
            disabled: !hasChanges
          })
        )
      );
    }
  }]);
  return AudioSettingsPanel;
}(_react.Component);

exports.default = AudioSettingsPanel;


var devicePropType = {
  deviceId: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.string.isRequired
};

AudioSettingsPanel.propTypes = {
  className: _propTypes2.default.string,
  currentLocale: _propTypes2.default.string.isRequired,
  dialButtonVolume: _propTypes2.default.number.isRequired,
  ringtoneVolume: _propTypes2.default.number.isRequired,
  ringtoneMuted: _propTypes2.default.bool.isRequired,
  callVolume: _propTypes2.default.number.isRequired,
  dialButtonMuted: _propTypes2.default.bool.isRequired,
  onBackButtonClick: _propTypes2.default.func.isRequired,
  availableInputDevices: _propTypes2.default.arrayOf(_propTypes2.default.shape(devicePropType)).isRequired,
  inputDeviceId: _propTypes2.default.string.isRequired,
  availableOutputDevices: _propTypes2.default.arrayOf(_propTypes2.default.shape(devicePropType)).isRequired,
  outputDeviceId: _propTypes2.default.string.isRequired,
  supportDevices: _propTypes2.default.bool.isRequired,
  onSave: _propTypes2.default.func.isRequired,
  userMedia: _propTypes2.default.bool.isRequired,
  isWebRTC: _propTypes2.default.bool.isRequired,
  checkUserMedia: _propTypes2.default.func.isRequired
};

AudioSettingsPanel.defaultProps = {
  className: null
};
//# sourceMappingURL=index.js.map
