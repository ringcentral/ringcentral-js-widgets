"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeedbackUI = void 0;
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
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
var FeedbackUI = (_dec = (0, _di.Module)({
  name: 'FeedbackUI',
  deps: ['RouterInteraction', 'Feedback', 'Locale', 'Brand']
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(FeedbackUI, _RcUIModuleV);
  var _super = _createSuper(FeedbackUI);
  function FeedbackUI(deps) {
    _classCallCheck(this, FeedbackUI);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(FeedbackUI, [{
    key: "getUIProps",
    value: function getUIProps() {
      return {
        brandName: this._deps.brand.name,
        currentLocale: this._deps.locale.currentLocale,
        email: this._deps.feedback.email,
        topic: this._deps.feedback.topic,
        subject: this._deps.feedback.subject,
        description: this._deps.feedback.description
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref) {
      var _this = this;
      var _sendFeedback = _ref.sendFeedback;
      return {
        onBackClick: function onBackClick() {
          _this._deps.routerInteraction.goBack();
        },
        onEmailChange: function onEmailChange(value) {
          _this._deps.feedback.updateEmail(value);
        },
        onTopicChange: function onTopicChange(value) {
          _this._deps.feedback.updateTopic(value);
        },
        onSubjectChange: function onSubjectChange(value) {
          _this._deps.feedback.updateSubject(value);
        },
        onDescriptionChange: function onDescriptionChange(value) {
          _this._deps.feedback.updateDescription(value);
        },
        onRevertClick: function onRevertClick() {
          _this._deps.feedback.clean();
        },
        sendFeedback: function sendFeedback(mailToUrl) {
          if (_sendFeedback) {
            _sendFeedback(mailToUrl);
            return;
          }
          _this._deps.feedback.sendFeedback(mailToUrl);
        }
      };
    }
  }]);
  return FeedbackUI;
}(_core.RcUIModuleV2)) || _class);
exports.FeedbackUI = FeedbackUI;
//# sourceMappingURL=FeedbackUI.js.map
