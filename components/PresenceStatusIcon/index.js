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

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PresenceStatusIcon(_ref) {
  var userStatus = _ref.userStatus,
      dndStatus = _ref.dndStatus,
      presenceStatus = _ref.presenceStatus,
      className = _ref.className;

  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(_styles2.default.presence, _styles2.default[presenceStatus || userStatus], _styles2.default[dndStatus], className)
    },
    _react2.default.createElement('div', { className: _styles2.default.presenceBar })
  );
}

PresenceStatusIcon.propTypes = {
  className: _propTypes2.default.string,
  dndStatus: _propTypes2.default.string,
  userStatus: _propTypes2.default.string,
  presenceStatus: _propTypes2.default.string
};

PresenceStatusIcon.defaultProps = {
  className: null,
  dndStatus: null,
  userStatus: null,
  presenceStatus: null
};

exports.default = PresenceStatusIcon;
//# sourceMappingURL=index.js.map
