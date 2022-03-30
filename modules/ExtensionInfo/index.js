"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("regenerator-runtime/runtime");

var _jsonMask = _interopRequireDefault(require("json-mask"));

var _permissionsMessages = require("../../enums/permissionsMessages");

var _subscriptionFilters = _interopRequireDefault(require("../../enums/subscriptionFilters"));

var _subscriptionHints = _interopRequireDefault(require("../../enums/subscriptionHints"));

var _DataFetcher2 = _interopRequireDefault(require("../../lib/DataFetcher"));

var _di = require("../../lib/di");

var _selector = require("../../lib/selector");

var _dec, _class, _class2, _descriptor, _descriptor2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var DEFAULT_MASK = ['id', 'extensionNumber', 'contact(*)', 'name', 'type', 'status', 'permissions', 'profileImage', 'departments', 'site', "regionalSettings(".concat(['timezone(id,name,bias)', 'homeCountry(id,isoCode,callingCode)', 'language(localeCode)', 'formattingLocale(localeCode)', 'timeFormat'].join(','), ")")].join(',');
var DEFAULT_COUNTRY = {
  id: '1',
  isoCode: 'US',
  callingCode: '1'
};
var extensionRegExp = /.*\/extension\/\d+$/;

function extractData(info) {
  return (0, _jsonMask["default"])(info, DEFAULT_MASK);
}

var DEFAULT_TTL = 30 * 60 * 1000; // half hour update

var DEFAULT_TIME_TO_RETRY = 62 * 1000; // serviceFeatures is deprecated from platform api

/**
 * @class
 * @description Extension info module
 * @deprecated Please use V2
 */

var ExtensionInfo = (_dec = (0, _di.Module)({
  deps: ['Client', 'ExtensionFeatures', {
    dep: 'Alert',
    optional: true
  }, {
    dep: 'ExtensionInfoOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DataFetcher) {
  _inherits(ExtensionInfo, _DataFetcher);

  var _super = _createSuper(ExtensionInfo);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {ExtensionInfoOptions} params.isMultipleSiteEnable - extension info options: Is multiple site enabled
   */
  function ExtensionInfo(_ref) {
    var _this;

    var client = _ref.client,
        extensionFeatures = _ref.extensionFeatures,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === void 0 ? DEFAULT_TTL : _ref$ttl,
        _ref$timeToRetry = _ref.timeToRetry,
        timeToRetry = _ref$timeToRetry === void 0 ? DEFAULT_TIME_TO_RETRY : _ref$timeToRetry,
        _ref$polling = _ref.polling,
        polling = _ref$polling === void 0 ? true : _ref$polling,
        alert = _ref.alert,
        extensionInfoOptions = _ref.extensionInfoOptions,
        options = _objectWithoutProperties(_ref, ["client", "extensionFeatures", "ttl", "timeToRetry", "polling", "alert", "extensionInfoOptions"]);

    _classCallCheck(this, ExtensionInfo);

    _this = _super.call(this, _objectSpread({
      client: client,
      ttl: ttl,
      polling: polling,
      timeToRetry: timeToRetry,
      subscriptionFilters: [_subscriptionFilters["default"].extensionInfo],
      subscriptionHandler: function () {
        var _subscriptionHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(message) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _this._subscriptionHandleFn(message);

                case 2:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function subscriptionHandler(_x) {
          return _subscriptionHandler.apply(this, arguments);
        }

        return subscriptionHandler;
      }(),
      cleanOnReset: true,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.t0 = extractData;
                  _context2.next = 3;
                  return _this._client.account().extension().get();

                case 3:
                  _context2.t1 = _context2.sent;
                  return _context2.abrupt("return", (0, _context2.t0)(_context2.t1));

                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function fetchFunction() {
          return _fetchFunction.apply(this, arguments);
        }

        return fetchFunction;
      }(),
      forbiddenHandler: function () {
        var _forbiddenHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return _this._auth.logout();

                case 2:
                  if (_this._alert) {
                    _this._alert.danger({
                      message: _permissionsMessages.permissionsMessages.insufficientPrivilege,
                      ttl: 0
                    });
                  }

                  return _context3.abrupt("return", {});

                case 4:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        function forbiddenHandler() {
          return _forbiddenHandler.apply(this, arguments);
        }

        return forbiddenHandler;
      }()
    }, options));

    _initializerDefineProperty(_this, "info", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "site", _descriptor2, _assertThisInitialized(_this));

    _this._alert = alert;
    _this._extensionFeatures = extensionFeatures;
    _this._extensionInfoOptions = extensionInfoOptions;
    return _this;
  }

  _createClass(ExtensionInfo, [{
    key: "_subscriptionHandleFn",
    value: function () {
      var _subscriptionHandleFn2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(message) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(message && message.body && extensionRegExp.test(message.event) && !(message.body.hints && (message.body.hints.includes(_subscriptionHints["default"].companyNumbers) || message.body.hints.includes(_subscriptionHints["default"].limits) || message.body.hints.includes(_subscriptionHints["default"].features) || message.body.hints.includes(_subscriptionHints["default"].permissions) || message.body.hints.includes(_subscriptionHints["default"].videoConfiguration))))) {
                  _context4.next = 3;
                  break;
                }

                _context4.next = 3;
                return this.fetchData();

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _subscriptionHandleFn(_x2) {
        return _subscriptionHandleFn2.apply(this, arguments);
      }

      return _subscriptionHandleFn;
    }()
  }, {
    key: "_name",
    get: function get() {
      return 'extensionInfo';
    }
  }, {
    key: "isMultipleSiteEnabled",
    get: function get() {
      var _this$_extensionInfoO, _this$_extensionInfoO2;

      return (_this$_extensionInfoO = (_this$_extensionInfoO2 = this._extensionInfoOptions) === null || _this$_extensionInfoO2 === void 0 ? void 0 : _this$_extensionInfoO2.isMultipleSiteEnabled) !== null && _this$_extensionInfoO !== void 0 ? _this$_extensionInfoO : false;
    }
  }, {
    key: "id",
    get: function get() {
      return this.info.id;
    }
  }, {
    key: "extensionNumber",
    get: function get() {
      return this.info.extensionNumber;
    }
  }, {
    key: "country",
    get: function get() {
      return this.info.regionalSettings && this.info.regionalSettings.homeCountry || DEFAULT_COUNTRY;
    }
  }, {
    key: "departments",
    get: function get() {
      return this.info.departments;
    }
  }, {
    key: "isCallQueueMember",
    get: function get() {
      return !!this.departments && Array.isArray(this.departments) && this.departments.length > 0;
    }
  }]);

  return ExtensionInfo;
}(_DataFetcher2["default"]), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "info", [_selector.selector], {
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
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "site", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return [function () {
      return _this3.info;
    }, function (info) {
      var _this3$_extensionFeat, _this3$_extensionFeat2;

      if (!_this3.isMultipleSiteEnabled) {
        return null;
      }

      var isEnabled = !!((_this3$_extensionFeat = _this3._extensionFeatures.features) === null || _this3$_extensionFeat === void 0 ? void 0 : (_this3$_extensionFeat2 = _this3$_extensionFeat.SiteCodes) === null || _this3$_extensionFeat2 === void 0 ? void 0 : _this3$_extensionFeat2.available);

      if (!isEnabled) {
        return null;
      }

      if (!info.site) {
        console.warn('site code enabled, but cannot retrieve site info');
      }

      return info.site || null;
    }];
  }
})), _class2)) || _class);
exports["default"] = ExtensionInfo;
//# sourceMappingURL=index.js.map
