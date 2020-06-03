"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.find");

require("regenerator-runtime/runtime");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _react = _interopRequireDefault(require("react"));

var _rcui = require("@ringcentral-integration/rcui");

var _enzyme = require("enzyme");

var _RequeueCallGroupPanel = require("./RequeueCallGroupPanel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var wrapper;
var currentLocale = 'en-US';

var searchGroup = function searchGroup(_ref, text) {
  var groupName = _ref.groupName;
  return groupName && text && groupName.toLowerCase().includes(text.toLowerCase());
};

var defaultQueueGroups = [{
  gateGroupId: '50520',
  groupName: 'DukeTest1'
}, {
  gateGroupId: '50521',
  groupName: 'DukeTest2'
}, {
  gateGroupId: '50522',
  groupName: 'EVdemo'
}];

function setup() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$queueGroups = _ref2.queueGroups,
      queueGroups = _ref2$queueGroups === void 0 ? defaultQueueGroups : _ref2$queueGroups,
      _ref2$selectedQueueGr = _ref2.selectedQueueGroupIndex,
      selectedQueueGroupIndex = _ref2$selectedQueueGr === void 0 ? 0 : _ref2$selectedQueueGr,
      _ref2$goToRequeueGrou = _ref2.goToRequeueGroupDetailPage,
      goToRequeueGroupDetailPage = _ref2$goToRequeueGrou === void 0 ? function () {} : _ref2$goToRequeueGrou,
      _ref2$goToRequeueCall = _ref2.goToRequeueCallPage,
      goToRequeueCallPage = _ref2$goToRequeueCall === void 0 ? function () {} : _ref2$goToRequeueCall;

  var selectedQueueGroupId = queueGroups[selectedQueueGroupIndex] ? queueGroups[selectedQueueGroupIndex].gateGroupId : '';
  return (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_rcui.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_RequeueCallGroupPanel.RequeueCallGroupPanel, {
    currentLocale: currentLocale,
    goToRequeueCallPage: goToRequeueCallPage,
    searchGroup: searchGroup,
    queueGroups: queueGroups,
    selectedQueueGroupId: selectedQueueGroupId,
    goToRequeueGroupDetailPage: goToRequeueGroupDetailPage
  })));
}

afterEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          wrapper.unmount();

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));

var getGroupItems = function getGroupItems() {
  return wrapper.find('[data-sign="searchResult"]').at(0).find('ListItemWithScrollCheck');
};

var getSearchInput = function getSearchInput() {
  return wrapper.find('RcOutlineTextField').at(0).find('input');
};

describe('<RequeueCallGroupPanel />', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          it('Has no available Requeue Group', function () {
            wrapper = setup({
              queueGroups: []
            });
            expect(wrapper.find('[data-sign="searchResult"]').at(0).find('RcList').length).toBe(0);
          });
          it('Can display all the Requeue Groups correctly', function () {
            wrapper = setup({});
            expect(getGroupItems().length).toBe(3);
          });
          it('Requeue Groups has default select Queue Group Id', function () {
            var selectedQueueGroupIndex = 1;
            wrapper = setup({
              selectedQueueGroupIndex: selectedQueueGroupIndex
            });
            expect(getGroupItems().at(selectedQueueGroupIndex).find('div').hasClass('Mui-selected')).toBe(true);
          });
          it('When click the Back Button of the header, can redirct to RequeueCallPage', function () {
            var goToRequeueCallPage = jest.fn(function () {});
            wrapper = setup({
              goToRequeueCallPage: goToRequeueCallPage
            });
            wrapper.find('[data-sign="backButton"]').at(0).find('button').simulate('click');
            expect(goToRequeueCallPage).toBeCalled();
          });
          it('When click Requeue Group, can redirct to RequeueGroupDetailPage', function () {
            var goToRequeueGroupDetailPage = jest.fn(function () {});
            wrapper = setup({
              goToRequeueGroupDetailPage: goToRequeueGroupDetailPage
            });
            var selectIndex = 1;
            getGroupItems().at(selectIndex).find('[role="button"]').simulate('click');
            expect(goToRequeueGroupDetailPage).toBeCalledWith({
              groupId: defaultQueueGroups[selectIndex].gateGroupId
            });
          });
          it('Can search Requeue Group', function () {
            wrapper = setup();
            var eventObj = {
              target: {
                value: 'Duke'
              }
            };
            getSearchInput().simulate('change', eventObj);
            expect(getGroupItems().length).toBe(2);
          });
          it('Can search Requeue Group, but with no result', function () {
            wrapper = setup();
            var searchText = 'Amy';
            var eventObj = {
              target: {
                value: searchText
              }
            };
            getSearchInput().simulate('change', eventObj);
            expect(getGroupItems().length).toBe(0);
            expect(wrapper.find('[data-sign="searchResult"]').at(0).find('div').at(0).text()).toBe("No result found for \"".concat(searchText, "\""));
          });

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
//# sourceMappingURL=RequeueCallGroupPanel.spec.js.map
