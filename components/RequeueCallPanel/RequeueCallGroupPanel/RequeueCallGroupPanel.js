"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequeueCallGroupPanel = void 0;
var _CustomArrowButton = require("@ringcentral-integration/widgets/components/Rcui/CustomArrowButton");
var _react = _interopRequireDefault(require("react"));
var _SelectList = require("../../SelectList");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var RequeueCallGroupPanel = function RequeueCallGroupPanel(_ref) {
  var currentLocale = _ref.currentLocale,
    goToRequeueCallPage = _ref.goToRequeueCallPage,
    searchGroup = _ref.searchGroup,
    queueGroups = _ref.queueGroups,
    selectedQueueGroupId = _ref.selectedQueueGroupId,
    goToRequeueGroupDetailPage = _ref.goToRequeueGroupDetailPage;
  return /*#__PURE__*/_react["default"].createElement(_SelectList.SelectList, {
    searchOption: searchGroup,
    currentLocale: currentLocale,
    onBackClick: goToRequeueCallPage,
    title: _i18n["default"].getString('queueGroup', currentLocale),
    options: queueGroups,
    renderListItem: function renderListItem(_ref2) {
      var option = _ref2.option,
        index = _ref2.index;
      return /*#__PURE__*/_react["default"].createElement(_SelectList.ListItem, {
        onClick: function onClick() {
          return goToRequeueGroupDetailPage({
            groupId: option.gateGroupId
          });
        },
        selected: option.gateGroupId === selectedQueueGroupId,
        key: index
      }, option.groupName, /*#__PURE__*/_react["default"].createElement(_CustomArrowButton.CustomArrowButton, null));
    }
  });
};
exports.RequeueCallGroupPanel = RequeueCallGroupPanel;
//# sourceMappingURL=RequeueCallGroupPanel.js.map
