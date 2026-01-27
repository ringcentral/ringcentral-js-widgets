"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallControlPanel = void 0;
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.to-string.js");
var _components = require("@ringcentral-integration/micro-auth/src/app/components");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _hooks = require("../../../../../hooks");
var _AiNoteTip = require("./AiNoteTip");
var _CallCtrlButton = require("./CallCtrlButton");
var _TransferringCall = require("./TransferringCall");
var _useCallControlLayout = require("./useCallControlLayout");
var _excluded = ["actionType", "iconSize", "size"],
  _excluded2 = ["actionType", "label"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var CallControlPanel = exports.CallControlPanel = function CallControlPanel(props) {
  var flipNumbers = props.flipNumbers,
    actions = props.actions,
    call = props.call,
    transferringCalls = props.transferringCalls,
    onAction = props.onAction,
    AudioCard = props.AudioCardComponent;
  var isConferenceCall = Boolean(call.isConferenceCall);
  var callActions = (0, _hooks.useCallActionButtons)(actions, onAction, {
    isConferenceCall: isConferenceCall
  });
  var renderActions = (0, _react.useMemo)(function () {
    return callActions.slice(0, -1);
  }, [callActions]);
  var actionButtons = (0, _react.useMemo)(function () {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex flex-wrap gap-4 justify-center px-10",
      "data-sign": "actionButtons"
    }, renderActions.map(function (_ref) {
      var actionType = _ref.actionType,
        iconSize = _ref.iconSize,
        size = _ref.size,
        rest = _objectWithoutProperties(_ref, _excluded);
      return /*#__PURE__*/_react["default"].createElement(_CallCtrlButton.CallCtrlButton, _extends({
        key: actionType,
        menuPlacement: actionType === 'audio' ? 'right' : undefined,
        menuList: actionType === 'flip' ? /*#__PURE__*/_react["default"].createElement(_springUi.MenuList, {
          onChange: function onChange(value) {
            return onAction('flip', value);
          }
        }, flipNumbers.map(function (item, index) {
          return /*#__PURE__*/_react["default"].createElement(_springUi.Option, {
            key: index,
            value: item.flipNumber
          }, /*#__PURE__*/_react["default"].createElement(_springUi.MenuItemText, null, /*#__PURE__*/_react["default"].createElement("div", {
            className: "text-neutral-b1"
          }, item.label), /*#__PURE__*/_react["default"].createElement("div", {
            className: "text-neutral-b2"
          }, /*#__PURE__*/_react["default"].createElement(_components.FormattedPhoneNumber, {
            phoneNumber: item.phoneNumber
          }))));
        })) : actionType === 'audio' ? AudioCard : undefined,
        "data-sign": actionType
      }, rest, {
        value: ""
      }));
    }), process.env.NODE_ENV === 'test' && /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "actionTypes"
    }, renderActions.map(function (b) {
      return b.actionType;
    }).join(',')));
  }, [flipNumbers, onAction, renderActions, AudioCard]);
  var Component = transferringCalls ? _TransferringCall.TransferringCall : NormalCallControlPanel;
  return /*#__PURE__*/_react["default"].createElement(Component, props, actionButtons);
};
var NormalCallControlPanel = function NormalCallControlPanel(_ref2) {
  var actions = _ref2.actions,
    call = _ref2.call,
    expanded = _ref2.expanded,
    onAction = _ref2.onAction,
    onExpand = _ref2.onExpand,
    aiNoteTipType = _ref2.aiNoteTipType,
    viewAiNote = _ref2.viewAiNote,
    onCloseAiNoteTip = _ref2.onCloseAiNoteTip,
    children = _ref2.children;
  var isConferenceCall = Boolean(call.isConferenceCall);
  var callActions = (0, _hooks.useCallActionButtons)(actions, onAction, {
    isConferenceCall: isConferenceCall
  });
  var hungUpActionProps = (0, _react.useMemo)(function () {
    return callActions[callActions.length - 1];
  }, [callActions]);
  if (process.env.NODE_ENV !== 'production' && (!hungUpActionProps || hungUpActionProps.actionType !== 'hangUp')) {
    throw new Error('The last action should be hangUp, you may have a bug, please check the CallControl.view');
  }
  var aiNoteTip = aiNoteTipType ? /*#__PURE__*/_react["default"].createElement(_AiNoteTip.AiNoteTip, {
    aiNoteTipType: aiNoteTipType,
    onView: viewAiNote,
    onCloseAiNoteTip: onCloseAiNoteTip
  }) : undefined;
  var lastActionType = hungUpActionProps.actionType,
    label = hungUpActionProps.label,
    end = _objectWithoutProperties(hungUpActionProps, _excluded2);
  return (0, _useCallControlLayout.useCallControlLayout)(call, {
    main: children,
    footer: /*#__PURE__*/_react["default"].createElement(_springUi.CallButton, _extends({}, end, {
      variant: "end",
      TooltipProps: {
        title: end.tooltip
      },
      size: "medium",
      "data-sign": "hangUp"
    })),
    onBack: function onBack() {
      onAction('back');
    },
    onConferenceClick: function onConferenceClick() {
      onAction('viewConferenceList');
    },
    aiNoteTip: aiNoteTip,
    expanded: expanded,
    onExpand: onExpand
  });
};
//# sourceMappingURL=CallControlPanel.js.map
