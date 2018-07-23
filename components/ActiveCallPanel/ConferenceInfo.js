'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ConferenceInfo(_ref) {
  var currentLocale = _ref.currentLocale,
      partyProfiles = _ref.partyProfiles,
      _onClick = _ref.onClick;

  var MAXIMUM_AVATARS = 4;
  var profiles = partyProfiles || [];

  var displayedProfiles = profiles.length >= MAXIMUM_AVATARS ? profiles.slice(0, MAXIMUM_AVATARS) : profiles;

  var remains = profiles.length > MAXIMUM_AVATARS ? profiles.length - MAXIMUM_AVATARS : 0;

  return _react2.default.createElement(
    'a',
    {
      className: _styles2.default.conferenceCallInfoContainer,
      onClick: function onClick(e) {
        e.preventDefault();_onClick();
      }
    },
    displayedProfiles.length ? _react2.default.createElement(
      'div',
      { className: _styles2.default.avatarContainer },
      displayedProfiles.map(function (_ref2, idx) {
        var avatarUrl = _ref2.avatarUrl,
            toUserName = _ref2.toUserName;
        return _react2.default.createElement(
          'div',
          {
            key: toUserName + '_' + idx,
            className: _styles2.default.avatar,
            style: avatarUrl ? { backgroundImage: 'url(' + avatarUrl + ')' } : { backgroundColor: '#fff' } },
          avatarUrl ? null : _react2.default.createElement('i', { className: (0, _classnames2.default)(_DynamicsFont2.default.portrait, _styles2.default.icon) })
        );
      }),
      remains > 0 ? _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.avatar, _styles2.default.remains) },
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
