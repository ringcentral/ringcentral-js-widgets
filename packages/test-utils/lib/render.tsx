import type { ComponentType } from 'react';
import React from 'react';
import { RcThemeProvider } from '@ringcentral/juno';
import type { RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import preview from 'jest-preview';

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
  const element = <Component {...props} />;
  let app: RenderResult;
  const options = container ? { container } : {};
  if (disableAutoThemeProvider) {
    app = render(element, options);
  } else {
    app = render(<RcThemeProvider>{element}</RcThemeProvider>, options);
  }
  if (process.env.DEBUG === 'preview') {
    preview.debug();
  }
  return app;
};

/**
 * rerender Render React component with `@testing-library/react`.
 *
 * default will wrap the component with `RcThemeProvider`
 */
export const rerenderComponent = <T,>(
  rerender: ReRender,
  Component: ComponentType<T>,
  props: T,
  { disableAutoThemeProvider = false } = {},
) => {
  const element = <Component {...props} />;
  let app: RenderResult;
  if (disableAutoThemeProvider) {
    app = rerender(element);
  } else {
    app = rerender(<RcThemeProvider>{element}</RcThemeProvider>);
  }
  if (process.env.DEBUG === 'preview') {
    preview.debug();
  }
  return app;
};
