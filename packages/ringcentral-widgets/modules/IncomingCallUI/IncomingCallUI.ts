import {
  RcUIModuleV2,
  UIProps,
  UIFunctions,
} from '@ringcentral-integration/core';
import { Module } from '@ringcentral-integration/commons/lib/di';
import formatNumber from '@ringcentral-integration/commons/lib/formatNumber';
import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import {
  Deps,
  IncomingCallContainerProps,
  IncomingCallUIPanelProps,
} from './IncomingCallUI.interface';

@Module({
  name: 'IncomingCallUI',
  deps: [
    'Webphone',
    'Locale',
    'ContactSearch',
    'RegionSettings',
    'ForwardingNumber',
    'Brand',
    'ExtensionInfo',
    { dep: 'ConferenceCall', optional: true },
    { dep: 'ContactMatcher', optional: true },
    { dep: 'IncomingCallUIOptions', optional: true },
  ],
})
class IncomingCallUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  getUIProps({
    showContactDisplayPlaceholder = false,
    showCallQueueName,
    sourceIcons,
  }: IncomingCallContainerProps): UIProps<IncomingCallUIPanelProps> {
    const {
      webphone,
      locale,
      contactMatcher,
      contactSearch,
      regionSettings,
      forwardingNumber,
      brand,
    } = this._deps;
    const currentSession: Partial<NormalizedSession> =
      webphone.ringingCallOnView || {};
    const contactMapping = contactMatcher && contactMatcher.dataMapping;
    const fromMatches =
      (contactMapping && contactMapping[currentSession.from]) || [];
    const toMatches =
      (contactMapping && contactMapping[currentSession.to]) || [];
    const nameMatches =
      currentSession.direction === callDirections.outbound
        ? toMatches
        : fromMatches;
    return {
      sourceIcons,
      brand: brand.fullName,
      nameMatches,
      currentLocale: locale.currentLocale,
      session: currentSession,
      activeSessionId: webphone.activeSessionId,
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode,
      forwardingNumbers: forwardingNumber.forwardingNumbers,
      showContactDisplayPlaceholder,
      searchContactList: contactSearch.sortedResult,
      showCallQueueName,
    };
  }

  getUIFunctions({
    phoneTypeRenderer,
    phoneSourceNameRenderer,
    getAvatarUrl = () => null,
  }: IncomingCallContainerProps): UIFunctions<IncomingCallUIPanelProps> {
    const {
      webphone,
      regionSettings,
      contactSearch,
      extensionInfo,
      conferenceCall,
    } = this._deps;
    return {
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      formatPhone: (phoneNumber) =>
        formatNumber({
          phoneNumber,
          areaCode: regionSettings.areaCode,
          countryCode: regionSettings.countryCode,
          siteCode: extensionInfo?.site?.code ?? '',
          isMultipleSiteEnabled: extensionInfo?.isMultipleSiteEnabled ?? false,
        }),
      answer(sessionId) {
        conferenceCall?.closeMergingPair();
        webphone.answer(sessionId);
      },
      reject: (sessionId) => webphone.reject(sessionId),
      toVoiceMail: (sessionId) => webphone.toVoiceMail(sessionId),
      onForward: (sessionId, forwardNumber) =>
        webphone.forward(sessionId, forwardNumber),
      replyWithMessage: (sessionId, message) =>
        webphone.replyWithMessage(sessionId, message),
      toggleMinimized: (sessionId) => webphone.toggleMinimized(sessionId),
      updateSessionMatchedContact: (sessionId, contact) =>
        webphone.updateSessionMatchedContact(sessionId, contact),
      getAvatarUrl,
      hangup: (sessionId) => webphone.hangup(sessionId),
      onHold: (sessionId) => webphone.hold(sessionId),
      searchContact: (pattern) =>
        contactSearch.debouncedSearch({ searchString: pattern }),
    };
  }
}

export { IncomingCallUI };
