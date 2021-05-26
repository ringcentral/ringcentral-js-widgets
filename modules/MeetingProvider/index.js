"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("regenerator-runtime/runtime");

var _ramda = require("ramda");

var _subscriptionFilters = _interopRequireDefault(require("../../enums/subscriptionFilters"));

var _subscriptionHints = _interopRequireDefault(require("../../enums/subscriptionHints"));

var _DataFetcher2 = _interopRequireDefault(require("../../lib/DataFetcher"));

var _di = require("../../lib/di");

var _sleep = _interopRequireDefault(require("../../lib/sleep"));

var _interface = require("./interface");

var _service = require("./service");

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MeetingProvider = (
/**
 * @class
 * @description: just check meeting provider from RC PLA
 */
_dec = (0, _di.Module)({
  deps: ['RolesAndPermissions']
}), _dec(_class = /*#__PURE__*/function (_DataFetcher) {
  _inherits(MeetingProvider, _DataFetcher);

  var _super = _createSuper(MeetingProvider);

  function MeetingProvider(_ref) {
    var _this;

    var rolesAndPermissions = _ref.rolesAndPermissions,
        options = _objectWithoutProperties(_ref, ["rolesAndPermissions"]);

    _classCallCheck(this, MeetingProvider);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
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
      readyCheckFn: function readyCheckFn() {
        return _this._rolesAndPermissions.ready;
      },
      fetchFunction: function fetchFunction() {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var data;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return (0, _service.getMeetingProvider)(_this2._client);

                case 2:
                  data = _context2.sent;
                  return _context2.abrupt("return", data);

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }))();
      },
      disableCache: true,
      cleanOnReset: true
    }));
    _this._rolesAndPermissions = rolesAndPermissions;
    return _this;
  }

  _createClass(MeetingProvider, [{
    key: "_subscriptionHandleFn",
    value: function () {
      var _subscriptionHandleFn2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(message) {
        var _message$body, _message$body$hints;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(message === null || message === void 0 ? void 0 : (_message$body = message.body) === null || _message$body === void 0 ? void 0 : (_message$body$hints = _message$body.hints) === null || _message$body$hints === void 0 ? void 0 : _message$body$hints.includes(_subscriptionHints["default"].videoConfiguration))) {
                  _context3.next = 5;
                  break;
                }

                _context3.next = 3;
                return (0, _sleep["default"])(5000);

              case 3:
                _context3.next = 5;
                return this.fetchData();

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _subscriptionHandleFn(_x2) {
        return _subscriptionHandleFn2.apply(this, arguments);
      }

      return _subscriptionHandleFn;
    }()
  }, {
    key: "isRCV",
    get: function get() {
      return this.provider === _interface.meetingProviderTypes.video;
    }
  }, {
    key: "isRCM",
    get: function get() {
      return (0, _ramda.contains)(this.provider, [_interface.meetingProviderTypes.meeting, _interface.meetingProviderTypes.none]);
    }
  }, {
    key: "provider",
    get: function get() {
      var _this$data;

      return ((_this$data = this.data) === null || _this$data === void 0 ? void 0 : _this$data.provider) || null;
    }
  }, {
    key: "userLicenseType",
    get: function get() {
      var _this$data2;

      return ((_this$data2 = this.data) === null || _this$data2 === void 0 ? void 0 : _this$data2.userLicenseType) || null;
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return !!this._rolesAndPermissions.hasMeetingsPermission;
    }
  }, {
    key: "_name",
    get: function get() {
      return 'meetingProvider';
    }
  }]);

  return MeetingProvider;
}(_DataFetcher2["default"])) || _class);
exports["default"] = MeetingProvider;
//# sourceMappingURL=index.js.map
