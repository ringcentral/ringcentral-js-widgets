"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.includes");
require("core-js/modules/es.string.includes");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoConfiguration = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _ramda = require("ramda");
var _subscriptionFilters = require("../../enums/subscriptionFilters");
var _subscriptionHints = require("../../enums/subscriptionHints");
var _debounceThrottle = require("../../lib/debounce-throttle");
var _di = require("../../lib/di");
var _DataFetcherV = require("../DataFetcherV2");
var _videoProviders = require("./videoProviders");
var _dec, _class;
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var DEFAULT_FETCH_DELAY = 5 * 1000;
var VideoConfiguration = (_dec = (0, _di.Module)({
  name: 'VideoConfiguration',
  deps: ['Client', 'DataFetcherV2', 'AppFeatures', 'Subscription', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'VideoConfigurationOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_DataFetcherV2Consume) {
  _inherits(VideoConfiguration, _DataFetcherV2Consume);
  var _super = _createSuper(VideoConfiguration);
  function VideoConfiguration(deps) {
    var _this;
    _classCallCheck(this, VideoConfiguration);
    _this = _super.call(this, {
      deps: deps
    });
    _this._stopWatching = null;
    _this._debouncedFetchData = void 0;
    _this._source = new _DataFetcherV.DataSource(_objectSpread(_objectSpread({}, deps.videoConfigurationOptions), {}, {
      key: 'videoConfiguration',
      cleanOnReset: true,
      disableCache: true,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var response;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _this._deps.client.service.platform().get('/restapi/v1.0/account/~/extension/~/video-configuration');
                case 2:
                  response = _context.sent;
                  return _context.abrupt("return", response.json());
                case 4:
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
        return _this._deps.appFeatures.ready && _this._deps.subscription.ready;
      },
      permissionCheckFunction: function permissionCheckFunction() {
        return _this._hasPermission;
      }
    }));
    _this._deps.dataFetcherV2.register(_this._source);
    _this._debouncedFetchData = (0, _debounceThrottle.debounce)({
      fn: _this.fetchData,
      threshold: _this._fetchDelay
    });
    return _this;
  }
  _createClass(VideoConfiguration, [{
    key: "_handleSubscription",
    value: function () {
      var _handleSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(message) {
        var _message$body, _message$body$hints, _this$_deps$tabManage, _this$_deps$tabManage2;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.ready && (message === null || message === void 0 ? void 0 : (_message$body = message.body) === null || _message$body === void 0 ? void 0 : (_message$body$hints = _message$body.hints) === null || _message$body$hints === void 0 ? void 0 : _message$body$hints.includes(_subscriptionHints.subscriptionHints.videoConfiguration)) && (this._source.disableCache || ((_this$_deps$tabManage = (_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.active) !== null && _this$_deps$tabManage !== void 0 ? _this$_deps$tabManage : true))) {
                  // https://jira_domain/browse/ENV-67087
                  // the video configuration api may return the old value
                  // when we try to query immediately right after got the push notification
                  // here we wait for seconds as a workaround to solve the issue
                  this._debouncedFetchData();
                }
              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function _handleSubscription(_x) {
        return _handleSubscription2.apply(this, arguments);
      }
      return _handleSubscription;
    }()
  }, {
    key: "onInit",
    value: function onInit() {
      var _this2 = this;
      this._deps.subscription.subscribe([_subscriptionFilters.subscriptionFilters.extensionInfo]);
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
      var _this$_deps$videoConf, _this$_deps$videoConf2;
      return Math.max(0, (_this$_deps$videoConf = (_this$_deps$videoConf2 = this._deps.videoConfigurationOptions) === null || _this$_deps$videoConf2 === void 0 ? void 0 : _this$_deps$videoConf2.fetchDelay) !== null && _this$_deps$videoConf !== void 0 ? _this$_deps$videoConf : DEFAULT_FETCH_DELAY);
    }
  }, {
    key: "isRCV",
    get: function get() {
      return this.provider === _videoProviders.videoProviders.RCVideo;
    }
  }, {
    key: "isRCM",
    get: function get() {
      return (0, _ramda.includes)(this.provider, [_videoProviders.videoProviders.RCMeetings, _videoProviders.videoProviders.None]);
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
      // TODO: fix UserVideoConfiguration type in @rc-ex/core/definitions
      // @ts-expect-error TS(2322): Type '"Free" | "Paid" | null' is not assignable to... Remove this comment to see the full error message
      return ((_this$data2 = this.data) === null || _this$data2 === void 0 ? void 0 : _this$data2.userLicenseType) || null;
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return this._deps.appFeatures.hasMeetingsPermission;
    }
  }]);
  return VideoConfiguration;
}(_DataFetcherV.DataFetcherV2Consumer)) || _class);
exports.VideoConfiguration = VideoConfiguration;
//# sourceMappingURL=VideoConfiguration.js.map
