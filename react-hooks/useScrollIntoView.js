"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useScrollIntoView = useScrollIntoView;
var _react = require("react");
var _contexts = require("../contexts");
/**
 * Not using scrollIntoView, that will cause problem in iframe in salesforce classic mode.
 * Use that with `SelectListContext`
 * @param scrollIntoView is that should be scrollIntoView
 */
function useScrollIntoView() {
  var scrollIntoView = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var targetElementRef = (0, _react.useRef)(null);
  var _useContext = (0, _react.useContext)(_contexts.SelectListContext),
    scrollElmRef = _useContext.scrollElmRef;
  (0, _react.useEffect)(function () {
    var targetElm = targetElementRef.current;
    var scrollElm = scrollElmRef === null || scrollElmRef === void 0 ? void 0 : scrollElmRef.current;
    if (scrollIntoView && targetElm && scrollElm &&
    // if that scrollElm has scroll bar
    scrollElm.scrollHeight > scrollElm.clientHeight &&
    // if that is out of scroll container
    scrollElm.scrollTop + scrollElm.clientHeight < targetElm.offsetTop + targetElm.clientHeight) {
      scrollElm.scrollTop = targetElm.offsetTop;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollIntoView]);
  return targetElementRef;
}
//# sourceMappingURL=useScrollIntoView.js.map
