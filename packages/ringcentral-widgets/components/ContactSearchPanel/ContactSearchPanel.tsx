import React, {
  FunctionComponent,
  useState,
  useImperativeHandle,
  useEffect,
  useCallback,
} from 'react';
import {
  RcPaper,
  RcTab,
  RcTabs,
  RcText,
  styled,
  RcAvatar,
  RcSuggestionList,
  useSuggestionList,
  RcListItemText,
  RcMenuItem,
  RcLoading,
  usePrevious,
} from '@ringcentral/juno';
import { phoneTypes } from '@ringcentral-integration/commons/enums/phoneTypes';
import {
  ContactSearchPanelProps,
  IContactSearchItem,
} from '../../modules/ContactSearchUI';
import { useCommunicationSetupContext } from '../../contexts';
import { TabsEnum, TabsEnumType } from './ContactSearchPanelEnum';
import { HelpTextSection } from './HelpTextSection';
import i18n from './i18n';

const StyledContactSearchPanel = styled.div`
  position: relative;
  background: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const FullSizeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

export const ContactSearchPanel: FunctionComponent<ContactSearchPanelProps> = ({
  companyContacts,
  personalContacts,
  thirdPartyContacts = [],
  optionClickHandler,
  userInput,
  searchHandler,
  inputRef,
  setFilterString,
  thirdPartySourceName,
  currentLocale,
  formatPhone,
}) => {
  const [activeTab, setActiveTab] = useState<TabsEnumType>(TabsEnum.thirdParty);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchResult, setSearchResult] = useState<IContactSearchItem[]>([]);
  const previousUserInput = usePrevious(() => userInput);

  const optionsMap = {
    [TabsEnum.thirdParty]: thirdPartyContacts,
    [TabsEnum.company]: companyContacts,
    [TabsEnum.personal]: personalContacts,
  };
  const tabs = [
    {
      label: thirdPartySourceName,
      value: TabsEnum.thirdParty,
    },
    {
      label: i18n.getString('companyTabTitle', currentLocale),
      value: TabsEnum.company,
    },
    {
      label: i18n.getString('personalTabTitle', currentLocale),
      value: TabsEnum.personal,
    },
  ];

  useEffect(() => {
    if (userInput !== previousUserInput) {
      setFilterString(userInput);
    }

    if (userInput === '') {
      setShowSearchResult(false);
    }
  }, [previousUserInput, userInput, setFilterString]);

  const searchContacts = async () => {
    setIsSearching(true);
    const res = await searchHandler(userInput);
    setSearchResult(res);
    setShowSearchResult(true);
    setIsSearching(false);
    inputRef?.current.focus();
  };

  const inThirdPartyTab = activeTab === TabsEnum.thirdParty;
  const isLoading = inThirdPartyTab && isSearching;
  const options =
    showSearchResult && inThirdPartyTab ? searchResult : optionsMap[activeTab];

  console.log('list item', options.length);
  const {
    optionItems,
    inputValue,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    getInputProps,
    getInputAriaProps,
    changeHighlightedIndexReason,
  } = useSuggestionList({
    inputValue: userInput,
    options,
    inputRef,
    onSelect: (e, option) => {
      optionClickHandler(option);
    },
  });
  const { inputAriaPropsRef, inputPropsRef } = useCommunicationSetupContext();
  useImperativeHandle(inputPropsRef, () => getInputProps());
  useImperativeHandle(inputAriaPropsRef, () => getInputAriaProps());
  const getFormattedLabel = useCallback(
    ({
      type,
      phoneType,
      phoneNumber,
    }: Pick<IContactSearchItem, 'phoneType' | 'phoneNumber' | 'type'>) => {
      const formattedPhoneType =
        type === TabsEnum.company || type === TabsEnum.personal
          ? i18n.getString(phoneType, currentLocale)
          : phoneType;
      if (type === TabsEnum.company && phoneType === phoneTypes.extension) {
        return `${formattedPhoneType}. ${phoneNumber}`;
      }

      return `${formatPhone(phoneNumber)} - ${formattedPhoneType}`;
    },
    [currentLocale, formatPhone],
  );
  return (
    <StyledContactSearchPanel data-sign="contactSearchPanel">
      <RcPaper square>
        <RcTabs
          value={activeTab}
          onChange={(e, v) => {
            inputRef?.current.focus();
            setActiveTab(v);
          }}
          variant="fullWidth"
          centered
        >
          {tabs.map(({ label, value }) => (
            <RcTab
              key={label}
              data-sign={`${value}ContactSearchResult`}
              label={<RcText variant="caption1">{`${label}`}</RcText>}
              value={value}
            />
          ))}
        </RcTabs>
      </RcPaper>
      <FullSizeWrapper>
        <RcLoading loading={isLoading}>
          <HelpTextSection
            showSearchResult={showSearchResult}
            sourceName={thirdPartySourceName}
            currentLocale={currentLocale}
            inputLength={userInput.length}
            activeTab={activeTab}
            hasRecords={!!optionItems.length}
            onClick={searchContacts}
          />
          <RcSuggestionList
            data-sign="contactSearchDropdown"
            tabIndex={-1}
            highlightedIndex={highlightedIndex}
            changeHighlightedIndexReason={changeHighlightedIndexReason}
            options={optionItems}
            inputValue={inputValue}
            getMenuProps={getMenuProps}
            getItemProps={getItemProps}
            renderOption={(
              {
                name,
                phoneNumber,
                phoneType,
                isPrimary,
                type,
                resourceType,
                doNotCall,
                entityType,
                ...restProps
              },
              state,
            ) =>
              isPrimary ? (
                <RcMenuItem
                  selected={state.selected}
                  data-sign="contactSearchSelectMenuItem"
                  avatar={
                    <RcAvatar color="interactive.b02" size="xsmall">
                      {name.slice(0, 1).toUpperCase()}
                    </RcAvatar>
                  }
                  {...restProps}
                >
                  <RcListItemText
                    primary={name}
                    secondary={getFormattedLabel({
                      phoneType,
                      type,
                      phoneNumber,
                    })}
                  />
                </RcMenuItem>
              ) : (
                <RcMenuItem
                  selected={state.selected}
                  data-sign="contactSearchSelectMenuItem"
                  avatar={<></>}
                  {...restProps}
                >
                  <RcListItemText
                    style={{ marginLeft: '32px' }}
                    secondary={getFormattedLabel({
                      phoneType,
                      type,
                      phoneNumber,
                    })}
                  />
                </RcMenuItem>
              )
            }
          />
        </RcLoading>
      </FullSizeWrapper>
    </StyledContactSearchPanel>
  );
};
