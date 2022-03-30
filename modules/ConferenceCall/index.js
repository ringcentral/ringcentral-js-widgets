"use strict";

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.sort");

var _events = require("events");

var _ramda = require("ramda");

var _callDirections = _interopRequireDefault(require("../../enums/callDirections"));

var _calleeTypes = _interopRequireDefault(require("../../enums/calleeTypes"));

var _permissionsMessages = require("../../enums/permissionsMessages");

var _di = require("../../lib/di");

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _selector = require("../../lib/selector");

var _callingModes = _interopRequireDefault(require("../CallingSettings/callingModes"));

var _sessionStatus = _interopRequireDefault(require("../Webphone/sessionStatus"));

var _webphoneHelper = require("../Webphone/webphoneHelper");

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _conferenceCallErrors = _interopRequireDefault(require("./conferenceCallErrors"));

var _conferenceRole = _interopRequireDefault(require("./conferenceRole"));

var _getConferenceCallReducer = _interopRequireDefault(require("./getConferenceCallReducer"));

var _partyStatusCode = _interopRequireDefault(require("./partyStatusCode"));

var _dec, _class, _class2, _descriptor, _descriptor2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var DEFAULT_TIMEOUT = 30000; // time out for conferencing session being accepted.

var DEFAULT_TTL = 5000; // timer to update the conference information

var MAXIMUM_CAPACITY = 10;

var _fromSessionId;

var _lastCallInfo;

function ascendSortParties(parties) {
  return parties.filter(function (party) {
    return party.conferenceRole.toLowerCase() !== _conferenceRole["default"].host;
  }).sort(function (last, next) {
    return +last.id.split('-')[1] - +next.id.split('-')[1];
  });
}
/**
 * @class
 * @description ConferenceCall managing module
 */


