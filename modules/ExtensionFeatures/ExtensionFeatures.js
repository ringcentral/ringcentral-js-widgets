"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.includes");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.string.includes");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtensionFeatures = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _ramda = require("ramda");
var _permissionsMessages = require("../../enums/permissionsMessages");
var _subscriptionFilters = require("../../enums/subscriptionFilters");
var _subscriptionHints = require("../../enums/subscriptionHints");
var _di = require("../../lib/di");
var _Auth = require("../Auth");
var _DataFetcherV = require("../DataFetcherV2");
var _dec, _dec2, _class, _class2;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var ExtensionFeatures = (_dec = (0, _di.Module)({
  name: 'ExtensionFeatures',
  deps: ['Auth', 'Alert', 'Client', 'DataFetcherV2', {
    dep: 'Subscription',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'ExtensionFeaturesOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var data = _ref.data;
  return [data];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DataFetcherV2Consume) {
  _inherits(ExtensionFeatures, _DataFetcherV2Consume);
  var _super = _createSuper(ExtensionFeatures);
  function ExtensionFeatures(deps) {
    var _deps$extensionFeatur, _deps$extensionFeatur2;
    var _this;
    _classCallCheck(this, ExtensionFeatures);
    _this = _super.call(this, {
      deps: deps
    });
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Unsubscribe... Remove this comment to see the full error message
    _this._stopWatchingSubscription = null;
    _this._handleSubscription = function (message) {
      var _this$_deps$tabManage, _this$_deps$tabManage2, _message$body;
      if (_this.ready && (_this._source.disableCache || ((_this$_deps$tabManage = (_this$_deps$tabManage2 = _this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.active) !== null && _this$_deps$tabManage !== void 0 ? _this$_deps$tabManage : true)) && (message === null || message === void 0 ? void 0 : (_message$body = message.body) === null || _message$body === void 0 ? void 0 : _message$body.hints) && (message.body.hints.includes(_subscriptionHints.subscriptionHints.limits) || message.body.hints.includes(_subscriptionHints.subscriptionHints.features) || message.body.hints.includes(_subscriptionHints.subscriptionHints.permissions))) {
        _this.fetchData();
      }
    };
    _this._source = new _DataFetcherV.DataSource(_objectSpread(_objectSpread({
      polling: (_deps$extensionFeatur = (_deps$extensionFeatur2 = deps.extensionFeaturesOptions) === null || _deps$extensionFeatur2 === void 0 ? void 0 : _deps$extensionFeatur2.polling) !== null && _deps$extensionFeatur !== void 0 ? _deps$extensionFeatur : true
    }, deps.extensionFeaturesOptions), {}, {
      key: 'extensionFeatures',
      cleanOnReset: true,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var response, _response;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _this._deps.client.service.platform().get('/restapi/v1.0/account/~/extension/~/features');
                case 3:
                  response = _context.sent;
                  return _context.abrupt("return", response.json());
                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](0);
                  if (!(((_response = _context.t0.response) === null || _response === void 0 ? void 0 : _response.status) === 403)) {
                    _context.next = 14;
                    break;
                  }
                  _context.next = 12;
                  return _this._deps.auth.logout();
                case 12:
                  _this._deps.alert.danger({
                    message: _permissionsMessages.permissionsMessages.insufficientPrivilege,
                    ttl: 0
                  });
                  return _context.abrupt("return", {});
                case 14:
                  throw _context.t0;
                case 15:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 7]]);
        }));
        function fetchFunction() {
          return _fetchFunction.apply(this, arguments);
        }
        return fetchFunction;
      }(),
      readyCheckFunction: function readyCheckFunction() {
        return true;
      }
    }));
    _this._deps.dataFetcherV2.register(_this._source);
    return _this;
  }
  _createClass(ExtensionFeatures, [{
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      (0, _core.watch)(this, function () {
        var _this2$features, _this2$features$ReadE;
        return [_this2.ready, !!_this2.data, !!((_this2$features = _this2.features) === null || _this2$features === void 0 ? void 0 : (_this2$features$ReadE = _this2$features.ReadExtensionInfo) === null || _this2$features$ReadE === void 0 ? void 0 : _this2$features$ReadE.available), _this2._deps.auth.loginStatus === _Auth.loginStatus.loggedIn];
      }, /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
          var _ref4, ready, hasData, readExtensionInfo, loggedIn;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _ref4 = _slicedToArray(_ref2, 4), ready = _ref4[0], hasData = _ref4[1], readExtensionInfo = _ref4[2], loggedIn = _ref4[3];
                  if (!(ready && loggedIn && !readExtensionInfo)) {
                    _context2.next = 5;
                    break;
                  }
                  _context2.next = 4;
                  return _this2._deps.auth.logout();
                case 4:
                  if (hasData) {
                    // only show alert if featuresList was successfully fetched,
                    // but the user has no ReadExtensionInfo feature
                    _this2._deps.alert.danger({
                      message: _permissionsMessages.permissionsMessages.insufficientPrivilege,
                      ttl: 0
                    });
                  }
                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));
        return function (_x) {
          return _ref3.apply(this, arguments);
        };
      }(), {
        multiple: true
      });
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _this3 = this;
      if (this._deps.subscription) {
        this._deps.subscription.subscribe([_subscriptionFilters.subscriptionFilters.extensionInfo]);
        this._stopWatchingSubscription = (0, _core.watch)(this, function () {
          return _this3._deps.subscription.message;
        }, this._handleSubscription);
      }
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this$_stopWatchingSu;
      (_this$_stopWatchingSu = this._stopWatchingSubscription) === null || _this$_stopWatchingSu === void 0 ? void 0 : _this$_stopWatchingSu.call(this);
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Unsubscribe... Remove this comment to see the full error message
      this._stopWatchingSubscription = null;
    }
  }, {
    key: "features",
    get: function get() {
      var _this$data$records, _this$data;
      return (0, _ramda.reduce)(function (features, item) {
        if (item && item.id) features[item.id] = item;
        return features;
      }, {}, (_this$data$records = (_this$data = this.data) === null || _this$data === void 0 ? void 0 : _this$data.records) !== null && _this$data$records !== void 0 ? _this$data$records : []);
    }
  }]);
  return ExtensionFeatures;
}(_DataFetcherV.DataFetcherV2Consumer), (_applyDecoratedDescriptor(_class2.prototype, "features", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "features"), _class2.prototype)), _class2)) || _class);
exports.ExtensionFeatures = ExtensionFeatures;
//# sourceMappingURL=ExtensionFeatures.js.map
