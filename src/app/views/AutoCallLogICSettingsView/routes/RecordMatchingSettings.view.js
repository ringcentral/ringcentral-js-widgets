"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecordMatchingSettingsView = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _components = require("@ringcentral-integration/micro-core/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _nextCore = require("@ringcentral-integration/next-core");
var _components2 = require("@ringcentral-integration/next-widgets/components");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("../i18n"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var RecordMatchingSettingsView = exports.RecordMatchingSettingsView = (_dec = (0, _nextCore.injectable)({
  name: 'RecordMatchingSettingsView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('AalOptions')(target, undefined, 1);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof AALOptions === "undefined" ? Object : AALOptions]), _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function RecordMatchingSettingsView(_router, _aalOptions) {
    var _this;
    _classCallCheck(this, RecordMatchingSettingsView);
    _this = _callSuper(this, RecordMatchingSettingsView);
    _this._router = _router;
    _this._aalOptions = _aalOptions;
    return _this;
  }
  _inherits(RecordMatchingSettingsView, _RcViewModule);
  return _createClass(RecordMatchingSettingsView, [{
    key: "MainContent",
    value: function MainContent() {
      var _this2 = this;
      var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
        t = _useLocale.t;
      var _useConnector = (0, _nextCore.useConnector)(function () {
          var _this2$_aalOptions;
          var configuration = (_this2$_aalOptions = _this2._aalOptions) === null || _this2$_aalOptions === void 0 ? void 0 : _this2$_aalOptions.autoCallLoggingPreference;
          return {
            multiMatchStrategy: configuration === null || configuration === void 0 ? void 0 : configuration.logCallsMultipleMatches,
            logCallsUnknownNumber: configuration === null || configuration === void 0 ? void 0 : configuration.logCallsUnknownNumber
          };
        }),
        multiMatchStrategy = _useConnector.multiMatchStrategy,
        logCallsUnknownNumber = _useConnector.logCallsUnknownNumber;
      return null;
    }
  }, {
    key: "component",
    value: function component() {
      var _this3 = this;
      var _useLocale2 = (0, _hooks.useLocale)(_i18n["default"]),
        t = _useLocale2.t;
      var title = t('recordMatching');
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_components.AppHeaderNav, {
        override: true
      }, /*#__PURE__*/_react["default"].createElement(_components2.PageHeader, {
        onBackClick: function onBackClick() {
          return _this3._router.push('/settings/autoCallLogSettings');
        }
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "sui-text sui-text-root truncate",
        title: title,
        "data-sign": "record-matching-ic-settings-title"
      }, title))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "px-4 flex flex-col gap-6 mb-6",
        "data-sign": "record-matching-ic-settings"
      }, /*#__PURE__*/_react["default"].createElement(this.MainContent, null)), /*#__PURE__*/_react["default"].createElement(_components.AppFooterNav, null));
    }
  }]);
}(_nextCore.RcViewModule), _applyDecoratedDescriptor(_class2.prototype, "MainContent", [_nextCore.autobind, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "MainContent"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=RecordMatchingSettings.view.js.map
