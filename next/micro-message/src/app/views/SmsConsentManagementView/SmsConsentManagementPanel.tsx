import { AppHeaderNav } from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { PageHeader } from '@ringcentral-integration/next-widgets/components';
import { FilterMd, PlusMd, SearchMd } from '@ringcentral/spring-icon';
import {
  Badge,
  Button,
  Checkbox,
  CircularProgressIndicator,
  Divider,
  FormLabel,
  Icon,
  IconButton,
  Drawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@ringcentral/spring-ui';
import React, { useEffect, useMemo, useState } from 'react';

import {
  SmsCampaignType,
  SmsConsentCoverage,
  SMSOptStatus,
  type SMSConsent,
} from '../../services';
import { getSmsConsentCoverageLabel } from '../SmsConsentDialogView/SmsConsentDialog.helper';

import i18n from './i18n';

export type SmsConsentManagementFilters = {
  coverage: SmsConsentCoverage[];
  campaignType: SmsCampaignType[];
  from: string[];
};

export type SmsConsentManagementPanelProps = {
  records: SMSConsent[];
  registeredNumbers: string[];
  canAddConsent: boolean;
  searchValue: string;
  searchError: boolean;
  loading: boolean;
  loadingMore: boolean;
  requestError: boolean;
  filterOpen: boolean;
  filters: SmsConsentManagementFilters;
  formatNumber: (phoneNumber?: string) => string;
  getContactName: (phoneNumber: string) => string;
  onBackClick: () => void;
  onAddConsent: () => void;
  onSearchChange: (value: string) => void;
  onFilterOpen: () => void;
  onFilterClose: () => void;
  onFiltersApply: (filters: SmsConsentManagementFilters) => void;
  onEndReached: () => void;
};

export const SmsConsentManagementPanel = ({
  records,
  registeredNumbers,
  canAddConsent,
  searchValue,
  searchError,
  loading,
  loadingMore,
  requestError,
  filterOpen,
  filters,
  formatNumber,
  getContactName,
  onBackClick,
  onAddConsent,
  onSearchChange,
  onFilterOpen,
  onFilterClose,
  onFiltersApply,
  onEndReached,
}: SmsConsentManagementPanelProps) => {
  const { t } = useLocale(i18n);
  const hasFilters =
    filters.coverage.length > 0 ||
    filters.campaignType.length > 0 ||
    filters.from.length > 0;
  const hasQuery = searchValue.trim().length > 0 || hasFilters;

  return (
    <div className="h-full min-h-0 flex flex-col bg-neutral-f6">
      <AppHeaderNav override>
        <PageHeader
          onBackClick={onBackClick}
          endAdornment={
            canAddConsent && registeredNumbers.length > 0 ? (
              <IconButton
                size="medium"
                variant="contained"
                color="secondary"
                symbol={PlusMd}
                data-sign="addConsentButton"
                TooltipProps={{ title: t('addConsent') }}
                onClick={onAddConsent}
              />
            ) : null
          }
        >
          <span className="typography-subtitle">{t('title')}</span>
        </PageHeader>
      </AppHeaderNav>

      <div className="flex items-start gap-2 px-3 pb-2">
        <TextField
          fullWidth
          value={searchValue}
          size="medium"
          placeholder={t('search')}
          error={searchError}
          onChange={(event) => onSearchChange(event.target.value)}
          inputProps={{
            'data-sign': 'consentSearchInput',
            'aria-label': t('search'),
          }}
          startAdornment={<Icon symbol={SearchMd} size="small" />}
        />
        <IconButton
          size="medium"
          variant="outlined"
          color={hasFilters ? 'primary' : 'secondary'}
          symbol={FilterMd}
          data-sign="consentFilterButton"
          TooltipProps={{ title: t('filter') }}
          onClick={onFilterOpen}
        />
      </div>

      <div className="px-3 pb-3 flex-1 min-h-0">
        <TableContainer
          border="rounded"
          className="h-full min-h-0 overflow-auto"
          onScroll={(event) => {
            const target = event.currentTarget;
            if (
              !loadingMore &&
              target.scrollHeight - target.scrollTop - target.clientHeight < 80
            ) {
              onEndReached();
            }
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className="typography-captionBold">
                  {t('externalNumber')}
                </TableCell>
                <TableCell className="typography-captionBold">
                  {t('consentStatusAndCoverage')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record, index) => {
                const contactName = getContactName(record.to);
                return (
                  <TableRow
                    key={`${record.to}-${record.from ?? ''}-${
                      record.coverage
                    }-${record.campaignType ?? ''}-${
                      record.optStatus
                    }-${index}`}
                    className="h-16"
                    data-sign="consentRecordRow"
                  >
                    <TableCell data-sign="externalNumber">
                      <div className="inline-flex flex-col">
                        <div className="whitespace-nowrap">
                          {formatNumber(record.to)}
                        </div>
                        {contactName ? (
                          <div className="typography-caption text-neutral-b1">
                            {contactName}
                          </div>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="inline-flex flex-col items-start gap-1">
                        <ConsentStatusBadge status={record.optStatus} />
                        <div
                          className="typography-caption text-neutral-b1"
                          data-sign="coverage"
                        >
                          {getSmsConsentCoverageLabel(record.coverage)}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <ConsentTableStatus
            requestError={requestError}
            loading={loading}
            loadingMore={loadingMore}
            recordCount={records.length}
            hasQuery={hasQuery}
          />
        </TableContainer>
      </div>

      <ConsentFilterDrawer
        open={filterOpen}
        filters={filters}
        registeredNumbers={registeredNumbers}
        formatNumber={formatNumber}
        onClose={onFilterClose}
        onApply={onFiltersApply}
      />
    </div>
  );
};

const TableState = ({
  children,
  dataSign = 'consentManagementEmpty',
}: {
  children: React.ReactNode;
  dataSign?: string;
}) => (
  <div
    className="py-4 flex items-center justify-center typography-mainText text-neutral-b1"
    data-sign={dataSign}
  >
    {children}
  </div>
);

const ConsentTableStatus = ({
  requestError,
  loading,
  loadingMore,
  recordCount,
  hasQuery,
}: {
  requestError: boolean;
  loading: boolean;
  loadingMore: boolean;
  recordCount: number;
  hasQuery: boolean;
}) => {
  const { t } = useLocale(i18n);

  if (requestError) {
    return <TableState>{t('loadError')}</TableState>;
  }

  if (loading && recordCount === 0) {
    return (
      <TableState dataSign="loadingConsentRecords">
        <CircularProgressIndicator size="large" />
      </TableState>
    );
  }

  if (recordCount === 0) {
    return (
      <TableState>{hasQuery ? t('emptySearch') : t('emptyList')}</TableState>
    );
  }

  if (loadingMore) {
    return (
      <div
        className="py-3 flex justify-center"
        data-sign="loadingMoreConsentRecords"
      >
        <CircularProgressIndicator size="small" />
      </div>
    );
  }

  return null;
};

const ConsentStatusBadge = ({ status }: { status: SMSOptStatus }) => {
  const hasOptedIn = status === SMSOptStatus.OptIn;
  const { t } = useLocale(i18n);

  return (
    <Badge
      count={t(hasOptedIn ? 'optIn' : 'optOut')}
      color={hasOptedIn ? 'success' : 'danger'}
      variant="contained"
      size="medium"
      classes={{
        content: 'whitespace-nowrap typography-descriptorMiniSemiBold px-3',
      }}
    />
  );
};

const ConsentFilterDrawer = ({
  open,
  filters,
  registeredNumbers,
  formatNumber,
  onClose,
  onApply,
}: {
  open: boolean;
  filters: SmsConsentManagementFilters;
  registeredNumbers: string[];
  formatNumber: (phoneNumber?: string) => string;
  onClose: () => void;
  onApply: (filters: SmsConsentManagementFilters) => void;
}) => {
  const { t } = useLocale(i18n);
  const [draft, setDraft] = useState(filters);
  const [registeredNumberSearch, setRegisteredNumberSearch] = useState('');

  const filteredRegisteredNumbers = useMemo(() => {
    return registeredNumbers.filter((phoneNumber) => {
      const normalizedSearch = registeredNumberSearch.trim().toLowerCase();
      const formattedNumber = formatNumber(phoneNumber);

      return (
        !normalizedSearch ||
        formattedNumber.toLowerCase().includes(normalizedSearch) ||
        phoneNumber.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [registeredNumbers, registeredNumberSearch, formatNumber]);

  const allRegisteredNumbersSelected =
    registeredNumbers.length > 0 &&
    registeredNumbers.every((phoneNumber) => draft.from.includes(phoneNumber));
  const someRegisteredNumbersSelected =
    !allRegisteredNumbersSelected &&
    registeredNumbers.some((phoneNumber) => draft.from.includes(phoneNumber));
  const FULL_CAMPAIGN_TYPES = Object.values(SmsCampaignType);

  useEffect(() => {
    if (open) {
      setDraft(filters);
      setRegisteredNumberSearch('');
    }
  }, [filters, open]);

  const toggle = <T,>(values: T[], value: T) =>
    values.includes(value)
      ? values.filter((item) => item !== value)
      : [...values, value];

  const reset = () => {
    setDraft({ coverage: [], campaignType: [], from: [] });
    setRegisteredNumberSearch('');
  };

  return (
    // @ts-ignore
    <Drawer
      open={open}
      anchor="bottom"
      onClose={onClose}
      header={
        <>
          <div className="w-full flex items-center justify-between p-4">
            <span className="typography-subtitleBold">{t('filters')}</span>
            <Button variant="text" color="neutral" size="small" onClick={reset}>
              {t('reset')}
            </Button>
          </div>
          <Divider variant="full" />
        </>
      }
      footer={
        <div className="grid grid-cols-2 gap-3 p-3">
          <Button fullWidth variant="outlined" onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button fullWidth onClick={() => onApply(draft)}>
            {t('apply')}
          </Button>
        </div>
      }
    >
      <div className="px-4 py-3">
        <FilterGroup title={t('coverage')}>
          <FilterOption
            label={t('company')}
            checked={draft.coverage.includes(SmsConsentCoverage.Account)}
            onChange={() =>
              setDraft({
                ...draft,
                coverage: toggle(draft.coverage, SmsConsentCoverage.Account),
              })
            }
          />
          <FilterOption
            label={t('registrationType')}
            checked={draft.campaignType.length === FULL_CAMPAIGN_TYPES.length}
            indeterminate={
              draft.campaignType.length > 0 &&
              draft.campaignType.length < FULL_CAMPAIGN_TYPES.length
            }
            onChange={() =>
              setDraft({
                ...draft,
                campaignType:
                  draft.campaignType.length === FULL_CAMPAIGN_TYPES.length
                    ? []
                    : FULL_CAMPAIGN_TYPES,
              })
            }
          />
          <div className="pl-6 flex flex-col gap-4">
            {FULL_CAMPAIGN_TYPES.map((campaignType) => (
              <FilterOption
                key={campaignType}
                label={t(campaignType.toLowerCase() as any)}
                checked={draft.campaignType.includes(campaignType)}
                onChange={() =>
                  setDraft({
                    ...draft,
                    campaignType: toggle(draft.campaignType, campaignType),
                  })
                }
              />
            ))}
          </div>
          {registeredNumbers.length > 1 ? (
            <div className="flex flex-col gap-2">
              <FilterOption
                label={t('smsRegisteredNumber')}
                checked={allRegisteredNumbersSelected}
                indeterminate={someRegisteredNumbersSelected}
                onChange={() =>
                  setDraft({
                    ...draft,
                    from: allRegisteredNumbersSelected
                      ? []
                      : [...registeredNumbers],
                  })
                }
              />
              <div className="pl-6 flex flex-col gap-2">
                <TextField
                  clearBtn
                  type="search"
                  size="medium"
                  fullWidth
                  value={registeredNumberSearch}
                  placeholder={t('filterPhoneNumbers')}
                  startAdornment={<Icon symbol={SearchMd} size="small" />}
                  inputProps={{
                    'aria-label': t('filterPhoneNumbers'),
                    'data-sign': 'registeredNumberSearchInput',
                  }}
                  onChange={(event) =>
                    setRegisteredNumberSearch(event.target.value)
                  }
                  onClear={() => setRegisteredNumberSearch('')}
                />
                <div
                  className="flex flex-col gap-4"
                  data-sign="registeredNumberFilterOptions"
                >
                  {filteredRegisteredNumbers.length > 0
                    ? filteredRegisteredNumbers.map((phoneNumber) => (
                        <FilterOption
                          key={phoneNumber}
                          label={formatNumber(phoneNumber)}
                          checked={draft.from.includes(phoneNumber)}
                          onChange={() =>
                            setDraft({
                              ...draft,
                              from: toggle(draft.from, phoneNumber),
                            })
                          }
                        />
                      ))
                    : t('emptySearch')}
                </div>
              </div>
            </div>
          ) : null}
        </FilterGroup>
      </div>
    </Drawer>
  );
};

const FilterGroup = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section>
    <div className="typography-mainTextBold text-neutral-b1 uppercase mb-4">
      {title}
    </div>
    <div className="flex flex-col gap-4">{children}</div>
  </section>
);

const FilterOption = ({
  label,
  checked,
  indeterminate,
  onChange,
}: {
  label: string;
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
}) => (
  <FormLabel label={label}>
    <Checkbox
      checked={checked}
      indeterminate={indeterminate}
      onChange={onChange}
    />
  </FormLabel>
);
