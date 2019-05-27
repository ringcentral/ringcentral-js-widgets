"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPresenceStatusName = getPresenceStatusName;
exports.contactItemPropTypes = exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.function.name");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _dndStatus = _interopRequireDefault(require("ringcentral-integration/modules/Presence/dndStatus"));

var _ramda = require("ramda");

var _PresenceStatusIcon = _interopRequireDefault(require("../PresenceStatusIcon"));

var _PlaceholderImage = _interopRequireDefault(require("../PlaceholderImage"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _DefaultAvatar = _interopRequireDefault(require("../../assets/images/DefaultAvatar.svg"));

var _phoneTypes = _interopRequireDefault(require("../../enums/phoneTypes"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function getPresenceStatusName(presence, currentLocale) {
  var presenceStatus = presence.presenceStatus,
      dndStatus = presence.dndStatus;

  if (dndStatus === _dndStatus["default"].doNotAcceptAnyCalls) {
    return _i18n["default"].getString(dndStatus, currentLocale);
  }

  return _i18n["default"].getString(presenceStatus, currentLocale);
}

function AvatarNode(_ref) {
  var name = _ref.name,
      avatarUrl = _ref.avatarUrl,
      isInactive = _ref.isInactive;
  var avatarStyle = isInactive ? _styles["default"].inactiveAvatarNode : _styles["default"].avatarNode;
  return _react["default"].createElement(_PlaceholderImage["default"], {
    className: avatarStyle,
    alt: name,
    src: avatarUrl,
    placeholder: _react["default"].createElement(_DefaultAvatar["default"], {
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

var ContactDetails =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ContactDetails, _PureComponent);

  function ContactDetails() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ContactDetails);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ContactDetails)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onClickToDial = function (contact, phoneNumber) {
      if (_this.props.disableCallButton) return;

      _this.props.onClickToDial(_objectSpread({}, contact, {
        phoneNumber: phoneNumber
      }));
    };

    _this.onClickToSMS = function (contact, phoneNumber) {
      _this.props.onClickToSMS(_objectSpread({}, contact, {
        phoneNumber: phoneNumber
      }));
    };

    _this.onClickMailTo = function (email, contactType) {
      if (typeof _this.props.onClickMailTo === 'function') {
        _this.props.onClickMailTo(email, contactType);
      }
    };

    _this.renderPresence = function (contactStatus, presence, presenceName, currentLocale) {
      if (contactStatus === 'NotActivated') {
        return _react["default"].createElement("div", {
          className: _styles["default"].presence
        }, _react["default"].createElement("div", null, _react["default"].createElement("span", {
          className: _styles["default"].inactiveText
        }, _i18n["default"].getString('notActivated', currentLocale))));
      }

      return presence ? _react["default"].createElement("div", {
        className: _styles["default"].presence
      }, _react["default"].createElement("div", {
        className: _styles["default"].presenceNodeContainer
      }, _react["default"].createElement(_PresenceStatusIcon["default"], _extends({
        className: _styles["default"].presenceNode
      }, presence))), _react["default"].createElement("span", {
        className: _styles["default"].presenceStatus
      }, presenceName)) : null;
    };

    return _this;
  }

  _createClass(ContactDetails, [{
    key: "renderProfile",
    value: function renderProfile() {
      var _this$props = this.props,
          contactItem = _this$props.contactItem,
          sourceNodeRenderer = _this$props.sourceNodeRenderer,
          currentLocale = _this$props.currentLocale;
      var name = contactItem.name,
          presence = contactItem.presence,
          profileImageUrl = contactItem.profileImageUrl,
          type = contactItem.type,
          contactStatus = contactItem.contactStatus;
      var sourceNode = sourceNodeRenderer({
        sourceType: type
      });
      var presenceName = presence ? getPresenceStatusName(presence, currentLocale) : null;
      return _react["default"].createElement("div", {
        className: _styles["default"].contactProfile
      }, _react["default"].createElement("div", {
        className: _styles["default"].avatar
      }, _react["default"].createElement("div", {
        className: _styles["default"].avatarNodeContainer
      }, _react["default"].createElement(AvatarNode, {
        name: name,
        avatarUrl: profileImageUrl,
        isInactive: contactStatus === 'NotActivated'
      }), sourceNode ? _react["default"].createElement("div", {
        className: _styles["default"].sourceNodeContainer
      }, sourceNode) : null)), _react["default"].createElement("div", {
        className: _styles["default"].info
      }, _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].name, !presence ? _styles["default"].nameWithoutPresence : null)
      }, _react["default"].createElement("span", {
        style: contactStatus === 'NotActivated' ? {
          color: '#999999',
          fontSize: '12px'
        } : null,
        title: name
      }, name)), this.renderPresence(contactStatus, presence, presenceName, currentLocale)));
    }
  }, {
    key: "getListContainerBuilder",
    value: function getListContainerBuilder(label, listComp) {
      return _react["default"].createElement("div", {
        className: _styles["default"].item,
        key: label
      }, _react["default"].createElement("div", {
        className: _styles["default"].label
      }, _react["default"].createElement("span", null, label)), _react["default"].createElement("ul", null, listComp));
    }
  }, {
    key: "getListItem",
    value: function getListItem(_ref2) {
      var _this2 = this;

      var showCallBtn = _ref2.showCallBtn,
          showTextBtn = _ref2.showTextBtn,
          disableCallButton = _ref2.disableCallButton,
          key = _ref2.key,
          number = _ref2.number,
          currentLocale = _ref2.currentLocale,
          contactItem = _ref2.contactItem,
          _ref2$needFormat = _ref2.needFormat,
          needFormat = _ref2$needFormat === void 0 ? true : _ref2$needFormat;
      var displayedPhoneNumber;

      if (needFormat) {
        var _this$props$formatNum = this.props.formatNumber(number),
            phoneNumber = _this$props$formatNum.phoneNumber;

        displayedPhoneNumber = phoneNumber;
      } else {
        displayedPhoneNumber = number;
      }

      return _react["default"].createElement("li", {
        key: key
      }, _react["default"].createElement("div", {
        className: _styles["default"].number
      }, _react["default"].createElement("span", {
        title: displayedPhoneNumber
      }, displayedPhoneNumber)), _react["default"].createElement("div", {
        className: _styles["default"].menu
      }, showCallBtn ? _react["default"].createElement("button", {
        className: (0, _classnames["default"])(disableCallButton && _styles["default"].disabled),
        title: _i18n["default"].getString('call', currentLocale),
        onClick: function onClick() {
          return _this2.onClickToDial(contactItem, number);
        }
      }, _react["default"].createElement("i", {
        className: _DynamicsFont["default"].call
      })) : null, showTextBtn ? _react["default"].createElement("button", {
        title: _i18n["default"].getString('text', currentLocale),
        onClick: function onClick() {
          return _this2.onClickToSMS(contactItem, number);
        }
      }, _react["default"].createElement("i", {
        className: _DynamicsFont["default"].composeText
      })) : null));
    }
  }, {
    key: "getPhoneSections",
    value: function getPhoneSections() {
      var _this3 = this;

      var _this$props2 = this.props,
          contactItem = _this$props2.contactItem,
          currentLocale = _this$props2.currentLocale,
          disableCallButton = _this$props2.disableCallButton;
      var phoneNumbers = contactItem.phoneNumbers,
          phoneMaps = contactItem.phoneMaps,
          schema = contactItem.schema;

      if (!phoneNumbers.length) {
        return null;
      }

      return _react["default"].createElement("div", {
        className: _styles["default"].contacts
      }, (0, _ramda.map)(function (key) {
        switch (key) {
          case _phoneTypes["default"].extension:
            {
              return _this3.getListContainerBuilder(_i18n["default"].getString(_phoneTypes["default"].extension, currentLocale), (0, _ramda.map)(function (phoneNumberElm) {
                return _this3.getListItem({
                  showCallBtn: _this3.props.internalSmsPermission,
                  showTextBtn: _this3.props.onClickToDial,
                  disableCallButton: disableCallButton,
                  key: phoneNumberElm.phoneNumber,
                  number: phoneNumberElm.phoneNumber,
                  currentLocale: currentLocale,
                  contactItem: contactItem
                });
              }, phoneMaps[key]));
            }

          case _phoneTypes["default"].fax:
            {
              return _this3.getListContainerBuilder(_i18n["default"].getString(_phoneTypes["default"].fax, currentLocale), (0, _ramda.map)(function (phoneNumberElm) {
                return _this3.getListItem({
                  showCallBtn: false,
                  showTextBtn: false,
                  key: phoneNumberElm.phoneNumber,
                  number: phoneNumberElm.phoneNumber,
                  currentLocale: currentLocale,
                  contactItem: contactItem
                });
              }, phoneMaps[key]));
            }

          default:
            {
              return _this3.getListContainerBuilder(_i18n["default"].getString(_phoneTypes["default"][key], currentLocale), (0, _ramda.map)(function (phoneNumberElm) {
                return _this3.getListItem({
                  showCallBtn: _this3.props.onClickToDial,
                  showTextBtn: _this3.props.outboundSmsPermission,
                  disableCallButton: disableCallButton,
                  key: phoneNumberElm.phoneNumber,
                  number: phoneNumberElm.phoneNumber,
                  currentLocale: currentLocale,
                  contactItem: contactItem
                });
              }, phoneMaps[key]));
            }
        }
      }, schema));
    }
  }, {
    key: "renderEmailCell",
    value: function renderEmailCell() {
      var _this4 = this;

      var onClickMailTo = this.props.onClickMailTo;
      var _this$props$contactIt = this.props.contactItem,
          emails = _this$props$contactIt.emails,
          type = _this$props$contactIt.type;
      if (!emails || emails.length <= 0) return null;
      var hasMailToHandler = typeof onClickMailTo === 'function';
      var emailListView = emails.map(function (email, index) {
        return _react["default"].createElement("li", {
          key: index
        }, _react["default"].createElement("a", {
          title: email,
          className: hasMailToHandler ? _styles["default"].underline : null,
          onClick: function onClick() {
            return _this4.onClickMailTo(email, type);
          }
        }, email));
      });
      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: _styles["default"].label
      }, _react["default"].createElement("span", null, _i18n["default"].getString('emailLabel', this.props.currentLocale))), _react["default"].createElement("ul", null, emailListView));
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: _styles["default"].root
      }, _react["default"].createElement("div", {
        className: _styles["default"].profile
      }, this.renderProfile()), this.getPhoneSections(), _react["default"].createElement("div", {
        className: _styles["default"].email
      }, this.renderEmailCell()));
    }
  }]);

  return ContactDetails;
}(_react.PureComponent);

