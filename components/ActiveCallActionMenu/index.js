"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _Button = _interopRequireDefault(require("../Button"));

var _LogButton = _interopRequireDefault(require("../LogButton"));

var _EntityButton = _interopRequireDefault(require("../EntityButton"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ActiveCallActionMenu =
/*#__PURE__*/
function (_Component) {
  _inherits(ActiveCallActionMenu, _Component);

  function ActiveCallActionMenu(props) {
    var _this;

    _classCallCheck(this, ActiveCallActionMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ActiveCallActionMenu).call(this, props));

    _this.captureClick = function (e) {
      // e.captureClick = this.props.captureClick;
      if (_this.props.stopPropagation) {
        e.stopPropagation();
      }
    };

    return _this;
  }

  _createClass(ActiveCallActionMenu, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          onClickToSms = _this$props.onClickToSms,
          disableLinks = _this$props.disableLinks,
          phoneNumber = _this$props.phoneNumber,
          textTitle = _this$props.textTitle,
          onLog = _this$props.onLog,
          isLogged = _this$props.isLogged,
          isLogging = _this$props.isLogging,
          currentLocale = _this$props.currentLocale,
          addLogTitle = _this$props.addLogTitle,
          editLogTitle = _this$props.editLogTitle,
          hasEntity = _this$props.hasEntity,
          onViewEntity = _this$props.onViewEntity,
          onCreateEntity = _this$props.onCreateEntity,
          createEntityTitle = _this$props.createEntityTitle,
          viewEntityTitle = _this$props.viewEntityTitle;
      var smsButton = onClickToSms ? _react.default.createElement(_Button.default, {
        className: (0, _classnames.default)(_styles.default.actionButton, _styles.default.sms),
        onClick: onClickToSms,
        disabled: disableLinks || !phoneNumber
      }, _react.default.createElement("span", {
        className: _DynamicsFont.default.composeText,
        title: textTitle
      })) : null;
      var logButton = onLog ? _react.default.createElement(_LogButton.default, {
        className: (0, _classnames.default)(_styles.default.actionButton, _styles.default.log),
        onLog: onLog,
        disableLinks: disableLinks,
        isLogged: isLogged,
        isLogging: isLogging,
        currentLocale: currentLocale,
        addTitle: addLogTitle,
        editTitle: editLogTitle
      }) : null;
      var entityButton;

      if (hasEntity && onViewEntity) {
        entityButton = _react.default.createElement(_EntityButton.default, {
          className: (0, _classnames.default)(_styles.default.actionButton, _styles.default.entity),
          onViewEntity: onViewEntity,
          hasEntity: hasEntity,
          disableLinks: disableLinks,
          viewEntityTitle: viewEntityTitle
        });
      } else if (!hasEntity && phoneNumber && onCreateEntity) {
        entityButton = _react.default.createElement(_Button.default, {
          className: (0, _classnames.default)(_styles.default.actionButton, _styles.default.addContact),
          onClick: onCreateEntity,
          disabled: disableLinks || !phoneNumber
        }, _react.default.createElement("span", {
          className: _DynamicsFont.default.add2,
          title: createEntityTitle
        }));
      } else {
        entityButton = null;
      }

      return _react.default.createElement("div", {
        className: (0, _classnames.default)(_styles.default.root, className),
        onClick: this.captureClick
      }, smsButton, entityButton, logButton);
    }
  }]);

  return ActiveCallActionMenu;
}(_react.Component);

exports.default = ActiveCallActionMenu;
ActiveCallActionMenu.propTypes = {
  className: _propTypes.default.string,
  onClickToSms: _propTypes.default.func,
  disableLinks: _propTypes.default.bool,
  phoneNumber: _propTypes.default.string,
  textTitle: _propTypes.default.string,
  currentLocale: _propTypes.default.string.isRequired,
  onLog: _propTypes.default.func,
  isLogged: _propTypes.default.bool,
  isLogging: _propTypes.default.bool,
  addLogTitle: _propTypes.default.string,
  editLogTitle: _propTypes.default.string,
  stopPropagation: _propTypes.default.bool,
  onCreateEntity: _propTypes.default.func,
  hasEntity: _propTypes.default.bool,
  onViewEntity: _propTypes.default.func,
  createEntityTitle: _propTypes.default.string,
  viewEntityTitle: _propTypes.default.string
};
ActiveCallActionMenu.defaultProps = {
  className: undefined,
  onClickToSms: undefined,
  disableLinks: false,
  phoneNumber: undefined,
  textTitle: undefined,
  onLog: undefined,
  isLogged: false,
  isLogging: false,
  addLogTitle: undefined,
  editLogTitle: undefined,
  stopPropagation: false,
  onCreateEntity: undefined,
  createEntityTitle: undefined,
  viewEntityTitle: undefined,
  onViewEntity: undefined,
  hasEntity: false
};
//# sourceMappingURL=index.js.map
