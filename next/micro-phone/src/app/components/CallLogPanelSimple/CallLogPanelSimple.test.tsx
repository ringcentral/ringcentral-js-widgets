import React from 'react';
import TestRenderer, { ReactTestRenderer } from 'react-test-renderer';

import CallLogPanelSimple from './CallLogPanelSimple';

jest.mock('@ringcentral-integration/widgets/components/BackHeaderV2', () => {
  const ReactModule = jest.requireActual('react');
  return {
    __esModule: true,
    default: (props: Record<string, unknown>) => (
      <div data-testid="back-header" {...props} />
    ),
  };
});

jest.mock('@ringcentral-integration/widgets/components/SpinnerOverlay', () => {
  const ReactModule = jest.requireActual('react');
  return {
    __esModule: true,
    SpinnerOverlay: (props: Record<string, unknown>) => (
      <div data-testid="spinner-overlay" {...props} />
    ),
  };
});

describe('CallLogPanelSimple root layout', () => {
  let renderer: ReactTestRenderer | undefined;

  afterEach(() => {
    renderer?.unmount();
    renderer = undefined;
  });

  function renderPanel(props: Record<string, any>) {
    TestRenderer.act(() => {
      renderer = TestRenderer.create(
        <CallLogPanelSimple
          {...(props as any)}
          header={false}
          renderSaveLogButton={jest.fn(() => null)}
        />,
      );
    });
    return renderer!;
  }

  function getRootDiv() {
    const panel = renderer!.root.findByType(CallLogPanelSimple);
    const div = panel.children[0] as any;
    expect(div.type).toBe('div');
    return div;
  }

  test('applies the left nav class when rootLayout is true', () => {
    renderer = renderPanel({ rootLayout: true });

    expect(getRootDiv().props.className).toContain('callLogPanelClassLeftNav');
  });

  test('applies the default call log panel class when rootLayout is false', () => {
    renderer = renderPanel({ rootLayout: false });

    const className = getRootDiv().props.className as string;
    expect(className).toContain('callLogPanelClass');
    expect(className).not.toContain('callLogPanelClassLeftNav');
  });

  test('treats a truthy classes.root as an enabled root layout', () => {
    renderer = renderPanel({ classes: { root: 'custom-root' } });

    const className = getRootDiv().props.className as string;
    expect(className).toContain('callLogPanelClass');
    expect(className).not.toContain('custom-root');
  });

  test('renders without an extra root layout class by default', () => {
    renderer = renderPanel({});

    const className = getRootDiv().props.className as string;
    expect(className).not.toContain('callLogPanelClass');
    expect(className).toContain('root');
  });
});
