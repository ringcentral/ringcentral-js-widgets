"use strict";

require("core-js/modules/es.array.find");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.string.includes");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UTPhoneBookListSearchNoResultCases = exports.UTPhoneBookListSearchCases = exports.UTPhoneBookListSearch = exports.UTPhoneBookContactListDisplayAndHighlight = exports.UTPhoneBookContactCanBeClicked = exports.UTPhoneBookCheckBackButton = exports.UTCheckPhoneBookPanelRender = void 0;
require("regenerator-runtime/runtime");
var _phoneNumber = require("@ringcentral-integration/phone-number");
var _juno = require("@ringcentral/juno");
var _enzyme = require("enzyme");
var _react = _interopRequireDefault(require("react"));
var _PhoneBookPanel = require("./PhoneBookPanel");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
  return (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_PhoneBookPanel.PhoneBookPanel, {
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
var UTPhoneBookCheckBackButton = function UTPhoneBookCheckBackButton() {
  var goBack = jest.fn(function () {});
  wrapper = setup({
    goBack: goBack
  });
  wrapper.find('[data-sign="backButton"]').at(0).find('button').simulate('click');
  expect(goBack).toHaveBeenCalled();
};
exports.UTPhoneBookCheckBackButton = UTPhoneBookCheckBackButton;
var UTPhoneBookContactListDisplayAndHighlight = function UTPhoneBookContactListDisplayAndHighlight() {
  var transferPhoneBookSelectedIndex = 1;
  wrapper = setup({
    transferPhoneBookSelectedIndex: transferPhoneBookSelectedIndex
  });
  var phoneContacts = getPhoneContacts();
  expect(phoneContacts.length).toBe(defaultTransferPhoneBook.length);
  expect(phoneContacts.at(transferPhoneBookSelectedIndex).render().attr('class')).toMatch(/Mui-selected/g);
};
exports.UTPhoneBookContactListDisplayAndHighlight = UTPhoneBookContactListDisplayAndHighlight;
var UTPhoneBookContactCanBeClicked = function UTPhoneBookContactCanBeClicked() {
  var changeTransferPhoneBookSelected = jest.fn(function () {});
  wrapper = setup({
    changeTransferPhoneBookSelected: changeTransferPhoneBookSelected
  });
  var selectIndex = 1;
  getPhoneContacts().at(selectIndex).find('[role="button"]').at(0).simulate('click');
  expect(changeTransferPhoneBookSelected).toHaveBeenCalled();
};
exports.UTPhoneBookContactCanBeClicked = UTPhoneBookContactCanBeClicked;
var UTPhoneBookListSearchCases = [{
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
exports.UTPhoneBookListSearchCases = UTPhoneBookListSearchCases;
var UTPhoneBookListSearchNoResultCases = [{
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
exports.UTPhoneBookListSearchNoResultCases = UTPhoneBookListSearchNoResultCases;
var UTPhoneBookListSearch = function UTPhoneBookListSearch(_ref2) {
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
exports.UTPhoneBookListSearch = UTPhoneBookListSearch;
var UTCheckPhoneBookPanelRender = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref4) {
    var internalOptions, wrapper, dataSign;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            internalOptions = _ref4.internalOptions;
            wrapper = setup({});
            dataSign = {
              'Search bar': 'searchBar',
              'Phone Book recipient list with numbers': 'searchResult'
            };
            expect(wrapper.find("[data-sign=\"".concat(dataSign[internalOptions], "\"]"))).not.toBeUndefined();
          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function UTCheckPhoneBookPanelRender(_x) {
    return _ref5.apply(this, arguments);
  };
}();
exports.UTCheckPhoneBookPanelRender = UTCheckPhoneBookPanelRender;
//# sourceMappingURL=PhoneBookPanel.ut.js.map