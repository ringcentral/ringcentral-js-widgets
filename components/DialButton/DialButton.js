"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
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
var ALTERNATIVE_TIMEOUT = 1000;
// @ts-expect-error TS(2322): Type 'null' is not assignable to type 'HTMLAudioEl... Remove this comment to see the full error message
var player = null;
var DialButton = /*#__PURE__*/function (_Component) {
  _inherits(DialButton, _Component);
  var _super = _createSuper(DialButton);
  function DialButton(props) {
    var _this;
    _classCallCheck(this, DialButton);
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    // @ts-expect-error TS(2556): A spread argument must either have a tuple type or... Remove this comment to see the full error message
    _this = _super.call.apply(_super, [this, props].concat(args));
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    _this.state = {
      pressed: false
    };
    // @ts-expect-error TS(2564): Property 'timeout' has no initializer and is not d... Remove this comment to see the full error message
    _this.timeout = void 0;
    _this.isEdge = window && window.navigator && window.navigator.userAgent.indexOf('Edge') > -1 || false;
    // @ts-expect-error TS(2564): Property 'audio' has no initializer and is not def... Remove this comment to see the full error message
    _this.audio = void 0;
    _this.onMouseDown = function (e) {
      var _this$props$btn;
      e.preventDefault();
      if (player && _juno.RcDialerPadSoundsMPEG[(_this$props$btn = _this.props.btn) === null || _this$props$btn === void 0 ? void 0 : _this$props$btn.value]) {
        // @ts-expect-error TS(2322): Type 'number | undefined' is not assignable to typ... Remove this comment to see the full error message
        player.volume = _this.props.volume;
        // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
        player.muted = _this.props.muted;
        player.src = _juno.RcDialerPadSoundsMPEG[_this.props.btn.value];
        player.currentTime = 0;
        player.play()["catch"](function (error) {
          console.error('playAudio error:', error);
        });
      }
      if (typeof _this.props.onPress === 'function') {
        _this.props.onPress(_this.props.btn.value);
      }
      _this.timeout = setTimeout(function () {
        if (_this.state.pressed) {
          if (_this.timeout) {
            clearTimeout(_this.timeout);
            // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
            _this.timeout = null;
          }
          if (typeof _this.props.onOutput === 'function') {
            _this.props.onOutput(_this.props.btn.alternativeValue || _this.props.btn.value);
          }
          _this.setState({
            pressed: false
          });
        }
      }, _this.props.alternativeTimeout || ALTERNATIVE_TIMEOUT);
      _this.setState({
        pressed: true
      });
    };
    _this.onMouseUp = function () {
      if (_this.state.pressed) {
        if (_this.timeout) {
          clearTimeout(_this.timeout);
          // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
          _this.timeout = null;
        }
        if (typeof _this.props.onOutput === 'function') {
          _this.props.onOutput(_this.props.btn.value);
        }
        _this.setState({
          pressed: false
        });
      }
    };
    _this.onMouseLeave = function () {
      if (_this.state.pressed) {
        if (_this.timeout) {
          clearTimeout(_this.timeout);
          // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
          _this.timeout = null;
        }
        _this.setState({
          pressed: false
        });
      }
    };
    if (typeof document !== 'undefined' && document.createElement && !player) {
      player = document.createElement('audio');
    }
    return _this;
  }
  _createClass(DialButton, [{
    key: "render",
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function render() {
      var isSpecial = this.props.btn.value === '*';
      return /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "dialPadBtn".concat(this.props.btn.value),
        className: (0, _clsx["default"])(_styles["default"].root, this.props.className)
      }, /*#__PURE__*/_react["default"].createElement("svg", {
        className: _styles["default"].btnSvg,
        viewBox: "0 0 500 500"
      }, /*#__PURE__*/_react["default"].createElement("g", {
        className: (0, _clsx["default"])(_styles["default"].btnSvgGroup, this.state.pressed && _styles["default"].pressed),
        onMouseUp: this.onMouseUp,
        onMouseDown: this.onMouseDown,
        onMouseLeave: this.onMouseLeave
      }, /*#__PURE__*/_react["default"].createElement("circle", {
        className: _styles["default"].circle,
        cx: "250",
        cy: "250",
        r: "191"
      }), /*#__PURE__*/_react["default"].createElement("text", {
        className: (0, _clsx["default"])(_styles["default"].btnValue, isSpecial ? _styles["default"].special : null),
        x: "0",
        dx: "205",
        y: "0",
        dy: isSpecial ? 350 : 250
      }, this.props.btn.value), /*#__PURE__*/_react["default"].createElement("text", {
        className: _styles["default"].btnText,
        x: "0",
        dx: this.props.btn.dx,
        y: "0",
        dy: "360"
      }, this.props.btn.text))));
    }
  }]);
  return DialButton;
}(_react.Component);
exports["default"] = DialButton;
DialButton.defaultProps = {
  volume: 1,
  muted: false
};
//# sourceMappingURL=DialButton.js.map
