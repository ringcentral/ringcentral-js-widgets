import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { FormattedMessage } from '@ringcentral-integration/next-widgets/components';
import { Link } from '@ringcentral/spring-ui';
import React from 'react';

import i18n from './i18n';

export const MovedToSharedTabAlert = ({
  phoneNumber,
  onReplyInSharedTab,
}: {
  phoneNumber: string;
  onReplyInSharedTab: () => Promise<void> | void;
}) => {
  const { t } = useLocale(i18n);

  return (
    <div className="flex flex-col gap-2">
      <FormattedMessage
        message={t('movedToSharedTabAlert')}
        values={{ phoneNumber }}
      >
        {' '}
        <Link
          onClick={() => {
            void onReplyInSharedTab();
          }}
          variant="primary"
        >
          {t('replyInSharedTab')}
        </Link>
      </FormattedMessage>
    </div>
  );
};
