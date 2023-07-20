import React, { useMemo } from 'react';

import messageTypes from '@ringcentral-integration/commons/enums/messageTypes';

import type { TabPropTypes } from '../NavigationBar';
import i18n from './i18n';
import { TabTitle } from './TabTitle';

type UseConversationTabData = {
  currentLocale: string;
  readVoicemailPermission: boolean;
  voiceUnreadCounts: number;
  readFaxPermission: boolean;
  faxUnreadCounts: number;
  readTextPermission: boolean;
  textUnreadCounts: number;
};

export function useConversationTabData({
  currentLocale,
  readVoicemailPermission,
  voiceUnreadCounts,
  readFaxPermission,
  faxUnreadCounts,
  readTextPermission,
  textUnreadCounts,
}: UseConversationTabData) {
  return useMemo(() => {
    const tabs: TabPropTypes[] = [
      {
        icon: (
          <TabTitle type={messageTypes.all} currentLocale={currentLocale} />
        ),
        label: i18n.getString(messageTypes.all, currentLocale),
        path: messageTypes.all,
        isActive: (path) => path === messageTypes.all,
      },
    ];

    readVoicemailPermission &&
      tabs.push({
        icon: (
          <TabTitle
            type={messageTypes.voiceMail}
            currentLocale={currentLocale}
          />
        ),
        label: i18n.getString(messageTypes.voiceMail, currentLocale),
        path: messageTypes.voiceMail,
        isActive: (path) => path === messageTypes.voiceMail,
        noticeCounts: voiceUnreadCounts,
      });

    readFaxPermission &&
      tabs.push({
        icon: (
          <TabTitle type={messageTypes.fax} currentLocale={currentLocale} />
        ),
        label: i18n.getString(messageTypes.fax, currentLocale),
        path: messageTypes.fax,
        isActive: (path) => path === messageTypes.fax,
        noticeCounts: faxUnreadCounts,
      });

    readTextPermission &&
      tabs.push({
        icon: (
          <TabTitle type={messageTypes.text} currentLocale={currentLocale} />
        ),
        label: i18n.getString(messageTypes.text, currentLocale),
        path: messageTypes.text,
        isActive: (path: string) => path === messageTypes.text,
        noticeCounts: textUnreadCounts,
      });

    return tabs;
  }, [
    currentLocale,
    faxUnreadCounts,
    readFaxPermission,
    readTextPermission,
    readVoicemailPermission,
    textUnreadCounts,
    voiceUnreadCounts,
  ]);
}
