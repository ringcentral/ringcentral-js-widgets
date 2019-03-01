"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.function.name");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _phoneTypeNames = _interopRequireDefault(require("../../lib/phoneTypeNames"));

var _phoneSourceNames = _interopRequireDefault(require("../../lib/phoneSourceNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var spliter = '|';

function ContactInfo(_ref) {
  var name = _ref.name,
      entityType = _ref.entityType,
      titleEnabled = _ref.titleEnabled,
      phoneSourceNameRenderer = _ref.phoneSourceNameRenderer;
  var phoneSourceName = phoneSourceNameRenderer ? phoneSourceNameRenderer(entityType) : _phoneSourceNames.default.getString(entityType);
  var nameTitle = "".concat(name, " ").concat(spliter, " ").concat(phoneSourceName);
  return _react.default.createElement("div", {
    className: _styles.default.nameSection,
    title: titleEnabled && nameTitle
  }, _react.default.createElement("span", {
    className: _styles.default.name
  }, name), _react.default.createElement("span", {
    className: _styles.default.spliter
  }, spliter), _react.default.createElement("span", {
    className: _styles.default.label
  }, phoneSourceName));
}

ContactInfo.propTypes = {
  name: _propTypes.default.string.isRequired,
  entityType: _propTypes.default.string.isRequired,
  titleEnabled: _propTypes.default.bool,
  phoneSourceNameRenderer: _propTypes.default.func
};
ContactInfo.defaultProps = {
  titleEnabled: undefined,
  phoneSourceNameRenderer: undefined
};

function ContactPhone(_ref2) {
  var phoneType = _ref2.phoneType,
      phoneNumber = _ref2.phoneNumber,
      formatContactPhone = _ref2.formatContactPhone,
      titleEnabled = _ref2.titleEnabled,
      phoneTypeRenderer = _ref2.phoneTypeRenderer;
  var phoneTypeName = phoneTypeRenderer ? phoneTypeRenderer(phoneType) : _phoneTypeNames.default.getString(phoneType);
  var phoneNumberTitle = "".concat(formatContactPhone(phoneNumber), " ").concat(spliter, " ").concat(phoneTypeName);
  return _react.default.createElement("div", {
    className: _styles.default.phoneNumberSection,
    title: titleEnabled && phoneNumberTitle
  }, _react.default.createElement("span", null, formatContactPhone(phoneNumber)), _react.default.createElement("span", {
    className: _styles.default.spliter
  }, spliter), _react.default.createElement("span", {
    className: _styles.default.label
  }, phoneTypeName));
}

ContactPhone.propTypes = {
  phoneType: _propTypes.default.string.isRequired,
  phoneNumber: _propTypes.default.string.isRequired,
  formatContactPhone: _propTypes.default.func.isRequired,
  titleEnabled: _propTypes.default.bool,
  phoneTypeRenderer: _propTypes.default.func
};
ContactPhone.defaultProps = {
  titleEnabled: undefined,
  phoneTypeRenderer: undefined
};

function ContactItem(_ref3) {
  var currentLocale = _ref3.currentLocale,
      active = _ref3.active,
      onHover = _ref3.onHover,
      onClick = _ref3.onClick,
      name = _ref3.name,
      entityType = _ref3.entityType,
      phoneType = _ref3.phoneType,
      phoneNumber = _ref3.phoneNumber,
      formatContactPhone = _ref3.formatContactPhone,
      titleEnabled = _ref3.titleEnabled,
      phoneTypeRenderer = _ref3.phoneTypeRenderer,
      phoneSourceNameRenderer = _ref3.phoneSourceNameRenderer,
      ContactInfoRenderer = _ref3.contactInfoRenderer,
      ContactPhoneRenderer = _ref3.contactPhoneRenderer;
  var className = (0, _classnames.default)(_styles.default.contactItem, active ? _styles.default.active : null);

  if (!ContactInfoRenderer) {
    ContactInfoRenderer = ContactInfo;
  }

  if (!ContactPhoneRenderer) {
    ContactPhoneRenderer = ContactPhone;
  }

  return _react.default.createElement("li", {
    className: className,
    onMouseOver: onHover
  }, _react.default.createElement("div", {
    className: _styles.default.clickable,
    onClick: onClick
  }, _react.default.createElement(ContactInfoRenderer, {
    currentLocale: currentLocale,
    name: name,
    entityType: entityType,
    phoneType: phoneType,
    phoneNumber: phoneNumber,
    formatContactPhone: formatContactPhone,
    phoneTypeRenderer: phoneTypeRenderer,
    phoneSourceNameRenderer: phoneSourceNameRenderer,
    titleEnabled: titleEnabled
  }), _react.default.createElement(ContactPhoneRenderer, {
    currentLocale: currentLocale,
    name: name,
    entityType: entityType,
    phoneType: phoneType,
    phoneNumber: phoneNumber,
    formatContactPhone: formatContactPhone,
    phoneTypeRenderer: phoneTypeRenderer,
    phoneSourceNameRenderer: phoneSourceNameRenderer,
    titleEnabled: titleEnabled
  })));
}

ContactItem.propTypes = {
  currentLocale: _propTypes.default.string.isRequired,
  onClick: _propTypes.default.func.isRequired,
  formatContactPhone: _propTypes.default.func.isRequired,
  name: _propTypes.default.string.isRequired,
  entityType: _propTypes.default.string.isRequired,
  phoneType: _propTypes.default.string.isRequired,
  phoneNumber: _propTypes.default.string.isRequired,
  active: _propTypes.default.bool.isRequired,
  onHover: _propTypes.default.func.isRequired,
  titleEnabled: _propTypes.default.bool,
  phoneTypeRenderer: _propTypes.default.func,
  phoneSourceNameRenderer: _propTypes.default.func,
  contactInfoRenderer: _propTypes.default.func,
  contactPhoneRenderer: _propTypes.default.func
};
ContactItem.defaultProps = {
  titleEnabled: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  contactInfoRenderer: undefined,
  contactPhoneRenderer: undefined
};

var ContactDropdownList =
/*#__PURE__*/
function (_Component) {
  _inherits(ContactDropdownList, _Component);

  function ContactDropdownList() {
    _classCallCheck(this, ContactDropdownList);

    return _possibleConstructorReturn(this, _getPrototypeOf(ContactDropdownList).apply(this, arguments));
  }

  _createClass(ContactDropdownList, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.visibility || nextProps.items.length === 0) {
        return;
      }

      if (nextProps.scrollDirection === 'ArrowDown') {
        if (nextProps.selectedIndex < nextProps.items.length) {
          if (nextProps.selectedIndex > 4 && this.node) {
            this.node.scrollTop += 53;
            this.node.scrollTop = Math.floor(this.node.scrollTop / 53) * 53;
          }
        }
      }

      if (nextProps.scrollDirection === 'ArrowUp') {
        if (nextProps.selectedIndex > -1) {
          if (nextProps.selectedIndex < nextProps.items.length - 4 && this.node) {
            this.node.scrollTop -= 53;
            this.node.scrollTop = Math.floor(this.node.scrollTop / 53) * 53;
          }
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          currentLocale = _this$props.currentLocale,
          className = _this$props.className,
          listRef = _this$props.listRef,
          items = _this$props.items,
          selectedIndex = _this$props.selectedIndex,
          formatContactPhone = _this$props.formatContactPhone,
          setSelectedIndex = _this$props.setSelectedIndex,
          addToRecipients = _this$props.addToRecipients,
          titleEnabled = _this$props.titleEnabled,
          visibility = _this$props.visibility,
          phoneTypeRenderer = _this$props.phoneTypeRenderer,
          phoneSourceNameRenderer = _this$props.phoneSourceNameRenderer,
          contactInfoRenderer = _this$props.contactInfoRenderer,
          contactPhoneRenderer = _this$props.contactPhoneRenderer;

      if (!visibility || items.length === 0) {
        return null;
      }

      return _react.default.createElement("ul", {
        className: (0, _classnames.default)(_styles.default.dropdownList, className),
        ref: function ref(c) {
          _this.node = c;

          if (typeof listRef === 'function') {
            listRef(c);
          }
        }
      }, items.map(function (item, index) {
        return _react.default.createElement(ContactItem, {
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
          titleEnabled: titleEnabled,
          contactInfoRenderer: contactInfoRenderer,
          contactPhoneRenderer: contactPhoneRenderer
        });
      }));
    }
  }]);

  return ContactDropdownList;
}(_react.Component);

