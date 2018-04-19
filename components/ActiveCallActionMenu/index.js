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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _LogButton = require('../LogButton');

var _LogButton2 = _interopRequireDefault(_LogButton);

var _EntityButton = require('../EntityButton');

var _EntityButton2 = _interopRequireDefault(_EntityButton);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActiveCallActionMenu = function (_Component) {
  (0, _inherits3.default)(ActiveCallActionMenu, _Component);

  function ActiveCallActionMenu(props) {
    (0, _classCallCheck3.default)(this, ActiveCallActionMenu);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ActiveCallActionMenu.__proto__ || (0, _getPrototypeOf2.default)(ActiveCallActionMenu)).call(this, props));

    _this.captureClick = function (e) {
      // e.captureClick = this.props.captureClick;
      if (_this.props.stopPropagation) {
        e.stopPropagation();
      }
    };
    return _this;
  }

  (0, _createClass3.default)(ActiveCallActionMenu, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          onClickToSms = _props.onClickToSms,
          disableLinks = _props.disableLinks,
          phoneNumber = _props.phoneNumber,
          textTitle = _props.textTitle,
          onLog = _props.onLog,
          isLogged = _props.isLogged,
          isLogging = _props.isLogging,
          currentLocale = _props.currentLocale,
          addLogTitle = _props.addLogTitle,
          editLogTitle = _props.editLogTitle,
          hasEntity = _props.hasEntity,
          onViewEntity = _props.onViewEntity,
          onCreateEntity = _props.onCreateEntity,
          createEntityTitle = _props.createEntityTitle,
          viewEntityTitle = _props.viewEntityTitle;


      var smsButton = onClickToSms ? _react2.default.createElement(
        _Button2.default,
        {
          className: (0, _classnames2.default)(_styles2.default.actionButton, _styles2.default.sms),
          onClick: onClickToSms,
          disabled: disableLinks || !phoneNumber },
        _react2.default.createElement('span', {
          className: _DynamicsFont2.default.composeText,
          title: textTitle
        })
      ) : null;
      var logButton = onLog ? _react2.default.createElement(_LogButton2.default, {
        className: (0, _classnames2.default)(_styles2.default.actionButton, _styles2.default.log),
        onLog: onLog,
        disableLinks: disableLinks,
        isLogged: isLogged,
        isLogging: isLogging,
        currentLocale: currentLocale,
        addTitle: addLogTitle,
        editTitle: editLogTitle
      }) : null;
      var entityButton = void 0;
      if (hasEntity && onViewEntity) {
        entityButton = _react2.default.createElement(_EntityButton2.default, {
          className: (0, _classnames2.default)(_styles2.default.actionButton, _styles2.default.entity),
          onViewEntity: onViewEntity,
          hasEntity: hasEntity,
          disableLinks: disableLinks,
          viewEntityTitle: viewEntityTitle
        });
      } else if (!hasEntity && phoneNumber && onCreateEntity) {
        entityButton = _react2.default.createElement(
          _Button2.default,
          {
            className: (0, _classnames2.default)(_styles2.default.actionButton, _styles2.default.addContact),
            onClick: onCreateEntity,
            disabled: disableLinks || !phoneNumber },
          _react2.default.createElement('span', {
            className: _DynamicsFont2.default.add2,
            title: createEntityTitle
          })
        );
      } else {
        entityButton = null;
      }
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(_styles2.default.root, className),
          onClick: this.captureClick
        },
        smsButton,
        entityButton,
        logButton
      );
    }
  }]);
  return ActiveCallActionMenu;
}(_react.Component);

exports.default = ActiveCallActionMenu;


ActiveCallActionMenu.propTypes = {
  className: _propTypes2.default.string,
  onClickToSms: _propTypes2.default.func,
  disableLinks: _propTypes2.default.bool,
  phoneNumber: _propTypes2.default.string,
  textTitle: _propTypes2.default.string,
  currentLocale: _propTypes2.default.string.isRequired,
  onLog: _propTypes2.default.func,
  isLogged: _propTypes2.default.bool,
  isLogging: _propTypes2.default.bool,
  addLogTitle: _propTypes2.default.string,
  editLogTitle: _propTypes2.default.string,
  stopPropagation: _propTypes2.default.bool,
  onCreateEntity: _propTypes2.default.func,
  hasEntity: _propTypes2.default.bool,
  onViewEntity: _propTypes2.default.func,
  createEntityTitle: _propTypes2.default.string,
  viewEntityTitle: _propTypes2.default.string
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
