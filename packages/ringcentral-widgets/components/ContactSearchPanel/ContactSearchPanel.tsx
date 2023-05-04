import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { phoneTypes } from '@ringcentral-integration/commons/enums/phoneTypes';
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
  usePrevious,
  useSuggestionList,
} from '@ringcentral/juno';
import { Dial, UserDefault } from '@ringcentral/juno-icon';

import {
  ContactPresence,
  IContact,
} from '@ringcentral-integration/commons/interfaces/Contact.model';

import { useCommunicationSetupContext } from '../../contexts';
import {
  ContactSearchPanelProps,
  IContactSearchItem,
} from '../../modules/ContactSearchUI';
import { getPresenceStatus } from '../../modules/ContactSearchUI/ContactSearchHelper';

import { validateValidChars } from '../CommunicationSetupPanel/helper';
import { Tooltip } from '../Rcui/Tooltip';
import { TextWithHighlight } from '../TextWithHighlight/TextWithHighlight';
import { TabsEnum, TabsEnumType } from './ContactSearchPanelEnum';
import { DoNotCallIndicator } from './DoNotCallIndicator';
import { HelpTextSection } from './HelpTextSection';
import i18n from './i18n';
import {
  ContactName,
  DefaultIcon,
  FullSizeWrapper,
  StyledContactSearchPanel,
  StyledListItemText,
  StyledTabsWrapper,
  TabText,
} from './styles/ContactSearchPanel';

import { GetPresenceFn, usePresence } from '../../react-hooks/usePresence';

const getCountsRes = (counts: number) => (counts > 99 ? `99+` : counts);

const PrimaryAvatar = ({
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
  isDirectlyProceed: boolean;
  inThirdPartyTab: boolean;
  type: string;
  name: string;
  profileImageUrl: string;
  getPresence: GetPresenceFn;
  contact: IContact & { presence?: ContactPresence };
  needFetchPresence: boolean;
}) => {
  const [firstName, lastName] = name?.split(/\s+/);
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
}) => {
  const previousUserInput = usePrevious(() => userInput);
  const isAbleToSearch = userInput.length >= minimumSearchLength;

  const getPrimaryCount = (items: any) => {
    const count = items?.filter((i: any) => i.isPrimary).length;
    return getCountsRes(count);
  };

  const { optionsMap, tabItemsMap } = useMemo(() => {
    const _optionsMap = {
      [TabsEnum.thirdParty]: !isAbleToSearch ? [] : thirdPartyContacts,
      [TabsEnum.company]: companyContacts,
      [TabsEnum.personal]: personalContacts,
    };

    return {
      optionsMap: _optionsMap,
      tabItemsMap: [
        {
          label: thirdPartySourceName,
          value: TabsEnum.thirdParty,
          count: getPrimaryCount(_optionsMap[TabsEnum.thirdParty]),
        },
        {
          label: i18n.getString('companyTabTitle', currentLocale),
          value: TabsEnum.company,
          count: getPrimaryCount(_optionsMap[TabsEnum.company]),
        },
        {
          label: i18n.getString('personalTabTitle', currentLocale),
          value: TabsEnum.personal,
          count: getPrimaryCount(_optionsMap[TabsEnum.personal]),
        },
      ],
    };
  }, [
    isAbleToSearch,
    thirdPartyContacts,
    companyContacts,
    personalContacts,
    thirdPartySourceName,
    currentLocale,
  ]);

  const [activeTab, setActiveTab] = useState<TabsEnumType>(defaultTab);

  useEffect(() => {
    if (userInput !== previousUserInput) {
      setFilterString(userInput);
    }
  }, [previousUserInput, userInput, setFilterString]);

  const inThirdPartyTab = activeTab === TabsEnum.thirdParty;
  const isLoading = inThirdPartyTab && isAbleToSearch && isThirdPartySearching;
  const options = optionsMap[activeTab];
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
        formattedPhoneType = i18n.getString(phoneType, currentLocale);
      } else if (type === TabsEnum.company) {
        formattedPhoneType = i18n.getString(
          companyPhoneTypeMap[phoneType] || phoneType,
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
            MenuProps: {
              marginThreshold: 6,
            },
          }}
        >
          {tabItemsMap.map(({ label, count, value }) => {
            const tabName = `${label} (${count})`;
            return (
              <RcTab
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
                        <span title={content}>{content}</span>
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
