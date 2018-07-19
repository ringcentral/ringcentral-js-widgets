'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ConferenceInfo(_ref) {
  var displayedProfiles = _ref.displayedProfiles,
      remains = _ref.remains,
      _onClick = _ref.onClick;

  return _react2.default.createElement(
    'a',
    {
      className: _styles2.default.conferenceCallInfoContainer,
      onClick: function onClick(e) {
        e.preventDefault();_onClick();
      }
    },
    Array.isArray(displayedProfiles) && displayedProfiles.length ? _react2.default.createElement(
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
      remains ? _react2.default.createElement(
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
      _i18n2.default.getString('conferenceCall')
    )
  );
}

exports.default = ConferenceInfo;
ConferenceInfo.propTypes = {
  displayedProfiles: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    avatarUrl: _propTypes2.default.string,
    toUserName: _propTypes2.default.string
  })).isRequired,
  remains: _propTypes2.default.number,
  onClick: _propTypes2.default.func
};

ConferenceInfo.defaultProps = {
  remains: 0,
  onClick: function onClick(i) {
    return i;
  }
};
//# sourceMappingURL=ConferenceInfo.js.map
