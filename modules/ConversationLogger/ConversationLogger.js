"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversationLogger = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.object.values.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _core = require("@ringcentral-integration/core");
var _utils = require("@ringcentral-integration/utils");
var _messageTypes = require("../../enums/messageTypes");
var _LoggerBase2 = require("../../lib/LoggerBase");
var _di = require("../../lib/di");
var _messageHelper = require("../../lib/messageHelper");
var _proxify = require("../../lib/proxy/proxify");
var _conversationLoggerHelper = require("./conversationLoggerHelper");
var _excluded = ["conversation"],
  _excluded2 = ["conversationId", "correspondentEntity", "redirect"];
var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var ConversationLogger = exports.ConversationLogger = (_dec = (0, _di.Module)({
  name: 'ConversationLogger',
  deps: ['Auth', 'Storage', 'ContactMatcher', 'ConversationMatcher', 'DateTimeFormat', 'ExtensionInfo', 'MessageStore', 'AppFeatures', 'ConversationLoggerOptions', {
    dep: 'TabManager',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.messageStore.conversationStore, that._deps.extensionInfo.extensionNumber, that._deps.conversationMatcher.dataMapping];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that.conversationLogMap];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that.conversationLogMap];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_LoggerBase) {
  function ConversationLogger(deps) {
    var _this$_deps$conversat, _this$_deps$conversat2, _this$_deps$conversat3;
    var _this;
    _classCallCheck(this, ConversationLogger);
    _this = _callSuper(this, ConversationLogger, [deps, {
      enableCache: true,
      storageKey: 'ConversationLogger'
    }]);
    _this._logFunction = _this._deps.conversationLoggerOptions.logFunction;
    _this._readyCheckFunction = _this._deps.conversationLoggerOptions.readyCheckFunction;
    _this._isLoggedContact = (_this$_deps$conversat = _this._deps.conversationLoggerOptions.isLoggedContact) !== null && _this$_deps$conversat !== void 0 ? _this$_deps$conversat : function () {
      return false;
    };
    _this._formatDateTime = (_this$_deps$conversat2 = _this._deps.conversationLoggerOptions.formatDateTime) !== null && _this$_deps$conversat2 !== void 0 ? _this$_deps$conversat2 : function () {
      var _this$_deps$dateTimeF;
      return (_this$_deps$dateTimeF = _this._deps.dateTimeFormat).formatDateTime.apply(_this$_deps$dateTimeF, arguments);
    };
    _this._isAutoUpdate = (_this$_deps$conversat3 = _this._deps.conversationLoggerOptions.isAutoUpdate) !== null && _this$_deps$conversat3 !== void 0 ? _this$_deps$conversat3 : true;
    _this._accordWithLogRequirement = _this._deps.conversationLoggerOptions.accordWithLogRequirement;
    _this._identityFunction = _conversationLoggerHelper.conversationLogIdentityFunction;
    _this._autoLogQueue = [];
    _this._autoLogPromise = null;
    _this._lastProcessedConversations = null;
    _this._lastAutoLog = null;
    _initializerDefineProperty(_this, "_autoLog", _descriptor, _this);
    _this._deps.messageStore.onMessageUpdated(function (record) {
      _this._processConversationLogMap(record);
    });
    _this._deps.contactMatcher.addQuerySource({
      getQueriesFn: function getQueriesFn() {
        return _this.uniqueNumbers;
      },
      readyCheckFn: function readyCheckFn() {
        return _this._deps.messageStore.ready && _this._deps.extensionInfo.ready;
      }
    });
    _this._deps.conversationMatcher.addQuerySource({
      getQueriesFn: function getQueriesFn() {
        return _this.conversationLogIds;
      },
      readyCheckFn: function readyCheckFn() {
        return _this._deps.messageStore.ready && _this._deps.extensionInfo.ready;
      }
    });
    return _this;
  }
  _inherits(ConversationLogger, _LoggerBase);
  return _createClass(ConversationLogger, [{
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(_superPropGet(ConversationLogger, "_shouldInit", this, 3)([]) && this._readyCheckFunction());
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_superPropGet(ConversationLogger, "_shouldReset", this, 3)([]) || this.ready && !this._readyCheckFunction());
    }
  }, {
    key: "autoLog",
    get: function get() {
      return this._autoLog;
    }
  }, {
    key: "_setAutoLog",
    value: function _setAutoLog(autoLog) {
      this._autoLog = autoLog;
    }
  }, {
    key: "onReset",
    value: function onReset() {
      this._lastProcessedConversations = null;
      this._lastAutoLog = null;
      this._autoLogPromise = null;
      this._autoLogQueue = [];
    }
  }, {
    key: "_processQueue",
    value: function () {
      var _processQueue2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this2 = this;
        var ownerId;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              ownerId = this._deps.auth.ownerId;
              _context.n = 1;
              return (0, _utils.sleep)(300);
            case 1:
              if (!(ownerId !== this._deps.auth.ownerId)) {
                _context.n = 2;
                break;
              }
              return _context.a(2);
            case 2:
              _context.n = 3;
              return Promise.all(this._autoLogQueue.splice(0, 10).map(function (conversation) {
                return _this2._processConversationLog({
                  conversation: conversation
                });
              }));
            case 3:
              if (ownerId === this._deps.auth.ownerId && this._autoLogQueue.length > 0) {
                this._autoLogPromise = this._processQueue();
              } else {
                this._autoLogPromise = null;
              }
            case 4:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function _processQueue() {
        return _processQueue2.apply(this, arguments);
      }
      return _processQueue;
    }()
  }, {
    key: "_queueAutoLogConversation",
    value: function _queueAutoLogConversation(_ref) {
      var conversation = _ref.conversation;
      this._autoLogQueue.push(conversation);
      if (!this._autoLogPromise) {
        this._autoLogPromise = this._processQueue();
      }
    }
  }, {
    key: "_getCorrespondentMatches",
    value: function _getCorrespondentMatches(conversation) {
      var _this3 = this;
      return conversation.correspondents && conversation.correspondents.reduce(function (result, contact) {
        var number = contact.phoneNumber || contact.extensionNumber;
        return number && _this3._deps.contactMatcher.dataMapping[number] ? result.concat(_this3._deps.contactMatcher.dataMapping[number]) : result;
      }, []) || [];
    }
  }, {
    key: "getLastMatchedCorrespondentEntity",
    value: function getLastMatchedCorrespondentEntity(conversation) {
      var _this4 = this;
      var conversationLog = this.conversationLogMap[conversation.conversationId];
      if (!conversationLog) {
        return null;
      }
      var lastRecord = Object.keys(conversationLog).map(function (date) {
        return _this4.conversationLogMap[conversation.conversationId][date];
      }).sort(_messageHelper.sortByDate).find(function (item) {
        return item.conversationLogMatches.length > 0;
      });
      if (lastRecord && this._deps.conversationMatcher.dataMapping[lastRecord.conversationLogId] && this._deps.conversationMatcher.dataMapping[lastRecord.conversationLogId].length) {
        var lastActivity = this._deps.conversationMatcher.dataMapping[lastRecord.conversationLogId][0];
        var correspondentMatches = this._getCorrespondentMatches(lastRecord);
        return correspondentMatches.find(function (item) {
          return _this4._isLoggedContact(conversation, lastActivity, item);
        });
      }
      return null;
    }

    /**
     * Define update or log new sms
     */
  }, {
    key: "_processConversationLog",
    value: (function () {
      var _processConversationLog2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref2) {
        var conversation, addIfNotExist, numbers, numberMap, self, selfNumber, selfMatches, correspondentMatches, selfEntity, correspondentEntity;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              conversation = _ref2.conversation;
              _context2.n = 1;
              return this._deps.conversationMatcher.match({
                queries: [conversation.conversationLogId]
              });
            case 1:
              if (!(this._isAutoUpdate && this._deps.conversationMatcher.dataMapping[conversation.conversationLogId] && this._deps.conversationMatcher.dataMapping[conversation.conversationLogId].length)) {
                _context2.n = 3;
                break;
              }
              _context2.n = 2;
              return this._autoLogConversation({
                conversation: conversation
              });
            case 2:
              _context2.n = 5;
              break;
            case 3:
              if (!(this.autoLog && conversation.type === _messageTypes.messageTypes.sms)) {
                _context2.n = 5;
                break;
              }
              /* eslint { "no-inner-declarations": 0 } */
              addIfNotExist = function addIfNotExist(contact) {
                var number = contact.phoneNumber || contact.extensionNumber;
                if (number && !numberMap[number]) {
                  numbers.push(number);
                  numberMap[number] = true;
                }
              };
              // new entry
              numbers = [];
              numberMap = {};
              self = conversation.self;
              if (self) addIfNotExist(self);
              conversation.correspondents.forEach(addIfNotExist);
              _context2.n = 4;
              return this._deps.contactMatcher.match({
                queries: numbers
              });
            case 4:
              selfNumber = conversation.self && (conversation.self.phoneNumber || conversation.self.extensionNumber);
              selfMatches = selfNumber && this._deps.contactMatcher.dataMapping[selfNumber] || [];
              correspondentMatches = this._getCorrespondentMatches(conversation);
              selfEntity = selfMatches && selfMatches.length === 1 && selfMatches[0] || null;
              correspondentEntity = this.getLastMatchedCorrespondentEntity(conversation);
              correspondentEntity = correspondentEntity || correspondentMatches && correspondentMatches.length === 1 && correspondentMatches[0] || null;
              _context2.n = 5;
              return this._autoLogConversation({
                conversation: conversation,
                selfEntity: selfEntity,
                correspondentEntity: correspondentEntity
              });
            case 5:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function _processConversationLog(_x) {
        return _processConversationLog2.apply(this, arguments);
      }
      return _processConversationLog;
    }())
  }, {
    key: "accordWithProcessLogRequirement",
    value: function accordWithProcessLogRequirement(conversationLogItem) {
      var _this$_accordWithLogR;
      return !!((_this$_accordWithLogR = this._accordWithLogRequirement) === null || _this$_accordWithLogR === void 0 ? void 0 : _this$_accordWithLogR.call(this, conversationLogItem));
    }

    /**
     * Auto log new message
     */
  }, {
    key: "_processConversationLogMap",
    value: function _processConversationLogMap(/** use for outside extend module */
    record) {
      var _this5 = this;
      if (this.ready && this._lastAutoLog !== this.autoLog) {
        this._lastAutoLog = this.autoLog;
        if (this.autoLog) {
          // force conversation log checking when switch auto log to on
          this._lastProcessedConversations = null;
        }
      }
      if (this.ready && this._lastProcessedConversations !== this.conversationLogMap) {
        this._deps.conversationMatcher.triggerMatch();
        this._deps.contactMatcher.triggerMatch();
        var oldMap = this._lastProcessedConversations || {};
        this._lastProcessedConversations = this.conversationLogMap;
        if (!this._deps.tabManager || this._deps.tabManager.active) {
          Object.keys(this._lastProcessedConversations).forEach(function (conversationId) {
            Object.keys(_this5._lastProcessedConversations[conversationId]).forEach(function (date) {
              var conversation = _this5._lastProcessedConversations[conversationId][date];
              if (!oldMap[conversationId] || !oldMap[conversationId][date] || conversation.messages[0].id !== oldMap[conversationId][date].messages[0].id) {
                if (_this5.accordWithProcessLogRequirement(conversation)) {
                  _this5._queueAutoLogConversation({
                    conversation: conversation
                  });
                }
              }
            });
          });
        }
      }
    }
  }, {
    key: "_autoLogConversation",
    value: function () {
      var _autoLogConversation2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(_ref3) {
        var conversation, selfEntity, correspondentEntity;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              conversation = _ref3.conversation, selfEntity = _ref3.selfEntity, correspondentEntity = _ref3.correspondentEntity;
              _context3.n = 1;
              return this.log({
                conversation: conversation,
                selfEntity: selfEntity,
                correspondentEntity: correspondentEntity
              });
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function _autoLogConversation(_x2) {
        return _autoLogConversation2.apply(this, arguments);
      }
      return _autoLogConversation;
    }()
  }, {
    key: "log",
    value: function () {
      var _log = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(_ref4) {
        var conversation, options;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              conversation = _ref4.conversation, options = _objectWithoutProperties(_ref4, _excluded);
              _superPropGet(ConversationLogger, "log", this, 3)([_objectSpread({
                item: conversation
              }, options)]);
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function log(_x3) {
        return _log.apply(this, arguments);
      }
      return log;
    }()
  }, {
    key: "logConversation",
    value: function () {
      var _logConversation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(_ref5) {
        var _this6 = this;
        var conversationId, correspondentEntity, redirect, options;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              conversationId = _ref5.conversationId, correspondentEntity = _ref5.correspondentEntity, redirect = _ref5.redirect, options = _objectWithoutProperties(_ref5, _excluded2);
              if (!this.conversationLogMap[conversationId]) {
                _context5.n = 1;
                break;
              }
              _context5.n = 1;
              return Promise.all(Object.keys(this.conversationLogMap[conversationId]).map(function (date) {
                return _this6.conversationLogMap[conversationId][date];
              }).sort(_messageHelper.sortByDate).map(function (conversation, idx) {
                var queueIndex = _this6._autoLogQueue.findIndex(function (item) {
                  return item.conversationLogId === conversation.conversationLogId;
                });
                if (queueIndex > -1) {
                  _this6._autoLogQueue.splice(queueIndex, 1);
                }
                return _this6.log(_objectSpread(_objectSpread({}, options), {}, {
                  conversation: conversation,
                  correspondentEntity: correspondentEntity,
                  redirect: redirect && idx === 0 // only direct on the first item
                }));
              }));
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function logConversation(_x4) {
        return _logConversation.apply(this, arguments);
      }
      return logConversation;
    }()
  }, {
    key: "available",
    get: function get() {
      return this._deps.appFeatures.hasReadTextPermission;
    }
  }, {
    key: "setAutoLog",
    value: function () {
      var _setAutoLog2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(autoLog) {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              if (this.ready && autoLog !== this.autoLog) {
                this._setAutoLog(autoLog);
              }
            case 1:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function setAutoLog(_x5) {
        return _setAutoLog2.apply(this, arguments);
      }
      return setAutoLog;
    }()
  }, {
    key: "conversationLogMap",
    get: function get() {
      var _this$_deps$conversat4,
        _this7 = this;
      var conversationStore = this._deps.messageStore.conversationStore;
      var extensionNumber = this._deps.extensionInfo.extensionNumber;
      var conversationLogMapping = (_this$_deps$conversat4 = this._deps.conversationMatcher.dataMapping) !== null && _this$_deps$conversat4 !== void 0 ? _this$_deps$conversat4 : {};
      var messages = Object.values(conversationStore).reduce(function (allMessages, messages) {
        return [].concat(_toConsumableArray(allMessages), _toConsumableArray(messages));
      }, []);
      var mapping = {};
      messages.slice().sort(_messageHelper.sortByDate).forEach(function (message) {
        var conversationId = message.conversationId;
        var date = _this7._formatDateTime({
          type: 'date',
          utcTimestamp: message.creationTime
        });
        if (!mapping[conversationId]) {
          mapping[conversationId] = {};
        }
        if (!mapping[conversationId][date]) {
          var conversationLogId = _this7.getConversationLogId(message);
          mapping[conversationId][date] = _objectSpread({
            conversationLogId: conversationLogId,
            conversationId: conversationId,
            creationTime: message.creationTime,
            // for sorting
            date: date,
            type: message.type,
            messages: [],
            conversationLogMatches: conversationLogMapping[conversationLogId] || []
          }, (0, _messageHelper.getNumbersFromMessage)({
            extensionNumber: extensionNumber,
            message: message
          }));
        }
        mapping[conversationId][date].messages.push(message);
      });
      return mapping;
    }
  }, {
    key: "conversationLogIds",
    get: function get() {
      var _this8 = this;
      var logIds = [];
      Object.keys(this.conversationLogMap).forEach(function (conversationId) {
        Object.keys(_this8.conversationLogMap[conversationId]).forEach(function (date) {
          logIds.push(_this8.conversationLogMap[conversationId][date].conversationLogId);
        });
      });
      return logIds;
    }
  }, {
    key: "uniqueNumbers",
    get: function get() {
      var _this9 = this;
      var output = [];
      var numberMap = {};
      function addIfNotExist(contact) {
        var number = contact.phoneNumber || contact.extensionNumber;
        if (number && !numberMap[number]) {
          output.push(number);
          numberMap[number] = true;
        }
      }
      Object.keys(this.conversationLogMap).forEach(function (conversationId) {
        Object.keys(_this9.conversationLogMap[conversationId]).forEach(function (date) {
          var conversation = _this9.conversationLogMap[conversationId][date];
          var self = conversation.self;
          if (self) addIfNotExist(self);
          conversation.correspondents.forEach(addIfNotExist);
        });
      });
      return output;
    }
  }, {
    key: "getConversationLogId",
    value: function getConversationLogId(message) {
      if (!message) {
        return;
      }
      var conversationId = message.conversationId;
      var date = this._formatDateTime({
        type: 'date',
        utcTimestamp: message.creationTime
      });
      return (0, _conversationLoggerHelper.getLogId)({
        conversationId: conversationId,
        date: date
      });
    }
  }, {
    key: "dataMapping",
    get: function get() {
      return this._deps.conversationMatcher.dataMapping;
    }
  }]);
}(_LoggerBase2.LoggerBase), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_autoLog", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setAutoLog", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setAutoLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "log", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "log"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "logConversation", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "logConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAutoLog", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setAutoLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "conversationLogMap", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "conversationLogMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "conversationLogIds", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "conversationLogIds"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "uniqueNumbers", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "uniqueNumbers"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=ConversationLogger.js.map
