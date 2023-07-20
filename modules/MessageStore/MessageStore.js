"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.find-index");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.join");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.reduce");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.array.some");
require("core-js/modules/es.array.sort");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.for-each");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageStore = void 0;
require("regenerator-runtime/runtime");
var _events = require("events");
var _core = require("@ringcentral-integration/core");
var _utils = require("@ringcentral-integration/utils");
var _subscriptionFilters = require("../../enums/subscriptionFilters");
var _batchApiHelper = require("../../lib/batchApiHelper");
var _debounceThrottle = require("../../lib/debounce-throttle");
var _di = require("../../lib/di");
var messageHelper = _interopRequireWildcard(require("../../lib/messageHelper"));
var _proxify = require("../../lib/proxy/proxify");
var _trackEvents = require("../../enums/trackEvents");
var _CallingSettings = require("../CallingSettings");
var _DataFetcherV = require("../DataFetcherV2");
var _messageStoreErrors = require("./messageStoreErrors");
var _messageStoreHelper = require("./messageStoreHelper");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var DEFAULT_CONVERSATIONS_LOAD_LENGTH = 10;
var DEFAULT_CONVERSATION_LOAD_LENGTH = 100;
var DEFAULT_POLLING_INTERVAL = 30 * 60 * 1000; // 30 min
var DEFAULT_TTL = 5 * 60 * 1000; // 5 min
var DEFAULT_RETRY = 62 * 1000; // 62 sec

var DEFAULT_DAY_SPAN = 7; // default to load 7 days messages
var DEFAULT_MESSAGES_FILTER = function DEFAULT_MESSAGES_FILTER(list) {
  return list;
};
var UPDATE_MESSAGE_ONCE_COUNT = 20; // Number of messages to be updated in one time

// reference: https://developers.ringcentral.com/api-reference/Message-Store/syncMessages
var INVALID_TOKEN_ERROR_CODES = ['CMN-101', 'MSG-333'];

/**
 * Messages data managing module
 * fetch conversations
 * handle new message subscription
 */
