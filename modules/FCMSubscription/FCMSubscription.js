"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FCMSubscription = void 0;
require("regenerator-runtime/runtime");
var _app = require("firebase/app");
var _messaging = require("firebase/messaging");
var _core = require("@ringcentral-integration/core");
var _subscriptionFilters = require("../../enums/subscriptionFilters");
var _di = require("../../lib/di");
var _utils = require("../../utils");
var _dec, _class, _class2, _descriptor, _descriptor2;
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
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
