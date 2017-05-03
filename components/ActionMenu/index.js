'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _Spinner = require('../Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _SlideMenu = require('../SlideMenu');

var _SlideMenu2 = _interopRequireDefault(_SlideMenu);

var _EntityModal = require('../EntityModal');

var _EntityModal2 = _interopRequireDefault(_EntityModal);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ClickToDialButton(_ref) {
  var className = _ref.className,
      currentLocale = _ref.currentLocale,
      onClickToDial = _ref.onClickToDial,
      disableLinks = _ref.disableLinks,
      disableClickToDial = _ref.disableClickToDial,
      phoneNumber = _ref.phoneNumber;

  return _react2.default.createElement(
    _Button2.default,
    {
      className: (0, _classnames2.default)(_styles2.default.call, className),
      onClick: onClickToDial,
      disabled: disableLinks || disableClickToDial || !phoneNumber },
    _react2.default.createElement('span', { className: _DynamicsFont2.default.call })
  );
}
ClickToDialButton.propTypes = {
  className: _react.PropTypes.string,
  onClickToDial: _react.PropTypes.func,
  disableLinks: _react.PropTypes.bool,
  disableClickToDial: _react.PropTypes.bool,
  phoneNumber: _react.PropTypes.string,
  currentLocale: _react.PropTypes.string.isRequired
};
ClickToDialButton.defaultProps = {
  className: undefined,
  onClickToDial: undefined,
  disableLinks: false,
  disableClickToDial: false,
  phoneNumber: undefined
};

function ClickToSmsButton(_ref2) {
  var className = _ref2.className,
      currentLocale = _ref2.currentLocale,
      onClickToSms = _ref2.onClickToSms,
      disableLinks = _ref2.disableLinks,
      phoneNumber = _ref2.phoneNumber;

  return _react2.default.createElement(
    _Button2.default,
    {
      className: (0, _classnames2.default)(_styles2.default.sms, className),
      onClick: onClickToSms,
      disabled: disableLinks || !phoneNumber },
    _react2.default.createElement('span', { className: _DynamicsFont2.default.composeText })
  );
}
ClickToSmsButton.propTypes = {
  className: _react.PropTypes.string,
  onClickToSms: _react.PropTypes.func,
  disableLinks: _react.PropTypes.bool,
  phoneNumber: _react.PropTypes.string,
  currentLocale: _react.PropTypes.string.isRequired
};
ClickToSmsButton.defaultProps = {
  className: undefined,
  onClickToSms: undefined,
  disableLinks: false,
  phoneNumber: undefined
};

function LogButton(_ref3) {
  var className = _ref3.className,
      currentLocale = _ref3.currentLocale,
      onLogCall = _ref3.onLogCall,
      isLogged = _ref3.isLogged,
      disableLinks = _ref3.disableLinks,
      isLogging = _ref3.isLogging;

  var spinner = isLogging ? _react2.default.createElement(
    'div',
    { className: _styles2.default.spinnerContainer },
    _react2.default.createElement(_Spinner2.default, { ringWidth: 2 })
  ) : null;
  return _react2.default.createElement(
    _Button2.default,
    {
      className: (0, _classnames2.default)(_styles2.default.log, className),
      onClick: onLogCall,
      disabled: disableLinks || isLogging
    },
    _react2.default.createElement('span', {
      className: isLogged ? _DynamicsFont2.default.edit : _DynamicsFont2.default.callLog }),
    spinner
  );
}
LogButton.propTypes = {
  className: _react.PropTypes.string,
  onLogCall: _react.PropTypes.func,
  isLogged: _react.PropTypes.bool,
  disableLinks: _react.PropTypes.bool,
  isLogging: _react.PropTypes.bool,
  currentLocale: _react.PropTypes.string.isRequired
};
LogButton.defaultProps = {
  className: undefined,
  onLogCall: undefined,
  isLogged: false,
  disableLinks: false,
  isLogging: false
};

