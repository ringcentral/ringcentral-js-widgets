import {
  track,
  state,
  action,
  RcUIModuleV2,
} from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';
import background from 'ringcentral-integration/lib/background';
import proxify from 'ringcentral-integration/lib/proxy/proxify';
import {
  isE164,
  parseIncompletePhoneNumber,
} from '@ringcentral-integration/phone-number';
import { phoneTypes } from 'ringcentral-integration/enums/phoneTypes';
import { formatNumber } from 'ringcentral-integration/lib/formatNumber';
import { ContactModel } from 'ringcentral-integration/interfaces/Contact.model';
import {
  ContactDetailsViewProps,
  ContactDetailsViewFunctionProps,
} from '../../components/ContactDetailsView/ContactDetailsView.interface';
import {
  Deps,
  RouteParams,
  InitParams,
  GetUIFunctions,
} from './ContactDetailsUI.interface';
import { trackEvents } from './trackEvents';
import { contactReadyStates, ContactReadyState } from './contactReadyStates';

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
    'RolesAndPermissions',
    'RateLimiter',
    'RegionSettings',
    'ConnectivityManager',
    'Call',
    'DialerUI',
    'ComposeText',
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
    this._setCurrentContact(contactReadyStates.pending, null);
  }

  @background
  async initCurrentContact({ contactType, contactId }: InitParams) {
    if (this.currentContactReadyState !== contactReadyStates.pending) {
      return;
    }
    this._setCurrentContact(contactReadyStates.loading, null);
    const contact = await this._deps.contacts.findContact({
      sourceName: contactType,
      contactId,
    });
    // ignore result when it is reset during loading
    if (this.currentContactReadyState !== contactReadyStates.loading) {
      return;
    }
    this._setCurrentContact(contactReadyStates.loaded, contact as ContactModel);
    if (contact) {
      this._deps.contacts.getProfileImage(contact, false);
      this._deps.contacts.getPresence(contact, false);
    }
  }

  @proxify
  async showContactDetails({ id, type, direct = false }: RouteParams) {
    this._deps.routerInteraction.push(
      `/contacts/${type}/${id}${direct ? '?direct=true' : ''}`,
    );
  }

  @proxify
  async handleClickToDial(contact: ContactModel, phoneNumber: string) {
    const recipient = {
      ...contact,
      phoneNumber,
    };
    if (this._deps.call.isIdle) {
      this._deps.routerInteraction.push(
        this._deps.contactDetailsUIOptions?.dialerRoute ?? DEFAULT_DIALER_ROUTE,
      );
      this._deps.dialerUI.call({ recipient });
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
        this._deps.rolesAndPermissions.ready
      ),
    };
  }

  getUIFunctions({ params }: GetUIFunctions): ContactDetailsViewFunctionProps {
    return {
      onVisitPage: () => {
        this.initCurrentContact(params);
      },
      onLeavingPage: () => {
        this.resetCurrentContact();
      },
      formatNumber: (phoneNumber: string = '') => {
        if (!phoneNumber) {
          return phoneNumber;
        }
        // if the cleaned phone number is not a E164 format
        // we will show it directly, doesn't format it.
        const cleanedNumber: string = parseIncompletePhoneNumber(
          phoneNumber.toString(),
        );
        const isE164Number = isE164(cleanedNumber);
        if (isE164Number) {
          const formattedNumber: string = formatNumber({
            phoneNumber,
            countryCode: this._deps.regionSettings.countryCode,
          });
          return formattedNumber;
        }
        // if multi-site is enabled then we will try to remove site code with same site
        if (
          this._deps.extensionInfo.isMultipleSiteEnabled &&
          this._deps.extensionInfo.site?.code
        ) {
          const formattedNumber: string = formatNumber({
            phoneNumber,
            countryCode: this._deps.regionSettings.countryCode,
            siteCode: this._deps.extensionInfo.site?.code,
            isMultipleSiteEnabled: this._deps.extensionInfo
              .isMultipleSiteEnabled,
          });
          return formattedNumber;
        }
        return phoneNumber;
      },
      canTextButtonShow: (phoneType: string) => {
        const outboundSmsPermission = !!(
          this._deps.rolesAndPermissions.permissions.OutboundSMS ?? false
        );
        const internalSmsPermission = !!(
          this._deps.rolesAndPermissions.permissions.InternalSMS ?? false
        );
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
          this._deps.dialerUI &&
          (this._deps.rolesAndPermissions.callingEnabled ?? false)
        );
        return isClickToDialEnabled && phoneType !== phoneTypes.fax;
      },
      onBackClick: () => {
        this._deps.routerInteraction.goBack();
      },
      onClickToDial: (contact: ContactModel, phoneNumber: string) =>
        this.handleClickToDial(contact, phoneNumber),
      onClickToSMS: (contact: ContactModel, phoneNumber: string) =>
        this.handleClickToSMS(contact, phoneNumber),
    };
  }
}
