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

var _reactVirtualized = require("react-virtualized");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _GlipGroupItem = _interopRequireDefault(require("../GlipGroupItem"));

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

var GlipGroupList =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(GlipGroupList, _PureComponent);

  function GlipGroupList(props) {
    var _this;

    _classCallCheck(this, GlipGroupList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GlipGroupList).call(this, props));

    _this._rowRenderer = function (_ref) {
      var index = _ref.index,
          key = _ref.key,
          style = _ref.style;
      var group = _this.props.groups[index];
      return _react["default"].createElement("div", {
        key: key,
        style: style
      }, _react["default"].createElement(_GlipGroupItem["default"], {
        group: group,
        active: group.id === _this.props.currentGroupId,
        onSelectGroup: function onSelectGroup() {
          _this.props.onSelectGroup(group.id);
        },
        className: _styles["default"].item
      }));
    };

    _this._rowHeight = 75;
    _this._list = _react["default"].createRef();
    return _this;
  }

  _createClass(GlipGroupList, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.groups !== prevProps.groups || this.props.currentGroupId !== prevProps.currentGroupId) {
        if (this._list && this._list.current) {
          this._list.current.forceUpdateGrid();
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          groups = _this$props.groups,
          width = _this$props.width,
          height = _this$props.height,
          className = _this$props.className;
      return _react["default"].createElement(_reactVirtualized.List, {
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

exports["default"] = GlipGroupList;
GlipGroupList.propTypes = {
  className: _propTypes["default"].string,
  groups: _propTypes["default"].array,
  onSelectGroup: _propTypes["default"].func.isRequired,
  currentGroupId: _propTypes["default"].string,
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired
};
GlipGroupList.defaultProps = {
  className: undefined,
  groups: [],
  currentGroupId: undefined
};
//# sourceMappingURL=index.js.map
