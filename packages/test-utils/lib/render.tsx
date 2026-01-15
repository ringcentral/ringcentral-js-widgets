import { RcThemeProvider } from '@ringcentral/juno';
import type { RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import preview from 'jest-preview';
import type { ComponentType } from 'react';
import React from 'react';

type ReRender = (ui: React.ReactElement) => RenderResult;
type Render = typeof render;

export type ReturnTypeOfRender = ReturnType<Render>;

type RenderComponent = <T>(
  /**
   * Component to render
   */
  Component: ComponentType<T>,
  /**
   * Props to pass to the component
   */
  props: T,
  /**
   * options for render
   */
  options?: {
    /**
     * auto wrap with `RcThemeProvider`
     *
     * @default true
     */
    disableAutoThemeProvider?: boolean;
  },
) => ReturnTypeOfRender;

/**
 * Render React component with `@testing-library/react`.
 *
 * default will wrap the component with `RcThemeProvider`
 */
export const renderComponent: RenderComponent = (
  Component,
  props,
  {
    disableAutoThemeProvider = false,
    container,
  }: {
    disableAutoThemeProvider?: boolean;
    container?: HTMLElement;
  } = {},
) => {
  // @ts-ignore
  const element = <Component {...props} />;
  let app: RenderResult;
  const options = container ? { container } : {};
  if (disableAutoThemeProvider) {
    app = render(element, options);
  } else {
    app = render(<RcThemeProvider>{element}</RcThemeProvider>, options);
  }
  previewProcess();
  return app;
};

type RerenderComponent = <T>(
  rerender: ReRender,
  Component: ComponentType<T>,
  props: T,
  options?: { disableAutoThemeProvider?: boolean },
) => RenderResult;

/**
 * rerender Render React component with `@testing-library/react`.
 *
 * default will wrap the component with `RcThemeProvider`
 */
export const rerenderComponent: RerenderComponent = (
  rerender,
  Component,
  props,
  { disableAutoThemeProvider = false } = {},
) => {
  const element = <Component {...(props as any)} />;
  let app: RenderResult;
  if (disableAutoThemeProvider) {
    app = rerender(element);
  } else {
    app = rerender(<RcThemeProvider>{element}</RcThemeProvider>);
  }
  previewProcess();

  return app;
};

function previewProcess() {
  if (process.env.DEBUG?.split(',').includes('preview')) {
    preview.debug();
  }
}
