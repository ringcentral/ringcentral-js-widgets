import type {
  ContactPresence,
  IContact,
} from '@ringcentral-integration/commons/interfaces/Contact.model';
import { useFormattedPhoneNumberFn } from '@ringcentral-integration/micro-auth/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { useContainer } from '@ringcentral-integration/next-core';
import { TextWithHighlight } from '@ringcentral-integration/next-widgets/components';
import phoneTypeNamesI18n from '@ringcentral-integration/next-widgets/i18n/phoneTypeNames';
import { BlockMd, CallQueueMd, EnterMd } from '@ringcentral/spring-icon';
import {
  ListItem,
  ListItemText,
  Divider,
  omit,
  SuggestionList,
  Tab,
  TabContext,
  Tabs,
  useAutocomplete,
  UseAutocompleteTagParams,
  Avatar,
  Icon,
  Tooltip,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { ComponentType, useMemo, useRef, useState } from 'react';

import { ContactAvatar } from '../../../components';
import { ContactSearchEntity } from '../../../services';
import type {
  ContactSearchViewOptions,
  IContactSearchItem,
  TabsEnumType,
} from '../ContactSearch.view.interface';

import { HelpTextSection } from './HelpTextSection';
import { generateOptionsMap, generateTabs, validateValidChars } from './helper';
import i18n from './i18n';

const PrimaryAvatar = ({
  activeTab,
  ThirdPartyAvatar,
  type,
  contactName,
  contact,
  phoneNumber,
}: {
  ThirdPartyAvatar?: ComponentType<{
    type?: string;
  }>;
  activeTab: TabsEnumType;
  type: string;
  contactName: string;
  contact?: IContact & { presence?: ContactPresence };
  phoneNumber: string;
}) => {
  const inThirdPartyTab = activeTab === 'thirdParty';
  const inOtherTab = activeTab === 'other';

  if (inOtherTab) {
    return (
      <Avatar symbol={CallQueueMd} data-sign="callQueueAvatar" size="medium" />
    );
  }

  if (inThirdPartyTab && ThirdPartyAvatar) {
    return <ThirdPartyAvatar type={type} />;
  }

  return (
    <ContactAvatar
      key={`avatar-${contact?.id}`}
      showPresence
      contact={contact}
      phoneNumber={phoneNumber}
      contactName={contactName}
    />
  );
};

/**
 * Custom hook for render contact search view
 */
export const useContactSearchView = (
  options: {
    /**
     * multiple mode
     */
    multiple?: boolean;
    /**
     * helpText for freeSolo item
     */
    source: 'dial' | 'message' | 'transfer' | 'fax';
    /**
     * input value
     */
    value: string;
    /**
     * emit when input value change
     */
    onChange: (value: string) => void;
    /**
     * show other contacts tab
     */
    showOtherContacts?: boolean;
    /**
     * third party source name
     */
    thirdPartySourceName?: string;
    /**
     * is third party searching
     */
    isThirdPartySearching: boolean;
    /**
     * third party avatar
     */
    ThirdPartyAvatar?: ComponentType<{
      type?: string;
    }>;
    /**
     * minimum start search length
     */
    minimumSearchLength?: number;
    /**
     * default active tab
     */
    defaultTab?: TabsEnumType;
    /**
     * change tab event tracking
     */
    changeTabTrack: (tab: string) => void;
    /**
     * contacts list
     */
    thirdPartyContacts: IContactSearchItem[];
    companyContacts: IContactSearchItem[];
    personalContacts: IContactSearchItem[];
    otherContacts: IContactSearchItem[];
    /**
     * emit when contact selected
     */
    onContactSelected: (option: ContactSearchEntity) => void;
    onOpen: () => void;
    onClose: () => void;
  } & Pick<UseAutocompleteTagParams, 'keyToTags'>,
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    multiple,
    source,
    showOtherContacts,
    isThirdPartySearching,
    thirdPartySourceName,
    companyContacts,
    otherContacts,
    personalContacts,
    thirdPartyContacts,
    value,
    keyToTags,
    defaultTab,
    ThirdPartyAvatar,
    minimumSearchLength = 3,
    onContactSelected: onOptionSelected,
    onChange,
    changeTabTrack,
    onOpen,
    onClose,
  } = options;
  const { t: phoneTypeNamesT } = useLocale(phoneTypeNamesI18n);
  const { t } = useLocale(i18n);
  const [activeTab, setActiveTab] = useState<TabsEnumType>(
    defaultTab
      ? thirdPartySourceName || defaultTab !== 'thirdParty'
        ? defaultTab
        : 'company'
      : thirdPartySourceName
      ? 'thirdParty'
      : 'company',
  );
  const contactSearchViewOptions = useContainer<ContactSearchViewOptions>(
    'ContactSearchViewOptions',
  );

  const isAbleToSearch = value.length >= minimumSearchLength;
  const inThirdPartyTab = activeTab === 'thirdParty';
  const isLoading = inThirdPartyTab && isAbleToSearch && isThirdPartySearching;
  // display freeSolo item on suggestion list
  const showFreeSoloItem = validateValidChars(value);

  const { contacts = [], tabItemsMap } = useMemo(() => {
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
      isLoading,
      showOtherContacts,
      t,
    });

    return {
      contacts: _optionsMap[activeTab],
      tabItemsMap: _tabItemsMap,
    };
  }, [
    activeTab,
    isAbleToSearch,
    thirdPartyContacts,
    companyContacts,
    personalContacts,
    otherContacts,
    thirdPartySourceName,
    isLoading,
    showOtherContacts,
    t,
  ]);

  const {
    optionItems,
    highlightedIndex,
    getTagListBoxProps,
    getSuggestionListProps,
    getInputAriaProps,
    getInputProps,
    getItemProps,
    isOpen,
    inputValue,
    changeHighlightedIndexReason,
    isKeepHighlightedIndex,
    // setHighlightedIndex,
    // keepHighlightedIndex,
    closeMenu,
    openMenu,
    // reset,
  } = useAutocomplete({
    inputRef,
    value: [],
    freeSolo: showFreeSoloItem,
    multiple,
    inputValue: value,
    options: contacts,
    keyToTags,
    autoHighlight: true,
    addNoOptionItem: 'first',
    onChange: (e) => {
      if (multiple) {
        e.forEach(onOptionSelected);
      } else {
        onOptionSelected(e[0]);
      }
    },
    onInputChange: onChange,
    onOpen,
    onClose,
  });
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onBlur,
    ...InputProps
  } = getInputProps();

  const components = useMemo(
    () => ({
      Footer: () => (
        <HelpTextSection
          sourceName={thirdPartySourceName}
          inputLength={value.length}
          isLoading={isLoading}
          activeTab={activeTab}
          hasRecords={!!optionItems.length}
          searchMinimumLength={minimumSearchLength}
        />
      ),
    }),
    [
      activeTab,
      isLoading,
      minimumSearchLength,
      optionItems.length,
      thirdPartySourceName,
      value.length,
    ],
  );

  const phoneNumberRender = useFormattedPhoneNumberFn();

  return {
    inputRef,
    openMenu,
    closeMenu,
    InputProps: {
      ...getTagListBoxProps(),
      ...(InputProps as any),
    },
    // TODO: spring-ui readonly has bug, should remove it in spring-ui
    inputProps: omit(getInputAriaProps(), ['readOnly']),
    component: isOpen ? (
      <TabContext
        value={activeTab}
        onChange={(e, v: any) => {
          inputRef.current?.focus();
          setActiveTab(v);
          changeTabTrack(
            v === 'thirdParty' ? thirdPartySourceName!.toLocaleLowerCase() : v,
          );
        }}
      >
        <div
          className={clsx(
            'overflow-hidden absolute flex flex-col w-full h-full left-0 top-0 bg-neutral-base z-drawer [&_.sui-tab]:h-6',
          )}
          data-sign="contactDropdownList"
        >
          <Tabs
            pill
            variant="moreMenu"
            data-sign="contactTabsTitle"
            MoreMenuProps={{
              ButtonProps: {
                'data-sign': 'moreMenu',
                size: 'small',
              },
            }}
            // TODO: spring that padding should be removed in spring
            className="flex-none mt-0.5 mb-2.5 [&_.sui-tabs-tab-list]:p-0"
          >
            {tabItemsMap.map(({ label, count, value }) => {
              const tabName = `${label} (${count})`;
              return (
                <Tab
                  id={value}
                  key={label}
                  data-sign={`${value}ContactSearchResult`}
                  label={
                    <div
                      title={tabName}
                      data-sign={`${value}ContactTabName`}
                      className="truncate text-xs normal-case"
                    >
                      {tabName}
                    </div>
                  }
                  value={value}
                />
              );
            })}
          </Tabs>
          <SuggestionList
            className="flex-auto m-0"
            highlightedIndex={highlightedIndex}
            components={components}
            options={optionItems}
            inputValue={inputValue}
            getItemProps={getItemProps as any}
            getSuggestionListProps={getSuggestionListProps}
            changeHighlightedIndexReason={changeHighlightedIndexReason}
            isKeepHighlightedIndex={isKeepHighlightedIndex}
            renderOption={(itemProps, state) => {
              const {
                'aria-posinset': ariaPosinset,
                'aria-setsize': ariaSetsize,
                'data-item-index': dataItemIndex,
                key,
                onClick,
                onMouseDown,
                onMouseOver,
                onMouseUp,
                role,
                label,
                // default freeSolo props
                freeSolo,
                // item data props
                type,
                phoneType,
                phoneNumber,
                isPrimary,
                contact,
                name,
                doNotCall,
              } = itemProps as any;

              const secondaryContent =
                contactSearchViewOptions?.renderListItemSecondary
                  ? contactSearchViewOptions.renderListItemSecondary(
                      itemProps as IContactSearchItem,
                    )
                  : (() => {
                      const formattedPhoneNumber =
                        phoneNumberRender(phoneNumber);
                      return (
                        <span title={formattedPhoneNumber}>
                          {formattedPhoneNumber}
                        </span>
                      );
                    })();

              const isFirstItem = state.index === 0;
              const phoneTypeI18nString = phoneTypeNamesT(phoneType);

              // Check if doNotCall is truthy (could be string "true" or boolean true)
              const isDoNotCall = doNotCall === true || doNotCall === 'true';

              return (
                <ListItem
                  size={isPrimary || freeSolo ? 'large' : 'small'}
                  selected={state.highlighted}
                  divider={false}
                  {...{
                    'aria-posinset': ariaPosinset,
                    'aria-setsize': ariaSetsize,
                    'data-item-index': dataItemIndex,
                    key,
                    onClick,
                    onMouseDown,
                    onMouseOver,
                    onMouseUp,
                    role,
                  }}
                  data-sign={`${freeSolo ? 'freeSolo' : 'contact'}Item`}
                >
                  <div className="flex flex-col w-full h-full">
                    {isPrimary && !isFirstItem && (
                      <Divider className="w-full" />
                    )}
                    {freeSolo ? (
                      <div className="flex flex-auto items-center">
                        <Avatar size="medium" />
                        <ListItemText
                          primary={
                            <span data-sign="freeSoloTitle">{t(source)}</span>
                          }
                          secondary={
                            <span data-sign="freeSoloNumber">{label}</span>
                          }
                        />
                        <Icon
                          data-sign="freeSoloQuickButton"
                          symbol={EnterMd}
                          className="text-neutral-b0"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-auto items-center">
                        {isPrimary && (
                          <PrimaryAvatar
                            contact={contact}
                            activeTab={activeTab}
                            type={type}
                            ThirdPartyAvatar={ThirdPartyAvatar}
                            phoneNumber={phoneNumber}
                            contactName={name}
                          />
                        )}

                        <ListItemText
                          className={clsx(!isPrimary && 'pl-11')}
                          primary={
                            isPrimary
                              ? (() => {
                                  const text = (
                                    <TextWithHighlight
                                      data-sign="contactSearchItem"
                                      highLightText={value}
                                      text={name}
                                    />
                                  );

                                  return !isDoNotCall ? (
                                    text
                                  ) : (
                                    <div className="flex items-center gap-1 truncate">
                                      {text}
                                      <Tooltip title={t('doNotCall')}>
                                        <Icon
                                          symbol={BlockMd}
                                          size="xsmall"
                                          color="secondary"
                                          className="text-neutral-b2"
                                          data-sign="doNotCall"
                                        />
                                      </Tooltip>
                                    </div>
                                  );
                                })()
                              : undefined
                          }
                          secondary={secondaryContent}
                        />

                        <span
                          data-sign="phoneType"
                          className="text-neutral-b2 typography-descriptor text-nowrap sui-text-root flex-none"
                          title={phoneTypeI18nString}
                        >
                          {phoneTypeI18nString}
                        </span>
                      </div>
                    )}
                  </div>
                </ListItem>
              );
            }}
          />
        </div>
      </TabContext>
    ) : null,
  };
};
