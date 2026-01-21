import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import type { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import { FormatDateTimeOptions } from '@ringcentral-integration/micro-core/src/app/services';
import type {
  RecentMessage,
  RecentMessages,
} from '@ringcentral-integration/micro-message/src/app/services';
import dynamicsFont from '@ringcentral-integration/widgets/assets/DynamicsFont/DynamicsFont.scss';
import FaxIcon from '@ringcentral-integration/widgets/assets/images/Fax.svg';
import VoicemailIcon from '@ringcentral-integration/widgets/assets/images/VoicemailIcon.svg';
import _RecentActivityCalls from '@ringcentral-integration/widgets/components/RecentActivityCalls';
import _RecentActivityMessages from '@ringcentral-integration/widgets/components/RecentActivityMessages';
import type { ComponentType, ReactElement } from 'react';
import React from 'react';

import type { HistoryCall, RecentCalls } from '../../services';

import { t } from './i18n';

// TODO: fix type
const RecentActivityCalls = _RecentActivityCalls as ComponentType<any>;
const RecentActivityMessages = _RecentActivityMessages as ComponentType<any>;
// TODO: move to components folder

export interface Tab {
  icon: ReactElement;
  label: string;
  path: string;
  isActive: (path: string) => boolean;
  view: ReactElement;
  getData: () => void;
  cleanUp: () => void;
}

export interface GetTabsOptions {
  ready: boolean;
  currentLocale: string;
  dateTimeFormatter: (options: Partial<FormatDateTimeOptions>) => string;
  navigateTo: (path: string) => void;
  recentMessages?: RecentMessages;
  recentCalls: RecentCalls;
  currentContact: Entity;
  sessionId: string;
  showRecentCalls: boolean;
  showRecentMessage: boolean;
  showFax: boolean;
  showVoiceMails: boolean;
}

export const getTabs = ({
  ready,
  currentLocale,
  dateTimeFormatter,
  navigateTo,
  recentMessages,
  recentCalls,
  currentContact,
  sessionId,
  showRecentCalls,
  showRecentMessage,
  showFax,
  showVoiceMails,
}: GetTabsOptions) => {
  if (!ready) return [];
  let messages: (Message | RecentMessage)[] = [];
  let calls: HistoryCall[] = [];
  if (currentContact && currentContact.id) {
    const contactId = currentContact.id;
    const activityCardId = sessionId ? `${contactId}-${sessionId}` : contactId;
    if (recentMessages?.messages[activityCardId]) {
      messages = recentMessages.messages[activityCardId];
    }
    if (recentCalls.calls[activityCardId]) {
      calls = recentCalls.calls[activityCardId];
    }
  }

  return (
    [
      showVoiceMails
        ? {
            icon: <VoicemailIcon width={21} height={21} />,
            label: t('voicemail'),
            path: 'voicemails',
            isActive: (path) => path === 'voicemails',
            view: null,
            getData() {
              //
            },
            cleanUp() {
              //
            },
          }
        : null,
      showRecentMessage && recentMessages
        ? {
            icon: <span className={dynamicsFont.composeText} />,
            label: t('text'),
            path: 'recentMessages',
            isActive: (path) => path === 'recentMessages',
            view: (
              <RecentActivityMessages
                messages={messages}
                navigateTo={navigateTo}
                dateTimeFormatter={dateTimeFormatter}
                currentLocale={currentLocale}
                isMessagesLoaded={recentMessages.isMessagesLoaded}
              />
            ),
            getData() {
              recentMessages.getMessages({ currentContact, sessionId });
            },
            cleanUp: () =>
              recentMessages.cleanUpMessages({
                contact: currentContact,
                sessionId,
              }),
          }
        : null,
      showFax
        ? {
            icon: <FaxIcon width={21} height={21} />,
            label: t('fax'),
            path: 'faxes',
            isActive: (path) => path === 'faxes',
            view: null,
            getData() {
              //
            },
            cleanUp() {
              //
            },
          }
        : null,
      showRecentCalls
        ? {
            icon: <span className={dynamicsFont.active} />,
            label: t('call'),
            path: 'recentCalls',
            isActive: (path) => path === 'recentCalls',
            view: (
              <RecentActivityCalls
                calls={calls}
                dateTimeFormatter={dateTimeFormatter}
                currentLocale={currentLocale}
                isCallsLoaded={recentCalls.isCallsLoaded}
              />
            ),
            getData() {
              recentCalls.getCalls({ currentContact, sessionId });
            },
            cleanUp: () =>
              recentCalls.cleanUpCalls({ contact: currentContact, sessionId }),
          }
        : null,
    ] as Tab[]
  ).filter((item) => item !== null);
};
