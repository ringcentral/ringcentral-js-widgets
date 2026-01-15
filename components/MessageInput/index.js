"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.UIHeightOffset = exports.MAX_PREVIEW_ATTACHMENT_SIZE = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _debounce = require("@ringcentral-integration/commons/lib/debounce-throttle/debounce");
var _utils = require("@ringcentral-integration/utils");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _EmojiMenu = require("./EmojiMenu");
var _FileAttacher = require("./FileAttacher");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
var _utils2 = require("./utils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var UIHeightOffset = exports.UIHeightOffset = 10;
// display up to preview 3 items in view
var MAX_PREVIEW_ATTACHMENT_SIZE = exports.MAX_PREVIEW_ATTACHMENT_SIZE = 2.5;
var SMS_ACCEPT_TYPES = _FileAttacher.SUPPORTED_MMS_MIME_TYPES_IN_LOWERCASE.join();
var MessageInput = /*#__PURE__*/function (_Component) {
  function MessageInput(props, context) {
    var _this;
    _classCallCheck(this, MessageInput);
    _this = _callSuper(this, MessageInput, [props, context]);
    _this._lastValueChange = void 0;
    _this.textArea = void 0;
    _this.emojiActionRef = void 0;
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
    _this.state = {
      value: props.value,
      height: props.minHeight,
      attachmentsLength: 0
    };
    _this._lastValueChange = 0;
    _this.emojiActionRef = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _inherits(MessageInput, _Component);
  return _createClass(MessageInput, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this3 = this,
        _nextProps$attachment;
      if (
      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
      nextProps.value !== this.state.value &&
      // ignore value changes from props for 300ms after typing
      // this is to prevent unnecessary value changes when used in chrome extension
      // where value pushed back to background and back takes longer
      Date.now() - this._lastValueChange > 300) {
        // use setState(updater, callback) to recalculate height after value has been update to DOM
        this.setState(function () {
          return {
            value: nextProps.value
          };
        }, function () {
          _this3.setNewHeight();
        });
      }
      var newAttachmentsLength = (_nextProps$attachment = nextProps.attachments) === null || _nextProps$attachment === void 0 ? void 0 : _nextProps$attachment.length;
      if (
      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
      newAttachmentsLength !== this.state.attachmentsLength && nextProps.supportAttachment) {
        this.setState({
          attachmentsLength: newAttachmentsLength
        });
        // need to pass latest attachments length to calculate new height
        this.setNewHeight(newAttachmentsLength);
      }
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // do a initial size check in case the component is mounted with multi line value
      this.setNewHeight();
    }
  }, {
    key: "calculateNewHeight",
    value: function calculateNewHeight(attachmentsLength) {
      // @ts-expect-error TS(2339): Property 'inputExpandable' does not exist on type ... Remove this comment to see the full error message
      if (!this.props.inputExpandable) {
        // @ts-expect-error TS(2339): Property 'minHeight' does not exist on type 'Reado... Remove this comment to see the full error message
        return this.props.minHeight;
      }
      // temporarily set height to 0 to check scrollHeight
      this.textArea.style.height = 0;
      var newHeight = this.textArea.scrollHeight + UIHeightOffset;
      // set height back to original to avoid messing with react
      // @ts-expect-error TS(2339): Property 'height' does not exist on type 'Readonly... Remove this comment to see the full error message
      this.textArea.style.height = "".concat(this.state.height - UIHeightOffset, "px");
      var _this$props = this.props,
        minHeight = _this$props.minHeight,
        maxHeight = _this$props.maxHeight,
        attachments = _this$props.attachments,
        supportAttachment = _this$props.supportAttachment,
        supportEmoji = _this$props.supportEmoji;
      var mmsLength = attachmentsLength !== null && attachmentsLength !== void 0 ? attachmentsLength : attachments.length;
      var attachmentsHeight = (mmsLength > MAX_PREVIEW_ATTACHMENT_SIZE ? MAX_PREVIEW_ATTACHMENT_SIZE : mmsLength) * 50;
      var inputToolBarHeight = supportAttachment || supportEmoji ? 40 : 0;
      var othersHeight = attachmentsHeight + inputToolBarHeight;
      if (newHeight < minHeight) {
        return minHeight;
      }
      if (newHeight > maxHeight - othersHeight) {
        return maxHeight - othersHeight;
      }
      return newHeight;
    }
  }, {
    key: "setNewHeight",
    value: function setNewHeight(attachmentsLength) {
      var newHeight = this.calculateNewHeight(attachmentsLength);
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
    key: "render",
    value:
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    function render() {
      var _this4 = this;
      var _this$props2 = this.props,
        currentLocale = _this$props2.currentLocale,
        disabled = _this$props2.disabled,
        sendButtonDisabled = _this$props2.sendButtonDisabled,
        maxLength = _this$props2.maxLength,
        supportAttachment = _this$props2.supportAttachment,
        supportEmoji = _this$props2.supportEmoji,
        attachments = _this$props2.attachments,
        removeAttachment = _this$props2.removeAttachment,
        addAttachments = _this$props2.addAttachments;
      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
      var _this$state = this.state,
        value = _this$state.value,
        height = _this$state.height;
      var inputHeight = height - UIHeightOffset;
      var hasToolBar = supportEmoji || supportAttachment;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].root)
      }, hasToolBar && /*#__PURE__*/_react["default"].createElement("div", null, supportAttachment && /*#__PURE__*/_react["default"].createElement(_FileAttacher.AttachButton, {
        multiple: true,
        currentLocale: currentLocale,
        acceptTypes: SMS_ACCEPT_TYPES,
        onUpload: (/*#__PURE__*/function () {
          var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(data) {
            var _this4$emojiActionRef;
            var files;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  // when upload be trigger also close popup
                  (_this4$emojiActionRef = _this4.emojiActionRef.current) === null || _this4$emojiActionRef === void 0 ? void 0 : _this4$emojiActionRef.close();
                  if (!(data === null || data === void 0 ? void 0 : data.length)) {
                    _context2.n = 2;
                    break;
                  }
                  _context2.n = 1;
                  return Promise.all(data.map(/*#__PURE__*/function () {
                    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(file) {
                      var name, size, base64Url;
                      return _regenerator().w(function (_context) {
                        while (1) switch (_context.n) {
                          case 0:
                            name = file.name, size = file.size;
                            _context.n = 1;
                            return (0, _utils.fileToBase64)(file);
                          case 1:
                            base64Url = _context.v;
                            return _context.a(2, {
                              name: name,
                              size: size,
                              file: file,
                              base64Url: base64Url
                            });
                        }
                      }, _callee);
                    }));
                    return function (_x2) {
                      return _ref2.apply(this, arguments);
                    };
                  }()));
                case 1:
                  files = _context2.v;
                  addAttachments === null || addAttachments === void 0 ? void 0 : addAttachments(files);
                case 2:
                  return _context2.a(2);
              }
            }, _callee2);
          }));
          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }())
      }), supportEmoji && /*#__PURE__*/_react["default"].createElement(_EmojiMenu.EmojiMenu, {
        "data-sign": "emojiButton",
        action: this.emojiActionRef,
        currentLocale: currentLocale,
        getInputElement: function getInputElement() {
          return _this4.textArea;
        },
        onSelect: function onSelect(data, position) {
          if (!_this4.textArea) return;
          var emoji = data["native"];
          var result = (0, _utils2.getTextFieldInsertResult)({
            input: _this4.textArea,
            insertValue: emoji,
            sourcePosition: position
          });
          var nextPositionInfo = result.start;
          if (nextPositionInfo) {
            requestAnimationFrame(function () {
              (0, _juno.setSelectionPosition)(_this4.textArea, {
                start: nextPositionInfo,
                end: nextPositionInfo
              });
            });
          }
          (0, _utils2.setNativeValue)(_this4.textArea, result.value);
          _this4.textArea.focus();
        }
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].textField, !hasToolBar ? _styles["default"].textFieldMargin : null)
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
        onKeyDown: function onKeyDown(e) {
          if (e.key === 'Escape') {
            var _this4$emojiActionRef2;
            (_this4$emojiActionRef2 = _this4.emojiActionRef.current) === null || _this4$emojiActionRef2 === void 0 ? void 0 : _this4$emojiActionRef2.close();
          }
        },
        style: {
          height: inputHeight
        },
        disabled: disabled
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].submitField
      }, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
        size: "small",
        "data-sign": "messageButton",
        disabled: disabled || sendButtonDisabled,
        symbol: _junoIcon.SendFilled,
        color: "action.primary",
        onClick: this.onSend
      }))), supportAttachment && (attachments === null || attachments === void 0 ? void 0 : attachments.length) > 0 && /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].attachments
      }, /*#__PURE__*/_react["default"].createElement(_FileAttacher.AttachmentList, {
        files: attachments,
        onRemoveAttachment: removeAttachment,
        "data-sign": "textAttachmentsList"
      })));
    }
  }]);
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
  supportEmoji: _propTypes["default"].bool,
  attachments: _propTypes["default"].array,
  addAttachments: _propTypes["default"].func,
  removeAttachment: _propTypes["default"].func
};
MessageInput.defaultProps = {
  disabled: false,
  sendButtonDisabled: false,
  onSend: undefined,
  onChange: undefined,
  onHeightChange: undefined,
  minHeight: 41,
  maxHeight: 300,
  maxLength: 1000,
  inputExpandable: true,
  supportAttachment: false,
  supportEmoji: false,
  attachments: [],
  addAttachments: undefined,
  removeAttachment: undefined
};
var _default = exports["default"] = MessageInput;
//# sourceMappingURL=index.js.map
