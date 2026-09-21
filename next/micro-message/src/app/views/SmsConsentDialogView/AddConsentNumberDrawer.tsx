import { SearchMd } from '@ringcentral/spring-icon';
import {
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  Icon,
  List,
  ListItem,
  TextField,
} from '@ringcentral/spring-ui';
import React, { useMemo, useState } from 'react';

import { t } from './i18n';

export interface AddConsentNumberDrawerPanelProps {
  registeredNumbers: string[];
  defaultNumber?: string;
  formatNumber: (phoneNumber?: string) => string;
  onClose: () => void;
  onSelect: (phoneNumber: string) => void;
}

/**
 * First-step number picker for the settings "Add consent" flow. Rendered inside
 * a bottom drawer modal so the user can pick which SMS-registered number to
 * associate before opening the Add consent form. Structure mirrors the consent
 * management ConsentFilterDrawer registered-number list.
 */
export const AddConsentNumberDrawerPanel = ({
  registeredNumbers,
  defaultNumber,
  formatNumber,
  onClose,
  onSelect,
}: AddConsentNumberDrawerPanelProps) => {
  const [search, setSearch] = useState('');

  const filteredNumbers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) {
      return registeredNumbers;
    }
    return registeredNumbers.filter((phoneNumber) => {
      const formattedNumber = formatNumber(phoneNumber);
      return (
        formattedNumber.toLowerCase().includes(normalizedSearch) ||
        phoneNumber.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [registeredNumbers, search, formatNumber]);

  return (
    <>
      <DialogTitle className="flex items-center justify-between px-4 py-3">
        <span className="typography-subtitleBold text-neutral-b0">
          {t('addConsentTitle')}
        </span>
        <Button
          variant="text"
          color="neutral"
          size="small"
          data-sign="addConsentNumberCloseButton"
          onClick={onClose}
        >
          {t('close')}
        </Button>
      </DialogTitle>
      <Divider variant="full" />
      <DialogContent
        className="flex flex-col gap-3 py-3"
        style={{ maxHeight: '65vh' }}
      >
        <TextField
          clearBtn
          type="search"
          fullWidth
          size="medium"
          value={search}
          placeholder={t('filterPhoneNumbers')}
          startAdornment={<Icon symbol={SearchMd} size="small" />}
          inputProps={{
            'aria-label': t('filterPhoneNumbers'),
            'data-sign': 'addConsentNumberSearchInput',
          }}
          onChange={(event) => setSearch(event.target.value)}
          onClear={() => setSearch('')}
        />
        <div
          className="max-h-[48vh] overflow-y-auto"
          data-sign="addConsentNumberOptions"
        >
          {filteredNumbers.length > 0 ? (
            <List>
              {filteredNumbers.map((phoneNumber) => (
                <ListItem
                  divider={false}
                  key={phoneNumber}
                  clickable
                  selected={phoneNumber === defaultNumber}
                  data-sign="addConsentNumberOption"
                  onClick={() => onSelect(phoneNumber)}
                >
                  {formatNumber(phoneNumber)}
                </ListItem>
              ))}
            </List>
          ) : (
            <div
              className="min-h-[80px] flex items-center justify-center typography-mainText text-neutral-b1"
              data-sign="addConsentNumberEmpty"
            >
              {t('emptySearch')}
            </div>
          )}
        </div>
      </DialogContent>
    </>
  );
};
