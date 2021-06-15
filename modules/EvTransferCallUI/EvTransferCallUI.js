"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvTransferCallUI = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.string.trim");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.replace");

require("regenerator-runtime/runtime");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _core = require("@ringcentral-integration/core");

var _di = require("ringcentral-integration/lib/di");

var _transferTypes = require("../../enums/transferTypes");

var _i18n = _interopRequireDefault(require("./i18n"));

var _util = require("./util");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

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
      var blankRegex = /\s+/g; // when there is not have firstName and lastName, use username to search

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
