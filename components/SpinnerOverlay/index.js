'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SpinnerOverlay;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Spinner = require('../Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SpinnerOverlay(_ref) {
  var className = _ref.className;

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.root, className) },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.container },
      _react2.default.createElement(_Spinner2.default, null)
    )
  );
}

SpinnerOverlay.propTypes = {
  className: _propTypes2.default.string
};

SpinnerOverlay.defaultProps = {
  className: undefined
};
//# sourceMappingURL=index.js.map
