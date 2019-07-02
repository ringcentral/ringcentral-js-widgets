"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = DialPad;

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _DialButton = _interopRequireDefault(require("../DialButton"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var keyConfig = [[{
  value: '1',
  text: ''
}, {
  value: '2',
  text: 'ABC',
  dx: '175'
}, {
  value: '3',
  text: 'DEF',
  dx: '180'
}], [{
  value: '4',
  text: 'GHI',
  dx: '175'
}, {
  value: '5',
  text: 'JKL',
  dx: '180'
}, {
  value: '6',
  text: 'MNO',
  dx: '155'
}], [{
  value: '7',
  text: 'PQRS',
  dx: '140'
}, {
  value: '8',
  text: 'TUV',
  dx: '175'
}, {
  value: '9',
  text: 'WXYZ',
  dx: '140'
}], [{
  value: '*',
  text: ''
}, {
  value: '0',
  text: '+',
  alternativeValue: '+',
  dx: '220'
}, {
  value: '#',
  text: ''
}]];

function DialPad(_ref) {
  var className = _ref.className,
      hideSpecial = _ref.hideSpecial,
      onButtonPress = _ref.onButtonPress,
      onButtonOutput = _ref.onButtonOutput,
      alternativeTimeout = _ref.alternativeTimeout,
      dialButtonVolume = _ref.dialButtonVolume,
      dialButtonMuted = _ref.dialButtonMuted,
      dataSign = _ref.dataSign;
  dataSign = typeof dataSign !== 'undefined' ? dataSign : '';
  return _react["default"].createElement("div", {
    "data-sign": "".concat(dataSign, "DialPad"),
    className: (0, _classnames["default"])(_styles["default"].root, className)
  }, keyConfig.map(function (row, rowIdx) {
    return _react["default"].createElement("div", {
      key: rowIdx,
      className: _styles["default"].row
    }, row.map(function (btn) {
      if (hideSpecial && (btn.value === '*' || btn.value === '#')) {
        return _react["default"].createElement("div", {
          key: btn.value,
          className: _styles["default"].btnPlaceholder
        });
      }

      return _react["default"].createElement(_DialButton["default"], {
        key: btn.value,
        btn: btn,
        className: _styles["default"].btnPlaceholder,
        onPress: onButtonPress,
        onOutput: onButtonOutput,
        alternativeTimeout: alternativeTimeout,
        volume: dialButtonVolume,
        muted: dialButtonMuted
      });
    }));
  }));
}

DialPad.propTypes = {
  className: _propTypes["default"].string,
  hideSpecial: _propTypes["default"].bool,
  onButtonPress: _propTypes["default"].func,
  onButtonOutput: _propTypes["default"].func,
  alternativeTimeout: _propTypes["default"].number,
  dialButtonVolume: _propTypes["default"].number,
  dialButtonMuted: _propTypes["default"].bool,
  dataSign: _propTypes["default"].string
};
DialPad.defaultProps = {
  className: undefined,
  hideSpecial: false,
  onButtonPress: undefined,
  onButtonOutput: undefined,
  alternativeTimeout: undefined,
  dialButtonVolume: 1,
  dialButtonMuted: false
};
//# sourceMappingURL=index.js.map
