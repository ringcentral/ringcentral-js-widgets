"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequeueCallGroupPanel = void 0;

require("core-js/modules/es6.array.map");

var _rcui = require("@ringcentral-integration/rcui");

var _react = _interopRequireDefault(require("react"));

var _SelectList = require("ringcentral-widgets/components/SelectList");

var _CustomArrowButton = require("ringcentral-widgets/components/Rcui/CustomArrowButton");

var _ListItemWithScrollCheck = require("../../ListItemWithScrollCheck");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RequeueCallGroupPanel = function RequeueCallGroupPanel(_ref) {
  var currentLocale = _ref.currentLocale,
      goToRequeueCallPage = _ref.goToRequeueCallPage,
      searchGroup = _ref.searchGroup,
      queueGroups = _ref.queueGroups,
      selectedQueueGroupId = _ref.selectedQueueGroupId,
      goToRequeueGroupDetailPage = _ref.goToRequeueGroupDetailPage;
  return /*#__PURE__*/_react["default"].createElement(_SelectList.SelectListBasicWithScrollCheck, {
    listContainerClassName: _styles["default"].listContainer,
    backHeaderClassName: _styles["default"].backHeader,
    selectListBasicClassName: _styles["default"].selectListBasic,
    title: _i18n["default"].getString('queueGroup', currentLocale),
    placeholder: _i18n["default"].getString('search', currentLocale),
    options: queueGroups,
    renderListView: function renderListView(queueGroups, type, filter, scrollCheck) {
      return queueGroups.length ? /*#__PURE__*/_react["default"].createElement(_rcui.RcList, null, queueGroups.map(function (queueGroup, i) {
        return /*#__PURE__*/_react["default"].createElement(_ListItemWithScrollCheck.ListItemWithScrollCheck, {
          onClick: function onClick() {
            return goToRequeueGroupDetailPage({
              groupId: queueGroup.gateGroupId
            });
          },
          className: _styles["default"].item,
          selected: queueGroup.gateGroupId === selectedQueueGroupId,
          key: i,
          scrollCheck: scrollCheck
        }, queueGroup.groupName, /*#__PURE__*/_react["default"].createElement(_CustomArrowButton.CustomArrowButton, null));
      })) : null;
    },
    onBackClick: goToRequeueCallPage,
    searchOption: searchGroup,
    currentLocale: currentLocale,
    open: true
  });
};

exports.RequeueCallGroupPanel = RequeueCallGroupPanel;
//# sourceMappingURL=RequeueCallGroupPanel.js.map
