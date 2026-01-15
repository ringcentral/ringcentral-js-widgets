"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/web.timers.js");
var _RcModule2 = _interopRequireDefault(require("./RcModule"));
var _di = require("./di");
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
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
var Pollable = exports["default"] = (_dec = (0, _di.Library)({
  deps: [{
    dep: 'PollableOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcModule) {
  function Pollable(_ref) {
    var _this;
    var options = Object.assign({}, (_objectDestructuringEmpty(_ref), _ref));
    _classCallCheck(this, Pollable);
    _this = _callSuper(this, Pollable, [_objectSpread({}, options)]);
    _this._tabManager = void 0;
    _this._timeoutId = void 0;
    _this._timeoutId = null;
    return _this;
  }
  _inherits(Pollable, _RcModule);
  return _createClass(Pollable, [{
    key: "timestamp",
    get: function get() {
      throw new Error('timestamp is not defined');
    }
  }, {
    key: "ttl",
    get: function get() {
      throw new Error('ttl is not defined');
    }
  }, {
    key: "pollingInterval",
    get: function get() {
      return this.ttl;
    }
  }, {
    key: "timeToRetry",
    get: function get() {
      throw new Error('timeToRetry is not defined');
    }
  }, {
    key: "fetchData",
    value: function fetchData() {
      throw new Error('fetchData is not implemented');
    }
  }, {
    key: "_clearTimeout",
    value: function _clearTimeout() {
      if (this._timeoutId) clearTimeout(this._timeoutId);
    }

    // @ts-expect-error TS(2365): Operator '+' cannot be applied to types 'void' and... Remove this comment to see the full error message
  }, {
    key: "_startPolling",
    value: function _startPolling() {
      var _this2 = this;
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timestamp + this.pollingInterval + 10 - Date.now();
      this._clearTimeout();
      this._timeoutId = setTimeout(function () {
        _this2._timeoutId = null;
        if (!_this2._tabManager || _this2._tabManager.active) {
          // @ts-expect-error TS(1345): An expression of type 'void' cannot be tested for ... Remove this comment to see the full error message
          if (!_this2.timestamp || Date.now() - _this2.timestamp > _this2.ttl) {
            _this2.fetchData();
          } else {
            _this2._startPolling();
          }
          // @ts-expect-error TS(1345): An expression of type 'void' cannot be tested for ... Remove this comment to see the full error message
        } else if (_this2.timestamp && Date.now() - _this2.timestamp < _this2.ttl) {
          _this2._startPolling();
        } else {
          // @ts-expect-error TS(2345): Argument of type 'void' is not assignable to param... Remove this comment to see the full error message
          _this2._startPolling(_this2.timeToRetry);
        }
      }, t);
    }
  }, {
    key: "_retry",
    value: function _retry() {
      var _this3 = this;
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timeToRetry;
      this._clearTimeout();
      this._timeoutId = setTimeout(function () {
        _this3._timeoutId = null;
        // @ts-expect-error TS(1345): An expression of type 'void' cannot be tested for ... Remove this comment to see the full error message
        if (!_this3.timestamp || Date.now() - _this3.timestamp > _this3.ttl) {
          if (!_this3._tabManager || _this3._tabManager.active) {
            _this3.fetchData();
          } else {
            // continue retry checks in case tab becomes main tab
            _this3._retry();
          }
        }
        // @ts-expect-error TS(2769): No overload matches this call.
      }, t);
    }
  }]);
}(_RcModule2["default"])) || _class);
//# sourceMappingURL=Pollable.js.map