ContactDropdownList.propTypes = {
  currentLocale: _propTypes.default.string.isRequired,
  scrollDirection: _propTypes.default.string,
  visibility: _propTypes.default.bool.isRequired,
  className: _propTypes.default.string,
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    name: _propTypes.default.string.isRequired,
    entityType: _propTypes.default.string.isRequired,
    phoneType: _propTypes.default.string.isRequired,
    phoneNumber: _propTypes.default.string.isRequired
  })).isRequired,
  formatContactPhone: _propTypes.default.func.isRequired,
  addToRecipients: _propTypes.default.func.isRequired,
  setSelectedIndex: _propTypes.default.func.isRequired,
  selectedIndex: _propTypes.default.number.isRequired,
  titleEnabled: _propTypes.default.bool,
  listRef: _propTypes.default.func,
  phoneTypeRenderer: _propTypes.default.func,
  phoneSourceNameRenderer: _propTypes.default.func,
  contactInfoRenderer: _propTypes.default.func,
  contactPhoneRenderer: _propTypes.default.func
};
ContactDropdownList.defaultProps = {
  className: null,
  scrollDirection: null,
  titleEnabled: undefined,
  listRef: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  contactInfoRenderer: undefined,
  contactPhoneRenderer: undefined
};
var _default = ContactDropdownList;
exports.default = _default;
//# sourceMappingURL=index.js.map
