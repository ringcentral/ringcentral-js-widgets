import Module from '@ringcentral-integration/commons/lib/di/decorators/module';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import type { UIFunctions, UIProps } from '@ringcentral-integration/core';
import { RcUIModuleV2 } from '@ringcentral-integration/core';

import type { ComposeTextPanelProps } from '../../components/ComposeTextPanel';
import type {
  ComposeTextUIComponentProps,
  Deps,
} from './ComposeTextUI.interface';

/**
 * TODO: check type correctness after migrating to @rx-ex for client
 */

@Module({
  name: 'ComposeTextUI',
  deps: [
    'Brand',
    'ComposeText',
    'ConnectivityMonitor',
    'ContactSearch',
    'Conversations',
    'Locale',
    'MessageSender',
    'MessageStore',
    'RateLimiter',
    'RegionSettings',
    'AppFeatures',
    'RouterInteraction',
    'AccountInfo',
  ],
})
export class ComposeTextUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  getUIProps({
    inputExpandable,
    supportAttachment,
    useRecipientsInputV2 = false,
  }: ComposeTextUIComponentProps): UIProps<ComposeTextPanelProps> {
    const isContentEmpty =
      this._deps.composeText.messageText.length === 0 &&
      (!this._deps.composeText.attachments ||
        this._deps.composeText.attachments.length === 0);
    return {
      brand: this._deps.brand.name,
      currentLocale: this._deps.locale.currentLocale,
      sendButtonDisabled:
        !(this._deps.composeText.ready && this._deps.messageSender.idle) ||
        isContentEmpty ||
        (this._deps.composeText.toNumbers.length === 0 &&
          this._deps.composeText.typingToNumber.length === 0) ||
        !this._deps.connectivityMonitor.connectivity ||
        this._deps.rateLimiter.throttling,
      senderNumbers: this._deps.messageSender.senderNumbersList,
      senderNumber: this._deps.composeText.senderNumber,
      typingToNumber: this._deps.composeText.typingToNumber,
      toNumbers: this._deps.composeText.toNumbers,
      messageText: this._deps.composeText.messageText,
      outboundSMS: this._deps.appFeatures.hasOutboundSMSPermission,
      // @ts-expect-error TS(2322): Type '{ id: string; name: string; phoneNumber: str... Remove this comment to see the full error message
      searchContactList: this._deps.contactSearch.sortedResult,
      showSpinner: !(
        this._deps.composeText.ready &&
        this._deps.locale.ready &&
        this._deps.messageSender.ready &&
        this._deps.appFeatures.ready &&
        this._deps.contactSearch.ready
      ),
      inputExpandable,
      attachments: this._deps.composeText.attachments,
      supportAttachment,
      useRecipientsInputV2,
    };
  }

  getUIFunctions({
    formatContactPhone = (phoneNumber) =>
      // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
      formatNumber({
        phoneNumber,
        areaCode: this._deps.regionSettings.areaCode,
        countryCode: this._deps.regionSettings.countryCode,
        maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
      }),
    phoneTypeRenderer,
    phoneSourceNameRenderer,
    recipientsContactInfoRenderer,
    recipientsContactPhoneRenderer,
  }: ComposeTextUIComponentProps): UIFunctions<ComposeTextPanelProps> {
    return {
      send: async (text, attachments) => {
        try {
          const responses = await this._deps.composeText.send(
            text,
            attachments,
          );
          if (!responses || responses.length === 0) {
            return;
          }
          // @ts-expect-error TS(2345): Argument of type Remove this comment to see the full error message
          this._deps.messageStore.pushMessages(responses);
          if (responses.length === 1) {
            const conversationId =
              responses[0] &&
              // @ts-expect-error TS(2551): Property 'conversation' does not exist on type 'Ge... Remove this comment to see the full error message
              responses[0].conversation &&
              // @ts-expect-error TS(2551): Property 'conversation' does not exist on type 'Ge... Remove this comment to see the full error message
              responses[0].conversation.id;
            if (!conversationId) {
              return;
            }
            this._deps.routerInteraction.push(
              `/conversations/${conversationId}`,
            );
          } else {
            this._deps.routerInteraction.push('/messages');
          }
          // @ts-expect-error TS(2345): Argument of type 'GetMessageInfoResponse[]' is not... Remove this comment to see the full error message
          this._deps.conversations.relateCorrespondentEntity(responses);
          this._deps.composeText.clean();
          return;
        } catch (err) {
          console.log(err);
        }
      },
      formatPhone: formatContactPhone,
      formatContactPhone,
      detectPhoneNumbers: async (input) => {
        const promises = input.split(/,\s*/g).map(async (item: any) => {
          const isValid = await this._deps.composeText.validatePhoneNumber(
            item,
          );
          return isValid ? item : undefined;
        });
        const results = await Promise.all(promises);
        const detectedNumbers = results.filter((item) => !!item);
        detectedNumbers.forEach((phoneNumber) => {
          this._deps.composeText.addToNumber({
            phoneNumber,
          });
        });
        return detectedNumbers.length > 0;
      },
      searchContact: (searchString) =>
        this._deps.contactSearch.debouncedSearch({ searchString }),
      updateSenderNumber: ({ phoneNumber }) =>
        this._deps.composeText.updateSenderNumber(phoneNumber),
      updateTypingToNumber: (...args) =>
        // @ts-expect-error TS(2556): A spread argument must either have a tuple type or... Remove this comment to see the full error message
        this._deps.composeText.updateTypingToNumber(...args),
      cleanTypingToNumber: (...args) =>
        // @ts-expect-error TS(2556): A spread argument must either have a tuple type or... Remove this comment to see the full error message
        this._deps.composeText.cleanTypingToNumber(...args),
      // @ts-expect-error TS(2556): A spread argument must either have a tuple type or... Remove this comment to see the full error message
      addToNumber: (...args) => this._deps.composeText.addToNumber(...args),
      removeToNumber: (...args) =>
        // @ts-expect-error TS(2556): A spread argument must either have a tuple type or... Remove this comment to see the full error message
        this._deps.composeText.removeToNumber(...args),
      updateMessageText: (...args) =>
        // @ts-expect-error TS(2556): A spread argument must either have a tuple type or... Remove this comment to see the full error message
        this._deps.composeText.updateMessageText(...args),
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      recipientsContactInfoRenderer,
      recipientsContactPhoneRenderer,
      // @ts-expect-error TS(2556): A spread argument must either have a tuple type or... Remove this comment to see the full error message
      addAttachment: (...args) => this._deps.composeText.addAttachment(...args),
      removeAttachment: (...args) =>
        // @ts-expect-error TS(2556): A spread argument must either have a tuple type or... Remove this comment to see the full error message
        this._deps.composeText.removeAttachment(...args),
    };
  }
}
