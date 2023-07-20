"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.from");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.map");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.set");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLogSection = void 0;
require("regenerator-runtime/runtime");
var _ramda = require("ramda");
var _di = require("@ringcentral-integration/commons/lib/di");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _core = require("@ringcentral-integration/core");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
// TODO: seems that module should move to ringcentral-js-widgets/ringcentral-integration/modules
var CallLogSection = (_dec = (0, _di.Module)({
  deps: ['Storage', 'CallHistory', 'CallMonitor', {
    dep: 'CallLogSectionOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(_trackEvents.trackEvents.clickSaveLogSection), _dec3 = (0, _core.track)(_trackEvents.trackEvents.clickCloseLogNotification), _dec4 = (0, _core.computed)(function (that) {
  return [that.identifyList, that.callsMappingState];
}), _dec5 = (0, _core.computed)(function (that) {
  return [that.callsMappingState, that.callsSavingStatus];
}), _dec6 = (0, _core.computed)(function (that) {
  return [that.currentIdentify, that.callsMappingState];
}), _dec7 = (0, _core.computed)(function (that) {
  return [that.currentIdentify, that._deps.callHistory.calls, that._deps.callMonitor.calls];
}), _dec8 = (0, _core.computed)(function (that) {
  return [that.currentCall, that._deps.callMonitor.calls];
}), _dec9 = (0, _core.computed)(function (that) {
  return [that.currentNotificationIdentify, that._deps.callMonitor.calls, that._deps.callHistory.calls];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(CallLogSection, _RcModuleV);
  var _super = _createSuper(CallLogSection);
  function CallLogSection(deps) {
    var _this$_deps$callLogSe;
    var _this;
    _classCallCheck(this, CallLogSection);
    _this = _super.call(this, {
      deps: deps,
      storageKey: 'callLogSection',
      enableCache: true
    });
    _this._notSyncOpenState = void 0;
    _this._readyCheckFunction = void 0;
    _this._logFunction = void 0;
    _this._onSuccess = void 0;
    _this._onUpdate = void 0;
    _this._onError = void 0;
    // TODO: merge these states in callLogTasks.loggingmapping
    _initializerDefineProperty(_this, "callsSavingStatus", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "callsMappingState", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "identifyList", _descriptor3, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "stateCurrentIdentify", _descriptor4, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "storageCurrentIdentify", _descriptor5, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "stateCurrentNotificationIdentify", _descriptor6, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "storageCurrentNotificationIdentify", _descriptor7, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "stateNotificationIsExpand", _descriptor8, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "storageNotificationIsExpand", _descriptor9, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "warmTransferActiveTelephonySessionId", _descriptor10, _assertThisInitialized(_this));
    _this._notSyncOpenState = !!((_this$_deps$callLogSe = _this._deps.callLogSectionOptions) === null || _this$_deps$callLogSe === void 0 ? void 0 : _this$_deps$callLogSe.notSyncOpenState);
    return _this;
  }
  _createClass(CallLogSection, [{
    key: "_shouldInit",
    value: function _shouldInit() {
      var _this$_readyCheckFunc;
      return _get(_getPrototypeOf(CallLogSection.prototype), "_shouldInit", this).call(this) && !!((_this$_readyCheckFunc = this._readyCheckFunction) === null || _this$_readyCheckFunc === void 0 ? void 0 : _this$_readyCheckFunc.call(this));
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      var _this$_readyCheckFunc2;
      return _get(_getPrototypeOf(CallLogSection.prototype), "_shouldReset", this).call(this) || this.ready && !((_this$_readyCheckFunc2 = this._readyCheckFunction) === null || _this$_readyCheckFunc2 === void 0 ? void 0 : _this$_readyCheckFunc2.call(this));
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      // When there is an incoming call,
      // the page should be dismissed
      (0, _core.watch)(this, function () {
        return [_this2.currentCall, _this2.currentWarmTransferCall, _this2.warmTransferActiveTelephonySessionId];
      }, function () {
        var currentCall = _this2.currentCall,
          currentWarmTransferCall = _this2.currentWarmTransferCall,
          warmTransferActiveTelephonySessionId = _this2.warmTransferActiveTelephonySessionId;
        if (!currentCall || !currentWarmTransferCall) {
          if (_this2.warmTransferActiveTelephonySessionId) {
            _this2.setWarmTransferCallActiveId();
          }
          return;
        }
        var currentCallOnHold = (0, _callLogHelpers.isOnHold)(currentCall);
        var warmTransferCallOnHold = (0, _callLogHelpers.isOnHold)(currentWarmTransferCall);
        if (warmTransferCallOnHold && currentCallOnHold) {
          if (!warmTransferActiveTelephonySessionId) {
            _this2.setWarmTransferCallActiveId(currentCall.telephonySessionId);
          }
          return;
        }
        var activeCall = currentCallOnHold ? currentWarmTransferCall : currentCall;
        var telephonySessionId = activeCall.telephonySessionId;
        if (_this2.warmTransferActiveTelephonySessionId !== telephonySessionId) {
          _this2.setWarmTransferCallActiveId(telephonySessionId);
        }
      }, {
        multiple: true
      });
    }
  }, {
    key: "update",
    value: function update(identify, newValue, callsSavingStatus) {
      this.callsSavingStatus[identify] = callsSavingStatus;
      var originalState = this.callsMappingState[identify];
      this.callsMappingState[identify] = _objectSpread(_objectSpread({}, originalState), newValue);
      this.identifyList = Array.from(new Set([].concat(_toConsumableArray(this.identifyList), [identify])));
    }
  }, {
    key: "setWarmTransferCallActiveId",
    value: function setWarmTransferCallActiveId() {
      var telephonySessionId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.warmTransferActiveTelephonySessionId = telephonySessionId;
    }
  }, {
    key: "saveSuccess",
    value: function () {
      var _saveSuccess = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(identify) {
        var originalState;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                originalState = this.callsMappingState[identify];
                this.update(identify, {
                  isSucceed: true,
                  isEdited: !!((originalState === null || originalState === void 0 ? void 0 : originalState.latestUpdateTime) && (originalState === null || originalState === void 0 ? void 0 : originalState.latestSaveTime) && (originalState === null || originalState === void 0 ? void 0 : originalState.latestSaveTime) < (originalState === null || originalState === void 0 ? void 0 : originalState.latestUpdateTime))
                }, false);
              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function saveSuccess(_x) {
        return _saveSuccess.apply(this, arguments);
      }
      return saveSuccess;
    }()
  }, {
    key: "saving",
    value: function () {
      var _saving = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(identify) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.update(identify, {
                  latestSaveTime: Date.now()
                }, true);
              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function saving(_x2) {
        return _saving.apply(this, arguments);
      }
      return saving;
    }()
  }, {
    key: "markAsUnSaving",
    value: function () {
      var _markAsUnSaving = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(identify) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.update(identify, {}, false);
              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function markAsUnSaving(_x3) {
        return _markAsUnSaving.apply(this, arguments);
      }
      return markAsUnSaving;
    }()
  }, {
    key: "saveError",
    value: function () {
      var _saveError = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(identify) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.update(identify, {
                  isEdited: true,
                  isSucceed: false
                }, false);
              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function saveError(_x4) {
        return _saveError.apply(this, arguments);
      }
      return saveError;
    }() // TODO: add args type
  }, {
    key: "_handleSuccess",
    value: function () {
      var _handleSuccess2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(identify) {
        var _len,
          args,
          _key,
          _args5 = arguments;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.saveSuccess(identify);
                for (_len = _args5.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = _args5[_key];
                }
                if (typeof this._onSuccess === 'function') this._onSuccess.apply(this, [identify].concat(args));
              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function _handleSuccess(_x5) {
        return _handleSuccess2.apply(this, arguments);
      }
      return _handleSuccess;
    }() // TODO: add args type
  }, {
    key: "_handleError",
    value: function () {
      var _handleError2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(identify) {
        var _len2,
          args,
          _key2,
          _args6 = arguments;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.saveError(identify);
                if (!(typeof this._onError === 'function')) {
                  _context6.next = 5;
                  break;
                }
                for (_len2 = _args6.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = _args6[_key2];
                }
                _context6.next = 5;
                return this._onError.apply(this, [identify].concat(args));
              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function _handleError(_x6) {
        return _handleError2.apply(this, arguments);
      }
      return _handleError;
    }()
  }, {
    key: "showLogSection",
    value: function () {
      var _showLogSection = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(identify) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!this.show || identify !== this.currentIdentify) {
                  this.setLogSectionIdentify(identify);
                }
              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function showLogSection(_x7) {
        return _showLogSection.apply(this, arguments);
      }
      return showLogSection;
    }()
  }, {
    key: "setLogSectionIdentify",
    value: function setLogSectionIdentify(identify) {
      if (this._notSyncOpenState) {
        this.stateCurrentIdentify = identify;
      } else {
        this.storageCurrentIdentify = identify;
      }
    }
  }, {
    key: "setLogNotificationIdentify",
    value: function setLogNotificationIdentify(identify) {
      if (this._notSyncOpenState) {
        this.stateCurrentNotificationIdentify = identify;
      } else {
        this.storageCurrentNotificationIdentify = identify;
      }
    }
  }, {
    key: "showLogNotification",
    value: function () {
      var _showLogNotification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(identify) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!this.showNotification || identify !== this.currentNotificationIdentify) {
                  this.setLogNotificationIdentify(identify);
                }
              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function showLogNotification(_x8) {
        return _showLogNotification.apply(this, arguments);
      }
      return showLogNotification;
    }()
  }, {
    key: "addLogHandler",
    value: function addLogHandler(_ref) {
      var logFunction = _ref.logFunction,
        readyCheckFunction = _ref.readyCheckFunction,
        onUpdate = _ref.onUpdate,
        onSuccess = _ref.onSuccess,
        onError = _ref.onError;
      if (typeof logFunction !== 'function') {
        throw new Error('CallLogSection: "logFunction" must be a function.');
      }
      if (typeof readyCheckFunction !== 'function') {
        throw new Error('CallLogSection: "readyCheckFunction" must be a function.');
      }
      this._logFunction = logFunction;
      this._readyCheckFunction = readyCheckFunction;
      this._onUpdate = onUpdate;
      this._onSuccess = onSuccess;
      this._onError = onError;
    } // TODO: add args type
  }, {
    key: "updateCallLog",
    value: function () {
      var _updateCallLog = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(identify) {
        var _len3,
          args,
          _key3,
          _args9 = arguments;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                this.update(identify, {
                  latestUpdateTime: Date.now(),
                  isEdited: true
                }, this.callsSavingStatus[identify]);
                // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
                for (_len3 = _args9.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                  args[_key3 - 1] = _args9[_key3];
                }
                _context9.next = 4;
                return this._onUpdate.apply(this, [identify].concat(args));
              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));
      function updateCallLog(_x9) {
        return _updateCallLog.apply(this, arguments);
      }
      return updateCallLog;
    }() // TODO: add args type when implement call log ui
  }, {
    key: "saveCallLog",
    value: function () {
      var _saveCallLog = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(identify) {
        var _len4,
          args,
          _key4,
          result,
          _args10 = arguments;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(identify && (!this.callsMapping[identify] || !this.callsMapping[identify].isSaving))) {
                  _context10.next = 18;
                  break;
                }
                this.saving(identify);
                for (_len4 = _args10.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                  args[_key4 - 1] = _args10[_key4];
                }
                _context10.prev = 3;
                _context10.next = 6;
                return this._logFunction.apply(this, [identify].concat(args));
              case 6:
                result = _context10.sent;
                if (result) {
                  _context10.next = 9;
                  break;
                }
                throw new Error('Result is empty');
              case 9:
                this._handleSuccess(identify, _objectSpread(_objectSpread({}, args), {}, {
                  result: result
                }));
                return _context10.abrupt("return", result);
              case 13:
                _context10.prev = 13;
                _context10.t0 = _context10["catch"](3);
                _context10.next = 17;
                return this._handleError(identify, _objectSpread(_objectSpread({}, args), {}, {
                  error: _context10.t0
                }));
              case 17:
                console.warn(_context10.t0);
              case 18:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[3, 13]]);
      }));
      function saveCallLog(_x10) {
        return _saveCallLog.apply(this, arguments);
      }
      return saveCallLog;
    }()
  }, {
    key: "handleLogSection",
    value: function () {
      var _handleLogSection = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(identify) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (this.show) {
                  _context11.next = 5;
                  break;
                }
                _context11.next = 3;
                return this.showLogSection(identify);
              case 3:
                _context11.next = 8;
                break;
              case 5:
                if (!(!this.notificationIsExpand && this.currentIdentify !== identify)) {
                  _context11.next = 8;
                  break;
                }
                _context11.next = 8;
                return this.showLogNotification(identify);
              case 8:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));
      function handleLogSection(_x11) {
        return _handleLogSection.apply(this, arguments);
      }
      return handleLogSection;
    }()
  }, {
    key: "closeLogSection",
    value: function () {
      var _closeLogSection = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (this.show) {
                  // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
                  this.setLogSectionIdentify(null);
                }
              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));
      function closeLogSection() {
        return _closeLogSection.apply(this, arguments);
      }
      return closeLogSection;
    }()
  }, {
    key: "discardAndHandleNotification",
    value: function () {
      var _discardAndHandleNotification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(sessionId) {
        var currentNotificationIdentify;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                currentNotificationIdentify = sessionId || this.currentNotificationIdentify;
                _context13.next = 3;
                return this.closeLogNotification();
              case 3:
                _context13.next = 5;
                return this.closeLogSection();
              case 5:
                _context13.next = 7;
                return this.showLogSection(currentNotificationIdentify);
              case 7:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));
      function discardAndHandleNotification(_x12) {
        return _discardAndHandleNotification.apply(this, arguments);
      }
      return discardAndHandleNotification;
    }()
  }, {
    key: "saveAndHandleNotification",
    value: function () {
      var _saveAndHandleNotification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var currentNotificationIdentify, currentIdentify;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                currentNotificationIdentify = this.currentNotificationIdentify;
                currentIdentify = this.currentIdentify;
                _context14.next = 4;
                return this.saveCallLog(currentIdentify);
              case 4:
                _context14.next = 6;
                return this.closeLogNotification();
              case 6:
                _context14.next = 8;
                return this.closeLogSection();
              case 8:
                _context14.next = 10;
                return this.showLogSection(currentNotificationIdentify);
              case 10:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));
      function saveAndHandleNotification() {
        return _saveAndHandleNotification.apply(this, arguments);
      }
      return saveAndHandleNotification;
    }()
  }, {
    key: "closeLogNotification",
    value: function () {
      var _closeLogNotification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (this.showNotification) {
                  // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
                  this.setLogNotificationIdentify(null);
                  this.setNotificationIsExpand(false);
                }
              case 1:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));
      function closeLogNotification() {
        return _closeLogNotification.apply(this, arguments);
      }
      return closeLogNotification;
    }()
  }, {
    key: "setNotificationIsExpand",
    value: function setNotificationIsExpand(isExpand) {
      if (this._notSyncOpenState) {
        this.stateNotificationIsExpand = isExpand;
      } else {
        this.storageNotificationIsExpand = isExpand;
      }
    } // shrink the popover menu appear when click log button at call notificaiton
  }, {
    key: "shrinkNotification",
    value: function () {
      var _shrinkNotification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                if (this.notificationIsExpand) {
                  this.setNotificationIsExpand(false);
                }
              case 1:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));
      function shrinkNotification() {
        return _shrinkNotification.apply(this, arguments);
      }
      return shrinkNotification;
    }()
  }, {
    key: "expandNotification",
    value: function () {
      var _expandNotification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                if (!this.notificationIsExpand) {
                  this.setNotificationIsExpand(true);
                }
              case 1:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));
      function expandNotification() {
        return _expandNotification.apply(this, arguments);
      }
      return expandNotification;
    }()
  }, {
    key: "expandLogNotification",
    value: function () {
      var _expandLogNotification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                if (this.show) {
                  _context18.next = 5;
                  break;
                }
                _context18.next = 3;
                return this.showLogSection(this.currentNotificationIdentify);
              case 3:
                _context18.next = 5;
                return this.closeLogNotification();
              case 5:
                _context18.next = 7;
                return this.expandNotification();
              case 7:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));
      function expandLogNotification() {
        return _expandLogNotification.apply(this, arguments);
      }
      return expandLogNotification;
    }()
  }, {
    key: "calls",
    get: function get() {
      var _this3 = this;
      var calls = this.identifyList.map(function (identify) {
        return _this3.callsMappingState[identify];
      });
      return calls;
    }
    /**
     * Merge isSaving property from reducer to callsMapping
     */
  }, {
    key: "callsMapping",
    get: function get() {
      return (0, _ramda.converge)((0, _ramda.mergeWith)((0, _ramda.flip)((0, _ramda.assoc)('isSaving'))), [_ramda.identity,
      // eslint-disable-next-line react-hooks/rules-of-hooks
      (0, _ramda.useWith)(_ramda.pick, [_ramda.keys, _ramda.identity])])(this.callsMappingState, this.callsSavingStatus);
    }
  }, {
    key: "currentCallLogStatus",
    get: function get() {
      return this.callsMappingState[this.currentIdentify] || {};
    }
  }, {
    key: "currentCall",
    get: function get() {
      var _this4 = this;
      return [].concat(_toConsumableArray(this._deps.callMonitor.calls), _toConsumableArray(this._deps.callHistory.calls)).find(function (call) {
        return call.sessionId === _this4.currentIdentify;
      }) || {};
    }
  }, {
    key: "currentWarmTransferCall",
    get: function get() {
      var warmTransferInfo = this.currentCall.warmTransferInfo;
      if (warmTransferInfo === undefined) {
        return;
      }
      var relatedTelephonySessionId = warmTransferInfo.relatedTelephonySessionId;
      return _toConsumableArray(this._deps.callMonitor.calls).find(function (call) {
        return call.telephonySessionId === relatedTelephonySessionId;
      });
    }
  }, {
    key: "currentNotificationCall",
    get: function get() {
      var _this5 = this;
      return [].concat(_toConsumableArray(this._deps.callMonitor.calls), _toConsumableArray(this._deps.callHistory.calls)).find(function (call) {
        return call.sessionId === _this5.currentNotificationIdentify;
      }) || {};
    }
  }, {
    key: "currentIdentify",
    get: function get() {
      return this._notSyncOpenState ? this.stateCurrentIdentify : this.storageCurrentIdentify;
    }
  }, {
    key: "show",
    get: function get() {
      return !!this.currentIdentify;
    }
  }, {
    key: "currentNotificationIdentify",
    get: function get() {
      return this._notSyncOpenState ? this.stateCurrentNotificationIdentify : this.storageCurrentNotificationIdentify;
    }
  }, {
    key: "showNotification",
    get: function get() {
      return !!this.currentNotificationIdentify;
    }
  }, {
    key: "notificationIsExpand",
    get: function get() {
      return this._notSyncOpenState ? this.stateNotificationIsExpand : this.storageNotificationIsExpand;
    }
  }, {
    key: "currentCallSavingStatus",
    get: function get() {
      return this.callsSavingStatus[this.currentIdentify];
    }
  }]);
  return CallLogSection;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "callsSavingStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "callsMappingState", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "identifyList", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "stateCurrentIdentify", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "storageCurrentIdentify", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "stateCurrentNotificationIdentify", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "storageCurrentNotificationIdentify", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "stateNotificationIsExpand", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "storageNotificationIsExpand", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "warmTransferActiveTelephonySessionId", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "update", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "update"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setWarmTransferCallActiveId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setWarmTransferCallActiveId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saveSuccess", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "saveSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saving", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "saving"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "markAsUnSaving", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "markAsUnSaving"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saveError", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "saveError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_handleSuccess", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_handleSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_handleError", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_handleError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showLogSection", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "showLogSection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLogSectionIdentify", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLogSectionIdentify"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLogNotificationIdentify", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLogNotificationIdentify"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showLogNotification", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "showLogNotification"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateCallLog", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateCallLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saveCallLog", [_proxify.proxify, _dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "saveCallLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleLogSection", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "handleLogSection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "closeLogSection", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "closeLogSection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "discardAndHandleNotification", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "discardAndHandleNotification"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saveAndHandleNotification", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "saveAndHandleNotification"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "closeLogNotification", [_proxify.proxify, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "closeLogNotification"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setNotificationIsExpand", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setNotificationIsExpand"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shrinkNotification", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "shrinkNotification"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "expandNotification", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "expandNotification"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "expandLogNotification", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "expandLogNotification"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "calls", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "calls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callsMapping", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "callsMapping"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentCallLogStatus", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "currentCallLogStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentCall", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "currentCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentWarmTransferCall", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "currentWarmTransferCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentNotificationCall", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "currentNotificationCall"), _class2.prototype)), _class2)) || _class);
exports.CallLogSection = CallLogSection;
//# sourceMappingURL=CallLogSection.js.map
