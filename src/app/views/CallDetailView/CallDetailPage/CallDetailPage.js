"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCallDetailPageContent = exports.CallDetailPage = void 0;
var _components = require("@ringcentral-integration/micro-core/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _components2 = require("@ringcentral-integration/next-widgets/components");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var useCallDetailPageContent = exports.useCallDetailPageContent = function useCallDetailPageContent(_ref) {
  var currentCallLog = _ref.currentCallLog,
    goBack = _ref.goBack,
    useCallHistoryItemInfo = _ref.useCallHistoryItemInfo,
    useActionsHandler = _ref.useActionsHandler;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var _useCallHistoryItemIn = useCallHistoryItemInfo(currentCallLog, {
      // TODO: support select contact
      selectIndex: 0,
      variant: 'detail'
    }),
    info = _useCallHistoryItemIn.info,
    actions = _useCallHistoryItemIn.actions;
  var onAction = useActionsHandler(currentCallLog, info, 'Call history detail page');
  var DisplayName = info.DisplayName,
    displayPhoneNumber = info.displayPhoneNumber,
    formattedPhoneNumber = info.formattedPhoneNumber,
    myCallerIdTitle = info.myCallerIdTitle,
    myCallerId = info.myCallerId,
    Avatar = info.Avatar,
    startTime = info.startTime,
    Status = info.Status,
    callQueueName = info.callQueueName,
    isConferenceCall = info.isConferenceCall;
  var buttons = (0, _components2.useHistoryActionButtons)(actions, function (type) {
    onAction(type);
  });
  var meLabel = callQueueName ? '' : "(".concat(t('me'), ")");
  return {
    header: /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-[72px] flex items-center px-2 gap-1 pt-2"
    }, /*#__PURE__*/_react["default"].createElement(_components2.PageHeaderBackButton, {
      onClick: goBack,
      className: "flex-none"
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex gap-2 items-center flex-auto overflow-hidden",
      "data-sign": "contactDetail"
    }, /*#__PURE__*/_react["default"].createElement(Avatar, {
      size: "large"
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "ml-1 flex flex-col flex-auto overflow-hidden"
    }, /*#__PURE__*/_react["default"].createElement("h2", {
      className: "text-neutral-b0 truncate typography-subtitle flex items-center gap-1",
      "data-sign": "displayName"
    }, /*#__PURE__*/_react["default"].createElement(DisplayName, {
      displayControl: {
        maybe: true,
        matchCounts: true
      }
    })), !isConferenceCall && /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex gap-1 items-center",
      "data-sign": "displayNumber"
    }, /*#__PURE__*/_react["default"].createElement("p", {
      className: "typography-descriptor text-neutral-b2 truncate",
      title: displayPhoneNumber
    }, displayPhoneNumber), formattedPhoneNumber && /*#__PURE__*/_react["default"].createElement(_components.CopyIconButtonSpring, {
      text: formattedPhoneNumber
    })))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex gap-1 items-center flex-none"
    }, /*#__PURE__*/_react["default"].createElement(_components2.ActionMenuList, {
      buttons: buttons,
      displayCount: 2,
      variant: "plain",
      propsMap: {
        all: {
          variant: 'contained'
        }
      },
      moreButtonProps: {
        variant: 'contained'
      }
    }))),
    info: /*#__PURE__*/_react["default"].createElement("div", {
      className: "px-4 py-2",
      "data-sign": "callDetailInfo"
    }, /*#__PURE__*/_react["default"].createElement(_springUi.Block, {
      className: "mb-2"
    }, /*#__PURE__*/_react["default"].createElement(_springUi.BlockHeader, null, /*#__PURE__*/_react["default"].createElement("span", {
      className: "typography-descriptorMini"
    }, myCallerIdTitle), /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-neutral-b2 typography-mainText"
    }, myCallerId, " ", meLabel))), /*#__PURE__*/_react["default"].createElement(_springUi.Block, {
      className: "mb-2"
    }, /*#__PURE__*/_react["default"].createElement(_springUi.BlockHeader, {
      "data-sign": "time-and-status"
    }, /*#__PURE__*/_react["default"].createElement("p", {
      className: "typography-descriptorMini"
    }, startTime), Status && /*#__PURE__*/_react["default"].createElement("div", {
      className: "typography-mainText"
    }, /*#__PURE__*/_react["default"].createElement(Status, null)))))
  };
};
var CallDetailPage = exports.CallDetailPage = function CallDetailPage(props) {
  var children = props.children,
    footer = props.footer;
  var _useCallDetailPageCon = useCallDetailPageContent(props),
    header = _useCallDetailPageCon.header,
    info = _useCallDetailPageCon.info;
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "CallDetailPage",
    className: "flex flex-col h-full"
  }, /*#__PURE__*/_react["default"].createElement(_components.AppHeaderNav, {
    override: true,
    resetImmediately: true
  }, header), info, /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "log-notes-transcript-section",
    className: "flex-1 flex flex-col"
  }, children), /*#__PURE__*/_react["default"].createElement(_components.AppFooterNav, null, footer));
};
CallDetailPage.displayName = 'CallDetailPage';
//# sourceMappingURL=CallDetailPage.js.map
