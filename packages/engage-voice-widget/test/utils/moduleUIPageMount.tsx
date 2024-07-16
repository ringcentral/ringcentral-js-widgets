import { RcThemeProvider } from '@ringcentral/juno';
import { mount } from 'enzyme';
import React from 'react';

/**
 * mount ui module with props automatically
 * @param page any module page
 * @param sourceProps props you want to set on page
 */
export const moduleUIPageMount = (page: any, sourceProps: any) => {
  const obj = page(sourceProps);
  const { Component, props } = obj;
  return mount(
    <RcThemeProvider>
      <Component {...props} />
    </RcThemeProvider>,
  );
};
