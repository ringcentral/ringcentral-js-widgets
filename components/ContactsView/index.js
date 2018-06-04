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

var _debounce = require('ringcentral-integration/lib/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _SearchInput = require('../SearchInput');

var _SearchInput2 = _interopRequireDefault(_SearchInput);

var _SpinnerOverlay = require('../SpinnerOverlay');

var _SpinnerOverlay2 = _interopRequireDefault(_SpinnerOverlay);

var _ContactList = require('../ContactList');

var _ContactList2 = _interopRequireDefault(_ContactList);

var _ContactItem = require('../ContactItem');

var _ContactItem2 = _interopRequireDefault(_ContactItem);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _ContactAdd = require('../../assets/images/ContactAdd.svg');

var _ContactAdd2 = _interopRequireDefault(_ContactAdd);

var _ContactSourceFilter = require('../ContactSourceFilter');

var _ContactSourceFilter2 = _interopRequireDefault(_ContactSourceFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AddContact(_ref) {
  var className = _ref.className,
      onClick = _ref.onClick;

  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(_styles2.default.addContact, className),
      onClick: onClick
    },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.iconContainer },
      _react2.default.createElement(_ContactAdd2.default, {
        className: _styles2.default.iconNode
      })
    )
  );
}
AddContact.propTypes = {
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func.isRequired
};
AddContact.defaultProps = {
  className: undefined
};

