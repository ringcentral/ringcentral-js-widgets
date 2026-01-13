import type { FunctionComponent } from 'react';
import React from 'react';

import InputLine from '../InputLine';
import LocalePicker from '../LocalePicker';

import type { LocaleProps } from './SettingsPanel.interface';
import { t } from './i18n';

export const Locale: FunctionComponent<LocaleProps> = ({
  supportedLocales,
  savedLocale,
  saveLocale,
}) => {
  if (
    savedLocale &&
    saveLocale &&
    supportedLocales &&
    supportedLocales.length > 1
  ) {
    return (
      <InputLine label={t('language')}>
        <LocalePicker
          value={savedLocale}
          onChange={saveLocale}
          options={supportedLocales}
        />
      </InputLine>
    );
  }
  return null;
};
