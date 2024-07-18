"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
require("core-js/modules/es.string.split");
require("core-js/modules/web.dom-collections.for-each");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _End = _interopRequireDefault(require("../../assets/images/End.svg"));
var _PageHeader = require("../BackHeader/PageHeader");
var _CircleButton = _interopRequireDefault(require("../CircleButton"));
var _DialPad = _interopRequireDefault(require("../DialPad"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
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
var cleanRegex = /[^\d*#]/g;
var filter = function filter(value) {
  return value.replace(cleanRegex, '');
};
var MAX_PASTE_LENGTH = 15;
var ActiveCallDialPad = /*#__PURE__*/function (_Component) {
  _inherits(ActiveCallDialPad, _Component);
  var _super = _createSuper(ActiveCallDialPad);
  function ActiveCallDialPad(props) {
    var _this;
    _classCallCheck(this, ActiveCallDialPad);
    _this = _super.call(this, props);
    _this.audio = void 0;
    _this.onButtonOutput = void 0;
    _this.onChange = void 0;
    _this.onKeyDown = void 0;
    _this.onPaste = void 0;
    _this.playAudio = void 0;
    _this.sendDTMFKeys = void 0;
    _this.state = {
      value: ''
    };
    if (typeof document !== 'undefined' && document.createElement) {
      _this.audio = document.createElement('audio');
    }
    _this.playAudio = function (value) {
      if (_this.audio && _juno.RcDialerPadSoundsMPEG[value]) {
        if (!_this.audio.paused) {
          _this.audio.pause();
        }
        _this.audio.src = _juno.RcDialerPadSoundsMPEG[value];
        _this.audio.currentTime = 0;
        _this.audio.play()["catch"](function (error) {
          console.error('playAudio error:', error);
        });
      }
    };
    _this.onButtonOutput = function (key) {
      _this.setState(function (preState) {
        var value = preState.value + key;
        _this.props.onChange(key);
        return {
          value: value
        };
      });
    };
    _this.sendDTMFKeys = function (keys) {
      if (keys === '') {
        return;
      }
      _this.props.onChange(keys);
      keys.split('').forEach(function (key, index) {
        setTimeout(function () {
          _this.playAudio(key);
        }, 100 * index);
      });
    };
    _this.onChange = function (e) {
      var value = filter(e.currentTarget.value);
      _this.setState({
        value: value
      });
    };
    _this.onKeyDown = function (e) {
      var value = filter(e.key);
      _this.sendDTMFKeys(value);
    };
    _this.onPaste = function (e) {
      var item = e.clipboardData.items[0];
      item.getAsString(function (data) {
        var value = filter(data.replace(/<[^>]*>/g, '')); // remove HTML tag in firefox
        var keys = value;
        if (value.length > MAX_PASTE_LENGTH) {
          keys = value.slice(0, MAX_PASTE_LENGTH);
        }
        _this.sendDTMFKeys(keys);
        if (value.length > MAX_PASTE_LENGTH) {
          _this.setState(function (preState) {
            return {
              value: preState.value.replace(value, keys)
            };
          });
        }
      });
    };
    return _this;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(ActiveCallDialPad, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.audio) {
        this.audio.remove();
        this.audio = null;
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "activeCallDialPad",
        className: _styles["default"].root
      }, /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeader, null, /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderBack, {
        onClick: this.props.hiddenDialPad
      }), /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderTitle, null, _i18n["default"].getString('keypad', this.props.currentLocale)), /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderRemain, null)), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].dialInput
      }, /*#__PURE__*/_react["default"].createElement("input", {
        "data-sign": "input",
        className: _styles["default"].input,
        value: this.state.value,
        onChange: this.onChange,
        onKeyDown: this.onKeyDown,
        onPaste: this.onPaste,
        autoFocus: true // eslint-disable-line
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].padContainer
      }, /*#__PURE__*/_react["default"].createElement(_DialPad["default"], {
        dataSign: "keypad",
        className: _styles["default"].dialPad,
        onButtonOutput: this.onButtonOutput
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].buttonRow
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].button
      }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
        className: _styles["default"].stopButton,
        onClick: this.props.onHangup,
        icon: _End["default"],
        showBorder: false,
        dataSign: "hangUp"
      })))));
    }
  }]);
  return ActiveCallDialPad;
}(_react.Component);
var _default = ActiveCallDialPad;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
