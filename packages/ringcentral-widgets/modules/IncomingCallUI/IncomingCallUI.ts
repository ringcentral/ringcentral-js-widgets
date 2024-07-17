import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import type { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import { getWebphoneSessionDisplayName } from '@ringcentral-integration/commons/lib/callLogHelpers';
import { Module } from '@ringcentral-integration/commons/lib/di';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import type { UIFunctions, UIProps } from '@ringcentral-integration/core';
import { computed, RcUIModuleV2 } from '@ringcentral-integration/core';

import { checkShouldHidePhoneNumber } from '../../lib/checkShouldHidePhoneNumber';

import type {
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
    'AppFeatures',
    'AccountInfo',
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

  @computed((that: IncomingCallUI) => [that._deps.webphone.ringingCallOnView])
  get currentSession(): Partial<NormalizedSession> {
    return this._deps.webphone.ringingCallOnView ?? {};
  }

  @computed((that: IncomingCallUI) => [
    that.currentSession.from,
    that._deps.contactMatcher?.dataMapping,
  ])
  get fromMatches() {
    return (
      this._deps.contactMatcher?.dataMapping[this.currentSession.from!] ?? []
    );
  }

  @computed((that: IncomingCallUI) => [
    that.currentSession.to,
    that._deps.contactMatcher?.dataMapping,
  ])
  get toMatches() {
    return (
      this._deps.contactMatcher?.dataMapping[this.currentSession.to!] ?? []
    );
  }

  get nameMatches() {
    const nameMatches =
      this.currentSession.direction === callDirections.outbound
        ? this.toMatches
        : this.fromMatches;

    return nameMatches;
  }

  get phoneNumber() {
    const phoneNumber =
      this.currentSession.direction === callDirections.outbound
        ? this.currentSession.to
        : this.currentSession.from;

    if (
      this._deps.appFeatures.isCDCEnabled &&
      checkShouldHidePhoneNumber(phoneNumber!, this.nameMatches)
    ) {
      return null;
    }

    return phoneNumber;
  }

  get callerIdName() {
    return getWebphoneSessionDisplayName(this.currentSession as any);
  }

  getUIProps({
    showContactDisplayPlaceholder = false,
    showCallerIdName = false,
    showCallQueueName,
    sourceIcons,
  }: IncomingCallContainerProps): UIProps<IncomingCallUIPanelProps> {
    return {
      sourceIcons,
      brand: this._deps.brand.name,
      nameMatches: this.nameMatches,
      currentLocale: this._deps.locale.currentLocale,
      session: this.currentSession,
      activeSessionId: this._deps.webphone.activeSessionId,
      areaCode: this._deps.regionSettings.areaCode,
      countryCode: this._deps.regionSettings.countryCode,
      forwardingNumbers: this._deps.forwardingNumber.forwardingNumbers,
      showContactDisplayPlaceholder,
      searchContactList: this._deps.contactSearch.sortedResult,
      showCallQueueName,
      phoneNumber: this.phoneNumber,
      callerIdName: showCallerIdName ? this.callerIdName : undefined,
    };
  }

  getUIFunctions({
    phoneTypeRenderer,
    phoneSourceNameRenderer,
    getAvatarUrl = () => null,
  }: IncomingCallContainerProps): UIFunctions<IncomingCallUIPanelProps> {
    return {
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      formatPhone: (phoneNumber) =>
        // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
        formatNumber({
          phoneNumber,
          areaCode: this._deps.regionSettings.areaCode,
          countryCode: this._deps.regionSettings.countryCode,
          siteCode: this._deps.extensionInfo?.site?.code ?? '',
          isMultipleSiteEnabled:
            this._deps.extensionInfo?.isMultipleSiteEnabled ?? false,
          maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
        }),
      answer: (sessionId) => {
        this._deps.conferenceCall?.closeMergingPair();
        this._deps.webphone.answer(sessionId);
      },
      reject: (sessionId) => this._deps.webphone.reject(sessionId),
      toVoiceMail: (sessionId) => this._deps.webphone.toVoiceMail(sessionId),
      onForward: (sessionId, forwardNumber) =>
        this._deps.webphone.forward(sessionId, forwardNumber),
      replyWithMessage: (sessionId, message) =>
        this._deps.webphone.replyWithMessage(sessionId, message),
      toggleMinimized: (sessionId) =>
        this._deps.webphone.toggleMinimized(sessionId),
      updateSessionMatchedContact: (sessionId, contact) =>
        this._deps.webphone.updateSessionMatchedContact(sessionId, contact),
      getAvatarUrl,
      hangup: (sessionId) => this._deps.webphone.hangup(sessionId),
      onHold: (sessionId) => this._deps.webphone.hold(sessionId),
      searchContact: (pattern) =>
        this._deps.contactSearch.debouncedSearch({ searchString: pattern }),
    };
  }
}

export { IncomingCallUI };
