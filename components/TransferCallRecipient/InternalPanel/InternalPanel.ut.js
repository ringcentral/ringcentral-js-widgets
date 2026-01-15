"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UTCheckTransferAgentSelectCases = exports.UTCheckTransferAgentSelect = exports.UTCheckInternalPanelRender = exports.UTCheckAgentListRenderCases = exports.UTCheckAgentListRender = exports.UTAgentListSearchCases = exports.UTAgentListSearch = exports.UTAgentListDisplayAndHighlight = exports.UTAgentListCheckBackButton = exports.UTAgentListAutoSync = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.trim.js");
var _juno = require("@ringcentral/juno");
var _enzyme = require("enzyme");
var _react = _interopRequireDefault(require("react"));
var _InternalPanel = require("./InternalPanel");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
  return (0, _enzyme.mount)(/*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_InternalPanel.InternalPanel, {
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
  return wrapper.find('RcTextField').at(0).find('input');
};
var UTAgentListCheckBackButton = exports.UTAgentListCheckBackButton = function UTAgentListCheckBackButton() {
  var goBack = jest.fn(function () {});
  wrapper = setup({
    goBack: goBack
  });
  wrapper.find('[data-sign="backButton"]').at(0).find('button').simulate('click');
  expect(goBack).toHaveBeenCalled();
};
var UTAgentListAutoSync = exports.UTAgentListAutoSync = function UTAgentListAutoSync() {
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
var UTAgentListDisplayAndHighlight = exports.UTAgentListDisplayAndHighlight = function UTAgentListDisplayAndHighlight() {
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
var UTAgentListSearchCases = exports.UTAgentListSearchCases = [{
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
var UTAgentListSearch = exports.UTAgentListSearch = function UTAgentListSearch(_ref2) {
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
var UTCheckInternalPanelRender = exports.UTCheckInternalPanelRender = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref3) {
    var internalOptions, wrapper, dataSign;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          internalOptions = _ref3.internalOptions;
          wrapper = setup({});
          dataSign = {
            'Search bar': 'searchBar',
            'internal recipient list': 'searchResult'
          };
          expect(wrapper.find("[data-sign=\"".concat(dataSign[internalOptions], "\"]"))).not.toBeUndefined();
        case 1:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function UTCheckInternalPanelRender(_x) {
    return _ref4.apply(this, arguments);
  };
}();
var UTCheckTransferAgentSelectCases = exports.UTCheckTransferAgentSelectCases = [{
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
var UTCheckTransferAgentSelect = exports.UTCheckTransferAgentSelect = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref5) {
    var internalItem, available, recipientDisplay, changeTransferAgentId, agentId, selectIndex, agentItems;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
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
          expect(changeTransferAgentId).toHaveBeenCalledWith(agentId);
        case 1:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function UTCheckTransferAgentSelect(_x2) {
    return _ref6.apply(this, arguments);
  };
}();
var UTCheckAgentListRenderCases = exports.UTCheckAgentListRenderCases = [{
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
var UTCheckAgentListRender = exports.UTCheckAgentListRender = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(_ref7) {
    var agentState, available, recipient, availableStatus, statusColor, wrapper, agentItem;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
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
        case 1:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return function UTCheckAgentListRender(_x3) {
    return _ref8.apply(this, arguments);
  };
}();
//# sourceMappingURL=InternalPanel.ut.js.map
