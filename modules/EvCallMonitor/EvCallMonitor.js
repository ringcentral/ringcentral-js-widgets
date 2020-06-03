"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvCallMonitor = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.set");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.array.reduce");

var _core = require("@ringcentral-integration/core");

var _di = require("ringcentral-integration/lib/di");

var _callUniqueIdentifies = require("../../lib/callUniqueIdentifies");

var _contactMatchIdentify = require("../../lib/contactMatchIdentify");

var _dec, _class, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var EvCallMonitor = (_dec = (0, _di.Module)({
  name: 'EvCallMonitor',
  deps: ['Presence', 'EvClient', 'EvSessionConfig', {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'ActivityMatcher',
    optional: true
  }]
}), _dec(_class = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvCallMonitor, _RcModuleV);

  var _super = _createSuper(EvCallMonitor);

  function EvCallMonitor(_ref) {
    var _this;

    var presence = _ref.presence,
        evClient = _ref.evClient,
        evSessionConfig = _ref.evSessionConfig,
        contactMatcher = _ref.contactMatcher,
        activityMatcher = _ref.activityMatcher;

    _classCallCheck(this, EvCallMonitor);

    _this = _super.call(this, {
      modules: {
        presence: presence,
        evClient: evClient,
        evSessionConfig: evSessionConfig,
        contactMatcher: contactMatcher,
        activityMatcher: activityMatcher
      }
    });
    _this._oldCalls = void 0;
    _this._onCallEndedHooks = void 0;
    _this._onCallRingHooks = void 0;
    _this.handleActivityMatch = void 0;
    _this.getCallsMapping = (0, _core.createSelector)(function () {
      return _this.callsDataMapping;
    }, function () {
      return _this.contactMatches;
    }, function () {
      return _this.activityMatches;
    }, function (callsDataMapping, contactMatches, activityMatches) {
      return Object.entries(callsDataMapping).reduce(function (mapping, _ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            key = _ref3[0],
            call = _ref3[1];

        var contactMatchIdentify = (0, _contactMatchIdentify.contactMatchIdentifyEncode)({
          phoneNumber: call.ani,
          callType: call.callType.toLowerCase()
        });
        var id = call.session ? _this.getCallId(call.session) : null;

        var _ref4 = call.baggage || {},
            agentFirstName = _ref4.agentFirstName,
            agentLastName = _ref4.agentLastName;

        var agentName = agentFirstName && agentLastName ? "".concat(agentFirstName, " ").concat(agentLastName) : null;
        return _objectSpread(_objectSpread({}, mapping), {}, _defineProperty({}, key, _objectSpread(_objectSpread({}, call), {}, {
          agentName: agentName,
          // TODO confirm about using `toMatches` & `fromMatches`?
          contactMatches: contactMatches[contactMatchIdentify] || [],
          activityMatches: id && activityMatches[id] ? activityMatches[id] : []
        })));
      }, {});
    });
    _this.getUniqueIdentifies = (0, _core.createSelector)(function () {
      return _this.calls;
    }, function (calls) {
      return (0, _callUniqueIdentifies.makeCallsUniqueIdentifies)(calls);
    });

    _this.beforeunloadHandler = function (event) {
      if (_this._modules.evSessionConfig.hasMultipleTabs) {
        // Guarantee the browser unload by removing the returnValue property of the event
        delete event.returnValue;
      } else {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    _this._oldCalls = [];
    _this._onCallRingHooks = new Set();
    _this._onCallEndedHooks = new Set();

    if (_this._modules.contactMatcher) {
      _this._modules.contactMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.getUniqueIdentifies();
        },
        readyCheckFn: function readyCheckFn() {
          return _this._modules.presence.ready;
        }
      });

      _this.addCallRingHook( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var call, contactMatchIdentify;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                call = _this.getCallsMapping()[_this.callIds[0]];
                contactMatchIdentify = (0, _contactMatchIdentify.contactMatchIdentifyEncode)({
                  phoneNumber: call.ani,
                  callType: call.callType.toLowerCase()
                });
                _context.next = 4;
                return _this._modules.contactMatcher.forceMatchNumber({
                  phoneNumber: contactMatchIdentify
                });

              case 4:
                if (_this.handleActivityMatch) {
                  _this.handleActivityMatch();
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    }

    if (_this._modules.activityMatcher) {
      _this._modules.activityMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.callIds;
        },
        readyCheckFn: function readyCheckFn() {
          return _this._modules.presence.ready;
        }
      });
    }

    return _this;
  }

  _createClass(EvCallMonitor, [{
    key: "onStateChange",
    value: function onStateChange() {
      if (this.calls.length > this._oldCalls.length) {
        this._oldCalls = this.calls;

        if (this.calls.length > 0 && this.calls[0]) {
          this.onCallRing();
        }
      } else if (this.calls.length < this._oldCalls.length) {
        this._oldCalls = this.calls;
        this.onCallEnded();
      }
    }
  }, {
    key: "getCallId",
    value: function getCallId(_ref6) {
      var uii = _ref6.uii,
          sessionId = _ref6.sessionId;
      return this._modules.evClient.encodeUii({
        uii: uii,
        sessionId: sessionId
      });
    }
  }, {
    key: "getActiveCallList",
    value: function getActiveCallList(callIds, otherCallIds, callsMapping, id) {
      var uii = this._modules.evClient.decodeUii(id);

      var mainUii = this._modules.evClient.getMainId(uii);

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
      var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref7$forceMatch = _ref7.forceMatch,
          forceMatch = _ref7$forceMatch === void 0 ? false : _ref7$forceMatch;

      // it's async function
      // TODO: fix type in DataMatcher
      return this._modules.activityMatcher.match({
        queries: this._modules.activityMatcher._getQueries(),
        ignoreCache: forceMatch
      });
    }
  }, {
    key: "onCallRing",
    value: function () {
      var _onCallRing = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _iterator, _step, hook;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                window.addEventListener('beforeunload', this.beforeunloadHandler);
                _iterator = _createForOfIteratorHelper(this._onCallRingHooks);
                _context2.prev = 2;

                _iterator.s();

              case 4:
                if ((_step = _iterator.n()).done) {
                  _context2.next = 10;
                  break;
                }

                hook = _step.value;
                _context2.next = 8;
                return hook();

              case 8:
                _context2.next = 4;
                break;

              case 10:
                _context2.next = 15;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](2);

                _iterator.e(_context2.t0);

              case 15:
                _context2.prev = 15;

                _iterator.f();

                return _context2.finish(15);

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 12, 15, 18]]);
      }));

      function onCallRing() {
        return _onCallRing.apply(this, arguments);
      }

      return onCallRing;
    }()
  }, {
    key: "onCallEnded",
    value: function () {
      var _onCallEnded = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _iterator2, _step2, hook;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                window.removeEventListener('beforeunload', this.beforeunloadHandler);
                _iterator2 = _createForOfIteratorHelper(this._onCallEndedHooks);
                _context3.prev = 2;

                _iterator2.s();

              case 4:
                if ((_step2 = _iterator2.n()).done) {
                  _context3.next = 10;
                  break;
                }

                hook = _step2.value;
                _context3.next = 8;
                return hook();

              case 8:
                _context3.next = 4;
                break;

              case 10:
                _context3.next = 15;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](2);

                _iterator2.e(_context3.t0);

              case 15:
                _context3.prev = 15;

                _iterator2.f();

                return _context3.finish(15);

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 12, 15, 18]]);
      }));

      function onCallEnded() {
        return _onCallEnded.apply(this, arguments);
      }

      return onCallEnded;
    }()
  }, {
    key: "addCallRingHook",
    value: function addCallRingHook(callback) {
      this._onCallRingHooks.add(callback);

      return this;
    }
  }, {
    key: "removeCallRingHook",
    value: function removeCallRingHook(callback) {
      this._onCallRingHooks["delete"](callback);
    }
  }, {
    key: "addCallEndedHook",
    value: function addCallEndedHook(callback) {
      this._onCallEndedHooks.add(callback);

      return this;
    }
  }, {
    key: "removeCallEndedHook",
    value: function removeCallEndedHook(callback) {
      this._onCallEndedHooks["delete"](callback);
    }
  }, {
    key: "isOnCall",
    get: function get() {
      return this.calls.length > 0;
    }
  }, {
    key: "calls",
    get: function get() {
      return this._modules.presence.getCalls() || [];
    }
  }, {
    key: "otherCalls",
    get: function get() {
      return this._modules.presence.getOtherCalls() || [];
    }
  }, {
    key: "callLogs",
    get: function get() {
      return this._modules.presence.getCallLogs() || [];
    }
  }, {
    key: "callIds",
    get: function get() {
      return this._modules.presence.callIds || [];
    }
  }, {
    key: "otherCallIds",
    get: function get() {
      return this._modules.presence.otherCallIds || [];
    }
  }, {
    key: "callLogsIds",
    get: function get() {
      return this._modules.presence.callLogsIds || [];
    }
  }, {
    key: "callsDataMapping",
    get: function get() {
      return this._modules.presence.callsMapping || {};
    }
  }, {
    key: "contactMatches",
    get: function get() {
      return this._modules.contactMatcher.dataMapping || {};
    }
  }, {
    key: "activityMatches",
    get: function get() {
      return this._modules.activityMatcher.dataMapping || {};
    }
  }]);

  return EvCallMonitor;
}(_core.RcModuleV2), _temp)) || _class);
exports.EvCallMonitor = EvCallMonitor;
//# sourceMappingURL=EvCallMonitor.js.map
