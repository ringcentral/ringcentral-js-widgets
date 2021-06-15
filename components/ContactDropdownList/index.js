"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.function.name");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _juno = require("@ringcentral/juno");

var _icon = require("@ringcentral/juno/icon");

var _Tooltip = require("../Rcui/Tooltip");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _phoneTypeNames = _interopRequireDefault(require("../../lib/phoneTypeNames"));

var _phoneSourceNames = _interopRequireDefault(require("../../lib/phoneSourceNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var spliter = '|';

var ContactInfo = function ContactInfo(_ref) {
  var name = _ref.name,
      entityType = _ref.entityType,
      titleEnabled = _ref.titleEnabled,
      phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
      doNotCall = _ref.doNotCall;
  var phoneSourceName = phoneSourceNameRenderer ? phoneSourceNameRenderer(entityType) : _phoneSourceNames["default"].getString(entityType);
  var nameTitle = "".concat(name, " ").concat(spliter, " ").concat(phoneSourceName);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames2["default"])(_styles["default"].nameSection, _defineProperty({}, _styles["default"].dncNameSection, doNotCall)),
    title: titleEnabled && nameTitle,
    "data-sign": "contactNameSection"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].name
  }, name), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].spliter
  }, spliter), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].label
  }, phoneSourceName));
};

ContactInfo.propTypes = {
  name: _propTypes["default"].string.isRequired,
  entityType: _propTypes["default"].string.isRequired,
  titleEnabled: _propTypes["default"].bool,
  phoneSourceNameRenderer: _propTypes["default"].func,
  doNotCall: _propTypes["default"].bool
};
ContactInfo.defaultProps = {
  titleEnabled: undefined,
  phoneSourceNameRenderer: undefined,
  doNotCall: false
};

var DoNotCallIndicator = function DoNotCallIndicator(_ref2) {
  var doNotCall = _ref2.doNotCall,
      currentLocale = _ref2.currentLocale;
  if (!doNotCall) return null;
  return /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
    title: _i18n["default"].getString('doNotCall', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].doNotCall,
    "data-sign": "doNotCall"
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    symbol: _icon.Blocked,
    size: "xsmall"
  })));
};

DoNotCallIndicator.propTypes = {
  doNotCall: _propTypes["default"].bool,
  currentLocale: _propTypes["default"].string.isRequired
};
DoNotCallIndicator.defaultProps = {
  doNotCall: false
};

var ContactPhone = function ContactPhone(_ref3) {
  var phoneType = _ref3.phoneType,
      phoneNumber = _ref3.phoneNumber,
      formatContactPhone = _ref3.formatContactPhone,
      titleEnabled = _ref3.titleEnabled,
      phoneTypeRenderer = _ref3.phoneTypeRenderer;
  var phoneTypeName = phoneTypeRenderer ? phoneTypeRenderer(phoneType) : _phoneTypeNames["default"].getString(phoneType);
  var phoneNumberTitle = "".concat(formatContactPhone(phoneNumber), " ").concat(spliter, " ").concat(phoneTypeName);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].phoneNumberSection,
    title: titleEnabled && phoneNumberTitle
  }, /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "dropDownContactPhone"
  }, formatContactPhone(phoneNumber)), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].spliter
  }, spliter), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].label
  }, phoneTypeName));
};

ContactPhone.propTypes = {
  phoneType: _propTypes["default"].string.isRequired,
  phoneNumber: _propTypes["default"].string.isRequired,
  formatContactPhone: _propTypes["default"].func.isRequired,
  titleEnabled: _propTypes["default"].bool,
  phoneTypeRenderer: _propTypes["default"].func
};
ContactPhone.defaultProps = {
  titleEnabled: undefined,
  phoneTypeRenderer: undefined
};

