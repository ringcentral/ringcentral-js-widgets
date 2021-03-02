"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallHistoryPanel = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.for-each");

var _moment = _interopRequireDefault(require("moment"));

var _reactVirtualized = require("react-virtualized");

var _react = _interopRequireWildcard(require("react"));

var _CallHistoryItem = require("./CallHistoryItem");

var _StickyVirtualizedList = require("./StickyVirtualizedList");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DATE_ITEM_HEIGHT = 32; // ./styles.scss .date

var CALL_ITEM_HEIGHT = 64; // ./CallHistoryItem/styles.scss .item

var ROOT_NODE = {
  id: 'root',
  height: DATE_ITEM_HEIGHT,
  isSticky: true
};

function formatCallDate(timestamp) {
  var now = (0, _moment["default"])();
  var today = now.clone().startOf('day');
  var yesterday = now.clone().subtract(1, 'days').startOf('day');
  var mTimestamp = (0, _moment["default"])(timestamp);

  if (mTimestamp.isSame(today, 'd')) {
    return 'today';
  }

  if (mTimestamp.isSame(yesterday, 'd')) {
    return 'yesterday';
  }

  return mTimestamp.format('MM/DD/YYYY');
}

function formatCallTime(timestamp) {
  return (0, _moment["default"])(timestamp).format('h:mm A');
}

var CallHistoryPanel = function CallHistoryPanel(_ref) {
  var calls = _ref.calls,
      currentLocale = _ref.currentLocale,
      getActionMenu = _ref.getActionMenu,
      _ref$isWide = _ref.isWide,
      isWide = _ref$isWide === void 0 ? true : _ref$isWide;
  var tree = (0, _react.useMemo)(function () {
    var _tree = {
      root: {
        name: 'root',
        depth: 0,
        children: []
      }
    };
    calls.forEach(function (call) {
      var id = call.id,
          startTime = call.startTime;
      var callDate = formatCallDate(startTime);
      var callTime = formatCallTime(startTime);

      var callWithFormattedDate = _objectSpread(_objectSpread({}, call), {}, {
        callDate: callDate,
        callTime: callTime
      });

      if (!_tree.root.children.includes(callDate)) {
        _tree.root.children.push(callDate);
      }

      if (!Object.keys(_tree).includes(callDate)) {
        _tree[callDate] = {
          name: callDate,
          children: [id],
          depth: 1
        };
      } else {
        _tree[callDate].children.push(id);
      }

      _tree[id] = {
        name: id,
        depth: 2,
        call: callWithFormattedDate
      };
    });
    return _tree;
  }, [calls]);
  var getChildren = (0, _react.useCallback)(function (id) {
    var node = tree[id];

    if (node.children) {
      return node.children.map(function (childId) {
        var childNode = tree[childId];
        var height = CALL_ITEM_HEIGHT;

        if (childNode.depth === 1) {
          height = DATE_ITEM_HEIGHT;
        }

        return {
          id: childId,
          height: height,
          isSticky: childNode.depth === 1
        };
      });
    }
  }, [tree]);
  var rowRenderer = (0, _react.useCallback)(function (_ref2) {
    var id = _ref2.id,
        style = _ref2.style;
    var node = tree[id];

    if (node.children) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": node.name,
        className: _styles["default"].date,
        style: style,
        key: node.name
      }, _i18n["default"].getString(node.name, currentLocale));
    }

    return /*#__PURE__*/_react["default"].createElement("div", {
      "data-sign": "historyItem",
      style: style,
      key: node.call.id
    }, /*#__PURE__*/_react["default"].createElement(_CallHistoryItem.CallHistoryItem, {
      call: node.call,
      actionMenu: getActionMenu(node.call),
      isWide: isWide
    }));
  }, [tree, currentLocale]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].callHistoryPanel
  }, tree.root.children.length ? /*#__PURE__*/_react["default"].createElement(_reactVirtualized.AutoSizer, null, function (_ref3) {
    var width = _ref3.width,
        height = _ref3.height;
    return /*#__PURE__*/_react["default"].createElement(_StickyVirtualizedList.StickyVirtualizedList, {
      root: ROOT_NODE,
      getChildren: getChildren,
      rowRenderer: rowRenderer,
      defaultRowHeight: 64,
      width: width,
      height: height
    });
  }) : /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].empty
  }, _i18n["default"].getString('empty', currentLocale)));
};

exports.CallHistoryPanel = CallHistoryPanel;
CallHistoryPanel.defaultProps = {
  calls: [],
  getActionMenu: function getActionMenu() {
    return [];
  }
};
//# sourceMappingURL=CallHistoryPanel.js.map
