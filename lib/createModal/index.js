"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createModal;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// TODO: consider refactoring onClose + clickOutToClose to onOverlayClick
function createModal(Comp) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inherits(KModal, _Component);

    function KModal(props) {
      var _this;

      _classCallCheck(this, KModal);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(KModal).call(this, props));
      _this._container = document.createElement('div');
      return _this;
    }

    _createClass(KModal, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var root = this.props.appendDOM || this.context.modalRoot && this.context.modalRoot.current || document.body;
        root.appendChild(this._container);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this._container.parentNode) {
          this._container.parentNode.removeChild(this._container);
        }
      }
    }, {
      key: "renderDialog",
      value: function renderDialog() {
        var _this$props = this.props,
            className = _this$props.className,
            maskClassName = _this$props.maskClassName,
            modalClassName = _this$props.modalClassName,
            show = _this$props.show,
            onClose = _this$props.onClose,
            clickOutToClose = _this$props.clickOutToClose,
            props = _objectWithoutProperties(_this$props, ["className", "maskClassName", "modalClassName", "show", "onClose", "clickOutToClose"]);

        var onClick = clickOutToClose ? onClose : function () {};
        return _react.default.createElement("div", {
          className: show ? (0, _classnames.default)(_styles.default.container, className) : _styles.default.containerHidden
        }, _react.default.createElement("div", {
          className: show ? (0, _classnames.default)(_styles.default.mask, maskClassName) : _styles.default.maskHidden,
          onClick: onClick
        }), _react.default.createElement("div", {
          className: show ? (0, _classnames.default)(_styles.default.modal, modalClassName) : _styles.default.modalHidden
        }, _react.default.createElement(Comp, props)));
      }
    }, {
      key: "render",
      value: function render() {
        return _reactDom.default.createPortal(this.renderDialog(), this._container);
      }
    }]);

    return KModal;
  }(_react.Component), _class.propTypes = {
    className: _propTypes.default.string,
    modalClassName: _propTypes.default.string,
    show: _propTypes.default.bool,
    onClose: _propTypes.default.func,
    clickOutToClose: _propTypes.default.bool,
    appendDOM: _propTypes.default.object,
    maskClassName: _propTypes.default.string
  }, _class.defaultProps = {
    className: '',
    modalClassName: '',
    show: false,
    onClose: undefined,
    clickOutToClose: false,
    appendDOM: undefined,
    maskClassName: undefined
  }, _class.contextTypes = {
    modalRoot: _propTypes.default.object
  }, _temp;
}
//# sourceMappingURL=index.js.map
