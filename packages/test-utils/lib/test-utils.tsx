/* eslint-disable import/export */
/**
 * https://testing-library.com/docs/react-testing-library/setup
 */
import React from 'react';
import { RcThemeProvider } from '@ringcentral/juno';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
