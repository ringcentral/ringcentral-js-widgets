/* eslint-disable import/export */

/**
 * https://testing-library.com/docs/react-testing-library/setup
 */
import { RcThemeProvider } from '@ringcentral/juno';
import { fireEvent, render } from '@testing-library/react';
import userEventBase from '@testing-library/user-event';
import React, { act } from 'react';

type UserEvent = typeof userEventBase;
type UserEventWithSetup = UserEvent & {
  setup: (options?: { advanceTimers?: (delay: number) => void }) => UserEvent;
};

type EditableElement = HTMLInputElement | HTMLTextAreaElement;

const isEditableElement = (element: Element): element is EditableElement =>
  element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement;

const parseTypingTokens = (text: string) => text.match(/\{[^}]+\}|./g) ?? [];

const changeValue = (element: Element, value: string) => {
  if (isEditableElement(element)) {
    fireEvent.input(element, { target: { value } });
    fireEvent.change(element, { target: { value } });
    return;
  }

  if (element instanceof HTMLElement && element.isContentEditable) {
    element.textContent = value;
    fireEvent.input(element);
  }
};

const getSelectionRange = (element: EditableElement) => {
  const start = element.selectionStart ?? element.value.length;
  const end = element.selectionEnd ?? start;

  return { start, end };
};

const replaceEditableSelection = (element: EditableElement, text: string) => {
  const { start, end } = getSelectionRange(element);
  const maxLength = element.maxLength;
  const selectedLength = end - start;
  const allowedLength =
    maxLength >= 0
      ? Math.max(maxLength - (element.value.length - selectedLength), 0)
      : text.length;
  const nextText = text.slice(0, allowedLength);
  const value = `${element.value.slice(0, start)}${nextText}${element.value.slice(
    end,
  )}`;
  changeValue(element, value);

  const cursor = start + nextText.length;
  element.setSelectionRange(cursor, cursor);
};

const deleteEditableSelection = (element: EditableElement) => {
  const { start, end } = getSelectionRange(element);
  const deleteStart = start === end ? Math.max(0, start - 1) : start;
  const value = `${element.value.slice(0, deleteStart)}${element.value.slice(
    end,
  )}`;
  changeValue(element, value);
  element.setSelectionRange(deleteStart, deleteStart);
};

const typeToken = (element: Element, token: string) => {
  const lowerToken = token.toLowerCase();
  const isEditable = isEditableElement(element);

  if (lowerToken === '{selectall}') {
    if (isEditable) {
      element.setSelectionRange(0, element.value.length);
    }
    return;
  }

  if (lowerToken === '{backspace}') {
    fireEvent.keyDown(element, { key: 'Backspace' });
    if (isEditable) {
      deleteEditableSelection(element);
    }
    fireEvent.keyUp(element, { key: 'Backspace' });
    return;
  }

  if (lowerToken === '{enter}') {
    fireEvent.keyDown(element, { key: 'Enter', code: 'Enter' });
    if (element instanceof HTMLTextAreaElement) {
      replaceEditableSelection(element, '\n');
    }
    fireEvent.keyUp(element, { key: 'Enter', code: 'Enter' });
    return;
  }

  if (lowerToken === '{esc}' || lowerToken === '{escape}') {
    fireEvent.keyDown(element, { key: 'Escape', code: 'Escape' });
    fireEvent.keyUp(element, { key: 'Escape', code: 'Escape' });
    return;
  }

  if (lowerToken === '{tab}') {
    fireEvent.keyDown(element, { key: 'Tab', code: 'Tab' });
    fireEvent.keyUp(element, { key: 'Tab', code: 'Tab' });
    return;
  }

  if (lowerToken === '{shift>}' || lowerToken === '{/shift}') {
    return;
  }

  const text = lowerToken === '{space}' ? ' ' : token;
  fireEvent.keyDown(element, { key: text });
  fireEvent.keyPress(element, { key: text, charCode: text.charCodeAt(0) });

  if (isEditable) {
    replaceEditableSelection(element, text);
  } else if (element instanceof HTMLElement && element.isContentEditable) {
    element.textContent = `${element.textContent ?? ''}${text}`;
    fireEvent.input(element);
  }

  fireEvent.keyUp(element, { key: text });
};

const typeText = (element: Element, text: string) => {
  for (const token of parseTypingTokens(text)) {
    typeToken(element, token);
  }
};

const createCompatUserEvent = (baseUserEvent: UserEvent): UserEventWithSetup => {
  const compatUserEvent: Partial<UserEventWithSetup> = {
    ...baseUserEvent,
    click: (element: Element, init?: MouseEventInit) => {
      if (element instanceof HTMLElement) {
        act(() => {
          element.focus();
        });
      }
      fireEvent.pointerDown(element, init);
      fireEvent.mouseDown(element, init);
      fireEvent.mouseUp(element, init);
      fireEvent.pointerUp(element, init);
      fireEvent.click(element, init);
      return Promise.resolve();
    },
    dblClick: (element: Element) => {
      if (element instanceof HTMLElement) {
        act(() => {
          element.focus();
        });
      }
      fireEvent.doubleClick(element);
      return Promise.resolve();
    },
    hover: (element: Element) => {
      fireEvent.pointerOver(element);
      fireEvent.mouseOver(element);
      fireEvent.mouseEnter(element);
      fireEvent.mouseMove(element);
      return Promise.resolve();
    },
    unhover: (element: Element) => {
      fireEvent.mouseOut(element);
      fireEvent.mouseLeave(element);
      fireEvent.pointerOut(element);
      return Promise.resolve();
    },
    clear: (element: Element) => {
      changeValue(element, '');
      return Promise.resolve();
    },
    type: (element: Element, text: string) => {
      if (element instanceof HTMLElement) {
        act(() => {
          element.focus();
        });
      }
      typeText(element, text);
      return Promise.resolve();
    },
    keyboard: (text: string) => {
      const activeElement = document.activeElement;

      if (activeElement) {
        typeText(activeElement, text);
      }

      return Promise.resolve();
    },
    selectOptions: (element: Element, values: string | string[]) => {
      fireEvent.change(element, { target: { value: values } });
      return Promise.resolve();
    },
    deselectOptions: (element: Element) => {
      fireEvent.change(element, { target: { value: '' } });
      return Promise.resolve();
    },
    upload: (element: Element, files: File | File[]) => {
      fireEvent.change(element, {
        target: { files: Array.isArray(files) ? files : [files] },
      });
      return Promise.resolve();
    },
    paste: (element: Element, text: string) => {
      fireEvent.paste(element, {
        clipboardData: {
          getData: () => text,
        },
      });
      return Promise.resolve();
    },
    setup: (options?: { advanceTimers?: (delay: number) => void }) => {
      if (typeof (baseUserEvent as UserEventWithSetup).setup === 'function') {
        return createCompatUserEvent(
          (baseUserEvent as UserEventWithSetup).setup(options),
        );
      }

      return createCompatUserEvent(baseUserEvent);
    },
  };

  return compatUserEvent as UserEventWithSetup;
};

const userEvent = createCompatUserEvent(userEventBase);

const AllTheProviders = ({ children }: any) => {
  return <RcThemeProvider>{children}</RcThemeProvider>;
};

const customRender: typeof render = (ui: any, options?: any) =>
  render(ui, {
    wrapper: AllTheProviders,
    ...options,
  }) as any;

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

export { userEvent };
