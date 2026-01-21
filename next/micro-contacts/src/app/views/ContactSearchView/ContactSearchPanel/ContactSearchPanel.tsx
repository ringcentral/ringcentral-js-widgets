import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import type { ToNumber } from '@ringcentral-integration/micro-message/src/app/services';
import { useAsyncState } from '@ringcentral-integration/react-hooks';
import {
  Autocomplete,
  Chip,
  Avatar,
  GetTagProps,
  useEventListener,
  stringArrToRegExp,
} from '@ringcentral/spring-ui';
import type { SuggestionListItemData as BaseSuggestionListItemData } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { useEffect, useMemo } from 'react';

import type {
  ContactSearchPanelProps as BaseContactSearchPanelProps,
  SuggestionListItemData,
} from '../ContactSearch.view.interface';

import { validateValidChars } from './helper';
import i18n from './i18n';
import { useContactSearchView } from './useContactSearchView';

export interface ContactSearchPanelProps extends BaseContactSearchPanelProps {
  open: boolean;
  maxRecipients?: number;
  inputValue: string;
  source?: 'message' | 'fax';
  thirdPartySourceName?: string;
  toNumbers: ToNumber[];
  placeholder?: string;
  keyToTags?: string[];
  onExpanded: (expanded: boolean) => void;
  onSelect?: (contact: unknown[]) => void;
  onInputValueChange: (value: string) => void;
  onRemove: (phoneNumber: string) => void;
  setFilterString: (filterString: string) => void;
}

export const ContactSearchPanel: React.FunctionComponent<
  ContactSearchPanelProps
> = ({
  open: openProp,
  defaultTab,
  maxRecipients,
  inputValue,
  source = 'message',
  toNumbers,
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
  onSelect,
  onInputValueChange,
  onRemove,
  setFilterString,
  onExpanded,
  helperText,
}) => {
  const { t } = useLocale(i18n);
  const [value, _setValue] = useAsyncState(inputValue, (value) => {
    onInputValueChange(value);
    setFilterString(value);
  });

  const renderTags = (
    values: BaseSuggestionListItemData[],
    getTagProps: (
      selectedItem: BaseSuggestionListItemData,
      index: number,
    ) => Omit<
      GetTagProps<BaseSuggestionListItemData>,
      'children' | 'index' | 'selectedItem'
    > & {
      onDelete?: React.EventHandler<any>;
    },
  ) =>
    values.map((item: BaseSuggestionListItemData, index: number) => {
      const tagProps = getTagProps(item, index);
      const { id, profileImageUrl, phoneNumber, name } =
        item as SuggestionListItemData;

      return (
        <Chip
          data-sign={`chip-${id ?? index}`}
          startSlot={
            profileImageUrl ? (
              <Avatar src={profileImageUrl} size="small" />
            ) : undefined
          }
          key={index}
          {...tagProps}
          color={item.error ? 'error' : 'default'}
          label={name || phoneNumber}
          onDelete={() => {
            onRemove(phoneNumber);
          }}
          truncate
        />
      );
    });

  const setValue = (v: string) => {
    if (v === '') {
      // spring-ui need to set full props to trigger onClose event
      closeMenu({} as any, 'escape');
    }
    _setValue(v);
  };

  const { closeMenu, openMenu, inputRef, component, InputProps, inputProps } =
    useContactSearchView({
      value,
      multiple: true,
      onChange: () => {
        // do nothing, we handle the Autocomplete onInputChange event
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
      onContactSelected: (option: any) => {
        // for freeSolo option, only number is acceptable
        if (option.freeSolo && validateValidChars(option.label)) {
          onSelect?.([
            {
              phoneNumber: option.label,
              name: option.label,
              freeSolo: true,
            },
          ]);
          return;
        }
        onSelect?.([
          {
            ...option,
            phoneNumber: option.phoneNumber,
            name: option.name || option.label,
          },
        ]);
      },
    });

  // TODO: should use Autocomplete inputProps to control readonly when issue: UXSYS-3822 fixed
  useEffect(() => {
    if (maxRecipients && toNumbers.length >= maxRecipients) {
      inputRef.current?.setAttribute('readonly', 'true');
    } else {
      inputRef.current?.removeAttribute('readonly');
    }
  }, [toNumbers, inputRef, maxRecipients]);

  useEventListener(inputRef.current, 'paste', (e: ClipboardEvent) => {
    const pasteText = e.clipboardData?.getData('text/plain') ?? '';
    if (pasteText.trim().length) {
      const validValues = pasteText
        .split(stringArrToRegExp(keyToTags))
        .map((item) => item.replace(/\r?\n|\r/g, ' ').trim())
        .filter(Boolean);
      let hasAddFreeSolo = false;
      e.preventDefault();
      e.stopPropagation();

      const selectedValues = validValues.reduce((acc, val) => {
        if (validateValidChars(val)) {
          acc.push({
            phoneNumber: val,
            name: val,
            freeSolo: true,
          });
        }
        return acc;
      }, [] as any[]);

      if (selectedValues.length > 0) {
        onSelect?.(selectedValues);
        hasAddFreeSolo = true;
      }

      if (!hasAddFreeSolo) {
        // should only set string before first keyToTags
        _setValue(validValues[0]);
      }
    }
  });

  useEffect(() => {
    if (openProp && value.trim().length) {
      openMenu({} as any);
    } else {
      // spring-ui need to set full props to trigger onClose event
      closeMenu({} as any, 'escape');
    }
  }, [openProp, value, openMenu, closeMenu]);

  const error = useMemo(
    () => toNumbers.some((toNumber) => toNumber.error),
    [toNumbers],
  );

  return (
    <div className={clsx('flex flex-col gap-2', openProp && 'flex-auto')}>
      <Autocomplete
        multiple
        size="medium"
        clearBtn={!!value.length}
        ClearButtonProps={
          {
            'data-sign': 'removeBtn',
            // TODO: spring-ui issue with data-props miss, so must as any
          } as any
        }
        PopperProps={{
          classes: {
            paper: 'hidden',
          },
        }}
        error={error}
        inputRef={inputRef}
        inputValue={value}
        inputVariant="outlined"
        RootProps={InputProps}
        inputProps={{
          ...inputProps,
          'data-sign': 'recipientsInput',
          maxLength: 30,
        }}
        label={t('to')}
        value={toNumbers}
        helperText={error ? helperText || t('invalidPhoneNumber') : helperText}
        renderTags={renderTags}
        onClick={(e) => {
          if (value.length) {
            openMenu(e);
          }
        }}
        placeholder={placeholder || t('enterNameOrNumber')}
        onInputChange={(val) => {
          setValue(val);
        }}
        options={[]}
      />
      {openProp && (
        <main className="relative flex flex-col flex-auto overflow-hidden">
          {component}
        </main>
      )}
    </div>
  );
};
