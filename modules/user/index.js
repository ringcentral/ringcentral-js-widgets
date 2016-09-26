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

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// const initialState = {
//   test: true,
// };

// function getUserSettingsReducer(prefix) {
//   return (state, action) => {
//     if (typeof state === 'undefined') return Object.assign({}, initialState);
//     if (!action) return state;
//     switch (action.type) {
//       default:
//         return state;
//     }
//   };
// }

/**
 * @function
 * @param {String} dataType
 * @param {function} loadFunction - async loader function returning a promise
 * @return {Promise}
 * @description Generic data loading logic with events
 */
var loadData = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(dataType, loadFunction) {
    var payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            this.store.dispatch({
              type: this.actions['load' + dataType]
            });
            this.emit(_userEvents.userEvents['load' + dataType]);
            _context.prev = 2;
            _context.next = 5;
            return loadFunction.call(this);

          case 5:
            payload = _context.sent;

            this.store.dispatch({
              type: this.actions['load' + dataType + 'Success'],
              payload: payload
            });
            _utils.emit.call(this, _userEvents.userEventTypes.userInfoChange, _userEvents.userEvents['load' + dataType + 'Success']);
            _context.next = 15;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](2);

            this.store.dispatch({
              type: this.actions['load' + dataType + 'Failed'],
              error: _context.t0
            });
            this.emit(_userEvents.userEvents['load' + dataType + 'Failed']);
            throw _context.t0;

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 10]]);
  }));

  return function loadData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * @function
 * @return {Promise<Object>}
 * @description Fetch account info and extract the data
 */


var extractAccountInfo = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return this[symbols.api].account().get();

          case 2:
            _context2.t0 = _context2.sent;
            return _context2.abrupt('return', (0, _utils.extractData)(_context2.t0));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function extractAccountInfo() {
    return _ref2.apply(this, arguments);
  };
}();

var loadAccountInfo = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return loadData.call(this, 'AccountInfo', extractAccountInfo);

          case 2:
            return _context3.abrupt('return', _context3.sent);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function loadAccountInfo() {
    return _ref3.apply(this, arguments);
  };
}();

var extractExtensionInfo = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return this[symbols.api].account().extension().get();

          case 2:
            _context4.t0 = _context4.sent;
            return _context4.abrupt('return', (0, _utils.extractData)(_context4.t0));

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function extractExtensionInfo() {
    return _ref4.apply(this, arguments);
  };
}();

var loadExtensionInfo = function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return loadData.call(this, 'ExtensionInfo', extractExtensionInfo);

          case 2:
            return _context5.abrupt('return', _context5.sent);

          case 3:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function loadExtensionInfo() {
    return _ref5.apply(this, arguments);
  };
}();

var extractDialingPlans = function () {
  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
    var _this = this;

    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _utils.fetchList.call(this, function (options) {
              return _this[symbols.api].account().listDialingPlans(options);
            });

          case 2:
            _context6.t0 = _context6.sent;
            return _context6.abrupt('return', (0, _utils.extractData)(_context6.t0));

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function extractDialingPlans() {
    return _ref6.apply(this, arguments);
  };
}();

var loadDialingPlans = function () {
  var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return loadData.call(this, 'DialingPlans', extractDialingPlans);

          case 2:
            return _context7.abrupt('return', _context7.sent);

          case 3:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function loadDialingPlans() {
    return _ref7.apply(this, arguments);
  };
}();

var extractPhoneNumbers = function () {
  var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
    var _this2 = this;

    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _utils.fetchList.call(this, function (options) {
              return _this2[symbols.api].account().extension().phoneNumber().list(options);
            });

          case 2:
            _context8.t0 = _context8.sent;
            return _context8.abrupt('return', (0, _utils.extractData)(_context8.t0));

          case 4:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function extractPhoneNumbers() {
    return _ref8.apply(this, arguments);
  };
}();

var loadPhoneNumbers = function () {
  var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return loadData.call(this, 'PhoneNumbers', extractPhoneNumbers);

          case 2:
            return _context9.abrupt('return', _context9.sent);

          case 3:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function loadPhoneNumbers() {
    return _ref9.apply(this, arguments);
  };
}();

var extractForwardingNumbers = function () {
  var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10() {
    var _this3 = this;

    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _utils.fetchList.call(this, function (options) {
              return _this3[symbols.api].account().extension().forwardingNumber().list();
            });

          case 2:
            _context10.t0 = _context10.sent;
            return _context10.abrupt('return', (0, _utils.extractData)(_context10.t0));

          case 4:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function extractForwardingNumbers() {
    return _ref10.apply(this, arguments);
  };
}();

var loadForwardingNumbers = function () {
  var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11() {
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return loadData.call(this, 'ForwardingNumbers', extractForwardingNumbers);

          case 2:
            return _context11.abrupt('return', _context11.sent);

          case 3:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));

  return function loadForwardingNumbers() {
    return _ref11.apply(this, arguments);
  };
}();

