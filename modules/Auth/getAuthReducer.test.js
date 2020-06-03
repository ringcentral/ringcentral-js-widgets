"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.array.for-each");

var _chai = require("chai");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getAuthReducer = _interopRequireWildcard(require("./getAuthReducer"));

var _loginStatus = _interopRequireDefault(require("./loginStatus"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('getLoginStatusReducer', function () {
  it('should be a function', function () {
    (0, _chai.expect)(_getAuthReducer.getLoginStatusReducer).to.be.a('function');
  });
  it('should return a reducer', function () {
    (0, _chai.expect)((0, _getAuthReducer.getLoginStatusReducer)(_actionTypes["default"])).to.be.a('function');
  });
  describe('loginStatusReducer', function () {
    var reducer = (0, _getAuthReducer.getLoginStatusReducer)(_actionTypes["default"]);
    it('should have initial state of null', function () {
      (0, _chai.expect)(reducer(undefined, {})).to.equal(null);
    });
    it('should return original state of actionTypes is not recognized', function () {
      var originalState = {};
      (0, _chai.expect)(reducer(originalState, {
        type: 'foo'
      })).to.equal(originalState);
    });
    describe('actionTypes => loginStatus', function () {
      it('actionTypes.login => loginStatus.loggingIn', function () {
        (0, _chai.expect)(reducer(null, {
          type: _actionTypes["default"].login
        })).to.equal(_loginStatus["default"].loggingIn);
      });
      it('actionTypes.loginSuccess => loginStatus.loggedIn', function () {
        (0, _chai.expect)(reducer(null, {
          type: _actionTypes["default"].loginSuccess
        })).to.equal(_loginStatus["default"].loggedIn);
      });
      it('actionTypes.refreshSuccess => loginStatus.loggedIn', function () {
        (0, _chai.expect)(reducer(null, {
          type: _actionTypes["default"].refreshSuccess
        })).to.equal(_loginStatus["default"].loggedIn);
      });
      it('actionTypes.cancelLogout => loginStatus.loggedIn', function () {
        (0, _chai.expect)(reducer(null, {
          type: _actionTypes["default"].cancelLogout
        })).to.equal(_loginStatus["default"].loggedIn);
      });
      it('actionTypes.loginError => loginStatus.notLoggedIn', function () {
        (0, _chai.expect)(reducer(null, {
          type: _actionTypes["default"].loginError
        })).to.equal(_loginStatus["default"].notLoggedIn);
      });
      it('actionTypes.logoutSuccess => loginStatus.notLoggedIn', function () {
        (0, _chai.expect)(reducer(null, {
          type: _actionTypes["default"].logoutSuccess
        })).to.equal(_loginStatus["default"].notLoggedIn);
      });
      it('actionTypes.logoutError => loginStatus.notLoggedIn', function () {
        (0, _chai.expect)(reducer(null, {
          type: _actionTypes["default"].logoutError
        })).to.equal(_loginStatus["default"].notLoggedIn);
      });
      it('actionTypes.refreshError => refreshTokenValid ? state : loginStatus.notLoggedIn', function () {
        (0, _chai.expect)(reducer(null, {
          type: _actionTypes["default"].refreshError,
          refreshTokenValid: false
        })).to.equal(_loginStatus["default"].notLoggedIn);
        (0, _chai.expect)(reducer(_loginStatus["default"].loggedIn, {
          type: _actionTypes["default"].refreshError,
          refreshTokenValid: true
        })).to.equal(_loginStatus["default"].loggedIn);
      });
      it('actionTypes.logout => loginStatus.loggingOut', function () {
        (0, _chai.expect)(reducer(null, {
          type: _actionTypes["default"].logout
        })).to.equal(_loginStatus["default"].loggingOut);
      });
      it('actionTypes.beforeLogout => loginStatus.beforeLogout', function () {
        (0, _chai.expect)(reducer(null, {
          type: _actionTypes["default"].beforeLogout
        })).to.equal(_loginStatus["default"].beforeLogout);
      });
      it('actionTypes.refresh => originalState', function () {
        var originalState = {};
        (0, _chai.expect)(reducer(originalState, {
          type: _actionTypes["default"].refresh
        })).to.equal(originalState);
      });
      it('actionTypes.init => state', function () {
        (0, _chai.expect)(reducer('originalState', {
          type: _actionTypes["default"].init
        })).to.equal('originalState');
      });
      it('actionTypes.initSuccess && !loggedIn => loginStatus.notLoggedIn', function () {
        (0, _chai.expect)(reducer(null, {
          type: _actionTypes["default"].initSuccess,
          loggedIn: false
        })).to.equal(_loginStatus["default"].notLoggedIn);
      });
      it('actionTypes.initSuccess && loggedIn => loginStatus.loggedIn', function () {
        (0, _chai.expect)(reducer(null, {
          type: _actionTypes["default"].initSuccess,
          loggedIn: true
        })).to.equal(_loginStatus["default"].loggedIn);
      });
      it('actionTypes.tabSync && !loggedIn => loginStatus.notLoggedIn', function () {
        (0, _chai.expect)(reducer(null, {
          type: _actionTypes["default"].tabSync,
          loggedIn: false
        })).to.equal(_loginStatus["default"].notLoggedIn);
      });
      it('actionTypes.tabSync && loggedIn => loginStatus.loggedIn', function () {
        (0, _chai.expect)(reducer(null, {
          type: _actionTypes["default"].tabSync,
          loggedIn: true
        })).to.equal(_loginStatus["default"].loggedIn);
      });
    });
  });
});
describe('getTokenReducer', function () {
  it('should be a function', function () {
    (0, _chai.expect)(_getAuthReducer.getTokenReducer).to.be.a('function');
  });
  it('should return a reducer', function () {
    (0, _chai.expect)((0, _getAuthReducer.getTokenReducer)(_actionTypes["default"])).to.be.a('function');
  });
  describe('endpointIdReducer', function () {
    var reducer = (0, _getAuthReducer.getTokenReducer)(_actionTypes["default"]);
    it('should have initial state of empty object', function () {
      (0, _chai.expect)(reducer(undefined, {})).to.deep.equal({});
    });
    it('should return original state of actionTypes is not recognized', function () {
      var originalState = {};
      (0, _chai.expect)(reducer(originalState, {
        type: 'foo'
      })).to.equal(originalState);
    });
    it('should return token object on loginSuccess and refreshSuccess', function () {
      [_actionTypes["default"].loginSuccess, _actionTypes["default"].refreshSuccess].forEach(function (type) {
        (0, _chai.expect)(reducer(null, {
          type: type,
          token: {
            endpoint_id: 'foo',
            owner_id: 'owner',
            access_token: 'access token',
            expire_time: '1111',
            expires_in: '1234',
            scope: 'scope'
          }
        })).to.deep.equal({
          endpointId: 'foo',
          ownerId: 'owner',
          accessToken: 'access token',
          expireTime: '1111',
          expiresIn: '1234',
          scope: 'scope'
        });
      });
    });
    it('should return empty object on following auth action types', function () {
      [_actionTypes["default"].loginError, _actionTypes["default"].logoutSuccess, _actionTypes["default"].logoutError].forEach(function (type) {
        (0, _chai.expect)(reducer('foo', {
          type: type
        })).to.be.deep.equal({});
      });
    });
    it('should return empty object on refreshError and refreshToken not Valid', function () {
      (0, _chai.expect)(reducer(null, {
        type: _actionTypes["default"].refreshError,
        token: {
          endpoint_id: 'foo'
        },
        refreshTokenValid: false
      })).to.deep.equal({});
    });
    it('should return original state on refreshError and refreshToken Valid', function () {
      var originalState = {};
      (0, _chai.expect)(reducer(originalState, {
        type: _actionTypes["default"].refreshError,
        token: {
          endpoint_id: 'foo'
        },
        refreshTokenValid: true
      })).to.equal(originalState);
    });
    it('should ignore other auth action types', function () {
      var originalState = {};
      [_actionTypes["default"].login, _actionTypes["default"].logout, _actionTypes["default"].refresh, _actionTypes["default"].beforeLogout, _actionTypes["default"].cancelLogout].forEach(function (type) {
        (0, _chai.expect)(reducer(originalState, {
          type: type
        })).to.equal(originalState);
      });
    });
    it('should return endpoint_id on initSuccess or tabSync with token', function () {
      [_actionTypes["default"].initSuccess, _actionTypes["default"].tabSync].forEach(function (type) {
        (0, _chai.expect)(reducer({}, {
          type: type,
          token: {
            endpoint_id: 'foo',
            owner_id: 'owner',
            access_token: 'access token',
            expire_time: '1111',
            expires_in: '1234',
            scope: 'scope'
          }
        })).to.deep.equal({
          endpointId: 'foo',
          ownerId: 'owner',
          accessToken: 'access token',
          expireTime: '1111',
          expiresIn: '1234',
          scope: 'scope'
        });
      });
    });
    it('should return empty object on initSuccess or tabSync without token', function () {
      [_actionTypes["default"].initSuccess, _actionTypes["default"].tabSync].forEach(function (type) {
        (0, _chai.expect)(reducer({}, {
          type: type
        })).to.deep.equal({});
      });
    });
  });
});
describe('getFreshLoginReducer', function () {
  it('should be a function', function () {
    (0, _chai.expect)(_getAuthReducer.getFreshLoginReducer).to.be.a('function');
  });
  it('should return a reducer', function () {
    (0, _chai.expect)((0, _getAuthReducer.getFreshLoginReducer)(_actionTypes["default"])).to.be.a('function');
  });
  describe('freshLoginReducer', function () {
    var reducer = (0, _getAuthReducer.getFreshLoginReducer)(_actionTypes["default"]);
    it('should have initial state of null', function () {
      (0, _chai.expect)(reducer(undefined, {})).to.be["null"];
    });
    it('should return original state of actionTypes is not recognized', function () {
      var originalState = {};
      (0, _chai.expect)(reducer(originalState, {
        type: 'foo'
      })).to.equal(originalState);
    });
    it('should return true on login action type', function () {
      (0, _chai.expect)(reducer(null, {
        type: _actionTypes["default"].login
      })).to.be["true"];
    });
    it('should return null on following auth action types', function () {
      [_actionTypes["default"].loginError, _actionTypes["default"].logoutError, _actionTypes["default"].refreshError, _actionTypes["default"].logoutSuccess].forEach(function (type) {
        (0, _chai.expect)(reducer('foo', {
          type: type
        })).to.equal(null);
      });
    });
    it('should ignore the following auth action types', function () {
      var originalState = {};
      [_actionTypes["default"].cancelLogout, _actionTypes["default"].loginSuccess, _actionTypes["default"].logout, _actionTypes["default"].refresh, _actionTypes["default"].refreshSuccess, _actionTypes["default"].beforeLogout, _actionTypes["default"].init].forEach(function (type) {
        (0, _chai.expect)(reducer(originalState, {
          type: type
        })).to.equal(originalState);
      });
    });
    it('should return false on authActionType.initSuccess && loggedIn', function () {
      (0, _chai.expect)(reducer(null, {
        type: _actionTypes["default"].initSuccess,
        loggedIn: true
      })).to.be["false"];
    });
    it('should return null on authActionType.initSuccess && !loggedIn', function () {
      (0, _chai.expect)(reducer(null, {
        type: _actionTypes["default"].initSuccess,
        loggedIn: false
      })).to.be["null"];
    });
    it('should return false on authActionType.tabSync && loggedIn', function () {
      (0, _chai.expect)(reducer(null, {
        type: _actionTypes["default"].tabSync,
        loggedIn: true
      })).to.be["false"];
    });
    it('should return null on authActionType.tabSync && !loggedIn', function () {
      (0, _chai.expect)(reducer(null, {
        type: _actionTypes["default"].tabSync,
        loggedIn: false
      })).to.be["null"];
    });
  });
});
describe('getAuthReducer', function () {
  it('should be a function', function () {
    (0, _chai.expect)(_getAuthReducer["default"]).to.be.a('function');
  });
  it('should return a reducer', function () {
    (0, _chai.expect)((0, _getAuthReducer["default"])()).to.be.a('function');
  });
  describe('authReducer', function () {
    var reducer = (0, _getAuthReducer["default"])(_actionTypes["default"]);
    var statusReducer = (0, _getModuleStatusReducer["default"])(_actionTypes["default"]);
    var loginStatusReducer = (0, _getAuthReducer.getLoginStatusReducer)(_actionTypes["default"]);
    var freshLoginReducer = (0, _getAuthReducer.getFreshLoginReducer)(_actionTypes["default"]);
    var tokenReducer = (0, _getAuthReducer.getTokenReducer)(_actionTypes["default"]);
    it('should return combined state', function () {
      (0, _chai.expect)(reducer(undefined, {})).to.deep.equal({
        status: statusReducer(undefined, {}),
        loginStatus: loginStatusReducer(undefined, {}),
        freshLogin: freshLoginReducer(undefined, {}),
        token: tokenReducer(undefined, {})
      });
      var error = new Error('test');
      var token = {
        owner_id: 'foo',
        endpoint_id: 'foo'
      };
      [{
        type: _actionTypes["default"].login
      }, {
        type: _actionTypes["default"].loginSuccess,
        token: token
      }, {
        type: _actionTypes["default"].loginError,
        error: error
      }, {
        type: _actionTypes["default"].logout
      }, {
        type: _actionTypes["default"].logoutSuccess
      }, {
        type: _actionTypes["default"].logoutError,
        error: error
      }, {
        type: _actionTypes["default"].refresh
      }, {
        type: _actionTypes["default"].refreshSuccess,
        token: token
      }, {
        type: _actionTypes["default"].refreshError,
        error: error
      }, {
        type: _actionTypes["default"].beforeLogout
      }, {
        type: _actionTypes["default"].cancelLogout,
        error: error
      }, {
        type: _actionTypes["default"].init
      }, {
        type: _actionTypes["default"].initSuccess,
        loggedIn: true,
        token: token
      }, {
        type: _actionTypes["default"].initSuccess,
        loggedIn: false
      }, {
        type: _actionTypes["default"].tabSync,
        loggedIn: true,
        token: token
      }, {
        type: _actionTypes["default"].tabSync,
        loggedIn: false
      }].forEach(function (action) {
        (0, _chai.expect)(reducer({
          status: 'status',
          loginStatus: 'loginStatus',
          freshLogin: 'freshLogin',
          token: {}
        }, action)).to.deep.equal({
          status: statusReducer('status', action),
          loginStatus: loginStatusReducer('loginStatus', action),
          freshLogin: freshLoginReducer('freshLogin', action),
          token: tokenReducer({}, action)
        });
      });
    });
  });
});
//# sourceMappingURL=getAuthReducer.test.js.map
