"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RcViewModule = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _loggerV = require("@ringcentral-integration/core/lib/logger/loggerV2");
var _reactantShare = require("reactant-share");
var _rxjs = require("rxjs");
var _constant = require("../constant");
var _RcModule = require("./RcModule");
var _rxjs2 = require("./rxjs");
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } /* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
var RcViewModule = exports.RcViewModule = /*#__PURE__*/function (_ViewModule) {
  function RcViewModule() {
    var _this;
    _classCallCheck(this, RcViewModule);
    _this = _callSuper(this, RcViewModule);
    _this.logger = _loggerV.loggerV2.create(_this);
    _this.status$ = (0, _rxjs2.fromWatchValue)(_this, function () {
      return _this.status;
    });
    /**
     * emit when module is ready
     *
     * 1. Only emit once when module is ready, if you want handle different status, you can use `status$`
     *      normally should work with retry(this.resetting$) to re-start the flow when user logout
     *
     * 2. if you want to handle base on ready state, you can use `readyState$`
     */
    _this.ready$ = _this.status$.pipe((0, _rxjs.filter)(function () {
      return _this.ready;
    }));
    _this.readyState$ = _this.status$.pipe((0, _rxjs.map)(function () {
      return _this.ready;
    }));
    _this.resetting$ = _this.status$.pipe((0, _rxjs.filter)(function () {
      return _this.resetting;
    }));
    _this.status = void 0;
    _this[_constant.ignoreReadyModulesKey] = new Set();
    _this.status = _constant.ModuleStatus.Pending;
    _this[_constant.initModuleKey]();
    return _this;
  }
  _inherits(RcViewModule, _ViewModule);
  return _createClass(RcViewModule);
}(_reactantShare.ViewModule); // RcViewModule is multi-inherited , it needs to inherit implicitly from RcModule.
Object.defineProperties(RcViewModule.prototype, Object.getOwnPropertyDescriptors(_RcModule.RcModule.prototype));
//# sourceMappingURL=RcViewModule.js.map
