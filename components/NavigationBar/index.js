'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NavigationButton(props) {
  var notice = null;
  if (props.noticeCounts && props.noticeCounts > 0) {
    notice = _react2.default.createElement(
      'div',
      { className: _styles2.default.notice },
      props.noticeCounts
    );
  }
  return _react2.default.createElement(
    _reactRouter.Link,
    {
      to: props.path,
      className: (0, _classnames2.default)(_styles2.default.navigationButton, props.active && _styles2.default.active),
      style: {
        width: props.width
      }
    },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.iconHolder },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.icon },
        props.icon
      ),
      notice
    ),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.labelHolder },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.label },
        props.label
      )
    )
  );
}
NavigationButton.propTypes = {
  icon: _react.PropTypes.node,
  path: _react.PropTypes.string,
  active: _react.PropTypes.bool,
  label: _react.PropTypes.string,
  noticeCounts: _react.PropTypes.number,
  width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]).isRequired
};

function NavigationBar(props) {
  var tabWidth = props.tabs.length > 0 ? 1 / props.tabs.length * 100 + '%' : 0;
  return _react2.default.createElement(
    'nav',
    { className: (0, _classnames2.default)(_styles2.default.root, props.className) },
    props.tabs.map(function (t, idx) {
      return _react2.default.createElement(NavigationButton, (0, _extends3.default)({}, t, {
        key: idx,
        active: t.isActive && t.isActive(props.currentPath) || t.path === props.currentPath,
        width: tabWidth
      }));
    })
  );
}
NavigationBar.propTypes = {
  className: _react.PropTypes.string,
  tabs: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    icon: _react.PropTypes.node.isRequired,
    label: _react.PropTypes.string,
    path: _react.PropTypes.string.isRequired,
    isActive: _react.PropTypes.func,
    noticeCounts: _react.PropTypes.number
  })),
  currentPath: _react.PropTypes.string.isRequired
};
NavigationBar.defaultProps = {
  tabs: []
};

exports.default = NavigationBar;
//# sourceMappingURL=index.js.map
