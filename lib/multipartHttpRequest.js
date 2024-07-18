"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.some");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.entries");
require("core-js/modules/es.object.values");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multipartHttpRequest = multipartHttpRequest;
require("regenerator-runtime/runtime");
var _utils = require("@ringcentral-integration/utils");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var MULTIPART_MIXED = 'multipart/mixed';
/**
 * create a http with multipart/form-data, let you can send multiple easily
 *
 * and handle `ASCII` encoding issue in multipart/form-data with `filename*=`
 */
function multipartHttpRequest(platform) {
  function checkAllFilesNameNotHaveASCII(files) {
    return Object.values(files || {}).some(function (value) {
      if (Array.isArray(value)) {
        return value.some(function (file) {
          return file instanceof File && !(0, _utils.isASCII)(file.name);
        });
      }
      return value instanceof File && !(0, _utils.isASCII)(value.name);
    });
  }
  function getFormData(_ref) {
    var fields = _ref.fields,
      files = _ref.files;
    var formData = new FormData();
    Object.entries(fields || {}).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        value = _ref3[1];
      formData.append(key, new Blob([JSON.stringify(value)], {
        type: 'application/json'
      }));
    });
    Object.entries(files || {}).forEach(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
        key = _ref5[0],
        value = _ref5[1];
      if (Array.isArray(value)) {
        value.forEach(function (item, i) {
          formData.append(key, item, item instanceof File ? item.name : "blob-".concat(i));
        });
      } else {
        formData.append(key, value, value instanceof File ? value.name : "blob");
      }
    });
    return formData;
  }
  var sendRequest = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(method, url, _ref6) {
      var _multipartResult$;
      var fields, files, query, _ref6$headers, headers, rest, contentType, result, hasNonASCII, uTF8FormData, formData, response, multipartResult, responseData;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fields = _ref6.fields, files = _ref6.files, query = _ref6.query, _ref6$headers = _ref6.headers, headers = _ref6$headers === void 0 ? {} : _ref6$headers, rest = _objectWithoutProperties(_ref6, ["fields", "files", "query", "headers"]);
              contentType = headers.contentType;
              _context.t0 = method;
              _context.next = _context.t0 === 'get' ? 5 : _context.t0 === 'delete' ? 5 : 9;
              break;
            case 5:
              _context.next = 7;
              return platform[method](url, query, _objectSpread(_objectSpread({}, rest), {}, {
                headers: _objectSpread(_objectSpread({}, headers), {}, {
                  'Content-Type': contentType || MULTIPART_MIXED
                })
              }));
            case 7:
              result = _context.sent;
              return _context.abrupt("break", 28);
            case 9:
              hasNonASCII = checkAllFilesNameNotHaveASCII(files);
              if (!hasNonASCII) {
                _context.next = 22;
                break;
              }
              _context.t1 = fields || files;
              if (!_context.t1) {
                _context.next = 16;
                break;
              }
              _context.next = 15;
              return new _utils.MultiPartUTF8FormData({
                fields: fields,
                files: files
              }).getData(contentType);
            case 15:
              _context.t1 = _context.sent;
            case 16:
              uTF8FormData = _context.t1;
              _context.next = 19;
              return platform[method](url, uTF8FormData === null || uTF8FormData === void 0 ? void 0 : uTF8FormData.formData, query, _objectSpread(_objectSpread({}, rest), {}, {
                headers: _objectSpread(_objectSpread({}, headers), {}, {
                  'Content-Type': (uTF8FormData === null || uTF8FormData === void 0 ? void 0 : uTF8FormData.contentType) || MULTIPART_MIXED
                })
              }));
            case 19:
              result = _context.sent;
              _context.next = 27;
              break;
            case 22:
              // when not be ASCII, use platform API directly
              formData = getFormData({
                fields: fields,
                files: files
              });
              _context.next = 25;
              return platform[method](url, formData, query, rest);
            case 25:
              response = _context.sent;
              return _context.abrupt("return", response.json());
            case 27:
              return _context.abrupt("break", 28);
            case 28:
              _context.next = 30;
              return platform._client.toMultipart(result);
            case 30:
              multipartResult = _context.sent;
              _context.next = 33;
              return multipartResult === null || multipartResult === void 0 ? void 0 : (_multipartResult$ = multipartResult[0]) === null || _multipartResult$ === void 0 ? void 0 : _multipartResult$.json();
            case 33:
              responseData = _context.sent;
              return _context.abrupt("return", responseData);
            case 35:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function sendRequest(_x, _x2, _x3) {
      return _ref7.apply(this, arguments);
    };
  }();
  return {
    get: function get(url, options) {
      return sendRequest('get', url, options);
    },
    post: function post(url, options) {
      return sendRequest('post', url, options);
    },
    put: function put(url, options) {
      return sendRequest('put', url, options);
    },
    patch: function patch(url, options) {
      return sendRequest('patch', url, options);
    },
    "delete": function _delete(url, options) {
      return sendRequest('delete', url, options);
    }
  };
}
//# sourceMappingURL=multipartHttpRequest.js.map
