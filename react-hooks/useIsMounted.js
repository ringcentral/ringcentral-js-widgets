"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIsMounted = useIsMounted;

var _react = require("react");

function useIsMounted() {
  var isMounted = (0, _react.useRef)(false);
  (0, _react.useEffect)(function () {
    isMounted.current = true;
    return function () {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}
//# sourceMappingURL=useIsMounted.js.map
