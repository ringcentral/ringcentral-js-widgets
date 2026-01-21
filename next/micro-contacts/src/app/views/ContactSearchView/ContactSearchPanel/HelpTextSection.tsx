import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { Text } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React, { memo } from 'react';

import type { TabsEnumType } from './ContactSearchPanelEnum';
import { HintsType, TabsEnum } from './ContactSearchPanelEnum';
import i18n, { type I18nKey } from './i18n';

interface HelpTextSectionProps {
  inputLength: number;
  activeTab: TabsEnumType;
  hasRecords: boolean;
  sourceName?: string;
  searchMinimumLength?: number;
  isLoading?: boolean;
}

const HintsMap = {
  title: HintsType.noFilterOrSearchRecordsTitle,
  context: HintsType.noFilterOrSearchRecordsContent,
};

export const HelpTextSection: FunctionComponent<HelpTextSectionProps> = memo(
  ({
    inputLength,
    activeTab,
    hasRecords,
    sourceName,
    searchMinimumLength = 3,
    isLoading,
  }) => {
    let hintTitleKey!: I18nKey;
    let hintContentKey;
    const { t } = useLocale(i18n);
    const isThirdPartyTab = activeTab === TabsEnum.thirdParty;

    if (isThirdPartyTab) {
      if (inputLength < searchMinimumLength) {
        hintContentKey = HintsType.thirdPartyNoRecordsContent;
      } else if (isLoading) {
        hintContentKey = HintsType.searching;
      } else if (!hasRecords) {
        hintTitleKey = HintsMap.title;
        hintContentKey = HintsMap.context;
      }
    }

    if (!isThirdPartyTab && !hasRecords) {
      hintTitleKey = HintsMap.title;
      hintContentKey = HintsMap.context;
    }

    if (!hintTitleKey && !hintContentKey) {
      return <div className="h-2" />;
    }

    return (
      <div
        className={clsx(
          'flex flex-col mb-3',
          isLoading ? 'text-center' : 'text-left',
        )}
      >
        <div className="flex flex-col mx-4 mt-4 text-center">
          {!!hintTitleKey && (
            <Text
              data-sign="HelpSectionHintTitle"
              component="p"
              className="text-xs font-bold mb-1"
            >
              {t(hintTitleKey)}
            </Text>
          )}
          {!!hintContentKey && (
            <Text
              data-sign="HelpSectionHintContent"
              component="p"
              className="font-normal text-xs text-neutral-b2"
              noWrap={false}
            >
              {t(hintContentKey, {
                sourceName,
                minimumLength: searchMinimumLength,
              } as any)}
            </Text>
          )}
        </div>
      </div>
    );
  },
);
