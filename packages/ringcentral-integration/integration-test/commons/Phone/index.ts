import { SDK } from '@ringcentral/sdk';

import { ModuleFactory } from '../../../lib/di';
import { normalizeNumber } from '../../../lib/normalizeNumber';
import RcModule from '../../../lib/RcModule';
import { RingCentralClient } from '../../../lib/RingCentralClient';
import AccountContacts from '../../../modules/AccountContacts';
import AccountInfo from '../../../modules/AccountInfo';
import ActiveCallControl from '../../../modules/ActiveCallControl';
import AddressBook from '../../../modules/AddressBook';
import { Alert } from '../../../modules/Alert';
import { AppFeatures } from '../../../modules/AppFeatures';
import AudioSettings from '../../../modules/AudioSettings';
import Auth from '../../../modules/Auth';
import AvailabilityMonitor from '../../../modules/AvailabilityMonitor';
import BlockedNumber from '../../../modules/BlockedNumber';
import { Brand } from '../../../modules/Brand';
import Call from '../../../modules/Call';
import CallHistory from '../../../modules/CallHistory';
import CallingSettings from '../../../modules/CallingSettings';
import CallLog from '../../../modules/CallLog';
import CallMonitor from '../../../modules/CallMonitor';
import CompanyContacts from '../../../modules/CompanyContacts';
import ComposeText from '../../../modules/ComposeText';
import ConferenceCall from '../../../modules/ConferenceCall';
import ConnectivityMonitor from '../../../modules/ConnectivityMonitor';
import ContactMatcher from '../../../modules/ContactMatcher';
import Contacts from '../../../modules/Contacts';
import ContactSearch from '../../../modules/ContactSearch';
import Conversations from '../../../modules/Conversations';
import DateTimeFormat from '../../../modules/DateTimeFormat';
import DialingPlan from '../../../modules/DialingPlan';
import Environment from '../../../modules/Environment';
import ExtensionDevice from '../../../modules/ExtensionDevice';
import { ExtensionFeatures } from '../../../modules/ExtensionFeatures';
import ExtensionInfo from '../../../modules/ExtensionInfo';
import ExtensionPhoneNumber from '../../../modules/ExtensionPhoneNumber';
import ForwardingNumber from '../../../modules/ForwardingNumber';
import GlobalStorage from '../../../modules/GlobalStorage';
import { Locale } from '../../../modules/Locale';
import LocaleSettings from '../../../modules/LocaleSettings';
import Meeting from '../../../modules/Meeting';
import MessageSender from '../../../modules/MessageSender';
import MessageStore from '../../../modules/MessageStore';
import { NumberValidate } from '../../../modules/NumberValidate';
import Presence from '../../../modules/Presence';
import QuickAccess from '../../../modules/QuickAccess';
import RateLimiter from '../../../modules/RateLimiter';
import RecentCalls from '../../../modules/RecentCalls';
import RecentMessages from '../../../modules/RecentMessages';
import { RegionSettings } from '../../../modules/RegionSettings';
import Ringout from '../../../modules/Ringout';
import { Softphone } from '../../../modules/Softphone';
import Storage from '../../../modules/Storage';
import Subscription from '../../../modules/Subscription';
import { TabManager } from '../../../modules/TabManager';
import UserGuide from '../../../modules/UserGuide';
import Webphone from '../../../modules/Webphone';

