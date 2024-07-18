"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.search");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("regenerator-runtime/runtime");
var _debounce = _interopRequireDefault(require("@ringcentral-integration/commons/lib/debounce"));
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ramda = require("ramda");
var _react = _interopRequireWildcard(require("react"));
var _ContactAdd = _interopRequireDefault(require("../../assets/images/ContactAdd.svg"));
var _OvalLoading = _interopRequireDefault(require("../../assets/images/OvalLoading.svg"));
var _RetryIcon = _interopRequireDefault(require("../../assets/images/RetryIcon.svg"));
var _ContactList = _interopRequireDefault(require("../ContactList"));
var _ContactSourceFilter = require("../ContactSourceFilter");
var _Panel = _interopRequireDefault(require("../Panel"));
var _SearchInput = require("../SearchInput");
var _SpinnerOverlay = require("../SpinnerOverlay");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
// @ts-expect-error
var AddContact = function AddContact(_ref) {
  var className = _ref.className,
    onClick = _ref.onClick;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: className,
    onClick: onClick
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].iconContainer
  }, /*#__PURE__*/_react["default"].createElement(_ContactAdd["default"], {
    className: _styles["default"].iconNode
  })));
};
AddContact.propTypes = {
  className: _propTypes["default"].string,
  onClick: _propTypes["default"].func.isRequired
};
AddContact.defaultProps = {
  className: undefined
};
var RefreshContacts = function RefreshContacts(_ref2) {
  var className = _ref2.className,
    onRefresh = _ref2.onRefresh,
    refreshing = _ref2.refreshing,
    currentLocale = _ref2.currentLocale;
  var icon = null;
  var iconWrapClass = null;
  if (refreshing) {
    iconWrapClass = _styles["default"].refreshingIcon;
    icon = /*#__PURE__*/_react["default"].createElement(_OvalLoading["default"], {
      className: _styles["default"].iconNode,
      width: 12,
      height: 12
    });
  } else {
    iconWrapClass = _styles["default"].refreshIcon;
    icon = /*#__PURE__*/_react["default"].createElement(_RetryIcon["default"], {
      className: _styles["default"].iconNode,
      width: 12,
      height: 12
    });
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(iconWrapClass, className),
    onClick: onRefresh,
    title: _i18n["default"].getString('refresh', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].iconContainer
  }, icon));
};
RefreshContacts.propTypes = {
  className: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string.isRequired,
  onRefresh: _propTypes["default"].func.isRequired,
  refreshing: _propTypes["default"].bool.isRequired
};
RefreshContacts.defaultProps = {
  className: undefined
};
var ContactsView = /*#__PURE__*/function (_Component) {
  _inherits(ContactsView, _Component);
  var _super = _createSuper(ContactsView);
  // @ts-expect-error
  function ContactsView(props) {
    var _this;
    _classCallCheck(this, ContactsView);
    _this = _super.call(this, props);
    _this.calculateContentSize = function () {
      if (
      // @ts-expect-error
      _this.contentWrapper &&
      // @ts-expect-error
      _this.contentWrapper.current &&
      // @ts-expect-error
      _this.contentWrapper.current.getBoundingClientRect) {
        // @ts-expect-error

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
    // @ts-expect-error
    _this.onSearchInputChange = function (ev) {
      _this.setState({
        searchString: ev.target.value,
        lastInputTimestamp: Date.now()
      }, function () {
        // @ts-expect-error
        var searchString = _this.state.searchString; // @ts-expect-error
        var searchSource = _this.props.searchSource;
        _this.search({
          searchString: searchString,
          searchSource: searchSource
        });
      });
    };
    // @ts-expect-error
    _this.onSourceSelect = function (searchSource) {
      if (
      // @ts-expect-error
      _this.contactList &&
      // @ts-expect-error
      _this.contactList.current &&
      // @ts-expect-error
      _this.contactList.current.resetScrollTop) {
        // @ts-expect-error
        _this.contactList.current.resetScrollTop();
      }
      // @ts-expect-error
      var searchString = _this.state.searchString;
      _this.search({
        searchSource: searchSource,
        searchString: searchString
      });
    };
    _this.onResize = (0, _debounce["default"])(function () {
      // @ts-expect-error
      if (_this._mounted) {
        _this.setState(_objectSpread({}, _this.calculateContentSize()));
      }
    }, 300);
    _this.onRefresh = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var onRefresh;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // @ts-expect-error
              onRefresh = _this.props.onRefresh;
              if (typeof onRefresh === 'function') {
                _this.setState({
                  refreshing: true
                }, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return onRefresh();
                        case 2:
                          _this.setState({
                            refreshing: false
                          });
                        case 3:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                })));
              }
            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    _this.state = {
      searchString: props.searchString,
      lastInputTimestamp: 0,
      unfold: false,
      contentHeight: 0,
      contentWidth: 0,
      refreshing: false
    };
    // @ts-expect-error
    _this.contactList = /*#__PURE__*/_react["default"].createRef();
    // @ts-expect-error
    _this.contentWrapper = /*#__PURE__*/_react["default"].createRef();
    // @ts-expect-error
    _this.onUnfoldChange = function (unfold) {
      _this.setState({
        unfold: unfold
      });
    };
    return _this;
  }
  _createClass(ContactsView, [{
    key: "componentDidMount",
    // @ts-expect-error
    value: function componentDidMount() {
      // @ts-expect-error
      this._mounted = true;
      // @ts-expect-error
      var onVisitPage = this.props.onVisitPage;
      if (typeof onVisitPage === 'function') {
        onVisitPage();
      }
      this.setState(_objectSpread({}, this.calculateContentSize()));
      window.addEventListener('resize', this.onResize);
    } // @ts-expect-error
  }, {
    key: "UNSAFE_componentWillUpdate",
    value: function UNSAFE_componentWillUpdate(nextProps, nextState) {
      // @ts-expect-error
      var lastInputTimestamp = this.state.lastInputTimestamp; // @ts-expect-error
      var searchStringProp = this.props.searchString; // sync search string from other app instance
      var isNotEditing = Date.now() - lastInputTimestamp > 2000;
      if (isNotEditing && nextProps.searchString !== searchStringProp) {
        nextState.searchString = nextProps.searchString;
      }
      // default to the first contact source when current selected contact source is removed
      if (!(0, _ramda.includes)(nextProps.searchSource, nextProps.contactSourceNames)) {
        // @ts-expect-error
        var searchString = this.state.searchString;
        this.search({
          searchSource: nextProps.contactSourceNames[0],
          searchString: searchString
        });
      }
    } // @ts-expect-error
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // @ts-expect-error
      this._mounted = false;
      window.removeEventListener('resize', this.onResize);
    }
  }, {
    key: "search",
    // @ts-expect-error
    value: function search(_ref5) {
      var searchSource = _ref5.searchSource,
        searchString = _ref5.searchString;
      // @ts-expect-error
      var onSearchContact = this.props.onSearchContact;
      if (typeof onSearchContact === 'function') {
        onSearchContact({
          searchSource: searchSource,
          searchString: searchString
        });
      }
    } // @ts-expect-error
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        currentLocale = _this$props.currentLocale,
        contactGroups = _this$props.contactGroups,
        contactSourceNames = _this$props.contactSourceNames,
        searchSource = _this$props.searchSource,
        isSearching = _this$props.isSearching,
        showSpinner = _this$props.showSpinner,
        getAvatarUrl = _this$props.getAvatarUrl,
        getPresence = _this$props.getPresence,
        onItemSelect = _this$props.onItemSelect,
        Filter = _this$props.contactSourceFilterRenderer,
        sourceNodeRenderer = _this$props.sourceNodeRenderer,
        onRefresh = _this$props.onRefresh,
        bottomNotice = _this$props.bottomNotice,
        bottomNoticeHeight = _this$props.bottomNoticeHeight,
        children = _this$props.children,
        currentSiteCode = _this$props.currentSiteCode,
        isMultipleSiteEnabled = _this$props.isMultipleSiteEnabled; // @ts-expect-error
      var _this$state = this.state,
        refreshing = _this$state.refreshing,
        searchString = _this$state.searchString,
        unfold = _this$state.unfold,
        contentWidth = _this$state.contentWidth,
        contentHeight = _this$state.contentHeight;
      var showRefresh = typeof onRefresh === 'function';
      var refreshButton = showRefresh ? /*#__PURE__*/_react["default"].createElement(RefreshContacts, {
        className: _styles["default"].actionButton,
        refreshing: refreshing,
        currentLocale: currentLocale,
        onRefresh: this.onRefresh
      }) : null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].root
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].actionBar
      }, /*#__PURE__*/_react["default"].createElement(_SearchInput.SearchInput, {
        dataSign: "contactsSearchInput",
        className: (0, _clsx["default"])(_styles["default"].searchInput, showRefresh ? _styles["default"].withRefresh : ''),
        value: searchString || '',
        onChange: this.onSearchInputChange,
        placeholder: _i18n["default"].getString('searchPlaceholder', currentLocale)
      }), refreshButton, /*#__PURE__*/_react["default"].createElement(Filter, {
        className: _styles["default"].actionButton,
        currentLocale: currentLocale,
        contactSourceNames: contactSourceNames,
        onSourceSelect: this.onSourceSelect,
        selectedSourceName: searchSource,
        unfold: unfold
        // @ts-expect-error
        ,
        onUnfoldChange: this.onUnfoldChange
      })), /*#__PURE__*/_react["default"].createElement(_Panel["default"], {
        className: _styles["default"].content
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].contentWrapper,
        ref:
        // @ts-expect-error
        this.contentWrapper
      }, /*#__PURE__*/_react["default"].createElement(_ContactList["default"]
      // @ts-expect-error
      , {
        ref: this.contactList
        // @ts-expect-error
        ,
        currentLocale: currentLocale,
        contactGroups: contactGroups,
        getAvatarUrl: getAvatarUrl,
        getPresence: getPresence,
        onItemSelect: onItemSelect,
        currentSiteCode: currentSiteCode,
        isMultipleSiteEnabled: isMultipleSiteEnabled,
        sourceNodeRenderer: sourceNodeRenderer,
        isSearching: isSearching,
        bottomNotice: bottomNotice,
        bottomNoticeHeight: bottomNoticeHeight,
        width: contentWidth,
        height: contentHeight
      }))), showSpinner ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, {
        className: _styles["default"].spinner
      }) : null, children);
    }
  }]);
  return ContactsView;
}(_react.Component); // @ts-expect-error
ContactsView.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  contactGroups: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    id: _propTypes["default"].string.isRequired,
    caption: _propTypes["default"].string.isRequired,
    contacts: _propTypes["default"].arrayOf(_propTypes["default"].shape({
      id: _propTypes["default"].string,
      type: _propTypes["default"].string,
      name: _propTypes["default"].string,
      extensionNumber: _propTypes["default"].string,
      email: _propTypes["default"].string,
      profileImageUrl: _propTypes["default"].string,
      presence: _propTypes["default"].object,
      contactStatus: _propTypes["default"].string
    })).isRequired
  })).isRequired,
  contactSourceNames: _propTypes["default"].arrayOf(_propTypes["default"].string).isRequired,
  getAvatarUrl: _propTypes["default"].func.isRequired,
  getPresence: _propTypes["default"].func.isRequired,
  showSpinner: _propTypes["default"].bool.isRequired,
  currentSiteCode: _propTypes["default"].string,
  isMultipleSiteEnabled: _propTypes["default"].bool,
  searchSource: _propTypes["default"].string,
  searchString: _propTypes["default"].string,
  isSearching: _propTypes["default"].bool,
  onItemSelect: _propTypes["default"].func,
  onSearchContact: _propTypes["default"].func,
  contactSourceFilterRenderer: _propTypes["default"].func,
  sourceNodeRenderer: _propTypes["default"].func,
  onVisitPage: _propTypes["default"].func,
  onRefresh: _propTypes["default"].func,
  bottomNotice: _propTypes["default"].func,
  bottomNoticeHeight: _propTypes["default"].number,
  children: _propTypes["default"].node
};

// @ts-expect-error
ContactsView.defaultProps = {
  searchSource: undefined,
  searchString: undefined,
  isSearching: false,
  onItemSelect: undefined,
  onSearchContact: undefined,
  contactSourceFilterRenderer: _ContactSourceFilter.ContactSourceFilter,
  sourceNodeRenderer: undefined,
  onVisitPage: undefined,
  children: undefined,
  onRefresh: undefined,
  bottomNotice: undefined,
  bottomNoticeHeight: 0,
  currentSiteCode: '',
  isMultipleSiteEnabled: false
};
var _default = ContactsView;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
