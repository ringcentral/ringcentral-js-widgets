"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePanMove = void 0;
const useHammer_1 = require("./useHammer");
const usePanMove = (target, { onMove, onMoveStart, onMoveEnd, direction = 'horizontal', }) => {
    (0, useHammer_1.useHammer)(target, (hammer) => {
        const pan = new Hammer.Pan({
            direction: direction === 'horizontal'
                ? Hammer.DIRECTION_HORIZONTAL
                : Hammer.DIRECTION_VERTICAL,
            threshold: 0,
        });
        hammer.add(pan);
        hammer.on('panstart', () => {
            onMoveStart === null || onMoveStart === void 0 ? void 0 : onMoveStart();
        });
        hammer.on('panleft panright', (e) => {
            const delta = e.deltaX;
            onMove(delta);
        });
        hammer.on('panend pancancel', () => {
            onMoveEnd === null || onMoveEnd === void 0 ? void 0 : onMoveEnd();
        });
    });
};
exports.usePanMove = usePanMove;
//# sourceMappingURL=usePanMove.js.map