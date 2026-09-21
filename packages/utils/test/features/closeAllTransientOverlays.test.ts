/**
 * @jest-environment jsdom
 */
import { closeAllTransientOverlays } from '../../src/utils';

describe('closeAllTransientOverlays', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('clicks the emoji button, template backdrop, top Spring UI backdrop, and body', () => {
    const receivedEvents: string[] = [];
    const emojiMenu = document.createElement('div');
    const emojiButton = document.createElement('button');
    const templateBackdrop = document.createElement('div');
    const firstBackdrop = document.createElement('div');
    const topBackdrop = document.createElement('div');

    emojiMenu.id = 'emoji-menu';
    emojiButton.dataset.sign = 'emojiButton';
    templateBackdrop.dataset.sign = 'templatePopoverBackdrop';
    firstBackdrop.className = 'sui-backdrop';
    topBackdrop.className = 'sui-backdrop';
    document.body.append(
      emojiMenu,
      emojiButton,
      templateBackdrop,
      firstBackdrop,
      topBackdrop,
    );

    [emojiButton, templateBackdrop, firstBackdrop, topBackdrop].forEach(
      (element) => {
        element.addEventListener('click', () => {
          receivedEvents.push(element.dataset.sign ?? element.className);
        });
      },
    );
    document.body.addEventListener('click', (event) => {
      if (event.target === document.body) {
        receivedEvents.push('body');
      }
    });

    closeAllTransientOverlays({ documentRef: document, windowRef: window });

    expect(receivedEvents).toEqual([
      'emojiButton',
      'templatePopoverBackdrop',
      'sui-backdrop',
      'body',
    ]);
  });

  it('does not click the emoji button when the emoji menu is already closed', () => {
    const emojiButton = document.createElement('button');
    const clickListener = jest.fn();

    emojiButton.dataset.sign = 'emojiButton';
    emojiButton.addEventListener('click', clickListener);
    document.body.append(emojiButton);

    closeAllTransientOverlays({ documentRef: document, windowRef: window });

    expect(clickListener).not.toHaveBeenCalled();
  });

  it('dispatches a mouse-like click sequence on dismiss targets', () => {
    const templateBackdrop = document.createElement('div');
    const receivedEvents: string[] = [];

    templateBackdrop.dataset.sign = 'templatePopoverBackdrop';
    document.body.append(templateBackdrop);

    ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach(
      (type) => {
        templateBackdrop.addEventListener(type, (event) => {
          receivedEvents.push(
            `${event.type}:${event.bubbles}:${event.cancelable}`,
          );
        });
      },
    );

    closeAllTransientOverlays({ documentRef: document, windowRef: window });

    expect(receivedEvents).toEqual([
      'pointerdown:true:true',
      'mousedown:true:true',
      'pointerup:true:true',
      'mouseup:true:true',
      'click:true:true',
    ]);
  });
});
