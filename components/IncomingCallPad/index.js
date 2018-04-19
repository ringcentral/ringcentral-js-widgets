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

var _rcTooltip = require('rc-tooltip');

var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

require('rc-tooltip/assets/bootstrap_white.css');

var _ForwardForm = require('../ForwardForm');

var _ForwardForm2 = _interopRequireDefault(_ForwardForm);

var _ReplyWithMessage = require('../ReplyWithMessage');

var _ReplyWithMessage2 = _interopRequireDefault(_ReplyWithMessage);

var _ActiveCallButton = require('../ActiveCallButton');

var _ActiveCallButton2 = _interopRequireDefault(_ActiveCallButton);

var _MultiCallAnswerButton = require('../MultiCallAnswerButton');

var _MultiCallAnswerButton2 = _interopRequireDefault(_MultiCallAnswerButton);

var _MessageFill = require('../../assets/images/MessageFill.svg');

var _MessageFill2 = _interopRequireDefault(_MessageFill);

var _Forward = require('../../assets/images/Forward.svg');

var _Forward2 = _interopRequireDefault(_Forward);

var _Ignore = require('../../assets/images/Ignore.svg');

var _Ignore2 = _interopRequireDefault(_Ignore);

var _Voicemail = require('../../assets/images/Voicemail.svg');

var _Voicemail2 = _interopRequireDefault(_Voicemail);

var _Answer = require('../../assets/images/Answer.svg');

