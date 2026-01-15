"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEffectOnDocumentFocus = void 0;
const react_1 = require("react");
/**
 * function same as useEffect method, which will only trigger when the document is focusing
 */
const useEffectOnDocumentFocus = (effect, deps) => (0, react_1.useEffect)(() => {
    // only focus page should do the auto save action, because we will do the multiple state sync
    if (document.hasFocus()) {
        return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, deps);
exports.useEffectOnDocumentFocus = useEffectOnDocumentFocus;
//# sourceMappingURL=useEffectOnDocumentFocus.js.map