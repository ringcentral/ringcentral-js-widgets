"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("regenerator-runtime/runtime");

var _di = require("../../lib/di");

var _DataFetcher2 = _interopRequireDefault(require("../../lib/DataFetcher"));

var _sleep = _interopRequireDefault(require("../../lib/sleep"));

var _fetchList = _interopRequireDefault(require("../../lib/fetchList"));

var _subscriptionFilters = _interopRequireDefault(require("../../enums/subscriptionFilters"));

var _getActiveCallsReducer = require("./getActiveCallsReducer");

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var presenceRegExp = /\/presence\?detailedTelephonyState=true/;
var FETCH_DELAY = 1000;
var DEFAULT_TTL = 5 * 60 * 1000;
/**
 * @class
 * @description Active calls list manaing module
 */

var ActiveCalls = (_dec = (0, _di.Module)({
  deps: ['Client', 'RolesAndPermissions', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'ActiveCallsOptions',
    optional: true
  }]
}), _dec(_class =
/*#__PURE__*/
function (_DataFetcher) {
  _inherits(ActiveCalls, _DataFetcher);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Number} params.ttl - local cache timestamp, default 5 mins.
   */
  function ActiveCalls(_ref) {
    var _this;

    var client = _ref.client,
        rolesAndPermissions = _ref.rolesAndPermissions,
        tabManager = _ref.tabManager,
        _ref$fetchDelay = _ref.fetchDelay,
        fetchDelay = _ref$fetchDelay === void 0 ? FETCH_DELAY : _ref$fetchDelay,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === void 0 ? DEFAULT_TTL : _ref$ttl,
        options = _objectWithoutProperties(_ref, ["client", "rolesAndPermissions", "tabManager", "fetchDelay", "ttl"]);

    _classCallCheck(this, ActiveCalls);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ActiveCalls).call(this, _objectSpread({}, options, {
      client: client,
      ttl: ttl,
      getDataReducer: _getActiveCallsReducer.getDataReducer,
      subscriptionFilters: [_subscriptionFilters["default"].detailedPresence],
      subscriptionHandler: function () {
        var _subscriptionHandler = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(message) {
          var ownerId;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!presenceRegExp.test(message.event)) {
                    _context.next = 7;
                    break;
                  }

                  ownerId = _this._auth.ownerId;
                  _context.next = 4;
                  return (0, _sleep["default"])(_this._fetchDelay);

                case 4:
                  if (!(ownerId === _this._auth.ownerId)) {
                    _context.next = 7;
                    break;
                  }

                  _context.next = 7;
                  return _this.fetchData();

                case 7:
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
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt("return", (0, _fetchList["default"])(function (params) {
                    return _this._client.account().extension().activeCalls().list(params);
                  }));

                case 1:
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
      }()
    })));
    _this._fetchDelay = fetchDelay;
    _this._rolesAndPermissions = rolesAndPermissions;

    _this.addSelector('calls', function () {
      return _this.data;
    }, function (data) {
      return data || [];
    });

    return _this;
  }

  _createClass(ActiveCalls, [{
    key: "_shouldInit",
    value: function _shouldInit() {
      return _get(_getPrototypeOf(ActiveCalls.prototype), "_shouldInit", this).call(this) && this._rolesAndPermissions.ready;
    }
  }, {
    key: "_name",
    get: function get() {
      return 'activeCalls';
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return this._rolesAndPermissions.permissions.ReadCallLog;
    }
  }, {
    key: "calls",
    get: function get() {
      return this._selectors.calls();
    }
  }]);

  return ActiveCalls;
}(_DataFetcher2["default"])) || _class);
exports["default"] = ActiveCalls;
//# sourceMappingURL=index.js.map
