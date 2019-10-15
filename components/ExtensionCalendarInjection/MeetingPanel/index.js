"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.regexp.split");

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DropdownSelect = _interopRequireDefault(require("../../DropdownSelect"));

var _constants = require("../../MeetingConfigs/constants");

var _styles = _interopRequireDefault(require("../PopupModal/styles.scss"));

var _ArrowSVG = _interopRequireDefault(require("../ArrowSVG"));

var _Switch = _interopRequireDefault(require("../Switch"));

var _Title = _interopRequireDefault(require("../Title"));

var _Input = _interopRequireDefault(require("../Input"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MeetingPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(MeetingPanel, _Component);

  function MeetingPanel(props) {
    var _this;

    _classCallCheck(this, MeetingPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MeetingPanel).call(this, props));

    _this.getDatas = function () {
      var password = _this.state.password;

      if (!_this.validatePassword(password)) {
        return null;
      }

      return _this.state;
    };

    _this.onUpdate = function (key, value) {
      if (key === '_requireMeetingPassword' && !value) {
        _this.setState({
          password: ''
        });
      }

      _this.setState(_defineProperty({}, key, value));
    };

    _this.validatePassword = function (password) {
      var _requireMeetingPassword = _this.state._requireMeetingPassword;
      var valid = !!(!_requireMeetingPassword || password);

      _this.setState({
        validPassword: valid
      });

      return valid;
    };

    _this.onAudioOptionsChange = function (audioOptions) {
      _this.setState({
        audioOptions: audioOptions.value.split('_')
      });
    };

    _this.state = _objectSpread({}, props.meeting, {
      validPassword: true
    });
    return _this;
  }

  _createClass(MeetingPanel, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          recurringMeeting = _this$state.recurringMeeting,
          startHostVideo = _this$state.startHostVideo,
          startParticipantsVideo = _this$state.startParticipantsVideo,
          audioOptions = _this$state.audioOptions,
          _requireMeetingPassword = _this$state._requireMeetingPassword,
          password = _this$state.password,
          allowJoinBeforeHost = _this$state.allowJoinBeforeHost,
          validPassword = _this$state.validPassword;
      var _this$props = this.props,
          i18n = _this$props.i18n,
          theme = _this$props.theme;
      var AUDIO_OPTIONS = [{
        value: 'Phone',
        display: i18n.telephone
      }, {
        value: 'ComputerAudio',
        display: i18n.voip
      }, {
        value: 'Phone_ComputerAudio',
        display: i18n.both
      }];
      return _react["default"].createElement("div", {
        className: _styles["default"].form
      }, _react["default"].createElement("div", {
        className: _styles["default"].formGroup
      }, _react["default"].createElement(_Title["default"], {
        label: i18n.when
      }), _react["default"].createElement("div", {
        className: _styles["default"].flex
      }, _react["default"].createElement("span", null, i18n.recurringMeeting), _react["default"].createElement("span", null, _react["default"].createElement(_Switch["default"], {
        checked: recurringMeeting,
        dataSign: "enableJoinToggle",
        onChange: function onChange(checked) {
          return _this2.onUpdate('recurringMeeting', checked);
        }
      }))), recurringMeeting && _react["default"].createElement("div", {
        className: _styles["default"].info
      }, i18n.recurringMeetingPrompt)), _react["default"].createElement("div", {
        className: _styles["default"].formGroup
      }, _react["default"].createElement(_Title["default"], {
        label: i18n.video,
        subLabel: "(".concat(i18n.videoDescribe, ")")
      }), _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].flex, _styles["default"].flexMargin8)
      }, _react["default"].createElement("div", null, i18n.hostVideoOn), _react["default"].createElement("span", null, _react["default"].createElement(_Switch["default"], {
        checked: startHostVideo,
        dataSign: "enableJoinToggle",
        onChange: function onChange(checked) {
          return _this2.onUpdate('startHostVideo', checked);
        }
      }))), _react["default"].createElement("div", {
        className: _styles["default"].flex
      }, _react["default"].createElement("div", null, i18n.participantVideoOn), _react["default"].createElement("span", null, _react["default"].createElement(_Switch["default"], {
        checked: startParticipantsVideo,
        dataSign: "enableJoinToggle",
        onChange: function onChange(checked) {
          return _this2.onUpdate('startParticipantsVideo', checked);
        }
      })))), _react["default"].createElement("div", {
        className: _styles["default"].formGroup
      }, _react["default"].createElement(_Title["default"], {
        label: i18n.audioOptions,
        className: _styles["default"].titleMargin8
      }), _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].audioOptionDropdown)
      }, _react["default"].createElement(_DropdownSelect["default"], {
        className: (0, _classnames["default"])(_styles["default"].dropdown, theme.UI && _styles["default"][theme.UI]),
        iconClassName: _styles["default"].dropdownIcon,
        value: audioOptions.join('_'),
        onChange: function onChange(option) {
          return _this2.onAudioOptionsChange(option);
        },
        options: AUDIO_OPTIONS,
        valueFunction: function valueFunction(option) {
          return option.display;
        },
        renderValue: function renderValue(value) {
          return AUDIO_OPTIONS.find(function (item) {
            return item.value === value;
          }).display;
        },
        renderFunction: function renderFunction(option) {
          return _react["default"].createElement("div", {
            title: option.display
          }, option.display);
        },
        dropdownAlign: "left",
        icon: _react["default"].createElement(_ArrowSVG["default"], null),
        titleEnabled: true
      }))), _react["default"].createElement("div", {
        className: _styles["default"].formGroup
      }, _react["default"].createElement(_Title["default"], {
        label: i18n.meetingOptions
      }), _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].flex, _styles["default"].flexMargin8)
      }, _react["default"].createElement("div", null, i18n.requirePassword), _react["default"].createElement("span", null, _react["default"].createElement(_Switch["default"], {
        checked: _requireMeetingPassword,
        dataSign: "enableJoinToggle",
        onChange: function onChange(checked) {
          return _this2.onUpdate('_requireMeetingPassword', checked);
        }
      }))), _requireMeetingPassword && _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].passwordField)
      }, _react["default"].createElement("div", {
        className: _styles["default"].label
      }, i18n.password), _react["default"].createElement(_Input["default"], {
        value: password || '',
        onChange: function onChange(_ref) {
          var target = _ref.target;

          _this2.validatePassword(target.value);

          if (_constants.PASSWORD_REGEX.test(target.value)) {
            _this2.onUpdate('password', target.value);
          }
        },
        isError: !validPassword,
        errorMessage: i18n.noPassword,
        dataSign: "requirePasswordInput",
        placeholder: theme.isOldUI ? '' : i18n.password
      })), _react["default"].createElement("div", {
        className: _styles["default"].flex
      }, _react["default"].createElement("div", null, i18n.joinBeforeHost), _react["default"].createElement("span", null, _react["default"].createElement(_Switch["default"], {
        checked: allowJoinBeforeHost,
        dataSign: "enableJoinToggle",
        onChange: function onChange(checked) {
          return _this2.onUpdate('allowJoinBeforeHost', checked);
        }
      })))));
    }
  }]);

  return MeetingPanel;
}(_react.Component);

MeetingPanel.propTypes = {
  i18n: _propTypes["default"].object.isRequired,
  meeting: _propTypes["default"].object.isRequired,
  theme: _propTypes["default"].object.isRequired
};
var _default = MeetingPanel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
