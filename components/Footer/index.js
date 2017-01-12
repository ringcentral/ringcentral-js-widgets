'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Footer(props) {
  return _react2.default.createElement(
    'footer',
    { className: (0, _classnames2.default)(_styles2.default.root, props.className) },
    props.children
  );
}

Footer.propTypes = {
  className: _react.PropTypes.string,
  children: _react.PropTypes.node
};

exports.default = Footer;
//# sourceMappingURL=index.js.map
