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
exports.UTManualEntryInternationalTransferRender = exports.UTManualEntryInternationalTransferForbid = exports.UTManualEntryInternationalTransferAllowed = exports.UTCheckManualEntryRender = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
var _juno = require("@ringcentral/juno");
var _enzyme = require("enzyme");
var _react = _interopRequireDefault(require("react"));
var _ManualEntryPanel = require("./ManualEntryPanel");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var wrapper;
var currentLocale = 'en-US';
var defaultTransferCountryOptions = [{
  countryId: 'CAN',
  countryName: 'Canada'
}, {
  countryId: 'FRA',
  countryName: 'France'
}, {
  countryId: 'GER',
  countryName: 'Germany'
}, {
  countryId: 'MEX',
  countryName: 'Mexico'
}, {
  countryId: 'MTQ',
  countryName: 'Martinique'
}, {
  countryId: 'USA',
  countryName: 'US'
}, {
  countryId: 'USX',
  countryName: 'US Extended'
}];
function setup(_ref) {
  var _ref$goBack = _ref.goBack,
    goBack = _ref$goBack === void 0 ? function () {} : _ref$goBack,
    _ref$transferRecipien = _ref.transferRecipientCountryId,
    transferRecipientCountryId = _ref$transferRecipien === void 0 ? 'USA' : _ref$transferRecipien,
    _ref$changeRecipientN = _ref.changeRecipientNumber,
    changeRecipientNumber = _ref$changeRecipientN === void 0 ? function () {} : _ref$changeRecipientN,
    _ref$changeRecipientC = _ref.changeRecipientCountryId,
    changeRecipientCountryId = _ref$changeRecipientC === void 0 ? function () {} : _ref$changeRecipientC,
    _ref$transferRecipien2 = _ref.transferRecipientNumber,
    transferRecipientNumber = _ref$transferRecipien2 === void 0 ? '6508653454' : _ref$transferRecipien2,
    _ref$allowManualInter = _ref.allowManualInternationalTransfer,
    allowManualInternationalTransfer = _ref$allowManualInter === void 0 ? false : _ref$allowManualInter;
  return (0, _enzyme.mount)(/*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_ManualEntryPanel.ManualEntryPanel, {
    currentLocale: currentLocale,
    goBack: goBack,
    transferRecipientCountryId: transferRecipientCountryId,
    changeRecipientNumber: changeRecipientNumber,
    changeRecipientCountryId: changeRecipientCountryId,
    transferCountryOptions: defaultTransferCountryOptions,
    transferRecipientNumber: transferRecipientNumber,
    allowManualInternationalTransfer: allowManualInternationalTransfer
  })));
}
var UTCheckManualEntryRender = exports.UTCheckManualEntryRender = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref2) {
    var internalOptions, wrapper, dataSign;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          internalOptions = _ref2.internalOptions;
          wrapper = setup({});
          dataSign = {
            'Enter number field': 'transferRecipientNumber',
            Dialpad: 'dialPad'
          };
          expect(wrapper.find("[data-sign=\"".concat(dataSign[internalOptions], "\"]"))).not.toBeUndefined();
        case 1:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function UTCheckManualEntryRender(_x) {
    return _ref3.apply(this, arguments);
  };
}();
var UTManualEntryInternationalTransferForbid = exports.UTManualEntryInternationalTransferForbid = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var transferRecipientCountryId, allowManualInternationalTransfer;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          transferRecipientCountryId = 'FRA';
          allowManualInternationalTransfer = false;
          wrapper = setup({
            allowManualInternationalTransfer: allowManualInternationalTransfer,
            transferRecipientCountryId: transferRecipientCountryId
          });
          expect(wrapper.find('PickList[data-sign="transferCountry"]')).toHaveLength(0);
        case 1:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function UTManualEntryInternationalTransferForbid() {
    return _ref4.apply(this, arguments);
  };
}();
var UTManualEntryInternationalTransferAllowed = exports.UTManualEntryInternationalTransferAllowed = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var changeRecipientCountryId, allowManualInternationalTransfer, countryId, transferCountry;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          changeRecipientCountryId = jest.fn(function () {});
          allowManualInternationalTransfer = true;
          countryId = 'GER';
          wrapper = setup({
            allowManualInternationalTransfer: allowManualInternationalTransfer,
            changeRecipientCountryId: changeRecipientCountryId
          });
          transferCountry = wrapper.find('PickList[data-sign="transferCountry"]').at(0);
          transferCountry.find('[role="button"]').simulate('click');
          document.body.querySelector("li[data-value=\"".concat(countryId, "\"]")).click();
          expect(changeRecipientCountryId).toHaveBeenCalledWith(countryId);
        case 1:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return function UTManualEntryInternationalTransferAllowed() {
    return _ref5.apply(this, arguments);
  };
}();
var UTManualEntryInternationalTransferRender = exports.UTManualEntryInternationalTransferRender = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var transferRecipientCountryId, transferRecipientNumber, allowManualInternationalTransfer, transferCountry;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          transferRecipientCountryId = 'FRA';
          transferRecipientNumber = '6508653454';
          allowManualInternationalTransfer = true;
          wrapper = setup({
            allowManualInternationalTransfer: allowManualInternationalTransfer,
            transferRecipientCountryId: transferRecipientCountryId,
            transferRecipientNumber: transferRecipientNumber
          });
          transferCountry = wrapper.find('PickList[data-sign="transferCountry"]');
          expect(transferCountry.prop('value')).toBe(transferRecipientCountryId);
          expect(transferCountry.find('[role="button"]').text()).toBe(defaultTransferCountryOptions.filter(function (x) {
            return x.countryId === transferRecipientCountryId;
          })[0].countryName);
          expect(wrapper.find('RecipientsInput[data-sign="transferRecipientNumber"]').prop('value')).toBe(transferRecipientNumber);
        case 1:
          return _context4.a(2);
      }
    }, _callee4);
  }));
  return function UTManualEntryInternationalTransferRender() {
    return _ref6.apply(this, arguments);
  };
}();
//# sourceMappingURL=ManualEntryPanel.ut.js.map
