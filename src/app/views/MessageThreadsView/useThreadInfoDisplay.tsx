import { getAvatarLetter } from '@ringcentral-integration/micro-contacts/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  FormattedMessage,
  HistoryActionType,
} from '@ringcentral-integration/next-widgets/components';
import { CheckMd, ClockMd } from '@ringcentral/spring-icon';
import {
  Alert,
  Button,
  Icon,
  Tag,
  Tooltip,
  type TagProps,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { useCallback, useMemo, useRef } from 'react';

import type { ThreadInfoRecord, ThreadMetaData } from '../../services';
import type { OnConversationsActionsType } from '../ConversationsViewSpring';

import i18n from './i18n';

export type UseThreadInfoDisplayProps = {
  extensionId?: number;
  info?: ThreadInfoRecord;
  metadata?: ThreadMetaData;
  onAction?: OnConversationsActionsType;
};

const AlertBanner: React.FC<{
  severity?: 'info' | 'warning' | 'error';
  title: React.ReactNode;
  actions: React.ReactNode;
}> = ({ severity = 'info', title, actions }) => {
  return (
    <Alert severity={severity} className="m-4">
      <div className="flex flex-col gap-2">
        <h4>{title}</h4>
        <div className="flex gap-3">{actions}</div>
      </div>
    </Alert>
  );
};

export const useThreadInfoDisplay = ({
  info: threadInfo,
  extensionId,
  onAction,
  metadata,
}: UseThreadInfoDisplayProps) => {
  const { t } = useLocale(i18n);

  const isLoading = metadata?.loading ?? false;
  const isReopened = metadata?.reopen ?? false;

  const threadState = useMemo(() => {
    if (!threadInfo) {
      return null;
    }

    const isResolved = threadInfo.status === 'Resolved';
    const isAssigned = !!threadInfo.assignee;
    const currentExtensionId = extensionId?.toString();
    const isAssignedToMe =
      threadInfo.assignee?.extensionId === currentExtensionId;

    const showInput = (!isResolved && isAssignedToMe) || isReopened;

    // Get assignee badge info
    let assigneeBadge: TagProps | null = null;

    const assigneeName = threadInfo.assignee?.name;
    // Get tooltip text for assignee badge
    let assigneeBadgeTooltip: string | undefined;

    if (isAssigned && !isResolved && threadInfo.assignee?.name) {
      assigneeBadge = {
        children: getAvatarLetter(assigneeName),
        color: isAssignedToMe ? 'warning' : 'primary',
        variant: isAssignedToMe ? 'filled' : 'outlined',
        className: isAssignedToMe ? 'border-none' : '',
      };
    } else if (isResolved) {
      const isExpired = threadInfo.statusReason === 'ThreadExpired';

      if (!isExpired) {
        assigneeBadge = {
          children: <Icon symbol={CheckMd} size="xsmall" />,
          color: 'primary',
        };
        assigneeBadgeTooltip = t('resolved');
      } else {
        assigneeBadge = {
          children: (
            <>
              <Icon symbol={ClockMd} size="xsmall" />
              <Icon className="ml-0.5" symbol={CheckMd} size="xsmall" />
            </>
          ),
          color: 'primary',
          className: 'border-none',
        };
        assigneeBadgeTooltip = t('autoResolved');
      }
    }

    if (isAssigned && !isResolved && threadInfo.assignee?.name) {
      if (isAssignedToMe) {
        assigneeBadgeTooltip = t('assignedToYouTooltip');
      } else {
        assigneeBadgeTooltip = t('assignedToOtherTooltip', {
          name: assigneeName || '',
        });
      }
    }

    return {
      isResolved,
      isAssigned,
      isAssignedToMe,
      assigneeName: threadInfo.assignee?.name,
      assigneeBadge,
      assigneeBadgeTooltip,
      showInput,
      showResolvedBanner: isResolved,
      showUnassignedBanner: !isAssigned && !isResolved,
      showAssignedToOtherBanner: isAssigned && !isAssignedToMe && !isResolved,
    };
  }, [threadInfo, extensionId, isReopened, t]);

  const bannerDisplay = useMemo(() => {
    if (!threadState) return false;
    return (
      threadState.showResolvedBanner ||
      threadState.showUnassignedBanner ||
      threadState.showAssignedToOtherBanner
    );
  }, [threadState]);

  const lastActionRef = useRef<HistoryActionType | null>(null);

  const showInput = threadState?.showInput ?? true;
  const ThreadBanner = useCallback(() => {
    if (!threadState || !bannerDisplay) {
      return null;
    }

    if (threadState.showResolvedBanner) {
      const loading = isLoading && lastActionRef.current === 'assignToMe';
      return (
        <AlertBanner
          title={t('resolvedBanner')}
          actions={
            !showInput ? (
              <Button
                variant="contained"
                color="secondary"
                size="medium"
                loading={loading}
                disabled={isLoading && !loading}
                onClick={() => {
                  lastActionRef.current = 'assignToMe';
                  return onAction?.('assignToMe');
                }}
              >
                {t('reply')}
              </Button>
            ) : undefined
          }
        />
      );
    }

    if (threadState.showUnassignedBanner) {
      const loading = isLoading && lastActionRef.current === 'assignThread';
      const assignToMeLoading =
        isLoading && lastActionRef.current === 'assignToMe';
      return (
        <AlertBanner
          severity="info"
          title={t('unassignedBannerText')}
          actions={
            <>
              <Button
                variant="contained"
                color="secondary"
                size="medium"
                loading={assignToMeLoading}
                disabled={isLoading && !assignToMeLoading}
                onClick={() => {
                  lastActionRef.current = 'assignToMe';
                  return onAction?.('assignToMe');
                }}
              >
                {t('reply')}
              </Button>
              <Button
                variant="text"
                color="secondary"
                size="medium"
                loading={loading}
                disabled={isLoading && !loading}
                onClick={() => {
                  lastActionRef.current = 'assignThread';
                  return onAction?.('assignThread');
                }}
              >
                {t('assign')}
              </Button>
            </>
          }
        />
      );
    }

    if (threadState.showAssignedToOtherBanner) {
      const loading = isLoading && lastActionRef.current === 'assignToMe';

      return (
        <AlertBanner
          title={
            <FormattedMessage
              message={t('assignedToOtherBanner')}
              values={{
                name: threadState.assigneeName || '',
              }}
            />
          }
          actions={
            <>
              <Button
                variant="contained"
                color="secondary"
                size="medium"
                loading={loading}
                disabled={isLoading && !loading}
                onClick={() => {
                  lastActionRef.current = 'assignToMe';
                  return onAction?.('assignToMe');
                }}
              >
                {t('assignToMeText')}
              </Button>
            </>
          }
        />
      );
    }

    return null;
  }, [threadState, bannerDisplay, isLoading, t, showInput, onAction]);

  const ThreadStatus = useCallback(() => {
    const assigneeBadge = threadState?.assigneeBadge;
    if (!assigneeBadge) {
      return null;
    }

    const tooltipTitle = threadState?.assigneeBadgeTooltip;

    const tagElement = (
      <Tag
        {...assigneeBadge}
        className={clsx(
          'flex items-center justify-center rounded-full',
          assigneeBadge.className,
        )}
        variant={assigneeBadge.variant || 'filled'}
        data-sign="thread-status"
      />
    );

    if (tooltipTitle) {
      return <Tooltip title={tooltipTitle}>{tagElement}</Tooltip>;
    }

    return tagElement;
  }, [threadState]);

  const queueName = threadInfo?.owner?.name;

  return {
    bannerDisplay,
    ThreadBanner,
    ThreadStatus,
    showInput,
    queueName,
  };
};
