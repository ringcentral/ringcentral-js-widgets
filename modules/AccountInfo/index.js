"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("regenerator-runtime/runtime");

var _jsonMask = _interopRequireDefault(require("json-mask"));

var _di = require("../../lib/di");

var _DataFetcher2 = _interopRequireDefault(require("../../lib/DataFetcher"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _loginStatus = _interopRequireDefault(require("../Auth/loginStatus"));

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

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var DEFAULT_MASK = ['id,mainNumber,status', 'operator(id,extensionNumber)', 'serviceInfo(brand(id,homeCountry(isoCode)))', "regionalSettings(".concat(['timezone(id,name,bias)', 'homeCountry(id)', 'language(localeCode)', 'formattingLocale(localeCode)', 'timeFormat'].join(','), ")")].join(',');
/**
 * @class
 * @description Accound info managing module.
 */

var AccountInfo = (_dec = (0, _di.Module)({
  deps: ['Client', 'RolesAndPermissions', 'Alert', {
    dep: 'AccountInfoOptions',
    optional: true
  }]
}), _dec(_class =
/*#__PURE__*/
function (_DataFetcher) {
  _inherits(AccountInfo, _DataFetcher);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  function AccountInfo(_ref) {
    var _context2;

    var _this;

    var client = _ref.client,
        rolesAndPermissions = _ref.rolesAndPermissions,
        alert = _ref.alert,
        options = _objectWithoutProperties(_ref, ["client", "rolesAndPermissions", "alert"]);

    _classCallCheck(this, AccountInfo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AccountInfo).call(this, _objectSpread({
      name: 'accountInfo',
      client: client,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.t0 = _jsonMask.default;
                  _context.next = 3;
                  return client.account().get();

                case 3:
                  _context.t1 = _context.sent;
                  _context.t2 = DEFAULT_MASK;
                  return _context.abrupt("return", (0, _context.t0)(_context.t1, _context.t2));

                case 6:
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
        return _this._rolesAndPermissions.ready;
      }
    }, options)));
    _this._rolesAndPermissions = (_context2 = _assertThisInitialized(_assertThisInitialized(_this)), _ensureExist.default).call(_context2, rolesAndPermissions, 'rolesAndPermissions');
    _this._alert = alert;

    _this.addSelector('info', function () {
      return _this.data;
    }, function (data) {
      return data || {};
    });

    return _this;
  }

  _createClass(AccountInfo, [{
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _get(_getPrototypeOf(AccountInfo.prototype), "_onStateChange", this).call(this);

              case 2:
                if (!(this._auth.loginStatus === _loginStatus.default.loggedIn && this.ready && !this._hasPermission)) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 5;
                return this._auth.logout();

              case 5:
                if (this._alert) {
                  this._alert.danger({
                    message: _permissionsMessages.default.insufficientPrivilege,
                    ttl: 0
                  });
                }

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function _onStateChange() {
        return _onStateChange2.apply(this, arguments);
      }

      return _onStateChange;
    }()
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
    key: "country",
    get: function get() {
      return this.info.serviceInfo && this.info.serviceInfo.brand.homeCountry;
    }
  }, {
    key: "countryCode",
    get: function get() {
      return this.country && this.country.isoCode || 'US';
    }
  }, {
    key: "mainCompanyNumber",
    get: function get() {
      return this.info.mainNumber;
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return !!this._rolesAndPermissions.permissions.ReadCompanyInfo;
    }
  }]);

  return AccountInfo;
}(_DataFetcher2.default)) || _class);
exports.default = AccountInfo;
//# sourceMappingURL=index.js.map
