"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogId = getLogId;
exports.conversationLogIdentityFunction = conversationLogIdentityFunction;
exports["default"] = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.promise");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("regenerator-runtime/runtime");

var _di = require("../../lib/di");

var _LoggerBase2 = _interopRequireDefault(require("../../lib/LoggerBase"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getDataReducer = _interopRequireDefault(require("./getDataReducer"));

var _messageTypes = _interopRequireDefault(require("../../enums/messageTypes"));

var _messageHelper = require("../../lib/messageHelper");

var _sleep = _interopRequireDefault(require("../../lib/sleep"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _selector = require("../../lib/selector");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function getLogId(_ref) {
  var conversationId = _ref.conversationId,
      date = _ref.date;
  return "".concat(conversationId, "/").concat(date);
}

function conversationLogIdentityFunction(conversation) {
  return conversation.conversationLogId;
}
/**
 * @class
 * @description Conversation logger module
 */


var ConversationLogger = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Storage', {
    dep: 'TabManager',
    optional: true
  }, 'ContactMatcher', 'ConversationMatcher', 'DateTimeFormat', 'ExtensionInfo', 'MessageStore', 'RolesAndPermissions', {
    dep: 'ConversationLoggerOptions',
    optional: false
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_LoggerBase) {
  _inherits(ConversationLogger, _LoggerBase);

  var _super = _createSuper(ConversationLogger);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   * @param {ContactMatcher} params.contactMatcher - contactMatcher module instance
   * @param {ConversationMatcher} params.conversationMatcher - conversationMatcher module instance
   * @param {DateTimeFormat} params.dateTimeFormat - dateTimeFormat module instance
   * @param {MessageStore} params.messageStore - messageStore module instance
   * @param {RolesAndPermissions} params.rolesAndPermissions - rolesAndPermissions module instance
   * @param {Storage} params.storage - storage module instance
   * @param {TabManager} params.tabManager - tabManager module instance
   * @param {Function} params.isLoggedContact - get if contact is logged
   * @param {Function} params.formatDateTime - data time format
   */
  function ConversationLogger(_ref2) {
    var _context;

    var _this;

    var auth = _ref2.auth,
        contactMatcher = _ref2.contactMatcher,
        conversationMatcher = _ref2.conversationMatcher,
        dateTimeFormat = _ref2.dateTimeFormat,
        extensionInfo = _ref2.extensionInfo,
        messageStore = _ref2.messageStore,
        rolesAndPermissions = _ref2.rolesAndPermissions,
        storage = _ref2.storage,
        tabManager = _ref2.tabManager,
        _ref2$isLoggedContact = _ref2.isLoggedContact,
        isLoggedContact = _ref2$isLoggedContact === void 0 ? function () {
      return false;
    } : _ref2$isLoggedContact,
        _ref2$isAutoUpdate = _ref2.isAutoUpdate,
        isAutoUpdate = _ref2$isAutoUpdate === void 0 ? true : _ref2$isAutoUpdate,
        _ref2$formatDateTime = _ref2.formatDateTime,
        formatDateTime = _ref2$formatDateTime === void 0 ? function () {
      return dateTimeFormat.formatDateTime.apply(dateTimeFormat, arguments);
    } : _ref2$formatDateTime,
        accordWithLogRequirement = _ref2.accordWithLogRequirement,
        options = _objectWithoutProperties(_ref2, ["auth", "contactMatcher", "conversationMatcher", "dateTimeFormat", "extensionInfo", "messageStore", "rolesAndPermissions", "storage", "tabManager", "isLoggedContact", "isAutoUpdate", "formatDateTime", "accordWithLogRequirement"]);

    _classCallCheck(this, ConversationLogger);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      name: 'conversationLogger',
      actionTypes: _actionTypes["default"],
      identityFunction: conversationLogIdentityFunction
    }));

    _initializerDefineProperty(_this, "conversationLogMap", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "conversationLogIds", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "uniqueNumbers", _descriptor3, _assertThisInitialized(_this));

    _this._auth = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, auth, 'auth');
    _this._contactMatcher = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, contactMatcher, 'contactMatcher');
    _this._conversationMatcher = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, conversationMatcher, 'conversationMatcher');
    _this._dateTimeFormat = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, dateTimeFormat, 'dateTimeFormat');
    _this._extensionInfo = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, extensionInfo, 'extensionInfo');
    _this._messageStore = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, messageStore, 'messageStore');
    _this._rolesAndPermissions = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, rolesAndPermissions, 'rolesAndPermissions');
    _this._storage = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, storage, 'storage');
    _this._tabManager = tabManager;
    _this._isLoggedContact = isLoggedContact;
    _this._formatDateTime = formatDateTime;
    _this._isAutoUpdate = isAutoUpdate;
    _this._accordWithLogRequirement = accordWithLogRequirement;
    _this._storageKey = "".concat(_this._name, "Data");

    _this._messageStore.onMessageUpdated(function (record) {
      _this._processConversationLogMap(record);
    });

    _this._storage.registerReducer({
      key: _this._storageKey,
      reducer: (0, _getDataReducer["default"])(_this.actionTypes)
    });

    _this._contactMatcher.addQuerySource({
      getQueriesFn: function getQueriesFn() {
        return _this.uniqueNumbers;
      },
      readyCheckFn: function readyCheckFn() {
        return _this._messageStore.ready && _this._extensionInfo.ready;
      }
    });

    _this._conversationMatcher.addQuerySource({
      getQueriesFn: function getQueriesFn() {
        return _this.conversationLogIds;
      },
      readyCheckFn: function readyCheckFn() {
        return _this._messageStore.ready && _this._extensionInfo.ready;
      }
    });

    _this._lastProcessedConversationLogMap = null;
    _this._autoLogQueue = [];
    _this._autoLogPromise = null;
    return _this;
  }

  _createClass(ConversationLogger, [{
    key: "_shouldInit",
    value: function _shouldInit() {
      return this.pending && this._contactMatcher.ready && this._conversationMatcher.ready && this._dateTimeFormat.ready && this._extensionInfo.ready && this._messageStore.ready && this._rolesAndPermissions.ready && this._storage.ready && (!this._tabManager || this._tabManager.ready) && this._readyCheckFunction();
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return this.ready && (!this._contactMatcher.ready || !this._conversationMatcher.ready || !this._dateTimeFormat.ready || !this._extensionInfo.ready || !this._messageStore.ready || !this._rolesAndPermissions.ready || !this._storage.ready || this._tabManager && !this._tabManager.ready || !this._readyCheckFunction());
    }
  }, {
    key: "_onReset",
    value: function _onReset() {
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
        return regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                ownerId = this._auth.ownerId;
                _context2.next = 3;
                return (0, _sleep["default"])(300);

              case 3:
                if (!(ownerId !== this._auth.ownerId)) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return");

              case 5:
                _context2.next = 7;
                return Promise.all(this._autoLogQueue.splice(0, 10).map(function (conversation) {
                  return _this2._processConversationLog({
                    conversation: conversation
                  });
                }));

              case 7:
                if (ownerId === this._auth.ownerId && this._autoLogQueue.length > 0) {
                  this._autoLogPromise = this._processQueue();
                } else {
                  this._autoLogPromise = null;
                }

              case 8:
              case "end":
                return _context2.stop();
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
    value: function _queueAutoLogConversation(_ref3) {
      var conversation = _ref3.conversation;

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
        return number && _this3._contactMatcher.dataMapping[number] ? result.concat(_this3._contactMatcher.dataMapping[number]) : result;
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

      if (lastRecord && this._conversationMatcher.dataMapping[lastRecord.conversationLogId] && this._conversationMatcher.dataMapping[lastRecord.conversationLogId].length) {
        var lastActivity = this._conversationMatcher.dataMapping[lastRecord.conversationLogId][0];

        var correspondentMatches = this._getCorrespondentMatches(lastRecord);

        return correspondentMatches.find(function (item) {
          return _this4._isLoggedContact(conversation, lastActivity, item);
        });
      }

      return null;
    }
  }, {
    key: "_processConversationLog",
    value: function () {
      var _processConversationLog2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref4) {
        var conversation, addIfNotExist, numbers, numberMap, selfNumber, selfMatches, correspondentMatches, selfEntity, correspondentEntity;
        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                conversation = _ref4.conversation;
                _context3.next = 3;
                return this._conversationMatcher.match({
                  queries: [conversation.conversationLogId]
                });

              case 3:
                if (!(this._isAutoUpdate && this._conversationMatcher.dataMapping[conversation.conversationLogId] && this._conversationMatcher.dataMapping[conversation.conversationLogId].length)) {
                  _context3.next = 8;
                  break;
                }

                _context3.next = 6;
                return this._autoLogConversation({
                  conversation: conversation
                });

              case 6:
                _context3.next = 24;
                break;

              case 8:
                if (!(this.autoLog && conversation.type === _messageTypes["default"].sms)) {
                  _context3.next = 24;
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
                _context3.next = 16;
                return this._contactMatcher.match({
                  queries: numbers
                });

              case 16:
                selfNumber = conversation.self && (conversation.self.phoneNumber || conversation.self.extensionNumber);
                selfMatches = selfNumber && this._contactMatcher.dataMapping[conversation.self] || [];
                correspondentMatches = this._getCorrespondentMatches(conversation);
                selfEntity = selfMatches && selfMatches.length === 1 && selfMatches[0] || null;
                correspondentEntity = this.getLastMatchedCorrespondentEntity(conversation);
                correspondentEntity = correspondentEntity || correspondentMatches && correspondentMatches.length === 1 && correspondentMatches[0] || null;
                _context3.next = 24;
                return this._autoLogConversation({
                  conversation: conversation,
                  selfEntity: selfEntity,
                  correspondentEntity: correspondentEntity
                });

              case 24:
              case "end":
                return _context3.stop();
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
    value: function accordWithProcessLogRequirement() {
      return !this._accordWithLogRequirement || this._accordWithLogRequirement.apply(this, arguments);
    }
  }, {
    key: "_processConversationLogMap",
    value: function _processConversationLogMap() {
      var _this5 = this;

      if (this.ready && this._lastAutoLog !== this.autoLog) {
        this._lastAutoLog = this.autoLog;

        if (this.autoLog) {
          // force conversation log checking when switch auto log to on
          this._lastProcessedConversations = null;
        }
      }

      if (this.ready && this._lastProcessedConversations !== this.conversationLogMap) {
        this._conversationMatcher.triggerMatch();

        this._contactMatcher.triggerMatch();

        var oldMap = this._lastProcessedConversations || {};
        this._lastProcessedConversations = this.conversationLogMap;

        if (!this._tabManager || this._tabManager.active) {
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
      var _autoLogConversation2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref5) {
        var conversation, selfEntity, correspondentEntity;
        return regeneratorRuntime.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                conversation = _ref5.conversation, selfEntity = _ref5.selfEntity, correspondentEntity = _ref5.correspondentEntity;
                _context4.next = 3;
                return this.log({
                  conversation: conversation,
                  selfEntity: selfEntity,
                  correspondentEntity: correspondentEntity
                });

              case 3:
              case "end":
                return _context4.stop();
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
      var _log = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref6) {
        var conversation, options;
        return regeneratorRuntime.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                conversation = _ref6.conversation, options = _objectWithoutProperties(_ref6, ["conversation"]);

                _get(_getPrototypeOf(ConversationLogger.prototype), "log", this).call(this, _objectSpread({
                  item: conversation
                }, options));

              case 2:
              case "end":
                return _context5.stop();
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
      var _logConversation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref7) {
        var _this6 = this;

        var conversationId, correspondentEntity, redirect, options;
        return regeneratorRuntime.wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                conversationId = _ref7.conversationId, correspondentEntity = _ref7.correspondentEntity, redirect = _ref7.redirect, options = _objectWithoutProperties(_ref7, ["conversationId", "correspondentEntity", "redirect"]);

                if (!this.conversationLogMap[conversationId]) {
                  _context6.next = 4;
                  break;
                }

                _context6.next = 4;
                return Promise.all(Object.keys(this.conversationLogMap[conversationId]).map(function (date) {
                  return _this6.conversationLogMap[conversationId][date];
                }).sort(_messageHelper.sortByDate).map(function (conversation, idx) {
                  var queueIndex = _this6._autoLogQueue.find(function (item) {
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
                return _context6.stop();
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
      var _setAutoLog = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(autoLog) {
        return regeneratorRuntime.wrap(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this.ready && autoLog !== this.autoLog) {
                  this.store.dispatch({
                    type: this.actionTypes.setAutoLog,
                    autoLog: autoLog
                  });
                }

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee6, this);
      }));

      function setAutoLog(_x5) {
        return _setAutoLog.apply(this, arguments);
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

      return getLogId({
        conversationId: conversationId,
        date: date
      });
    }
  }, {
    key: "available",
    get: function get() {
      var _this$_rolesAndPermis = this._rolesAndPermissions.serviceFeatures,
          SMSReceiving = _this$_rolesAndPermis.SMSReceiving,
          PagerReceiving = _this$_rolesAndPermis.PagerReceiving;
      return !!(SMSReceiving && SMSReceiving.enabled || PagerReceiving && PagerReceiving.enabled);
    }
  }, {
    key: "autoLog",
    get: function get() {
      return this._storage.getItem(this._storageKey).autoLog;
    }
  }, {
    key: "dataMapping",
    get: function get() {
      return this._conversationMatcher.dataMapping;
    }
  }]);

  return ConversationLogger;
}(_LoggerBase2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "log", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "log"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "logConversation", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "logConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAutoLog", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setAutoLog"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "conversationLogMap", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this7 = this;

    return [function () {
      return _this7._messageStore.conversationStore;
    }, function () {
      return _this7._extensionInfo.extensionNumber;
    }, function () {
      return _this7._conversationMatcher.dataMapping;
    }, function (conversationStore, extensionNumber) {
      var conversationLogMapping = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
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
          var conversationLogId = getLogId({
            conversationId: conversationId,
            date: date
          });
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
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "conversationLogIds", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this8 = this;

    return [function () {
      return _this8.conversationLogMap;
    }, function (conversationLogMap) {
      var logIds = [];
      Object.keys(conversationLogMap).forEach(function (conversationId) {
        Object.keys(conversationLogMap[conversationId]).forEach(function (date) {
          logIds.push(conversationLogMap[conversationId][date].conversationLogId);
        });
      });
      return logIds;
    }];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "uniqueNumbers", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this9 = this;

    return [function () {
      return _this9.conversationLogMap;
    }, function (conversationLogMap) {
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

      Object.keys(conversationLogMap).forEach(function (conversationId) {
        Object.keys(conversationLogMap[conversationId]).forEach(function (date) {
          var conversation = conversationLogMap[conversationId][date];
          addIfNotExist(conversation.self);
          conversation.correspondents.forEach(addIfNotExist);
        });
      });
      return output;
    }];
  }
})), _class2)) || _class);
exports["default"] = ConversationLogger;
//# sourceMappingURL=index.js.map
