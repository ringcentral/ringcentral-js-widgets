"use strict";

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldItem = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.find");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.function.name");

var _rcui = require("@ringcentral-integration/rcui");

var _react = _interopRequireWildcard(require("react"));

var _timeFormatHelper = require("../../../lib/timeFormatHelper");

var _InputSelect = _interopRequireDefault(require("../../InputSelect"));

var _CustomArrowButton = require("../../Rcui/CustomArrowButton");

var _SelectList = require("../../SelectList");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var DEFAULT_FINDER = {
  getValue: function getValue(item) {
    return (_typeof(item) === 'object' ? item.id : item) || null;
  },
  searchOption: function searchOption(option, text) {
    return option.name && option.name.toLowerCase().includes(text.toLowerCase());
  }
};
var appDefaultValue = '[None]';

var FieldItem =
/*#__PURE__*/
function (_Component) {
  _inherits(FieldItem, _Component);

  function FieldItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FieldItem);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FieldItem)).call.apply(_getPrototypeOf2, [this].concat(_args)));

    _this.renderReference = function () {
      var _this$props = _this.props,
          _this$props$fieldOpti = _this$props.fieldOption,
          label = _this$props$fieldOpti.label,
          value = _this$props$fieldOpti.value,
          currentDisabled = _this$props$fieldOpti.disabled,
          fieldOnChange = _this$props$fieldOpti.onChange,
          onSave = _this$props.onSave,
          onSelectViewVisible = _this$props.onSelectViewVisible,
          contactSearch = _this$props.contactSearch;
      var _this$props2 = _this.props,
          currentLog = _this$props2.currentLog,
          startAdornmentRender = _this$props2.startAdornmentRender,
          referenceFieldOptions = _this$props2.referenceFieldOptions,
          currentLocale = _this$props2.currentLocale,
          showFoundFromServer = _this$props2.showFoundFromServer;
      var task = currentLog.task,
          phoneNumber = currentLog.currentLogCall.phoneNumber;
      var referenceFieldOption = referenceFieldOptions[value];

      if (!referenceFieldOption) {
        console.warn("Reference field \"".concat(value, "\" requires options in renderEditLogSection"));
        return;
      }

      var getLabel = referenceFieldOption.getLabel,
          _getValue = referenceFieldOption.getValue,
          onChange = referenceFieldOption.onChange,
          _referenceFieldOption = referenceFieldOption.metadata,
          metadata = _referenceFieldOption === void 0 ? {} : _referenceFieldOption,
          rightIconRender = referenceFieldOption.rightIconRender,
          matchedEntitiesGetter = referenceFieldOption.matchedEntitiesGetter,
          otherEntitiesGetter = referenceFieldOption.otherEntitiesGetter,
          associatedEntitiesGetter = referenceFieldOption.associatedEntitiesGetter,
          shouldShowAssociatedSection = referenceFieldOption.shouldShowAssociatedSection,
          _referenceFieldOption2 = referenceFieldOption.shouldDisable,
          shouldDisable = _referenceFieldOption2 === void 0 ? function () {
        return false;
      } : _referenceFieldOption2,
          _referenceFieldOption3 = referenceFieldOption.disableReason,
          disableReason = _referenceFieldOption3 === void 0 ? '' : _referenceFieldOption3,
          currentOptionFinder = referenceFieldOption.currentOptionFinder,
          _searchOptionFinder = referenceFieldOption.searchOptionFinder,
          foundFromServerEntityGetter = referenceFieldOption.foundFromServerEntityGetter;
      var matchedEntities = matchedEntitiesGetter(currentLog);
      var otherEntities = otherEntitiesGetter(currentLog);
      var foundFromServerEntities = typeof foundFromServerEntityGetter === 'function' ? foundFromServerEntityGetter(currentLog) : [];
      var showAssociatedSection = shouldShowAssociatedSection ? shouldShowAssociatedSection(currentLog) : false;
      var associatedEntities = showAssociatedSection && associatedEntitiesGetter ? associatedEntitiesGetter(currentLog) : [];
      var getValue = _getValue || DEFAULT_FINDER.getValue;
      var searchOptionFinder = _searchOptionFinder || DEFAULT_FINDER.searchOption;
      var currentOption = [].concat(_toConsumableArray(matchedEntities), _toConsumableArray(otherEntities), _toConsumableArray(associatedEntities), _toConsumableArray(foundFromServerEntities)).find(currentOptionFinder(task));
      var disabled = currentDisabled || shouldDisable(task);
      var title = metadata.title || label;
      var rightIcon = rightIconRender ? rightIconRender(phoneNumber) : undefined;
      return _react["default"].createElement(_SelectList.SelectList, _extends({}, _this.props, {
        title: title,
        rightIcon: rightIcon,
        placeholder: metadata.placeholder,
        options: matchedEntities,
        otherOptions: otherEntities,
        associatedOptions: associatedEntities,
        showAssociatedSection: showAssociatedSection,
        startAdornment: startAdornmentRender,
        field: value,
        value: task[metadata.valueField] || '',
        onChange: function _callee(args) {
          return regeneratorRuntime.async(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return regeneratorRuntime.awrap(onChange(_this.props)(args));

                case 2:
                  _context.next = 4;
                  return regeneratorRuntime.awrap(onSave());

                case 4:
                  if (fieldOnChange) fieldOnChange(args);

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          });
        },
        onSelectViewVisible: onSelectViewVisible,
        valueFunction: getValue,
        renderFunction: getLabel,
        searchOption: searchOptionFinder,
        disabled: disabled,
        currentLocale: currentLocale,
        foundFromServerEntities: foundFromServerEntities,
        contactSearch: contactSearch,
        showFoundFromServer: showFoundFromServer
      }), _this.renderTextField({
        disabled: disabled,
        title: title,
        dataSign: value,
        disableReason: disableReason,
        value: getLabel(currentOption, matchedEntities.length, currentLog)
      }));
    };

    _this.renderInput = function () {
      var _this$props3 = _this.props,
          _this$props3$fieldOpt = _this$props3.fieldOption,
          label = _this$props3$fieldOpt.label,
          value = _this$props3$fieldOpt.value,
          type = _this$props3$fieldOpt.type,
          required = _this$props3$fieldOpt.required,
          onSave = _this$props3.onSave;
      return _react["default"].createElement(_utils.LogFieldsInput, {
        label: label,
        type: type === 'string' ? 'text' : 'number',
        required: required,
        placeholder: label,
        value: _this.currentValue || '',
        "data-sign": value,
        onChange: function onChange(args) {
          return _this._updateValue(value, args, onSave);
        }
      });
    };

    _this.renderTextArea = function () {
      var _this$props4 = _this.props,
          _this$props4$fieldOpt = _this$props4.fieldOption,
          label = _this$props4$fieldOpt.label,
          value = _this$props4$fieldOpt.value,
          error = _this$props4$fieldOpt.error,
          helperText = _this$props4$fieldOpt.helperText,
          required = _this$props4$fieldOpt.required,
          _onChange = _this$props4$fieldOpt.onChange,
          onSave = _this$props4.onSave;
      return _react["default"].createElement(_utils.LogFieldsInput, {
        label: label,
        required: required,
        error: error,
        helperText: helperText,
        placeholder: label,
        "data-sign": value,
        multiline: true,
        value: _this.currentValue || '',
        onChange: function onChange(text) {
          _this._updateValue(value, text, onSave);

          if (_onChange) _onChange(text);
        }
      });
    };

    _this.renderDatePicker = function () {
      var _this$props5 = _this.props,
          _this$props5$fieldOpt = _this$props5.fieldOption,
          label = _this$props5$fieldOpt.label,
          fieldValue = _this$props5$fieldOpt.value,
          required = _this$props5$fieldOpt.required,
          onSave = _this$props5.onSave;
      var fieldSize = _this.props.fieldSize;
      var date = _this.currentValue ? new Date(_this.currentValue) : null;
      return _react["default"].createElement(_rcui.RcDatePicker, {
        fullWidth: true,
        size: fieldSize,
        "data-sign": fieldValue,
        required: required,
        label: label,
        date: date,
        onChange: function _callee2(value) {
          var timeStamp;
          return regeneratorRuntime.async(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  timeStamp = (0, _timeFormatHelper.setUTCTime)(value);
                  _context2.next = 3;
                  return regeneratorRuntime.awrap(_this.onInputSelectChange(fieldValue)(timeStamp));

                case 3:
                  _context2.next = 5;
                  return regeneratorRuntime.awrap(onSave);

                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          });
        },
        formatString: "MM/DD/YYYY"
      });
    };

    _this.renderSubjectField = function () {
      var _this$props6 = _this.props,
          _this$props6$currentL = _this$props6.currentLog,
          task = _this$props6$currentL.task,
          subjectPicklist = _this$props6$currentL.subjectPicklist,
          subjectDropdownsTracker = _this$props6.subjectDropdownsTracker,
          timeout = _this$props6.timeout;
      var _this$props7 = _this.props,
          required = _this$props7.fieldOption.required,
          onSave = _this$props7.onSave;
      return _react["default"].createElement(_InputSelect["default"], {
        required: required,
        subjectPicklist: subjectPicklist,
        subject: task.subject || '',
        onChange: _this.onInputSelectChange('subject'),
        onSelectOption: subjectDropdownsTracker,
        onSave: onSave,
        timeout: timeout
      });
    };

    _this.renderSelectMenu = function () {
      var _this$props8 = _this.props,
          _this$props8$fieldOpt = _this$props8.fieldOption,
          label = _this$props8$fieldOpt.label,
          fieldValue = _this$props8$fieldOpt.value,
          picklistOptions = _this$props8$fieldOpt.picklistOptions,
          required = _this$props8$fieldOpt.required,
          defaultValue = _this$props8$fieldOpt.defaultValue,
          helperText = _this$props8$fieldOpt.helperText,
          error = _this$props8$fieldOpt.error,
          onChange = _this$props8$fieldOpt.onChange,
          onSave = _this$props8.onSave;
      var selectList = (picklistOptions || []).map(function (item) {
        var value = item;
        var label = item !== null ? item : defaultValue || appDefaultValue;

        if (item instanceof Object) {
          value = item.value;
          label = item.label;
        }

        return {
          label: label,
          value: value
        };
      });
      return _react["default"].createElement(_rcui.RcLineSelect, {
        "data-sign": fieldValue,
        SelectProps: {
          classes: {
            icon: _styles["default"].select
          }
        },
        fullWidth: true,
        helperText: helperText,
        error: error,
        required: required,
        label: label,
        value: _this.currentValue || defaultValue || '',
        onChange: function _callee3(_ref) {
          var value;
          return regeneratorRuntime.async(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  value = _ref.target.value;

                  if (picklistOptions[value]) {
                    value = picklistOptions[value].value;
                  }

                  _context3.next = 4;
                  return regeneratorRuntime.awrap(_this.onInputSelectChange(fieldValue)(value));

                case 4:
                  _context3.next = 6;
                  return regeneratorRuntime.awrap(onSave());

                case 6:
                  if (onChange) onChange(value);

                case 7:
                case "end":
                  return _context3.stop();
              }
            }
          });
        }
      }, selectList.map(function (item, i) {
        return _react["default"].createElement(_rcui.RcMenuItem, {
          key: i,
          value: "".concat(item.value),
          "data-sign": "option".concat(i),
          classes: {
            root: _styles["default"].item
          }
        }, item.label);
      }));
    };

    _this.onInputSelectChange = function (value) {
      return function _callee4(item) {
        var _this$props9, _this$props9$currentL, currentSessionId, _this$props9$currentL2, task, onUpdateCallLog, customInputDataStruct, defaultLogData, logData;

        return regeneratorRuntime.async(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this$props9 = _this.props, _this$props9$currentL = _this$props9.currentLog, currentSessionId = _this$props9$currentL.currentSessionId, _this$props9$currentL2 = _this$props9$currentL.task, task = _this$props9$currentL2 === void 0 ? {} : _this$props9$currentL2, onUpdateCallLog = _this$props9.onUpdateCallLog, customInputDataStruct = _this$props9.customInputDataStruct;
                defaultLogData = {
                  isSaved: false,
                  task: _defineProperty({}, value, item || '')
                };
                logData = customInputDataStruct && customInputDataStruct({
                  value: value,
                  item: item,
                  task: task,
                  currentSessionId: currentSessionId
                }) || defaultLogData;
                _context4.next = 5;
                return regeneratorRuntime.awrap(onUpdateCallLog(logData, currentSessionId));

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        });
      };
    };

    _this.fieldsRenderMap = {
      reference: _this.renderReference,
      picklist: _this.renderSelectMenu,
      textarea: _this.renderTextArea,
      date: _this.renderDatePicker,
      string: _this.renderInput,
      integer: _this.renderInput,
      "double": _this.renderInput,
      combobox: _this.renderSubjectField
    };
    return _this;
  }

  _createClass(FieldItem, [{
    key: "renderTextField",
    value: function renderTextField(_ref2) {
      var disabled = _ref2.disabled,
          title = _ref2.title,
          dataSign = _ref2.dataSign,
          value = _ref2.value,
          disableReason = _ref2.disableReason;
      return _react["default"].createElement(_rcui.RcTextField, {
        title: value,
        disabled: disabled,
        "data-sign": dataSign,
        InputProps: {
          classes: {
            input: _styles["default"].customTextField
          },
          readOnly: true,
          endAdornment: this.getRightButtons(disabled)
        },
        helperText: disableReason,
        label: title,
        value: value || '',
        fullWidth: true,
        clearBtn: false
      });
    }
  }, {
    key: "_updateValue",
    value: function _updateValue(value, args, onSave) {
      var debounce = this.props.debounce;
      this.onInputSelectChange(value)(args);
      debounce(onSave);
    }
  }, {
    key: "getRightButtons",
    value: function getRightButtons(disabled) {
      return _react["default"].createElement(_CustomArrowButton.CustomArrowButton, {
        disabled: disabled
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$fieldOpti2 = this.props.fieldOption,
          value = _this$props$fieldOpti2.value,
          type = _this$props$fieldOpti2.type;

      if (this.fieldsRenderMap[type]) {
        return _react["default"].createElement("div", {
          "data-sign": "callLogField",
          className: _styles["default"].row
        }, this.fieldsRenderMap[type]());
      }

      console.warn("Not support field type '".concat(type, "' on ").concat(value, "."));
      return null;
    }
  }, {
    key: "currentValue",
    get: function get() {
      var value = this.props.fieldOption.value;
      var task = this.props.currentLog.task;
      return task[value];
    } // this is click to new popup window page

  }]);

  return FieldItem;
}(_react.Component);

exports.FieldItem = FieldItem;
//# sourceMappingURL=FieldItem.js.map
