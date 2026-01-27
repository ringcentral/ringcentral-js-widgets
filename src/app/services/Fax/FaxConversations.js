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
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FaxConversations = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.trim.js");
var _messageHelper = require("@ringcentral-integration/commons/lib/messageHelper");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _filter = _interopRequireDefault(require("lodash/filter"));
var _ConversationLogger = require("../ConversationLogger");
var _ConversationsBase2 = require("../Conversations/ConversationsBase");
var _MessageSender = require("../MessageSender");
var _FaxMessageStore = require("./FaxMessageStore");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
/**
 * For fax conversations
 */
var FaxConversations = exports.FaxConversations = (_dec = (0, _nextCore.injectable)({
  name: 'FaxConversations'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 8);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 9);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)('FaxConversationsOptions')(target, undefined, 10);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _services3.Toast === "undefined" ? Object : _services3.Toast, typeof _services.Auth === "undefined" ? Object : _services.Auth, typeof _services.Client === "undefined" ? Object : _services.Client, typeof _MessageSender.MessageSender === "undefined" ? Object : _MessageSender.MessageSender, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof _FaxMessageStore.FaxMessageStore === "undefined" ? Object : _FaxMessageStore.FaxMessageStore, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services2.ContactMatcher === "undefined" ? Object : _services2.ContactMatcher, typeof _ConversationLogger.ConversationLogger === "undefined" ? Object : _ConversationLogger.ConversationLogger, typeof FaxConversationsOptions === "undefined" ? Object : FaxConversationsOptions]), _dec7 = Reflect.metadata("design:type", typeof FaxFilterStatus === "undefined" ? Object : FaxFilterStatus), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [typeof FaxFilterStatus === "undefined" ? Object : FaxFilterStatus]), _dec0 = (0, _nextCore.computed)(function (that) {
  return [that.currentStatus, that.formattedConversations];
}), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", []), _dec11 = (0, _nextCore.computed)(function (that) {
  return [that.searchInput, that.limitedConversations];
}), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = (_class2 = /*#__PURE__*/function (_ConversationsBase) {
  function FaxConversations(_toast, _auth, _client, _messageSender, _extensionInfo, _messageStore, _appFeatures, _regionSettings, _contactMatcher, _conversationLogger, _conversationsOptions) {
    var _this;
    _classCallCheck(this, FaxConversations);
    _this = _callSuper(this, FaxConversations, [_toast, _auth, _client, null, _extensionInfo, _messageStore, _appFeatures, _regionSettings, _contactMatcher, _conversationLogger, _conversationsOptions]);
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
    _initializerDefineProperty(_this, "currentStatus", _descriptor, _this);
    return _this;
  }
  _inherits(FaxConversations, _ConversationsBase);
  return _createClass(FaxConversations, [{
    key: "setCurrentStatus",
    value: function setCurrentStatus(val) {
      this.currentStatus = val;
    }
  }, {
    key: "onReset",
    value: function onReset() {
      _superPropGet(FaxConversations, "onReset", this, 3)([]);
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return this._appFeatures.hasReadFaxPermission;
    }
  }, {
    key: "limitedConversations",
    get: function get() {
      var targetStatus = this.currentStatus;
      if (targetStatus === 'All') {
        return this.formattedConversations;
      }
      return (0, _filter["default"])(this.formattedConversations, function (_ref) {
        var messageStatus = _ref.messageStatus,
          direction = _ref.direction;
        switch (targetStatus) {
          case 'Failed':
            return messageStatus === 'SendingFailed' || messageStatus === 'DeliveryFailed';
          case 'Received':
            return direction === 'Inbound' && messageStatus === 'Received';
          case 'Sent':
            return messageStatus === 'Sent' || messageStatus === 'Queued';
          default:
            return true;
        }
      });
    }
  }, {
    key: "filteredConversations",
    get: function get() {
      var _this$searchInput, _this$searchInput$toL, _this$searchInput$toL2;
      var effectSearchStr = (_this$searchInput = this.searchInput) === null || _this$searchInput === void 0 ? void 0 : (_this$searchInput$toL = _this$searchInput.toLowerCase) === null || _this$searchInput$toL === void 0 ? void 0 : (_this$searchInput$toL2 = _this$searchInput$toL.call(_this$searchInput)) === null || _this$searchInput$toL2 === void 0 ? void 0 : _this$searchInput$toL2.trim();
      var faxList = this.limitedConversations;
      if (effectSearchStr === '' || effectSearchStr === null) {
        return faxList;
      }
      return faxList.filter(function (fax) {
        var _fax$correspondents, _fax$correspondents2;
        if (fax.correspondentMatches.find(function (entity) {
          return (entity.name || '').toLowerCase().indexOf(effectSearchStr) > -1;
        })) {
          // match by entity's name
          return true;
        }
        if ((_fax$correspondents = fax.correspondents) === null || _fax$correspondents === void 0 ? void 0 : _fax$correspondents.find(function (contact) {
          return (contact.phoneNumber || contact.extensionNumber || '').indexOf(effectSearchStr) > -1;
        })) {
          return true;
        }
        if ((_fax$correspondents2 = fax.correspondents) === null || _fax$correspondents2 === void 0 ? void 0 : _fax$correspondents2.find(function (contact) {
          return (contact.name || '').toLowerCase().indexOf(effectSearchStr) > -1;
        })) {
          return true;
        }
        return false;
      }).sort(_messageHelper.sortByDate);
    }
  }]);
}(_ConversationsBase2.ConversationsBase), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "currentStatus", [_nextCore.state, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'All';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setCurrentStatus", [_nextCore.action, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "setCurrentStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "limitedConversations", [_dec0, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "limitedConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "filteredConversations", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "filteredConversations"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=FaxConversations.js.map
