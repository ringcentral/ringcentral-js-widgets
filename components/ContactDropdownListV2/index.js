"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
exports["default"] = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _ContactEntry = _interopRequireDefault(require("./ContactEntry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ContactDropdownListV2 = (0, _react.forwardRef)(function ContactDropDownListV2(_ref, ref) {
  var currentLocale = _ref.currentLocale,
      className = _ref.className,
      contacts = _ref.contacts,
      selectedIndex = _ref.selectedIndex,
      formatContactPhone = _ref.formatContactPhone,
      setSelectedIndex = _ref.setSelectedIndex,
      addToRecipients = _ref.addToRecipients,
      enableTitle = _ref.enableTitle,
      visibility = _ref.visibility,
      phoneTypeRenderer = _ref.phoneTypeRenderer,
      phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
      contactInfoRenderer = _ref.contactInfoRenderer,
      contactPhoneRenderer = _ref.contactPhoneRenderer;
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

  if (!visibility || contacts.length === 0) {
    return null;
  }

  return _react["default"].createElement("ul", {
    className: (0, _classnames["default"])(_styles["default"].dropdownList, className),
    ref: listEl
  }, contacts.map(function (item, index) {
    return _react["default"].createElement(_ContactEntry["default"], {
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
      contactInfoRenderer: contactInfoRenderer,
      contactPhoneRenderer: contactPhoneRenderer,
      splitter: "|"
    });
  }));
});
ContactDropdownListV2.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  visibility: _propTypes["default"].bool.isRequired,
  className: _propTypes["default"].string,
  contacts: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    name: _propTypes["default"].string.isRequired,
    entityType: _propTypes["default"].string.isRequired,
    phoneType: _propTypes["default"].string.isRequired,
    phoneNumber: _propTypes["default"].string.isRequired
  })).isRequired,
  formatContactPhone: _propTypes["default"].func.isRequired,
  addToRecipients: _propTypes["default"].func.isRequired,
  setSelectedIndex: _propTypes["default"].func.isRequired,
  selectedIndex: _propTypes["default"].number.isRequired,
  enableTitle: _propTypes["default"].bool,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  contactInfoRenderer: _propTypes["default"].func,
  contactPhoneRenderer: _propTypes["default"].func
};
ContactDropdownListV2.defaultProps = {
  className: null,
  enableTitle: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  contactInfoRenderer: undefined,
  contactPhoneRenderer: undefined
};
var _default = ContactDropdownListV2;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
