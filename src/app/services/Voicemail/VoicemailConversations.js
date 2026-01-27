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
exports.VoicemailConversations = void 0;
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _ConversationLogger = require("../ConversationLogger");
var _Conversations = require("../Conversations");
var _MessageSender = require("../MessageSender");
var _VoicemailMessageStore = require("./VoicemailMessageStore");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;
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
var VoicemailConversations = exports.VoicemailConversations = (_dec = (0, _nextCore.injectable)({
  name: 'VoicemailConversations'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 8);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 9);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)('VoicemailConversationsOptions')(target, undefined, 10);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _services3.Toast === "undefined" ? Object : _services3.Toast, typeof _services.Auth === "undefined" ? Object : _services.Auth, typeof _services.Client === "undefined" ? Object : _services.Client, typeof _MessageSender.MessageSender === "undefined" ? Object : _MessageSender.MessageSender, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof _VoicemailMessageStore.VoicemailMessageStore === "undefined" ? Object : _VoicemailMessageStore.VoicemailMessageStore, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services2.ContactMatcher === "undefined" ? Object : _services2.ContactMatcher, typeof _ConversationLogger.ConversationLogger === "undefined" ? Object : _ConversationLogger.ConversationLogger, typeof VoicemailConversationsOptions === "undefined" ? Object : VoicemailConversationsOptions]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = /*#__PURE__*/function (_ConversationsBase) {
  function VoicemailConversations(_toast, _auth, _client, _messageSender, _extensionInfo, _messageStore, _appFeatures, _regionSettings, _contactMatcher, _conversationLogger, _conversationsOptions) {
    var _this;
    _classCallCheck(this, VoicemailConversations);
    _this = _callSuper(this, VoicemailConversations, [_toast, _auth, _client, null, _extensionInfo, _messageStore, _appFeatures, _regionSettings, _contactMatcher, _conversationLogger, _conversationsOptions]);
    _this._toast = _toast;
    _this._auth = _auth;
    _this._client = _client;
    _this._messageSender = _messageSender;
    _this._extensionInfo = _extensionInfo;
    _this._messageStore = _messageStore;
    _this._appFeatures = _appFeatures;
    _this._regionSettings = _regionSettings;
    _this._contactMatcher = _contactMatcher;
    _this._conversationLogger = _conversationLogger;
    _this._conversationsOptions = _conversationsOptions;
    _this._minSearchStringLength = 1;
    return _this;
  }
  _inherits(VoicemailConversations, _ConversationsBase);
  return _createClass(VoicemailConversations, [{
    key: "_hasPermission",
    get: function get() {
      return this._appFeatures.hasVoicemailPermission;
    }
  }]);
}(_Conversations.ConversationsBase)) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=VoicemailConversations.js.map
