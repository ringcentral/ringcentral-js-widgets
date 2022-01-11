"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_PER_PAGE = exports.DEFAULT_DAY_SPAN = exports.Conversations = void 0;
exports.getUniqueNumbers = getUniqueNumbers;

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.date.to-iso-string");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.array.for-each");

var _core = require("@ringcentral-integration/core");

var _messageDirection = require("../../enums/messageDirection");

var _messageTypes = require("../../enums/messageTypes");

var _cleanNumber = _interopRequireDefault(require("../../lib/cleanNumber"));

var _di = require("../../lib/di");

var _messageHelper = require("../../lib/messageHelper");

var _normalizeNumber = require("../../lib/normalizeNumber");

var _proxify = require("../../lib/proxy/proxify");

var _MessageSenderV = require("../MessageSenderV2");

var _conversationsStatus = require("./conversationsStatus");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function mergeMessages(messages, oldMessages) {
  var tmp = {};
  var currentMessages = [];
  messages.forEach(function (element) {
    currentMessages.push(element);
    tmp[element.id] = 1;
  });
  oldMessages.forEach(function (element) {
    if (!tmp[element.id]) {
      currentMessages.push(element);
    }
  });
  return currentMessages;
}

function getEarliestTime(messages) {
  var newTime = Date.now();
  messages.forEach(function (message) {
    var creationTime = new Date(message.creationTime).getTime();

    if (creationTime < newTime) {
      newTime = creationTime;
    }
  });
  return newTime;
}

function getUniqueNumbers(conversations) {
  var output = [];
  var numberMap = {};

  function addIfNotExist(number) {
    if (number && !numberMap[number]) {
      output.push(number);
      numberMap[number] = true;
    }
  }

  conversations.forEach(function (message) {
    if (message.from && message.direction === _messageDirection.messageDirection.inbound) {
      var fromNumber = message.from.phoneNumber || message.from.extensionNumber;
      addIfNotExist(fromNumber);
    }

    if (message.to && message.to.length > 0 && message.direction === _messageDirection.messageDirection.outbound) {
      message.to.forEach(function (toNumber) {
        if (!toNumber) {
          return;
        }

        var toPhoneNumber = toNumber.phoneNumber || toNumber.extensionNumber;
        addIfNotExist(toPhoneNumber);
      });
    }
  });
  return output;
}

