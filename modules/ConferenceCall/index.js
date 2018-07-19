'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class, _desc, _value, _class2;
// import webphoneErrors from '../Webphone/webphoneErrors';

// import sleep from '../../lib/sleep';


var _di = require('../../lib/di');

var _callDirections = require('../../enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _partyStatusCode = require('./partyStatusCode');

var _partyStatusCode2 = _interopRequireDefault(_partyStatusCode);

var _conferenceRole = require('./conferenceRole');

var _conferenceRole2 = _interopRequireDefault(_conferenceRole);

var _getConferenceCallReducer = require('./getConferenceCallReducer');

var _getConferenceCallReducer2 = _interopRequireDefault(_getConferenceCallReducer);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _permissionsMessages = require('../RolesAndPermissions/permissionsMessages');

var _permissionsMessages2 = _interopRequireDefault(_permissionsMessages);

var _conferenceCallErrors = require('./conferenceCallErrors');

var _conferenceCallErrors2 = _interopRequireDefault(_conferenceCallErrors);

var _webphoneHelper = require('../Webphone/webphoneHelper');

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _callingModes = require('../CallingSettings/callingModes');

var _callingModes2 = _interopRequireDefault(_callingModes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var DEFAULT_TIMEOUT = 30000; // time out for conferencing session being accepted.
var DEFAULT_TTL = 5000; // timer to update the conference information
var MAXIMUM_CAPACITY = 10;

function ascendSortParties(parties) {
  return parties.filter(function (party) {
    return party.conferenceRole.toLowerCase() !== _conferenceRole2.default.host;
  }).sort(function (last, next) {
    return +last.id.split('-')[1] - +next.id.split('-')[1];
  });
}

/**
 * @class
 * @description ConferenceCall managing module
 */
var ConferenceCall = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Alert', {
    dep: 'Call',
    optional: true
  }, 'CallingSettings', 'Client', 'RolesAndPermissions', {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }, { dep: 'ConnectivityMonitor', optional: true }, {
    dep: 'ConferenceCallOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(ConferenceCall, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {RegionSettings} params.regionSettings - regionSettings module instance
   * @param {Client} params.client - client module instance
   */
  function ConferenceCall(_ref) {
    var auth = _ref.auth,
        alert = _ref.alert,
        call = _ref.call,
        callingSettings = _ref.callingSettings,
        client = _ref.client,
        rolesAndPermissions = _ref.rolesAndPermissions,
        contactMatcher = _ref.contactMatcher,
        webphone = _ref.webphone,
        connectivityMonitor = _ref.connectivityMonitor,
        _ref$pulling = _ref.pulling,
        pulling = _ref$pulling === undefined ? true : _ref$pulling,
        _ref$capacity = _ref.capacity,
        capacity = _ref$capacity === undefined ? MAXIMUM_CAPACITY : _ref$capacity,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === undefined ? DEFAULT_TIMEOUT : _ref$timeout,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'alert', 'call', 'callingSettings', 'client', 'rolesAndPermissions', 'contactMatcher', 'webphone', 'connectivityMonitor', 'pulling', 'capacity', 'timeout']);
    (0, _classCallCheck3.default)(this, ConferenceCall);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ConferenceCall.__proto__ || (0, _getPrototypeOf2.default)(ConferenceCall)).call(this, (0, _extends3.default)({
      auth: auth,
      alert: alert,
      call: call,
      callingSettings: callingSettings,
      client: client,
      rolesAndPermissions: rolesAndPermissions,
      pulling: pulling,
      contactMatcher: contactMatcher,
      webphone: webphone,
      connectivityMonitor: connectivityMonitor
    }, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._auth = _ensureExist2.default.call(_this, auth, 'auth');
    _this._alert = _ensureExist2.default.call(_this, alert, 'alert');
    _this._call = _ensureExist2.default.call(_this, call, 'call');
    _this._callingSettings = _ensureExist2.default.call(_this, callingSettings, 'callingSettings');
    _this._client = _ensureExist2.default.call(_this, client, 'client');
    // in order to run the integeration test, we need it to be optional
    _this._webphone = webphone;
    _this._connectivityMonitor = connectivityMonitor;
    _this._contactMatcher = contactMatcher;
    _this._rolesAndPermissions = _ensureExist2.default.call(_this, rolesAndPermissions, 'rolesAndPermissions');
    // we need the constructed actions
    _this._reducer = (0, _getConferenceCallReducer2.default)(_this.actionTypes);
    _this._ttl = DEFAULT_TTL;
    _this._timout = timeout;
    _this._timers = {};
    _this._pulling = pulling;
    _this.capacity = capacity;
    return _this;
  }

  (0, _createClass3.default)(ConferenceCall, [{
    key: 'isConferenceSession',
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
    key: 'findConferenceWithSession',
    value: function findConferenceWithSession(sessionId) {
      return (0, _values2.default)(this.conferences).find(function (c) {
        return c.session.id === sessionId;
      });
    }

    /**
     *
     * @param {string} id: conference id
     */

  }, {
    key: 'updateConferenceStatus',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(id) {
        var rawResponse, response, storedconference, conference, session;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.updateConference,
                  conference: this.state.conferences[id]
                });
                _context.prev = 1;
                _context.next = 4;
                return this._client.service.platform().get('/account/~/telephony/sessions/' + id);

              case 4:
                rawResponse = _context.sent;
                response = rawResponse.json();
                storedconference = this.state.conferences[response.id];
                conference = (0, _assign2.default)({}, storedconference.conference);

                conference.parties = response.parties;
                session = storedconference.session;

                this.store.dispatch({
                  type: this.actionTypes.updateConferenceSucceeded,
                  conference: conference,
                  session: session
                });
                _context.next = 17;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context['catch'](1);

                // TODO: alert
                this.store.dispatch({
                  type: this.actionTypes.updateConferenceFailed,
                  conference: this.state.conferences[id],
                  message: _context.t0.toString()
                });
                // need to propagate to out side try...catch block
                throw _context.t0;

              case 17:
                _context.prev = 17;
                return _context.abrupt('return', this.state.conferences[id]);

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 13, 17, 20]]);
      }));

      function updateConferenceStatus(_x) {
        return _ref2.apply(this, arguments);
      }

      return updateConferenceStatus;
    }()

    /**
     * terminate a conference.
     * @param {string} id: conference id
     */

  }, {
    key: 'terminateConference',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(id) {
        var conferenceData;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
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
                  this._webphone.hangup(conferenceData.session.id);
                  // Help server to do the GC, and we don't care the whether it's successful or not
                  this._client.service.platform().delete('/account/~/telephony/sessions/' + id);
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
                return this._client.service.platform().delete('/account/~/telephony/sessions/' + id);

              case 9:
                this.store.dispatch({
                  type: this.actionTypes.terminateConferenceSucceeded,
                  conference: conferenceData.conference
                });

              case 10:
                _context2.next = 15;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2['catch'](2);

                // TODO:this._alert.warning
                this.store.dispatch({
                  type: this.actionTypes.terminateConferenceFailed,
                  message: _context2.t0.toString()
                });

              case 15:
                _context2.prev = 15;
                return _context2.abrupt('return', conferenceData);

              case 18:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 12, 15, 18]]);
      }));

      function terminateConference(_x2) {
        return _ref3.apply(this, arguments);
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
    key: 'bringInToConference',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(id, webphoneSession) {
        var propagete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var conferenceState, conference, session, sessionData, partyProfile, _conferenceState, newParties;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                conferenceState = this.state.conferences[id];

                if (!(!conferenceState || !this.ready || !webphoneSession || webphoneSession.direction !== _callDirections2.default.outbound || this.isOverload(id) || !this._connectivityMonitor.connectivity)) {
                  _context3.next = 4;
                  break;
                }

                this._alert.danger({
                  message: _conferenceCallErrors2.default.modeError,
                  ttl: 0
                });
                return _context3.abrupt('return', null);

              case 4:
                conference = conferenceState.conference, session = conferenceState.session;

                this.store.dispatch({
                  type: this.actionTypes.bringInConference,
                  conference: conference,
                  session: session
                });
                sessionData = webphoneSession.data;
                _context3.prev = 7;
                _context3.next = 10;
                return this._getProfile(webphoneSession);

              case 10:
                partyProfile = _context3.sent;
                _context3.next = 13;
                return this._client.service.platform().post('/account/~/telephony/sessions/' + id + '/parties/bring-in', sessionData);

              case 13:
                _context3.next = 15;
                return this.updateConferenceStatus(id);

              case 15:
                _conferenceState = this.state.conferences[id];
                newParties = ascendSortParties(_conferenceState.conference.parties);

                partyProfile.id = newParties[newParties.length - 1].id;
                // let the contact match to do the matching of the parties.
                this.store.dispatch({
                  type: this.actionTypes.bringInConferenceSucceeded,
                  conference: conference,
                  session: session,
                  partyProfile: partyProfile
                });
                return _context3.abrupt('return', id);

              case 22:
                _context3.prev = 22;
                _context3.t0 = _context3['catch'](7);

                this.store.dispatch({
                  type: this.actionTypes.bringInConferenceFailed,
                  message: _context3.t0.toString()
                });

                if (propagete) {
                  _context3.next = 27;
                  break;
                }

                return _context3.abrupt('return', null);

              case 27:
                throw _context3.t0;

              case 28:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[7, 22]]);
      }));

      function bringInToConference(_x4, _x5) {
        return _ref4.apply(this, arguments);
      }

      return bringInToConference;
    }()

    /**
     * remove a participant from conference.
     * @param {string} id: conference id
     * @param {SessionData} partyId: one participant's id of an conference's `parties` list
     */

  }, {
    key: 'removeFromConference',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(id, partyId) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.removeFromConference,
                  conference: this.state.conferences[id]
                });

                _context4.prev = 1;
                _context4.next = 4;
                return this._client.service.platform().delete('/account/~/telephony/sessions/' + id + '/parties/' + partyId);

              case 4:
                _context4.next = 6;
                return this.updateConferenceStatus(id);

              case 6:
                this.store.dispatch({
                  type: this.actionTypes.removeFromConferenceSucceeded,
                  conference: this.state.conferences[id]
                });
                _context4.next = 12;
                break;

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4['catch'](1);

                // TODO:this._alert.warning
                this.store.dispatch({
                  type: this.actionTypes.removeFromConferenceFailed,
                  message: _context4.t0.toString()
                });

              case 12:
                _context4.prev = 12;
                return _context4.abrupt('return', this.state.conferences[id]);

              case 15:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 9, 12, 15]]);
      }));

      function removeFromConference(_x6, _x7) {
        return _ref5.apply(this, arguments);
      }

      return removeFromConference;
    }()

    /**
     * start a conference call, return the session
     */

  }, {
    key: 'makeConference',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        var propagate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var session;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(!this.ready || !this._connectivityMonitor.connectivity)) {
                  _context5.next = 3;
                  break;
                }

                this._alert.danger({
                  message: _conferenceCallErrors2.default.modeError,
                  ttl: 0
                });
                return _context5.abrupt('return', null);

              case 3:
                if (this._checkPermission()) {
                  _context5.next = 6;
                  break;
                }

                if (!propagate) {
                  this._alert.danger({
                    message: _permissionsMessages2.default.insufficientPrivilege,
                    ttl: 0
                  });
                }

                return _context5.abrupt('return', null);

              case 6:
                if (!(!this._callingSettings.callingMode === _callingModes2.default.webphone)) {
                  _context5.next = 9;
                  break;
                }

                if (!propagate) {
                  this._alert.danger({
                    message: _conferenceCallErrors2.default.modeError,
                    ttl: 0
                  });
                }

                return _context5.abrupt('return', null);

              case 9:
                _context5.next = 11;
                return this._makeConference(propagate);

              case 11:
                session = _context5.sent;
                return _context5.abrupt('return', session);

              case 13:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function makeConference() {
        return _ref6.apply(this, arguments);
      }

      return makeConference;
    }()
  }, {
    key: 'initialize',
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
    key: 'mergeToConference',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        var _this3 = this;

        var webphoneSessions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var sipInstances, conferenceId, sessionIds, pSips, conferenceState;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                webphoneSessions = webphoneSessions.filter(function (session) {
                  return Object.prototype.toString.call(session).toLowerCase() === '[object object]';
                });

                if (webphoneSessions.length) {
                  _context6.next = 4;
                  break;
                }

                this._alert.warning({
                  message: _conferenceCallErrors2.default.bringInFailed
                });
                return _context6.abrupt('return');

              case 4:

                this.store.dispatch({
                  type: this.actionTypes.mergeStart
                });

                sipInstances = void 0;
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
                  var p = new _promise2.default(function (resolve) {
                    instance.on('terminated', function () {
                      resolve();
                    });
                  });
                  return p;
                });
                _context6.next = 14;
                return _promise2.default.all([this._mergeToConference(webphoneSessions)].concat((0, _toConsumableArray3.default)(pSips))).then(function () {
                  _this3.store.dispatch({
                    type: _this3.actionTypes.mergeSucceeded
                  });
                }, function () {
                  var conferenceState = (0, _values2.default)(_this3.conferences)[0];
                  /**
                   * if create conference successfully but failed to bring-in,
                   *  then terminate the conference.
                   */
                  if (conferenceState && conferenceState.profiles.length < 1) {
                    _this3.terminateConference(conferenceState.conference.id);
                  }
                  _this3._alert.warning({
                    message: _conferenceCallErrors2.default.bringInFailed
                  });
                  _this3.store.dispatch({
                    type: _this3.actionTypes.mergeFailed
                  });
                });

              case 14:
                this._webphone.clearSessionCaching();
                _context6.next = 30;
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
                _context6.next = 29;
                break;

              case 24:
                _context6.prev = 24;
                _context6.t0 = _context6['catch'](17);
                conferenceState = (0, _values2.default)(this.conferences)[0];
                /**
                 * if create conference successfully but failed to bring-in,
                 *  then terminate the conference.
                 */

                if (conferenceState && conferenceState.conference.parties.length < 1) {
                  this.terminateConference(conferenceState.conference.id);
                }
                this._alert.warning({
                  message: _conferenceCallErrors2.default.bringInFailed
                });

              case 29:
                if (!sipInstances || conferenceId === null) {
                  this.store.dispatch({
                    type: this.actionTypes.mergeFailed
                  });
                }

              case 30:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[17, 24]]);
      }));

      function mergeToConference() {
        return _ref7.apply(this, arguments);
      }

      return mergeToConference;
    }()

    /**
     * we need to record the merge destination when merge from the call control pages
     * @param {webphone.session} from
     */

  }, {
    key: 'setMergeParty',
    value: function setMergeParty(_ref8) {
      var from = _ref8.from,
          to = _ref8.to;

      if (from) {
        return this.store.dispatch({
          type: this.actionTypes.updateFromSession,
          from: from
        });
      }
      return this.store.dispatch({
        type: this.actionTypes.updateToSession,
        to: to
      });
    }
  }, {
    key: 'getOnlinePartyProfiles',
    value: function getOnlinePartyProfiles(id) {
      var conferenceData = this.conferences[id];

      if (conferenceData) {
        return ascendSortParties(conferenceData.conference.parties).reduce(function (accum, party, idx) {
          if (party.status.code.toLowerCase() !== _partyStatusCode2.default.disconnected) {
            // 0 position is the host
            accum.push({ idx: idx, party: party });
          }
          return accum;
        }, []).map(function (_ref9) {
          var idx = _ref9.idx,
              party = _ref9.party;
          return (0, _extends3.default)({}, party, conferenceData.profiles[idx]);
        }).filter(function (i) {
          return !!i;
        });
      }
      return null;
    }
  }, {
    key: 'getOnlineParties',
    value: function getOnlineParties(id) {
      var conferenceData = this.conferences[id];
      if (conferenceData) {
        return conferenceData.conference.parties.filter(function (p) {
          return p.status.code.toLowerCase() !== _partyStatusCode2.default.disconnected;
        });
      }
      return null;
    }
  }, {
    key: 'countOnlineParties',
    value: function countOnlineParties(id) {
      var res = this.getOnlineParties(id);
      return Array.isArray(res) ? res.length : null;
    }
  }, {
    key: 'isOverload',
    value: function isOverload(id) {
      return this.countOnlineParties(id) >= this.capacity;
    }
  }, {
    key: 'startPollingConferenceStatus',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(id) {
        var _this4 = this;

        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(this._timers[id] || !this._pulling)) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt('return');

              case 2:
                _context8.next = 4;
                return this.updateConferenceStatus(id);

              case 4:
                this._timers[id] = setTimeout((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
                  return _regenerator2.default.wrap(function _callee7$(_context7) {
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
                        case 'end':
                          return _context7.stop();
                      }
                    }
                  }, _callee7, _this4);
                })), this._ttl);

              case 5:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function startPollingConferenceStatus(_x10) {
        return _ref10.apply(this, arguments);
      }

      return startPollingConferenceStatus;
    }()
  }, {
    key: 'stopPollingConferenceStatus',
    value: function stopPollingConferenceStatus(id) {
      clearTimeout(this._timers[id]);
      delete this._timers[id];
    }
  }, {
    key: 'openPulling',
    value: function openPulling() {
      this._pulling = true;
    }
  }, {
    key: 'closePulling',
    value: function closePulling() {
      this._pulling = false;
    }
  }, {
    key: 'togglePulling',
    value: function togglePulling() {
      this._pulling = !this.pulling;
    }
  }, {
    key: 'setCapatity',
    value: function setCapatity() {
      var capacity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : MAXIMUM_CAPACITY;

      if (typeof capacity !== 'number') {
        throw new Error('The capcity must be a number');
      }
      this.capacity = capacity;
      return capacity;
    }
  }, {
    key: 'setTimeout',
    value: function setTimeout() {
      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_TIMEOUT;

      if (typeof timeout !== 'number') {
        throw new Error('The timeout must be a number');
      }
      this._timout = timeout;
      return timeout;
    }
  }, {
    key: '_init',
    value: function _init() {
      this.store.dispatch({
        type: this.actionTypes.initSuccess
      });
    }
  }, {
    key: '_onStateChange',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (this._shouldInit()) {
                  this._init();
                } else if (this._shouldReset()) {
                  this._reset();
                }

              case 1:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function _onStateChange() {
        return _ref12.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: '_reset',
    value: function _reset() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this._auth.loggedIn && this._auth.ready && this._alert.ready && this._callingSettings.ready && this._call.ready && this._rolesAndPermissions.ready && this._connectivityMonitor.ready && this.pending;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return (!this._auth.loggedIn || !this._auth.ready || !this._alert.ready || !this._callingSettings.ready || !this._call.ready || !this._rolesAndPermissions.ready || !this._connectivityMonitor.ready) && this.ready;
    }
  }, {
    key: '_checkPermission',
    value: function _checkPermission() {
      if (!this._rolesAndPermissions.callingEnabled || !this._rolesAndPermissions.webphoneEnabled) {
        this._alert.danger({
          message: _permissionsMessages2.default.insufficientPrivilege,
          ttl: 0
        });
        return false;
      }
      return true;
    }
  }, {
    key: '_hookConference',
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
    key: '_mergeToConference',
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
        var _this6 = this;

        var webphoneSessions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        var conferenceState, conferenceId, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, webphoneSession, _ref14, id, confereceAccepted;

        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                conferenceState = (0, _values2.default)(this.conferences)[0];

                if (!conferenceState) {
                  _context10.next = 34;
                  break;
                }

                conferenceId = conferenceState.conference.id;

                this.stopPollingConferenceStatus(conferenceId);
                // for the sake of participants ordering, we can't concurrently bring in the participants
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context10.prev = 7;
                _iterator = (0, _getIterator3.default)(webphoneSessions);

              case 9:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context10.next = 16;
                  break;
                }

                webphoneSession = _step.value;
                _context10.next = 13;
                return this.bringInToConference(conferenceId, webphoneSession, true);

              case 13:
                _iteratorNormalCompletion = true;
                _context10.next = 9;
                break;

              case 16:
                _context10.next = 22;
                break;

              case 18:
                _context10.prev = 18;
                _context10.t0 = _context10['catch'](7);
                _didIteratorError = true;
                _iteratorError = _context10.t0;

              case 22:
                _context10.prev = 22;
                _context10.prev = 23;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 25:
                _context10.prev = 25;

                if (!_didIteratorError) {
                  _context10.next = 28;
                  break;
                }

                throw _iteratorError;

              case 28:
                return _context10.finish(25);

              case 29:
                return _context10.finish(22);

              case 30:
                if (this.conferences[conferenceId].profiles.length) {
                  _context10.next = 32;
                  break;
                }

                throw new Error('bring-in operations failed, not all intended parties were brought in');

              case 32:
                this.startPollingConferenceStatus(conferenceId);
                return _context10.abrupt('return', conferenceId);

              case 34:
                _context10.next = 36;
                return this.makeConference(true);

              case 36:
                _ref14 = _context10.sent;
                id = _ref14.id;
                confereceAccepted = false;
                _context10.next = 41;
                return _promise2.default.race([new _promise2.default(function (resolve, reject) {
                  var session = _this6.conferences[id].session;
                  session.on('accepted', function () {
                    confereceAccepted = true;
                    resolve();
                  });
                  session.on('cancel', function () {
                    return reject(new Error('conferecing cancel'));
                  });
                  session.on('failed', function () {
                    return reject(new Error('conferecing failed'));
                  });
                  session.on('rejected', function () {
                    return reject(new Error('conferecing rejected'));
                  });
                  session.on('terminated', function () {
                    return reject(new Error('conferecing terminated'));
                  });
                }), new _promise2.default(function (resolve, reject) {
                  setTimeout(function () {
                    return confereceAccepted ? resolve() : reject(new Error('conferecing timeout'));
                  }, _this6._timout);
                })]);

              case 41:
                _context10.next = 43;
                return this._mergeToConference(webphoneSessions);

              case 43:
                return _context10.abrupt('return', id);

              case 44:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this, [[7, 18, 22, 30], [23,, 25, 29]]);
      }));

      function _mergeToConference() {
        return _ref13.apply(this, arguments);
      }

      return _mergeToConference;
    }()
  }, {
    key: '_makeConference',
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
        var propagate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var rawResponse, response, conference, phoneNumber, session;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;

                this.store.dispatch({
                  type: this.actionTypes.makeConference
                });

                // TODO: replace with SDK function chaining calls
                _context11.next = 4;
                return this._client.service.platform().post('/account/~/telephony/conference', {});

              case 4:
                rawResponse = _context11.sent;
                response = rawResponse.json();
                conference = response.session;
                phoneNumber = conference.voiceCallToken;
                // whether to mutate the session to mark the conference?

                _context11.next = 10;
                return this._call.call({
                  phoneNumber: phoneNumber,
                  isConference: true
                });

              case 10:
                session = _context11.sent;


                if ((typeof session === 'undefined' ? 'undefined' : (0, _typeof3.default)(session)) === 'object' && Object.prototype.toString.call(session.on).toLowerCase() === '[object function]') {
                  this._hookConference(conference, session);

                  this.store.dispatch({
                    type: this.actionTypes.makeConferenceSucceeded,
                    conference: conference,
                    session: session,
                    parties: []
                  });
                } else {
                  this.store.dispatch({
                    type: this.actionTypes.makeConferenceFailed
                  });
                }

                return _context11.abrupt('return', conference);

              case 15:
                _context11.prev = 15;
                _context11.t0 = _context11['catch'](0);

                this.store.dispatch({
                  type: this.actionTypes.makeConferenceFailed,
                  message: _context11.t0.toString()
                });

                if (propagate) {
                  _context11.next = 21;
                  break;
                }

                this._alert.warning({
                  message: _conferenceCallErrors2.default.makeConferenceFailed
                });
                return _context11.abrupt('return', null);

              case 21:
                throw _context11.t0;

              case 22:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this, [[0, 15]]);
      }));

      function _makeConference() {
        return _ref15.apply(this, arguments);
      }

      return _makeConference;
    }()
  }, {
    key: '_getProfile',
    value: function () {
      var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(sessionInstance) {
        var session, to, contactMatch, toUserName, avatarUrl, rcId, contactMapping, contact, nameMatches;
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                session = this._webphone.sessions.find(function (session) {
                  return session.id === sessionInstance.id;
                });
                to = session.to, contactMatch = session.contactMatch;
                toUserName = session.toUserName;
                avatarUrl = void 0;
                rcId = void 0;


                if (this._contactMatcher && this._contactMatcher.dataMapping) {
                  contactMapping = this._contactMatcher.dataMapping;
                  contact = contactMatch;
                  nameMatches = contactMapping && contactMapping[to] || [];


                  if (!contact) {
                    contact = nameMatches && nameMatches[0];
                  }
                  if (contact) {
                    avatarUrl = contact.profileImageUrl;
                    toUserName = contact.name;
                    rcId = contact.id;
                  }
                }
                return _context12.abrupt('return', {
                  avatarUrl: avatarUrl,
                  toUserName: toUserName,
                  to: to,
                  rcId: rcId
                });

              case 7:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function _getProfile(_x15) {
        return _ref16.apply(this, arguments);
      }

      return _getProfile;
    }()
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'conferences',
    get: function get() {
      return this.state.conferences;
    }
  }, {
    key: 'conferenceCallStatus',
    get: function get() {
      return this.state.conferenceCallStatus;
    }
  }, {
    key: 'isMerging',
    get: function get() {
      return this.state.isMerging;
    }
  }]);
  return ConferenceCall;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'updateConferenceStatus', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'updateConferenceStatus'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'terminateConference', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'terminateConference'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'bringInToConference', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'bringInToConference'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'removeFromConference', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'removeFromConference'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'makeConference', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'makeConference'), _class2.prototype)), _class2)) || _class);
exports.default = ConferenceCall;
//# sourceMappingURL=index.js.map
