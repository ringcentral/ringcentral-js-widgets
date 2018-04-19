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

var _NavigationBar = require('../NavigationBar');

var _NavigationBar2 = _interopRequireDefault(_NavigationBar);

var _DropdownNavigationItem = require('../DropdownNavigationItem');

var _DropdownNavigationItem2 = _interopRequireDefault(_DropdownNavigationItem);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropdownNavigationView = function (_Component) {
  (0, _inherits3.default)(DropdownNavigationView, _Component);

  function DropdownNavigationView(props) {
    (0, _classCallCheck3.default)(this, DropdownNavigationView);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DropdownNavigationView.__proto__ || (0, _getPrototypeOf2.default)(DropdownNavigationView)).call(this, props));

    _this.removeChildNavBar = _this.removeChildNavBar.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(DropdownNavigationView, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeListener();
    }
  }, {
    key: 'setChildNavigationElement',
    value: function setChildNavigationElement(el) {
      var _this2 = this;

      setTimeout(function () {
        _this2.childNavigationElement = el;
        if (_this2.childNavigationElement) {
          _this2.addListener();
        } else {
          _this2.removeListener();
        }
      }, 0);
    }
  }, {
    key: 'addListener',
    value: function addListener() {
      window.addEventListener('click', this.removeChildNavBar);
    }
  }, {
    key: 'removeListener',
    value: function removeListener() {
      window.removeEventListener('click', this.removeChildNavBar);
    }
  }, {
    key: 'removeChildNavBar',
    value: function removeChildNavBar(ev) {
      if (!this.childNavigationElement || this.childNavigationElement === ev.target || this.childNavigationElement.contains(ev.target)) {
        return;
      }
      this.removeListener();
      this.props.goTo({
        virtualPath: ''
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          tabs = _props.tabs,
          goTo = _props.goTo,
          currentPath = _props.currentPath,
          currentVirtualPath = _props.currentVirtualPath;


      return tabs.length ? _react2.default.createElement(
        'div',
        {
          className: _styles2.default.root,
          ref: function ref(el) {
            _this3.setChildNavigationElement(el);
          }
        },
        tabs.map(function (tab, index) {
          var Icon = tab.icon;
          var ActiveIcon = tab.activeIcon;
          var active = tab.isActive && tab.isActive(currentPath, currentVirtualPath) || tab.path && tab.path === currentPath || tab.virtualPath && tab.virtualPath === currentVirtualPath;
          var isReverseFillIcon = tab.path === '/contacts' && !active;
          return _react2.default.createElement(_DropdownNavigationItem2.default, (0, _extends3.default)({}, tab, {
            key: index,
            onClick: function onClick() {
              goTo(tab);
            },
            active: active,
            icon: typeof Icon === 'function' ? _react2.default.createElement(Icon, null) : Icon,
            isReverseFillIcon: isReverseFillIcon,
            activeIcon: typeof ActiveIcon === 'function' ? _react2.default.createElement(ActiveIcon, null) : ActiveIcon
          }));
        })
      ) : null;
    }
  }]);
  return DropdownNavigationView;
}(_react.Component);

exports.default = DropdownNavigationView;


DropdownNavigationView.propTypes = {
  tabs: _NavigationBar2.default.propTypes.tabs.isRequired,
  goTo: _propTypes2.default.func.isRequired,
  currentPath: _propTypes2.default.string.isRequired,
  currentVirtualPath: _propTypes2.default.string
};

DropdownNavigationView.defaultProps = {
  currentVirtualPath: undefined
};
//# sourceMappingURL=index.js.map
