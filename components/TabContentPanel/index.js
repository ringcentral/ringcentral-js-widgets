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

var _NavigationBar = require('../../components/NavigationBar');

var _NavigationBar2 = _interopRequireDefault(_NavigationBar);

var _MessageTabButton = require('../../components/MessageTabButton');

var _MessageTabButton2 = _interopRequireDefault(_MessageTabButton);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TabTitle(_ref) {
  var label = _ref.label,
      isActive = _ref.isActive;

  return _react2.default.createElement(
    'span',
    { className: (0, _classnames2.default)(_styles2.default.tabTitle, isActive() ? _styles2.default.active : null) },
    label
  );
}

TabTitle.propTypes = {
  label: _propTypes2.default.string.isRequired,
  isActive: _propTypes2.default.func.isRequired
};

function TabContentPanel(_ref2) {
  var applicable = _ref2.applicable,
      tabs = _ref2.tabs,
      goTo = _ref2.goTo,
      children = _ref2.children;

  if (!applicable) {
    return children;
  }

  var formattedTabs = tabs.map(function (tab) {
    return {
      icon: _react2.default.createElement(TabTitle, {
        label: tab.label,
        isActive: tab.isActive
      }),
      label: tab.label,
      path: tab.path,
      isActive: tab.isActive
    };
  });

  return _react2.default.createElement(
    'div',
    { className: _styles2.default.root },
    _react2.default.createElement(_NavigationBar2.default, {
      button: _MessageTabButton2.default,
      className: _styles2.default.tabBar,
      currentPath: '',
      goTo: goTo,
      tabs: formattedTabs,
      fullSizeInk: false
    }),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.content },
      children
    )
  );
}

TabContentPanel.propTypes = {
  applicable: _propTypes2.default.bool.isRequired,
  tabs: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    path: _propTypes2.default.string.isRequired,
    label: _propTypes2.default.string.isRequired,
    isActive: _propTypes2.default.func.isRequired
  })).isRequired,
  goTo: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.node
};

TabContentPanel.defaultProps = {
  children: null
};

exports.default = TabContentPanel;
//# sourceMappingURL=index.js.map