@ModuleFactory({
  providers: [
    {
      provide: 'Client',
      useFactory: ({ sdkConfig }) => new RingCentralClient(new SDK(sdkConfig)),
      deps: [{ dep: 'SdkConfig', useParam: true }],
    },
    { provide: 'Alert', useClass: Alert },
    { provide: 'Brand', useClass: Brand },
    { provide: 'Softphone', useClass: Softphone },
    { provide: 'Locale', useClass: Locale },
    { provide: 'DateTimeFormat', useClass: DateTimeFormat },
    { provide: 'TabManager', useClass: TabManager },
    { provide: 'GlobalStorage', useClass: GlobalStorage },
    { provide: 'LocaleSettings', useClass: LocaleSettings },
    { provide: 'Environment', useClass: Environment },
    { provide: 'Auth', useClass: Auth },
    { provide: 'Ringout', useClass: Ringout },
    { provide: 'ConnectivityMonitor', useClass: ConnectivityMonitor },
    { provide: 'RateLimiter', useClass: RateLimiter },
    { provide: 'Storage', useClass: Storage },
    { provide: 'AudioSettings', useClass: AudioSettings },
    { provide: 'CompanyContacts', useClass: CompanyContacts },
    { provide: 'AccountInfo', useClass: AccountInfo },
    { provide: 'ExtensionDevice', useClass: ExtensionDevice },
    { provide: 'ExtensionInfo', useClass: ExtensionInfo },
    { provide: 'ExtensionFeatures', useClass: ExtensionFeatures },
    { provide: 'AppFeatures', useClass: AppFeatures },
    { provide: 'DialingPlan', useClass: DialingPlan },
    { provide: 'ExtensionPhoneNumber', useClass: ExtensionPhoneNumber },
    { provide: 'ForwardingNumber', useClass: ForwardingNumber },
    { provide: 'RegionSettings', useClass: RegionSettings },
    { provide: 'NumberValidate', useClass: NumberValidate },
    { provide: 'CallingSettings', useClass: CallingSettings },
    { provide: 'Call', useClass: Call },
    { provide: 'Subscription', useClass: Subscription },
    { provide: 'Presence', useClass: Presence },
    { provide: 'MessageSender', useClass: MessageSender },
    { provide: 'ComposeText', useClass: ComposeText },
    { provide: 'MessageStore', useClass: MessageStore },
    { provide: 'Conversations', useClass: Conversations },
    { provide: 'Conference', useClass: Conference },
    { provide: 'CallLog', useClass: CallLog },
    { provide: 'CallHistory', useClass: CallHistory },
    { provide: 'AccountContacts', useClass: AccountContacts },
    { provide: 'AddressBook', useClass: AddressBook },
    { provide: 'Contacts', useClass: Contacts },
    { provide: 'QuickAccess', useClass: QuickAccess },
    {
      provide: 'ContactSources',
      deps: ['AddressBook', 'AccountContacts'],
      useFactory: ({ addressBook, accountContacts }) => [
        addressBook,
        accountContacts,
      ],
    },
    { provide: 'ContactMatcher', useClass: ContactMatcher },
    { provide: 'RecentMessages', useClass: RecentMessages },
    { provide: 'RecentCalls', useClass: RecentCalls },
    { provide: 'Meeting', useClass: Meeting },
    { provide: 'Webphone', useClass: Webphone },
    { provide: 'ContactSearch', useClass: ContactSearch },
    { provide: 'CallMonitor', useClass: CallMonitor },
    { provide: 'UserGuide', useClass: UserGuide },
    { provide: 'ActiveCallControl', useClass: ActiveCallControl },
    {
      provide: 'StorageOptions',
      useValue: {
        // StorageProvider: LocalForageStorage, // IndexedDB
        disableAllowInactiveTabsWrite: true,
      },
      spread: true,
    },
    {
      provide: 'MessageStoreOptions',
      useValue: {
        daySpan: 90,
        conversationsLoadLength: 10,
        conversationLoadLength: 15,
      },
      spread: true,
    },
    {
      provide: 'ConversationsOptions',
      useValue: {
        enableLoadOldMessages: true,
        showMMSAttachment: true,
      },
      spread: true,
    },
    { provide: 'ConferenceCall', useClass: ConferenceCall },
    { provide: 'AvailabilityMonitor', useClass: AvailabilityMonitor },
    {
      provide: 'AvailabilityMonitorOptions',
      useValue: {
        enabled: true,
      },
      spread: true,
    },
    { provide: 'BlockedNumber', useClass: BlockedNumber },
  ],
})
export default class BasePhone extends RcModule {
  _normalizeNumber(phoneNumber) {
    return normalizeNumber({
      phoneNumber,
      countryCode: this.regionSettings.countryCode,
      areaCode: this.regionSettings.areaCode,
    });
  }

  get _actionTypes() {
    /* no action types */
    return null;
  }
}

export function createPhone({
  prefix = 'rc',
  version = '0.1.0',
  apiConfig,
  brandConfig,
}) {
  @ModuleFactory({
    providers: [
      {
        provide: 'Prefix',
        useValue: prefix,
      },
      {
        provide: 'SdkConfig',
        useValue: {
          ...apiConfig,
          cachePrefix: 'sdk-rc',
          clearCacheOnRefreshError: false,
        },
      },
      {
        provide: 'BrandConfig',
        useValue: brandConfig,
      },
      {
        provide: 'WebphoneOptions',
        spread: true,
        useValue: {
          // appKey: apiConfig.appKey,
          appKey:
            'eac8797af1b3502F2CEAAEECAC3Ed378AA7858A386656f28A008b0c638A754B1',
          appName: brandConfig.appName,
          appVersion: version,
        },
      },
      {
        provide: 'Version',
        useFactory: () => version,
      },
    ],
  })
  class Phone extends BasePhone {}
  return Phone.create();
}