var _Answer2 = _interopRequireDefault(_Answer);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IncomingCallPad = function (_Component) {
  (0, _inherits3.default)(IncomingCallPad, _Component);

  function IncomingCallPad(props) {
    (0, _classCallCheck3.default)(this, IncomingCallPad);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IncomingCallPad.__proto__ || (0, _getPrototypeOf2.default)(IncomingCallPad)).call(this, props));

    _this.state = {
      showForward: false,
      replyMessage: null,
      showReplyWithMessage: false,
      toVoiceMailEnabled: true,
      replyMessageEnabled: true
    };
    _this.onShowForwardChange = function (visible) {
      _this.setState({
        showForward: visible
      });
    };
    _this.closeForwardForm = function () {
      _this.onShowForwardChange(false);
    };
    _this.onShowReplyWithMessageChange = function (visible) {
      _this.setState({
        showReplyWithMessage: visible
      });
    };
    _this.onReplyMessageChange = function (message) {
      _this.setState({ replyMessage: message });
    };
    _this.closeReplyWithMessage = function () {
      _this.onShowReplyWithMessageChange(false);
    };
    _this.toVoiceMail = function () {
      _this.props.toVoiceMail();
      if (_this.props.toVoiceMail) {
        _this.setState({
          toVoiceMailEnabled: false
        });
        _this.voicemailTimeout = setTimeout(function () {
          _this.props.reject();
        }, 3000);
      }
    };
    _this.replyWithMessage = function (value) {
      _this.props.replyWithMessage(value);
      if (_this.props.replyWithMessage) {
        _this.setState({
          replyMessageEnabled: false
        });
        _this.replyTimeout = setTimeout(function () {
          _this.props.reject();
        }, 3000);
      }
    };
    return _this;
  }

  (0, _createClass3.default)(IncomingCallPad, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (this.props.sessionId !== newProps.sessionId) {
        if (this.replyTimeout) {
          clearTimeout(this.replyTimeout);
          this.replyTimeout = null;
        }
        if (this.voicemailTimeout) {
          clearTimeout(this.voicemailTimeout);
          this.voicemailTimeout = null;
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.replyTimeout) {
        clearTimeout(this.replyTimeout);
        this.replyTimeout = null;
      }
      if (this.voicemailTimeout) {
        clearTimeout(this.voicemailTimeout);
        this.voicemailTimeout = null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          currentLocale = _props.currentLocale,
          reject = _props.reject,
          answer = _props.answer,
          forwardingNumbers = _props.forwardingNumbers,
          formatPhone = _props.formatPhone,
          className = _props.className,
          hasOtherActiveCall = _props.hasOtherActiveCall,
          answerAndEnd = _props.answerAndEnd,
          answerAndHold = _props.answerAndHold;
      // const isMultiCall = true;

      var multiCallButtons = _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.buttonRow, _styles2.default.multiCallsButtonGroup) },
        _react2.default.createElement(_MultiCallAnswerButton2.default, {
          onClick: answerAndEnd,
          title: _i18n2.default.getString('answerAndEnd', currentLocale),
          className: _styles2.default.callButton,
          isEndOtherCall: true
        }),
        _react2.default.createElement(_ActiveCallButton2.default, {
          onClick: this.toVoiceMail,
          title: _i18n2.default.getString('toVoicemail', currentLocale),
          buttonClassName: this.state.toVoiceMailEnabled ? _styles2.default.voiceMailButton : '',
          icon: _Voicemail2.default,
          iconWidth: 274,
          iconX: 116,
          showBorder: !this.state.toVoiceMailEnabled,
          className: _styles2.default.callButton,
          disabled: !this.state.toVoiceMailEnabled
        }),
        _react2.default.createElement(_MultiCallAnswerButton2.default, {
          onClick: answerAndHold,
          title: _i18n2.default.getString('answerAndHold', currentLocale),
          className: _styles2.default.callButton,
          isEndOtherCall: false
        })
      );
      var singleCallButtons = _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.buttonRow, _styles2.default.answerButtonGroup) },
        _react2.default.createElement(_ActiveCallButton2.default, {
          onClick: this.toVoiceMail,
          title: _i18n2.default.getString('toVoicemail', currentLocale),
          buttonClassName: this.state.toVoiceMailEnabled ? _styles2.default.voiceMailButton : '',
          icon: _Voicemail2.default,
          iconWidth: 274,
          iconX: 116,
          showBorder: !this.state.toVoiceMailEnabled,
          className: _styles2.default.bigCallButton,
          disabled: !this.state.toVoiceMailEnabled
        }),
        _react2.default.createElement(_ActiveCallButton2.default, {
          onClick: answer,
          title: _i18n2.default.getString('answer', currentLocale),
          buttonClassName: _styles2.default.answerButton,
          icon: _Answer2.default,
          showBorder: false,
          className: _styles2.default.bigCallButton
        })
      );
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.root, className) },
        _react2.default.createElement('div', {
          className: _styles2.default.forwardContainner,
          ref: function ref(containner) {
            _this2.forwardContainner = containner;
          }
        }),
        _react2.default.createElement('div', {
          className: _styles2.default.replyWithMessageContainner,
          ref: function ref(containner) {
            _this2.replyWithMessageContainner = containner;
          }
        }),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.buttonRow },
          _react2.default.createElement(
            _rcTooltip2.default,
            {
              defaultVisible: false,
              visible: this.state.showForward,
              onVisibleChange: this.onShowForwardChange,
              placement: 'topRight',
              trigger: 'click',
              arrowContent: _react2.default.createElement('div', { className: 'rc-tooltip-arrow-inner' }),
              getTooltipContainer: function getTooltipContainer() {
                return _this2.forwardContainner;
              },
              overlay: _react2.default.createElement(_ForwardForm2.default, {
                forwardingNumbers: forwardingNumbers,
                currentLocale: currentLocale,
                onCancel: this.closeForwardForm,
                formatPhone: formatPhone,
                onForward: this.props.onForward,
                searchContact: this.props.searchContact,
                searchContactList: this.props.searchContactList,
                phoneTypeRenderer: this.props.phoneTypeRenderer
              })
            },
            _react2.default.createElement(_ActiveCallButton2.default, {
              icon: _Forward2.default,
              iconWidth: 250,
              iconX: 125,
              onClick: function onClick() {
                return null;
              },
              title: _i18n2.default.getString('forward', currentLocale),
              className: _styles2.default.callButton
            })
          ),
          _react2.default.createElement(
            _rcTooltip2.default,
            {
              defaultVisible: false,
              visible: this.state.showReplyWithMessage,
              onVisibleChange: this.onShowReplyWithMessageChange,
              placement: 'top',
              trigger: 'click',
              arrowContent: _react2.default.createElement('div', { className: 'rc-tooltip-arrow-inner' }),
              getTooltipContainer: function getTooltipContainer() {
                return _this2.replyWithMessageContainner;
              },
              overlay: _react2.default.createElement(_ReplyWithMessage2.default, {
                currentLocale: currentLocale,
                onCancel: this.closeReplyWithMessage,
                value: this.state.replyMessage,
                onChange: this.onReplyMessageChange,
                onReply: this.replyWithMessage,
                disabled: !this.state.replyMessageEnabled
              })
            },
            _react2.default.createElement(_ActiveCallButton2.default, {
              onClick: function onClick() {
                return null;
              },
              icon: _MessageFill2.default,
              title: _i18n2.default.getString('reply', currentLocale),
              className: _styles2.default.callButton
            })
          ),
          _react2.default.createElement(_ActiveCallButton2.default, {
            onClick: reject,
            icon: _Ignore2.default,
            title: _i18n2.default.getString('ignore', currentLocale),
            className: _styles2.default.callButton
          })
        ),
        hasOtherActiveCall ? multiCallButtons : singleCallButtons
      );
    }
  }]);
  return IncomingCallPad;
}(_react.Component);

exports.default = IncomingCallPad;


IncomingCallPad.propTypes = {
  answer: _propTypes2.default.func.isRequired,
  reject: _propTypes2.default.func.isRequired,
  toVoiceMail: _propTypes2.default.func.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  forwardingNumbers: _propTypes2.default.array.isRequired,
  formatPhone: _propTypes2.default.func,
  onForward: _propTypes2.default.func.isRequired,
  replyWithMessage: _propTypes2.default.func.isRequired,
  className: _propTypes2.default.string,
  answerAndEnd: _propTypes2.default.func,
  answerAndHold: _propTypes2.default.func,
  hasOtherActiveCall: _propTypes2.default.bool,
  sessionId: _propTypes2.default.string.isRequired,
  searchContactList: _propTypes2.default.array.isRequired,
  searchContact: _propTypes2.default.func.isRequired,
  phoneTypeRenderer: _propTypes2.default.func
};

IncomingCallPad.defaultProps = {
  formatPhone: function formatPhone(phone) {
    return phone;
  },
  className: null,
  answerAndEnd: function answerAndEnd() {
    return null;
  },
  answerAndHold: function answerAndHold() {
    return null;
  },
  hasOtherActiveCall: false,
  phoneTypeRenderer: undefined
};
//# sourceMappingURL=index.js.map
