"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHammerZoom = void 0;
const juno_1 = require("@ringcentral/juno");
const react_1 = require("react");
const useHammer_1 = require("../useHammer");
const bind_hammer_zoom_1 = require("./bind-hammer-zoom");
const useHammerZoom = (target, { container, min, max, onScale, onDragChange, }) => {
    const zoomActionRef = (0, react_1.useRef)();
    (0, useHammer_1.useHammer)(target, (manager) => {
        const targetRefElm = (0, juno_1.getRefElement)(target);
        const containerRefElm = (0, juno_1.getRefElement)(container);
        targetRefElm.style.scale = 'var(--scale, 1)';
        targetRefElm.style.transformOrigin = 'var(--origin)';
        targetRefElm.style.translate = 'var(--x) var(--y) 0';
        const events = [
            new Hammer.Pinch(),
            new Hammer.Tap({ event: 'doubletap', taps: 2 }),
            new Hammer.Pan({ threshold: 0 }),
        ];
        events.forEach((recognizer) => {
            manager.add(recognizer);
        });
        zoomActionRef.current = (0, bind_hammer_zoom_1.bindHammerZoom)({
            hammer: manager,
            min,
            max,
            getTarget: () => targetRefElm,
            getContainer: () => containerRefElm,
            onScale,
            onDragChange,
        });
    });
    (0, juno_1.useEventListener)(container, 'wheel', (e) => {
        const action = zoomActionRef.current;
        action === null || action === void 0 ? void 0 : action.zoomStart({ x: e.clientX, y: e.clientY });
        action === null || action === void 0 ? void 0 : action.zooming(e.deltaY < 0 ? 1.1 : 0.9);
        e.preventDefault();
    });
    return {
        zoom: (toScale) => {
            var _a;
            (_a = zoomActionRef.current) === null || _a === void 0 ? void 0 : _a.zoom(toScale);
        },
        reset: () => {
            var _a;
            (_a = zoomActionRef.current) === null || _a === void 0 ? void 0 : _a.reset();
        },
    };
};
exports.useHammerZoom = useHammerZoom;
//# sourceMappingURL=useZoom.js.map