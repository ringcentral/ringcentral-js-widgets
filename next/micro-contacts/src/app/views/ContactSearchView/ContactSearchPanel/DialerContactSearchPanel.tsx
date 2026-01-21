import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import type { ToNumber } from '@ringcentral-integration/micro-message/src/app/services';
import type { Recipient } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  useAsyncState,
  usePageAutoFocus,
} from '@ringcentral-integration/react-hooks';
import { BackspaceMd } from '@ringcentral/spring-icon';
import {
  Chip,
  DialTextField,
  IconButton,
  DialDelete,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { useEffect } from 'react';

import type { ContactSearchPanelProps as BaseContactSearchPanelProps } from '../ContactSearch.view.interface';

import i18n from './i18n';
import { useContactSearchView } from './useContactSearchView';

export interface DialerContactSearchPanelProps
  extends BaseContactSearchPanelProps {
  open: boolean;
  inputValue: string;
  source?: 'dial' | 'transfer';
  recipient?: Recipient | null;
  thirdPartySourceName?: string;
  toNumbers: ToNumber[];
  placeholder?: string;
  invalidPhoneNumbers?: string[];
  keyToTags?: string[];
  onInputValueChange: (phoneNumber: string) => Promise<void>;
  setFilterString: (filterString: string) => void;
  onSelect?: (recipients: Recipient[]) => Promise<void>;
  onRemove?: () => Promise<void>;
  onExpanded: (expanded: boolean) => void;
  autoFocusInput?: boolean;
}

export const DialerContactSearchPanel: React.FunctionComponent<
  DialerContactSearchPanelProps
> = ({
  open: openProp,
  defaultTab,
  source = 'dial',
  recipient,
  inputValue,
  thirdPartySourceName,
  companyContacts,
  personalContacts,
  otherContacts,
  thirdPartyContacts,
  showOtherContacts,
  isThirdPartySearching,
  placeholder,
  ThirdPartyAvatar,
  keyToTags = ['↵', ',', ';'],
  changeTabTrack,
  onInputValueChange,
  setFilterString,
  onSelect,
  onRemove,
  onExpanded,
  autoFocusInput = true,
}) => {
  const { t } = useLocale(i18n);
  const [value, _setValue] = useAsyncState(inputValue, (value) => {
    onInputValueChange(value);
    setFilterString(value);
  });

  const renderRecipient = Boolean(recipient) && value.length === 0;
  const showDelete = value.length > 0 || renderRecipient;

  const setValue = (v: string) => {
    // we not want show the value which be key to make select
    const regex = new RegExp(`[${keyToTags.join('')}]`, 'g');
    const validValue = v.replace(regex, '');
    if (validValue === '') {
      // spring-ui need to set full props to trigger onClose event
      closeMenu({} as any, 'escape');
    }
    _setValue(validValue);
  };

  const { closeMenu, openMenu, inputRef, component, InputProps, inputProps } =
    useContactSearchView({
      value,
      onChange: () => {
        // do nothing, we handle the DialTextField onChange event
      },
      source,
      keyToTags,
      changeTabTrack,
      defaultTab,
      thirdPartySourceName,
      companyContacts,
      personalContacts,
      otherContacts,
      ThirdPartyAvatar,
      thirdPartyContacts: thirdPartyContacts || [],
      showOtherContacts,
      isThirdPartySearching,
      onOpen: () => onExpanded(true),
      onClose: () => onExpanded(false),
      onContactSelected: async (option: any) => {
        if ((option as any).freeSolo) {
          await onSelect?.([
            {
              phoneNumber: option.label,
              name: option.label,
              freeSolo: true,
            },
          ]);
          return;
        }
        await onSelect?.([
          {
            ...option,
            phoneNumber: option.phoneNumber,
            name: option.name || option.label,
          },
        ]);
      },
    });

  useEffect(() => {
    if (openProp && value.trim().length) {
      openMenu({} as any);
    } else {
      // spring-ui need to set full props to trigger onClose event
      closeMenu({} as any, 'escape');
    }
  }, [openProp, value, openMenu, closeMenu]);

  usePageAutoFocus(inputRef, autoFocusInput);

  return (
    <div
      className={clsx(
        'flex flex-col gap-2 mx-4 justify-center items-center',
        openProp && 'flex-auto',
      )}
    >
      <DialTextField
        inputRef={inputRef}
        variant="quiet"
        fullWidth
        onChange={setValue}
        placeholder={placeholder || t('enterANameOrNumber')}
        className="max-w-[250px] rounded-xl"
        value={value}
        size="medium"
        RootProps={InputProps}
        onClick={(e) => {
          if (value.length) {
            openMenu(e);
          }
        }}
        inputProps={{
          ...inputProps,
          'data-sign': 'recipientsInput',
          readOnly: renderRecipient,
        }}
        classes={
          renderRecipient
            ? {
                startAdornment: 'w-full mr-0',
                endAdornment: 'ml-0',
                input: 'hidden',
              }
            : undefined
        }
        startAdornment={
          <>
            {showDelete && <i className="w-9" />}
            {renderRecipient && (
              <div className="text-center flex-auto">
                <Chip
                  label={recipient!.name ?? recipient!.phoneNumber}
                  onDelete={onRemove}
                  DeleteIconProps={{
                    'aria-label': 'Remove',
                  }}
                />
              </div>
            )}
          </>
        }
        endAdornment={
          showDelete && (
            <DialDelete
              // currently we only support set one recipient, so we can use onRemove to clear recipient
              onDelete={recipient ? onRemove : undefined}
              onClear={recipient ? onRemove : undefined}
            >
              <IconButton
                className="flex-none mr-3"
                TooltipProps={{
                  title: t('delete'),
                }}
                symbol={BackspaceMd}
                variant="icon"
                data-sign="deleteButton"
                size="small"
                color="secondary"
              />
            </DialDelete>
          )
        }
      />
      {openProp && (
        <main className="relative w-full flex flex-col flex-auto overflow-hidden mt-2">
          {component}
        </main>
      )}
    </div>
  );
};
