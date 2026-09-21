import type {
  UserpilotServiceOptions,
  OAuthOptions,
  AuthOptions,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  type AnalyticsOptions,
  Auth,
  UserpilotService,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  AccountContacts,
  AddressBook,
  ContactMatcher,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import { type BrandConfigOptions } from '@ringcentral-integration/micro-core/src/app/services';
import type { HeaderNavViewSpringOptions } from '@ringcentral-integration/micro-core/src/app/views';
import {
  GenericMeeting,
  type RcVideoOptions,
} from '@ringcentral-integration/micro-meeting/src/app/services';
import {
  GenericMeetingViewSpring,
  PersonalMeetingSettingsViewSpring,
} from '@ringcentral-integration/micro-meeting/src/app/views';
import {
  ConversationLogger,
  type ConversationLoggerOptions,
  ConversationMatcher,
  MessageThread,
  type MessageThreadOptions,
  SmsConsent,
  SmsConversationsOptions,
  SmsOptOut,
} from '@ringcentral-integration/micro-message/src/app/services';
import {
  SmsConsentDialogView,
  SmsConsentManagementView,
  SmsOptOutView,
  TCRNumberModalView,
} from '@ringcentral-integration/micro-message/src/app/views';
import type { ContactRendererOptions } from '@ringcentral-integration/micro-phone/src/app/hooks';
import {
  ActiveCallControlOptions,
  CallQueueManagement,
} from '@ringcentral-integration/micro-phone/src/app/services';
import {
  CallLogFormView,
  type CallLogFormViewOptions,
} from '@ringcentral-integration/micro-phone/src/app/views';
import { IntegrationConfigOptions } from '@ringcentral-integration/micro-setting/src/app/services';
import {
  ExperienceFeedbackView,
  FeedbackView,
  type FeedbackViewOptions,
  type SettingsViewOptions,
} from '@ringcentral-integration/micro-setting/src/app/views';
import { getCommonAppConfig } from '@ringcentral-integration/next-common-app/src/app';
import {
  createSharedApp,
  type RootOptions,
} from '@ringcentral-integration/next-core';

import type { AppConfig } from '../config';

import { CallLogExample } from './app/example';

export const createApp = async (
  options?: Parameters<typeof createSharedApp>[0]['share'],
  modules: Parameters<typeof createSharedApp>[0]['modules'] = [],
) => {
  const config = process.env.APP_CONFIG as unknown as AppConfig;
  const {
    prefix,
    brandConfig,
    version,
    loaderBaseUrl,
    enableIDB,
    analyticsKey,
    userpilotAppToken,
  } = config;
  const sdkConfig = config.sdkConfig!;
  const { appVersion } = version;
  const appConfig = getCommonAppConfig({
    appVersion,
    prefix,
    brandConfig,
    sdkConfig,
    modules: [
      Auth,
      ContactMatcher,
      ConversationLogger,
      ConversationMatcher,
      CallQueueManagement,
      {
        provide: 'RootOptions',
        useValue: {
          onExpand: (expand) => {
            global.parent?.postMessage(
              {
                expand,
              },
              '*',
            );
          },
        } satisfies RootOptions,
      },
      {
        provide: 'ContactSources',
        deps: [AccountContacts, AddressBook],
        useFactory: (
          accountContacts: AccountContacts,
          addressBook: AddressBook,
        ) => [accountContacts, addressBook],
      },
      {
        provide: 'IntegrationConfigOptions',
        useValue:
          process.env.NODE_ENV !== 'production'
            ? ({
                key: 'demo',
                onViewEntity: (entity) => {
                  console.log('🐞 ~ onViewEntity entity:', entity);
                },
                onCreateEntity: (entity) => {
                  console.log('🐞 ~ onCreateEntity entity:', entity);
                },
              } satisfies IntegrationConfigOptions)
            : {},
      },
      CallLogFormView,
      {
        provide: 'CallLogFormViewOptions',
        useValue: {
          component: CallLogExample,
        } satisfies CallLogFormViewOptions,
      },
      {
        provide: 'SmsConversationsOptions',
        useValue: {
          supportCRMLogMessageTypes: [],
        } satisfies SmsConversationsOptions,
      },
      {
        provide: 'ConversationLoggerOptions',
        useValue: {
          async logFunction(e) {
            console.log('🐞 ~ logFunction e:', e);
          },
          readyCheckFunction() {
            return true;
          },
          isLoggedContact(conversation, lastActivity, item) {
            console.log('🐞 ~ isLoggedContact:', {
              conversation,
              lastActivity,
              item,
            });
            return lastActivity && item && lastActivity.id === item.id;
          },
          accordWithLogRequirement(conversation) {
            console.log('🐞 ~ conversation:', conversation);
            return true;
          },
        } satisfies ConversationLoggerOptions,
      },
      {
        provide: 'ContactRendererOptions',
        useFactory: (
          conversationMatcher: ConversationMatcher,
          conversationLogger: ConversationLogger,
        ) => {
          conversationMatcher.addSearchProvider({
            name: 'common',
            readyCheckFn: () => true,
            searchFn: () => {
              return {};
            },
          });

          return {
            onSelectContact: async (info) => {
              console.log('🐞 ~ info:', info);

              if (info.type === 'conversation') {
                const { source: conversation, entity } = info;
                const conversationLogId =
                  conversationLogger!.getConversationLogId(conversation)!;
                await conversationMatcher?.insertMatching({
                  name: 'common',
                  queries: [conversationLogId],
                  data: {
                    [conversationLogId]: [entity as any],
                  },
                });
              }
            },
          } satisfies ContactRendererOptions;
        },
        deps: [ConversationMatcher, ConversationLogger],
      },

      {
        provide: 'ActiveCallControlOptions',
        useValue: {
          getEnableLeaveConferenceAsHost: () => {
            return true;
          },
        } satisfies ActiveCallControlOptions,
      },
      {
        provide: 'AnalyticsOptions',
        useValue: {
          analyticsKey: analyticsKey!,
          appVersion,
          enableMixpanel: true,
        } satisfies AnalyticsOptions,
      },
      {
        provide: 'OAuthOptions',
        useValue: {
          // use redirect.html directly for we host in sub path of the app
          redirectUri: './redirect.html',
        } satisfies OAuthOptions,
      },
      {
        provide: 'AuthOptions',
        useValue: { usePKCE: true } satisfies AuthOptions,
      },
      {
        provide: 'BrandConfigOptions',
        useValue: {
          assetOrigin: '.',
        } satisfies BrandConfigOptions,
      },
      SmsOptOut,
      SmsOptOutView,
      SmsConsent,
      SmsConsentDialogView,
      SmsConsentManagementView,
      TCRNumberModalView,
      MessageThread,
      {
        provide: 'MessageThreadOptions',
        useValue: {
          enable: true,
        } satisfies MessageThreadOptions,
      },
      GenericMeeting,
      {
        provide: 'MeetingOptions',
        useValue: {
          enablePersonalMeeting: true,
          enableServiceWebSettings: true,
        },
      },
      {
        provide: 'RcVideoOptions',
        useValue: {
          enablePersonalMeeting: true,
          enableInvitationApi: true,
          enableInvitationBridgesApi: true,
          enableInvitationApiFailedToast: true,
          enableWaitingRoom: true,
        } satisfies RcVideoOptions,
      },
      // enable meeting
      GenericMeetingViewSpring,
      PersonalMeetingSettingsViewSpring,
      {
        provide: 'HeaderNavViewOptions',
        useValue: {
          enableVideoTab: true,
        } satisfies HeaderNavViewSpringOptions,
      },
      //
      // Userpilot FeatureGuide integration
      ...(userpilotAppToken
        ? [
            UserpilotService,
            FeedbackView,
            ExperienceFeedbackView,
            {
              provide: 'UserpilotServiceOptions',
              useValue: {
                appToken: userpilotAppToken,
              } satisfies UserpilotServiceOptions,
            },
            {
              provide: 'SettingsViewOptions',
              useFactory: (
                userpilotService: UserpilotService,
                feedbackView: FeedbackView,
              ) => {
                return {
                  showFeedback: brandConfig.code === 'rc',
                  onFeedBackSettingsLink: () => {
                    userpilotService.track('settings-rating-show');
                    feedbackView?.openFeedback();
                  },
                } satisfies SettingsViewOptions;
              },
              deps: [UserpilotService, FeedbackView],
            },
            {
              provide: 'FeedbackViewOptions',
              useValue: {
                reviewLink: 'https://www.google.com',
              } satisfies FeedbackViewOptions,
            },
          ]
        : [
            {
              provide: 'SettingsViewOptions',
              useFactory: () => {
                return {
                  showFeedback: false,
                } satisfies SettingsViewOptions;
              },
              deps: [],
            },
          ]),
      ...modules,
    ],
    share: options ?? {
      name: 'app-demo',
      type: 'Base',
    },
  });
  const app = await createSharedApp(appConfig);

  if (global.document) {
    app.bootstrap(document.getElementById('app'));
  }

  return app;
};
