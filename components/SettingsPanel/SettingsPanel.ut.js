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
exports.UTRenderSessionInfo = exports.UTCheckOptionsRender = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
var _ = require(".");
var _juno = require("@ringcentral/juno");
var _enzyme = require("enzyme");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var wrapper;
var defaultSessionInfo = [{
  label: 'Phone',
  value: '6508498195'
}, {
  label: 'Login style',
  value: 'INBOUND'
}, {
  label: 'Login time',
  value: '7/20/20 9:20 AM'
}, {
  label: 'Skill profile',
  value: 'bella'
}];
var defaultAgentName = 'Kiwi Lin';
var defaultUserName = 'kiwi.lin+11564+15240001_1364338@ringcentral.com';
function setup(_ref) {
  var _ref$currentLocale = _ref.currentLocale,
    currentLocale = _ref$currentLocale === void 0 ? 'en-US' : _ref$currentLocale,
    _ref$onLogout = _ref.onLogout,
    onLogout = _ref$onLogout === void 0 ? function () {
      return new Promise(function (resolve) {
        return resolve();
      });
    } : _ref$onLogout,
    _ref$version = _ref.version,
    version = _ref$version === void 0 ? '' : _ref$version,
    _ref$goToSessionUpdat = _ref.goToSessionUpdatePage,
    goToSessionUpdatePage = _ref$goToSessionUpdat === void 0 ? function () {} : _ref$goToSessionUpdat,
    _ref$sessionInfo = _ref.sessionInfo,
    sessionInfo = _ref$sessionInfo === void 0 ? defaultSessionInfo : _ref$sessionInfo,
    _ref$agentName = _ref.agentName,
    agentName = _ref$agentName === void 0 ? defaultAgentName : _ref$agentName,
    _ref$userName = _ref.userName,
    userName = _ref$userName === void 0 ? defaultUserName : _ref$userName,
    _ref$disableEditSessi = _ref.disableEditSessionButton,
    disableEditSessionButton = _ref$disableEditSessi === void 0 ? false : _ref$disableEditSessi,
    _ref$showEditSessionI = _ref.showEditSessionIcon,
    showEditSessionIcon = _ref$showEditSessionI === void 0 ? true : _ref$showEditSessionI;
  return (0, _enzyme.mount)(/*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_.SettingsPanel, {
    currentLocale: currentLocale,
    onLogout: onLogout,
    version: version,
    goToSessionUpdatePage: goToSessionUpdatePage,
    sessionInfo: sessionInfo,
    agentName: agentName,
    userName: userName,
    disableEditSessionButton: disableEditSessionButton,
    showEditSessionIcon: showEditSessionIcon
  })));
}
var UTCheckOptionsRender = exports.UTCheckOptionsRender = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          wrapper = setup({});
          expect(wrapper.find('[data-sign="editSession"]').exists()).toBeTruthy();
          expect(wrapper.find('[title="Edit"]').exists()).toBeTruthy();
          expect(wrapper.find('[data-sign="logout"]').exists()).toBeTruthy();
        case 1:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function UTCheckOptionsRender() {
    return _ref2.apply(this, arguments);
  };
}();
var UTRenderSessionInfo = exports.UTRenderSessionInfo = function UTRenderSessionInfo() {
  wrapper = setup({});
  expect(wrapper.find('.agentName').text()).toBe(defaultAgentName);
  expect(wrapper.find('.userName').text()).toBe(defaultUserName);
  var infoItem = wrapper.find('.infoItem');
  for (var i = 0; i < defaultSessionInfo.length; i++) {
    expect(infoItem.at(i).find('.label').first().text()).toBe(defaultSessionInfo[i].label);
    expect(infoItem.at(i).find('.value').first().text()).toBe(defaultSessionInfo[i].value);
  }
};
//# sourceMappingURL=SettingsPanel.ut.js.map
