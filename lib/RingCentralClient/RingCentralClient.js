"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RingCentralClient = void 0;
var _ringcentralClient = require("ringcentral-client");
var _PathSegment2 = _interopRequireDefault(require("ringcentral-client/build/PathSegment"));
var _Account = _interopRequireDefault(require("ringcentral-client/build/paths/Account"));
var _ClientInfo = _interopRequireDefault(require("ringcentral-client/build/paths/ClientInfo"));
var _Dictionary = _interopRequireDefault(require("ringcentral-client/build/paths/Dictionary"));
var _Glip = _interopRequireDefault(require("ringcentral-client/build/paths/Glip"));
var _NumberParser = _interopRequireDefault(require("ringcentral-client/build/paths/NumberParser"));
var _Subscription = _interopRequireDefault(require("ringcentral-client/build/paths/Subscription"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
// TODO: make 'ringcentral-client' support JS SDK v4 or replace it
var RestPrefix = /*#__PURE__*/function (_PathSegment) {
  _inherits(RestPrefix, _PathSegment);
  var _super = _createSuper(RestPrefix);
  function RestPrefix(service) {
    _classCallCheck(this, RestPrefix);
    return _super.call(this, 'restapi/v1.0', undefined, undefined, service);
  }
  return RestPrefix;
}(_PathSegment2["default"]);
var RingCentralClient = /*#__PURE__*/function (_Client) {
  _inherits(RingCentralClient, _Client);
  var _super2 = _createSuper(RingCentralClient);
  function RingCentralClient() {
    _classCallCheck(this, RingCentralClient);
    return _super2.apply(this, arguments);
  }
  _createClass(RingCentralClient, [{
    key: "restPrefix",
    value: function restPrefix() {
      return new RestPrefix(this.service.platform());
    }
  }, {
    key: "account",
    value: function account(id) {
      return new _Account["default"](this.restPrefix(), id, this.service.platform());
    }
  }, {
    key: "clientInfo",
    value: function clientInfo(id) {
      return new _ClientInfo["default"](this.restPrefix(), id, this.service.platform());
    }
  }, {
    key: "dictionary",
    value: function dictionary(id) {
      return new _Dictionary["default"](this.restPrefix(), id, this.service.platform());
    }
  }, {
    key: "numberParser",
    value: function numberParser(id) {
      return new _NumberParser["default"](this.restPrefix(), id, this.service.platform());
    }
  }, {
    key: "subscription",
    value: function subscription(id) {
      return new _Subscription["default"](this.restPrefix(), id, this.service.platform());
    }
  }, {
    key: "glip",
    value: function glip(id) {
      return new _Glip["default"](this.restPrefix(), id, this.service.platform());
    }
  }]);
  return RingCentralClient;
}(_ringcentralClient.Client);
exports.RingCentralClient = RingCentralClient;
//# sourceMappingURL=RingCentralClient.js.map
