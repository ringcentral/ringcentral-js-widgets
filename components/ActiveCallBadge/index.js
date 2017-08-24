'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ActiveCallBadge;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Badge = require('../Badge');

var _Badge2 = _interopRequireDefault(_Badge);

var _Draggable = require('../Draggable');

var _Draggable2 = _interopRequireDefault(_Draggable);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ActiveCallBadge(props) {
  return _react2.default.createElement(
    _Draggable2.default,
    {
      className: _styles2.default.root,
      onClick: props.onClick,
      positionOffsetX: props.offsetX,
      positionOffsetY: props.offsetY,
      updatePositionOffset: props.updatePositionOffset
    },
    _react2.default.createElement(
      _Badge2.default,
      {
        className: _styles2.default.phoneBage,
        name: props.title
      },
      _react2.default.createElement(
        'span',
        { className: _styles2.default.activeIcon },
        _react2.default.createElement('i', { className: _DynamicsFont2.default.callHover })
      ),
      props.title
    )
  );
}

ActiveCallBadge.propTypes = {
  onClick: _propTypes2.default.func.isRequired,
  offsetX: _propTypes2.default.number.isRequired,
  offsetY: _propTypes2.default.number.isRequired,
  updatePositionOffset: _propTypes2.default.func.isRequired,
  title: _propTypes2.default.string
};

ActiveCallBadge.defaultProps = {
  title: 'Active Call'
};
//# sourceMappingURL=index.js.map
