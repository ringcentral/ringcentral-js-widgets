import {
  ExtensionInfo,
  NumberFormatter,
  trackEvent,
  type SmsConsentRecordTrackProperties,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { BlockPlugin } from '@ringcentral-integration/micro-core/src/app/plugins';
import {
  DateTimeFormat,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  ModalView,
  useModalItemView,
} from '@ringcentral-integration/micro-core/src/app/views';
import {
  action,
  computed,
  delegate,
  dynamic,
  fromPortal,
  fromWatch,
  injectable,
  portal,
  RcViewModule,
  RouterPlugin,
  state,
  takeUntilAppDestroy,
  useConnector,
} from '@ringcentral-integration/next-core';
import React from 'react';
import {
  catchError,
  defaultIfEmpty,
  defer,
  firstValueFrom,
  from,
  map,
  type Observable,
  of,
  takeUntil,
  tap,
} from 'rxjs';

import {
  ComposeText,
  selectLatestSmsConsentRecord,
  SmsConsent,
  type PhoneNumberPair,
  type SaveSmsConsentRecordOptions,
  type SmsConfigurationResponse,
} from '../../services';

import { AddConsentNumberDrawerPanel } from './AddConsentNumberDrawer';
import { DetailsPanel } from './DetailsPanel';
import { t } from './i18n';
import { getSmsConsentRecordTrackProperties } from './SmsConsentDialog.helper';
import {
  SmsConsentDialogPanel,
  type SmsConsentDialogPayload,
} from './SmsConsentDialogPanel';

type SmsConsentDialogOpenPayload = Pick<
  SmsConsentDialogPayload,
  | 'numbers'
  | 'contactName'
  | 'editableExternalNumber'
  | 'skipDetailAfterSaved'
  | 'consentEntry'
>;

type NumberPickerPayload = {
  registeredNumbers: string[];
  defaultNumber?: string;
};

@injectable({
  name: 'SmsConsentDialogView',
})
export class SmsConsentDialogView extends RcViewModule {
  @portal
  private addConsentDialog = this._modalView.create<SmsConsentDialogPayload>({
    view: () => <this.AddConsentDialogContent />,
    props: () => ({
      'data-sign': 'sms-consent-add-dialog',
      type: 'drawer',
      disableBackdropClick: true,
      disableEscapeKeyDown: true,
      disableRestoreFocus: true,
    }),
  });

  @portal
  private consentDetailsDialog =
    this._modalView.create<SmsConsentDialogPayload>({
      view: () => <this.ConsentDetailsDialogContent />,
      props: () => ({
        'data-sign': 'sms-consent-details-dialog',
        className: 'z-drawer',
        classes: {
          root: '!px-0',
        },
        fullScreen: true,
        disableBackdropClick: true,
        disableEscapeKeyDown: true,
        disableRestoreFocus: true,
        onClose: () => {
          this.setDetailsDialogOpen(false);
        },
      }),
    });

  @portal
  private numberPickerDialog = this._modalView.create<NumberPickerPayload>({
    view: () => <this.NumberPickerDialogContent />,
    props: () => ({
      'data-sign': 'sms-consent-number-picker',
      type: 'drawer',
      disableBackdropClick: true,
      disableEscapeKeyDown: true,
      disableRestoreFocus: true,
    }),
  });

  @dynamic('ComposeText')
  protected _composeText?: ComposeText;

  @state
  private detailsDialogOpen = false;

  @state
  private pickedNumber = '';

  @state
  private settingsAddConsentSaved = false;

  @action
  _setDetailsDialogOpen(val: boolean) {
    this.detailsDialogOpen = val;
  }

  @action
  private _setPickedNumber(value: string) {
    this.pickedNumber = value;
  }

  @action
  private _setSettingsAddConsentSaved(value: boolean) {
    this.settingsAddConsentSaved = value;
  }

  @delegate('server')
  async setSettingsAddConsentSaved(saved: boolean) {
    this._setSettingsAddConsentSaved(saved);
  }

  @delegate('server')
  async setDetailsDialogOpen(open: boolean) {
    this._setDetailsDialogOpen(open);
  }

  constructor(
    private _block: BlockPlugin,
    private _modalView: ModalView,
    private _smsConsent: SmsConsent,
    private _numberFormatter: NumberFormatter,
    private _extensionInfo: ExtensionInfo,
    private _dateTimeFormat: DateTimeFormat,
    private _toast: Toast,
    private _router: RouterPlugin,
  ) {
    super();
  }

  header = null;
  footer = null;

  @delegate('server')
  async openAddConsentDialog({
    numbers,
    contactName,
    editableExternalNumber,
    skipDetailAfterSaved,
    consentEntry,
  }: SmsConsentDialogOpenPayload) {
    if (!this._smsConsent.canAddConsent) {
      return false;
    }
    const result = await this._runUntilRouteChange(() =>
      from(
        this._block.next(() => this.getSmsConfigurationForSender(numbers.from)),
      ),
    );
    if (!result?.success) {
      return false;
    }

    const { configuration } = result;

    return Boolean(
      await this._openUntilRouteChange(() =>
        this._modalView.open(this.addConsentDialog, {
          numbers,
          configuration,
          contactName,
          editableExternalNumber,
          skipDetailAfterSaved,
          consentEntry,
        }),
      ),
    );
  }

  /**
   * Settings "Add consent" entry point (RCINT-47840). The external number is
   * typed manually; the RC (from) number is picked first when the user has more
   * than one SMS-registered number. Resolves `true` only when a record was
   * saved, so the caller can reload the consent list.
   */
  @delegate('server')
  async openAddConsentFromSettings(): Promise<boolean> {
    if (!this._smsConsent.canAddConsent) {
      return false;
    }

    const registeredNumbers = this._smsConsent.registeredSmsNumbers;

    let from: string | undefined;
    if (registeredNumbers.length === 1) {
      from = registeredNumbers[0];
    } else {
      from = await this._pickRegisteredNumber(registeredNumbers);
      if (!from) {
        return false;
      }
    }

    this._setSettingsAddConsentSaved(false);

    await this.openAddConsentDialog({
      numbers: { from, to: '' },
      editableExternalNumber: true,
      skipDetailAfterSaved: true,
      consentEntry: 'Settings',
    });

    return this.settingsAddConsentSaved;
  }

  private _resolveDefaultRegisteredNumber(registeredNumbers: string[]) {
    const senderNumber = this._composeText?.senderNumber;
    if (senderNumber) {
      const normalizedSender = this.normalizeNumber(senderNumber);
      const match = registeredNumbers.find(
        (phoneNumber) => this.normalizeNumber(phoneNumber) === normalizedSender,
      );
      if (match) {
        return match;
      }
    }
    return registeredNumbers[0];
  }

  @delegate('server')
  private async _pickRegisteredNumber(
    registeredNumbers: string[],
  ): Promise<string> {
    this._setPickedNumber('');
    await this._openUntilRouteChange(() =>
      this._modalView.open(this.numberPickerDialog, {
        registeredNumbers,
        defaultNumber: this._resolveDefaultRegisteredNumber(registeredNumbers),
      }),
    );
    return this.pickedNumber;
  }

  @delegate('server')
  async selectPickedNumber(phoneNumber: string) {
    this._setPickedNumber(phoneNumber);
    await this._modalView.close(this.numberPickerDialog);
  }

  async viewConsentDetails(payload: SmsConsentDialogOpenPayload) {
    const success = await this._ensureConsentDetails(payload);
    if (!success) {
      return false;
    }

    const trackProperties = this.getViewConsentTrackProperties(payload);
    trackEvent('Int_SMS_viewConsent', trackProperties);

    return trackProperties;
  }

  @delegate('server')
  private async _ensureConsentDetails(
    payload: SmsConsentDialogOpenPayload,
  ): Promise<boolean> {
    const { numbers } = payload;
    if (!this._smsConsent.canReadConsent) {
      return false;
    }

    const result = await this._runUntilRouteChange(() =>
      from(
        this._block.next(() =>
          this.reloadLatestConsentRecord({
            numbers,
          }),
        ),
      ),
    );

    if (!result?.success) {
      return false;
    }

    if (!this.detailsDialogOpen) {
      await this.openConsentDetailsDialog(payload);
    }

    return true;
  }

  @delegate('server')
  async openConsentDetailsDialog(payload: SmsConsentDialogOpenPayload) {
    this.setDetailsDialogOpen(true);

    this._openUntilRouteChange(
      () => this._modalView.open(this.consentDetailsDialog, payload),
      () => this.setDetailsDialogOpen(false),
    );
  }

  private _openUntilRouteChange(
    openModal: Parameters<typeof fromPortal>[0],
    onRouteChange?: () => void,
  ) {
    return this._runUntilRouteChange(
      () => fromPortal(openModal),
      onRouteChange,
    );
  }

  private _runUntilRouteChange<T>(
    flow: () => Observable<T>,
    onRouteChange?: () => void,
  ) {
    const routeChanged$ = fromWatch(this, () => this._router.currentPath).pipe(
      tap(() => onRouteChange?.()),
    );

    return firstValueFrom(
      defer(flow).pipe(
        takeUntil(routeChanged$),
        takeUntilAppDestroy,
        defaultIfEmpty(null),
      ),
    );
  }

  @delegate('server')
  private async handleSaveClick(
    options: SaveSmsConsentRecordOptions,
  ): Promise<boolean> {
    const saved = await this._runUntilRouteChange(() =>
      defer(() =>
        Promise.resolve(this._smsConsent.saveConsentRecord(options)),
      ).pipe(
        map(() => true),
        catchError(() => {
          this._toast.danger({
            message: t('saveError'),
            ttl: 5000,
          });
          return of(false);
        }),
      ),
    );

    return Boolean(saved);
  }

  @delegate('server')
  private async getSmsConfigurationForSender(from: string): Promise<{
    success: boolean;
    configuration?: SmsConfigurationResponse;
  }> {
    try {
      await this._smsConsent.loadSmsConfigurationForSender(from);
      const configuration = this._smsConsent.getSmsConfiguration(from);

      if (!configuration) {
        this.logger.error('Failed to get SMS configuration for number', {
          from,
        });
        throw new Error();
      }

      return {
        success: true,
        configuration,
      };
    } catch (error) {
      this._toast.danger({
        message: t('openSettingsError'),
        ttl: 5000,
      });
      return { success: false };
    }
  }

  @delegate('server')
  private async reloadLatestConsentRecord({
    numbers,
  }: {
    numbers: PhoneNumberPair;
  }): Promise<{
    success: boolean;
  }> {
    try {
      await this._smsConsent.loadEffectiveConsentForNumbers(numbers);

      const { error } =
        this._smsConsent.getEffectiveConsentState(numbers) || {};

      if (error) {
        throw new Error(error);
      }

      return {
        success: true,
      };
    } catch (error) {
      this._toast.danger({
        message: t('openSettingsError'),
        ttl: 5000,
      });
      return { success: false };
    }
  }

  @computed
  get userNotePrefix() {
    return t('userAddedConsentNotePrefix', {
      userName: this._extensionInfo.name || t('unknownUser'),
    });
  }

  private formatNumber(phoneNumber?: string) {
    if (!phoneNumber) {
      return '';
    }

    return this._numberFormatter.formatNumber(phoneNumber) || phoneNumber;
  }

  private normalizeNumber(phoneNumber: string) {
    return (
      this._numberFormatter.normalizeNumber(phoneNumber, true) ||
      phoneNumber.trim()
    );
  }

  private formatDate(value?: string) {
    if (!value) {
      return '';
    }

    const utcTimestamp = Date.parse(value);
    if (Number.isNaN(utcTimestamp)) {
      return value;
    }

    return (
      this._dateTimeFormat.formatDateTime({
        utcTimestamp,
        type: 'date',
      }) ?? value
    );
  }

  private getViewConsentTrackProperties({
    numbers,
    consentEntry,
  }: Pick<SmsConsentDialogOpenPayload, 'numbers' | 'consentEntry'>):
    | SmsConsentRecordTrackProperties
    | Pick<SmsConsentRecordTrackProperties, 'consentEntry'> {
    const { data } = this._smsConsent.getEffectiveConsentState(numbers) || {};
    const record = selectLatestSmsConsentRecord(data?.explicitConsents);

    return record
      ? getSmsConsentRecordTrackProperties(record, consentEntry)
      : { consentEntry };
  }

  private AddConsentDialogContent = () => {
    const { props } = useModalItemView<SmsConsentDialogPayload>();
    const { consentEntry, contactName, skipDetailAfterSaved } = props.payload!;
    const { canAddConsent } = useConnector(() => ({
      canAddConsent: this._smsConsent.canAddConsent,
    }));

    return (
      <SmsConsentDialogPanel
        canAddConsent={canAddConsent}
        userNotePrefix={this.userNotePrefix}
        formatNumber={(phoneNumber) => this.formatNumber(phoneNumber)}
        normalizeNumber={(phoneNumber) => this.normalizeNumber(phoneNumber)}
        saveConsentRecord={({ options }) => this.handleSaveClick(options)}
        onSaveSuccess={async (numbers) => {
          if (skipDetailAfterSaved) {
            await this.setSettingsAddConsentSaved(true);
            return true;
          }
          return this._ensureConsentDetails({
            numbers,
            contactName,
            consentEntry,
          });
        }}
      />
    );
  };

  private NumberPickerDialogContent = () => {
    const { props } = useModalItemView<NumberPickerPayload>();
    const { registeredNumbers, defaultNumber } = props.payload!;

    return (
      <AddConsentNumberDrawerPanel
        registeredNumbers={registeredNumbers}
        defaultNumber={defaultNumber}
        formatNumber={(phoneNumber) => this.formatNumber(phoneNumber)}
        onClose={() => this._modalView.close(this.numberPickerDialog)}
        onSelect={(phoneNumber) => this.selectPickedNumber(phoneNumber)}
      />
    );
  };

  component() {
    return null;
  }

  private ConsentDetailsDialogContent = () => {
    const { props, action: modalAction } =
      useModalItemView<SmsConsentDialogPayload>();
    const { consentEntry, contactName, numbers } = props.payload!;
    const { canAddConsent, record } = useConnector(() => {
      const { data } = this._smsConsent.getEffectiveConsentState(numbers) || {};

      return {
        canAddConsent: this._smsConsent.canAddConsent,
        record: selectLatestSmsConsentRecord(data?.explicitConsents),
      };
    });

    return (
      <DetailsPanel
        record={record}
        phoneNumber={this.formatNumber(numbers.to)}
        contactName={contactName}
        canAddConsent={canAddConsent}
        formatNumber={(phoneNumber) => this.formatNumber(phoneNumber)}
        formatDate={(value) => this.formatDate(value)}
        onClose={() => {
          this.setDetailsDialogOpen(false);
          modalAction?.close();
        }}
        onAddConsent={() => {
          this.openAddConsentDialog({
            numbers,
            contactName,
            consentEntry,
          });
        }}
      />
    );
  };
}
