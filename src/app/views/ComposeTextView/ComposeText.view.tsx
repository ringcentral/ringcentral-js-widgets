import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import {
  AccountInfo,
  AppFeatures,
  Auth,
  ConnectivityMonitor,
  RateLimiter,
  RegionSettings,
  track,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { ContactSearch } from '@ringcentral-integration/micro-contacts/src/app/services';
import type { ContactSearchView } from '@ringcentral-integration/micro-contacts/src/app/views';
import {
  Brand,
  Locale,
} from '@ringcentral-integration/micro-core/src/app/services';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  dynamic,
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  useConnector,
} from '@ringcentral-integration/next-core';
import JunoComposeTextPanel from '@ringcentral-integration/widgets/components/ComposeTextPanel';
import React, { useRef } from 'react';

import {
  ComposeText,
  Conversations,
  MessageSender,
  MessageStore,
} from '../../services';

import type {
  ComposeTextPanelProps,
  ComposeTextViewOptions,
  ComposeTextViewProps,
} from './ComposeText.view.interface';

@injectable({
  name: 'ComposeTextView',
})
export class ComposeTextView extends RcViewModule {
  constructor(
    protected _brand: Brand,
    protected _composeText: ComposeText,
    protected _connectivityMonitor: ConnectivityMonitor,
    protected _contactSearch: ContactSearch,
    protected _conversations: Conversations,
    protected _locale: Locale,
    protected _messageSender: MessageSender,
    protected _messageStore: MessageStore,
    protected _rateLimiter: RateLimiter,
    protected _regionSettings: RegionSettings,
    protected _appFeatures: AppFeatures,
    protected _router: RouterPlugin,
    protected _accountInfo: AccountInfo,
    protected _auth: Auth,
    @optional('ComposeTextViewOptions')
    protected _composeTextViewOptions?: ComposeTextViewOptions,
  ) {
    super();
  }

  @dynamic('ContactSearchView')
  protected readonly _contactSearchView?: ContactSearchView;

  @track((that: ComposeTextView, eventName: string, contactType: string) => {
    return [eventName, { contactType, location: 'SMS compose' }];
  })
  async triggerEventTracking(eventName: string, contactType: string) {
    //
  }

  get showSpinner() {
    return !(
      this._composeText.ready &&
      this._locale.ready &&
      this._messageSender.ready &&
      this._appFeatures.ready &&
      this._contactSearch.ready
    );
  }

  getUIProps({
    inputExpandable = process.env.THEME_SYSTEM === 'spring-ui',
    supportAttachment = process.env.THEME_SYSTEM === 'spring-ui',
    supportEmoji = process.env.THEME_SYSTEM === 'spring-ui',
    useRecipientsInputV2 = false,
  }: ComposeTextViewProps): UIProps<ComposeTextPanelProps> {
    const isContentEmpty =
      this._composeText.messageText.length === 0 &&
      (!this._composeText.attachments ||
        this._composeText.attachments.length === 0);

    return {
      brand: this._brand.name,
      currentLocale: this._locale.currentLocale,
      sendButtonDisabled:
        !(this._composeText.ready && this._messageSender.idle) ||
        isContentEmpty ||
        (this._composeText['_toNumbers'].length === 0 &&
          this._composeText.typingToNumber.length === 0) ||
        !this._connectivityMonitor.connectivity ||
        this._rateLimiter.restricted,
      senderNumbers: this._messageSender.senderNumbersList,
      senderNumber: this._composeText.senderNumber,
      typingToNumber: this._composeText.typingToNumber,
      toNumbers: this._composeText['_toNumbers'],
      messageText: this._composeText.messageText,
      outboundSMS: this._appFeatures.hasOutboundSMSPermission,
      searchContactList: this._contactSearch.sortedResult,
      showSpinner: this.showSpinner,
      inputExpandable,
      attachments: this._composeText.attachments,
      supportAttachment:
        supportAttachment && this._appFeatures.hasSendMMSPermission,
      supportEmoji,
      useRecipientsInputV2,
      allowedCreateGroupText:
        this._appFeatures.hasSendMMSPermission &&
        this._composeText['_toNumbers'].length > 1,
      createGroupChecked: this._composeText.createGroupChecked,
      maxRecipients: this._composeText.maxRecipients,
      acceptFileTypes: this._conversations.acceptFileTypes,
    };
  }

