'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _Modal = require('../Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _EntityButton = require('../EntityButton');

var _EntityButton2 = _interopRequireDefault(_EntityButton);

var _EntityModal = require('../EntityModal');

var _EntityModal2 = _interopRequireDefault(_EntityModal);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _LogButton = require('../LogButton');

var _LogButton2 = _interopRequireDefault(_LogButton);

var _DeleteMessageIcon = require('../../assets/images/DeleteMessageIcon.svg');

var _DeleteMessageIcon2 = _interopRequireDefault(_DeleteMessageIcon);

var _CloseIcon = require('../../assets/images/CloseIcon.svg');

var _CloseIcon2 = _interopRequireDefault(_CloseIcon);

var _Mark = require('../../assets/images/Mark.svg');

var _Mark2 = _interopRequireDefault(_Mark);

var _Unmark = require('../../assets/images/Unmark.svg');

var _Unmark2 = _interopRequireDefault(_Unmark);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ConfirmDeleteModal(_ref) {
  var currentLocale = _ref.currentLocale,
      show = _ref.show,
      onDelete = _ref.onDelete,
      onCancel = _ref.onCancel;

  return _react2.default.createElement(
    _Modal2.default,
    {
      show: show,
      currentLocale: currentLocale,
      onConfirm: onDelete,
      onCancel: onCancel,
      className: _styles2.default.confirmDeleteModal,
      modalClassName: _styles2.default.confirmDeleteModal,
      cancelBtnClassName: _styles2.default.cancelBtn,
      confirmBtnClassName: _styles2.default.confirmBtn,
      closeBtn: _react2.default.createElement(
        _Button2.default,
        {
          className: _styles2.default.closeBtn,
          onClick: onCancel
        },
        _react2.default.createElement(_CloseIcon2.default, null)
      )
    },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.contentText },
      _i18n2.default.getString('sureToDeleteVoiceMail', currentLocale)
    )
  );
}
ConfirmDeleteModal.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  show: _propTypes2.default.bool.isRequired,
  onDelete: _propTypes2.default.func,
  onCancel: _propTypes2.default.func
};

ConfirmDeleteModal.defaultProps = {
  onDelete: function onDelete() {},
  onCancel: function onCancel() {}
};

