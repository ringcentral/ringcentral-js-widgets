import type { Store } from '@ringcentral-integration/next-core';
import {
  injectable,
  optional,
  PluginModule,
  useConnector,
} from '@ringcentral-integration/next-core';
import type { ThemeContainerProps } from '@ringcentral-integration/widgets/containers/ThemeContainer/ThemeContainer.interface';
import {
  createGlobalStyle,
  RcThemeProvider,
  StyleSheetManager,
} from '@ringcentral/juno';
import React, { PropsWithChildren, useEffect, useMemo } from 'react';

import { Theme } from '../../services';

import type {
  ThemePluginOptions,
  ThemePluginProps,
} from './Theme.plugin.interface';
import { getCssVariablesFromObject, getThemeVariableString } from './utils';

type GlobalVariablesStylesProps = Pick<ThemeContainerProps, 'variable'> & {
  addition?: string;
};

const GlobalVariablesStyles = createGlobalStyle<GlobalVariablesStylesProps>`
  :root {
    color-scheme: ${({ theme }) => theme.palette.type};
    ${({ variable, theme }) => getThemeVariableString(variable, theme)};
    ${({ addition }) => addition};
  }
`;

@injectable({
  name: 'ThemePlugin',
})
export class ThemePlugin extends PluginModule {
  private _hostStyleElement?: HTMLElement;

  constructor(
    private _theme: Theme,
    @optional('ThemePluginOptions')
    private _themePluginOptions: ThemePluginOptions,
  ) {
    super();
  }

  // for our old system can work with Juno, need host juno inside body, make that always have the higher priority, also make that work in shared worker
  private getHostElement() {
    return (
      this._themePluginOptions?.getHostElement?.() ||
      (() => {
        const element = document.createElement('div');
        element.setAttribute('id', 'theme-plugin-host');

        document.body.appendChild(element);
        return element;
      })()
    );
  }

  override afterCreateStore(store: Store) {
    if (global.document && !this._hostStyleElement) {
      this._hostStyleElement = this.getHostElement();
    }

    return store;
  }

  override provider = ({ children }: PropsWithChildren<ThemePluginProps>) => {
    const { variable, theme } = useConnector(() => {
      return {
        theme: this._theme.theme,
        variable: this._theme.variable,
      };
    });

    const junoCss = useMemo(
      () => getCssVariablesFromObject(theme?.palette as any, 'j-'),
      [theme?.palette],
    );

    useEffect(
      () => () => {
        this._hostStyleElement?.remove?.();
      },
      [],
    );

    return (
      <StyleSheetManager target={this._hostStyleElement}>
        <RcThemeProvider theme={theme}>
          <GlobalVariablesStyles variable={variable} addition={junoCss} />
          {children}
        </RcThemeProvider>
      </StyleSheetManager>
    );
  };
}
