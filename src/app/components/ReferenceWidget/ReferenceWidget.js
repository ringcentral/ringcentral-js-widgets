"use strict";

require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReferenceWidget = exports.DEFAULT_FINDER = void 0;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _FieldItem = require("@ringcentral-integration/widgets/components/CallLogFields/FieldItem");
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var DEFAULT_FINDER = exports.DEFAULT_FINDER = {
  getValue: function getValue(item) {
    return (_typeof(item) === 'object' ? item.id : item) || null;
  },
  searchOption: function searchOption(option, text) {
    return option.name && option.name.toLowerCase().includes(text.toLowerCase());
  }
};

/**
 * This is old reference widget, not spring-ui version
 *
 * @deprecated
 */
var ReferenceWidget = exports.ReferenceWidget = function ReferenceWidget(filedProps) {
  var props = filedProps.uiSchema['ui:options'],
    formData = filedProps.formData;
  var _props$fieldOption = props.fieldOption,
    label = _props$fieldOption.label,
    value = _props$fieldOption.value,
    currentDisabled = _props$fieldOption.disabled,
    fieldOnChange = _props$fieldOption.onChange,
    onlyShowInMultipleMatches = _props$fieldOption.onlyShowInMultipleMatches,
    showOtherSection = _props$fieldOption.showOtherSection,
    showMatched = _props$fieldOption.showMatched,
    showFoundFromServer = _props$fieldOption.showFoundFromServer,
    onSelectViewVisible = props.onSelectViewVisible,
    contactSearch = props.contactSearch,
    onFullSelectFieldClick = props.onFullSelectFieldClick,
    currentLog = props.currentLog,
    startAdornmentRender = props.startAdornmentRender,
    referenceFieldOption = props.referenceFieldOption,
    currentLocale = props.currentLocale,
    disabled = props.disabled,
    leftNav = props.leftNav;
  var task = currentLog.task,
    _currentLog$currentLo = currentLog.currentLogCall,
    _currentLog$currentLo2 = _currentLog$currentLo === void 0 ? {
      phoneNumber: ''
    } : _currentLog$currentLo,
    phoneNumber = _currentLog$currentLo2.phoneNumber;
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
    showRecentlySection = referenceFieldOption.showRecentlySection,
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
    multiple = referenceFieldOption.multiple,
    autoClose = referenceFieldOption.autoClose,
    recentlyEntitiesGetter = referenceFieldOption.recentlyEntitiesGetter;
  var matchedEntities = matchedEntitiesGetter(currentLog);
  if (onlyShowInMultipleMatches && matchedEntities.length <= 1) {
    return;
  }
  var otherEntities = otherEntitiesGetter(currentLog);
  var foundFromServerEntities = typeof foundFromServerEntityGetter === 'function' ? foundFromServerEntityGetter(currentLog) : [];
  var showAssociatedSection = shouldShowAssociatedSection ? shouldShowAssociatedSection(currentLog) : false;
  var associatedEntities = showAssociatedSection && associatedEntitiesGetter ? associatedEntitiesGetter(currentLog) : [];
  var recentlyEntities = showRecentlySection && recentlyEntitiesGetter ? recentlyEntitiesGetter(currentLog) : [];
  var getValue = _getValue || DEFAULT_FINDER.getValue;
  var searchOptionFinder = _searchOptionFinder || DEFAULT_FINDER.searchOption;
  var currentOption = [].concat(_toConsumableArray(recentlyEntities), _toConsumableArray(matchedEntities), _toConsumableArray(otherEntities), _toConsumableArray(associatedEntities), _toConsumableArray(foundFromServerEntities)).find(currentOptionFinder(task));
  var disabledReference = currentDisabled || shouldDisable(task) || disabled;
  var title = metadata.title || label;
  var rightIcon = rightIconRender ? rightIconRender(phoneNumber) : undefined;
  var currentValue = getSelectedOptionLabel && getSelectedOptionLabel(currentOption, matchedEntities.length, currentLog) || getLabel(currentOption, matchedEntities.length, currentLog) || '';
  return /*#__PURE__*/_react["default"].createElement(_FieldItem.FullSelectField, _extends({}, props, {
    selectListBasicClassName: leftNav ? _styles["default"].selectListBasicWithLeftNav : _styles["default"].selectListBasic,
    backHeaderClassName: backHeaderClassName,
    onBackClick: onBackClick,
    title: title,
    rightIcon: rightIcon,
    placeholder: metadata.placeholder,
    options: matchedEntities,
    otherOptions: otherEntities,
    associatedOptions: associatedEntities,
    showMatched: showMatched,
    showOtherSection: showOtherSection,
    showAssociatedSection: showAssociatedSection,
    recentlyEntities: recentlyEntities,
    showRecentlySection: showRecentlySection,
    startAdornment: startAdornmentRender,
    field: value,
    value: formData || '',
    onChange: (/*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(args) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return onChange(props)(args);
            case 1:
              // await onSave();
              if (fieldOnChange) fieldOnChange(args);
            case 2:
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
    contactSearch: contactSearch,
    showFoundFromServer: showFoundFromServer,
    TextFieldProps: {
      helperText: disableReason,
      value: currentValue
    },
    multiple: multiple,
    autoClose: autoClose !== null && autoClose !== void 0 ? autoClose : props.autoClose
  }));
};
//# sourceMappingURL=ReferenceWidget.js.map
