'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConferenceInfo = undefined;

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CallAvatar = require('../CallAvatar');

var _CallAvatar2 = _interopRequireDefault(_CallAvatar);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConferenceInfo = exports.ConferenceInfo = function (_Component) {
  (0, _inherits3.default)(ConferenceInfo, _Component);

  function ConferenceInfo() {
    (0, _classCallCheck3.default)(this, ConferenceInfo);
    return (0, _possibleConstructorReturn3.default)(this, (ConferenceInfo.__proto__ || (0, _getPrototypeOf2.default)(ConferenceInfo)).apply(this, arguments));
  }

  (0, _createClass3.default)(ConferenceInfo, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var partyProfiles = nextProps.partyProfiles;

      var oldpartyProfiles = this.props.partyProfiles;
      var showUpdate = true;
      if (partyProfiles !== oldpartyProfiles) {
        if (Array.isArray(partyProfiles) && Array.isArray(oldpartyProfiles) && partyProfiles.length === oldpartyProfiles.length) {
          showUpdate = false;
          for (var i = 0; i < partyProfiles.length; i += 1) {
            if (partyProfiles[i].id !== oldpartyProfiles[i].id) {
              showUpdate = true;
              break;
            }
          }
        }
      } else {
        showUpdate = false;
      }

      return showUpdate;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          currentLocale = _props.currentLocale,
          partyProfiles = _props.partyProfiles,
          _onClick = _props.onClick;

      var MAXIMUM_AVATARS = 4;
      var profiles = partyProfiles || [];

      var displayedProfiles = profiles.length >= MAXIMUM_AVATARS ? profiles.slice(0, MAXIMUM_AVATARS) : profiles;

      var remains = profiles.length > MAXIMUM_AVATARS ? profiles.length - MAXIMUM_AVATARS : 0;

      return _react2.default.createElement(
        'div',
        {
          className: _styles2.default.conferenceCallInfoContainer
        },
        displayedProfiles.length ? _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)(_styles2.default.avatarContainer, _styles2.default.clickable),
            onClick: function onClick(e) {
              e.preventDefault();_onClick();
            }
          },
          displayedProfiles.map(function (_ref, idx) {
            var avatarUrl = _ref.avatarUrl,
                toUserName = _ref.toUserName;
            return _react2.default.createElement(
              'div',
              {
                key: toUserName + '_' + idx,
                className: _styles2.default.avatar },
              _react2.default.createElement(_CallAvatar2.default, {
                avatarUrl: avatarUrl
              })
            );
          }),
          remains > 0 ? _react2.default.createElement(
            'div',
            {
              className: (0, _classnames2.default)(_styles2.default.avatar, _styles2.default.remains)
            },
            '+' + remains
          ) : null
        ) : _react2.default.createElement(
          'div',
          { className: _styles2.default.avatarContainer },
          _react2.default.createElement(
            'div',
            { className: _styles2.default.avatar, style: { backgroundColor: '#fff' } },
            _react2.default.createElement('i', { className: (0, _classnames2.default)(_DynamicsFont2.default.portrait, _styles2.default.icon) })
          )
        ),
        _react2.default.createElement(
          'p',
          { className: _styles2.default.info },
          _i18n2.default.getString('conferenceCall', currentLocale)
        )
      );
    }
  }]);
  return ConferenceInfo;
}(_react.Component);

ConferenceInfo.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  partyProfiles: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    avatarUrl: _propTypes2.default.string,
    toUserName: _propTypes2.default.string
  })),
  onClick: _propTypes2.default.func
};

ConferenceInfo.defaultProps = {
  partyProfiles: null,
  onClick: function onClick(i) {
    return i;
  }
};

exports.default = ConferenceInfo;
//# sourceMappingURL=ConferenceInfo.js.map
