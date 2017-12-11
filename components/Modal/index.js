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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FlatButton(_ref) {
  var className = _ref.className,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      children = _ref.children;

  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(className, _styles2.default.flatBtn, _styles2.default.text, disabled && _styles2.default.disabled),
      onClick: !disabled && onClick },
    children
  );
}
FlatButton.propTypes = {
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  children: _propTypes2.default.node
};

FlatButton.defaultProps = {
  className: undefined,
  disabled: false,
  onClick: undefined,
  children: undefined
};

var Modal = function (_Component) {
  (0, _inherits3.default)(Modal, _Component);

  function Modal(props) {
    (0, _classCallCheck3.default)(this, Modal);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Modal.__proto__ || (0, _getPrototypeOf2.default)(Modal)).call(this, props));

    _this._container = document.createElement('div');
    return _this;
  }

  (0, _createClass3.default)(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.body.appendChild(this._container);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.removeChild(this._container);
    }
  }, {
    key: 'renderDialog',
    value: function renderDialog() {
      var _props = this.props,
          className = _props.className,
          children = _props.children,
          title = _props.title,
          show = _props.show,
          onConfirm = _props.onConfirm,
          onCancel = _props.onCancel,
          textConfirm = _props.textConfirm,
          textCancel = _props.textCancel,
          currentLocale = _props.currentLocale,
          clickOutToClose = _props.clickOutToClose,
          modalClassName = _props.modalClassName,
          cancelBtnClassName = _props.cancelBtnClassName,
          confirmBtnClassName = _props.confirmBtnClassName,
          closeBtn = _props.closeBtn;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(className, show ? _styles2.default.container : _styles2.default.containerHidden) },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(modalClassName, show ? _styles2.default.modal : _styles2.default.modalHidden) },
          title ? _react2.default.createElement(
            'div',
            { className: _styles2.default.header },
            title
          ) : null,
          closeBtn,
          _react2.default.createElement(
            'div',
            { className: _styles2.default.content },
            children
          ),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.footer },
            _react2.default.createElement(
              FlatButton,
              {
                className: (0, _classnames2.default)(cancelBtnClassName, _styles2.default.btn),
                onClick: onCancel },
              textCancel || _i18n2.default.getString('cancel', currentLocale)
            ),
            _react2.default.createElement(
              FlatButton,
              {
                className: (0, _classnames2.default)(confirmBtnClassName, _styles2.default.btn),
                onClick: onConfirm },
              textConfirm || _i18n2.default.getString('confirm', currentLocale)
            )
          )
        ),
        _react2.default.createElement('div', {
          className: show ? _styles2.default.mask : _styles2.default.maskHidden,
          onClick: clickOutToClose ? onCancel : function () {}
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _reactDom2.default.createPortal(this.renderDialog(), this._container);
    }
  }]);
  return Modal;
}(_react.Component);

exports.default = Modal;


Modal.propTypes = {
  className: _propTypes2.default.string,
  modalClassName: _propTypes2.default.string,
  cancelBtnClassName: _propTypes2.default.string,
  confirmBtnClassName: _propTypes2.default.string,
  children: _propTypes2.default.node,
  show: _propTypes2.default.bool,
  onConfirm: _propTypes2.default.func.isRequired,
  onCancel: _propTypes2.default.func.isRequired,
  clickOutToClose: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  currentLocale: _propTypes2.default.string.isRequired,
  textConfirm: _propTypes2.default.string,
  textCancel: _propTypes2.default.string,
  closeBtn: _propTypes2.default.node
};
Modal.defaultProps = {
  className: '',
  modalClassName: '',
  cancelBtnClassName: '',
  confirmBtnClassName: '',
  children: undefined,
  show: false,
  clickOutToClose: false,
  title: undefined,
  textConfirm: '',
  textCancel: '',
  closeBtn: undefined
};
//# sourceMappingURL=index.js.map
