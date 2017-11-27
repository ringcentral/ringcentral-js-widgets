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

var _RcFont = require('../../assets/RcFont/RcFont.scss');

var _RcFont2 = _interopRequireDefault(_RcFont);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RemoveButton(props) {
  var className = null;
  if (props.visibility) {
    className = (0, _classnames2.default)(_styles2.default.containner, props.className);
  } else {
    className = (0, _classnames2.default)(_styles2.default.containner, props.className, _styles2.default.hiddenRemoveButton);
  }
  return _react2.default.createElement(
    'span',
    { className: className, onClick: props.onClick },
    _react2.default.createElement('i', { className: _RcFont2.default.uni2471 })
  );
}

RemoveButton.propTypes = {
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func.isRequired,
  visibility: _propTypes2.default.bool
};

RemoveButton.defaultProps = {
  className: null,
  visibility: true
};

exports.default = RemoveButton;
//# sourceMappingURL=index.js.map
