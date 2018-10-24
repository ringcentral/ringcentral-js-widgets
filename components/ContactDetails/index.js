'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contactItemPropTypes = exports.default = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.getPresenceStatusName = getPresenceStatusName;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dndStatus = require('ringcentral-integration/modules/Presence/dndStatus');

var _dndStatus2 = _interopRequireDefault(_dndStatus);

var _ramda = require('ramda');

var _PresenceStatusIcon = require('../PresenceStatusIcon');

var _PresenceStatusIcon2 = _interopRequireDefault(_PresenceStatusIcon);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _DefaultAvatar = require('../../assets/images/DefaultAvatar.svg');

var _DefaultAvatar2 = _interopRequireDefault(_DefaultAvatar);

var _phoneTypes = require('../../enums/phoneTypes');

var _phoneTypes2 = _interopRequireDefault(_phoneTypes);

var _phoneTypeNames = require('../../lib/phoneTypeNames');

var _phoneTypeNames2 = _interopRequireDefault(_phoneTypeNames);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import FaxIcon from '../../assets/images/Fax.svg';
function getPresenceStatusName(presence, currentLocale) {
  var presenceStatus = presence.presenceStatus,
      dndStatus = presence.dndStatus;

  if (dndStatus === _dndStatus2.default.doNotAcceptAnyCalls) {
    return _i18n2.default.getString(dndStatus, currentLocale);
  }
  return _i18n2.default.getString(presenceStatus, currentLocale);
}

function AvatarNode(_ref) {
  var name = _ref.name,
      avatarUrl = _ref.avatarUrl,
      isInactive = _ref.isInactive;

  var avatarStyle = isInactive ? _styles2.default.inactiveAvatarNode : _styles2.default.avatarNode;
  return avatarUrl ? _react2.default.createElement('img', { className: avatarStyle, alt: name, src: avatarUrl }) : _react2.default.createElement(_DefaultAvatar2.default, { className: avatarStyle });
}
AvatarNode.propTypes = {
  name: _propTypes2.default.string,
  avatarUrl: _propTypes2.default.string,
  isInactive: _propTypes2.default.bool
};
AvatarNode.defaultProps = {
  name: undefined,
  avatarUrl: undefined,
  isInactive: false
};

