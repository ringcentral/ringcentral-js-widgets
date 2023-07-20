"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
var _useMountedState = _interopRequireDefault(require("./useMountedState"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var usePromise = function usePromise() {
  var isMounted = (0, _useMountedState["default"])();
  return (0, _react.useCallback)(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function (promise) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new Promise(function (resolve, reject) {
        var onValue = function onValue(value) {
          isMounted() && resolve(value);
        };
        var onError = function onError(error) {
          isMounted() && reject(error);
        };
        promise.then(onValue, onError);
      })
    );
  }, []);
};
var _default = usePromise;
exports["default"] = _default;
//# sourceMappingURL=usePromise.js.map
