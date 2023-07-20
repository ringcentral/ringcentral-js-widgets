import type { FunctionComponent } from 'react';
import React from 'react';

import InputLine from '../InputLine';
import LocalePicker from '../LocalePicker';
import i18n from './i18n';
import type { LocaleProps } from './SettingsPanel.interface';

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
          // @ts-expect-error TS(2769): No overload matches this call.
          value={savedLocale}
          onChange={saveLocale}
          options={supportedLocales}
        />
      </InputLine>
    );
  }
  return null;
};