var DEFAULT_PER_PAGE = 20;
exports.DEFAULT_PER_PAGE = DEFAULT_PER_PAGE;
var DEFAULT_DAY_SPAN = 90;
exports.DEFAULT_DAY_SPAN = DEFAULT_DAY_SPAN;
var Conversations = (_dec = (0, _di.Module)({
  name: 'Conversations',
  deps: ['Alert', 'Auth', 'Client', 'MessageSender', 'ExtensionInfo', 'MessageStore', 'AppFeatures', 'RegionSettings', {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'ConversationLogger',
    optional: true
  }, {
    dep: 'ConversationsOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var allUniqueNumbers = _ref.allUniqueNumbers,
      currentPage = _ref.currentPage,
      typeFilter = _ref.typeFilter,
      effectiveSearchString = _ref.effectiveSearchString;
  return [allUniqueNumbers, currentPage, typeFilter, effectiveSearchString];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that._deps.messageStore.allConversations, that.oldConversations];
}), _dec4 = (0, _core.computed)(function (_ref2) {
  var pagingConversations = _ref2.pagingConversations;
  return [pagingConversations];
}), _dec5 = (0, _core.computed)(function (_ref3) {
  var pagingConversations = _ref3.pagingConversations;
  return [pagingConversations];
}), _dec6 = (0, _core.computed)(function (_ref4) {
  var searchInput = _ref4.searchInput;
  return [searchInput];
}), _dec7 = (0, _core.computed)(function (_ref5) {
  var allConversations = _ref5.allConversations,
      typeFilter = _ref5.typeFilter;
  return [allConversations, typeFilter];
}), _dec8 = (0, _core.computed)(function (that) {
  var _that$_deps$contactMa, _that$_deps$conversat, _that$_deps$conversat2;

  return [that.typeFilteredConversations, that._deps.extensionInfo.extensionNumber, (_that$_deps$contactMa = that._deps.contactMatcher) === null || _that$_deps$contactMa === void 0 ? void 0 : _that$_deps$contactMa.dataMapping, (_that$_deps$conversat = that._deps.conversationLogger) === null || _that$_deps$conversat === void 0 ? void 0 : _that$_deps$conversat.loggingMap, (_that$_deps$conversat2 = that._deps.conversationLogger) === null || _that$_deps$conversat2 === void 0 ? void 0 : _that$_deps$conversat2.dataMapping, that._deps.auth.accessToken];
}), _dec9 = (0, _core.computed)(function (that) {
  return [that.formattedConversations, that.effectiveSearchString, that._deps.messageStore.conversationStore];
}), _dec10 = (0, _core.computed)(function (_ref6) {
  var filteredConversations = _ref6.filteredConversations,
      currentPage = _ref6.currentPage;
  return [filteredConversations, currentPage];
}), _dec11 = (0, _core.computed)(function (_ref7) {
  var typeFilteredConversations = _ref7.typeFilteredConversations;
  return [typeFilteredConversations];
}), _dec12 = (0, _core.computed)(function (that) {
  var _that$_deps$contactMa2, _that$_deps$conversat3, _that$_deps$conversat4;

  return [that.currentConversationId, that._deps.extensionInfo.extensionNumber, (_that$_deps$contactMa2 = that._deps.contactMatcher) === null || _that$_deps$contactMa2 === void 0 ? void 0 : _that$_deps$contactMa2.dataMapping, that.oldMessages, that._deps.messageStore.conversationStore, that.allConversations, that._deps.auth.accessToken, (_that$_deps$conversat3 = that._deps.conversationLogger) === null || _that$_deps$conversat3 === void 0 ? void 0 : _that$_deps$conversat3.dataMapping, (_that$_deps$conversat4 = that._deps.conversationLogger) === null || _that$_deps$conversat4 === void 0 ? void 0 : _that$_deps$conversat4.loggingMap];
}), _dec13 = (0, _core.computed)(function (_ref8) {
  var inputContents = _ref8.inputContents,
      currentConversationId = _ref8.currentConversationId;
  return [inputContents, currentConversationId];
}), _dec14 = (0, _core.computed)(function (_ref9) {
  var inputContents = _ref9.inputContents,
      currentConversationId = _ref9.currentConversationId;
  return [inputContents, currentConversationId];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Conversations, _RcModuleV);

  var _super = _createSuper(Conversations);

  function Conversations(deps) {
    var _this$_deps$conversat, _this$_deps$conversat2, _this$_deps$conversat3, _this$_deps$conversat4, _this$_deps$conversat5, _this$_deps$conversat6, _this$_deps$conversat7, _this$_deps$conversat8;

    var _this;

    _classCallCheck(this, Conversations);

    _this = _super.call(this, {
      deps: deps
    });
    _this._olderDataExisted = true;
    _this._olderMessagesExisted = true;
    _this._perPage = void 0;
    _this._daySpan = void 0;
    _this._enableLoadOldMessages = void 0;
    _this._showMMSAttachment = void 0;

    _initializerDefineProperty(_this, "searchInput", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "typeFilter", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "oldConversations", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "currentPage", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "fetchConversationsStatus", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "currentConversationId", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "oldMessages", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "fetchMessagesStatus", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "inputContents", _descriptor9, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "conversationStatus", _descriptor10, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "correspondentMatch", _descriptor11, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "correspondentResponse", _descriptor12, _assertThisInitialized(_this));

    _this._perPage = (_this$_deps$conversat = (_this$_deps$conversat2 = _this._deps.conversationsOptions) === null || _this$_deps$conversat2 === void 0 ? void 0 : _this$_deps$conversat2.perPage) !== null && _this$_deps$conversat !== void 0 ? _this$_deps$conversat : DEFAULT_PER_PAGE;
    _this._daySpan = (_this$_deps$conversat3 = (_this$_deps$conversat4 = _this._deps.conversationsOptions) === null || _this$_deps$conversat4 === void 0 ? void 0 : _this$_deps$conversat4.daySpan) !== null && _this$_deps$conversat3 !== void 0 ? _this$_deps$conversat3 : DEFAULT_DAY_SPAN;
    _this._enableLoadOldMessages = (_this$_deps$conversat5 = (_this$_deps$conversat6 = _this._deps.conversationsOptions) === null || _this$_deps$conversat6 === void 0 ? void 0 : _this$_deps$conversat6.enableLoadOldMessages) !== null && _this$_deps$conversat5 !== void 0 ? _this$_deps$conversat5 : false;
    _this._showMMSAttachment = (_this$_deps$conversat7 = (_this$_deps$conversat8 = _this._deps.conversationsOptions) === null || _this$_deps$conversat8 === void 0 ? void 0 : _this$_deps$conversat8.showMMSAttachment) !== null && _this$_deps$conversat7 !== void 0 ? _this$_deps$conversat7 : false;

    _this._deps.messageSender.on(_this._deps.messageSender.events.send, function (_ref10) {
      var toNumbers = _ref10.toNumbers;

      _this.addEntities(toNumbers.map(function (number) {
        return {
          phoneNumber: number
        };
      }));
    });

    if (_this._deps.contactMatcher) {
      _this._deps.contactMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.uniqueNumbers;
        },
        readyCheckFn: function readyCheckFn() {
          return _this._deps.messageStore.ready;
        }
      });
    }

    return _this;
  }

  _createClass(Conversations, [{
    key: "_updateSearchInput",
    value: function _updateSearchInput() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.searchInput = input;
    }
  }, {
    key: "_updateTypeFilter",
    value: function _updateTypeFilter(typeFilter) {
      this.typeFilter = typeFilter;
      this.currentPage = 1;
      this.oldConversations = [];
    }
  }, {
    key: "_updateFetchConversationsStatus",
    value: function _updateFetchConversationsStatus(status) {
      this.fetchConversationsStatus = status;
    }
  }, {
    key: "_fetchOldConversationsSuccess",
    value: function _fetchOldConversationsSuccess(records, isIncreaseCurrentPage) {
      var _this$oldConversation;

      (_this$oldConversation = this.oldConversations).push.apply(_this$oldConversation, _toConsumableArray(records.map(_messageHelper.normalizeRecord)));

      this.fetchConversationsStatus = _conversationsStatus.conversationsStatus.idle;

      if (isIncreaseCurrentPage) {
        this.currentPage += 1;
      }
    }
  }, {
    key: "_deleteOldConversation",
    value: function _deleteOldConversation(conversationId) {
      this.oldConversations = this.oldConversations.filter(function (c) {
        return String(c.conversationId) !== String(conversationId);
      });
    }
  }, {
    key: "_cleanOldConversations",
    value: function _cleanOldConversations() {
      this.oldConversations = [];
    }
  }, {
    key: "_increaseCurrentPage",
    value: function _increaseCurrentPage() {
      this.currentPage += 1;
    }
  }, {
    key: "_resetCurrentPage",
    value: function _resetCurrentPage() {
      this.currentPage = 1;
    }
  }, {
    key: "_updateCurrentConversationId",
    value: function _updateCurrentConversationId(conversationId) {
      this.currentConversationId = conversationId;
      this.oldMessages = [];
    }
  }, {
    key: "_updateFetchMessagesStatus",
    value: function _updateFetchMessagesStatus(status) {
      this.fetchMessagesStatus = status;
    }
  }, {
    key: "_fetchOldMessagesSuccess",
    value: function _fetchOldMessagesSuccess(records) {
      var _this$oldMessages;

      (_this$oldMessages = this.oldMessages).push.apply(_this$oldMessages, _toConsumableArray(records.map(_messageHelper.normalizeRecord)));

      this.fetchMessagesStatus = _conversationsStatus.conversationsStatus.idle;
    }
  }, {
    key: "_updateMessageText",
    value: function _updateMessageText(conversationId, text) {
      var existedContent = this.inputContents.find(function (content) {
        return content.conversationId === conversationId;
      });

      if (existedContent) {
        existedContent.text = text;
      } else {
        this.inputContents.push({
          conversationId: conversationId,
          text: text,
          attachments: []
        });
      }
    }
  }, {
    key: "_addAttachment",
    value: function _addAttachment(conversationId, attachment) {
      var existedContent = this.inputContents.find(function (content) {
        return content.conversationId === conversationId;
      });

      if (existedContent) {
        var attachments = (existedContent.attachments || []).filter(function (f) {
          return f.name !== attachment.name;
        });
        attachments.push(attachment);
        existedContent.attachments = attachments;
      } else {
        this.inputContents.push({
          conversationId: conversationId,
          text: '',
          attachments: [attachment]
        });
      }
    }
  }, {
    key: "_removeAttachment",
    value: function _removeAttachment(conversationId, attachment) {
      var existedContent = this.inputContents.find(function (content) {
        return content.conversationId === conversationId;
      });

      if (existedContent) {
        existedContent.attachments = existedContent.attachments.filter(function (f) {
          return f.name !== attachment.name;
        });
      }
    }
  }, {
    key: "_removeInputContent",
    value: function _removeInputContent(conversationId) {
      this.inputContents = this.inputContents.filter(function (msg) {
        return _typeof(msg) === 'object' && msg.conversationId !== conversationId;
      });
    }
  }, {
    key: "_updateConversationStatus",
    value: function _updateConversationStatus(status) {
      this.conversationStatus = status;
    }
  }, {
    key: "_addCorrespondentMatchEntities",
    value: function _addCorrespondentMatchEntities(entities) {
      this.correspondentMatch = _toConsumableArray(entities);
    }
  }, {
    key: "_removeCorrespondentMatchEntity",
    value: function _removeCorrespondentMatchEntity(entity) {
      this.correspondentMatch = this.correspondentMatch.filter(function (item) {
        return item.rawId !== entity.id && item.id !== entity.id;
      });
    }
  }, {
    key: "_addCorrespondentResponses",
    value: function _addCorrespondentResponses() {
      var responses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var phoneNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      this.correspondentResponse = responses.reduce(function (accumulator, response) {
        var to = response.to,
            from = response.from,
            direction = response.direction,
            id = response.conversation.id;
        var number = direction === 'Inbound' ? from : to[0];
        phoneNumber = number.phoneNumber || number.extensionNumber;
        return _objectSpread(_objectSpread({}, accumulator), {}, _defineProperty({}, phoneNumber, id));
      }, {});
    }
  }, {
    key: "_removeCorrespondentResponses",
    value: function _removeCorrespondentResponses(phoneNumber) {
      delete this.correspondentResponse[phoneNumber];
    }
  }, {
    key: "_resetAllStatus",
    value: function _resetAllStatus() {
      this.searchInput = '';
      this.typeFilter = _messageTypes.messageTypes.all;
      this.oldConversations = [];
      this.currentPage = 1;
      this.fetchConversationsStatus = _conversationsStatus.conversationsStatus.idle;
      this.currentConversationId = null;
      this.oldMessages = [];
      this.fetchMessagesStatus = _conversationsStatus.conversationsStatus.idle;
      this.inputContents = [];
      this.conversationStatus = _conversationsStatus.conversationsStatus.idle;
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(_get(_getPrototypeOf(Conversations.prototype), "_shouldInit", this).call(this) && this._deps.auth.loggedIn);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_get(_getPrototypeOf(Conversations.prototype), "_shouldReset", this).call(this) || this.ready && !this._deps.auth.loggedIn);
    }
  }, {
    key: "onInit",
    value: function onInit() {
      if (this._deps.contactMatcher) {
        this._deps.contactMatcher.triggerMatch();
      }
    }
  }, {
    key: "onInitSuccess",
    value: function onInitSuccess() {
      if (this.allConversations.length <= this._perPage && this._enableLoadOldMessages && this._hasPermission) {
        this.fetchOldConversations();
      }
    }
  }, {
    key: "onReset",
    value: function onReset() {
      this._olderDataExisted = true;
      this._olderMessagesExisted = true;

      this._resetAllStatus();
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;

      (0, _core.watch)(this, function () {
        return _this2.shouldTriggerMatchConditions;
      }, function () {
        if (_this2._deps.contactMatcher && _this2.ready) {
          _this2._deps.contactMatcher.triggerMatch();
        }
      });
      (0, _core.watch)(this, function () {
        return _this2._deps.messageStore.allConversations;
      }, function () {
        var newValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var oldValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        if (newValue.length < oldValue.length) {
          if (_this2.oldConversations.length > 0) {
            _this2._cleanOldConversations();

            _this2._olderDataExisted = true;
          }
        }
      });
    }
  }, {
    key: "updateSearchInput",
    value: function () {
      var _updateSearchInput2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(input) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._updateSearchInput(input);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function updateSearchInput(_x) {
        return _updateSearchInput2.apply(this, arguments);
      }

      return updateSearchInput;
    }()
  }, {
    key: "updateTypeFilter",
    value: function () {
      var _updateTypeFilter2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(type) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.typeFilter === type)) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                this._updateTypeFilter(type);

                this._olderDataExisted = true;
                this._olderMessagesExisted = true;

                if (this.pagingConversations.length <= this._perPage) {
                  this.loadNextPage();
                }

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updateTypeFilter(_x2) {
        return _updateTypeFilter2.apply(this, arguments);
      }

      return updateTypeFilter;
    }()
  }, {
    key: "fetchOldConversations",
    value: function () {
      var _fetchOldConversations = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var dateFrom, dateTo, typeFilter, currentPage, params, _yield$this$_deps$cli, records, recordsLength, isIncreaseCurrentPage;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this._olderDataExisted) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                if (!this.loadingOldConversations) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return");

              case 4:
                this._updateFetchConversationsStatus(_conversationsStatus.conversationsStatus.fetching);

                dateFrom = new Date();
                dateFrom.setDate(dateFrom.getDate() - this._daySpan);
                dateTo = new Date(this.earliestTime);

                if (dateTo.getTime() < dateFrom.getTime()) {
                  dateFrom = new Date(dateTo.getTime() - 1000 * 3600 * 24);
                }

                typeFilter = this.typeFilter;
                currentPage = this.currentPage;
                params = {
                  distinctConversations: true,
                  perPage: this._perPage,
                  dateFrom: dateFrom.toISOString(),
                  dateTo: dateTo.toISOString()
                };

                if (typeFilter === _messageTypes.messageTypes.text) {
                  params.messageType = [_messageTypes.messageTypes.sms, _messageTypes.messageTypes.pager];
                } else if (typeFilter !== _messageTypes.messageTypes.all) {
                  params.messageType = [typeFilter];
                }

                _context3.prev = 13;
                _context3.next = 16;
                return this._deps.client.account().extension().messageStore().list(params);

              case 16:
                _yield$this$_deps$cli = _context3.sent;
                records = _yield$this$_deps$cli.records;
                recordsLength = records.length;
                this._olderDataExisted = recordsLength === this._perPage;

                if (typeFilter === this.typeFilter && currentPage === this.currentPage) {
                  isIncreaseCurrentPage = recordsLength && this._perPage * this.currentPage < recordsLength + this.filteredConversations.length;

                  this._fetchOldConversationsSuccess(records, isIncreaseCurrentPage);
                }

                _context3.next = 26;
                break;

              case 23:
                _context3.prev = 23;
                _context3.t0 = _context3["catch"](13);

                if (typeFilter === this.typeFilter && currentPage === this.currentPage) {
                  this._updateFetchConversationsStatus(_conversationsStatus.conversationsStatus.idle);
                }

              case 26:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[13, 23]]);
      }));

      function fetchOldConversations() {
        return _fetchOldConversations.apply(this, arguments);
      }

      return fetchOldConversations;
    }()
  }, {
    key: "loadNextPage",
    value: function () {
      var _loadNextPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var currentPage;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                currentPage = this.currentPage;

                if (!(currentPage * this._perPage < this.filteredConversations.length)) {
                  _context4.next = 4;
                  break;
                }

                this._increaseCurrentPage();

                return _context4.abrupt("return");

              case 4:
                if (!(this.effectiveSearchString !== '')) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt("return");

              case 6:
                if (!(!this._enableLoadOldMessages || !this._hasPermission)) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt("return");

              case 8:
                _context4.next = 10;
                return this.fetchOldConversations();

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function loadNextPage() {
        return _loadNextPage.apply(this, arguments);
      }

      return loadNextPage;
    }()
  }, {
    key: "resetCurrentPage",
    value: function () {
      var _resetCurrentPage2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this._resetCurrentPage();

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function resetCurrentPage() {
        return _resetCurrentPage2.apply(this, arguments);
      }

      return resetCurrentPage;
    }()
  }, {
    key: "loadConversation",
    value: function () {
      var _loadConversation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(conversationId) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(conversationId === this.currentConversationId)) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return");

              case 2:
                this._updateCurrentConversationId(conversationId);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function loadConversation(_x3) {
        return _loadConversation.apply(this, arguments);
      }

      return loadConversation;
    }()
  }, {
    key: "unloadConversation",
    value: function () {
      var _unloadConversation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this._updateCurrentConversationId(null);

                this._olderMessagesExisted = true;

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function unloadConversation() {
        return _unloadConversation.apply(this, arguments);
      }

      return unloadConversation;
    }()
  }, {
    key: "fetchOldMessages",
    value: function () {
      var _fetchOldMessages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var perPage,
            conversationId,
            dateFrom,
            earliestTime,
            dateTo,
            params,
            _yield$this$_deps$cli2,
            records,
            _args8 = arguments;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                perPage = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : this._perPage;

                if (this._enableLoadOldMessages) {
                  _context8.next = 3;
                  break;
                }

                return _context8.abrupt("return");

              case 3:
                if (this._hasPermission) {
                  _context8.next = 5;
                  break;
                }

                return _context8.abrupt("return");

              case 5:
                if (this._olderMessagesExisted) {
                  _context8.next = 7;
                  break;
                }

                return _context8.abrupt("return");

              case 7:
                if (!this.loadingOldMessages) {
                  _context8.next = 9;
                  break;
                }

                return _context8.abrupt("return");

              case 9:
                if (this.currentConversationId) {
                  _context8.next = 11;
                  break;
                }

                return _context8.abrupt("return");

              case 11:
                this._updateFetchMessagesStatus(_conversationsStatus.conversationsStatus.fetching);

                conversationId = this.currentConversationId;
                dateFrom = new Date();
                dateFrom.setDate(dateFrom.getDate() - this._daySpan);
                earliestTime = getEarliestTime(this.currentConversation.messages);
                dateTo = new Date(earliestTime);

                if (dateTo.getTime() < dateFrom.getTime()) {
                  dateFrom.setDate(dateFrom.getDate() - 1);
                }

                params = {
                  conversationId: conversationId,
                  perPage: perPage,
                  dateFrom: dateFrom.toISOString(),
                  dateTo: dateTo.toISOString()
                };
                _context8.prev = 19;
                _context8.next = 22;
                return this._deps.client.account().extension().messageStore().list(params);

              case 22:
                _yield$this$_deps$cli2 = _context8.sent;
                records = _yield$this$_deps$cli2.records;
                this._olderMessagesExisted = records.length === perPage;

                if (conversationId === this.currentConversationId) {
                  this._fetchOldMessagesSuccess(records);
                }

                _context8.next = 31;
                break;

              case 28:
                _context8.prev = 28;
                _context8.t0 = _context8["catch"](19);

                if (conversationId === this.currentConversationId) {
                  this._updateFetchMessagesStatus(_conversationsStatus.conversationsStatus.idle);
                }

              case 31:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[19, 28]]);
      }));

      function fetchOldMessages() {
        return _fetchOldMessages.apply(this, arguments);
      }

      return fetchOldMessages;
    }()
  }, {
    key: "_alertWarning",
    value: function _alertWarning(message) {
      if (message) {
        var ttlConfig = message !== _MessageSenderV.messageSenderMessages.noAreaCode ? {
          ttl: 0
        } : null;

        this._deps.alert.warning(_objectSpread({
          message: message
        }, ttlConfig));

        return true;
      }

      return false;
    }
  }, {
    key: "updateMessageText",
    value: function () {
      var _updateMessageText2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(text) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!(text.length > 1000)) {
                  _context9.next = 2;
                  break;
                }

                return _context9.abrupt("return", this._alertWarning(_MessageSenderV.messageSenderMessages.textTooLong));

              case 2:
                this._updateMessageText(this.currentConversationId, text);

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function updateMessageText(_x4) {
        return _updateMessageText2.apply(this, arguments);
      }

      return updateMessageText;
    }()
  }, {
    key: "addAttachment",
    value: function () {
      var _addAttachment2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(attachment) {
        var attachments, size;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                attachments = this.attachments;

                if (!(attachments.length >= 10)) {
                  _context10.next = 4;
                  break;
                }

                this._alertWarning(_MessageSenderV.messageSenderMessages.attachmentCountLimitation);

                return _context10.abrupt("return");

              case 4:
                size = attachments.reduce(function (prev, curr) {
                  return prev + curr.size;
                }, 0);

                if (!(size + attachment.size > _MessageSenderV.ATTACHMENT_SIZE_LIMITATION)) {
                  _context10.next = 8;
                  break;
                }

                this._alertWarning(_MessageSenderV.messageSenderMessages.attachmentSizeLimitation);

                return _context10.abrupt("return");

              case 8:
                this._addAttachment(this.currentConversationId, attachment);

              case 9:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function addAttachment(_x5) {
        return _addAttachment2.apply(this, arguments);
      }

      return addAttachment;
    }()
  }, {
    key: "removeAttachment",
    value: function () {
      var _removeAttachment2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(attachment) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                this._removeAttachment(this.currentConversationId, attachment);

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function removeAttachment(_x6) {
        return _removeAttachment2.apply(this, arguments);
      }

      return removeAttachment;
    }()
  }, {
    key: "replyToReceivers",
    value: function () {
      var _replyToReceivers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(text) {
        var attachments,
            responses,
            _args12 = arguments;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                attachments = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : [];

                this._updateConversationStatus(_conversationsStatus.conversationsStatus.pushing);

                _context12.prev = 2;
                _context12.next = 5;
                return this._deps.messageSender.send({
                  fromNumber: this._getFromNumber(),
                  toNumbers: this._getToNumbers(),
                  text: text,
                  attachments: attachments,
                  replyOnMessageId: this._getReplyOnMessageId()
                });

              case 5:
                responses = _context12.sent;

                if (!(responses && responses[0])) {
                  _context12.next = 11;
                  break;
                }

                this._deps.messageStore.pushMessage(responses[0]);

                this._updateConversationStatus(_conversationsStatus.conversationsStatus.idle);

                this._removeInputContent(this.currentConversationId);

                return _context12.abrupt("return", responses[0]);

              case 11:
                this._onReplyError();

                return _context12.abrupt("return", null);

              case 15:
                _context12.prev = 15;
                _context12.t0 = _context12["catch"](2);

                this._onReplyError();

                throw _context12.t0;

              case 19:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[2, 15]]);
      }));

      function replyToReceivers(_x7) {
        return _replyToReceivers.apply(this, arguments);
      }

      return replyToReceivers;
    }()
  }, {
    key: "_onReplyError",
    value: function _onReplyError() {
      this._updateConversationStatus(_conversationsStatus.conversationsStatus.idle);
    }
  }, {
    key: "_getReplyOnMessageId",
    value: function _getReplyOnMessageId() {
      var messageList = this.currentConversation.messages;
      var lastMessage = messageList && messageList.length > 0 && messageList[messageList.length - 1];

      if (lastMessage && lastMessage.id) {
        return lastMessage.id;
      }

      return null;
    }
  }, {
    key: "_getFromNumber",
    value: function _getFromNumber() {
      var senderNumber = this.currentConversation.senderNumber;

      if (!senderNumber) {
        return null;
      }

      return senderNumber.extensionNumber || senderNumber.phoneNumber;
    }
  }, {
    key: "_getToNumbers",
    value: function _getToNumbers() {
      var recipients = this.currentConversation.recipients;
      return recipients.map(function (recipient) {
        return recipient.extensionNumber || recipient.phoneNumber;
      });
    }
  }, {
    key: "deleteConversation",
    value: function () {
      var _deleteConversation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(conversationId) {
        var conversation;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (conversationId) {
                  _context13.next = 2;
                  break;
                }

                return _context13.abrupt("return");

              case 2:
                if (!this._deps.messageStore.conversationStore[conversationId]) {
                  _context13.next = 6;
                  break;
                }

                _context13.next = 5;
                return this._deps.messageStore.deleteConversationMessages(conversationId);

              case 5:
                return _context13.abrupt("return");

              case 6:
                conversation = this.allConversations.find(function (c) {
                  return c.conversationId === conversationId;
                });

                if (conversation) {
                  _context13.next = 9;
                  break;
                }

                return _context13.abrupt("return");

              case 9:
                if (!(0, _messageHelper.messageIsTextMessage)(conversation)) {
                  _context13.next = 13;
                  break;
                }

                _context13.next = 12;
                return this._deps.messageStore.deleteConversation(conversationId);

              case 12:
                return _context13.abrupt("return");

              case 13:
                _context13.prev = 13;
                _context13.next = 16;
                return this._deps.messageStore.deleteMessageApi(conversationId);

              case 16:
                this._deleteOldConversation(conversationId);

                _context13.next = 22;
                break;

              case 19:
                _context13.prev = 19;
                _context13.t0 = _context13["catch"](13);
                console.error(_context13.t0);

              case 22:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this, [[13, 19]]);
      }));

      function deleteConversation(_x8) {
        return _deleteConversation.apply(this, arguments);
      }

      return deleteConversation;
    }()
  }, {
    key: "addEntities",
    value: function addEntities(entities) {
      this._addCorrespondentMatchEntities(entities);
    }
  }, {
    key: "removeEntity",
    value: function removeEntity(entity) {
      this._removeCorrespondentMatchEntity(entity);
    }
  }, {
    key: "addResponses",
    value: function addResponses(responses) {
      this._addCorrespondentResponses(responses);
    }
  }, {
    key: "removeResponse",
    value: function removeResponse(phoneNumber) {
      this._removeCorrespondentResponses(phoneNumber);
    }
  }, {
    key: "relateCorrespondentEntity",
    value: function relateCorrespondentEntity(responses) {
      var _this3 = this;

      if (!this._deps.contactMatcher || !this._deps.conversationLogger || !this.correspondentMatch.length) {
        return;
      }

      this.addResponses(responses);
      var _this$_deps$regionSet = this._deps.regionSettings,
          countryCode = _this$_deps$regionSet.countryCode,
          areaCode = _this$_deps$regionSet.areaCode;
      var formattedCorrespondentMatch = this.correspondentMatch.map(function (item) {
        var formatted = (0, _normalizeNumber.normalizeNumber)({
          phoneNumber: item.phoneNumber,
          countryCode: countryCode,
          areaCode: areaCode,
          removeExtension: false
        });
        return {
          phoneNumber: formatted,
          id: item.rawId
        };
      });
      formattedCorrespondentMatch.forEach(function (item) {
        var phoneNumber = item.phoneNumber;
        var conversationId = _this3.correspondentResponse[phoneNumber];

        if (_this3._deps.conversationLogger.autoLog) {
          _this3._deps.conversationLogger.logConversation({
            entity: item,
            conversationId: conversationId
          });
        }

        _this3.removeEntity(item);

        _this3.removeResponse(phoneNumber);
      });
    }
  }, {
    key: "shouldTriggerMatchConditions",
    get: function get() {
      return [this.allUniqueNumbers, this.currentPage, this.typeFilter, this.effectiveSearchString];
    }
  }, {
    key: "allConversations",
    get: function get() {
      var conversations = this._deps.messageStore.allConversations;
      var oldConversations = this.oldConversations;

      if (oldConversations.length === 0) {
        return conversations;
      }

      var newConversations = [];
      var conversationMap = {};

      var pushConversation = function pushConversation(c) {
        // use conversationId when available, use id for VoiceMail/Fax/etc..
        var cid = c.conversationId || c.id;

        if (conversationMap[cid]) {
          return;
        }

        newConversations.push(c);
        conversationMap[cid] = 1;
      };

      conversations.forEach(pushConversation);
      oldConversations.forEach(pushConversation);
      return newConversations;
    }
  }, {
    key: "uniqueNumbers",
    get: function get() {
      return getUniqueNumbers(this.pagingConversations);
    }
  }, {
    key: "allUniqueNumbers",
    get: function get() {
      return getUniqueNumbers(this.allConversations);
    }
  }, {
    key: "effectiveSearchString",
    get: function get() {
      if (this.searchInput.length >= 3) {
        return this.searchInput;
      }

      return '';
    }
  }, {
    key: "typeFilteredConversations",
    get: function get() {
      var _this4 = this;

      var typeFilter = this.typeFilter;
      var allConversations = this.allConversations;

      switch (typeFilter) {
        case _messageTypes.messageTypes.text:
          return allConversations.filter(_messageHelper.messageIsTextMessage);

        case _messageTypes.messageTypes.voiceMail:
          return allConversations.filter(_messageHelper.messageIsVoicemail);

        case _messageTypes.messageTypes.fax:
          return allConversations.filter(_messageHelper.messageIsFax);

        default:
          return allConversations.filter(function (conversation) {
            return (_this4._deps.appFeatures.hasReadTextPermission || !(0, _messageHelper.messageIsTextMessage)(conversation)) && (_this4._deps.appFeatures.hasVoicemailPermission || !(0, _messageHelper.messageIsVoicemail)(conversation)) && (_this4._deps.appFeatures.hasReadFaxPermission || !(0, _messageHelper.messageIsFax)(conversation));
          });
      }
    }
  }, {
    key: "formattedConversations",
    get: function get() {
      var _this5 = this;

      var conversations = this.typeFilteredConversations;
      var extensionNumber = this._deps.extensionInfo.extensionNumber;
      var contactMapping = this._deps.contactMatcher && this._deps.contactMatcher.dataMapping || {};
      var loggingMap = this._deps.conversationLogger && this._deps.conversationLogger.loggingMap || {};
      var conversationLogMapping = this._deps.conversationLogger && this._deps.conversationLogger.dataMapping || {};
      var accessToken = this._deps.auth.accessToken;
      return conversations.map(function (message) {
        var _getNumbersFromMessag = (0, _messageHelper.getNumbersFromMessage)({
          extensionNumber: extensionNumber,
          message: message
        }),
            self = _getNumbersFromMessag.self,
            correspondents = _getNumbersFromMessag.correspondents;

        var selfNumber = self && (self.phoneNumber || self.extensionNumber);
        var selfMatches = selfNumber && contactMapping[selfNumber] || [];
        var correspondentMatches = correspondents.reduce(function (matches, contact) {
          var number = contact && (contact.phoneNumber || contact.extensionNumber);
          return number && contactMapping[number] && contactMapping[number].length ? matches.concat(contactMapping[number]) : matches;
        }, []);
        var conversationLogId = _this5._deps.conversationLogger ? _this5._deps.conversationLogger.getConversationLogId(message) : null;
        var isLogging = !!(conversationLogId && loggingMap[conversationLogId]);
        var conversationMatches = conversationLogMapping[conversationLogId] || [];
        var voicemailAttachment = null;

        if ((0, _messageHelper.messageIsVoicemail)(message)) {
          voicemailAttachment = (0, _messageHelper.getVoicemailAttachment)(message, accessToken);
        }

        var faxAttachment = null;

        if ((0, _messageHelper.messageIsFax)(message)) {
          faxAttachment = (0, _messageHelper.getFaxAttachment)(message, accessToken);
        }

        var unreadCounts = message.unreadCounts;

        if (typeof unreadCounts === 'undefined') {
          unreadCounts = (0, _messageHelper.messageIsUnread)(message) ? 1 : 0;
        }

        var mmsAttachments = [];

        if ((0, _messageHelper.messageIsTextMessage)(message) && _this5._showMMSAttachment) {
          mmsAttachments = (0, _messageHelper.getMMSAttachments)(message, accessToken);
        }

        return _objectSpread(_objectSpread({}, message), {}, {
          unreadCounts: unreadCounts,
          self: self,
          selfMatches: selfMatches,
          correspondents: correspondents,
          correspondentMatches: correspondentMatches,
          conversationLogId: conversationLogId,
          isLogging: isLogging,
          conversationMatches: conversationMatches,
          voicemailAttachment: voicemailAttachment,
          faxAttachment: faxAttachment,
          mmsAttachments: mmsAttachments,
          lastMatchedCorrespondentEntity: _this5._deps.conversationLogger && _this5._deps.conversationLogger.getLastMatchedCorrespondentEntity(message) || null
        });
      });
    }
  }, {
    key: "filteredConversations",
    get: function get() {
      var _this6 = this;

      var conversations = this.formattedConversations;
      var effectiveSearchString = this.effectiveSearchString;

      if (effectiveSearchString === '') {
        return conversations;
      }

      var searchResults = [];
      var cleanRegex = /[^\d*+#\s]/g;
      var searchString = effectiveSearchString.toLowerCase();
      var searchNumber = effectiveSearchString.replace(cleanRegex, '');
      conversations.forEach(function (message) {
        if (searchNumber === effectiveSearchString) {
          var cleanedNumber = (0, _cleanNumber["default"])(effectiveSearchString);

          if (message.correspondents.find(function (contact) {
            return (0, _cleanNumber["default"])(contact.phoneNumber || contact.extensionNumber || '').indexOf(cleanedNumber) > -1;
          })) {
            // match by phoneNumber or extensionNumber
            searchResults.push(_objectSpread(_objectSpread({}, message), {}, {
              matchOrder: 0
            }));
            return;
          }
        }

        if (message.correspondentMatches.length) {
          if (message.correspondentMatches.find(function (entity) {
            return (entity.name || '').toLowerCase().indexOf(searchString) > -1;
          })) {
            // match by entity's name
            searchResults.push(_objectSpread(_objectSpread({}, message), {}, {
              matchOrder: 0
            }));
            return;
          }
        } else if (message.correspondents.find(function (contact) {
          return (contact.name || '').toLowerCase().indexOf(searchString) > -1;
        })) {
          searchResults.push(_objectSpread(_objectSpread({}, message), {}, {
            matchOrder: 0
          }));
          return;
        } // try match messages of the same conversation


        if ((message.subject || '').toLowerCase().indexOf(searchString) > -1) {
          searchResults.push(_objectSpread(_objectSpread({}, message), {}, {
            matchOrder: 1
          }));
          return;
        }

        var messageList = _this6._deps.messageStore.conversationStore[message.conversationId] || [];
        var matchedMessage = messageList.find(function (item) {
          return (item.subject || '').toLowerCase().indexOf(searchString) > -1;
        });

        if (matchedMessage) {
          searchResults.push(_objectSpread(_objectSpread({}, message), {}, {
            matchedMessage: matchedMessage,
            matchOrder: 1
          }));
        }
      });
      return searchResults.sort(_messageHelper.sortSearchResults);
    }
  }, {
    key: "pagingConversations",
    get: function get() {
      var pageNumber = this.currentPage;
      var lastIndex = pageNumber * this._perPage;
      return this.filteredConversations.slice(0, lastIndex);
    }
  }, {
    key: "earliestTime",
    get: function get() {
      return getEarliestTime(this.typeFilteredConversations);
    }
  }, {
    key: "currentConversation",
    get: function get() {
      var _this7 = this;

      var conversationId = this.currentConversationId;
      var extensionNumber = this._deps.extensionInfo.extensionNumber;
      var contactMapping = this._deps.contactMatcher && this._deps.contactMatcher.dataMapping || {};
      var oldMessages = this.oldMessages;
      var conversationStore = this._deps.messageStore.conversationStore;
      var conversations = this.allConversations;
      var accessToken = this._deps.auth.accessToken;
      var conversationLogMapping = this._deps.conversationLogger && this._deps.conversationLogger.dataMapping || {};
      var loggingMap = this._deps.conversationLogger && this._deps.conversationLogger.loggingMap || {};
      var conversation = conversations.find(function (c) {
        return c.conversationId === conversationId;
      });
      var messages = [].concat(conversationStore[conversationId] || []);

      var currentConversation = _objectSpread({}, conversation);

      var allMessages = mergeMessages(messages, oldMessages).map(function (m) {
        if (!_this7._showMMSAttachment) {
          return m;
        }

        var mmsAttachments = (0, _messageHelper.getMMSAttachments)(m, accessToken);
        return _objectSpread(_objectSpread({}, m), {}, {
          mmsAttachments: mmsAttachments
        });
      });

      var _getNumbersFromMessag2 = (0, _messageHelper.getNumbersFromMessage)({
        extensionNumber: extensionNumber,
        message: conversation
      }),
          _getNumbersFromMessag3 = _getNumbersFromMessag2.correspondents,
          correspondents = _getNumbersFromMessag3 === void 0 ? [] : _getNumbersFromMessag3;

      var correspondentMatches = correspondents.reduce(function (matches, contact) {
        var number = contact && (contact.phoneNumber || contact.extensionNumber);
        return number && contactMapping[number] && contactMapping[number].length ? matches.concat(contactMapping[number]) : matches;
      }, []);
      var conversationLogId = this._deps.conversationLogger ? this._deps.conversationLogger.getConversationLogId(conversation) : null;
      var conversationMatches = conversationLogMapping[conversationLogId] || [];
      currentConversation.correspondents = correspondents;
      currentConversation.correspondentMatches = correspondentMatches;
      currentConversation.conversationMatches = conversationMatches;
      currentConversation.messages = allMessages.reverse();
      currentConversation.senderNumber = (0, _messageHelper.getMyNumberFromMessage)({
        message: conversation,
        myExtensionNumber: this._deps.extensionInfo.extensionNumber
      });
      currentConversation.recipients = (0, _messageHelper.getRecipientNumbersFromMessage)({
        message: conversation,
        myNumber: currentConversation.senderNumber
      });
      currentConversation.isLogging = !!(conversationLogId && loggingMap[conversationLogId]);
      currentConversation.lastMatchedCorrespondentEntity = this._deps.conversationLogger && conversation && this._deps.conversationLogger.getLastMatchedCorrespondentEntity(conversation) || null;
      return currentConversation;
    }
  }, {
    key: "messageText",
    get: function get() {
      var conversationId = this.currentConversationId;
      var res = this.inputContents.find(function (msg) {
        return _typeof(msg) === 'object' && msg.conversationId === conversationId;
      });
      return res ? res.text : '';
    }
  }, {
    key: "attachments",
    get: function get() {
      var conversationId = this.currentConversationId;
      var res = this.inputContents.find(function (msg) {
        return _typeof(msg) === 'object' && msg.conversationId === conversationId;
      });
      return res ? res.attachments : [];
    }
  }, {
    key: "loadingOldConversations",
    get: function get() {
      return this.fetchConversationsStatus === _conversationsStatus.conversationsStatus.fetching;
    }
  }, {
    key: "loadingOldMessages",
    get: function get() {
      return this.fetchMessagesStatus === _conversationsStatus.conversationsStatus.fetching;
    }
  }, {
    key: "pushing",
    get: function get() {
      return this.conversationStatus === _conversationsStatus.conversationsStatus.pushing;
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return this._deps.appFeatures.hasReadMessagesPermission;
    }
  }]);

  return Conversations;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "searchInput", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "typeFilter", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _messageTypes.messageTypes.all;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "oldConversations", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "currentPage", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "fetchConversationsStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _conversationsStatus.conversationsStatus.idle;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "currentConversationId", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "oldMessages", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "fetchMessagesStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _conversationsStatus.conversationsStatus.idle;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "inputContents", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "conversationStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _conversationsStatus.conversationsStatus.idle;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "correspondentMatch", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "correspondentResponse", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_updateSearchInput", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateSearchInput"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateTypeFilter", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateTypeFilter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateFetchConversationsStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateFetchConversationsStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fetchOldConversationsSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetchOldConversationsSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_deleteOldConversation", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_deleteOldConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_cleanOldConversations", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_cleanOldConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_increaseCurrentPage", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_increaseCurrentPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_resetCurrentPage", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_resetCurrentPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateCurrentConversationId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateCurrentConversationId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateFetchMessagesStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateFetchMessagesStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fetchOldMessagesSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetchOldMessagesSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateMessageText", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateMessageText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addAttachment", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_addAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeAttachment", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeInputContent", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeInputContent"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateConversationStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateConversationStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addCorrespondentMatchEntities", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_addCorrespondentMatchEntities"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeCorrespondentMatchEntity", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeCorrespondentMatchEntity"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addCorrespondentResponses", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_addCorrespondentResponses"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeCorrespondentResponses", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeCorrespondentResponses"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_resetAllStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_resetAllStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shouldTriggerMatchConditions", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "shouldTriggerMatchConditions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSearchInput", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSearchInput"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateTypeFilter", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateTypeFilter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchOldConversations", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchOldConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadNextPage", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "loadNextPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetCurrentPage", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "resetCurrentPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadConversation", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "loadConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unloadConversation", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "unloadConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchOldMessages", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchOldMessages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMessageText", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMessageText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addAttachment", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "addAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeAttachment", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "removeAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "replyToReceivers", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "replyToReceivers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteConversation", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allConversations", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "allConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "uniqueNumbers", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "uniqueNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allUniqueNumbers", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "allUniqueNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "effectiveSearchString", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "effectiveSearchString"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "typeFilteredConversations", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "typeFilteredConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "formattedConversations", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "formattedConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "filteredConversations", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "filteredConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pagingConversations", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "pagingConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "earliestTime", [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "earliestTime"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentConversation", [_dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "currentConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "messageText", [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "messageText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "attachments", [_dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "attachments"), _class2.prototype)), _class2)) || _class);
exports.Conversations = Conversations;
//# sourceMappingURL=Conversations.js.map