function EntityButton(_ref4) {
  var className = _ref4.className,
      currentLocale = _ref4.currentLocale,
      onViewEntity = _ref4.onViewEntity,
      onCreateEntity = _ref4.onCreateEntity,
      hasEntity = _ref4.hasEntity,
      isCreating = _ref4.isCreating,
      disableLinks = _ref4.disableLinks;

  // console.debug('isCreating', isCreating);
  var spinner = isCreating ? _react2.default.createElement(
    'div',
    { className: _styles2.default.spinnerContainer },
    _react2.default.createElement(_Spinner2.default, { ringWidth: 2 })
  ) : null;
  var icon = hasEntity ? _DynamicsFont2.default.record : _DynamicsFont2.default.addEntity;
  var onClick = hasEntity ? onViewEntity : onCreateEntity;

  return _react2.default.createElement(
    _Button2.default,
    {
      className: (0, _classnames2.default)(_styles2.default.entity, className),
      onClick: onClick,
      disabled: disableLinks },
    _react2.default.createElement('span', { className: icon }),
    spinner
  );
}
EntityButton.propTypes = {
  className: _react.PropTypes.string,
  onViewEntity: _react.PropTypes.func,
  onCreateEntity: _react.PropTypes.func,
  hasEntity: _react.PropTypes.bool,
  isCreating: _react.PropTypes.bool,
  disableLinks: _react.PropTypes.bool,
  currentLocale: _react.PropTypes.string.isRequired
};
EntityButton.defaultProps = {
  className: undefined,
  onViewEntity: undefined,
  hasEntity: false,
  onCreateEntity: undefined,
  isCreating: false,
  disableLinks: false
};

var ActionMenu = function (_Component) {
  (0, _inherits3.default)(ActionMenu, _Component);

  function ActionMenu(props) {
    (0, _classCallCheck3.default)(this, ActionMenu);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ActionMenu.__proto__ || (0, _getPrototypeOf2.default)(ActionMenu)).call(this, props));

    _this.state = {
      entityModalVisible: false
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
    _this.onCreateEnityModal = function (entityType) {
      _this.props.onCreateEntity(entityType);
      _this.closeEntityModal();
    };
    _this.onCancelEntityModal = function () {
      _this.closeEntityModal();
    };
    return _this;
  }

  (0, _createClass3.default)(ActionMenu, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          currentLocale = _props.currentLocale,
          onLogCall = _props.onLogCall,
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
          disableClickToDial = _props.disableClickToDial;


      var logButton = onLogCall ? _react2.default.createElement(LogButton, {
        className: _styles2.default.baseGroup,
        onLogCall: onLogCall,
        disableLinks: disableLinks,
        isLogged: isLogged,
        isLogging: isLogging,
        currentLocale: currentLocale
      }) : null;

      var entityButton = void 0;
      if (hasEntity && onViewEntity) {
        entityButton = _react2.default.createElement(EntityButton, {
          className: _styles2.default.baseGroup,
          onViewEntity: onViewEntity,
          hasEntity: hasEntity,
          disableLinks: disableLinks,
          currentLocale: currentLocale
        });
      } else if (!hasEntity && phoneNumber && onCreateEntity) {
        entityButton = _react2.default.createElement(EntityButton, {
          className: _styles2.default.baseGroup,
          onCreateEntity: this.openEntityModal,
          hasEntity: hasEntity,
          disableLinks: disableLinks,
          currentLocale: currentLocale
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
        currentLocale: currentLocale
      }) : null;
      var clickToSmsButton = onClickToSms ? _react2.default.createElement(ClickToSmsButton, {
        className: hasBaseGroup ? _styles2.default.secondGroup : _styles2.default.baseGroup,
        onClickToSms: onClickToSms,
        phoneNumber: phoneNumber,
        disableLinks: disableLinks,
        currentLocale: currentLocale
      }) : null;
      var hasSecondGroup = hasBaseGroup && !!(clickToDialButton || clickToSmsButton);
      if (hasSecondGroup) {
        // slide menu
        return _react2.default.createElement(
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
        );
      } else if (!clickToDialButton && !clickToSmsButton && !entityButton && !logButton) {
        return null;
      }
      // no slide menu
      return _react2.default.createElement(
        'div',
        null,
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
  className: _react.PropTypes.string,
  currentLocale: _react.PropTypes.string.isRequired,
  onLogCall: _react.PropTypes.func,
  isLogged: _react.PropTypes.bool,
  isLogging: _react.PropTypes.bool,
  isCreating: _react.PropTypes.bool,
  onViewEntity: _react.PropTypes.func,
  onCreateEntity: _react.PropTypes.func,
  hasEntity: _react.PropTypes.bool,
  onClickToDial: _react.PropTypes.func,
  onClickToSms: _react.PropTypes.func,
  phoneNumber: _react.PropTypes.string,
  disableLinks: _react.PropTypes.bool,
  disableClickToDial: _react.PropTypes.bool
};
ActionMenu.defaultProps = {
  className: undefined,
  onLogCall: undefined,
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
  disableClickToDial: false
};
//# sourceMappingURL=index.js.map
