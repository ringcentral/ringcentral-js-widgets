"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostMessageTransporter = void 0;
var _BasicTransporter2 = _interopRequireDefault(require("./BasicTransporter"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var PostMessageTransporter = /*#__PURE__*/function (_BasicTransporter) {
  _inherits(PostMessageTransporter, _BasicTransporter);
  var _super = _createSuper(PostMessageTransporter);
  function PostMessageTransporter() {
    var _this;
    _classCallCheck(this, PostMessageTransporter);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.addReceiver = function (receiveMessage) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$useCapture = _ref.useCapture,
        useCapture = _ref$useCapture === void 0 ? false : _ref$useCapture;
      window.addEventListener('message', receiveMessage, useCapture);
    };
    _this.dispose = function (receiveMessage) {
      window.removeEventListener('message', receiveMessage);
    };
    _this.createEmitter = function (sendTarget) {
      // Always specify an exact target origin, not *,
      // when you use postMessage to send data to other windows.
      // A malicious site can change the location of the window without your knowledge,
      // and therefore it can intercept the data sent using postMessage.
      return function (message) {
        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref2$targetOrigin = _ref2.targetOrigin,
          targetOrigin = _ref2$targetOrigin === void 0 ? '*' : _ref2$targetOrigin,
          callback = _ref2.callback;
        sendTarget.postMessage(message, targetOrigin);
        if (typeof callback === 'function') callback();
      };
    };
    return _this;
  }
  return PostMessageTransporter;
}(_BasicTransporter2["default"]);
exports.PostMessageTransporter = PostMessageTransporter;
//# sourceMappingURL=PostMessageTransporter.js.map
