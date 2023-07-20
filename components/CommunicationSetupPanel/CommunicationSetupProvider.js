"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommunicationSetupProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _contexts = require("../../contexts");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var CommunicationSetupProvider = function CommunicationSetupProvider(_ref) {
  var children = _ref.children;
  var inputPropsRef = (0, _react.useRef)(null);
  var inputAriaPropsRef = (0, _react.useRef)(null);
  return /*#__PURE__*/_react["default"].createElement(_contexts.CommunicationSetupContext.Provider, {
    value: {
      inputPropsRef: inputPropsRef,
      inputAriaPropsRef: inputAriaPropsRef
    }
  }, /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, children));
};
exports.CommunicationSetupProvider = CommunicationSetupProvider;
CommunicationSetupProvider.defaultProps = {};
CommunicationSetupProvider.displayName = 'CommunicationSetupProvider';
//# sourceMappingURL=CommunicationSetupProvider.js.map
