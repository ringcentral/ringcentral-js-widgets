"use strict";

require("core-js/modules/es.array.find");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.string.includes");
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _juno = require("@ringcentral/juno");
var _RequeueCallGroupPanel = require("./RequeueCallGroupPanel");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
  return (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_RequeueCallGroupPanel.RequeueCallGroupPanel, {
    currentLocale: currentLocale,
    goToRequeueCallPage: goToRequeueCallPage,
    searchGroup: searchGroup,
    queueGroups: queueGroups,
    selectedQueueGroupId: selectedQueueGroupId,
    goToRequeueGroupDetailPage: goToRequeueGroupDetailPage
  })));
}
var getGroupItems = function getGroupItems() {
  return wrapper.find('[data-sign="searchResult"]').at(0).find('RcList').at(0).find('RcListItem');
};
var getSearchInput = function getSearchInput() {
  return wrapper.find('RcTextField').at(0).find('input');
};
describe('<RequeueCallGroupPanel />', function () {
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
});
//# sourceMappingURL=RequeueCallGroupPanel.spec.js.map
