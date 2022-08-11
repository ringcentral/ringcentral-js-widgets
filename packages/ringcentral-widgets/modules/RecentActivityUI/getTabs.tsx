import React, { ReactElement } from 'react';

import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import { HistoryCall } from '@ringcentral-integration/commons/modules/CallHistory';
import { FormatDateTimeOptions } from '@ringcentral-integration/commons/modules/DateTimeFormat';
import { RecentCalls } from '@ringcentral-integration/commons/modules/RecentCalls';
import {
  RecentMessage,
  RecentMessages,
} from '@ringcentral-integration/commons/modules/RecentMessages';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import FaxIcon from '../../assets/images/Fax.svg';
import VoicemailIcon from '../../assets/images/VoicemailIcon.svg';
import RecentActivityCalls from '../../components/RecentActivityCalls';
import RecentActivityMessages from '../../components/RecentActivityMessages';
import i18n from './i18n';

export interface Tab {
  icon: ReactElement;
  label: string;
  path: string;
  isActive: (path: string) => boolean;
  view: ReactElement;
  getData: () => void;
  cleanUp: () => void;
}

export const trackTabsMap = {
  recentCalls: trackEvents.clickRecentActivityCall,
  faxes: trackEvents.clickRecentActivityFaxes,
  recentMessages: trackEvents.clickRecentActivitySms,
  voicemails: trackEvents.clickRecentActivityVoicemails,
};

export interface GetTabsOptions {
  ready: boolean;
  currentLocale: string;
  dateTimeFormatter: (options: Partial<FormatDateTimeOptions>) => string;
  navigateTo: (path: string) => void;
  recentMessages: RecentMessages;
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
    if (recentMessages.messages[activityCardId]) {
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
            label: i18n.getString('voicemail', currentLocale),
            path: 'voicemails',
            isActive: (path) => path === 'voicemails',
            view: null,
            getData() {},
            cleanUp() {},
          }
        : null,
      showRecentMessage
        ? {
            icon: <span className={dynamicsFont.composeText} />,
            label: i18n.getString('text', currentLocale),
            path: 'recentMessages',
            isActive: (path) => path === 'recentMessages',
            view: (
              <RecentActivityMessages
                // @ts-expect-error TS(2769): No overload matches this call.
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
            label: i18n.getString('fax', currentLocale),
            path: 'faxes',
            isActive: (path) => path === 'faxes',
            view: null,
            getData() {},
            cleanUp() {},
          }
        : null,
      showRecentCalls
        ? {
            icon: <span className={dynamicsFont.active} />,
            label: i18n.getString('call', currentLocale),
            path: 'recentCalls',
            isActive: (path) => path === 'recentCalls',
            view: (
              <RecentActivityCalls
                // @ts-expect-error TS(2769): No overload matches this call.
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
