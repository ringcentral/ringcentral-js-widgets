"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.map");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _formatMessage = _interopRequireDefault(require("format-message"));

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _Switch = _interopRequireDefault(require("../Switch"));

var _DropdownSelect = _interopRequireDefault(require("../DropdownSelect"));

var _BackHeader = _interopRequireDefault(require("../BackHeader"));

var _Button = _interopRequireDefault(require("../Button"));

var _LinkLine = _interopRequireDefault(require("../LinkLine"));

var _MeetingSection = _interopRequireDefault(require("../MeetingSection"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// TODO Move to a separate folder.
function CheckBox(_ref) {
  var checked = _ref.checked,
      onChange = _ref.onChange;
  var className = (0, _classnames["default"])(_styles["default"].checkbox, checked ? _styles["default"].checked : '');
  return _react["default"].createElement("div", {
    className: className,
    onClick: function onClick() {
      return onChange && onChange(!checked);
    }
  }, "\u2713");
}

CheckBox.propTypes = {
  checked: _propTypes["default"].bool.isRequired,
  onChange: _propTypes["default"].func
};
CheckBox.defaultProps = {
  onChange: null
};

function DialInNumberItem(_ref2) {
  var region = _ref2.region,
      formattedPhoneNumber = _ref2.formattedPhoneNumber;
  return _react["default"].createElement("div", {
    className: _styles["default"].dialInNumberItem,
    title: region
  }, _react["default"].createElement("span", {
    className: _styles["default"].region
  }, region), _react["default"].createElement("span", null, formattedPhoneNumber));
}

DialInNumberItem.propTypes = {
  region: _propTypes["default"].string.isRequired,
  formattedPhoneNumber: _propTypes["default"].string.isRequired
};

function DialInNumberList(_ref3) {
  var dialInNumbers = _ref3.dialInNumbers,
      selected = _ref3.selected,
      onChange = _ref3.onChange;

  if (dialInNumbers.length === 0) {
    return '';
  }

  return _react["default"].createElement("ul", {
    className: _styles["default"].dialInNumberList
  }, dialInNumbers.map(function (e) {
    var checked = selected.indexOf(e.phoneNumber) > -1;

    var selectChange = function selectChange() {
      var newSelection = [];

      if (checked) {
        selected.forEach(function (curNum) {
          return curNum !== e.phoneNumber && newSelection.push(curNum);
        });
      } else {
        newSelection = selected.concat(e.phoneNumber);
      }

      onChange(newSelection);
    };

    return _react["default"].createElement("li", {
      key: e.phoneNumber,
      onClick: selectChange,
      title: e.region
    }, _react["default"].createElement(CheckBox, {
      className: _styles["default"].checkbox,
      checked: checked
    }), _react["default"].createElement("div", {
      className: _styles["default"].region
    }, e.region), _react["default"].createElement("div", {
      className: _styles["default"].phoneNumber
    }, e.formattedPhoneNumber));
  }));
}

DialInNumberList.propTypes = {
  dialInNumbers: _propTypes["default"].array.isRequired,
  selected: _propTypes["default"].array.isRequired,
  onChange: _propTypes["default"].func.isRequired
};

function formatPin(number) {
  return number.replace(/(\d{3})/g, '$1-').replace(/-$/, '');
}

var dialInNumbersLinks = {
  att: 'https://rcconf.net/1L06Hd5',
  // att reuse rc brand
  bt: 'https://www.btcloudphone.bt.com/conferencing',
  rc: 'https://rcconf.net/1L06Hd5',
  telus: 'https://telus.com/BusinessConnect/ConferencingFrequentlyAskedQuestions'
};

var ConferencePanel =
/*#__PURE__*/
function (_Component) {
  _inherits(ConferencePanel, _Component);

  function ConferencePanel(props) {
    var _this;

    _classCallCheck(this, ConferencePanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConferencePanel).call(this, props));

    _this.checkOverlap = function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          mainCtrl = _assertThisInitialize.mainCtrl;

      if (!mainCtrl) {
        return;
      }

      var overlappedHeight = mainCtrl.scrollHeight - mainCtrl.clientHeight - mainCtrl.scrollTop;
      var mainCtrlOverlapped = overlappedHeight > 1;

      if (mainCtrlOverlapped !== _this.state.mainCtrlOverlapped) {
        _this.setState({
          mainCtrlOverlapped: mainCtrlOverlapped
        });
      }
    };

    _this.onSelectToggle = function (open) {
      var _assertThisInitialize2 = _assertThisInitialized(_this),
          mainCtrl = _assertThisInitialize2.mainCtrl;

      if (!mainCtrl) {
        return;
      }

      if (open) {
        mainCtrl.style.overflow = 'hidden';
      } else {
        mainCtrl.style.overflow = '';
      }
    };

    _this.inviteTxt = function () {
      var _this$props = _this.props,
          dialInNumber = _this$props.dialInNumber,
          additionalNumbers = _this$props.additionalNumbers,
          participantCode = _this$props.participantCode,
          brand = _this$props.brand;
      var dialInNumbers = _this.state.dialInNumbers;
      var formattedDialInNumber = dialInNumbers.find(function (e) {
        return e.phoneNumber === dialInNumber;
      }).formattedPhoneNumber;
      var additionalNumbersTxt = additionalNumbers.map(function (p) {
        return dialInNumbers.find(function (obj) {
          return obj.phoneNumber === p;
        });
      }).map(function (fmt) {
        return "".concat(fmt.region, "  ").concat(fmt.formattedPhoneNumber);
      }).join('\n');
      var additionalNumbersSection = '';

      if (additionalNumbers.length > 0) {
        additionalNumbersSection = "".concat(_i18n["default"].getString('internationalNumber', _this.props.currentLocale), "\n").concat(additionalNumbersTxt);
      } //     return `
      // Please join the ${brand.name} conference.
      // Dial-In Number: ${formattedDialInNumber}
      // ${additionalNumbersSection}
      // Participant Access: ${formatPin(participantCode)}
      // Need an international dial-in phone number? Please visit ${dialInNumbersLinks[brand.code]}
      // This conference call is brought to you by ${brand.name} Conferencing.`;
      // return i18n.getString('inviteText', this.props.currentLocale);


      return (0, _formatMessage["default"])(_i18n["default"].getString("inviteText_".concat(brand.code), _this.props.currentLocale), {
        brandName: brand.name,
        formattedDialInNumber: formattedDialInNumber,
        additionalNumbersSection: additionalNumbersSection,
        participantCode: formatPin(participantCode),
        dialInNumbersLinks: dialInNumbersLinks[brand.code]
      });
    };

    _this.inviteWithText = function () {
      var txt = _this.inviteTxt();

      if (txt) {
        _this.props.inviteWithText(txt);
      }
    };

    _this.state = {
      dialInNumbers: _this.formatDialInNumbers(props),
      showAdditionalNumberList: false,
      mainCtrlOverlapped: false
    };
    return _this;
  }

  _createClass(ConferencePanel, [{
    key: "formatDialInNumbers",
    value: function formatDialInNumbers(_ref4) {
      var dialInNumbers = _ref4.dialInNumbers,
          countryCode = _ref4.countryCode,
          areaCode = _ref4.areaCode;
      return dialInNumbers.map(function (e) {
        return _objectSpread({}, e, {
          formattedPhoneNumber: (0, _formatNumber["default"])({
            phoneNumber: e.phoneNumber,
            countryCode: countryCode,
            areaCode: areaCode,
            international: true
          })
        });
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.dialInNumbers !== this.props.dialInNumbers || nextProps.countryCode !== this.props.countryCode || nextProps.areaCode !== this.props.areaCode) {
        this.setState({
          dialInNumbers: this.formatDialInNumbers(nextProps)
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('resize', this.checkOverlap, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.checkOverlap, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          currentLocale = _this$props2.currentLocale,
          hostCode = _this$props2.hostCode,
          participantCode = _this$props2.participantCode,
          dialInNumber = _this$props2.dialInNumber,
          additionalNumbers = _this$props2.additionalNumbers,
          updateDialInNumber = _this$props2.updateDialInNumber,
          updateAdditionalNumbers = _this$props2.updateAdditionalNumbers,
          joinAsHost = _this$props2.joinAsHost,
          allowJoinBeforeHost = _this$props2.allowJoinBeforeHost,
          additionalButtons = _this$props2.additionalButtons,
          onAllowJoinBeforeHostChange = _this$props2.onAllowJoinBeforeHostChange,
          showHelpCommands = _this$props2.showHelpCommands,
          disableTxtBtn = _this$props2.disableTxtBtn,
          _this$props2$showJoin = _this$props2.showJoinAsHost,
          showJoinAsHost = _this$props2$showJoin === void 0 ? true : _this$props2$showJoin,
          _this$props2$showEnab = _this$props2.showEnableJoinBeforeHost,
          showEnableJoinBeforeHost = _this$props2$showEnab === void 0 ? true : _this$props2$showEnab,
          recipientsSection = _this$props2.recipientsSection,
          bottomClassName = _this$props2.bottomClassName;
      var _this$state = this.state,
          dialInNumbers = _this$state.dialInNumbers,
          showAdditionalNumberList = _this$state.showAdditionalNumberList,
          mainCtrlOverlapped = _this$state.mainCtrlOverlapped;

      if (showAdditionalNumberList) {
        return _react["default"].createElement("div", {
          className: _styles["default"].selectNumberPage
        }, _react["default"].createElement(_BackHeader["default"], {
          onBackClick: function onBackClick() {
            return _this2.setState({
              showAdditionalNumberList: false
            });
          }
        }, _i18n["default"].getString('selectNumbers', currentLocale)), _react["default"].createElement(DialInNumberList, {
          dialInNumbers: dialInNumbers.filter(function (e) {
            return e.phoneNumber !== dialInNumber;
          }),
          selected: additionalNumbers,
          onChange: updateAdditionalNumbers
        }));
      }

      var additionalNumberObjs = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var n = _step.value;

          if (n !== dialInNumber) {
            additionalNumberObjs.push(dialInNumbers.find(function (e) {
              return e.phoneNumber === n;
            }));
          }
        };

        for (var _iterator = additionalNumbers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var bottomClass = [_styles["default"].bottom];
      if (mainCtrlOverlapped) bottomClass.push(_styles["default"].overlapped);
      if (bottomClassName) bottomClass.push(bottomClassName);
      setTimeout(this.checkOverlap, 1);
      return _react["default"].createElement("div", {
        className: _styles["default"].container
      }, _react["default"].createElement("div", {
        className: _styles["default"].main,
        onScroll: this.checkOverlap,
        ref: function ref(_ref5) {
          _this2.mainCtrl = _ref5;
        }
      }, _react["default"].createElement("div", {
        className: _styles["default"].dialInNumber
      }, _react["default"].createElement("label", {
        className: _styles["default"].title
      }, _i18n["default"].getString('dialInNumber', currentLocale)), _react["default"].createElement(_DropdownSelect["default"], {
        className: _styles["default"].select,
        value: dialInNumber,
        onChange: function onChange(option) {
          return updateDialInNumber(option.phoneNumber);
        },
        renderFunction: DialInNumberItem,
        renderValue: function renderValue(phoneNumber) {
          var option = dialInNumbers.find(function (p) {
            return p.phoneNumber === phoneNumber;
          });

          if (!option) {
            console.warn("Conference dial in number ".concat(phoneNumber, " is not found in the list."));
          }

          var itemOptions = option || dialInNumbers[0];

          if (itemOptions) {
            return DialInNumberItem(itemOptions);
          }

          return '';
        },
        onToggle: this.onSelectToggle,
        options: dialInNumbers,
        disabled: false,
        dropdownAlign: "left"
      })), _react["default"].createElement("div", {
        className: _styles["default"].formGroup
      }, _react["default"].createElement("label", null, _i18n["default"].getString('hostAccess', currentLocale)), _react["default"].createElement("div", {
        className: _styles["default"].field,
        "data-sign": "hostCode"
      }, formatPin(hostCode))), _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].formGroup, _styles["default"].hasBottomBorder)
      }, _react["default"].createElement("label", null, _i18n["default"].getString('participantsAccess', currentLocale)), _react["default"].createElement("div", {
        className: _styles["default"].field,
        "data-sign": "participantCode"
      }, formatPin(participantCode))), recipientsSection, _react["default"].createElement(_MeetingSection["default"], {
        className: _styles["default"].section,
        title: _i18n["default"].getString('addinalDialInNumbers', currentLocale)
      }, _react["default"].createElement("div", null, _react["default"].createElement(_LinkLine["default"], {
        className: _styles["default"].linkLine,
        onClick: function onClick() {
          _this2.setState({
            showAdditionalNumberList: true
          });
        }
      }, _i18n["default"].getString('selectNumbers', currentLocale)), _react["default"].createElement(DialInNumberList, {
        dialInNumbers: additionalNumberObjs,
        selected: additionalNumbers,
        onChange: updateAdditionalNumbers
      }))), showEnableJoinBeforeHost && _react["default"].createElement(_MeetingSection["default"], {
        className: _styles["default"].section,
        title: _i18n["default"].getString('conferenceOptions', currentLocale),
        withSwitch: true
      }, _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].formGroup, _styles["default"].hasTopMargin, _styles["default"].noPadding)
      }, _react["default"].createElement("label", null, _i18n["default"].getString('enableJoinBeforeHost', currentLocale)), _react["default"].createElement("span", {
        className: _styles["default"].field
      }, _react["default"].createElement(_Switch["default"], {
        checked: allowJoinBeforeHost,
        onChange: onAllowJoinBeforeHostChange,
        dataSign: "enableJoinToggle"
      })))), _react["default"].createElement(_Button["default"], {
        onClick: showHelpCommands,
        className: _styles["default"].section
      }, _i18n["default"].getString('conferenceCommands', currentLocale))), _react["default"].createElement("div", {
        className: bottomClass.join(' ')
      }, additionalButtons.map(function (Btn) {
        return _react["default"].createElement(Btn, {
          currentLocale: currentLocale,
          dialInNumber: dialInNumber,
          getInviteTxt: _this2.inviteTxt,
          participantCode: formatPin(participantCode),
          key: Date.now()
        });
      }), !disableTxtBtn && _react["default"].createElement(_Button["default"], {
        className: _styles["default"].button,
        dataSign: "inviteWithText",
        onClick: this.inviteWithText
      }, _i18n["default"].getString('inviteWithText', currentLocale)), showJoinAsHost && _react["default"].createElement(_Button["default"], {
        className: _styles["default"].primaryButton,
        dataSign: "launchConference",
        onClick: joinAsHost
      }, _i18n["default"].getString('joinAsHost', currentLocale))));
    }
  }]);

  return ConferencePanel;
}(_react.Component);

