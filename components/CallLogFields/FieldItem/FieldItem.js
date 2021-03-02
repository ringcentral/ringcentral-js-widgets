"use strict";

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldItem = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.find");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.function.name");

var _juno = require("@ringcentral/juno");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _timeFormatHelper = require("../../../lib/timeFormatHelper");

var _InputSelect = _interopRequireDefault(require("../../InputSelect"));

var _FullSelectField = require("./FullSelectField");

var _LogFieldsInput = require("./LogFieldsInput");

var _SelectField = require("./SelectField");

var _RadioField = require("./RadioField");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
          foundFromServerEntityGetter = referenceFieldOption.foundFromServerEntityGetter,
          onBackClick = referenceFieldOption.onBackClick,
          backHeaderClassName = referenceFieldOption.backHeaderClassName;
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
      var currentValue = getLabel(currentOption, matchedEntities.length, currentLog) || '';
      return /*#__PURE__*/_react["default"].createElement(_FullSelectField.FullSelectField, _extends({}, _this.props, {
        backHeaderClassName: backHeaderClassName,
        onBackClick: onBackClick,
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
        valueFunction: getValue,
        renderFunction: getLabel,
        searchOption: searchOptionFinder,
        disabled: disabled,
        currentLocale: currentLocale,
        foundFromServerEntities: foundFromServerEntities,
        contactSearch: contactSearch,
        showFoundFromServer: showFoundFromServer,
        TextFieldProps: {
          helperText: disableReason,
          value: currentValue
        }
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
      return /*#__PURE__*/_react["default"].createElement(_LogFieldsInput.LogFieldsInput, {
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
      return /*#__PURE__*/_react["default"].createElement(_LogFieldsInput.LogFieldsInput, {
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
      var date = _this.currentValue ? (0, _timeFormatHelper.getDateFromUTCDay)(_this.currentValue) : null;
      return /*#__PURE__*/_react["default"].createElement(_juno.RcDatePicker, {
        fullWidth: true,
        size: fieldSize,
        "data-sign": fieldValue,
        required: required,
        label: label,
        date: date,
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
                    return onSave;

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
      var _this$props6 = _this.props,
          _this$props6$currentL = _this$props6.currentLog,
          task = _this$props6$currentL.task,
          subjectPicklist = _this$props6$currentL.subjectPicklist,
          subjectDropdownsTracker = _this$props6.subjectDropdownsTracker,
          timeout = _this$props6.timeout;
      var _this$props7 = _this.props,
          _this$props7$fieldOpt = _this$props7.fieldOption,
          required = _this$props7$fieldOpt.required,
          label = _this$props7$fieldOpt.label,
          onSave = _this$props7.onSave;
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
      var _this$props8 = _this.props,
          _this$props8$fieldOpt = _this$props8.fieldOption,
          label = _this$props8$fieldOpt.label,
          fieldValue = _this$props8$fieldOpt.value,
          picklistOptions = _this$props8$fieldOpt.picklistOptions,
          required = _this$props8$fieldOpt.required,
          helperText = _this$props8$fieldOpt.helperText,
          error = _this$props8$fieldOpt.error,
          onChange = _this$props8$fieldOpt.onChange,
          _this$props8$fieldOpt2 = _this$props8$fieldOpt.disabled,
          propsDisabled = _this$props8$fieldOpt2 === void 0 ? false : _this$props8$fieldOpt2,
          placeholder = _this$props8$fieldOpt.placeholder,
          onSave = _this$props8.onSave;
      var selectList = (picklistOptions || []).map(function (item) {
        var value = item;
        var label = item !== null ? item : appDefaultValue;
        var disabled = false;

        if (item instanceof Object) {
          value = item.value;
          label = item.label;
          disabled = item.disabled;
        }

        return {
          label: label,
          value: value,
          disabled: disabled
        };
      });
      return /*#__PURE__*/_react["default"].createElement(_SelectField.SelectField, {
        "data-sign": fieldValue,
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
        options: selectList
      });
    };

    _this.renderRadio = function () {
      var _this$props9 = _this.props,
          picklistOptions = _this$props9.fieldOption.picklistOptions,
          currentLog = _this$props9.currentLog;
      var task = currentLog.task;
      var options = [{
        value: picklistOptions[0].value,
        label: picklistOptions[0].label,
        disabled: false
      }, {
        value: picklistOptions[1].value,
        label: picklistOptions[1].label,
        disabled: !!(!task.tickets || task.tickets && task.tickets.length === 0)
      }];
      var defaultOption = task.option || picklistOptions[0].value;
      return /*#__PURE__*/_react["default"].createElement(_RadioField.RadioField, {
        value: defaultOption,
        options: options,
        onChange: _this.onRadioChange
      });
    };

    _this.onRadioChange = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(event, value) {
        var _task$tickets$;

        var _this$props10, currentLog, onUpdateCallLog, currentSessionId, _currentLog$task, task;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this$props10 = _this.props, currentLog = _this$props10.currentLog, onUpdateCallLog = _this$props10.onUpdateCallLog;
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
      var _this$props11 = _this.props,
          currentLog = _this$props11.currentLog,
          fieldOption = _this$props11.fieldOption;
      var renderCondition = fieldOption.renderCondition,
          label = fieldOption.label;
      var task = currentLog.task; // TODO: consider move this logic to zendesk

      if (task.option !== renderCondition) {
        return null;
      }

      var options = task.tickets ? task.tickets.map(function (ticket) {
        return {
          value: ticket.id,
          label: "#".concat(ticket.id, " ").concat(ticket.subject)
        };
      }) : [];
      var defaultTicket = task.tickets.find(function (ticket) {
        return ticket.id === task.ticketId;
      }) || task.tickets && task.tickets[0];
      var defaultValue = (defaultTicket === null || defaultTicket === void 0 ? void 0 : defaultTicket.id) || '';
      return /*#__PURE__*/_react["default"].createElement(_SelectField.SelectField, {
        options: options,
        disabled: options.length === 0,
        value: defaultValue,
        label: label,
        classes: {
          root: (0, _classnames["default"])(_styles["default"].ticketSelectList, _styles["default"].tickets, _styles["default"].selectList)
        },
        onChange: _this.onSelectChange
      });
    };

    _this.onSelectChange = /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(event) {
        var value, _this$props12, currentLog, onUpdateCallLog, currentSessionId, _currentLog$task2, task;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                value = event.target.value;
                _this$props12 = _this.props, currentLog = _this$props12.currentLog, onUpdateCallLog = _this$props12.onUpdateCallLog;
                currentSessionId = currentLog.currentSessionId, _currentLog$task2 = currentLog.task, task = _currentLog$task2 === void 0 ? {} : _currentLog$task2;
                _context5.next = 5;
                return onUpdateCallLog(_objectSpread(_objectSpread({}, currentLog), {}, {
                  task: _objectSpread(_objectSpread({}, task), {}, {
                    ticketId: value
                  })
                }), currentSessionId);

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

    _this.onInputSelectChange = function (value) {
      return /*#__PURE__*/function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(item) {
          var _this$props13, _this$props13$current, currentSessionId, _this$props13$current2, task, onUpdateCallLog, customInputDataStruct, defaultLogData, logData;

          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _this$props13 = _this.props, _this$props13$current = _this$props13.currentLog, currentSessionId = _this$props13$current.currentSessionId, _this$props13$current2 = _this$props13$current.task, task = _this$props13$current2 === void 0 ? {} : _this$props13$current2, onUpdateCallLog = _this$props13.onUpdateCallLog, customInputDataStruct = _this$props13.customInputDataStruct;
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
                  _context6.next = 5;
                  return onUpdateCallLog(logData, currentSessionId);

                case 5:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }));

        return function (_x7) {
          return _ref7.apply(this, arguments);
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
      var _this$props14 = this.props,
          _this$props14$fieldOp = _this$props14.fieldOption,
          value = _this$props14$fieldOp.value,
          type = _this$props14$fieldOp.type,
          error = _this$props14$fieldOp.error,
          enableScrollError = _this$props14$fieldOp.enableScrollError,
          editSectionScrollBy = _this$props14.editSectionScrollBy;

      if (this.fieldsRenderMap[type]) {
        if (error && enableScrollError && this.fieldItemRef.current) {
          editSectionScrollBy(this.fieldItemRef.current.offsetTop);
        }

        return /*#__PURE__*/_react["default"].createElement("div", {
          ref: this.fieldItemRef,
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
    } // eslint-disable-next-line react/destructuring-assignment

  }]);

  return FieldItem;
}(_react.Component);

exports.FieldItem = FieldItem;
//# sourceMappingURL=FieldItem.js.map
