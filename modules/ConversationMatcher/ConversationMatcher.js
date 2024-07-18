"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversationMatcher = void 0;
var _DataMatcherV = require("../../lib/DataMatcherV2");
var _di = require("../../lib/di");
var _dec, _class;
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
var ConversationMatcher = (_dec = (0, _di.Module)({
  name: 'ConversationMatcher',
  deps: [{
    dep: 'ConversationMatcherOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_DataMatcher) {
  _inherits(ConversationMatcher, _DataMatcher);
  var _super = _createSuper(ConversationMatcher);
  function ConversationMatcher(deps) {
    var _deps$conversationMat;
    _classCallCheck(this, ConversationMatcher);
    return _super.call(this,
    // @ts-expect-error TS(2345): Argument of type 'Deps' is not assignable to param... Remove this comment to see the full error message
    deps, 'ConversationMatcher', (_deps$conversationMat = deps.conversationMatcherOptions) === null || _deps$conversationMat === void 0 ? void 0 : _deps$conversationMat.disableCache);
  }
  _createClass(ConversationMatcher, [{
    key: "dataMatcherOptions",
    get: function get() {
      // @ts-expect-error TS(2322): Type 'ConversationMatcherOptions | undefined' is n... Remove this comment to see the full error message
      return this._deps.conversationMatcherOptions;
    }
  }]);
  return ConversationMatcher;
}(_DataMatcherV.DataMatcher)) || _class);
exports.ConversationMatcher = ConversationMatcher;
//# sourceMappingURL=ConversationMatcher.js.map
