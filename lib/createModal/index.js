'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

exports.default = createModal;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: consider refactoring onClose + clickOutToClose to onOverlayClick
function createModal(Comp) {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    (0, _inherits3.default)(KModal, _Component);

    function KModal(props) {
      (0, _classCallCheck3.default)(this, KModal);

      var _this = (0, _possibleConstructorReturn3.default)(this, (KModal.__proto__ || (0, _getPrototypeOf2.default)(KModal)).call(this, props));

      _this._container = document.createElement('div');
      return _this;
    }

    (0, _createClass3.default)(KModal, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var root = this.props.appendDOM || this.context.modalRoot && this.context.modalRoot.current || document.body;
        root.appendChild(this._container);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this._container.parentNode) {
          this._container.parentNode.removeChild(this._container);
        }
      }
    }, {
      key: 'renderDialog',
      value: function renderDialog() {
        var _props = this.props,
            className = _props.className,
            maskClassName = _props.maskClassName,
            modalClassName = _props.modalClassName,
            show = _props.show,
            onClose = _props.onClose,
            clickOutToClose = _props.clickOutToClose,
            props = (0, _objectWithoutProperties3.default)(_props, ['className', 'maskClassName', 'modalClassName', 'show', 'onClose', 'clickOutToClose']);

        var onClick = clickOutToClose ? onClose : function () {};
        return _react2.default.createElement(
          'div',
          { className: show ? (0, _classnames2.default)(_styles2.default.container, className) : _styles2.default.containerHidden },
          _react2.default.createElement('div', {
            className: show ? (0, _classnames2.default)(_styles2.default.mask, maskClassName) : _styles2.default.maskHidden,
            onClick: onClick
          }),
          _react2.default.createElement(
            'div',
            { className: show ? (0, _classnames2.default)(_styles2.default.modal, modalClassName) : _styles2.default.modalHidden },
            _react2.default.createElement(Comp, props)
          )
        );
      }
    }, {
      key: 'render',
      value: function render() {
        return _reactDom2.default.createPortal(this.renderDialog(), this._container);
      }
    }]);
    return KModal;
  }(_react.Component), _class.propTypes = {
    className: _propTypes2.default.string,
    modalClassName: _propTypes2.default.string,
    show: _propTypes2.default.bool,
    onClose: _propTypes2.default.func,
    clickOutToClose: _propTypes2.default.bool,
    appendDOM: _propTypes2.default.object,
    maskClassName: _propTypes2.default.string
  }, _class.defaultProps = {
    className: '',
    modalClassName: '',
    show: false,
    onClose: undefined,
    clickOutToClose: false,
    appendDOM: undefined,
    maskClassName: undefined
  }, _class.contextTypes = {
    modalRoot: _propTypes2.default.object
  }, _temp;
}
//# sourceMappingURL=index.js.map
