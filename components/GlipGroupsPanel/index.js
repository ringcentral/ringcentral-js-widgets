"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _SearchInput = _interopRequireDefault(require("ringcentral-widgets/components/SearchInput"));

var _SpinnerOverlay = _interopRequireDefault(require("ringcentral-widgets/components/SpinnerOverlay"));

var _debounce = _interopRequireDefault(require("ringcentral-integration/lib/debounce"));

var _GlipGroupList = _interopRequireDefault(require("../GlipGroupList"));

var _GlipTeamCreation = _interopRequireDefault(require("../GlipTeamCreation"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GlipGroupsPanel =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(GlipGroupsPanel, _PureComponent);

  function GlipGroupsPanel(props) {
    var _this;

    _classCallCheck(this, GlipGroupsPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GlipGroupsPanel).call(this, props));
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

    _this._contentWrapper = _react["default"].createRef();
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
      var spinner = showSpinner ? _react["default"].createElement(_SpinnerOverlay["default"], null) : null; // TODO: update searching with i18n

      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, className)
      }, _react["default"].createElement("div", {
        className: _styles["default"].header
      }, _react["default"].createElement(_SearchInput["default"], {
        className: _styles["default"].searchInput,
        value: this.state.searchString,
        onChange: this.updateSeachString,
        placeholder: "Searching"
      }), _react["default"].createElement("div", {
        className: _styles["default"].addTeam,
        onClick: this.toggleShowTeamCreationModal
      }, "+")), _react["default"].createElement("div", {
        className: _styles["default"].content,
        ref: this._contentWrapper
      }, _react["default"].createElement(_GlipGroupList["default"], {
        groups: groups,
        onSelectGroup: onSelectGroup,
        currentGroupId: currentGroupId,
        onNextPage: onNextPage,
        currentPage: currentPage,
        width: this.state.contentWidth,
        height: this.state.contentHeight
      })), _react["default"].createElement(_GlipTeamCreation["default"], {
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