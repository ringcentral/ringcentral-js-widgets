/**
 * automatically focus on a specified target element when the page is focused.
 *
 * This purpose is to avoid grab user's focus on other elements when they not interact with the page, like load page in iframe.
 *
 * that have debouncing to prevent unwanted focus changes when users interact with other elements.
 * TODO: when one page has multiple focusable elements, we need to add a way to specify which element to focus.
 */
export declare const usePageAutoFocus: (targetRef: React.RefObject<HTMLElement | null>, enable?: boolean) => void;
