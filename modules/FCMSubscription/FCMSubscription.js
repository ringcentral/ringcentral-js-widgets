"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FCMSubscription = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
var _core = require("@ringcentral-integration/core");
var _app = require("firebase/app");
var _messaging = require("firebase/messaging");
var _subscriptionFilters = require("../../enums/subscriptionFilters");
var _di = require("../../lib/di");
var _utils = require("../../utils");
var _dec, _class, _class2, _descriptor, _descriptor2;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var FCMSubscription = exports.FCMSubscription = (_dec = (0, _di.Module)({
  name: 'FCMSubscription',
  deps: ['Auth', 'Storage', 'Client', {
    dep: 'FCMSubscriptionOptions'
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function FCMSubscription(deps) {
    var _this;
    _classCallCheck(this, FCMSubscription);
    _this = _callSuper(this, FCMSubscription, [{
      deps: deps,
      enableCache: true,
      storageKey: 'FCMSubscription'
    }]);
    // Initialize Firebase
    _this.messaging = void 0;
    _initializerDefineProperty(_this, "registrationToken", _descriptor, _this);
    _initializerDefineProperty(_this, "fcmSubscription", _descriptor2, _this);
    var firebaseApp = (0, _app.initializeApp)(_this._deps.fCMSubscriptionOptions.firebaseConfig);
    _this.messaging = (0, _messaging.getMessaging)(firebaseApp);
    return _this;
  }
  _inherits(FCMSubscription, _RcModuleV);
  return _createClass(FCMSubscription, [{
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(_superPropGet(FCMSubscription, "_shouldInit", this, 3)([]) && this._deps.auth.loggedIn);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_superPropGet(FCMSubscription, "_shouldReset", this, 3)([]) || this.ready && !this._deps.auth.loggedIn);
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      this._deps.auth.addBeforeLogoutHandler(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var fcmSubscription;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              fcmSubscription = _this2.fcmSubscription;
              if (!fcmSubscription) {
                _context.n = 1;
                break;
              }
              _context.n = 1;
              return _this2._deleteSubscription(fcmSubscription);
            case 1:
              return _context.a(2);
          }
        }, _callee);
      })));
    }
  }, {
    key: "setRegistrationToken",
    value: function setRegistrationToken(token) {
      this.registrationToken = token;
    }
  }, {
    key: "setFcmSubscription",
    value: function setFcmSubscription(subscription) {
      this.fcmSubscription = subscription;
    }
  }, {
    key: "getServiceworkerRigestration",
    value: function getServiceworkerRigestration() {
      var _this3 = this;
      return new Promise(function (resolve, reject) {
        navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
          (0, _messaging.getToken)(_this3.messaging, {
            vapidKey: _this3._deps.fCMSubscriptionOptions.vapidKey,
            serviceWorkerRegistration: serviceWorkerRegistration
          }).then(function (currentToken) {
            if (currentToken) {
              console.log('===registration token: ', currentToken);
              _this3.setRegistrationToken(currentToken);
              resolve(null);
            } else {
              // Show permission request UI
              console.log('==No registration token available. Request permission to generate one.');
              _this3.setRegistrationToken(null);
              resolve(null);
            }
          })["catch"](function (err) {
            console.log('An error occurred while retrieving token. ', err);
            _this3.setRegistrationToken(null);
            reject();
          });
        });
      });
    }
  }, {
    key: "_createSubscription",
    value: function () {
      var _createSubscription2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(registrationToken) {
        var response;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return this._deps.client.service.post('/restapi/v1.0/subscription', {
                eventFilters: ['/restapi/v1.0/account/~/extension/~/start-ring', '/restapi/v1.0/account/~/extension/~/stop-ring', '/restapi/v1.0/account/~/extension/~/missed-calls', '/restapi/v1.0/account/~/extension/~/fax?direction=Inbound', '/restapi/v1.0/account/~/extension/~/voicemail', '/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS', '/restapi/v1.0/account/~/extension/~/message-store?type=Pager&direction=Inbound', _subscriptionFilters.subscriptionFilters.presence],
                deliveryMode: {
                  transportType: 'RC/GCM',
                  registrationId: registrationToken,
                  certificateName: this._deps.fCMSubscriptionOptions.certificateName
                }
              });
            case 1:
              response = _context2.v;
              return _context2.a(2, response.json());
          }
        }, _callee2, this);
      }));
      function _createSubscription(_x) {
        return _createSubscription2.apply(this, arguments);
      }
      return _createSubscription;
    }()
  }, {
    key: "_deleteSubscription",
    value: function () {
      var _deleteSubscription2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(fcmSubscription) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return this._deps.client.service["delete"]("/restapi/v1.0/subscription/".concat(fcmSubscription.id));
            case 1:
              this.setFcmSubscription(null);
            case 2:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function _deleteSubscription(_x2) {
        return _deleteSubscription2.apply(this, arguments);
      }
      return _deleteSubscription;
    }()
  }, {
    key: "_createOrUpdateSubscription",
    value: function () {
      var _createOrUpdateSubscription2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(fcmSubscription, registrationToken) {
        var renewResponse, _t;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              if (fcmSubscription) {
                _context4.n = 2;
                break;
              }
              _context4.n = 1;
              return this._createSubscription(registrationToken);
            case 1:
              return _context4.a(2, _context4.v);
            case 2:
              if (!(fcmSubscription.deliveryMode.registrationId === registrationToken)) {
                _context4.n = 4;
                break;
              }
              _context4.n = 3;
              return this._deps.client.service.post("/restapi/v1.0/subscription/".concat(fcmSubscription.id, "/renew"));
            case 3:
              renewResponse = _context4.v;
              return _context4.a(2, renewResponse.json());
            case 4:
              _context4.p = 4;
              this._deleteSubscription(fcmSubscription);
              _context4.n = 6;
              break;
            case 5:
              _context4.p = 5;
              _t = _context4.v;
              console.error("[FCMSubscription] subscription delete fail: ".concat(_t));
              throw _t;
            case 6:
              _context4.n = 7;
              return this._createSubscription(registrationToken);
            case 7:
              return _context4.a(2, _context4.v);
          }
        }, _callee4, this, [[4, 5]]);
      }));
      function _createOrUpdateSubscription(_x3, _x4) {
        return _createOrUpdateSubscription2.apply(this, arguments);
      }
      return _createOrUpdateSubscription;
    }()
  }, {
    key: "_registerFCM",
    value: function () {
      var _registerFCM2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var registrationToken, subscription;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return this.getServiceworkerRigestration();
            case 1:
              registrationToken = this.registrationToken;
              subscription = this.fcmSubscription;
              _context5.n = 2;
              return this._createOrUpdateSubscription(subscription, registrationToken);
            case 2:
              subscription = _context5.v;
              this.setFcmSubscription(subscription);
            case 3:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function _registerFCM() {
        return _registerFCM2.apply(this, arguments);
      }
      return _registerFCM;
    }()
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var _this4 = this;
        var _t2;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              _context7.n = 1;
              return (0, _utils.waitUntilTo)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
                return _regenerator().w(function (_context6) {
                  while (1) switch (_context6.n) {
                    case 0:
                      _context6.n = 1;
                      return _this4._registerFCM();
                    case 1:
                      return _context6.a(2, _context6.v);
                  }
                }, _callee6);
              })), {
                timeout: 30000,
                interval: 10000
              });
            case 1:
              _context7.n = 3;
              break;
            case 2:
              _context7.p = 2;
              _t2 = _context7.v;
              console.error("===something error:".concat(_t2));
            case 3:
              return _context7.a(2);
          }
        }, _callee7, null, [[0, 2]]);
      }));
      function onInit() {
        return _onInit.apply(this, arguments);
      }
      return onInit;
    }()
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "registrationToken", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setRegistrationToken", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setRegistrationToken"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "fcmSubscription", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setFcmSubscription", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setFcmSubscription"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=FCMSubscription.js.map
