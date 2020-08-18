"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditLogSection = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _CallLogFields = _interopRequireDefault(require("ringcentral-widgets/components/CallLogFields"));

var _i18n = _interopRequireDefault(require("../i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var rightIconRender = function rightIconRender() {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].fillRight
  });
};

var _getReferenceFieldOptions = function _getReferenceFieldOptions(currentLocale) {
  var getNameLabel = function getNameLabel() {
    var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var length = arguments.length > 1 ? arguments[1] : undefined;
    var id = item.id,
        name = item.name,
        type = item.type;

    if (!id) {
      return length > 1 ? "".concat(_i18n["default"].getString('multipleNameMatch', currentLocale), " (").concat(length, ")") : _i18n["default"].getString('none', currentLocale);
    }

    return name ? "".concat(name) : "".concat(type, "(").concat(id, ")");
  };

  var getRelatedToLabel = function getRelatedToLabel() {
    var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var length = arguments.length > 1 ? arguments[1] : undefined;
    var id = item.id,
        name = item.name,
        type = item.type;

    if (Object.keys(item).length === 0) {
      return length > 1 ? "".concat(_i18n["default"].getString('multipleRelatedToMatch', currentLocale), " (").concat(length, ")") : _i18n["default"].getString('none', currentLocale);
    }

    return name ? "".concat(name) : "".concat(type, "(").concat(id, ")");
  };

  var onNameChange = function onNameChange(_ref) {
    var _ref$currentLog = _ref.currentLog,
        task = _ref$currentLog.task,
        currentSessionId = _ref$currentLog.currentSessionId,
        onUpdateCallLog = _ref.onUpdateCallLog;
    return /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(item) {
        var id, relatedTo;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = item.id;
                relatedTo = task.whatid;
                _context.next = 4;
                return onUpdateCallLog({
                  isSaved: false,
                  task: {
                    whoid: id || '',
                    whatid: relatedTo || ''
                  }
                }, currentSessionId);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();
  };

  var onRelatedToChange = function onRelatedToChange(_ref3) {
    var currentSessionId = _ref3.currentLog.currentSessionId,
        onUpdateCallLog = _ref3.onUpdateCallLog;
    return /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(args) {
        var id;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = (_typeof(args) === 'object' ? args.id : args) || null;
                _context2.next = 3;
                return onUpdateCallLog({
                  isSaved: false,
                  task: {
                    whatid: id || ''
                  }
                }, currentSessionId);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref4.apply(this, arguments);
      };
    }();
  };

  return {
    whoid: {
      getLabel: getNameLabel,
      onChange: onNameChange,
      metadata: {
        title: _i18n["default"].getString('name', currentLocale),
        placeholder: _i18n["default"].getString('namePlaceholder', currentLocale),
        valueField: 'whoid'
      },
      currentOptionFinder: function currentOptionFinder(task) {
        return function (item) {
          return item.id === task.whoid;
        };
      },
      matchedEntitiesGetter: function matchedEntitiesGetter(_ref5) {
        var nameEntities = _ref5.nameEntities;
        return nameEntities;
      },
      otherEntitiesGetter: function otherEntitiesGetter(_ref6) {
        var name = _ref6.navigateToEntities.name;
        return name;
      },
      rightIconRender: rightIconRender,
      backHeaderClassName: _styles["default"].backHeader
    },
    whatid: {
      getLabel: getRelatedToLabel,
      onChange: onRelatedToChange,
      metadata: {
        title: _i18n["default"].getString('relatedTo', currentLocale),
        placeholder: _i18n["default"].getString('relatedToPlaceholder', currentLocale),
        valueField: 'whatid'
      },
      currentOptionFinder: function currentOptionFinder(task) {
        return function (item) {
          return item.id === task.whatid;
        };
      },
      matchedEntitiesGetter: function matchedEntitiesGetter(_ref7) {
        var relatedToEntities = _ref7.relatedToEntities;
        return relatedToEntities;
      },
      otherEntitiesGetter: function otherEntitiesGetter(_ref8) {
        var relatedTo = _ref8.navigateToEntities.relatedTo;
        return relatedTo;
      },
      rightIconRender: rightIconRender,
      backHeaderClassName: _styles["default"].backHeader
    }
  };
};

var EditLogSection = function EditLogSection(_ref9) {
  var onUpdateCallLog = _ref9.onUpdateCallLog,
      currentLog = _ref9.currentLog,
      currentLocale = _ref9.currentLocale,
      onSaveCallLog = _ref9.onSaveCallLog,
      subjectDropdownsTracker = _ref9.subjectDropdownsTracker,
      editSectionScrollBy = _ref9.editSectionScrollBy,
      startAdornmentRender = _ref9.startAdornmentRender;
  return /*#__PURE__*/_react["default"].createElement(_CallLogFields["default"], {
    referenceFieldOptions: _getReferenceFieldOptions(currentLocale),
    subjectDropdownsTracker: subjectDropdownsTracker,
    onUpdateCallLog: onUpdateCallLog,
    onSaveCallLog: onSaveCallLog,
    currentLog: currentLog,
    currentLocale: currentLocale,
    startAdornmentRender: startAdornmentRender,
    editSectionScrollBy: editSectionScrollBy,
    classes: {
      root: _styles["default"].root
    }
  });
};

exports.EditLogSection = EditLogSection;
//# sourceMappingURL=EditLogSection.js.map
