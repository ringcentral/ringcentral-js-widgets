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

var _SlideMenu = require('../SlideMenu');

var _SlideMenu2 = _interopRequireDefault(_SlideMenu);

var _EntityButton = require('../EntityButton');

var _EntityButton2 = _interopRequireDefault(_EntityButton);

var _EntityModal = require('../EntityModal');

var _EntityModal2 = _interopRequireDefault(_EntityModal);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _LogButton = require('../LogButton');

var _LogButton2 = _interopRequireDefault(_LogButton);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ClickToDialButton(_ref) {
  var className = _ref.className,
      onClickToDial = _ref.onClickToDial,
      disableLinks = _ref.disableLinks,
      disableClickToDial = _ref.disableClickToDial,
      phoneNumber = _ref.phoneNumber,
      title = _ref.title;

  return _react2.default.createElement(
    _Button2.default,
    {
      className: (0, _classnames2.default)(_styles2.default.call, className),
      onClick: onClickToDial,
      disabled: disableLinks || disableClickToDial || !phoneNumber },
    _react2.default.createElement('span', {
      className: _DynamicsFont2.default.call,
      title: title })
  );
}
ClickToDialButton.propTypes = {
  className: _propTypes2.default.string,
  onClickToDial: _propTypes2.default.func,
  disableLinks: _propTypes2.default.bool,
  disableClickToDial: _propTypes2.default.bool,
  phoneNumber: _propTypes2.default.string,
  title: _propTypes2.default.string
};
ClickToDialButton.defaultProps = {
  className: undefined,
  onClickToDial: undefined,
  disableLinks: false,
  disableClickToDial: false,
  phoneNumber: undefined,
  title: undefined
};

function ClickToSmsButton(_ref2) {
  var className = _ref2.className,
      onClickToSms = _ref2.onClickToSms,
      disableLinks = _ref2.disableLinks,
      phoneNumber = _ref2.phoneNumber,
      title = _ref2.title;

  return _react2.default.createElement(
    _Button2.default,
    {
      className: (0, _classnames2.default)(_styles2.default.sms, className),
      onClick: onClickToSms,
      disabled: disableLinks || !phoneNumber },
    _react2.default.createElement('span', {
      className: _DynamicsFont2.default.composeText,
      title: title })
  );
}
ClickToSmsButton.propTypes = {
  className: _propTypes2.default.string,
  onClickToSms: _propTypes2.default.func,
  disableLinks: _propTypes2.default.bool,
  phoneNumber: _propTypes2.default.string
};
ClickToSmsButton.defaultProps = {
  className: undefined,
  onClickToSms: undefined,
  disableLinks: false,
  phoneNumber: undefined
};

