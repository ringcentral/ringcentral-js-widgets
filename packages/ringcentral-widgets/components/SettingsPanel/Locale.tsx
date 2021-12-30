import React, { FunctionComponent } from 'react';

import InputLine from '../InputLine';
import LocalePicker from '../LocalePicker';
import i18n from './i18n';
import { LocaleProps } from './SettingsPanel.interface';

export const Locale: FunctionComponent<LocaleProps> = ({
  supportedLocales,
  currentLocale,
  savedLocale,
  saveLocale,
}) => {
  if (supportedLocales && supportedLocales.length > 1) {
    return (
      <InputLine label={i18n.getString('language', currentLocale)}>
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
