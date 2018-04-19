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

var _NavigationBar = require('../NavigationBar');

var _NavigationBar2 = _interopRequireDefault(_NavigationBar);

var _TabNavigationButton = require('../TabNavigationButton');

var _TabNavigationButton2 = _interopRequireDefault(_TabNavigationButton);

var _DropdownNavigationView = require('../DropdownNavigationView');

var _DropdownNavigationView2 = _interopRequireDefault(_DropdownNavigationView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TabNavigationView(props) {
  var navBar = _react2.default.createElement(_NavigationBar2.default, {
    button: _TabNavigationButton2.default,
    childNavigationView: _DropdownNavigationView2.default,
    tabs: props.tabs,
    goTo: props.goTo,
    tabWidth: props.tabWidth,
    currentPath: props.currentPath,
    currentVirtualPath: props.currentVirtualPath
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
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  currentPath: _propTypes2.default.string.isRequired,
  currentVirtualPath: _propTypes2.default.string,
  goTo: _propTypes2.default.func.isRequired,
  navigationPosition: _propTypes2.default.oneOf(['top', 'bottom']),
  tabWidth: _propTypes2.default.string,
  tabs: _NavigationBar2.default.propTypes.tabs
};

TabNavigationView.defaultProps = {
  children: null,
  className: null,
  currentVirtualPath: undefined,
  navigationPosition: 'top',
  tabWidth: undefined,
  tabs: null
};

exports.default = TabNavigationView;
//# sourceMappingURL=index.js.map
