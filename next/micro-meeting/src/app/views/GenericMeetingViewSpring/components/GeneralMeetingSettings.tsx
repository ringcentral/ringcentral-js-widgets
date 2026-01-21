import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { LockMd } from '@ringcentral/spring-icon';
import {
  Block,
  Divider,
  Option,
  Select,
  Switch,
  Link,
  Tooltip,
  Icon,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { useState } from 'react';

import { getWhoCanJoinDisplayText } from '../../shared/meeting-utils';
import i18n from '../i18n';

import {
  GeneralMeetingSettingsProps,
  GeneralMeetingSettingsFunctions,
} from './GeneralMeetingSettings.interface';
import { PasswordEditDialog } from './PasswordEditDialog';

export const GeneralMeetingSettings: React.FC<
  GeneralMeetingSettingsProps & GeneralMeetingSettingsFunctions
> = ({
  // Props
  requirePassword,
  meetingPassword,
  whoCanJoin,
  useWaitingRoom,
  waitingRoomParticipants,
  startMeetingAfterJoin,
  whoCanJoinOptions,
  waitingRoomOptions,
  disabled,
  // Disabled States
  isJoinBeforeHostDisabled,
  isWaitingRoomDisabled,
  isWaitingRoomTypeDisabled,
  isAuthenticatedCanJoinDisabled,
  isAuthUserTypeDisabled,
  isRequirePasswordDisabled,
  isEditPasswordDisabled,
  // Locked States
  isRequirePasswordLocked = false,
  isJoinBeforeHostLocked = false,
  isWaitingRoomLocked = false,
  isAuthUserTypeLocked = false,
  // Functions
  onRequirePasswordChange,
  onPasswordChange,
  onWhoCanJoinChange,
  onUseWaitingRoomChange,
  onWaitingRoomParticipantsChange,
  onStartMeetingAfterJoinChange,
  // Custom props
  className,
  brandConfig,
}) => {
  const { t } = useLocale(i18n);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  const handleEditPassword = () => {
    setIsPasswordDialogOpen(true);
  };

  const handlePasswordUpdate = (newPassword: string) => {
    onPasswordChange(newPassword);
  };

  const handlePasswordDialogClose = () => {
    setIsPasswordDialogOpen(false);
  };

  const renderLockIcon = (isLocked: boolean) => {
    if (!isLocked) return null;

    return (
      <Tooltip title={t('adminLockedSetting')}>
        <Icon size="small" symbol={LockMd} data-sign="lockIcon" />
      </Tooltip>
    );
  };

  return (
    <>
      <Block
        bordered
        borderRadius="small"
        padding={false}
        className={clsx('w-full mx-auto', className)}
        classes={{
          root: 'overflow-visible p-3',
        }}
      >
        <div className="flex flex-col gap-4 w-full">
          {/* Require password section */}
          <div className="flex gap-3" data-sign="requirePasswordSection">
            <div className="flex flex-col flex-1 gap-1">
              <div className="typography-subtitleMini text-neutral-b0 flex items-center gap-1">
                {t('requirePassword')}
                {renderLockIcon(isRequirePasswordLocked)}
              </div>

              <div className="flex flex-col gap-1">
                <div className="typography-descriptor text-neutral-b2">
                  {t('requirePasswordDescription')}
                </div>
                {requirePassword && !isEditPasswordDisabled && (
                  <div className="flex items-center gap-2">
                    <div
                      className="typography-descriptorMini text-neutral-b2"
                      data-sign="password"
                    >
                      {t('password')}: {meetingPassword}
                    </div>
                    {!disabled && (
                      <Link
                        data-sign="editPassword"
                        onClick={handleEditPassword}
                        className="typography-descriptorMini"
                      >
                        {t('edit')}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <Switch
                checked={requirePassword}
                onChange={(e) => onRequirePasswordChange(e.target.checked)}
                disabled={
                  disabled ||
                  isRequirePasswordDisabled ||
                  isRequirePasswordLocked
                }
                data-sign="requirePassword"
              />
            </div>
          </div>

          <Divider />

          {/* Manage who can join section */}
          <div
            className="flex flex-col gap-1"
            data-sign="manageWhoCanJoinSection"
          >
            <div className="flex items-center justify-between">
              <div className="typography-subtitleMini text-neutral-b0 flex items-center gap-1">
                {t('manageWhoCanJoin')}
                {renderLockIcon(isAuthUserTypeLocked)}
              </div>
            </div>
            <Select
              variant="outlined"
              size="medium"
              data-sign="manageWhoCanJoinField"
              value={getWhoCanJoinDisplayText(whoCanJoin, brandConfig)}
              onChange={(e) => onWhoCanJoinChange(e.target.value)}
              className="w-full"
              disabled={
                disabled || isAuthUserTypeDisabled || isAuthUserTypeLocked
              }
            >
              {whoCanJoinOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {t(option.label as keyof typeof t)}
                </Option>
              ))}
            </Select>
          </div>

          <Divider />

          {/* Use waiting room section */}
          <div
            className="flex flex-col gap-4"
            data-sign="useWaitingRoomSection"
          >
            <div className="flex gap-3">
              <div className="flex flex-col flex-1">
                <div className="typography-subtitleMini text-neutral-b0 flex items-center gap-1">
                  {t('useWaitingRoom')}
                  {renderLockIcon(isWaitingRoomLocked)}
                </div>

                <div className="typography-descriptor text-neutral-b2">
                  {t('useWaitingRoomDescription')}
                </div>
              </div>
              <div className="flex items-center">
                <Switch
                  checked={useWaitingRoom}
                  onChange={(e) => onUseWaitingRoomChange(e.target.checked)}
                  disabled={
                    disabled || isWaitingRoomDisabled || isWaitingRoomLocked
                  }
                  data-sign="enableWaitingRoom"
                />
              </div>
            </div>
            {useWaitingRoom && (
              <div>
                <Select
                  variant="outlined"
                  data-sign="waitingRoomField"
                  size="medium"
                  value={t(waitingRoomParticipants as keyof typeof t)}
                  className="w-full"
                  onChange={(e) =>
                    onWaitingRoomParticipantsChange(e.target.value)
                  }
                  disabled={
                    disabled || isWaitingRoomTypeDisabled || isWaitingRoomLocked
                  }
                >
                  {waitingRoomOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {t(option.label as keyof typeof t)}
                    </Option>
                  ))}
                </Select>
              </div>
            )}
          </div>

          <Divider />

          {/* Start meeting after you join section */}
          <div className="flex gap-3">
            <div
              className="flex flex-col flex-1"
              data-sign="startMeetingAfterJoinSection"
            >
              <div className="typography-subtitleMini text-neutral-b0 flex items-center gap-1">
                {t('startMeetingAfterJoin')}
                {renderLockIcon(isJoinBeforeHostLocked)}
              </div>

              <div className="flex flex-col gap-1">
                <div className="typography-descriptor text-neutral-b2">
                  {t('startMeetingAfterJoinDescription')}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Switch
                checked={startMeetingAfterJoin}
                onChange={(e) =>
                  onStartMeetingAfterJoinChange(e.target.checked)
                }
                disabled={
                  disabled || isJoinBeforeHostDisabled || isJoinBeforeHostLocked
                }
                data-sign="startMeetingAfterJoin"
              />
            </div>
          </div>
        </div>
      </Block>

      <PasswordEditDialog
        open={isPasswordDialogOpen}
        currentPassword={meetingPassword}
        onClose={handlePasswordDialogClose}
        onUpdate={handlePasswordUpdate}
      />
    </>
  );
};
