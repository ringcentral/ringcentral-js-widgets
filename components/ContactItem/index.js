'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _PresenceStatusIcon = require('../PresenceStatusIcon');

var _PresenceStatusIcon2 = _interopRequireDefault(_PresenceStatusIcon);

var _DefaultAvatar = require('../../assets/images/DefaultAvatar.svg');

var _DefaultAvatar2 = _interopRequireDefault(_DefaultAvatar);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var ContactItem = function (_PureComponent) {
  (0, _inherits3.default)(ContactItem, _PureComponent);

  function ContactItem(props) {
    (0, _classCallCheck3.default)(this, ContactItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ContactItem.__proto__ || (0, _getPrototypeOf2.default)(ContactItem)).call(this, props));

    _this.renderPresence = function (contact) {
      var presence = contact.presence,
          contactStatus = contact.contactStatus;

      if (contactStatus === 'NotActivated') {
        return null;
      }

      return presence ? _react2.default.createElement(
        'div',
        { className: _styles2.default.presenceNodeContainer },
        _react2.default.createElement(_PresenceStatusIcon2.default, (0, _extends3.default)({ className: _styles2.default.presenceNode }, presence))
      ) : null;
    };

    _this.renderMiddle = function (contact, currentLocale) {
      var name = contact.name,
          contactStatus = contact.contactStatus;

      if (contactStatus === 'NotActivated') {
        return _react2.default.createElement(
          'div',
          { className: _styles2.default.infoWrapper },
          _react2.default.createElement(
            'div',
            { className: _styles2.default.inactiveContactName, title: name },
            name
          ),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.inactiveText },
            _i18n2.default.getString('notActivated', currentLocale)
          )
        );
      }

      return _react2.default.createElement(
        'div',
        { className: _styles2.default.contactName, title: name },
        name
      );
    };

    _this.state = {
      loading: true
    };
    _this.onItemSelected = _this.onItemSelected.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ContactItem, [{
    key: 'componentDidMount',
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
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._mounted = false;
      if (this._loadingTimeout) {
        clearTimeout(this._loadingTimeout);
      }
    }
  }, {
    key: 'onItemSelected',
    value: function onItemSelected() {
      var func = this.props.onSelect;
      if (func) {
        func(this.props.contact);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.loading) {
        return _react2.default.createElement('div', { className: _styles2.default.root });
      }
      var _props = this.props,
          contact = _props.contact,
          currentLocale = _props.currentLocale;
      var name = contact.name,
          extensionNumber = contact.extensionNumber,
          type = contact.type,
          profileImageUrl = contact.profileImageUrl,
          contactStatus = contact.contactStatus;
      var sourceNodeRenderer = this.props.sourceNodeRenderer;

      var sourceNode = sourceNodeRenderer({ sourceType: type });
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.root, onClick: this.onItemSelected },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.contactProfile },
          _react2.default.createElement(
            'div',
            { className: _styles2.default.avatarNodeContainer },
            _react2.default.createElement(AvatarNode, {
              name: name,
              avatarUrl: profileImageUrl,
              isInactive: contactStatus === 'NotActivated' })
          ),
          sourceNode ? _react2.default.createElement(
            'div',
            { className: _styles2.default.sourceNodeContainer },
            sourceNode
          ) : null,
          this.renderPresence(this.props.contact)
        ),
        this.renderMiddle(contact, currentLocale),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.phoneNumber, title: extensionNumber },
          extensionNumber
        )
      );
    }
  }]);
  return ContactItem;
}(_react.PureComponent);

exports.default = ContactItem;


ContactItem.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  contact: _propTypes2.default.shape({
    id: _propTypes2.default.string,
    type: _propTypes2.default.string,
    name: _propTypes2.default.string,
    extensionNumber: _propTypes2.default.string,
    email: _propTypes2.default.string,
    profileImageUrl: _propTypes2.default.string,
    presence: _propTypes2.default.object,
    contactStatus: _propTypes2.default.string
  }).isRequired,
  getAvatarUrl: _propTypes2.default.func.isRequired,
  getPresence: _propTypes2.default.func.isRequired,
  onSelect: _propTypes2.default.func,
  sourceNodeRenderer: _propTypes2.default.func
};

ContactItem.defaultProps = {
  onSelect: undefined,
  sourceNodeRenderer: function sourceNodeRenderer() {
    return null;
  }
};
//# sourceMappingURL=index.js.map
