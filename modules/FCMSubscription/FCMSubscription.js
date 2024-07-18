"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FCMSubscription = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _app = require("firebase/app");
var _messaging = require("firebase/messaging");
var _subscriptionFilters = require("../../enums/subscriptionFilters");
var _di = require("../../lib/di");
var _utils = require("../../utils");
var _dec, _class, _class2, _descriptor, _descriptor2;
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));) { ; } return t; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var FCMSubscription = (_dec = (0, _di.Module)({
  name: 'FCMSubscription',
  deps: ['Auth', 'Storage', 'Client', {
    dep: 'FCMSubscriptionOptions'
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(FCMSubscription, _RcModuleV);
  var _super = _createSuper(FCMSubscription);
  function FCMSubscription(deps) {
    var _this;
    _classCallCheck(this, FCMSubscription);
    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'FCMSubscription'
    });
    // Initialize Firebase
    _this.messaging = void 0;
    _initializerDefineProperty(_this, "registrationToken", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "fcmSubscription", _descriptor2, _assertThisInitialized(_this));
    var firebaseApp = (0, _app.initializeApp)(_this._deps.fCMSubscriptionOptions.firebaseConfig);
    _this.messaging = (0, _messaging.getMessaging)(firebaseApp);
    return _this;
  }
  _createClass(FCMSubscription, [{
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(_get(_getPrototypeOf(FCMSubscription.prototype), "_shouldInit", this).call(this) && this._deps.auth.loggedIn);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_get(_getPrototypeOf(FCMSubscription.prototype), "_shouldReset", this).call(this) || this.ready && !this._deps.auth.loggedIn);
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      this._deps.auth.addBeforeLogoutHandler( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var fcmSubscription;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fcmSubscription = _this2.fcmSubscription;
                if (!fcmSubscription) {
                  _context.next = 4;
                  break;
                }
                _context.next = 4;
                return _this2._deleteSubscription(fcmSubscription);
              case 4:
              case "end":
                return _context.stop();
            }
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
      var _createSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(registrationToken) {
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._deps.client.service.post('/restapi/v1.0/subscription', {
                  eventFilters: ['/restapi/v1.0/account/~/extension/~/start-ring', '/restapi/v1.0/account/~/extension/~/stop-ring', '/restapi/v1.0/account/~/extension/~/missed-calls', '/restapi/v1.0/account/~/extension/~/fax?direction=Inbound', '/restapi/v1.0/account/~/extension/~/voicemail', '/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS', '/restapi/v1.0/account/~/extension/~/message-store?type=Pager&direction=Inbound', _subscriptionFilters.subscriptionFilters.presence],
                  deliveryMode: {
                    transportType: 'RC/GCM',
                    registrationId: registrationToken,
                    certificateName: this._deps.fCMSubscriptionOptions.certificateName
                  }
                });
              case 2:
                response = _context2.sent;
                return _context2.abrupt("return", response.json());
              case 4:
              case "end":
                return _context2.stop();
            }
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
      var _deleteSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(fcmSubscription) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._deps.client.service["delete"]("/restapi/v1.0/subscription/".concat(fcmSubscription.id));
              case 2:
                this.setFcmSubscription(null);
              case 3:
              case "end":
                return _context3.stop();
            }
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
      var _createOrUpdateSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(fcmSubscription, registrationToken) {
        var renewResponse;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (fcmSubscription) {
                  _context4.next = 4;
                  break;
                }
                _context4.next = 3;
                return this._createSubscription(registrationToken);
              case 3:
                return _context4.abrupt("return", _context4.sent);
              case 4:
                if (!(fcmSubscription.deliveryMode.registrationId === registrationToken)) {
                  _context4.next = 9;
                  break;
                }
                _context4.next = 7;
                return this._deps.client.service.post("/restapi/v1.0/subscription/".concat(fcmSubscription.id, "/renew"));
              case 7:
                renewResponse = _context4.sent;
                return _context4.abrupt("return", renewResponse.json());
              case 9:
                _context4.prev = 9;
                this._deleteSubscription(fcmSubscription);
                _context4.next = 17;
                break;
              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](9);
                console.error("[FCMSubscription] subscription delete fail: ".concat(_context4.t0));
                throw _context4.t0;
              case 17:
                _context4.next = 19;
                return this._createSubscription(registrationToken);
              case 19:
                return _context4.abrupt("return", _context4.sent);
              case 20:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[9, 13]]);
      }));
      function _createOrUpdateSubscription(_x3, _x4) {
        return _createOrUpdateSubscription2.apply(this, arguments);
      }
      return _createOrUpdateSubscription;
    }()
  }, {
    key: "_registerFCM",
    value: function () {
      var _registerFCM2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var registrationToken, subscription;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.getServiceworkerRigestration();
              case 2:
                registrationToken = this.registrationToken;
                subscription = this.fcmSubscription;
                _context5.next = 6;
                return this._createOrUpdateSubscription(subscription, registrationToken);
              case 6:
                subscription = _context5.sent;
                this.setFcmSubscription(subscription);
              case 8:
              case "end":
                return _context5.stop();
            }
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
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _this4 = this;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return (0, _utils.waitUntilTo)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                  return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          _context6.next = 2;
                          return _this4._registerFCM();
                        case 2:
                          return _context6.abrupt("return", _context6.sent);
                        case 3:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6);
                })), {
                  timeout: 30000,
                  interval: 10000
                });
              case 3:
                _context7.next = 8;
                break;
              case 5:
                _context7.prev = 5;
                _context7.t0 = _context7["catch"](0);
                console.error("===something error:".concat(_context7.t0));
              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 5]]);
      }));
      function onInit() {
        return _onInit.apply(this, arguments);
      }
      return onInit;
    }()
  }]);
  return FCMSubscription;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "registrationToken", [_core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "setFcmSubscription", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setFcmSubscription"), _class2.prototype)), _class2)) || _class);
exports.FCMSubscription = FCMSubscription;
//# sourceMappingURL=FCMSubscription.js.map
