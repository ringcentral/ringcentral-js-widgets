import Module from '@ringcentral-integration/commons/lib/di/decorators/module';
import formatNumber from '@ringcentral-integration/commons/lib/formatNumber';
import RcUIModule from '../../lib/RcUIModule';

@Module({
  name: 'TransferUI',
  deps: [
    'Locale',
    'RegionSettings',
    'RouterInteraction',
    { dep: 'ContactSearch', optional: true },
    { dep: 'Webphone', optional: true },
    { dep: 'ActiveCallControl', optional: true },
  ],
})
export default class TransferUI extends RcUIModule {
  constructor({
    locale,
    activeCallControl,
    webphone,
    contactSearch,
    regionSettings,
    routerInteraction,
    ...options
  }) {
    super({
      ...options,
    });
    this._locale = locale;
    this._activeCallControl = activeCallControl;
    this._webphone = webphone;
    this._contactSearch = contactSearch;
    this._regionSettings = regionSettings;
    this._routerInteraction = routerInteraction;
  }

  getUIProps({
    params: { sessionId, type = 'active' },
    enableWarmTransfer = false,
  }) {
    let session = null;
    if (type === 'active' && this._activeCallControl) {
      session = this._activeCallControl.activeSession;
    } else if (type === 'webphone' && this._webphone) {
      session = this._webphone.sessions.find(
        (session) => session.id === sessionId,
      );
    }

    return {
      sessionId,
      currentLocale: this._locale.currentLocale,
      searchContactList:
        this._contactSearch && this._contactSearch.sortedResult,
      session,
      controlBusy:
        (this._activeCallControl && this._activeCallControl.busy) || false,
      enableWarmTransfer:
        enableWarmTransfer && type === 'webphone' && !!this._webphone,
    };
  }

  getUIFunctions({
    params: { type = 'active' },
    phoneSourceNameRenderer,
    recipientsContactInfoRenderer,
    recipientsContactPhoneRenderer,
    phoneTypeRenderer,
  }) {
    return {
      setActiveSessionId: (sessionId: string) => {
        if (type === 'active' && this._activeCallControl) {
          this._activeCallControl.setActiveSessionId(sessionId);
        }
      },
      onTransfer: (transferNumber: string, sessionId: string) => {
        if (type === 'active' && this._activeCallControl) {
          this._activeCallControl.transfer(transferNumber, sessionId);
        } else if (type === 'webphone' && this._webphone) {
          this._webphone.transfer(transferNumber, sessionId);
        }
      },
      onWarmTransfer: (transferNumber: string, sessionId: string) => {
        if (this._webphone) {
          this._webphone.startWarmTransfer(transferNumber, sessionId);
        }
      },
      onBack: () => {
        this._routerInteraction.goBack();
      },
      onCallEnd: () => {
        if (type === 'active') {
          this._routerInteraction.replace('/calls');
        } else {
          this._routerInteraction.replace('/dialer');
        }
      },
      formatPhone: (phoneNumber) =>
        formatNumber({
          phoneNumber,
          areaCode: this._regionSettings.areaCode,
          countryCode: this._regionSettings.countryCode,
        }),
      searchContact: (searchString) => {
        if (this._contactSearch) {
          this._contactSearch.debouncedSearch({ searchString });
        }
      },
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      recipientsContactInfoRenderer,
      recipientsContactPhoneRenderer,
    };
  }
}
