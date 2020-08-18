"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

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

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.find");

require("regenerator-runtime/runtime");

var _di = require("../../lib/di");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _getTimezoneReducer = _interopRequireDefault(require("./getTimezoneReducer"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var Timezone = (
/**
 * @class
 * @description timezone module
 */
_dec = (0, _di.Module)({
  deps: ['Auth', 'Client', 'Storage']
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModule) {
  _inherits(Timezone, _RcModule);

  var _super = _createSuper(Timezone);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  function Timezone(_ref) {
    var _this;

    var auth = _ref.auth,
        client = _ref.client,
        storage = _ref.storage,
        options = _objectWithoutProperties(_ref, ["auth", "client", "storage"]);

    _classCallCheck(this, Timezone);

    _this = _super.call(this, _objectSpread({
      actionTypes: _actionTypes["default"]
    }, options));
    _this.CACHE_TTL = 60 * 60e3;
    _this._auth = void 0;
    _this._client = void 0;
    _this._storage = void 0;
    _this._storageKey = void 0;
    _this._localeTimezone = void 0;
    _this._reducer = void 0;
    _this._auth = auth;
    _this._client = client;
    _this._storage = storage;
    _this._reducer = (0, _getTimezoneReducer["default"])(_this.actionTypes);
    _this._storageKey = 'timezone';

    _this._storage.registerReducer({
      key: _this._storageKey,
      reducer: _this._reducer
    });

    return _this;
  }

  _createClass(Timezone, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.pending && this._auth.ready && this._storage.ready // && this.shouldUpdateTimezones
                )) {
                  _context.next = 6;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.init
                });
                _context.next = 4;
                return this._initTimezones();

              case 4:
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });
                this.updateCacheExpiredAt();

              case 6:
                if (this.ready && !this._auth.ready && !this._storage.ready) {
                  this.store.dispatch({
                    type: this.actionTypes.resetSuccess
                  });
                }

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _onStateChange2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: "_initTimezones",
    value: function () {
      var _initTimezones2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var data, _ref2, _ref2$records, records;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._client.dictionary().timezone().get();

              case 2:
                data = _context2.sent;
                _ref2 = data, _ref2$records = _ref2.records, records = _ref2$records === void 0 ? [] : _ref2$records;
                this.updateTimezones(records);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _initTimezones() {
        return _initTimezones2.apply(this, arguments);
      }

      return _initTimezones;
    }()
  }, {
    key: "updateTimezones",
    value: function updateTimezones(timezones) {
      this.store.dispatch({
        type: this.actionTypes.updateTimezones,
        timezones: timezones
      });
    }
  }, {
    key: "updateCacheExpiredAt",
    value: function updateCacheExpiredAt() {
      var cacheExpiredAt = +new Date() + this.CACHE_TTL;
      this.store.dispatch({
        type: this.actionTypes.updateCacheExpiredAt,
        cacheExpiredAt: cacheExpiredAt
      });
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "storage",
    get: function get() {
      if (!this._storage.ready) {
        return {};
      }

      return this._storage.getItem(this._storageKey) || {};
    }
  }, {
    key: "ready",
    get: function get() {
      return this.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "pending",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].pending;
    }
  }, {
    key: "timezones",
    get: function get() {
      var _this$storage$timezon = this.storage.timezones,
          timezones = _this$storage$timezon === void 0 ? [] : _this$storage$timezon;
      return timezones;
    }
  }, {
    key: "cacheExpiredAt",
    get: function get() {
      var _this$storage$cacheEx = this.storage.cacheExpiredAt,
          cacheExpiredAt = _this$storage$cacheEx === void 0 ? null : _this$storage$cacheEx;
      return cacheExpiredAt;
    }
  }, {
    key: "localeTimezone",
    get: function get() {
      if (!this._localeTimezone) {
        var bias = String(-new Date().getTimezoneOffset());
        this._localeTimezone = this.timezones.find(function (timezone) {
          return timezone.bias === bias;
        });
      }

      return this._localeTimezone;
    }
  }, {
    key: "shouldUpdateTimezones",
    get: function get() {
      return !this.cacheExpiredAt || this.cacheExpiredAt < +new Date();
    }
  }]);

  return Timezone;
}(_RcModule2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "_initTimezones", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_initTimezones"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateTimezones", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateTimezones"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateCacheExpiredAt", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateCacheExpiredAt"), _class2.prototype)), _class2)) || _class);
exports["default"] = Timezone;
//# sourceMappingURL=index.js.map
