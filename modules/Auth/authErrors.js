"use strict";

require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.some");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchKnownRequestErrors = exports.AUTH_ERRORS = void 0;
require("regenerator-runtime/runtime");
var _authMessages = require("./authMessages");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Authentication related error codes
 * https://developers.ringcentral.com/guide/basics/errors
 */
var AUTH_ERRORS = {
  /**
   * 'Parameter [brandId] is invalid'
   */
  'OAU-101': [403, 'OAU-101', {
    logout: true,
    alert: _authMessages.authMessages.accessDenied
  }],
  /**
   * 'Unable to issue authorization code'
   */
  'OAU-102': [403, 'OAU-102', {
    alert: _authMessages.authMessages.accessDenied
  }],
  /**
   * 'Login for ${extensionType} extension is not allowed.'
   */
  'OAU-105': [403, 'OAU-105', {
    alert: _authMessages.authMessages.accessDenied
  }],
  /**
   * 'Invalid authorization code'
   */
  'OAU-106': [403, 'OAU-106', {
    alert: _authMessages.authMessages.accessDenied
  }],
  /**
   * 'Authorization code is expired'
   */
  'OAU-108': [403, 'OAU-108', {
    alert: _authMessages.authMessages.accessDenied
  }],
  /**
   * 'Redirect URIs do not match'
   */
  'OAU-109': [403, 'OAU-109', {
    alert: _authMessages.authMessages.accessDenied
  }],
  /**
   * 'Authorization code was not issued for this application'
   */
  'OAU-110': [403, 'OAU-110', {
    alert: _authMessages.authMessages.accessDenied
  }],
  /**
   * 'Request parameter duplication detected'
   */
  'OAU-111': [400, 'OAU-111', {
    alert: _authMessages.authMessages.accessDenied
  }],
  /**
   * 'The client is unauthorized for the required grant type: [${grant_type}]',
   */
  'OAU-112': [403, 'OAU-112', {
    alert: _authMessages.authMessages.accessDenied
  }],
  /**
   * 'No redirect uri is registered for the client'
   */
  'OAU-113': [403, 'OAU-113', {
    alert: _authMessages.authMessages.accessDenied
  }],
  /**
   * 'Invalid authorization method'
   */
  'OAU-116': [403, 'OAU-116', {
    alert: _authMessages.authMessages.accessDenied
  }],
  /**
   * 'The scope of requesting application cannot be narrower than the target application'
   */
  'OAU-117': [403, 'OAU-117', {
    alert: _authMessages.authMessages.accessDenied
  }],
  /**
   * 'International Virtual number cannot be used to login'
   */
  'OAU-119': [403, 'OAU-119', {
    alert: _authMessages.authMessages.accessDenied
  }],
  /**
   * 'Wrong Application ID'
   */
  'OAU-120': [401, 'OAU-120', {
    alert: _authMessages.authMessages.internalError
  }],
  /**
   * 'Wrong Application'
   */
  'OAU-121': [401, 'OAU-121', {
    alert: _authMessages.authMessages.internalError
  }],
  /**
   * 'Invalid Authorization header value: ${parameter}'
   */
  'OAU-123': [401, 'OAU-123', {
    alert: _authMessages.authMessages.internalError
  }],
  /**
   * 'Grant type is not allowed for application.'
   */
  'OAU-125': [401, 'OAU-125', {
    alert: _authMessages.authMessages.internalError
  }],
  /**
   * 'Invalid application release.'
   */
  'OAU-127': [401, 'OAU-127', {
    alert: _authMessages.authMessages.internalError
  }],
  /**
   * 'Access token expired.'
   */
  'OAU-128': [401, 'OAU-128', {}],
  /**
   * 'Access token corrupted.'
   */
  'OAU-129': [401, 'OAU-129', {}],
  /**
   * 'Invalid Authorization header.'
   */
  'OAU-134': [401, 'OAU-134', {
    alert: _authMessages.authMessages.internalError
  }],
  /**
   * 'Extension not found.'
   */
  'OAU-136': [401, 'OAU-136', {
    logout: true,
    alert: _authMessages.authMessages.internalError
  }],
  /**
   * 'Invalid resource owner credentials.'
   */
  'OAU-140': [401, 'OAU-140', {
    alert: _authMessages.authMessages.internalError
  }],
  /**
   * 'Login for extension in current state is not allowed.'
   */
  'OAU-141': [401, 'OAU-141', {
    logout: true,
    alert: _authMessages.authMessages.internalError
  }, [/\/restapi\/oauth\/token$/i] // matches "*/restapi/oauth/token"
  ],
  /**
   * 'Login to account in current state is not allowed.'
   */
  'OAU-142': [401, 'OAU-142', {
    logout: true,
    alert: _authMessages.authMessages.internalError
  }, [/\/restapi\/oauth\/token$/i] // matches "*/restapi/oauth/token"
  ],
  /**
   * 'Invalid client credentials'
   */
  'OAU-146': [401, 'OAU-146', {
    alert: _authMessages.authMessages.internalError
  }],
  /**
   * 'The account is locked out due to multiple unsuccessful logon attempts.'
   */
  'OAU-147': [400, 'OAU-147', {
    alert: _authMessages.authMessages.internalError
  }],
  /**
   * 'The account is locked out due to multiple unsuccessful logon attempts. Please use Single Sign-on way to authenticate.'
   */
  'OAU-148': [400, 'OAU-148', {
    alert: _authMessages.authMessages.internalError
  }],
  /**
   * 'Unparsable access token'
   */
  'OAU-149': [401, 'OAU-149', {
    alert: _authMessages.authMessages.internalError
  }],
  /**
   * 'The value of query parameter [${queryParameterName}] should be equal to parameter [${requestParameterName}] in request body'
   */
  'OAU-150': [400, 'OAU-150', {
    alert: _authMessages.authMessages.internalError
  }],
  /**
   * 'Authorization method not supported'
   */
  'OAU-151': [401, 'OAU-151', {
    alert: _authMessages.authMessages.internalError
  }],
  /**
   * 'Password grant is not allowed because MFA is required.'
   */
  'OAU-168': [401, 'OAU-168', {
    alert: _authMessages.authMessages.internalError
  }],
  /**
   * 'Token not found'
   * - https://rc-wiki-domian/pages/viewpage.action?pageId=476097866
   */
  'OAU-213': [-1, 'OAU-213', {
    logout: true,
    alert: _authMessages.authMessages.internalError
  }, [/\/restapi\/oauth\/token$/i] // matches "*/restapi/oauth/token"
  ],
  /**
   * 'Extension not found'
   * - https://rc-wiki-domian/pages/viewpage.action?pageId=476097866
   */
  'OAU-232': [-1, 'OAU-232', {
    logout: true,
    alert: _authMessages.authMessages.internalError
  }],
  /**
   * 'Extension is disabled or frozen'
   * - https://rc-wiki-domian/pages/viewpage.action?pageId=476097866
   */
  'OAU-236': [-1, 'OAU-236', {
    logout: true,
    alert: _authMessages.authMessages.internalError
  }],
  /**
   * 'Sandbox client is not allowed: ${client_id}'
   * - https://rc-wiki-domian/pages/viewpage.action?pageId=476097866
   */
  'OAU-165': [-1, 'OAU-165', {
    alert: _authMessages.authMessages.internalError
  }],
  /**
   * 'Account does not exist'
   * - https://rc-wiki-domian/pages/viewpage.action?pageId=476097866
   */
  'OAU-222': [-1, 'OAU-222', {
    logout: true,
    alert: _authMessages.authMessages.internalError
  }],
  /**
   * 'Site access forbidden'
   * - Migrate from old implementation
   */
  'OAU-167': [403, 'OAU-167', {
    logout: true,
    alert: _authMessages.authMessages.siteAccessForbidden
  }]
};
exports.AUTH_ERRORS = AUTH_ERRORS;
var matchKnownRequestErrors = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(apiError) {
    var matches, _apiError$request$url, _apiError$request, _apiError$response, url, _errors;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            matches = [];
            if (!apiError.response) {
              _context.next = 19;
              break;
            }
            url = (_apiError$request$url = (_apiError$request = apiError.request) === null || _apiError$request === void 0 ? void 0 : _apiError$request.url) !== null && _apiError$request$url !== void 0 ? _apiError$request$url : (_apiError$response = apiError.response) === null || _apiError$response === void 0 ? void 0 : _apiError$response.url; // try to parse the response to get error code
            _context.prev = 3;
            _context.next = 6;
            return apiError.response.clone().json();
          case 6:
            _context.t1 = _errors = _context.sent.errors;
            _context.t0 = _context.t1 === null;
            if (_context.t0) {
              _context.next = 10;
              break;
            }
            _context.t0 = _errors === void 0;
          case 10:
            if (!_context.t0) {
              _context.next = 14;
              break;
            }
            void 0;
            _context.next = 15;
            break;
          case 14:
            _errors.forEach(function (err) {
              var errorConfig = AUTH_ERRORS[err.errorCode];
              if (errorConfig) {
                var _errorConfig = _slicedToArray(errorConfig, 4),
                  _endpoints = _errorConfig[3];
                if (!(_endpoints === null || _endpoints === void 0 ? void 0 : _endpoints.length) || _endpoints.some(function (endpoint) {
                  return endpoint.test(url);
                })) {
                  matches.push(errorConfig);
                }
              }
            });
          case 15:
            _context.next = 19;
            break;
          case 17:
            _context.prev = 17;
            _context.t2 = _context["catch"](3);
          case 19:
            return _context.abrupt("return", matches);
          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 17]]);
  }));
  return function matchKnownRequestErrors(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.matchKnownRequestErrors = matchKnownRequestErrors;
//# sourceMappingURL=authErrors.js.map
