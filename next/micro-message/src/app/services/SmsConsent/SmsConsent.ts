import { subscriptionFilters } from '@ringcentral-integration/commons/enums/subscriptionFilters';
import {
  AppFeatures,
  Auth,
  Client,
  ExtensionPhoneNumber,
  NumberFormatter,
  type WebSocketSubscription as Subscription,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  action,
  delegate,
  injectable,
  optional,
  RcModule,
  state,
  computed,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import { defer, type Observable, of, tap } from 'rxjs';

import {
  getEffectiveConsentNumbersFromKey,
  getConversationNumbers,
  getSmsConsentRecipientStatus,
  SmsConsentRecipientStatus,
} from './SmsConsent.helper';
import {
  ConsentControlLevel,
  SmsConsentCoverage,
  type SmsConsentChangeEventBody,
  type SmsConsentChangeEventRecord,
  type PhoneNumberPair,
  type EffectiveConsentResponse,
  type SearchSmsConsentRecordsRequest,
  type SearchSmsConsentRecordsResponse,
  type SaveSmsConsentRecordOptions,
  type SmsConfigurationResponse,
  type SmsConsentConversation,
  type SmsConsentState,
  type UpdateSMSConsentRequest,
  type UpdateSMSConsentResponse,
} from './SmsConsent.interface';

const smsConsentChangeEventRegExp =
  /\/restapi\/v2\/accounts\/.*\/sms\/consents$/;

const DEFAULT_CONSENT_RECORDS_PER_PAGE = 20;

@injectable({
  name: 'SmsConsent',
})
export class SmsConsent extends RcModule {
  @state
  effectiveConsentStateMap: Record<
    string,
    SmsConsentState<EffectiveConsentResponse>
  > = {};

  @state
  smsConfigurationStateMap: Record<
    string,
    SmsConsentState<SmsConfigurationResponse>
  > = {};

  @state
  consentsData?: SearchSmsConsentRecordsResponse | null = null;

  constructor(
    private _auth: Auth,
    private _client: Client,
    private _appFeatures: AppFeatures,
    private _extensionPhoneNumber: ExtensionPhoneNumber,
    private _numberFormatter: NumberFormatter,
    @optional('Subscription') private _subscription?: Subscription,
  ) {
    super();

    this._subscription?.register(this, {
      filters: [subscriptionFilters.smsConsents],
    });
  }

  override onInitOnce() {
    this._subscription
      ?.fromMessage$<SmsConsentChangeEventBody>(smsConsentChangeEventRegExp)
      .pipe(
        tap(async (event) => {
          await this._handleSmsConsentChangeEvent(event);
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  @computed
  get controlLevel() {
    if (this._appFeatures.hasConsentManagementPermission) {
      return ConsentControlLevel.Edit;
    }

    if (this._appFeatures.hasReadConsentsPermission) {
      return ConsentControlLevel.View;
    }

    return ConsentControlLevel.None;
  }

  @computed
  get canReadConsent() {
    return (
      this._auth.loggedIn && this.controlLevel !== ConsentControlLevel.None
    );
  }

  @computed
  get canAddConsent() {
    return (
      this._auth.loggedIn && this.controlLevel === ConsentControlLevel.Edit
    );
  }

  getEffectiveConsent(numbers: PhoneNumberPair) {
    const key = this._getEffectiveConsentKey(numbers);
    if (key) {
      return this.effectiveConsentStateMap[key]?.data;
    }
  }

  getEffectiveConsentState(numbers: PhoneNumberPair) {
    const key = this._getEffectiveConsentKey(numbers);
    if (key) {
      return this.effectiveConsentStateMap[key];
    }
  }

  getSmsConfiguration(from: string) {
    const key = this._getSenderKey(from);
    if (key) {
      return this.smsConfigurationStateMap[key]?.data;
    }
  }

  getConsentStatus(numbers: PhoneNumberPair): SmsConsentRecipientStatus {
    const consents = this.getEffectiveConsent(numbers)?.explicitConsents;

    // fail-open if no consent data available
    if (!consents) {
      return {};
    }

    return getSmsConsentRecipientStatus({
      consents,
      configuration: this.getSmsConfiguration(numbers.from),
    });
  }

  @delegate('server')
  async ensureSmsConfigurationState(from: string) {
    const key = this._getSenderKey(from);
    if (key) {
      const config = this.smsConfigurationStateMap[key];
      if (config?.status !== 'success') {
        await this.loadSmsConfigurationForSender(from);
      }
      return this.smsConfigurationStateMap[key];
    }
  }

  getConsentStatusForConversation(
    conversation?: SmsConsentConversation,
  ): SmsConsentRecipientStatus {
    const numbers = getConversationNumbers(conversation);
    if (!numbers) {
      return {};
    }

    return this.getConsentStatus(numbers);
  }

  @delegate('server')
  async loadConversationConsentData(conversation: SmsConsentConversation) {
    if (!this.canReadConsent) {
      return;
    }

    const numbers = getConversationNumbers(conversation);
    if (!numbers) {
      return;
    }

    await Promise.all([
      this.loadEffectiveConsentForNumbers(numbers),
      this.loadSmsConfigurationForSender(numbers.from),
    ]);
  }

  @delegate('server')
  async loadEffectiveConsentForNumbers(
    numbers: PhoneNumberPair,
  ): Promise<void> {
    const key = this._getEffectiveConsentKey(numbers);
    if (!this.canReadConsent || !key) {
      return;
    }

    this._setEffectiveConsentState(key, {
      status: 'fetching',
      data: this.getEffectiveConsent(numbers),
    });

    try {
      const data = await this.fetchEffectiveConsent(numbers);
      this._setEffectiveConsentState(key, {
        status: 'success',
        data,
      });
    } catch (error) {
      this.logger.error('load sms effective consent error', error);
      this._setEffectiveConsentState(key, {
        status: 'error',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  @delegate('server')
  async loadEffectiveConsentForNumberPairs(
    numberPairs: PhoneNumberPair[],
  ): Promise<void> {
    const uniqueNumberPairs = new Map<string, PhoneNumberPair>();

    numberPairs.forEach((numbers) => {
      const key = this._getEffectiveConsentKey(numbers);
      if (key && !uniqueNumberPairs.has(key)) {
        uniqueNumberPairs.set(key, numbers);
      }
    });

    await Promise.all(
      [...uniqueNumberPairs.values()].map((numbers) =>
        this.loadEffectiveConsentForNumbers(numbers),
      ),
    );
  }

  @delegate('server')
  async ensureEffectiveConsentForNumberPairs(
    numberPairs: PhoneNumberPair[],
  ): Promise<void> {
    const numberPairsToLoad = numberPairs.filter((numbers) => {
      const state = this.getEffectiveConsentState(numbers);
      return state?.status !== 'success';
    });

    await this.loadEffectiveConsentForNumberPairs(numberPairsToLoad);
  }

  private async _handleSmsConsentChangeEvent({
    records = [],
  }: SmsConsentChangeEventBody = {}) {
    const numberPairs = this._getEffectiveConsentNumberPairsToReload(records);
    if (!numberPairs.length) {
      return;
    }

    await this.loadEffectiveConsentForNumberPairs(numberPairs);
  }

  @delegate('server')
  async loadSmsConfigurationForSender(from: string) {
    const senderKey = this._getSenderKey(from);
    if (!this.canReadConsent || !senderKey) {
      return;
    }

    this._setSmsConfigurationState(senderKey, {
      status: 'fetching',
      data: this.getSmsConfiguration(from),
    });

    try {
      const data = await this.fetchSmsConfigurationForSender(from);
      this._setSmsConfigurationState(senderKey, {
        status: 'success',
        data,
      });
    } catch (error) {
      this.logger.error('load sms configuration error', error);
      this._setSmsConfigurationState(senderKey, {
        status: 'error',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async fetchEffectiveConsent({
    from,
    to,
  }: PhoneNumberPair): Promise<EffectiveConsentResponse> {
    const response = await this._client.service
      .platform()
      .get('/restapi/v2/accounts/~/sms/consents/effective-consent', {
        from: this._normalizeNumber(from),
        to: this._normalizeNumber(to),
      });

    return response.json();
  }

  @delegate('server')
  async fetchSmsConfigurationForSender(
    from: string,
  ): Promise<SmsConfigurationResponse> {
    const phoneNumberId = this._getSenderPhoneNumberId(from);
    if (!phoneNumberId) {
      throw new Error('SMS sender phone number id is unavailable.');
    }

    const response = await this._client.service
      .platform()
      .get(
        `/restapi/v1.0/account/~/extension/~/phone-number/${encodeURIComponent(
          String(phoneNumberId),
        )}/sms-configuration`,
      );

    return response.json();
  }

  @computed
  get registeredSmsNumbers() {
    return this._extensionPhoneNumber.smsSenderNumbers
      .map(({ phoneNumber }) => phoneNumber)
      .filter((phoneNumber): phoneNumber is string => !!phoneNumber);
  }

  normalizeNumber(phoneNumber = '') {
    return this._normalizeNumber(phoneNumber);
  }

  formatNumber(phoneNumber = '') {
    return this._numberFormatter.formatNumber(phoneNumber) || phoneNumber;
  }

  searchConsentRecords$(
    params: SearchSmsConsentRecordsRequest = {},
    { append = false }: { append?: boolean } = {},
  ): Observable<SearchSmsConsentRecordsResponse | null | undefined> {
    if (!this.canReadConsent) {
      return of(this.consentsData);
    }

    return defer(() => this.fetchConsentRecords(params)).pipe(
      tap((data) => {
        this._setConsentsData(data, append);
      }),
    );
  }

  @delegate('server')
  async fetchConsentRecords({
    from,
    to,
    perPage = DEFAULT_CONSENT_RECORDS_PER_PAGE,
    ...params
  }: SearchSmsConsentRecordsRequest = {}): Promise<SearchSmsConsentRecordsResponse> {
    const request: SearchSmsConsentRecordsRequest = {
      ...params,
      perPage,
      ...(from?.length
        ? {
            from: from.map((phoneNumber) => this._normalizeNumber(phoneNumber)),
          }
        : {}),
      ...(to?.length
        ? { to: to.map((phoneNumber) => this._normalizeNumber(phoneNumber)) }
        : {}),
    };
    const response = await this._client.service
      .platform()
      .post('/restapi/v2/accounts/~/sms/consents/search', request);

    return response.json();
  }

  @delegate('server')
  async saveConsentRecord({
    from,
    to,
    optStatus,
    coverage,
    campaignType,
    notes,
  }: SaveSmsConsentRecordOptions) {
    const record = {
      ...(coverage === SmsConsentCoverage.PhoneNumber
        ? { from: this._normalizeNumber(from) }
        : {}),
      to: this._normalizeNumber(to),
      optStatus,
      coverage,
      ...(coverage === SmsConsentCoverage.CampaignType && campaignType
        ? { campaignType }
        : {}),
      source: 'Api',
      notes,
    };

    const response = await this._client.service
      .platform()
      .patch('/restapi/v2/accounts/~/sms/consents', {
        records: [record],
      } satisfies UpdateSMSConsentRequest);
    const data: UpdateSMSConsentResponse = await response.json();

    if (data.failedRecords?.length) {
      const error =
        data.failedRecords[0]?.error?.message || 'Save SMS consent failed.';

      this.logger.error('save sms consent error', error);
      throw new Error(error);
    }

    return data;
  }

  @delegate('server')
  async resetConsentsData() {
    this._resetConsentsData();
  }

  @action
  private _setEffectiveConsentState(
    stateKey: string,
    state: SmsConsentState<EffectiveConsentResponse>,
  ) {
    this.effectiveConsentStateMap[stateKey] = state;
  }

  @action
  private _setSmsConfigurationState(
    senderKey: string,
    state: SmsConsentState<SmsConfigurationResponse>,
  ) {
    this.smsConfigurationStateMap[senderKey] = state;
  }

  @action
  private _setConsentsData(
    data: SearchSmsConsentRecordsResponse,
    append: boolean,
  ) {
    this.consentsData =
      append && this.consentsData
        ? {
            ...data,
            records: [...this.consentsData.records, ...data.records],
          }
        : data;
  }

  @action
  private _resetConsentsData() {
    this.consentsData = null;
  }

  @action
  private _reset() {
    this.effectiveConsentStateMap = {};
    this.smsConfigurationStateMap = {};
    this.consentsData = null;
  }

  override onReset() {
    this._reset();
  }

  private _normalizeNumber(phoneNumber = '') {
    return this._numberFormatter.normalizeNumber(phoneNumber, true);
  }

  private _getSenderKey(phoneNumber?: string) {
    return this._normalizeNumber(phoneNumber);
  }

  private _getEffectiveConsentKey(numbers?: PhoneNumberPair): string {
    const from = this._normalizeNumber(numbers?.from);
    const to = this._normalizeNumber(numbers?.to);

    return from && to ? `${from}_${to}` : '';
  }

  private _getEffectiveConsentNumberPairsToReload(
    records: SmsConsentChangeEventRecord[],
  ): PhoneNumberPair[] {
    return Object.keys(this.effectiveConsentStateMap).reduce<PhoneNumberPair[]>(
      (acc, key) => {
        const numbers = getEffectiveConsentNumbersFromKey(key);
        if (
          numbers &&
          records.some(({ from, to }) => {
            return (
              (!from ||
                from.trim() === '*' ||
                this._normalizeNumber(from) ===
                  this._normalizeNumber(numbers.from)) &&
              this._normalizeNumber(to) === this._normalizeNumber(numbers.to)
            );
          })
        ) {
          acc.push(numbers);
        }

        return acc;
      },
      [],
    );
  }

  private _getSenderPhoneNumberId(from: string) {
    const senderKey = this._getSenderKey(from);
    const senderNumber = this._extensionPhoneNumber.numbers.find(
      ({ phoneNumber }) => this._getSenderKey(phoneNumber) === senderKey,
    );

    return senderNumber?.id;
  }
}
