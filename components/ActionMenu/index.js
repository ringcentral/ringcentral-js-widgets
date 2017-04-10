'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ActionMenu;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Spinner = require('../Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _SlideMenu = require('../SlideMenu');

var _SlideMenu2 = _interopRequireDefault(_SlideMenu);

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
      disableLinks = _ref4.disableLinks;

  return _react2.default.createElement(
    _Button2.default,
    {
      className: (0, _classnames2.default)(_styles2.default.entity, className),
      onClick: onViewEntity,
      disabled: disableLinks },
    _react2.default.createElement('i', { className: _DynamicsFont2.default.record })
  );
}
EntityButton.propTypes = {
  className: _react.PropTypes.string,
  onViewEntity: _react.PropTypes.func,
  onCreateEntity: _react.PropTypes.func,
  hasEntity: _react.PropTypes.bool,
  disableLinks: _react.PropTypes.bool,
  currentLocale: _react.PropTypes.string.isRequired
};
EntityButton.defaultProps = {
  className: undefined,
  onViewEntity: undefined,
  hasEntity: false,
  onCreateEntity: undefined,
  disableLinks: false
};

function ActionMenu(_ref5) {
  var className = _ref5.className,
      currentLocale = _ref5.currentLocale,
      onLogCall = _ref5.onLogCall,
      isLogged = _ref5.isLogged,
      isLogging = _ref5.isLogging,
      onViewEntity = _ref5.onViewEntity,
      onCreateEntity = _ref5.onCreateEntity,
      hasEntity = _ref5.hasEntity,
      onClickToDial = _ref5.onClickToDial,
      onClickToSms = _ref5.onClickToSms,
      phoneNumber = _ref5.phoneNumber,
      disableLinks = _ref5.disableLinks,
      disableClickToDial = _ref5.disableClickToDial;

  var logButton = onLogCall ? _react2.default.createElement(LogButton, {
    className: _styles2.default.baseGroup,
    onLogCall: onLogCall,
    disableLinks: disableLinks,
    isLogged: isLogged,
    isLogging: isLogging,
    currentLocale: currentLocale
  }) : null;
  var entityButton = hasEntity && onViewEntity ? _react2.default.createElement(EntityButton, {
    className: _styles2.default.baseGroup,
    onViewEntity: onViewEntity,
    onCreateEntity: onCreateEntity,
    hasEntity: hasEntity,
    disableLinks: disableLinks,
    currentLocale: currentLocale
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
      logButton
    );
  } else if (!clickToDialButton && !clickToSmsButton && !entityButton && !logButton) {
    return null;
  }
  // no slide menu
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.root, className) },
    clickToDialButton,
    clickToSmsButton,
    entityButton,
    logButton
  );
}

ActionMenu.propTypes = {
  className: _react.PropTypes.string,
  currentLocale: _react.PropTypes.string.isRequired,
  onLogCall: _react.PropTypes.func,
  isLogged: _react.PropTypes.bool,
  isLogging: _react.PropTypes.bool,
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
