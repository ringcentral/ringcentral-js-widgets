import { messageTypes } from '@ringcentral-integration/commons/enums/messageTypes';
import type { MessageTypes } from '@ringcentral-integration/commons/enums/messageTypes';
import { AppHeaderNav } from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { AddFaxMd, NewSmsmd } from '@ringcentral/spring-icon';
import { IconButton } from '@ringcentral/spring-ui';
import React, { useMemo } from 'react';

import i18n from './i18n';

type ConversationsHeaderProps = {
  typeFilter: MessageTypes;
  showNewButton?: boolean;
  newButtonDisabled?: boolean;
  disableLinks?: boolean;
  onNewClick?: (type: MessageTypes) => void;
};

export const ConversationsHeader: React.FC<ConversationsHeaderProps> = ({
  typeFilter,
  showNewButton,
  newButtonDisabled,
  disableLinks,
  onNewClick,
}) => {
  const { t } = useLocale(i18n);

  const faxMode = typeFilter === messageTypes.fax;
  const voiceMailMode = typeFilter === messageTypes.voiceMail;
  const showDisabledTextTooltip = newButtonDisabled && !faxMode;

  const title = useMemo(() => {
    return (
      {
        [messageTypes.fax]: t('faxTitle'),
        [messageTypes.text]: t('textTitle'),
      } as any
    )[typeFilter];
  }, [t, typeFilter]);

  return (
    <AppHeaderNav title={title}>
      {!voiceMailMode && showNewButton && onNewClick ? (
        <IconButton
          // Remount Spring UI Tooltip when switching to the disabled trigger wrapper.
          key={showDisabledTextTooltip ? 'disabled-text' : 'enabled'}
          variant="contained"
          color="secondary"
          size="small"
          symbol={faxMode ? AddFaxMd : NewSmsmd}
          data-sign="edit"
          TooltipProps={{
            triggerWhenDisabled: showDisabledTextTooltip,
            title: showDisabledTextTooltip
              ? t('sendNewTextDisabled')
              : faxMode
                ? t('composeFax')
                : t('composeText'),
          }}
          onClick={() => {
            onNewClick(typeFilter);
          }}
          disabled={disableLinks || newButtonDisabled}
        />
      ) : null}
    </AppHeaderNav>
  );
};
