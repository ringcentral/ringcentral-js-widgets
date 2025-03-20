"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.reduce");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = fetchList;
require("regenerator-runtime/runtime");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
