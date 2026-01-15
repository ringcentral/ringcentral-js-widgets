import type {
  RcvItemType,
  RcvWaitingRoomModeProps,
} from '@ringcentral-integration/commons/modules/RcVideo';
import {
  ALLOW_MEETING_ACCESS,
  RCV_ITEM_NAME,
  RCV_WAITING_ROOM_MODE,
} from '@ringcentral-integration/commons/modules/RcVideo';
import {
  RcBox,
  RcLink,
  RcMenuItem,
  RcSelect,
  RcSwitch,
  RcTypography,
} from '@ringcentral/juno';
import React, { useEffect, useCallback } from 'react';

import { VideoPanelProps } from '../GenericMeetingPanel/interface';

import { AdaptiveTypography } from './AdaptiveTypography';
import { t } from './i18n';
import {
  StyledListItem,
  StyledRcCard,
  StyledListItemText,
  StyledPasswordDescription,
  StyledVerticalListItem,
} from './styled';
import styles from './styles.scss';

type MeetingSettingsCardProps = Pick<
  VideoPanelProps,
  | 'meeting'
  | 'brandConfig'
  | 'onPasswordChangeClick'
  | 'updateMeetingSettings'
  | 'trackSettingChanges'
  | 'isJoinBeforeHostDisabled'
  | 'isWaitingRoomTypeDisabled'
  | 'isWaitingRoomDisabled'
  | 'isRequirePasswordDisabled'
  | 'isWaitingRoomNotCoworkerDisabled'
  | 'isWaitingRoomGuestDisabled'
  | 'isAuthenticatedCanJoinDisabled'
  | 'useSimpleRcv'
> & {
  isEditPasswordDisabled?: boolean;
};

