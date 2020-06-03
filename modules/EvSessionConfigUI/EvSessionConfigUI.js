"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvSessionConfigUI = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

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

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.find");

var _core = require("@ringcentral-integration/core");

var _di = require("ringcentral-integration/lib/di");

var _enums = require("../../enums");

var _i18n = _interopRequireDefault(require("./i18n"));

var _dec, _class, _class2, _descriptor, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var EvSessionConfigUI = (_dec = (0, _di.Module)({
  name: 'EvSessionConfigUI',
  deps: ['Locale', 'RouterInteraction', 'EvAuth', 'EvSessionConfig', 'EvClient', 'EvSettings', 'EvWorkingState', 'Storage', {
    dep: 'EvSessionConfigUIOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(EvSessionConfigUI, _RcUIModuleV);

  var _super = _createSuper(EvSessionConfigUI);

  function EvSessionConfigUI(_ref) {
    var _this;

    var locale = _ref.locale,
        routerInteraction = _ref.routerInteraction,
        evAuth = _ref.evAuth,
        evSessionConfig = _ref.evSessionConfig,
        evClient = _ref.evClient,
        evSettings = _ref.evSettings,
        evWorkingState = _ref.evWorkingState,
        storage = _ref.storage,
        _ref$enableCache = _ref.enableCache,
        enableCache = _ref$enableCache === void 0 ? true : _ref$enableCache;

    _classCallCheck(this, EvSessionConfigUI);

    _this = _super.call(this, {
      modules: {
        locale: locale,
        routerInteraction: routerInteraction,
        evAuth: evAuth,
        evClient: evClient,
        evSessionConfig: evSessionConfig,
        evSettings: evSettings,
        evWorkingState: evWorkingState,
        storage: storage
      },
      enableCache: enableCache,
      storageKey: 'EvSessionConfigUI'
    });

    _initializerDefineProperty(_this, "isLoading", _descriptor, _assertThisInitialized(_this));

    _this.getInboundQueuesFieldText = (0, _core.createSelector)(function () {
      return _this._modules.locale.currentLocale;
    }, function () {
      return _this._modules.evSessionConfig.selectedInboundQueueIds;
    }, function () {
      return _this._modules.evSessionConfig.getInboundQueues();
    }, function (currentLocale, selectedInboundQueueIds, inboundQueues) {
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
    });
    return _this;
  }

  _createClass(EvSessionConfigUI, [{
    key: "setIsLoading",
    value: function setIsLoading(isLoading) {
      this.state.isLoading = isLoading;
    }
  }, {
    key: "onInit",
    value: function onInit() {
      this.setIsLoading(false);
    }
  }, {
    key: "setConfigure",
    value: function () {
      var _setConfigure = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.setIsLoading(true);
                _context.prev = 1;
                _context.next = 4;
                return this._modules.evSessionConfig.configureAgent();

              case 4:
                _context.next = 10;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](1);
                console.error(_context.t0);
                return _context.abrupt("return");

              case 10:
                _context.prev = 10;
                this.setIsLoading(false);
                return _context.finish(10);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 6, 10, 13]]);
      }));

      function setConfigure() {
        return _setConfigure.apply(this, arguments);
      }

      return setConfigure;
    }()
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      var _this$_modules$evSess = this._modules.evSessionConfig,
          selectedSkillProfileId = _this$_modules$evSess.selectedSkillProfileId,
          getSkillProfileList = _this$_modules$evSess.getSkillProfileList,
          getLoginTypeList = _this$_modules$evSess.getLoginTypeList,
          loginType = _this$_modules$evSess.loginType,
          extensionNumber = _this$_modules$evSess.extensionNumber,
          isExternalPhone = _this$_modules$evSess.isExternalPhone,
          takingCall = _this$_modules$evSess.takingCall,
          autoAnswer = _this$_modules$evSess.autoAnswer;
      return {
        selectedSkillProfileId: selectedSkillProfileId,
        skillProfileList: getSkillProfileList(),
        loginTypeList: getLoginTypeList(),
        loginType: loginType,
        takingCall: takingCall,
        autoAnswer: autoAnswer,
        extensionNumber: extensionNumber,
        isExtensionNumber: isExternalPhone,
        isLoading: this.isLoading,
        inboundQueuesFieldText: this.getInboundQueuesFieldText(),
        currentLocale: this._modules.locale.currentLocale
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this2 = this;

      return {
        navigateToInboundQueuesPage: function navigateToInboundQueuesPage() {
          _this2._modules.routerInteraction.push('/sessionConfig/inboundQueues');
        },
        setSkillProfileId: function setSkillProfileId(profile) {
          _this2._modules.evSessionConfig.setSkillProfileId(profile);
        },
        setLoginType: function setLoginType(loginType) {
          _this2._modules.evSessionConfig.setLoginType(loginType);
        },
        setExtensionNumber: function setExtensionNumber(extensionNumber) {
          _this2._modules.evSessionConfig.setExtensionNumber(extensionNumber);
        },
        setTakingCall: function setTakingCall(takingCall) {
          _this2._modules.evSessionConfig.setTakingCall(takingCall);
        },
        setAutoAnswer: function setAutoAnswer(autoAnswer) {
          _this2._modules.evSessionConfig.setAutoAnswer(autoAnswer);
        },
        setConfigure: function () {
          var _setConfigure2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return _this2.setConfigure();

                  case 2:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          function setConfigure() {
            return _setConfigure2.apply(this, arguments);
          }

          return setConfigure;
        }()
      };
    }
  }]);

  return EvSessionConfigUI;
}(_core.RcUIModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "isLoading", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setIsLoading", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsLoading"), _class2.prototype)), _class2)) || _class);
exports.EvSessionConfigUI = EvSessionConfigUI;
//# sourceMappingURL=EvSessionConfigUI.js.map
