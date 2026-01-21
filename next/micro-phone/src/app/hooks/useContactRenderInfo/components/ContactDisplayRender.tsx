import type { CallerInfo } from '@ringcentral-integration/commons/interfaces/Call.interface';
import { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import { useFormattedPhoneNumberFn } from '@ringcentral-integration/micro-auth/src/app/components/FormattedPhoneNumber';
import { IntegrationConfig } from '@ringcentral-integration/micro-setting/src/app/services';
import { useContainer } from '@ringcentral-integration/next-core';
import { InfoMd } from '@ringcentral/spring-icon';
import { Icon, Tag, Tooltip, twMerge } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { FC, useCallback, useMemo } from 'react';

import { t } from '../i18n';
import { ContactDisplayInfo } from '../utils';

export type ContactDisplayRenderProps = {
  info: ContactDisplayInfo;
  callQueueName?: string;
  isMissed?: boolean;
  /**
   * the render control to control the display of the display name
   */
  displayControl?: {
    /**
     * does the display name need to be displayed as viewable
     */
    viewable?: boolean;
    /**
     * does the display name need to be displayed as maybe in multiple matches
     *
     * @default false
     */
    maybe?: boolean;
    /**
     * does the display name need to be displayed as matches in multiple matches
     *
     * @default false
     */
    matchCounts?: boolean;
    /**
     * the alignment of the tag container
     *
     * @default 'left'
     */
    align?: 'left' | 'center';
  };
  /**
   * the prefix to display before the display name
   */
  prefix?: React.ReactNode;
};

export const ContactDisplayRender: FC<ContactDisplayRenderProps> = (props) => {
  const { info, callQueueName, isMissed } = props;

  if (callQueueName) {
    return renderQueueWithName({
      callQueueName,
      renderInfo: info,
      Renderer: ({ prefix }) => <Element {...props} prefix={prefix} />,
    });
  }

  return <Element {...props} isMissed={isMissed} />;
};

const Element: FC<ContactDisplayRenderProps> = ({
  info,
  displayControl,
  prefix,
  isMissed,
}) => {
  const {
    maybe: displayMaybe = false,
    matchCounts: displayMatchCounts = false,
    viewable: _viewable = false,
    align = 'left',
  } = displayControl || {};

  const integrationConfig = useContainer<IntegrationConfig, true>(
    'IntegrationConfig',
  );
  const formattedPhoneNumberFn = useFormattedPhoneNumberFn();

  if (info.type === 'phoneNumber') {
    const formattedPhoneNumber = formattedPhoneNumberFn(info.displayName);

    return (
      <div title={formattedPhoneNumber} className="truncate">
        {formattedPhoneNumber}
      </div>
    );
  }

  const { onViewEntity, viewableEntityTypes } = integrationConfig || {};

  const { displayName, metadata, type } = info;

  const resultDisplayName =
    displayMaybe && metadata?.showMaybe
      ? t('maybe', {
          contactName: displayName,
        })
      : displayName;

  const viewable =
    _viewable &&
    onViewEntity &&
    metadata?.contact &&
    viewableEntityTypes?.includes(metadata?.contact?.type!);

  const Component = viewable ? 'a' : 'span';

  const main = (
    <Component
      className={clsx(
        'truncate self-stretch',
        viewable && 'cursor-pointer hover:underline',
        isMissed && 'typography-subtitleBold',
      )}
      title={resultDisplayName}
      data-sign={metadata?.queueName ? `queueName-${type}` : type}
      {...(viewable
        ? {
            // add a empty href to make the component able to clickable and focusable
            href: '',
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();

              onViewEntity(metadata.contact);
            },
          }
        : {})}
    >
      {resultDisplayName}
    </Component>
  );

  // when be server name, display the hint icon for user to know that is server name not contact
  const showServerCallerId =
    metadata?.serverName && !metadata?.queueName && type === 'callerIdName';

  const numberOfMatches = metadata?.numberOfMatches;

  return (
    <div
      className={twMerge(
        'inline-flex flex-col min-w-0 max-w-full',
        align === 'center' ? 'items-center' : 'items-start',
      )}
    >
      <div className="inline-flex items-center gap-1 max-w-full truncate">
        {prefix}
        {showServerCallerId ? (
          <>
            {main}
            <Tooltip title={t('callerId')}>
              <Icon
                data-sign="callerIdHint"
                symbol={InfoMd}
                size="small"
                className="text-neutral-b2"
              />
            </Tooltip>
          </>
        ) : (
          main
        )}
      </div>
      {displayMatchCounts && numberOfMatches && numberOfMatches > 1 ? (
        <Tag
          color="neutral"
          variant="inverted"
          className="shrink-0 w-fit max-w-20 my-1"
        >
          {t('matches', { numberOfMatches })}
        </Tag>
      ) : null}
    </div>
  );
};

