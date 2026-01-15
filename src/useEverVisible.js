"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEverVisible = void 0;
const spring_ui_1 = require("@ringcentral/spring-ui");
const react_1 = require("react");
/**
 * A React hook that tracks whether a page has ever been visible to the user.
 *
 * This hook is particularly useful for work with requestAnimationFrame, because the requestAnimationFrame will not be triggered until the page is visible.
 *
 */
const useEverVisible = () => {
    const [everVisible, setEverVisible] = (0, react_1.useState)(document.visibilityState === 'visible');
    const { listen, remove } = (0, spring_ui_1.useEventListener)(document, 'visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            setEverVisible(true);
            remove();
        }
    }, {
        startImmediately: false,
    });
    (0, react_1.useEffect)(() => {
        if (!everVisible) {
            listen();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return everVisible;
};
exports.useEverVisible = useEverVisible;
//# sourceMappingURL=useEverVisible.js.map