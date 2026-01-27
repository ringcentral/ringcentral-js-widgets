"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchKnownRequestErrors = exports.AUTH_ERRORS = void 0;
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _i18n = require("./i18n");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Authentication related error codes
 * https://developers.ringcentral.com/guide/basics/errors
 */
var AUTH_ERRORS = exports.AUTH_ERRORS = {
  /**
   * 'Parameter [brandId] is invalid'
   */
  'OAU-101': [403, 'OAU-101', {
    logout: true,
    message: function message() {
      return (0, _i18n.t)('accessDenied');
    }
  }],
  /**
   * 'Unable to issue authorization code'
   */
  'OAU-102': [403, 'OAU-102', {
    message: function message() {
      return (0, _i18n.t)('accessDenied');
    }
  }],
  /**
   * 'Login for ${extensionType} extension is not allowed.'
   */
  'OAU-105': [403, 'OAU-105', {
    message: function message() {
      return (0, _i18n.t)('accessDenied');
    }
  }],
  /**
   * 'Invalid authorization code'
   */
  'OAU-106': [403, 'OAU-106', {
    message: function message() {
      return (0, _i18n.t)('accessDenied');
    }
  }],
  /**
   * 'Authorization code is expired'
   */
  'OAU-108': [403, 'OAU-108', {
    message: function message() {
      return (0, _i18n.t)('accessDenied');
    }
  }],
  /**
   * 'Redirect URIs do not match'
   */
  'OAU-109': [403, 'OAU-109', {
    message: function message() {
      return (0, _i18n.t)('accessDenied');
    }
  }],
  /**
   * 'Authorization code was not issued for this application'
   */
  'OAU-110': [403, 'OAU-110', {
    message: function message() {
      return (0, _i18n.t)('accessDenied');
    }
  }],
  /**
   * 'Request parameter duplication detected'
   */
  'OAU-111': [400, 'OAU-111', {
    message: function message() {
      return (0, _i18n.t)('accessDenied');
    }
  }],
  /**
   */
  'OAU-112': [403, 'OAU-112', {
    message: function message() {
      return (0, _i18n.t)('accessDenied');
    }
  }],
  /**
   * 'No redirect uri is registered for the client'
   */
  'OAU-113': [403, 'OAU-113', {
    message: function message() {
      return (0, _i18n.t)('accessDenied');
    }
  }],
  /**
   * 'Invalid authorization method'
   */
  'OAU-116': [403, 'OAU-116', {
    message: function message() {
      return (0, _i18n.t)('accessDenied');
    }
  }],
  /**
   * 'The scope of requesting application cannot be narrower than the target application'
   */
  'OAU-117': [403, 'OAU-117', {
    message: function message() {
      return (0, _i18n.t)('accessDenied');
    }
  }],
  /**
   * 'International Virtual number cannot be used to login'
   */
  'OAU-119': [403, 'OAU-119', {
    message: function message() {
      return (0, _i18n.t)('accessDenied');
    }
  }],
  /**
   * 'Wrong Application ID'
   */
  'OAU-120': [401, 'OAU-120', {
    message: function message() {
      return (0, _i18n.t)('internalError');
    }
  }],
  /**
   * 'Wrong Application'
   */
  'OAU-121': [401, 'OAU-121', {
    message: function message() {
      return (0, _i18n.t)('internalError');
    }
  }],
  /**
   * 'Invalid Authorization header value: ${parameter}'
   */
  'OAU-123': [401, 'OAU-123', {
    message: function message() {
      return (0, _i18n.t)('internalError');
    }
  }],
  /**
   * 'Grant type is not allowed for application.'
   */
  'OAU-125': [401, 'OAU-125', {
    message: function message() {
      return (0, _i18n.t)('internalError');
    }
  }],
  /**
   * 'Invalid application release.'
   */
  'OAU-127': [401, 'OAU-127', {
    message: function message() {
      return (0, _i18n.t)('internalError');
    }
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
    message: function message() {
      return (0, _i18n.t)('internalError');
    }
  }],
  /**
   * 'Extension not found.'
   */
  'OAU-136': [401, 'OAU-136', {
    logout: true,
    message: function message() {
      return (0, _i18n.t)('internalError');
    }
  }],
  /**
   * 'Invalid resource owner credentials.'
   */
  'OAU-140': [401, 'OAU-140', {
    message: function message() {
      return (0, _i18n.t)('internalError');
    }
  }],
  /**
   * 'Login for extension in current state is not allowed.'
   */
  'OAU-141': [401, 'OAU-141', {
    logout: true,
    message: function message() {
      return (0, _i18n.t)('internalError');
    }
  }, [/\/restapi\/oauth\/token$/i] // matches "*/restapi/oauth/token"
  ],
  /**
   * 'Login to account in current state is not allowed.'
   */
  'OAU-142': [401, 'OAU-142', {
    logout: true,
    message: function message() {
      return (0, _i18n.t)('internalError');
    }
  }, [/\/restapi\/oauth\/token$/i] // matches "*/restapi/oauth/token"
  ],
  /**
   * 'Invalid client credentials'
   */
  'OAU-146': [401, 'OAU-146', {
    message: function message() {
      return (0, _i18n.t)('internalError');
    }
  }],
  /**
   * 'The account is locked out due to multiple unsuccessful logon attempts.'
   */
  'OAU-147': [400, 'OAU-147', {
    message: function message() {
      return (0, _i18n.t)('internalError');
    }
  }],
  /**
   * 'The account is locked out due to multiple unsuccessful logon attempts. Please use Single Sign-on way to authenticate.'
   */
  'OAU-148': [400, 'OAU-148', {
    message: function message() {
      return (0, _i18n.t)('internalError');
    }
  }],
  /**
   * 'Unparsable access token'
   */
  'OAU-149': [401, 'OAU-149', {
    message: function message() {
      return (0, _i18n.t)('internalError');
    }
  }],
  /**
   * 'The value of query parameter [${queryParameterName}] should be equal to parameter [${requestParameterName}] in request body'
   */
  'OAU-150': [400, 'OAU-150', {
    message: function message() {
      return (0, _i18n.t)('internalError');
    }
  }],
  /**
   * 'Authorization method not supported'
   */
  'OAU-151': [401, 'OAU-151', {
    message: function message() {
      return (0, _i18n.t)('internalError');
    }
  }],
  /**
   * 'Password grant is not allowed because MFA is required.'
   */
  'OAU-168': [401, 'OAU-168', {
    message: function message() {
      return (0, _i18n.t)('internalError');
    }
  }],
  /**
   * 'Token not found'
   * - https://rc-wiki-domian/pages/viewpage.action?pageId=476097866
   */
  'OAU-213': [-1, 'OAU-213', {
    logout: true,
    message: function message() {
      return (0, _i18n.t)('internalError');
    }
  }, [/\/restapi\/oauth\/token$/i] // matches "*/restapi/oauth/token"
  ],
  /**
   * 'Extension not found'
   * - https://rc-wiki-domian/pages/viewpage.action?pageId=476097866
   */
  'OAU-232': [-1, 'OAU-232', {
    logout: true,
    message: function message() {
      return (0, _i18n.t)('internalError');
    }
  }],
  /**
   * 'Extension is disabled or frozen'
   * - https://rc-wiki-domian/pages/viewpage.action?pageId=476097866
   */
  'OAU-236': [-1, 'OAU-236', {
    logout: true,
    message: function message() {
      return (0, _i18n.t)('internalError');
    }
  }],
  /**
   * 'Sandbox client is not allowed: ${client_id}'
   * - https://rc-wiki-domian/pages/viewpage.action?pageId=476097866
   */
  'OAU-165': [-1, 'OAU-165', {
    message: function message() {
      return (0, _i18n.t)('internalError');
    }
  }],
  /**
   * 'Account does not exist'
   * - https://rc-wiki-domian/pages/viewpage.action?pageId=476097866
   */
  'OAU-222': [-1, 'OAU-222', {
    logout: true,
    message: function message() {
      return (0, _i18n.t)('internalError');
    }
  }],
  /**
   * 'Site access forbidden'
   * - Migrate from old implementation
   */
  'OAU-167': [403, 'OAU-167', {
    logout: true,
    message: function message() {
      return (0, _i18n.t)('siteAccessForbidden');
    }
  }]
};
var matchKnownRequestErrors = exports.matchKnownRequestErrors = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(apiError) {
    var authErrors,
      matches,
      _apiError$request$url,
      _apiError$request,
      _apiError$response,
      url,
      _errors,
      _args = arguments,
      _t,
      _t2,
      _t3;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          authErrors = _args.length > 1 && _args[1] !== undefined ? _args[1] : AUTH_ERRORS;
          matches = [];
          if (!apiError.response) {
            _context.n = 7;
            break;
          }
          url = (_apiError$request$url = (_apiError$request = apiError.request) === null || _apiError$request === void 0 ? void 0 : _apiError$request.url) !== null && _apiError$request$url !== void 0 ? _apiError$request$url : (_apiError$response = apiError.response) === null || _apiError$response === void 0 ? void 0 : _apiError$response.url; // try to parse the response as json to get error codes
          _context.p = 1;
          _context.n = 2;
          return apiError.response.clone().json();
        case 2:
          _t2 = _errors = _context.v.errors;
          _t = _t2 === null;
          if (_t) {
            _context.n = 3;
            break;
          }
          _t = _errors === void 0;
        case 3:
          if (!_t) {
            _context.n = 4;
            break;
          }
          void 0;
          _context.n = 5;
          break;
        case 4:
          _errors.forEach(function (err) {
            var errorConfig = authErrors[err.errorCode];
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
        case 5:
          _context.n = 7;
          break;
        case 6:
          _context.p = 6;
          _t3 = _context.v;
        case 7:
          return _context.a(2, matches);
      }
    }, _callee, null, [[1, 6]]);
  }));
  return function matchKnownRequestErrors(_x) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=authErrors.js.map
