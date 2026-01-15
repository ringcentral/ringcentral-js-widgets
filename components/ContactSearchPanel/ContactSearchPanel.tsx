import { phoneTypes } from '@ringcentral-integration/commons/enums/phoneTypes';
import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import type {
  ContactPresence,
  IContact,
} from '@ringcentral-integration/commons/interfaces/Contact.model';
import {
  RcAvatar,
  RcIcon,
  RcListItemSecondaryAction,
  RcListItemText,
  RcMenuItem,
  RcSuggestionList,
  RcTab,
  RcTabs,
  useAvatarColorToken,
  useAvatarShortName,
  useDebounce,
  usePrevious,
  useSuggestionList,
} from '@ringcentral/juno';
import {
  Dial,
  ArrowUp2,
  ArrowDown2,
  UserDefault,
  CallQueue,
} from '@ringcentral/juno-icon';
import type { FunctionComponent } from 'react';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useCommunicationSetupContext } from '../../contexts';
import type {
  ContactSearchPanelProps,
  IContactSearchItem,
} from '../../modules/ContactSearchUI';
import { getPresenceStatus } from '../../modules/ContactSearchUI/ContactSearchHelper';
import type { GetPresenceFn } from '../../react-hooks/usePresence';
import { usePresence } from '../../react-hooks/usePresence';
import { validateValidChars } from '../CommunicationSetupPanel/helper';
import { Tooltip } from '../Rcui/Tooltip';
import { TextWithHighlight } from '../TextWithHighlight/TextWithHighlight';

import type { TabsEnumType } from './ContactSearchPanelEnum';
import { TabsEnum } from './ContactSearchPanelEnum';
import { DoNotCallIndicator } from './DoNotCallIndicator';
import { HelpTextSection } from './HelpTextSection';
import { generateOptionsMap, generateTabs } from './helper';
import i18n, { type I18nKey } from './i18n';
import {
  CallQueueIcon,
  ContactName,
  DefaultIcon,
  FullSizeWrapper,
  StyledContactSearchPanel,
  StyledListItemText,
  StyledTabsWrapper,
  TabText,
} from './styles/ContactSearchPanel';

const PrimaryAvatar = ({
  inOtherTab,
  isDirectlyProceed,
  inThirdPartyTab,
  ThirdPartyAvatar,
  profileImageUrl,
  type,
  name,
  getPresence,
  needFetchPresence,
  contact,
}: Pick<ContactSearchPanelProps, 'ThirdPartyAvatar'> & {
  inOtherTab: boolean;
  isDirectlyProceed: boolean;
  inThirdPartyTab: boolean;
  type: string;
  name: string;
  profileImageUrl: string;
  getPresence: GetPresenceFn;
  contact: IContact & { presence?: ContactPresence };
  needFetchPresence: boolean;
}) => {
  const [firstName, lastName] = name?.split(/\s+/) || [];
  const presentAvatarName = useAvatarShortName({
    firstName,
    lastName,
  });
  const presence = usePresence(contact, {
    fetch: needFetchPresence ? getPresence : undefined,
  });

  const presentAvatarcolor = useAvatarColorToken(name);

  if (isDirectlyProceed)
    return (
      <DefaultIcon
        size="xxlarge"
        color="neutral.f01"
        symbol={UserDefault}
        data-sign="directlyProceedAvatar"
      />
    );

  if (inOtherTab) {
    return (
      <CallQueueIcon
        symbol={CallQueue}
        data-sign="callQueueAvatar"
        size="xxlarge"
        color="neutral.f01"
      />
    );
  }

  if (inThirdPartyTab && ThirdPartyAvatar)
    return <ThirdPartyAvatar type={type} />;

  const presenceProps = presence
    ? { type: getPresenceStatus(presence) }
    : undefined;

  return (
    <RcAvatar
      presenceProps={presenceProps}
      color={presentAvatarcolor}
      size="xsmall"
    >
      {profileImageUrl ? (
        <img src={profileImageUrl} alt={name} />
      ) : (
        presentAvatarName
      )}
    </RcAvatar>
  );
};

