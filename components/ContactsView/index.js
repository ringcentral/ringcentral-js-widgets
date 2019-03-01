"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.regexp.search");

var _ramda = require("ramda");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _debounce = _interopRequireDefault(require("ringcentral-integration/lib/debounce"));

var _Panel = _interopRequireDefault(require("../Panel"));

var _SearchInput = _interopRequireDefault(require("../SearchInput"));

var _SpinnerOverlay = _interopRequireDefault(require("../SpinnerOverlay"));

var _ContactList = _interopRequireDefault(require("../ContactList"));

var _ContactItem = _interopRequireDefault(require("../ContactItem"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _ContactAdd = _interopRequireDefault(require("../../assets/images/ContactAdd.svg"));

var _ContactSourceFilter = _interopRequireDefault(require("../ContactSourceFilter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function AddContact(_ref) {
  var className = _ref.className,
      onClick = _ref.onClick;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)(_styles.default.addContact, className),
    onClick: onClick
  }, _react.default.createElement("div", {
    className: _styles.default.iconContainer
  }, _react.default.createElement(_ContactAdd.default, {
    className: _styles.default.iconNode
  })));
}

AddContact.propTypes = {
  className: _propTypes.default.string,
  onClick: _propTypes.default.func.isRequired
};
AddContact.defaultProps = {
  className: undefined
};

var ContactsView =
/*#__PURE__*/
function (_Component) {
  _inherits(ContactsView, _Component);

  function ContactsView(props) {
    var _this;

    _classCallCheck(this, ContactsView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ContactsView).call(this, props));

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

    _this.onResize = (0, _debounce.default)(function () {
      if (_this._mounted) {
        _this.setState(_objectSpread({}, _this.calculateContentSize()));
      }
    }, 300);
    _this.state = {
      searchString: props.searchString,
      unfold: false,
      contentHeight: 0,
      contentWidth: 0
    };
    _this.contactList = _react.default.createRef();
    _this.contentWrapper = _react.default.createRef();

    _this.onUnfoldChange = function (unfold) {
      _this.setState({
        unfold: unfold
      });
    };

    return _this;
  }

  _createClass(ContactsView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;

      if (typeof this.props.onVisitPage === 'function') {
        this.props.onVisitPage();
      }

      this.search({
        searchSource: this.props.searchSource,
        searchString: this.state.searchString
      });
      this.setState(_objectSpread({}, this.calculateContentSize()));
      window.addEventListener('resize', this.onResize);
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps, nextState) {
      if (nextProps.searchString !== this.props.searchString) {
        nextState.searchString = nextProps.searchString;
      }

      if (!(0, _ramda.contains)(nextProps.searchSource, nextProps.contactSourceNames)) {
        this.search({
          searchSource: nextProps.contactSourceNames[0],
          searchString: this.state.searchString
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
      window.removeEventListener('resize', this.onResize);
      clearTimeout(this._searchTimeoutId);
    }
  }, {
    key: "search",
    value: function search(_ref3) {
      var _this2 = this;

      var _ref3$searchSource = _ref3.searchSource,
          searchSource = _ref3$searchSource === void 0 ? this.props.searchSource : _ref3$searchSource,
          _ref3$searchString = _ref3.searchString,
          searchString = _ref3$searchString === void 0 ? this.state.searchString : _ref3$searchString,
          _ref3$delay = _ref3.delay,
          delay = _ref3$delay === void 0 ? 0 : _ref3$delay;

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
    key: "render",
    value: function render() {
      var _this$props = this.props,
          currentLocale = _this$props.currentLocale,
          contactGroups = _this$props.contactGroups,
          contactSourceNames = _this$props.contactSourceNames,
          searchSource = _this$props.searchSource,
          showSpinner = _this$props.showSpinner,
          getAvatarUrl = _this$props.getAvatarUrl,
          getPresence = _this$props.getPresence,
          onItemSelect = _this$props.onItemSelect,
          Filter = _this$props.contactSourceFilterRenderer,
          sourceNodeRenderer = _this$props.sourceNodeRenderer,
          children = _this$props.children;
      return _react.default.createElement("div", {
        className: _styles.default.root
      }, _react.default.createElement("div", {
        className: _styles.default.actionBar
      }, _react.default.createElement(_SearchInput.default, {
        dataSign: "contactsSearchInput",
        className: _styles.default.searchInput,
        value: this.state.searchString || '',
        onChange: this.onSearchInputChange,
        placeholder: _i18n.default.getString('searchPlaceholder', currentLocale)
      }), _react.default.createElement(Filter, {
        className: _styles.default.actionButton,
        currentLocale: currentLocale,
        contactSourceNames: contactSourceNames,
        onSourceSelect: this.onSourceSelect,
        selectedSourceName: searchSource,
        unfold: this.state.unfold,
        onUnfoldChange: this.onUnfoldChange
      })), _react.default.createElement(_Panel.default, {
        className: _styles.default.content
      }, _react.default.createElement("div", {
        className: _styles.default.contentWrapper,
        ref: this.contentWrapper
      }, _react.default.createElement(_ContactList.default, {
        ref: this.contactList,
        currentLocale: currentLocale,
        contactGroups: contactGroups,
        getAvatarUrl: getAvatarUrl,
        getPresence: getPresence,
        onItemSelect: onItemSelect,
        sourceNodeRenderer: sourceNodeRenderer,
        width: this.state.contentWidth,
        height: this.state.contentHeight
      }))), showSpinner ? _react.default.createElement(_SpinnerOverlay.default, {
        className: _styles.default.spinner
      }) : null, children);
    }
  }]);

  return ContactsView;
}(_react.Component);

exports.default = ContactsView;
ContactsView.propTypes = {
  currentLocale: _propTypes.default.string.isRequired,
  contactGroups: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: _propTypes.default.string.isRequired,
    caption: _propTypes.default.string.isRequired,
    contacts: _propTypes.default.arrayOf(_ContactItem.default.propTypes.contact).isRequired
  })).isRequired,
  contactSourceNames: _propTypes.default.arrayOf(_propTypes.default.string).isRequired,
  getAvatarUrl: _propTypes.default.func.isRequired,
  getPresence: _propTypes.default.func.isRequired,
  showSpinner: _propTypes.default.bool.isRequired,
  searchSource: _propTypes.default.string,
  searchString: _propTypes.default.string,
  onItemSelect: _propTypes.default.func,
  onSearchContact: _propTypes.default.func,
  contactSourceFilterRenderer: _propTypes.default.func,
  sourceNodeRenderer: _propTypes.default.func,
  onVisitPage: _propTypes.default.func,
  children: _propTypes.default.node
};
ContactsView.defaultProps = {
  searchSource: undefined,
  searchString: undefined,
  onItemSelect: undefined,
  onSearchContact: undefined,
  contactSourceFilterRenderer: _ContactSourceFilter.default,
  sourceNodeRenderer: undefined,
  onVisitPage: undefined,
  children: undefined
};
//# sourceMappingURL=index.js.map
