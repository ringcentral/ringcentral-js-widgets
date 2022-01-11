"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.function.name");

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

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvCallMonitor = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("regenerator-runtime/runtime");

var _di = require("@ringcentral-integration/commons/lib/di");

var _core = require("@ringcentral-integration/core");

var _enums = require("../../enums");

var _callUniqueIdentifies = require("../../lib/callUniqueIdentifies");

var _contactMatchIdentify = require("../../lib/contactMatchIdentify");

var _dec, _dec2, _dec3, _class, _class2;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var EvCallMonitor = (_dec = (0, _di.Module)({
  name: 'EvCallMonitor',
  deps: ['Presence', 'EvClient', 'Beforeunload', 'EvAgentSession', 'EvIntegratedSoftphone', 'EvCallDataSource', {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'ActivityMatcher',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.callsDataMapping, that.contactMatches, that.activityMatches];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that.calls];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvCallMonitor, _RcModuleV);

  var _super = _createSuper(EvCallMonitor);

  function EvCallMonitor(deps) {
    var _this$_deps$contactMa, _this$_deps$activityM;

    var _this;

    _classCallCheck(this, EvCallMonitor);

    _this = _super.call(this, {
      deps: deps
    });
    _this._oldCalls = [];

    _this._beforeunloadHandler = function () {
      return _this._deps.evAgentSession.shouldBlockBrowser;
    };

    (_this$_deps$contactMa = _this._deps.contactMatcher) === null || _this$_deps$contactMa === void 0 ? void 0 : _this$_deps$contactMa.addQuerySource({
      getQueriesFn: function getQueriesFn() {
        return _this.uniqueIdentifies;
      },
      readyCheckFn: function readyCheckFn() {
        return _this._deps.presence.ready;
      }
    });
    (_this$_deps$activityM = _this._deps.activityMatcher) === null || _this$_deps$activityM === void 0 ? void 0 : _this$_deps$activityM.addQuerySource({
      getQueriesFn: function getQueriesFn() {
        return _this.callIds;
      },
      readyCheckFn: function readyCheckFn() {
        return _this._deps.presence.ready;
      }
    });
    return _this;
  }

  _createClass(EvCallMonitor, [{
    key: "getMatcher",
    value: function () {
      var _getMatcher = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var ani, callType, contactMatchIdentify;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ani = _ref.ani, callType = _ref.callType;

                if (!this._deps.contactMatcher) {
                  _context.next = 5;
                  break;
                }

                contactMatchIdentify = (0, _contactMatchIdentify.contactMatchIdentifyEncode)({
                  phoneNumber: ani,
                  callType: callType
                });
                _context.next = 5;
                return this._deps.contactMatcher.forceMatchNumber({
                  phoneNumber: contactMatchIdentify
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getMatcher(_x) {
        return _getMatcher.apply(this, arguments);
      }

      return getMatcher;
    }()
  }, {
    key: "getMainCall",
    value: function getMainCall(uii) {
      var id = this._deps.evClient.getMainId(uii);

      return this._deps.presence.callsMapping[id];
    }
  }, {
    key: "limitCalls",
    value: function limitCalls() {
      return this._deps.evCallDataSource.limitCalls();
    }
  }, {
    key: "onStateChange",
    value: function onStateChange() {
      if (this._deps.evAgentSession.configSuccess) {
        if (this.calls.length > this._oldCalls.length) {
          var _currentCall = this.calls[0];
          var mainCall = this.getMainCall(_currentCall.uii);

          if (_currentCall && mainCall) {
            this._oldCalls = this.calls;

            this._deps.presence.eventEmitter.emit(_enums.callStatus.ANSWERED, _currentCall);
          } else {
            this._deps.presence.clearCalls();
          }
        } else if (this.calls.length < this._oldCalls.length) {
          var call = this._oldCalls[0];
          this._oldCalls = this.calls;

          this._deps.presence.eventEmitter.emit(_enums.callStatus.ENDED, call);
        }
      }
    }
  }, {
    key: "getCallId",
    value: function getCallId(_ref2) {
      var uii = _ref2.uii,
          sessionId = _ref2.sessionId;
      return this._deps.evClient.encodeUii({
        uii: uii,
        sessionId: sessionId
      });
    }
  }, {
    key: "getActiveCallList",
    value: function getActiveCallList(callIds, otherCallIds, callsMapping, id) {
      var uii = this._deps.evClient.decodeUii(id);

      var mainUii = this._deps.evClient.getMainId(uii);

      if (!otherCallIds.includes(mainUii) || !callIds.includes(id)) return [];
      var currentOtherCallIds = otherCallIds.filter(function (id) {
        return id.includes(uii) && id !== mainUii;
      });
      var currentCallIds = [mainUii, id].concat(_toConsumableArray(currentOtherCallIds));
      return currentCallIds.map(function (id) {
        return callsMapping[id];
      });
    }
  }, {
    key: "updateActivityMatches",
    value: function updateActivityMatches() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$forceMatch = _ref3.forceMatch,
          forceMatch = _ref3$forceMatch === void 0 ? false : _ref3$forceMatch;

      // it's async function
      // TODO: fix type in DataMatcher
      return this._deps.activityMatcher.match({
        queries: this._deps.activityMatcher._getQueries(),
        ignoreCache: forceMatch
      });
    }
  }, {
    key: "onCallRinging",
    value: function onCallRinging(callback) {
      this._deps.presence.eventEmitter.on(_enums.callStatus.RINGING, callback);

      return this;
    }
  }, {
    key: "onCallAnswered",
    value: function onCallAnswered(callback) {
      this._deps.presence.eventEmitter.on(_enums.callStatus.ANSWERED, callback);

      return this;
    }
  }, {
    key: "onCallEnded",
    value: function onCallEnded(callback) {
      this._deps.presence.eventEmitter.on(_enums.callStatus.ENDED, callback);

      return this;
    }
  }, {
    key: "bindBeforeunload",
    value: function bindBeforeunload() {
      this._deps.beforeunload.add(this._beforeunloadHandler);
    }
  }, {
    key: "removeBeforeunload",
    value: function removeBeforeunload() {
      this._deps.beforeunload.remove(this._beforeunloadHandler);
    }
  }, {
    key: "isOnCall",
    get: function get() {
      return this.calls.length > 0;
    }
  }, {
    key: "calls",
    get: function get() {
      return this._deps.presence.calls || [];
    }
  }, {
    key: "otherCalls",
    get: function get() {
      return this._deps.presence.otherCalls || [];
    }
  }, {
    key: "callLogs",
    get: function get() {
      return this._deps.presence.callLogs || [];
    }
  }, {
    key: "callIds",
    get: function get() {
      return this._deps.presence.callIds || [];
    }
  }, {
    key: "otherCallIds",
    get: function get() {
      return this._deps.presence.otherCallIds || [];
    }
  }, {
    key: "callLogsIds",
    get: function get() {
      return this._deps.presence.callLogsIds || [];
    }
  }, {
    key: "callsDataMapping",
    get: function get() {
      return this._deps.presence.callsMapping || {};
    }
  }, {
    key: "contactMatches",
    get: function get() {
      return this._deps.contactMatcher.dataMapping || {};
    }
  }, {
    key: "activityMatches",
    get: function get() {
      return this._deps.activityMatcher.dataMapping || {};
    }
  }, {
    key: "callsMapping",
    get: function get() {
      var _this2 = this;

      var callsDataMapping = this.callsDataMapping,
          contactMatches = this.contactMatches,
          activityMatches = this.activityMatches;
      return Object.entries(callsDataMapping).reduce(function (mapping, _ref4) {
        var _call$session;

        var _ref5 = _slicedToArray(_ref4, 2),
            key = _ref5[0],
            call = _ref5[1];

        var contactMatchIdentify = (0, _contactMatchIdentify.contactMatchIdentifyEncode)({
          phoneNumber: call.ani,
          callType: call.callType
        });
        var id = call.session ? _this2.getCallId(call.session) : null;
        var recordingUrl = (_call$session = call.session) === null || _call$session === void 0 ? void 0 : _call$session.recordingUrl;

        var _ref6 = call.baggage || {},
            agentFirstName = _ref6.agentFirstName,
            agentLastName = _ref6.agentLastName;

        var agentName = agentFirstName && agentLastName ? "".concat(agentFirstName, " ").concat(agentLastName) : null;
        return _objectSpread(_objectSpread({}, mapping), {}, _defineProperty({}, key, _objectSpread(_objectSpread({}, call), {}, {
          recordingUrl: recordingUrl,
          agentName: agentName,
          // TODO confirm about using `toMatches` & `fromMatches`?
          contactMatches: contactMatches[contactMatchIdentify] || [],
          activityMatches: id && activityMatches[id] ? activityMatches[id] : []
        })));
      }, {});
    }
  }, {
    key: "uniqueIdentifies",
    get: function get() {
      return (0, _callUniqueIdentifies.makeCallsUniqueIdentifies)(this.calls);
    }
  }, {
    key: "callsLimited",
    get: function get() {
      return this._deps.evCallDataSource.callsLimited;
    }
  }]);

  return EvCallMonitor;
}(_core.RcModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "callsMapping", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "callsMapping"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "uniqueIdentifies", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "uniqueIdentifies"), _class2.prototype)), _class2)) || _class);
exports.EvCallMonitor = EvCallMonitor;
//# sourceMappingURL=EvCallMonitor.js.map
