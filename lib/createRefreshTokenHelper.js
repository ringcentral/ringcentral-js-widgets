"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRefreshTokenHelper = void 0;
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
var _validateIsOffline = _interopRequireDefault(require("./validateIsOffline"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * follow the logic in sdk, but more logic to prevent error logout
 */
var createRefreshTokenHelper = exports.createRefreshTokenHelper = function createRefreshTokenHelper(getPlatform, logger) {
  var getRefreshTokenState = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(error) {
      var _error$response, _error$message, _error$message$substr;
      var isOffline, resStatus, platform, authData, tokenDataValid, refreshTokenValid;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            isOffline = (0, _validateIsOffline["default"])(error === null || error === void 0 ? void 0 : error.message);
            resStatus = Number(error === null || error === void 0 ? void 0 : (_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status);
            platform = getPlatform();
            _context.n = 1;
            return platform.auth().data();
          case 1:
            authData = _context.v;
            _context.n = 2;
            return platform.auth().refreshTokenValid();
          case 2:
            tokenDataValid = _context.v;
            logger.log('check platform.auth().refreshTokenValid():', tokenDataValid);
            refreshTokenValid = Boolean((isOffline || resStatus >= 500) && tokenDataValid);
            return _context.a(2, {
              refreshTokenValid: refreshTokenValid,
              isOffline: isOffline,
              resStatus: resStatus,
              refreshTokenExpiresTime: authData === null || authData === void 0 ? void 0 : authData.refresh_token_expire_time,
              errorMessage: error === null || error === void 0 ? void 0 : (_error$message = error.message) === null || _error$message === void 0 ? void 0 : (_error$message$substr = _error$message.substring) === null || _error$message$substr === void 0 ? void 0 : _error$message$substr.call(_error$message, 0, 100) // avoid too long msg to be sent to analytics
            });
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
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(onCompleted) {
      var platform, _response, state, _t;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            platform = getPlatform();
            _context2.p = 1;
            if (!platform['_authProxy']) {
              _context2.n = 3;
              break;
            }
            _context2.n = 2;
            return platform.get('/restapi/v1.0/client-info');
          case 2:
            return _context2.a(2, true);
          case 3:
            _context2.n = 4;
            return platform.ensureLoggedIn();
          case 4:
            return _context2.a(2, true);
          case 5:
            _context2.p = 5;
            _t = _context2.v;
            if (!(!(_t instanceof Error) || (_t === null || _t === void 0 ? void 0 : _t.message) === 'Refresh token is missing')) {
              _context2.n = 6;
              break;
            }
            return _context2.a(2, false);
          case 6:
            logger.error('Auth::ensureLoggedIn', _t === null || _t === void 0 ? void 0 : _t.message, _t === null || _t === void 0 ? void 0 : (_response = _t.response) === null || _response === void 0 ? void 0 : _response.status);
            _context2.n = 7;
            return getRefreshTokenState(_t);
          case 7:
            state = _context2.v;
            logger.log('ensureLoggedIn.State:', state);
            onCompleted === null || onCompleted === void 0 ? void 0 : onCompleted(state);
            if ((_t === null || _t === void 0 ? void 0 : _t.message) === 'Refresh token has expired') {
              clearExpiredToken();
            }
            return _context2.a(2, state.refreshTokenValid);
        }
      }, _callee2, null, [[1, 5]]);
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
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(_ref3) {
      var _yield$error$response, _yield$error$response2, _error$response2;
      var error, refreshTokenValid, resStatus, onSessionExpired, platform, isAARError, _t2, _t3, _t4, _t5, _t6, _t7;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            error = _ref3.error, refreshTokenValid = _ref3.refreshTokenValid, resStatus = _ref3.resStatus, onSessionExpired = _ref3.onSessionExpired;
            platform = getPlatform();
            _t2 = resStatus === 403;
            if (!_t2) {
              _context3.n = 5;
              break;
            }
            _context3.n = 1;
            return (_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.clone().json();
          case 1:
            _t4 = _yield$error$response = _context3.v;
            _t3 = _t4 === null;
            if (_t3) {
              _context3.n = 2;
              break;
            }
            _t3 = _yield$error$response === void 0;
          case 2:
            if (!_t3) {
              _context3.n = 3;
              break;
            }
            _t5 = void 0;
            _context3.n = 4;
            break;
          case 3:
            _t5 = (_yield$error$response2 = _yield$error$response.errors) === null || _yield$error$response2 === void 0 ? void 0 : _yield$error$response2.some(function () {
              var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref5$errorCode = _ref5.errorCode,
                errorCode = _ref5$errorCode === void 0 ? '' : _ref5$errorCode;
              return errorCode === 'OAU-167';
            });
          case 4:
            _t2 = _t5;
          case 5:
            isAARError = _t2;
            _t6 = !isAARError && !refreshTokenValid;
            if (!_t6) {
              _context3.n = 7;
              break;
            }
            _context3.n = 6;
            return platform.auth().data();
          case 6:
            _t7 = _context3.v.access_token;
            _t6 = _t7 !== '';
          case 7:
            if (!_t6) {
              _context3.n = 8;
              break;
            }
            onSessionExpired();
            // clean the cache so the error doesn't show again
            platform['_cache'].clean();
            return _context3.a(2, true);
          case 8:
            return _context3.a(2);
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
//# sourceMappingURL=createRefreshTokenHelper.js.map
