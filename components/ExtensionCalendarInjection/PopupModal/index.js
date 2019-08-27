"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.assign");

require("regenerator-runtime/runtime");

var _react = _interopRequireWildcard(require("react"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _MeetingPanel = _interopRequireDefault(require("../MeetingPanel"));

var _ConferencePanel = _interopRequireDefault(require("../ConferencePanel"));

var _Header = _interopRequireDefault(require("../Header"));

var _Footer = _interopRequireDefault(require("../Footer"));

var _meetingEnum = _interopRequireDefault(require("../constants/meetingEnum"));

var _meetingModeEnum = _interopRequireDefault(require("../constants/meetingModeEnum"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _themeContext = require("../commons/themeContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PopupModal =
/*#__PURE__*/
function (_Component) {
  _inherits(PopupModal, _Component);

  function PopupModal(props) {
    var _this;

    _classCallCheck(this, PopupModal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PopupModal).call(this, props));

    _this.onChange = function (checked) {
      _this.setState({
        saveAsDefault: checked
      });
    };

    _this.onSubmit =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var datas, _this$props, meetingType, meeting, _saved, mode, submit, notShowAgain, saveAsDefault, data;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              datas = _this.refPanel.getDatas();

              if (datas) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", false);

            case 3:
              _context.next = 5;
              return _this.onClose();

            case 5:
              _this$props = _this.props, meetingType = _this$props.meetingType, meeting = _this$props.meeting, _saved = _this$props._saved, mode = _this$props.mode, submit = _this$props.submit;
              notShowAgain = meetingType === _meetingEnum["default"].videoCall ? meeting._saved : _saved;
              saveAsDefault = _this.state.saveAsDefault;

              if (saveAsDefault && mode === _meetingModeEnum["default"].add) {
                notShowAgain = true;
              }

              data = Object.assign(datas, _this.state); // eslint-disable-line

              return _context.abrupt("return", submit(_objectSpread({}, data, {
                notShowAgain: notShowAgain
              })));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    _this.onClose = function (args) {
      _this.props.close(args); // eslint-disable-line

    };

    _this.state = {
      saveAsDefault: false
    };
    return _this;
  }

  _createClass(PopupModal, [{
    key: "render",
    value: function render() {
      var _meetingModeEnum$add$,
          _classnames,
          _this2 = this;

      var _this$props2 = this.props,
          i18n = _this$props2.i18n,
          mode = _this$props2.mode,
          meetingType = _this$props2.meetingType,
          updateEnableJoinBeforeHost = _this$props2.updateEnableJoinBeforeHost;
      var saveAsDefault = this.state.saveAsDefault;
      var footerValues = (_meetingModeEnum$add$ = {}, _defineProperty(_meetingModeEnum$add$, _meetingModeEnum["default"].add, {
        checkboxText: i18n.saveAsDefaultAndNotShowAgain,
        saveButtonText: i18n.done
      }), _defineProperty(_meetingModeEnum$add$, _meetingModeEnum["default"].edit, {
        checkboxText: i18n.saveAsDefault,
        saveButtonText: i18n.update
      }), _meetingModeEnum$add$)[mode];
      return _react["default"].createElement("div", {
        className: _styles["default"].outter
      }, _react["default"].createElement("div", {
        className: _styles["default"].mask
      }), _react["default"].createElement("div", {
        className: _styles["default"].wrapper
      }, _react["default"].createElement("div", {
        className: (0, _classnames2["default"])(_styles["default"].container, (_classnames = {}, _defineProperty(_classnames, _styles["default"].meeting, meetingType === _meetingEnum["default"].videoCall), _defineProperty(_classnames, _styles["default"].conference, meetingType === _meetingEnum["default"].conferenceCall), _classnames)),
        "data-sign": "popupModalContainer"
      }, _react["default"].createElement(_Header["default"], {
        onClose: function onClose() {
          return _this2.onClose({
            cancel: true
          });
        },
        i18n: i18n
      }), meetingType === _meetingEnum["default"].videoCall && _react["default"].createElement(_MeetingPanel["default"], _extends({}, this.props, {
        ref: function ref(c) {
          _this2.refPanel = c;
        }
      })), meetingType === _meetingEnum["default"].conferenceCall && _react["default"].createElement(_ConferencePanel["default"], _extends({}, this.props, {
        ref: function ref(c) {
          _this2.refPanel = c;
        },
        updateEnableJoinBeforeHost: updateEnableJoinBeforeHost
      })), _react["default"].createElement(_Footer["default"], {
        onCheckboxChange: this.onChange,
        saveAsDefault: saveAsDefault,
        footerValues: footerValues,
        onSubmit: this.onSubmit
      }))));
    }
  }]);

  return PopupModal;
}(_react.Component);

PopupModal.propTypes = {
  theme: _propTypes["default"].object.isRequired,
  i18n: _propTypes["default"].object.isRequired,
  close: _propTypes["default"].func.isRequired,
  meetingType: _propTypes["default"].string.isRequired,
  meeting: _propTypes["default"].object,
  mode: _propTypes["default"].string,
  submit: _propTypes["default"].func,
  updateEnableJoinBeforeHost: _propTypes["default"].func,
  _saved: _propTypes["default"].bool
};
PopupModal.defaultProps = {
  meeting: {},
  mode: _meetingModeEnum["default"].add,
  submit: function submit(i) {
    return i;
  },
  updateEnableJoinBeforeHost: function updateEnableJoinBeforeHost(i) {
    return i;
  },
  _saved: false
};

var _default = (0, _themeContext.ThemeConsumer)(PopupModal);

exports["default"] = _default;
//# sourceMappingURL=index.js.map
