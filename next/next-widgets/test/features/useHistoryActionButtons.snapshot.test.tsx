import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { renderHook } from '@testing-library/react';
import { act } from 'react';

import {
  HistoryAction,
  useHistoryActionButtons,
} from '../../components/ActionMenuList/useHistoryActionButtons';

jest.mock('@ringcentral-integration/micro-core/src/app/hooks', () => ({
  useLocale: jest.fn(),
}));

describe('useHistoryActionButtons', () => {
  const t = jest.fn((key) => key);
  const onEffect = jest.fn();

  beforeEach(() => {
    (useLocale as jest.Mock).mockReturnValue({ t });
  });

  it('should return correct action buttons', () => {
    const actions: HistoryAction[] = [
      { type: 'addEntity' },
      { type: 'viewEntity' },
      { type: 'delete' },
      { type: 'call' },
      { type: 'text' },
      { type: 'viewFax' },
      { type: 'copyNumber' },
      { type: 'mark' },
      { type: 'unmark' },
      { type: 'createLog' },
      { type: 'viewLog' },
    ];

    const { result } = renderHook(() =>
      useHistoryActionButtons(actions, onEffect),
    );

    expect(result.current).toMatchInlineSnapshot(`
      [
        {
          "actionType": "addEntity",
          "color": "secondary",
          "disabled": undefined,
          "label": "addEntity",
          "onClick": [Function],
          "shape": "squircle",
          "size": "medium",
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
          "variant": "outlined",
        },
        {
          "actionType": "viewEntity",
          "color": "secondary",
          "disabled": undefined,
          "label": "viewDetails",
          "onClick": [Function],
          "shape": "squircle",
          "size": "medium",
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
          "variant": "outlined",
        },
        {
          "actionType": "delete",
          "color": "secondary",
          "disabled": undefined,
          "label": "delete",
          "onClick": [Function],
          "shape": "squircle",
          "size": "medium",
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
          "variant": "outlined",
        },
        {
          "actionType": "call",
          "color": "secondary",
          "disabled": undefined,
          "label": "call",
          "onClick": [Function],
          "shape": "squircle",
          "size": "medium",
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
          "variant": "outlined",
        },
        {
          "actionType": "text",
          "color": "secondary",
          "disabled": undefined,
          "label": "text",
          "onClick": [Function],
          "shape": "squircle",
          "size": "medium",
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
          "variant": "outlined",
        },
        {
          "actionType": "viewFax",
          "color": "secondary",
          "disabled": undefined,
          "label": "viewFax",
          "onClick": [Function],
          "shape": "squircle",
          "size": "medium",
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
          "variant": "outlined",
        },
        {
          "actionType": "copyNumber",
          "color": "secondary",
          "disabled": undefined,
          "label": "copyNumber",
          "onClick": [Function],
          "shape": "squircle",
          "size": "medium",
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
          "variant": "outlined",
        },
        {
          "actionType": "mark",
          "color": "secondary",
          "disabled": undefined,
          "label": "mark",
          "onClick": [Function],
          "shape": "squircle",
          "size": "medium",
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
          "variant": "outlined",
        },
        {
          "actionType": "unmark",
          "color": "secondary",
          "disabled": undefined,
          "label": "unmark",
          "onClick": [Function],
          "shape": "squircle",
          "size": "medium",
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
          "variant": "outlined",
        },
        {
          "actionType": "createLog",
          "color": "secondary",
          "disabled": undefined,
          "label": "createLog",
          "onClick": [Function],
          "shape": "squircle",
          "size": "medium",
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
          "variant": "outlined",
        },
        {
          "actionType": "viewLog",
          "color": "secondary",
          "disabled": undefined,
          "label": undefined,
          "onClick": [Function],
          "shape": "squircle",
          "size": "medium",
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
          "variant": "outlined",
        },
      ]
    `);
  });

  it('should call onEffect when button is clicked', () => {
    const actions: HistoryAction[] = [{ type: 'addEntity' }];
    const { result } = renderHook(() =>
      useHistoryActionButtons(actions, onEffect),
    );

    act(() => {
      result.current[0].onClick!({ stopPropagation: jest.fn() } as any);
    });

    expect(onEffect.mock.calls[0][0]).toBe('addEntity');
  });

  it('should return manage consent action button', () => {
    const actions: HistoryAction[] = [{ type: 'manageConsent' }];
    const { result } = renderHook(() =>
      useHistoryActionButtons(actions, onEffect),
    );

    expect(result.current[0]).toEqual(
      expect.objectContaining({
        actionType: 'manageConsent',
        label: 'manageConsent',
      }),
    );
  });

  it('should handle disabled and href properties', () => {
    const actions: HistoryAction[] = [
      { type: 'downloadFax', disabled: true, href: 'http://example.com' },
    ];
    const { result } = renderHook(() =>
      useHistoryActionButtons(actions, onEffect),
    );

    expect(result.current).toMatchInlineSnapshot(`
      [
        {
          "actionType": "downloadFax",
          "color": "secondary",
          "component": "a",
          "disabled": true,
          "download": true,
          "href": "http://example.com",
          "label": "downloadFax",
          "onClick": [Function],
          "rel": "noreferrer",
          "shape": "squircle",
          "size": "medium",
          "symbol": {
            "$$typeof": Symbol(react.memo),
            "compare": null,
            "type": {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
          },
          "target": "_blank",
          "variant": "outlined",
        },
      ]
    `);
  });
});
