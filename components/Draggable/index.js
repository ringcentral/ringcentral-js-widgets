"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/* eslint { "react/no-unused-state": 0 } */
var Draggable = /*#__PURE__*/function (_Component) {
  _inherits(Draggable, _Component);

  var _super = _createSuper(Draggable);

  function Draggable(props) {
    var _this;

    _classCallCheck(this, Draggable);

    _this = _super.call(this, props);
    _this.state = {
      dragging: false,
      positionX: 0,
      positionY: 0,
      translateX: props.positionOffsetX,
      translateY: props.positionOffsetY
    };
    _this._isClick = true;

    _this._onMouseDown = function (e) {
      if (e.button !== 0) return;

      if (_this.state.dragging) {
        return;
      }

      _this.setState({
        positionX: e.clientX,
        positionY: e.clientY,
        dragging: true
      });

      _this._positionXOnMouseDown = e.clientX;
      _this._positionYOnMouseDown = e.clientY;
      _this._isClick = true;
      window.addEventListener('mousemove', _this._onMouseMove, false);
      window.addEventListener('mouseup', _this._onMouseUp, false);
      e.stopPropagation();
      e.preventDefault();
    };

    _this._onMouseMove = function (e) {
      if (!_this.state.dragging) {
        return;
      }

      if (!_this.draggableDom) {
        return;
      }

      var _this$draggableDom = _this.draggableDom,
          offsetParent = _this$draggableDom.offsetParent,
          originalPositionX = _this$draggableDom.offsetLeft,
          originalPositionY = _this$draggableDom.offsetTop;
      var newPositionX = e.clientX;
      var newPositionY = e.clientY;
      var child = _this.draggableDom.firstChild;
      var height = child && child.clientHeight || 0;
      var width = child && child.clientWidth || 0;

      if (Math.abs(newPositionX - _this._positionXOnMouseDown) > _this.props.clickThreshold || Math.abs(newPositionY - _this._positionYOnMouseDown) > _this.props.clickThreshold) {
        _this._isClick = false;
      }

      _this.setState(function (preState) {
        var newState = {
          positionX: newPositionX,
          positionY: newPositionY,
          translateX: preState.translateX + (newPositionX - preState.positionX),
          translateY: preState.translateY + (newPositionY - preState.positionY)
        };

        if (originalPositionX - 10 + newState.translateX > offsetParent.clientWidth || originalPositionX - 10 + newState.translateX < width) {
          delete newState.translateX;
        }

        if (originalPositionY + 10 + newState.translateY > offsetParent.clientHeight - height || originalPositionY + 10 + newState.translateY < 0) {
          delete newState.translateY;
        }

        return newState;
      });

      e.stopPropagation();
      e.preventDefault();
    };

    _this._onMouseUp = function (e) {
      _this.setState({
        dragging: false
      });

      _this.props.updatePositionOffset(_this.state.translateX, _this.state.translateY);

      window.removeEventListener('mousemove', _this._onMouseMove);
      window.removeEventListener('mouseup', _this._onMouseUp);
      e.stopPropagation();
      e.preventDefault();
    };

    _this._onClick = function (e) {
      if (!_this._isClick) {
        return;
      }

      _this.props.onClick(e);
    };

    return _this;
  }

  _createClass(Draggable, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('mousemove', this._onMouseMove);
      window.removeEventListener('mouseup', this._onMouseUp);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children;
      var style = {
        msTransition: "translate(".concat(this.state.translateX, "px, ").concat(this.state.translateY, "px)"),
        WebkitTransition: "translate(".concat(this.state.translateX, "px, ").concat(this.state.translateY, "px)"),
        transform: "translate(".concat(this.state.translateX, "px, ").concat(this.state.translateY, "px)")
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        onMouseDown: this._onMouseDown,
        ref: function ref(draggableDom) {
          _this2.draggableDom = draggableDom;
        },
        style: style,
        className: (0, _classnames["default"])(_styles["default"].root, className),
        onClick: this._onClick
      }, children);
    }
  }]);

  return Draggable;
}(_react.Component);

Draggable.defaultProps = {
  className: null,
  onClick: function onClick() {
    return null;
  },
  positionOffsetX: 0,
  positionOffsetY: 0,
  updatePositionOffset: function updatePositionOffset() {
    return null;
  },
  clickThreshold: 5
};
var _default = Draggable;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
