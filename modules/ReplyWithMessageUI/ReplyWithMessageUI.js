"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReplyWithMessageUI = void 0;
require("regenerator-runtime/runtime");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _ReplyWithMessageUI = require("./ReplyWithMessageUI.interface");
var _i18n = _interopRequireDefault(require("./i18n"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var ReplyWithMessageUI = (_dec = (0, _di.Module)({
  name: 'ReplyWithMessageUI',
  deps: ['Locale', 'RouterInteraction', {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'ActiveCallControl',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(ReplyWithMessageUI, _RcUIModuleV);
  var _super = _createSuper(ReplyWithMessageUI);
  function ReplyWithMessageUI(deps) {
    _classCallCheck(this, ReplyWithMessageUI);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(ReplyWithMessageUI, [{
    key: "getUIProps",
    value: function getUIProps() {
      var minString = _i18n["default"].getString('min', this._deps.locale.currentLocale);
      var hourString = _i18n["default"].getString('hour', this._deps.locale.currentLocale);
      return {
        currentLocale: this._deps.locale.currentLocale,
        options: [{
          pattern: _ReplyWithMessageUI.ReplyWithPattern.inAMeeting,
          text: _i18n["default"].getString('inAMeeting', this._deps.locale.currentLocale)
        }, {
          pattern: _ReplyWithMessageUI.ReplyWithPattern.onMyWay,
          text: _i18n["default"].getString('onMyWay', this._deps.locale.currentLocale)
        }, {
          pattern: _ReplyWithMessageUI.ReplyWithPattern.callMeBack,
          text: _i18n["default"].getString('callMeBackIn', this._deps.locale.currentLocale),
          options: [{
            text: "5 ".concat(minString),
            timeValue: 5,
            timeUnits: 'Minute'
          }, {
            text: "10 ".concat(minString),
            timeValue: 10,
            timeUnits: 'Minute'
          }, {
            text: "30 ".concat(minString),
            timeValue: 30,
            timeUnits: 'Minute'
          }, {
            text: "1 ".concat(hourString),
            timeValue: 1,
            timeUnits: 'Hour'
          }]
        }, {
          pattern: _ReplyWithMessageUI.ReplyWithPattern.willCallYouBack,
          text: _i18n["default"].getString('willCallYouBackIn', this._deps.locale.currentLocale),
          options: [{
            text: "5 ".concat(minString),
            timeValue: 5,
            timeUnits: 'Minute'
          }, {
            text: "10 ".concat(minString),
            timeValue: 10,
            timeUnits: 'Minute'
          }, {
            text: "30 ".concat(minString),
            timeValue: 30,
            timeUnits: 'Minute'
          }, {
            text: "1 ".concat(hourString),
            timeValue: 1,
            timeUnits: 'Hour'
          }]
        }],
        displayCustomMessage: true
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref) {
      var _this = this;
      var _ref$params = _ref.params,
        sessionId = _ref$params.sessionId,
        _ref$params$type = _ref$params.type,
        type = _ref$params$type === void 0 ? 'active' : _ref$params$type;
      return {
        onBackClick: function onBackClick() {
          _this._deps.routerInteraction.goBack();
        },
        reply: function () {
          var _reply = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params) {
            var _this$_deps$activeCal;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!(type === 'active')) {
                      _context.next = 3;
                      break;
                    }
                    _context.next = 3;
                    return (_this$_deps$activeCal = _this._deps.activeCallControl) === null || _this$_deps$activeCal === void 0 ? void 0 : _this$_deps$activeCal.replyWithMessage(params, sessionId);
                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));
          function reply(_x) {
            return _reply.apply(this, arguments);
          }
          return reply;
        }()
      };
    }
  }]);
  return ReplyWithMessageUI;
}(_core.RcUIModuleV2)) || _class);
exports.ReplyWithMessageUI = ReplyWithMessageUI;
//# sourceMappingURL=ReplyWithMessageUI.js.map
