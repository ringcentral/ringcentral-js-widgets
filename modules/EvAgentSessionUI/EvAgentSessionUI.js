"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvAgentSessionUI = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.function.name");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _di = require("ringcentral-integration/lib/di");

var _enums = require("../../enums");

var _sortByName = require("../../lib/sortByName");

var _i18n = _interopRequireDefault(require("./i18n"));

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var EvAgentSessionUI = (_dec = (0, _di.Module)({
  name: 'EvAgentSessionUI',
  deps: ['Locale', 'RouterInteraction', 'EvAuth', 'EvAgentSession', 'EvSettings', 'EvWorkingState', 'Storage', 'ModalUI', 'EvCallMonitor', 'Block', 'EvClient', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'EvAgentSessionUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.locale.currentLocale, that._deps.evAgentSession.inboundQueues, that._deps.evAgentSession.formGroup.selectedInboundQueueIds];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that._deps.evAgentSession.formGroup.selectedInboundQueueIds, that._deps.evAgentSession.inboundQueues];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that._deps.evAuth.authenticateResponse.agents, that._deps.evAuth.agentId];
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(EvAgentSessionUI, _RcUIModuleV);

  var _super = _createSuper(EvAgentSessionUI);

  function EvAgentSessionUI(deps) {
    var _this;

    _classCallCheck(this, EvAgentSessionUI);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'EvAgentSessionUI'
    });

    _initializerDefineProperty(_this, "isLoading", _descriptor, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(EvAgentSessionUI, [{
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this$_deps$tabManage;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.ready && this._deps.tabManager.ready && ((_this$_deps$tabManage = this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage.enable))) {
                  _context.next = 3;
                  break;
                }

                _context.next = 3;
                return this._checkTabManagerEvent();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onStateChange() {
        return _onStateChange.apply(this, arguments);
      }

      return onStateChange;
    }()
  }, {
    key: "_checkTabManagerEvent",
    value: function () {
      var _checkTabManagerEvent2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var event;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                event = this._deps.tabManager.event;

                if (!event) {
                  _context2.next = 9;
                  break;
                }

                _context2.t0 = event.name;
                _context2.next = _context2.t0 === _enums.tabManagerEvents.RE_CHOOSE_ACCOUNT ? 5 : 8;
                break;

              case 5:
                _context2.next = 7;
                return this._onAccountReChoose();

              case 7:
                return _context2.abrupt("break", 9);

              case 8:
                return _context2.abrupt("break", 9);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _checkTabManagerEvent() {
        return _checkTabManagerEvent2.apply(this, arguments);
      }

      return _checkTabManagerEvent;
    }()
  }, {
    key: "setIsLoading",
    value: function setIsLoading(isLoading) {
      this.isLoading = isLoading;
    }
  }, {
    key: "onInit",
    value: function onInit() {
      this.setIsLoading(false);
    }
  }, {
    key: "setConfigure",
    value: function () {
      var _setConfigure = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._deps.block.next( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _this2.setIsLoading(true);

                          _context3.prev = 1;
                          _context3.next = 4;
                          return _this2._deps.evAgentSession.configureAgent({
                            needAssignFormGroupValue: true
                          });

                        case 4:
                          _context3.next = 9;
                          break;

                        case 6:
                          _context3.prev = 6;
                          _context3.t0 = _context3["catch"](1);
                          console.error(_context3.t0);

                        case 9:
                          _context3.prev = 9;

                          _this2.setIsLoading(false);

                          return _context3.finish(9);

                        case 12:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3, null, [[1, 6, 9, 12]]);
                })));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function setConfigure() {
        return _setConfigure.apply(this, arguments);
      }

      return setConfigure;
    }()
  }, {
    key: "showSaveEditionModal",
    value: function showSaveEditionModal() {
      var _this3 = this;

      var currentLocale = this._deps.locale.currentLocale;

      this._deps.modalUI.confirm({
        title: _i18n["default"].getString('saveEditionModalTitle', currentLocale),
        content: _i18n["default"].getString('saveEditionModalContent', currentLocale),
        okText: _i18n["default"].getString('save', currentLocale),
        cancelText: _i18n["default"].getString('cancel', currentLocale),
        size: 'xsmall',
        onOK: function onOK() {
          _this3.onSaveUpdate();
        },
        onCancel: function onCancel() {
          _this3._deps.evAgentSession.resetFormGroup();

          _this3._deps.evAgentSession.goToSettingsPage();
        }
      });
    }
  }, {
    key: "goToSettingsPageWhetherSessionChanged",
    value: function goToSettingsPageWhetherSessionChanged() {
      if (this._deps.evAgentSession.isSessionChanged) {
        return this.showSaveEditionModal();
      }

      this._deps.evAgentSession.goToSettingsPage();
    }
  }, {
    key: "onSaveUpdate",
    value: function () {
      var _onSaveUpdate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this._deps.evAgentSession.isSessionChanged) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return", this._deps.evAgentSession.goToSettingsPage());

              case 2:
                _context5.next = 4;
                return this._deps.evAgentSession.updateAgent(this.voiceConnectionChanged);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function onSaveUpdate() {
        return _onSaveUpdate.apply(this, arguments);
      }

      return onSaveUpdate;
    }() // InboundQueue Panel

  }, {
    key: "_checkBoxOnChange",
    value: function _checkBoxOnChange(gateId, inboundQueuesState, setInboundQueuesState) {
      var inboundQueues = _toConsumableArray(inboundQueuesState);

      var index = inboundQueues.findIndex(function (option) {
        return option.gateId === gateId;
      });
      var selectedInboundQueue = inboundQueues[index];
      inboundQueues[index] = _objectSpread(_objectSpread({}, selectedInboundQueue), {}, {
        checked: !selectedInboundQueue.checked
      });
      setInboundQueuesState(inboundQueues);
    }
  }, {
    key: "_allCheckBoxOnChange",
    value: function _allCheckBoxOnChange(severalAssign, inboundQueuesState, setInboundQueuesState) {
      var inboundQueues = _toConsumableArray(inboundQueuesState).map(function (option) {
        return _objectSpread(_objectSpread({}, option), {}, {
          // new object
          checked: severalAssign || !option.checked
        });
      });

      setInboundQueuesState(inboundQueues);
    }
  }, {
    key: "goBack",
    value: function goBack() {
      this._deps.routerInteraction.goBack();
    }
  }, {
    key: "submitInboundQueues",
    value: function submitInboundQueues(queues, cb) {
      var selectedInboundQueueIds = queues.map(function (inboundQueue) {
        return inboundQueue.gateId;
      });

      this._deps.evAgentSession.setFormGroup({
        selectedInboundQueueIds: selectedInboundQueueIds
      });

      cb();
    }
  }, {
    key: "setLoginType",
    value: function setLoginType(loginType) {
      // set login type first, and reset autoAnswer after login type changed
      this._deps.evAgentSession.setFormGroup({
        loginType: loginType
      });

      var autoAnswer = this.selectedIntegratedSoftphone ? this._deps.evAgentSession.autoAnswer : this._deps.evAgentSession.defaultAutoAnswerOn;

      this._deps.evAgentSession.setFormGroup({
        autoAnswer: autoAnswer
      });
    }
  }, {
    key: "_onAccountReChoose",
    value: function () {
      var _onAccountReChoose2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _this4 = this;

        var syncAllTabs,
            _args7 = arguments;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                syncAllTabs = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : false;
                _context7.next = 3;
                return this._deps.block.next( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                  return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          if (syncAllTabs) {
                            _this4._deps.tabManager.send(_enums.tabManagerEvents.RE_CHOOSE_ACCOUNT);
                          }

                          if (_this4._deps.evClient.ifSocketExist) {
                            _this4._deps.evClient.closeSocket();
                          }

                          _this4._deps.evAuth.clearAgentId();

                          _this4._deps.routerInteraction.push('/chooseAccount');

                          _context6.next = 6;
                          return _this4._deps.evAuth.authenticateWithToken();

                        case 6:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6);
                })));

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _onAccountReChoose() {
        return _onAccountReChoose2.apply(this, arguments);
      }

      return _onAccountReChoose;
    }()
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      var _this$_deps$evAgentSe = this._deps.evAgentSession,
          skillProfileList = _this$_deps$evAgentSe.skillProfileList,
          loginTypeList = _this$_deps$evAgentSe.loginTypeList,
          isExternalPhone = _this$_deps$evAgentSe.isExternalPhone;
      var _this$_deps$evAuth$ag = this._deps.evAuth.agentPermissions,
          allowAutoAnswer = _this$_deps$evAuth$ag.allowAutoAnswer,
          allowLoginControl = _this$_deps$evAuth$ag.allowLoginControl,
          allowInbound = _this$_deps$evAuth$ag.allowInbound;
      var _this$_deps$evAgentSe2 = this._deps.evAgentSession.formGroup,
          selectedSkillProfileId = _this$_deps$evAgentSe2.selectedSkillProfileId,
          loginType = _this$_deps$evAgentSe2.loginType,
          extensionNumber = _this$_deps$evAgentSe2.extensionNumber,
          autoAnswer = _this$_deps$evAgentSe2.autoAnswer;
      return {
        selectedSkillProfileId: selectedSkillProfileId,
        loginType: loginType,
        extensionNumber: extensionNumber,
        inboundQueuesFieldText: this.inboundQueuesFieldText,
        // takingCall,
        autoAnswer: autoAnswer,
        skillProfileList: skillProfileList,
        loginTypeList: loginTypeList,
        isExtensionNumber: isExternalPhone,
        isLoading: this.isLoading,
        currentLocale: this._deps.locale.currentLocale,
        // InboundQueue Panel
        inboundQueues: this.inboundQueues,
        showAutoAnswer: allowAutoAnswer && this.selectedIntegratedSoftphone,
        showInboundQueues: allowLoginControl && allowInbound,
        showSkillProfile: allowLoginControl && skillProfileList.length > 0,
        selectedAgent: this._selectedAgent,
        showReChooseAccount: !this._deps.evAuth.isOnlyOneAgent
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this5 = this;

      return {
        setSkillProfileId: function setSkillProfileId(selectedSkillProfileId) {
          return _this5._deps.evAgentSession.setFormGroup({
            selectedSkillProfileId: selectedSkillProfileId
          });
        },
        setLoginType: function setLoginType(loginType) {
          return _this5.setLoginType(loginType);
        },
        setExtensionNumber: function setExtensionNumber(extensionNumber) {
          return _this5._deps.evAgentSession.setFormGroup({
            extensionNumber: extensionNumber
          });
        },
        setAutoAnswer: function setAutoAnswer(autoAnswer) {
          return _this5._deps.evAgentSession.setFormGroup({
            autoAnswer: autoAnswer
          });
        },
        submitInboundQueues: function submitInboundQueues(queues, cb) {
          return _this5.submitInboundQueues(queues, cb);
        },
        // setTakingCall: (takingCall) =>
        //   this._deps.evAgentSession.setTakingCall(takingCall),
        setConfigure: function setConfigure() {
          return _this5.setConfigure();
        },
        goToSettingsPage: function goToSettingsPage() {
          return _this5._deps.evAgentSession.goToSettingsPage();
        },
        goToSettingsPageWhetherSessionChanged: function goToSettingsPageWhetherSessionChanged() {
          return _this5.goToSettingsPageWhetherSessionChanged();
        },
        onSaveUpdate: function onSaveUpdate() {
          return _this5.onSaveUpdate();
        },
        // InboundQueue Panel
        searchOption: function searchOption(option, text) {
          var _option$gateName;

          return option === null || option === void 0 ? void 0 : (_option$gateName = option.gateName) === null || _option$gateName === void 0 ? void 0 : _option$gateName.toLowerCase().includes(text.toLowerCase());
        },
        goBack: function goBack() {
          return _this5.goBack();
        },
        getAssignedInboundQueues: function getAssignedInboundQueues(inboundQueues) {
          return inboundQueues.filter(function (_ref3) {
            var checked = _ref3.checked;
            return checked;
          });
        },
        isAllAssign: function isAllAssign(assignedInboundQueues, inboundQueues) {
          return !!assignedInboundQueues.length && assignedInboundQueues.length === inboundQueues.length;
        },
        isSeveralAssign: function isSeveralAssign(assignedInboundQueues, inboundQueues) {
          return !!assignedInboundQueues.length && assignedInboundQueues.length !== inboundQueues.length;
        },
        checkBoxOnChange: function checkBoxOnChange() {
          return _this5._checkBoxOnChange.apply(_this5, arguments);
        },
        allCheckBoxOnChange: function allCheckBoxOnChange() {
          return _this5._allCheckBoxOnChange.apply(_this5, arguments);
        },
        onAccountReChoose: function onAccountReChoose() {
          return _this5._onAccountReChoose(true);
        }
      };
    }
  }, {
    key: "inboundQueuesFieldText",
    get: function get() {
      var selectedInboundQueueIds = this._deps.evAgentSession.formGroup.selectedInboundQueueIds;
      var inboundQueues = this._deps.evAgentSession.inboundQueues;
      var currentLocale = this._deps.locale.currentLocale;

      if (selectedInboundQueueIds.length === 1) {
        var selectedInboundQueue = inboundQueues.find(function (inboundQueue) {
          return inboundQueue.gateId === selectedInboundQueueIds[0];
        });
        return selectedInboundQueue.gateName;
      }

      if (selectedInboundQueueIds.length > 1) {
        return "".concat(_i18n["default"].getString('multiple', currentLocale), " (").concat(selectedInboundQueueIds.length, ")");
      }

      return _i18n["default"].getString(_enums.dropDownOptions.None, currentLocale);
    }
  }, {
    key: "inboundQueues",
    get: function get() {
      var _this$_deps$evAgentSe3 = this._deps.evAgentSession,
          inboundQueues = _this$_deps$evAgentSe3.inboundQueues,
          selectedInboundQueueIds = _this$_deps$evAgentSe3.formGroup.selectedInboundQueueIds;
      return (0, _sortByName.sortByName)(inboundQueues.map(function (inboundQueue) {
        return _objectSpread(_objectSpread({}, inboundQueue), {}, {
          checked: !!selectedInboundQueueIds.find(function (id) {
            return id === inboundQueue.gateId;
          })
        });
      }), 'gateName');
    }
  }, {
    key: "selectedIntegratedSoftphone",
    get: function get() {
      return this._deps.evAgentSession.formGroup.loginType === _enums.loginTypes.integratedSoftphone;
    }
  }, {
    key: "voiceConnectionChanged",
    get: function get() {
      return this._deps.evAgentSession.loginType !== this._deps.evAgentSession.formGroup.loginType;
    }
  }, {
    key: "_selectedAgent",
    get: function get() {
      var _this6 = this;

      var agents = this._deps.evAuth.authenticateResponse.agents;
      return agents.find(function (agent) {
        return agent.agentId === _this6._deps.evAuth.agentId;
      });
    }
  }]);

  return EvAgentSessionUI;
}(_core.RcUIModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "isLoading", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "inboundQueuesFieldText", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "inboundQueuesFieldText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setIsLoading", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsLoading"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "inboundQueues", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "inboundQueues"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_selectedAgent", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "_selectedAgent"), _class2.prototype)), _class2)) || _class);
exports.EvAgentSessionUI = EvAgentSessionUI;
//# sourceMappingURL=EvAgentSessionUI.js.map
