"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHammer = void 0;
const tslib_1 = require("tslib");
const juno_1 = require("@ringcentral/juno");
const react_1 = require("react");
const useHammer = (target, callback) => {
    const hammerRef = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        const targetRefElm = (0, juno_1.getRefElement)(target);
        (() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            yield Promise.resolve().then(() => tslib_1.__importStar(require('hammerjs')));
            const hammer = new Hammer.Manager(targetRefElm);
            hammerRef.current = hammer;
            callback(hammer);
        }))();
        return () => {
            var _a;
            (_a = hammerRef.current) === null || _a === void 0 ? void 0 : _a.destroy();
        };
    }, []);
};
exports.useHammer = useHammer;
//# sourceMappingURL=useHammer.js.map