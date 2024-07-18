"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.match");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactMatcher = void 0;
require("regenerator-runtime/runtime");
var _DataMatcherV = require("../../lib/DataMatcherV2");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _dec, _class, _class2;
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var ContactMatcher = (_dec = (0, _di.Module)({
  name: 'ContactMatcher',
  deps: [{
    dep: 'ContactMatcherOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DataMatcher) {
  _inherits(ContactMatcher, _DataMatcher);
  var _super = _createSuper(ContactMatcher);
  function ContactMatcher(deps) {
    var _deps$contactMatcherO;
    _classCallCheck(this, ContactMatcher);
    return _super.call(this, deps, 'ContactMatcher', (_deps$contactMatcherO = deps.contactMatcherOptions) === null || _deps$contactMatcherO === void 0 ? void 0 : _deps$contactMatcherO.disableCache);
  }

  // @ts-expect-error TS(2416): Property 'dataMatcherOptions' in type 'ContactMatc... Remove this comment to see the full error message
  _createClass(ContactMatcher, [{
    key: "hasMatchNumber",
    value: function () {
      var _hasMatchNumber = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var _this$dataMapping$pho;
        var phoneNumber, _ref$ignoreCache, ignoreCache;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                phoneNumber = _ref.phoneNumber, _ref$ignoreCache = _ref.ignoreCache, ignoreCache = _ref$ignoreCache === void 0 ? false : _ref$ignoreCache;
                _context.next = 3;
                return this.match({
                  queries: [phoneNumber],
                  ignoreCache: ignoreCache
                });
              case 3:
                return _context.abrupt("return", ((_this$dataMapping$pho = this.dataMapping[phoneNumber]) === null || _this$dataMapping$pho === void 0 ? void 0 : _this$dataMapping$pho.length) > 0);
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function hasMatchNumber(_x) {
        return _hasMatchNumber.apply(this, arguments);
      }
      return hasMatchNumber;
    }()
  }, {
    key: "forceMatchBatchNumbers",
    value: function () {
      var _forceMatchBatchNumbers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
        var phoneNumbers;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                phoneNumbers = _ref2.phoneNumbers;
                _context2.next = 3;
                return this.match({
                  queries: phoneNumbers,
                  ignoreCache: true,
                  ignoreQueue: true
                });
              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function forceMatchBatchNumbers(_x2) {
        return _forceMatchBatchNumbers.apply(this, arguments);
      }
      return forceMatchBatchNumbers;
    }()
  }, {
    key: "forceMatchNumber",
    value: function () {
      var _forceMatchNumber = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref3) {
        var phoneNumber;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                phoneNumber = _ref3.phoneNumber;
                _context3.next = 3;
                return this.forceMatchBatchNumbers({
                  phoneNumbers: [phoneNumber]
                });
              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function forceMatchNumber(_x3) {
        return _forceMatchNumber.apply(this, arguments);
      }
      return forceMatchNumber;
    }()
  }, {
    key: "dataMatcherOptions",
    get: function get() {
      return this._deps.contactMatcherOptions;
    }
  }]);
  return ContactMatcher;
}(_DataMatcherV.DataMatcher), (_applyDecoratedDescriptor(_class2.prototype, "hasMatchNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "hasMatchNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "forceMatchBatchNumbers", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "forceMatchBatchNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "forceMatchNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "forceMatchNumber"), _class2.prototype)), _class2)) || _class);
exports.ContactMatcher = ContactMatcher;
//# sourceMappingURL=ContactMatcher.js.map
