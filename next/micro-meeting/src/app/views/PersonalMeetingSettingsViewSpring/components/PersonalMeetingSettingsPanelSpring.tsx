import { AppHeaderNav } from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { PageHeader } from '@ringcentral-integration/next-widgets/components';
import { Block, Skeleton, SkeletonContainer } from '@ringcentral/spring-ui';
import React, { useState } from 'react';

import { GeneralMeetingSettings } from '../../GenericMeetingViewSpring/components/GeneralMeetingSettings';
import {
  GeneralMeetingSettingsProps,
  GeneralMeetingSettingsFunctions,
} from '../../GenericMeetingViewSpring/components/GeneralMeetingSettings.interface';
import i18n from '../../GenericMeetingViewSpring/i18n';
import {
  PersonalMeetingSettingsPanelSpringProps,
  PersonalMeetingSettingsPanelSpringFunctions,
} from '../PersonalMeetingSettings.view.interface';

// Skeleton components for loading states
const PersonalMeetingSettingsSkeleton: React.FC = () => (
  <Block
    bordered
    borderRadius="small"
    padding
    className="w-full mx-auto"
    classes={{
      root: 'overflow-visible',
    }}
  >
    <div className="flex flex-col gap-4">
      {/* Description */}
      <Skeleton variant="text" className="w-full h-4" />

      {/* Require Password */}
      <div className="flex gap-3">
        <div className="flex flex-col flex-1">
          <Skeleton variant="text" className="w-32 h-5" />
          <Skeleton variant="text" className="w-48 h-4 mt-1" />
        </div>
        <Skeleton variant="rectangular" className="w-12 h-6" />
      </div>

      {/* Who Can Join */}
      <div className="flex gap-3">
        <div className="flex flex-col flex-1">
          <Skeleton variant="text" className="w-24 h-5" />
          <Skeleton variant="rectangular" className="w-full h-12 mt-1" />
        </div>
      </div>

      {/* Waiting Room */}
      <div className="flex gap-3">
        <div className="flex flex-col flex-1">
          <Skeleton variant="text" className="w-28 h-5" />
          <Skeleton variant="text" className="w-40 h-4 mt-1" />
        </div>
        <Skeleton variant="rectangular" className="w-12 h-6" />
      </div>

      {/* Start Meeting After Join */}
      <div className="flex gap-3">
        <div className="flex flex-col flex-1">
          <Skeleton variant="text" className="w-36 h-5" />
          <Skeleton variant="text" className="w-44 h-4 mt-1" />
        </div>
        <Skeleton variant="rectangular" className="w-12 h-6" />
      </div>
    </div>
  </Block>
);

export const PersonalMeetingSettingsPanelSpring: React.FC<
  PersonalMeetingSettingsPanelSpringProps &
    PersonalMeetingSettingsPanelSpringFunctions
> = (props) => {
  const { t } = useLocale(i18n);
  const {
    disabled,
    personalMeetingLink,
    onBackClick,
    isLoading,
    // Extract props needed for GeneralMeetingSettings
    requirePassword,
    meetingPassword,
    whoCanJoin,
    brandConfig,
    useWaitingRoom,
    waitingRoomParticipants,
    startMeetingAfterJoin,
    whoCanJoinOptions,
    waitingRoomOptions,
    isJoinBeforeHostDisabled,
    isWaitingRoomDisabled,
    isWaitingRoomTypeDisabled,
    isAuthenticatedCanJoinDisabled,
    isAuthUserTypeDisabled,
    isRequirePasswordDisabled,
    // Extract lock properties
    isRequirePasswordLocked,
    isJoinBeforeHostLocked,
    isWaitingRoomLocked,
    isAuthUserTypeLocked,
    onRequirePasswordChange,
    onPasswordChange,
    onWhoCanJoinChange,
    onUseWaitingRoomChange,
    onWaitingRoomParticipantsChange,
    onStartMeetingAfterJoinChange,
  } = props;

  // Create props for GeneralMeetingSettings
  const generalMeetingSettingsProps: GeneralMeetingSettingsProps = {
    requirePassword,
    meetingPassword,
    whoCanJoin,
    useWaitingRoom,
    waitingRoomParticipants,
    startMeetingAfterJoin,
    whoCanJoinOptions,
    waitingRoomOptions,
    disabled,
    isJoinBeforeHostDisabled,
    isWaitingRoomDisabled,
    isWaitingRoomTypeDisabled,
    isAuthenticatedCanJoinDisabled,
    isAuthUserTypeDisabled,
    isRequirePasswordDisabled,
    // Add lock properties
    isRequirePasswordLocked: props.isRequirePasswordLocked,
    isJoinBeforeHostLocked: props.isJoinBeforeHostLocked,
    isWaitingRoomLocked: props.isWaitingRoomLocked,
    isAuthUserTypeLocked: props.isAuthUserTypeLocked,
    brandConfig,
  };

  const generalMeetingSettingsFunctions: GeneralMeetingSettingsFunctions = {
    onRequirePasswordChange,
    onPasswordChange,
    onWhoCanJoinChange,
    onUseWaitingRoomChange,
    onWaitingRoomParticipantsChange,
    onStartMeetingAfterJoinChange,
  };

  return (
    <div className="flex flex-col h-full">
      <AppHeaderNav override>
        <PageHeader onBackClick={onBackClick}>
          <span
            className="sui-text sui-text-root truncate"
            title={t('personalMeetingSettings')}
          >
            {t('personalMeetingSettings')}
          </span>
        </PageHeader>
      </AppHeaderNav>
      <div className="flex flex-col flex-auto overflow-y-auto overflow-x-hidden px-3 py-3 gap-2">
        {isLoading ? (
          <SkeletonContainer>
            <PersonalMeetingSettingsSkeleton />
          </SkeletonContainer>
        ) : (
          <>
            <div className="typography-descriptor text-neutral-b2">
              {t('personalMeetingSettingsDescription')}
            </div>
            <GeneralMeetingSettings
              {...generalMeetingSettingsProps}
              {...generalMeetingSettingsFunctions}
            />
          </>
        )}
      </div>
    </div>
  );
};
