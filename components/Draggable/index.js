'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint { "react/no-unused-state": 0 } */

var Draggable = function (_Component) {
  (0, _inherits3.default)(Draggable, _Component);

  function Draggable(props) {
    (0, _classCallCheck3.default)(this, Draggable);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Draggable.__proto__ || (0, _getPrototypeOf2.default)(Draggable)).call(this, props));

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

  (0, _createClass3.default)(Draggable, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('mousemove', this._onMouseMove);
      window.removeEventListener('mouseup', this._onMouseUp);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          children = _props.children;

      var style = {
        msTransition: 'translate(' + this.state.translateX + 'px, ' + this.state.translateY + 'px)',
        WebkitTransition: 'translate(' + this.state.translateX + 'px, ' + this.state.translateY + 'px)',
        transform: 'translate(' + this.state.translateX + 'px, ' + this.state.translateY + 'px)'
      };
      return _react2.default.createElement(
        'div',
        {
          onMouseDown: this._onMouseDown,
          ref: function ref(draggableDom) {
            _this2.draggableDom = draggableDom;
          },
          style: style,
          className: (0, _classnames2.default)(_styles2.default.root, className),
          onClick: this._onClick
        },
        children
      );
    }
  }]);
  return Draggable;
}(_react.Component);

Draggable.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node.isRequired,
  onClick: _propTypes2.default.func,
  positionOffsetX: _propTypes2.default.number,
  positionOffsetY: _propTypes2.default.number,
  updatePositionOffset: _propTypes2.default.func,
  clickThreshold: _propTypes2.default.number
};

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

exports.default = Draggable;
//# sourceMappingURL=index.js.map