var ContactsView = function (_Component) {
  (0, _inherits3.default)(ContactsView, _Component);

  function ContactsView(props) {
    (0, _classCallCheck3.default)(this, ContactsView);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ContactsView.__proto__ || (0, _getPrototypeOf2.default)(ContactsView)).call(this, props));

    _this.calculateContentSize = function () {
      if (_this.contentWrapper && _this.contentWrapper.current && _this.contentWrapper.current.getBoundingClientRect) {
        var rect = _this.contentWrapper.current.getBoundingClientRect();
        return {
          contentHeight: rect.bottom - rect.top,
          contentWidth: rect.right - rect.left
        };
      }
      return {
        contentHeight: 0,
        contentWidth: 0
      };
    };

    _this.onSearchInputChange = function (_ref2) {
      var value = _ref2.target.value;

      _this.setState({
        searchString: value
      });
      _this.search({
        searchString: value,
        delay: 100
      });
    };

    _this.onSourceSelect = function (searchSource) {
      if (_this.contactList && _this.contactList.current && _this.contactList.current.resetScrollTop) {
        _this.contactList.current.resetScrollTop();
      }
      _this.search({
        searchSource: searchSource
      });
    };

    _this.onResize = (0, _debounce2.default)(function () {
      if (_this._mounted) {
        _this.setState((0, _extends3.default)({}, _this.calculateContentSize()));
      }
    }, 300);

    _this.state = {
      searchString: props.searchString,
      unfold: false,
      contentHeight: 0,
      contentWidth: 0
    };
    _this.contactList = _react2.default.createRef();
    _this.contentWrapper = _react2.default.createRef();
    _this.onUnfoldChange = function (unfold) {
      _this.setState({
        unfold: unfold
      });
    };
    return _this;
  }

  (0, _createClass3.default)(ContactsView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._mounted = true;
      if (typeof this.props.onVisitPage === 'function') {
        this.props.onVisitPage();
      }
      this.search({
        searchSource: this.props.searchSource,
        searchString: this.state.searchString
      });
      this.setState((0, _extends3.default)({}, this.calculateContentSize()));
      window.addEventListener('resize', this.onResize);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (nextProps.searchString !== this.props.searchString) {
        nextState.searchString = nextProps.searchString;
      }
      if (!nextProps.contactSourceNames.includes(nextProps.searchSource)) {
        this.search({
          searchSource: nextProps.contactSourceNames[0],
          searchString: this.state.searchString
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._mounted = false;
      window.removeEventListener('resize', this.onResize);
      clearTimeout(this._searchTimeoutId);
    }
  }, {
    key: 'search',
    value: function search(_ref3) {
      var _this2 = this;

      var _ref3$searchSource = _ref3.searchSource,
          searchSource = _ref3$searchSource === undefined ? this.props.searchSource : _ref3$searchSource,
          _ref3$searchString = _ref3.searchString,
          searchString = _ref3$searchString === undefined ? this.state.searchString : _ref3$searchString,
          _ref3$delay = _ref3.delay,
          delay = _ref3$delay === undefined ? 0 : _ref3$delay;

      if (this.props.onSearchContact) {
        if (this._searchTimeoutId) {
          clearTimeout(this._searchTimeoutId);
        }
        if (delay) {
          this._searchTimeoutId = setTimeout(function () {
            return _this2.props.onSearchContact({
              searchSource: searchSource,
              searchString: searchString
            });
          }, delay);
        } else {
          this.props.onSearchContact({
            searchSource: searchSource,
            searchString: searchString
          });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          currentLocale = _props.currentLocale,
          contactGroups = _props.contactGroups,
          contactSourceNames = _props.contactSourceNames,
          searchSource = _props.searchSource,
          showSpinner = _props.showSpinner,
          getAvatarUrl = _props.getAvatarUrl,
          getPresence = _props.getPresence,
          onItemSelect = _props.onItemSelect,
          Filter = _props.contactSourceFilterRenderer,
          sourceNodeRenderer = _props.sourceNodeRenderer,
          children = _props.children;


      return _react2.default.createElement(
        'div',
        { className: _styles2.default.root },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.actionBar },
          _react2.default.createElement(_SearchInput2.default, {
            className: _styles2.default.searchInput,
            value: this.state.searchString || '',
            onChange: this.onSearchInputChange,
            placeholder: _i18n2.default.getString('searchPlaceholder', currentLocale)
          }),
          _react2.default.createElement(Filter, {
            className: _styles2.default.actionButton,
            currentLocale: currentLocale,
            contactSourceNames: contactSourceNames,
            onSourceSelect: this.onSourceSelect,
            selectedSourceName: searchSource,
            unfold: this.state.unfold,
            onUnfoldChange: this.onUnfoldChange
          })
        ),
        _react2.default.createElement(
          _Panel2.default,
          {
            className: _styles2.default.content
          },
          _react2.default.createElement(
            'div',
            {
              className: _styles2.default.contentWrapper,
              ref: this.contentWrapper
            },
            _react2.default.createElement(_ContactList2.default, {
              ref: this.contactList,
              currentLocale: currentLocale,
              contactGroups: contactGroups,
              getAvatarUrl: getAvatarUrl,
              getPresence: getPresence,
              onItemSelect: onItemSelect,
              sourceNodeRenderer: sourceNodeRenderer,
              width: this.state.contentWidth,
              height: this.state.contentHeight
            })
          )
        ),
        showSpinner ? _react2.default.createElement(_SpinnerOverlay2.default, { className: _styles2.default.spinner }) : null,
        children
      );
    }
  }]);
  return ContactsView;
}(_react.Component);

exports.default = ContactsView;


ContactsView.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  contactGroups: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    caption: _propTypes2.default.string.isRequired,
    contacts: _propTypes2.default.arrayOf(_ContactItem2.default.propTypes.contact).isRequired
  })).isRequired,
  contactSourceNames: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  getAvatarUrl: _propTypes2.default.func.isRequired,
  getPresence: _propTypes2.default.func.isRequired,
  showSpinner: _propTypes2.default.bool.isRequired,
  searchSource: _propTypes2.default.string,
  searchString: _propTypes2.default.string,
  onItemSelect: _propTypes2.default.func,
  onSearchContact: _propTypes2.default.func,
  contactSourceFilterRenderer: _propTypes2.default.func,
  sourceNodeRenderer: _propTypes2.default.func,
  onVisitPage: _propTypes2.default.func,
  children: _propTypes2.default.node
};

ContactsView.defaultProps = {
  searchSource: undefined,
  searchString: undefined,
  onItemSelect: undefined,
  onSearchContact: undefined,
  contactSourceFilterRenderer: _ContactSourceFilter2.default,
  sourceNodeRenderer: undefined,
  onVisitPage: undefined,
  children: undefined
};
//# sourceMappingURL=index.js.map