var MessageStore = (_dec = (0, _di.Module)({
  name: 'MessageStore',
  deps: ['Alert', 'Auth', 'Client', 'DataFetcherV2', 'Subscription', 'ConnectivityMonitor', 'AppFeatures', {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'MessageStoreOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(_trackEvents.trackEvents.flagVoicemail), _dec3 = (0, _core.track)(function (that, conversationId) {
  var _that$conversationSto;
  // @ts-expect-error
  var _ref = (_that$conversationSto = that.conversationStore[conversationId]) !== null && _that$conversationSto !== void 0 ? _that$conversationSto : [],
    _ref2 = _slicedToArray(_ref, 1),
    conversation = _ref2[0];
  if (!conversation) return;
  if (conversation.type === 'VoiceMail') {
    return [_trackEvents.trackEvents.deleteVoicemail];
  }
  if (conversation.type === 'Fax') {
    return [_trackEvents.trackEvents.deleteFax];
  }
}), _dec4 = (0, _core.track)(_trackEvents.trackEvents.clickToSMSVoicemailList), _dec5 = (0, _core.track)(function (_, action) {
  if (action.fromType === 'Pager' || action.fromType === 'SMS') {
    return [_trackEvents.trackEvents.clickToDialTextList];
  }
  if (action.fromType === 'VoiceMail') {
    return [_trackEvents.trackEvents.clickToDialVoicemailList];
  }
}), _dec6 = (0, _core.track)(function (that) {
  var _callingSettings;
  if (
  // TODO: refactor for Analytics
  ((_callingSettings = that.parentModule.callingSettings) === null || _callingSettings === void 0 ? void 0 : _callingSettings.callingMode) === _CallingSettings.callingModes.ringout) {
    return [_trackEvents.trackEvents.callPlaceRingOutCallSMSHistory];
  }
}), _dec7 = (0, _core.computed)(function (that) {
  var _that$data;
  return [(_that$data = that.data) === null || _that$data === void 0 ? void 0 : _that$data.conversationStore];
}), _dec8 = (0, _core.computed)(function (that) {
  var _that$data2;
  return [(_that$data2 = that.data) === null || _that$data2 === void 0 ? void 0 : _that$data2.conversationList, that.conversationStore];
}), _dec9 = (0, _core.computed)(function (that) {
  return [that.allConversations];
}), _dec10 = (0, _core.computed)(function (that) {
  return [that.textConversations];
}), _dec11 = (0, _core.computed)(function (that) {
  return [that.allConversations];
}), _dec12 = (0, _core.computed)(function (that) {
  return [that.faxMessages];
}), _dec13 = (0, _core.computed)(function (that) {
  return [that.allConversations];
}), _dec14 = (0, _core.computed)(function (that) {
  return [that.voicemailMessages];
}), _dec15 = (0, _core.computed)(function (that) {
  return [that.voiceUnreadCounts, that.textUnreadCounts, that.faxUnreadCounts];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DataFetcherV2Consume) {
  _inherits(MessageStore, _DataFetcherV2Consume);
  var _super = _createSuper(MessageStore);
  function MessageStore(deps) {
    var _this$_deps$messageSt, _this$_deps$messageSt2, _this$_deps$messageSt3, _this$_deps$messageSt4, _this$_deps$messageSt5, _this$_deps$messageSt6, _this$_deps$messageSt7, _this$_deps$messageSt8, _this$_deps$messageSt9;
    var _this;
    _classCallCheck(this, MessageStore);
    _this = _super.call(this, {
      deps: deps
    });
    _this._conversationsLoadLength = (_this$_deps$messageSt = (_this$_deps$messageSt2 = _this._deps.messageStoreOptions) === null || _this$_deps$messageSt2 === void 0 ? void 0 : _this$_deps$messageSt2.conversationsLoadLength) !== null && _this$_deps$messageSt !== void 0 ? _this$_deps$messageSt : DEFAULT_CONVERSATIONS_LOAD_LENGTH;
    _this._conversationLoadLength = (_this$_deps$messageSt3 = (_this$_deps$messageSt4 = _this._deps.messageStoreOptions) === null || _this$_deps$messageSt4 === void 0 ? void 0 : _this$_deps$messageSt4.conversationLoadLength) !== null && _this$_deps$messageSt3 !== void 0 ? _this$_deps$messageSt3 : DEFAULT_CONVERSATION_LOAD_LENGTH;
    _this._messagesFilter = (_this$_deps$messageSt5 = (_this$_deps$messageSt6 = _this._deps.messageStoreOptions) === null || _this$_deps$messageSt6 === void 0 ? void 0 : _this$_deps$messageSt6.messagesFilter) !== null && _this$_deps$messageSt5 !== void 0 ? _this$_deps$messageSt5 : DEFAULT_MESSAGES_FILTER;
    _this._daySpan = (_this$_deps$messageSt7 = (_this$_deps$messageSt8 = _this._deps.messageStoreOptions) === null || _this$_deps$messageSt8 === void 0 ? void 0 : _this$_deps$messageSt8.daySpan) !== null && _this$_deps$messageSt7 !== void 0 ? _this$_deps$messageSt7 : DEFAULT_DAY_SPAN;
    _this._eventEmitter = new _events.EventEmitter();
    _this._dispatchedMessageIds = [];
    // @ts-expect-error
    _this._handledRecord = null;
    _this._debouncedSetConversationAsRead = (0, _debounceThrottle.debounce)({
      fn: _this._setConversationAsRead,
      threshold: 500,
      leading: true
    });
    var _ref3 = (_this$_deps$messageSt9 = _this._deps.messageStoreOptions) !== null && _this$_deps$messageSt9 !== void 0 ? _this$_deps$messageSt9 : {},
      _ref3$disableCache = _ref3.disableCache,
      disableCache = _ref3$disableCache === void 0 ? false : _ref3$disableCache,
      _ref3$polling = _ref3.polling,
      polling = _ref3$polling === void 0 ? false : _ref3$polling,
      _ref3$timeToRetry = _ref3.timeToRetry,
      timeToRetry = _ref3$timeToRetry === void 0 ? DEFAULT_RETRY : _ref3$timeToRetry,
      _ref3$pollingInterval = _ref3.pollingInterval,
      pollingInterval = _ref3$pollingInterval === void 0 ? DEFAULT_POLLING_INTERVAL : _ref3$pollingInterval,
      _ref3$ttl = _ref3.ttl,
      ttl = _ref3$ttl === void 0 ? DEFAULT_TTL : _ref3$ttl; // @ts-expect-error
    _this._source = new _DataFetcherV.DataSource(_objectSpread(_objectSpread({}, _this._deps.messageStoreOptions), {}, {
      key: 'messageStore',
      disableCache: disableCache,
      ttl: ttl,
      polling: polling,
      timeToRetry: timeToRetry,
      pollingInterval: pollingInterval,
      cleanOnReset: true,
      permissionCheckFunction: function permissionCheckFunction() {
        return _this._hasPermission;
      },
      readyCheckFunction: function readyCheckFunction() {
        return _this._deps.appFeatures.ready;
      },
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return", _this._syncData());
                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        function fetchFunction() {
          return _fetchFunction.apply(this, arguments);
        }
        return fetchFunction;
      }()
    }));
    _this._deps.dataFetcherV2.register(_this._source);
    return _this;
  }
  _createClass(MessageStore, [{
    key: "onInit",
    value: function onInit() {
      if (this._hasPermission) {
        this._deps.subscription.subscribe([_subscriptionFilters.subscriptionFilters.messageStore]);
      }
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      if (this._deps.connectivityMonitor) {
        (0, _core.watch)(this, function () {
          return _this2._deps.connectivityMonitor.connectivity;
        }, function (newValue) {
          if (_this2.ready && _this2._deps.connectivityMonitor.ready && newValue) {
            _this2._deps.dataFetcherV2.fetchData(_this2._source);
          }
        });
      }
      (0, _core.watch)(this, function () {
        return _this2._deps.subscription.message;
      }, function (newValue) {
        var _newValue$body;
        if (!_this2.ready || _this2._deps.tabManager && !_this2._deps.tabManager.active) {
          return;
        }
        var accountExtensionEndPoint = /\/message-store$/;
        if (newValue &&
        // @ts-expect-error
        accountExtensionEndPoint.test(newValue.event) && ((_newValue$body = newValue.body) === null || _newValue$body === void 0 ? void 0 : _newValue$body.changes)) {
          _this2.fetchData({
            passive: true
          });
        }
      });
    }
  }, {
    key: "_updateData",
    value: function () {
      var _updateData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data) {
        var timestamp,
          _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                timestamp = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : Date.now();
                this._deps.dataFetcherV2.updateData(this._source, data, timestamp);
              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function _updateData(_x2) {
        return _updateData2.apply(this, arguments);
      }
      return _updateData;
    }()
  }, {
    key: "_processRawConversationList",
    value: function _processRawConversationList(_ref4) {
      var _this$data;
      var records = _ref4.records,
        conversationStore = _ref4.conversationStore,
        isFSyncSuccess = _ref4.isFSyncSuccess;
      var state = ((_this$data = this.data) === null || _this$data === void 0 ? void 0 : _this$data.conversationList) || [];
      var newState = [];
      var stateMap = {};
      if (!isFSyncSuccess) {
        if (!records || records.length === 0) {
          return state;
        }
        state.forEach(function (oldConversation) {
          newState.push(oldConversation);
          stateMap[oldConversation.id] = {
            index: newState.length - 1
          };
        });
      }
      records.forEach(function (record) {
        var message = messageHelper.normalizeRecord(record);
        var id = message.conversationId;
        var newCreationTime = message.creationTime;
        var isDeleted = messageHelper.messageIsDeleted(message);
        // @ts-expect-error
        if (stateMap[id]) {
          // @ts-expect-error
          var oldConversation = newState[stateMap[id].index];
          var creationTime = oldConversation.creationTime;
          // @ts-expect-error
          if (creationTime < newCreationTime && !isDeleted) {
            // @ts-expect-error
            newState[stateMap[id].index] = {
              // @ts-expect-error
              id: id,
              // @ts-expect-error
              creationTime: newCreationTime,
              type: message.type,
              messageId: message.id
            };
          }
          // when user deleted a coversation message
          if (isDeleted && message.id === oldConversation.messageId) {
            // @ts-expect-error
            var oldMessageList = conversationStore[id] || [];
            var exsitedMessageList = oldMessageList.filter(
            // @ts-expect-error
            function (m) {
              return m.id !== message.id;
            });
            if (exsitedMessageList.length > 0) {
              // @ts-expect-error
              newState[stateMap[id].index] = {
                // @ts-expect-error
                id: id,
                creationTime: exsitedMessageList[0].creationTime,
                type: exsitedMessageList[0].type,
                messageId: exsitedMessageList[0].id
              };
              return;
            }
            // when user delete conversation
            // @ts-expect-error
            newState[stateMap[id].index] = null;
            // @ts-expect-error
            delete stateMap[id];
          }
          return;
        }
        if (isDeleted || !messageHelper.messageIsAcceptable(message)) {
          return;
        }
        newState.push({
          // @ts-expect-error
          id: id,
          // @ts-expect-error
          creationTime: newCreationTime,
          type: message.type,
          messageId: message.id
        });
        // @ts-expect-error
        stateMap[id] = {
          index: newState.length - 1
        };
      });
      return newState.filter(function (c) {
        return !!c && typeof c.creationTime === 'number';
      }).sort(messageHelper.sortByCreationTime);
    }
  }, {
    key: "_processRawConversationStore",
    value: function _processRawConversationStore(_ref5) {
      var _this$data$conversati, _this$data2;
      var records = _ref5.records,
        isFSyncSuccess = _ref5.isFSyncSuccess;
      var state = (_this$data$conversati = (_this$data2 = this.data) === null || _this$data2 === void 0 ? void 0 : _this$data2.conversationStore) !== null && _this$data$conversati !== void 0 ? _this$data$conversati : {};
      var newState = {};
      var updatedConversations = {};
      if (!isFSyncSuccess) {
        if (!records || records.length === 0) {
          return state;
        }
        newState = _objectSpread({}, state);
      }
      records.forEach(function (record) {
        var message = messageHelper.normalizeRecord(record);
        var id = message.conversationId;
        // @ts-expect-error
        var newMessages = newState[id] ? [].concat(newState[id]) : [];
        // @ts-expect-error
        var oldMessageIndex = newMessages.findIndex(function (r) {
          return r.id === record.id;
        });
        if (messageHelper.messageIsDeleted(message)) {
          // @ts-expect-error
          newState[id] = newMessages.filter(function (m) {
            return m.id !== message.id;
          });
          // @ts-expect-error
          if (newState[id].length === 0) {
            // @ts-expect-error
            delete newState[id];
          }
          return;
        }
        if (oldMessageIndex > -1) {
          if (
          // @ts-expect-error
          newMessages[oldMessageIndex].lastModifiedTime <
          // @ts-expect-error
          message.lastModifiedTime) {
            // @ts-expect-error
            newMessages[oldMessageIndex] = message;
          }
        } else if (messageHelper.messageIsAcceptable(message)) {
          // @ts-expect-error
          newMessages.push(message);
        }
        // @ts-expect-error
        updatedConversations[id] = 1;
        // @ts-expect-error
        newState[id] = newMessages;
      });
      Object.keys(updatedConversations).forEach(function (id) {
        var noSorted = newState[id];
        newState[id] = noSorted.sort(messageHelper.sortByCreationTime);
      });
      return newState;
    }
  }, {
    key: "_syncFunction",
    value: function () {
      var _syncFunction2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref6) {
        var recordCount, conversationLoadLength, dateFrom, dateTo, syncToken, _ref6$receivedRecords, receivedRecordsLength, params, _yield$this$_deps$cli, records, _yield$this$_deps$cli2, syncInfo, olderDateTo, olderRecordResult;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                recordCount = _ref6.recordCount, conversationLoadLength = _ref6.conversationLoadLength, dateFrom = _ref6.dateFrom, dateTo = _ref6.dateTo, syncToken = _ref6.syncToken, _ref6$receivedRecords = _ref6.receivedRecordsLength, receivedRecordsLength = _ref6$receivedRecords === void 0 ? 0 : _ref6$receivedRecords;
                params = (0, _messageStoreHelper.getSyncParams)({
                  recordCount: recordCount,
                  conversationLoadLength: conversationLoadLength,
                  dateFrom: dateFrom,
                  dateTo: dateTo,
                  syncToken: syncToken
                });
                _context3.next = 4;
                return this._deps.client.account().extension().messageSync().list(params);
              case 4:
                _yield$this$_deps$cli = _context3.sent;
                records = _yield$this$_deps$cli.records;
                _yield$this$_deps$cli2 = _yield$this$_deps$cli.syncInfo;
                syncInfo = _yield$this$_deps$cli2 === void 0 ? {} : _yield$this$_deps$cli2;
                receivedRecordsLength += records.length;
                // @ts-expect-error
                if (!(!syncInfo.olderRecordsExist || receivedRecordsLength >= recordCount)) {
                  _context3.next = 11;
                  break;
                }
                return _context3.abrupt("return", {
                  records: records,
                  syncInfo: syncInfo
                });
              case 11:
                _context3.next = 13;
                return (0, _utils.sleep)(500);
              case 13:
                // @ts-expect-error
                olderDateTo = new Date(records[records.length - 1].creationTime);
                _context3.next = 16;
                return this._syncFunction({
                  conversationLoadLength: conversationLoadLength,
                  dateFrom: dateFrom,
                  dateTo: olderDateTo
                });
              case 16:
                olderRecordResult = _context3.sent;
                return _context3.abrupt("return", {
                  records: records.concat(olderRecordResult.records),
                  syncInfo: syncInfo
                });
              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function _syncFunction(_x3) {
        return _syncFunction2.apply(this, arguments);
      }
      return _syncFunction;
    }() // @ts-expect-error
  }, {
    key: "_syncData",
    value: function () {
      var _syncData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _ref7,
          _ref7$dateTo,
          dateTo,
          _ref7$passive,
          passive,
          conversationsLoadLength,
          conversationLoadLength,
          ownerId,
          _this$syncInfo,
          dateFrom,
          syncToken,
          recordCount,
          data,
          _error$response,
          _yield$error$response,
          _yield$error$response2,
          _error$response2,
          error,
          records,
          isFSyncSuccess,
          _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _ref7 = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {}, _ref7$dateTo = _ref7.dateTo, dateTo = _ref7$dateTo === void 0 ? null : _ref7$dateTo, _ref7$passive = _ref7.passive, passive = _ref7$passive === void 0 ? false : _ref7$passive;
                conversationsLoadLength = this._conversationsLoadLength;
                conversationLoadLength = this._conversationLoadLength;
                ownerId = this._deps.auth.ownerId;
                _context4.prev = 4;
                dateFrom = new Date();
                dateFrom.setDate(dateFrom.getDate() - this._daySpan);
                syncToken = dateTo ? null : (_this$syncInfo = this.syncInfo) === null || _this$syncInfo === void 0 ? void 0 : _this$syncInfo.syncToken;
                recordCount = conversationsLoadLength * conversationLoadLength;
                _context4.prev = 9;
                _context4.next = 12;
                return this._syncFunction({
                  recordCount: recordCount,
                  conversationLoadLength: conversationLoadLength,
                  dateFrom: dateFrom,
                  // @ts-expect-error
                  syncToken: syncToken,
                  dateTo: dateTo
                });
              case 12:
                data = _context4.sent;
                _context4.next = 40;
                break;
              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4["catch"](9);
                error = _context4.t0;
                _context4.t1 = ((_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === 400;
                if (!_context4.t1) {
                  _context4.next = 32;
                  break;
                }
                _context4.next = 22;
                return (_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.clone().json();
              case 22:
                _context4.t3 = _yield$error$response = _context4.sent;
                _context4.t2 = _context4.t3 === null;
                if (_context4.t2) {
                  _context4.next = 26;
                  break;
                }
                _context4.t2 = _yield$error$response === void 0;
              case 26:
                if (!_context4.t2) {
                  _context4.next = 30;
                  break;
                }
                _context4.t4 = void 0;
                _context4.next = 31;
                break;
              case 30:
                _context4.t4 = (_yield$error$response2 = _yield$error$response.error) === null || _yield$error$response2 === void 0 ? void 0 : _yield$error$response2.some(function () {
                  var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                    _ref8$errorCode = _ref8.errorCode,
                    errorCode = _ref8$errorCode === void 0 ? '' : _ref8$errorCode;
                  return INVALID_TOKEN_ERROR_CODES.includes(errorCode);
                });
              case 31:
                _context4.t1 = _context4.t4;
              case 32:
                if (!_context4.t1) {
                  _context4.next = 39;
                  break;
                }
                _context4.next = 35;
                return this._syncFunction({
                  recordCount: recordCount,
                  conversationLoadLength: conversationLoadLength,
                  dateFrom: dateFrom,
                  // @ts-expect-error
                  syncToken: null,
                  dateTo: dateTo
                });
              case 35:
                data = _context4.sent;
                syncToken = null;
                _context4.next = 40;
                break;
              case 39:
                throw error;
              case 40:
                if (!(this._deps.auth.ownerId === ownerId)) {
                  _context4.next = 45;
                  break;
                }
                records = this._messagesFilter(data.records);
                isFSyncSuccess = !syncToken; // this is only executed in passive sync mode (aka. invoked by subscription)
                if (passive) {
                  this._handledRecord = records;
                }
                return _context4.abrupt("return", {
                  conversationList: this._processRawConversationList({
                    records: records,
                    conversationStore: this.conversationStore,
                    isFSyncSuccess: isFSyncSuccess
                  }),
                  conversationStore: this._processRawConversationStore({
                    records: records,
                    isFSyncSuccess: isFSyncSuccess
                  }),
                  syncInfo: data.syncInfo
                });
              case 45:
                _context4.next = 52;
                break;
              case 47:
                _context4.prev = 47;
                _context4.t5 = _context4["catch"](4);
                if (!(this._deps.auth.ownerId === ownerId)) {
                  _context4.next = 52;
                  break;
                }
                console.error(_context4.t5);
                throw _context4.t5;
              case 52:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[4, 47], [9, 15]]);
      }));
      function _syncData() {
        return _syncData2.apply(this, arguments);
      }
      return _syncData;
    }()
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _ref9,
          _ref9$passive,
          passive,
          data,
          _args5 = arguments;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _ref9 = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {}, _ref9$passive = _ref9.passive, passive = _ref9$passive === void 0 ? false : _ref9$passive;
                _context5.next = 3;
                return this._syncData({
                  passive: passive
                });
              case 3:
                data = _context5.sent;
                this._updateData(data);
                if (passive && this._handledRecord) {
                  this._dispatchMessageHandlers(this._handledRecord);
                  // @ts-expect-error
                  this._handledRecord = null;
                }
              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function fetchData() {
        return _fetchData.apply(this, arguments);
      }
      return fetchData;
    }()
  }, {
    key: "onNewInboundMessage",
    value: function onNewInboundMessage(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on('newInboundMessageNotification', handler);
      }
    }
  }, {
    key: "onMessageUpdated",
    value: function onMessageUpdated(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on('messageUpdated', handler);
      }
    }
    /**
     * Dispatch events to different handlers
     */
  }, {
    key: "_dispatchMessageHandlers",
    value: function _dispatchMessageHandlers(records) {
      // Sort all records by creation time
      records = records.slice().sort(function (a, b) {
        return (
          // @ts-expect-error
          new Date(a.creationTime).getTime() -
          // @ts-expect-error
          new Date(b.creationTime).getTime()
        );
      });
      var _iterator = _createForOfIteratorHelper(records),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var record = _step.value;
          var _ref10 = record || {},
            id = _ref10.id,
            direction = _ref10.direction,
            availability = _ref10.availability,
            messageStatus = _ref10.messageStatus,
            readStatus = _ref10.readStatus,
            lastModifiedTime = _ref10.lastModifiedTime,
            creationTime = _ref10.creationTime; // Notify when new message incoming
          // fix mix old messages and new messages logic error.
          if (!this._messageDispatched(record)) {
            // Mark last 10 messages that dispatched
            // To present dispatching same record twice
            // @ts-expect-error
            this._dispatchedMessageIds = [{
              id: id,
              lastModifiedTime: lastModifiedTime
            }].concat(this._dispatchedMessageIds).slice(0, 20);
            this._eventEmitter.emit('messageUpdated', record);
            // For new inbound message notification
            if (direction === 'Inbound' && readStatus === 'Unread' && messageStatus === 'Received' && availability === 'Alive' &&
            // @ts-expect-error
            new Date(creationTime).getTime() >
            // @ts-expect-error
            new Date(lastModifiedTime).getTime() - 600 * 1000) {
              this._eventEmitter.emit('newInboundMessageNotification', record);
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "_messageDispatched",
    value: function _messageDispatched(message) {
      return this._dispatchedMessageIds.some(function (m) {
        return m.id === message.id && m.lastModifiedTime === message.lastModifiedTime;
      });
    }
  }, {
    key: "pushMessages",
    value: function () {
      var _pushMessages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(records) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this._deps.dataFetcherV2.updateData(this._source, _objectSpread(_objectSpread({}, this.data), {}, {
                  conversationList: this._processRawConversationList({
                    records: records,
                    conversationStore: this.conversationStore
                  }),
                  conversationStore: this._processRawConversationStore({
                    records: records
                  })
                }),
                // @ts-expect-error
                this.timestamp);
              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function pushMessages(_x4) {
        return _pushMessages.apply(this, arguments);
      }
      return pushMessages;
    }()
  }, {
    key: "pushMessage",
    value: function pushMessage(record) {
      this.pushMessages([record]);
    }
  }, {
    key: "_updateMessageApi",
    value: function () {
      var _updateMessageApi2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(messageId, status) {
        var body, updateRequest;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                body = {
                  readStatus: status
                };
                _context7.next = 3;
                return this._deps.client.account().extension().messageStore(messageId).put(body);
              case 3:
                updateRequest = _context7.sent;
                return _context7.abrupt("return", updateRequest);
              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function _updateMessageApi(_x5, _x6) {
        return _updateMessageApi2.apply(this, arguments);
      }
      return _updateMessageApi;
    }()
  }, {
    key: "deleteMessageApi",
    value: function () {
      var _deleteMessageApi = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(messageId) {
        var response;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this._deps.client.account().extension().messageStore(messageId)["delete"]();
              case 2:
                response = _context8.sent;
                return _context8.abrupt("return", response);
              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function deleteMessageApi(_x7) {
        return _deleteMessageApi.apply(this, arguments);
      }
      return deleteMessageApi;
    }()
  }, {
    key: "sliceConversations",
    value: function sliceConversations() {
      var _this3 = this,
        _this$data$conversati2,
        _this$data3;
      var conversationIds = Object.keys(this.conversationStore);
      var messages = conversationIds.reduce(function (acc, id) {
        return acc.concat(_this3.conversationStore[id]);
      }, []);
      var messageIds = this._messagesFilter(messages).map(function (item) {
        return item.id;
      });
      var conversationList = ((_this$data$conversati2 = (_this$data3 = this.data) === null || _this$data3 === void 0 ? void 0 : _this$data3.conversationList) !== null && _this$data$conversati2 !== void 0 ? _this$data$conversati2 : []).filter(function (_ref11) {
        var messageId = _ref11.messageId;
        return messageIds.indexOf(messageId) > -1;
      });
      var conversationStore = Object.keys(this.conversationStore).reduce(function (acc, key) {
        var messages = _this3.conversationStore[key];
        var persist = messages.filter(function (_ref12) {
          var id = _ref12.id;
          return messageIds.indexOf(id) > -1;
        });
        if (!persist.length) {
          return acc;
        }
        acc[key] = persist;
        return acc;
      }, {});
      this._deps.dataFetcherV2.updateData(this._source, _objectSpread(_objectSpread({}, this.data), {}, {
        conversationList: conversationList,
        conversationStore: conversationStore
      }),
      // @ts-expect-error
      this.timestamp);
    }
    /**
     * Batch update messages status
     */
  }, {
    key: "_batchUpdateMessagesApi",
    value: function () {
      var _batchUpdateMessagesApi2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(messageIds, body) {
        var ids, platform, responses;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!(!messageIds || messageIds.length === 0)) {
                  _context9.next = 2;
                  break;
                }
                return _context9.abrupt("return");
              case 2:
                ids = decodeURIComponent(messageIds.join(','));
                platform = this._deps.client.service.platform();
                _context9.next = 6;
                return (0, _batchApiHelper.batchPutApi)({
                  platform: platform,
                  url: "/restapi/v1.0/account/~/extension/~/message-store/".concat(ids),
                  body: body
                });
              case 6:
                responses = _context9.sent;
                return _context9.abrupt("return", responses);
              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));
      function _batchUpdateMessagesApi(_x8, _x9) {
        return _batchUpdateMessagesApi2.apply(this, arguments);
      }
      return _batchUpdateMessagesApi;
    }()
    /**
     * Change messages' status to `READ` or `UNREAD`.
     * Update 20 messages per time with `_batchUpdateMessagesApi`,
     * or `_updateMessageApi` one by one in recursion.
     */
  }, {
    key: "_updateMessagesApi",
    value: function () {
      var _updateMessagesApi2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(messageIds, status) {
        var allMessageIds, results, index, nextLength, result, leftIds, body, responses, ownerId;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                allMessageIds = messageIds;
                if (!(!allMessageIds || allMessageIds.length === 0)) {
                  _context11.next = 3;
                  break;
                }
                return _context11.abrupt("return", []);
              case 3:
                results = [];
                index = 0;
              case 5:
                nextLength = (index + 1) * UPDATE_MESSAGE_ONCE_COUNT;
                if (nextLength > allMessageIds.length) {
                  nextLength = allMessageIds.length - index * UPDATE_MESSAGE_ONCE_COUNT;
                } else {
                  nextLength = UPDATE_MESSAGE_ONCE_COUNT;
                }

                // If there's only one message, use another api to update its status
                if (!(nextLength === 1)) {
                  _context11.next = 12;
                  break;
                }
                _context11.next = 10;
                return this._updateMessageApi(messageIds[0], status);
              case 10:
                result = _context11.sent;
                return _context11.abrupt("return", [result]);
              case 12:
                leftIds = allMessageIds.slice(index * UPDATE_MESSAGE_ONCE_COUNT, index * UPDATE_MESSAGE_ONCE_COUNT + nextLength);
                body = leftIds.map(function () {
                  return {
                    body: {
                      readStatus: status
                    }
                  };
                });
                _context11.next = 16;
                return this._batchUpdateMessagesApi(leftIds, body);
              case 16:
                responses = _context11.sent;
                _context11.next = 19;
                return Promise.all(
                // @ts-expect-error
                responses.map( /*#__PURE__*/function () {
                  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(res) {
                    var _result;
                    return regeneratorRuntime.wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            if (!(res.status === 200)) {
                              _context10.next = 5;
                              break;
                            }
                            _context10.next = 3;
                            return res.json();
                          case 3:
                            _result = _context10.sent;
                            results.push(_result);
                          case 5:
                          case "end":
                            return _context10.stop();
                        }
                      }
                    }, _callee10);
                  }));
                  return function (_x12) {
                    return _ref13.apply(this, arguments);
                  };
                }()));
              case 19:
                ownerId = this._deps.auth.ownerId;
                if (!(allMessageIds.length > (index + 1) * UPDATE_MESSAGE_ONCE_COUNT)) {
                  _context11.next = 27;
                  break;
                }
                _context11.next = 23;
                return (0, _utils.sleep)(1300);
              case 23:
                if (!(ownerId !== this._deps.auth.ownerId)) {
                  _context11.next = 25;
                  break;
                }
                return _context11.abrupt("return", []);
              case 25:
                _context11.next = 28;
                break;
              case 27:
                return _context11.abrupt("break", 31);
              case 28:
                index++;
                _context11.next = 5;
                break;
              case 31:
                return _context11.abrupt("return", results);
              case 32:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));
      function _updateMessagesApi(_x10, _x11) {
        return _updateMessagesApi2.apply(this, arguments);
      }
      return _updateMessagesApi;
    }()
    /**
     * Set message status to `READ`.
     */
  }, {
    key: "readMessages",
    value: function () {
      var _readMessages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(conversationId) {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                this._debouncedSetConversationAsRead(conversationId);
              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));
      function readMessages(_x13) {
        return _readMessages.apply(this, arguments);
      }
      return readMessages;
    }()
  }, {
    key: "_setConversationAsRead",
    value: function () {
      var _setConversationAsRead2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(conversationId) {
        var messageList, unreadMessageIds, ownerId, updatedMessages;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                // @ts-expect-error
                messageList = this.conversationStore[conversationId];
                if (!(!messageList || messageList.length === 0)) {
                  _context13.next = 3;
                  break;
                }
                return _context13.abrupt("return");
              case 3:
                unreadMessageIds = messageList.filter(messageHelper.messageIsUnread)
                // @ts-expect-error
                .map(function (m) {
                  return m.id;
                });
                if (!(unreadMessageIds.length === 0)) {
                  _context13.next = 6;
                  break;
                }
                return _context13.abrupt("return");
              case 6:
                _context13.prev = 6;
                ownerId = this._deps.auth.ownerId;
                _context13.next = 10;
                return this._updateMessagesApi(unreadMessageIds, 'Read');
              case 10:
                updatedMessages = _context13.sent;
                if (!(ownerId !== this._deps.auth.ownerId)) {
                  _context13.next = 13;
                  break;
                }
                return _context13.abrupt("return");
              case 13:
                this.pushMessages(updatedMessages);
                _context13.next = 26;
                break;
              case 16:
                _context13.prev = 16;
                _context13.t0 = _context13["catch"](6);
                console.error(_context13.t0);
                _context13.t1 = !this._deps.availabilityMonitor;
                if (_context13.t1) {
                  _context13.next = 24;
                  break;
                }
                _context13.next = 23;
                return this._deps.availabilityMonitor.checkIfHAError(_context13.t0);
              case 23:
                _context13.t1 = !_context13.sent;
              case 24:
                if (!_context13.t1) {
                  _context13.next = 26;
                  break;
                }
                this._deps.alert.warning({
                  message: _messageStoreErrors.messageStoreErrors.readFailed
                });
              case 26:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this, [[6, 16]]);
      }));
      function _setConversationAsRead(_x14) {
        return _setConversationAsRead2.apply(this, arguments);
      }
      return _setConversationAsRead;
    }()
    /**
     * Set message status to `UNREAD`.
     */
  }, {
    key: "unreadMessage",
    value: function () {
      var _unreadMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(messageId) {
        var message;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                this.onUnmarkMessages();
                _context14.prev = 1;
                _context14.next = 4;
                return this._updateMessageApi(messageId, 'Unread');
              case 4:
                message = _context14.sent;
                this.pushMessage(message);
                _context14.next = 18;
                break;
              case 8:
                _context14.prev = 8;
                _context14.t0 = _context14["catch"](1);
                console.error(_context14.t0);
                _context14.t1 = !this._deps.availabilityMonitor;
                if (_context14.t1) {
                  _context14.next = 16;
                  break;
                }
                _context14.next = 15;
                return this._deps.availabilityMonitor.checkIfHAError(_context14.t0);
              case 15:
                _context14.t1 = !_context14.sent;
              case 16:
                if (!_context14.t1) {
                  _context14.next = 18;
                  break;
                }
                this._deps.alert.warning({
                  message: _messageStoreErrors.messageStoreErrors.unreadFailed
                });
              case 18:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this, [[1, 8]]);
      }));
      function unreadMessage(_x15) {
        return _unreadMessage.apply(this, arguments);
      }
      return unreadMessage;
    }()
  }, {
    key: "onUnmarkMessages",
    value: function () {
      var _onUnmarkMessages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      }));
      function onUnmarkMessages() {
        return _onUnmarkMessages.apply(this, arguments);
      }
      return onUnmarkMessages;
    }()
  }, {
    key: "onDeleteConversation",
    value: function () {
      var _onDeleteConversation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(conversationId) {
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      }));
      function onDeleteConversation(_x16) {
        return _onDeleteConversation.apply(this, arguments);
      }
      return onDeleteConversation;
    }()
  }, {
    key: "_deleteConversationStore",
    value: function _deleteConversationStore(conversationId) {
      // @ts-expect-error
      if (!this.conversationStore[conversationId]) {
        return this.conversationStore;
      }
      var newState = _objectSpread({}, this.conversationStore);
      // @ts-expect-error
      delete newState[conversationId];
      return newState;
    }
  }, {
    key: "_deleteConversation",
    value: function _deleteConversation(conversationId) {
      var _this$data$conversati3, _this$data4;
      var conversationList = ((_this$data$conversati3 = (_this$data4 = this.data) === null || _this$data4 === void 0 ? void 0 : _this$data4.conversationList) !== null && _this$data$conversati3 !== void 0 ? _this$data$conversati3 : []).filter(function (c) {
        return c.id !== conversationId;
      });
      this.onDeleteConversation(conversationId);
      var conversationStore = this._deleteConversationStore(conversationId);
      this._deps.dataFetcherV2.updateData(this._source, _objectSpread(_objectSpread({}, this.data), {}, {
        conversationList: conversationList,
        conversationStore: conversationStore
      }),
      // @ts-expect-error
      this.timestamp);
    }
  }, {
    key: "deleteConversationMessages",
    value: function () {
      var _deleteConversationMessages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(conversationId) {
        var messageList, messageId;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                if (conversationId) {
                  _context17.next = 2;
                  break;
                }
                return _context17.abrupt("return");
              case 2:
                messageList = this.conversationStore[conversationId];
                if (!(!messageList || messageList.length === 0)) {
                  _context17.next = 5;
                  break;
                }
                return _context17.abrupt("return");
              case 5:
                messageId = messageList.map(function (m) {
                  return m.id;
                }).join(',');
                _context17.prev = 6;
                _context17.next = 9;
                return this.deleteMessageApi(messageId);
              case 9:
                this._deleteConversation(conversationId);
                _context17.next = 22;
                break;
              case 12:
                _context17.prev = 12;
                _context17.t0 = _context17["catch"](6);
                console.error(_context17.t0);
                _context17.t1 = !this._deps.availabilityMonitor;
                if (_context17.t1) {
                  _context17.next = 20;
                  break;
                }
                _context17.next = 19;
                return this._deps.availabilityMonitor.checkIfHAError(_context17.t0);
              case 19:
                _context17.t1 = !_context17.sent;
              case 20:
                if (!_context17.t1) {
                  _context17.next = 22;
                  break;
                }
                this._deps.alert.warning({
                  message: _messageStoreErrors.messageStoreErrors.deleteFailed
                });
              case 22:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this, [[6, 12]]);
      }));
      function deleteConversationMessages(_x17) {
        return _deleteConversationMessages.apply(this, arguments);
      }
      return deleteConversationMessages;
    }()
  }, {
    key: "deleteConversation",
    value: function () {
      var _deleteConversation2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(conversationId) {
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                if (conversationId) {
                  _context18.next = 2;
                  break;
                }
                return _context18.abrupt("return");
              case 2:
                _context18.prev = 2;
                _context18.next = 5;
                return this._deps.client.account().extension().messageStore()["delete"]({
                  conversationId: conversationId
                });
              case 5:
                this._deleteConversation(conversationId);
                _context18.next = 18;
                break;
              case 8:
                _context18.prev = 8;
                _context18.t0 = _context18["catch"](2);
                console.error(_context18.t0);
                _context18.t1 = !this._deps.availabilityMonitor;
                if (_context18.t1) {
                  _context18.next = 16;
                  break;
                }
                _context18.next = 15;
                return this._deps.availabilityMonitor.checkIfHAError(_context18.t0);
              case 15:
                _context18.t1 = !_context18.sent;
              case 16:
                if (!_context18.t1) {
                  _context18.next = 18;
                  break;
                }
                this._deps.alert.warning({
                  message: _messageStoreErrors.messageStoreErrors.deleteFailed
                });
              case 18:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this, [[2, 8]]);
      }));
      function deleteConversation(_x18) {
        return _deleteConversation2.apply(this, arguments);
      }
      return deleteConversation;
    }()
  }, {
    key: "onClickToSMS",
    value: function () {
      var _onClickToSMS = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19);
      }));
      function onClickToSMS() {
        return _onClickToSMS.apply(this, arguments);
      }
      return onClickToSMS;
    }()
  }, {
    key: "onClickToCall",
    value: function () {
      var _onClickToCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(_ref14) {
        var _ref14$fromType, fromType;
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _ref14$fromType = _ref14.fromType, fromType = _ref14$fromType === void 0 ? '' : _ref14$fromType;
                // for track click to call in message list
                this.onClickToCallWithRingout();
              case 2:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));
      function onClickToCall(_x19) {
        return _onClickToCall.apply(this, arguments);
      }
      return onClickToCall;
    }()
  }, {
    key: "onClickToCallWithRingout",
    value: function () {
      var _onClickToCallWithRingout = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21);
      }));
      function onClickToCallWithRingout() {
        return _onClickToCallWithRingout.apply(this, arguments);
      }
      return onClickToCallWithRingout;
    }()
  }, {
    key: "data",
    get: function get() {
      return this._deps.dataFetcherV2.getData(this._source);
    }
  }, {
    key: "timestamp",
    get: function get() {
      return this._deps.dataFetcherV2.getTimestamp(this._source);
    }
  }, {
    key: "syncInfo",
    get: function get() {
      var _this$data5;
      return (_this$data5 = this.data) === null || _this$data5 === void 0 ? void 0 : _this$data5.syncInfo;
    }
  }, {
    key: "conversationStore",
    get: function get() {
      var _this$data6;
      return ((_this$data6 = this.data) === null || _this$data6 === void 0 ? void 0 : _this$data6.conversationStore) || {};
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return this._deps.appFeatures.hasReadMessagesPermission;
    }
  }, {
    key: "allConversations",
    get: function get() {
      var _this$data7,
        _this4 = this;
      var _ref15 = (_this$data7 = this.data) !== null && _this$data7 !== void 0 ? _this$data7 : {},
        _ref15$conversationLi = _ref15.conversationList,
        conversationList = _ref15$conversationLi === void 0 ? [] : _ref15$conversationLi;
      return conversationList.map(function (conversationItem) {
        var messageList = _this4.conversationStore[conversationItem.id] || [];
        return _objectSpread(_objectSpread({}, messageList[0]), {}, {
          unreadCounts: messageList.filter(messageHelper.messageIsUnread).length
        });
      });
    }
  }, {
    key: "textConversations",
    get: function get() {
      return this.allConversations.filter(function (conversation) {
        return messageHelper.messageIsTextMessage(conversation);
      });
    }
  }, {
    key: "textUnreadCounts",
    get: function get() {
      return this.textConversations.reduce(function (a, b) {
        return a + b.unreadCounts;
      }, 0);
    }
  }, {
    key: "faxMessages",
    get: function get() {
      return this.allConversations.filter(function (conversation) {
        return messageHelper.messageIsFax(conversation);
      });
    }
  }, {
    key: "faxUnreadCounts",
    get: function get() {
      return this.faxMessages.reduce(function (a, b) {
        return a + b.unreadCounts;
      }, 0);
    }
  }, {
    key: "voicemailMessages",
    get: function get() {
      return this.allConversations.filter(function (conversation) {
        return messageHelper.messageIsVoicemail(conversation);
      });
    }
  }, {
    key: "voiceUnreadCounts",
    get: function get() {
      return this.voicemailMessages.reduce(function (a, b) {
        return a + b.unreadCounts;
      }, 0);
    }
  }, {
    key: "unreadCounts",
    get: function get() {
      var unreadCounts = 0;
      if (this._deps.appFeatures.hasReadTextPermission) {
        unreadCounts += this.textUnreadCounts;
      }
      if (this._deps.appFeatures.hasVoicemailPermission) {
        unreadCounts += this.voiceUnreadCounts;
      }
      if (this._deps.appFeatures.hasReadFaxPermission) {
        unreadCounts += this.faxUnreadCounts;
      }
      return unreadCounts;
    }
  }]);
  return MessageStore;
}(_DataFetcherV.DataFetcherV2Consumer), (_applyDecoratedDescriptor(_class2.prototype, "_updateData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pushMessages", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "pushMessages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "readMessages", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "readMessages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unreadMessage", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "unreadMessage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onUnmarkMessages", [_dec2, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "onUnmarkMessages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onDeleteConversation", [_dec3, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "onDeleteConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteConversationMessages", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteConversationMessages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteConversation", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onClickToSMS", [_dec4, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "onClickToSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onClickToCall", [_dec5, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "onClickToCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onClickToCallWithRingout", [_dec6, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "onClickToCallWithRingout"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "conversationStore", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "conversationStore"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allConversations", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "allConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "textConversations", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "textConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "textUnreadCounts", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "textUnreadCounts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "faxMessages", [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "faxMessages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "faxUnreadCounts", [_dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "faxUnreadCounts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "voicemailMessages", [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "voicemailMessages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "voiceUnreadCounts", [_dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "voiceUnreadCounts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unreadCounts", [_dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "unreadCounts"), _class2.prototype)), _class2)) || _class);
exports.MessageStore = MessageStore;
//# sourceMappingURL=MessageStore.js.map
