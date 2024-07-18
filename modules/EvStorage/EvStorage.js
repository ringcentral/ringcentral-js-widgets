"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvStorage = void 0;
var _di = require("@ringcentral-integration/commons/lib/di");
var _Auth = require("@ringcentral-integration/commons/modules/Auth");
var _Storage2 = require("@ringcentral-integration/commons/modules/Storage");
var _loginStatus = require("../../enums/loginStatus");
var _dec, _class;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));) { ; } return t; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var EvStorage = (_dec = (0, _di.Module)({
  name: 'Storage',
  deps: ['Auth', 'EvAuth', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'StorageOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_Storage) {
  _inherits(EvStorage, _Storage);
  var _super = _createSuper(EvStorage);
  function EvStorage(deps) {
    var _this$_deps$storageOp, _this$_deps$storageOp2;
    var _this;
    _classCallCheck(this, EvStorage);
    _this = _super.call(this, deps);
    _this._disableInactiveTabsWrite = (_this$_deps$storageOp = (_this$_deps$storageOp2 = _this._deps.storageOptions) === null || _this$_deps$storageOp2 === void 0 ? void 0 : _this$_deps$storageOp2.disableInactiveTabsWrite) !== null && _this$_deps$storageOp !== void 0 ? _this$_deps$storageOp : true;
    return _this;
  }
  _createClass(EvStorage, [{
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._deps.auth.loginStatus === _Auth.loginStatus.loggedIn && (!this._deps.tabManager || this._deps.tabManager.ready) && this._deps.evAuth.loginStatus === _loginStatus.loginStatus.LOGIN_SUCCESS && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return _get(_getPrototypeOf(EvStorage.prototype), "_shouldReset", this).call(this) || this.ready && this._deps.evAuth.loginStatus === _loginStatus.loginStatus.NOT_AUTH;
    }
  }, {
    key: "storageKey",
    get: function get() {
      var agentId = this._deps.evAuth.agentId;
      return "".concat(this.prefix ? "".concat(this.prefix, "-") : '', "storage-").concat(this._deps.auth.ownerId).concat(agentId ? "-".concat(agentId) : '');
    }
  }]);
  return EvStorage;
}(_Storage2.Storage)) || _class);
exports.EvStorage = EvStorage;
//# sourceMappingURL=EvStorage.js.map
