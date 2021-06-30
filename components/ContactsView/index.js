"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

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

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.date.now");

var _ramda = require("ramda");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _debounce = _interopRequireDefault(require("@ringcentral-integration/commons/lib/debounce"));

var _Panel = _interopRequireDefault(require("../Panel"));

var _SearchInput = require("../SearchInput");

var _SpinnerOverlay = require("../SpinnerOverlay");

var _ContactList = _interopRequireDefault(require("../ContactList"));

var _ContactItem = _interopRequireDefault(require("../ContactItem"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _ContactAdd = _interopRequireDefault(require("../../assets/images/ContactAdd.svg"));

var _RetryIcon = _interopRequireDefault(require("../../assets/images/RetryIcon.svg"));

var _OvalLoading = _interopRequireDefault(require("../../assets/images/OvalLoading.svg"));

var _ContactSourceFilter = _interopRequireDefault(require("../ContactSourceFilter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
    className: (0, _classnames["default"])(iconWrapClass, className),
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

  function ContactsView(props) {
    var _this;

    _classCallCheck(this, ContactsView);

    _this = _super.call(this, props);

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

    _this.onSearchInputChange = function (ev) {
      _this.setState({
        searchString: ev.target.value,
        lastInputTimestamp: Date.now()
      }, function () {
        var searchString = _this.state.searchString;
        var searchSource = _this.props.searchSource;

        _this.search({
          searchString: searchString,
          searchSource: searchSource
        });
      });
    };

    _this.onSourceSelect = function (searchSource) {
      if (_this.contactList && _this.contactList.current && _this.contactList.current.resetScrollTop) {
        _this.contactList.current.resetScrollTop();
      }

      var searchString = _this.state.searchString;

      _this.search({
        searchSource: searchSource,
        searchString: searchString
      });
    };

    _this.onResize = (0, _debounce["default"])(function () {
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
    _this.contactList = /*#__PURE__*/_react["default"].createRef();
    _this.contentWrapper = /*#__PURE__*/_react["default"].createRef();

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
      var onVisitPage = this.props.onVisitPage;

      if (typeof onVisitPage === 'function') {
        onVisitPage();
      }

      this.setState(_objectSpread({}, this.calculateContentSize()));
      window.addEventListener('resize', this.onResize);
    }
  }, {
    key: "UNSAFE_componentWillUpdate",
    value: function UNSAFE_componentWillUpdate(nextProps, nextState) {
      var lastInputTimestamp = this.state.lastInputTimestamp;
      var searchStringProp = this.props.searchString; // sync search string from other app instance

      var isNotEditing = Date.now() - lastInputTimestamp > 2000;

      if (isNotEditing && nextProps.searchString !== searchStringProp) {
        nextState.searchString = nextProps.searchString;
      } // default to the first contact source when current selected contact source is removed


      if (!(0, _ramda.contains)(nextProps.searchSource, nextProps.contactSourceNames)) {
        var searchString = this.state.searchString;
        this.search({
          searchSource: nextProps.contactSourceNames[0],
          searchString: searchString
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
      window.removeEventListener('resize', this.onResize);
    }
  }, {
    key: "search",
    value: function search(_ref5) {
      var searchSource = _ref5.searchSource,
          searchString = _ref5.searchString;
      var onSearchContact = this.props.onSearchContact;

      if (typeof onSearchContact === 'function') {
        onSearchContact({
          searchSource: searchSource,
          searchString: searchString
        });
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
          isMultipleSiteEnabled = _this$props.isMultipleSiteEnabled;
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
        className: (0, _classnames["default"])(_styles["default"].searchInput, showRefresh ? _styles["default"].withRefresh : ''),
        value: searchString || '',
        onChange: this.onSearchInputChange,
        placeholder: _i18n["default"].getString('searchPlaceholder', currentLocale)
      }), refreshButton, /*#__PURE__*/_react["default"].createElement(Filter, {
        className: _styles["default"].actionButton,
        currentLocale: currentLocale,
        contactSourceNames: contactSourceNames,
        onSourceSelect: this.onSourceSelect,
        selectedSourceName: searchSource,
        unfold: unfold,
        onUnfoldChange: this.onUnfoldChange
      })), /*#__PURE__*/_react["default"].createElement(_Panel["default"], {
        className: _styles["default"].content
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].contentWrapper,
        ref: this.contentWrapper
      }, /*#__PURE__*/_react["default"].createElement(_ContactList["default"], {
        ref: this.contactList,
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
ContactsView.defaultProps = {
  searchSource: undefined,
  searchString: undefined,
  isSearching: false,
  onItemSelect: undefined,
  onSearchContact: undefined,
  contactSourceFilterRenderer: _ContactSourceFilter["default"],
  sourceNodeRenderer: undefined,
  onVisitPage: undefined,
  children: undefined,
  onRefresh: undefined,
  bottomNotice: undefined,
  bottomNoticeHeight: 0,
  currentSiteCode: '',
  isMultipleSiteEnabled: false
};
//# sourceMappingURL=index.js.map
