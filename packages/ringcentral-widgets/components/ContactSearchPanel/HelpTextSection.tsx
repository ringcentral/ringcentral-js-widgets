import React, { memo, FunctionComponent } from 'react';
import formatMessage from 'format-message';
import {
  RcListItem,
  RcListItemSecondaryAction,
  RcIcon,
  RcText,
} from '@ringcentral/juno';
import { Search } from '@ringcentral/juno/icon';
import { TabsEnum, TabsEnumType, HintsType } from './ContactSearchPanelEnum';
import {
  HelpTextSectionWrapper,
  StyledHintsTitle,
  StyledListItemText,
  HintsWrapper,
} from './styles';
import i18n from './i18n';

interface HelpTextSectionProps {
  onClick?: (...args: any[]) => any;
  inputLength: number;
  activeTab: TabsEnumType;
  hasRecords: boolean;
  showSearchResult: boolean;
  currentLocale: string;
  sourceName: string;
  searchMinimumLength?: number;
}

const HintsMap = {
  [TabsEnum.company]: {
    noRecord: { title: '', context: '' },
    noFilterRecord: {
      title: HintsType.noFilterOrSearchRecordsTitle,
      context: HintsType.noFilterOrSearchRecordsContent,
    },
  },
  [TabsEnum.personal]: {
    noRecord: {
      title: HintsType.personalNoRecordsTitle,
      context: HintsType.personalNoRecordsContent,
    },
    noFilterRecord: {
      title: HintsType.noFilterOrSearchRecordsTitle,
      context: HintsType.noFilterOrSearchRecordsContent,
    },
  },
  [TabsEnum.thirdParty]: {
    noRecord: {
      title: HintsType.thirdPartyNoRecordsTitle,
      context: HintsType.thirdPartyNoRecordsContent,
    },
    noFilterRecord: {
      title: HintsType.noFilterOrSearchRecordsTitle,
      context: HintsType.thirdPartyNoRecordsContent,
    },
    noSearchRecord: {
      title: HintsType.noFilterOrSearchRecordsTitle,
      context: HintsType.noFilterOrSearchRecordsContent,
    },
  },
};

export const HelpTextSection: FunctionComponent<HelpTextSectionProps> = memo(
  ({
    inputLength,
    activeTab,
    hasRecords,
    onClick,
    showSearchResult,
    currentLocale,
    sourceName,
    searchMinimumLength = 3,
  }) => {
    let thirdPartySearchBar;
    let hintsSection;
    let hintTitleKey;
    let hintContentKey;
    let recentlyCallTitle;
    const noInputString = inputLength === 0;
    const isThirdPartyTab = activeTab === TabsEnum.thirdParty;

    if (inputLength >= searchMinimumLength && isThirdPartyTab) {
      thirdPartySearchBar = (
        <RcListItem onClick={onClick} data-sign="HelpSectionSearchBar">
          <StyledListItemText
            color="neutral.f06"
            secondary={formatMessage(
              i18n.getString(HintsType.searchBarContent, currentLocale),
              {
                sourceName,
              },
            )}
          />
          <RcListItemSecondaryAction>
            <RcIcon color="action.primary" symbol={Search} />
          </RcListItemSecondaryAction>
        </RcListItem>
      );
    }

    if (!hasRecords) {
      let hintsKeyMap;
      const noRecordKey = noInputString ? 'noRecord' : 'noFilterRecord';

      if (isThirdPartyTab) {
        const mapKey = showSearchResult ? 'noSearchRecord' : noRecordKey;
        hintsKeyMap = HintsMap[activeTab][mapKey];
      } else {
        hintsKeyMap = HintsMap[activeTab][noRecordKey];
      }
      hintTitleKey = hintsKeyMap.title;
      hintContentKey = hintsKeyMap.context;
    }

    if (hasRecords && isThirdPartyTab) {
      if (!showSearchResult) {
        recentlyCallTitle = HintsType.thirdPartyRecordsTitle;
      }

      if (inputLength > 0 && inputLength < searchMinimumLength) {
        hintContentKey = HintsType.thirdPartyNoRecordsContent;
      }
    }

    if (hintTitleKey || hintContentKey || recentlyCallTitle) {
      hintsSection = (
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
              {formatMessage(i18n.getString(hintContentKey, currentLocale), {
                sourceName,
              })}
            </RcText>
          )}
          {!!recentlyCallTitle && (
            <StyledHintsTitle
              data-sign="HelpSectionHintTitle"
              variant="caption2"
            >
              {i18n.getString(recentlyCallTitle, currentLocale)}
            </StyledHintsTitle>
          )}
        </HintsWrapper>
      );
    }

    return (
      <HelpTextSectionWrapper>
        {thirdPartySearchBar}
        {hintsSection}
      </HelpTextSectionWrapper>
    );
  },
);
