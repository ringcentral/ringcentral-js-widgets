"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.date.to-iso-string");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.array.for-each");

var _normalizeNumber = _interopRequireDefault(require("../../lib/normalizeNumber"));

var _messageDirection = _interopRequireDefault(require("../../enums/messageDirection"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _messageTypes = _interopRequireDefault(require("../../enums/messageTypes"));

var _cleanNumber = _interopRequireDefault(require("../../lib/cleanNumber"));

var _isBlank = _interopRequireDefault(require("../../lib/isBlank"));

var _selector = require("../../lib/selector");

var _messageSenderMessages = _interopRequireDefault(require("../MessageSender/messageSenderMessages"));

var _messageHelper = require("../../lib/messageHelper");

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getReducer = _interopRequireDefault(require("./getReducer"));

var _status = _interopRequireDefault(require("./status"));

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

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
    if (message.from && message.direction === _messageDirection["default"].inbound) {
      var fromNumber = message.from.phoneNumber || message.from.extensionNumber;
      addIfNotExist(fromNumber);
    }

    if (message.to && message.to.length > 0 && message.direction === _messageDirection["default"].outbound) {
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
var DEFAULT_DAY_SPAN = 90;
var Conversations = (_dec = (0, _di.Module)({
  deps: ['Alert', 'Auth', 'Client', 'MessageSender', 'ExtensionInfo', 'MessageStore', 'RolesAndPermissions', {
    dep: 'RegionSettings',
    optional: true
  }, {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'ConversationLogger',
    optional: true
  }, {
    dep: 'ConversationsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModule) {
  _inherits(Conversations, _RcModule);

  var _super = _createSuper(Conversations);

  function Conversations(_ref) {
    var _context;

    var _this;

    var alert = _ref.alert,
        auth = _ref.auth,
        client = _ref.client,
        messageSender = _ref.messageSender,
        extensionInfo = _ref.extensionInfo,
        messageStore = _ref.messageStore,
        rolesAndPermissions = _ref.rolesAndPermissions,
        contactMatcher = _ref.contactMatcher,
        conversationLogger = _ref.conversationLogger,
        regionSettings = _ref.regionSettings,
        _ref$perPage = _ref.perPage,
        perPage = _ref$perPage === void 0 ? DEFAULT_PER_PAGE : _ref$perPage,
        _ref$daySpan = _ref.daySpan,
        daySpan = _ref$daySpan === void 0 ? DEFAULT_DAY_SPAN : _ref$daySpan,
        _ref$enableLoadOldMes = _ref.enableLoadOldMessages,
        enableLoadOldMessages = _ref$enableLoadOldMes === void 0 ? false : _ref$enableLoadOldMes,
        _ref$showMMSAttachmen = _ref.showMMSAttachment,
        showMMSAttachment = _ref$showMMSAttachmen === void 0 ? false : _ref$showMMSAttachmen,
        options = _objectWithoutProperties(_ref, ["alert", "auth", "client", "messageSender", "extensionInfo", "messageStore", "rolesAndPermissions", "contactMatcher", "conversationLogger", "regionSettings", "perPage", "daySpan", "enableLoadOldMessages", "showMMSAttachment"]);

    _classCallCheck(this, Conversations);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes["default"]
    }));

    _initializerDefineProperty(_this, "allConversations", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "uniqueNumbers", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "allUniqueNumbers", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "effectiveSearchString", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "typeFilteredConversations", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "formatedConversations", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "filteredConversations", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "pagingConversations", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "earliestTime", _descriptor9, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "currentConversation", _descriptor10, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "messageText", _descriptor11, _assertThisInitialized(_this));

    _this._auth = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, auth, 'auth');
    _this._alert = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, alert, 'alert');
    _this._client = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, client, 'client');
    _this._messageSender = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, messageSender, 'messageSender');
    _this._extensionInfo = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, extensionInfo, 'extensionInfo');
    _this._messageStore = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, messageStore, 'messageStore');
    _this._rolesAndPermissions = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, rolesAndPermissions, 'rolesAndPermissions');
    _this._contactMatcher = contactMatcher;
    _this._conversationLogger = conversationLogger;
    _this._regionSettings = regionSettings;
    _this._reducer = (0, _getReducer["default"])(_this.actionTypes);
    _this._promise = null;
    _this._lastProcessedNumbers = null;
    _this._perPage = perPage;
    _this._daySpan = daySpan;
    _this._olderDataExsited = true;
    _this._olderMessagesExsited = true;
    _this._enableLoadOldMessages = enableLoadOldMessages;
    _this._showMMSAttachment = showMMSAttachment;
    _this._lastConversaionList = [];

    _this._messageSender.on(_this._messageSender.actionTypes.send, function (_ref2) {
      var toNumbers = _ref2.toNumbers;

      _this.addEntities(toNumbers);
    });

    if (_this._contactMatcher) {
      _this._contactMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.uniqueNumbers;
        },
        readyCheckFn: function readyCheckFn() {
          return _this._messageStore.ready;
        }
      });
    }

    return _this;
  }

  _createClass(Conversations, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this._init();
      } else if (this._shouldReset()) {
        this._reset();
      } else if (this._lastProcessedNumbers !== this.allUniqueNumbers || this._lastProcessedPage !== this.currentPage || this._lastTypeFilter !== this.typeFilter || this._lastSearchString !== this.effectiveSearchString) {
        this._lastProcessedNumbers = this.allUniqueNumbers;
        this._lastProcessedPage = this.currentPage;
        this._lastTypeFilter = this.typeFilter;
        this._lastSearchString = this.effectiveSearchString;

        if (this._contactMatcher) {
          this._contactMatcher.triggerMatch();
        }
      } else if (this._lastConversaionList.length > this._messageStore.allConversations.length) {
        this._lastConversaionList = this._messageStore.allConversations;

        if (this.oldConversations.length) {
          this.store.dispatch({
            type: this.actionTypes.cleanOldConversatioans
          });
          this._olderDataExsited = true;
        }
      } else if (this._lastConversaionList.length < this._messageStore.allConversations.length) {
        this._lastConversaionList = this._messageStore.allConversations;
      }
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._auth.loggedIn && this._extensionInfo.ready && this._messageSender.ready && this._messageStore.ready && this._rolesAndPermissions.ready && (!this._contactMatcher || this._contactMatcher.ready) && (!this._conversationLogger || this._conversationLogger.ready) && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!this._auth.loggedIn || !this._extensionInfo.ready || !this._messageSender.ready || !this._rolesAndPermissions || !this._messageStore.ready || this._contactMatcher && !this._contactMatcher.ready || this._conversationLogger && !this._conversationLogger.ready) && this.ready;
    }
  }, {
    key: "_init",
    value: function _init() {
      this.store.dispatch({
        type: this.actionTypes.init
      });

      if (this._contactMatcher) {
        this._contactMatcher.triggerMatch();
      }

      this.store.dispatch({
        type: this.actionTypes.initSuccess
      });
      this._lastConversaionList = this._messageStore.allConversations;

      if (this.allConversations.length <= this._perPage && this._enableLoadOldMessages && this._hasPermission) {
        this.fetchOldConversations();
      }
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this._lastProcessedNumbers = null;
      this._olderDataExsited = true;
      this._olderMessagesExsited = true;
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: "updateSearchInput",
    value: function () {
      var _updateSearchInput = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(input) {
        return regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.updateSearchInput,
                  input: input
                });

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, this);
      }));

      function updateSearchInput(_x) {
        return _updateSearchInput.apply(this, arguments);
      }

      return updateSearchInput;
    }()
  }, {
    key: "updateTypeFilter",
    value: function () {
      var _updateTypeFilter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(type) {
        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.typeFilter === type)) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                this.store.dispatch({
                  type: this.actionTypes.updateTypeFilter,
                  typeFilter: type
                });
                this._olderDataExsited = true;
                this._olderMessagesExsited = true;

                if (this.pagingConversations.length <= this._perPage) {
                  this.loadNextPage();
                }

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function updateTypeFilter(_x2) {
        return _updateTypeFilter.apply(this, arguments);
      }

      return updateTypeFilter;
    }()
  }, {
    key: "fetchOldConversations",
    value: function () {
      var _fetchOldConversations = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var dateFrom, dateTo, typeFilter, currentPage, params, _yield$this$_client$a, records, recordsLength, isIncreaseCurrentPage;

        return regeneratorRuntime.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this._olderDataExsited) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return");

              case 2:
                if (!this.loadingOldConversations) {
                  _context4.next = 4;
                  break;
                }

                return _context4.abrupt("return");

              case 4:
                this.store.dispatch({
                  type: this.actionTypes.fetchOldConverstaions
                });
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

                if (typeFilter === _messageTypes["default"].text) {
                  params.messageType = [_messageTypes["default"].sms, _messageTypes["default"].pager];
                } else if (typeFilter && typeFilter !== '' && typeFilter !== _messageTypes["default"].all) {
                  params.messageType = typeFilter;
                }

                _context4.prev = 13;
                _context4.next = 16;
                return this._client.account().extension().messageStore().list(params);

              case 16:
                _yield$this$_client$a = _context4.sent;
                records = _yield$this$_client$a.records;
                recordsLength = records.length;
                this._olderDataExsited = recordsLength === this._perPage;

                if (typeFilter === this.typeFilter && currentPage === this.currentPage) {
                  isIncreaseCurrentPage = recordsLength && this._perPage * this.currentPage < recordsLength + this.filteredConversations.length;
                  this.store.dispatch({
                    type: this.actionTypes.fetchOldConverstaionsSuccess,
                    records: records,
                    isIncreaseCurrentPage: isIncreaseCurrentPage
                  });
                }

                _context4.next = 26;
                break;

              case 23:
                _context4.prev = 23;
                _context4.t0 = _context4["catch"](13);

                if (typeFilter === this.typeFilter && currentPage === this.currentPage) {
                  this.store.dispatch({
                    type: this.actionTypes.fetchOldConverstaionsError
                  });
                }

              case 26:
              case "end":
                return _context4.stop();
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
        return regeneratorRuntime.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                currentPage = this.currentPage;

                if (!(currentPage * this._perPage < this.filteredConversations.length)) {
                  _context5.next = 4;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.increaseCurrentPage
                });
                return _context5.abrupt("return");

              case 4:
                if (!(this.effectiveSearchString !== '')) {
                  _context5.next = 6;
                  break;
                }

                return _context5.abrupt("return");

              case 6:
                if (!(!this._enableLoadOldMessages || !this._hasPermission)) {
                  _context5.next = 8;
                  break;
                }

                return _context5.abrupt("return");

              case 8:
                _context5.next = 10;
                return this.fetchOldConversations();

              case 10:
              case "end":
                return _context5.stop();
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
      var _resetCurrentPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.resetCurrentPage
                });

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee5, this);
      }));

      function resetCurrentPage() {
        return _resetCurrentPage.apply(this, arguments);
      }

      return resetCurrentPage;
    }()
  }, {
    key: "loadConversation",
    value: function () {
      var _loadConversation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(conversationId) {
        return regeneratorRuntime.wrap(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(conversationId === this.currentConversationId)) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt("return");

              case 2:
                this.store.dispatch({
                  type: this.actionTypes.updateCurrentConversationId,
                  conversationId: conversationId
                });

              case 3:
              case "end":
                return _context7.stop();
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
        return regeneratorRuntime.wrap(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.updateCurrentConversationId,
                  conversationId: null
                });
                this._olderMessagesExsited = true;

              case 2:
              case "end":
                return _context8.stop();
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
            _yield$this$_client$a2,
            records,
            _args8 = arguments;

        return regeneratorRuntime.wrap(function _callee8$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                perPage = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : this._perPage;

                if (this._enableLoadOldMessages) {
                  _context9.next = 3;
                  break;
                }

                return _context9.abrupt("return");

              case 3:
                if (this._hasPermission) {
                  _context9.next = 5;
                  break;
                }

                return _context9.abrupt("return");

              case 5:
                if (this._olderMessagesExsited) {
                  _context9.next = 7;
                  break;
                }

                return _context9.abrupt("return");

              case 7:
                if (!this.loadingOldMessages) {
                  _context9.next = 9;
                  break;
                }

                return _context9.abrupt("return");

              case 9:
                if (this.currentConversationId) {
                  _context9.next = 11;
                  break;
                }

                return _context9.abrupt("return");

              case 11:
                this.store.dispatch({
                  type: this.actionTypes.fetchOldMessages
                });
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
                _context9.prev = 19;
                _context9.next = 22;
                return this._client.account().extension().messageStore().list(params);

              case 22:
                _yield$this$_client$a2 = _context9.sent;
                records = _yield$this$_client$a2.records;
                this._olderMessagesExsited = records.length === perPage;

                if (conversationId === this.currentConversationId) {
                  this.store.dispatch({
                    type: this.actionTypes.fetchOldMessagesSuccess,
                    records: records
                  });
                }

                _context9.next = 31;
                break;

              case 28:
                _context9.prev = 28;
                _context9.t0 = _context9["catch"](19);

                if (conversationId === this.currentConversationId) {
                  this.store.dispatch({
                    type: this.actionTypes.fetchOldMessagesError
                  });
                }

              case 31:
              case "end":
                return _context9.stop();
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
        var ttlConfig = message !== _messageSenderMessages["default"].noAreaCode ? {
          ttl: 0
        } : null;

        this._alert.warning(_objectSpread({
          message: message
        }, ttlConfig));

        return true;
      }

      return false;
    }
  }, {
    key: "updateMessageText",
    value: function () {
      var _updateMessageText = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(text) {
        return regeneratorRuntime.wrap(function _callee9$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(text.length > 1000)) {
                  _context10.next = 2;
                  break;
                }

                return _context10.abrupt("return", this._alertWarning(_messageSenderMessages["default"].textTooLong));

              case 2:
                return _context10.abrupt("return", this.store.dispatch({
                  type: this.actionTypes.updateMessageText,
                  text: text,
                  conversationId: this.currentConversationId
                }));

              case 3:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee9, this);
      }));

      function updateMessageText(_x4) {
        return _updateMessageText.apply(this, arguments);
      }

      return updateMessageText;
    }()
  }, {
    key: "replyToReceivers",
    value: function () {
      var _replyToReceivers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(text) {
        var responses;
        return regeneratorRuntime.wrap(function _callee10$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.reply
                });
                _context11.prev = 1;
                _context11.next = 4;
                return this._messageSender.send({
                  fromNumber: this._getFromNumber(),
                  toNumbers: this._getToNumbers(),
                  text: text,
                  replyOnMessageId: this._getReplyOnMessageId()
                });

              case 4:
                responses = _context11.sent;

                if (!(responses && responses[0])) {
                  _context11.next = 10;
                  break;
                }

                this._messageStore.pushMessage(responses[0]);

                this.store.dispatch({
                  type: this.actionTypes.replySuccess
                });
                this.store.dispatch({
                  type: this.actionTypes.removeMessageText,
                  conversationId: this.currentConversationId
                });
                return _context11.abrupt("return", responses[0]);

              case 10:
                this._onReplyError();

                return _context11.abrupt("return", null);

              case 14:
                _context11.prev = 14;
                _context11.t0 = _context11["catch"](1);

                this._onReplyError(_context11.t0);

                throw _context11.t0;

              case 18:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee10, this, [[1, 14]]);
      }));

      function replyToReceivers(_x5) {
        return _replyToReceivers.apply(this, arguments);
      }

      return replyToReceivers;
    }()
  }, {
    key: "_onReplyError",
    value: function _onReplyError(error) {
      this.store.dispatch({
        type: this.actionTypes.replyError,
        error: error
      });
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
    key: "deleteCoversation",
    value: function () {
      var _deleteCoversation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(conversationId) {
        var conversation;
        return regeneratorRuntime.wrap(function _callee11$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (conversationId) {
                  _context12.next = 2;
                  break;
                }

                return _context12.abrupt("return");

              case 2:
                if (!this._messageStore.conversationStore[conversationId]) {
                  _context12.next = 6;
                  break;
                }

                _context12.next = 5;
                return this._messageStore.deleteConversationMessages(conversationId);

              case 5:
                return _context12.abrupt("return");

              case 6:
                conversation = this.allConversations.find(function (c) {
                  return c.conversationId === conversationId;
                });

                if (conversation) {
                  _context12.next = 9;
                  break;
                }

                return _context12.abrupt("return");

              case 9:
                if (!(0, _messageHelper.messageIsTextMessage)(conversation)) {
                  _context12.next = 13;
                  break;
                }

                _context12.next = 12;
                return this._messageStore.deleteCoversation(conversationId);

              case 12:
                return _context12.abrupt("return");

              case 13:
                _context12.prev = 13;
                _context12.next = 16;
                return this._messageStore.deleteMessageApi(conversationId);

              case 16:
                this.store.dispatch({
                  type: this.actionTypes.deleteConversation,
                  conversationId: conversationId
                });
                _context12.next = 22;
                break;

              case 19:
                _context12.prev = 19;
                _context12.t0 = _context12["catch"](13);
                console.error(_context12.t0);

              case 22:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee11, this, [[13, 19]]);
      }));

      function deleteCoversation(_x6) {
        return _deleteCoversation.apply(this, arguments);
      }

      return deleteCoversation;
    }()
  }, {
    key: "addEntities",
    value: function addEntities(entities) {
      this.store.dispatch({
        type: this.actionTypes.addEntities,
        entities: entities
      });
    }
  }, {
    key: "removeEntity",
    value: function removeEntity(entity) {
      this.store.dispatch({
        type: this.actionTypes.removeEntity,
        entity: entity
      });
    }
  }, {
    key: "addResponses",
    value: function addResponses(responses) {
      this.store.dispatch({
        type: this.actionTypes.addResponses,
        responses: responses
      });
    }
  }, {
    key: "removeResponse",
    value: function removeResponse(phoneNumber) {
      this.store.dispatch({
        type: this.actionTypes.removeResponse,
        phoneNumber: phoneNumber
      });
    }
  }, {
    key: "relateCorrespondentEntity",
    value: function relateCorrespondentEntity(responses) {
      var _this3 = this;

      if (!this._contactMatcher || !this._conversationLogger || !this.correspondentMatch.length) {
        return;
      }

      this.addResponses(responses);
      var _this$_regionSettings = this._regionSettings,
          countryCode = _this$_regionSettings.countryCode,
          areaCode = _this$_regionSettings.areaCode;
      var formattedCorrespondentMatch = this.correspondentMatch.map(function (item) {
        var formatted = (0, _normalizeNumber["default"])({
          phoneNumber: item.phoneNumber,
          countryCode: countryCode,
          areaCode: areaCode
        });
        return {
          phoneNumber: formatted,
          id: item.rawId
        };
      });
      formattedCorrespondentMatch.forEach(function (item) {
        var phoneNumber = item.phoneNumber;
        var conversationId = _this3.correspondentResponse[phoneNumber];

        _this3._conversationLogger.logConversation({
          entity: item,
          conversationId: conversationId
        });

        _this3.removeEntity(item);

        _this3.removeResponse(phoneNumber);
      });
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "searchInput",
    get: function get() {
      return this.state.searchInput;
    }
  }, {
    key: "typeFilter",
    get: function get() {
      return this.state.typeFilter;
    }
  }, {
    key: "currentPage",
    get: function get() {
      return this.state.currentPage;
    }
  }, {
    key: "oldConversations",
    get: function get() {
      return this.state.oldConversations;
    }
  }, {
    key: "fetchConversationsStatus",
    get: function get() {
      return this.state.fetchConversationsStatus;
    }
  }, {
    key: "currentConversationId",
    get: function get() {
      return this.state.currentConversationId;
    }
  }, {
    key: "fetchMessagesStatus",
    get: function get() {
      return this.state.fetchMessagesStatus;
    }
  }, {
    key: "oldMessages",
    get: function get() {
      return this.state.oldMessages;
    }
  }, {
    key: "loadingOldConversations",
    get: function get() {
      return this.fetchConversationsStatus === _status["default"].fetching;
    }
  }, {
    key: "loadingOldMessages",
    get: function get() {
      return this.fetchMessagesStatus === _status["default"].fetching;
    }
  }, {
    key: "pushing",
    get: function get() {
      return this.state.conversationStatus === _status["default"].pushing;
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return this._rolesAndPermissions.hasReadMessagesPermission;
    }
  }, {
    key: "correspondentMatch",
    get: function get() {
      return this.state.correspondentMatch;
    }
  }, {
    key: "correspondentResponse",
    get: function get() {
      return this.state.correspondentResponse;
    }
  }]);

  return Conversations;
}(_RcModule2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "updateSearchInput", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSearchInput"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateTypeFilter", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateTypeFilter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchOldConversations", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchOldConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadNextPage", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "loadNextPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetCurrentPage", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "resetCurrentPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadConversation", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "loadConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unloadConversation", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "unloadConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchOldMessages", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchOldMessages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMessageText", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMessageText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "replyToReceivers", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "replyToReceivers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteCoversation", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteCoversation"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "allConversations", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;

    return [function () {
      return _this4._messageStore.allConversations;
    }, function () {
      return _this4.oldConversations;
    }, function (conversations, oldConversations) {
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
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "uniqueNumbers", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;

    return [function () {
      return _this5.pagingConversations;
    }, getUniqueNumbers];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "allUniqueNumbers", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this6 = this;

    return [function () {
      return _this6.allConversations;
    }, getUniqueNumbers];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "effectiveSearchString", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this7 = this;

    return [function () {
      return _this7.state.searchInput;
    }, function (input) {
      if (input.length >= 3) return input;
      return '';
    }];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "typeFilteredConversations", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this8 = this;

    return [function () {
      return _this8.allConversations;
    }, function () {
      return _this8.typeFilter;
    }, function (allConversations, typeFilter) {
      switch (typeFilter) {
        case _messageTypes["default"].text:
          return allConversations.filter(_messageHelper.messageIsTextMessage);

        case _messageTypes["default"].voiceMail:
          return allConversations.filter(_messageHelper.messageIsVoicemail);

        case _messageTypes["default"].fax:
          return allConversations.filter(_messageHelper.messageIsFax);

        default:
          return allConversations.filter(function (conversation) {
            return (_this8._rolesAndPermissions.readTextPermissions || !(0, _messageHelper.messageIsTextMessage)(conversation)) && (_this8._rolesAndPermissions.voicemailPermissions || !(0, _messageHelper.messageIsVoicemail)(conversation)) && (_this8._rolesAndPermissions.readFaxPermissions || !(0, _messageHelper.messageIsFax)(conversation));
          });
      }
    }];
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "formatedConversations", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this9 = this;

    return [function () {
      return _this9.typeFilteredConversations;
    }, function () {
      return _this9._extensionInfo.extensionNumber;
    }, function () {
      return _this9._contactMatcher && _this9._contactMatcher.dataMapping;
    }, function () {
      return _this9._conversationLogger && _this9._conversationLogger.loggingMap;
    }, function () {
      return _this9._conversationLogger && _this9._conversationLogger.dataMapping;
    }, function () {
      return _this9._auth.accessToken;
    }, function (conversations, extensionNumber) {
      var contactMapping = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var loggingMap = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var conversationLogMapping = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var accessToken = arguments.length > 5 ? arguments[5] : undefined;
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
        var conversationLogId = _this9._conversationLogger ? _this9._conversationLogger.getConversationLogId(message) : null;
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

        var mmsAttachment = null;

        if ((0, _messageHelper.messageIsTextMessage)(message) && (0, _isBlank["default"])(message.subject) && _this9._showMMSAttachment) {
          mmsAttachment = (0, _messageHelper.getMMSAttachment)(message);
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
          mmsAttachment: mmsAttachment,
          lastMatchedCorrespondentEntity: _this9._conversationLogger && _this9._conversationLogger.getLastMatchedCorrespondentEntity(message) || null
        });
      });
    }];
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "filteredConversations", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this10 = this;

    return [function () {
      return _this10.formatedConversations;
    }, function () {
      return _this10.effectiveSearchString;
    }, function (conversations, effectiveSearchString) {
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

        var messageList = _this10._messageStore.conversationStore[message.conversationId] || [];
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
    }];
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "pagingConversations", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this11 = this;

    return [function () {
      return _this11.filteredConversations;
    }, function () {
      return _this11.currentPage;
    }, function (conversations, pageNumber) {
      var lastIndex = pageNumber * _this11._perPage;
      return conversations.slice(0, lastIndex);
    }];
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "earliestTime", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this12 = this;

    return [function () {
      return _this12.typeFilteredConversations;
    }, getEarliestTime];
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "currentConversation", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this13 = this;

    return [function () {
      return _this13.currentConversationId;
    }, function () {
      return _this13._extensionInfo.extensionNumber;
    }, function () {
      return _this13._contactMatcher && _this13._contactMatcher.dataMapping;
    }, function () {
      return _this13.oldMessages;
    }, function () {
      return _this13._messageStore.conversationStore;
    }, function () {
      return _this13.allConversations;
    }, function () {
      return _this13._auth.accessToken;
    }, function () {
      return _this13._conversationLogger && _this13._conversationLogger.dataMapping;
    }, function () {
      return _this13._conversationLogger && _this13._conversationLogger.loggingMap;
    }, function (conversationId, extensionNumber, contactMapping, oldMessages, conversationStore, conversations, accessToken) {
      var conversationLogMapping = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : {};
      var loggingMap = arguments.length > 8 ? arguments[8] : undefined;
      var conversation = conversations.find(function (c) {
        return c.conversationId === conversationId;
      });
      var messages = [].concat(conversationStore[conversationId] || []);

      var currentConversation = _objectSpread({}, conversation);

      var allMessages = mergeMessages(messages, oldMessages).map(function (m) {
        if (!_this13._showMMSAttachment) {
          return m;
        }

        var mmsAttachment = (0, _messageHelper.getMMSAttachment)(m, accessToken);
        return _objectSpread(_objectSpread({}, m), {}, {
          mmsAttachment: mmsAttachment
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
      var conversationLogId = _this13._conversationLogger ? _this13._conversationLogger.getConversationLogId(conversation) : null;
      var conversationMatches = conversationLogMapping[conversationLogId] || [];
      currentConversation.correspondents = correspondents;
      currentConversation.correspondentMatches = correspondentMatches;
      currentConversation.conversationMatches = conversationMatches;
      currentConversation.messages = allMessages.reverse();
      currentConversation.senderNumber = (0, _messageHelper.getMyNumberFromMessage)({
        message: conversation,
        myExtensionNumber: _this13._extensionInfo.extensionNumber
      });
      currentConversation.recipients = (0, _messageHelper.getRecipientNumbersFromMessage)({
        message: conversation,
        myNumber: currentConversation.senderNumber
      });
      currentConversation.isLogging = !!(conversationLogId && loggingMap[conversationLogId]);
      return currentConversation;
    }];
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "messageText", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this14 = this;

    return [function () {
      return _this14.state.messageTexts;
    }, function () {
      return _this14.currentConversationId;
    }, function (messageTexts, conversationId) {
      var res = messageTexts.find(function (msg) {
        return _typeof(msg) === 'object' && msg.conversationId === conversationId;
      });
      return res ? res.text : '';
    }];
  }
})), _class2)) || _class);
exports["default"] = Conversations;
//# sourceMappingURL=index.js.map
