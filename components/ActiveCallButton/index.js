'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ActiveCallButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CircleButton = require('../CircleButton');

var _CircleButton2 = _interopRequireDefault(_CircleButton);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ActiveCallButton(props) {
  var className = (0, _classnames2.default)(_styles2.default.btnSvg, props.className);
  var buttonClassName = (0, _classnames2.default)(_styles2.default.button, props.buttonClassName, props.active ? _styles2.default.buttonActive : null, props.disabled ? _styles2.default.buttonDisabled : null);
  var text = props.title.split('\n').map(function (line, index) {
    return _react2.default.createElement(
      'tspan',
      { dy: index ? '1.1em' : 0, x: '250', key: line },
      line
    );
  });
  return _react2.default.createElement(
    'svg',
    {
      className: className,
      viewBox: '0 0 500 600',
      width: props.width,
      height: props.height,
      x: props.x,
      y: props.y
    },
    _react2.default.createElement(_CircleButton2.default, {
      width: '380',
      height: '380',
      x: 60,
      y: 0,
      className: buttonClassName,
      onClick: props.disabled ? function () {} : props.onClick,
      icon: props.icon,
      disabled: props.disabled,
      showBorder: props.showBorder,
      iconClassName: props.buttonClassName,
      iconWidth: props.iconWidth,
      iconHeight: props.iconHeight,
      iconX: props.iconX,
      iconY: props.iconY
    }),
    _react2.default.createElement(
      'text',
      {
        className: _styles2.default.buttonTitle,
        x: '250',
        y: '500',
        textAnchor: 'middle'
      },
      text
    )
  );
}

ActiveCallButton.propTypes = {
  className: _propTypes2.default.string,
  buttonClassName: _propTypes2.default.string,
  onClick: _propTypes2.default.func.isRequired,
  disabled: _propTypes2.default.bool,
  active: _propTypes2.default.bool,
  title: _propTypes2.default.string.isRequired,
  icon: _propTypes2.default.func,
  showBorder: _propTypes2.default.bool,
  width: _propTypes2.default.string,
  height: _propTypes2.default.string,
  x: _propTypes2.default.number,
  y: _propTypes2.default.number,
  iconWidth: _propTypes2.default.number,
  iconHeight: _propTypes2.default.number,
  iconX: _propTypes2.default.number,
  iconY: _propTypes2.default.number
};

ActiveCallButton.defaultProps = {
  className: undefined,
  buttonClassName: undefined,
  disabled: false,
  active: false,
  icon: undefined,
  showBorder: true,
  width: '100%',
  height: '100%',
  x: 0,
  y: 0,
  iconWidth: undefined,
  iconHeight: undefined,
  iconX: undefined,
  iconY: undefined
};
//# sourceMappingURL=index.js.map
