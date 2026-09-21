type OverlayEventWindow = Window & {
  MouseEvent: typeof MouseEvent;
  PointerEvent?: typeof PointerEvent;
};

export type CloseAllTransientOverlaysOptions = {
  documentRef?: Document;
  windowRef?: OverlayEventWindow;
};

const SPRING_UI_TRANSPARENT_BACKDROP_SELECTOR = '.sui-backdrop';
const SMS_TEMPLATE_POPOVER_BACKDROP_SELECTOR =
  '[data-sign="templatePopoverBackdrop"]';
const EMOJI_MENU_SELECTOR = '#emoji-menu';
const EMOJI_BUTTON_SELECTOR = '[data-sign="emojiButton"]';
const TRANSIENT_OVERLAY_DISMISS_TARGET_SELECTORS = [
  SMS_TEMPLATE_POPOVER_BACKDROP_SELECTOR,
  SPRING_UI_TRANSPARENT_BACKDROP_SELECTOR,
] as const;

const getMouseEventInit = (
  windowRef: OverlayEventWindow,
  buttons: number,
): MouseEventInit => ({
  bubbles: true,
  cancelable: true,
  view: windowRef,
  button: 0,
  buttons,
});

const createPointerEvent = (
  windowRef: OverlayEventWindow,
  type: string,
  buttons: number,
): MouseEvent | PointerEvent => {
  const eventInit: PointerEventInit = {
    ...getMouseEventInit(windowRef, buttons),
    pointerType: 'mouse',
    isPrimary: true,
  };

  if (typeof windowRef.PointerEvent === 'function') {
    return new windowRef.PointerEvent(type, eventInit);
  }

  return new windowRef.MouseEvent(type, eventInit);
};

const simulateMouseClick = (
  element: HTMLElement,
  windowRef: OverlayEventWindow,
): void => {
  element.dispatchEvent(createPointerEvent(windowRef, 'pointerdown', 1));
  element.dispatchEvent(
    new windowRef.MouseEvent('mousedown', getMouseEventInit(windowRef, 1)),
  );
  element.dispatchEvent(createPointerEvent(windowRef, 'pointerup', 0));
  element.dispatchEvent(
    new windowRef.MouseEvent('mouseup', getMouseEventInit(windowRef, 0)),
  );
  element.dispatchEvent(
    new windowRef.MouseEvent('click', getMouseEventInit(windowRef, 0)),
  );
};

const getTopElementBySelector = (
  documentRef: Document,
  selector: string,
): HTMLElement | undefined => {
  const elements = documentRef.querySelectorAll<HTMLElement>(selector);

  return elements[elements.length - 1];
};

export function closeAllTransientOverlays({
  documentRef = globalThis.document,
  windowRef = globalThis.window as OverlayEventWindow,
}: CloseAllTransientOverlaysOptions = {}): void {
  if (!documentRef || !windowRef) {
    return;
  }

  const emojiMenu = getTopElementBySelector(documentRef, EMOJI_MENU_SELECTOR);
  const emojiButton = getTopElementBySelector(
    documentRef,
    EMOJI_BUTTON_SELECTOR,
  );

  if (emojiMenu && emojiButton) {
    simulateMouseClick(emojiButton, windowRef);
  }

  TRANSIENT_OVERLAY_DISMISS_TARGET_SELECTORS.forEach((selector) => {
    const dismissTarget = getTopElementBySelector(documentRef, selector);

    if (dismissTarget) {
      simulateMouseClick(dismissTarget, windowRef);
    }
  });

  const body = documentRef.body ?? documentRef.documentElement;

  if (body) {
    simulateMouseClick(body, windowRef);
  }
}
