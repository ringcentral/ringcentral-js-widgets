"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es6.promise");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

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

require("core-js/modules/es6.array.find-index");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallHistory = void 0;

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.some");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.string.trim");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.filter");

var _ramda = require("ramda");

var _core = require("@ringcentral-integration/core");

var _callLogHelpers = require("../../lib/callLogHelpers");

var _debounce = _interopRequireDefault(require("../../lib/debounce"));

var _di = require("../../lib/di");

var _normalizeNumber = require("../../lib/normalizeNumber");

var _proxify = require("../../lib/proxy/proxify");

var _Analytics = require("../Analytics");

var _CallingSettingsV = require("../CallingSettingsV2");

var _callHistoryHelper = require("./callHistoryHelper");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var DEFAULT_CLEAN_TIME = 24 * 60 * 60 * 1000; // 1 day

var CallHistory = (_dec = (0, _di.Module)({
  name: 'CallHistory',
  deps: ['AccountInfo', 'CallLog', 'Storage', {
    dep: 'CallMonitor',
    optional: true
  }, {
    dep: 'ActivityMatcher',
    optional: true
  }, {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'CallHistoryOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(_Analytics.trackEvents.clickToSMSCallHistory), _dec3 = (0, _core.track)(function (that) {
  var _callingSettings;

  return [((_callingSettings = that.parentModule.callingSettings) === null || _callingSettings === void 0 ? void 0 : _callingSettings.callingMode) === _CallingSettingsV.callingModes.ringout ? _Analytics.trackEvents.clickToDialCallHistoryWithRingOut : _Analytics.trackEvents.clickToDialCallHistory];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that._deps.callLog.calls, that._deps.accountInfo.countryCode];
}), _dec5 = (0, _core.computed)(function (that) {
  var _that$_deps$contactMa, _that$_deps$activityM, _that$_deps$callMonit;

  return [that.normalizedCalls, that.endedCalls, (_that$_deps$contactMa = that._deps.contactMatcher) === null || _that$_deps$contactMa === void 0 ? void 0 : _that$_deps$contactMa.dataMapping, (_that$_deps$activityM = that._deps.activityMatcher) === null || _that$_deps$activityM === void 0 ? void 0 : _that$_deps$activityM.dataMapping, (_that$_deps$callMonit = that._deps.callMonitor) === null || _that$_deps$callMonit === void 0 ? void 0 : _that$_deps$callMonit.callMatched];
}), _dec6 = (0, _core.computed)(function (that) {
  var _that$_deps$activityM2;

  return [that.filterCalls, (_that$_deps$activityM2 = that._deps.activityMatcher) === null || _that$_deps$activityM2 === void 0 ? void 0 : _that$_deps$activityM2.dataMapping];
}), _dec7 = (0, _core.computed)(function (that) {
  return [that.normalizedCalls, that.endedCalls];
}), _dec8 = (0, _core.computed)(function (that) {
  return [that._deps.callLog.calls, that.endedCalls];
}), _dec9 = (0, _core.computed)(function (that) {
  return [that.searchInput, that.calls, that.filteredCalls];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(CallHistory, _RcModuleV);

  var _super = _createSuper(CallHistory);

  function CallHistory(deps) {
    var _deps$callHistoryOpti, _deps$callHistoryOpti2, _this$_deps$callHisto, _this$_deps$callHisto2, _this$_deps$activityM;

    var _this;

    _classCallCheck(this, CallHistory);

    _this = _super.call(this, {
      deps: deps,
      storageKey: 'CallHistory',
      enableCache: (_deps$callHistoryOpti = (_deps$callHistoryOpti2 = deps.callHistoryOptions) === null || _deps$callHistoryOpti2 === void 0 ? void 0 : _deps$callHistoryOpti2.enableCache) !== null && _deps$callHistoryOpti !== void 0 ? _deps$callHistoryOpti : true
    });
    _this._debouncedSearch = (0, _debounce["default"])(_this.callsSearch, 230, false);

    _initializerDefineProperty(_this, "endedCalls", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "searchInput", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "filteredCalls", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "markedList", _descriptor4, _assertThisInitialized(_this));

    var enableContactMatchInCallHistory = (_this$_deps$callHisto = (_this$_deps$callHisto2 = _this._deps.callHistoryOptions) === null || _this$_deps$callHisto2 === void 0 ? void 0 : _this$_deps$callHisto2.enableContactMatchInCallHistory) !== null && _this$_deps$callHisto !== void 0 ? _this$_deps$callHisto : true;

    if (enableContactMatchInCallHistory && _this._deps.contactMatcher) {
      _this._deps.contactMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.uniqueNumbers;
        },
        readyCheckFn: function readyCheckFn() {
          return (!_this._deps.callMonitor || _this._deps.callMonitor.ready) && (!_this._deps.tabManager || _this._deps.tabManager.ready) && _this._deps.callLog.ready && _this._deps.accountInfo.ready;
        }
      });
    }

    (_this$_deps$activityM = _this._deps.activityMatcher) === null || _this$_deps$activityM === void 0 ? void 0 : _this$_deps$activityM.addQuerySource({
      getQueriesFn: function getQueriesFn() {
        return _this.sessionIds;
      },
      readyCheckFn: function readyCheckFn() {
        return (!_this._deps.callMonitor || _this._deps.callMonitor.ready) && (!_this._deps.tabManager || _this._deps.tabManager.ready) && _this._deps.callLog.ready;
      }
    });
    return _this;
  }

  _createClass(CallHistory, [{
    key: "filterSuccess",
    value: function filterSuccess() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this.filteredCalls = data;
    }
  }, {
    key: "setSearchInput",
    value: function setSearchInput() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.searchInput = input;
    }
  }, {
    key: "setEndedCalls",
    value: function setEndedCalls(endedCalls, timestamp) {
      var _this2 = this;

      (0, _ramda.forEach)(function (call) {
        var callWithDuration = _objectSpread(_objectSpread({}, call), {}, {
          duration: Math.floor((timestamp - call.startTime) / 1000)
        });

        var idx = (0, _ramda.findIndex)(function (item) {
          return item.telephonySessionId === call.telephonySessionId;
        }, _this2.endedCalls);

        if (idx > -1) {
          // replace old one if found
          _this2.endedCalls[idx] = callWithDuration;
        } else {
          _this2.endedCalls.push(callWithDuration);
        }
      }, endedCalls);
    }
  }, {
    key: "removeEndedCalls",
    value: function removeEndedCalls(endedCalls) {
      this.endedCalls = this.endedCalls.filter(function (call) {
        return !(endedCalls.find(function (_ref) {
          var telephonySessionId = _ref.telephonySessionId;
          return telephonySessionId === call.telephonySessionId;
        }) || // clean current overdue ended call (default clean time: 1day).
        Date.now() - call.startTime > DEFAULT_CLEAN_TIME);
      });
    }
  }, {
    key: "cleanEndedCalls",
    value: function cleanEndedCalls() {
      this.endedCalls = [];
    }
  }, {
    key: "removeAllEndedCalls",
    value: function removeAllEndedCalls() {
      this.endedCalls = [];
      this.markedList = [];
      this.markRemoved();
    } // The call logs which has been removed from remote
    // The marked telephonySessionId should not been added to ended calls afterwards.

  }, {
    key: "markRemoved",
    value: function markRemoved() {
      this.markedList = this.markedList.concat(this._deps.callMonitor.calls);
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this3 = this;

      if (this._deps.contactMatcher) {
        (0, _core.watch)(this, function () {
          return _this3.uniqueNumbers;
        }, function () {
          if (_this3.ready && (!_this3._deps.tabManager || _this3._deps.tabManager.active) && _this3._deps.contactMatcher.ready) {
            _this3._deps.contactMatcher.triggerMatch();
          }
        });
      }

      if (this._deps.activityMatcher) {
        (0, _core.watch)(this, function () {
          return _this3.sessionIds;
        }, function () {
          if (_this3.ready && (!_this3._deps.tabManager || _this3._deps.tabManager.active) && _this3._deps.activityMatcher.ready) {
            _this3._deps.activityMatcher.triggerMatch();
          }
        });
      }

      this._deps.callMonitor && (0, _core.watch)(this, function () {
        return _this3._deps.callMonitor.calls;
      }, function (newMonitorCalls, oldMonitorCalls) {
        if (!_this3.ready) return;
        var endedCalls = (oldMonitorCalls || []).filter(function (call) {
          return !newMonitorCalls.find(function (currentCall) {
            return call.telephonySessionId === currentCall.telephonySessionId;
          }) && // if the call's callLog has been fetch, skip
          !_this3._deps.callLog.calls.find(function (currentCall) {
            return call.telephonySessionId === currentCall.telephonySessionId;
          }) && // if delete all during active call
          !_this3.markedList.find(function (currentCall) {
            var flag = call.telephonySessionId === currentCall.telephonySessionId;
            return flag;
          });
        });

        if (endedCalls.length) {
          _this3._addEndedCalls(endedCalls);
        }
      });
      (0, _core.watch)(this, // use watch multiple, because this.ready is async, can't become true in time, so need watch this.ready, too
      function () {
        return [_this3._deps.callLog.calls, _this3.ready];
      }, function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            _ref3$ = _ref3[0],
            currentCalls = _ref3$ === void 0 ? [] : _ref3$,
            ready = _ref3[1];

        if (!ready) return;
        var ids = {};
        currentCalls.forEach(function (call) {
          ids[call.telephonySessionId] = true;
        });

        var shouldRemovedCalls = _this3.endedCalls.filter(function (call) {
          return ids[call.telephonySessionId];
        });

        if (shouldRemovedCalls.length) {
          _this3.removeEndedCalls(shouldRemovedCalls);
        }
      }, {
        multiple: true
      });
    }
  }, {
    key: "onReset",
    value: function onReset() {
      this.setSearchInput('');
      this.cleanEndedCalls();
    }
  }, {
    key: "_addEndedCalls",
    value: function _addEndedCalls(endedCalls) {
      endedCalls.forEach(function (call) {
        // TODO: refactor with immutable data update
        call.result = 'Disconnected';
      });
      this.setEndedCalls(endedCalls, Date.now());

      this._deps.callLog.sync();
    } // TODO: move to UI module
    // for track click to sms in call history

  }, {
    key: "onClickToSMS",
    value: function () {
      var _onClickToSMS = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function onClickToSMS() {
        return _onClickToSMS.apply(this, arguments);
      }

      return onClickToSMS;
    }() // TODO: move to UI module
    // for track click to call in call history

  }, {
    key: "onClickToCall",
    value: function () {
      var _onClickToCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function onClickToCall() {
        return _onClickToCall.apply(this, arguments);
      }

      return onClickToCall;
    }()
  }, {
    key: "updateSearchInput",
    value: function () {
      var _updateSearchInput = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(input) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.setSearchInput(input);

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function updateSearchInput(_x) {
        return _updateSearchInput.apply(this, arguments);
      }

      return updateSearchInput;
    }()
  }, {
    key: "findMatches",

    /**
     * Allow sub class to have different find matches logic.
     * @param contactMapping
     * @param call
     * @returns
     */
    value: function findMatches(contactMapping, call) {
      var pickNumber = this.enableFullPhoneNumberMatch ? _callHistoryHelper.pickFullPhoneNumber : _callHistoryHelper.pickPhoneOrExtensionNumber;
      var fromNumber = call.from && pickNumber(call.from.phoneNumber, call.from.extensionNumber);
      var toNumber = call.to && pickNumber(call.to.phoneNumber, call.to.extensionNumber);
      var fromMatches = fromNumber && contactMapping[fromNumber] || [];
      var toMatches = toNumber && contactMapping[toNumber] || [];
      return {
        fromMatches: fromMatches,
        toMatches: toMatches
      };
    }
  }, {
    key: "debouncedSearch",
    value: function () {
      var _debouncedSearch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this$_debouncedSearc;

        var _len,
            args,
            _key,
            _args4 = arguments;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                for (_len = _args4.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = _args4[_key];
                }

                (_this$_debouncedSearc = this._debouncedSearch).call.apply(_this$_debouncedSearc, [this].concat(args));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function debouncedSearch() {
        return _debouncedSearch.apply(this, arguments);
      }

      return debouncedSearch;
    }()
  }, {
    key: "callsSearch",
    value: function () {
      var _callsSearch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var calls, searchInput, effectSearchStr, data;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(this.searchInput === '')) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return");

              case 2:
                calls = this.calls;
                searchInput = this.searchInput;
                effectSearchStr = searchInput.toLowerCase().trim();
                data = calls.filter(function (call) {
                  var _getPhoneNumberMatche = (0, _callLogHelpers.getPhoneNumberMatches)(call),
                      phoneNumber = _getPhoneNumberMatche.phoneNumber,
                      matches = _getPhoneNumberMatche.matches;

                  var matchesMatched = matches.some(function (entities) {
                    if (!entities || !entities.id) return false;
                    if (entities.name && entities.name.toLowerCase().indexOf(effectSearchStr) > -1) return true;
                    if (entities.phone && entities.phone.indexOf(effectSearchStr) > -1) return true;
                    return false;
                  });

                  if (matchesMatched) {
                    return true;
                  }

                  if (phoneNumber && phoneNumber.indexOf(effectSearchStr) > -1) {
                    return true;
                  }

                  return false;
                }).sort(_callLogHelpers.sortByStartTime);
                this.filterSuccess(data);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function callsSearch() {
        return _callsSearch.apply(this, arguments);
      }

      return callsSearch;
    }()
  }, {
    key: "normalizedCalls",
    get: function get() {
      var _this4 = this;

      return this._deps.callLog.calls.map(function (call) {
        var callFrom = _objectSpread({}, call.from);

        if (callFrom.phoneNumber) {
          callFrom.phoneNumber = (0, _normalizeNumber.normalizeNumber)({
            phoneNumber: callFrom.phoneNumber,
            countryCode: _this4._deps.accountInfo.countryCode
          });
        }

        var callTo = _objectSpread({}, call.to);

        if (callTo.phoneNumber) {
          callTo.phoneNumber = (0, _normalizeNumber.normalizeNumber)({
            phoneNumber: callTo.phoneNumber,
            countryCode: _this4._deps.accountInfo.countryCode
          });
        }

        return _objectSpread(_objectSpread({}, call), {}, {
          from: callFrom,
          to: callTo
        });
      }).sort(_callLogHelpers.sortByStartTime);
    }
  }, {
    key: "enableFullPhoneNumberMatch",
    get: function get() {
      var _this$_deps$callHisto3, _this$_deps$callHisto4;

      return (_this$_deps$callHisto3 = (_this$_deps$callHisto4 = this._deps.callHistoryOptions) === null || _this$_deps$callHisto4 === void 0 ? void 0 : _this$_deps$callHisto4.enableFullPhoneNumberMatch) !== null && _this$_deps$callHisto3 !== void 0 ? _this$_deps$callHisto3 : false;
    }
  }, {
    key: "calls",
    get: function get() {
      var _this$_deps$contactMa,
          _this$_deps$contactMa2,
          _this$_deps$activityM2,
          _this$_deps$activityM3,
          _this$_deps$callMonit,
          _this$_deps$callMonit2,
          _this5 = this;

      var contactMapping = (_this$_deps$contactMa = (_this$_deps$contactMa2 = this._deps.contactMatcher) === null || _this$_deps$contactMa2 === void 0 ? void 0 : _this$_deps$contactMa2.dataMapping) !== null && _this$_deps$contactMa !== void 0 ? _this$_deps$contactMa : {};
      var activityMapping = (_this$_deps$activityM2 = (_this$_deps$activityM3 = this._deps.activityMatcher) === null || _this$_deps$activityM3 === void 0 ? void 0 : _this$_deps$activityM3.dataMapping) !== null && _this$_deps$activityM2 !== void 0 ? _this$_deps$activityM2 : {};
      var callMatched = (_this$_deps$callMonit = (_this$_deps$callMonit2 = this._deps.callMonitor) === null || _this$_deps$callMonit2 === void 0 ? void 0 : _this$_deps$callMonit2.callMatched) !== null && _this$_deps$callMonit !== void 0 ? _this$_deps$callMonit : {};
      var telephonySessionIds = {};
      var calls = this.normalizedCalls.map(function (call) {
        telephonySessionIds[call.telephonySessionId] = true;
        var fromName = call.from.name || call.from.phoneNumber;
        var toName = call.to.name || call.to.phoneNumber;

        var _this5$findMatches = _this5.findMatches(contactMapping, call),
            fromMatches = _this5$findMatches.fromMatches,
            toMatches = _this5$findMatches.toMatches;

        var activityMatches = activityMapping[call.sessionId] || [];
        var matched = callMatched[call.sessionId];
        return _objectSpread(_objectSpread({}, call), {}, {
          fromName: fromName,
          toName: toName,
          fromMatches: fromMatches,
          toMatches: toMatches,
          activityMatches: activityMatches,
          toNumberEntity: matched
        });
      });
      var filteredEndedCalls = this.endedCalls.filter(function (call) {
        return !telephonySessionIds[call.telephonySessionId];
      }).map(function (call) {
        var activityMatches = activityMapping[call.sessionId] || [];
        var fromNumber = call.from && (call.from.phoneNumber || call.from.extensionNumber);
        var toNumber = call.to && (call.to.phoneNumber || call.to.extensionNumber);
        var fromMatches = fromNumber && contactMapping[fromNumber] || [];
        var toMatches = toNumber && contactMapping[toNumber] || [];
        return _objectSpread(_objectSpread({}, call), {}, {
          activityMatches: activityMatches,
          fromMatches: fromMatches,
          toMatches: toMatches
        });
      });
      return [].concat(_toConsumableArray(filteredEndedCalls), _toConsumableArray(calls)).sort(_callLogHelpers.sortByStartTime);
    }
  }, {
    key: "latestCalls",
    get: function get() {
      var _this$_deps$activityM4,
          _this6 = this;

      if ((_this$_deps$activityM4 = this._deps.activityMatcher) === null || _this$_deps$activityM4 === void 0 ? void 0 : _this$_deps$activityM4.dataMapping) {
        var newCalls = this.filterCalls.map(function (call) {
          var _this6$_deps$activity;

          return _objectSpread(_objectSpread({}, call), {}, {
            activityMatches: ((_this6$_deps$activity = _this6._deps.activityMatcher) === null || _this6$_deps$activity === void 0 ? void 0 : _this6$_deps$activity.dataMapping[call.sessionId]) || []
          });
        });
        return newCalls;
      }

      return this.filterCalls;
    }
  }, {
    key: "uniqueNumbers",
    get: function get() {
      var output = [];
      var numberMap = {};
      this.normalizedCalls.forEach((0, _callHistoryHelper.addNumbersFromCall)(output, numberMap, this.enableFullPhoneNumberMatch));
      this.endedCalls.forEach((0, _callHistoryHelper.addNumbersFromCall)(output, numberMap, this.enableFullPhoneNumberMatch));
      return output;
    }
  }, {
    key: "sessionIds",
    get: function get() {
      var sessionIds = {};
      return this._deps.callLog.calls.map(function (call) {
        sessionIds[call.sessionId] = true;
        return call.sessionId;
      }).concat(this.endedCalls.filter(function (call) {
        return !sessionIds[call.sessionId];
      }).map(function (call) {
        return call.sessionId;
      }));
    }
  }, {
    key: "filterCalls",
    get: function get() {
      if (this.searchInput === '') {
        return this.calls;
      }

      return this.filteredCalls;
    } // TODO: remove recentlyEndedCalls getter, instead of `endedCalls`.

    /**
     * !!Please use `endedCalls` instead of it.
     * @deprecated
     */

  }, {
    key: "recentlyEndedCalls",
    get: function get() {
      return this.endedCalls;
    }
  }]);

  return CallHistory;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "endedCalls", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "searchInput", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "filteredCalls", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "filterSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "filterSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSearchInput", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setSearchInput"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setEndedCalls", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setEndedCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeEndedCalls", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "removeEndedCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cleanEndedCalls", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "cleanEndedCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeAllEndedCalls", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "removeAllEndedCalls"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "markedList", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "markRemoved", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "markRemoved"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onClickToSMS", [_proxify.proxify, _dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "onClickToSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onClickToCall", [_proxify.proxify, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "onClickToCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSearchInput", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSearchInput"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "normalizedCalls", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "normalizedCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "calls", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "calls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "debouncedSearch", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "debouncedSearch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callsSearch", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "callsSearch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "latestCalls", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "latestCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "uniqueNumbers", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "uniqueNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sessionIds", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "sessionIds"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "filterCalls", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "filterCalls"), _class2.prototype)), _class2)) || _class);
exports.CallHistory = CallHistory;
//# sourceMappingURL=CallHistory.js.map
