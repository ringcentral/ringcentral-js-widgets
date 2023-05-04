import React, { FunctionComponent, memo } from 'react';

import { format } from '@ringcentral-integration/utils';
import { RcText } from '@ringcentral/juno';

import { HintsType, TabsEnum, TabsEnumType } from './ContactSearchPanelEnum';
import i18n from './i18n';
import {
  HelpTextSectionWrapper,
  HintsWrapper,
  StyledHintsTitle,
} from './styles';

interface HelpTextSectionProps {
  inputLength: number;
  activeTab: TabsEnumType;
  hasRecords: boolean;
  currentLocale: string;
  sourceName: string;
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
    currentLocale,
    sourceName,
    searchMinimumLength = 3,
    isLoading,
  }) => {
    let hintTitleKey;
    let hintContentKey;
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
      return null;
    }

    return (
      // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
      <HelpTextSectionWrapper isLoading={isLoading}>
        <HintsWrapper>
          {!!hintTitleKey && (
            <StyledHintsTitle
              data-sign="HelpSectionHintTitle"
              variant="caption2"
            >
              {i18n.getString(hintTitleKey, currentLocale)}
            </StyledHintsTitle>
          )}
          {!!hintContentKey && (
            <RcText
              data-sign="HelpSectionHintContent"
              variant="caption1"
              color="neutral.b04"
              noWrap={false}
            >
              {format(i18n.getString(hintContentKey, currentLocale), {
                sourceName,
                minimumLength: searchMinimumLength,
              })}
            </RcText>
          )}
        </HintsWrapper>
      </HelpTextSectionWrapper>
    );
  },
);
