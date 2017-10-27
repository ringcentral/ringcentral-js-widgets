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

var _GoogleLogo = require('../../assets/images/GoogleLogo.svg');

var _GoogleLogo2 = _interopRequireDefault(_GoogleLogo);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function SourceNode(_ref2) {
  var sourceType = _ref2.sourceType;

  switch (sourceType) {
    case 'google':
      return _react2.default.createElement(_GoogleLogo2.default, {
        className: _styles2.default.sourceNode
      });
    default:
      return null;
  }
}
SourceNode.propTypes = {
  sourceType: _propTypes2.default.string
};
SourceNode.defaultProps = {
  sourceType: undefined
};

var ContactItem = function (_Component) {
  (0, _inherits3.default)(ContactItem, _Component);

  function ContactItem(props) {
    (0, _classCallCheck3.default)(this, ContactItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ContactItem.__proto__ || (0, _getPrototypeOf2.default)(ContactItem)).call(this, props));

    _this.state = {
      loading: true,
      avatarUrl: undefined,
      presence: undefined
    };

    _this.onItemSelected = _this.onItemSelected.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ContactItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this._mounted = true;
      setTimeout(function () {
        // clear timeout is probably not necessary
        if (_this2._mounted) {
          _this2.setState({
            loading: false
          });
        }
      }, 10);

      this.props.getAvatarUrl(this.props.contact).then(function (avatarUrl) {
        if (_this2._mounted) {
          _this2.setState({
            avatarUrl: avatarUrl
          });
        }
      });

      this.props.getPresence(this.props.contact).then(function (presence) {
        if (_this2._mounted) {
          _this2.setState({
            presence: presence
          });
        }
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._mounted = false;
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

      var _props$contact = this.props.contact,
          name = _props$contact.name,
          phoneNumber = _props$contact.phoneNumber;

      // TODO:

      var type = '';

      return _react2.default.createElement(
        'div',
        {
          className: _styles2.default.root,
          onClick: this.onItemSelected
        },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.contactProfile },
          _react2.default.createElement(
            'div',
            { className: _styles2.default.avatarNodeContainer },
            _react2.default.createElement(AvatarNode, {
              name: name,
              avatarUrl: this.state.avatarUrl
            })
          ),
          type ? _react2.default.createElement(
            'div',
            { className: _styles2.default.sourceNodeContainer },
            _react2.default.createElement(SourceNode, {
              sourceType: type
            })
          ) : null,
          this.state.presence ? _react2.default.createElement(
            'div',
            { className: _styles2.default.presenceNodeContainer },
            _react2.default.createElement(_PresenceStatusIcon2.default, (0, _extends3.default)({
              className: _styles2.default.presenceNode
            }, this.state.presence))
          ) : null
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.contactName, title: name },
          name
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.phoneNumber, title: phoneNumber },
          phoneNumber
        )
      );
    }
  }]);
  return ContactItem;
}(_react.Component);

exports.default = ContactItem;


ContactItem.propTypes = {
  contact: _propTypes2.default.shape({
    id: _propTypes2.default.string,
    type: _propTypes2.default.string,
    hasProfileImage: _propTypes2.default.bool,
    entityType: _propTypes2.default.string,
    name: _propTypes2.default.string,
    phoneNumber: _propTypes2.default.string,
    email: _propTypes2.default.string
  }).isRequired,
  getAvatarUrl: _propTypes2.default.func.isRequired,
  getPresence: _propTypes2.default.func.isRequired,
  onSelect: _propTypes2.default.func
};

ContactItem.defaultProps = {
  onSelect: undefined
};
//# sourceMappingURL=index.js.map
