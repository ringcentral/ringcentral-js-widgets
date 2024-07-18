"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.find-index");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.string.includes");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvAgentSessionUI = void 0;
require("regenerator-runtime/runtime");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _enums = require("../../enums");
var _sortByName = require("../../lib/sortByName");
var _i18n = _interopRequireDefault(require("./i18n"));
var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
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
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
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
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
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
        confirmButtonText: _i18n["default"].getString('save', currentLocale),
        cancelButtonText: _i18n["default"].getString('cancel', currentLocale),
        childrenSize: 'small',
        onConfirm: function onConfirm() {
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
                console.log('_onAccountReChoose~~', syncAllTabs);
                _context7.next = 4;
                return this._deps.block.next( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                  return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          if (syncAllTabs && _this4._deps.tabManager.hasMultipleTabs) {
                            _this4._deps.tabManager.send(_enums.tabManagerEvents.RE_CHOOSE_ACCOUNT);
                          }
                          if (_this4._deps.evClient.ifSocketExist) {
                            _this4._deps.evClient.closeSocket();
                          }
                          _this4._deps.evAuth.setNotAuth();
                          _this4._deps.evAuth.clearAgentId();
                          _this4._deps.routerInteraction.push('/chooseAccount');
                        case 5:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6);
                })));
              case 4:
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
}(_core.RcUIModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "isLoading", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "inboundQueuesFieldText", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "inboundQueuesFieldText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setIsLoading", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsLoading"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "inboundQueues", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "inboundQueues"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_selectedAgent", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "_selectedAgent"), _class2.prototype)), _class2)) || _class);
exports.EvAgentSessionUI = EvAgentSessionUI;
//# sourceMappingURL=EvAgentSessionUI.js.map
