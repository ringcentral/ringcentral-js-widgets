import React, { ComponentType } from 'react';
import { RcThemeProvider } from '@ringcentral/juno';
import { render } from '@testing-library/react';

type ReRender = (ui: React.ReactElement) => void;
type Render = typeof render;
type ReturnTypeOfRender = ReturnType<Render>;

/**
 * Render React component with `@testing-library/react`.
 *
 * @param {ComponentType} Component React component
 * @param {object} props the component's props
 */
export const mount: <T>(
  Component: ComponentType<T>,
  props: T,
  wrapThemeProvider?: boolean,
) => ReturnTypeOfRender = (Component, props, wrapThemeProvider = false) => {
  if (wrapThemeProvider) {
    return render(<Component {...props} />);
  }
  return render(
    <RcThemeProvider>
      <Component {...props} />
    </RcThemeProvider>,
  );
};

function _pageRender(
  page: any,
  sourceProps: any,
  render: Render,
  wrapThemeProvider?: boolean,
): ReturnTypeOfRender;
function _pageRender(
  page: any,
  sourceProps: any,
  rerender: ReRender,
  wrapThemeProvider?: boolean,
): void;
function _pageRender(
  page: any,
  sourceProps: any,
  renderOrRerender: ReRender | Render,
  wrapThemeProvider = true,
): ReturnTypeOfRender | void {
  const obj = page(sourceProps);
  const { Component, props } = obj;
  if (wrapThemeProvider) {
    return renderOrRerender(
      <RcThemeProvider>
        <Component {...props} />
      </RcThemeProvider>,
    );
  }
  return renderOrRerender(<Component {...props} />);
}

/**
 * mount ui module with props automatically
 * @param page any module page
 * @param sourceProps props you want to set on page
 */
export const pageMount = (
  page: any,
  sourceProps: any,
  wrapThemeProvider?: boolean,
) => {
  return _pageRender(page, sourceProps, render, wrapThemeProvider);
};

/**
 * ReRender React component with `@testing-library/react`.
 *
 * @param page any module page
 * @param sourceProps props you want to set on page
 */
export const pageUpdate = (
  page: any,
  sourceProps: any,
  rerender: ReRender,
  wrapThemeProvider?: boolean,
) => {
  return _pageRender(page, sourceProps, rerender, wrapThemeProvider);
};
