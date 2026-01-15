"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertUI = void 0;
require("core-js/modules/es.function.name.js");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _AlertRenderer = require("../../components/AlertRenderer");
var _dec, _class;
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
var AlertUI = exports.AlertUI = (_dec = (0, _di.Module)({
  name: 'AlertUI',
  deps: ['Brand', 'Alert', 'Locale', 'RouterInteraction', {
    dep: 'RateLimiter',
    optional: true
  }, {
    dep: 'Softphone',
    optional: true
  }, {
    dep: 'CallLogSection',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  function AlertUI(deps) {
    _classCallCheck(this, AlertUI);
    return _callSuper(this, AlertUI, [{
      deps: deps
    }]);
  }
  _inherits(AlertUI, _RcUIModuleV);
  return _createClass(AlertUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var className = _ref.className,
        classes = _ref.classes,
        size = _ref.size,
        messageAlign = _ref.messageAlign,
        fullWidth = _ref.fullWidth;
      return {
        className: className,
        classes: classes,
        size: size,
        messageAlign: messageAlign,
        fullWidth: fullWidth,
        currentLocale: this._deps.locale.currentLocale,
        messages: this._deps.alert.messages,
        brand: this._deps.brand.name
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this = this;
      var getAdditionalRenderer = _ref2.getAdditionalRenderer,
        regionSettingsUrl = _ref2.regionSettingsUrl,
        callingSettingsUrl = _ref2.callingSettingsUrl;
      return {
        getRenderer: function getRenderer(message) {
          if (getAdditionalRenderer) {
            var renderer = getAdditionalRenderer()(message);
            if (renderer) {
              return renderer;
            }
          }
          // TODO: It would be better to refactor alertUI like modalUI.registerRenderer.
          return (0, _AlertRenderer.AlertRenderer)({
            alert: _this._deps.alert,
            brand: _this._deps.brand,
            // support jupiterAppName with dynamicConfig, should remove this and use brandConfig
            // instead once dynamicConfig module is deprecated
            softphone: _this._deps.softphone,
            rateLimiter: _this._deps.rateLimiter,
            routerInteraction: _this._deps.routerInteraction,
            callLogSection: _this._deps.callLogSection,
            regionSettingsUrl: regionSettingsUrl,
            callingSettingsUrl: callingSettingsUrl
          })(message);
        },
        dismiss: function dismiss(id) {
          return _this._deps.alert.dismiss(id);
        }
      };
    }
  }]);
}(_core.RcUIModuleV2)) || _class);
//# sourceMappingURL=AlertUI.js.map
