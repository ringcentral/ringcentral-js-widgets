'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _IconLine = require('../IconLine');

var _IconLine2 = _interopRequireDefault(_IconLine);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _RcFont = require('../../assets/RcFont/RcFont.scss');

var _RcFont2 = _interopRequireDefault(_RcFont);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LinkLine(props) {
  return _react2.default.createElement(
    _reactRouter.Link,
    {
      to: props.to,
      className: _styles2.default.link
    },
    _react2.default.createElement(
      _IconLine2.default,
      {
        className: props.className,
        icon: _react2.default.createElement('span', { className: (0, _classnames2.default)(_RcFont2.default.uniC9, _styles2.default.icon) })
      },
      props.children
    )
  );
}

LinkLine.propTypes = {
  className: _react.PropTypes.string,
  to: _react.PropTypes.string.isRequired,
  children: _react.PropTypes.node
};

exports.default = LinkLine;
//# sourceMappingURL=index.js.map
