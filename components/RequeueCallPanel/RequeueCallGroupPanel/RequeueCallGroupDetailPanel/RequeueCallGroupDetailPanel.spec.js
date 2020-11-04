"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.find");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _react = _interopRequireDefault(require("react"));

var _juno = require("@ringcentral/juno");

var _enzyme = require("enzyme");

var _RequeueCallGroupDetailPanel = require("./RequeueCallGroupDetailPanel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var wrapper;
var currentLocale = 'en-US';

var searchGate = function searchGate(_ref, text) {
  var gateName = _ref.gateName;
  return gateName && text && gateName.toLowerCase().includes(text.toLowerCase());
};

var defalutSelectedQueueGroup = {
  groupName: 'group3432',
  gates: [{
    gateId: '40520',
    gateName: 'DukeTest1'
  }, {
    gateId: '40521',
    gateName: 'DukeTest2'
  }, {
    gateId: '40522',
    gateName: 'EVdemo'
  }]
};

function setup() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$goBack = _ref2.goBack,
      goBack = _ref2$goBack === void 0 ? function () {} : _ref2$goBack,
      _ref2$selectedQueueGr = _ref2.selectedQueueGroup,
      selectedQueueGroup = _ref2$selectedQueueGr === void 0 ? defalutSelectedQueueGroup : _ref2$selectedQueueGr,
      _ref2$selectedGateInd = _ref2.selectedGateIndex,
      selectedGateIndex = _ref2$selectedGateInd === void 0 ? 0 : _ref2$selectedGateInd,
      _ref2$submitSelection = _ref2.submitSelection,
      submitSelection = _ref2$submitSelection === void 0 ? function () {} : _ref2$submitSelection;

  var selectedGateId = defalutSelectedQueueGroup.gates[selectedGateIndex] ? defalutSelectedQueueGroup.gates[selectedGateIndex].gateId : '';
  return (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_RequeueCallGroupDetailPanel.RequeueCallGroupDetailPanel, {
    currentLocale: currentLocale,
    goBack: goBack,
    searchGate: searchGate,
    selectedQueueGroup: selectedQueueGroup,
    selectedGateId: selectedGateId,
    submitSelection: submitSelection
  })));
}

var getSearchInput = function getSearchInput() {
  return wrapper.find('RcOutlineTextField').at(0).find('input');
};

var getDetailItems = function getDetailItems() {
  return wrapper.find('RcList').at(0).find('RcListItem');
};

var getSubmitButton = function getSubmitButton() {
  return wrapper.find('RcButton[data-sign="select-group-item"]').at(0).find('button');
};

describe('<RequeueCallGroupPanel />', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          it('Can display selected Queue Group Name and all the Queues', function () {
            wrapper = setup({});
            expect(wrapper.find('BackHeader').at(0).prop('title')).toBe(defalutSelectedQueueGroup.groupName);
            expect(getDetailItems().length).toBe(3);
          });
          it('Default with select Queue and enabled Select Button', function () {
            var selectedGateIndex = 1;
            wrapper = setup({
              selectedGateIndex: selectedGateIndex
            });
            expect(getDetailItems().at(selectedGateIndex).prop('selected')).toBe(true);
            expect(getSubmitButton().prop('disabled')).toBe(false);
          });
          it('When user click Back Button and function goBack will be called', function () {
            var goBack = jest.fn(function () {});
            wrapper = setup({
              goBack: goBack
            });
            wrapper.find('[data-sign="backButton"]').at(0).find('button').simulate('click');
            expect(goBack).toBeCalled();
          });
          it('When user select a queue, the queue will be highlighted, then user click the select button, submitSelection will be called', function () {
            var selectedGateIndex = 1;
            var submitSelection = jest.fn(function () {});
            wrapper = setup({
              submitSelection: submitSelection
            });
            getDetailItems().at(selectedGateIndex).find('RcListItem').find('div').simulate('click');
            expect(getDetailItems().at(selectedGateIndex).find('RcListItem').prop('selected')).toBe(true);
            var submitButton = getSubmitButton();
            expect(submitButton.prop('disabled')).toBe(false);
            submitButton.simulate('click');
            var selectedGateId = defalutSelectedQueueGroup.gates[selectedGateIndex].gateId;
            expect(submitSelection).toBeCalledWith(selectedGateId);
          });
          it("When user select no queue, the Select Button should be disabled and submitSelection shouldn't be called", function () {
            var selectedGateIndex = -1;
            var submitSelection = jest.fn(function () {});
            wrapper = setup({
              submitSelection: submitSelection,
              selectedGateIndex: selectedGateIndex
            });
            expect(wrapper.find('RcList').at(0).find('ListItemWithScrollCheck[selected=true]').length).toBe(0);
            var submitButton = getSubmitButton();
            expect(submitButton.prop('disabled')).toBe(true);
            submitButton.simulate('click');
            expect(submitSelection).not.toBeCalled();
          });
          it('Can search Requeue Queue', function () {
            wrapper = setup();
            var eventObj = {
              target: {
                value: 'Duke'
              }
            };
            getSearchInput().simulate('change', eventObj);
            expect(getDetailItems().length).toBe(2);
          });
          it('Can search Requeue Queue, but with no result', function () {
            wrapper = setup();
            var searchText = 'Amy';
            var eventObj = {
              target: {
                value: searchText
              }
            };
            getSearchInput().simulate('change', eventObj);
            expect(getDetailItems().length).toBe(0);
            expect(wrapper.find('[data-sign="searchResult"]').at(0).find('div').at(0).text()).toBe("No result found for \"".concat(searchText, "\""));
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
//# sourceMappingURL=RequeueCallGroupDetailPanel.spec.js.map
