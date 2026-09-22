import { AppHeaderNav } from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { PageHeader } from '@ringcentral-integration/next-widgets/components';
import NoText from '@ringcentral-integration/next-core/assets/no_text.svg';
import React, { FC } from 'react';

import i18n from './i18n';

export type ConversationNoAccessPanelProps = {
  goBack: () => void;
};

export const ConversationNoAccessPanel: FC<ConversationNoAccessPanelProps> = ({
  goBack,
}) => {
  const { t } = useLocale(i18n);

  return (
    <>
      <AppHeaderNav override>
        <PageHeader onBackClick={() => goBack()} />
      </AppHeaderNav>
      <div
        data-sign="conversationNoAccessPanel"
        className="flex-auto flex justify-center items-center h-full overflow-y-auto overflow-x-hidden"
      >
        <div className="flex-col flex justify-center items-center px-6">
          <NoText />
          <div
            data-sign="conversationNoAccessMessage"
            className="text-center text-14 text-gray-500 mt-4"
          >
            {t('noAccessToSendFromNumber')}
          </div>
        </div>
      </div>
    </>
  );
};

ConversationNoAccessPanel.displayName = 'ConversationNoAccessPanel';
