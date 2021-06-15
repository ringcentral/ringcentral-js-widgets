"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditLogSection = void 0;

var _react = _interopRequireWildcard(require("react"));

var _CallLogFields = _interopRequireDefault(require("ringcentral-widgets/components/CallLogFields"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var EditLogSection = function EditLogSection(_ref) {
  var onUpdateCallLog = _ref.onUpdateCallLog,
      currentLog = _ref.currentLog,
      currentLocale = _ref.currentLocale,
      onSaveCallLog = _ref.onSaveCallLog,
      subjectDropdownsTracker = _ref.subjectDropdownsTracker,
      editSectionScrollBy = _ref.editSectionScrollBy,
      startAdornmentRender = _ref.startAdornmentRender,
      scrollTo = _ref.scrollTo,
      isWide = _ref.isWide,
      rootRef = _ref.rootRef,
      referenceFieldOptions = _ref.referenceFieldOptions;
  var dispositionIdRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if ((rootRef === null || rootRef === void 0 ? void 0 : rootRef.current) && dispositionIdRef.current) {
      switch (scrollTo) {
        case 'dispositionId':
          rootRef.current.scrollBy({
            top: dispositionIdRef.current.offsetTop,
            behavior: 'smooth'
          });
          break;

        default:
          break;
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [scrollTo]);
  return /*#__PURE__*/_react["default"].createElement(_CallLogFields["default"], {
    fieldSize: isWide ? 'medium' : 'small',
    referenceFieldOptions: referenceFieldOptions,
    subjectDropdownsTracker: subjectDropdownsTracker,
    onUpdateCallLog: onUpdateCallLog,
    onSaveCallLog: onSaveCallLog,
    currentLog: currentLog,
    currentLocale: currentLocale,
    startAdornmentRender: startAdornmentRender,
    editSectionScrollBy: editSectionScrollBy,
    classes: {
      root: _styles["default"].root
    },
    refs: {
      dispositionId: dispositionIdRef
    }
  });
};

exports.EditLogSection = EditLogSection;
EditLogSection.defaultProps = {
  referenceFieldOptions: {}
};
//# sourceMappingURL=EditLogSection.js.map
