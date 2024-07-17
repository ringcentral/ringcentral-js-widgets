"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useResizeAndToggle = exports.DragAnchor = void 0;
const tslib_1 = require("tslib");
const juno_1 = require("@ringcentral/juno");
const react_1 = tslib_1.__importStar(require("react"));
const usePanMove_1 = require("./usePanMove");
exports.DragAnchor = juno_1.styled.div `
  width: 10px;
  position: absolute;
  user-select: none;
  height: 100%;
  top: 0;
  ${({ direction }) => direction === 'right'
    ? (0, juno_1.css) `
          right: 0;
          transform: translateX(50%);
        `
    : (0, juno_1.css) `
          left: 0;
          transform: translateX(-50%);
        `}
  cursor: col-resize;
  z-index: 1;
`;
/**
 * group resize and toggle logic together,
 * let you can control resize and toggle easily.
 */
const useResizeAndToggle = (target, { getCacheStateAndAction, direction = 'right' }) => {
    const { current: cacheStateAndAction } = (0, juno_1.useResultRef)(() => getCacheStateAndAction());
    const [cacheState, setCacheState] = cacheStateAndAction;
    const [show, setShow] = (0, react_1.useState)(cacheState.show);
    const widthRef = (0, react_1.useRef)(cacheState.width);
    const dragAnchorRef = (0, react_1.useRef)(null);
    (0, usePanMove_1.usePanMove)(dragAnchorRef, {
        onMove: (delta) => {
            const targetElm = (0, juno_1.getRefElement)(target);
            if (!targetElm)
                return;
            // set width directly, make performance better
            targetElm.style.width = (0, juno_1.px)(widthRef.current + (direction === 'right' ? delta : -delta));
        },
        onMoveEnd: () => {
            const targetElm = (0, juno_1.getRefElement)(target);
            if (!targetElm)
                return;
            // only trigger cache when move end and release change
            widthRef.current = targetElm.clientWidth;
            setCacheState({ show, width: widthRef.current });
        },
    });
    (0, react_1.useLayoutEffect)(() => {
        const targetElm = (0, juno_1.getRefElement)(target);
        if (!targetElm)
            return;
        targetElm.style.width = (0, juno_1.px)(widthRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return {
        show,
        setShow: (0, juno_1.useEventCallback)((show) => {
            setShow(show);
            setCacheState({ show, width: widthRef.current });
        }),
        dragNode: (0, react_1.useMemo)(() => react_1.default.createElement(exports.DragAnchor, { ref: dragAnchorRef, direction: direction }), [direction]),
    };
};
exports.useResizeAndToggle = useResizeAndToggle;
//# sourceMappingURL=useResizeAndToggle.js.map