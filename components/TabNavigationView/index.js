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

var _NavigationBar = require('../NavigationBar');

var _NavigationBar2 = _interopRequireDefault(_NavigationBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TabNavigationView(props) {
  var navBar = _react2.default.createElement(_NavigationBar2.default, {
    tabs: props.tabs,
    currentPath: props.currentPath
  });
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.root, props.className) },
    props.navigationPosition === 'top' ? navBar : null,
    _react2.default.createElement(
      'div',
      { className: _styles2.default.main },
      props.children
    ),
    props.navigationPosition === 'bottom' ? navBar : null
  );
}

TabNavigationView.propTypes = {
  className: _react.PropTypes.string,
  children: _react.PropTypes.node,
  tabs: _NavigationBar2.default.propTypes.tabs,
  currentPath: _react.PropTypes.string.isRequired,
  navigationPosition: _react.PropTypes.oneOf(['top', 'bottom'])
};

TabNavigationView.defaultProps = {
  navigationPosition: 'top'
};

exports.default = TabNavigationView;
//# sourceMappingURL=index.js.map
