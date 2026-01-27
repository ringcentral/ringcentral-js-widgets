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
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostCallView = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _react = _interopRequireDefault(require("react"));
var _services = require("../../../../services");
var _CallDetailPage = require("../../../CallDetailView/CallDetailPage");
var _CallsListViewSpring = require("../../../CallsListViewSpring");
var _services2 = require("../../services");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var PostCallView = exports.PostCallView = (_dec = (0, _nextCore.injectable)({
  name: 'PostCallView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('PostCallViewOptions')(target, undefined, 3);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services2.CallViewState === "undefined" ? Object : _services2.CallViewState, typeof _CallsListViewSpring.CallsListViewSpring === "undefined" ? Object : _CallsListViewSpring.CallsListViewSpring, typeof _services.CallAction === "undefined" ? Object : _services.CallAction, typeof PostCallViewOptions === "undefined" ? Object : PostCallViewOptions]), _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", []), _dec7 = (0, _nextCore.delegate)('server'), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", []), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [Object]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function PostCallView(_callViewState, _callsListView, _callAction, _postCallViewOptions) {
    var _this;
    _classCallCheck(this, PostCallView);
    _this = _callSuper(this, PostCallView);
    _this._callViewState = _callViewState;
    _this._callsListView = _callsListView;
    _this._callAction = _callAction;
    _this._postCallViewOptions = _postCallViewOptions;
    return _this;
  }
  _inherits(PostCallView, _RcViewModule);
  return _createClass(PostCallView, [{
    key: "_goBack",
    value: function _goBack() {
      var postCallViewTelephonySessionId = this._callViewState.postCallViewTelephonySessionId;
      this._callViewState._setPostCallView(null);
      if (postCallViewTelephonySessionId) {
        this._callAction._remove(postCallViewTelephonySessionId);
        this._callViewState._setView('hidden');
      }
    }
  }, {
    key: "goBack",
    value: function () {
      var _goBack2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this$_postCallViewOp;
        var _postCallCallLog$sess, postCallCallLog, sessionId;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!((_this$_postCallViewOp = this._postCallViewOptions) === null || _this$_postCallViewOp === void 0 ? void 0 : _this$_postCallViewOp.onBeforeGoBack)) {
                _context.n = 1;
                break;
              }
              postCallCallLog = this._callViewState.postCallCallLog;
              sessionId = (_postCallCallLog$sess = postCallCallLog === null || postCallCallLog === void 0 ? void 0 : postCallCallLog.sessionId) !== null && _postCallCallLog$sess !== void 0 ? _postCallCallLog$sess : null;
              _context.n = 1;
              return this._postCallViewOptions.onBeforeGoBack(sessionId);
            case 1:
              // set from post call view to true for us to know that we are coming from post call view
              this._callAction.fromPostCall = true;
              this._goBack();
            case 2:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function goBack() {
        return _goBack2.apply(this, arguments);
      }
      return goBack;
    }()
  }, {
    key: "Content",
    value: function Content(props) {
      var _this2 = this;
      var _this$getUIFunctions = this.getUIFunctions(props),
        useCallHistoryItemInfo = _this$getUIFunctions.useCallHistoryItemInfo,
        useActionsHandler = _this$getUIFunctions.useActionsHandler;
      var currentCallLog = props.currentCallLog,
        variant = props.variant;
      var _useCallDetailPageCon = (0, _CallDetailPage.useCallDetailPageContent)({
          currentCallLog: currentCallLog,
          goBack: function goBack() {
            _this2.goBack();
          },
          useCallHistoryItemInfo: useCallHistoryItemInfo,
          useActionsHandler: useActionsHandler
        }),
        header = _useCallDetailPageCon.header,
        info = _useCallDetailPageCon.info;
      return variant === 'header' ? header : info;
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(props) {
      return {
        useCallHistoryItemInfo: this._callsListView.useCallHistoryItemInfo,
        useActionsHandler: this._callsListView.useActionsHandler
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this;
      var postCallCallLog = (0, _nextCore.useConnector)(function () {
        return _this3._callViewState.postCallCallLog;
      });
      if (!postCallCallLog) {
        this.logger.error('postCallCallLog not found');
        return null;
      }
      return /*#__PURE__*/_react["default"].createElement(this.Content, _extends({}, props, {
        currentCallLog: postCallCallLog
      }));
    }
  }]);
}(_nextCore.RcViewModule), _applyDecoratedDescriptor(_class2.prototype, "_goBack", [_nextCore.action, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "_goBack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "goBack", [_dec7, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "goBack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "Content", [_nextCore.autobind, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "Content"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=PostCall.view.js.map
