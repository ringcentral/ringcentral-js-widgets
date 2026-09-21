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

const variantConfig = {
  compact: {
    blockBorderRadius: 'small',
    blockPadding: 'p-3',
    mainContainerGap: 'gap-2',
    titleLockIconGap: 'gap-1',
    dropdownStyle: {
      variant: 'outlined',
      size: 'medium',
      className: '',
      classes: undefined,
    },
    requirePasswordSection: {
      contentSwitchGap: 'gap-3',
      leftContentGap: 'gap-1',
      descriptionGap: 'gap-1',
      passwordDescription: '',
      passwordRowGap: 'gap-2',
    },
    manageWhoCanJoinSection: {
      outerSpacing: 'gap-1',
    },
    useWaitingRoomSection: {
      contentSwitchGap: 'gap-3',
      outerSpacing: 'gap-2',
    },
    startMeetingAfterJoinSection: {
      contentSwitchGap: 'gap-3',
    },
  },
  spacious: {
    blockBorderRadius: 'xsmall',
    blockPadding: 'px-3 py-4',
    mainContainerGap: 'gap-2',
    titleLockIconGap: 'gap-1',
    dropdownStyle: {
      variant: 'contained',
      size: 'large',
      className: '',
      classes: {
        content: 'sui-block-border-radius-xsmall',
      },
    },
    requirePasswordSection: {
      contentSwitchGap: 'gap-3',
      leftContentGap: '',
      descriptionGap: '',
      passwordDescription: 'mb-1',
      passwordRowGap: 'mt-1 gap-2.5',
    },
    manageWhoCanJoinSection: {
      outerSpacing: 'gap-1 py-1',
    },
    useWaitingRoomSection: {
      contentSwitchGap: 'gap-2',
      outerSpacing: 'gap-4 py-1',
    },
    startMeetingAfterJoinSection: {
      contentSwitchGap: 'gap-3 pt-1',
    },
  },
} as const;

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
  isCompact = false, //use compact dialog for edit password dialog
  variant = 'compact',
}) => {
  const { t } = useLocale(i18n);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const styles = variantConfig[variant];

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
        borderRadius={styles.blockBorderRadius}
        padding={false}
        className={clsx('w-full mx-auto', className)}
        classes={{
          root: clsx('overflow-visible', styles.blockPadding),
        }}
      >
        <div className={clsx('flex flex-col w-full', styles.mainContainerGap)}>
          {/* Require password section */}
          <div
            className={clsx(
              'flex',
              styles.requirePasswordSection.contentSwitchGap,
            )}
            data-sign="requirePasswordSection"
          >
            <div
              className={clsx(
                'flex flex-col flex-1',
                styles.requirePasswordSection.leftContentGap,
              )}
            >
              <div
                className={clsx(
                  'typography-subtitleMini text-neutral-b0 flex items-center',
                  styles.titleLockIconGap,
                )}
              >
                {t('requirePassword')}
                {renderLockIcon(isRequirePasswordLocked)}
              </div>

              <div
                className={clsx(
                  'flex flex-col',
                  styles.requirePasswordSection.descriptionGap,
                )}
              >
                <div
                  className={clsx(
                    'typography-descriptor text-neutral-b2',
                    styles.requirePasswordSection.passwordDescription,
                  )}
                >
                  {t('requirePasswordDescription')}
                </div>
                {requirePassword && !isEditPasswordDisabled && (
                  <div
                    className={clsx(
                      'flex items-center',
                      styles.requirePasswordSection.passwordRowGap,
                    )}
                  >
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
            className={clsx(
              'flex flex-col',
              styles.manageWhoCanJoinSection.outerSpacing,
            )}
            data-sign="manageWhoCanJoinSection"
          >
            <div className="flex items-center justify-between">
              <div
                className={clsx(
                  'typography-subtitleMini text-neutral-b0 flex items-center',
                  styles.titleLockIconGap,
                )}
              >
                {t('manageWhoCanJoin')}
                {renderLockIcon(isAuthUserTypeLocked)}
              </div>
            </div>
            <Select
              variant={styles.dropdownStyle.variant}
              size={styles.dropdownStyle.size}
              data-sign="manageWhoCanJoinField"
              value={getWhoCanJoinDisplayText(whoCanJoin, brandConfig)}
              onChange={(e) => onWhoCanJoinChange(e.target.value)}
              className={clsx('w-full', styles.dropdownStyle.className)}
              classes={styles.dropdownStyle.classes}
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
            className={clsx(
              'flex flex-col',
              styles.useWaitingRoomSection.outerSpacing,
            )}
            data-sign="useWaitingRoomSection"
          >
            <div
              className={clsx(
                'flex',
                styles.useWaitingRoomSection.contentSwitchGap,
              )}
            >
              <div className="flex flex-col flex-1">
                <div
                  className={clsx(
                    'typography-subtitleMini text-neutral-b0 flex items-center',
                    styles.titleLockIconGap,
                  )}
                >
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
                  variant={styles.dropdownStyle.variant}
                  size={styles.dropdownStyle.size}
                  data-sign="waitingRoomField"
                  value={t(waitingRoomParticipants as keyof typeof t)}
                  className={clsx('w-full', styles.dropdownStyle.className)}
                  classes={styles.dropdownStyle.classes}
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
          <div
            className={clsx(
              'flex',
              styles.startMeetingAfterJoinSection.contentSwitchGap,
            )}
          >
            <div
              className="flex flex-col flex-1"
              data-sign="startMeetingAfterJoinSection"
            >
              <div
                className={clsx(
                  'typography-subtitleMini text-neutral-b0 flex items-center',
                  styles.titleLockIconGap,
                )}
              >
                {t('startMeetingAfterJoin')}
                {renderLockIcon(isJoinBeforeHostLocked)}
              </div>

              <div className={clsx('flex flex-col')}>
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
        isCompact={isCompact}
      />
    </>
  );
};