  getUIFunctions({
    formatContactPhone = (phoneNumber) =>
      formatNumber({
        phoneNumber,
        areaCode: this._regionSettings.areaCode,
        countryCode: this._regionSettings.countryCode,
        maxExtensionLength: this._accountInfo.maxExtensionNumberLength,
      })!,
    phoneTypeRenderer,
    phoneSourceNameRenderer,
    recipientsContactInfoRenderer,
    recipientsContactPhoneRenderer,
  }: ComposeTextViewProps): UIFunctions<ComposeTextPanelProps> {
    return {
      triggerEventTracking: (eventName: string, contactType: string) =>
        this.triggerEventTracking(eventName, contactType),
      send: async (text, attachments) => {
        try {
          // TODO: fix type
          // @ts-ignore
          const responses: any = await this._composeText.send(
            text,
            attachments,
          );
          if (!responses || responses.length === 0) {
            return;
          }
          this._messageStore.pushMessages(responses);
          if (responses.length === 1) {
            const conversationId =
              responses[0] &&
              responses[0].conversation &&
              responses[0].conversation.id;
            if (!conversationId) {
              return;
            }
            this._router.push(`/conversations/${conversationId}`);
          } else {
            this._router.push('/messages');
          }
          this._conversations.relateCorrespondentEntity(responses);
          this._composeText.clean();
          return;
        } catch (err) {
          console.log(err);
        }
      },
      formatPhone: formatContactPhone,
      formatContactPhone,
      detectPhoneNumbers: async (input) => {
        const promises = input.split(/,\s*/g).map(async (item: string) => {
          const isValid = await this._composeText.validatePhoneNumber(item);
          return isValid ? item : undefined;
        });
        const results = await Promise.all(promises);
        const detectedNumbers = results.filter((item) => !!item);
        detectedNumbers.forEach((phoneNumber) => {
          this._composeText.addToNumber({
            phoneNumber,
          });
        });
        return detectedNumbers.length > 0;
      },
      searchContact: (searchString) =>
        this._contactSearch.debouncedSearch({ searchString }),
      updateSenderNumber: ({ phoneNumber }) =>
        this._composeText.updateSenderNumber(phoneNumber),
      updateTypingToNumber: (toNumber: string) => {
        this._composeText.updateTypingToNumber(toNumber);
      },
      cleanTypingToNumber: (...args) =>
        // TODO: fix type
        // @ts-ignore
        this._composeText.cleanTypingToNumber(...args),
      // TODO: fix type
      // @ts-ignore
      addToNumber: (...args) => this._composeText.addToNumber(...args),
      // TODO: fix type
      // @ts-ignore
      removeToNumber: (...args) => this._composeText.removeToNumber(...args),
      updateMessageText: (...args) =>
        // TODO: fix type
        // @ts-ignore
        this._composeText.updateMessageText(...args),
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      recipientsContactInfoRenderer,
      recipientsContactPhoneRenderer,
      // TODO: fix type
      // @ts-ignore
      addAttachments: (...args) => this._composeText.addAttachments(...args),
      removeAttachment: (...args) =>
        // TODO: fix type
        // @ts-ignore
        this._composeText.removeAttachment(...args),
      onCreateGroupTextOptionChanged: (checked) => {
        this._composeText.setCreateGroupChecked(checked);
      },
      onBackClick: () => {
        this._router.push('/messages');
      },
    };
  }

  component(props: ComposeTextViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    // TODO: fix type
    const _props: any = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    const Component =
      this._composeTextViewOptions?.component || JunoComposeTextPanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
