'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var initPhoneInstance = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var info;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return this[symbols.platform].post('/client-info/sip-provision', {
              sipInfo: [{ transport: 'WSS' }]
            }).then(function (res) {
              return res.json();
            });

          case 2:
            info = _context.sent;
            return _context.abrupt('return', new _ringcentralWebPhone2.default(info, {
              logLevel: 0,
              audioHelper: {
                enabled: true
              }
            }));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function initPhoneInstance() {
    return _ref.apply(this, arguments);
  };
}();

var record = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
    var flag = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (flag) {
              _context2.next = 6;
              break;
            }

            _context2.next = 3;
            return this.currentSession.stopRecord();

          case 3:
            this.store.dispatch({
              type: this.actions.callOperation,
              operation: {
                type: _callActions2.default.stopRecord
              }
            });
            _context2.next = 9;
            break;

          case 6:
            _context2.next = 8;
            return this.currentSession.startRecord();

          case 8:
            this.store.dispatch({
              type: this.actions.callOperation,
              operation: {
                type: _callActions2.default.record
              }
            });

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function record(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var mute = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
    var flag = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (flag) {
              _context3.next = 6;
              break;
            }

            _context3.next = 3;
            return this.currentSession.unmute();

          case 3:
            this.store.dispatch({
              type: this.actions.callOperation,
              operation: {
                type: _callActions2.default.unmute
              }
            });
            _context3.next = 9;
            break;

          case 6:
            _context3.next = 8;
            return this.currentSession.mute();

          case 8:
            this.store.dispatch({
              type: this.actions.callOperation,
              operation: {
                type: _callActions2.default.mute
              }
            });

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function mute(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var hold = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
    var flag = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (flag) {
              _context4.next = 6;
              break;
            }

            _context4.next = 3;
            return this.currentSession.unhold();

          case 3:
            this.store.dispatch({
              type: this.actions.callOperation,
              operation: {
                type: _callActions2.default.unhold
              }
            });
            _context4.next = 9;
            break;

          case 6:
            _context4.next = 8;
            return this.currentSession.hold();

          case 8:
            this.store.dispatch({
              type: this.actions.callOperation,
              operation: {
                type: _callActions2.default.hold
              }
            });

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function hold(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

var park = function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return this.currentSession.park();

          case 2:
            this.store.dispatch({
              type: this.actions.callOperation,
              operation: {
                type: _callActions2.default.park
              }
            });

          case 3:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function park() {
    return _ref5.apply(this, arguments);
  };
}();

var transfer = function () {
  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(number) {
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            this.checkSession();
            _context6.next = 3;
            return this.currentSession.transfer(number);

          case 3:
            this.store.dispatch({
              type: this.actions.callOperation,
              operation: {
                type: _callActions2.default.transfer,
                payload: {
                  number: number
                }
              }
            });

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function transfer(_x7) {
    return _ref6.apply(this, arguments);
  };
}();

var flip = function () {
  var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(number) {
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            this.checkSession();
            _context7.next = 3;
            return this.currentSession.flip(number);

          case 3:
            this.store.dispatch({
              type: this.actions.callOperation,
              operation: {
                type: _callActions2.default.flip,
                payload: {
                  number: number
                }
              }
            });

          case 4:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function flip(_x8) {
    return _ref7.apply(this, arguments);
  };
}();

var dtmf = function () {
  var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(number) {
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            this.checkSession();
            _context8.next = 3;
            return this.currentSession.dtmf(number);

          case 3:
            this.store.dispatch({
              type: this.actions.callOperation,
              operation: {
                type: _callActions2.default.dtmf,
                payload: {
                  number: number
                }
              }
            });

          case 4:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function dtmf(_x9) {
    return _ref8.apply(this, arguments);
  };
}();

var operations = function () {
  var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(name) {
    var actions,
        _actions$name,
        _len,
        args,
        _key,
        _args9 = arguments;

    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            actions = { record: record, mute: mute, hold: hold, park: park, transfer: transfer, flip: flip, dtmf: dtmf };

            this.checkSession();
            _context9.prev = 2;

            for (_len = _args9.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = _args9[_key];
            }

            _context9.next = 6;
            return (_actions$name = actions[name]).call.apply(_actions$name, [this].concat(args));

          case 6:
            _context9.next = 13;
            break;

          case 8:
            _context9.prev = 8;
            _context9.t0 = _context9['catch'](2);

            this.store.dispatch({
              type: this.actions.callOperation,
              operation: {
                type: _callActions2.default.error,
                error: _context9.t0
              }
            });
            this.emit(_webphoneEvents.webphoneEvents[name]);
            // TODO: needed?
            throw _context9.t0;

          case 13:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this, [[2, 8]]);
  }));

  return function operations(_x10, _x11) {
    return _ref9.apply(this, arguments);
  };
}();

var _rcModule = require('../../lib/rc-module');

var _rcModule2 = _interopRequireDefault(_rcModule);

var _symbolMap = require('data-types/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

var _webphoneActions = require('./webphone-actions');

var _webphoneActions2 = _interopRequireDefault(_webphoneActions);

var _callActions = require('./call-actions');

var _callActions2 = _interopRequireDefault(_callActions);

var _webphoneReducer = require('./webphone-reducer');

var _webphoneReducer2 = _interopRequireDefault(_webphoneReducer);

var _ringcentralWebPhone = require('ringcentral-web-phone');

var _ringcentralWebPhone2 = _interopRequireDefault(_ringcentralWebPhone);

var _webphoneStatus = require('./webphone-status');

var _webphoneStatus2 = _interopRequireDefault(_webphoneStatus);

var _callStatus = require('./call-status');

var _callStatus2 = _interopRequireDefault(_callStatus);

var _authEvents = require('../auth/auth-events');

var _webphoneEvents = require('./webphone-events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbols = new _symbolMap2.default(['api', 'auth', 'platform', 'emitter', 'settings', 'phoneInstance']);

var CONSTANTS = new _keyValueMap2.default({
  webphoneStatus: _webphoneStatus2.default,
  callStatus: _callStatus2.default
});

var Webphone = function (_RcModule) {
  (0, _inherits3.default)(Webphone, _RcModule);

  function Webphone(options) {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, Webphone);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Webphone.__proto__ || (0, _getPrototypeOf2.default)(Webphone)).call(this, (0, _extends3.default)({}, options, {
      actions: _webphoneActions2.default
    })));

    var api = options.api;
    var platform = options.platform;
    var settings = options.settings;
    var auth = options.auth;

    _this[symbols.api] = api;
    _this[symbols.platform] = platform;
    _this[symbols.settings] = settings;
    _this[symbols.auth] = auth;

    _this.currentSession = null;
    _this.isRegistered = false;

    // TODO: commented out until setting module completed
    // settings.registerReducer('webphone', getWebphoneReducer())
    _this[symbols.auth].on(_authEvents.authEventTypes.loginStatusChanged, (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10() {
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return initPhoneInstance.call(_this);

            case 2:
              _this[symbols.phoneInstance] = _context10.sent;

              _this[symbols.phoneInstance].userAgent.on('registered', function () {
                // sip will fire multiple registered events, only dispatch one register action to state.
                // TODO: is this isRegistered state needed to be store as instance variable
                //       or just check store state
                if (!_this.isRegistered) {
                  _this.store.dispatch({
                    type: _this.actions.registerSuccess
                  });
                  _this.emit(_webphoneEvents.webphoneEvents.registerSuccessed);
                }
                _this.isRegistered = _this[symbols.phoneInstance].userAgent.isRegistered();
              });
              _this[symbols.phoneInstance].userAgent.on('unregistered', function () {
                _this.isRegistered = _this[symbols.phoneInstance].userAgent.isRegistered();
                _this.store.dispatch({
                  type: _this.actions.unregister,
                  operation: {
                    type: _callActions2.default.clear
                  }
                });
              });
              _this[symbols.phoneInstance].userAgent.on('registrationFailed', function (error) {
                _this.store.dispatch({
                  type: _this.actions.registerError,
                  error: error
                });
                _this.emit(_webphoneEvents.webphoneEvents.registerFailed);
              });
              _this[symbols.phoneInstance].userAgent.on('invite', function (session) {
                _this.currentSession = session;
                _this.listenSessionEvents();
                _this.store.dispatch({
                  type: _this.actions.callIncoming,
                  payload: {
                    remoteIdentity: session.remoteIdentity,
                    localIdentity: session.localIdentity
                  }
                });
                _this.emit(_webphoneEvents.webphoneEvents.callIncoming);
              });

            case 7:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, _this2);
    })));
    return _this;
  }

  (0, _createClass3.default)(Webphone, [{
    key: 'call',


    /**
     * Make a phone call, this method should be called in registerSuccess state
     * @param {string} toNumber
     * @param {string} [fromNumber]
     * @return {Session}
     */
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(_ref12) {
        var toNumber = _ref12.toNumber;
        var fromNumber = _ref12.fromNumber;
        var media = _ref12.media;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (this[symbols.phoneInstance]) {
                  _context11.next = 2;
                  break;
                }

                throw Error('not registered');

              case 2:
                this.store.dispatch({
                  type: this.actions.call,
                  payload: {
                    toNumber: toNumber,
                    fromNumber: fromNumber
                  }
                });
                this.emit(_webphoneEvents.webphoneEvents.callConnecting);
                this.currentSession = this[symbols.phoneInstance].userAgent.invite(toNumber, {
                  fromNumber: fromNumber,
                  media: {
                    render: media
                  }
                });
                this.listenSessionEvents();
                _context11.prev = 6;
                _context11.next = 9;
                return this.currentSession;

              case 9:
                _context11.next = 16;
                break;

              case 11:
                _context11.prev = 11;
                _context11.t0 = _context11['catch'](6);

                console.error(_context11.t0);
                this.store.dispatch({
                  type: this.actions.callError,
                  error: _context11.t0
                });
                this.emit(_webphoneEvents.webphoneEvents.callFailed);

              case 16:
                return _context11.abrupt('return', this.currentSession);

              case 17:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this, [[6, 11]]);
      }));

      function call(_x12) {
        return _ref11.apply(this, arguments);
      }

      return call;
    }()

    /**
     * Accept a phone call, this method should be called when call is incoming
     * @param {Object} media, see https://github.com/ringcentral/ringcentral-web-phone#accepting-incoming-call
     * @return {Promise}
     */

  }, {
    key: 'accept',
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(media) {
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                this.checkSession();
                _context12.prev = 1;
                _context12.next = 4;
                return this.currentSession.accept(media);

              case 4:
                _context12.next = 9;
                break;

              case 6:
                _context12.prev = 6;
                _context12.t0 = _context12['catch'](1);

                // TODO
                console.error(_context12.t0);

              case 9:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this, [[1, 6]]);
      }));

      function accept(_x13) {
        return _ref13.apply(this, arguments);
      }

      return accept;
    }()
  }, {
    key: 'bye',
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13() {
        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                this.checkSession();
                _context13.prev = 1;
                _context13.next = 4;
                return this.currentSession.terminate();

              case 4:
                _context13.next = 9;
                break;

              case 6:
                _context13.prev = 6;
                _context13.t0 = _context13['catch'](1);

                // TODO
                console.error(_context13.t0);

              case 9:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this, [[1, 6]]);
      }));

      function bye() {
        return _ref14.apply(this, arguments);
      }

      return bye;
    }()
  }, {
    key: 'record',
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14(flag) {
        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                operations.call(this, 'record', flag);

              case 1:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function record(_x14) {
        return _ref15.apply(this, arguments);
      }

      return record;
    }()
  }, {
    key: 'mute',
    value: function () {
      var _ref16 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee15(flag) {
        return _regenerator2.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                operations.call(this, 'mute', flag);

              case 1:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function mute(_x15) {
        return _ref16.apply(this, arguments);
      }

      return mute;
    }()
  }, {
    key: 'hold',
    value: function () {
      var _ref17 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee16(flag) {
        return _regenerator2.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                operations.call(this, 'hold', flag);

              case 1:
              case 'end':
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function hold(_x16) {
        return _ref17.apply(this, arguments);
      }

      return hold;
    }()
  }, {
    key: 'park',
    value: function () {
      var _ref18 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee17(flag) {
        return _regenerator2.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                operations.call(this, 'park', flag);

              case 1:
              case 'end':
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function park(_x17) {
        return _ref18.apply(this, arguments);
      }

      return park;
    }()
  }, {
    key: 'transfer',
    value: function () {
      var _ref19 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee18(number) {
        return _regenerator2.default.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                operations.call(this, 'transfer', number);

              case 1:
              case 'end':
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function transfer(_x18) {
        return _ref19.apply(this, arguments);
      }

      return transfer;
    }()
  }, {
    key: 'flip',
    value: function () {
      var _ref20 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee19(number) {
        return _regenerator2.default.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                operations.call(this, 'flip', number);

              case 1:
              case 'end':
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function flip(_x19) {
        return _ref20.apply(this, arguments);
      }

      return flip;
    }()
  }, {
    key: 'dtmf',
    value: function () {
      var _ref21 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee20(number) {
        return _regenerator2.default.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                operations.call(this, 'dtmf', number);

              case 1:
              case 'end':
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      function dtmf(_x20) {
        return _ref21.apply(this, arguments);
      }

      return dtmf;
    }()
  }, {
    key: 'loadRingAudio',
    value: function loadRingAudio(_ref22) {
      var incoming = _ref22.incoming;
      var outgoing = _ref22.outgoing;

      this[symbols.phoneInstance].userAgent.audioHelper.loadAudio({
        incoming: incoming,
        outgoing: outgoing
      });
    }
  }, {
    key: 'checkSession',
    value: function checkSession() {
      if (!this.currentSession) {
        this.store.dispatch({
          type: this.actions.sessionError
        });
        throw Error('No active session');
      }
    }

    /**
     * Internal method for listen session events
     */

  }, {
    key: 'listenSessionEvents',
    value: function listenSessionEvents() {
      var _this3 = this;

      this.currentSession.on('accepted', function (response) {
        // accepted event for outbound call will returne a incomingResponse
        if (response.data) {
          _this3.store.dispatch({
            type: _this3.actions.callConnect,
            payload: {
              remoteIdentity: response.to,
              localIdentity: response.from
            }
          });
          // accepted event for inbound call will only contain a raw sip data
        } else {
          _this3.store.dispatch({
            type: _this3.actions.callAccept
          });
        }
        _this3.emit(_webphoneEvents.webphoneEvents.callConnected);
      });
      // all situation about call terminated except 'call cancel'
      this.currentSession.on('terminated', function (response, cause) {
        _this3.store.dispatch({
          type: _this3.actions.callEnd,
          error: cause
        });
        _this3.currentSession = null;
      });
      // when we call out and cancel the phone call
      this.currentSession.on('cancel', function (response, cause) {
        _this3.store.dispatch({
          type: _this3.actions.callEnd,
          error: cause
        });
        _this3.currentSession = null;
      });
      // should not need
      this.currentSession.on('bye', function (response) {
        _this3.store.dispatch({
          type: _this3.actions.callEnd
        });
        _this3.currentSession = null;
      });
    }
  }, {
    key: 'reducer',
    get: function get() {
      return (0, _webphoneReducer2.default)(this.prefix);
    }
  }, {
    key: 'constants',
    get: function get() {
      return CONSTANTS;
    }
  }]);
  return Webphone;
}(_rcModule2.default);

exports.default = Webphone;
//# sourceMappingURL=index.js.map
