"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
var _ComposeTextUI = require("./ComposeTextUI");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('detectPhoneNumbers', function () {
  var phone = {
    composeText: {
      validatePhoneNumber: function validatePhoneNumber(string) {
        return /^\d*$/.test(string);
      },
      // @ts-expect-error TS(2304): Cannot find name 'jest'.
      addToNumber: jest.fn().mockResolvedValue(true)
    }
  };

  // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
  beforeEach(function () {
    // @ts-expect-error TS(2304): Cannot find name 'jest'.
    jest.clearAllMocks();
  });

  // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('when text is a plain text without valid phone number', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var funcs, result;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          // @ts-expect-error TS(2345): Argument of type '{ composeText: { validatePhoneNu... Remove this comment to see the full error message
          funcs = new _ComposeTextUI.ComposeTextUI(phone).getUIFunctions({
            phone: phone
          });
          _context.n = 1;
          return funcs.detectPhoneNumbers('sabasdf, qwerrrr');
        case 1:
          result = _context.v;
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(result).toBe(false);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(phone.composeText.addToNumber).not.toHaveBeenCalled();
        case 2:
          return _context.a(2);
      }
    }, _callee);
  })));

  // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('when text is a valid phone number', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var funcs, result;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          // @ts-expect-error TS(2345): Argument of type '{ composeText: { validatePhoneNu... Remove this comment to see the full error message
          funcs = new _ComposeTextUI.ComposeTextUI(phone).getUIFunctions({
            phone: phone
          });
          _context2.n = 1;
          return funcs.detectPhoneNumbers('123444');
        case 1:
          result = _context2.v;
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(result).toBe(true);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(phone.composeText.addToNumber).toHaveBeenCalledTimes(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(phone.composeText.addToNumber).toHaveBeenCalledWith({
            phoneNumber: '123444'
          });
        case 2:
          return _context2.a(2);
      }
    }, _callee2);
  })));

  // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('when text is "sabasdf, 1234"', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var funcs, result;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          // @ts-expect-error TS(2345): Argument of type '{ composeText: { validatePhoneNu... Remove this comment to see the full error message
          funcs = new _ComposeTextUI.ComposeTextUI(phone).getUIFunctions({
            phone: phone
          });
          _context3.n = 1;
          return funcs.detectPhoneNumbers('sabasdf, 1234');
        case 1:
          result = _context3.v;
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(result).toBe(true);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(phone.composeText.addToNumber).toHaveBeenCalledTimes(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(phone.composeText.addToNumber).toHaveBeenCalledWith({
            phoneNumber: '1234'
          });
        case 2:
          return _context3.a(2);
      }
    }, _callee3);
  })));

  // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('when text is "1234,5555"', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var funcs, result;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          // @ts-expect-error TS(2345): Argument of type '{ composeText: { validatePhoneNu... Remove this comment to see the full error message
          funcs = new _ComposeTextUI.ComposeTextUI(phone).getUIFunctions({
            phone: phone
          });
          _context4.n = 1;
          return funcs.detectPhoneNumbers('1234,5555');
        case 1:
          result = _context4.v;
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(result).toBe(true);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(phone.composeText.addToNumber).toHaveBeenCalledTimes(2);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(phone.composeText.addToNumber).toHaveBeenNthCalledWith(1, {
            phoneNumber: '1234'
          });
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(phone.composeText.addToNumber).toHaveBeenNthCalledWith(2, {
            phoneNumber: '5555'
          });
        case 2:
          return _context4.a(2);
      }
    }, _callee4);
  })));
});
//# sourceMappingURL=index.test.js.map
