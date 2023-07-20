"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useMountedState;
var _react = require("react");
function useMountedState() {
  var mountedRef = (0, _react.useRef)(false);
  var get = (0, _react.useCallback)(function () {
    return mountedRef.current;
  }, []);
  (0, _react.useEffect)(function () {
    mountedRef.current = true;
    return function () {
      mountedRef.current = false;
    };
  }, []);
  return get;
}
//# sourceMappingURL=useMountedState.js.map
