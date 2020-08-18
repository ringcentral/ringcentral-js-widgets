"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UTCheckAgentListRender = exports.UTCheckAgentListRenderCases = exports.UTCheckTransferAgentSelect = exports.UTCheckTransferAgentSelectCases = exports.UTCheckInternalPanelRender = exports.UTAgentListSearch = exports.UTAgentListSearchCases = exports.UTAgentListDisplayAndHighlight = exports.UTAgentListAutoSync = exports.UTAgentListCheckBackButton = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.string.trim");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.array.find");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.regexp.replace");

var _react = _interopRequireDefault(require("react"));

var _rcui = require("@ringcentral-integration/rcui");

var _enzyme = require("enzyme");

var _InternalPanel = require("./InternalPanel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var wrapper;
var currentLocale = 'en-US';
var transferAgent = {
  agentAuxState: '',
  agentId: '00000',
  agentState: '',
  available: true,
  firstName: 'test',
  lastName: 'test',
  pendingDisp: true,
  stateDuration: 'testState',
  username: 'test username'
};
var defaultTransferAgentList = [_objectSpread(_objectSpread({}, transferAgent), {}, {
  agentId: '10002',
  available: true,
  username: 'amy liu',
  firstName: 'amy',
  lastName: 'liu'
}), _objectSpread(_objectSpread({}, transferAgent), {}, {
  agentId: '10003',
  available: true,
  username: 'susie liu',
  firstName: 'susie',
  lastName: 'liu'
}), _objectSpread(_objectSpread({}, transferAgent), {}, {
  agentId: '10004',
  available: true,
  username: 'geroge lin',
  firstName: 'geroge',
  lastName: 'lin'
}), _objectSpread(_objectSpread({}, transferAgent), {}, {
  agentId: '10005',
  available: false,
  username: 'amy liu',
  firstName: 'amy',
  lastName: 'liu'
})];

var defaultSearchAgent = function defaultSearchAgent(options, text) {
  var _options$firstName, _options$lastName;

  var firstName = (_options$firstName = options.firstName) !== null && _options$firstName !== void 0 ? _options$firstName : '';
  var lastName = (_options$lastName = options.lastName) !== null && _options$lastName !== void 0 ? _options$lastName : '';
  var blankRegex = /\s+/g;
  var name = "".concat(firstName).concat(lastName).replace(blankRegex, '').toLowerCase();
  return text && name.includes(text.replace(blankRegex, '').toLowerCase());
};

function setup(_ref) {
  var _ref$goBack = _ref.goBack,
      goBack = _ref$goBack === void 0 ? function () {} : _ref$goBack,
      _ref$transferAgentLis = _ref.transferAgentListUpdateTTL,
      transferAgentListUpdateTTL = _ref$transferAgentLis === void 0 ? 100 : _ref$transferAgentLis,
      _ref$fetchAgentList = _ref.fetchAgentList,
      fetchAgentList = _ref$fetchAgentList === void 0 ? function () {} : _ref$fetchAgentList,
      _ref$transferAgentId = _ref.transferAgentId,
      transferAgentId = _ref$transferAgentId === void 0 ? '' : _ref$transferAgentId,
      _ref$changeTransferAg = _ref.changeTransferAgentId,
      changeTransferAgentId = _ref$changeTransferAg === void 0 ? function () {} : _ref$changeTransferAg,
      _ref$searchAgent = _ref.searchAgent,
      searchAgent = _ref$searchAgent === void 0 ? defaultSearchAgent : _ref$searchAgent,
      _ref$transferAgentLis2 = _ref.transferAgentList,
      transferAgentList = _ref$transferAgentLis2 === void 0 ? defaultTransferAgentList : _ref$transferAgentLis2;
  return (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_rcui.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_InternalPanel.InternalPanel, {
    currentLocale: currentLocale,
    goBack: goBack,
    transferAgentList: transferAgentList,
    transferAgentListUpdateTTL: transferAgentListUpdateTTL,
    fetchAgentList: fetchAgentList,
    transferAgentId: transferAgentId,
    changeTransferAgentId: changeTransferAgentId,
    searchAgent: searchAgent
  })));
}

var getAgentItems = function getAgentItems() {
  return wrapper.find('RcList').at(0).find('div[data-sign="agentItem"]');
};