var ConferenceCall = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Alert', 'Call', 'CallingSettings', 'ConnectivityMonitor', 'Client', 'Webphone', 'AppFeatures', {
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
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  _inherits(ConferenceCall, _RcModule);

  var _super = _createSuper(ConferenceCall);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {RegionSettings} params.regionSettings - regionSettings module instance
   * @param {Client} params.client - client module instance
   */
  function ConferenceCall(_ref) {
    var _this;

    var auth = _ref.auth,
        alert = _ref.alert,
        call = _ref.call,
        callingSettings = _ref.callingSettings,
        client = _ref.client,
        appFeatures = _ref.appFeatures,
        contactMatcher = _ref.contactMatcher,
        webphone = _ref.webphone,
        availabilityMonitor = _ref.availabilityMonitor,
        connectivityMonitor = _ref.connectivityMonitor,
        _ref$pulling = _ref.pulling,
        pulling = _ref$pulling === void 0 ? true : _ref$pulling,
        _ref$capacity = _ref.capacity,
        capacity = _ref$capacity === void 0 ? MAXIMUM_CAPACITY : _ref$capacity,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === void 0 ? DEFAULT_TIMEOUT : _ref$timeout,
        options = _objectWithoutProperties(_ref, ["auth", "alert", "call", "callingSettings", "client", "appFeatures", "contactMatcher", "webphone", "availabilityMonitor", "connectivityMonitor", "pulling", "capacity", "timeout"]);

    _classCallCheck(this, ConferenceCall);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes["default"]
    }));

    _initializerDefineProperty(_this, "lastCallInfo", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "partyProfiles", _descriptor2, _assertThisInitialized(_this));

    _this._eventEmitter = new _events.EventEmitter();
    _this._auth = _ensureExist["default"].call(_assertThisInitialized(_this), auth, 'auth');
    _this._alert = _ensureExist["default"].call(_assertThisInitialized(_this), alert, 'alert');
    _this._call = _ensureExist["default"].call(_assertThisInitialized(_this), call, 'call');
    _this._availabilityMonitor = availabilityMonitor;
    _this._callingSettings = _ensureExist["default"].call(_assertThisInitialized(_this), callingSettings, 'callingSettings');
    _this._client = _ensureExist["default"].call(_assertThisInitialized(_this), client, 'client'); // in order to run the integeration test, we need it to be optional

    _this._webphone = webphone;
    _this._connectivityMonitor = connectivityMonitor;
    _this._contactMatcher = contactMatcher;
    _this._appFeatures = appFeatures; // we need the constructed actions

    _this._reducer = (0, _getConferenceCallReducer["default"])(_this.actionTypes);
    _this._ttl = DEFAULT_TTL;
    _this._timout = timeout;
    _this._timers = {};
    _this._pulling = pulling;
    _this.capacity = capacity;
    return _this;
  }

  _createClass(ConferenceCall, [{
    key: "isConferenceSession",
    value: function isConferenceSession(sessionId) {
      // only can be used after webphone._onCallStartFunc
      var res = !!this.findConferenceWithSession(sessionId);

      if (this.isMerging && !res) {
        var session = this._webphone.sessions.find(function (session) {
          return session.id === sessionId;
        });

        res = (0, _webphoneHelper.isConferenceSession)(session);
      }

      return res;
    }
  }, {
    key: "findConferenceWithSession",
    value: function findConferenceWithSession(sessionId) {
      return Object.values(this.conferences).find(function (c) {
        return c.sessionId === sessionId;
      });
    }
    /**
     *
     * @param {string} id: conference id
     */

  }, {
    key: "updateConferenceStatus",
    value: function () {
      var _updateConferenceStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
        var rawResponse, response, storedconference, conference, sessionId;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.updateConference,
                  conference: this.state.conferences[id]
                });
                _context.prev = 1;
                _context.next = 4;
                return this._client.service.platform().get("/restapi/v1.0/account/~/telephony/sessions/".concat(id));

              case 4:
                rawResponse = _context.sent;
                _context.next = 7;
                return rawResponse.json();

              case 7:
                response = _context.sent;
                storedconference = this.state.conferences[response.id];
                conference = _objectSpread({}, storedconference.conference);
                conference.parties = response.parties;
                sessionId = storedconference.sessionId;
                this.store.dispatch({
                  type: this.actionTypes.updateConferenceSucceeded,
                  conference: conference,
                  sessionId: sessionId
                });
                _context.next = 19;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](1);
                // TODO: alert
                this.store.dispatch({
                  type: this.actionTypes.updateConferenceFailed,
                  conference: this.state.conferences[id],
                  message: _context.t0.toString()
                }); // need to propagate to out side try...catch block

                throw _context.t0;

              case 19:
                _context.prev = 19;
                return _context.abrupt("return", this.state.conferences[id]);

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 15, 19, 22]]);
      }));

      function updateConferenceStatus(_x) {
        return _updateConferenceStatus.apply(this, arguments);
      }

      return updateConferenceStatus;
    }()
    /**
     * terminate a conference.
     * @param {string} id: conference id
     */

  }, {
    key: "terminateConference",
    value: function () {
      var _terminateConference = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        var conferenceData;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.terminateConference,
                  conference: this.state.conferences[id]
                });
                conferenceData = this.conferences[id];
                _context2.prev = 2;

                if (!this._webphone) {
                  _context2.next = 7;
                  break;
                }

                if (conferenceData) {
                  this._webphone.hangup(conferenceData.sessionId); // Help server to do the GC, and we don't care the whether it's successful or not


                  this._client.service.platform()["delete"]("/restapi/v1.0/account/~/telephony/sessions/".concat(id));

                  this.store.dispatch({
                    type: this.actionTypes.terminateConferenceSucceeded,
                    conference: conferenceData.conference
                  });
                } else {
                  this.store.dispatch({
                    type: this.actionTypes.terminateConferenceFailed
                  });
                }

                _context2.next = 10;
                break;

              case 7:
                _context2.next = 9;
                return this._client.service.platform()["delete"]("/restapi/v1.0/account/~/telephony/sessions/".concat(id));

              case 9:
                this.store.dispatch({
                  type: this.actionTypes.terminateConferenceSucceeded,
                  conference: conferenceData.conference
                });

              case 10:
                _context2.next = 22;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](2);
                _context2.t1 = !this._availabilityMonitor;

                if (_context2.t1) {
                  _context2.next = 19;
                  break;
                }

                _context2.next = 18;
                return this._availabilityMonitor.checkIfHAError(_context2.t0);

              case 18:
                _context2.t1 = !_context2.sent;

              case 19:
                if (!_context2.t1) {
                  _context2.next = 21;
                  break;
                }

                this._alert.warning({
                  message: _conferenceCallErrors["default"].terminateConferenceFailed
                });

              case 21:
                this.store.dispatch({
                  type: this.actionTypes.terminateConferenceFailed,
                  message: _context2.t0.toString()
                });

              case 22:
                _context2.prev = 22;
                return _context2.abrupt("return", conferenceData);

              case 25:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 12, 22, 25]]);
      }));

      function terminateConference(_x2) {
        return _terminateConference.apply(this, arguments);
      }

      return terminateConference;
    }()
    /**
     * Bring-in an outbound call into conference.
     * @param {string} id: conference id
     * @param {webphone.session} webphoneSession: get it from callMonitor.\w+Calls[\d+]
     * interface SessionData{
     *  "party-id": String,
     *  "session-id": String
     * }
     */

  }, {
    key: "bringInToConference",
    value: function () {
      var _bringInToConference = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, webphoneSession) {
        var propagete,
            conferenceState,
            sessionId,
            conference,
            partyProfile,
            newConference,
            _conferenceState,
            newParties,
            _args3 = arguments;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                propagete = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : false;
                conferenceState = this.state.conferences[id];

                if (!(!conferenceState || !this.ready || !webphoneSession || this.isOverload(id) || !this._connectivityMonitor.connectivity)) {
                  _context3.next = 5;
                  break;
                }

                this._alert.danger({
                  message: _conferenceCallErrors["default"].modeError,
                  ttl: 0
                });

                return _context3.abrupt("return", null);

              case 5:
                sessionId = conferenceState.sessionId;
                conference = conferenceState.conference;
                this.store.dispatch({
                  type: this.actionTypes.bringInConference,
                  conference: conference,
                  sessionId: sessionId
                });
                _context3.prev = 8;
                partyProfile = this._getProfile(webphoneSession.id);
                _context3.next = 12;
                return this._client.service.platform().post("/restapi/v1.0/account/~/telephony/sessions/".concat(id, "/parties/bring-in"), webphoneSession.partyData);

              case 12:
                _context3.next = 14;
                return this.updateConferenceStatus(id);

              case 14:
                newConference = _context3.sent;
                conference = newConference.conference;

                if (partyProfile) {
                  _conferenceState = this.state.conferences[id];
                  newParties = ascendSortParties(_conferenceState.conference.parties);
                  partyProfile.id = newParties[newParties.length - 1].id;
                }

                this.store.dispatch({
                  type: this.actionTypes.bringInConferenceSucceeded,
                  conference: conference,
                  sessionId: sessionId,
                  partyProfile: partyProfile
                });
                return _context3.abrupt("return", id);

              case 21:
                _context3.prev = 21;
                _context3.t0 = _context3["catch"](8);
                this.store.dispatch({
                  type: this.actionTypes.bringInConferenceFailed,
                  message: _context3.t0.toString()
                });

                if (propagete) {
                  _context3.next = 26;
                  break;
                }

                return _context3.abrupt("return", null);

              case 26:
                throw _context3.t0;

              case 27:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[8, 21]]);
      }));

      function bringInToConference(_x3, _x4) {
        return _bringInToConference.apply(this, arguments);
      }

      return bringInToConference;
    }()
    /**
     * remove a participant from conference.
     * @param {string} id: conference id
     * @param {SessionData} partyId: one participant's id of an conference's `parties` list
     */

  }, {
    key: "removeFromConference",
    value: function () {
      var _removeFromConference = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, partyId) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.removeFromConference,
                  conference: this.state.conferences[id]
                });
                _context4.prev = 1;
                _context4.next = 4;
                return this._client.service.platform()["delete"]("/restapi/v1.0/account/~/telephony/sessions/".concat(id, "/parties/").concat(partyId));

              case 4:
                _context4.next = 6;
                return this.updateConferenceStatus(id);

              case 6:
                this.store.dispatch({
                  type: this.actionTypes.removeFromConferenceSucceeded,
                  conference: this.state.conferences[id]
                });
                _context4.next = 19;
                break;

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](1);
                _context4.t1 = !this._availabilityMonitor;

                if (_context4.t1) {
                  _context4.next = 16;
                  break;
                }

                _context4.next = 15;
                return this._availabilityMonitor.checkIfHAError(_context4.t0);

              case 15:
                _context4.t1 = !_context4.sent;

              case 16:
                if (!_context4.t1) {
                  _context4.next = 18;
                  break;
                }

                this._alert.warning({
                  message: _conferenceCallErrors["default"].removeFromConferenceFailed
                });

              case 18:
                this.store.dispatch({
                  type: this.actionTypes.removeFromConferenceFailed,
                  message: _context4.t0.toString()
                });

              case 19:
                _context4.prev = 19;
                return _context4.abrupt("return", this.state.conferences[id]);

              case 22:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 9, 19, 22]]);
      }));

      function removeFromConference(_x5, _x6) {
        return _removeFromConference.apply(this, arguments);
      }

      return removeFromConference;
    }()
    /**
     * start a conference call, return the session
     */

  }, {
    key: "makeConference",
    value: function () {
      var _makeConference2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var propagate,
            conference,
            _args5 = arguments;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                propagate = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : false;

                if (!(!this.ready || !this._connectivityMonitor.connectivity)) {
                  _context5.next = 4;
                  break;
                }

                this._alert.danger({
                  message: _conferenceCallErrors["default"].modeError,
                  ttl: 0
                });

                return _context5.abrupt("return", null);

              case 4:
                if (this._checkPermission()) {
                  _context5.next = 7;
                  break;
                }

                if (!propagate) {
                  this._alert.danger({
                    message: _permissionsMessages.permissionsMessages.insufficientPrivilege,
                    ttl: 0
                  });
                }

                return _context5.abrupt("return", null);

              case 7:
                if (!(!this._callingSettings.callingMode === _callingModes["default"].webphone)) {
                  _context5.next = 10;
                  break;
                }

                if (!propagate) {
                  this._alert.danger({
                    message: _conferenceCallErrors["default"].modeError,
                    ttl: 0
                  });
                }

                return _context5.abrupt("return", null);

              case 10:
                _context5.next = 12;
                return this._makeConference(propagate);

              case 12:
                conference = _context5.sent;
                return _context5.abrupt("return", conference);

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function makeConference() {
        return _makeConference2.apply(this, arguments);
      }

      return makeConference;
    }()
  }, {
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
    /**
     * Merge calls to (or create) a conference.
     * @param {webphone.sessions} webphoneSessions
     * FIXME: dynamically construct this function during the construction
     * to avoid `this._webphone` criterias to improve performance ahead of time
     */

  }, {
    key: "mergeToConference",
    value: function () {
      var _mergeToConference2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _this3 = this;

        var webphoneSessions,
            sipInstances,
            conferenceId,
            sessionIds,
            pSips,
            conferenceState,
            _args6 = arguments;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                webphoneSessions = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : [];
                webphoneSessions = webphoneSessions.filter(function (session) {
                  return !!session;
                }).filter(function (session) {
                  return !_this3.isConferenceSession(session.id);
                });

                if (webphoneSessions.length) {
                  _context6.next = 5;
                  break;
                }

                this._alert.warning({
                  message: _conferenceCallErrors["default"].bringInFailed
                });

                return _context6.abrupt("return");

              case 5:
                this.store.dispatch({
                  type: this.actionTypes.mergeStart
                });
                conferenceId = null;

                if (!this._webphone) {
                  _context6.next = 17;
                  break;
                }

                /**
                 * Because the concurrency behaviour of the server,
                 * we cannot sure the merging process is over when
                 * the function's procedure has finshed.
                 */
                sipInstances = webphoneSessions.map(function (webphoneSession) {
                  return _this3._webphone._sessions.get(webphoneSession.id);
                });
                /**
                 * HACK: we need to preserve the merging session in prevent the glitch of
                 * the call control page.
                 */

                sessionIds = webphoneSessions.map(function (x) {
                  return x.id;
                });

                this._webphone.setSessionCaching(sessionIds);

                pSips = sipInstances.map(function (instance) {
                  var p = new Promise(function (resolve) {
                    instance.on('terminated', function () {
                      resolve();
                    });
                  });
                  return p;
                });
                _context6.next = 14;
                return Promise.all([this._mergeToConference(webphoneSessions)].concat(_toConsumableArray(pSips))).then(function () {
                  _this3.store.dispatch({
                    type: _this3.actionTypes.mergeSucceeded
                  });

                  var conferenceState = Object.values(_this3.conferences)[0];

                  _this3._eventEmitter.emit(_this3.actionTypes.mergeSucceeded, conferenceState);
                }, function () {
                  var conferenceState = Object.values(_this3.conferences)[0];
                  /**
                   * if create conference successfully but failed to bring-in,
                   *  then terminate the conference.
                   */

                  /**
                   * if create conference successfully but failed to bring-in,
                   *  then terminate the conference.
                   */
                  if (conferenceState && conferenceState.profiles.length < 1) {
                    _this3.terminateConference(conferenceState.conference.id);
                  }

                  _this3._alert.warning({
                    message: _conferenceCallErrors["default"].bringInFailed
                  });

                  _this3.store.dispatch({
                    type: _this3.actionTypes.mergeFailed
                  });
                });

              case 14:
                this._webphone.clearSessionCaching();

                _context6.next = 37;
                break;

              case 17:
                _context6.prev = 17;
                _context6.next = 20;
                return this._mergeToConference(webphoneSessions);

              case 20:
                conferenceId = _context6.sent;
                this.store.dispatch({
                  type: this.actionTypes.mergeSucceeded
                });

                this._eventEmitter.emit(this.actionTypes.mergeSucceeded);

                _context6.next = 36;
                break;

              case 25:
                _context6.prev = 25;
                _context6.t0 = _context6["catch"](17);
                conferenceState = Object.values(this.conferences)[0];
                /**
                 * if create conference successfully but failed to bring-in,
                 *  then terminate the conference.
                 */

                if (conferenceState && conferenceState.conference.parties.length < 1) {
                  this.terminateConference(conferenceState.conference.id);
                }

                _context6.t1 = !this._availabilityMonitor;

                if (_context6.t1) {
                  _context6.next = 34;
                  break;
                }

                _context6.next = 33;
                return this._availabilityMonitor.checkIfHAError(_context6.t0);

              case 33:
                _context6.t1 = !_context6.sent;

              case 34:
                if (!_context6.t1) {
                  _context6.next = 36;
                  break;
                }

                this._alert.warning({
                  message: _conferenceCallErrors["default"].bringInFailed
                });

              case 36:
                if (!sipInstances || conferenceId === null) {
                  this.store.dispatch({
                    type: this.actionTypes.mergeFailed
                  });
                }

              case 37:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[17, 25]]);
      }));

      function mergeToConference() {
        return _mergeToConference2.apply(this, arguments);
      }

      return mergeToConference;
    }()
  }, {
    key: "setMergeParty",
    value: function setMergeParty(_ref2) {
      var fromSessionId = _ref2.fromSessionId,
          toSessionId = _ref2.toSessionId;

      if (fromSessionId) {
        this.store.dispatch({
          type: this.actionTypes.updateFromSession,
          fromSessionId: fromSessionId
        });
        return;
      }

      this.store.dispatch({
        type: this.actionTypes.updateToSession,
        toSessionId: toSessionId
      });
    }
    /**
     * we need to remove the fromSessionId in mergingPair when the outbound call is hang-up
     */

  }, {
    key: "closeMergingPair",
    value: function closeMergingPair() {
      if (this.mergingPair.fromSessionId) {
        return this.store.dispatch({
          type: this.actionTypes.closeMergingPair
        });
      }

      return null;
    }
  }, {
    key: "getOnlinePartyProfiles",
    value: function getOnlinePartyProfiles(id) {
      var conferenceData = this.conferences[id];

      if (conferenceData) {
        return ascendSortParties(conferenceData.conference.parties).reduce(function (accum, party, idx) {
          var _party$status;

          if ((party === null || party === void 0 ? void 0 : (_party$status = party.status) === null || _party$status === void 0 ? void 0 : _party$status.code.toLowerCase()) !== _partyStatusCode["default"].disconnected) {
            // 0 position is the host
            accum.push({
              idx: idx,
              party: party
            });
          }

          return accum;
        }, []).map(function (_ref3) {
          var idx = _ref3.idx,
              party = _ref3.party;
          return _objectSpread(_objectSpread({}, party), conferenceData.profiles[idx]);
        }).filter(function (i) {
          return !!i;
        });
      }

      return null;
    }
  }, {
    key: "getOnlineParties",
    value: function getOnlineParties(id) {
      var conferenceData = this.conferences[id];

      if (conferenceData) {
        return conferenceData.conference.parties.filter(function (p) {
          var _p$status;

          return (p === null || p === void 0 ? void 0 : (_p$status = p.status) === null || _p$status === void 0 ? void 0 : _p$status.code.toLowerCase()) !== _partyStatusCode["default"].disconnected;
        });
      }

      return null;
    }
  }, {
    key: "countOnlineParties",
    value: function countOnlineParties(id) {
      var res = this.getOnlineParties(id);
      return Array.isArray(res) ? res.length : null;
    }
  }, {
    key: "isOverload",
    value: function isOverload(id) {
      return this.countOnlineParties(id) >= this.capacity;
    }
  }, {
    key: "startPollingConferenceStatus",
    value: function () {
      var _startPollingConferenceStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(id) {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(this._timers[id] || !this._pulling)) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt("return");

              case 2:
                _context8.next = 4;
                return this.updateConferenceStatus(id);

              case 4:
                this._timers[id] = setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                  return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          _context7.next = 2;
                          return _this4.updateConferenceStatus(id);

                        case 2:
                          _this4.stopPollingConferenceStatus(id);

                          if (_this4.conferences[id]) {
                            _this4.startPollingConferenceStatus(id);
                          }

                        case 4:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7);
                })), this._ttl);

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function startPollingConferenceStatus(_x7) {
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
    key: "openPulling",
    value: function openPulling() {
      this._pulling = true;
    }
  }, {
    key: "closePulling",
    value: function closePulling() {
      this._pulling = false;
    }
  }, {
    key: "togglePulling",
    value: function togglePulling() {
      this._pulling = !this.pulling;
    }
  }, {
    key: "setCapatity",
    value: function setCapatity() {
      var capacity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : MAXIMUM_CAPACITY;

      if (typeof capacity !== 'number') {
        throw new Error('The capcity must be a number');
      }

      this.capacity = capacity;
      return capacity;
    }
  }, {
    key: "setTimeout",
    value: function setTimeout() {
      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_TIMEOUT;

      if (typeof timeout !== 'number') {
        throw new Error('The timeout must be a number');
      }

      this._timout = timeout;
      return timeout;
    }
  }, {
    key: "onMergeSuccess",
    value: function onMergeSuccess(func, isOnce) {
      if (isOnce) {
        this._eventEmitter.once(this.actionTypes.mergeSucceeded, func);

        return;
      }

      this._eventEmitter.on(this.actionTypes.mergeSucceeded, func);
    }
  }, {
    key: "removeMergeSuccess",
    value: function removeMergeSuccess(func) {
      this.off(this.actionTypes.mergeSucceeded, func);
    }
  }, {
    key: "loadConference",
    value: function loadConference(conferenceId) {
      return this.store.dispatch({
        type: this.actionTypes.updateCurrentConferenceId,
        conferenceId: conferenceId
      });
    }
  }, {
    key: "_init",
    value: function _init() {
      this.store.dispatch({
        type: this.actionTypes.initSuccess
      });
    }
  }, {
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (this._shouldInit()) {
                  this._init();
                } else if (this._shouldReset()) {
                  this._reset();
                }

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function _onStateChange() {
        return _onStateChange2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: "_reset",
    value: function _reset() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._auth.loggedIn && this._auth.ready && this._alert.ready && this._callingSettings.ready && this._call.ready && this._appFeatures.ready && this._connectivityMonitor.ready && (!this._availabilityMonitor || this._availabilityMonitor.ready) && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!this._auth.loggedIn || !this._auth.ready || !this._alert.ready || !this._callingSettings.ready || !this._call.ready || !this._appFeatures.ready || !this._connectivityMonitor.ready || !!this._availabilityMonitor && !this._availabilityMonitor.ready) && this.ready;
    }
  }, {
    key: "_checkPermission",
    value: function _checkPermission() {
      if (!this.hasPermission) {
        this._alert.danger({
          message: _permissionsMessages.permissionsMessages.insufficientPrivilege,
          ttl: 0
        });

        return false;
      }

      return true;
    }
  }, {
    key: "_hookConference",
    value: function _hookConference(conference, session) {
      var _this5 = this;

      ['accepted'].forEach(function (evt) {
        return session.on(evt, function () {
          return _this5.startPollingConferenceStatus(conference.id);
        });
      });
      ['terminated', 'failed', 'rejected'].forEach(function (evt) {
        return session.on(evt, function () {
          _this5.store.dispatch({
            type: _this5.actionTypes.terminateConferenceSucceeded,
            conference: conference
          });

          _this5.stopPollingConferenceStatus(conference.id);
        });
      });
    }
  }, {
    key: "_mergeToConference",
    value: function () {
      var _mergeToConference3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var _this6 = this;

        var webphoneSessions,
            conferenceState,
            conferenceId,
            _iterator,
            _step,
            webphoneSession,
            _yield$this$makeConfe,
            id,
            confereceAccepted,
            _args10 = arguments;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                webphoneSessions = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : [];
                conferenceState = Object.values(this.conferences)[0];

                if (!conferenceState) {
                  _context10.next = 26;
                  break;
                }

                conferenceId = conferenceState.conference.id;
                this.stopPollingConferenceStatus(conferenceId); // for the sake of participants ordering, we can't concurrently bring in the participants

                _iterator = _createForOfIteratorHelper(webphoneSessions);
                _context10.prev = 6;

                _iterator.s();

              case 8:
                if ((_step = _iterator.n()).done) {
                  _context10.next = 14;
                  break;
                }

                webphoneSession = _step.value;
                _context10.next = 12;
                return this.bringInToConference(conferenceId, webphoneSession, true);

              case 12:
                _context10.next = 8;
                break;

              case 14:
                _context10.next = 19;
                break;

              case 16:
                _context10.prev = 16;
                _context10.t0 = _context10["catch"](6);

                _iterator.e(_context10.t0);

              case 19:
                _context10.prev = 19;

                _iterator.f();

                return _context10.finish(19);

              case 22:
                if (this.conferences[conferenceId].profiles.length) {
                  _context10.next = 24;
                  break;
                }

                throw new Error('bring-in operations failed, not all intended parties were brought in');

              case 24:
                this.startPollingConferenceStatus(conferenceId);
                return _context10.abrupt("return", conferenceId);

              case 26:
                _context10.next = 28;
                return this.makeConference(true);

              case 28:
                _yield$this$makeConfe = _context10.sent;
                id = _yield$this$makeConfe.id;
                confereceAccepted = false;
                _context10.next = 33;
                return Promise.race([new Promise(function (resolve, reject) {
                  var sipSession = _this6._webphone._sessions.get(_this6.conferences[id].sessionId);

                  sipSession.on('accepted', function () {
                    confereceAccepted = true;
                    resolve();
                  });
                  sipSession.on('cancel', function () {
                    return reject(new Error('conferecing cancel'));
                  });
                  sipSession.on('failed', function () {
                    return reject(new Error('conferecing failed'));
                  });
                  sipSession.on('rejected', function () {
                    return reject(new Error('conferecing rejected'));
                  });
                  sipSession.on('terminated', function () {
                    return reject(new Error('conferecing terminated'));
                  });
                }), new Promise(function (resolve, reject) {
                  setTimeout(function () {
                    return confereceAccepted ? resolve() : reject(new Error('conferecing timeout'));
                  }, _this6._timout);
                })]);

              case 33:
                _context10.next = 35;
                return this._mergeToConference(webphoneSessions);

              case 35:
                return _context10.abrupt("return", id);

              case 36:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[6, 16, 19, 22]]);
      }));

      function _mergeToConference() {
        return _mergeToConference3.apply(this, arguments);
      }

      return _mergeToConference;
    }()
  }, {
    key: "_makeConference",
    value: function () {
      var _makeConference3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var propagate,
            rawResponse,
            response,
            conference,
            phoneNumber,
            session,
            _args11 = arguments;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                propagate = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : false;
                _context11.prev = 1;
                this.store.dispatch({
                  type: this.actionTypes.makeConference
                }); // TODO: replace with SDK function chaining calls

                _context11.next = 5;
                return this._client.service.platform().post('/restapi/v1.0/account/~/telephony/conference', {});

              case 5:
                rawResponse = _context11.sent;
                _context11.next = 8;
                return rawResponse.json();

              case 8:
                response = _context11.sent;
                conference = response.session;
                phoneNumber = conference.voiceCallToken; // whether to mutate the session to mark the conference?

                _context11.next = 13;
                return this._call.call({
                  phoneNumber: phoneNumber,
                  isConference: true
                });

              case 13:
                session = _context11.sent;

                if (_typeof(session) === 'object' && Object.prototype.toString.call(session.on).toLowerCase() === '[object function]') {
                  this._hookConference(conference, session);

                  this.store.dispatch({
                    type: this.actionTypes.makeConferenceSucceeded,
                    conference: conference,
                    sessionId: session.id,
                    parties: []
                  });
                } else {
                  this.store.dispatch({
                    type: this.actionTypes.makeConferenceFailed
                  });
                }

                return _context11.abrupt("return", conference);

              case 18:
                _context11.prev = 18;
                _context11.t0 = _context11["catch"](1);
                this.store.dispatch({
                  type: this.actionTypes.makeConferenceFailed,
                  message: _context11.t0.toString()
                });
                _context11.t1 = !propagate || !this._availabilityMonitor;

                if (_context11.t1) {
                  _context11.next = 26;
                  break;
                }

                _context11.next = 25;
                return this._availabilityMonitor.checkIfHAError(_context11.t0);

              case 25:
                _context11.t1 = !_context11.sent;

              case 26:
                if (!_context11.t1) {
                  _context11.next = 29;
                  break;
                }

                this._alert.warning({
                  message: _conferenceCallErrors["default"].makeConferenceFailed
                });

                return _context11.abrupt("return", null);

              case 29:
                throw _context11.t0;

              case 30:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[1, 18]]);
      }));

      function _makeConference() {
        return _makeConference3.apply(this, arguments);
      }

      return _makeConference;
    }()
  }, {
    key: "_getProfile",
    value: function _getProfile(sessionId) {
      var session = this._webphone.sessions.find(function (session) {
        return session.id === sessionId;
      });

      var rcId;
      var avatarUrl;
      var calleeType = _calleeTypes["default"].unknown;
      var partyName = session.direction === _callDirections["default"].outbound ? session.toUserName : session.fromUserName;
      var partyNumber = session.direction === _callDirections["default"].outbound ? session.to : session.from;
      var matchedContact = session.contactMatch;

      if (!matchedContact && this._contactMatcher) {
        var nameMatches = this._contactMatcher.dataMapping[partyNumber];

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
      var _parseMergingSessions = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(_ref5) {
        var _this7 = this;

        var sessionId, sessionIdToMergeWith, session, sessionToMergeWith, webphoneSessions, _i, _webphoneSessions, _session, conferenceState, conferenceSession;

        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                sessionId = _ref5.sessionId, sessionIdToMergeWith = _ref5.sessionIdToMergeWith;
                session = (0, _ramda.find)(function (x) {
                  return x.id === sessionId;
                }, this._webphone.sessions);
                sessionToMergeWith = (0, _ramda.find)(function (x) {
                  return x.id === (sessionIdToMergeWith || _this7.mergingPair.fromSessionId);
                }, this._webphone.sessions);
                webphoneSessions = sessionToMergeWith ? [sessionToMergeWith, session] : [session];
                _i = 0, _webphoneSessions = webphoneSessions;

              case 5:
                if (!(_i < _webphoneSessions.length)) {
                  _context12.next = 12;
                  break;
                }

                _session = _webphoneSessions[_i];

                if (this.validateCallRecording(_session)) {
                  _context12.next = 9;
                  break;
                }

                return _context12.abrupt("return", null);

              case 9:
                _i++;
                _context12.next = 5;
                break;

              case 12:
                conferenceState = Object.values(this.conferences)[0];

                if (!conferenceState) {
                  _context12.next = 17;
                  break;
                }

                conferenceSession = (0, _ramda.find)(function (x) {
                  return x.id === conferenceState.sessionId;
                }, this._webphone.sessions);

                if (this.validateCallRecording(conferenceSession)) {
                  _context12.next = 17;
                  break;
                }

                return _context12.abrupt("return", null);

              case 17:
                return _context12.abrupt("return", {
                  session: session,
                  sessionToMergeWith: sessionToMergeWith
                });

              case 18:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function parseMergingSessions(_x8) {
        return _parseMergingSessions.apply(this, arguments);
      }

      return parseMergingSessions;
    }()
  }, {
    key: "mergeSessions",
    value: function () {
      var _mergeSessions = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(_ref6) {
        var session, sessionToMergeWith, webphoneSessions, conferenceData, currentConferenceSession, isCurrentConferenceOnhold;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                session = _ref6.session, sessionToMergeWith = _ref6.sessionToMergeWith;
                this.setMergeParty({
                  toSessionId: session.id
                });
                webphoneSessions = sessionToMergeWith ? [sessionToMergeWith, session] : [session];
                _context13.next = 5;
                return this.mergeToConference(webphoneSessions);

              case 5:
                conferenceData = Object.values(this.conferences)[0];

                if (conferenceData) {
                  _context13.next = 10;
                  break;
                }

                _context13.next = 9;
                return this._webphone.resume(session.id);

              case 9:
                return _context13.abrupt("return", null);

              case 10:
                currentConferenceSession = (0, _ramda.find)(function (x) {
                  return x.id === conferenceData.sessionId;
                }, this._webphone.sessions);
                isCurrentConferenceOnhold = currentConferenceSession.isOnHold;

                if (isCurrentConferenceOnhold) {
                  this._webphone.resume(conferenceData.sessionId);
                }

                return _context13.abrupt("return", conferenceData);

              case 14:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function mergeSessions(_x9) {
        return _mergeSessions.apply(this, arguments);
      }

      return mergeSessions;
    }()
  }, {
    key: "validateCallRecording",
    value: function validateCallRecording(session) {
      if ((0, _webphoneHelper.isRecording)(session)) {
        this._alert.warning({
          message: _conferenceCallErrors["default"].callIsRecording
        });

        return false;
      }

      return true;
    }
    /*
     * User action track dispatchs
     * */

  }, {
    key: "participantListClickHangupTrack",
    value: function participantListClickHangupTrack() {
      this.store.dispatch({
        type: this.actionTypes.participantListClickHangupTrack
      });
    }
  }, {
    key: "removeParticipantClickCancelTrack",
    value: function removeParticipantClickCancelTrack() {
      this.store.dispatch({
        type: this.actionTypes.removeParticipantClickCancelTrack
      });
    }
  }, {
    key: "removeParticipantClickRemoveTrack",
    value: function removeParticipantClickRemoveTrack() {
      this.store.dispatch({
        type: this.actionTypes.removeParticipantClickRemoveTrack
      });
    }
  }, {
    key: "hasPermission",
    get: function get() {
      return this._appFeatures.hasConferenceCall;
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "conferences",
    get: function get() {
      return this.state.conferences;
    }
  }, {
    key: "conferenceCallStatus",
    get: function get() {
      return this.state.conferenceCallStatus;
    }
  }, {
    key: "isMerging",
    get: function get() {
      return this.state.isMerging;
    }
  }, {
    key: "mergingPair",
    get: function get() {
      return this.state.mergingPair;
    }
  }, {
    key: "currentConferenceId",
    get: function get() {
      return this.state.currentConferenceId;
    }
  }]);

  return ConferenceCall;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "updateConferenceStatus", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateConferenceStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "terminateConference", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "terminateConference"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "bringInToConference", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "bringInToConference"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeFromConference", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "removeFromConference"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "makeConference", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "makeConference"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mergeToConference", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "mergeToConference"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setMergeParty", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setMergeParty"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "closeMergingPair", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "closeMergingPair"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startPollingConferenceStatus", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "startPollingConferenceStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadConference", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "loadConference"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_hookConference", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_hookConference"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_mergeToConference", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_mergeToConference"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_makeConference", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_makeConference"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "parseMergingSessions", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "parseMergingSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mergeSessions", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "mergeSessions"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "lastCallInfo", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this8 = this;

    return [function () {
      return _this8._webphone.sessions;
    }, function () {
      return _this8.mergingPair.fromSessionId;
    }, function () {
      return _this8.partyProfiles;
    }, function (sessions, fromSessionId, partyProfiles) {
      if (!fromSessionId) {
        _lastCallInfo = null;
        return _lastCallInfo;
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

        if (!matchedContact && _this8._contactMatcher) {
          var nameMatches = _this8._contactMatcher.dataMapping[sessionNumber];

          if (nameMatches && nameMatches.length) {
            matchedContact = nameMatches[0];
          }
        }
      }

      var lastCalleeType;

      if (fromSession) {
        if (matchedContact) {
          lastCalleeType = _calleeTypes["default"].contacts;
        } else if (_this8.isConferenceSession(fromSession.id)) {
          lastCalleeType = _calleeTypes["default"].conference;
        } else {
          lastCalleeType = _calleeTypes["default"].unknown;
        }
      } else if (_fromSessionId === fromSessionId && _lastCallInfo && _lastCallInfo.calleeType) {
        _lastCallInfo = _objectSpread(_objectSpread({}, _lastCallInfo), {}, {
          status: _sessionStatus["default"].finished
        });
        return _lastCallInfo;
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
          _lastCallInfo = {
            calleeType: _calleeTypes["default"].conference,
            avatarUrl: partiesAvatarUrls[0],
            extraNum: partiesAvatarUrls.length - 1,
            name: null,
            phoneNumber: null,
            status: sessionStatus,
            lastCallContact: null
          };
          break;

        case _calleeTypes["default"].contacts:
          _lastCallInfo = {
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
          _lastCallInfo = {
            calleeType: _calleeTypes["default"].unknown,
            avatarUrl: null,
            name: sessionName,
            status: sessionStatus,
            phoneNumber: sessionNumber,
            extraNum: 0,
            lastCallContact: null
          };
      }

      _fromSessionId = fromSessionId;
      return _lastCallInfo;
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "partyProfiles", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this9 = this;

    return [function () {
      return _this9.currentConferenceId;
    }, function () {
      return _this9.conferences;
    }, function (currentConferenceId, conferences) {
      var conferenceData = conferences && conferences[currentConferenceId];

      if (!conferenceData) {
        return [];
      }

      return _this9.getOnlinePartyProfiles(currentConferenceId);
    }];
  }
})), _class2)) || _class);
exports["default"] = ConferenceCall;
//# sourceMappingURL=index.js.map
