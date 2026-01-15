"use strict";

require("core-js/modules/es.array.some");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRefreshTokenHelper = void 0;
require("regenerator-runtime/runtime");
var _validateIsOffline = _interopRequireDefault(require("./validateIsOffline"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * follow the logic in sdk, but more logic to prevent error logout
 */
var createRefreshTokenHelper = function createRefreshTokenHelper(getPlatform, logger) {
  var getRefreshTokenState = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(error) {
      var _error$response, _error$message, _error$message$substr;
      var isOffline, resStatus, platform, authData, tokenDataValid, refreshTokenValid;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              isOffline = (0, _validateIsOffline["default"])(error === null || error === void 0 ? void 0 : error.message);
              resStatus = Number(error === null || error === void 0 ? void 0 : (_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status);
              platform = getPlatform();
              _context.next = 5;
              return platform.auth().data();
            case 5:
              authData = _context.sent;
              _context.next = 8;
              return platform.auth().refreshTokenValid();
            case 8:
              tokenDataValid = _context.sent;
              logger.log('check platform.auth().refreshTokenValid():', tokenDataValid);
              refreshTokenValid = Boolean((isOffline || resStatus >= 500) && tokenDataValid);
              return _context.abrupt("return", {
                refreshTokenValid: refreshTokenValid,
                isOffline: isOffline,
                resStatus: resStatus,
                refreshTokenExpiresTime: authData === null || authData === void 0 ? void 0 : authData.refresh_token_expire_time,
                errorMessage: error === null || error === void 0 ? void 0 : (_error$message = error.message) === null || _error$message === void 0 ? void 0 : (_error$message$substr = _error$message.substring) === null || _error$message$substr === void 0 ? void 0 : _error$message$substr.call(_error$message, 0, 100) // avoid too long msg to be sent to analytics
              });
            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function getRefreshTokenState(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var clearExpiredToken = function clearExpiredToken() {
    var platform = getPlatform();
    try {
      platform.auth().setData({
        access_token: '',
        expires_in: '-1',
        refresh_token: ''
      });
      logger.log('Expired token data clear');
    } catch (error) {
      logger.error('clearExpiredToken|error', error === null || error === void 0 ? void 0 : error.message);
    }
  };

  /**
   * almost same as sdk platform.loggedIn(), but with onError callback, and when network not ready should not go into logout state
   * @param onCompleted callback when refresh token completed
   */
  var loggedIn = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(onCompleted) {
      var platform, _response, state;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              platform = getPlatform();
              _context2.prev = 1;
              if (!platform['_authProxy']) {
                _context2.next = 6;
                break;
              }
              _context2.next = 5;
              return platform.get('/restapi/v1.0/client-info');
            case 5:
              return _context2.abrupt("return", true);
            case 6:
              _context2.next = 8;
              return platform.ensureLoggedIn();
            case 8:
              return _context2.abrupt("return", true);
            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](1);
              if (!(!(_context2.t0 instanceof Error) || (_context2.t0 === null || _context2.t0 === void 0 ? void 0 : _context2.t0.message) === 'Refresh token is missing')) {
                _context2.next = 15;
                break;
              }
              return _context2.abrupt("return", false);
            case 15:
              logger.error('Auth::ensureLoggedIn', _context2.t0 === null || _context2.t0 === void 0 ? void 0 : _context2.t0.message, _context2.t0 === null || _context2.t0 === void 0 ? void 0 : (_response = _context2.t0.response) === null || _response === void 0 ? void 0 : _response.status);
              _context2.next = 18;
              return getRefreshTokenState(_context2.t0);
            case 18:
              state = _context2.sent;
              logger.log('ensureLoggedIn.State:', state);
              onCompleted === null || onCompleted === void 0 ? void 0 : onCompleted(state);
              if ((_context2.t0 === null || _context2.t0 === void 0 ? void 0 : _context2.t0.message) === 'Refresh token has expired') {
                clearExpiredToken();
              }
              return _context2.abrupt("return", state.refreshTokenValid);
            case 23:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 11]]);
    }));
    return function loggedIn(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  /**
   * process refresh token error
   * @returns the state of session expired
   */
  var processRefreshError = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref3) {
      var _yield$error$response, _yield$error$response2, _error$response2;
      var error, refreshTokenValid, resStatus, onSessionExpired, platform, isAARError;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              error = _ref3.error, refreshTokenValid = _ref3.refreshTokenValid, resStatus = _ref3.resStatus, onSessionExpired = _ref3.onSessionExpired;
              platform = getPlatform();
              _context3.t0 = resStatus === 403;
              if (!_context3.t0) {
                _context3.next = 16;
                break;
              }
              _context3.next = 6;
              return (_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.clone().json();
            case 6:
              _context3.t2 = _yield$error$response = _context3.sent;
              _context3.t1 = _context3.t2 === null;
              if (_context3.t1) {
                _context3.next = 10;
                break;
              }
              _context3.t1 = _yield$error$response === void 0;
            case 10:
              if (!_context3.t1) {
                _context3.next = 14;
                break;
              }
              _context3.t3 = void 0;
              _context3.next = 15;
              break;
            case 14:
              _context3.t3 = (_yield$error$response2 = _yield$error$response.errors) === null || _yield$error$response2 === void 0 ? void 0 : _yield$error$response2.some(function () {
                var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                  _ref5$errorCode = _ref5.errorCode,
                  errorCode = _ref5$errorCode === void 0 ? '' : _ref5$errorCode;
                return errorCode === 'OAU-167';
              });
            case 15:
              _context3.t0 = _context3.t3;
            case 16:
              isAARError = _context3.t0;
              _context3.t4 = !isAARError && !refreshTokenValid;
              if (!_context3.t4) {
                _context3.next = 23;
                break;
              }
              _context3.next = 21;
              return platform.auth().data();
            case 21:
              _context3.t5 = _context3.sent.access_token;
              _context3.t4 = _context3.t5 !== '';
            case 23:
              if (!_context3.t4) {
                _context3.next = 27;
                break;
              }
              onSessionExpired();
              // clean the cache so the error doesn't show again
              platform['_cache'].clean();
              return _context3.abrupt("return", true);
            case 27:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return function processRefreshError(_x3) {
      return _ref4.apply(this, arguments);
    };
  }();
  return {
    getRefreshTokenState: getRefreshTokenState,
    clearExpiredToken: clearExpiredToken,
    loggedIn: loggedIn,
    processRefreshError: processRefreshError
  };
};
exports.createRefreshTokenHelper = createRefreshTokenHelper;
//# sourceMappingURL=createRefreshTokenHelper.js.map
