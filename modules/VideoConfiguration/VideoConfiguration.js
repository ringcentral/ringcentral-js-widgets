"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoConfiguration = void 0;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DEFAULT_FETCH_DELAY = 5 * 1000;
var VideoConfiguration = (_dec = (0, _di.Module)({
  name: 'VideoConfiguration',
  deps: ['Client', 'DataFetcherV2', 'ExtensionFeatures', 'Subscription', {
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
        return _this._deps.extensionFeatures.ready && _this._deps.subscription.ready;
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
                  // https://jira.ringcentral.com/browse/ENV-67087
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
      return (0, _ramda.contains)(this.provider, [_videoProviders.videoProviders.RCMeetings, _videoProviders.videoProviders.None]);
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
      // @ts-ignore
      return ((_this$data2 = this.data) === null || _this$data2 === void 0 ? void 0 : _this$data2.userLicenseType) || null;
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      var _this$_deps$extension, _this$_deps$extension2, _this$_deps$extension3;

      return (_this$_deps$extension = (_this$_deps$extension2 = this._deps.extensionFeatures.features) === null || _this$_deps$extension2 === void 0 ? void 0 : (_this$_deps$extension3 = _this$_deps$extension2.Meetings) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.available) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : false;
    }
  }]);

  return VideoConfiguration;
}(_DataFetcherV.DataFetcherV2Consumer)) || _class);
exports.VideoConfiguration = VideoConfiguration;
//# sourceMappingURL=VideoConfiguration.js.map
