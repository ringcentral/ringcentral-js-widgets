"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("regenerator-runtime/runtime");

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

var _RetryIcon = _interopRequireDefault(require("../../assets/images/RetryIcon.svg"));

var _OvalLoading = _interopRequireDefault(require("../../assets/images/OvalLoading.svg"));

var _ContactSourceFilter = _interopRequireDefault(require("../ContactSourceFilter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
  return _react["default"].createElement("div", {
    className: className,
    onClick: onClick
  }, _react["default"].createElement("div", {
    className: _styles["default"].iconContainer
  }, _react["default"].createElement(_ContactAdd["default"], {
    className: _styles["default"].iconNode
  })));
}

AddContact.propTypes = {
  className: _propTypes["default"].string,
  onClick: _propTypes["default"].func.isRequired
};
AddContact.defaultProps = {
  className: undefined
};

function RefreshContacts(_ref2) {
  var className = _ref2.className,
      onRefresh = _ref2.onRefresh,
      refreshing = _ref2.refreshing,
      currentLocale = _ref2.currentLocale;
  var icon = null;
  var iconWrappClass = null;

  if (refreshing) {
    iconWrappClass = _styles["default"].refreshingIcon;
    icon = _react["default"].createElement(_OvalLoading["default"], {
      className: _styles["default"].iconNode,
      width: 12,
      height: 12
    });
  } else {
    iconWrappClass = _styles["default"].refreshIcon;
    icon = _react["default"].createElement(_RetryIcon["default"], {
      className: _styles["default"].iconNode,
      width: 12,
      height: 12
    });
  }

  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])(iconWrappClass, className),
    onClick: onRefresh,
    title: _i18n["default"].getString('refresh', currentLocale)
  }, _react["default"].createElement("div", {
    className: _styles["default"].iconContainer
  }, icon));
}

RefreshContacts.propTypes = {
  className: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string.isRequired,
  onRefresh: _propTypes["default"].func.isRequired,
  refreshing: _propTypes["default"].bool.isRequired
};
RefreshContacts.defaultProps = {
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

    _this.onSearchInputChange = function (_ref3) {
      var value = _ref3.target.value;

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

    _this.onResize = (0, _debounce["default"])(function () {
      if (_this._mounted) {
        _this.setState(_objectSpread({}, _this.calculateContentSize()));
      }
    }, 300);
    _this.onRefresh =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof _this.props.onRefresh !== 'function')) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _this.setState({
                refreshing: true
              });

              _context.next = 5;
              return _this.props.onRefresh();

            case 5:
              _this.setState({
                refreshing: false
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    _this.state = {
      searchString: props.searchString,
      unfold: false,
      contentHeight: 0,
      contentWidth: 0,
      refreshing: false
    };
    _this.contactList = _react["default"].createRef();
    _this.contentWrapper = _react["default"].createRef();

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
    value: function search(_ref5) {
      var _this2 = this;

      var _ref5$searchSource = _ref5.searchSource,
          searchSource = _ref5$searchSource === void 0 ? this.props.searchSource : _ref5$searchSource,
          _ref5$searchString = _ref5.searchString,
          searchString = _ref5$searchString === void 0 ? this.state.searchString : _ref5$searchString,
          _ref5$delay = _ref5.delay,
          delay = _ref5$delay === void 0 ? 0 : _ref5$delay;

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
          onRefresh = _this$props.onRefresh,
          children = _this$props.children;
      var showRefresh = typeof onRefresh === 'function';
      var refreshButton = showRefresh ? _react["default"].createElement(RefreshContacts, {
        className: _styles["default"].actionButton,
        refreshing: this.state.refreshing,
        onRefresh: this.onRefresh
      }) : null;
      return _react["default"].createElement("div", {
        className: _styles["default"].root
      }, _react["default"].createElement("div", {
        className: _styles["default"].actionBar
      }, _react["default"].createElement(_SearchInput["default"], {
        dataSign: "contactsSearchInput",
        className: (0, _classnames["default"])(_styles["default"].searchInput, showRefresh ? _styles["default"].withRefresh : ''),
        value: this.state.searchString || '',
        onChange: this.onSearchInputChange,
        placeholder: _i18n["default"].getString('searchPlaceholder', currentLocale)
      }), refreshButton, _react["default"].createElement(Filter, {
        className: _styles["default"].actionButton,
        currentLocale: currentLocale,
        contactSourceNames: contactSourceNames,
        onSourceSelect: this.onSourceSelect,
        selectedSourceName: searchSource,
        unfold: this.state.unfold,
        onUnfoldChange: this.onUnfoldChange
      })), _react["default"].createElement(_Panel["default"], {
        className: _styles["default"].content
      }, _react["default"].createElement("div", {
        className: _styles["default"].contentWrapper,
        ref: this.contentWrapper
      }, _react["default"].createElement(_ContactList["default"], {
        ref: this.contactList,
        currentLocale: currentLocale,
        contactGroups: contactGroups,
        getAvatarUrl: getAvatarUrl,
        getPresence: getPresence,
        onItemSelect: onItemSelect,
        sourceNodeRenderer: sourceNodeRenderer,
        width: this.state.contentWidth,
        height: this.state.contentHeight
      }))), showSpinner ? _react["default"].createElement(_SpinnerOverlay["default"], {
        className: _styles["default"].spinner
      }) : null, children);
    }
  }]);

  return ContactsView;
}(_react.Component);

exports["default"] = ContactsView;
ContactsView.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  contactGroups: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    id: _propTypes["default"].string.isRequired,
    caption: _propTypes["default"].string.isRequired,
    contacts: _propTypes["default"].arrayOf(_ContactItem["default"].propTypes.contact).isRequired
  })).isRequired,
  contactSourceNames: _propTypes["default"].arrayOf(_propTypes["default"].string).isRequired,
  getAvatarUrl: _propTypes["default"].func.isRequired,
  getPresence: _propTypes["default"].func.isRequired,
  showSpinner: _propTypes["default"].bool.isRequired,
  searchSource: _propTypes["default"].string,
  searchString: _propTypes["default"].string,
  onItemSelect: _propTypes["default"].func,
  onSearchContact: _propTypes["default"].func,
  contactSourceFilterRenderer: _propTypes["default"].func,
  sourceNodeRenderer: _propTypes["default"].func,
  onVisitPage: _propTypes["default"].func,
  onRefresh: _propTypes["default"].func,
  children: _propTypes["default"].node
};
ContactsView.defaultProps = {
  searchSource: undefined,
  searchString: undefined,
  onItemSelect: undefined,
  onSearchContact: undefined,
  contactSourceFilterRenderer: _ContactSourceFilter["default"],
  sourceNodeRenderer: undefined,
  onVisitPage: undefined,
  children: undefined,
  onRefresh: undefined
};
//# sourceMappingURL=index.js.map
