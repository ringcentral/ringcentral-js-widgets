import React, { ComponentType } from 'react';
import { RcThemeProvider } from '@ringcentral/juno';
import { render } from '@testing-library/react';

/**
 * mount ui module with props automatically
 * @param page any module page
 * @param sourceProps props you want to set on page
 */
export const pageMount = (page: any, sourceProps: any) => {
  const obj = page(sourceProps);
  const { Component, props } = obj;
  return render(
    <RcThemeProvider>
      <Component {...props} />
    </RcThemeProvider>,
  );
};

/**
 * Render React component with `@testing-library/react`.
 *
 * @param {ComponentType} Component React component
 * @param {object} props the component's props
 */
export const mount: <T>(
  Component: ComponentType<T>,
  props: T,
) => ReturnType<typeof render> = (Component, props) => {
  return render(
    <RcThemeProvider>
      <Component {...props} />
    </RcThemeProvider>,
  );
};
