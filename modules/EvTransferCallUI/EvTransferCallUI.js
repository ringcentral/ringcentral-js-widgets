"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.includes");
require("core-js/modules/es.string.replace");
require("core-js/modules/es.string.split");
require("core-js/modules/es.string.trim");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvTransferCallUI = void 0;
require("regenerator-runtime/runtime");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _transferTypes = require("../../enums/transferTypes");
var _i18n = _interopRequireDefault(require("./i18n"));
var _util = require("./util");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var EvTransferCallUI = (_dec = (0, _di.Module)({
  name: 'EvTransferCallUI',
  deps: ['RouterInteraction', 'Locale', 'EvCall', 'EvTransferCall', 'EvAuth', 'Environment', 'EvRequeueCall', {
    dep: 'EvTransferCallUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.evAuth.agent.agentConfig.inboundSettings.availableRequeueQueues, that._deps.evRequeueCall.selectedQueueGroupId, that.routerQueueGroupId];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that.selectedQueueGroup, that._deps.evRequeueCall.selectedGateId];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that._deps.locale.currentLocale, that._deps.evRequeueCall.selectedQueueGroupId, that._deps.evRequeueCall.allowRequeueCall, that._deps.evTransferCall.allowTransferCall, that.evTransferCall.allowInternalTransfer, that.selectedCallRecipient, that.selectedQueueGroup, that.selectedGate, that.callId, that.selectQueueGroupDisabled, that.disabled];
}), _dec5 = (0, _core.computed)(function (that) {
  return [that.evTransferCall.transferType, that.evTransferCall.transferAgentList, that.evTransferCall.transferAgentId, that.evTransferCall.transferPhoneBook, that.evTransferCall.transferPhoneBookSelectedIndex, that.evTransferCall.transferRecipientNumber, that.evTransferCall.transferRecipientCountryId, that._deps.evAuth.availableCountries];
}), _dec6 = (0, _core.computed)(function (that) {
  return [that.isQueueTransfer, that._deps.evCall.currentCall, that.selectedCallRecipient, that.evTransferCall.transferring, that.requeueCallDisabled];
}), _dec7 = (0, _core.computed)(function (that) {
  return [that.transferOptions, that.evTransferCall.transferType];
}), _dec8 = (0, _core.computed)(function (that) {
  return [that.isQueueTransfer, that._deps.evRequeueCall.stayOnCall, that.evTransferCall.stayOnCall];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(EvTransferCallUI, _RcUIModuleV);
  var _super = _createSuper(EvTransferCallUI);
  function EvTransferCallUI(deps) {
    var _this;
    _classCallCheck(this, EvTransferCallUI);
    _this = _super.call(this, {
      deps: deps
    });
    _this.routerQueueGroupId = void 0;
    _this.goToActivityCallLogPage = function () {
      _this._deps.routerInteraction.push("/activityCallLog/".concat(_this.callId));
    };
    _this.goToRequeueCallPage = function () {
      _this._redirectRequeueCall();
    };
    _this.goToRequeueGroupPage = function () {
      if (_this.selectQueueGroupDisabled) return;
      _this._redirectRequeueCall("/queueGroup");
    };
    _this.goToRequeueGroupDetailPage = function (_ref) {
      var groupId = _ref.groupId,
        isCheckDisable = _ref.isCheckDisable;
      if (isCheckDisable && _this.disabled) return;
      _this._redirectRequeueCall("/queueGroup/".concat(groupId));
    };
    _this.evTransferCall.onTransferSuccess(function () {
      if (/^\/activityCallLog\/.+\/transferCall$/.test(_this._deps.routerInteraction.currentPath)) {
        _this.goToActivityCallLogPage();
      }
    });
    return _this;
  }
  _createClass(EvTransferCallUI, [{
    key: "_redirectRequeueCall",
    value: function _redirectRequeueCall() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this._deps.routerInteraction.push("/activityCallLog/".concat(this.callId, "/transferCall").concat(url));
    }
  }, {
    key: "_searchQueue",
    value: function _searchQueue(fromText, text) {
      return fromText === null || fromText === void 0 ? void 0 : fromText.toLowerCase().includes(text.toLowerCase());
    }
  }, {
    key: "_submitSelection",
    value: function _submitSelection(queueId) {
      this._deps.evRequeueCall.setStatus({
        selectedQueueGroupId: this.routerQueueGroupId,
        selectedGateId: queueId
      });
      this.goToRequeueCallPage();
    }
  }, {
    key: "_submitRequeueCall",
    value: function () {
      var _submitRequeueCall2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.requeueCallDisabled) {
                  _context.next = 4;
                  break;
                }
                _context.next = 3;
                return this._deps.evRequeueCall.requeueCall();
              case 3:
                this.goToActivityCallLogPage();
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function _submitRequeueCall() {
        return _submitRequeueCall2.apply(this, arguments);
      }
      return _submitRequeueCall;
    }()
  }, {
    key: "goBack",
    value: function goBack() {
      this._deps.routerInteraction.goBack();
    }
  }, {
    key: "clickCallRecipient",
    value: function clickCallRecipient(router) {
      if (router) {
        this._deps.routerInteraction.push(router);
      }
    }
  }, {
    key: "gotoActivityCallLogPage",
    value: function gotoActivityCallLogPage() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.callId;
      this._deps.routerInteraction.push("/activityCallLog/".concat(id));
    }
  }, {
    key: "gotoTransferCallPage",
    value: function gotoTransferCallPage() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.callId;
      this._deps.routerInteraction.push("/activityCallLog/".concat(id, "/transferCall"));
    }
  }, {
    key: "transferCall",
    value: function transferCall() {
      return this.isQueueTransfer ? this._submitRequeueCall() : this.evTransferCall.transfer();
    }
  }, {
    key: "_searchAgent",
    value: function _searchAgent(options, text) {
      var _options$firstName, _options$lastName;
      var firstName = (_options$firstName = options.firstName) !== null && _options$firstName !== void 0 ? _options$firstName : '';
      var lastName = (_options$lastName = options.lastName) !== null && _options$lastName !== void 0 ? _options$lastName : '';
      var blankRegex = /\s+/g;
      // when there is not have firstName and lastName, use username to search
      var name = ("".concat(firstName).concat(lastName) || options.username).replace(blankRegex, '').toLowerCase();
      var keywords = text.toLowerCase().trim().split(blankRegex);
      return keywords.length > 0 && keywords.filter(function (keyword) {
        return name.includes(keyword);
      }).length > 0;
    }
  }, {
    key: "_searchPhoneBook",
    value: function _searchPhoneBook(_ref2, text) {
      var phoneBookName = _ref2.phoneBookName,
        destination = _ref2.destination,
        parsedDestination = _ref2.parsedDestination;
      var searchText = text.toLowerCase();
      return (phoneBookName === null || phoneBookName === void 0 ? void 0 : phoneBookName.toLowerCase().includes(searchText)) || (destination === null || destination === void 0 ? void 0 : destination.includes(searchText)) || (parsedDestination === null || parsedDestination === void 0 ? void 0 : parsedDestination.includes(searchText));
    }
  }, {
    key: "_clickTransferTypeFiled",
    value: function _clickTransferTypeFiled(type) {
      this.evTransferCall.changeTransferType(type);
      if (type !== _transferTypes.transferTypes.queue) {
        var _goalTransferOption$t;
        var goalTransferOption = this.transferOptions.find(function (transferOption) {
          return transferOption.type === type;
        });
        this.clickCallRecipient(goalTransferOption === null || goalTransferOption === void 0 ? void 0 : (_goalTransferOption$t = goalTransferOption.textFields[0]) === null || _goalTransferOption$t === void 0 ? void 0 : _goalTransferOption$t.router);
      }
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref3) {
      var id = _ref3.id,
        groupId = _ref3.groupId;
      this._deps.evCall.activityCallId = id;
      this.routerQueueGroupId = groupId;
      return {
        currentLocale: this._deps.locale.currentLocale,
        transferOptions: this.transferOptions,
        transferring: this.evTransferCall.transferring,
        transferRecipientCountryId: this.evTransferCall.transferRecipientCountryId,
        transferRecipientNumber: this.evTransferCall.transferRecipientNumber,
        transferPhoneBookSelectedIndex: this.evTransferCall.transferPhoneBookSelectedIndex,
        transferAgentId: this.evTransferCall.transferAgentId,
        isStayOnCall: this.stayOnCall,
        selectedTransferType: this.evTransferCall.transferType,
        transferAgentList: this.evTransferCall.transferAgentList,
        transferPhoneBook: this.evTransferCall.transferPhoneBook,
        transferAgentListUpdateTTL: 3000,
        transferCountryOptions: this._deps.evAuth.availableCountries,
        allowManualInternationalTransfer: this.evTransferCall.allowManualInternationalTransfer,
        textFields: this.textFields,
        transferCallDisabled: this.transferCallDisabled,
        isWide: this._deps.environment.isWide,
        // requeuing state
        requeuing: this._deps.evRequeueCall.requeuing,
        // availableRequeueQueues
        queueGroups: this._deps.evAuth.availableRequeueQueues,
        selectedQueueGroupId: this._deps.evRequeueCall.selectedQueueGroupId,
        selectedGateId: this._deps.evRequeueCall.selectedGateId,
        // selected object
        selectedQueueGroup: this.selectedQueueGroup,
        selectedGate: this.selectedGate
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this2 = this;
      return {
        goBack: function goBack() {
          return _this2.goBack();
        },
        clickCallRecipient: function clickCallRecipient(router) {
          return _this2.clickCallRecipient(router);
        },
        clickTransferTypeFiled: function clickTransferTypeFiled(type) {
          return _this2._clickTransferTypeFiled(type);
        },
        setStayOnCall: function setStayOnCall(status) {
          return _this2.isQueueTransfer ? _this2._deps.evRequeueCall.setStatus({
            stayOnCall: !status
          }) : _this2.evTransferCall.changeStayOnCall(status);
        },
        fetchAgentList: function fetchAgentList() {
          return _this2.evTransferCall.fetchAgentList();
        },
        changeRecipientNumber: function changeRecipientNumber(recipientNumber) {
          _this2.evTransferCall.changeRecipientNumber(recipientNumber);
          _this2.evTransferCall.changeTransferType(_transferTypes.transferTypes.manualEntry);
          _this2.gotoTransferCallPage();
        },
        changeTransferPhoneBookSelected: function changeTransferPhoneBookSelected(index) {
          _this2.evTransferCall.changeTransferPhoneBookSelected(index);
          _this2.evTransferCall.changeTransferType(_transferTypes.transferTypes.phoneBook);
          _this2.gotoTransferCallPage();
        },
        changeRecipientCountryId: function changeRecipientCountryId(countryId) {
          return _this2.evTransferCall.changeRecipientCountryId(countryId);
        },
        changeTransferAgentId: function changeTransferAgentId(agentId) {
          _this2.evTransferCall.changeTransferAgentId(agentId);
          _this2.evTransferCall.changeTransferType(_transferTypes.transferTypes.internal);
          _this2.gotoTransferCallPage();
        },
        transferCall: function transferCall() {
          return _this2.transferCall();
        },
        setCancelTemplate: function setCancelTemplate(templates) {
          return _this2.evTransferCall.setCancelTemplate(templates);
        },
        cancelTransfer: function cancelTransfer() {
          return _this2.evTransferCall.cancelTransfer();
        },
        cancelTransferPage: function cancelTransferPage() {
          return _this2.gotoActivityCallLogPage();
        },
        goToActivityCallLogPage: this.goToActivityCallLogPage,
        goToRequeueCallPage: this.goToRequeueCallPage,
        goToRequeueGroupPage: this.goToRequeueGroupPage,
        goToRequeueGroupDetailPage: this.goToRequeueGroupDetailPage,
        searchAgent: function searchAgent(option, text) {
          return _this2._searchAgent(option, text);
        },
        searchPhoneBook: function searchPhoneBook(option, text) {
          return _this2._searchPhoneBook(option, text);
        },
        searchGroup: function searchGroup(option, text) {
          return _this2._searchQueue(option.groupName, text);
        },
        searchGate: function searchGate(option, text) {
          return _this2._searchQueue(option.gateName, text);
        },
        submitSelection: function submitSelection(queueId) {
          return _this2._submitSelection(queueId);
        }
      };
    }
  }, {
    key: "selectQueueGroupDisabled",
    get: function get() {
      return !this._deps.evAuth.agentPermissions.allowCrossQueueRequeue;
    }
  }, {
    key: "disabled",
    get: function get() {
      return !(this._deps.evRequeueCall.selectedQueueGroupId && this._deps.evAuth.agentPermissions.allowCrossQueueRequeue);
    }
  }, {
    key: "requeueCallDisabled",
    get: function get() {
      var _this$_deps$evCall$cu;
      return this._deps.evRequeueCall.requeuing || !this._deps.evRequeueCall.selectedGateId || !!((_this$_deps$evCall$cu = this._deps.evCall.currentCall) === null || _this$_deps$evCall$cu === void 0 ? void 0 : _this$_deps$evCall$cu.endedCall);
    }
  }, {
    key: "selectedQueueGroup",
    get: function get() {
      var queueGroupId = this.routerQueueGroupId || this._deps.evRequeueCall.selectedQueueGroupId;
      var availableRequeueQueues = this._deps.evAuth.agent.agentConfig.inboundSettings.availableRequeueQueues;
      if (queueGroupId && availableRequeueQueues && availableRequeueQueues.length > 0) {
        return availableRequeueQueues.find(function (queue) {
          return queue.gateGroupId === queueGroupId;
        });
      }
      return null;
    }
  }, {
    key: "selectedGate",
    get: function get() {
      var selectedGateId = this._deps.evRequeueCall.selectedGateId;
      if (this.selectedQueueGroup && selectedGateId) {
        var gates = this.selectedQueueGroup.gates;
        if (gates && gates.length > 0) {
          return gates.find(function (queue) {
            return queue.gateId === selectedGateId;
          });
        }
      }
      return null;
    }
  }, {
    key: "callId",
    get: function get() {
      return this._deps.evCall.activityCallId;
    }
  }, {
    key: "evTransferCall",
    get: function get() {
      return this._deps.evTransferCall;
    }
  }, {
    key: "transferOptions",
    get: function get() {
      var _this$selectedQueueGr, _this$selectedGate;
      var number = this.evTransferCall.getNumber() || '';
      var currentRouteUrl = "/activityCallLog/".concat(this.callId, "/transferCall");
      var currentLocale = this._deps.locale.currentLocale;
      return [].concat(_toConsumableArray(this._deps.evTransferCall.allowTransferCall && this.evTransferCall.allowInternalTransfer ? [{
        type: _transferTypes.transferTypes.internal,
        label: _i18n["default"].getString(_transferTypes.transferTypes.internal, currentLocale),
        textFields: [{
          router: "".concat(currentRouteUrl, "/internal"),
          label: _i18n["default"].getString('callRecipientName', currentLocale),
          placeholder: _i18n["default"].getString('callRecipientNamePlaceholder', currentLocale),
          value: this.selectedCallRecipient
        }]
      }] : []), _toConsumableArray(this._deps.evTransferCall.allowTransferCall ? [{
        type: _transferTypes.transferTypes.phoneBook,
        label: _i18n["default"].getString(_transferTypes.transferTypes.phoneBook, currentLocale),
        textFields: [{
          router: "".concat(currentRouteUrl, "/phoneBook"),
          label: _i18n["default"].getString('callRecipientName', currentLocale),
          placeholder: _i18n["default"].getString('callRecipientNamePlaceholder', currentLocale),
          value: this.selectedCallRecipient
        }, {
          label: _i18n["default"].getString('callRecipientNumber', currentLocale),
          placeholder: _i18n["default"].getString('callRecipientNumberPlaceholder', currentLocale),
          value: number,
          readonly: true
        }]
      }] : []), _toConsumableArray(this._deps.evRequeueCall.allowRequeueCall ? [{
        type: _transferTypes.transferTypes.queue,
        label: _i18n["default"].getString(_transferTypes.transferTypes.queue, currentLocale),
        textFields: [{
          router: "".concat(currentRouteUrl, "/queueGroup"),
          label: _i18n["default"].getString('queueGroup', currentLocale),
          placeholder: _i18n["default"].getString('callRecipientNamePlaceholder', currentLocale),
          value: (_this$selectedQueueGr = this.selectedQueueGroup) === null || _this$selectedQueueGr === void 0 ? void 0 : _this$selectedQueueGr.groupName,
          disabled: this.selectQueueGroupDisabled,
          readonly: this.selectQueueGroupDisabled
        }, {
          router: "".concat(currentRouteUrl, "/queueGroup/").concat(this._deps.evRequeueCall.selectedQueueGroupId),
          label: _i18n["default"].getString('queueDetail', currentLocale),
          placeholder: _i18n["default"].getString('callRecipientNamePlaceholder', currentLocale),
          value: (_this$selectedGate = this.selectedGate) === null || _this$selectedGate === void 0 ? void 0 : _this$selectedGate.gateName,
          disabled: this.disabled,
          readonly: this.disabled
        }]
      }] : []), _toConsumableArray(this._deps.evTransferCall.allowTransferCall ? [{
        type: _transferTypes.transferTypes.manualEntry,
        label: _i18n["default"].getString(_transferTypes.transferTypes.manualEntry, currentLocale),
        textFields: [{
          router: "".concat(currentRouteUrl, "/manualEntry"),
          label: _i18n["default"].getString('phoneNumber', currentLocale),
          placeholder: _i18n["default"].getString('enterThePhoneNumberPlaceholder', currentLocale),
          value: this.selectedCallRecipient
        }]
      }] : []));
    }
  }, {
    key: "isQueueTransfer",
    get: function get() {
      return this.evTransferCall.transferType === _transferTypes.transferTypes.queue;
    }
  }, {
    key: "selectedCallRecipient",
    get: function get() {
      var _this$evTransferCall = this.evTransferCall,
        transferType = _this$evTransferCall.transferType,
        transferAgentList = _this$evTransferCall.transferAgentList,
        transferAgentId = _this$evTransferCall.transferAgentId,
        transferPhoneBook = _this$evTransferCall.transferPhoneBook,
        transferPhoneBookSelectedIndex = _this$evTransferCall.transferPhoneBookSelectedIndex,
        transferRecipientNumber = _this$evTransferCall.transferRecipientNumber,
        transferRecipientCountryId = _this$evTransferCall.transferRecipientCountryId;
      var availableCountries = this._deps.evAuth.availableCountries;
      if (transferType === _transferTypes.transferTypes.internal && transferAgentId) {
        var selectedAgent = transferAgentList.find(function (_ref4) {
          var agentId = _ref4.agentId;
          return agentId === transferAgentId;
        });
        return selectedAgent ? (0, _util.getInternalTransferName)(selectedAgent) : '';
      }
      if (transferType === _transferTypes.transferTypes.phoneBook && typeof transferPhoneBookSelectedIndex !== 'undefined' && transferPhoneBookSelectedIndex !== null) {
        var phoneBook = transferPhoneBook[transferPhoneBookSelectedIndex];
        if (phoneBook.countryId === 'USA') {
          return phoneBook.name;
        }
        var country = availableCountries.find(function (_ref5) {
          var countryId = _ref5.countryId;
          return countryId === phoneBook.countryId;
        });
        if (country) {
          return "".concat(phoneBook.name, " (").concat(country.countryName || country.countryId, ")");
        }
        return "".concat(phoneBook.name, " (").concat(phoneBook.countryId, ")");
      }
      if (transferType === _transferTypes.transferTypes.manualEntry && transferRecipientNumber) {
        if (transferRecipientCountryId === 'USA') {
          return "".concat(transferRecipientNumber);
        }
        var _country = availableCountries.find(function (_ref6) {
          var countryId = _ref6.countryId;
          return countryId === transferRecipientCountryId;
        });
        return "".concat(transferRecipientNumber, " (").concat(_country.countryName || _country.countryId, ")");
      }
      return '';
    }
  }, {
    key: "transferCallDisabled",
    get: function get() {
      var _this$_deps$evCall$cu2 = this._deps.evCall.currentCall,
        endedCall = _this$_deps$evCall$cu2.endedCall,
        allowTransfer = _this$_deps$evCall$cu2.allowTransfer;
      return this.isQueueTransfer ? this.requeueCallDisabled : !allowTransfer || !this.selectedCallRecipient || !!endedCall || this.evTransferCall.transferring;
    }
  }, {
    key: "textFields",
    get: function get() {
      var _this3 = this;
      var transferOption = this.transferOptions.find(function (_ref7) {
        var type = _ref7.type;
        return type === _this3.evTransferCall.transferType;
      });
      return transferOption ? transferOption.textFields : [];
    }
  }, {
    key: "stayOnCall",
    get: function get() {
      return this.isQueueTransfer ? this._deps.evRequeueCall.stayOnCall : this.evTransferCall.stayOnCall;
    }
  }]);
  return EvTransferCallUI;
}(_core.RcUIModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "selectedQueueGroup", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "selectedQueueGroup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "selectedGate", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "selectedGate"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transferOptions", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "transferOptions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "selectedCallRecipient", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "selectedCallRecipient"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transferCallDisabled", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "transferCallDisabled"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "textFields", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "textFields"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stayOnCall", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "stayOnCall"), _class2.prototype)), _class2)) || _class);
exports.EvTransferCallUI = EvTransferCallUI;
//# sourceMappingURL=EvTransferCallUI.js.map
