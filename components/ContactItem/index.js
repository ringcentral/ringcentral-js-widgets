"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.function.bind");

require("core-js/modules/es6.function.name");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _format = require("@ringcentral-integration/phone-number/lib/format");

var _DefaultAvatar = _interopRequireDefault(require("../../assets/images/DefaultAvatar.svg"));

var _PlaceholderImage = _interopRequireDefault(require("../PlaceholderImage"));

var _PresenceStatusIcon = _interopRequireDefault(require("../PresenceStatusIcon"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function AvatarNode(_ref) {
  var name = _ref.name,
      avatarUrl = _ref.avatarUrl,
      isInactive = _ref.isInactive;
  var avatarStyle = isInactive ? _styles["default"].inactiveAvatarNode : _styles["default"].avatarNode;
  return /*#__PURE__*/_react["default"].createElement(_PlaceholderImage["default"], {
    className: avatarStyle,
    alt: name,
    src: avatarUrl,
    placeholder: /*#__PURE__*/_react["default"].createElement(_DefaultAvatar["default"], {
      className: avatarStyle
    })
  });
}

AvatarNode.propTypes = {
  name: _propTypes["default"].string,
  avatarUrl: _propTypes["default"].string,
  isInactive: _propTypes["default"].bool
};
AvatarNode.defaultProps = {
  name: undefined,
  avatarUrl: undefined,
  isInactive: false
};

var ContactItem = /*#__PURE__*/function (_PureComponent) {
  _inherits(ContactItem, _PureComponent);

  var _super = _createSuper(ContactItem);

  function ContactItem(props) {
    var _this;

    _classCallCheck(this, ContactItem);

    _this = _super.call(this, props);

    _this.renderPresence = function (contact) {
      var presence = contact.presence,
          contactStatus = contact.contactStatus;

      if (contactStatus === 'NotActivated') {
        return null;
      }

      return presence ? /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].presenceNodeContainer
      }, /*#__PURE__*/_react["default"].createElement(_PresenceStatusIcon["default"], _extends({
        className: _styles["default"].presenceNode
      }, presence))) : null;
    };

    _this.renderMiddle = function (contact, currentLocale) {
      var name = contact.name,
          contactStatus = contact.contactStatus;

      if (contactStatus === 'NotActivated') {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].infoWrapper
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].inactiveContactName,
          title: name
        }, name), /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].inactiveText
        }, _i18n["default"].getString('notActivated', currentLocale)));
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].contactName,
        title: name
      }, name);
    };

    _this.state = {
      loading: true
    };
    _this.onItemSelected = _this.onItemSelected.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ContactItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this._mounted = true;
      this._loadingTimeout = setTimeout(function () {
        if (_this2._mounted) {
          _this2.setState({
            loading: false
          });
        }
      }, 3);
      setTimeout(function () {
        if (_this2._mounted) {
          _this2.props.getAvatarUrl(_this2.props.contact);

          _this2.props.getPresence(_this2.props.contact);
        }
      }, 500);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;

      if (this._loadingTimeout) {
        clearTimeout(this._loadingTimeout);
      }
    }
  }, {
    key: "onItemSelected",
    value: function onItemSelected() {
      var func = this.props.onSelect;

      if (func) {
        func(this.props.contact);
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.loading) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].root
        });
      }

      var _this$props = this.props,
          contact = _this$props.contact,
          currentLocale = _this$props.currentLocale,
          currentSiteCode = _this$props.currentSiteCode,
          isMultipleSiteEnabled = _this$props.isMultipleSiteEnabled;
      var name = contact.name,
          extensionNumber = contact.extensionNumber,
          type = contact.type,
          profileImageUrl = contact.profileImageUrl,
          contactStatus = contact.contactStatus;
      var displayingNumber = extensionNumber;

      if (isMultipleSiteEnabled) {
        displayingNumber = (0, _format.formatSameSiteExtension)({
          currentSiteCode: currentSiteCode,
          extension: extensionNumber
        });
      }

      var sourceNodeRenderer = this.props.sourceNodeRenderer;
      var sourceNode = sourceNodeRenderer({
        sourceType: type
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].root,
        onClick: this.onItemSelected,
        "data-sign": "contactItem"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].contactProfile
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].avatarNodeContainer
      }, /*#__PURE__*/_react["default"].createElement(AvatarNode, {
        name: name,
        avatarUrl: profileImageUrl,
        isInactive: contactStatus === 'NotActivated'
      })), sourceNode ? /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].sourceNodeContainer
      }, sourceNode) : null, this.renderPresence(this.props.contact)), this.renderMiddle(contact, currentLocale), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].phoneNumber,
        title: displayingNumber
      }, displayingNumber));
    }
  }]);

  return ContactItem;
}(_react.PureComponent);

ContactItem.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  currentSiteCode: _propTypes["default"].string,
  isMultipleSiteEnabled: _propTypes["default"].bool,
  contact: _propTypes["default"].shape({
    id: _propTypes["default"].string,
    type: _propTypes["default"].string,
    name: _propTypes["default"].string,
    extensionNumber: _propTypes["default"].string,
    email: _propTypes["default"].string,
    profileImageUrl: _propTypes["default"].string,
    presence: _propTypes["default"].object,
    contactStatus: _propTypes["default"].string
  }).isRequired,
  getAvatarUrl: _propTypes["default"].func.isRequired,
  getPresence: _propTypes["default"].func.isRequired,
  onSelect: _propTypes["default"].func,
  sourceNodeRenderer: _propTypes["default"].func
};
ContactItem.defaultProps = {
  onSelect: undefined,
  currentSiteCode: '',
  isMultipleSiteEnabled: false,
  sourceNodeRenderer: function sourceNodeRenderer() {
    return null;
  }
};
var _default = ContactItem;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