var ActionMenu = function (_Component) {
  (0, _inherits3.default)(ActionMenu, _Component);

  function ActionMenu(props) {
    (0, _classCallCheck3.default)(this, ActionMenu);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ActionMenu.__proto__ || (0, _getPrototypeOf2.default)(ActionMenu)).call(this, props));

    _this.onCreateEnityModal = function (entityType) {
      _this.props.onCreateEntity(entityType);
      _this.closeEntityModal();
    };

    _this.onCancelEntityModal = function () {
      _this.closeEntityModal();
    };

    _this.openEntityModal = function () {
      _this.setState({
        entityModalVisible: true
      });
    };

    _this.closeEntityModal = function () {
      _this.setState({
        entityModalVisible: false
      });
    };

    _this.captureClick = function (e) {
      // e.captureClick = this.props.captureClick;
      if (_this.props.stopPropagation) {
        e.stopPropagation();
      }
    };

    _this.state = {
      entityModalVisible: false
    };
    return _this;
  }

  (0, _createClass3.default)(ActionMenu, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          reference = _props.reference,
          className = _props.className,
          currentLocale = _props.currentLocale,
          onLog = _props.onLog,
          isLogged = _props.isLogged,
          isLogging = _props.isLogging,
          isCreating = _props.isCreating,
          onViewEntity = _props.onViewEntity,
          onCreateEntity = _props.onCreateEntity,
          hasEntity = _props.hasEntity,
          onClickToDial = _props.onClickToDial,
          onClickToSms = _props.onClickToSms,
          phoneNumber = _props.phoneNumber,
          disableLinks = _props.disableLinks,
          disableClickToDial = _props.disableClickToDial,
          addLogTitle = _props.addLogTitle,
          editLogTitle = _props.editLogTitle,
          callTitle = _props.callTitle,
          textTitle = _props.textTitle,
          createEntityTitle = _props.createEntityTitle,
          viewEntityTitle = _props.viewEntityTitle;


      var logButton = onLog ? _react2.default.createElement(_LogButton2.default, {
        className: _styles2.default.baseGroup,
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
          className: (0, _classnames2.default)(_styles2.default.entity, _styles2.default.baseGroup),
          onViewEntity: onViewEntity,
          hasEntity: hasEntity,
          disableLinks: disableLinks,
          viewEntityTitle: viewEntityTitle
        });
      } else if (!hasEntity && phoneNumber && onCreateEntity) {
        entityButton = _react2.default.createElement(_EntityButton2.default, {
          className: (0, _classnames2.default)(_styles2.default.entity, _styles2.default.baseGroup),
          onCreateEntity: this.openEntityModal,
          hasEntity: hasEntity,
          disableLinks: disableLinks,
          createEntityTitle: createEntityTitle
        });
      } else {
        entityButton = null;
      }

      var entityModal = !hasEntity && phoneNumber ? _react2.default.createElement(_EntityModal2.default, {
        currentLocale: currentLocale,
        show: this.state.entityModalVisible,
        onCreate: this.onCreateEnityModal,
        onCancel: this.onCancelEntityModal
      }) : null;

      var hasBaseGroup = !!(logButton || entityButton);

      var clickToDialButton = onClickToDial ? _react2.default.createElement(ClickToDialButton, {
        className: hasBaseGroup ? _styles2.default.secondGroup : _styles2.default.baseGroup,
        onClickToDial: onClickToDial,
        phoneNumber: phoneNumber,
        disableLinks: disableLinks,
        disableClickToDial: disableClickToDial,
        currentLocale: currentLocale,
        title: callTitle
      }) : null;
      var clickToSmsButton = onClickToSms ? _react2.default.createElement(ClickToSmsButton, {
        className: hasBaseGroup ? _styles2.default.secondGroup : _styles2.default.baseGroup,
        onClickToSms: onClickToSms,
        phoneNumber: phoneNumber,
        disableLinks: disableLinks,
        currentLocale: currentLocale,
        title: textTitle
      }) : null;
      var hasSecondGroup = hasBaseGroup && !!(clickToDialButton || clickToSmsButton);
      if (hasSecondGroup) {
        // slide menu
        return _react2.default.createElement(
          'div',
          {
            ref: reference,
            onClick: this.captureClick },
          _react2.default.createElement(
            _SlideMenu2.default,
            {
              className: (0, _classnames2.default)(_styles2.default.root, className),
              minWidth: 40,
              maxWidth: 75 },
            clickToDialButton,
            clickToSmsButton,
            entityButton,
            logButton,
            entityModal
          )
        );
      } else if (!clickToDialButton && !clickToSmsButton && !entityButton && !logButton) {
        return null;
      }
      // no slide menu
      return _react2.default.createElement(
        'div',
        {
          ref: reference,
          onClick: this.captureClick },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(_styles2.default.root, className) },
          clickToDialButton,
          clickToSmsButton,
          entityButton,
          logButton,
          entityModal
        )
      );
    }
  }]);
  return ActionMenu;
}(_react.Component);

exports.default = ActionMenu;


ActionMenu.propTypes = {
  reference: _propTypes2.default.func,
  className: _propTypes2.default.string,
  currentLocale: _propTypes2.default.string.isRequired,
  onLog: _propTypes2.default.func,
  isLogged: _propTypes2.default.bool,
  isLogging: _propTypes2.default.bool,
  isCreating: _propTypes2.default.bool,
  onViewEntity: _propTypes2.default.func,
  onCreateEntity: _propTypes2.default.func,
  hasEntity: _propTypes2.default.bool,
  onClickToDial: _propTypes2.default.func,
  onClickToSms: _propTypes2.default.func,
  phoneNumber: _propTypes2.default.string,
  disableLinks: _propTypes2.default.bool,
  disableClickToDial: _propTypes2.default.bool,
  stopPropagation: _propTypes2.default.bool,
  addLogTitle: _propTypes2.default.string,
  editLogTitle: _propTypes2.default.string,
  textTitle: _propTypes2.default.string,
  callTitle: _propTypes2.default.string,
  createEntityTitle: _propTypes2.default.string,
  viewEntityTitle: _propTypes2.default.string
};
ActionMenu.defaultProps = {
  reference: undefined,
  className: undefined,
  onLog: undefined,
  isLogged: false,
  isLogging: false,
  isCreating: false,
  onViewEntity: undefined,
  onCreateEntity: undefined,
  hasEntity: false,
  onClickToDial: undefined,
  onClickToSms: undefined,
  phoneNumber: undefined,
  disableLinks: false,
  disableClickToDial: false,
  stopPropagation: false,
  addLogTitle: undefined,
  editLogTitle: undefined,
  textTitle: undefined,
  callTitle: undefined,
  createEntityTitle: undefined,
  viewEntityTitle: undefined
};
//# sourceMappingURL=index.js.map