type RenderQueueWithNameOptions = {
  callQueueName: string;
  renderInfo: ContactDisplayInfo;
  /**
   * when is not plain text, the target render component
   */
  Renderer: FC<{ prefix?: React.ReactNode }>;
};

function renderQueueWithName({
  callQueueName,
  renderInfo,
  Renderer,
}: RenderQueueWithNameOptions) {
  const queueName = (
    <span className="truncate" data-sign="queueName" title={callQueueName}>
      {callQueueName}
    </span>
  );

  const queueNameDisplay = (
    <>
      {queueName}
      {' - '}
    </>
  );

  switch (renderInfo.type) {
    case 'callerIdName':
      return <Renderer prefix={queueNameDisplay} />;
    case 'contact':
      // when be queue number contact, only show the queue name
      if ((renderInfo.matchedContact as Entity)?.isCallQueueNumber) {
        return <Renderer />;
      }

      return <Renderer prefix={queueNameDisplay} />;
    case 'unknown':
    case 'phoneNumber':
    case 'extensionNumber':
    default:
      return queueName;
  }
}

export function renderQueueWithNameText({
  callQueueName,
  renderInfo,
}: Omit<RenderQueueWithNameOptions, 'Renderer'>) {
  switch (renderInfo.type) {
    case 'callerIdName':
      return `${callQueueName} - ${renderInfo.displayName}`;
    case 'contact':
      // when be queue number contact, only show the queue name
      if ((renderInfo.matchedContact as Entity)?.isCallQueueNumber) {
        return renderInfo.displayName;
      }

      return `${callQueueName} - ${renderInfo.displayName}`;

    case 'unknown':
    case 'phoneNumber':
    case 'extensionNumber':
    default:
      return callQueueName;
  }
}

export const useFormatExtOrPhoneNumber = (
  callerInfo: CallerInfo = {},
  hideBlocked = false,
) => {
  const formattedPhoneNumberFn = useFormattedPhoneNumberFn();

  return useMemo(() => {
    if (!callerInfo.extensionNumber && !callerInfo.phoneNumber) {
      if (hideBlocked) return '';
      return t('Blocked');
    }

    return callerInfo.extensionNumber
      ? `${t('ext')} ${formattedPhoneNumberFn(callerInfo.extensionNumber)}`
      : formattedPhoneNumberFn(callerInfo.phoneNumber);
  }, [
    hideBlocked,
    callerInfo.extensionNumber,
    callerInfo.phoneNumber,
    formattedPhoneNumberFn,
  ]);
};

export const useGetContactDisplayTextFn = () => {
  const formattedPhoneNumberFn = useFormattedPhoneNumberFn();

  return useCallback(
    ({
      renderInfo,
      callQueueName,
    }: {
      renderInfo: ContactDisplayInfo;

      /**
       * by default, use the call queue name from the call
       *
       * if you want to override the call queue name, you can pass it here
       */
      callQueueName?: string;
    }) => {
      if (callQueueName) {
        return renderQueueWithNameText({
          callQueueName: callQueueName,
          renderInfo,
        });
      }

      if (renderInfo.type === 'phoneNumber') {
        const formattedPhoneNumber = formattedPhoneNumberFn(
          renderInfo.displayName,
        );
        return formattedPhoneNumber;
      }

      return renderInfo.displayName;
    },
    [formattedPhoneNumberFn],
  );
};
