"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _debounce = _interopRequireDefault(require("@ringcentral-integration/commons/lib/debounce"));
var _SearchInput = require("@ringcentral-integration/widgets/components/SearchInput");
var _SpinnerOverlay = require("@ringcentral-integration/widgets/components/SpinnerOverlay");
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _GlipGroupList = _interopRequireDefault(require("../GlipGroupList"));
var _GlipTeamCreation = _interopRequireDefault(require("../GlipTeamCreation"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var GlipGroupsPanel = /*#__PURE__*/function (_PureComponent) {
  _inherits(GlipGroupsPanel, _PureComponent);
  var _super = _createSuper(GlipGroupsPanel);
  function GlipGroupsPanel(props) {
    var _this;
    _classCallCheck(this, GlipGroupsPanel);
    _this = _super.call(this, props);
    _this._onResize = (0, _debounce["default"])(function () {
      if (_this._mounted) {
        _this._calculateContentSize();
      }
    }, 300);
    _this.state = {
      searchString: props.searchFilter,
      showTeamCreationModal: false,
      contentHeight: 0,
      contentWidth: 0
    };
    _this.updateSeachString = function (e) {
      var searchString = e.target.value;
      _this.setState({
        searchString: searchString
      });
      _this.props.updateSearchFilter(searchString);
    };
    _this.toggleShowTeamCreationModal = function () {
      _this.setState(function (preState) {
        return {
          showTeamCreationModal: !preState.showTeamCreationModal
        };
      });
    };
    _this._contentWrapper = /*#__PURE__*/_react["default"].createRef();
    _this._mounted = false;
    return _this;
  }
  _createClass(GlipGroupsPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
      this._calculateContentSize();
      window.addEventListener('resize', this._onResize);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
      window.removeEventListener('resize', this._onResize);
    }
  }, {
    key: "_calculateContentSize",
    value: function _calculateContentSize() {
      if (this._contentWrapper && this._contentWrapper.current && this._contentWrapper.current.getBoundingClientRect) {
        var rect = this._contentWrapper.current.getBoundingClientRect();
        this.setState({
          contentHeight: rect.bottom - rect.top,
          contentWidth: rect.right - rect.left
        });
        return;
      }
      this.setState({
        contentHeight: 0,
        contentWidth: 0
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        groups = _this$props.groups,
        className = _this$props.className,
        currentGroupId = _this$props.currentGroupId,
        showSpinner = _this$props.showSpinner,
        currentPage = _this$props.currentPage,
        onNextPage = _this$props.onNextPage,
        onSelectGroup = _this$props.onSelectGroup,
        filteredContacts = _this$props.filteredContacts,
        updateContactSearchFilter = _this$props.updateContactSearchFilter,
        contactSearchFilter = _this$props.contactSearchFilter;
      var spinner = showSpinner ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null) : null;
      // TODO: update searching with i18n
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].root, className)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].header
      }, /*#__PURE__*/_react["default"].createElement(_SearchInput.SearchInput, {
        className: _styles["default"].searchInput,
        value: this.state.searchString,
        onChange: this.updateSeachString,
        placeholder: "Searching"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].addTeam,
        onClick: this.toggleShowTeamCreationModal
      }, "+")), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].content,
        ref: this._contentWrapper
      }, /*#__PURE__*/_react["default"].createElement(_GlipGroupList["default"], {
        groups: groups,
        onSelectGroup: onSelectGroup,
        currentGroupId: currentGroupId,
        onNextPage: onNextPage,
        currentPage: currentPage,
        width: this.state.contentWidth,
        height: this.state.contentHeight
      })), /*#__PURE__*/_react["default"].createElement(_GlipTeamCreation["default"], {
        filteredContacts: filteredContacts,
        updateFilter: updateContactSearchFilter,
        searchFilter: contactSearchFilter,
        closeModal: this.toggleShowTeamCreationModal,
        createTeam: this.props.createTeam,
        show: this.state.showTeamCreationModal
      }), spinner);
    }
  }]);
  return GlipGroupsPanel;
}(_react.PureComponent);
exports["default"] = GlipGroupsPanel;
GlipGroupsPanel.propTypes = {
  groups: _propTypes["default"].array,
  className: _propTypes["default"].string,
  searchFilter: _propTypes["default"].string,
  currentGroupId: _propTypes["default"].string,
  onSelectGroup: _propTypes["default"].func.isRequired,
  updateSearchFilter: _propTypes["default"].func.isRequired,
  showSpinner: _propTypes["default"].bool,
  currentPage: _propTypes["default"].number,
  onNextPage: _propTypes["default"].func,
  createTeam: _propTypes["default"].func.isRequired,
  filteredContacts: _propTypes["default"].array,
  updateContactSearchFilter: _propTypes["default"].func.isRequired,
  contactSearchFilter: _propTypes["default"].string
};
GlipGroupsPanel.defaultProps = {
  groups: [],
  className: undefined,
  searchFilter: '',
  currentGroupId: undefined,
  showSpinner: false,
  currentPage: 1,
  onNextPage: undefined,
  filteredContacts: [],
  contactSearchFilter: ''
};
//# sourceMappingURL=index.js.map
