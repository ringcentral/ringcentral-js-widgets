import Module from 'ringcentral-integration/lib/di/decorators/module';
import formatNumber from 'ringcentral-integration/lib/formatNumber';

import RcUIModule from '../../lib/RcUIModule';

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
    'RolesAndPermissions',
    'RouterInteraction',
  ],
})
export default class ComposeTextUI extends RcUIModule {
  getUIProps({
    phone: {
      brand,
      locale,
      composeText,
      messageSender,
      connectivityMonitor,
      rateLimiter,
      rolesAndPermissions,
      contactSearch,
    },
    inputExpandable,
    supportAttachment,
  }) {
    const isContentEmpty =
      composeText.messageText.length === 0 &&
      (!composeText.attachments || composeText.attachments.length === 0);
    return {
      brand: brand.fullName,
      currentLocale: locale.currentLocale,
      sendButtonDisabled:
        !(composeText.ready && messageSender.idle) ||
        isContentEmpty ||
        (composeText.toNumbers.length === 0 &&
          composeText.typingToNumber.length === 0) ||
        !connectivityMonitor.connectivity ||
        rateLimiter.throttling,
      senderNumbers: messageSender.senderNumbersList,
      senderNumber: composeText.senderNumber,
      typingToNumber: composeText.typingToNumber,
      toNumbers: composeText.toNumbers,
      messageText: composeText.messageText,
      outboundSMS: rolesAndPermissions.permissions.OutboundSMS,
      searchContactList: contactSearch.sortedResult,
      showSpinner: !(
        composeText.ready &&
        locale.ready &&
        messageSender.ready &&
        rolesAndPermissions.ready &&
        contactSearch.ready
      ),
      inputExpandable,
      attachments: composeText.attachments,
      supportAttachment,
    };
  }

  getUIFunctions({
    phone: {
      regionSettings,
      routerInteraction,
      composeText,
      messageStore,
      contactSearch,
      conversations,
    },
    formatContactPhone = (phoneNumber) =>
      formatNumber({
        phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode,
      }),
    phoneTypeRenderer,
    phoneSourceNameRenderer,
    recipientsContactInfoRenderer,
    recipientsContactPhoneRenderer,
  }) {
    return {
      send(...args) {
        composeText.send(...args).then(
          (responses) => {
            if (!responses || responses.length === 0) {
              return null;
            }
            messageStore.pushMessages(responses);
            if (responses.length === 1) {
              const conversationId =
                responses[0] &&
                responses[0].conversation &&
                responses[0].conversation.id;
              if (!conversationId) {
                return null;
              }
              routerInteraction.push(`/conversations/${conversationId}`);
            } else {
              routerInteraction.push('/messages');
            }
            conversations.relateCorrespondentEntity(responses);
            composeText.clean();
            return null;
          },
          (err) => {
            console.log(err);
          },
        );
      },
      formatPhone: formatContactPhone,
      formatContactPhone,
      async detectPhoneNumbers(input) {
        const promises = input.split(/,\s*/g).map(async (item) => {
          const isValid = await composeText.validatePhoneNumber(item);
          return isValid ? item : undefined;
        });
        const results = await Promise.all(promises);
        const detectedNumbers = results.filter((item) => !!item);
        detectedNumbers.forEach((phoneNumber) => {
          composeText.addToNumber({
            phoneNumber,
          });
        });
        return detectedNumbers.length > 0;
      },
      searchContact: (searchString) =>
        contactSearch.debouncedSearch({ searchString }),
      updateSenderNumber: ({ phoneNumber }) =>
        composeText.updateSenderNumber(phoneNumber),
      updateTypingToNumber: (...args) =>
        composeText.updateTypingToNumber(...args),
      cleanTypingToNumber: (...args) =>
        composeText.cleanTypingToNumber(...args),
      addToNumber: (...args) => composeText.addToNumber(...args),
      removeToNumber: (...args) => composeText.removeToNumber(...args),
      updateMessageText: (...args) => composeText.updateMessageText(...args),
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      recipientsContactInfoRenderer,
      recipientsContactPhoneRenderer,
      addAttachment: (...args) => composeText.addAttachment(...args),
      removeAttachment: (...args) => composeText.removeAttachment(...args),
    };
  }
}
