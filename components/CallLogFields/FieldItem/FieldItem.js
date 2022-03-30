"use strict";

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldItem = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.find");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.function.name");

var _react = _interopRequireWildcard(require("react"));

var _DatePicker = require("@ringcentral/juno/es6/components/Forms/Picker/DatePicker/DatePicker.js");

var _Typography = require("@ringcentral/juno/es6/components/Typography/Typography.js");

var _timeFormatHelper = require("../../../lib/timeFormatHelper");

var _InputSelect = _interopRequireDefault(require("../../InputSelect"));

var _FullSelectField = require("./FullSelectField");

var _LogFieldsInput = require("./LogFieldsInput");

var _RadioField = require("./RadioField");

var _SelectField = require("./SelectField");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var DEFAULT_FINDER = {
  getValue: function getValue(item) {
    return (_typeof(item) === 'object' ? item.id : item) || null;
  },
  searchOption: function searchOption(option, text) {
    return option.name && option.name.toLowerCase().includes(text.toLowerCase());
  }
};
var appDefaultValue = '[None]';

var FieldItem = /*#__PURE__*/function (_Component) {
  _inherits(FieldItem, _Component);

  var _super = _createSuper(FieldItem);

  function FieldItem() {
    var _this;

    _classCallCheck(this, FieldItem);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(_args));
    _this.fieldItemRef = _this.props.fieldRef || /*#__PURE__*/_react["default"].createRef();

    _this.renderReference = function () {
      var _this$props = _this.props,
          _this$props$fieldOpti = _this$props.fieldOption,
          label = _this$props$fieldOpti.label,
          value = _this$props$fieldOpti.value,
          currentDisabled = _this$props$fieldOpti.disabled,
          fieldOnChange = _this$props$fieldOpti.onChange,
          onlyShowInMultipleMatches = _this$props$fieldOpti.onlyShowInMultipleMatches,
          showOtherSection = _this$props$fieldOpti.showOtherSection,
          showFoundFromServer = _this$props$fieldOpti.showFoundFromServer,
          onSave = _this$props.onSave,
          onSelectViewVisible = _this$props.onSelectViewVisible,
          contactSearch = _this$props.contactSearch,
          onFullSelectFieldClick = _this$props.onFullSelectFieldClick,
          currentLog = _this$props.currentLog,
          startAdornmentRender = _this$props.startAdornmentRender,
          referenceFieldOptions = _this$props.referenceFieldOptions,
          currentLocale = _this$props.currentLocale,
          disabled = _this$props.disabled;
      var task = currentLog.task,
          _currentLog$currentLo = currentLog.currentLogCall;
      _currentLog$currentLo = _currentLog$currentLo === void 0 ? {} : _currentLog$currentLo;
      var phoneNumber = _currentLog$currentLo.phoneNumber;
      var referenceFieldOption = referenceFieldOptions[value];

      if (!referenceFieldOption) {
        console.warn("Reference field \"".concat(value, "\" requires options in renderEditLogSection"));
        return;
      }

      var getLabel = referenceFieldOption.getLabel,
          getSelectedOptionLabel = referenceFieldOption.getSelectedOptionLabel,
          getType = referenceFieldOption.getType,
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
          foundFromServerEntityGetter = referenceFieldOption.foundFromServerEntityGetter,
          onBackClick = referenceFieldOption.onBackClick,
          backHeaderClassName = referenceFieldOption.backHeaderClassName,
          multiple = referenceFieldOption.multiple;
      var matchedEntities = matchedEntitiesGetter(currentLog);

      if (onlyShowInMultipleMatches && matchedEntities.length <= 1) {
        return;
      }

      var otherEntities = otherEntitiesGetter(currentLog);
      var foundFromServerEntities = typeof foundFromServerEntityGetter === 'function' ? foundFromServerEntityGetter(currentLog) : [];
      var showAssociatedSection = shouldShowAssociatedSection ? shouldShowAssociatedSection(currentLog) : false;
      var associatedEntities = showAssociatedSection && associatedEntitiesGetter ? associatedEntitiesGetter(currentLog) : [];
      var getValue = _getValue || DEFAULT_FINDER.getValue;
      var searchOptionFinder = _searchOptionFinder || DEFAULT_FINDER.searchOption;
      var currentOption = [].concat(_toConsumableArray(matchedEntities), _toConsumableArray(otherEntities), _toConsumableArray(associatedEntities), _toConsumableArray(foundFromServerEntities)).find(currentOptionFinder(task));
      var disabledReference = currentDisabled || shouldDisable(task) || disabled;
      var title = metadata.title || label;
      var rightIcon = rightIconRender ? rightIconRender(phoneNumber) : undefined;
      var currentValue = getSelectedOptionLabel && getSelectedOptionLabel(currentOption, matchedEntities.length, currentLog) || getLabel(currentOption, matchedEntities.length, currentLog) || '';
      return /*#__PURE__*/_react["default"].createElement(_FullSelectField.FullSelectField, _extends({}, _this.props, {
        backHeaderClassName: backHeaderClassName,
        onBackClick: onBackClick,
        title: title,
        rightIcon: rightIcon,
        placeholder: metadata.placeholder,
        options: matchedEntities,
        otherOptions: otherEntities,
        associatedOptions: associatedEntities,
        showOtherSection: showOtherSection,
        showAssociatedSection: showAssociatedSection,
        startAdornment: startAdornmentRender,
        field: value,
        value: task[metadata.valueField] || '',
        onChange: /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(args) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return onChange(_this.props)(args);

                  case 2:
                    _context.next = 4;
                    return onSave();

                  case 4:
                    if (fieldOnChange) fieldOnChange(args);

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }(),
        onSelectViewVisible: onSelectViewVisible,
        onFullSelectFieldClick: onFullSelectFieldClick,
        valueFunction: getValue,
        renderFunction: getLabel,
        secondaryRenderFunction: getType,
        searchOption: searchOptionFinder,
        disabled: disabledReference,
        currentLocale: currentLocale,
        foundFromServerEntities: foundFromServerEntities,
        contactSearch: contactSearch,
        showFoundFromServer: showFoundFromServer,
        TextFieldProps: {
          helperText: disableReason,
          value: currentValue
        },
        multiple: multiple
      }));
    };

    _this.renderInput = function () {
      var _this$currentValue;

      var _this$props2 = _this.props,
          _this$props2$fieldOpt = _this$props2.fieldOption,
          label = _this$props2$fieldOpt.label,
          value = _this$props2$fieldOpt.value,
          type = _this$props2$fieldOpt.type,
          required = _this$props2$fieldOpt.required,
          onSave = _this$props2.onSave;
      return /*#__PURE__*/_react["default"].createElement(_LogFieldsInput.LogFieldsInput, {
        label: label,
        type: type === 'string' ? 'text' : 'number',
        required: required,
        placeholder: label,
        value: (_this$currentValue = _this.currentValue) !== null && _this$currentValue !== void 0 ? _this$currentValue : '',
        "data-sign": value,
        onChange: function onChange(args) {
          return _this._updateValue(value, args, onSave);
        }
      });
    };

    _this.renderTextArea = function () {
      var _this$props3 = _this.props,
          _this$props3$fieldOpt = _this$props3.fieldOption,
          label = _this$props3$fieldOpt.label,
          value = _this$props3$fieldOpt.value,
          error = _this$props3$fieldOpt.error,
          helperText = _this$props3$fieldOpt.helperText,
          required = _this$props3$fieldOpt.required,
          _onChange = _this$props3$fieldOpt.onChange,
          disabled = _this$props3$fieldOpt.disabled,
          onSave = _this$props3.onSave,
          onTextAreaFocus = _this$props3.onTextAreaFocus;
      return /*#__PURE__*/_react["default"].createElement(_LogFieldsInput.LogFieldsInput, {
        label: label,
        required: required,
        error: error,
        helperText: helperText,
        placeholder: label,
        "data-sign": value,
        multiline: true,
        disabled: disabled,
        value: _this.currentValue || '',
        onChange: function onChange(text) {
          _this._updateValue(value, text, onSave);

          if (_onChange) _onChange(text);
        },
        onFocus: onTextAreaFocus
      });
    };

    _this.renderDatePicker = function () {
      var _this$props4 = _this.props,
          _this$props4$fieldOpt = _this$props4.fieldOption,
          label = _this$props4$fieldOpt.label,
          fieldValue = _this$props4$fieldOpt.value,
          required = _this$props4$fieldOpt.required,
          onSave = _this$props4.onSave;
      var fieldSize = _this.props.fieldSize;
      var date = _this.currentValue ? (0, _timeFormatHelper.getDateFromUTCDay)(_this.currentValue) : null;
      return /*#__PURE__*/_react["default"].createElement(_DatePicker.RcDatePicker, {
        fullWidth: true,
        size: fieldSize,
        "data-sign": fieldValue,
        required: required,
        label: label,
        value: date,
        onChange: /*#__PURE__*/function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value) {
            var timeStamp;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    timeStamp = value ? (0, _timeFormatHelper.setUTCTime)(value) : value;
                    _context2.next = 3;
                    return _this.onInputSelectChange(fieldValue)(timeStamp);

                  case 3:
                    _context2.next = 5;
                    return onSave();

                  case 5:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          return function (_x2) {
            return _ref2.apply(this, arguments);
          };
        }(),
        formatString: "MM/DD/YYYY"
      });
    };

    _this.renderSubjectField = function () {
      var _this$props5 = _this.props,
          _this$props5$currentL = _this$props5.currentLog,
          task = _this$props5$currentL.task,
          subjectPicklist = _this$props5$currentL.subjectPicklist,
          subjectDropdownsTracker = _this$props5.subjectDropdownsTracker,
          timeout = _this$props5.timeout;
      var _this$props6 = _this.props,
          _this$props6$fieldOpt = _this$props6.fieldOption,
          required = _this$props6$fieldOpt.required,
          label = _this$props6$fieldOpt.label,
          onSave = _this$props6.onSave;
      return /*#__PURE__*/_react["default"].createElement(_InputSelect["default"], {
        required: required,
        subjectPicklist: subjectPicklist,
        subject: task.subject || '',
        label: label,
        onChange: _this.onInputSelectChange('subject'),
        onSelectOption: subjectDropdownsTracker,
        onSave: onSave,
        timeout: timeout
      });
    };

    _this.renderSelectMenu = function () {
      var _this$props7 = _this.props,
          _this$props7$fieldOpt = _this$props7.fieldOption,
          label = _this$props7$fieldOpt.label,
          fieldValue = _this$props7$fieldOpt.value,
          picklistOptions = _this$props7$fieldOpt.picklistOptions,
          required = _this$props7$fieldOpt.required,
          helperText = _this$props7$fieldOpt.helperText,
          error = _this$props7$fieldOpt.error,
          onChange = _this$props7$fieldOpt.onChange,
          _this$props7$fieldOpt2 = _this$props7$fieldOpt.disabled,
          propsDisabled = _this$props7$fieldOpt2 === void 0 ? false : _this$props7$fieldOpt2,
          placeholder = _this$props7$fieldOpt.placeholder,
          onSave = _this$props7.onSave,
          _this$props7$onSelect = _this$props7.onSelectListOpen,
          onSelectListOpen = _this$props7$onSelect === void 0 ? function () {} : _this$props7$onSelect;
      var selectList = (picklistOptions || []).map(function (item) {
        var value = item;
        var label = item !== null ? item : appDefaultValue;
        var disabled = false;
        var title;

        if (item instanceof Object) {
          value = item.value;
          label = item.label;
          disabled = item.disabled;
          title = item === null || item === void 0 ? void 0 : item.title;
        }

        return {
          label: label,
          value: value,
          disabled: disabled,
          title: title
        };
      });
      return /*#__PURE__*/_react["default"].createElement(_SelectField.SelectField, {
        "data-sign": fieldValue,
        labelClassName: _styles["default"].selectLabel,
        disabled: propsDisabled,
        placeholder: placeholder,
        fullWidth: true,
        helperText: helperText,
        error: error,
        required: required,
        label: label,
        value: _this.currentValue,
        onChange: /*#__PURE__*/function () {
          var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref3) {
            var value;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    value = _ref3.target.value;

                    if (picklistOptions[value]) {
                      value = picklistOptions[value].value;
                    }

                    _context3.next = 4;
                    return _this.onInputSelectChange(fieldValue)(value);

                  case 4:
                    _context3.next = 6;
                    return onSave();

                  case 6:
                    if (onChange) onChange(value);

                  case 7:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          return function (_x3) {
            return _ref4.apply(this, arguments);
          };
        }(),
        options: selectList,
        onOpen: function onOpen() {
          return onSelectListOpen(fieldValue);
        }
      });
    };

    _this.renderRadio = function () {
      var _task$tickets, _task$matches;

      var _this$props8 = _this.props,
          _this$props8$fieldOpt = _this$props8.fieldOption,
          picklistOptions = _this$props8$fieldOpt.picklistOptions,
          label = _this$props8$fieldOpt.label,
          currentLog = _this$props8.currentLog,
          disableAllFields = _this$props8.disabled;
      var task = currentLog.task,
          disableSaveLog = currentLog.disableSaveLog;
      var options = [{
        value: picklistOptions[0].value,
        label: picklistOptions[0].label,
        disabled: disableAllFields || disableSaveLog
      }, {
        value: picklistOptions[1].value,
        label: picklistOptions[1].label,
        disabled: !!(!task.tickets || ((_task$tickets = task.tickets) === null || _task$tickets === void 0 ? void 0 : _task$tickets.length) === 0 || ((_task$matches = task.matches) === null || _task$matches === void 0 ? void 0 : _task$matches.length) > 1 && !task.whoid || disableAllFields)
      }];
      var defaultOption = task.option || picklistOptions[0].value;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Typography.RcTypography, {
        color: "inherit",
        variant: "caption2",
        component: "div",
        className: _styles["default"].radioLabel
      }, label), /*#__PURE__*/_react["default"].createElement(_RadioField.RadioField, {
        value: defaultOption,
        options: options,
        onChange: _this.onRadioChange,
        classes: {
          root: _styles["default"].radio
        }
      }));
    };

    _this.onRadioChange = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(event, value) {
        var _task$tickets$;

        var _this$props9, currentLog, onUpdateCallLog, currentSessionId, _currentLog$task, task;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this$props9 = _this.props, currentLog = _this$props9.currentLog, onUpdateCallLog = _this$props9.onUpdateCallLog;
                currentSessionId = currentLog.currentSessionId, _currentLog$task = currentLog.task, task = _currentLog$task === void 0 ? {} : _currentLog$task;
                _context4.next = 4;
                return onUpdateCallLog(_objectSpread(_objectSpread({}, currentLog), {}, {
                  task: _objectSpread(_objectSpread({}, task), {}, {
                    option: value,
                    ticketId: task.ticketId || ((_task$tickets$ = task.tickets[0]) === null || _task$tickets$ === void 0 ? void 0 : _task$tickets$.id)
                  })
                }), currentSessionId);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x4, _x5) {
        return _ref5.apply(this, arguments);
      };
    }();

    _this.renderTicketSelectList = function () {
      var _task$tickets2;

      var _this$props10 = _this.props,
          currentLog = _this$props10.currentLog,
          fieldOption = _this$props10.fieldOption,
          disabled = _this$props10.disabled;
      var renderCondition = fieldOption.renderCondition,
          label = fieldOption.label;
      var task = currentLog.task; // TODO: consider move this logic to zendesk

      if (task.option !== renderCondition || ((_task$tickets2 = task.tickets) === null || _task$tickets2 === void 0 ? void 0 : _task$tickets2.length) === 0) {
        return null;
      }

      var options = task.tickets && task.tickets.length > 0 ? task.tickets.map(function (ticket) {
        return {
          value: ticket.id,
          label: "#".concat(ticket.id, " ").concat(ticket.subject),
          title: "#".concat(ticket.id, " ").concat(ticket.subject)
        };
      }) : [];
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].ticketSelectList
      }, /*#__PURE__*/_react["default"].createElement(_SelectField.SelectField, {
        labelClassName: _styles["default"].selectLabel,
        options: options,
        fullWidth: true,
        disabled: options.length === 0 || disabled,
        value: task.ticketId,
        label: label,
        onChange: function onChange(event) {
          return _this.onSelectChange(event);
        }
      }));
    };

    _this.onSelectChange = function (event) {
      var value = event.target.value;
      var _this$props11 = _this.props,
          currentLog = _this$props11.currentLog,
          onUpdateCallLog = _this$props11.onUpdateCallLog;
      var currentSessionId = currentLog.currentSessionId,
          _currentLog$task2 = currentLog.task,
          task = _currentLog$task2 === void 0 ? {} : _currentLog$task2;
      onUpdateCallLog(_objectSpread(_objectSpread({}, currentLog), {}, {
        task: _objectSpread(_objectSpread({}, task), {}, {
          ticketId: value
        })
      }), currentSessionId);
    };

    _this.onInputSelectChange = function (value) {
      return /*#__PURE__*/function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(item) {
          var _this$props12, _this$props12$current, currentSessionId, _this$props12$current2, task, onUpdateCallLog, customInputDataStruct, defaultLogData, logData;

          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _this$props12 = _this.props, _this$props12$current = _this$props12.currentLog, currentSessionId = _this$props12$current.currentSessionId, _this$props12$current2 = _this$props12$current.task, task = _this$props12$current2 === void 0 ? {} : _this$props12$current2, onUpdateCallLog = _this$props12.onUpdateCallLog, customInputDataStruct = _this$props12.customInputDataStruct;
                  defaultLogData = {
                    isSaved: false,
                    task: _defineProperty({}, value, item)
                  };
                  logData = customInputDataStruct && customInputDataStruct({
                    value: value,
                    item: item,
                    task: task,
                    currentSessionId: currentSessionId
                  }) || defaultLogData;
                  _context5.next = 5;
                  return onUpdateCallLog(logData, currentSessionId);

                case 5:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        return function (_x6) {
          return _ref6.apply(this, arguments);
        };
      }();
    };

    _this.fieldsRenderMap = {
      reference: _this.renderReference,
      picklist: _this.renderSelectMenu,
      textarea: _this.renderTextArea,
      date: _this.renderDatePicker,
      string: _this.renderInput,
      integer: _this.renderInput,
      "double": _this.renderInput,
      "long": _this.renderInput,
      combobox: _this.renderSubjectField,
      radio: _this.renderRadio,
      ticketSelectList: _this.renderTicketSelectList
    };
    return _this;
  }

  _createClass(FieldItem, [{
    key: "_updateValue",
    value: function _updateValue(value, args, onSave) {
      var debounce = this.props.debounce;
      this.onInputSelectChange(value)(args);
      debounce(onSave);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props13 = this.props,
          _this$props13$fieldOp = _this$props13.fieldOption,
          value = _this$props13$fieldOp.value,
          type = _this$props13$fieldOp.type,
          error = _this$props13$fieldOp.error,
          enableScrollError = _this$props13$fieldOp.enableScrollError,
          editSectionScrollBy = _this$props13.editSectionScrollBy;

      if (this.fieldsRenderMap[type] && this.fieldsRenderMap[type]()) {
        if (error && enableScrollError && this.fieldItemRef.current) {
          editSectionScrollBy(this.fieldItemRef.current.offsetTop);
        }

        return /*#__PURE__*/_react["default"].createElement("div", {
          ref: this.fieldItemRef // TODO: replace it with new-Data-sign
          ,
          "data-sign": "callLogField",
          "new-data-sign": "".concat(value, "-field"),
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
    } // eslint-disable-next-line react/destructuring-assignment

  }]);

  return FieldItem;
}(_react.Component);

exports.FieldItem = FieldItem;
//# sourceMappingURL=FieldItem.js.map
