"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownList = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _RecipientOption = require("./RecipientOption");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DropdownList = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var currentLocale = _ref.currentLocale,
      className = _ref.className,
      recipientOptions = _ref.recipientOptions,
      selectedIndex = _ref.selectedIndex,
      formatContactPhone = _ref.formatContactPhone,
      setSelectedIndex = _ref.setSelectedIndex,
      addToRecipients = _ref.addToRecipients,
      enableTitle = _ref.enableTitle,
      visibility = _ref.visibility,
      phoneTypeRenderer = _ref.phoneTypeRenderer,
      phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
      recipientInfoRenderer = _ref.recipientInfoRenderer,
      recipientPhoneRenderer = _ref.recipientPhoneRenderer;
  var listEl = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      scrollUp: function scrollUp() {
        if (listEl.current) {
          listEl.current.scrollTop = Math.floor(Math.max(listEl.current.scrollTop - 53, 0));
        }
      },
      scrollDown: function scrollDown() {
        if (listEl.current) {
          listEl.current.scrollTop = Math.floor(Math.min(listEl.current.scrollTop + 53, listEl.current.scrollHeight));
        }
      },
      setScrollPosition: function setScrollPosition(scrollTop) {
        if (listEl.current) {
          listEl.current.scrollTop = Math.floor(scrollTop);
        }
      }
    };
  });

  if (!visibility || recipientOptions.length === 0) {
    return null;
  }

  return /*#__PURE__*/_react["default"].createElement("ul", {
    className: (0, _classnames["default"])(_styles["default"].dropdownList, className),
    ref: listEl,
    "data-sign": "dropdownList"
  }, recipientOptions.map(function (item, index) {
    return /*#__PURE__*/_react["default"].createElement(_RecipientOption.RecipientOption, {
      currentLocale: currentLocale,
      active: selectedIndex === index,
      name: item.name,
      entityType: item.entityType,
      phoneType: item.phoneType,
      phoneNumber: item.phoneNumber,
      phoneTypeRenderer: phoneTypeRenderer,
      phoneSourceNameRenderer: phoneSourceNameRenderer,
      formatContactPhone: formatContactPhone,
      onHover: function onHover() {
        return setSelectedIndex(index);
      },
      onClick: function onClick() {
        return addToRecipients(item);
      },
      key: "".concat(index).concat(item.phoneNumber).concat(item.name).concat(item.phoneType),
      enableTitle: enableTitle,
      recipientInfoRenderer: recipientInfoRenderer,
      recipientPhoneRenderer: recipientPhoneRenderer,
      splitter: "|"
    });
  }));
});
exports.DropdownList = DropdownList;
DropdownList.displayName = 'DropdownList';
//# sourceMappingURL=DropdownList.js.map
