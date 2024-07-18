"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ramda = require("ramda");
var _react = _interopRequireWildcard(require("react"));
var _reactVirtualized = require("react-virtualized");
var _ContactItem = require("../ContactItem");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var CAPTION_HEIGHT = 20;
var ROW_HEIGHT = 50;

// @ts-expect-error
var Placeholder = function Placeholder(_ref) {
  var message = _ref.message;
  return /*#__PURE__*/_react["default"].createElement("p", {
    className: _styles["default"].placeholder
  }, message);
};
Placeholder.propTypes = {
  message: _propTypes["default"].string.isRequired
};
var ContactList = /*#__PURE__*/function (_Component) {
  _inherits(ContactList, _Component);
  var _super = _createSuper(ContactList);
  // @ts-expect-error
  function ContactList(props) {
    var _this;
    _classCallCheck(this, ContactList);
    _this = _super.call(this, props);
    // @ts-expect-error
    _this.calculateRowHeight = function (_ref2) {
      var index = _ref2.index;
      if (_this.isBottomNoticeRow(index)) {
        // @ts-expect-error
        return _this.props.bottomNoticeHeight;
      }
      // @ts-expect-error
      if (_this.state.captionRows[index]) {
        return CAPTION_HEIGHT;
      }
      return ROW_HEIGHT;
    };
    // @ts-expect-error
    _this.findGroup = function (_ref3) {
      var index = _ref3.index;
      return (0, _ramda.find)(function (item) {
        return (
          // @ts-expect-error
          index >= item.startIndex &&
          // @ts-expect-error
          index < item.startIndex + item.contacts.length
        );
      },
      // @ts-expect-error
      _this.state.groups);
    };
    // @ts-expect-error
    _this.rowGetter = function (_ref4) {
      var index = _ref4.index;
      if (_this.isBottomNoticeRow(index)) {
        return {
          bottomNoticeRow: true
        };
      }
      // @ts-expect-error
      if (_this.state.captionRows[index]) {
        return {
          // @ts-expect-error
          caption: _this.state.captionRows[index]
        };
      }
      var group = _this.findGroup({
        index: index
      });
      // @ts-expect-error
      return group.contacts[index - group.startIndex];
    };
    // @ts-expect-error
    _this.onScroll = function (_ref5) {
      var scrollTop = _ref5.scrollTop;
      // @ts-expect-error
      if (scrollTop !== _this.state.scrollTop) {
        _this.setState({
          scrollTop: scrollTop
        });
      }
    };
    // @ts-expect-error
    _this.cellRenderer = function (_ref6) {
      var rowData = _ref6.rowData;
      if (rowData.bottomNoticeRow) {
        // @ts-expect-error
        var BottomNotice = _this.props.bottomNotice;
        return BottomNotice ? /*#__PURE__*/_react["default"].createElement(BottomNotice, null) : /*#__PURE__*/_react["default"].createElement("span", null);
      }
      if (rowData.caption) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].groupCaption
        }, rowData.caption);
      }
      var _this$props = _this.props,
        currentLocale = _this$props.currentLocale,
        getAvatarUrl = _this$props.getAvatarUrl,
        getPresence = _this$props.getPresence,
        onItemSelect = _this$props.onItemSelect,
        sourceNodeRenderer = _this$props.sourceNodeRenderer,
        currentSiteCode = _this$props.currentSiteCode,
        isMultipleSiteEnabled = _this$props.isMultipleSiteEnabled;
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: "".concat(rowData.type, "-").concat(rowData.id)
      }, /*#__PURE__*/_react["default"].createElement(_ContactItem.ContactItem, {
        currentLocale: currentLocale,
        currentSiteCode: currentSiteCode,
        isMultipleSiteEnabled: isMultipleSiteEnabled,
        contact: rowData,
        getAvatarUrl: getAvatarUrl,
        getPresence: getPresence,
        onSelect: onItemSelect,
        sourceNodeRenderer: sourceNodeRenderer
      }));
    };
    // @ts-expect-error
    _this.onRowsRendered = function (_ref7) {
      var startIndex = _ref7.startIndex;
      if (_this.isBottomNoticeRow(startIndex)) {
        return;
      }
      // update header with the correct caption

      // @ts-expect-error
      if (_this.state.captionRows[startIndex]) {
        var groupIndex = (0, _ramda.findIndex)(
        // @ts-expect-error
        function (item) {
          return item === _this.state.captionRows[startIndex];
        },
        // @ts-expect-error
        _this.state.captions);
        // @ts-expect-error
        var previousCaption = _this.state.captions[groupIndex - 1];
        // @ts-expect-error
        if (previousCaption !== _this.state.currentCaption) {
          _this.setState({
            currentCaption: previousCaption
          });
        }
      } else {
        var group = _this.findGroup({
          index: startIndex
        });
        // @ts-expect-error
        if (group.caption !== _this.state.currentCaption) {
          _this.setState({
            // @ts-expect-error
            currentCaption: group.caption
          });
        }
      }
    };
    _this.headerRenderer = function () {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].groupCaption,
        "data-sign": "currentCaption"
      },
      // @ts-expect-error
      _this.state.currentCaption);
    };
    _this.state = ContactList.getDerivedStateFromProps(props);
    // @ts-expect-error
    _this.list = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }
  _createClass(ContactList, [{
    key: "componentDidUpdate",
    // @ts-expect-error
    value: function componentDidUpdate(prevProps) {
      // @ts-expect-error
      if (this.state.lastContactGroups !== prevProps.contactGroups) {
        if (
        // @ts-expect-error
        this.list &&
        // @ts-expect-error
        this.list.current &&
        // @ts-expect-error
        this.list.current.recomputeRowHeights) {
          // @ts-expect-error
          this.list.current.recomputeRowHeights(0);
        }
      }
    } // @ts-expect-error
  }, {
    key: "isBottomNoticeRow",
    value: function isBottomNoticeRow(rowIndex) {
      // @ts-expect-error
      return this.props.bottomNotice && rowIndex === this.state.rowCount;
    }
  }, {
    key: "resetScrollTop",
    value: function resetScrollTop() {
      this.setState({
        scrollTop: 0
      });
    }
  }, {
    key: "renderList",
    value: function renderList() {
      // use table instead of list to allow caption header
      return /*#__PURE__*/_react["default"].createElement(_reactVirtualized.Table
      // @ts-expect-error
      , {
        ref: this.list,
        headerHeight: CAPTION_HEIGHT
        // @ts-expect-error
        ,
        width: this.props.width
        // @ts-expect-error
        ,
        height: this.props.height
        // @ts-expect-error
        ,
        rowCount: this.state.rowCount + (this.props.bottomNotice ? 1 : 0),
        rowHeight: this.calculateRowHeight,
        rowGetter: this.rowGetter,
        onRowsRendered: this.onRowsRendered,
        onScroll: this.onScroll
        // @ts-expect-error
        ,
        scrollTop: this.state.scrollTop
      }, /*#__PURE__*/_react["default"].createElement(_reactVirtualized.Column, {
        dataKey: "caption",
        disableSort: true,
        flexGrow: 1
        // @ts-expect-error
        ,
        width: this.props.width,
        cellRenderer: this.cellRenderer,
        headerRenderer: this.headerRenderer
      }));
    } // @ts-expect-error
  }, {
    key: "render",
    value: function render() {
      // @ts-expect-error
      var _this$props2 = this.props,
        currentLocale = _this$props2.currentLocale,
        contactGroups = _this$props2.contactGroups,
        isSearching = _this$props2.isSearching,
        width = _this$props2.width,
        height = _this$props2.height;
      var content = null;
      if (width !== 0 && height !== 0) {
        if (contactGroups.length) {
          content = this.renderList();
        } else if (isSearching) {
          content = /*#__PURE__*/_react["default"].createElement(Placeholder, {
            message: _i18n["default"].getString('onSearching', currentLocale)
          });
        } else {
          content = /*#__PURE__*/_react["default"].createElement(Placeholder, {
            message: _i18n["default"].getString('noContacts', currentLocale)
          });
        }
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].root,
        "data-sign": "contactList"
        // @ts-expect-error
        ,
        "data-contact-count": this.state.contactCount
      }, content);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(
    // @ts-expect-error
    props) {
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        scrollTop: 0,
        currentCaption: ''
      };
      // @ts-expect-error
      if (props.contactGroups !== state.lastContactGroups) {
        return _objectSpread(_objectSpread({}, (0, _ramda.reduce)(function (nextState, group) {
          // @ts-expect-error
          nextState.captions.push(group.caption);

          // skip the caption row for the first group
          var rowOffset = nextState.groups.length !== 0 ? 1 : 0;
          if (rowOffset) {
            // @ts-expect-error
            nextState.captionRows[nextState.rowCount] = group.caption;
          }
          nextState.groups.push(_objectSpread(_objectSpread({}, group), {}, {
            startIndex: nextState.rowCount + rowOffset
          }));
          // @ts-expect-error
          nextState.rowCount += group.contacts.length + rowOffset; // with caption row
          // @ts-expect-error
          nextState.contactCount += group.contacts.length;
          return nextState;
        }, _objectSpread(_objectSpread({}, state), {}, {
          groups: [],
          captions: [],
          captionRows: {},
          rowCount: 0,
          contactCount: 0
        }), props.contactGroups)), {}, {
          lastContactGroups: props.contactGroups
        });
      }
      return state;
    }
  }]);
  return ContactList;
}(_react.Component); // @ts-expect-error
ContactList.propTypes = {
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
  getAvatarUrl: _propTypes["default"].func.isRequired,
  currentSiteCode: _propTypes["default"].string,
  isMultipleSiteEnabled: _propTypes["default"].bool,
  getPresence: _propTypes["default"].func.isRequired,
  onItemSelect: _propTypes["default"].func,
  sourceNodeRenderer: _propTypes["default"].func,
  isSearching: _propTypes["default"].bool,
  bottomNotice: _propTypes["default"].func,
  bottomNoticeHeight: _propTypes["default"].number,
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired
};

// @ts-expect-error
ContactList.defaultProps = {
  onItemSelect: undefined,
  sourceNodeRenderer: undefined,
  isSearching: false,
  bottomNotice: undefined,
  bottomNoticeHeight: 0,
  currentSiteCode: '',
  isMultipleSiteEnabled: false
};
var _default = ContactList;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
