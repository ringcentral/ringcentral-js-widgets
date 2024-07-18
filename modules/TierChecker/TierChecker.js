"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TierChecker = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _permissionsMessages = require("../../enums/permissionsMessages");
var _di = require("../../lib/di");
var _Auth = require("../Auth");
var _dec, _class;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var TierChecker = (_dec = (0, _di.Module)({
  name: 'TierChecker',
  deps: ['Auth', 'Alert', 'ExtensionFeatures', {
    dep: 'TierCheckerOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcModuleV) {
  _inherits(TierChecker, _RcModuleV);
  var _super = _createSuper(TierChecker);
  function TierChecker(deps) {
    _classCallCheck(this, TierChecker);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(TierChecker, [{
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this = this;
      (0, _core.watch)(this, function () {
        return [_this.ready, _this._deps.auth.loginStatus === _Auth.loginStatus.loggedIn, _this.enforceCRMFeature, _this.isCRMEnabled];
      }, /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
          var _ref3, ready, loggedIn, enforceCRMFeature, isCRMEnabled;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _ref3 = _slicedToArray(_ref, 4), ready = _ref3[0], loggedIn = _ref3[1], enforceCRMFeature = _ref3[2], isCRMEnabled = _ref3[3];
                  if (!(ready && loggedIn && enforceCRMFeature && !isCRMEnabled)) {
                    _context.next = 5;
                    break;
                  }
                  _context.next = 4;
                  return _this._deps.auth.logout();
                case 4:
                  _this._deps.alert.danger({
                    message: _permissionsMessages.permissionsMessages.invalidTier,
                    ttl: 0
                  });
                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }(), {
        multiple: true
      });
    }
  }, {
    key: "crmFeature",
    get: function get() {
      var _this$_deps$tierCheck, _this$_deps$tierCheck2;
      return (_this$_deps$tierCheck = (_this$_deps$tierCheck2 = this._deps.tierCheckerOptions) === null || _this$_deps$tierCheck2 === void 0 ? void 0 : _this$_deps$tierCheck2.crmFeature) !== null && _this$_deps$tierCheck !== void 0 ? _this$_deps$tierCheck : 'SalesForce';
    }
  }, {
    key: "isCRMEnabled",
    get: function get() {
      var _this$_deps$extension, _this$_deps$extension2;
      return !!((_this$_deps$extension = this._deps.extensionFeatures.features) === null || _this$_deps$extension === void 0 ? void 0 : (_this$_deps$extension2 = _this$_deps$extension[this.crmFeature]) === null || _this$_deps$extension2 === void 0 ? void 0 : _this$_deps$extension2.available);
    }
  }, {
    key: "enforceCRMFeature",
    get: function get() {
      var _this$_deps$tierCheck3, _this$_deps$tierCheck4;
      return (_this$_deps$tierCheck3 = (_this$_deps$tierCheck4 = this._deps.tierCheckerOptions) === null || _this$_deps$tierCheck4 === void 0 ? void 0 : _this$_deps$tierCheck4.enforceCRMFeature) !== null && _this$_deps$tierCheck3 !== void 0 ? _this$_deps$tierCheck3 : true;
    }
  }]);
  return TierChecker;
}(_core.RcModuleV2)) || _class);
exports.TierChecker = TierChecker;
//# sourceMappingURL=TierChecker.js.map