var ContactDetails = function (_PureComponent) {
  (0, _inherits3.default)(ContactDetails, _PureComponent);

  function ContactDetails() {
    var _ref2;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ContactDetails);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = ContactDetails.__proto__ || (0, _getPrototypeOf2.default)(ContactDetails)).call.apply(_ref2, [this].concat(args))), _this), _this.onClickToDial = function (contact, phoneNumber) {
      _this.props.onClickToDial((0, _extends3.default)({}, contact, {
        phoneNumber: phoneNumber
      }));
    }, _this.onClickToSMS = function (contact, phoneNumber) {
      _this.props.onClickToSMS((0, _extends3.default)({}, contact, {
        phoneNumber: phoneNumber
      }));
    }, _this.onClickMailTo = function (email, contactType) {
      if (typeof _this.props.onClickMailTo === 'function') {
        _this.props.onClickMailTo(email, contactType);
      }
    }, _this.renderPresence = function (contactStatus, presence, presenceName, currentLocale) {
      if (contactStatus === 'NotActivated') {
        return _react2.default.createElement(
          'div',
          { className: _styles2.default.presence },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'span',
              { className: _styles2.default.inactiveText },
              _i18n2.default.getString('notActivated', currentLocale)
            )
          )
        );
      }

      return presence ? _react2.default.createElement(
        'div',
        { className: _styles2.default.presence },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.presenceNodeContainer },
          _react2.default.createElement(_PresenceStatusIcon2.default, (0, _extends3.default)({ className: _styles2.default.presenceNode }, presence))
        ),
        _react2.default.createElement(
          'span',
          { className: _styles2.default.presenceStatus },
          presenceName
        )
      ) : null;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ContactDetails, [{
    key: 'renderProfile',
    value: function renderProfile() {
      var _props = this.props,
          contactItem = _props.contactItem,
          sourceNodeRenderer = _props.sourceNodeRenderer,
          currentLocale = _props.currentLocale;
      var name = contactItem.name,
          presence = contactItem.presence,
          profileImageUrl = contactItem.profileImageUrl,
          type = contactItem.type,
          contactStatus = contactItem.contactStatus;

      var sourceNode = sourceNodeRenderer({ sourceType: type });
      var presenceName = presence ? getPresenceStatusName(presence, currentLocale) : null;
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.contactProfile },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.avatar },
          _react2.default.createElement(
            'div',
            { className: _styles2.default.avatarNodeContainer },
            _react2.default.createElement(AvatarNode, { name: name, avatarUrl: profileImageUrl, isInactive: contactStatus === 'NotActivated' }),
            sourceNode ? _react2.default.createElement(
              'div',
              { className: _styles2.default.sourceNodeContainer },
              sourceNode
            ) : null
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.info },
          _react2.default.createElement(
            'div',
            {
              className: (0, _classnames2.default)(_styles2.default.name, !presence ? _styles2.default.nameWithoutPresence : null)
            },
            _react2.default.createElement(
              'span',
              { style: contactStatus === 'NotActivated' ? { color: '#999999', fontSize: '12px' } : null, title: name },
              name
            )
          ),
          this.renderPresence(contactStatus, presence, presenceName, currentLocale)
        )
      );
    }
  }, {
    key: 'getListContainerBuilder',
    value: function getListContainerBuilder(label, listComp) {
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.item, key: label },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.label },
          _react2.default.createElement(
            'span',
            null,
            label
          )
        ),
        _react2.default.createElement(
          'ul',
          null,
          listComp
        )
      );
    }
  }, {
    key: 'getListItem',
    value: function getListItem(_ref3) {
      var showCallBtn = _ref3.showCallBtn,
          showTextBtn = _ref3.showTextBtn,
          onClickToDial = _ref3.onClickToDial,
          onClickToSMS = _ref3.onClickToSMS,
          key = _ref3.key,
          number = _ref3.number,
          currentLocale = _ref3.currentLocale,
          contactItem = _ref3.contactItem;

      var formattedPhoneNumber = this.props.formatNumber(number);

      return _react2.default.createElement(
        'li',
        { key: key },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.number },
          _react2.default.createElement(
            'span',
            { title: formattedPhoneNumber },
            formattedPhoneNumber
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.menu },
          showCallBtn ? _react2.default.createElement(
            'button',
            {
              title: _i18n2.default.getString('call', currentLocale),
              onClick: function onClick() {
                return onClickToDial(contactItem, number);
              }
            },
            _react2.default.createElement('i', { className: _DynamicsFont2.default.call })
          ) : null,
          showTextBtn ? _react2.default.createElement(
            'button',
            {
              title: _i18n2.default.getString('text', currentLocale),
              onClick: function onClick() {
                return onClickToSMS(contactItem, number);
              }
            },
            _react2.default.createElement('i', { className: _DynamicsFont2.default.composeText })
          ) : null
        )
      );
    }
  }, {
    key: 'getPhoneSections',
    value: function getPhoneSections() {
      var _this2 = this;

      var _props2 = this.props,
          contactItem = _props2.contactItem,
          currentLocale = _props2.currentLocale;
      var phoneNumbers = contactItem.phoneNumbers;


      var phoneMaps = (0, _ramda.reduce)(function (acc, phoneNumberElm) {
        acc[phoneNumberElm.phoneType] = acc[phoneNumberElm.phoneType] || [];
        acc[phoneNumberElm.phoneType].push(phoneNumberElm);

        return acc;
      }, {}, phoneNumbers);

      // we need sequence that: ext followed by direct followed by others.
      var schema = (0, _ramda.filter)(function (key) {
        return !!_phoneTypes2.default[key] && Array.isArray(phoneMaps[key]);
      }, [_phoneTypes2.default.extension, _phoneTypes2.default.direct].concat((0, _toConsumableArray3.default)((0, _keys2.default)(phoneMaps).filter(function (key) {
        return key !== _phoneTypes2.default.extension && key !== _phoneTypes2.default.direct;
      }))));

      return _react2.default.createElement(
        'div',
        { className: _styles2.default.contacts },
        (0, _ramda.map)(function (key) {
          switch (key) {
            case _phoneTypes2.default.extension:
              {
                return _this2.getListContainerBuilder(_i18n2.default.getString(_phoneTypes2.default.extension, currentLocale), (0, _ramda.map)(function (phoneNumberElm) {
                  return _this2.getListItem({
                    showCallBtn: _this2.props.internalSmsPermission,
                    showTextBtn: _this2.props.onClickToDial,
                    onClickToDial: _this2.props.onClickToDial,
                    onClickToSMS: _this2.props.onClickToSMS,
                    key: phoneNumberElm.phoneNumber,
                    number: phoneNumberElm.phoneNumber
                  });
                }, phoneMaps[key]));
              }
            case _phoneTypes2.default.fax:
              {
                return _this2.getListContainerBuilder(_i18n2.default.getString(_phoneTypes2.default.fax, currentLocale), (0, _ramda.map)(function (phoneNumberElm) {
                  return _this2.getListItem({
                    showCallBtn: false,
                    showTextBtn: false,
                    onClickToDial: _this2.props.onClickToDial,
                    onClickToSMS: _this2.props.onClickToSMS,
                    key: phoneNumberElm.phoneNumber,
                    number: phoneNumberElm.phoneNumber
                  });
                }, phoneMaps[key]));
              }
            default:
              {
                return _this2.getListContainerBuilder(_i18n2.default.getString(_phoneTypes2.default[key], currentLocale), (0, _ramda.map)(function (phoneNumberElm) {
                  return _this2.getListItem({
                    showCallBtn: _this2.props.onClickToDial,
                    showTextBtn: _this2.props.outboundSmsPermission,
                    onClickToDial: _this2.props.onClickToDial,
                    onClickToSMS: _this2.props.onClickToSMS,
                    key: phoneNumberElm.phoneNumber,
                    number: phoneNumberElm.phoneNumber
                  });
                }, phoneMaps[key]));
              }
          }
        }, schema)
      );
    }
  }, {
    key: 'renderEmailCell',
    value: function renderEmailCell() {
      var _this3 = this;

      var onClickMailTo = this.props.onClickMailTo;
      var _props$contactItem = this.props.contactItem,
          emails = _props$contactItem.emails,
          type = _props$contactItem.type;

      if (!emails || emails.length <= 0) return null;
      var hasMailToHandler = typeof onClickMailTo === 'function';
      var emailListView = emails.map(function (email, index) {
        return _react2.default.createElement(
          'li',
          { key: index },
          _react2.default.createElement(
            'a',
            {
              title: email,
              className: hasMailToHandler ? _styles2.default.underline : null,
              onClick: function onClick() {
                return _this3.onClickMailTo(email, type);
              }
            },
            email
          )
        );
      });
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: _styles2.default.label },
          _react2.default.createElement(
            'span',
            null,
            _i18n2.default.getString('emailLabel', this.props.currentLocale)
          )
        ),
        _react2.default.createElement(
          'ul',
          null,
          emailListView
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.root },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.profile },
          this.renderProfile()
        ),
        this.getPhoneSections(),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.email },
          this.renderEmailCell()
        )
      );
    }
  }]);
  return ContactDetails;
}(_react.PureComponent);

