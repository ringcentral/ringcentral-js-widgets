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
    _this.appendDOM = _this.props.appendDOM || document.body;
    return _this;
  }

  (0, _createClass3.default)(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.appendDOM.appendChild(this._container);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.appendDOM.removeChild(this._container);
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
          closeBtn = _props.closeBtn,
          maskClassName = _props.maskClassName,
          headerClassName = _props.headerClassName,
          contentClassName = _props.contentClassName;

      if (!show) return null;
      var footer = !currentLocale || !onCancel && !onConfirm ? null : _react2.default.createElement(
        'div',
        { className: _styles2.default.footer },
        onCancel ? _react2.default.createElement(
          FlatButton,
          {
            className: (0, _classnames2.default)(_styles2.default.btn, cancelBtnClassName),
            onClick: onCancel },
          textCancel || _i18n2.default.getString('cancel', currentLocale)
        ) : null,
        onConfirm ? _react2.default.createElement(
          FlatButton,
          {
            className: (0, _classnames2.default)(_styles2.default.btn, confirmBtnClassName),
            onClick: onConfirm },
          textConfirm || _i18n2.default.getString('confirm', currentLocale)
        ) : null
      );
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.container, className) },
        _react2.default.createElement('div', {
          className: (0, _classnames2.default)(_styles2.default.mask, maskClassName),
          onClick: clickOutToClose ? onCancel : function () {}
        }),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(_styles2.default.modal, modalClassName) },
          title ? _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)(_styles2.default.header, headerClassName) },
            title
          ) : null,
          closeBtn,
          _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)(_styles2.default.content, contentClassName) },
            children
          ),
          footer
        )
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
  onConfirm: _propTypes2.default.func,
  onCancel: _propTypes2.default.func,
  clickOutToClose: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  currentLocale: _propTypes2.default.string,
  textConfirm: _propTypes2.default.string,
  textCancel: _propTypes2.default.string,
  closeBtn: _propTypes2.default.node,
  appendDOM: _propTypes2.default.object,
  maskClassName: _propTypes2.default.string,
  headerClassName: _propTypes2.default.string,
  contentClassName: _propTypes2.default.string
};
Modal.defaultProps = {
  className: '',
  currentLocale: '',
  modalClassName: '',
  cancelBtnClassName: '',
  confirmBtnClassName: '',
  children: undefined,
  show: false,
  onConfirm: undefined,
  onCancel: undefined,
  clickOutToClose: false,
  title: undefined,
  textConfirm: '',
  textCancel: '',
  closeBtn: undefined,
  appendDOM: undefined,
  maskClassName: undefined,
  headerClassName: undefined,
  contentClassName: undefined
};
//# sourceMappingURL=index.js.map