var getSearchInput = function getSearchInput() {
  return wrapper.find('RcOutlineTextField').at(0).find('input');
};

var UTAgentListCheckBackButton = function UTAgentListCheckBackButton() {
  var goBack = jest.fn(function () {});
  wrapper = setup({
    goBack: goBack
  });
  wrapper.find('[data-sign="backButton"]').at(0).find('button').simulate('click');
  expect(goBack).toBeCalled();
};

exports.UTAgentListCheckBackButton = UTAgentListCheckBackButton;

var UTAgentListAutoSync = function UTAgentListAutoSync() {
  jest.useFakeTimers();
  var fetchAgentList = jest.fn(function () {});
  var transferAgentListUpdateTTL = 100;
  wrapper = setup({
    fetchAgentList: fetchAgentList,
    transferAgentListUpdateTTL: transferAgentListUpdateTTL
  });
  jest.advanceTimersByTime(210);
  expect(fetchAgentList).toHaveBeenCalledTimes(2);
  jest.useRealTimers();
};

exports.UTAgentListAutoSync = UTAgentListAutoSync;

var UTAgentListDisplayAndHighlight = function UTAgentListDisplayAndHighlight() {
  var transferAgentId = '10003';
  wrapper = setup({
    transferAgentId: transferAgentId
  });
  var agentItems = getAgentItems();
  expect(agentItems.length).toBe(defaultTransferAgentList.length);
  var selectedIndex = defaultTransferAgentList.findIndex(function (x) {
    return x.agentId === transferAgentId;
  });
  expect(agentItems.at(selectedIndex).render().attr('class')).toMatch(/Mui-selected/g);
};

exports.UTAgentListDisplayAndHighlight = UTAgentListDisplayAndHighlight;
var UTAgentListSearchCases = [{
  internalList: ['DukeTest1', 'DukeTest2', 'EV demo'],
  searchText: 'Duke',
  matchedResult: ['DukeTest1', 'DukeTest2']
}, {
  internalList: ['DukeTest1', 'DukeTest2', 'EV demo'],
  searchText: '2',
  matchedResult: ['DukeTest2']
}, {
  internalList: ['DukeTest1', 'DukeTest2', 'EV demo'],
  searchText: 'AA',
  matchedResult: 'No result found for "AA"'
}];
exports.UTAgentListSearchCases = UTAgentListSearchCases;

var UTAgentListSearch = function UTAgentListSearch(_ref2) {
  var internalList = _ref2.internalList,
      searchText = _ref2.searchText,
      matchedResult = _ref2.matchedResult;
  var searchAgent = jest.fn(defaultSearchAgent);
  wrapper = setup({
    searchAgent: searchAgent,
    transferAgentList: internalList.map(function (name) {
      return {
        firstName: name,
        lastName: ''
      };
    })
  });
  var eventObj = {
    target: {
      value: searchText
    }
  };
  getSearchInput().simulate('change', eventObj);
  var agentItems = getAgentItems();

  if (Array.isArray(matchedResult)) {
    expect(agentItems).toHaveLength(matchedResult.length);
    var resultItems = agentItems.map(function (el) {
      return el.find('.agentName').text().trim();
    });
    expect(resultItems).toStrictEqual(matchedResult);
  } else {
    expect(agentItems).toHaveLength(0);
    expect(wrapper.find('[data-sign="searchResult"]').text()).toBe("No result found for \"".concat(searchText, "\""));
  }
};

exports.UTAgentListSearch = UTAgentListSearch;

var UTCheckInternalPanelRender = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref3) {
    var internalOptions, wrapper, dataSign;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            internalOptions = _ref3.internalOptions;
            wrapper = setup({});
            dataSign = {
              'Search bar': 'searchBar',
              'internal recipient list': 'searchResult'
            };
            expect(wrapper.find("[data-sign=\"".concat(dataSign[internalOptions], "\"]"))).not.toBeUndefined();

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function UTCheckInternalPanelRender(_x) {
    return _ref4.apply(this, arguments);
  };
}();

exports.UTCheckInternalPanelRender = UTCheckInternalPanelRender;
var UTCheckTransferAgentSelectCases = [{
  title: 'User can select available agent to transfer',
  internalItem: 'DukeTest1',
  available: true,
  recipientDisplay: 'DukeTest1'
}, {
  title: 'User can select unavailable agent to transfer',
  internalItem: 'DukeTest2',
  available: false,
  recipientDisplay: 'DukeTest2'
}];
exports.UTCheckTransferAgentSelectCases = UTCheckTransferAgentSelectCases;

