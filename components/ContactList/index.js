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

var _reactVirtualized = require('react-virtualized');

var _ramda = require('ramda');

var _ContactItem = require('../ContactItem');

var _ContactItem2 = _interopRequireDefault(_ContactItem);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CAPTION_HEIGHT = 20;
var ROW_HEIGHT = 50;

function NoContacts(_ref) {
  var currentLocale = _ref.currentLocale;

  return _react2.default.createElement(
    'p',
    { className: _styles2.default.noContacts },
    _i18n2.default.getString('noContacts', currentLocale)
  );
}
NoContacts.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired
};

var ContactList = function (_Component) {
  (0, _inherits3.default)(ContactList, _Component);

  function ContactList(props) {
    (0, _classCallCheck3.default)(this, ContactList);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ContactList.__proto__ || (0, _getPrototypeOf2.default)(ContactList)).call(this, props));

    _this.calculateRowHeight = function (_ref2) {
      var index = _ref2.index;

      if (_this.state.captionRows[index]) {
        return CAPTION_HEIGHT;
      }
      return ROW_HEIGHT;
    };

    _this.findGroup = function (_ref3) {
      var index = _ref3.index;
      return (0, _ramda.find)(function (item) {
        return index >= item.startIndex && index < item.startIndex + item.contacts.length;
      }, _this.state.groups);
    };

    _this.rowGetter = function (_ref4) {
      var index = _ref4.index;

      if (_this.state.captionRows[index]) {
        return {
          caption: _this.state.captionRows[index]
        };
      }
      var group = _this.findGroup({ index: index });
      return group.contacts[index - group.startIndex];
    };

    _this.onScroll = function (_ref5) {
      var scrollTop = _ref5.scrollTop;

      if (scrollTop !== _this.state.scrollTop) {
        _this.setState({
          scrollTop: scrollTop
        });
      }
    };

    _this.cellRenderer = function (_ref6) {
      var rowData = _ref6.rowData;

      if (rowData.caption) {
        return _react2.default.createElement(
          'div',
          {
            className: _styles2.default.groupCaption
          },
          rowData.caption
        );
      }
      var _this$props = _this.props,
          getAvatarUrl = _this$props.getAvatarUrl,
          getPresence = _this$props.getPresence,
          onItemSelect = _this$props.onItemSelect,
          sourceNodeRenderer = _this$props.sourceNodeRenderer;

      return _react2.default.createElement(
        'div',
        {
          key: rowData.type + '-' + rowData.id
        },
        _react2.default.createElement(_ContactItem2.default, {
          contact: rowData,
          getAvatarUrl: getAvatarUrl,
          getPresence: getPresence,
          onSelect: onItemSelect,
          sourceNodeRenderer: sourceNodeRenderer
        })
      );
    };

    _this.onRowsRendered = function (_ref7) {
      var startIndex = _ref7.startIndex;

      // update header with the correct caption
      if (_this.state.captionRows[startIndex]) {
        var groupIndex = (0, _ramda.findIndex)(function (item) {
          return item === _this.state.captionRows[startIndex];
        }, _this.state.captions);
        var previousCaption = _this.state.captions[groupIndex - 1];
        if (previousCaption !== _this.state.currentCaption) {
          _this.setState({
            currentCaption: previousCaption
          });
        }
      } else {
        var group = _this.findGroup({ index: startIndex });
        if (group.caption !== _this.state.currentCaption) {
          _this.setState({
            currentCaption: group.caption
          });
        }
      }
    };

    _this.headerRenderer = function () {
      return _react2.default.createElement(
        'div',
        {
          className: _styles2.default.groupCaption
        },
        _this.state.currentCaption
      );
    };

    _this.state = ContactList.getDerivedStateFromProps(props);
    _this.list = _react2.default.createRef();
    return _this;
  }

  (0, _createClass3.default)(ContactList, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.state.lastContactGroups !== prevProps.contactGroups) {
        if (this.list && this.list.current && this.list.current.recomputeRowHeights) {
          this.list.current.recomputeRowHeights(0);
        }
      }
    }
  }, {
    key: 'resetScrollTop',
    value: function resetScrollTop() {
      this.setState({
        scrollTop: 0
      });
    }
  }, {
    key: 'renderList',
    value: function renderList() {
      // use table instead of list to allow caption header
      return _react2.default.createElement(
        _reactVirtualized.Table,
        {
          ref: this.list,
          headerHeight: CAPTION_HEIGHT,
          width: this.props.width,
          height: this.props.height,
          rowCount: this.state.count,
          rowHeight: this.calculateRowHeight,
          rowGetter: this.rowGetter,
          onRowsRendered: this.onRowsRendered,
          onScroll: this.onScroll,
          scrollTop: this.state.scrollTop
        },
        _react2.default.createElement(_reactVirtualized.Column, {
          dataKey: 'caption',
          disableSort: true,
          flexGrow: 1,
          width: this.props.width,
          cellRenderer: this.cellRenderer,
          headerRenderer: this.headerRenderer
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          currentLocale = _props.currentLocale,
          contactGroups = _props.contactGroups,
          width = _props.width,
          height = _props.height;

      var content = null;
      if (width !== 0 && height !== 0) {
        content = contactGroups.length ? this.renderList() : _react2.default.createElement(NoContacts, {
          currentLocale: currentLocale
        });
      }
      return _react2.default.createElement(
        'div',
        {
          className: _styles2.default.root
        },
        content
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props) {
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { scrollTop: 0, currentCaption: '' };

      if (props.contactGroups !== state.lastContactGroups) {
        return (0, _extends3.default)({}, (0, _ramda.reduce)(function (nextState, group) {
          nextState.captions.push(group.caption);

          // skip the caption row for the first group
          var rowOffset = nextState.groups.length !== 0 ? 1 : 0;
          if (rowOffset) {
            nextState.captionRows[nextState.count] = group.caption;
          }
          nextState.groups.push((0, _extends3.default)({}, group, {
            startIndex: nextState.count + rowOffset
          }));
          nextState.count += group.contacts.length + rowOffset; // with caption row
          return nextState;
        }, (0, _extends3.default)({}, state, {
          groups: [],
          captions: [],
          captionRows: {},
          count: 0
        }), props.contactGroups), {
          lastContactGroups: props.contactGroups
        });
      }
      return state;
    }
  }]);
  return ContactList;
}(_react.Component);

exports.default = ContactList;


ContactList.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  contactGroups: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    caption: _propTypes2.default.string.isRequired,
    contacts: _propTypes2.default.arrayOf(_ContactItem2.default.propTypes.contact).isRequired
  })).isRequired,
  getAvatarUrl: _propTypes2.default.func.isRequired,
  getPresence: _propTypes2.default.func.isRequired,
  onItemSelect: _propTypes2.default.func,
  sourceNodeRenderer: _propTypes2.default.func,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired
};

ContactList.defaultProps = {
  onItemSelect: undefined,
  sourceNodeRenderer: undefined,
  listRef: undefined
};
//# sourceMappingURL=index.js.map
