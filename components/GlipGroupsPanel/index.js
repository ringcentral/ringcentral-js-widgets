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

var _SearchInput = require('ringcentral-widgets/components/SearchInput');

var _SearchInput2 = _interopRequireDefault(_SearchInput);

var _SpinnerOverlay = require('ringcentral-widgets/components/SpinnerOverlay');

var _SpinnerOverlay2 = _interopRequireDefault(_SpinnerOverlay);

var _debounce = require('ringcentral-integration/lib/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _GlipGroupList = require('../GlipGroupList');

var _GlipGroupList2 = _interopRequireDefault(_GlipGroupList);

var _GlipTeamCreation = require('../GlipTeamCreation');

var _GlipTeamCreation2 = _interopRequireDefault(_GlipTeamCreation);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GlipGroupsPanel = function (_PureComponent) {
  (0, _inherits3.default)(GlipGroupsPanel, _PureComponent);

  function GlipGroupsPanel(props) {
    (0, _classCallCheck3.default)(this, GlipGroupsPanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GlipGroupsPanel.__proto__ || (0, _getPrototypeOf2.default)(GlipGroupsPanel)).call(this, props));

    _this._onResize = (0, _debounce2.default)(function () {
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
    _this._contentWrapper = _react2.default.createRef();
    _this._mounted = false;
    return _this;
  }

  (0, _createClass3.default)(GlipGroupsPanel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._mounted = true;
      this._calculateContentSize();
      window.addEventListener('resize', this._onResize);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._mounted = false;
      window.removeEventListener('resize', this._onResize);
    }
  }, {
    key: '_calculateContentSize',
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
    key: 'render',
    value: function render() {
      var _props = this.props,
          groups = _props.groups,
          className = _props.className,
          currentGroupId = _props.currentGroupId,
          showSpinner = _props.showSpinner,
          currentPage = _props.currentPage,
          onNextPage = _props.onNextPage,
          onSelectGroup = _props.onSelectGroup,
          filteredContacts = _props.filteredContacts,
          updateContactSearchFilter = _props.updateContactSearchFilter,
          contactSearchFilter = _props.contactSearchFilter;

      var spinner = showSpinner ? _react2.default.createElement(_SpinnerOverlay2.default, null) : null;
      // TODO: update searching with i18n
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.root, className) },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.header },
          _react2.default.createElement(_SearchInput2.default, {
            className: _styles2.default.searchInput,
            value: this.state.searchString,
            onChange: this.updateSeachString,
            placeholder: 'Searching'
          }),
          _react2.default.createElement(
            'div',
            {
              className: _styles2.default.addTeam,
              onClick: this.toggleShowTeamCreationModal
            },
            '+'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.content, ref: this._contentWrapper },
          _react2.default.createElement(_GlipGroupList2.default, {
            groups: groups,
            onSelectGroup: onSelectGroup,
            currentGroupId: currentGroupId,
            onNextPage: onNextPage,
            currentPage: currentPage,
            width: this.state.contentWidth,
            height: this.state.contentHeight
          })
        ),
        _react2.default.createElement(_GlipTeamCreation2.default, {
          filteredContacts: filteredContacts,
          updateFilter: updateContactSearchFilter,
          searchFilter: contactSearchFilter,
          closeModal: this.toggleShowTeamCreationModal,
          createTeam: this.props.createTeam,
          show: this.state.showTeamCreationModal
        }),
        spinner
      );
    }
  }]);
  return GlipGroupsPanel;
}(_react.PureComponent);

exports.default = GlipGroupsPanel;


GlipGroupsPanel.propTypes = {
  groups: _propTypes2.default.array,
  className: _propTypes2.default.string,
  searchFilter: _propTypes2.default.string,
  currentGroupId: _propTypes2.default.string,
  onSelectGroup: _propTypes2.default.func.isRequired,
  updateSearchFilter: _propTypes2.default.func.isRequired,
  showSpinner: _propTypes2.default.bool,
  currentPage: _propTypes2.default.number,
  onNextPage: _propTypes2.default.func,
  createTeam: _propTypes2.default.func.isRequired,
  filteredContacts: _propTypes2.default.array,
  updateContactSearchFilter: _propTypes2.default.func.isRequired,
  contactSearchFilter: _propTypes2.default.string
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
