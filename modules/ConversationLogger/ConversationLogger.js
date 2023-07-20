"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.find-index");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.reduce");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.array.sort");
require("core-js/modules/es.array.splice");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.object.values");
require("core-js/modules/es.promise");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.iterator");
require("core-js/modules/es.string.match");
require("core-js/modules/web.dom-collections.for-each");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversationLogger = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _utils = require("@ringcentral-integration/utils");
var _messageTypes = require("../../enums/messageTypes");
var _di = require("../../lib/di");
var _LoggerBase2 = require("../../lib/LoggerBase");
var _messageHelper = require("../../lib/messageHelper");
var _proxify = require("../../lib/proxy/proxify");
var _conversationLoggerHelper = require("./conversationLoggerHelper");
var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
var ConversationLogger = (_dec = (0, _di.Module)({
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
  _inherits(ConversationLogger, _LoggerBase);
  var _super = _createSuper(ConversationLogger);
  function ConversationLogger(deps) {
    var _this$_deps$conversat, _this$_deps$conversat2, _this$_deps$conversat3;
    var _this;
    _classCallCheck(this, ConversationLogger);
    _this = _super.call(this, deps, {
      enableCache: true,
      storageKey: 'ConversationLogger'
    });
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
    _initializerDefineProperty(_this, "_autoLog", _descriptor, _assertThisInitialized(_this));
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
  _createClass(ConversationLogger, [{
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(_get(_getPrototypeOf(ConversationLogger.prototype), "_shouldInit", this).call(this) && this._readyCheckFunction());
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_get(_getPrototypeOf(ConversationLogger.prototype), "_shouldReset", this).call(this) || this.ready && !this._readyCheckFunction());
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
      var _processQueue2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;
        var ownerId;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ownerId = this._deps.auth.ownerId;
                _context.next = 3;
                return (0, _utils.sleep)(300);
              case 3:
                if (!(ownerId !== this._deps.auth.ownerId)) {
                  _context.next = 5;
                  break;
                }
                return _context.abrupt("return");
              case 5:
                _context.next = 7;
                return Promise.all(this._autoLogQueue.splice(0, 10).map(function (conversation) {
                  return _this2._processConversationLog({
                    conversation: conversation
                  });
                }));
              case 7:
                if (ownerId === this._deps.auth.ownerId && this._autoLogQueue.length > 0) {
                  this._autoLogPromise = this._processQueue();
                } else {
                  this._autoLogPromise = null;
                }
              case 8:
              case "end":
                return _context.stop();
            }
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
    value: function () {
      var _processConversationLog2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
        var conversation, addIfNotExist, numbers, numberMap, selfNumber, selfMatches, correspondentMatches, selfEntity, correspondentEntity;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                conversation = _ref2.conversation;
                _context2.next = 3;
                return this._deps.conversationMatcher.match({
                  queries: [conversation.conversationLogId]
                });
              case 3:
                if (!(this._isAutoUpdate && this._deps.conversationMatcher.dataMapping[conversation.conversationLogId] && this._deps.conversationMatcher.dataMapping[conversation.conversationLogId].length)) {
                  _context2.next = 8;
                  break;
                }
                _context2.next = 6;
                return this._autoLogConversation({
                  conversation: conversation
                });
              case 6:
                _context2.next = 24;
                break;
              case 8:
                if (!(this.autoLog && conversation.type === _messageTypes.messageTypes.sms)) {
                  _context2.next = 24;
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
                addIfNotExist(conversation.self);
                conversation.correspondents.forEach(addIfNotExist);
                _context2.next = 16;
                return this._deps.contactMatcher.match({
                  queries: numbers
                });
              case 16:
                selfNumber = conversation.self && (conversation.self.phoneNumber || conversation.self.extensionNumber);
                selfMatches = selfNumber && this._deps.contactMatcher.dataMapping[selfNumber] || [];
                correspondentMatches = this._getCorrespondentMatches(conversation);
                selfEntity = selfMatches && selfMatches.length === 1 && selfMatches[0] || null;
                correspondentEntity = this.getLastMatchedCorrespondentEntity(conversation);
                correspondentEntity = correspondentEntity || correspondentMatches && correspondentMatches.length === 1 && correspondentMatches[0] || null;
                _context2.next = 24;
                return this._autoLogConversation({
                  conversation: conversation,
                  selfEntity: selfEntity,
                  correspondentEntity: correspondentEntity
                });
              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function _processConversationLog(_x) {
        return _processConversationLog2.apply(this, arguments);
      }
      return _processConversationLog;
    }()
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
    value: function _processConversationLogMap( /** use for outside extend module */
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
      var _autoLogConversation2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref3) {
        var conversation, selfEntity, correspondentEntity;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                conversation = _ref3.conversation, selfEntity = _ref3.selfEntity, correspondentEntity = _ref3.correspondentEntity;
                _context3.next = 3;
                return this.log({
                  conversation: conversation,
                  selfEntity: selfEntity,
                  correspondentEntity: correspondentEntity
                });
              case 3:
              case "end":
                return _context3.stop();
            }
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
      var _log = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref4) {
        var conversation, options;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                conversation = _ref4.conversation, options = _objectWithoutProperties(_ref4, ["conversation"]);
                _get(_getPrototypeOf(ConversationLogger.prototype), "log", this).call(this, _objectSpread({
                  item: conversation
                }, options));
              case 2:
              case "end":
                return _context4.stop();
            }
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
      var _logConversation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref5) {
        var _this6 = this;
        var conversationId, correspondentEntity, redirect, options;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                conversationId = _ref5.conversationId, correspondentEntity = _ref5.correspondentEntity, redirect = _ref5.redirect, options = _objectWithoutProperties(_ref5, ["conversationId", "correspondentEntity", "redirect"]);
                if (!this.conversationLogMap[conversationId]) {
                  _context5.next = 4;
                  break;
                }
                _context5.next = 4;
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
              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function logConversation(_x4) {
        return _logConversation.apply(this, arguments);
      }
      return logConversation;
    }()
  }, {
    key: "setAutoLog",
    value: function () {
      var _setAutoLog2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(autoLog) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this.ready && autoLog !== this.autoLog) {
                  this._setAutoLog(autoLog);
                }
              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function setAutoLog(_x5) {
        return _setAutoLog2.apply(this, arguments);
      }
      return setAutoLog;
    }()
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
    key: "autoLog",
    get: function get() {
      return this._autoLog;
    }
  }, {
    key: "available",
    get: function get() {
      return this._deps.appFeatures.hasReadTextPermission;
    }
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
      function addIfNotExist() {
        var contact = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var number = contact.phoneNumber || contact.extensionNumber;
        if (number && !numberMap[number]) {
          output.push(number);
          numberMap[number] = true;
        }
      }
      Object.keys(this.conversationLogMap).forEach(function (conversationId) {
        Object.keys(_this9.conversationLogMap[conversationId]).forEach(function (date) {
          var conversation = _this9.conversationLogMap[conversationId][date];
          addIfNotExist(conversation.self);
          conversation.correspondents.forEach(addIfNotExist);
        });
      });
      return output;
    }
  }, {
    key: "dataMapping",
    get: function get() {
      return this._deps.conversationMatcher.dataMapping;
    }
  }]);
  return ConversationLogger;
}(_LoggerBase2.LoggerBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_autoLog", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setAutoLog", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setAutoLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "log", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "log"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "logConversation", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "logConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAutoLog", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setAutoLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "conversationLogMap", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "conversationLogMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "conversationLogIds", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "conversationLogIds"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "uniqueNumbers", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "uniqueNumbers"), _class2.prototype)), _class2)) || _class);
exports.ConversationLogger = ConversationLogger;
//# sourceMappingURL=ConversationLogger.js.map
