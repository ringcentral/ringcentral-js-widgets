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
exports.slideOutViewTransition = exports.slideInViewTransition = exports.VIEW_TRANSITION_DETAIL_IDENTIFY = exports.VIEW_TRANSITION_CONTAINER_IDENTIFY = void 0;
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("./view-transition.global.scss");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var VIEW_TRANSITION_CONTAINER_IDENTIFY = exports.VIEW_TRANSITION_CONTAINER_IDENTIFY = 'view-transition-container';
var VIEW_TRANSITION_DETAIL_IDENTIFY = exports.VIEW_TRANSITION_DETAIL_IDENTIFY = 'view-transition-detail';
var isReducedMotion = function isReducedMotion() {
  var _window, _window$matchMedia;
  return (_window = window) === null || _window === void 0 ? void 0 : (_window$matchMedia = _window.matchMedia) === null || _window$matchMedia === void 0 ? void 0 : _window$matchMedia.call(_window, '(prefers-reduced-motion)').matches;
};
var getCondition = function getCondition() {
  var reducedMotion = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : isReducedMotion();
  if (reducedMotion) {
    return {};
  }
  var container = document.getElementById(VIEW_TRANSITION_CONTAINER_IDENTIFY);
  var detail = document.getElementById(VIEW_TRANSITION_DETAIL_IDENTIFY);
  return {
    container: container,
    detail: detail
  };
};

/**
 * slide in view transition
 *
 * respect the user's reduced motion preference by default
 *
 * if you want to force disable the reduced motion, you can set the `reducedMotion` to `false`
 */
var slideInViewTransition = exports.slideInViewTransition = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(callback, reducedMotion) {
    var _getCondition, container, detail, transition;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _getCondition = getCondition(reducedMotion), container = _getCondition.container, detail = _getCondition.detail;
          if (!(!container || !detail || !document.startViewTransition)) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, callback());
        case 1:
          container.classList.add(VIEW_TRANSITION_CONTAINER_IDENTIFY);
          transition = document.startViewTransition(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  detail.classList.add(VIEW_TRANSITION_DETAIL_IDENTIFY);
                  _context.n = 1;
                  return callback();
                case 1:
                  return _context.a(2);
              }
            }, _callee);
          })));
          _context2.p = 2;
          _context2.n = 3;
          return transition.finished;
        case 3:
          _context2.p = 3;
          container.classList.remove(VIEW_TRANSITION_CONTAINER_IDENTIFY);
          detail.classList.remove(VIEW_TRANSITION_DETAIL_IDENTIFY);
          return _context2.f(3);
        case 4:
          return _context2.a(2);
      }
    }, _callee2, null, [[2,, 3, 4]]);
  }));
  return function slideInViewTransition(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * slide out view transition
 *
 * respect the user's reduced motion preference by default
 *
 * if you want to force disable the reduced motion, you can set the `reducedMotion` to `false`
 */
var slideOutViewTransition = exports.slideOutViewTransition = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(callback, reducedMotion) {
    var _getCondition2, container, detail, transition;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _getCondition2 = getCondition(reducedMotion), container = _getCondition2.container, detail = _getCondition2.detail;
          if (!(!container || !detail || !document.startViewTransition)) {
            _context4.n = 1;
            break;
          }
          return _context4.a(2, callback());
        case 1:
          container.classList.add(VIEW_TRANSITION_CONTAINER_IDENTIFY);
          detail.classList.add(VIEW_TRANSITION_DETAIL_IDENTIFY);
          transition = document.startViewTransition(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
            return _regenerator().w(function (_context3) {
              while (1) switch (_context3.n) {
                case 0:
                  detail.classList.remove(VIEW_TRANSITION_DETAIL_IDENTIFY);
                  _context3.n = 1;
                  return callback();
                case 1:
                  return _context3.a(2);
              }
            }, _callee3);
          })));
          _context4.p = 2;
          _context4.n = 3;
          return transition.finished;
        case 3:
          _context4.p = 3;
          container.classList.remove(VIEW_TRANSITION_CONTAINER_IDENTIFY);
          return _context4.f(3);
        case 4:
          return _context4.a(2);
      }
    }, _callee4, null, [[2,, 3, 4]]);
  }));
  return function slideOutViewTransition(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
//# sourceMappingURL=slide.js.map