exports.default = ContactDetails;
var contactItemPropTypes = exports.contactItemPropTypes = {
  id: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,
  type: _propTypes2.default.string.isRequired,
  firstName: _propTypes2.default.string,
  lastName: _propTypes2.default.string,
  email: _propTypes2.default.string,
  profileImageUrl: _propTypes2.default.string,
  phoneNumbers: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    phoneNumber: _propTypes2.default.string,
    phoneType: _propTypes2.default.string
  })),
  contactStatus: _propTypes2.default.string
};

ContactDetails.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  contactItem: _propTypes2.default.shape(contactItemPropTypes).isRequired,
  sourceNodeRenderer: _propTypes2.default.func,
  onClickToSMS: _propTypes2.default.func,
  onClickToDial: _propTypes2.default.func,
  onClickMailTo: _propTypes2.default.func,
  formatNumber: _propTypes2.default.func.isRequired,
  outboundSmsPermission: _propTypes2.default.bool,
  internalSmsPermission: _propTypes2.default.bool
};

ContactDetails.defaultProps = {
  onClickToSMS: undefined,
  onClickToDial: undefined,
  onClickMailTo: undefined,
  sourceNodeRenderer: function sourceNodeRenderer() {
    return null;
  },
  outboundSmsPermission: false,
  internalSmsPermission: false
};
//# sourceMappingURL=index.js.map
