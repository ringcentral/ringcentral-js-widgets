import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import type { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import { getWebphoneSessionDisplayName } from '@ringcentral-integration/commons/lib/callLogHelpers';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import {
  AccountInfo,
  AppFeatures,
  ExtensionInfo,
  RegionSettings,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  ContactMatcher,
  ContactSearch,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  Brand,
  Locale,
} from '@ringcentral-integration/micro-core/src/app/services';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  computed,
  injectable,
  optional,
  RcViewModule,
  useConnector,
} from '@ringcentral-integration/next-core';
import { IncomingCallView as IncomingCallPanel } from '@ringcentral-integration/widgets/components/IncomingCallView';
import { checkShouldHidePhoneNumber } from '@ringcentral-integration/widgets/lib/checkShouldHidePhoneNumber';
import React, { useRef } from 'react';

import { ForwardingNumber, Webphone } from '../../services';

import type {
  IncomingCallViewOptions,
  IncomingCallViewPanelProps,
  IncomingCallViewProps,
} from './IncomingCall.view.interface';

@injectable({
  name: 'IncomingCallView',
})
class IncomingCallView extends RcViewModule {
  constructor(
    protected _webphone: Webphone,
    protected _locale: Locale,
    protected _contactSearch: ContactSearch,
    protected _regionSettings: RegionSettings,
    protected _forwardingNumber: ForwardingNumber,
    protected _brand: Brand,
    protected _extensionInfo: ExtensionInfo,
    protected _appFeatures: AppFeatures,
    protected _accountInfo: AccountInfo,
    @optional() protected _contactMatcher?: ContactMatcher,
    @optional('IncomingCallViewOptions')
    protected _incomingCallViewOptions?: IncomingCallViewOptions,
  ) {
    super();
  }

  @computed((that: IncomingCallView) => [that._webphone.ringingCallOnView])
  get currentSession(): Partial<NormalizedSession> {
    return this._webphone.ringingCallOnView ?? {};
  }

  @computed((that: IncomingCallView) => [
    that.currentSession.from,
    that._contactMatcher?.dataMapping,
  ])
  get fromMatches() {
    return this._contactMatcher?.dataMapping[this.currentSession.from!] ?? [];
  }

  @computed((that: IncomingCallView) => [
    that.currentSession.to,
    that._contactMatcher?.dataMapping,
  ])
  get toMatches() {
    return this._contactMatcher?.dataMapping[this.currentSession.to!] ?? [];
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
      this._appFeatures.isCDCEnabled &&
      checkShouldHidePhoneNumber(phoneNumber!, this.nameMatches)
    ) {
      return null;
    }

    return phoneNumber;
  }

  get name() {
    return getWebphoneSessionDisplayName(this.currentSession as any);
  }

  getUIProps({
    showContactDisplayPlaceholder = false,
    showCallQueueName,
    sourceIcons,
  }: IncomingCallViewProps): UIProps<IncomingCallViewPanelProps> {
    return {
      sourceIcons,
      brand: this._brand.name,
      nameMatches: this.nameMatches,
      currentLocale: this._locale.currentLocale,
      session: this.currentSession,
      activeSessionId: this._webphone.activeSessionId,
      areaCode: this._regionSettings.areaCode,
      countryCode: this._regionSettings.countryCode,
      forwardingNumbers: this._forwardingNumber.forwardingNumbers,
      showContactDisplayPlaceholder,
      searchContactList: this._contactSearch.sortedResult,
      showCallQueueName,
      phoneNumber: this.phoneNumber,
      name: this.name,
    };
  }

  getUIFunctions({
    phoneTypeRenderer,
    phoneSourceNameRenderer,
    getAvatarUrl = () => null,
  }: IncomingCallViewProps): UIFunctions<IncomingCallViewPanelProps> {
    return {
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      formatPhone: (phoneNumber) =>
        formatNumber({
          phoneNumber,
          areaCode: this._regionSettings.areaCode,
          countryCode: this._regionSettings.countryCode,
          siteCode: this._extensionInfo?.site?.code ?? '',
          isMultipleSiteEnabled:
            this._extensionInfo?.isMultipleSiteEnabled ?? false,
          maxExtensionLength: this._accountInfo.maxExtensionNumberLength,
        })!,
      answer: (sessionId) => {
        this._webphone.answer(sessionId);
      },
      reject: (sessionId) => this._webphone.reject(sessionId),
      toVoiceMail: (sessionId) => this._webphone.toVoiceMail(sessionId),
      onForward: (sessionId, forwardNumber) =>
        this._webphone.forward(sessionId, forwardNumber),
      replyWithMessage: (sessionId, message) =>
        this._webphone.replyWithMessage(sessionId, message),
      toggleMinimized: (sessionId) => this._webphone.toggleMinimized(sessionId),
      updateSessionMatchedContact: (sessionId, contact) =>
        this._webphone.updateSessionMatchedContact(sessionId, contact),
      getAvatarUrl,
      hangup: (sessionId) => this._webphone.hangup(sessionId),
      onHold: (sessionId) => this._webphone.hold(sessionId),
      searchContact: (pattern) =>
        this._contactSearch.debouncedSearch({ searchString: pattern }),
    };
  }

  component(props: IncomingCallViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    const Component =
      this._incomingCallViewOptions?.component || IncomingCallPanel;

    // TODO: fix type
    return <Component {...(_props as any)} {...uiFunctions} />;
  }
}

export { IncomingCallView };
