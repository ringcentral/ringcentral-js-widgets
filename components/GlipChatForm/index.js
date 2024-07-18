"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.match");
require("core-js/modules/es.string.replace");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _rcEditorMention = _interopRequireWildcard(require("rc-editor-mention"));
require("rc-editor-mention/assets/index.css");
var _rcTooltip = _interopRequireDefault(require("rc-tooltip"));
require("rc-tooltip/assets/bootstrap_white.css");
var _react = _interopRequireWildcard(require("react"));
var _emoji = _interopRequireDefault(require("../../assets/images/emoji.png"));
var _upload = _interopRequireDefault(require("../../assets/images/upload.png"));
var _EmojiSelect = _interopRequireDefault(require("../EmojiSelect"));
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
function isOnMobileDevice() {
  if (typeof navigator !== 'undefined') {
    return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i);
  }
  return false;
}
var GlipChatForm = /*#__PURE__*/function (_Component) {
  _inherits(GlipChatForm, _Component);
  var _super = _createSuper(GlipChatForm);
  function GlipChatForm(props) {
    var _this;
    _classCallCheck(this, GlipChatForm);
    _this = _super.call(this, props);
    _this.state = {
      defaultValue: (0, _rcEditorMention.toEditorState)(props.textValue),
      suggestions: []
    };
    _this._onInputChange = function (editorState) {
      _this.setState({
        defaultValue: editorState
      });
      if (typeof _this.props.onTextChange === 'function') {
        var mentions = (0, _rcEditorMention.getMentions)(editorState).map(function (mention) {
          var email = mention.replace('@[', '').replace(']', '');
          var member = _this.props.members.find(function (m) {
            return m.email === email;
          });
          return {
            mention: mention,
            matcherId: member && member.id
          };
        });
        _this.props.onTextChange((0, _rcEditorMention.toString)(editorState), mentions);
      }
    };
    _this._onSearchChange = function (value) {
      var members = _this.props.members.filter(function (m) {
        var search = value && value.toLowerCase();
        if (!search) {
          return true;
        }
        var name = "".concat(m.firstName, " ").concat(m.lastName).toLowerCase();
        if (name.indexOf(search) > -1) {
          return true;
        }
        if (m.email && m.email.indexOf(search) > -1) {
          return true;
        }
        return false;
      });
      var suggestions = _this._getSuggestions(members);
      _this.setState({
        suggestions: suggestions
      });
    };
    _this._onSubmit = function (e) {
      _this.props.onSubmit();
      e.preventDefault();
    };
    _this._onTextAreaKeyDown = function (e) {
      if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
        _this.props.onSubmit();
        e.preventDefault();
      }
    };
    _this._onSelectEmoji = function (emoji) {
      var newText = _this.props.textValue ? "".concat(_this.props.textValue, " ").concat(emoji, " ") : "".concat(emoji, " ");
      if (typeof _this.props.onTextChange === 'function') {
        _this.props.onTextChange(newText);
      }
      _this.setState({
        defaultValue: (0, _rcEditorMention.toEditorState)(newText)
      });
      setTimeout(function () {
        if (_this._metionInput) {
          _this._metionInput.reset();
        }
      }, 10);
    };
    _this._onSelectFile = function (e) {
      var file = e.target.files[0];
      if (!file) {
        return;
      }
      var reader = new FileReader();
      reader.onloadend = function (evt) {
        if (evt.target.readyState === FileReader.DONE) {
          _this.props.onUploadFile(file.name, evt.target.result);
        }
      };
      reader.readAsArrayBuffer(file);
    };
    return _this;
  }
  _createClass(GlipChatForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._autoFocus();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.members !== nextProps.members) {
        var suggestions = this._getSuggestions(nextProps.members);
        this.setState({
          suggestions: suggestions
        });
      }
      if (nextProps.groupId !== this.props.groupId) {
        var _suggestions = this._getSuggestions(nextProps.members);
        this.setState({
          suggestions: _suggestions,
          defaultValue: (0, _rcEditorMention.toEditorState)(nextProps.textValue)
        });
      }
      if (this.props.textValue !== nextProps.textValue) {
        this.setState({
          defaultValue: (0, _rcEditorMention.toEditorState)(nextProps.textValue)
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.groupId !== this.props.groupId) {
        this._autoFocus();
        if (this._metionInput) {
          this._metionInput.reset();
        }
      }
      if (this.props.textValue.length === 0 && prevProps.textValue.length > 0) {
        if (this._metionInput) {
          this._metionInput.reset();
        }
      }
    }
  }, {
    key: "_getSuggestions",
    value: function _getSuggestions(suggestions) {
      return suggestions.map(function (suggestion) {
        return /*#__PURE__*/_react["default"].createElement(_rcEditorMention.Nav, {
          style: {
            height: 34
          },
          value: "[".concat(suggestion.email, "]"),
          key: suggestion.id
        }, /*#__PURE__*/_react["default"].createElement("span", null, suggestion.firstName, " ", suggestion.lastName));
      });
    }
  }, {
    key: "_autoFocus",
    value: function _autoFocus() {
      if (isOnMobileDevice()) {
        return;
      }
      if (this._metionInput) {
        this._metionInput._editor.focusEditor();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        className = _this$props.className,
        placeholder = _this$props.placeholder,
        height = _this$props.height;
      var noFoundString = 'No found.'; // TODO: i18n after string confirmed
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].root, className),
        style: {
          height: height
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].tools
      }, /*#__PURE__*/_react["default"].createElement(_rcTooltip["default"], {
        placement: "top",
        trigger: "click",
        arrowContent: /*#__PURE__*/_react["default"].createElement("div", {
          className: "rc-tooltip-arrow-inner"
        }),
        overlayClassName: _styles["default"].emojisTooltip,
        overlay: /*#__PURE__*/_react["default"].createElement("div", {
          style: {
            width: 250,
            height: 200
          }
        }, /*#__PURE__*/_react["default"].createElement(_EmojiSelect["default"], {
          onSelect: this._onSelectEmoji
        }))
      }, /*#__PURE__*/_react["default"].createElement("img", {
        alt: "emoji",
        src: _emoji["default"],
        className: _styles["default"].emoji
      })), /*#__PURE__*/_react["default"].createElement("label", {
        className: _styles["default"].file
      }, /*#__PURE__*/_react["default"].createElement("img", {
        alt: "emoji",
        src: _upload["default"]
      }), /*#__PURE__*/_react["default"].createElement("input", {
        type: "file",
        onChange: this._onSelectFile
      }))), /*#__PURE__*/_react["default"].createElement("form", {
        onSubmit: this._onSubmit
      }, /*#__PURE__*/_react["default"].createElement(_rcEditorMention["default"], {
        style: {
          width: '100%',
          height: height - 35,
          lineHeight: '18px'
        },
        className: _styles["default"].mentionInput,
        ref: function ref(input) {
          _this2._metionInput = input;
        },
        placeholder: placeholder,
        placement: "bottom",
        defaultValue: this.state.defaultValue,
        onChange: this._onInputChange,
        onSearchChange: this._onSearchChange,
        suggestions: this.state.suggestions,
        prefix: "@",
        notFoundContent: noFoundString,
        multiLines: true,
        mode: "immutable",
        onKeyDown: this._onTextAreaKeyDown
      }), /*#__PURE__*/_react["default"].createElement("input", {
        type: "submit",
        className: _styles["default"].submit
      })));
    }
  }]);
  return GlipChatForm;
}(_react.Component);
exports["default"] = GlipChatForm;
GlipChatForm.propTypes = {
  textValue: _propTypes["default"].string,
  className: _propTypes["default"].string,
  onTextChange: _propTypes["default"].func,
  onSubmit: _propTypes["default"].func.isRequired,
  onUploadFile: _propTypes["default"].func.isRequired,
  placeholder: _propTypes["default"].string,
  groupId: _propTypes["default"].string,
  members: _propTypes["default"].array,
  height: _propTypes["default"].number
};
GlipChatForm.defaultProps = {
  className: undefined,
  textValue: '',
  onTextChange: undefined,
  placeholder: undefined,
  groupId: undefined,
  members: [],
  height: 120
};
//# sourceMappingURL=index.js.map
