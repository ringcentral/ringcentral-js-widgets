"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UTPhoneBookListSearchNoResultCases = exports.UTPhoneBookListSearchCases = exports.UTPhoneBookListSearch = exports.UTPhoneBookContactListDisplayAndHighlight = exports.UTPhoneBookContactCanBeClicked = exports.UTPhoneBookCheckBackButton = exports.UTCheckPhoneBookPanelRender = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.includes.js");
var _phoneNumber = require("@ringcentral-integration/phone-number");
var _juno = require("@ringcentral/juno");
var _enzyme = require("enzyme");
var _react = _interopRequireDefault(require("react"));
var _PhoneBookPanel = require("./PhoneBookPanel");
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
var defaultTransferPhoneBook = [{
  countryId: 'USA',
  destination: '48573454',
  name: 'amy liu'
}, {
  countryId: 'USA',
  destination: '34534534',
  name: 'aermin huang'
}, {
  countryId: 'CAN',
  destination: '435345564',
  name: 'duke'
}, {
  countryId: 'CAN',
  destination: '5435345344',
  name: 'bruce li'
}, {
  countryId: 'USA',
  destination: '345345345',
  name: 'amy li'
}];
var defaultSearchPhoneBook = function defaultSearchPhoneBook(option, text) {
  var _option$name, _option$destination;
  return text && ((_option$name = option.name) === null || _option$name === void 0 ? void 0 : _option$name.toLowerCase().includes(text.toLowerCase())) || ((_option$destination = option.destination) === null || _option$destination === void 0 ? void 0 : _option$destination.toLowerCase().includes(text.toLowerCase()));
};
function setup(_ref) {
  var _ref$goBack = _ref.goBack,
    goBack = _ref$goBack === void 0 ? function () {} : _ref$goBack,
    _ref$searchPhoneBook = _ref.searchPhoneBook,
    searchPhoneBook = _ref$searchPhoneBook === void 0 ? function () {} : _ref$searchPhoneBook,
    _ref$transferPhoneBoo = _ref.transferPhoneBookSelectedIndex,
    transferPhoneBookSelectedIndex = _ref$transferPhoneBoo === void 0 ? defaultSearchPhoneBook : _ref$transferPhoneBoo,
    _ref$changeTransferPh = _ref.changeTransferPhoneBookSelected,
    changeTransferPhoneBookSelected = _ref$changeTransferPh === void 0 ? function () {} : _ref$changeTransferPh,
    _ref$transferPhoneBoo2 = _ref.transferPhoneBook,
    transferPhoneBook = _ref$transferPhoneBoo2 === void 0 ? defaultTransferPhoneBook : _ref$transferPhoneBoo2;
  return (0, _enzyme.mount)(/*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_PhoneBookPanel.PhoneBookPanel, {
    currentLocale: currentLocale,
    goBack: goBack,
    transferPhoneBook: transferPhoneBook,
    transferPhoneBookSelectedIndex: transferPhoneBookSelectedIndex,
    changeTransferPhoneBookSelected: changeTransferPhoneBookSelected,
    searchPhoneBook: searchPhoneBook,
    transferCountryOptions: defaultTransferCountryOptions
  })));
}
var getPhoneContacts = function getPhoneContacts() {
  return wrapper.find('RcList').at(0).find('div[data-sign="phoneContact"]');
};
var getSearchInput = function getSearchInput() {
  return wrapper.find('RcTextField').at(0).find('input');
};
var UTPhoneBookCheckBackButton = exports.UTPhoneBookCheckBackButton = function UTPhoneBookCheckBackButton() {
  var goBack = jest.fn(function () {});
  wrapper = setup({
    goBack: goBack
  });
  wrapper.find('[data-sign="backButton"]').at(0).find('button').simulate('click');
  expect(goBack).toHaveBeenCalled();
};
var UTPhoneBookContactListDisplayAndHighlight = exports.UTPhoneBookContactListDisplayAndHighlight = function UTPhoneBookContactListDisplayAndHighlight() {
  var transferPhoneBookSelectedIndex = 1;
  wrapper = setup({
    transferPhoneBookSelectedIndex: transferPhoneBookSelectedIndex
  });
  var phoneContacts = getPhoneContacts();
  expect(phoneContacts.length).toBe(defaultTransferPhoneBook.length);
  expect(phoneContacts.at(transferPhoneBookSelectedIndex).render().attr('class')).toMatch(/Mui-selected/g);
};
var UTPhoneBookContactCanBeClicked = exports.UTPhoneBookContactCanBeClicked = function UTPhoneBookContactCanBeClicked() {
  var changeTransferPhoneBookSelected = jest.fn(function () {});
  wrapper = setup({
    changeTransferPhoneBookSelected: changeTransferPhoneBookSelected
  });
  var selectIndex = 1;
  getPhoneContacts().at(selectIndex).find('[role="button"]').at(0).simulate('click');
  expect(changeTransferPhoneBookSelected).toHaveBeenCalled();
};
var UTPhoneBookListSearchCases = exports.UTPhoneBookListSearchCases = [{
  title: 'PhoneBook can be searched',
  phoneBookList: [{
    name: 'DukeTest1',
    number: '6509807610'
  }, {
    name: 'EVdemo',
    number: '6508797699'
  }],
  searchText: 'Duke',
  matchedResult: [0]
}, {
  title: 'PhoneBook can be searched',
  phoneBookList: [{
    name: 'DukeTest1',
    number: '6509807610'
  }, {
    name: 'DukeTest2',
    number: '6509807688'
  }],
  searchText: 'ke',
  matchedResult: [0, 1]
}, {
  title: 'PhoneBook can be searched',
  phoneBookList: [{
    name: 'DukeTest1',
    number: '6509807610'
  }, {
    name: 'DukeTest2',
    number: '6509807688'
  }],
  searchText: '650',
  matchedResult: [0, 1]
}, {
  title: 'PhoneBook can be searched',
  phoneBookList: [{
    name: 'DukeTest1',
    number: '6509805610'
  }, {
    name: 'DukeTest2',
    number: '6509807688'
  }],
  searchText: '6509807',
  matchedResult: [1]
},
// { //skip this for it's a bug waiting to be fixed.
//   title: 'PhoneBook can be searched',
//   phoneBookList: [
//     { name: 'DukeTest1', number: '6509807610' },
//     { name: 'DukeTest2', number: '6509807688' },
//   ],
//   searchText: '(650)',
//   matchedResult: [0, 1],
// },
// {
//   title: 'PhoneBook can be searched',
//   phoneBookList: [
//     { name: 'DukeTest1', number: '6509805610' },
//     { name: 'DukeTest2', number: '6509807688' },
//   ],
//   searchText: '(650)9807',
//   matchedResult: [1],
// },
{
  title: 'PhoneBook can be searched',
  phoneBookList: [{
    name: 'DukeTest1',
    number: '6509807610'
  }, {
    name: 'EVdemo',
    number: '6508797699'
  }],
  searchText: 'AA',
  matchedResult: []
}];
var UTPhoneBookListSearchNoResultCases = exports.UTPhoneBookListSearchNoResultCases = [{
  title: 'PhoneBook can be searched',
  phoneBookList: [{
    name: 'DukeTest1',
    number: '6509807610'
  }, {
    name: 'EVdemo',
    number: '6508797699'
  }],
  searchText: 'AA',
  matchedResult: 'No result found for "AA"'
}];
var UTPhoneBookListSearch = exports.UTPhoneBookListSearch = function UTPhoneBookListSearch(_ref2) {
  var phoneBookList = _ref2.phoneBookList,
    searchText = _ref2.searchText,
    matchedResult = _ref2.matchedResult;
  var searchPhoneBook = jest.fn(defaultSearchPhoneBook);
  wrapper = setup({
    searchPhoneBook: searchPhoneBook,
    transferPhoneBook: phoneBookList.map(function (_ref3) {
      var name = _ref3.name,
        number = _ref3.number;
      return {
        name: name,
        destination: number,
        countryId: 'USA'
      };
    })
  });
  var eventObj = {
    target: {
      value: searchText
    }
  };
  getSearchInput().simulate('change', eventObj);
  var phoneContacts = getPhoneContacts();
  if (Array.isArray(matchedResult)) {
    expect(phoneContacts).toHaveLength(matchedResult.length);
    var resultItems = phoneContacts.map(function (el) {
      return el.find('.phoneBookDest').text();
    });
    expect(resultItems).toStrictEqual(matchedResult.map(function (i) {
      return (0, _phoneNumber.format)({
        phoneNumber: phoneBookList[i].number,
        countryCode: 'US'
      });
    }));
  } else {
    expect(phoneContacts).toHaveLength(0);
    expect(wrapper.find('[data-sign="searchResult"]').text()).toBe("No result found for \"".concat(searchText, "\""));
  }
};
var UTCheckPhoneBookPanelRender = exports.UTCheckPhoneBookPanelRender = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref4) {
    var internalOptions, wrapper, dataSign;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          internalOptions = _ref4.internalOptions;
          wrapper = setup({});
          dataSign = {
            'Search bar': 'searchBar',
            'Phone Book recipient list with numbers': 'searchResult'
          };
          expect(wrapper.find("[data-sign=\"".concat(dataSign[internalOptions], "\"]"))).not.toBeUndefined();
        case 1:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function UTCheckPhoneBookPanelRender(_x) {
    return _ref5.apply(this, arguments);
  };
}();
//# sourceMappingURL=PhoneBookPanel.ut.js.map
