"use strict";

require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.flat");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.from");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.array.unscopables.flat");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSynchronizedAnimation = useSynchronizedAnimation;
var _react = require("react");
/**
 * A hook that synchronizes the animation of all elements matching a given selector
 * to the animation of the first element.
 *
 * @param selector - The CSS selector for the elements to synchronize.
 * @param animationName - The name of the CSS animation to synchronize.
 * @returns A ref object that can be attached to the element(s) to synchronize.
 */
function useSynchronizedAnimation(selector, animationName) {
  (0, _react.useLayoutEffect)(function () {
    var elements = document.querySelectorAll(selector);
    var animations = Array.from(elements).map(function (x) {
      return x.getAnimations();
    }).flat();
    if (animationName) {
      animations = animations.filter(function (ani) {
        return ani instanceof CSSAnimation && ani.animationName === animationName;
      });
    }
    var first = animations[0];
    if (first) {
      animations.slice(1).forEach(function (animation) {
        return animation.currentTime = first.currentTime;
      });
    }
  }, [animationName, selector]);
}
//# sourceMappingURL=useSynchronizedAnimation.js.map
