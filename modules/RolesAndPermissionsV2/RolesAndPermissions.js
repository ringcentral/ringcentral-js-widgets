"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RolesAndPermissions = void 0;

require("core-js/modules/es6.array.index-of");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _ramda = require("ramda");

var _di = require("../../lib/di");

var _AuthV = require("../AuthV2");

var _DataFetcherV = require("../DataFetcherV2");

var _permissionsMessages = require("../../enums/permissionsMessages");

var _dec, _dec2, _dec3, _class, _class2;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var DEFAULT_TTL = 24 * 60 * 60 * 1000;
var RolesAndPermissions = (_dec = (0, _di.Module)({
  name: 'RolesAndPermissions',
  deps: ['Auth', 'Alert', 'Client', 'DataFetcherV2', 'ExtensionInfo', {
    dep: 'RolesAndPermissionsOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var data = _ref.data;
  return [data];
}), _dec3 = (0, _core.computed)(function (_ref2) {
  var ready = _ref2.ready,
      data = _ref2.data;
  return [ready, data];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DataFetcherV2Consume) {
  _inherits(RolesAndPermissions, _DataFetcherV2Consume);

  var _super = _createSuper(RolesAndPermissions);

  function RolesAndPermissions(deps) {
    var _deps$rolesAndPermiss;

    var _this;

    _classCallCheck(this, RolesAndPermissions);

    _this = _super.call(this, {
      deps: deps
    });
    _this._onDataReadyHandlers = [];
    _this._stopWatching = null;
    var rolesAndPermissionsOptions = (_deps$rolesAndPermiss = deps.rolesAndPermissionsOptions) !== null && _deps$rolesAndPermiss !== void 0 ? _deps$rolesAndPermiss : {};
    var _rolesAndPermissionsO = rolesAndPermissionsOptions.ttl,
        ttl = _rolesAndPermissionsO === void 0 ? DEFAULT_TTL : _rolesAndPermissionsO;
    _this._source = new _DataFetcherV.DataSource(_objectSpread(_objectSpread({}, rolesAndPermissionsOptions), {}, {
      key: 'rolesAndPermissions',
      ttl: ttl,
      cleanOnReset: true,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var result, _error$response;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _this._deps.client.account().extension().authzProfile().get();

                case 3:
                  result = _context.sent;
                  return _context.abrupt("return", result);

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](0);

                  if (!(((_error$response = _context.t0.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === 403)) {
                    _context.next = 14;
                    break;
                  }

                  _context.next = 12;
                  return _this._deps.auth.logout();

                case 12:
                  _this._deps.alert.danger({
                    message: _permissionsMessages.permissionsMessages.insufficientPrivilege,
                    ttl: 0
                  });

                  return _context.abrupt("return", {});

                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 7]]);
        }));

        function fetchFunction() {
          return _fetchFunction.apply(this, arguments);
        }

        return fetchFunction;
      }(),
      readyCheckFunction: function readyCheckFunction() {
        return _this._deps.alert.ready && _this._deps.auth.ready && _this._deps.auth.loggedIn && _this._deps.dataFetcherV2.ready;
      }
    }));

    _this._deps.dataFetcherV2.register(_this._source);

    return _this;
  }

  _createClass(RolesAndPermissions, [{
    key: "_checkTier",
    value: function () {
      var _checkTier2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.ready && this._deps.auth.loginStatus === _AuthV.loginStatus.loggedIn && this.isCRM && this.tierEnabled === false)) {
                  _context2.next = 4;
                  break;
                }

                _context2.next = 3;
                return this._deps.auth.logout();

              case 3:
                this._deps.alert.danger({
                  message: _permissionsMessages.permissionsMessages.invalidTier,
                  ttl: 0
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _checkTier() {
        return _checkTier2.apply(this, arguments);
      }

      return _checkTier;
    }()
  }, {
    key: "_checkReadUserInfo",
    value: function () {
      var _checkReadUserInfo2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var hasPermissions;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.ready && this._deps.auth.loginStatus === _AuthV.loginStatus.loggedIn && !this.permissions.ReadUserInfo)) {
                  _context3.next = 5;
                  break;
                }

                hasPermissions = !!this.data;
                _context3.next = 4;
                return this._deps.auth.logout();

              case 4:
                if (hasPermissions) {
                  this._deps.alert.danger({
                    message: _permissionsMessages.permissionsMessages.insufficientPrivilege,
                    ttl: 0
                  });
                }

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _checkReadUserInfo() {
        return _checkReadUserInfo2.apply(this, arguments);
      }

      return _checkReadUserInfo;
    }()
  }, {
    key: "onInit",
    value: function onInit() {
      var _this2 = this;

      this._stopWatching = (0, _core.watch)(this, function () {
        return _this2._statusAndData;
      }, function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            ready = _ref4[0],
            data = _ref4[1];

        if (ready && data) {
          var _iterator = _createForOfIteratorHelper(_this2._onDataReadyHandlers),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var handler = _step.value;

              try {
                handler();
              } catch (error) {
                console.error(error);
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      });
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this$_stopWatching;

      (_this$_stopWatching = this._stopWatching) === null || _this$_stopWatching === void 0 ? void 0 : _this$_stopWatching.call(this);
      this._stopWatching = null;
    }
  }, {
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._checkTier();

              case 2:
                _context4.next = 4;
                return this._checkReadUserInfo();

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function onStateChange() {
        return _onStateChange.apply(this, arguments);
      }

      return onStateChange;
    }()
  }, {
    key: "onDataReady",
    value: function onDataReady(fn) {
      this._onDataReadyHandlers.push(fn);
    }
  }, {
    key: "refreshServiceFeatures",
    value: function refreshServiceFeatures() {
      this._deps.extensionInfo.fetchData();
    }
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.refreshServiceFeatures();

              case 2:
                return _context5.abrupt("return", _get(_getPrototypeOf(RolesAndPermissions.prototype), "fetchData", this).call(this));

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function fetchData() {
        return _fetchData.apply(this, arguments);
      }

      return fetchData;
    }()
  }, {
    key: "isCRM",
    get: function get() {
      var _this$_deps$rolesAndP, _this$_deps$rolesAndP2;

      return (_this$_deps$rolesAndP = (_this$_deps$rolesAndP2 = this._deps.rolesAndPermissionsOptions) === null || _this$_deps$rolesAndP2 === void 0 ? void 0 : _this$_deps$rolesAndP2.isCRM) !== null && _this$_deps$rolesAndP !== void 0 ? _this$_deps$rolesAndP : false;
    }
  }, {
    key: "flag",
    get: function get() {
      var _this$_deps$rolesAndP3, _this$_deps$rolesAndP4;

      return (_this$_deps$rolesAndP3 = (_this$_deps$rolesAndP4 = this._deps.rolesAndPermissionsOptions) === null || _this$_deps$rolesAndP4 === void 0 ? void 0 : _this$_deps$rolesAndP4.flag) !== null && _this$_deps$rolesAndP3 !== void 0 ? _this$_deps$rolesAndP3 : 'SalesForce';
    }
  }, {
    key: "permissions",
    get: function get() {
      var _this$data;

      return (0, _ramda.reduce)(function (acc, item) {
        acc[item.permission.id] = true;
        return acc;
      }, {}, ((_this$data = this.data) === null || _this$data === void 0 ? void 0 : _this$data.permissions) || []);
    }
  }, {
    key: "_statusAndData",
    get: function get() {
      return [this.ready, this.data];
    }
  }, {
    key: "serviceFeatures",
    get: function get() {
      return this._deps.extensionInfo.serviceFeatures;
    }
  }, {
    key: "ringoutEnabled",
    get: function get() {
      var _this$serviceFeatures;

      return !!((_this$serviceFeatures = this.serviceFeatures.RingOut) === null || _this$serviceFeatures === void 0 ? void 0 : _this$serviceFeatures.enabled);
    }
  }, {
    key: "webphoneEnabled",
    get: function get() {
      var _this$serviceFeatures2;

      return !!((_this$serviceFeatures2 = this.serviceFeatures.WebPhone) === null || _this$serviceFeatures2 === void 0 ? void 0 : _this$serviceFeatures2.enabled);
    }
  }, {
    key: "callingEnabled",
    get: function get() {
      return this.webphoneEnabled || this.ringoutEnabled;
    }
  }, {
    key: "tierEnabled",
    get: function get() {
      var feature = this.serviceFeatures[this.flag];
      return feature ? feature.enabled : null;
    }
  }, {
    key: "hasReadCallLogPermission",
    get: function get() {
      return !!(this.ready && this.permissions.ReadCallLog);
    }
  }, {
    key: "hasPresencePermission",
    get: function get() {
      return !!(this.ready && this.callingEnabled && this.permissions.ReadPresenceStatus);
    }
  }, {
    key: "hasEditPresencePermission",
    get: function get() {
      return !!(this.ready && this.callingEnabled && this.permissions.EditPresenceStatus);
    }
  }, {
    key: "hasComposeTextPermission",
    get: function get() {
      var _this$serviceFeatures3, _this$serviceFeatures4;

      return !!(((_this$serviceFeatures3 = this.serviceFeatures.Pager) === null || _this$serviceFeatures3 === void 0 ? void 0 : _this$serviceFeatures3.enabled) || ((_this$serviceFeatures4 = this.serviceFeatures.SMS) === null || _this$serviceFeatures4 === void 0 ? void 0 : _this$serviceFeatures4.enabled));
    }
  }, {
    key: "onlyPagerPermission",
    get: function get() {
      var _this$serviceFeatures5, _this$serviceFeatures6;

      return !!(((_this$serviceFeatures5 = this.serviceFeatures.Pager) === null || _this$serviceFeatures5 === void 0 ? void 0 : _this$serviceFeatures5.enabled) && !((_this$serviceFeatures6 = this.serviceFeatures.SMS) === null || _this$serviceFeatures6 === void 0 ? void 0 : _this$serviceFeatures6.enabled));
    }
  }, {
    key: "hasReadMessagesPermission",
    get: function get() {
      return this.ready && (this.readTextPermissions || this.voicemailPermissions || this.readFaxPermissions);
    }
  }, {
    key: "readTextPermissions",
    get: function get() {
      var _this$serviceFeatures7, _this$serviceFeatures8;

      return !!(((_this$serviceFeatures7 = this.serviceFeatures.PagerReceiving) === null || _this$serviceFeatures7 === void 0 ? void 0 : _this$serviceFeatures7.enabled) || ((_this$serviceFeatures8 = this.serviceFeatures.SMSReceiving) === null || _this$serviceFeatures8 === void 0 ? void 0 : _this$serviceFeatures8.enabled));
    }
  }, {
    key: "voicemailPermissions",
    get: function get() {
      var _this$permissions, _this$serviceFeatures9;

      return !!(((_this$permissions = this.permissions) === null || _this$permissions === void 0 ? void 0 : _this$permissions.Voicemail) && ((_this$serviceFeatures9 = this.serviceFeatures.Voicemail) === null || _this$serviceFeatures9 === void 0 ? void 0 : _this$serviceFeatures9.enabled));
    }
  }, {
    key: "readFaxPermissions",
    get: function get() {
      var _this$serviceFeatures10;

      return !!((_this$serviceFeatures10 = this.serviceFeatures.FaxReceiving) === null || _this$serviceFeatures10 === void 0 ? void 0 : _this$serviceFeatures10.enabled);
    }
  }, {
    key: "hasUserGuidePermission",
    get: function get() {
      return !!(this.callingEnabled || this.hasReadMessagesPermission);
    }
  }, {
    key: "hasConferencingPermission",
    get: function get() {
      var _this$serviceFeatures11;

      return !!((_this$serviceFeatures11 = this.serviceFeatures.Conferencing) === null || _this$serviceFeatures11 === void 0 ? void 0 : _this$serviceFeatures11.enabled);
    }
  }, {
    key: "hasGlipPermission",
    get: function get() {
      return !!this.permissions.Glip;
    }
  }, {
    key: "hasConferenceCallPermission",
    get: function get() {
      return this.callingEnabled && this.webphoneEnabled;
    }
  }, {
    key: "hasMeetingsPermission",
    get: function get() {
      return !!this.permissions.Meetings;
    }
  }, {
    key: "hasCallControlPermission",
    get: function get() {
      var _this$_deps$auth$toke, _this$_deps$auth$toke2;

      return ((_this$_deps$auth$toke = this._deps.auth.token.scope) === null || _this$_deps$auth$toke === void 0 ? void 0 : _this$_deps$auth$toke.indexOf('CallControl')) > -1 || ((_this$_deps$auth$toke2 = this._deps.auth.token.scope) === null || _this$_deps$auth$toke2 === void 0 ? void 0 : _this$_deps$auth$toke2.indexOf('TelephonySession')) > -1;
    }
  }]);

  return RolesAndPermissions;
}(_DataFetcherV.DataFetcherV2Consumer), (_applyDecoratedDescriptor(_class2.prototype, "permissions", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "permissions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_statusAndData", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "_statusAndData"), _class2.prototype)), _class2)) || _class);
exports.RolesAndPermissions = RolesAndPermissions;
//# sourceMappingURL=RolesAndPermissions.js.map
