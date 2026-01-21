import {
  autobind,
  delegate,
  injectable,
  useConnector,
  watch,
} from '@ringcentral-integration/next-core';
import {
  globalTransport,
  GlobalTransport,
  RcMicroAppView,
} from '@ringcentral-integration/next-micro';
import { RcBox, RcRadio, RcRadioGroup, RcText } from '@ringcentral/juno';
import React from 'react';

import type { Interaction } from '../../spec/interface';
import { GlobalStyle } from '../styles';

import { useLocale } from './hooks';
import i18n from './i18n';
import { Locale, Theme } from './services';
import { ModalView } from './views';

@injectable({
  name: 'CoreAppView',
})
export class CoreAppView extends RcMicroAppView {
  constructor(
    private _theme: Theme,
    private _locale: Locale,
    private _modalView: ModalView,
  ) {
    super();
    this.interaction();
  }

  protected interaction() {
    const transport = globalTransport as GlobalTransport<Interaction>;
    watch(
      this,
      () => this._locale.currentLocale,
      () => {
        transport.emit('changeLocale', this._locale.currentLocale);
      },
    );
    watch(
      this,
      () => this._theme.themeType,
      () => {
        transport.emit('changeThemeType', this._theme.themeType);
      },
    );
    transport.listen('getLocale', () => this._locale.currentLocale);
    transport.listen('getThemeType', () => this._theme.themeType);
    transport.listen('setLocale', (locale) => {
      this._locale.setLocale(locale);
      return this._locale.currentLocale;
    });
    transport.listen('setThemeType', (type) => {
      this._theme.setThemeType(type);
      return this._theme.themeType;
    });
  }

  @delegate('server')
  async setThemeType(type: string) {
    this._theme.setThemeType(type);
  }

  @autobind
  Example() {
    const { t, currentLocale } = useLocale(i18n);

    const themeType = useConnector(() => this._theme.themeType);

    return (
      <RcBox position="absolute" right="0" top="0">
        <div>
          <RcText>{t('themeMode')}</RcText>
          <RcRadioGroup
            row
            value={themeType}
            onChange={(e, theme) => {
              this.setThemeType(theme);
            }}
          >
            <RcRadio value="light" label={t('light')} />
            <RcRadio value="dark" label={t('dark')} />
            <RcRadio value="contrast" label={t('contrast')} />
          </RcRadioGroup>
        </div>

        <div>
          <RcText>{t('locale')}</RcText>
          <RcRadioGroup
            row
            value={currentLocale}
            onChange={(e, locale) => {
              this._locale.setLocale(locale);
            }}
          >
            <RcRadio value="en-US" label="en-US" />
            <RcRadio value="zh-CN" label="zh-CN" />
          </RcRadioGroup>
        </div>
      </RcBox>
    );
  }

  component() {
    const { t } = useLocale(i18n);
    if (!this.isAppShell) return null;
    return (
      <>
        <div>
          <RcBox p={4}>
            <RcText variant="headline2">
              <span role="img" aria-label="rocket">
                🚀
              </span>{' '}
              {t('appShell')}:{`${this.isAppShell}`}
            </RcText>
            <this.Example />
          </RcBox>
        </div>
        <GlobalStyle />
        <this._modalView.component />
      </>
    );
  }
}
