"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.for-each");

var _di = require("../../lib/di");

var _selector = require("../../lib/selector");

var _DataFetcher2 = _interopRequireDefault(require("../../lib/DataFetcher"));

var _permissionsMessages = _interopRequireDefault(require("./permissionsMessages"));

var _loginStatus = _interopRequireDefault(require("../Auth/loginStatus"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _dec, _class, _class2, _descriptor, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var DEFAULT_TTL = 24 * 60 * 60 * 1000;

function extractData(permissions) {
  var output = {};
  permissions.permissions.forEach(function (item) {
    output[item.permission.id] = true;
  });
  return output;
}
/**
 * @class
 * @description Roles and permission module
 */


var RolesAndPermissions = (_dec = (0, _di.Module)({
  deps: ['Client', 'Alert', 'ExtensionInfo', {
    dep: 'RolesAndPermissionsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_DataFetcher) {
  _inherits(RolesAndPermissions, _DataFetcher);

  var _super = _createSuper(RolesAndPermissions);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Alert} params.alert - alert module instance
   * @param {ExtensionInfo} params.extensionInfo - extensionInfo module instance
   * @param {Bool} params.isCRM - if it is CRM
   * @param {String} params.flag - app flag
   * @param {Number} params.ttl - local cache time
   */
  function RolesAndPermissions(_ref) {
    var _this;

    var isCRM = _ref.isCRM,
        flag = _ref.flag,
        client = _ref.client,
        alert = _ref.alert,
        extensionInfo = _ref.extensionInfo,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === void 0 ? DEFAULT_TTL : _ref$ttl,
        options = _objectWithoutProperties(_ref, ["isCRM", "flag", "client", "alert", "extensionInfo", "ttl"]);

    _classCallCheck(this, RolesAndPermissions);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      client: client,
      ttl: ttl,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.t0 = extractData;
                  _context.next = 3;
                  return _this._client.account().extension().authzProfile().get();

                case 3:
                  _context.t1 = _context.sent;
                  return _context.abrupt("return", (0, _context.t0)(_context.t1));

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function fetchFunction() {
          return _fetchFunction.apply(this, arguments);
        }

        return fetchFunction;
      }(),
      readyCheckFn: function readyCheckFn() {
        return _this._extensionInfo.ready;
      },
      forbiddenHandler: function () {
        var _forbiddenHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _this._auth.logout();

                case 2:
                  _this._alert.danger({
                    message: _permissionsMessages["default"].insufficientPrivilege,
                    ttl: 0
                  });

                  return _context2.abrupt("return", {});

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function forbiddenHandler() {
          return _forbiddenHandler.apply(this, arguments);
        }

        return forbiddenHandler;
      }(),
      cleanOnReset: true
    }));

    _initializerDefineProperty(_this, "permissions", _descriptor, _assertThisInitialized(_this));

    _this._isCRM = !!isCRM;
    _this._flag = flag || 'SalesForce';
    _this._alert = (0, _ensureExist["default"])(alert, 'alert');
    _this._extensionInfo = (0, _ensureExist["default"])(extensionInfo, 'extensionInfo');
    _this._onDataReadyHandler = [];
    return _this;
  }

  _createClass(RolesAndPermissions, [{
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _iterator, _step, handler, hasPermissions;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // fire event handler when data is ready
                if (this._isDataReady()) {
                  _iterator = _createForOfIteratorHelper(this._onDataReadyHandler);

                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      handler = _step.value;
                      handler();
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }
                }

                _context3.next = 3;
                return _get(_getPrototypeOf(RolesAndPermissions.prototype), "_onStateChange", this).call(this);

              case 3:
                if (!(this.ready && this._auth.loginStatus === _loginStatus["default"].loggedIn && this._isCRM && this.tierEnabled !== null && !this.tierEnabled)) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 6;
                return this._auth.logout();

              case 6:
                this._alert.danger({
                  message: _permissionsMessages["default"].invalidTier,
                  ttl: 0
                });

              case 7:
                if (!(this.ready && this._auth.loginStatus === _loginStatus["default"].loggedIn && !this.permissions.ReadUserInfo)) {
                  _context3.next = 12;
                  break;
                }

                hasPermissions = !!this.data;
                _context3.next = 11;
                return this._auth.logout();

              case 11:
                if (hasPermissions) {
                  this._alert.danger({
                    message: _permissionsMessages["default"].insufficientPrivilege,
                    ttl: 0
                  });
                }

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _onStateChange() {
        return _onStateChange2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: "onDataReady",
    value: function onDataReady(fn) {
      this._onDataReadyHandler.push(fn);
    }
  }, {
    key: "refreshServiceFeatures",
    value: function refreshServiceFeatures() {
      if (this._extensionInfo.ready) {
        this._extensionInfo.fetchData();
      }
    }
  }, {
    key: "_name",
    get: function get() {
      return 'rolesAndPermissions';
    }
  }, {
    key: "serviceFeatures",
    get: function get() {
      return this._extensionInfo.serviceFeatures;
    }
  }, {
    key: "ringoutEnabled",
    get: function get() {
      return !!(this._extensionInfo.serviceFeatures && this._extensionInfo.serviceFeatures.RingOut && this._extensionInfo.serviceFeatures.RingOut.enabled);
    }
  }, {
    key: "webphoneEnabled",
    get: function get() {
      return !!(this._extensionInfo.serviceFeatures && this._extensionInfo.serviceFeatures.WebPhone && this._extensionInfo.serviceFeatures.WebPhone.enabled);
    }
  }, {
    key: "callingEnabled",
    get: function get() {
      return this.webphoneEnabled || this.ringoutEnabled;
    }
  }, {
    key: "tierEnabled",
    get: function get() {
      if (!this._extensionInfo.serviceFeatures || !this._extensionInfo.serviceFeatures[this._flag]) {
        return null;
      }

      return this._extensionInfo.serviceFeatures[this._flag].enabled;
    }
  }, {
    key: "hasReadCallLogPermission",
    get: function get() {
      return !!(this.ready && this.permissions && this.permissions.ReadCallLog);
    }
  }, {
    key: "hasPresencePermission",
    get: function get() {
      return !!(this.ready && this.callingEnabled && this.permissions && this.permissions.ReadPresenceStatus);
    }
  }, {
    key: "hasEditPresencePermission",
    get: function get() {
      return !!(this.ready && this.callingEnabled && this.permissions && this.permissions.EditPresenceStatus);
    }
  }, {
    key: "hasComposeTextPermission",
    get: function get() {
      return !!(this.serviceFeatures && (this.serviceFeatures.Pager && this.serviceFeatures.Pager.enabled || this.serviceFeatures.SMS && this.serviceFeatures.SMS.enabled));
    }
  }, {
    key: "onlyPagerPermission",
    get: function get() {
      return !!(this.serviceFeatures && this.serviceFeatures.Pager && this.serviceFeatures.Pager.enabled && this.serviceFeatures.SMS && !this.serviceFeatures.SMS.enabled);
    }
  }, {
    key: "hasReadMessagesPermission",
    get: function get() {
      return this.ready && (this.readTextPermissions || this.voicemailPermissions || this.readFaxPermissions);
    }
  }, {
    key: "readTextPermissions",
    get: function get() {
      return !!(this.serviceFeatures && (this.serviceFeatures.PagerReceiving && this.serviceFeatures.PagerReceiving.enabled || this.serviceFeatures.SMSReceiving && this.serviceFeatures.SMSReceiving.enabled));
    }
  }, {
    key: "voicemailPermissions",
    get: function get() {
      return !!(this.permissions && this.permissions.Voicemail && this.serviceFeatures && this.serviceFeatures.Voicemail && this.serviceFeatures.Voicemail.enabled);
    }
  }, {
    key: "readFaxPermissions",
    get: function get() {
      return !!(this.serviceFeatures && this.serviceFeatures.FaxReceiving && this.serviceFeatures.FaxReceiving.enabled);
    }
  }, {
    key: "hasUserGuidePermission",
    get: function get() {
      return !!(this.callingEnabled || this.hasReadMessagesPermission);
    }
  }, {
    key: "hasConferencingPermission",
    get: function get() {
      return !!(this.serviceFeatures && this.serviceFeatures.Conferencing && this.serviceFeatures.Conferencing.enabled);
    }
  }, {
    key: "hasGlipPermission",
    get: function get() {
      return !!(this.permissions && this.permissions.Glip);
    }
  }, {
    key: "hasConferenceCallPermission",
    get: function get() {
      return this.callingEnabled && this.webphoneEnabled;
    }
  }]);

  return RolesAndPermissions;
}(_DataFetcher2["default"]), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "permissions", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return [function () {
      return _this2.data;
    }, function (data) {
      return data || {};
    }];
  }
})), _class2)) || _class);
exports["default"] = RolesAndPermissions;
//# sourceMappingURL=index.js.map
