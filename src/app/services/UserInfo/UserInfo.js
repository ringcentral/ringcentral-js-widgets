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
exports.UserInfo = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _AccountInfo = require("../AccountInfo");
var _Auth = require("../Auth");
var _ExtensionInfo = require("../ExtensionInfo");
var _NumberFormatter = require("../NumberFormatter");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2;
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
/**
 * service for group several services to get user info
 */
var UserInfo = exports.UserInfo = (_dec = (0, _nextCore.injectable)({
  name: 'UserInfo'
}), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _Auth.Auth === "undefined" ? Object : _Auth.Auth, typeof _NumberFormatter.NumberFormatter === "undefined" ? Object : _NumberFormatter.NumberFormatter, typeof _AccountInfo.AccountInfo === "undefined" ? Object : _AccountInfo.AccountInfo, typeof _ExtensionInfo.ExtensionInfo === "undefined" ? Object : _ExtensionInfo.ExtensionInfo]), _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", []), _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function UserInfo(_auth, _numberFormatter, _accountInfo, _extensionInfo) {
    var _this;
    _classCallCheck(this, UserInfo);
    _this = _callSuper(this, UserInfo);
    _this._auth = _auth;
    _this._numberFormatter = _numberFormatter;
    _this._accountInfo = _accountInfo;
    _this._extensionInfo = _extensionInfo;
    return _this;
  }
  _inherits(UserInfo, _RcModule);
  return _createClass(UserInfo, [{
    key: "loginNumber",
    get:
    /**
     * the login number of current user
     *
     * that is the main company number if no extension number
     * or the main company number with extension number
     *
     * like 1234567890 or 1234567890*101
     *
     * without formatting
     */
    function get() {
      var loggedIn = this._auth.loginStatus === _Auth.loginStatus.loggedIn;
      var mainCompanyNumber = this._accountInfo.mainCompanyNumber;
      if (loggedIn && this._accountInfo.ready && this._extensionInfo.ready && mainCompanyNumber) {
        var _extensionNumber = this._extensionInfo.extensionNumber;
        // If no extensionNumber, extensionNumber field needs to be omitted
        var extensionNumber = _extensionNumber && _extensionNumber !== '0' ? _extensionNumber : null;
        if (!extensionNumber) return mainCompanyNumber;
        return "".concat(mainCompanyNumber, "*").concat(extensionNumber);
      }
      return undefined;
    }
  }, {
    key: "formattedLoginNumber",
    get: function get() {
      return this.loginNumber ? this._numberFormatter.formatNumber(this.loginNumber) : undefined;
    }
  }]);
}(_nextCore.RcModule), _applyDecoratedDescriptor(_class2.prototype, "loginNumber", [_nextCore.computed, _dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "loginNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "formattedLoginNumber", [_nextCore.computed, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "formattedLoginNumber"), _class2.prototype), _class2)) || _class) || _class) || _class);
//# sourceMappingURL=UserInfo.js.map
