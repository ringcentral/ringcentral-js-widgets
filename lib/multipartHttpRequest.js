"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
    return function sendRequest(_x2, _x3, _x4) {
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
