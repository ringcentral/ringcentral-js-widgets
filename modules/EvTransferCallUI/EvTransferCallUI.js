"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvTransferCallUI = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.string.trim");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.replace");

require("regenerator-runtime/runtime");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.find");

var _core = require("@ringcentral-integration/core");

var _di = require("ringcentral-integration/lib/di");

var _transferTypes = require("../../enums/transferTypes");

var _i18n = _interopRequireDefault(require("./i18n"));

var _util = require("./util");

var _dec, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var EvTransferCallUI = (_dec = (0, _di.Module)({
  name: 'EvTransferCallUI',
  deps: ['RouterInteraction', 'Locale', 'EvCall', 'EvTransferCall', 'EvAuth', 'Environment', 'EvRequeueCall', {
    dep: 'EvTransferCallUIOptions',
    optional: true
  }]
}), _dec(_class = (_temp = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(EvTransferCallUI, _RcUIModuleV);

  var _super = _createSuper(EvTransferCallUI);

  function EvTransferCallUI(_ref) {
    var _this;

    var locale = _ref.locale,
        routerInteraction = _ref.routerInteraction,
        evCall = _ref.evCall,
        evTransferCall = _ref.evTransferCall,
        evAuth = _ref.evAuth,
        environment = _ref.environment,
        evRequeueCall = _ref.evRequeueCall;

    _classCallCheck(this, EvTransferCallUI);

    _this = _super.call(this, {
      modules: {
        locale: locale,
        routerInteraction: routerInteraction,
        evCall: evCall,
        evTransferCall: evTransferCall,
        evAuth: evAuth,
        environment: environment,
        evRequeueCall: evRequeueCall
      }
    });
    _this.routerQueueGroupId = void 0;
    _this.getSelectedQueueGroup = (0, _core.createSelector)(function () {
      return _this._modules.evAuth.agent.agentConfig.inboundSettings.availableRequeueQueues;
    }, function () {
      return _this._modules.evRequeueCall.selectedQueueGroupId;
    }, function () {
      return _this.routerQueueGroupId;
    }, function (availableRequeueQueue, selectedQueueGroupId, routerQueueGroupId) {
      var queueGroupId = routerQueueGroupId || selectedQueueGroupId;

      if (queueGroupId && availableRequeueQueue && availableRequeueQueue.length > 0) {
        return availableRequeueQueue.find(function (queue) {
          return queue.gateGroupId === queueGroupId;
        });
      }

      return null;
    });
    _this.getSelectedGate = (0, _core.createSelector)(function () {
      return _this.getSelectedQueueGroup();
    }, function () {
      return _this._modules.evRequeueCall.selectedGateId;
    }, function (selectedQueueGroup, selectedGateId) {
      if (selectedQueueGroup && selectedGateId) {
        var gates = selectedQueueGroup.gates;

        if (gates && gates.length > 0) {
          return gates.find(function (queue) {
            return queue.gateId === selectedGateId;
          });
        }
      }

      return null;
    });

    _this.goToActivityCallLogPage = function () {
      _this._modules.routerInteraction.push("/activityCallLog/".concat(_this.callId));
    };

    _this.goToRequeueCallPage = function () {
      _this._redirectRequeueCall();
    };

    _this.goToRequeueGroupPage = function () {
      if (_this.selectQueueGroupDisabled) return;

      _this._redirectRequeueCall("/queueGroup");
    };

    _this.goToRequeueGroupDetailPage = function (_ref2) {
      var groupId = _ref2.groupId,
          isCheckDisable = _ref2.isCheckDisable;
      if (isCheckDisable && _this.gateDisabled) return;

      _this._redirectRequeueCall("/queueGroup/".concat(groupId));
    };

    _this.getTransferOptions = (0, _core.createSelector)(function () {
      return _this._modules.locale.currentLocale;
    }, function () {
      return _this.evTransferCall.allowInternalTransfer;
    }, function () {
      return _this.getSelectedCallRecipient();
    }, function () {
      return _this.getSelectedQueueGroup();
    }, function () {
      return _this.getSelectedGate();
    }, function () {
      return _this.callId;
    }, function () {
      return _this._modules.evRequeueCall.selectedQueueGroupId;
    }, function (currentLocale, allowInternalTransfer, selectedCallRecipient, selectedQueueGroup, selectedGate, callId, selectedQueueGroupId) {
      var number = _this.evTransferCall.getNumber() || '';
      var currentRouteUrl = "/activityCallLog/".concat(callId, "/transferCall");
      var noTransferType = !_this.evTransferCall.transferType;
      var noSelectedQueueGroup = !selectedQueueGroup;
      return [].concat(_toConsumableArray(allowInternalTransfer ? [{
        type: _transferTypes.transferTypes.internal,
        label: _i18n["default"].getString(_transferTypes.transferTypes.internal, currentLocale),
        textFields: [{
          router: "".concat(currentRouteUrl, "/internal"),
          label: _i18n["default"].getString('callRecipientName', currentLocale),
          placeholder: _i18n["default"].getString('callRecipientNamePlaceholder', currentLocale),
          value: selectedCallRecipient,
          disabled: noTransferType,
          readonly: noTransferType
        }]
      }] : []), [{
        type: _transferTypes.transferTypes.phoneBook,
        label: _i18n["default"].getString(_transferTypes.transferTypes.phoneBook, currentLocale),
        textFields: [{
          router: "".concat(currentRouteUrl, "/phoneBook"),
          label: _i18n["default"].getString('callRecipientName', currentLocale),
          placeholder: _i18n["default"].getString('callRecipientNamePlaceholder', currentLocale),
          value: selectedCallRecipient,
          disabled: noTransferType,
          readonly: noTransferType
        }, {
          label: _i18n["default"].getString('callRecipientNumber', currentLocale),
          placeholder: _i18n["default"].getString('callRecipientNumberPlaceholder', currentLocale),
          value: number,
          readonly: true
        }]
      }, {
        type: _transferTypes.transferTypes.queue,
        label: _i18n["default"].getString(_transferTypes.transferTypes.queue, currentLocale),
        textFields: [{
          router: "".concat(currentRouteUrl, "/queueGroup"),
          label: _i18n["default"].getString('queueGroup', currentLocale),
          placeholder: _i18n["default"].getString('callRecipientNamePlaceholder', currentLocale),
          value: selectedQueueGroup === null || selectedQueueGroup === void 0 ? void 0 : selectedQueueGroup.groupName,
          disabled: noTransferType,
          readonly: noTransferType
        }, {
          router: "".concat(currentRouteUrl, "/queueGroup/").concat(selectedQueueGroupId),
          label: _i18n["default"].getString('queueDetail', currentLocale),
          placeholder: _i18n["default"].getString('callRecipientNamePlaceholder', currentLocale),
          value: selectedGate === null || selectedGate === void 0 ? void 0 : selectedGate.gateName,
          disabled: noTransferType || noSelectedQueueGroup,
          readonly: noTransferType || noSelectedQueueGroup
        }]
      }, {
        type: _transferTypes.transferTypes.manualEntry,
        label: _i18n["default"].getString(_transferTypes.transferTypes.manualEntry, currentLocale),
        textFields: [{
          router: "".concat(currentRouteUrl, "/manualEntry"),
          label: _i18n["default"].getString('phoneNumber', currentLocale),
          placeholder: _i18n["default"].getString('enterThePhoneNumberPlaceholder', currentLocale),
          value: selectedCallRecipient,
          disabled: noTransferType,
          readonly: noTransferType
        }]
      }]);
    });
    _this.getSelectedCallRecipient = (0, _core.createSelector)(function () {
      return _this.evTransferCall.transferType;
    }, function () {
      return _this.evTransferCall.transferAgentList;
    }, function () {
      return _this.evTransferCall.transferAgentId;
    }, function () {
      return _this.evTransferCall.getTransferPhoneBook();
    }, function () {
      return _this.evTransferCall.transferPhoneBookSelectedIndex;
    }, function () {
      return _this.evTransferCall.transferRecipientNumber;
    }, function () {
      return _this.evTransferCall.transferRecipientCountryId;
    }, function () {
      return _this._modules.evAuth.getAvailableCountries();
    }, function (transferType, transferAgentList, transferAgentId, transferPhoneBook, transferPhoneBookSelected, transferRecipientNumber, transferRecipientCountryId, availableCountries) {
      if (transferType === _transferTypes.transferTypes.internal && transferAgentId) {
        var selectedAgent = transferAgentList.find(function (_ref3) {
          var agentId = _ref3.agentId;
          return agentId === transferAgentId;
        });
        return selectedAgent ? (0, _util.getInternalTransferName)(selectedAgent) : '';
      }

      if (transferType === _transferTypes.transferTypes.phoneBook && typeof transferPhoneBookSelected !== 'undefined' && transferPhoneBookSelected !== null) {
        var phoneBook = transferPhoneBook[transferPhoneBookSelected];

        if (phoneBook.countryId === 'USA') {
          return phoneBook.name;
        }

        var country = availableCountries.find(function (_ref4) {
          var countryId = _ref4.countryId;
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

        var _country = availableCountries.find(function (_ref5) {
          var countryId = _ref5.countryId;
          return countryId === transferRecipientCountryId;
        });

        return "".concat(transferRecipientNumber, " (").concat(_country.countryName || _country.countryId, ")");
      }

      return '';
    });
    _this.getTransferCallDisabled = (0, _core.createSelector)(function () {
      return _this.isQueueTransfer;
    }, function () {
      return _this._modules.evCall.getCurrentCall();
    }, function () {
      return _this.getSelectedCallRecipient();
    }, function () {
      return _this.evTransferCall.transferring;
    }, function () {
      return _this.requeueCallDisabled;
    }, function (isQueueTransfer, _ref6, selectedCallRecipient, transferring, requeueCallDisabled) {
      var endedCall = _ref6.endedCall,
          allowTransfer = _ref6.allowTransfer;
      return isQueueTransfer ? requeueCallDisabled : !allowTransfer || !selectedCallRecipient || !!endedCall || transferring;
    });
    _this.getTextFields = (0, _core.createSelector)(function () {
      return _this.getTransferOptions();
    }, function () {
      return _this.evTransferCall.transferType;
    }, function (transferOptions, transferType) {
      var _transferOptions$find = transferOptions.find(function (_ref7) {
        var type = _ref7.type;
        return type === transferType;
      }),
          textFields = _transferOptions$find.textFields;

      return textFields;
    });
    _this.getStayOnCall = (0, _core.createSelector)(function () {
      return _this.isQueueTransfer;
    }, function () {
      return _this._modules.evRequeueCall.stayOnCall;
    }, function () {
      return _this.evTransferCall.stayOnCall;
    }, function (isQueueTransfer, evRequeueCallStayOnCall, evTransferCallStayOnCall) {
      return isQueueTransfer ? evRequeueCallStayOnCall : evTransferCallStayOnCall;
    });

    _this.evTransferCall.onTransferSuccess(function () {
      if (/^\/activityCallLog\/.+\/transferCall$/.test(_this._modules.routerInteraction.currentPath)) {
        _this.goToActivityCallLogPage();
      }
    });

    return _this;
  }

  _createClass(EvTransferCallUI, [{
    key: "_redirectRequeueCall",
    value: function _redirectRequeueCall() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      this._modules.routerInteraction.push("/activityCallLog/".concat(this.callId, "/transferCall").concat(url));
    }
  }, {
    key: "_searchQueue",
    value: function _searchQueue(fromText, text) {
      return fromText && text && fromText.toLowerCase().includes(text.toLowerCase());
    }
  }, {
    key: "_submitSelection",
    value: function _submitSelection(queueId) {
      this._modules.evRequeueCall.setStatus({
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
                return this._modules.evRequeueCall.requeueCall();

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
      this._modules.routerInteraction.goBack();
    }
  }, {
    key: "clickCallRecipient",
    value: function clickCallRecipient(router) {
      if (router) {
        this._modules.routerInteraction.push(router);
      }
    }
  }, {
    key: "gotoActivityCallLogPage",
    value: function gotoActivityCallLogPage() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.callId;

      this._modules.routerInteraction.push("/activityCallLog/".concat(id));
    }
  }, {
    key: "gotoTransferCallPage",
    value: function gotoTransferCallPage() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.callId;

      this._modules.routerInteraction.push("/activityCallLog/".concat(id, "/transferCall"));
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
    value: function _searchPhoneBook(option, text) {
      var _option$name, _option$destination;

      return text && ((_option$name = option.name) === null || _option$name === void 0 ? void 0 : _option$name.toLowerCase().includes(text.toLowerCase())) || ((_option$destination = option.destination) === null || _option$destination === void 0 ? void 0 : _option$destination.includes(text)) || // TODO: think about `trim`?
      option._parsedDestination && option._parsedDestination.includes(text);
    }
  }, {
    key: "_clickTransferTypeFiled",
    value: function _clickTransferTypeFiled(type) {
      this.evTransferCall.changeTransferType(type);

      if (type !== _transferTypes.transferTypes.queue) {
        var _goalTransferOption$t;

        var goalTransferOption = this.getTransferOptions().find(function (transferOption) {
          return transferOption.type === type;
        });
        this.clickCallRecipient(goalTransferOption === null || goalTransferOption === void 0 ? void 0 : (_goalTransferOption$t = goalTransferOption.textFields[0]) === null || _goalTransferOption$t === void 0 ? void 0 : _goalTransferOption$t.router);
      }
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref8) {
      var id = _ref8.id,
          groupId = _ref8.groupId;
      this._modules.evCall.activityCallId = id;
      this.routerQueueGroupId = groupId;
      return {
        currentLocale: this._modules.locale.currentLocale,
        transferOptions: this.getTransferOptions(),
        transferring: this.evTransferCall.transferring,
        transferRecipientCountryId: this.evTransferCall.transferRecipientCountryId,
        transferRecipientNumber: this.evTransferCall.transferRecipientNumber,
        transferPhoneBookSelectedIndex: this.evTransferCall.transferPhoneBookSelectedIndex,
        transferAgentId: this.evTransferCall.transferAgentId,
        isStayOnCall: this.getStayOnCall(),
        selectedTransferType: this.evTransferCall.transferType,
        transferAgentList: this.evTransferCall.transferAgentList,
        transferPhoneBook: this.evTransferCall.getTransferPhoneBook(),
        transferAgentListUpdateTTL: 3000,
        transferCountryOptions: this._modules.evAuth.getAvailableCountries(),
        allowManualInternationalTransfer: this.evTransferCall.allowManualInternationalTransfer,
        textFields: this.getTextFields(),
        transferCallDisabled: this.getTransferCallDisabled(),
        isWide: this._modules.environment.isWide,
        // requeuing state
        requeuing: this._modules.evRequeueCall.requeuing,
        // availableRequeueQueues
        queueGroups: this._modules.evAuth.getAvailableRequeueQueues(),
        selectedQueueGroupId: this._modules.evRequeueCall.selectedQueueGroupId,
        selectedGateId: this._modules.evRequeueCall.selectedGateId,
        // selected object
        selectedQueueGroup: this.getSelectedQueueGroup(),
        selectedGate: this.getSelectedGate(),
        // disabled
        gateDisabled: this.gateDisabled,
        selectQueueGroupDisabled: this.selectQueueGroupDisabled
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
          return _this2.isQueueTransfer ? _this2._modules.evRequeueCall.setStatus({
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
      return !this._modules.evAuth.agentPermissions.allowCrossQueueRequeue;
    }
  }, {
    key: "gateDisabled",
    get: function get() {
      return !(this._modules.evRequeueCall.selectedQueueGroupId && this._modules.evAuth.agentPermissions.allowCrossQueueRequeue);
    }
  }, {
    key: "requeueCallDisabled",
    get: function get() {
      return this._modules.evRequeueCall.requeuing || !this._modules.evRequeueCall.selectedGateId || !!this._modules.evCall.getCurrentCall().endedCall;
    }
  }, {
    key: "callId",
    get: function get() {
      return this._modules.evCall.activityCallId;
    }
  }, {
    key: "evTransferCall",
    get: function get() {
      return this._modules.evTransferCall;
    }
  }, {
    key: "isQueueTransfer",
    get: function get() {
      return this.evTransferCall.transferType === _transferTypes.transferTypes.queue;
    }
  }]);

  return EvTransferCallUI;
}(_core.RcUIModuleV2), _temp)) || _class);
exports.EvTransferCallUI = EvTransferCallUI;
//# sourceMappingURL=EvTransferCallUI.js.map