export const MeetingSettingsCard: React.FC<MeetingSettingsCardProps> = (
  props,
) => {
  const {
    meeting,
    brandConfig,
    onPasswordChangeClick,
    updateMeetingSettings,
    trackSettingChanges,
    isJoinBeforeHostDisabled,
    isWaitingRoomTypeDisabled,
    isWaitingRoomDisabled,
    isRequirePasswordDisabled,
    isEditPasswordDisabled,
    isWaitingRoomNotCoworkerDisabled,
    isWaitingRoomGuestDisabled,
    isAuthenticatedCanJoinDisabled,
    useSimpleRcv = false,
  } = props;

  const update = useCallback(
    (options: any, itemName?: RcvItemType) => {
      updateMeetingSettings({
        ...meeting,
        ...options,
      });
      trackSettingChanges && itemName && trackSettingChanges(itemName);
    },
    [meeting, updateMeetingSettings, trackSettingChanges],
  );

  const allowMeetingAccess = !meeting.isOnlyAuthUserJoin
    ? ALLOW_MEETING_ACCESS.ANYONE_WITH_LINK
    : meeting.isOnlyCoworkersJoin
    ? ALLOW_MEETING_ACCESS.SIGNED_IN_CO_WORKERS
    : ALLOW_MEETING_ACCESS.SIGNED_IN_USERS;

  const waitingRoomModeValue = meeting.waitingRoomMode;

  // Determine if this is a new meeting vs existing meeting
  const isNewMeeting = !meeting.id;
  useEffect(() => {
    if (!useSimpleRcv) return;

    const updates: any = {};

    // Migrate "Only RingCentral accounts" → "Only my coworkers"
    // Only if: has legacy value AND not locked by admin
    if (
      isNewMeeting &&
      meeting.isOnlyAuthUserJoin &&
      !meeting.isOnlyCoworkersJoin &&
      !meeting.settingLock?.isOnlyAuthUserJoin
    ) {
      updates.isOnlyAuthUserJoin = true;
      updates.isOnlyCoworkersJoin = true;
    }

    // Migrate "For anyone not signed in" → "For anyone outside my company"
    // Only if: NEW meeting AND has legacy value AND not locked by admin
    if (
      isNewMeeting &&
      meeting.waitingRoomMode === RCV_WAITING_ROOM_MODE.guests &&
      !meeting.settingLock?.waitingRoomMode
    ) {
      updates.waitingRoomMode = RCV_WAITING_ROOM_MODE.notcoworker;
    }

    // Only update if there are actual migrations needed
    if (Object.keys(updates).length > 0) {
      update(updates);
    }
  }, [
    useSimpleRcv,
    isNewMeeting,
    meeting.isOnlyAuthUserJoin,
    meeting.isOnlyCoworkersJoin,
    meeting.waitingRoomMode,
    meeting.settingLock?.isOnlyAuthUserJoin,
    meeting.settingLock?.waitingRoomMode,
    update,
  ]);

  return (
    <StyledRcCard variant="outlined">
      <StyledListItem
        canHover={false}
        button={false}
        divider
        data-sign="passwordField"
        disabled={isRequirePasswordDisabled}
      >
        <StyledListItemText
          primary={
            <AdaptiveTypography
              title={t('requirePassword')}
              isLock={meeting.settingLock?.isMeetingSecret}
            />
          }
          secondary={
            <StyledPasswordDescription
              display="flex"
              flexDirection="column"
              maxWidth="230px"
            >
              {t('requirePasswordDescription')}
              {meeting.isMeetingSecret && (
                <RcBox
                  display="flex"
                  alignItems="center"
                  data-sign="editPasswordField"
                >
                  {t('password')}&nbsp;
                  <RcTypography
                    variant="caption1"
                    color="neutral.b04"
                    weight="bold"
                  >
                    {meeting.meetingPassword}
                  </RcTypography>
                  <RcLink
                    variant="caption1"
                    underline
                    onClick={onPasswordChangeClick}
                    disabled={isEditPasswordDisabled}
                  >
                    {t('edit')}
                  </RcLink>
                </RcBox>
              )}
            </StyledPasswordDescription>
          }
        />
        <RcSwitch
          data-sign="requirePassword"
          checked={meeting.isMeetingSecret}
          disabled={isRequirePasswordDisabled}
          onChange={() => {
            const next = !meeting.isMeetingSecret;
            update(
              {
                isMeetingSecret: next,
              },
              RCV_ITEM_NAME.isMeetingSecret,
            );
          }}
        />
      </StyledListItem>

      <StyledVerticalListItem
        canHover={false}
        button={false}
        divider
        data-sign="allowMeetingAccessField"
        disabled={isAuthenticatedCanJoinDisabled}
      >
        <StyledListItemText
          primary={
            <AdaptiveTypography
              title={t('allowMeetingAccess')}
              isLock={meeting.settingLock?.isOnlyAuthUserJoin}
            />
          }
        />
        <RcSelect
          size="large"
          variant="box"
          fullWidth
          data-sign="allowMeetingAccess"
          value={allowMeetingAccess}
          onOpen={() => {
            // When user opens dropdown for existing meeting with legacy value,
            // automatically migrate it to the new equivalent
            if (
              useSimpleRcv &&
              meeting.id &&
              meeting.isOnlyAuthUserJoin &&
              !meeting.isOnlyCoworkersJoin
            ) {
              update(
                {
                  isOnlyAuthUserJoin: true,
                  isOnlyCoworkersJoin: true, // Auto-migrate to "Only my coworkers"
                },
                RCV_ITEM_NAME.isOnlyAuthUserJoin,
              );
            }
          }}
          onChange={(e) => {
            const selectedValue = e.target.value;

            switch (selectedValue) {
              case ALLOW_MEETING_ACCESS.ANYONE_WITH_LINK:
                update(
                  {
                    isOnlyAuthUserJoin: false,
                    isOnlyCoworkersJoin: false,
                  },
                  RCV_ITEM_NAME.isOnlyAuthUserJoin,
                );
                break;
              case ALLOW_MEETING_ACCESS.SIGNED_IN_CO_WORKERS:
                update(
                  {
                    isOnlyAuthUserJoin: true,
                    isOnlyCoworkersJoin: true,
                  },
                  RCV_ITEM_NAME.isOnlyAuthUserJoin,
                );
                break;
            }
          }}
          disabled={isAuthenticatedCanJoinDisabled}
        >
          <RcMenuItem
            value={ALLOW_MEETING_ACCESS.ANYONE_WITH_LINK}
            title={t('anyoneWithLink')}
          >
            {t('anyoneWithLink')}
          </RcMenuItem>
          {/* Show "Only RingCentral accounts" option when:
              1. Old UI, OR
              2. Admin-locked, OR
              3. Existing meeting currently has this legacy value (so dropdown shows what's selected) */}
          {(!useSimpleRcv ||
            meeting.settingLock?.isOnlyAuthUserJoin ||
            (meeting.id &&
              meeting.isOnlyAuthUserJoin &&
              !meeting.isOnlyCoworkersJoin)) && (
            <RcMenuItem
              value={ALLOW_MEETING_ACCESS.SIGNED_IN_USERS}
              // @ts-expect-error
              title={t('signedInUsers', { shortName: brandConfig.shortName })}
            >
              {/* @ts-expect-error */}
              {t('signedInUsers', { shortName: brandConfig.shortName })}
            </RcMenuItem>
          )}
          <RcMenuItem
            value={ALLOW_MEETING_ACCESS.SIGNED_IN_CO_WORKERS}
            title={t('signedInCoWorkers')}
          >
            {t('signedInCoWorkers')}
          </RcMenuItem>
        </RcSelect>
      </StyledVerticalListItem>

      <StyledListItem
        component="div"
        canHover={false}
        button={false}
        divider
        data-sign="waitingRoomField"
        disabled={isWaitingRoomDisabled}
      >
        <RcBox display="flex" flexDirection="column" width="100%">
          <RcBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <StyledListItemText
              primary={
                <AdaptiveTypography
                  title={t('waitingRoomTitle')}
                  isLock={meeting.settingLock?.waitingRoomMode}
                />
              }
              secondary={t('waitingRoomDescription')}
            />
            <RcSwitch
              data-sign="enableWaitingRoom"
              checked={!!meeting.waitingRoomMode}
              disabled={isWaitingRoomDisabled}
              onChange={(ev, checked) => {
                update(
                  {
                    waitingRoomMode: checked
                      ? RCV_WAITING_ROOM_MODE.notcoworker
                      : RCV_WAITING_ROOM_MODE.off,
                  },
                  RCV_ITEM_NAME.waitingRoomMode,
                );
              }}
            />
          </RcBox>
          {!!meeting.waitingRoomMode && (
            <RcSelect
              size="large"
              variant="box"
              data-sign="waitingRoom"
              className={styles.boxSelect}
              fullWidth
              disabled={isWaitingRoomTypeDisabled}
              onOpen={() => {
                // When user opens dropdown for existing meeting with legacy value,
                // automatically migrate it to the new equivalent
                if (
                  useSimpleRcv &&
                  meeting.id &&
                  meeting.waitingRoomMode === RCV_WAITING_ROOM_MODE.guests
                ) {
                  update(
                    {
                      waitingRoomMode: RCV_WAITING_ROOM_MODE.notcoworker, // Auto-migrate to "For anyone outside my company"
                    },
                    RCV_ITEM_NAME.waitingRoomType,
                  );
                }
              }}
              onChange={(e) => {
                const waitingRoomValue = e.target
                  .value as RcvWaitingRoomModeProps;

                update(
                  {
                    waitingRoomMode: waitingRoomValue,
                  },
                  RCV_ITEM_NAME.waitingRoomType,
                );
              }}
              value={waitingRoomModeValue}
            >
              <RcMenuItem
                data-sign="waitingRoomAll"
                value={RCV_WAITING_ROOM_MODE.all}
                className={styles.boxSelectMenuItem}
                title={t('waitingRoomAll')}
              >
                {t('waitingRoomAll')}
              </RcMenuItem>
              <RcMenuItem
                data-sign="waitingRoomNotCoworker"
                disabled={isWaitingRoomNotCoworkerDisabled}
                value={RCV_WAITING_ROOM_MODE.notcoworker}
                className={styles.boxSelectMenuItem}
                title={t('waitingRoomNotCoworker')}
              >
                {t('waitingRoomNotCoworker')}
              </RcMenuItem>
              {/* Show "For anyone not signed in" option when:
                  1. Old UI, OR
                  2. Admin-locked, OR
                  3. Existing meeting currently has this legacy value (so dropdown shows what's selected) */}
              {(!useSimpleRcv ||
                meeting.settingLock?.waitingRoomMode ||
                (meeting.id &&
                  meeting.waitingRoomMode ===
                    RCV_WAITING_ROOM_MODE.guests)) && (
                <RcMenuItem
                  data-sign="waitingRoomGuest"
                  disabled={isWaitingRoomGuestDisabled}
                  value={RCV_WAITING_ROOM_MODE.guests}
                  className={styles.boxSelectMenuItem}
                  title={t('waitingRoomGuest')}
                >
                  {t('waitingRoomGuest')}
                </RcMenuItem>
              )}
            </RcSelect>
          )}
        </RcBox>
      </StyledListItem>

      <StyledListItem
        canHover={false}
        button={false}
        data-sign="jbhField"
        disabled={isJoinBeforeHostDisabled}
      >
        <StyledListItemText
          primary={
            <AdaptiveTypography
              title={t('onlyJoinAfterMe')}
              isLock={meeting.settingLock?.allowJoinBeforeHost}
            />
          }
          secondary={t('allowJoinBeforeHostDescription')}
        />
        <RcSwitch
          data-sign="allowJoinBeforeHost"
          checked={!meeting.allowJoinBeforeHost}
          disabled={isJoinBeforeHostDisabled}
          onChange={() => {
            update(
              {
                allowJoinBeforeHost: !meeting.allowJoinBeforeHost,
              },
              RCV_ITEM_NAME.allowJoinBeforeHost,
            );
          }}
        />
      </StyledListItem>
    </StyledRcCard>
  );
};
