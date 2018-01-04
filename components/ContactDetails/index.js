'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contactItemPropTypes = exports.default = undefined;

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

var _presenceStatus = require('ringcentral-integration/modules/Presence/presenceStatus');

var _presenceStatus2 = _interopRequireDefault(_presenceStatus);

var _PresenceStatusIcon = require('../PresenceStatusIcon');

var _PresenceStatusIcon2 = _interopRequireDefault(_PresenceStatusIcon);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _DefaultAvatar = require('../../assets/images/DefaultAvatar.svg');

var _DefaultAvatar2 = _interopRequireDefault(_DefaultAvatar);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import FaxIcon from '../../assets/images/Fax.svg';
function getPresenceStatusName(presence, currentLocale) {
  var dndStatus = presence.dndStatus,
      presenceStatus = presence.presenceStatus;

  var userStatus = presenceStatus || presence.userStatus;
  if (userStatus !== _presenceStatus2.default.busy) {
    return _i18n2.default.getString(userStatus, currentLocale);
  }
  return _i18n2.default.getString(userStatus + dndStatus, currentLocale);
}

function AvatarNode(_ref) {
  var name = _ref.name,
      avatarUrl = _ref.avatarUrl;

  return avatarUrl ? _react2.default.createElement('img', {
    className: _styles2.default.avatarNode,
    alt: name,
    src: avatarUrl
  }) : _react2.default.createElement(_DefaultAvatar2.default, {
    className: _styles2.default.avatarNode
  });
}
AvatarNode.propTypes = {
  name: _propTypes2.default.string,
  avatarUrl: _propTypes2.default.string
};
AvatarNode.defaultProps = {
  name: undefined,
  avatarUrl: undefined
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
          type = contactItem.type;

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
            _react2.default.createElement(AvatarNode, {
              name: name,
              avatarUrl: profileImageUrl
            }),
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
            { className: (0, _classnames2.default)(_styles2.default.name, !presence ? _styles2.default.nameWithoutPresence : null) },
            _react2.default.createElement(
              'span',
              { title: name },
              name
            )
          ),
          presence ? _react2.default.createElement(
            'div',
            { className: _styles2.default.presence },
            _react2.default.createElement(
              'div',
              { className: _styles2.default.presenceNodeContainer },
              _react2.default.createElement(_PresenceStatusIcon2.default, (0, _extends3.default)({
                className: _styles2.default.presenceNode
              }, presence))
            ),
            _react2.default.createElement(
              'span',
              { className: _styles2.default.presenceStatus },
              presenceName
            )
          ) : null
        )
      );
    }
  }, {
    key: 'renderExtensionCell',
    value: function renderExtensionCell() {
      var _this2 = this;

      var _props2 = this.props,
          contactItem = _props2.contactItem,
          currentLocale = _props2.currentLocale;
      var extensionNumber = contactItem.extensionNumber;

      if (!extensionNumber) return null;
      var textBtn = this.props.internalSmsPermission ? _react2.default.createElement(
        'button',
        { title: _i18n2.default.getString('text', currentLocale), onClick: function onClick() {
            return _this2.onClickToSMS(contactItem, extensionNumber);
          } },
        _react2.default.createElement('i', { className: _DynamicsFont2.default.composeText })
      ) : null;
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.item },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.label },
          _react2.default.createElement(
            'span',
            null,
            _i18n2.default.getString('extensionLabel', currentLocale)
          )
        ),
        _react2.default.createElement(
          'ul',
          null,
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'div',
              { className: _styles2.default.number },
              _react2.default.createElement(
                'span',
                { title: extensionNumber },
                extensionNumber
              )
            ),
            _react2.default.createElement(
              'div',
              { className: _styles2.default.menu },
              _react2.default.createElement(
                'button',
                { title: _i18n2.default.getString('call', currentLocale), onClick: function onClick() {
                    return _this2.onClickToDial(contactItem, extensionNumber);
                  } },
                _react2.default.createElement('i', { className: _DynamicsFont2.default.call })
              ),
              textBtn
            )
          )
        )
      );
    }
  }, {
    key: 'renderDirectNumberCell',
    value: function renderDirectNumberCell() {
      var _this3 = this;

      var _props3 = this.props,
          contactItem = _props3.contactItem,
          currentLocale = _props3.currentLocale;
      var phoneNumbers = contactItem.phoneNumbers;

      var phoneNumberListView = phoneNumbers.map(function (_ref3, index) {
        var phoneType = _ref3.phoneType,
            phoneNumber = _ref3.phoneNumber;

        if (phoneType === 'extension') return null;
        var formattedPhoneNumber = _this3.props.formatNumber(phoneNumber);
        var textBtn = _this3.props.outboundSmsPermission ? _react2.default.createElement(
          'button',
          { title: _i18n2.default.getString('text', currentLocale), onClick: function onClick() {
              return _this3.onClickToSMS(contactItem, phoneNumber);
            } },
          _react2.default.createElement('i', { className: _DynamicsFont2.default.composeText })
        ) : null;
        return _react2.default.createElement(
          'li',
          { key: index },
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
            _react2.default.createElement(
              'button',
              { title: _i18n2.default.getString('call', currentLocale), onClick: function onClick() {
                  return _this3.onClickToDial(contactItem, phoneNumber);
                } },
              _react2.default.createElement('i', { className: _DynamicsFont2.default.call })
            ),
            textBtn
          )
        );
      }).filter(function (v) {
        return !!v;
      });
      if (phoneNumberListView.length <= 0) return null;
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.item },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.label },
          _react2.default.createElement(
            'span',
            null,
            _i18n2.default.getString('directLabel', currentLocale)
          )
        ),
        _react2.default.createElement(
          'ul',
          null,
          phoneNumberListView
        )
      );
    }
  }, {
    key: 'renderEmailCell',
    value: function renderEmailCell() {
      var _this4 = this;

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
                return _this4.onClickMailTo(email, type);
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
      var extensionCellView = this.renderExtensionCell();
      var directNumberCellView = this.renderDirectNumberCell();
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.root },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.profile },
          this.renderProfile()
        ),
        extensionCellView || directNumberCellView ? _react2.default.createElement(
          'div',
          { className: _styles2.default.contacts },
          extensionCellView,
          directNumberCellView
        ) : null,
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
  }))
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