ConferencePanel.propTypes = {
  dialInNumbers: _propTypes["default"].array,
  dialInNumber: _propTypes["default"].string.isRequired,
  additionalNumbers: _propTypes["default"].array.isRequired,
  updateAdditionalNumbers: _propTypes["default"].func.isRequired,
  updateDialInNumber: _propTypes["default"].func.isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  areaCode: _propTypes["default"].string.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  hostCode: _propTypes["default"].string.isRequired,
  participantCode: _propTypes["default"].string.isRequired,
  inviteWithText: _propTypes["default"].func.isRequired,
  joinAsHost: _propTypes["default"].func.isRequired,
  allowJoinBeforeHost: _propTypes["default"].bool.isRequired,
  onAllowJoinBeforeHostChange: _propTypes["default"].func.isRequired,
  additionalButtons: _propTypes["default"].array,
  showHelpCommands: _propTypes["default"].func.isRequired,
  disableTxtBtn: _propTypes["default"].bool.isRequired,
  showJoinAsHost: _propTypes["default"].bool,
  showEnableJoinBeforeHost: _propTypes["default"].bool,
  brand: _propTypes["default"].object.isRequired,
  recipientsSection: _propTypes["default"].node,
  bottomClassName: _propTypes["default"].string
};
ConferencePanel.defaultProps = {
  dialInNumbers: [],
  additionalButtons: [],
  recipientsSection: undefined,
  showJoinAsHost: true,
  showEnableJoinBeforeHost: true,
  bottomClassName: null
};
var _default = ConferencePanel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