interface PhoneTypeMap {
  [key: string]: string;
}

const companyPhoneTypeMap: PhoneTypeMap = {
  mobile: 'MobileNumber',
  contact: 'ContactNumber',
  direct: 'DirectNumber',
  extension: 'extension',
};

export const ContactSearchPanel: FunctionComponent<ContactSearchPanelProps> = ({
  otherContacts,
  companyContacts,
  personalContacts,
  thirdPartyContacts = [],
  optionClickHandler,
  userInput,
  isThirdPartySearching,
  inputRef,
  centered,
  setFilterString,
  thirdPartySourceName,
  currentLocale,
  formatPhone,
  ThirdPartyAvatar,
  minimumSearchLength = 0,
  directlyProceedText,
  getCompanyExtraInfoByIds,
  changeTabTrack,
  getPresence,
  defaultTab = TabsEnum.thirdParty,
  showOtherContacts,
  triggerEventTracking = () => {},
}) => {
  const [activeTab, setActiveTab] = useState<TabsEnumType>(defaultTab);
  const previousUserInput = usePrevious(() => userInput);
  const isAbleToSearch = userInput.length >= minimumSearchLength;
  const inThirdPartyTab = activeTab === TabsEnum.thirdParty;
  const isLoading = inThirdPartyTab && isAbleToSearch && isThirdPartySearching;

  const { optionsMap, tabItemsMap, tabsKey } = useMemo(() => {
    const _optionsMap = generateOptionsMap({
      showOtherContacts,
      isAbleToSearch,
      companyContacts,
      otherContacts,
      personalContacts,
      thirdPartyContacts,
    });

    const _tabItemsMap = generateTabs({
      optionsMap: _optionsMap,
      thirdPartySourceName,
      currentLocale,
      isLoading,
    });

    const _tabsKey = _tabItemsMap.map((tab) => tab.count).join('-');

    return {
      tabsKey: _tabsKey,
      optionsMap: _optionsMap,
      tabItemsMap: showOtherContacts ? _tabItemsMap : _tabItemsMap.slice(0, 2),
    };
  }, [
    isAbleToSearch,
    thirdPartyContacts,
    companyContacts,
    personalContacts,
    otherContacts,
    thirdPartySourceName,
    currentLocale,
    isLoading,
    showOtherContacts,
  ]);

  const tabLabels = tabItemsMap.reduce(
    (acc, tab) => {
      acc[tab.value] = tab.label;
      return acc;
    },
    {} as {
      [key in TabsEnumType]: string;
    },
  ) as {
    [key in TabsEnumType]: string;
  };

  const debounceTracking = useDebounce((optionsMap, tabLabels) => {
    const result = Object.keys(optionsMap)
      .filter((key) => {
        const map = optionsMap as { [x: string]: IContactSearchItem[] };
        return map[key].length > 0;
      })
      .map((key) => (tabLabels as { [x: string]: string })[key]);

    if (result && result.length > 0) {
      triggerEventTracking(trackEvents.getContactSearch, result.join(', '));
    }
  }, 1000);

  useEffect(() => {
    debounceTracking(optionsMap, tabLabels);
  }, [optionsMap, tabLabels, debounceTracking]);

  useEffect(() => {
    if (userInput !== previousUserInput) {
      setFilterString(userInput);
    }
  }, [previousUserInput, userInput, setFilterString]);

  const inOtherTab = activeTab === TabsEnum.other;
  const options = optionsMap[activeTab] as IContactSearchItem[];
  const showDirectlyItem = validateValidChars(userInput);
  const finialOptions = useMemo(
    () =>
      showDirectlyItem
        ? [
            {
              isPrimary: true,
              isDirectlyProceed: true,
              name: directlyProceedText,
              phoneNumber: userInput,
            } as unknown as IContactSearchItem,
            ...options,
          ]
        : options,
    [userInput, options, showDirectlyItem, directlyProceedText],
  );

  const setIndexHandlerRef = useRef<any>(null);

  const {
    optionItems,
    inputValue,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    getInputProps,
    getInputAriaProps,
    changeHighlightedIndexReason,
    setHighlightedIndex,
  } = useSuggestionList({
    inputValue: userInput,
    options: finialOptions,
    inputRef,
    onSelect: (e, option) => {
      const item = { ...option };
      if (option.isDirectlyProceed) {
        item.name = item.phoneNumber;
      }
      optionClickHandler(item);
      triggerEventTracking(
        trackEvents.searchedContactClicked,
        tabLabels[activeTab],
      );
    },
  });

  useImperativeHandle(setIndexHandlerRef, () => setHighlightedIndex);

  useEffect(() => {
    if (finialOptions.length) {
      setIndexHandlerRef?.current(0, { reason: 'mouse', reRender: true });
    }
  }, [finialOptions]);

  const { inputAriaPropsRef, inputPropsRef } = useCommunicationSetupContext();
  useImperativeHandle(inputPropsRef, () => getInputProps());
  useImperativeHandle(inputAriaPropsRef, () => getInputAriaProps());

  const getFormattedLabel = useCallback(
    ({
      type,
      phoneType,
      phoneNumber,
    }: Pick<IContactSearchItem, 'phoneType' | 'phoneNumber' | 'type'>) => {
      let formattedPhoneType = phoneType;
      if (type === TabsEnum.personal) {
        formattedPhoneType = i18n.getString(
          phoneType as I18nKey,
          currentLocale,
        );
      } else if (type === TabsEnum.company) {
        formattedPhoneType = i18n.getString(
          (companyPhoneTypeMap[phoneType] || phoneType) as I18nKey,
          currentLocale,
        );
      }
      if (type === TabsEnum.company && phoneType === phoneTypes.extension) {
        return `${formattedPhoneType}. ${phoneNumber}`;
      }

      return `${formatPhone(phoneNumber)} - ${formattedPhoneType}`;
    },
    [currentLocale, formatPhone],
  );

  //! code will not to package into prod env.
  const additionProps: any = {};
  if (process.env.NODE_ENV === 'test') {
    additionProps.initialItemCount = optionItems.length;
    additionProps.key = optionItems.length;
  }

  return (
    <StyledContactSearchPanel data-sign="contactSearchPanel">
      <StyledTabsWrapper>
        <RcTabs
          key={tabsKey}
          data-sign="contactTabsTitle"
          value={activeTab}
          onChange={(e, v) => {
            inputRef.current?.focus();
            setActiveTab(v);
            changeTabTrack(
              v === 'thirdParty' ? thirdPartySourceName.toLocaleLowerCase() : v,
            );
          }}
          variant="moreMenu"
          centered={centered}
          MoreButtonProps={{
            datatype: 'moreMenu',
            // @ts-ignore
            'data-sign': 'moreMenu',
            style: {
              padding: 0,
            },
            MoreIcon: (isMenuOpen: boolean) =>
              isMenuOpen ? (
                <RcIcon symbol={ArrowUp2} />
              ) : (
                <RcIcon symbol={ArrowDown2} />
              ),
            MenuProps: {
              marginThreshold: 6,
            },
          }}
        >
          {tabItemsMap.map(({ label, count, value }) => {
            const tabName = `${label} (${count})`;
            return (
              <RcTab
                style={{
                  padding: '6px 8px',
                }}
                key={label}
                data-sign={`${value}ContactSearchResult`}
                label={
                  <Tooltip title={tabName}>
                    <TabText data-sign={`${value}ContactTabName`}>
                      {tabName}
                    </TabText>
                  </Tooltip>
                }
                value={value}
              />
            );
          })}
        </RcTabs>
      </StyledTabsWrapper>
      <FullSizeWrapper>
        <HelpTextSection
          sourceName={thirdPartySourceName}
          currentLocale={currentLocale}
          inputLength={userInput.length}
          isLoading={isLoading}
          activeTab={activeTab}
          hasRecords={!!optionItems.length}
          searchMinimumLength={minimumSearchLength}
        />
        {optionItems.length > 0 && (
          <RcSuggestionList
            data-sign="contactSearchDropdown"
            tabIndex={-1}
            highlightedIndex={highlightedIndex}
            changeHighlightedIndexReason={changeHighlightedIndexReason}
            options={optionItems}
            inputValue={inputValue}
            getMenuProps={getMenuProps}
            getItemProps={getItemProps}
            {...additionProps}
            renderOption={(props: IContactSearchItem, state) => {
              const {
                name,
                phoneNumber,
                phoneType,
                isPrimary,
                type,
                doNotCall,
                isDirectlyProceed = false,
                profileImageUrl = '',
                contact,
                presenceStatus,
                accountName,
                // @ts-ignore
                entityType,
                // @ts-ignore
                resourceType,
                ...restProps
              } = props;
              const needFetchPresence = !!(
                activeTab === TabsEnum.company &&
                isPrimary &&
                contact?.id
              );

              const content = getFormattedLabel({
                phoneType,
                type,
                phoneNumber,
              });
              return isPrimary ? (
                <RcMenuItem
                  focused={state.highlighted}
                  data-sign={
                    isDirectlyProceed
                      ? 'directlyProceedEntrance'
                      : 'contactSearchSelectMenuItem'
                  }
                  avatar={
                    <PrimaryAvatar
                      contact={contact}
                      needFetchPresence={needFetchPresence}
                      getPresence={getPresence}
                      isDirectlyProceed={isDirectlyProceed}
                      type={type}
                      ThirdPartyAvatar={ThirdPartyAvatar}
                      name={name}
                      inOtherTab={inOtherTab}
                      inThirdPartyTab={inThirdPartyTab}
                      profileImageUrl={profileImageUrl}
                    />
                  }
                  {...restProps}
                >
                  <RcListItemText
                    primary={
                      <>
                        <ContactName
                          data-sign={
                            isDirectlyProceed
                              ? 'DirectlyProceedTitle'
                              : 'contactSearchItem'
                          }
                        >
                          <TextWithHighlight
                            highLightText={inputValue}
                            text={name}
                          />
                        </ContactName>
                        {doNotCall && (
                          <DoNotCallIndicator currentLocale={currentLocale} />
                        )}
                      </>
                    }
                    secondary={
                      isDirectlyProceed ? (
                        <span
                          title={phoneNumber}
                          data-sign="directlyProceedNumber"
                        >
                          {phoneNumber}
                        </span>
                      ) : (
                        <>
                          <span title={content}>{content}</span>{' '}
                          {accountName && (
                            <>
                              <br />
                              <span
                                title={accountName} //todo: test account name once design is finalized
                                style={{ color: 'gray' }}
                              >
                                {accountName}
                              </span>
                            </>
                          )}{' '}
                        </>
                      )
                    }
                  />
                  {isDirectlyProceed && (
                    <RcListItemSecondaryAction data-sign="dialIcon">
                      <RcIcon color="action.primary" symbol={Dial} />
                    </RcListItemSecondaryAction>
                  )}
                </RcMenuItem>
              ) : (
                <RcMenuItem
                  selected={state.selected}
                  data-sign="contactSearchSelectMenuItem"
                  avatar={<></>}
                  {...restProps}
                >
                  <StyledListItemText
                    title={content}
                    secondary={content}
                    inset={inThirdPartyTab}
                  />
                </RcMenuItem>
              );
            }}
            itemsRendered={(items) => {
              if (activeTab !== TabsEnum.company) return;

              const ids = items
                .filter(({ data }) => data && data.isPrimary && data.id)
                .map(({ data }) => data.id);

              if (ids.length > 0) {
                getCompanyExtraInfoByIds(ids);
              }
            }}
          />
        )}
      </FullSizeWrapper>
    </StyledContactSearchPanel>
  );
};

ContactSearchPanel.displayName = 'ContactSearchPanel';
