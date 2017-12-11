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

var _SlideMenu = require('../SlideMenu');

var _SlideMenu2 = _interopRequireDefault(_SlideMenu);

var _ActionMenuList = require('../ActionMenuList');

var _ActionMenuList2 = _interopRequireDefault(_ActionMenuList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionMenu = function (_Component) {
  (0, _inherits3.default)(ActionMenu, _Component);

  function ActionMenu() {
    (0, _classCallCheck3.default)(this, ActionMenu);
    return (0, _possibleConstructorReturn3.default)(this, (ActionMenu.__proto__ || (0, _getPrototypeOf2.default)(ActionMenu)).apply(this, arguments));
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
          viewEntityTitle = _props.viewEntityTitle,
          onDelete = _props.onDelete,
          deleteTitle = _props.deleteTitle,
          onMark = _props.onMark,
          onUnmark = _props.onUnmark,
          marked = _props.marked,
          markTitle = _props.markTitle;

      return _react2.default.createElement(
        'div',
        { ref: reference },
        _react2.default.createElement(
          _SlideMenu2.default,
          {
            extended: this.props.extended,
            onToggle: this.props.onToggle,
            className: className,
            extendIconClassName: this.props.extendIconClassName,
            minHeight: 0,
            maxHeight: 53
          },
          _react2.default.createElement(_ActionMenuList2.default, {
            onLog: onLog,
            isLogged: isLogged,
            isLogging: isLogging,
            isCreating: isCreating,
            onViewEntity: onViewEntity,
            onCreateEntity: onCreateEntity,
            hasEntity: hasEntity,
            onClickToDial: onClickToDial,
            onClickToSms: onClickToSms,
            phoneNumber: phoneNumber,
            disableLinks: disableLinks,
            disableClickToDial: disableClickToDial,
            addLogTitle: addLogTitle,
            editLogTitle: editLogTitle,
            textTitle: textTitle,
            callTitle: callTitle,
            createEntityTitle: createEntityTitle,
            viewEntityTitle: viewEntityTitle,
            currentLocale: currentLocale,
            onDelete: onDelete,
            deleteTitle: deleteTitle,
            onMark: onMark,
            onUnmark: onUnmark,
            marked: marked,
            markTitle: markTitle
          })
        )
      );
    }
  }]);
  return ActionMenu;
}(_react.Component);

exports.default = ActionMenu;


ActionMenu.propTypes = {
  extended: _propTypes2.default.bool,
  onToggle: _propTypes2.default.func,
  reference: _propTypes2.default.func,
  className: _propTypes2.default.string,
  extendIconClassName: _propTypes2.default.string,
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
  addLogTitle: _propTypes2.default.string,
  editLogTitle: _propTypes2.default.string,
  textTitle: _propTypes2.default.string,
  callTitle: _propTypes2.default.string,
  createEntityTitle: _propTypes2.default.string,
  viewEntityTitle: _propTypes2.default.string,
  onDelete: _propTypes2.default.func,
  deleteTitle: _propTypes2.default.string,
  onMark: _propTypes2.default.func,
  onUnmark: _propTypes2.default.func,
  marked: _propTypes2.default.bool,
  markTitle: _propTypes2.default.string
};
ActionMenu.defaultProps = {
  extended: undefined,
  onToggle: undefined,
  reference: undefined,
  className: undefined,
  extendIconClassName: undefined,
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
  addLogTitle: undefined,
  editLogTitle: undefined,
  textTitle: undefined,
  callTitle: undefined,
  createEntityTitle: undefined,
  viewEntityTitle: undefined,
  deleteTitle: undefined,
  onDelete: undefined,
  onMark: undefined,
  onUnmark: undefined,
  marked: false,
  markTitle: undefined
};
//# sourceMappingURL=index.js.map
