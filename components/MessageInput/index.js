"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.map");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/es.string.ends-with");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _debounce = require("@ringcentral-integration/commons/lib/debounce-throttle/debounce");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var UIHeightOffset = 23;
// the extra height of the entire field with paddings and borders
var MessageInput = /*#__PURE__*/function (_Component) {
  _inherits(MessageInput, _Component);
  var _super = _createSuper(MessageInput);
  function MessageInput(props, context) {
    var _this;
    _classCallCheck(this, MessageInput);
    _this = _super.call(this, props, context);
    _this._fileInputRef = void 0;
    _this._lastValueChange = void 0;
    _this.textArea = void 0;
    _this.onChange = function (e) {
      var _this$updateMessageTe, _this2;
      _this._lastValueChange = Date.now();
      var value = e.currentTarget.value;
      var newHeight = _this.calculateNewHeight();
      if (
      // @ts-expect-error TS(2339): Property 'height' does not exist on type 'Readonly... Remove this comment to see the full error message
      newHeight !== _this.state.height &&
      // @ts-expect-error TS(2339): Property 'onHeightChange' does not exist on type '... Remove this comment to see the full error message
      typeof _this.props.onHeightChange === 'function') {
        // @ts-expect-error TS(2339): Property 'onHeightChange' does not exist on type '... Remove this comment to see the full error message
        _this.props.onHeightChange(newHeight);
      }
      _this.setState({
        value: value,
        height: newHeight
      });
      // ues debounce for avoiding frequent updates compose text module state
      (_this$updateMessageTe = (_this2 = _this).updateMessageText) === null || _this$updateMessageTe === void 0 ? void 0 : _this$updateMessageTe.call(_this2);
    };
    _this.updateMessageText =
    // @ts-expect-error TS(2339): Property 'onChange' does not exist on type 'Readon... Remove this comment to see the full error message
    typeof _this.props.onChange === 'function' ? (0, _debounce.debounce)({
      // @ts-expect-error TS(2339): Property 'onChange' does not exist on type 'Readon... Remove this comment to see the full error message
      fn: function fn() {
        return _this.props.onChange(_this.state.value);
      }
    }) : null;
    _this.onKeyDown = function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();

        // TODO: this component should be refactored whole UX logic
        // @ts-expect-error TS(2339): Property 'sendButtonDisabled' does not exist on ty... Remove this comment to see the full error message
        if (_this.props.sendButtonDisabled) return;
        _this.onSend();
      }
    };
    _this.onSend = function () {
      var _this$updateMessageTe2;
      (_this$updateMessageTe2 = _this.updateMessageText) === null || _this$updateMessageTe2 === void 0 ? void 0 : _this$updateMessageTe2.flush();
      // @ts-expect-error TS(2339): Property 'disabled' does not exist on type 'Readon... Remove this comment to see the full error message
      if (!_this.props.disabled && typeof _this.props.onSend === 'function') {
        // @ts-expect-error TS(2339): Property 'onSend' does not exist on type 'Readonly... Remove this comment to see the full error message
        _this.props.onSend(_this.state.value, _this.props.attachments);
      }
    };
    _this.onAttachmentIconClick = function () {
      _this._fileInputRef.current.click();
    };
    _this.onSelectAttachment = function (_ref) {
      var currentTarget = _ref.currentTarget;
      if (currentTarget.files.length === 0) {
        return;
      }
      // @ts-expect-error TS(2339): Property 'addAttachment' does not exist on type 'R... Remove this comment to see the full error message
      var addAttachment = _this.props.addAttachment;
      var file = currentTarget.files[0];
      if ((file.name.endsWith('.vcard') || file.name.endsWith('.vcf')) && file.type !== 'text/vcard') {
        file = new File([file], file.name, {
          type: 'text/vcard'
        });
      }
      addAttachment({
        name: file.name,
        size: file.size,
        file: file
      });
    };
    _this.state = {
      value: props.value,
      height: props.minHeight
    };
    _this._lastValueChange = 0;
    _this._fileInputRef = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(MessageInput, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this3 = this;
      if (
      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
      nextProps.value !== this.state.value &&
      // ignore value changes from props for 300ms after typing
      // this is to prevent unnecessary value changes when used in chrome extension
      // where value pushed back to background and back takes longer
      Date.now() - this._lastValueChange > 300) {
        // use setState(updater, callback) to recaculate height after value has been update to DOM
        this.setState(function () {
          return {
            value: nextProps.value
          };
        }, function () {
          var newHeight = _this3.calculateNewHeight();
          // @ts-expect-error TS(2339): Property 'height' does not exist on type 'Readonly... Remove this comment to see the full error message
          if (newHeight !== _this3.state.height) {
            // @ts-expect-error TS(2339): Property 'onHeightChange' does not exist on type '... Remove this comment to see the full error message
            if (typeof _this3.props.onHeightChange === 'function') {
              // @ts-expect-error TS(2339): Property 'onHeightChange' does not exist on type '... Remove this comment to see the full error message
              _this3.props.onHeightChange(newHeight);
            }
            _this3.setState({
              height: newHeight
            });
          }
        });
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // do a initial size check in case the component is mounted with multi line value
      var newHeight = this.calculateNewHeight();
      // @ts-expect-error TS(2339): Property 'height' does not exist on type 'Readonly... Remove this comment to see the full error message
      if (newHeight !== this.state.height) {
        // @ts-expect-error TS(2339): Property 'onHeightChange' does not exist on type '... Remove this comment to see the full error message
        if (typeof this.props.onHeightChange === 'function') {
          // @ts-expect-error TS(2339): Property 'onHeightChange' does not exist on type '... Remove this comment to see the full error message
          this.props.onHeightChange(newHeight);
        }
        this.setState({
          height: newHeight
        });
      }
    }
  }, {
    key: "calculateNewHeight",
    value: function calculateNewHeight() {
      // @ts-expect-error TS(2339): Property 'inputExpandable' does not exist on type ... Remove this comment to see the full error message
      if (!this.props.inputExpandable) {
        // @ts-expect-error TS(2339): Property 'minHeight' does not exist on type 'Reado... Remove this comment to see the full error message
        return this.props.minHeight;
      }
      // temperarily set height to 0 to check scrollHeight
      this.textArea.style.height = 0;
      var newHeight = this.textArea.scrollHeight + 10 + UIHeightOffset;
      // set height back to original to avoid messing with react
      // @ts-expect-error TS(2339): Property 'height' does not exist on type 'Readonly... Remove this comment to see the full error message
      this.textArea.style.height = "".concat(this.state.height - UIHeightOffset, "px");
      // @ts-expect-error TS(2339): Property 'minHeight' does not exist on type 'Reado... Remove this comment to see the full error message
      var _this$props = this.props,
        minHeight = _this$props.minHeight,
        maxHeight = _this$props.maxHeight;
      if (newHeight < minHeight) {
        return minHeight;
      }
      if (newHeight > maxHeight) {
        return maxHeight;
      }
      return newHeight;
    }
  }, {
    key: "render",
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function render() {
      var _this4 = this;
      var _this$props2 = this.props,
        currentLocale = _this$props2.currentLocale,
        disabled = _this$props2.disabled,
        sendButtonDisabled = _this$props2.sendButtonDisabled,
        maxLength = _this$props2.maxLength,
        supportAttachment = _this$props2.supportAttachment,
        attachments = _this$props2.attachments,
        removeAttachment = _this$props2.removeAttachment; // @ts-expect-error TS(2339): Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
      var _this$state = this.state,
        value = _this$state.value,
        height = _this$state.height;
      var inputHeight = height - UIHeightOffset;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].root, supportAttachment && _styles["default"].supportAttachment)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].attachmentIcon
      }, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
        variant: "round",
        size: "small",
        symbol: _junoIcon.Attachment,
        onClick: this.onAttachmentIconClick,
        disabled: disabled
      }), /*#__PURE__*/_react["default"].createElement("input", {
        type: "file",
        accept: "image/tiff,image/gif,image/jpeg,image/bmp,image/png,image/svg+xml,text/vcard,application/rtf,video/mpeg,audio/mpeg,video/mp4,application/zip",
        style: {
          display: 'none'
        },
        ref: this._fileInputRef,
        onChange: this.onSelectAttachment,
        disabled: disabled
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].textField
      }, /*#__PURE__*/_react["default"].createElement("textarea", {
        "data-sign": "messageInput",
        ref: function ref(target) {
          _this4.textArea = target;
        },
        placeholder: _i18n["default"].getString('typeMessage', currentLocale),
        value: value,
        maxLength: maxLength,
        onChange: this.onChange,
        onKeyPressCapture: this.onKeyDown,
        style: {
          height: inputHeight
        },
        disabled: disabled
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].submitField
      }, /*#__PURE__*/_react["default"].createElement("input", {
        "data-sign": "messageButton",
        type: "button",
        value: _i18n["default"].getString('send', currentLocale),
        onClick: this.onSend,
        className: _styles["default"].sendButton,
        disabled: disabled || sendButtonDisabled
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].attachments
      }, attachments.map(function (attachment) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].attachmentItem,
          key: attachment.name,
          title: attachment.name
        }, attachment.name, /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].attachmentRemoveIcon
        }, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
          size: "small",
          symbol: _junoIcon.Close,
          disabled: disabled,
          onClick: function onClick() {
            removeAttachment(attachment);
          }
        })));
      })));
    }
  }]);
  return MessageInput;
}(_react.Component);
MessageInput.propTypes = {
  value: _propTypes["default"].string.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  disabled: _propTypes["default"].bool,
  sendButtonDisabled: _propTypes["default"].bool,
  minHeight: _propTypes["default"].number,
  maxHeight: _propTypes["default"].number,
  maxLength: _propTypes["default"].number,
  onSend: _propTypes["default"].func,
  onChange: _propTypes["default"].func,
  onHeightChange: _propTypes["default"].func,
  inputExpandable: _propTypes["default"].bool,
  supportAttachment: _propTypes["default"].bool,
  attachments: _propTypes["default"].array,
  addAttachment: _propTypes["default"].func,
  removeAttachment: _propTypes["default"].func
};
MessageInput.defaultProps = {
  disabled: false,
  sendButtonDisabled: false,
  onSend: undefined,
  onChange: undefined,
  onHeightChange: undefined,
  minHeight: 63,
  maxHeight: 300,
  maxLength: 1000,
  inputExpandable: true,
  supportAttachment: false,
  attachments: [],
  addAttachment: undefined,
  removeAttachment: undefined
};
var _default = MessageInput;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
