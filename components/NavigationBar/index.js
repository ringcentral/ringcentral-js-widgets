'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavigationBar = function (_Component) {
  (0, _inherits3.default)(NavigationBar, _Component);

  function NavigationBar(props) {
    (0, _classCallCheck3.default)(this, NavigationBar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NavigationBar.__proto__ || (0, _getPrototypeOf2.default)(NavigationBar)).call(this, props));

    _this.goTo = _this.goTo.bind(_this);
    _this.state = {
      currentVirtualPath: _this.props.currentVirtualPath
    };
    return _this;
  }

  (0, _createClass3.default)(NavigationBar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.currentVirtualPath) {
        this.setState({
          currentVirtualPath: nextProps.currentVirtualPath
        });
      }
    }
  }, {
    key: 'goTo',
    value: function goTo(tab) {
      var _this2 = this;

      this.props.goTo(tab.path, tab.virtualPath);
      // seems like the goTo is asynchronous
      // so here set timeout for resolving menu looks flash issue
      setTimeout(function () {
        _this2.setState({
          currentVirtualPath: tab.virtualPath
        });
      }, 10);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          className = _props.className,
          button = _props.button,
          childNavigationView = _props.childNavigationView,
          currentPath = _props.currentPath,
          tabWidth = _props.tabWidth,
          tabs = _props.tabs;


      var NavigationButton = button;
      var ChildNavigationView = childNavigationView;

      var currentVirtualPath = this.state.currentVirtualPath;
      var _tabWidth = 0;
      if (tabWidth) {
        _tabWidth = tabWidth;
      } else {
        // Align equally fully
        _tabWidth = tabs.length > 0 ? 1 / tabs.length * 100 + '%' : 0;
      }
      var dropdownMenuTab = tabs.find(function (tab) {
        return tab.childTabs && tab.isActive && tab.isActive(currentPath, currentVirtualPath);
      });
      var dropdownMenu = dropdownMenuTab && dropdownMenuTab.childTabs;
      return _react2.default.createElement(
        'nav',
        { className: (0, _classnames2.default)(_styles2.default.root, className) },
        tabs.map(function (tab, index) {
          var icon = tab.icon,
              activeIcon = tab.activeIcon;

          if (typeof icon === 'function') {
            var Icon = icon;
            icon = tab.childTabs ? _react2.default.createElement(Icon, { currentPath: currentPath }) : _react2.default.createElement(Icon, null);
          }
          if (typeof activeIcon === 'function') {
            var ActiveIcon = activeIcon;
            activeIcon = tab.childTabs ? _react2.default.createElement(ActiveIcon, { currentPath: currentPath }) : _react2.default.createElement(ActiveIcon, null);
          }
          return _react2.default.createElement(NavigationButton, (0, _extends3.default)({}, tab, {
            key: index,
            onClick: function onClick() {
              _this3.goTo(tab);
            },
            active: tab.isActive && tab.isActive(currentPath, currentVirtualPath) || tab.path && tab.path === currentPath || tab.virtualPath && tab.virtualPath === currentVirtualPath || tab.childTabs && tab.childTabs.some(function (childTab) {
              return childTab.path === currentPath || childTab.path === currentPath.slice(0, 9);
            }),
            width: _tabWidth,
            icon: icon,
            activeIcon: activeIcon
          }));
        }),
        ChildNavigationView && dropdownMenu && dropdownMenu.length ? _react2.default.createElement(ChildNavigationView, {
          tabs: dropdownMenu,
          goTo: this.goTo,
          currentPath: currentPath,
          currentVirtualPath: currentVirtualPath
        }) : null
      );
    }
  }]);
  return NavigationBar;
}(_react.Component);

exports.default = NavigationBar;


var tabPropTypes = {
  icon: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.node]),
  activeIcon: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.node]),
  label: _propTypes2.default.string,
  path: _propTypes2.default.string,
  virtualPath: _propTypes2.default.string,
  isActive: _propTypes2.default.func,
  noticeCounts: _propTypes2.default.number
};

NavigationBar.propTypes = {
  className: _propTypes2.default.string,
  button: _propTypes2.default.oneOfType([_propTypes2.default.func.isRequired, _propTypes2.default.element.isRequired]).isRequired,
  childNavigationView: _propTypes2.default.oneOfType([_propTypes2.default.func.isRequired, _propTypes2.default.element.isRequired]),
  tabs: _propTypes2.default.arrayOf(_propTypes2.default.shape((0, _extends3.default)({}, tabPropTypes, {
    childTabs: _propTypes2.default.arrayOf(_propTypes2.default.shape((0, _extends3.default)({}, tabPropTypes)))
  }))),
  goTo: _propTypes2.default.func.isRequired,
  currentPath: _propTypes2.default.string.isRequired,
  currentVirtualPath: _propTypes2.default.string,
  tabWidth: _propTypes2.default.string
};

NavigationBar.defaultProps = {
  className: undefined,
  childNavigationView: undefined,
  currentVirtualPath: undefined,
  tabWidth: undefined,
  tabs: []
};
//# sourceMappingURL=index.js.map
