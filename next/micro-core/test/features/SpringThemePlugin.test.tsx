import { render, screen } from '@ringcentral-integration/test-utils';
import React from 'react';

import { SpringThemePlugin } from '../../src/app/plugins/SpringThemePlugin';

jest.mock('@ringcentral-integration/next-core', () => {
  const actual = jest.requireActual('@ringcentral-integration/next-core');
  return {
    ...actual,
    useConnector: (selector: () => unknown) => selector(),
  };
});

describe('SpringThemePlugin', () => {
  const mockBrand = {
    brandConfig: { theme: {} },
    suiThemeMap: {},
  } as any;

  const mockTheme = {
    themeType: 'light',
    prefersReducedMotion: false,
  } as any;

  it('renders without scope by default', () => {
    const plugin = new SpringThemePlugin(mockBrand, mockTheme, {});
    const Provider = plugin.provider;
    const { container } = render(
      <Provider>
        <span>Child Content</span>
      </Provider>,
    );

    expect(screen.getByText('Child Content')).toBeInTheDocument();
    expect(
      container.querySelector('[data-sui-theme-scope="rc-chrome-ext"]'),
    ).toBeNull();
  });

  it('renders with scope when provided in SpringThemePluginOptions', () => {
    const plugin = new SpringThemePlugin(mockBrand, mockTheme, {
      scope: 'rc-chrome-ext',
      className: 'size-full',
    });
    const Provider = plugin.provider;
    const { container } = render(
      <Provider>
        <span>Child Content</span>
      </Provider>,
    );

    expect(screen.getByText('Child Content')).toBeInTheDocument();
    const scopedEl = container.querySelector(
      '[data-sui-theme-scope="rc-chrome-ext"]',
    );
    expect(scopedEl).toBeInTheDocument();
    expect(scopedEl).toHaveClass('size-full');
  });
});
