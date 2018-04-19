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

function CheckBox(_ref) {
  var data = _ref.data,
      selected = _ref.selected,
      onSelect = _ref.onSelect,
      valueField = _ref.valueField,
      textField = _ref.textField,
      className = _ref.className;

  var isListObject = !!(textField && valueField);
  return _react2.default.createElement(
    'div',
    { className: className },
    data.map(function (item, key) {
      var isSelected = selected === (isListObject ? item[valueField] : item);
      var checkStyle = isSelected ? _styles2.default.selectedCheckButton : null;
      var onClick = function onClick() {
        return onSelect(item);
      };
      return _react2.default.createElement(
        'div',
        { onClick: onClick, className: _styles2.default.item, key: key },
        _react2.default.createElement('div', { className: (0, _classnames2.default)(_styles2.default.checkButton, checkStyle) }),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.text },
          isListObject ? item[textField] : item
        )
      );
    })
  );
}

CheckBox.propTypes = {
  valueField: _propTypes2.default.string,
  textField: _propTypes2.default.string,
  selected: _propTypes2.default.any.isRequired,
  data: _propTypes2.default.array.isRequired,
  onSelect: _propTypes2.default.func.isRequired,
  className: _propTypes2.default.string
};

CheckBox.defaultProps = {
  textField: null,
  valueField: null,
  className: null
};

exports.default = CheckBox;
//# sourceMappingURL=index.js.map
