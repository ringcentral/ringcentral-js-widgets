import { useLayoutEffect } from 'react';

/**
 * A hook that synchronizes the animation of all elements matching a given selector
 * to the animation of the first element.
 *
 * @param selector - The CSS selector for the elements to synchronize.
 * @param animationName - The name of the CSS animation to synchronize.
 * @returns A ref object that can be attached to the element(s) to synchronize.
 */
export function useSynchronizedAnimation(
  selector: string,
  animationName?: string,
) {
  useLayoutEffect(() => {
    const elements = document.querySelectorAll(selector);
    let animations = Array.from(elements)
      .map((x) => x.getAnimations())
      .flat();

    if (animationName) {
      animations = animations.filter(
        (ani) =>
          ani instanceof CSSAnimation && ani.animationName === animationName,
      );
    }

    const first = animations[0];

    if (first) {
      animations
        .slice(1)
        .forEach((animation) => (animation.currentTime = first.currentTime));
    }
  }, [animationName, selector]);
}
