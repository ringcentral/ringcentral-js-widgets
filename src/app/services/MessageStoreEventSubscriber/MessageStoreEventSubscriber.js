"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageStoreEventSubscriber = void 0;
var _subscriptionFilters = require("@ringcentral-integration/commons/enums/subscriptionFilters");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _rxjs = require("rxjs");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;
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
var MessageStoreEventSubscriber = exports.MessageStoreEventSubscriber = (_dec = (0, _nextCore.injectable)({
  name: 'MessageStoreEventSubscriber'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('Subscription')(target, undefined, 1);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('TabManager')(target, undefined, 2);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)('MessageStoreEventSubscriberOptions')(target, undefined, 3);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof Subscription === "undefined" ? Object : Subscription, Object, typeof MessageStoreEventSubscriberOptions === "undefined" ? Object : MessageStoreEventSubscriberOptions]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = /*#__PURE__*/function (_RcModule) {
  function MessageStoreEventSubscriber(_appFeatures, _subscription, _tabManager, _messageStoreEventSubscriberOptions) {
    var _this$_subscription;
    var _this;
    _classCallCheck(this, MessageStoreEventSubscriber);
    _this = _callSuper(this, MessageStoreEventSubscriber);
    _this._appFeatures = _appFeatures;
    _this._subscription = _subscription;
    _this._tabManager = _tabManager;
    _this._messageStoreEventSubscriberOptions = _messageStoreEventSubscriberOptions;
    _this.messageEvents = _this.getMessageEvents$();
    (_this$_subscription = _this._subscription) === null || _this$_subscription === void 0 ? void 0 : _this$_subscription.register(_this, {
      filters: [_subscriptionFilters.subscriptionFilters.messageStore, _subscriptionFilters.subscriptionFilters.instantMessage]
    });
    return _this;
  }
  _inherits(MessageStoreEventSubscriber, _RcModule);
  return _createClass(MessageStoreEventSubscriber, [{
    key: "_hasPermission",
    get: function get() {
      return this._appFeatures.hasReadMessagesPermission;
    }
  }, {
    key: "getMessageEvents$",
    value: function getMessageEvents$() {
      var _this2 = this;
      var _subscription = this._subscription;
      if (!_subscription) return;
      var messageStore$ = _subscription.fromMessage$(/\/message-store$/).pipe((0, _rxjs.filter)(function () {
        return _this2._hasPermission;
      }));
      var instantMessage$ = _subscription.fromMessage$(/\/message-store\/instant\?type=SMS$/).pipe((0, _rxjs.filter)(function () {
        return _this2._hasPermission;
      }));
      return {
        messageStore$: messageStore$,
        instantMessage$: instantMessage$
      };
    }
  }]);
}(_nextCore.RcModule)) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=MessageStoreEventSubscriber.js.map
