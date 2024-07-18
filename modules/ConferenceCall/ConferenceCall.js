"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.reduce");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.object.values");
require("core-js/modules/es.promise");
require("core-js/modules/es.regexp.to-string");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConferenceCall = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _events = require("events");
var _ramda = require("ramda");
var _callDirections = _interopRequireDefault(require("../../enums/callDirections"));
var _calleeTypes = _interopRequireDefault(require("../../enums/calleeTypes"));
var _permissionsMessages = require("../../enums/permissionsMessages");
var _trackEvents = require("../../enums/trackEvents");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _CallingSettings = require("../CallingSettings");
var _sessionStatus = _interopRequireDefault(require("../Webphone/sessionStatus"));
var _webphoneHelper = require("../Webphone/webphoneHelper");
var _conferenceCallErrors = require("./conferenceCallErrors");
var _lib = require("./lib");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));) { ; } return t; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var ConferenceCall = (_dec = (0, _di.Module)({
  name: 'ConferenceCall',
  deps: ['Auth', 'Alert', 'Call', 'CallingSettings', 'ConnectivityMonitor', 'Client', 'AppFeatures', {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'ConferenceCallOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(_trackEvents.trackEvents.clickHangupParticipantList), _dec3 = (0, _core.track)(_trackEvents.trackEvents.cancelRemoveRemoveParticipantsModal), _dec4 = (0, _core.track)(_trackEvents.trackEvents.clickRemoveRemoveParticipantsModal), _dec5 = (0, _core.computed)(function (that) {
  return [
  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
  that._deps.webphone.sessions, that.mergingPair.fromSessionId, that.partyProfiles];
}), _dec6 = (0, _core.computed)(function (that) {
  return [that.currentConferenceId, that.conferences];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(ConferenceCall, _RcModuleV);
  var _super = _createSuper(ConferenceCall);
  function ConferenceCall(deps) {
    var _this$_deps$conferenc, _this$_deps$conferenc2, _this$_deps$conferenc3, _this$_deps$conferenc4, _this$_deps$conferenc5, _this$_deps$conferenc6;
    var _this;
    _classCallCheck(this, ConferenceCall);
    _this = _super.call(this, {
      deps: deps
    });
    _this._eventEmitter = new _events.EventEmitter();
    _this._timers = {};
    // @ts-expect-error TS(2564): Property '_fromSessionId' has no initializer and i... Remove this comment to see the full error message
    _this._fromSessionId = void 0;
    _this._ttl = _lib.DEFAULT_TTL;
    _this._timeout = (_this$_deps$conferenc = (_this$_deps$conferenc2 = _this._deps.conferenceCallOptions) === null || _this$_deps$conferenc2 === void 0 ? void 0 : _this$_deps$conferenc2.timeout) !== null && _this$_deps$conferenc !== void 0 ? _this$_deps$conferenc : _lib.DEFAULT_TIMEOUT;
    _this._capacity = (_this$_deps$conferenc3 = (_this$_deps$conferenc4 = _this._deps.conferenceCallOptions) === null || _this$_deps$conferenc4 === void 0 ? void 0 : _this$_deps$conferenc4.capacity) !== null && _this$_deps$conferenc3 !== void 0 ? _this$_deps$conferenc3 : _lib.MAXIMUM_CAPACITY;
    _this._pulling = (_this$_deps$conferenc5 = (_this$_deps$conferenc6 = _this._deps.conferenceCallOptions) === null || _this$_deps$conferenc6 === void 0 ? void 0 : _this$_deps$conferenc6.pulling) !== null && _this$_deps$conferenc5 !== void 0 ? _this$_deps$conferenc5 : true;
    // @ts-expect-error TS(2564): Property '_lastCallInfo' has no initializer and is... Remove this comment to see the full error message
    _this._lastCallInfo = void 0;
    _initializerDefineProperty(_this, "conferences", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "conferenceCallStatus", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "mergingPair", _descriptor3, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "currentConferenceId", _descriptor4, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "isMerging", _descriptor5, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(ConferenceCall, [{
    key: "setIsMerging",
    value: function setIsMerging(state) {
      this.isMerging = state;
    }
  }, {
    key: "setCurrentConferenceId",
    value: function setCurrentConferenceId(id) {
      this.currentConferenceId = id;
    }
  }, {
    key: "setMergingPair",
    value: function setMergingPair(val) {
      this.mergingPair = val;
    }
  }, {
    key: "setConferencesState",
    value: function setConferencesState(val) {
      this.conferences = val;
    }
  }, {
    key: "toggleConferenceCallStatus",
    value: function toggleConferenceCallStatus() {
      if (this.conferenceCallStatus === _lib.conferenceCallStatus.idle) {
        this.conferenceCallStatus = _lib.conferenceCallStatus.requesting;
        return;
      }
      this.conferenceCallStatus = _lib.conferenceCallStatus.idle;
    }
  }, {
    key: "setConferenceCallStatus",
    value: function setConferenceCallStatus(val) {
      this.conferenceCallStatus = val;
    }
  }, {
    key: "updateAConference",
    value: function () {
      var _updateAConference = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(conference, sessionId) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.setConferencesState(_objectSpread(_objectSpread({}, this.conferences), {}, _defineProperty({}, conference.id, {
                  conference: conference,
                  sessionId: sessionId,
                  profiles: this.conferences[conference.id] && this.conferences[conference.id].profiles || []
                })));
              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function updateAConference(_x, _x2) {
        return _updateAConference.apply(this, arguments);
      }
      return updateAConference;
    }()
  }, {
    key: "bringInParty",
    value: function bringInParty(conference, sessionId, partyProfile) {
      this.setConferencesState(_objectSpread(_objectSpread({}, this.conferences), {}, _defineProperty({}, conference.id, {
        conference: conference,
        sessionId: sessionId,
        profiles: [].concat(_toConsumableArray(this.conferences[conference.id].profiles), [partyProfile])
      })));
    }
  }, {
    key: "removeConference",
    value: function removeConference(id) {
      delete this.conferences[id];
    }
  }, {
    key: "isConferenceSession",
    value: function isConferenceSession(sessionId) {
      // only can be used after webphone._onCallStartFunc
      var res = !!this.findConferenceWithSession(sessionId);
      if (this.isMerging && !res) {
        var session = (0, _ramda.find)(function (session) {
          return session.id === sessionId;
        },
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        this._deps.webphone.sessions);
        res = (0, _webphoneHelper.isConferenceSession)(session);
      }
      return res;
    }
  }, {
    key: "findConferenceWithSession",
    value: function findConferenceWithSession(sessionId) {
      return (0, _ramda.find)(function (c) {
        return c.sessionId === sessionId;
      }, (0, _ramda.values)(this.conferences));
    }
  }, {
    key: "updateConferenceStatus",
    value: function () {
      var _updateConferenceStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        var rawResponse, response, storedConference, conference, sessionId;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.setConferenceCallStatus(_lib.conferenceCallStatus.requesting);
                _context2.prev = 1;
                _context2.next = 4;
                return this._deps.client.service.platform().get("/restapi/v1.0/account/~/telephony/sessions/".concat(id));
              case 4:
                rawResponse = _context2.sent;
                _context2.next = 7;
                return rawResponse.json();
              case 7:
                response = _context2.sent;
                storedConference = this.conferences[response.id];
                conference = _objectSpread({}, storedConference.conference);
                conference.parties =
                // if BE session hasn't been updated
                conference.parties.length > response.parties.length ? (0, _lib.mergeParty)(response.parties, conference.parties) : response.parties;
                sessionId = storedConference.sessionId;
                this.updateAConference(conference, sessionId);
              case 13:
                _context2.prev = 13;
                this.setConferenceCallStatus(_lib.conferenceCallStatus.idle);
                // eslint-disable-next-line no-unsafe-finally
                return _context2.abrupt("return", this.conferences[id]);
              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1,, 13, 17]]);
      }));
      function updateConferenceStatus(_x3) {
        return _updateConferenceStatus.apply(this, arguments);
      }
      return updateConferenceStatus;
    }()
  }, {
    key: "terminateConference",
    value: function () {
      var _terminateConference = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
        var conferenceData;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.conferenceCallStatus === _lib.conferenceCallStatus.requesting)) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return");
              case 2:
                this.setConferenceCallStatus(_lib.conferenceCallStatus.requesting);
                conferenceData = this.conferences[id];
                _context3.prev = 4;
                if (conferenceData) {
                  _context3.next = 7;
                  break;
                }
                return _context3.abrupt("return");
              case 7:
                if (this._deps.webphone) {
                  this._deps.webphone.hangup(conferenceData.sessionId);
                }
                _context3.next = 10;
                return this._deps.client.service.platform()["delete"]("/restapi/v1.0/account/~/telephony/sessions/".concat(id));
              case 10:
                this.removeConference(id);
                _context3.next = 22;
                break;
              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](4);
                _context3.t1 = !this._deps.availabilityMonitor;
                if (_context3.t1) {
                  _context3.next = 20;
                  break;
                }
                _context3.next = 19;
                return this._deps.availabilityMonitor.checkIfHAError(_context3.t0);
              case 19:
                _context3.t1 = !_context3.sent;
              case 20:
                if (!_context3.t1) {
                  _context3.next = 22;
                  break;
                }
                this._deps.alert.warning({
                  message: _conferenceCallErrors.conferenceCallErrors.terminateConferenceFailed
                });
              case 22:
                _context3.prev = 22;
                this.setConferenceCallStatus(_lib.conferenceCallStatus.idle);
                // eslint-disable-next-line no-unsafe-finally
                return _context3.abrupt("return", conferenceData);
              case 26:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 13, 22, 26]]);
      }));
      function terminateConference(_x4) {
        return _terminateConference.apply(this, arguments);
      }
      return terminateConference;
    }()
  }, {
    key: "bringInToConference",
    value: function () {
      var _bringInToConference = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, webphoneSession) {
        var propagate,
          conferenceState,
          sessionId,
          partyProfile,
          newConference,
          conference,
          _conferenceState,
          newParties,
          _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                propagate = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : false;
                conferenceState = this.conferences[id];
                if (!(!conferenceState || !this.ready || !webphoneSession || this.isOverload(id) || !this._deps.connectivityMonitor.connectivity)) {
                  _context4.next = 5;
                  break;
                }
                this._deps.alert.danger({
                  message: _conferenceCallErrors.conferenceCallErrors.modeError,
                  ttl: 0
                });
                return _context4.abrupt("return", null);
              case 5:
                sessionId = conferenceState.sessionId;
                this.setConferenceCallStatus(_lib.conferenceCallStatus.requesting);
                _context4.prev = 7;
                partyProfile = this._getProfile(webphoneSession.id);
                _context4.next = 11;
                return this._deps.client.service.platform().post("/restapi/v1.0/account/~/telephony/sessions/".concat(id, "/parties/bring-in"), webphoneSession.partyData);
              case 11:
                _context4.next = 13;
                return this.updateConferenceStatus(id);
              case 13:
                newConference = _context4.sent;
                conference = newConference.conference;
                if (partyProfile) {
                  _conferenceState = this.conferences[id];
                  newParties = (0, _lib.ascendSortParties)(_conferenceState.conference.parties); // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
                  partyProfile.id = newParties[newParties.length - 1].id;
                  this.bringInParty(conference, sessionId, partyProfile);
                }
                // else using BE push notification to get the new party data
                return _context4.abrupt("return", id);
              case 19:
                _context4.prev = 19;
                _context4.t0 = _context4["catch"](7);
                if (propagate) {
                  _context4.next = 23;
                  break;
                }
                return _context4.abrupt("return");
              case 23:
                throw _context4.t0;
              case 24:
                _context4.prev = 24;
                this.setConferenceCallStatus(_lib.conferenceCallStatus.idle);
                return _context4.finish(24);
              case 27:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[7, 19, 24, 27]]);
      }));
      function bringInToConference(_x5, _x6) {
        return _bringInToConference.apply(this, arguments);
      }
      return bringInToConference;
    }()
  }, {
    key: "removeFromConference",
    value: function () {
      var _removeFromConference = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id, partyId) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.setConferenceCallStatus(_lib.conferenceCallStatus.requesting);
                _context5.prev = 1;
                _context5.next = 4;
                return this._deps.client.service.platform()["delete"]("/restapi/v1.0/account/~/telephony/sessions/".concat(id, "/parties/").concat(partyId));
              case 4:
                _context5.next = 6;
                return this.updateConferenceStatus(id);
              case 6:
                _context5.next = 17;
                break;
              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](1);
                _context5.t1 = !this._deps.availabilityMonitor;
                if (_context5.t1) {
                  _context5.next = 15;
                  break;
                }
                _context5.next = 14;
                return this._deps.availabilityMonitor.checkIfHAError(_context5.t0);
              case 14:
                _context5.t1 = !_context5.sent;
              case 15:
                if (!_context5.t1) {
                  _context5.next = 17;
                  break;
                }
                this._deps.alert.warning({
                  message: _conferenceCallErrors.conferenceCallErrors.removeFromConferenceFailed
                });
              case 17:
                _context5.prev = 17;
                this.setConferenceCallStatus(_lib.conferenceCallStatus.idle);
                // eslint-disable-next-line no-unsafe-finally
                return _context5.abrupt("return", this.conferences[id]);
              case 21:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 8, 17, 21]]);
      }));
      function removeFromConference(_x7, _x8) {
        return _removeFromConference.apply(this, arguments);
      }
      return removeFromConference;
    }()
  }, {
    key: "makeConference",
    value: function () {
      var _makeConference2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var propagate,
          conference,
          _args6 = arguments;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                propagate = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : false;
                if (!(!this.ready || !this._deps.connectivityMonitor.connectivity)) {
                  _context6.next = 4;
                  break;
                }
                this._deps.alert.danger({
                  message: _conferenceCallErrors.conferenceCallErrors.modeError,
                  ttl: 0
                });
                return _context6.abrupt("return", null);
              case 4:
                if (this._checkPermission()) {
                  _context6.next = 7;
                  break;
                }
                // TODO: investigate whether this could potentially show 2 notifications at once
                if (!propagate) {
                  this._deps.alert.danger({
                    message: _permissionsMessages.permissionsMessages.insufficientPrivilege,
                    ttl: 0
                  });
                }
                return _context6.abrupt("return", null);
              case 7:
                if (!(this._deps.callingSettings.callingMode !== _CallingSettings.callingModes.webphone)) {
                  _context6.next = 10;
                  break;
                }
                if (!propagate) {
                  this._deps.alert.danger({
                    message: _conferenceCallErrors.conferenceCallErrors.modeError,
                    ttl: 0
                  });
                }
                return _context6.abrupt("return", null);
              case 10:
                _context6.next = 12;
                return this._makeConference(propagate);
              case 12:
                conference = _context6.sent;
                return _context6.abrupt("return", conference);
              case 14:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function makeConference() {
        return _makeConference2.apply(this, arguments);
      }
      return makeConference;
    }()
    /**
     * Merge calls to (or create) a conference.
     * @param {webphone.sessions} webphoneSessions
     * FIXME: dynamically construct this function during the construction
     * to avoid `webphone` criterias to improve performance ahead of time
     */
  }, {
    key: "mergeToConference",
    value: function () {
      var _mergeToConference2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _this2 = this,
          _this$_deps$webphone,
          _this$_deps$webphone2;
        var webphoneSessions,
          sipInstances,
          sessionIds,
          pSips,
          _args7 = arguments;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                webphoneSessions = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : [];
                webphoneSessions = (0, _ramda.filter)(function (session) {
                  return !_this2.isConferenceSession(session.id);
                }, (0, _ramda.filter)(function (session) {
                  return !!session;
                }, webphoneSessions));
                if (webphoneSessions.length) {
                  _context7.next = 5;
                  break;
                }
                this._deps.alert.warning({
                  message: _conferenceCallErrors.conferenceCallErrors.bringInFailed
                });
                return _context7.abrupt("return");
              case 5:
                this.setIsMerging(true);

                /**
                 * Because the concurrency behavior of the server,
                 * we cannot sure the merging process is over when
                 * the function's procedure has finished.
                 */
                sipInstances = (0, _ramda.map)(function (webphoneSession) {
                  var _this2$_deps$webphone;
                  return (_this2$_deps$webphone = _this2._deps.webphone) === null || _this2$_deps$webphone === void 0 ? void 0 : _this2$_deps$webphone._sessions.get(webphoneSession.id);
                }, webphoneSessions).filter(function (x) {
                  return !!x;
                });
                /**
                 * HACK: we need to preserve the merging session in prevent the glitch of
                 * the call control page.
                 */
                sessionIds = (0, _ramda.map)(function (x) {
                  return x.id;
                }, webphoneSessions);
                (_this$_deps$webphone = this._deps.webphone) === null || _this$_deps$webphone === void 0 ? void 0 : _this$_deps$webphone.setSessionCaching(sessionIds);
                pSips = (0, _ramda.map)(function (instance) {
                  var p = new Promise(function (resolve) {
                    instance.on('terminated', function () {
                      resolve(null);
                    });
                  });
                  return p;
                }, sipInstances);
                _context7.next = 12;
                return Promise.all([this._mergeToConference(webphoneSessions)].concat(_toConsumableArray(pSips))).then(function () {
                  _this2.setIsMerging(false);
                  _this2.setMergingPair({});
                  var conferenceState = Object.values(_this2.conferences)[0];
                  _this2._eventEmitter.emit(_lib.mergeEvents.mergeSucceeded, conferenceState);
                }, function (e) {
                  console.error(e);
                  var conferenceState = Object.values(_this2.conferences)[0];

                  /**
                   * if create conference successfully but failed to bring-in,
                   *  then terminate the conference.
                   */
                  if (conferenceState && conferenceState.profiles.length < 1) {
                    _this2.terminateConference(conferenceState.conference.id);
                  }
                  _this2._deps.alert.warning({
                    message: _conferenceCallErrors.conferenceCallErrors.bringInFailed
                  });
                  _this2.setIsMerging(false);
                });
              case 12:
                (_this$_deps$webphone2 = this._deps.webphone) === null || _this$_deps$webphone2 === void 0 ? void 0 : _this$_deps$webphone2.clearSessionCaching();
              case 13:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function mergeToConference() {
        return _mergeToConference2.apply(this, arguments);
      }
      return mergeToConference;
    }()
  }, {
    key: "setMergeParty",
    value: function () {
      var _setMergeParty = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_ref) {
        var fromSessionId, toSessionId;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                fromSessionId = _ref.fromSessionId, toSessionId = _ref.toSessionId;
                if (!fromSessionId) {
                  _context8.next = 4;
                  break;
                }
                this.setMergingPair({
                  fromSessionId: fromSessionId
                });
                return _context8.abrupt("return");
              case 4:
                this.setMergingPair(_objectSpread(_objectSpread({}, this.mergingPair), toSessionId && {
                  toSessionId: toSessionId
                }));
              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function setMergeParty(_x9) {
        return _setMergeParty.apply(this, arguments);
      }
      return setMergeParty;
    }()
  }, {
    key: "closeMergingPair",
    value: function () {
      var _closeMergingPair = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (this.mergingPair.fromSessionId) {
                  _context9.next = 2;
                  break;
                }
                return _context9.abrupt("return");
              case 2:
                this.setMergingPair({});
              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));
      function closeMergingPair() {
        return _closeMergingPair.apply(this, arguments);
      }
      return closeMergingPair;
    }()
  }, {
    key: "getOnlinePartyProfiles",
    value: function getOnlinePartyProfiles(id) {
      var conferenceData = this.conferences[id];
      if (!conferenceData) {
        // @ts-expect-error TS(2322): Type 'null' is not assignable to type '(Party & Pa... Remove this comment to see the full error message
        return null;
      }
      return (0, _lib.ascendSortParties)(conferenceData.conference.parties).reduce(function (accum, party, idx) {
        var _party$status;
        if ((party === null || party === void 0 ? void 0 : (_party$status = party.status) === null || _party$status === void 0 ? void 0 : _party$status.code.toLowerCase()) !== _lib.partyStatusCode.disconnected) {
          // 0 position is the host
          // @ts-expect-error TS(2322): Type 'number' is not assignable to type 'never'.
          accum.push({
            idx: idx,
            party: party
          });
        }
        return accum;
      }, []).map(function (_ref2) {
        var idx = _ref2.idx,
          party = _ref2.party;
        return _objectSpread(_objectSpread({}, party), conferenceData.profiles[idx]);
      }).filter(function (i) {
        return !!i;
      });
    }
  }, {
    key: "getOnlineParties",
    value: function getOnlineParties(id) {
      var conferenceData = this.conferences[id];
      if (!conferenceData) {
        return null;
      }
      return (0, _ramda.filter)(function (p) {
        var _p$status, _p$status$code;
        return (p === null || p === void 0 ? void 0 : (_p$status = p.status) === null || _p$status === void 0 ? void 0 : (_p$status$code = _p$status.code) === null || _p$status$code === void 0 ? void 0 : _p$status$code.toLowerCase()) !== _lib.partyStatusCode.disconnected;
      }, conferenceData.conference.parties);
    }
  }, {
    key: "countOnlineParties",
    value: function countOnlineParties(id) {
      var res = this.getOnlineParties(id);
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      return (0, _ramda.is)(Array, res) ? res.length : null;
    }
  }, {
    key: "isOverload",
    value: function isOverload(id) {
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      return this.countOnlineParties(id) >= this._capacity;
    }
  }, {
    key: "startPollingConferenceStatus",
    value: function () {
      var _startPollingConferenceStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(id) {
        var _this3 = this;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!(this._timers[id] || !this._pulling)) {
                  _context11.next = 2;
                  break;
                }
                return _context11.abrupt("return");
              case 2:
                _context11.next = 4;
                return this.updateConferenceStatus(id);
              case 4:
                this._timers[id] = window.setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                  return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                      switch (_context10.prev = _context10.next) {
                        case 0:
                          _context10.next = 2;
                          return _this3.updateConferenceStatus(id);
                        case 2:
                          _this3.stopPollingConferenceStatus(id);
                          if (_this3.conferences[id]) {
                            _this3.startPollingConferenceStatus(id);
                          }
                        case 4:
                        case "end":
                          return _context10.stop();
                      }
                    }
                  }, _callee10);
                })), this._ttl);
              case 5:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));
      function startPollingConferenceStatus(_x10) {
        return _startPollingConferenceStatus.apply(this, arguments);
      }
      return startPollingConferenceStatus;
    }()
  }, {
    key: "stopPollingConferenceStatus",
    value: function stopPollingConferenceStatus(id) {
      clearTimeout(this._timers[id]);
      delete this._timers[id];
    }
  }, {
    key: "onMergeSuccess",
    value: function onMergeSuccess(func) {
      this._eventEmitter.on(_lib.mergeEvents.mergeSucceeded, func);
    }
  }, {
    key: "removeMergeSuccess",
    value: function removeMergeSuccess(func) {
      this._eventEmitter.off(_lib.mergeEvents.mergeSucceeded, func);
    }
  }, {
    key: "loadConference",
    value: function () {
      var _loadConference = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(conferenceId) {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                this.setCurrentConferenceId(conferenceId);
              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));
      function loadConference(_x11) {
        return _loadConference.apply(this, arguments);
      }
      return loadConference;
    }()
  }, {
    key: "onReset",
    value: function onReset() {
      this.resetSuccess();
    }
  }, {
    key: "_checkPermission",
    value: function _checkPermission() {
      if (!this.hasPermission) {
        this._deps.alert.danger({
          message: _permissionsMessages.permissionsMessages.insufficientPrivilege,
          ttl: 0
        });
        return false;
      }
      return true;
    }
  }, {
    key: "_hookConference",
    value: function () {
      var _hookConference2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(conference, session) {
        var _this4 = this;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                ['accepted'].forEach(function (evt) {
                  return session.on(evt, function () {
                    return _this4.startPollingConferenceStatus(conference.id);
                  });
                });
                ['terminated', 'failed', 'rejected'].forEach(function (evt) {
                  return session.on(evt, function () {
                    _this4.setConferenceCallStatus(_lib.conferenceCallStatus.idle);
                    _this4.removeConference(conference.id);
                    _this4.stopPollingConferenceStatus(conference.id);
                  });
                });
              case 2:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));
      function _hookConference(_x12, _x13) {
        return _hookConference2.apply(this, arguments);
      }
      return _hookConference;
    }()
  }, {
    key: "_mergeToConference",
    value: function () {
      var _mergeToConference3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var _this5 = this;
        var webphoneSessions,
          conferenceState,
          conferenceId,
          _iterator,
          _step,
          webphoneSession,
          _yield$this$makeConfe,
          id,
          conferenceAccepted,
          _args14 = arguments;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                webphoneSessions = _args14.length > 0 && _args14[0] !== undefined ? _args14[0] : [];
                conferenceState = Object.values(this.conferences)[0];
                if (!conferenceState) {
                  _context14.next = 26;
                  break;
                }
                conferenceId = conferenceState.conference.id;
                this.stopPollingConferenceStatus(conferenceId);
                // for the sake of participants ordering, we can't concurrently bring in the participants
                _iterator = _createForOfIteratorHelper(webphoneSessions);
                _context14.prev = 6;
                _iterator.s();
              case 8:
                if ((_step = _iterator.n()).done) {
                  _context14.next = 14;
                  break;
                }
                webphoneSession = _step.value;
                _context14.next = 12;
                return this.bringInToConference(conferenceId, webphoneSession, true);
              case 12:
                _context14.next = 8;
                break;
              case 14:
                _context14.next = 19;
                break;
              case 16:
                _context14.prev = 16;
                _context14.t0 = _context14["catch"](6);
                _iterator.e(_context14.t0);
              case 19:
                _context14.prev = 19;
                _iterator.f();
                return _context14.finish(19);
              case 22:
                if (this.conferences[conferenceId].profiles.length) {
                  _context14.next = 24;
                  break;
                }
                throw new Error('bring-in operations failed, not all intended parties were brought in');
              case 24:
                this.startPollingConferenceStatus(conferenceId);
                return _context14.abrupt("return", conferenceId);
              case 26:
                _context14.next = 28;
                return this.makeConference(true);
              case 28:
                _yield$this$makeConfe = _context14.sent;
                id = _yield$this$makeConfe.id;
                conferenceAccepted = false;
                _context14.next = 33;
                return Promise.race([new Promise(function (resolve, reject) {
                  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                  var sipSession = _this5._deps.webphone._sessions.get(_this5.conferences[id].sessionId);
                  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                  sipSession.on('accepted', function () {
                    conferenceAccepted = true;
                    resolve(null);
                  });
                  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                  sipSession.on('cancel', function () {
                    return reject(new Error('conferencing cancel'));
                  });
                  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                  sipSession.on('failed', function () {
                    return reject(new Error('conferencing failed'));
                  });
                  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                  sipSession.on('rejected', function () {
                    return reject(new Error('conferencing rejected'));
                  });
                  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                  sipSession.on('terminated', function () {
                    return reject(new Error('conferencing terminated'));
                  });
                }), new Promise(function (resolve, reject) {
                  setTimeout(function () {
                    return conferenceAccepted ? resolve(null) : reject(new Error('conferencing timeout'));
                  }, _this5._timeout);
                })]);
              case 33:
                _context14.next = 35;
                return this._mergeToConference(webphoneSessions);
              case 35:
                return _context14.abrupt("return", id);
              case 36:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this, [[6, 16, 19, 22]]);
      }));
      function _mergeToConference() {
        return _mergeToConference3.apply(this, arguments);
      }
      return _mergeToConference;
    }()
  }, {
    key: "_makeConference",
    value: function () {
      var _makeConference3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        var propagate,
          rawResponse,
          response,
          conference,
          phoneNumber,
          session,
          _args15 = arguments;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                propagate = _args15.length > 0 && _args15[0] !== undefined ? _args15[0] : false;
                this.setConferenceCallStatus(_lib.conferenceCallStatus.requesting);
                _context15.prev = 2;
                _context15.next = 5;
                return this._deps.client.service.platform().post('/restapi/v1.0/account/~/telephony/conference', {});
              case 5:
                rawResponse = _context15.sent;
                _context15.next = 8;
                return rawResponse.json();
              case 8:
                response = _context15.sent;
                conference = response.session;
                phoneNumber = conference.voiceCallToken; // whether to mutate the session to mark the conference?
                _context15.next = 13;
                return this._deps.call.call({
                  phoneNumber: phoneNumber,
                  isConference: true
                });
              case 13:
                session = _context15.sent;
                if (_typeof(session) === 'object' && Object.prototype.toString.call(session.on).toLowerCase() === '[object function]') {
                  this._hookConference(conference, session);
                  this.updateAConference(conference, session.id);
                }
                return _context15.abrupt("return", conference);
              case 18:
                _context15.prev = 18;
                _context15.t0 = _context15["catch"](2);
                console.error(_context15.t0);
                _context15.t1 = !propagate || !this._deps.availabilityMonitor;
                if (_context15.t1) {
                  _context15.next = 26;
                  break;
                }
                _context15.next = 25;
                return this._deps.availabilityMonitor.checkIfHAError(_context15.t0);
              case 25:
                _context15.t1 = !_context15.sent;
              case 26:
                if (!_context15.t1) {
                  _context15.next = 29;
                  break;
                }
                this._deps.alert.warning({
                  message: _conferenceCallErrors.conferenceCallErrors.makeConferenceFailed
                });
                return _context15.abrupt("return", null);
              case 29:
                throw _context15.t0;
              case 30:
                _context15.prev = 30;
                this.setConferenceCallStatus(_lib.conferenceCallStatus.idle);
                return _context15.finish(30);
              case 33:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this, [[2, 18, 30, 33]]);
      }));
      function _makeConference() {
        return _makeConference3.apply(this, arguments);
      }
      return _makeConference;
    }() // get profile the a webphone session
  }, {
    key: "_getProfile",
    value: function _getProfile(sessionId) {
      var session = (0, _ramda.find)(function (session) {
        return session.id === sessionId;
      },
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this._deps.webphone.sessions);
      var rcId;
      var avatarUrl;
      var calleeType = _calleeTypes["default"].unknown;
      var partyName =
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      session.direction === _callDirections["default"].outbound ?
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      session.toUserName :
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      session.fromUserName;
      var partyNumber =
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      session.direction === _callDirections["default"].outbound ? session.to : session.from;

      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      var matchedContact = session.contactMatch;
      if (!matchedContact && this._deps.contactMatcher) {
        var nameMatches = this._deps.contactMatcher.dataMapping[partyNumber];
        if (nameMatches && nameMatches.length) {
          matchedContact = nameMatches[0];
        }
      }
      if (matchedContact) {
        rcId = matchedContact.id;
        avatarUrl = matchedContact.profileImageUrl;
        partyName = matchedContact.name;
        calleeType = _calleeTypes["default"].contacts;
      }
      return {
        rcId: rcId,
        avatarUrl: avatarUrl,
        partyName: partyName,
        partyNumber: partyNumber,
        calleeType: calleeType
      };
    }
  }, {
    key: "parseMergingSessions",
    value: function () {
      var _parseMergingSessions = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(_ref4) {
        var _this6 = this;
        var sessionId, sessionIdToMergeWith, session, sessionToMergeWith, webphoneSessions, _i, _webphoneSessions, _session, conferenceState, conferenceSession;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                sessionId = _ref4.sessionId, sessionIdToMergeWith = _ref4.sessionIdToMergeWith;
                session = (0, _ramda.find)(function (x) {
                  return x.id === sessionId;
                },
                // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                this._deps.webphone.sessions);
                sessionToMergeWith = (0, _ramda.find)(function (x) {
                  return x.id === (sessionIdToMergeWith || _this6.mergingPair.fromSessionId);
                },
                // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                this._deps.webphone.sessions);
                webphoneSessions = sessionToMergeWith ? [sessionToMergeWith, session] : [session];
                _i = 0, _webphoneSessions = webphoneSessions;
              case 5:
                if (!(_i < _webphoneSessions.length)) {
                  _context16.next = 12;
                  break;
                }
                _session = _webphoneSessions[_i];
                if (this.validateCallRecording(_session)) {
                  _context16.next = 9;
                  break;
                }
                return _context16.abrupt("return", null);
              case 9:
                _i++;
                _context16.next = 5;
                break;
              case 12:
                conferenceState = Object.values(this.conferences)[0];
                if (!conferenceState) {
                  _context16.next = 17;
                  break;
                }
                conferenceSession = (0, _ramda.find)(function (x) {
                  return x.id === conferenceState.sessionId;
                },
                // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                this._deps.webphone.sessions); // @ts-expect-error TS(2345): Argument of type 'NormalizedSession | undefined' i... Remove this comment to see the full error message
                if (this.validateCallRecording(conferenceSession)) {
                  _context16.next = 17;
                  break;
                }
                return _context16.abrupt("return", null);
              case 17:
                return _context16.abrupt("return", {
                  session: session,
                  sessionToMergeWith: sessionToMergeWith
                });
              case 18:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));
      function parseMergingSessions(_x14) {
        return _parseMergingSessions.apply(this, arguments);
      }
      return parseMergingSessions;
    }()
  }, {
    key: "mergeSessions",
    value: function () {
      var _mergeSessions = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(_ref5) {
        var session, sessionToMergeWith, webphoneSessions, conferenceData, currentConferenceSession, isCurrentConferenceOnHold;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                session = _ref5.session, sessionToMergeWith = _ref5.sessionToMergeWith;
                this.setMergeParty({
                  toSessionId: session.id
                });
                webphoneSessions = sessionToMergeWith ? [sessionToMergeWith, session] : [session];
                _context17.next = 5;
                return this.mergeToConference(webphoneSessions);
              case 5:
                conferenceData = Object.values(this.conferences)[0];
                if (conferenceData) {
                  _context17.next = 10;
                  break;
                }
                _context17.next = 9;
                return this._deps.webphone.resume(session.id);
              case 9:
                return _context17.abrupt("return", null);
              case 10:
                currentConferenceSession = (0, _ramda.find)(function (x) {
                  return x.id === conferenceData.sessionId;
                },
                // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                this._deps.webphone.sessions); // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                isCurrentConferenceOnHold = currentConferenceSession.isOnHold;
                if (isCurrentConferenceOnHold) {
                  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                  this._deps.webphone.resume(conferenceData.sessionId);
                }
                return _context17.abrupt("return", conferenceData);
              case 14:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));
      function mergeSessions(_x15) {
        return _mergeSessions.apply(this, arguments);
      }
      return mergeSessions;
    }()
  }, {
    key: "validateCallRecording",
    value: function validateCallRecording(session) {
      if ((0, _webphoneHelper.isRecording)(session)) {
        this._deps.alert.warning({
          message: _conferenceCallErrors.conferenceCallErrors.callIsRecording
        });
        return false;
      }
      return true;
    }
  }, {
    key: "resetSuccess",
    value: function resetSuccess() {
      this.setIsMerging(false);
      this.setMergingPair({});
      // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
      this.setCurrentConferenceId(null);
      this.conferenceCallStatus = _lib.conferenceCallStatus.idle;
      this.conferences = {};
    }
    /*
     * User action track dispatchs
     * */
  }, {
    key: "participantListClickHangupTrack",
    value: function participantListClickHangupTrack() {
      //
    }
  }, {
    key: "removeParticipantClickCancelTrack",
    value: function removeParticipantClickCancelTrack() {
      //
    }
  }, {
    key: "removeParticipantClickRemoveTrack",
    value: function removeParticipantClickRemoveTrack() {
      //
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._deps.auth.loggedIn && _get(_getPrototypeOf(ConferenceCall.prototype), "_shouldInit", this).call(this);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return _get(_getPrototypeOf(ConferenceCall.prototype), "_shouldReset", this).call(this) || this.ready && !this._deps.auth.loggedIn;
    }
  }, {
    key: "hasPermission",
    get: function get() {
      return this._deps.appFeatures.hasConferenceCall;
    }
  }, {
    key: "lastCallInfo",
    get: function get() {
      // @ts-expect-error TS(2339): Property 'sessions' does not exist on type 'Webpho... Remove this comment to see the full error message
      var sessions = this._deps.webphone.sessions;
      var partyProfiles = this.partyProfiles,
        fromSessionId = this.mergingPair.fromSessionId;
      if (!fromSessionId) {
        // @ts-expect-error TS(2322): Type 'null' is not assignable to type '{ calleeTyp... Remove this comment to see the full error message
        this._lastCallInfo = null;
        return this._lastCallInfo;
      }
      var sessionName;
      var sessionNumber;
      var sessionStatus;
      var matchedContact;
      var fromSession = sessions.find(function (session) {
        return session.id === fromSessionId;
      });
      if (fromSession) {
        sessionName = fromSession.direction === _callDirections["default"].outbound ? fromSession.toUserName : fromSession.fromUserName;
        sessionNumber = fromSession.direction === _callDirections["default"].outbound ? fromSession.to : fromSession.from;
        sessionStatus = fromSession.callStatus;
        matchedContact = fromSession.contactMatch;
        if (!matchedContact && this._deps.contactMatcher) {
          var nameMatches = this._deps.contactMatcher.dataMapping[sessionNumber];
          if (nameMatches && nameMatches.length) {
            matchedContact = nameMatches[0];
          }
        }
      }
      var lastCalleeType;
      if (fromSession) {
        if (matchedContact) {
          lastCalleeType = _calleeTypes["default"].contacts;
        } else if (this.isConferenceSession(fromSession.id)) {
          lastCalleeType = _calleeTypes["default"].conference;
        } else {
          lastCalleeType = _calleeTypes["default"].unknown;
        }
      } else if (this._fromSessionId === fromSessionId && this._lastCallInfo && this._lastCallInfo.calleeType) {
        this._lastCallInfo = _objectSpread(_objectSpread({}, this._lastCallInfo), {}, {
          status: _sessionStatus["default"].finished
        });
        return this._lastCallInfo;
      } else {
        return {
          calleeType: _calleeTypes["default"].unknown
        };
      }
      var partiesAvatarUrls = null;
      if (lastCalleeType === _calleeTypes["default"].conference) {
        partiesAvatarUrls = (partyProfiles || []).map(function (profile) {
          return profile.avatarUrl;
        });
      }
      switch (lastCalleeType) {
        case _calleeTypes["default"].conference:
          this._lastCallInfo = {
            calleeType: _calleeTypes["default"].conference,
            // @ts-expect-error TS(2531): Object is possibly 'null'.
            avatarUrl: partiesAvatarUrls[0],
            // @ts-expect-error TS(2531): Object is possibly 'null'.
            extraNum: partiesAvatarUrls.length - 1,
            // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
            name: null,
            // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
            phoneNumber: null,
            status: sessionStatus,
            lastCallContact: null
          };
          break;
        case _calleeTypes["default"].contacts:
          this._lastCallInfo = {
            calleeType: _calleeTypes["default"].contacts,
            avatarUrl: matchedContact.profileImageUrl,
            name: matchedContact.name,
            status: sessionStatus,
            phoneNumber: sessionNumber,
            extraNum: 0,
            lastCallContact: matchedContact
          };
          break;
        default:
          this._lastCallInfo = {
            calleeType: _calleeTypes["default"].unknown,
            // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
            avatarUrl: null,
            name: sessionName,
            status: sessionStatus,
            phoneNumber: sessionNumber,
            extraNum: 0,
            lastCallContact: null
          };
      }
      this._fromSessionId = fromSessionId;
      return this._lastCallInfo;
    }
  }, {
    key: "partyProfiles",
    get: function get() {
      var currentConferenceId = this.currentConferenceId,
        conferences = this.conferences;
      var conferenceData = conferences && conferences[currentConferenceId];
      if (!conferenceData) {
        return [];
      }
      return this.getOnlinePartyProfiles(currentConferenceId);
    }
  }]);
  return ConferenceCall;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "conferences", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "conferenceCallStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _lib.conferenceCallStatus.idle;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "mergingPair", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "currentConferenceId", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "isMerging", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setIsMerging", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsMerging"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCurrentConferenceId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCurrentConferenceId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setMergingPair", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setMergingPair"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setConferencesState", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setConferencesState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toggleConferenceCallStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "toggleConferenceCallStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setConferenceCallStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setConferenceCallStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateAConference", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateAConference"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeConference", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "removeConference"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateConferenceStatus", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateConferenceStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "terminateConference", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "terminateConference"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "bringInToConference", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "bringInToConference"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeFromConference", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "removeFromConference"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "makeConference", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "makeConference"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mergeToConference", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "mergeToConference"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setMergeParty", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setMergeParty"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "closeMergingPair", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "closeMergingPair"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startPollingConferenceStatus", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "startPollingConferenceStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadConference", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "loadConference"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_hookConference", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_hookConference"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_mergeToConference", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_mergeToConference"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_makeConference", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_makeConference"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "parseMergingSessions", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "parseMergingSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mergeSessions", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "mergeSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "participantListClickHangupTrack", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "participantListClickHangupTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeParticipantClickCancelTrack", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "removeParticipantClickCancelTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeParticipantClickRemoveTrack", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "removeParticipantClickRemoveTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lastCallInfo", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "lastCallInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "partyProfiles", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "partyProfiles"), _class2.prototype)), _class2)) || _class);
exports.ConferenceCall = ConferenceCall;
//# sourceMappingURL=ConferenceCall.js.map
