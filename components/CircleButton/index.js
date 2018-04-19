'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Circle Button with SVG
 */
function CircleButton(props) {
  var icon = void 0;
  if (props.icon) {
    var Icon = props.icon;
    icon = _react2.default.createElement(Icon, {
      className: (0, _classnames2.default)(_styles2.default.icon, props.iconClassName),
      width: props.iconWidth,
      height: props.iconHeight,
      x: props.iconX,
      y: props.iconY
    });
  }
  var circleClass = (0, _classnames2.default)(_styles2.default.circle, props.showBorder ? null : _styles2.default.noBorder);
  var onClick = props.disabled ? function () {} : props.onClick;
  return _react2.default.createElement(
    'svg',
    {
      className: (0, _classnames2.default)(_styles2.default.btnSvg, props.className),
      viewBox: '0 0 500 500',
      onClick: onClick,
      width: props.width,
      height: props.height,
      x: props.x,
      y: props.y
    },
    _react2.default.createElement(
      'g',
      {
        className: _styles2.default.btnSvgGroup
      },
      _react2.default.createElement('circle', {
        className: circleClass,
        cx: '250',
        cy: '250',
        r: '245'
      }),
      icon
    )
  );
}

CircleButton.propTypes = {
  icon: _propTypes2.default.func,
  className: _propTypes2.default.string,
  showBorder: _propTypes2.default.bool,
  iconClassName: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  width: _propTypes2.default.string,
  height: _propTypes2.default.string,
  x: _propTypes2.default.number,
  y: _propTypes2.default.number,
  disabled: _propTypes2.default.bool,
  iconWidth: _propTypes2.default.number,
  iconHeight: _propTypes2.default.number,
  iconX: _propTypes2.default.number,
  iconY: _propTypes2.default.number
};

CircleButton.defaultProps = {
  icon: undefined,
  className: undefined,
  showBorder: true,
  iconClassName: undefined,
  disabled: false,
  onClick: function onClick() {
    return null;
  },
  width: '100%',
  height: '100%',
  x: 0,
  y: 0,
  iconWidth: 200,
  iconHeight: 200,
  iconX: 150,
  iconY: 150
};

exports.default = CircleButton;
//# sourceMappingURL=index.js.map
