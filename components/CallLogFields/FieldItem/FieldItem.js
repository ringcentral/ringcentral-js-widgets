"use strict";

require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldItem = exports.DEFAULT_FINDER = void 0;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _timeFormatHelper = require("../../../lib/timeFormatHelper");
var _InputSelect = _interopRequireDefault(require("../../InputSelect"));
var _FullSelectField = require("./FullSelectField");
var _LogFieldsInput = require("./LogFieldsInput");
var _MultiSelectField = require("./MultiSelectField");
var _RadioField = require("./RadioField");
var _SelectField = require("./SelectField");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var DEFAULT_FINDER = exports.DEFAULT_FINDER = {
  getValue: function getValue(item) {
    return (_typeof(item) === 'object' ? item.id : item) || null;
  },
  searchOption: function searchOption(option, text) {
    return option.name && option.name.toLowerCase().includes(text.toLowerCase());
  }
};
var appDefaultValue = '[None]';
var FieldItem = exports.FieldItem = /*#__PURE__*/function (_Component) {
  function FieldItem() {
    var _this;
    _classCallCheck(this, FieldItem);
    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }
    _this = _callSuper(this, FieldItem, [].concat(_args));
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
        foundFromServerTitle = _this$props$fieldOpti.foundFromServerTitle,
        serverEntitiesClientFilter = _this$props$fieldOpti.serverEntitiesClientFilter,
        onSave = _this$props.onSave,
        onSelectViewVisible = _this$props.onSelectViewVisible,
        onFullSelectFieldClick = _this$props.onFullSelectFieldClick,
        currentLog = _this$props.currentLog,
        startAdornmentRender = _this$props.startAdornmentRender,
        referenceFieldOptions = _this$props.referenceFieldOptions,
        currentLocale = _this$props.currentLocale,
        disabled = _this$props.disabled;
      // @ts-expect-error TS(2339): Property 'task' does not exist on type 'CallLog | ... Remove this comment to see the full error message
      var task = currentLog.task,
        _currentLog$currentLo = currentLog.currentLogCall,
        _currentLog$currentLo2 = _currentLog$currentLo === void 0 ? {} : _currentLog$currentLo,
        phoneNumber = _currentLog$currentLo2.phoneNumber;
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
      // @ts-expect-error TS(2345): Argument of type 'CallLog | undefined' is not assi... Remove this comment to see the full error message
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
        onChange: (/*#__PURE__*/function () {
          var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(args) {
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  _context.n = 1;
                  return onChange(_this.props)(args);
                case 1:
                  _context.n = 2;
                  return onSave();
                case 2:
                  if (fieldOnChange) fieldOnChange(args);
                case 3:
                  return _context.a(2);
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
        serverEntitiesClientFilter: serverEntitiesClientFilter,
        showFoundFromServer: showFoundFromServer,
        foundFromServerTitle: foundFromServerTitle,
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
        onChange: (/*#__PURE__*/function () {
          var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(value) {
            var timeStamp;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  timeStamp = value ? (0, _timeFormatHelper.setUTCTime)(value) : value;
                  _context2.n = 1;
                  return _this.onInputSelectChange(fieldValue)(timeStamp);
                case 1:
                  _context2.n = 2;
                  return onSave();
                case 2:
                  return _context2.a(2);
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
      var _this$currentValue2;
      var isMultiSelect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$props7 = _this.props,
        _this$props7$fieldOpt = _this$props7.fieldOption,
        label = _this$props7$fieldOpt.label,
        fieldValue = _this$props7$fieldOpt.value,
        _this$props7$fieldOpt2 = _this$props7$fieldOpt.picklistOptions,
        picklistOptions = _this$props7$fieldOpt2 === void 0 ? [] : _this$props7$fieldOpt2,
        required = _this$props7$fieldOpt.required,
        helperText = _this$props7$fieldOpt.helperText,
        error = _this$props7$fieldOpt.error,
        onChange = _this$props7$fieldOpt.onChange,
        _this$props7$fieldOpt3 = _this$props7$fieldOpt.disabled,
        propsDisabled = _this$props7$fieldOpt3 === void 0 ? false : _this$props7$fieldOpt3,
        placeholder = _this$props7$fieldOpt.placeholder,
        controller = _this$props7$fieldOpt.controller,
        currentLog = _this$props7.currentLog,
        onSave = _this$props7.onSave,
        _this$props7$onSelect = _this$props7.onSelectListOpen,
        onSelectListOpen = _this$props7$onSelect === void 0 ? function () {} : _this$props7$onSelect;
      var uiValue = isMultiSelect ? (Array.isArray(_this.currentValue) ? _this.currentValue : (_this$currentValue2 = _this.currentValue) === null || _this$currentValue2 === void 0 ? void 0 : _this$currentValue2.split(';')) || [] : _this.currentValue;
      var selectList = (picklistOptions || []).reduce(function (acc, item) {
        if (item && _typeof(item) === 'object' && controller && (currentLog === null || currentLog === void 0 ? void 0 : currentLog.task) && item.validFor) {
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
          disabled = item.disabled || false;
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
      var handleSelectChange = /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(selectedValues) {
          var updatedValue;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                updatedValue = isMultiSelect ? selectedValues.join(';') : selectedValues;
                _this.onInputSelectChange(fieldValue)(updatedValue);
                if (onChange) onChange(updatedValue);
                _context3.n = 1;
                return onSave();
              case 1:
                return _context3.a(2);
            }
          }, _callee3);
        }));
        return function handleSelectChange(_x3) {
          return _ref3.apply(this, arguments);
        };
      }();
      if (isMultiSelect) {
        return /*#__PURE__*/_react["default"].createElement(_MultiSelectField.MultiSelectField, {
          "data-sign": fieldValue,
          label: label,
          options: selectList,
          value: uiValue,
          onChange: handleSelectChange,
          disabled: propsDisabled,
          placeholder: placeholder,
          helperText: helperText,
          error: error,
          required: required,
          onOpen: function onOpen() {
            return onSelectListOpen(fieldValue);
          }
        });
      }
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
        onChange: (/*#__PURE__*/function () {
          var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(_ref4) {
            var value;
            return _regenerator().w(function (_context4) {
              while (1) switch (_context4.n) {
                case 0:
                  value = _ref4.target.value;
                  if (Object.prototype.toString.call(picklistOptions) === '[object Object]' && typeof value === 'string' && picklistOptions[value]) {
                    value = picklistOptions[value].value;
                  }
                  _context4.n = 1;
                  return _this.onInputSelectChange(fieldValue)(value);
                case 1:
                  _context4.n = 2;
                  return onSave();
                case 2:
                  if (onChange) onChange(value);
                case 3:
                  return _context4.a(2);
              }
            }, _callee4);
          }));
          return function (_x4) {
            return _ref5.apply(this, arguments);
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
        disableAllFields = _this$props8.disabled;
      // @ts-expect-error TS(2339): Property 'task' does not exist on type 'CallLog | ... Remove this comment to see the full error message
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
      var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(event, value) {
        var _task$tickets$;
        var _this$props9, currentLog, onUpdateCallLog, currentSessionId, _currentLog$task, task;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _this$props9 = _this.props, currentLog = _this$props9.currentLog, onUpdateCallLog = _this$props9.onUpdateCallLog; // @ts-expect-error TS(2339): Property 'currentSessionId' does not exist on type... Remove this comment to see the full error message
              currentSessionId = currentLog.currentSessionId, _currentLog$task = currentLog.task, task = _currentLog$task === void 0 ? {} : _currentLog$task; // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
              _context5.n = 1;
              return onUpdateCallLog(_objectSpread(_objectSpread({}, currentLog), {}, {
                task: _objectSpread(_objectSpread({}, task), {}, {
                  option: value,
                  ticketId: task.ticketId || ((_task$tickets$ = task.tickets[0]) === null || _task$tickets$ === void 0 ? void 0 : _task$tickets$.id)
                })
              }), currentSessionId);
            case 1:
              return _context5.a(2);
          }
        }, _callee5);
      }));
      return function (_x5, _x6) {
        return _ref6.apply(this, arguments);
      };
    }();
    _this.renderAlert = function () {
      var _this$props0 = _this.props,
        label = _this$props0.fieldOption.label,
        currentLog = _this$props0.currentLog;
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
      var _this$props1 = _this.props,
        currentLog = _this$props1.currentLog,
        fieldOption = _this$props1.fieldOption,
        disabled = _this$props1.disabled;
      var renderCondition = fieldOption.renderCondition,
        label = fieldOption.label;
      // @ts-expect-error TS(2339): Property 'task' does not exist on type 'CallLog | ... Remove this comment to see the full error message
      var task = currentLog.task;
      // TODO: consider move this logic to zendesk
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
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_SelectField.SelectField, {
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
    // Logic to render the Zendesk Ticket Status select list
    _this.renderTicketStatusSelectList = function () {
      var _task$ticketStatuses, _task$ticketStatuses2, _task$ticketStatus;
      var _this$props10 = _this.props,
        currentLog = _this$props10.currentLog,
        fieldOption = _this$props10.fieldOption,
        disableAllFields = _this$props10.disabled;
      // @ts-expect-error TS(2339): Property 'task' does not exist on type 'CallLog | ... Remove this comment to see the full error message
      var task = currentLog.task,
        disableSaveLog = currentLog.disableSaveLog;
      var label = fieldOption.label,
        helperText = fieldOption.helperText,
        placeholder = fieldOption.placeholder;
      // Render only if the Auto-log call toggle is enabled on CTI
      if (!task.shouldShowTicketStatusesDropDown) {
        return null;
      }
      var options = task.ticketStatuses && ((_task$ticketStatuses = task.ticketStatuses) === null || _task$ticketStatuses === void 0 ? void 0 : _task$ticketStatuses.length) > 0 ? task.ticketStatuses.map(function (zendeskTicketStatus) {
        return {
          value: zendeskTicketStatus.id,
          label: zendeskTicketStatus.label,
          title: zendeskTicketStatus.label
        };
      }) : [];
      var disabled = disableAllFields || disableSaveLog || (task === null || task === void 0 ? void 0 : task.isLogged) || !((_task$ticketStatuses2 = task.ticketStatuses) === null || _task$ticketStatuses2 === void 0 ? void 0 : _task$ticketStatuses2.length);
      var isError = (task === null || task === void 0 ? void 0 : (_task$ticketStatus = task.ticketStatus) === null || _task$ticketStatus === void 0 ? void 0 : _task$ticketStatus.label) === 'Solved';
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_SelectField.SelectField, {
        "data-sign": 'zendesk-ticket-status',
        error: isError,
        helperText: isError && helperText,
        placeholder: placeholder,
        labelClassName: _styles["default"].selectLabel,
        options: options,
        disabled: disabled,
        fullWidth: true,
        value: task.ticketStatusId,
        label: label,
        onChange: function onChange(event) {
          return _this.onSelectChange(event, 'ticketStatusSelectList');
        }
      }));
    };
    _this.renderWarningText = function () {
      var _this$props11 = _this.props,
        value = _this$props11.fieldOption.value,
        currentLog = _this$props11.currentLog;
      var task = (currentLog === null || currentLog === void 0 ? void 0 : currentLog.task) || {};
      if (!task.showPermissionWarning) {
        return null;
      }

      // Use the value from field option as the text content
      var warningText = value;

      // Create a warning box with styling similar to the one in the Figma design
      return /*#__PURE__*/_react["default"].createElement(_juno.RcAlert, {
        severity: "warning",
        style: {
          padding: '12px 16px'
        }
      }, warningText);
    };
    _this.onSelectChange = function (event, source) {
      var value = event.target.value;
      var _this$props12 = _this.props,
        currentLog = _this$props12.currentLog,
        onUpdateCallLog = _this$props12.onUpdateCallLog;
      // @ts-expect-error TS(2339): Property 'currentSessionId' does not exist on type... Remove this comment to see the full error message
      var currentSessionId = currentLog.currentSessionId,
        _currentLog$task2 = currentLog.task,
        task = _currentLog$task2 === void 0 ? {} : _currentLog$task2;
      if (source && source === 'ticketStatusSelectList') {
        var ticketStatusId = Number(value);
        var zendeskTicketStatuses = task.ticketStatuses;
        var ticketStatus = zendeskTicketStatuses.find(function (ticketStatus) {
          return ticketStatus.id === ticketStatusId;
        });
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        onUpdateCallLog(_objectSpread(_objectSpread({}, currentLog), {}, {
          task: _objectSpread(_objectSpread({}, task), {}, {
            ticketStatusId: ticketStatusId,
            ticketStatus: ticketStatus
          })
        }), currentSessionId);
      } else {
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        onUpdateCallLog(_objectSpread(_objectSpread({}, currentLog), {}, {
          task: _objectSpread(_objectSpread({}, task), {}, {
            ticketId: value
          })
        }), currentSessionId);
      }
    };
    _this.onInputSelectChange = function (value) {
      return /*#__PURE__*/function () {
        var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(item) {
          var _this$props13, _this$props13$current, currentSessionId, _this$props13$current2, task, onUpdateCallLog, customInputDataStruct, defaultLogData, logData;
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.n) {
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
                _context6.n = 1;
                return onUpdateCallLog(logData, currentSessionId);
              case 1:
                return _context6.a(2);
            }
          }, _callee6);
        }));
        return function (_x7) {
          return _ref7.apply(this, arguments);
        };
      }();
    };
    _this.fieldsRenderMap = {
      // @ts-expect-error TS(2322): Type '() => JSX.Element | undefined' is not assign... Remove this comment to see the full error message
      reference: _this.renderReference,
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
      ticketSelectList: _this.renderTicketSelectList,
      picklist: function picklist() {
        return _this.renderSelectMenu(false);
      },
      multipicklist: function multipicklist() {
        return _this.renderSelectMenu(true);
      },
      ticketStatusSelectList: _this.renderTicketStatusSelectList,
      warningText: _this.renderWarningText
    };
    return _this;
  }
  _inherits(FieldItem, _Component);
  return _createClass(FieldItem, [{
    key: "currentValue",
    get: function get() {
      var value = this.props.fieldOption.value;
      var task = this.props.currentLog.task;
      return task[value];
    }
  }, {
    key: "_updateValue",
    value: function _updateValue(value, args, onSave) {
      var debounce = this.props.debounce;
      this.onInputSelectChange(value)(args);
      debounce(onSave);
    }
  }, {
    key: "render",
    value:
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    function render() {
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
  }]);
}(_react.Component);
//# sourceMappingURL=FieldItem.js.map
