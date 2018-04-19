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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _BackHeader = require('../BackHeader');

var _BackHeader2 = _interopRequireDefault(_BackHeader);

var _RadioBtnGroup = require('../RadioBtnGroup');

var _RadioBtnGroup2 = _interopRequireDefault(_RadioBtnGroup);

var _CircleButton = require('../CircleButton');

var _CircleButton2 = _interopRequireDefault(_CircleButton);

var _Flip = require('../../assets/images/Flip.svg');

var _Flip2 = _interopRequireDefault(_Flip);

var _End = require('../../assets/images/End.svg');

var _End2 = _interopRequireDefault(_End);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FlipPanel = function (_Component) {
  (0, _inherits3.default)(FlipPanel, _Component);

  function FlipPanel(props) {
    (0, _classCallCheck3.default)(this, FlipPanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FlipPanel.__proto__ || (0, _getPrototypeOf2.default)(FlipPanel)).call(this, props));

    _this.state = {
      flipValue: _this.props.flipNumbers.length === 0 ? '' : _this.props.flipNumbers[0].phoneNumber,
      flipEnabled: !_this.props.isOnFlip
    };
    _this.onRadioSelect = function (value) {
      _this.setState({
        flipValue: value
      });
    };
    _this.onFlip = function () {
      _this.props.onFlip(_this.state.flipValue);
      _this.setState({
        flipEnabled: false
      });
    };
    return _this;
  }

  (0, _createClass3.default)(FlipPanel, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.root },
        _react2.default.createElement(
          _BackHeader2.default,
          {
            onBackClick: this.props.isOnFlip ? function () {} : this.props.hideFlipPanel,
            backButton: _react2.default.createElement(
              'span',
              { className: _styles2.default.backButton },
              this.props.isOnFlip ? null : _react2.default.createElement('i', { className: (0, _classnames2.default)(_DynamicsFont2.default.arrow, _styles2.default.backIcon) })
            )
          },
          _react2.default.createElement(
            'span',
            { className: _styles2.default.headerTitle },
            _i18n2.default.getString('flipHeader', this.props.currentLocale)
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.flipContainer },
          _react2.default.createElement(_RadioBtnGroup2.default, {
            className: _styles2.default.radioGroup,
            radioOptions: this.props.flipNumbers,
            disabled: !this.state.flipEnabled,
            formatPhone: this.props.formatPhone,
            onRadioSelect: this.onRadioSelect,
            currentLocale: this.props.currentLocale
          }),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.buttonGroup },
            _react2.default.createElement(
              'div',
              { className: _styles2.default.button, title: _i18n2.default.getString('flip', this.props.currentLocale) },
              _react2.default.createElement(_CircleButton2.default, {
                disabled: !this.state.flipEnabled,
                className: (0, _classnames2.default)(_styles2.default.flipButton, this.state.flipEnabled ? '' : _styles2.default.disabled),
                iconClassName: _styles2.default.flipIcon,
                onClick: this.onFlip,
                icon: _Flip2.default,
                showBorder: true
              })
            ),
            _react2.default.createElement(
              'div',
              { className: _styles2.default.button, title: _i18n2.default.getString('complete', this.props.currentLocale) },
              _react2.default.createElement(_CircleButton2.default, {
                disabled: !this.props.isOnFlip,
                className: (0, _classnames2.default)(_styles2.default.completeButton, this.props.isOnFlip ? '' : _styles2.default.disabled),
                onClick: this.props.complete,
                icon: _End2.default,
                showBorder: true
              })
            )
          )
        )
      );
    }
  }]);
  return FlipPanel;
}(_react.Component);

exports.default = FlipPanel;


FlipPanel.propTypes = {
  isOnFlip: _propTypes2.default.bool.isRequired,
  flipNumbers: _propTypes2.default.array.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  formatPhone: _propTypes2.default.func.isRequired,
  hideFlipPanel: _propTypes2.default.func.isRequired,
  onFlip: _propTypes2.default.func.isRequired,
  complete: _propTypes2.default.func.isRequired
};
//# sourceMappingURL=index.js.map
