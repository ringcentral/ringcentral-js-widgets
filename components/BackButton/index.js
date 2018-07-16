'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BackButton;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BackButton(_ref) {
  var label = _ref.label,
      showIcon = _ref.showIcon;

  return _react2.default.createElement(
    'span',
    { className: _styles2.default.backButton },
    showIcon ? _react2.default.createElement('i', { className: (0, _classnames2.default)(_DynamicsFont2.default.arrow, _styles2.default.backIcon) }) : null,
    label ? _react2.default.createElement(
      'span',
      { className: _styles2.default.backLabel },
      label
    ) : null
  );
}

BackButton.propTypes = {
  label: _propTypes2.default.string,
  showIcon: _propTypes2.default.bool
};

BackButton.defaultProps = {
  label: undefined,
  showIcon: true
};
//# sourceMappingURL=index.js.map
