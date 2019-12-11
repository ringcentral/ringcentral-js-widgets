import React, { FunctionComponent } from 'react';

import InputLine from '../../InputLine';
import LocalePicker from '../../LocalePicker';
import i18n from '../i18n';

export interface LocaleProps {
  currentLocale: string;
  supportedLocales?: string[];
  savedLocale?: string;
  saveLocale(locale: string): any;
}

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
