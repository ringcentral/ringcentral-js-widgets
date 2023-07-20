"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcTooltip = _interopRequireDefault(require("rc-tooltip"));
require("rc-tooltip/assets/bootstrap_white.css");
require("rc-editor-mention/assets/index.css");
var _rcEditorMention = _interopRequireWildcard(require("rc-editor-mention"));
var _EmojiSelect = _interopRequireDefault(require("../EmojiSelect"));
var _emoji = _interopRequireDefault(require("../../assets/images/emoji.png"));
var _upload = _interopRequireDefault(require("../../assets/images/upload.png"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
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
        className: (0, _classnames["default"])(_styles["default"].root, className),
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