function ClickToDialButton(_ref2) {
  var className = _ref2.className,
      onClickToDial = _ref2.onClickToDial,
      disableLinks = _ref2.disableLinks,
      disableClickToDial = _ref2.disableClickToDial,
      phoneNumber = _ref2.phoneNumber,
      title = _ref2.title;

  return _react2.default.createElement(
    _Button2.default,
    {
      className: (0, _classnames2.default)(_styles2.default.button, _styles2.default.clickToDialButton, className),
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

function ClickToSmsButton(_ref3) {
  var className = _ref3.className,
      onClickToSms = _ref3.onClickToSms,
      disableLinks = _ref3.disableLinks,
      phoneNumber = _ref3.phoneNumber,
      title = _ref3.title;

  return _react2.default.createElement(
    _Button2.default,
    {
      className: (0, _classnames2.default)(_styles2.default.button, _styles2.default.clickToSmsButton, className),
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
  phoneNumber: _propTypes2.default.string,
  title: _propTypes2.default.string
};
ClickToSmsButton.defaultProps = {
  className: undefined,
  onClickToSms: undefined,
  disableLinks: false,
  phoneNumber: undefined,
  title: undefined
};

function DeleteButton(_ref4) {
  var className = _ref4.className,
      title = _ref4.title,
      openDeleteModal = _ref4.openDeleteModal,
      disabled = _ref4.disabled;

  return _react2.default.createElement(
    _Button2.default,
    {
      className: (0, _classnames2.default)(_styles2.default.button, _styles2.default.svgBtn, className),
      onClick: openDeleteModal,
      disabled: disabled
    },
    _react2.default.createElement(
      'span',
      { title: title },
      _react2.default.createElement(_DeleteMessageIcon2.default, {
        width: 14,
        height: 17,
        className: (0, _classnames2.default)(_styles2.default.svgFillIcon, disabled ? _styles2.default.disabled : null)
      })
    )
  );
}

DeleteButton.propTypes = {
  className: _propTypes2.default.string,
  title: _propTypes2.default.string,
  openDeleteModal: _propTypes2.default.func,
  disabled: _propTypes2.default.bool.isRequired
};
DeleteButton.defaultProps = {
  className: undefined,
  title: undefined,
  openDeleteModal: function openDeleteModal() {}
};

function MarkButton(_ref5) {
  var marked = _ref5.marked,
      className = _ref5.className,
      onClick = _ref5.onClick,
      markTitle = _ref5.markTitle,
      unmarkTitle = _ref5.unmarkTitle,
      disabled = _ref5.disabled;

  var Icon = marked ? _Unmark2.default : _Mark2.default;
  var title = marked ? unmarkTitle : markTitle;
  var classNames = (0, _classnames2.default)(_styles2.default.unmarked, marked ? _styles2.default.svgFillIcon : null, disabled ? _styles2.default.disabled : null);
  return _react2.default.createElement(
    _Button2.default,
    {
      className: (0, _classnames2.default)(_styles2.default.button, _styles2.default.svgBtn, className),
      onClick: onClick,
      disabled: disabled
    },
    _react2.default.createElement(
      'span',
      { title: title },
      _react2.default.createElement(Icon, {
        width: 14,
        height: 17,
        title: title,
        className: classNames
      })
    )
  );
}

MarkButton.propTypes = {
  className: _propTypes2.default.string,
  markTitle: _propTypes2.default.string,
  unmarkTitle: _propTypes2.default.string,
  onClick: _propTypes2.default.func.isRequired,
  marked: _propTypes2.default.bool.isRequired,
  disabled: _propTypes2.default.bool.isRequired
};
MarkButton.defaultProps = {
  className: undefined,
  markTitle: undefined,
  unmarkTitle: undefined
};

var ActionMenuList = function (_Component) {
  (0, _inherits3.default)(ActionMenuList, _Component);

  function ActionMenuList(props) {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, ActionMenuList);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ActionMenuList.__proto__ || (0, _getPrototypeOf2.default)(ActionMenuList)).call(this, props));

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

    _this.onDelete = function () {
      _this.props.onDelete();
      _this.setState({
        disableDelete: true
      });
      _this.onCloseDeleteModal();
    };

    _this.openDeleteModal = function () {
      _this.setState({
        deleteModalVisible: true
      });
    };

    _this.onCloseDeleteModal = function () {
      _this.setState({
        deleteModalVisible: false
      });
    };

    _this.onCancelDelete = function () {
      _this.onCloseDeleteModal();
    };

    _this.preventEventPropogation = function (e) {
      if (e.target !== e.currentTarget) {
        e.stopPropagation();
      }
    };

    _this.state = {
      entityModalVisible: false,
      deleteModalVisible: false,
      disableDelete: false,
      marking: false
    };

    _this.onMark = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var _this$props, marked, onUnmark, onMark, onClick;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!_this.state.marking) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return');

            case 2:
              _this.setState({
                marking: true
              });
              _this$props = _this.props, marked = _this$props.marked, onUnmark = _this$props.onUnmark, onMark = _this$props.onMark;
              onClick = marked ? onUnmark : onMark;
              _context.prev = 5;
              _context.next = 8;
              return onClick();

            case 8:
              _context.next = 12;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context['catch'](5);

            case 12:
              _this.setState({
                marking: false
              });

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[5, 10]]);
    }));
    return _this;
  }

  (0, _createClass3.default)(ActionMenuList, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
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
          marked = _props.marked,
          markTitle = _props.markTitle,
          unmarkTitle = _props.unmarkTitle;


      var logButton = onLog ? _react2.default.createElement(_LogButton2.default, {
        className: _styles2.default.button,
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
          className: _styles2.default.button,
          onViewEntity: onViewEntity,
          hasEntity: hasEntity,
          disableLinks: disableLinks,
          viewEntityTitle: viewEntityTitle
        });
      } else if (!hasEntity && phoneNumber && onCreateEntity) {
        entityButton = _react2.default.createElement(_EntityButton2.default, {
          className: _styles2.default.button,
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

      var clickToDialButton = onClickToDial ? _react2.default.createElement(ClickToDialButton, {
        onClickToDial: onClickToDial,
        phoneNumber: phoneNumber,
        disableLinks: disableLinks,
        disableClickToDial: disableClickToDial,
        currentLocale: currentLocale,
        title: callTitle
      }) : null;
      var clickToSmsButton = onClickToSms ? _react2.default.createElement(ClickToSmsButton, {
        onClickToSms: onClickToSms,
        phoneNumber: phoneNumber,
        disableLinks: disableLinks,
        currentLocale: currentLocale,
        title: textTitle
      }) : null;
      var deleteButton = onDelete ? _react2.default.createElement(DeleteButton, {
        onDelete: onDelete,
        currentLocale: currentLocale,
        title: deleteTitle,
        openDeleteModal: this.openDeleteModal,
        disabled: this.state.disableDelete || disableLinks
      }) : null;

      var confirmDeleteModal = onDelete ? _react2.default.createElement(ConfirmDeleteModal, {
        currentLocale: currentLocale,
        show: this.state.deleteModalVisible,
        onDelete: this.onDelete,
        onCancel: this.onCancelDelete
      }) : null;
      var markButton = onMark ? _react2.default.createElement(MarkButton, {
        markTitle: markTitle,
        unmarkTitle: unmarkTitle,
        marked: marked,
        onClick: this.onMark,
        disabled: disableLinks
      }) : null;
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.root, className), onClick: this.preventEventPropogation },
        clickToDialButton,
        clickToSmsButton,
        entityButton,
        logButton,
        markButton,
        deleteButton,
        entityModal,
        confirmDeleteModal
      );
    }
  }]);
  return ActionMenuList;
}(_react.Component);

exports.default = ActionMenuList;


ActionMenuList.propTypes = {
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
  markTitle: _propTypes2.default.string,
  unmarkTitle: _propTypes2.default.string
};
ActionMenuList.defaultProps = {
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
  markTitle: undefined,
  unmarkTitle: undefined
};
//# sourceMappingURL=index.js.map
