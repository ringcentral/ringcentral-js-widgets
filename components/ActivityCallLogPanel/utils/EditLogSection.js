"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditLogSection = void 0;
var _CallLogFields = _interopRequireDefault(require("@ringcentral-integration/widgets/components/CallLogFields"));
var _react = _interopRequireWildcard(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
