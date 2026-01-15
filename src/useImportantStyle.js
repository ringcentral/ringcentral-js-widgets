"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useImportantStyle = void 0;
const react_1 = require("react");
/**
 * set style with react, important is not able to set in react, so must need to use this hook to set style
 *
 * https://github.com/facebook/react/issues/1881#issuecomment-262257503
 */
const useImportantStyle = (ref, style) => {
    (0, react_1.useLayoutEffect)(() => {
        const container = ref.current;
        if (!container)
            return;
        Object.entries(style).forEach(([key, value]) => {
            container.style.setProperty(key, value, 'important');
        });
    }, [ref, style]);
};
exports.useImportantStyle = useImportantStyle;
//# sourceMappingURL=useImportantStyle.js.map