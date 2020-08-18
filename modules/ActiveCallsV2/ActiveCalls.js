"use strict";

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.sort");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveCalls = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

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

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _ramda = require("ramda");

var _subscriptionFilters = require("../../enums/subscriptionFilters");

var _callLogHelpers = require("../../lib/callLogHelpers");

var _debounceThrottle = require("../../lib/debounce-throttle");

var _di = require("../../lib/di");

var _fetchList = _interopRequireDefault(require("../../lib/fetchList"));

var _DataFetcherV = require("../DataFetcherV2");

var _dec, _dec2, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var presenceRegExp = /\/presence\?detailedTelephonyState=true/;
var DEFAULT_FETCH_DELAY = 1000;
var DEFAULT_TTL = 5 * 60 * 1000;
var ActiveCalls = (_dec = (0, _di.Module)({
  name: 'ActiveCalls',
  deps: ['Client', 'RolesAndPermissions', 'DataFetcherV2', 'Subscription', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'ActiveCallsOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var data = _ref.data;
  return [data];
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_DataFetcherV2Consume) {
  _inherits(ActiveCalls, _DataFetcherV2Consume);

  var _super = _createSuper(ActiveCalls);

  function ActiveCalls(deps) {
    var _deps$activeCallsOpti;

    var _this;

    _classCallCheck(this, ActiveCalls);

    _this = _super.call(this, {
      deps: deps
    });
    _this._stopWatching = null;
    _this._debouncedFetchData = void 0;
    var activeCallsOptions = (_deps$activeCallsOpti = deps.activeCallsOptions) !== null && _deps$activeCallsOpti !== void 0 ? _deps$activeCallsOpti : {};
    var _activeCallsOptions$t = activeCallsOptions.ttl,
        ttl = _activeCallsOptions$t === void 0 ? DEFAULT_TTL : _activeCallsOptions$t;
    _this._source = new _DataFetcherV.DataSource(_objectSpread(_objectSpread({}, activeCallsOptions), {}, {
      key: 'activeCalls',
      cleanOnReset: true,
      ttl: ttl,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return", (0, _fetchList["default"])(function (params) {
                    return _this._deps.client.account().extension().activeCalls().list(params);
                  }));

                case 1:
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
      readyCheckFunction: function readyCheckFunction() {
        return !!(_this._deps.rolesAndPermissions.ready && _this._deps.subscription.ready);
      },
      permissionCheckFunction: function permissionCheckFunction() {
        return !!_this._deps.rolesAndPermissions.permissions.ReadCallLog;
      }
    }));

    _this._deps.dataFetcherV2.register(_this._source);

    _this._debouncedFetchData = (0, _debounceThrottle.debounce)({
      fn: _this.fetchData,
      threshold: _this._fetchDelay,
      // throttle the request rate to once every this._fetchDelay ms
      maxThreshold: _this._fetchDelay
    });
    return _this;
  }

  _createClass(ActiveCalls, [{
    key: "_handleSubscription",
    value: function _handleSubscription(message) {
      if (presenceRegExp.test(message === null || message === void 0 ? void 0 : message.event)) {
        var _this$_deps$tabManage, _this$_deps$tabManage2;

        if (this.ready && (this._source.disableCache || ((_this$_deps$tabManage = (_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.active) !== null && _this$_deps$tabManage !== void 0 ? _this$_deps$tabManage : true))) {
          this._debouncedFetchData();
        }
      }
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _this2 = this;

      this._deps.subscription.subscribe([_subscriptionFilters.subscriptionFilters.detailedPresence]);

      this._stopWatching = (0, _core.watch)(this, function () {
        return _this2._deps.subscription.message;
      }, function (message) {
        return _this2._handleSubscription(message);
      });
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this$_stopWatching;

      (_this$_stopWatching = this._stopWatching) === null || _this$_stopWatching === void 0 ? void 0 : _this$_stopWatching.call(this);
      this._stopWatching = null;

      this._debouncedFetchData.cancel();
    }
  }, {
    key: "_fetchDelay",
    get: function get() {
      var _this$_deps$activeCal, _this$_deps$activeCal2;

      return Math.max(0, (_this$_deps$activeCal = (_this$_deps$activeCal2 = this._deps.activeCallsOptions) === null || _this$_deps$activeCal2 === void 0 ? void 0 : _this$_deps$activeCal2.fetchDelay) !== null && _this$_deps$activeCal !== void 0 ? _this$_deps$activeCal : DEFAULT_FETCH_DELAY);
    }
  }, {
    key: "calls",
    get: function get() {
      var _this$data;

      return (0, _ramda.sort)(_callLogHelpers.sortByStartTime, (0, _ramda.map)(function (call) {
        return (0, _callLogHelpers.normalizeStartTime)(call);
      }, (_this$data = this.data) !== null && _this$data !== void 0 ? _this$data : []));
    }
  }]);

  return ActiveCalls;
}(_DataFetcherV.DataFetcherV2Consumer), _temp), (_applyDecoratedDescriptor(_class2.prototype, "calls", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "calls"), _class2.prototype)), _class2)) || _class);
exports.ActiveCalls = ActiveCalls;
//# sourceMappingURL=ActiveCalls.js.map