var ContactItem = function ContactItem(_ref4) {
  var currentLocale = _ref4.currentLocale,
      active = _ref4.active,
      onHover = _ref4.onHover,
      onClick = _ref4.onClick,
      name = _ref4.name,
      entityType = _ref4.entityType,
      phoneType = _ref4.phoneType,
      phoneNumber = _ref4.phoneNumber,
      formatContactPhone = _ref4.formatContactPhone,
      titleEnabled = _ref4.titleEnabled,
      doNotCall = _ref4.doNotCall,
      phoneTypeRenderer = _ref4.phoneTypeRenderer,
      phoneSourceNameRenderer = _ref4.phoneSourceNameRenderer,
      ContactInfoRenderer = _ref4.contactInfoRenderer,
      ContactPhoneRenderer = _ref4.contactPhoneRenderer;
  var className = (0, _classnames2["default"])(_styles["default"].contactItem, active ? _styles["default"].active : null);

  if (!ContactInfoRenderer) {
    ContactInfoRenderer = ContactInfo;
  }

  if (!ContactPhoneRenderer) {
    ContactPhoneRenderer = ContactPhone;
  }

  return /*#__PURE__*/_react["default"].createElement("li", {
    className: className,
    onMouseOver: onHover,
    "data-sign": "contactItem"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].clickable,
    onClick: onClick
  }, /*#__PURE__*/_react["default"].createElement(ContactInfoRenderer, {
    currentLocale: currentLocale,
    name: name,
    entityType: entityType,
    phoneType: phoneType,
    phoneNumber: phoneNumber,
    formatContactPhone: formatContactPhone,
    phoneTypeRenderer: phoneTypeRenderer,
    phoneSourceNameRenderer: phoneSourceNameRenderer,
    titleEnabled: titleEnabled,
    doNotCall: doNotCall
  }), /*#__PURE__*/_react["default"].createElement(DoNotCallIndicator, {
    doNotCall: doNotCall,
    currentLocale: currentLocale
  }), /*#__PURE__*/_react["default"].createElement(ContactPhoneRenderer, {
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
};

ContactItem.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  onClick: _propTypes["default"].func.isRequired,
  formatContactPhone: _propTypes["default"].func.isRequired,
  name: _propTypes["default"].string.isRequired,
  entityType: _propTypes["default"].string.isRequired,
  phoneType: _propTypes["default"].string.isRequired,
  phoneNumber: _propTypes["default"].string.isRequired,
  active: _propTypes["default"].bool.isRequired,
  onHover: _propTypes["default"].func.isRequired,
  titleEnabled: _propTypes["default"].bool,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  contactInfoRenderer: _propTypes["default"].func,
  contactPhoneRenderer: _propTypes["default"].func,
  doNotCall: _propTypes["default"].bool
};
ContactItem.defaultProps = {
  titleEnabled: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  contactInfoRenderer: undefined,
  contactPhoneRenderer: undefined,
  doNotCall: false
};

var ContactDropdownList = /*#__PURE__*/function (_Component) {
  _inherits(ContactDropdownList, _Component);

  var _super = _createSuper(ContactDropdownList);

  function ContactDropdownList() {
    _classCallCheck(this, ContactDropdownList);

    return _super.apply(this, arguments);
  }

  _createClass(ContactDropdownList, [{
    key: "componentWillReceiveProps",
    // eslint-disable-next-line react/no-deprecated
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

      return /*#__PURE__*/_react["default"].createElement("ul", {
        className: (0, _classnames2["default"])(_styles["default"].dropdownList, className),
        ref: function ref(c) {
          _this.node = c;

          if (typeof listRef === 'function') {
            listRef(c);
          }
        },
        "data-sign": "contactDropdownList"
      }, items.map(function (item, index) {
        return /*#__PURE__*/_react["default"].createElement(ContactItem, {
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
          contactPhoneRenderer: contactPhoneRenderer,
          doNotCall: item.doNotCall
        });
      }));
    }
  }]);

  return ContactDropdownList;
}(_react.Component);

ContactDropdownList.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  scrollDirection: _propTypes["default"].string,
  visibility: _propTypes["default"].bool.isRequired,
  className: _propTypes["default"].string,
  items: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    name: _propTypes["default"].string.isRequired,
    entityType: _propTypes["default"].string.isRequired,
    phoneType: _propTypes["default"].string.isRequired,
    phoneNumber: _propTypes["default"].string.isRequired
  })).isRequired,
  formatContactPhone: _propTypes["default"].func.isRequired,
  addToRecipients: _propTypes["default"].func.isRequired,
  setSelectedIndex: _propTypes["default"].func.isRequired,
  selectedIndex: _propTypes["default"].number.isRequired,
  titleEnabled: _propTypes["default"].bool,
  listRef: _propTypes["default"].func,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  contactInfoRenderer: _propTypes["default"].func,
  contactPhoneRenderer: _propTypes["default"].func
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
exports["default"] = _default;
//# sourceMappingURL=index.js.map
