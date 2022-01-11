"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallHistoryPanel = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.for-each");

var _react = _interopRequireWildcard(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _newPalette = require("@ringcentral/juno/es6/foundation/styles/newPalette.js");

var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));

var _typography = require("@ringcentral/juno/es6/foundation/styles/typography.js");

var _CallHistoryItem = require("./CallHistoryItem");

var _i18n = _interopRequireDefault(require("./i18n"));

var _StickyVirtualizedList = require("./StickyVirtualizedList");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  border-top: 1px solid ", ";\n  background-color: ", ";\n  height: 100%;\n  box-sizing: border-box;\n  overflow: hidden;\n  position: relative;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n\n  color: ", ";\n  text-align: center;\n  display: block;\n  height: ", "px;\n  line-height: ", "px;\n  background: ", ";\n  box-sizing: border-box;\n  border-bottom: 1px solid ", ";\n  position: sticky;\n  top: 0;\n  z-index: 2 !important;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var DATE_ITEM_HEIGHT = 32;
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

var DateText = _styledComponents["default"].div(_templateObject(), (0, _typography.typography)('caption1'), (0, _newPalette.palette2)('neutral', 'f06'), DATE_ITEM_HEIGHT, DATE_ITEM_HEIGHT, (0, _newPalette.palette2)('neutral', 'b01'), (0, _newPalette.palette2)('neutral', 'l02'));

var StyledCallHistoryPanel = _styledComponents["default"].div(_templateObject2(), (0, _newPalette.palette2)('neutral', 'l02'), (0, _newPalette.palette2)('neutral', 'b01'));

var CallHistoryPanel = function CallHistoryPanel(_ref) {
  var calls = _ref.calls,
      currentLocale = _ref.currentLocale,
      getActionMenu = _ref.getActionMenu,
      _ref$isWide = _ref.isWide,
      isWide = _ref$isWide === void 0 ? true : _ref$isWide,
      _ref$listScrollTop = _ref.listScrollTop,
      listScrollTop = _ref$listScrollTop === void 0 ? 0 : _ref$listScrollTop,
      _ref$changeListScroll = _ref.changeListScrollTop,
      changeListScrollTop = _ref$changeListScroll === void 0 ? function () {} : _ref$changeListScroll;
  var listRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var _listRef$current;

    (_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : _listRef$current.setScrollTop(listScrollTop); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
      return /*#__PURE__*/_react["default"].createElement(DateText, {
        "data-sign": "dateText",
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
  }, [tree, getActionMenu, isWide, currentLocale]);
  return /*#__PURE__*/_react["default"].createElement(StyledCallHistoryPanel, null, tree.root.children.length ? /*#__PURE__*/_react["default"].createElement(_StickyVirtualizedList.StickyVirtualizedList, {
    overscanRowCount: 20,
    root: ROOT_NODE,
    getChildren: getChildren,
    rowRenderer: rowRenderer,
    defaultRowHeight: 64,
    width: window.innerWidth,
    height: window.innerHeight,
    onScroll: function onScroll(_ref3) {
      var scrollTop = _ref3.scrollTop;
      changeListScrollTop(scrollTop);
    },
    ref: listRef
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
