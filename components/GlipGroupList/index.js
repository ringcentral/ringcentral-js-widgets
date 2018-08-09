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

var _reactVirtualized = require('react-virtualized');

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _GlipGroupItem = require('../GlipGroupItem');

var _GlipGroupItem2 = _interopRequireDefault(_GlipGroupItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GlipGroupList = function (_PureComponent) {
  (0, _inherits3.default)(GlipGroupList, _PureComponent);

  function GlipGroupList(props) {
    (0, _classCallCheck3.default)(this, GlipGroupList);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GlipGroupList.__proto__ || (0, _getPrototypeOf2.default)(GlipGroupList)).call(this, props));

    _this._rowRenderer = function (_ref) {
      var index = _ref.index,
          key = _ref.key,
          style = _ref.style;

      var group = _this.props.groups[index];
      return _react2.default.createElement(
        'div',
        {
          key: key,
          style: style
        },
        _react2.default.createElement(_GlipGroupItem2.default, {
          group: group,
          active: group.id === _this.props.currentGroupId,
          onSelectGroup: function onSelectGroup() {
            _this.props.onSelectGroup(group.id);
          },
          className: _styles2.default.item
        })
      );
    };

    _this._rowHeight = 75;
    _this._list = _react2.default.createRef();
    return _this;
  }

  (0, _createClass3.default)(GlipGroupList, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.groups !== prevProps.groups || this.props.currentGroupId !== prevProps.currentGroupId) {
        if (this._list && this._list.current) {
          this._list.current.forceUpdateGrid();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          groups = _props.groups,
          width = _props.width,
          height = _props.height,
          className = _props.className;

      return _react2.default.createElement(_reactVirtualized.List, {
        ref: this._list,
        className: className,
        width: width,
        height: height,
        rowCount: groups.length,
        rowHeight: 75,
        rowRenderer: this._rowRenderer
      });
    }
  }]);
  return GlipGroupList;
}(_react.PureComponent);

exports.default = GlipGroupList;


GlipGroupList.propTypes = {
  className: _propTypes2.default.string,
  groups: _propTypes2.default.array,
  onSelectGroup: _propTypes2.default.func.isRequired,
  currentGroupId: _propTypes2.default.string,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired
};

GlipGroupList.defaultProps = {
  className: undefined,
  groups: [],
  currentGroupId: undefined
};
//# sourceMappingURL=index.js.map
