"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.iterator");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.reduce");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.to-string");
require("core-js/modules/es.string.includes");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldItem = exports.DEFAULT_FINDER = void 0;
require("regenerator-runtime/runtime");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _timeFormatHelper = require("../../../lib/timeFormatHelper");
var _InputSelect = _interopRequireDefault(require("../../InputSelect"));
var _FullSelectField = require("./FullSelectField");
var _LogFieldsInput = require("./LogFieldsInput");
var _RadioField = require("./RadioField");
var _SelectField = require("./SelectField");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var DEFAULT_FINDER = {
  getValue: function getValue(item) {
    return (_typeof(item) === 'object' ? item.id : item) || null;
  },
  searchOption: function searchOption(option, text) {
    return option.name && option.name.toLowerCase().includes(text.toLowerCase());
  }
};
exports.DEFAULT_FINDER = DEFAULT_FINDER;
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
    // eslint-disable-next-line react/destructuring-assignment
    _this.fieldItemRef = _this.props.fieldRef || /*#__PURE__*/_react["default"].createRef();
    // this is click to new popup window page
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
        disabled = _this$props.disabled; // @ts-expect-error TS(2339): Property 'task' does not exist on type 'CallLog | ... Remove this comment to see the full error message
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
        multiple = referenceFieldOption.multiple; // @ts-expect-error TS(2345): Argument of type 'CallLog | undefined' is not assi... Remove this comment to see the full error message
      var matchedEntities = matchedEntitiesGetter(currentLog);
      if (onlyShowInMultipleMatches && matchedEntities.length <= 1) {
        return;
      }
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      var otherEntities = otherEntitiesGetter(currentLog);
      var foundFromServerEntities = typeof foundFromServerEntityGetter === 'function' ?
      // @ts-expect-error TS(2345): Argument of type 'CallLog | undefined' is not assi... Remove this comment to see the full error message
      foundFromServerEntityGetter(currentLog) : [];
      var showAssociatedSection = shouldShowAssociatedSection ?
      // @ts-expect-error TS(2345): Argument of type 'CallLog | undefined' is not assi... Remove this comment to see the full error message
      shouldShowAssociatedSection(currentLog) : false;
      var associatedEntities = showAssociatedSection && associatedEntitiesGetter ?
      // @ts-expect-error TS(2345): Argument of type 'CallLog | undefined' is not assi... Remove this comment to see the full error message
      associatedEntitiesGetter(currentLog) : [];
      var getValue = _getValue || DEFAULT_FINDER.getValue;
      var searchOptionFinder = _searchOptionFinder || DEFAULT_FINDER.searchOption;
      var currentOption = [].concat(_toConsumableArray(matchedEntities), _toConsumableArray(otherEntities), _toConsumableArray(associatedEntities), _toConsumableArray(foundFromServerEntities)).find(currentOptionFinder(task));
      var disabledReference = currentDisabled || shouldDisable(task, currentLog === null || currentLog === void 0 ? void 0 : currentLog.call) || disabled;
      var title = metadata.title || label;
      var rightIcon = rightIconRender ? rightIconRender(phoneNumber) : undefined;
      var currentValue = getSelectedOptionLabel && getSelectedOptionLabel(currentOption, matchedEntities.length, currentLog) || getLabel(currentOption, matchedEntities.length, currentLog) || '';
      return /*#__PURE__*/_react["default"].createElement(_FullSelectField.FullSelectField, _extends({}, _this.props, {
        backHeaderClassName: backHeaderClassName
        // @ts-expect-error TS(2322): Type '(() => void) | undefined' is not assignable ... Remove this comment to see the full error message
        ,
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
        onChange: ( /*#__PURE__*/function () {
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
        }()),
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
      return /*#__PURE__*/_react["default"].createElement(_juno.RcDatePicker, {
        fullWidth: true,
        size: fieldSize,
        "data-sign": fieldValue,
        required: required,
        label: label,
        value: date,
        onChange: ( /*#__PURE__*/function () {
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
        }()),
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
        controller = _this$props7$fieldOpt.controller,
        currentLog = _this$props7.currentLog,
        onSave = _this$props7.onSave,
        _this$props7$onSelect = _this$props7.onSelectListOpen,
        onSelectListOpen = _this$props7$onSelect === void 0 ? function () {} : _this$props7$onSelect;
      var selectList = (picklistOptions || []).reduce(function (acc, item) {
        if (item && _typeof(item) === 'object' && controller && (currentLog === null || currentLog === void 0 ? void 0 : currentLog.task) && item.validFor) {
          // check for field dependency and filter out options that are not valid
          if (!item.validFor.includes(currentLog.task[controller])) {
            return acc;
          }
        }
        var value = item;
        var label = item !== null ? item : appDefaultValue;
        var disabled = false;
        var title;
        if (item instanceof Object) {
          value = item.value;
          label = item.label;
          // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
          disabled = item.disabled;
          title = item === null || item === void 0 ? void 0 : item.title;
        }
        acc.push({
          label: label,
          value: value,
          disabled: disabled,
          title: title
        });
        return acc;
      }, []);
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
        onChange: ( /*#__PURE__*/function () {
          var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref3) {
            var value;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    value = _ref3.target.value;
                    if (Object.prototype.toString.call(picklistOptions) === '[object Object]' &&
                    // @ts-expect-error TS(2538): Type 'unknown' cannot be used as an index type.
                    picklistOptions[value]) {
                      // @ts-expect-error TS(2538): Type 'unknown' cannot be used as an index type.
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
        }()),
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
        disableAllFields = _this$props8.disabled; // @ts-expect-error TS(2339): Property 'task' does not exist on type 'CallLog | ... Remove this comment to see the full error message
      var task = currentLog.task,
        disableSaveLog = currentLog.disableSaveLog,
        disableUpdateLog = currentLog.disableUpdateLog;
      var options = [{
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        value: picklistOptions[0].value,
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        label: picklistOptions[0].label,
        disabled: disableAllFields || disableSaveLog
      }, {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        value: picklistOptions[1].value,
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        label: picklistOptions[1].label,
        disabled: !!(!task.tickets || ((_task$tickets = task.tickets) === null || _task$tickets === void 0 ? void 0 : _task$tickets.length) === 0 || ((_task$matches = task.matches) === null || _task$matches === void 0 ? void 0 : _task$matches.length) > 1 && !task.whoid || disableAllFields || disableUpdateLog)
      }];
      var defaultOption =
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      task.option || picklistOptions[0].value;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
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
                _this$props9 = _this.props, currentLog = _this$props9.currentLog, onUpdateCallLog = _this$props9.onUpdateCallLog; // @ts-expect-error TS(2339): Property 'currentSessionId' does not exist on type... Remove this comment to see the full error message
                currentSessionId = currentLog.currentSessionId, _currentLog$task = currentLog.task, task = _currentLog$task === void 0 ? {} : _currentLog$task; // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
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
    _this.renderAlert = function () {
      var _this$props10 = _this.props,
        label = _this$props10.fieldOption.label,
        currentLog = _this$props10.currentLog;
      if (!(currentLog === null || currentLog === void 0 ? void 0 : currentLog.shouldPromoteAlert)) {
        return;
      }
      return /*#__PURE__*/_react["default"].createElement(_juno.RcAlert, {
        icon: true
      }, label);
    };
    // this is the dropdown to render ticket lists
    _this.renderTicketSelectList = function () {
      var _task$tickets2;
      var _this$props11 = _this.props,
        currentLog = _this$props11.currentLog,
        fieldOption = _this$props11.fieldOption,
        disabled = _this$props11.disabled;
      var renderCondition = fieldOption.renderCondition,
        label = fieldOption.label; // @ts-expect-error TS(2339): Property 'task' does not exist on type 'CallLog | ... Remove this comment to see the full error message
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
        disabled: options.length === 0 || disabled || (currentLog === null || currentLog === void 0 ? void 0 : currentLog.disableUpdateLog),
        value: task.ticketId,
        label: label,
        onChange: function onChange(event) {
          return _this.onSelectChange(event);
        }
      }));
    };
    _this.onSelectChange = function (event) {
      var value = event.target.value;
      var _this$props12 = _this.props,
        currentLog = _this$props12.currentLog,
        onUpdateCallLog = _this$props12.onUpdateCallLog; // @ts-expect-error TS(2339): Property 'currentSessionId' does not exist on type... Remove this comment to see the full error message
      var currentSessionId = currentLog.currentSessionId,
        _currentLog$task2 = currentLog.task,
        task = _currentLog$task2 === void 0 ? {} : _currentLog$task2; // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      onUpdateCallLog(_objectSpread(_objectSpread({}, currentLog), {}, {
        task: _objectSpread(_objectSpread({}, task), {}, {
          ticketId: value
        })
      }), currentSessionId);
    };
    _this.onInputSelectChange = function (value) {
      return /*#__PURE__*/function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(item) {
          var _this$props13, _this$props13$current, currentSessionId, _this$props13$current2, task, onUpdateCallLog, customInputDataStruct, defaultLogData, logData;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _this$props13 = _this.props, _this$props13$current = _this$props13.currentLog, currentSessionId = _this$props13$current.currentSessionId, _this$props13$current2 = _this$props13$current.task, task = _this$props13$current2 === void 0 ? {} : _this$props13$current2, onUpdateCallLog = _this$props13.onUpdateCallLog, customInputDataStruct = _this$props13.customInputDataStruct;
                  defaultLogData = {
                    isSaved: false,
                    task: _defineProperty({}, value, item)
                  };
                  logData = customInputDataStruct && customInputDataStruct({
                    value: value,
                    item: item,
                    task: task,
                    currentSessionId: currentSessionId
                  }) || defaultLogData; // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2322): Type '() => JSX.Element | undefined' is not assign... Remove this comment to see the full error message
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
      alert: _this.renderAlert,
      // @ts-expect-error TS(2322): Type '() => JSX.Element | null' is not assignable ... Remove this comment to see the full error message
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
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function render() {
      var _this$props14 = this.props,
        _this$props14$fieldOp = _this$props14.fieldOption,
        value = _this$props14$fieldOp.value,
        type = _this$props14$fieldOp.type,
        error = _this$props14$fieldOp.error,
        enableScrollError = _this$props14$fieldOp.enableScrollError,
        editSectionScrollBy = _this$props14.editSectionScrollBy;
      if (this.fieldsRenderMap[type] && this.fieldsRenderMap[type]()) {
        if (error && enableScrollError && this.fieldItemRef.current) {
          // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          editSectionScrollBy(this.fieldItemRef.current.offsetTop);
        }
        return /*#__PURE__*/_react["default"].createElement("div", {
          ref: this.fieldItemRef
          // TODO: replace it with new-Data-sign
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
    }
  }]);
  return FieldItem;
}(_react.Component);
exports.FieldItem = FieldItem;
//# sourceMappingURL=FieldItem.js.map
