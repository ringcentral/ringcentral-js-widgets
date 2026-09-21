import {
  AppFooterNav,
  AppHeaderNav,
} from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  Line,
  PageHeader,
  SelectLine,
} from '@ringcentral-integration/next-widgets/components';
import { ThemeProvider } from '@ringcentral/spring-theme';
import React from 'react';

import { Section } from '../../../components/Section';
import type { ThemeSwitchViewPanelProps } from '../ThemeSwitch.view.interface';

import i18n from './i18n';

export function formatCountryDisplay(callingCode: string, countryName: string) {
  return `(+${callingCode}) ${countryName}`;
}

export const ThemeSwitchPanel: React.FC<ThemeSwitchViewPanelProps> = ({
  themeId: themeIdProp,
  onThemeIdChange,
  themeType,
  themeTypeOptions,
  onThemeTypeChange,
  themeMap,
  onBack,
  prefersReducedMotion,
  onPrefersReducedMotionChange,
  reducedMotionOptions,
}) => {
  const { t } = useLocale(i18n);

  const themeId = themeIdProp || themeMap.light?.[0]?.id;

  return (
    <>
      <AppHeaderNav override>
        <PageHeader onBackClick={onBack}>{t('theme')}</PageHeader>
      </AppHeaderNav>
      <div className="flex-auto overflow-y-auto overflow-x-hidden px-4 py-2 space-y-5">
        <Section label={t('colorThemes')}>
          <SelectLine
            value={themeType}
            onChange={onThemeTypeChange}
            options={themeTypeOptions}
            border
          >
            {t('label')}
          </SelectLine>
          <Line divider={false} className="-mt-2">
            <span className="text-neutral-b2 typography-descriptorMini">
              {t('description')}
            </span>
          </Line>
          {/* TODO: support theme id change, but currently that not have target theme map and info */}
          <Line className="pt-2">
            {themeMap.light.map(({ id, theme }) => (
              <ThemeProvider scope={`scope-${id}`} theme={theme} key={id}>
                <button
                  className="bg-primary-f size-6 flex items-center justify-center p-2 rounded text-neutral-b5"
                  onClick={() => {
                    onThemeIdChange(id);
                  }}
                >
                  {id === themeId ? '✓' : ''}
                </button>
              </ThemeProvider>
            ))}
          </Line>
        </Section>
        <Section label={t('accessibility')}>
          <SelectLine
            value={prefersReducedMotion}
            onChange={onPrefersReducedMotionChange as any}
            options={reducedMotionOptions}
            border
          >
            {t('reduceMotion')}
          </SelectLine>
          <Line divider={false} className="-mt-2">
            <span className="text-neutral-b2 typography-descriptorMini">
              {t('reduceMotionDescription')}
            </span>
          </Line>
        </Section>
      </div>
      <AppFooterNav />
    </>
  );
};
