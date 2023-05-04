import { phoneTypes } from '@ringcentral-integration/commons/enums/phoneTypes';
import {
  ContactModel,
  IContact,
} from '@ringcentral-integration/commons/interfaces/Contact.model';
import background from '@ringcentral-integration/commons/lib/background';
import { Module } from '@ringcentral-integration/commons/lib/di';
import proxify from '@ringcentral-integration/commons/lib/proxy/proxify';
import {
  action,
  RcUIModuleV2,
  state,
  track,
} from '@ringcentral-integration/core';

import {
  ContactDetailsViewFunctionProps,
  ContactDetailsViewProps,
} from '../../components/ContactDetailsView/ContactDetailsView.interface';
import {
  Deps,
  GetUIFunctions,
  InitParams,
  RouteParams,
} from './ContactDetailsUI.interface';
import { ContactReadyState, contactReadyStates } from './contactReadyStates';
import { formatContactPhoneNumber } from './helper';
import { trackEvents } from './trackEvents';

const DEFAULT_DIALER_ROUTE = '/dialer';
const DEFAULT_COMPOSE_TEXT_ROUTE = '/composeText';

@Module({
  name: 'ContactDetailsUI',
  deps: [
    'Locale',
    'RouterInteraction',
    'ContactSearch',
    'Contacts',
    'ExtensionInfo',
    'AppFeatures',
    'RateLimiter',
    'RegionSettings',
    'ConnectivityManager',
    'Call',
    'DialerUI',
    'ComposeText',
    'AccountInfo',
    {
      dep: 'ContactDetailsUIOptions',
      optional: true,
    },
  ],
})
export class ContactDetailsUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({ deps });
  }

  @state
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'ContactMode... Remove this comment to see the full error message
  currentContact: ContactModel = null;

  @state
  currentContactReadyState: ContactReadyState = contactReadyStates.pending;

  @action
  private _setCurrentContact(
    readyState: ContactReadyState,
    contact: ContactModel,
  ) {
    this.currentContactReadyState = readyState;
    this.currentContact = contact;
  }

  @background
  async resetCurrentContact() {
    // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
    this._setCurrentContact(contactReadyStates.pending, null);
  }

  @background
  async initCurrentContact({ contactType, contactId }: InitParams) {
    if (this.currentContactReadyState !== contactReadyStates.pending) {
      return;
    }
    // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
    this._setCurrentContact(contactReadyStates.loading, null);
    const contact = await this._deps.contacts.findContact({
      sourceName: contactType,
      contactId,
    });

    // hide hidden phone numbers when cdc is enabled
    // @ts-expect-error TS(2533): Object is possibly 'null' or 'undefined'.
    if (this._deps.appFeatures.isCDCEnabled && contact.phoneNumbers.length) {
      // @ts-expect-error TS(2533): Object is possibly 'null' or 'undefined'.
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
      this._deps.contacts.getProfileImage(contact, false);
    }
  }

  @proxify
  async showContactDetails({ id, type, direct = false }: RouteParams) {
    this._deps.routerInteraction.push(
      `/contacts/${type}/${id}${direct ? '?direct=true' : ''}`,
    );
  }

  @proxify
  async getPresence(contact: IContact, useCache: boolean) {
    const presence = await this._deps.contacts.getPresence(contact, useCache);
    return presence;
  }

  @proxify
  async handleClickToDial(
    contact: ContactModel,
    phoneNumber: string,
    isStandAlone?: boolean,
  ) {
    const recipient = {
      ...contact,
      phoneNumber,
    };
    if (this._deps.call.isIdle) {
      this._deps.routerInteraction.push(
        this._deps.contactDetailsUIOptions?.dialerRoute ?? DEFAULT_DIALER_ROUTE,
      );
      this._deps.dialerUI.call({ recipient, isStandAlone });
    }
    this._trackClickToCall();
  }

  @proxify
  async handleClickToSMS(contact: ContactModel, phoneNumber: string) {
    const recipient = {
      ...contact,
      phoneNumber,
    };
    this._deps.routerInteraction.push(
      this._deps.contactDetailsUIOptions?.composeTextRoute ??
        DEFAULT_COMPOSE_TEXT_ROUTE,
    );
    this._deps.composeText.addToNumber(recipient);
    if (this._deps.composeText.typingToNumber === recipient.phoneNumber) {
      this._deps.composeText.cleanTypingToNumber();
    }
    this._trackClickToSMS();
  }

  @track(trackEvents.clickToCall)
  private _trackClickToCall() {}

  @track(trackEvents.clickToSMS)
  private _trackClickToSMS() {}

  getUIProps(): ContactDetailsViewProps {
    return {
      currentLocale: this._deps.locale.currentLocale,
      contact: this.currentContact,
      isMultipleSiteEnabled:
        this._deps.extensionInfo.isMultipleSiteEnabled ?? false,
      isCallButtonDisabled: !!(
        this._deps.connectivityManager?.isOfflineMode ||
        this._deps.connectivityManager?.isWebphoneUnavailableMode ||
        this._deps.connectivityManager?.isWebphoneInitializing ||
        this._deps.rateLimiter?.throttling
      ),
      disableLinks: !!(
        this._deps.connectivityManager?.isOfflineMode ||
        this._deps.connectivityManager?.isVoipOnlyMode ||
        this._deps.rateLimiter?.throttling
      ),
      showSpinner: !(
        this.currentContactReadyState === contactReadyStates.loaded &&
        this._deps.locale.ready &&
        this._deps.contactSearch.ready &&
        this._deps.appFeatures.ready
      ),
    };
  }

  getUIFunctions({ params }: GetUIFunctions): ContactDetailsViewFunctionProps {
    return {
      // @ts-expect-error TS(2322): Type '(phoneNumber: string) => string | null | und... Remove this comment to see the full error message
      formatNumber: (phoneNumber: string) =>
        formatContactPhoneNumber({
          phoneNumber,
          countryCode: this._deps.regionSettings.countryCode,
          isMultipleSiteEnabled: this._deps.extensionInfo.isMultipleSiteEnabled,
          siteCode: this._deps.extensionInfo.site?.code,
          maxExtensionNumberLength:
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            this._deps.accountInfo.maxExtensionNumberLength,
        }),
      onVisitPage: () => {
        this.initCurrentContact(params);
      },
      getPresence: async (contact: IContact, useCache: boolean) => {
        const result = await this.getPresence(contact, useCache);
        return result;
      },
      onLeavingPage: () => {
        this.resetCurrentContact();
      },
      canTextButtonShow: (phoneType: string) => {
        const outboundSmsPermission =
          this._deps.appFeatures.hasOutboundSMSPermission;
        const internalSmsPermission =
          this._deps.appFeatures.hasInternalSMSPermission;
        // guess this statement is to avoid exception
        const isClickToTextEnabled = !!this._deps.composeText;
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
          this._deps.dialerUI && this._deps.appFeatures.isCallingEnabled
        );
        return isClickToDialEnabled && phoneType !== phoneTypes.fax;
      },
      onBackClick: () => {
        this._deps.routerInteraction.goBack();
      },
      onClickToDial: (contact: ContactModel, phoneNumber: string) =>
        this.handleClickToDial(
          contact,
          phoneNumber,
          window?.runner?._standAlone,
        ),
      onClickToSMS: (contact: ContactModel, phoneNumber: string) =>
        this.handleClickToSMS(contact, phoneNumber),
    };
  }
}
