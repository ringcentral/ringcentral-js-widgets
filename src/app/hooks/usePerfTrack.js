"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWillMountTracker = exports.useReadyTracker = exports.useDidMountTracker = void 0;
var _nextCore = require("@ringcentral-integration/next-core");
var _react = require("react");
var useWillMountTracker = exports.useWillMountTracker = function useWillMountTracker(key) {
  var perfTracker = (0, _nextCore.useContainer)('PerfTracker');
  var willMount = (0, _react.useRef)(true);
  if (willMount.current && perfTracker) {
    perfTracker.markOnce(key);
    willMount.current = false;
  }
};
var useDidMountTracker = exports.useDidMountTracker = function useDidMountTracker(startKey, key) {
  var perfTracker = (0, _nextCore.useContainer)('PerfTracker');
  (0, _react.useEffect)(function () {
    perfTracker === null || perfTracker === void 0 ? void 0 : perfTracker.measureOnce({
      name: key,
      startMark: startKey
    });
  }, []);
};
var useReadyTracker = exports.useReadyTracker = function useReadyTracker(startKey, key, prop, activate) {
  var perfTracker = (0, _nextCore.useContainer)('PerfTracker');
  (0, _react.useEffect)(function () {
    if ((activate || !!prop) && perfTracker) {
      // leave a mark then measure
      perfTracker.markOnce(key);
      perfTracker.measureOnce({
        name: key,
        startMark: startKey,
        endMark: key
      });
    }
  }, [prop]);
};
//# sourceMappingURL=usePerfTrack.js.map
