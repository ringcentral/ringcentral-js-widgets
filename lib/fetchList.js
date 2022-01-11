"use strict";

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = fetchList;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.slice");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function parallelFetch(_x, _x2, _x3) {
  return _parallelFetch.apply(this, arguments);
}

function _parallelFetch() {
  _parallelFetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fn, perPage, params) {
    var data, list, promises, i;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fn(_objectSpread(_objectSpread({}, params), {}, {
              perPage: perPage,
              page: 1
            }));

          case 2:
            data = _context.sent;
            list = data.records.slice();

            if (!(data.paging.totalPages > 1)) {
              _context.next = 10;
              break;
            }

            promises = [];

            for (i = data.paging.totalPages; i > 1; i -= 1) {
              promises.push(fn(_objectSpread(_objectSpread({}, params), {}, {
                perPage: perPage,
                page: i
              })));
            }

            _context.next = 9;
            return Promise.all(promises);

          case 9:
            _context.sent.reduce(function (output, item) {
              output.push.apply(output, _toConsumableArray(item.records));
              return output;
            }, list);

          case 10:
            return _context.abrupt("return", list);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parallelFetch.apply(this, arguments);
}

function serialFetch(_x4, _x5, _x6) {
  return _serialFetch.apply(this, arguments);
}

function _serialFetch() {
  _serialFetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(fn, perPage, params) {
    var fetchedPages, totalPages, list, data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fetchedPages = 0;
            totalPages = 1;
            list = [];

          case 3:
            if (!(fetchedPages < totalPages)) {
              _context2.next = 12;
              break;
            }

            fetchedPages += 1;
            _context2.next = 7;
            return fn(_objectSpread(_objectSpread({}, params), {}, {
              perPage: perPage,
              page: fetchedPages
            }));

          case 7:
            data = _context2.sent;

            /* eslint { "prefer-destructuring": 0 } */
            totalPages = data.paging.totalPages;
            list.push.apply(list, _toConsumableArray(data.records));
            _context2.next = 3;
            break;

          case 12:
            return _context2.abrupt("return", list);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _serialFetch.apply(this, arguments);
}

function fetchList(_x7) {
  return _fetchList.apply(this, arguments);
}

function _fetchList() {
  _fetchList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(fn) {
    var _ref,
        _ref$perPage,
        perPage,
        _ref$parallel,
        parallel,
        params,
        _args3 = arguments;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _ref = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
            _ref$perPage = _ref.perPage, perPage = _ref$perPage === void 0 ? 'MAX' : _ref$perPage, _ref$parallel = _ref.parallel, parallel = _ref$parallel === void 0 ? true : _ref$parallel, params = _objectWithoutProperties(_ref, ["perPage", "parallel"]);
            return _context3.abrupt("return", parallel ? parallelFetch(fn, perPage, params) : serialFetch(fn, perPage, params));

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _fetchList.apply(this, arguments);
}
//# sourceMappingURL=fetchList.js.map
