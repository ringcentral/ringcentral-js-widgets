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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _rcTooltip = _interopRequireDefault(require("rc-tooltip"));

require("rc-tooltip/assets/bootstrap_white.css");

var _ForwardForm = _interopRequireDefault(require("../ForwardForm"));

var _ReplyWithMessage = _interopRequireDefault(require("../ReplyWithMessage"));

var _ActiveCallButton = _interopRequireDefault(require("../ActiveCallButton"));

var _MultiCallAnswerButton = _interopRequireDefault(require("../MultiCallAnswerButton"));

var _MessageFill = _interopRequireDefault(require("../../assets/images/MessageFill.svg"));

var _Forward = _interopRequireDefault(require("../../assets/images/Forward.svg"));

var _Ignore = _interopRequireDefault(require("../../assets/images/Ignore.svg"));

var _Voicemail = _interopRequireDefault(require("../../assets/images/Voicemail.svg"));

var _Answer = _interopRequireDefault(require("../../assets/images/Answer.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

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

var IncomingCallPad = /*#__PURE__*/function (_Component) {
  _inherits(IncomingCallPad, _Component);

  var _super = _createSuper(IncomingCallPad);

  function IncomingCallPad(props) {
    var _this;

    _classCallCheck(this, IncomingCallPad);

    _this = _super.call(this, props);
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
      _this.setState({
        replyMessage: message
      });
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

  _createClass(IncomingCallPad, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(newProps) {
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
    key: "componentWillUnmount",
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
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          currentLocale = _this$props.currentLocale,
          reject = _this$props.reject,
          answer = _this$props.answer,
          forwardingNumbers = _this$props.forwardingNumbers,
          formatPhone = _this$props.formatPhone,
          className = _this$props.className,
          hasOtherActiveCall = _this$props.hasOtherActiveCall,
          answerAndEnd = _this$props.answerAndEnd,
          answerAndHold = _this$props.answerAndHold; // const isMultiCall = true;

      var multiCallButtons = /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].buttonRow, _styles["default"].multiCallsButtonGroup)
      }, /*#__PURE__*/_react["default"].createElement(_MultiCallAnswerButton["default"], {
        onClick: answerAndEnd,
        title: _i18n["default"].getString('answerAndEnd', currentLocale),
        dataSign: "answerAndEnd",
        className: _styles["default"].callButton,
        isEndOtherCall: true
      }), /*#__PURE__*/_react["default"].createElement(_ActiveCallButton["default"], {
        onClick: this.toVoiceMail,
        title: _i18n["default"].getString('toVoicemail', currentLocale),
        buttonClassName: this.state.toVoiceMailEnabled ? _styles["default"].voiceMailButton : '',
        icon: _Voicemail["default"],
        iconWidth: 274,
        iconX: 116,
        showBorder: !this.state.toVoiceMailEnabled,
        dataSign: "toVoiceMail",
        className: _styles["default"].callButton,
        disabled: !this.state.toVoiceMailEnabled
      }), /*#__PURE__*/_react["default"].createElement(_MultiCallAnswerButton["default"], {
        onClick: answerAndHold,
        title: _i18n["default"].getString('answerAndHold', currentLocale),
        dataSign: "answerAndHold",
        className: _styles["default"].callButton,
        isEndOtherCall: false
      }));

      var singleCallButtons = /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].buttonRow, _styles["default"].answerButtonGroup)
      }, /*#__PURE__*/_react["default"].createElement(_ActiveCallButton["default"], {
        onClick: this.toVoiceMail,
        title: _i18n["default"].getString('toVoicemail', currentLocale),
        buttonClassName: this.state.toVoiceMailEnabled ? _styles["default"].voiceMailButton : '',
        icon: _Voicemail["default"],
        iconWidth: 274,
        iconX: 116,
        showBorder: !this.state.toVoiceMailEnabled,
        dataSign: "toVoiceMail",
        className: _styles["default"].bigCallButton,
        disabled: !this.state.toVoiceMailEnabled
      }), /*#__PURE__*/_react["default"].createElement(_ActiveCallButton["default"], {
        onClick: answer,
        title: _i18n["default"].getString('answer', currentLocale),
        buttonClassName: _styles["default"].answerButton,
        icon: _Answer["default"],
        showBorder: false,
        dataSign: "answer",
        className: _styles["default"].bigCallButton
      }));

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, className)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].forwardContainner,
        ref: function ref(containner) {
          _this2.forwardContainner = containner;
        }
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].replyWithMessageContainner,
        ref: function ref(containner) {
          _this2.replyWithMessageContainner = containner;
        }
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].buttonRow
      }, /*#__PURE__*/_react["default"].createElement(TooltipCom, {
        defaultVisible: false,
        visible: this.state.showForward,
        onVisibleChange: this.onShowForwardChange,
        placement: "topRight",
        trigger: "click",
        arrowContent: /*#__PURE__*/_react["default"].createElement("div", {
          className: "rc-tooltip-arrow-inner"
        }),
        getTooltipContainer: function getTooltipContainer() {
          return _this2.forwardContainner;
        },
        overlay: /*#__PURE__*/_react["default"].createElement(_ForwardForm["default"], {
          forwardingNumbers: forwardingNumbers,
          currentLocale: currentLocale,
          onCancel: this.closeForwardForm,
          formatPhone: formatPhone,
          onForward: this.props.onForward,
          searchContact: this.props.searchContact,
          searchContactList: this.props.searchContactList,
          phoneTypeRenderer: this.props.phoneTypeRenderer,
          phoneSourceNameRenderer: this.props.phoneSourceNameRenderer
        })
      }, /*#__PURE__*/_react["default"].createElement(_ActiveCallButton["default"], {
        icon: _Forward["default"],
        iconWidth: 250,
        iconX: 125,
        onClick: function onClick() {
          return null;
        },
        title: _i18n["default"].getString('forward', currentLocale),
        dataSign: "forward",
        className: _styles["default"].callButton
      })), /*#__PURE__*/_react["default"].createElement(TooltipCom, {
        defaultVisible: false,
        visible: this.state.showReplyWithMessage,
        onVisibleChange: this.onShowReplyWithMessageChange,
        placement: "top",
        trigger: "click",
        arrowContent: /*#__PURE__*/_react["default"].createElement("div", {
          className: "rc-tooltip-arrow-inner"
        }),
        getTooltipContainer: function getTooltipContainer() {
          return _this2.replyWithMessageContainner;
        },
        overlay: /*#__PURE__*/_react["default"].createElement(_ReplyWithMessage["default"], {
          currentLocale: currentLocale,
          onCancel: this.closeReplyWithMessage,
          value: this.state.replyMessage,
          onChange: this.onReplyMessageChange,
          onReply: this.replyWithMessage,
          disabled: !this.state.replyMessageEnabled
        })
      }, /*#__PURE__*/_react["default"].createElement(_ActiveCallButton["default"], {
        onClick: function onClick() {
          return null;
        },
        icon: _MessageFill["default"],
        title: _i18n["default"].getString('reply', currentLocale),
        dataSign: "reply",
        className: _styles["default"].callButton
      })), /*#__PURE__*/_react["default"].createElement(_ActiveCallButton["default"], {
        onClick: reject,
        icon: _Ignore["default"],
        title: _i18n["default"].getString('ignore', currentLocale),
        dataSign: "ignore",
        className: _styles["default"].callButton
      })), hasOtherActiveCall ? multiCallButtons : singleCallButtons);
    }
  }]);

  return IncomingCallPad;
}(_react.Component);

exports["default"] = IncomingCallPad;
IncomingCallPad.propTypes = {
  answer: _propTypes["default"].func.isRequired,
  reject: _propTypes["default"].func.isRequired,
  toVoiceMail: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  forwardingNumbers: _propTypes["default"].array.isRequired,
  formatPhone: _propTypes["default"].func,
  onForward: _propTypes["default"].func.isRequired,
  replyWithMessage: _propTypes["default"].func.isRequired,
  className: _propTypes["default"].string,
  answerAndEnd: _propTypes["default"].func,
  answerAndHold: _propTypes["default"].func,
  hasOtherActiveCall: _propTypes["default"].bool,
  sessionId: _propTypes["default"].string.isRequired,
  searchContactList: _propTypes["default"].array.isRequired,
  searchContact: _propTypes["default"].func.isRequired,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func
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
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined
};
//# sourceMappingURL=index.js.map