var UTCheckTransferAgentSelect = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref5) {
    var internalItem, available, recipientDisplay, changeTransferAgentId, agentId, selectIndex, agentItems;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            internalItem = _ref5.internalItem, available = _ref5.available, recipientDisplay = _ref5.recipientDisplay;
            changeTransferAgentId = jest.fn(function () {});
            agentId = '10003';
            wrapper = setup({
              changeTransferAgentId: changeTransferAgentId,
              transferAgentList: [{
                agentId: agentId,
                firstName: internalItem,
                lastName: '',
                available: available
              }]
            });
            selectIndex = 0;
            agentItems = getAgentItems();
            agentItems.at(selectIndex).find('[role="button"]').at(0).simulate('click');
            expect(changeTransferAgentId).toBeCalledWith(agentId);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function UTCheckTransferAgentSelect(_x2) {
    return _ref6.apply(this, arguments);
  };
}();

exports.UTCheckTransferAgentSelect = UTCheckTransferAgentSelect;
var UTCheckAgentListRenderCases = [{
  title: 'internal recipient status',
  agentState: 'Available',
  stateColor: 'green',
  available: true,
  recipient: 'DukeAccount1',
  availableStatus: 'Available',
  statusColor: 'green'
}, {
  title: 'internal recipient status',
  agentState: 'On Break',
  stateColor: 'gray',
  available: false,
  recipient: 'AccountDuke2',
  availableStatus: 'Unavailable',
  statusColor: 'gray'
}, {
  title: 'internal recipient status',
  agentState: 'Training',
  stateColor: 'yellow',
  available: true,
  recipient: 'AccountDuke2',
  availableStatus: 'Available',
  statusColor: 'green'
}, {
  title: 'internal recipient status',
  agentState: 'Lunch',
  stateColor: 'gray',
  available: false,
  recipient: 'AccountDuke2',
  availableStatus: 'Unavailable',
  statusColor: 'gray'
}, {
  title: 'internal recipient status',
  agentState: 'Working',
  stateColor: 'yellow',
  available: true,
  recipient: 'AccountDuke2',
  availableStatus: 'Available',
  statusColor: 'green'
}, {
  title: 'internal recipient status',
  agentState: 'Allow Offhook',
  stateColor: 'red',
  available: false,
  recipient: 'AccountDuke2',
  availableStatus: 'Unavailable',
  statusColor: 'gray'
}, {
  title: 'internal recipient status',
  agentState: 'Disconnect Offhook',
  stateColor: 'red',
  available: false,
  recipient: 'AccountDuke2',
  availableStatus: 'Unavailable',
  statusColor: 'gray'
}, {
  title: 'internal recipient status',
  agentState: 'Away',
  stateColor: 'gray',
  available: false,
  recipient: 'AccountDuke2',
  availableStatus: 'Unavailable',
  statusColor: 'gray'
}];
exports.UTCheckAgentListRenderCases = UTCheckAgentListRenderCases;

var UTCheckAgentListRender = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref7) {
    var agentState, available, recipient, availableStatus, statusColor, wrapper, agentItem;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            agentState = _ref7.agentState, available = _ref7.available, recipient = _ref7.recipient, availableStatus = _ref7.availableStatus, statusColor = _ref7.statusColor;
            wrapper = setup({
              transferAgentList: [{
                agentState: agentState,
                firstName: recipient,
                lastName: '',
                available: available
              }]
            });
            agentItem = wrapper.find('[data-sign="agentItem"]');
            expect(agentItem.find('.agentName').text().trim()).toBe(recipient);
            expect(agentItem.find('.statusText').text().trim()).toBe(availableStatus);

            if (statusColor === 'green') {
              expect(agentItem.find('.available')).toHaveLength(1);
            } else if (statusColor === 'gray') {
              expect(agentItem.find('.unavailable')).toHaveLength(1);
            }

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function UTCheckAgentListRender(_x3) {
    return _ref8.apply(this, arguments);
  };
}();

exports.UTCheckAgentListRender = UTCheckAgentListRender;
//# sourceMappingURL=InternalPanel.ut.js.map
