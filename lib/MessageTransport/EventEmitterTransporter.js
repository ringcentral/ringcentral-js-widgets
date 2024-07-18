"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TRANSPORTER_DIRECTION = exports.EventEmitterTransporter = void 0;
var _events = require("events");
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
var TRANSPORTER_DIRECTION = {
  TO_INTERNAL: 'toInternal',
  TO_EXTERNAL: 'toExternal'
};
exports.TRANSPORTER_DIRECTION = TRANSPORTER_DIRECTION;
/**
 * @param direction if direction is 'toExternal', meaning this instance is created in internal adapter, need in eventEmitter
 */
var EventEmitterTransporter = /*#__PURE__*/function (_BasicTransporter) {
  _inherits(EventEmitterTransporter, _BasicTransporter);
  var _super = _createSuper(EventEmitterTransporter);
  function EventEmitterTransporter(_ref) {
    var _this;
    var direction = _ref.direction;
    _classCallCheck(this, EventEmitterTransporter);
    _this = _super.call(this);
    _this._direction = void 0;
    _this.addReceiver = function (onMessage) {
      window._transporterEventEmitter.on(_this._direction === TRANSPORTER_DIRECTION.TO_EXTERNAL ? TRANSPORTER_DIRECTION.TO_INTERNAL : TRANSPORTER_DIRECTION.TO_EXTERNAL, function (data) {
        onMessage({
          data: data
        });
      });
    };
    _this.createEmitter = function () {
      return function (emitterData) {
        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          callback = _ref2.callback;
        window._transporterEventEmitter.emit(_this._direction === TRANSPORTER_DIRECTION.TO_EXTERNAL ? TRANSPORTER_DIRECTION.TO_EXTERNAL : TRANSPORTER_DIRECTION.TO_INTERNAL, emitterData);
        if (typeof callback === 'function') callback();
      };
    };
    if (!window._transporterEventEmitter) {
      window._transporterEventEmitter = new _events.EventEmitter();
    }
    _this._direction = direction;
    return _this;
  }
  return EventEmitterTransporter;
}(_BasicTransporter2["default"]);
exports.EventEmitterTransporter = EventEmitterTransporter;
//# sourceMappingURL=EventEmitterTransporter.js.map
