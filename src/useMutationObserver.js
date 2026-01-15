"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMutationObserver = useMutationObserver;
const spring_ui_1 = require("@ringcentral/spring-ui");
const react_1 = require("react");
/**
 * Watch for changes being made to the DOM tree.
 *
 * @param target - React ref or DOM node
 * @param callback - callback to execute when mutations are observed
 * @param options - Options passed to mutation observer
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver MutationObserver MDN
 * @see https://react-hooks-library.vercel.app/core/useMutationObserver
 */
function useMutationObserver(
/** target element ref */
target, callback, options = {}, { startImmediately = true } = {}) {
    var _a;
    const observerRef = (0, react_1.useRef)(null);
    const isSupported = !!((_a = global.window) === null || _a === void 0 ? void 0 : _a.MutationObserver);
    const cb = (0, spring_ui_1.useEventCallback)((...args) => {
        return callback(...args);
    });
    const stop = (0, spring_ui_1.useEventCallback)(() => {
        if (!observerRef.current)
            return;
        observerRef.current.disconnect();
        observerRef.current = null;
    });
    const observe = (0, spring_ui_1.useEventCallback)(() => {
        if (!observerRef.current)
            return;
        const elm = (0, spring_ui_1.getRefElement)(target);
        if (!isSupported || !elm)
            return;
        observerRef.current.observe(elm, options);
    });
    (0, react_1.useEffect)(() => {
        const elm = (0, spring_ui_1.getRefElement)(target);
        if (!isSupported || !elm)
            return stop;
        const observer = new global.window.MutationObserver(cb);
        observerRef.current = observer;
        if (startImmediately) {
            observe();
        }
        return stop;
    }, [cb, isSupported, observe, startImmediately, stop, target]);
    return {
        observe,
        stop,
    };
}
//# sourceMappingURL=useMutationObserver.js.map