exports["default"] = ContactDetails;
var contactItemPropTypes = {
  id: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]).isRequired,
  type: _propTypes["default"].string.isRequired,
  firstName: _propTypes["default"].string,
  lastName: _propTypes["default"].string,
  email: _propTypes["default"].string,
  profileImageUrl: _propTypes["default"].string,
  phoneNumbers: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    phoneNumber: _propTypes["default"].string,
    phoneType: _propTypes["default"].string
  })),
  contactStatus: _propTypes["default"].string
};
exports.contactItemPropTypes = contactItemPropTypes;
ContactDetails.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  contactItem: _propTypes["default"].shape(contactItemPropTypes).isRequired,
  sourceNodeRenderer: _propTypes["default"].func,
  onClickToSMS: _propTypes["default"].func,
  onClickToDial: _propTypes["default"].func,
  onClickMailTo: _propTypes["default"].func,
  formatNumber: _propTypes["default"].func.isRequired,
  outboundSmsPermission: _propTypes["default"].bool,
  internalSmsPermission: _propTypes["default"].bool,
  disableCallButton: _propTypes["default"].bool
};
ContactDetails.defaultProps = {
  onClickToSMS: undefined,
  onClickToDial: undefined,
  onClickMailTo: undefined,
  sourceNodeRenderer: function sourceNodeRenderer() {
    return null;
  },
  outboundSmsPermission: false,
  internalSmsPermission: false,
  disableCallButton: false
};
//# sourceMappingURL=index.js.map
