"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _rcui = require("@ringcentral-integration/rcui");

var _react = _interopRequireDefault(require("react"));

var _ShinyBar = require("../LogBasicInfoV2/ShinyBar");

var _CallIcon = _interopRequireDefault(require("./CallIcon"));

var _CallInfoList = _interopRequireDefault(require("./CallInfoList"));

var _CallSubject = _interopRequireDefault(require("./CallSubject"));

var _FollowInfo = _interopRequireDefault(require("./FollowInfo"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BasicCallInfo = function BasicCallInfo(_ref) {
  var _ref$call = _ref.call,
      matchName = _ref$call.matchName,
      isInbound = _ref$call.isInbound,
      isRinging = _ref.isRinging,
      followInfos = _ref.followInfos,
      callInfos = _ref.callInfos,
      status = _ref.status;
  return _react["default"].createElement("div", {
    "data-sign": "basicCallInfo",
    className: _styles["default"].container
  }, _react["default"].createElement(_rcui.RcExpansionPanel, {
    square: true,
    classes: {
      root: _styles["default"].root
    }
  }, _react["default"].createElement(_rcui.RcExpansionPanelSummary, {
    classes: {
      root: _styles["default"].root
    },
    IconButtonProps: {
      size: 'small'
    },
    expandIcon: _react["default"].createElement(_rcui.RcIcon, {
      size: "medium",
      icon: "arrow_down",
      color: ['grey', 500]
    })
  }, _react["default"].createElement(_CallIcon["default"], {
    isInbound: isInbound
  }), _react["default"].createElement("div", {
    className: _styles["default"].mainInfo
  }, _react["default"].createElement(_CallSubject["default"], {
    subject: matchName
  }), _react["default"].createElement(_FollowInfo["default"], {
    infoList: followInfos,
    splitSign: "|"
  }))), _react["default"].createElement(_rcui.RcExpansionPanelDetails, {
    classes: {
      root: _styles["default"].detiailRoot
    }
  }, _react["default"].createElement(_CallInfoList["default"], {
    callInfos: callInfos
  }))), _react["default"].createElement(_ShinyBar.ShinyBar, {
    isRinging: isRinging,
    className: _styles["default"].bottom,
    status: status
  }));
};

var _default = BasicCallInfo;
exports["default"] = _default;
//# sourceMappingURL=BasicCallInfo.js.map
