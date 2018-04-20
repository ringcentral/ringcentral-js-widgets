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

exports.CloseBtn = CloseBtn;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Modal = require('../Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _InsideModalClose = require('../../assets/images/InsideModalClose.svg');

var _InsideModalClose2 = _interopRequireDefault(_InsideModalClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CloseBtn(_ref) {
  var onClick = _ref.onClick;

  return _react2.default.createElement(
    'div',
    {
      className: _styles2.default.closeBtn,
      onClick: onClick },
    _react2.default.createElement(_InsideModalClose2.default, null)
  );
}

CloseBtn.propTypes = {
  onClick: _propTypes2.default.func
};

CloseBtn.defaultProps = {
  onClick: undefined
};

var InsideModal = function (_Component) {
  (0, _inherits3.default)(InsideModal, _Component);

  function InsideModal() {
    (0, _classCallCheck3.default)(this, InsideModal);
    return (0, _possibleConstructorReturn3.default)(this, (InsideModal.__proto__ || (0, _getPrototypeOf2.default)(InsideModal)).apply(this, arguments));
  }

  (0, _createClass3.default)(InsideModal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.forceUpdate();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          show = _props.show,
          onClose = _props.onClose,
          children = _props.children,
          title = _props.title;

      var closeBtn = _react2.default.createElement(CloseBtn, { onClick: onClose });
      return _react2.default.createElement(
        'div',
        { ref: function ref(_ref2) {
            _this2.appendDOM = _ref2;
          } },
        this.appendDOM ? _react2.default.createElement(
          _Modal2.default,
          {
            title: title,
            headerClassName: _styles2.default.title,
            className: _styles2.default.container,
            maskClassName: _styles2.default.mask,
            modalClassName: _styles2.default.modal,
            contentClassName: _styles2.default.content,
            closeBtn: closeBtn,
            show: show,
            appendDOM: this.appendDOM },
          children
        ) : null
      );
    }
  }]);
  return InsideModal;
}(_react.Component);

exports.default = InsideModal;


InsideModal.propTypes = {
  show: _propTypes2.default.bool,
  onClose: _propTypes2.default.func,
  children: _propTypes2.default.node,
  title: _propTypes2.default.string
};

InsideModal.defaultProps = {
  title: null,
  show: undefined,
  onClose: undefined,
  children: undefined
};
//# sourceMappingURL=index.js.map
