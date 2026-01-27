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
exports.ConversationAlert = void 0;
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _react = _interopRequireDefault(require("react"));
var _services2 = require("../../services");
var _ConversationPanel = require("./ConversationPanel");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
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
var ConversationAlert = exports.ConversationAlert = (_dec = (0, _nextCore.injectable)({
  name: 'ConversationAlert'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 2);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('ConversationViewOptions')(target, undefined, 3);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _services2.MessageSender === "undefined" ? Object : _services2.MessageSender, typeof _services.NumberFormatter === "undefined" ? Object : _services.NumberFormatter, typeof _services2.SmsOptOut === "undefined" ? Object : _services2.SmsOptOut, typeof ConversationViewSpringOptions === "undefined" ? Object : ConversationViewSpringOptions]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = /*#__PURE__*/function (_RcModule) {
  function ConversationAlert(_messageSender, _numberFormatter, _smsOptOut, _conversationViewOptions) {
    var _this;
    _classCallCheck(this, ConversationAlert);
    _this = _callSuper(this, ConversationAlert);
    _this._messageSender = _messageSender;
    _this._numberFormatter = _numberFormatter;
    _this._smsOptOut = _smsOptOut;
    _this._conversationViewOptions = _conversationViewOptions;
    return _this;
  }

  /**
   * Check if the conversation's phone number has SMS capability
   */
  _inherits(ConversationAlert, _RcModule);
  return _createClass(ConversationAlert, [{
    key: "getSmsSentCapability",
    value: function getSmsSentCapability(conversation) {
      var _conversation$from, _conversation$to, _conversation$to$;
      if (!conversation) {
        return {
          hasCapability: true
        };
      }
      var phoneNumber = conversation.direction === 'Outbound' ? (_conversation$from = conversation.from) === null || _conversation$from === void 0 ? void 0 : _conversation$from.phoneNumber : (_conversation$to = conversation.to) === null || _conversation$to === void 0 ? void 0 : (_conversation$to$ = _conversation$to[0]) === null || _conversation$to$ === void 0 ? void 0 : _conversation$to$.phoneNumber;
      if (!phoneNumber) {
        return {
          hasCapability: true
        };
      }
      var formattedPhoneNumber = this._numberFormatter.formatNumber(phoneNumber);
      var hasCapability = this._messageSender.senderNumberMap.has(formattedPhoneNumber);
      return {
        hasCapability: hasCapability,
        phoneNumber: formattedPhoneNumber
      };
    }

    /**
     * Get alert information for a conversation
     */
  }, {
    key: "getAlertInfo",
    value: function getAlertInfo(conversation) {
      var _this$_smsOptOut, _this$_conversationVi3, _this$_conversationVi4;
      var isOptOut = (_this$_smsOptOut = this._smsOptOut) === null || _this$_smsOptOut === void 0 ? void 0 : _this$_smsOptOut.getIsOptOutConversation(conversation);
      var smsCapabilityCheck = this.getSmsSentCapability(conversation);
      var notHasSmsCapability = !smsCapabilityCheck.hasCapability;
      var alertProps;
      if (isOptOut) {
        alertProps = {
          children: /*#__PURE__*/_react["default"].createElement(_ConversationPanel.OptOutAlert, null),
          severity: 'warning'
        };
      } else if (notHasSmsCapability && smsCapabilityCheck.phoneNumber) {
        alertProps = {
          children: /*#__PURE__*/_react["default"].createElement(_ConversationPanel.SmsCapabilityAlert, {
            phoneNumber: smsCapabilityCheck.phoneNumber
          }),
          severity: 'info'
        };
      } else {
        var _this$_conversationVi, _this$_conversationVi2;
        alertProps = (_this$_conversationVi = this._conversationViewOptions) === null || _this$_conversationVi === void 0 ? void 0 : (_this$_conversationVi2 = _this$_conversationVi.alertProps) === null || _this$_conversationVi2 === void 0 ? void 0 : _this$_conversationVi2.call(_this$_conversationVi);
      }
      return {
        showAlert: isOptOut || notHasSmsCapability || ((_this$_conversationVi3 = this._conversationViewOptions) === null || _this$_conversationVi3 === void 0 ? void 0 : (_this$_conversationVi4 = _this$_conversationVi3.showAlert) === null || _this$_conversationVi4 === void 0 ? void 0 : _this$_conversationVi4.call(_this$_conversationVi3)) || false,
        alertProps: alertProps
      };
    }
  }]);
}(_nextCore.RcModule)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=ConversationAlert.js.map
