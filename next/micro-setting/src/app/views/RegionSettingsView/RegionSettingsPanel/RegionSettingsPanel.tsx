import {
  AppFooterNav,
  AppHeaderNav,
} from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { PageHeader } from '@ringcentral-integration/next-widgets/components';
import { useAsyncState } from '@ringcentral-integration/react-hooks';
import countryNamesI18n from '@ringcentral-integration/widgets/lib/countryNames';
import { Option, Select, TextField } from '@ringcentral/spring-ui';
import React, { useMemo } from 'react';

import type { RegionSettingsViewPanelProps } from '../RegionSettings.view.interface';

import i18n from './i18n';

export function formatCountryDisplay(callingCode: string, countryName: string) {
  return `(+${callingCode}) ${countryName}`;
}

export const RegionSettingsPanel: React.FC<RegionSettingsViewPanelProps> = ({
  onBackButtonClick,
  availableCountries,
  countryCode,
  areaCode,
  onSave,
  canAreaCodeShow,
}) => {
  const [countryCodeValue, setCountryCodeValue] = useAsyncState(
    countryCode,
    (value) =>
      onSave?.({
        countryCode: value,
        // when areaCode is change, always reset areaCode to empty
        areaCode: '',
      }),
  );
  const canAreaCodeShowResult = canAreaCodeShow?.(countryCodeValue) || false;

  const [areaCodeValue, setAreaCodeValue] = useAsyncState(areaCode, (value) =>
    onSave?.({
      areaCode: value,
    }),
  );
  const { t } = useLocale(i18n, countryNamesI18n);

  const onAreaCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setAreaCodeValue(value);
  };

  const renderValue = (value: any) => {
    const selectedOption = availableCountries.find(
      (country) => country.isoCode === value,
    );
    if (!selectedOption) return '';

    return formatCountryDisplay(
      selectedOption.callingCode!,
      t(selectedOption.isoCode as any),
    );
  };

  const hasNA = useMemo(
    () =>
      !!availableCountries.find((c) => c.isoCode === 'US') ||
      !!availableCountries.find((c) => c.isoCode === 'CA'),
    [availableCountries],
  );

  const message = useMemo(() => {
    if (availableCountries.length > 1) {
      return t(hasNA ? 'MultiWithNAMessage' : 'MultiWithoutNAMessage');
    }

    if (hasNA) {
      return t('NAOnlyMessage');
    }

    return undefined;
  }, [availableCountries.length, hasNA, t]);

  return (
    <>
      <AppHeaderNav override>
        <PageHeader onBackClick={onBackButtonClick}>{t('title')}</PageHeader>
      </AppHeaderNav>
      <div className="flex-auto overflow-y-auto overflow-x-hidden px-4 py-2">
        <div data-sign="countryCodeHint" className="pb-2 typography-subtitle">
          {message}
        </div>
        <Select
          label={t('country')}
          value={countryCodeValue}
          renderValue={renderValue}
          size="large"
          data-sign="countryCodeSelect"
          variant="outlined"
          onChange={(e: any) => setCountryCodeValue(e.target.value)}
        >
          {availableCountries.map((option) => (
            <Option
              data-sign="selectMenuItem"
              data-value={option.isoCode}
              key={option.isoCode}
              value={option.isoCode}
            >
              {formatCountryDisplay(
                option.callingCode!,
                t(option.isoCode as any),
              )}
            </Option>
          ))}
        </Select>
        {canAreaCodeShowResult && (
          <TextField
            label={t('areaCode')}
            fullWidth
            size="medium"
            variant="outlined"
            inputProps={{
              'data-sign': 'areaCodeInputField',
            }}
            placeholder={t('areaCodePlaceholder')}
            value={areaCodeValue}
            onChange={onAreaCodeChange}
          />
        )}
      </div>
      <AppFooterNav />
    </>
  );
};
