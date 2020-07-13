import { Module } from 'ringcentral-integration/lib/di';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import {
  isE164,
  parseIncompletePhoneNumber,
} from '@ringcentral-integration/phone-number';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import proxify from 'ringcentral-integration/lib/proxy/proxify';
import { ContactModel } from 'ringcentral-integration/models/Contact.model';
import RcUIModule from '../../lib/RcUIModule';
import {
  ContactDetailsViewProps,
  ContactDetailsViewFunctionProps,
} from '../../components/ContactDetailsView/ContactDetailsView.interface';

const DEFAULT_DIALER_ROUTE = '/dialer';
const DEFAULT_COMPOSETEXT_ROUTE = '/composeText';

@Module({
  name: 'ContactDetailsUI',
  deps: [
    'RouterInteraction',
    'ContactSearch',
    'Contacts',
    'RolesAndPermissions',
    'RateLimiter',
    'RegionSettings',
    'ConnectivityManager',
    'Call',
    'DialerUI',
    'ComposeText',
    'Brand',
    'Locale',
    'CallingSettings',
    {
      dep: 'ContactDetailsUIOptions',
      optional: true,
    },
  ],
})
export class ContactDetailsUI extends RcUIModule {
  // for track
  constructor({
    routerInteraction,
    contactSearch,
    contacts,
    rolesAndPermissions,
    rateLimiter,
    regionSettings,
    connectivityManager,
    call,
    dialerUI,
    composeText,
    brand,
    locale,
    callingSettings,
    composeTextRoute = DEFAULT_COMPOSETEXT_ROUTE,
    dialerRoute = DEFAULT_DIALER_ROUTE,
    ...options
  }) {
    super({
      routerInteraction,
      contactSearch,
      contacts,
      rolesAndPermissions,
      rateLimiter,
      regionSettings,
      connectivityManager,
      call,
      dialerUI,
      composeText,
      brand,
      locale,
      callingSettings,
      ...options,
    });
    this._routerInteraction = routerInteraction;
    this._contactSearch = contactSearch;
    this._contacts = contacts;
    this._rolesAndPermissions = rolesAndPermissions;
    this._rateLimiter = rateLimiter;
    this._regionSettings = regionSettings;
    this._connectivityManager = connectivityManager;
    this._call = call;
    this._dialerUI = dialerUI;
    this._composeText = composeText;
    this._brand = brand;
    this._locale = locale;
    this._callingSettings = callingSettings;
    this._composeTextRoute = composeTextRoute;
    this._dialerRoute = dialerRoute;
  }

  get _actionTypes() {
    return ObjectMap.prefixKeys(
      [
        //
        'clickToSMS',
        'clickToCall',
      ],
      'contactDetails',
    );
  }

  @proxify
  showContactDetails({ id, type, direct = false }) {
    const contact = this._contacts.find({ id, type });
    if (contact) {
      this._routerInteraction.push(
        `/contacts/${type}/${id}${direct ? '?direct=true' : ''}`,
      );
      this._contacts.getProfileImage(contact, false);
      this._contacts.getPresence(contact, false);
    }
  }

  getContact({ id, type }): ContactModel {
    return this._contacts.find({ id, type });
  }

  @proxify
  async handleClickToDial(contact, phoneNumber) {
    const recipient = {
      ...contact,
      phoneNumber,
    };
    if (this._call.isIdle) {
      this._routerInteraction.push(this._dialerRoute);
      this._dialerUI.call({ recipient });
      this.store.dispatch({
        type: this.actionTypes.clickToCall,
      });
    }
  }

  @proxify
  async handleClickToSMS(contact, phoneNumber) {
    const recipient = {
      ...contact,
      phoneNumber,
    };
    if (this._routerInteraction) {
      this._routerInteraction.push(this._composeTextRoute);
    }

    this._composeText.addToNumber(recipient);
    if (this._composeText.typingToNumber === recipient.phoneNumber) {
      this._composeText.cleanTypingToNumber();
    }
    // for tracking
    this.store.dispatch({
      type: this.actionTypes.clickToSMS,
    });
  }

  getUIProps({ params: { contactId, contactType } }): ContactDetailsViewProps {
    return {
      currentLocale: this._locale.currentLocale,
      contact: this.getContact({
        id: contactId,
        type: contactType,
      }),
      isClickToDialEnabled: !!(
        this._dialerUI && this._rolesAndPermissions.callingEnabled
      ),
      isCallButtonDisabled: !!(
        this._connectivityManager.isOfflineMode ||
        this._connectivityManager.isWebphoneUnavailableMode ||
        this._connectivityManager.isWebphoneInitializing ||
        this._rateLimiter.throttling
      ),
      isClickToTextEnabled: !!this._composeText,
      disableLinks: !!(
        this._connectivityManager.isOfflineMode ||
        this._connectivityManager.isVoipOnlyMode ||
        this._rateLimiter.throttling
      ),
      showSpinner: !(
        this._locale.ready &&
        this._contactSearch.ready &&
        this._rolesAndPermissions.ready
      ),
      outboundSmsPermission: !!(
        this._rolesAndPermissions.permissions &&
        this._rolesAndPermissions.permissions.OutboundSMS
      ),
      internalSmsPermission: !!(
        this._rolesAndPermissions.permissions &&
        this._rolesAndPermissions.permissions.InternalSMS
      ),
    };
  }

  getUIFunctions(): ContactDetailsViewFunctionProps {
    return {
      formatNumber: (phoneNumber: string) => {
        // if the cleaned phone number is not a E164 format
        // we will show it directly, doesn't format it.
        const cleanedNumber: string = parseIncompletePhoneNumber(
          phoneNumber.toString(),
        );
        const isE164Number = isE164(cleanedNumber);
        if (isE164Number) {
          const formatedNumber: string = formatNumber({
            phoneNumber,
            countryCode: this._regionSettings.countryCode,
          });
          return formatedNumber;
        }
        return phoneNumber;
      },
      onBackClick: () => {
        this._routerInteraction.goBack();
      },
      onClickToDial: (contact: ContactModel, phoneNumber: string) =>
        this.handleClickToDial(contact, phoneNumber),
      onClickToSMS: (contact: ContactModel, phoneNumber: string) =>
        this.handleClickToSMS(contact, phoneNumber),
    };
  }
}
