"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.is-array");

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

var _jsonMask = _interopRequireDefault(require("json-mask"));

var _subscriptionFilters = _interopRequireDefault(require("../../enums/subscriptionFilters"));

var _di = require("../../lib/di");

var _DataFetcher2 = _interopRequireDefault(require("../../lib/DataFetcher"));

var _permissionsMessages = _interopRequireDefault(require("../RolesAndPermissions/permissionsMessages"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DEFAULT_MASK = ['id', 'extensionNumber', 'contact(*)', 'name', 'type', 'status', 'permissions', 'profileImage', 'departments', "regionalSettings(".concat(['timezone(id,name,bias)', 'homeCountry(id,isoCode,callingCode)', 'language(localeCode)', 'formattingLocale(localeCode)', 'timeFormat'].join(','), ")")].join(',');
var DEFAULT_COUNTRY = {
  id: '1',
  isoCode: 'US',
  callingCode: '1'
};
var extensionRegExp = /.*\/extension\/\d+$/;

function extractData(info) {
  var serviceFeatures = {};
  info.serviceFeatures.forEach(function (f) {
    serviceFeatures[f.featureName] = {
      enabled: f.enabled
    };

    if (!f.enabled) {
      serviceFeatures[f.featureName].reason = f.reason;
    }
  });
  var output = (0, _jsonMask.default)(info, DEFAULT_MASK);
  output.serviceFeatures = serviceFeatures;
  return output;
}

var DEFAULT_TTL = 30 * 60 * 1000; // half hour update

var DEFAULT_TIME_TO_RETRY = 62 * 1000;
/**
 * @class
 * @description Extension info module
 */

var ExtensionInfo = (_dec = (0, _di.Module)({
  deps: ['Client', {
    dep: 'Alert',
    optional: true
  }, {
    dep: 'ExtensionInfoOptions',
    optional: true
  }]
}), _dec(_class =
/*#__PURE__*/
function (_DataFetcher) {
  _inherits(ExtensionInfo, _DataFetcher);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  function ExtensionInfo(_ref) {
    var _this;

    var client = _ref.client,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === void 0 ? DEFAULT_TTL : _ref$ttl,
        _ref$timeToRetry = _ref.timeToRetry,
        timeToRetry = _ref$timeToRetry === void 0 ? DEFAULT_TIME_TO_RETRY : _ref$timeToRetry,
        _ref$polling = _ref.polling,
        polling = _ref$polling === void 0 ? true : _ref$polling,
        alert = _ref.alert,
        options = _objectWithoutProperties(_ref, ["client", "ttl", "timeToRetry", "polling", "alert"]);

    _classCallCheck(this, ExtensionInfo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ExtensionInfo).call(this, _objectSpread({
      client: client,
      ttl: ttl,
      polling: polling,
      timeToRetry: timeToRetry,
      subscriptionFilters: [_subscriptionFilters.default.extensionInfo],
      subscriptionHandler: function () {
        var _subscriptionHandler = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(message) {
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
        var _fetchFunction = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2() {
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
        var _forbiddenHandler = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3() {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return _this._auth.logout();

                case 2:
                  if (_this._alert) {
                    _this._alert.danger({
                      message: _permissionsMessages.default.insufficientPrivilege,
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
    }, options)));
    _this._alert = alert;

    _this.addSelector('info', function () {
      return _this.data;
    }, function (data) {
      return data || {};
    });

    _this.addSelector('serviceFeatures', _this._selectors.info, function (info) {
      return info.serviceFeatures || {};
    });

    return _this;
  }

  _createClass(ExtensionInfo, [{
    key: "_subscriptionHandleFn",
    value: function () {
      var _subscriptionHandleFn2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(message) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(message && message.body && extensionRegExp.test(message.event))) {
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
    key: "info",
    get: function get() {
      return this._selectors.info();
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
    key: "serviceFeatures",
    get: function get() {
      return this._selectors.serviceFeatures();
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
}(_DataFetcher2.default)) || _class);
exports.default = ExtensionInfo;
//# sourceMappingURL=index.js.map
