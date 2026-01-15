/**
 * A React hook that tracks whether a page has ever been visible to the user.
 *
 * This hook is particularly useful for work with requestAnimationFrame, because the requestAnimationFrame will not be triggered until the page is visible.
 *
 */
export declare const useEverVisible: () => boolean;
