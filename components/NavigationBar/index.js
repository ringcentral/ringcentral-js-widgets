'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NavigationBar(props) {
  var tabWidth = props.tabs.length > 0 ? 1 / props.tabs.length * 100 + '%' : 0;
  var NavigationButton = props.button;
  return _react2.default.createElement(
    'nav',
    { className: (0, _classnames2.default)(_styles2.default.root, props.className) },
    props.tabs.map(function (t, idx) {
      return _react2.default.createElement(NavigationButton, (0, _extends3.default)({}, t, {
        key: idx,
        onClick: function onClick() {
          props.goTo(t.path);
        },
        active: t.isActive && t.isActive(props.currentPath) || t.path === props.currentPath,
        width: tabWidth
      }));
    })
  );
}
NavigationBar.propTypes = {
  className: _propTypes2.default.string,
  button: _propTypes2.default.oneOfType([_propTypes2.default.func.isRequired, _propTypes2.default.element.isRequired]).isRequired,
  tabs: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    icon: _propTypes2.default.node.isRequired,
    activeIcon: _propTypes2.default.node,
    label: _propTypes2.default.string,
    path: _propTypes2.default.string.isRequired,
    isActive: _propTypes2.default.func,
    noticeCounts: _propTypes2.default.number
  })),
  goTo: _propTypes2.default.func.isRequired,
  currentPath: _propTypes2.default.string.isRequired
};
NavigationBar.defaultProps = {
  className: undefined,
  tabs: []
};

exports.default = NavigationBar;
//# sourceMappingURL=index.js.map
