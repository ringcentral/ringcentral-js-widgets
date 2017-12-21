'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ActiveCallPad;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _recordStatus = require('ringcentral-integration/modules/Webphone/recordStatus');

var _recordStatus2 = _interopRequireDefault(_recordStatus);

var _CircleButton = require('../CircleButton');

var _CircleButton2 = _interopRequireDefault(_CircleButton);

var _ActiveCallButton = require('../ActiveCallButton');

var _ActiveCallButton2 = _interopRequireDefault(_ActiveCallButton);

var _Mute = require('../../assets/images/Mute.svg');

var _Mute2 = _interopRequireDefault(_Mute);

var _Unmute = require('../../assets/images/Unmute.svg');

var _Unmute2 = _interopRequireDefault(_Unmute);

var _Dialpad = require('../../assets/images/Dialpad.svg');

var _Dialpad2 = _interopRequireDefault(_Dialpad);

var _Hold = require('../../assets/images/Hold.svg');

var _Hold2 = _interopRequireDefault(_Hold);

var _Park = require('../../assets/images/Park.svg');

var _Park2 = _interopRequireDefault(_Park);

var _Record = require('../../assets/images/Record.svg');

var _Record2 = _interopRequireDefault(_Record);

var _AddCall = require('../../assets/images/AddCall.svg');

var _AddCall2 = _interopRequireDefault(_AddCall);

var _Transfer = require('../../assets/images/Transfer.svg');

var _Transfer2 = _interopRequireDefault(_Transfer);

var _Flip = require('../../assets/images/Flip.svg');

var _Flip2 = _interopRequireDefault(_Flip);

var _End = require('../../assets/images/End.svg');

var _End2 = _interopRequireDefault(_End);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ActiveCallPad(props) {
  var muteButton = props.isOnMute ? _react2.default.createElement(_ActiveCallButton2.default, {
    onClick: props.onUnmute,
    className: _styles2.default.callButton,
    icon: _Mute2.default,
    title: _i18n2.default.getString('unmute', props.currentLocale)
  }) : _react2.default.createElement(_ActiveCallButton2.default, {
    onClick: props.onMute,
    className: _styles2.default.callButton,
    title: _i18n2.default.getString('mute', props.currentLocale),
    icon: _Unmute2.default
  });
  var onHoldClicked = props.isOnHold ? props.onUnhold : props.onHold;
  var onRecordClicked = props.recordStatus === _recordStatus2.default.recording ? props.onStopRecord : props.onRecord;
  var disabledFlip = props.flipNumbers.length === 0;
  var recordTitle = props.recordStatus === _recordStatus2.default.recording ? _i18n2.default.getString('stopRecord', props.currentLocale) : _i18n2.default.getString('record', props.currentLocale);
  var isRecordButtonActive = props.recordStatus === _recordStatus2.default.recording;
  var isRecordDisabled = props.recordStatus === _recordStatus2.default.pending;
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.root, props.className) },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.callCtrlButtonGroup },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.buttonRow },
        muteButton,
        _react2.default.createElement(_ActiveCallButton2.default, {
          onClick: props.onShowKeyPad,
          className: _styles2.default.callButton,
          icon: _Dialpad2.default,
          title: _i18n2.default.getString('keypad', props.currentLocale)
        }),
        _react2.default.createElement(_ActiveCallButton2.default, {
          onClick: onHoldClicked,
          className: _styles2.default.callButton,
          title: props.isOnHold ? _i18n2.default.getString('onHold', props.currentLocale) : _i18n2.default.getString('hold', props.currentLocale),
          active: props.isOnHold,
          icon: _Hold2.default,
          iconWidth: 120,
          iconHeight: 160,
          iconX: 190,
          iconY: 165
        })
      ),
      _react2.default.createElement(
        'div',
        { className: _styles2.default.buttonRow },
        _react2.default.createElement(_ActiveCallButton2.default, {
          onClick: props.onToggleTransferPanel,
          title: _i18n2.default.getString('transfer', props.currentLocale),
          icon: _Transfer2.default,
          className: _styles2.default.callButton,
          iconWidth: 220,
          iconX: 140
        }),
        _react2.default.createElement(_ActiveCallButton2.default, {
          onClick: onRecordClicked,
          title: recordTitle,
          active: isRecordButtonActive,
          className: _styles2.default.callButton,
          icon: _Record2.default,
          disabled: props.isOnHold || isRecordDisabled
        }),
        _react2.default.createElement(_ActiveCallButton2.default, {
          onClick: props.onShowFlipPanel,
          title: _i18n2.default.getString('flip', props.currentLocale),
          icon: _Flip2.default,
          className: _styles2.default.callButton,
          disabled: disabledFlip || props.isOnHold,
          iconWidth: 220,
          iconHeight: 215,
          iconX: 140,
          iconY: 142
        })
      )
    ),
    _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(_styles2.default.buttonRow, _styles2.default.stopButtonGroup) },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.button },
        _react2.default.createElement(_CircleButton2.default, {
          className: _styles2.default.stopButton,
          onClick: props.onHangup,
          icon: _End2.default,
          showBorder: false,
          iconWidth: 250,
          iconX: 125
        })
      )
    )
  );
}

ActiveCallPad.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  className: _propTypes2.default.string,
  isOnMute: _propTypes2.default.bool,
  isOnHold: _propTypes2.default.bool,
  recordStatus: _propTypes2.default.string.isRequired,
  onMute: _propTypes2.default.func.isRequired,
  onUnmute: _propTypes2.default.func.isRequired,
  onHold: _propTypes2.default.func.isRequired,
  onUnhold: _propTypes2.default.func.isRequired,
  onRecord: _propTypes2.default.func.isRequired,
  onStopRecord: _propTypes2.default.func.isRequired,
  onHangup: _propTypes2.default.func.isRequired,
  onPark: _propTypes2.default.func.isRequired,
  onShowKeyPad: _propTypes2.default.func.isRequired,
  onAdd: _propTypes2.default.func.isRequired,
  onShowFlipPanel: _propTypes2.default.func.isRequired,
  onToggleTransferPanel: _propTypes2.default.func.isRequired,
  flipNumbers: _propTypes2.default.array.isRequired
};

ActiveCallPad.defaultProps = {
  className: null,
  isOnMute: false,
  isOnHold: false
};
//# sourceMappingURL=index.js.map