var extractBlockedNumbers = function () {
  var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12() {
    var _this4 = this;

    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return _utils.fetchList.call(this, function (options) {
              return _this4[symbols.api].account().extension().blockedNumber().list(options);
            });

          case 2:
            _context12.t0 = _context12.sent;
            return _context12.abrupt('return', (0, _utils.extractData)(_context12.t0));

          case 4:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));

  return function extractBlockedNumbers() {
    return _ref12.apply(this, arguments);
  };
}();

var loadBlockedNumbers = function () {
  var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13() {
    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return loadData.call(this, 'BlockedNumbers', extractBlockedNumbers);

          case 2:
            return _context13.abrupt('return', _context13.sent);

          case 3:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }));

  return function loadBlockedNumbers() {
    return _ref13.apply(this, arguments);
  };
}();

/**
 * @function
 * @return {Promise}
 */


var loadInfo = function () {
  var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14() {
    return _regenerator2.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _context14.next = 3;
            return _promise2.default.all([loadAccountInfo.call(this), loadExtensionInfo.call(this),
            // this::loadDialingPlans(),
            loadPhoneNumbers.call(this), loadForwardingNumbers.call(this), loadBlockedNumbers.call(this)]);

          case 3:
            _context14.next = 8;
            break;

          case 5:
            _context14.prev = 5;
            _context14.t0 = _context14['catch'](0);

            // TODO send error out
            console.error(_context14.t0);

          case 8:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, this, [[0, 5]]);
  }));

  return function loadInfo() {
    return _ref14.apply(this, arguments);
  };
}();

/**
 * @class User
 * @extends RcModule
 * @default
 * @export
 */


var _rcModule = require('../../lib/rc-module');

var _rcModule2 = _interopRequireDefault(_rcModule);

var _symbolMap = require('data-types/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

var _utils = require('../../lib/utils');

var _userActions = require('./user-actions');

var _userActions2 = _interopRequireDefault(_userActions);

var _userReducer = require('./user-reducer');

var _userReducer2 = _interopRequireDefault(_userReducer);

var _userEvents = require('./user-events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbols = new _symbolMap2.default(['api', 'platform', 'settings']);
var User = function (_RcModule) {
  (0, _inherits3.default)(User, _RcModule);

  /**
   * @function
   * @param {Object} options
   */
  function User(options) {
    var _this6 = this;

    (0, _classCallCheck3.default)(this, User);

    var _this5 = (0, _possibleConstructorReturn3.default)(this, (User.__proto__ || (0, _getPrototypeOf2.default)(User)).call(this, (0, _extends3.default)({}, options, {
      actions: _userActions2.default
    })));

    var api = options.api;
    var platform = options.platform;
    var settings = options.settings;

    _this5[symbols.api] = api;
    _this5[symbols.platform] = platform;
    _this5[symbols.settings] = settings;

    // settings.registerReducer('user', getUserSettingsReducer());

    // load info on login
    platform.on(platform.events.loginSuccess, function () {
      loadInfo.call(_this5);
    });
    // unload info on logout
    platform.on(platform.events.logoutSuccess, function () {
      _this5.store.dispatch({
        type: _this5.actions.clearUserInfo
      });
      // this.emit(userEvents.userInfoCleared);
    });

    // load info if already logged in
    (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee15() {
      return _regenerator2.default.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return platform.loggedIn();

            case 2:
              if (!_context15.sent) {
                _context15.next = 5;
                break;
              }

              _context15.next = 5;
              return loadInfo.call(_this5);

            case 5:
            case 'end':
              return _context15.stop();
          }
        }
      }, _callee15, _this6);
    }))();

    /**
     * TODO:
     *   1. Dialing Plan Checking
     */
    return _this5;
  }

  (0, _createClass3.default)(User, [{
    key: 'reducer',
    get: function get() {
      return (0, _userReducer2.default)(this.prefix);
    }
  }, {
    key: 'events',
    get: function get() {
      return _userEvents.userEvents;
    }
  }, {
    key: 'eventTypes',
    get: function get() {
      return _userEvents.userEventTypes;
    }
  }, {
    key: 'directNumbers',
    get: function get() {
      return this.state.phoneNumbers.filter(function (n) {
        return n.usageType === 'DirectNumber';
      });
    }
  }, {
    key: 'mainCompanyNumber',
    get: function get() {
      return this.state.phoneNumbers.find(function (n) {
        return n.usageType === 'MainCompanyNumber';
      });
    }
  }, {
    key: 'dialingPlans',
    get: function get() {
      return this.state.dialingPlans;
    }
  }, {
    key: 'extensionNumber',
    get: function get() {
      return this.state.extensionInfo.extensionNumber;
    }
  }, {
    key: 'smsNumbers',
    get: function get() {
      return this.state.phoneNumbers.filter(function (n) {
        return n.features.indexOf('SmsSender') > -1;
      });
    }
  }]);
  return User;
}(_rcModule2.default);

exports.default = User;
//# sourceMappingURL=index.js.map
