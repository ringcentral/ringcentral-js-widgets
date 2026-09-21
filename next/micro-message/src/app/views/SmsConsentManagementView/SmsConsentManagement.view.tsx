import { ContactMatcher } from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  action,
  delegate,
  dynamic,
  injectable,
  PortManager,
  RcViewModule,
  RouterPlugin,
  state,
  takeUntilAppDestroy,
  useConnector,
} from '@ringcentral-integration/next-core';
import { isE164, isValidNumber } from '@ringcentral-integration/phone-number';
import React, { useEffect, useRef } from 'react';
import {
  catchError,
  concatMap,
  defer,
  EMPTY,
  finalize,
  map,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

import {
  SmsConsent,
  SmsConsentCoverage,
  type SearchSmsConsentRecordsRequest,
  type SearchSmsConsentRecordsResponse,
  type SMSConsent,
} from '../../services';
import { SmsConsentDialogView } from '../SmsConsentDialogView';

import {
  SmsConsentManagementPanel,
  type SmsConsentManagementFilters,
} from './SmsConsentManagementPanel';

const SETTINGS_ROUTE = '/settings';
const SEARCH_DEBOUNCE = 300;

type LoadConsentRecordsOptions = {
  append?: boolean;
  searchValue?: string;
};

type ConsentRecordsLoadingType = 'idle' | 'replace' | 'append';

type LoadConsentRecordsTask =
  | {
      type: 'load';
      params: SearchSmsConsentRecordsRequest;
      append: boolean;
      resolve: (
        data: SearchSmsConsentRecordsResponse | null | undefined,
      ) => void;
    }
  | {
      type: 'invalid';
      resolve: () => void;
    }
  | {
      type: 'reset';
      resolve: () => void;
      reject: (error: unknown) => void;
    };

const EMPTY_FILTERS: SmsConsentManagementFilters = {
  coverage: [],
  campaignType: [],
  from: [],
};

@injectable({
  name: 'SmsConsentManagementView',
})
export class SmsConsentManagementView extends RcViewModule {
  @dynamic('SmsConsentDialogView')
  protected _smsConsentDialogView?: SmsConsentDialogView;

  private _loadConsentRecordsRequest$ = new Subject<LoadConsentRecordsTask>();

  private _activeQueryParams?: SearchSmsConsentRecordsRequest;

  @state
  searchValue = '';

  @state
  searchError = false;

  @state
  private loadingType: ConsentRecordsLoadingType = 'idle';

  @state
  private requestError = false;

  @state
  private filterOpen = false;

  @state
  private filters: SmsConsentManagementFilters = EMPTY_FILTERS;

  constructor(
    private _smsConsent: SmsConsent,
    private _router: RouterPlugin,
    private _contactMatcher: ContactMatcher,
    private _portManager: PortManager,
  ) {
    super();

    if (this._portManager.shared) {
      this._portManager.onServer(() => {
        this._bindLoadConsentRecordsRequest();
      });
    } else {
      this._bindLoadConsentRecordsRequest();
    }
  }

  private _bindLoadConsentRecordsRequest() {
    this._loadConsentRecordsRequest$
      .pipe(
        switchMap((task) => {
          if (task.type === 'invalid') {
            this._activeQueryParams = undefined;
            this._setSearchError(true);
            this._setLoadingType('idle');
            task.resolve();
            return EMPTY;
          }

          if (task.type === 'reset') {
            let settled = false;

            this._activeQueryParams = undefined;
            this._resetViewState();

            return defer(() => this._smsConsent.resetConsentsData()).pipe(
              tap(() => {
                settled = true;
                task.resolve();
              }),
              catchError((error) => {
                settled = true;
                task.reject(error);
                return EMPTY;
              }),
              finalize(() => {
                if (!settled) {
                  task.resolve();
                }
              }),
            );
          }

          let settled = false;

          this._setSearchError(false);
          this._setRequestError(false);
          this._setLoadingType(task.append ? 'append' : 'replace');
          if (!task.append) {
            this._activeQueryParams = undefined;
          }

          const search$ = this._smsConsent.searchConsentRecords$(task.params, {
            append: task.append,
          });
          const request$ = task.append
            ? search$
            : defer(() => this._smsConsent.resetConsentsData()).pipe(
                concatMap(() => search$),
              );

          return request$.pipe(
            concatMap((data) => {
              if (!data) {
                return of(data);
              }

              return defer(() => this._matchContacts(data.records)).pipe(
                map(() => data),
              );
            }),
            tap((data) => {
              if (!task.append) {
                this._activeQueryParams = task.params;
              }
              settled = true;
              task.resolve(data);
            }),
            catchError((error) => {
              this.logger.error('load sms consent records error', error);
              this._setRequestError(true);
              settled = true;
              task.resolve(undefined);
              return EMPTY;
            }),
            finalize(() => {
              this._setLoadingType('idle');
              if (!settled) {
                task.resolve(undefined);
              }
            }),
          );
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  @action
  private _setSearchValue(value: string) {
    this.searchValue = value;
    this.searchError = false;
    this.requestError = false;
  }

  @action
  private _setSearchError(value: boolean) {
    this.searchError = value;
  }

  @action
  private _setLoadingType(value: ConsentRecordsLoadingType) {
    this.loadingType = value;
  }

  @action
  private _setRequestError(value: boolean) {
    this.requestError = value;
  }

  @action
  private _setFilterOpen(value: boolean) {
    this.filterOpen = value;
  }

  @action
  private _setFilters(filters: SmsConsentManagementFilters) {
    this.filters = filters;
  }

  @action
  private _resetViewState() {
    this.searchValue = '';
    this.searchError = false;
    this.loadingType = 'idle';
    this.requestError = false;
    this.filterOpen = false;
    this.filters = EMPTY_FILTERS;
  }

  get showSetting() {
    return !!this._smsConsent.canReadConsent;
  }

  private get loading() {
    return this.loadingType === 'replace';
  }

  private get loadingMore() {
    return this.loadingType === 'append';
  }

  @delegate('server')
  async openFilters() {
    this._setFilterOpen(true);
  }

  @delegate('server')
  async closeFilters() {
    this._setFilterOpen(false);
  }

  @delegate('server')
  async updateSearchValue(value: string) {
    this._activeQueryParams = undefined;
    this._setSearchValue(value);
  }

  @delegate('server')
  async applyFilters(filters: SmsConsentManagementFilters) {
    this._setFilters(filters);
    this._setFilterOpen(false);
    await this.loadConsentRecords();
  }

  @delegate('server')
  async goToSettings() {
    this._router.push(SETTINGS_ROUTE);
  }

  @delegate('server')
  async openAddConsent() {
    const saved =
      await this._smsConsentDialogView?.openAddConsentFromSettings();
    if (saved) {
      await this.loadConsentRecords();
    }
  }

  @delegate('server')
  async loadConsentRecords({
    append = false,
    searchValue = this.searchValue,
  }: LoadConsentRecordsOptions = {}) {
    if (!this._smsConsent.canReadConsent) {
      return;
    }

    if (append) {
      if (this.loadingType !== 'idle') {
        return;
      }

      const nextPageToken = this._smsConsent.consentsData?.paging.nextPageToken;
      if (!nextPageToken || !this._activeQueryParams) {
        return;
      }

      return new Promise<SearchSmsConsentRecordsResponse | null | undefined>(
        (resolve) => {
          this._loadConsentRecordsRequest$.next({
            type: 'load',
            params: {
              ...this._activeQueryParams,
              pageToken: nextPageToken,
            },
            append: true,
            resolve,
          });
        },
      );
    }

    const rawSearchValue = searchValue.trim();
    const normalizedSearchValue = rawSearchValue
      ? this._smsConsent.normalizeNumber(rawSearchValue)
      : '';
    if (
      rawSearchValue &&
      (!isE164(normalizedSearchValue) || !isValidNumber(normalizedSearchValue))
    ) {
      return new Promise<void>((resolve) => {
        this._loadConsentRecordsRequest$.next({
          type: 'invalid',
          resolve,
        });
      });
    }

    const params: SearchSmsConsentRecordsRequest = {};
    if (normalizedSearchValue) {
      params.to = [normalizedSearchValue];
    }
    if (
      this.filters.coverage.length ||
      this.filters.campaignType.length ||
      this.filters.from.length
    ) {
      // adjust coverage
      params.coverage = [
        ...this.filters.coverage,
        ...(this.filters.campaignType.length
          ? [SmsConsentCoverage.CampaignType]
          : []),
        ...(this.filters.from.length ? [SmsConsentCoverage.PhoneNumber] : []),
      ];
    }
    if (this.filters.campaignType.length) {
      params.campaignType = this.filters.campaignType;
    }
    if (this.filters.from.length) {
      params.from = this.filters.from;
    }
    return new Promise<SearchSmsConsentRecordsResponse | null | undefined>(
      (resolve) => {
        this._loadConsentRecordsRequest$.next({
          type: 'load',
          params,
          append: false,
          resolve,
        });
      },
    );
  }

  @delegate('server')
  async resetConsentManagementView() {
    return new Promise<void>((resolve, reject) => {
      this._loadConsentRecordsRequest$.next({
        type: 'reset',
        resolve,
        reject,
      });
    });
  }

  private async _matchContacts(records: SMSConsent[]) {
    const phoneNumbers = [
      ...new Set(records.map(({ to }) => to).filter(Boolean)),
    ];
    if (phoneNumbers.length) {
      await this._contactMatcher.match({ queries: phoneNumbers });
    }
  }

  private getContactName(phoneNumber: string) {
    return (
      this._contactMatcher.findMatchesFromNumber(phoneNumber, undefined)[0]
        ?.name ?? ''
    );
  }

  component() {
    const didMountRef = useRef(false);
    const shouldHandleLifecycle =
      !this._portManager?.shared || this._portManager.isMainTab;
    const {
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
    } = useConnector(() => ({
      records: this._smsConsent.consentsData?.records ?? [],
      registeredNumbers: this._smsConsent.registeredSmsNumbers,
      canAddConsent: this._smsConsent.canAddConsent,
      searchValue: this.searchValue,
      searchError: this.searchError,
      loading: this.loading,
      loadingMore: this.loadingMore,
      requestError: this.requestError,
      filterOpen: this.filterOpen,
      filters: this.filters,
    }));

    useEffect(() => {
      if (!shouldHandleLifecycle) {
        return;
      }

      if (!didMountRef.current) {
        didMountRef.current = true;
        this.loadConsentRecords({ searchValue });
        return;
      }

      const timer = window.setTimeout(() => {
        this.loadConsentRecords({ searchValue });
      }, SEARCH_DEBOUNCE);

      return () => window.clearTimeout(timer);
    }, [searchValue, shouldHandleLifecycle]);

    useEffect(() => {
      if (!shouldHandleLifecycle) {
        return;
      }

      return () => {
        this.resetConsentManagementView();
      };
    }, [shouldHandleLifecycle]);

    return (
      <SmsConsentManagementPanel
        records={records}
        registeredNumbers={registeredNumbers}
        canAddConsent={canAddConsent}
        searchValue={searchValue}
        searchError={searchError}
        loading={loading}
        loadingMore={loadingMore}
        requestError={requestError}
        filterOpen={filterOpen}
        filters={filters}
        formatNumber={(phoneNumber) =>
          this._smsConsent.formatNumber(phoneNumber)
        }
        getContactName={(phoneNumber) => this.getContactName(phoneNumber)}
        onBackClick={() => this.goToSettings()}
        onAddConsent={() => this.openAddConsent()}
        onSearchChange={(value) => this.updateSearchValue(value)}
        onFilterOpen={() => this.openFilters()}
        onFilterClose={() => this.closeFilters()}
        onFiltersApply={(filters) => this.applyFilters(filters)}
        onEndReached={() => this.loadConsentRecords({ append: true })}
      />
    );
  }
}
