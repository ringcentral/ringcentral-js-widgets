"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReferenceMenuList = exports.ReferenceList = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _components = require("@ringcentral-integration/next-widgets/components");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _i18n = require("./i18n");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var labelStyle = 'typography-descriptor text-neutral-b2 truncate py-3.5 px-3';
var ReferenceMenuList = exports.ReferenceMenuList = function ReferenceMenuList(_ref) {
  var list = _ref.list,
    label = _ref.label,
    groupIcon = _ref.groupIcon,
    toolTipText = _ref.toolTipText,
    customCallBack = _ref.customCallBack,
    _ref$showGroupLabel = _ref.showGroupLabel,
    showGroupLabel = _ref$showGroupLabel === void 0 ? false : _ref$showGroupLabel,
    onItemClick = _ref.onItemClick,
    _ref$highLightText = _ref.highLightText,
    highLightText = _ref$highLightText === void 0 ? '' : _ref$highLightText,
    selectedMap = _ref.selectedMap,
    getIcon = _ref.getIcon;
  var integrationConfig = (0, _nextCore.useContainer)('IntegrationConfig');
  var noItem = list.length === 0;
  var viewableCrmEntity = Boolean(integrationConfig === null || integrationConfig === void 0 ? void 0 : integrationConfig.viewExternalEntity);
  return /*#__PURE__*/_react["default"].createElement(_springUi.MenuList, {
    className: "overflow-auto pb-2",
    "data-sign": label
  }, showGroupLabel && /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, {
    "data-sign": "referenceGroupLabel",
    disabled: true
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center"
  }, groupIcon && /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
    symbol: groupIcon,
    size: "xsmall",
    className: "text-neutral-b2"
  }), /*#__PURE__*/_react["default"].createElement(_springUi.ListItemText, {
    className: "typography-subtitleMini text-neutral-b2 mr-1 ml-1 p-0",
    secondary: label
  }), toolTipText && /*#__PURE__*/_react["default"].createElement(_springUi.Tooltip, {
    title: toolTipText
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
    "data-sign": "infoIcon",
    symbol: _springIcon.InfoMd,
    size: "xsmall",
    className: "text-neutral-b2 pointer-events-auto"
  })))), noItem && /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, null, /*#__PURE__*/_react["default"].createElement(_springUi.ListItemText, {
    secondary: (0, _i18n.t)('noRecordMatch')
  })), !noItem && list.map(function (item, index) {
    var _item$name;
    return /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, {
      "data-sign": "match".concat(index),
      key: index,
      selected: !!selectedMap[item.id],
      onClick: function onClick() {
        if (!item.id) {
          customCallBack === null || customCallBack === void 0 ? void 0 : customCallBack(item);
          return;
        }
        onItemClick(item, !selectedMap[item.id]);
      },
      classes: {
        selectIndicator: 'self-center',
        container: 'py-1'
      },
      className: "group"
    }, getIcon && /*#__PURE__*/_react["default"].createElement("span", {
      className: "w-9 h-9 flex items-center justify-start ml-3 flex-shrink-0",
      "data-sign": "referenceListIcon"
    }, getIcon(item)), /*#__PURE__*/_react["default"].createElement(_springUi.ListItemText, {
      className: "m-0 min-w-0 flex-1",
      primary: /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex items-center justify-between w-full relative"
      }, /*#__PURE__*/_react["default"].createElement(_components.TextWithHighlight, {
        "data-sign": "referenceListResultItem",
        text: (_item$name = item.name) !== null && _item$name !== void 0 ? _item$name : '',
        highLightText: highLightText,
        className: "truncate block flex-auto"
      }), /*#__PURE__*/_react["default"].createElement("span", {
        className: "typography-descriptor text-neutral-b2 truncate ml-2 max-w-[50%] flex-none ".concat(viewableCrmEntity && item.id ? 'group-hover:opacity-0 group-[.sui-focus-visible-within]:opacity-0' : ''),
        title: item.labelType || item.type
      }, item.labelType || item.type), viewableCrmEntity && item.id && /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "hover-actions",
        className: "flex gap-1 absolute right-0 top-0 h-full items-center bg-inherit pl-4 pr-2 group-hover:translate-x-0 group-[.sui-focus-visible-within]:translate-x-0 translate-x-full"
      }, /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
        symbol: _springIcon.ArrowRightUpMd,
        TooltipProps: {
          title: (0, _i18n.t)('viewRecord')
        },
        "data-sign": "viewRecordButton",
        variant: "icon",
        color: "neutral",
        size: "small",
        onClick: function onClick(e) {
          e.stopPropagation();
          e.preventDefault();
          integrationConfig.viewExternalEntity(item);
        }
      })), !item.id && /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
        symbol: _springIcon.EditPenMd,
        size: "small",
        className: "ml-1",
        "data-sign": "editPenIcon"
      }))
    }));
  }));
};
var ReferenceListView = function ReferenceListView(_ref2) {
  var list = _ref2.list,
    label = _ref2.label,
    _ref2$showGroupLabel = _ref2.showGroupLabel,
    showGroupLabel = _ref2$showGroupLabel === void 0 ? false : _ref2$showGroupLabel,
    onItemClick = _ref2.onItemClick,
    _ref2$highLightText = _ref2.highLightText,
    highLightText = _ref2$highLightText === void 0 ? '' : _ref2$highLightText,
    selectedMap = _ref2.selectedMap;
  var integrationConfig = (0, _nextCore.useContainer)('IntegrationConfig');
  var clickable = Boolean(integrationConfig === null || integrationConfig === void 0 ? void 0 : integrationConfig.onViewEntity);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "overflow-auto",
    "data-sign": label
  }, showGroupLabel && /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "referenceGroupLabel",
    className: labelStyle
  }, label), list.length === 0 ? /*#__PURE__*/_react["default"].createElement("div", {
    className: labelStyle
  }, (0, _i18n.t)('noRecordMatch')) : /*#__PURE__*/_react["default"].createElement(_springUi.List, null, list.map(function (item, index) {
    var _item$name2;
    return /*#__PURE__*/_react["default"].createElement(_springUi.ListItem, {
      "data-sign": "match".concat(index),
      key: index,
      divider: false,
      onClick: function onClick() {
        onItemClick(item, !selectedMap[item.id]);
      }
    }, /*#__PURE__*/_react["default"].createElement(_springUi.Checkbox, {
      checked: !!selectedMap[item.id]
    }), /*#__PURE__*/_react["default"].createElement(_springUi.ListItemText, {
      primary: /*#__PURE__*/_react["default"].createElement(_components.TextWithHighlight, {
        "data-sign": "referenceListResultItem",
        text: (_item$name2 = item.name) !== null && _item$name2 !== void 0 ? _item$name2 : '',
        highLightText: highLightText,
        className: "truncate"
      })
    }), clickable && /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
      symbol: _springIcon.ArrowRightUpMd,
      TooltipProps: {
        title: (0, _i18n.t)('viewRecord')
      },
      "data-sign": "viewRecordButton",
      shape: "squircle",
      variant: "icon",
      color: "secondary",
      size: "small",
      className: "ml-2",
      onClick: function onClick(e) {
        var _integrationConfig$on;
        e.stopPropagation();
        e.preventDefault();
        integrationConfig === null || integrationConfig === void 0 ? void 0 : (_integrationConfig$on = integrationConfig.onViewEntity) === null || _integrationConfig$on === void 0 ? void 0 : _integrationConfig$on.call(integrationConfig, item);
      }
    }));
  })));
};
var ReferenceList = exports.ReferenceList = function ReferenceList(props) {
  if (props.useMenuList) {
    return /*#__PURE__*/_react["default"].createElement(ReferenceMenuList, props);
  }
  return /*#__PURE__*/_react["default"].createElement(ReferenceListView, props);
};
//# sourceMappingURL=ReferenceList.js.map
