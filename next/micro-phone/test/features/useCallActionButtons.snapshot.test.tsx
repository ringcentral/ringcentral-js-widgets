import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';

import {
  ICallAction,
  useCallActionButtons,
} from '../../src/app/hooks/useCallActionButtons';

jest.mock('@ringcentral-integration/micro-core/src/app/hooks', () => ({
  useLocale: jest.fn(),
}));

describe('useCallActionButtons', () => {
  const t = jest.fn((key) => key);
  const onEffect = jest.fn();

  beforeEach(() => {
    (useLocale as jest.Mock).mockReturnValue({ t });
  });

  it('should return correct action buttons', () => {
    const actions: ICallAction[] = [
      { type: 'mute' },
      { type: 'unmute' },
      { type: 'hold' },
      { type: 'unHold' },
      { type: 'record' },
      { type: 'stopRecord' },
      { type: 'transfer' },
      { type: 'flip' },
      { type: 'park' },
      { type: 'merge' },
      { type: 'add' },
      { type: 'keypad' },
      { type: 'hangUp' },
      { type: 'voicemail' },
      { type: 'endAndAnswer' },
      { type: 'holdAndAnswer' },
      { type: 'ignore' },
      { type: 'answer' },
      { type: 'forward' },
      { type: 'reply' },
    ];

    const { result } = renderHook(() =>
      useCallActionButtons(actions, onEffect),
    );

    expect(result.current).toMatchInlineSnapshot(`
      [
        {
          "actionType": "mute",
          "color": "secondary",
          "disabled": undefined,
          "iconSize": "medium",
          "label": "mute",
          "onClick": [Function],
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
        },
        {
          "actionType": "unmute",
          "color": "primary",
          "disabled": undefined,
          "iconSize": "medium",
          "label": "unmute",
          "onClick": [Function],
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
          "variant": "inverted",
        },
        {
          "actionType": "hold",
          "color": "secondary",
          "disabled": undefined,
          "iconSize": "medium",
          "label": "hold",
          "onClick": [Function],
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
        },
        {
          "actionType": "unHold",
          "color": "primary",
          "disabled": undefined,
          "iconSize": "medium",
          "label": "unHold",
          "onClick": [Function],
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
          "variant": "inverted",
        },
        {
          "actionType": "record",
          "color": "secondary",
          "disabled": undefined,
          "iconSize": "medium",
          "label": "record",
          "onClick": [Function],
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
        },
        {
          "actionType": "stopRecord",
          "color": "danger",
          "disabled": undefined,
          "iconSize": "medium",
          "label": "stopRecord",
          "onClick": [Function],
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
          "variant": "inverted",
        },
        {
          "actionType": "transfer",
          "color": "secondary",
          "disabled": undefined,
          "iconSize": "medium",
          "label": "transfer",
          "onClick": [Function],
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
        },
        {
          "actionType": "flip",
          "color": "secondary",
          "disabled": undefined,
          "iconSize": "medium",
          "label": "flip",
          "onClick": [Function],
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
        },
        {
          "actionType": "park",
          "color": "secondary",
          "disabled": undefined,
          "iconSize": "medium",
          "label": "park",
          "onClick": [Function],
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
        },
        {
          "actionType": "merge",
          "color": "secondary",
          "disabled": undefined,
          "iconSize": "medium",
          "label": "mergeToConference",
          "onClick": [Function],
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
          "tooltip": "mergeTooltip",
        },
        {
          "actionType": "add",
          "color": "secondary",
          "disabled": undefined,
          "iconSize": "medium",
          "label": "add",
          "onClick": [Function],
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
        },
        {
          "actionType": "keypad",
          "color": "secondary",
          "disabled": undefined,
          "iconSize": "medium",
          "label": "keypad",
          "onClick": [Function],
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
        },
        {
          "actionType": "hangUp",
          "className": "sui-call-button-end",
          "color": "danger",
          "disabled": undefined,
          "iconSize": "medium",
          "label": "end",
          "onClick": [Function],
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
          "tooltip": "endCall",
          "variant": "contained",
        },
        {
          "actionType": "voicemail",
          "color": "danger",
          "disabled": undefined,
          "iconSize": "medium",
          "label": "voicemail",
          "onClick": [Function],
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
          "variant": "contained",
        },
        {
          "Component": [Function],
          "actionType": "endAndAnswer",
          "color": "secondary",
          "disabled": undefined,
          "iconSize": "medium",
          "label": "endAndAnswer",
          "onClick": [Function],
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
        },
        {
          "Component": [Function],
          "actionType": "holdAndAnswer",
          "color": "secondary",
          "disabled": undefined,
          "iconSize": "medium",
          "label": "holdAndAnswer",
          "onClick": [Function],
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
        },
        {
          "actionType": "ignore",
          "color": "secondary",
          "disabled": undefined,
          "iconSize": "medium",
          "label": "ignore",
          "onClick": [Function],
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
        },
        {
          "actionType": "answer",
          "color": "success",
          "disabled": undefined,
          "iconSize": "medium",
          "label": "answer",
          "onClick": [Function],
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
          "variant": "contained",
        },
        {
          "actionType": "forward",
          "color": "secondary",
          "disabled": undefined,
          "iconSize": "medium",
          "label": "forward",
          "onClick": [Function],
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
        },
        {
          "actionType": "reply",
          "color": "secondary",
          "disabled": undefined,
          "iconSize": "medium",
          "label": "reply",
          "onClick": [Function],
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
        },
      ]
    `);
  });

  it('should call onEffect when button is clicked', () => {
    const actions: ICallAction[] = [{ type: 'mute' }];
    const { result } = renderHook(() =>
      useCallActionButtons(actions, onEffect),
    );

    act(() => {
      result.current[0].onClick!({ stopPropagation: jest.fn() } as any);
    });

    expect(onEffect).toHaveBeenCalledWith('mute');
  });

  it('should handle disabled and href properties', () => {
    const actions: ICallAction[] = [{ type: 'mute', disabled: true }];
    const { result } = renderHook(() =>
      useCallActionButtons(actions, onEffect),
    );

    expect(result.current).toMatchInlineSnapshot(`
      [
        {
          "actionType": "mute",
          "color": "secondary",
          "disabled": true,
          "iconSize": "medium",
          "label": "mute",
          "onClick": [Function],
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
        },
      ]
    `);
  });
});
