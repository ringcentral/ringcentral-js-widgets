'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _NavigationBar = require('../NavigationBar');

var _NavigationBar2 = _interopRequireDefault(_NavigationBar);

var _SpinnerOverlay = require('../SpinnerOverlay');

var _SpinnerOverlay2 = _interopRequireDefault(_SpinnerOverlay);

var _RecentActivityNavigationButton = require('../RecentActivityNavigationButton');

var _RecentActivityNavigationButton2 = _interopRequireDefault(_RecentActivityNavigationButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RecentActivityView = function (_PureComponent) {
  (0, _inherits3.default)(RecentActivityView, _PureComponent);

  function RecentActivityView(props) {
    (0, _classCallCheck3.default)(this, RecentActivityView);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RecentActivityView.__proto__ || (0, _getPrototypeOf2.default)(RecentActivityView)).call(this, props));

    _this.onTabChanged = function () {
      var tabName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.defaultTab;

      var currentTab = _this.getCurrentTab(tabName);
      if (currentTab) currentTab.getData();
      _this.setState({
        currentTab: tabName
      });
    };

    _this.state = {
      currentTab: props.defaultTab
    };
    return _this;
  }

  (0, _createClass3.default)(RecentActivityView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Switch to default tab and load all data
      this.onTabChanged();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.currentContact.id !== this.props.currentContact.id) {
        this.onTabChanged(this.state.currentTab);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(this.props.tabs), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var tab = _step.value;

          tab.cleanUp();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'getCurrentTabPanel',
    value: function getCurrentTabPanel() {
      var currentTabPath = this.state.currentTab;
      var currentTab = this.getCurrentTab(currentTabPath);
      return currentTab ? currentTab.view : null;
    }
  }, {
    key: 'getCurrentTab',
    value: function getCurrentTab(currentTabPath) {
      var tabs = this.props.tabs;
      return tabs.find(function (tab) {
        return tab.path === currentTabPath;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var showSpinner = this.props.showSpinner;

      if (showSpinner) return _react2.default.createElement(_SpinnerOverlay2.default, null);
      var props = {
        currentPath: this.state.currentTab,
        goTo: this.onTabChanged,
        tabs: this.props.tabs
      };
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.recentActivityView },
        _react2.default.createElement(_NavigationBar2.default, (0, _extends3.default)({
          button: _RecentActivityNavigationButton2.default,
          className: _styles2.default.navigationBar
        }, props)),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.listView },
          this.getCurrentTabPanel()
        )
      );
    }
  }]);
  return RecentActivityView;
}(_react.PureComponent);

exports.default = RecentActivityView;


RecentActivityView.propTypes = {
  showSpinner: _propTypes2.default.bool.isRequired,
  currentContact: _propTypes2.default.object.isRequired,
  tabs: _propTypes2.default.array.isRequired,
  defaultTab: _propTypes2.default.string.isRequired
};
//# sourceMappingURL=index.js.map
