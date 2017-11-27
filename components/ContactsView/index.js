'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

    _this.state = {
      searchString: props.searchString,
      unfold: false
    };
    _this.doSearchByText = _this.doSearchByText.bind(_this);
    _this.doSearchBySource = _this.doSearchBySource.bind(_this);
    _this.loadNextPage = _this.loadNextPage.bind(_this);
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
      // this._restSearch();
      if (typeof this.props.onVisitPage === 'function') {
        this.props.onVisitPage();
      }
      this._applySearch({
        searchSource: this.props.searchSource,
        searchString: this.state.searchString,
        pageNumber: 1
      });
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (nextProps.searchString !== this.props.searchString) {
        nextState.searchString = nextProps.searchString;
      }
      if (!nextProps.contactSourceNames.includes(nextProps.searchSource)) {
        this._applySearch({
          searchSource: nextProps.contactSourceNames[0],
          searchString: this.state.searchString
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._searchTimeoutId);
    }
  }, {
    key: 'doSearchByText',
    value: function doSearchByText(ev) {
      var searchString = ev.target.value;
      this.setState({
        searchString: searchString
      });
      this._applySearchTimeout({
        searchSource: this.props.searchSource,
        searchString: searchString,
        pageNumber: 1
      });
    }
  }, {
    key: 'doSearchBySource',
    value: function doSearchBySource(searchSource) {
      this._applySearch({
        searchSource: searchSource,
        searchString: this.state.searchString,
        pageNumber: 1
      });
    }
  }, {
    key: 'loadNextPage',
    value: function loadNextPage(pageNumber) {
      this._applySearch({
        searchSource: this.props.searchSource,
        searchString: this.state.searchString,
        pageNumber: pageNumber
      });
    }
  }, {
    key: '_applySearch',
    value: function _applySearch(args) {
      var func = this.props.onSearchContact;
      if (func) {
        func(args);
      }
    }
  }, {
    key: '_applySearchTimeout',
    value: function _applySearchTimeout(args) {
      var _this2 = this;

      clearTimeout(this._searchTimeoutId);
      this._searchTimeoutId = setTimeout(function () {
        _this2._applySearch(args);
      }, 100);
    }

    // _restSearch() {
    //   if (this.props.onRestSearch) {
    //     this.props.onRestSearch();
    //   }
    // }

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
          currentPage = _props.currentPage,
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
            onChange: this.doSearchByText,
            placeholder: _i18n2.default.getString('searchPlaceholder', currentLocale)
          }),
          _react2.default.createElement(Filter, {
            className: _styles2.default.actionButton,
            currentLocale: currentLocale,
            contactSourceNames: contactSourceNames,
            onSourceSelect: this.doSearchBySource,
            selectedSourceName: searchSource,
            unfold: this.state.unfold,
            onUnfoldChange: this.onUnfoldChange
          })
        ),
        _react2.default.createElement(
          _Panel2.default,
          { className: _styles2.default.content },
          _react2.default.createElement(_ContactList2.default, {
            currentLocale: currentLocale,
            contactGroups: contactGroups,
            getAvatarUrl: getAvatarUrl,
            getPresence: getPresence,
            currentPage: currentPage,
            onNextPage: this.loadNextPage,
            onItemSelect: onItemSelect,
            sourceNodeRenderer: sourceNodeRenderer
          })
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
  currentPage: _propTypes2.default.number,
  onItemSelect: _propTypes2.default.func,
  onSearchContact: _propTypes2.default.func,
  contactSourceFilterRenderer: _propTypes2.default.func,
  sourceNodeRenderer: _propTypes2.default.func,
  onVisitPage: _propTypes2.default.func,
  children: _propTypes2.default.node
  // onRestSearch: PropTypes.func,
};

ContactsView.defaultProps = {
  searchSource: undefined,
  searchString: undefined,
  currentPage: undefined,
  onItemSelect: undefined,
  onSearchContact: undefined,
  contactSourceFilterRenderer: _ContactSourceFilter2.default,
  sourceNodeRenderer: undefined,
  onVisitPage: undefined,
  children: undefined
  // onRestSearch: undefined,
};
//# sourceMappingURL=index.js.map
