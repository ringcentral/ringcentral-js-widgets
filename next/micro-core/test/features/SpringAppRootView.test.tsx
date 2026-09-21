import { render, screen } from '@ringcentral-integration/test-utils';
import React from 'react';

import type { EnsureAudio } from '../../src/app/services';
import {
  SpringAppRootView,
  type AppRootViewOptions,
} from '../../src/app/views/AppRootView/SpringAppRoot.view';
import type { ModalViewProps } from '../../src/app/views/ModalView';
import type { SpringModalView } from '../../src/app/views/SpringModalView';
import type { SpringToastView } from '../../src/app/views/SpringToastView';

jest.mock('@ringcentral-integration/next-core', () => {
  const actual = jest.requireActual('@ringcentral-integration/next-core');
  return {
    ...actual,
    useConnector: (selector: () => unknown) => selector(),
  };
});

jest.mock('../../src/app/views/AppRootView/uiErrorIgnorer', () => ({
  uiErrorIgnorer: jest.fn(),
}));

type SetupResult = {
  view: SpringAppRootView;
  modalComponent: jest.Mock;
  toastComponent: jest.Mock;
  override: jest.Mock;
};

function setup(options?: AppRootViewOptions): SetupResult {
  const modalComponent = jest.fn(() => <div data-sign="modal-view" />);
  const toastComponent = jest.fn(() => <div data-sign="toast-view" />);
  const override = jest.fn(options?.useMainContentOverride ?? (() => false));

  const view = new SpringAppRootView(
    {
      expanded: false,
      expandedLayoutMainClass: 'expanded-layout-main-class',
    } as any,
    {
      component: modalComponent,
    } as unknown as SpringModalView,
    {
      component: toastComponent,
    } as unknown as SpringToastView,
    {
      ensure: jest.fn(),
    } as unknown as EnsureAudio,
    {
      ...options,
      useMainContentOverride: override,
    },
  );

  return {
    view,
    modalComponent,
    toastComponent,
    override,
  };
}

describe('SpringAppRootView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render default layout when useMainContentOverride returns undefined', () => {
    const { view, modalComponent, toastComponent, override } = setup({
      useMainContentOverride: () => undefined,
    });

    const Component = view.component.bind(view);

    render(
      <Component
        ModalViewProps={{ visible: true } as ModalViewProps}
        ToastViewProps={{} as any}
        header={<div data-sign="header">header</div>}
      >
        <div data-sign="content">content</div>
      </Component>,
    );

    expect(override).toHaveBeenCalledTimes(1);
    expect(screen.getByText('header')).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
    expect(
      document.querySelector('[data-sign="mainContent"]'),
    ).toBeInTheDocument();
    expect(modalComponent).toHaveBeenCalledTimes(1);
    expect(toastComponent).toHaveBeenCalledTimes(1);
    expect(
      document.querySelector('[data-sign="modal-view"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-sign="toast-view"]'),
    ).toBeInTheDocument();
  });

  test('should render default layout when useMainContentOverride returns false', () => {
    const { view, override } = setup({
      useMainContentOverride: () => false,
    });

    const Component = view.component.bind(view);

    render(
      <Component header={<div data-sign="header">header</div>}>
        <div data-sign="content">content</div>
      </Component>,
    );

    expect(override).toHaveBeenCalledTimes(1);
    expect(screen.getByText('header')).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
    expect(
      document.querySelector('[data-sign="mainContent"]'),
    ).toBeInTheDocument();
  });

  test('should render override content when useMainContentOverride returns a node', () => {
    const { view, modalComponent, toastComponent, override } = setup({
      useMainContentOverride: () => (
        <div data-sign="override-content">override-content</div>
      ),
    });

    const Component = view.component.bind(view);

    render(
      <Component header={<div data-sign="header">header</div>}>
        <div data-sign="content">content</div>
      </Component>,
    );

    expect(override).toHaveBeenCalledTimes(1);
    expect(screen.getByText('override-content')).toBeInTheDocument();
    expect(screen.queryByText('header')).not.toBeInTheDocument();
    expect(screen.queryByText('content')).not.toBeInTheDocument();
    expect(
      document.querySelector('[data-sign="mainContent"]'),
    ).not.toBeInTheDocument();
    expect(modalComponent).not.toHaveBeenCalled();
    expect(toastComponent).not.toHaveBeenCalled();
    expect(
      document.querySelector('[data-sign="modal-view"]'),
    ).not.toBeInTheDocument();
    expect(
      document.querySelector('[data-sign="toast-view"]'),
    ).not.toBeInTheDocument();
  });

  test('should hide default layout and render override children in hidden mode', () => {
    const { view, modalComponent, toastComponent, override } = setup({
      useMainContentOverride: () => ({
        hiddenMode: true,
        children: (
          <div data-sign="hidden-mode-content">hidden-mode-content</div>
        ),
      }),
    });

    const Component = view.component.bind(view);

    render(
      <Component header={<div data-sign="header">header</div>}>
        <div data-sign="content">content</div>
      </Component>,
    );

    expect(override).toHaveBeenCalledTimes(1);
    expect(screen.getByText('hidden-mode-content')).toBeInTheDocument();
    expect(screen.getByText('header')).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
    expect(
      document.querySelector('[data-sign="mainContent"]'),
    ).toBeInTheDocument();
    expect(screen.getByText('header').parentElement).toHaveClass('hidden');
    expect(modalComponent).not.toHaveBeenCalled();
    expect(toastComponent).not.toHaveBeenCalled();
    expect(
      document.querySelector('[data-sign="modal-view"]'),
    ).not.toBeInTheDocument();
    expect(
      document.querySelector('[data-sign="toast-view"]'),
    ).not.toBeInTheDocument();
  });
});
