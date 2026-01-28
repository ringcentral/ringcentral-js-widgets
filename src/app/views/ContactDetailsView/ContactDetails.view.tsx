import { phoneTypes } from '@ringcentral-integration/commons/enums/phoneTypes';
import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import type {
  ContactModel,
  IContact,
} from '@ringcentral-integration/commons/interfaces/Contact.model';
import {
  AccountInfo,
  AppFeatures,
  ConnectivityManager,
  ExtensionInfo,
  RateLimiter,
  RegionSettings,
  track,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { Locale } from '@ringcentral-integration/micro-core/src/app/services';
import {
  ModalView,
  SyncTabId,
} from '@ringcentral-integration/micro-core/src/app/views';
import type { ComposeText } from '@ringcentral-integration/micro-message/src/app/services';
import type { Call } from '@ringcentral-integration/micro-phone/src/app/services';
import type { DialerView } from '@ringcentral-integration/micro-phone/src/app/views';
import { IntegrationConfig } from '@ringcentral-integration/micro-setting/src/app/services';
import {
  action,
  delegate,
  dynamic,
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  state,
  useConnector,
} from '@ringcentral-integration/next-core';
import { ContactDetailsView as ContactDetailsPanel } from '@ringcentral-integration/widgets/components/ContactDetailsView';
import type { ContactDetailsViewProps } from '@ringcentral-integration/widgets/components/ContactDetailsView/ContactDetailsView.interface';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router';

import { ContactMatcher, Contacts, ContactSearch } from '../../services';

import type {
  ContactDetailsViewOptions,
  IParams,
  RouteParams,
} from './ContactDetails.view.interface';
import type { ContactReadyState } from './contactReadyStates';
import { contactReadyStates } from './contactReadyStates';
import { formatContactPhoneNumber } from './helper';

const DEFAULT_DIALER_ROUTE = '/dialer';
const DEFAULT_COMPOSE_TEXT_ROUTE = '/composeText';

@injectable({
  name: 'ContactDetailsView',
})
export class ContactDetailsView extends RcViewModule {
  private params: IParams = {};

  constructor(
    protected _modalView: ModalView,
    protected _contactMatcher: ContactMatcher,
    protected _locale: Locale,
    protected _router: RouterPlugin,
    protected _contactSearch: ContactSearch,
    protected _contacts: Contacts,
    protected _extensionInfo: ExtensionInfo,
    protected _appFeatures: AppFeatures,
    protected _rateLimiter: RateLimiter,
    protected _regionSettings: RegionSettings,
    protected _connectivityManager: ConnectivityManager,
    protected _accountInfo: AccountInfo,
    protected _integrationConfig: IntegrationConfig,
    @optional('ContactDetailsViewOptions')
    protected _contactDetailsViewOptions?: ContactDetailsViewOptions,
  ) {
    super();
  }

  @dynamic('DialerView')
  protected readonly _dialerView?: DialerView;

  @dynamic('Call')
  protected readonly _call?: Call;

  @dynamic('ComposeText')
  protected readonly _composeText?: ComposeText;

  @state
  currentContact: ContactModel | null = null;

  @state
  currentContactReadyState: ContactReadyState = contactReadyStates.pending;

  @action
  private _setCurrentContact(
    readyState: ContactReadyState,
    contact: ContactModel | null,
  ) {
    this.currentContactReadyState = readyState;
    this.currentContact = contact;
  }

  @delegate('server')
  async resetCurrentContact() {
    this._setCurrentContact(contactReadyStates.pending, null);
  }

  @delegate('server')
  async initCurrentContact({ contactType, contactId }: IParams) {
    if (
      this.currentContactReadyState !== contactReadyStates.pending ||
      !contactType ||
      !contactId
    ) {
      return;
    }

    this._setCurrentContact(contactReadyStates.loading, null);

    const contact = await this._contacts.findContact({
      sourceName: contactType,
      contactId,
    });

    // hide hidden phone numbers when cdc is enabled
    if (this._appFeatures.isCDCEnabled && contact?.phoneNumbers?.length) {
      contact.phoneNumbers = contact.phoneNumbers.filter(
        (phone) => !phone.hidden,
      );
    }
    // ignore result when it is reset during loading
    if (this.currentContactReadyState !== contactReadyStates.loading) {
      return;
    }
    this._setCurrentContact(contactReadyStates.loaded, contact as ContactModel);
    if (contact) {
      this._contacts.getProfileImage(contact, false);
    }
  }

  @delegate('server')
  async getPresence(contact: IContact, useCache: boolean) {
    const presence = await this._contacts.getPresence(contact, useCache);
    return presence;
  }

  @delegate('server')
  async showContactDetails({ id, type, direct = false }: RouteParams) {
    this._router.push(`/contacts/${type}/${id}${direct ? '?direct=true' : ''}`);
  }

  @delegate('server')
  async handleClickToDial(contact: ContactModel, phoneNumber: string) {
    const recipient = {
      ...contact,
      phoneNumber,
    };
    if (this._call?.isIdle) {
      this._router.push(
        this._contactDetailsViewOptions?.dialerRoute ?? DEFAULT_DIALER_ROUTE,
        { [SyncTabId.DIALPAD]: 'keypad' },
      );
      this._dialerView?.call({ recipient });
    }
    this._trackClickToCall();
  }

  @delegate('server')
  async handleClickToSMS(contact: ContactModel, phoneNumber: string) {
    const recipient = {
      ...contact,
      phoneNumber,
    };
    this._router.push(
      this._contactDetailsViewOptions?.composeTextRoute ??
        DEFAULT_COMPOSE_TEXT_ROUTE,
    );
    this._composeText?.addToNumber(recipient);
    if (this._composeText?.typingToNumber === recipient.phoneNumber) {
      this._composeText.cleanTypingToNumber();
    }
    this._trackClickToSMS();
  }

  @track(trackEvents.clickToCallInContactDetails)
  private _trackClickToCall() {
    //
  }

  @track(trackEvents.clickToSMSInContactDetails)
  private _trackClickToSMS() {
    //
  }

  // TODO: fix type
  getUIProps(props: any) {
    return {
      currentLocale: this._locale.currentLocale,
      contact: this.currentContact,
      isMultipleSiteEnabled: this._extensionInfo.isMultipleSiteEnabled ?? false,
      isCallButtonDisabled: !!(
        this._connectivityManager?.isOfflineMode ||
        this._connectivityManager?.isWebphoneUnavailableMode ||
        this._connectivityManager?.isWebphoneInitializing ||
        this._rateLimiter?.restricted
      ),
      disableLinks: !!(
        this._connectivityManager?.isOfflineMode ||
        this._connectivityManager?.isVoipOnlyMode ||
        this._rateLimiter?.restricted
      ),
      showSpinner: !(
        this.currentContactReadyState === contactReadyStates.loaded &&
        this._locale.ready &&
        this._contactSearch.ready &&
        this._appFeatures.ready
      ),
    };
  }

  // TODO: fix type
  getUIFunctions(props: any) {
    return {
      formatNumber: (phoneNumber: string) =>
        formatContactPhoneNumber({
          phoneNumber,
          countryCode: this._regionSettings.countryCode,
          isMultipleSiteEnabled: this._extensionInfo.isMultipleSiteEnabled,
          siteCode: this._extensionInfo.site?.code,
          maxExtensionNumberLength: this._accountInfo.maxExtensionNumberLength,
        })!,
      getPresence: async (contact: IContact, useCache: boolean) => {
        const result = await this.getPresence(contact, useCache);
        return result;
      },
      canTextButtonShow: (phoneType: string) => {
        const outboundSmsPermission =
          this._appFeatures.hasOutboundSMSPermission;
        const internalSmsPermission =
          this._appFeatures.hasInternalSMSPermission;
        // guess this statement is to avoid exception
        const isClickToTextEnabled = !!this._composeText;
        return (
          isClickToTextEnabled &&
          phoneType !== phoneTypes.fax &&
          (phoneType === phoneTypes.extension
            ? internalSmsPermission
            : outboundSmsPermission)
        );
      },
      canCallButtonShow: (phoneType: string) => {
        const isClickToDialEnabled = !!(
          this._dialerView && this._appFeatures.isCallingEnabled
        );
        return isClickToDialEnabled && phoneType !== phoneTypes.fax;
      },
      onBackClick: () => {
        this._router.goBack();
      },
      onClickToDial: (contact: ContactModel, phoneNumber: string) =>
        this.handleClickToDial(contact, phoneNumber),
      onClickToSMS: (contact: ContactModel, phoneNumber: string) =>
        this.handleClickToSMS(contact, phoneNumber),
    };
  }

  component(props: Partial<ContactDetailsViewProps>) {
    this.params = useParams();

    useEffect(() => {
      this.initCurrentContact(this.params);
      return () => {
        this.resetCurrentContact();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });
    const Component =
      this._contactDetailsViewOptions?.component || ContactDetailsPanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
