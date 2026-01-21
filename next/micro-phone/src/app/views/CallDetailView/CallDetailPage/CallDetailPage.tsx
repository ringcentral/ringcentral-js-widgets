import {
  AppFooterNav,
  AppHeaderNav,
  CopyIconButtonSpring,
} from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  ActionMenuList,
  PageHeaderBackButton,
  useHistoryActionButtons,
} from '@ringcentral-integration/next-widgets/components';
import { Block, BlockHeader } from '@ringcentral/spring-ui';
import type { FunctionComponent } from 'react';
import React from 'react';

import type { CallDetailViewPanelProps } from '../CallDetail.view.interface';

import i18n from './i18n';

export const useCallDetailPageContent = ({
  currentCallLog,
  goBack,
  useCallHistoryItemInfo,
  useActionsHandler,
}: CallDetailViewPanelProps) => {
  const { t } = useLocale(i18n);
  const { info, actions } = useCallHistoryItemInfo(currentCallLog, {
    // TODO: support select contact
    selectIndex: 0,
    variant: 'detail',
  });
  const onAction = useActionsHandler(
    currentCallLog,
    info,
    'Call history detail page',
  );

  const {
    DisplayName,
    displayPhoneNumber,
    formattedPhoneNumber,
    myCallerIdTitle,
    myCallerId,
    Avatar,
    startTime,
    Status,
    callQueueName,
    isConferenceCall,
  } = info;
  const buttons = useHistoryActionButtons(actions, (type) => {
    onAction(type);
  });
  const meLabel = callQueueName ? '' : `(${t('me')})`;

  return {
    header: (
      <div className="h-[72px] flex items-center px-2 gap-1 pt-2">
        <PageHeaderBackButton onClick={goBack} className="flex-none" />

        <div
          className="flex gap-2 items-center flex-auto overflow-hidden"
          data-sign="contactDetail"
        >
          <Avatar size="large" />

          <div className="ml-1 flex flex-col flex-auto overflow-hidden">
            <h2
              className="text-neutral-b0 truncate typography-subtitle flex items-center gap-1"
              data-sign="displayName"
            >
              <DisplayName
                displayControl={{
                  maybe: true,
                  matchCounts: true,
                }}
              />
            </h2>

            {!isConferenceCall && (
              <div
                className="flex gap-1 items-center"
                data-sign="displayNumber"
              >
                <p
                  className="typography-descriptor text-neutral-b2 truncate"
                  title={displayPhoneNumber}
                >
                  {displayPhoneNumber}
                </p>
                {formattedPhoneNumber && (
                  <CopyIconButtonSpring text={formattedPhoneNumber} />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-1 items-center flex-none">
          <ActionMenuList
            buttons={buttons}
            displayCount={2}
            variant="plain"
            propsMap={{
              all: { variant: 'contained' },
            }}
            moreButtonProps={{ variant: 'contained' }}
          />
        </div>
      </div>
    ),
    info: (
      <div className="px-4 py-2" data-sign="callDetailInfo">
        <Block className="mb-2">
          <BlockHeader>
            <span className="typography-descriptorMini">{myCallerIdTitle}</span>
            <div className="text-neutral-b2 typography-mainText">
              {myCallerId} {meLabel}
            </div>
          </BlockHeader>
        </Block>
        <Block className="mb-2">
          <BlockHeader data-sign="time-and-status">
            <p className="typography-descriptorMini">{startTime}</p>
            {Status && (
              <div className="typography-mainText">
                <Status />
              </div>
            )}
          </BlockHeader>
        </Block>
      </div>
    ),
  };
};

export const CallDetailPage: FunctionComponent<CallDetailViewPanelProps> = (
  props,
) => {
  const { children, footer } = props;

  const { header, info } = useCallDetailPageContent(props);

  return (
    <div data-sign="CallDetailPage" className="flex flex-col h-full">
      <AppHeaderNav override resetImmediately>
        {header}
      </AppHeaderNav>
      {/* clear the footer nav by default */}
      {info}
      <div
        data-sign="log-notes-transcript-section"
        className="flex-1 flex flex-col"
      >
        {children}
      </div>
      <AppFooterNav>{footer}</AppFooterNav>
    </div>
  );
};

CallDetailPage.displayName = 'CallDetailPage';
