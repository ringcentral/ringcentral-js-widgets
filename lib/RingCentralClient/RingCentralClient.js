"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RingCentralClient = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.set-prototype-of.js");
var _ringcentralClient = require("ringcentral-client");
var _PathSegment2 = _interopRequireDefault(require("ringcentral-client/build/PathSegment"));
var _Account = _interopRequireDefault(require("ringcentral-client/build/paths/Account"));
var _ClientInfo = _interopRequireDefault(require("ringcentral-client/build/paths/ClientInfo"));
var _Dictionary = _interopRequireDefault(require("ringcentral-client/build/paths/Dictionary"));
var _Glip = _interopRequireDefault(require("ringcentral-client/build/paths/Glip"));
var _NumberParser = _interopRequireDefault(require("ringcentral-client/build/paths/NumberParser"));
var _Subscription = _interopRequireDefault(require("ringcentral-client/build/paths/Subscription"));
var _multipartHttpRequest = require("../multipartHttpRequest");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
// TODO: make 'ringcentral-client' support JS SDK v4 or replace it
var RestPrefix = /*#__PURE__*/function (_PathSegment) {
  function RestPrefix(service) {
    _classCallCheck(this, RestPrefix);
    return _callSuper(this, RestPrefix, ['restapi/v1.0', undefined, undefined, service]);
  }
  _inherits(RestPrefix, _PathSegment);
  return _createClass(RestPrefix);
}(_PathSegment2["default"]);
var RingCentralClient = exports.RingCentralClient = /*#__PURE__*/function (_Client) {
  function RingCentralClient() {
    var _this;
    _classCallCheck(this, RingCentralClient);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, RingCentralClient, [].concat(args));
    _this.multipart = (0, _multipartHttpRequest.multipartHttpRequest)(_this.service.platform());
    return _this;
  }
  _inherits(RingCentralClient, _Client);
  return _createClass(RingCentralClient, [{
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
}(_ringcentralClient.Client);
//# sourceMappingURL=RingCentralClient.js.map
