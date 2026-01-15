import type { RcvDelegator } from '@ringcentral-integration/commons/modules/RcVideo';
import {
  ASSISTED_USERS_MYSELF,
  RCV_ITEM_NAME,
} from '@ringcentral-integration/commons/modules/RcVideo';
import {
  RcIcon,
  RcLink,
  RcListItemText,
  RcMenuItem,
  RcSelect,
  RcSwitch,
  RcTypography,
  RcBox,
  RcAlert,
  RcIconButton,
} from '@ringcentral/juno';
import { ChevronLeft, Close, InfoBorder } from '@ringcentral/juno-icon';
import type { FunctionComponent } from 'react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import FormattedMessage from '../FormattedMessage';
import { VideoPanelProps } from '../GenericMeetingPanel';
import { MigrateToPluginAlert } from '../MeetingAlert';
import { ExtendedTooltip } from '../MeetingConfigsV2/ExtendedTooltip';
import { SpinnerOverlay } from '../SpinnerOverlay';

import { MeetingSettingsCard } from './MeetingSettingsCard';
import { RCV_SCHEDULE_ON_BEHALF_GUIDANCE_LINK } from './constants';
import { t } from './i18n';
import { StyledListItem, StyledRcCard, TitleWrapper } from './styled';
import styles from './styles.scss';

export const SchedulerMeetingPanel: FunctionComponent<VideoPanelProps> = (
  props,
) => {
  const {
    disabled,
    currentLocale,
    meeting,
    init,
    enablePersonalMeeting,
    isPersonalMeetingDisabled,
    personalMeetingId,
    personalMeetingName,
    personalMeetingLink,
    switchUsePersonalMeetingId,
    onCloseMigrationAlert,
    delegators,
    showScheduleOnBehalf,
    updateScheduleFor,
    showSpinnerInConfigPanel,
    brandConfig,
    showMigrationAlert,
    onPasswordChangeClick,
    updateMeetingSettings,
    updatePersonalMeetingSettings,
    trackSettingChanges,
    isJoinBeforeHostDisabled,
    isWaitingRoomTypeDisabled,
    isWaitingRoomDisabled,
    isRequirePasswordDisabled,
    isWaitingRoomNotCoworkerDisabled,
    isWaitingRoomGuestDisabled,
    isAuthenticatedCanJoinDisabled,
    personalMeeting,
    useSimpleRcv = false,
  } = props;

  useEffect(() => {
    if (init) {
      init();
    }
  }, []);

  /* Scrollbar */
  const configRef = useRef<HTMLDivElement>(null);
  const [hasScrollBar, setHasScrollBar] = useState<boolean>(false);
  useEffect(() => {
    setHasScrollBar(
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      configRef.current.scrollHeight > configRef.current.clientHeight,
    );
  }, []);

  const showPersonalMeeting = useMemo(
    () => enablePersonalMeeting && (personalMeetingId || personalMeetingName),
    [enablePersonalMeeting, personalMeetingId, personalMeetingName],
  );

  const [showAssistedUserAlert, setShowAssistedUserAlert] = useState(true);
  const assistedUser = useMemo(() => {
    return (
      delegators?.find((item) => item.extensionId === meeting.extensionId) ||
      delegators?.[0]
    );
  }, [delegators, meeting.extensionId]);

  useEffect(() => {
    if (!showScheduleOnBehalf) {
      return;
    }

    setShowAssistedUserAlert(assistedUser!.name !== ASSISTED_USERS_MYSELF);
  }, [assistedUser, showScheduleOnBehalf]);

  const [showEditPMI, setShowEditPMI] = useState(false);

  // don't show password in the link
  const linkWithoutPassword = personalMeetingLink?.replace(/\?pw=[^&]+/, '');

  if (showEditPMI) {
    return (
      <div
        ref={configRef}
        className={styles.videoConfig}
        data-sign="videoConfigsPanel"
      >
        <TitleWrapper data-sign="header">
          <RcBox display="flex" alignItems="center" alignContent="center">
            <RcIconButton
              data-sign="backButton"
              size="medium"
              symbol={ChevronLeft}
              variant="plain"
              onClick={() => setShowEditPMI(false)}
              className={styles.backButton}
            />
            <RcTypography variant="title2">
              {t('pmiSettingsTitle')}
            </RcTypography>
          </RcBox>
          <RcTypography variant="caption1" color="neutral.b04">
            {t('pmiSettingsDescription')}
          </RcTypography>
        </TitleWrapper>

        <MeetingSettingsCard
          meeting={personalMeeting!}
          brandConfig={brandConfig}
          onPasswordChangeClick={onPasswordChangeClick}
          updateMeetingSettings={updatePersonalMeetingSettings!}
          trackSettingChanges={trackSettingChanges}
          isJoinBeforeHostDisabled={isJoinBeforeHostDisabled}
          isWaitingRoomTypeDisabled={isWaitingRoomTypeDisabled}
          isWaitingRoomDisabled={isWaitingRoomDisabled}
          isRequirePasswordDisabled={isRequirePasswordDisabled}
          isWaitingRoomNotCoworkerDisabled={isWaitingRoomNotCoworkerDisabled}
          isWaitingRoomGuestDisabled={isWaitingRoomGuestDisabled}
          isAuthenticatedCanJoinDisabled={isAuthenticatedCanJoinDisabled}
          useSimpleRcv={useSimpleRcv}
        />
      </div>
    );
  }

  return (
    <div
      ref={configRef}
      className={styles.videoConfig}
      data-sign="videoConfigsPanel"
    >
      {showSpinnerInConfigPanel ? <SpinnerOverlay /> : null}
      {showMigrationAlert && brandConfig.substituteName && (
        <MigrateToPluginAlert
          currentLocale={currentLocale}
          substituteName={brandConfig.substituteName}
          onCloseAlert={onCloseMigrationAlert}
        />
      )}
      {showScheduleOnBehalf ? (
        <>
          <div className={styles.scheduleOnBehalf}>
            <RcTypography
              variant="body1"
              weight="bold"
              className={styles.flexVertical}
            >
              {t('scheduleFor')}
              <ExtendedTooltip
                interactive
                placement="bottom"
                hasScrollBar={hasScrollBar}
                data-sign="scheduleForTooltip"
                title={
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation();
                      }
                    }}
                  >
                    <div
                      data-sign="scheduleForGuidance"
                      className={styles.preLine}
                    >
                      {t('scheduleForGuidance')}
                    </div>
                    <br />
                    <div>
                      <RcLink
                        variant="inherit"
                        data-sign="scheduleForGuidanceLink"
                        underline
                        target="_blank"
                        color="neutral.b01"
                        href={RCV_SCHEDULE_ON_BEHALF_GUIDANCE_LINK}
                      >
                        {t('scheduleForGuidanceMore')}
                      </RcLink>
                    </div>
                  </div>
                }
              >
                <RcIcon
                  size="small"
                  color="neutral.f04"
                  symbol={InfoBorder}
                  data-sign="scheduleForGuidanceIcon"
                  className={styles.allowCursor}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              </ExtendedTooltip>
            </RcTypography>
            <RcSelect
              size="large"
              variant="box"
              fullWidth
              className={styles.boxSelect}
              data-sign="scheduleFor"
              disabled={meeting.usePersonalMeetingId || disabled}
              onChange={(e) => {
                updateScheduleFor(e.target.value as string);
                trackSettingChanges?.(RCV_ITEM_NAME.scheduleFor);
              }}
              value={meeting.extensionId}
            >
              {delegators?.map((item: RcvDelegator, index: number) => {
                const userName =
                  item.name === ASSISTED_USERS_MYSELF
                    ? t(item.name)
                    : item.name;
                return (
                  <RcMenuItem
                    value={item.extensionId}
                    key={item.extensionId}
                    title={userName}
                    className={styles.boxSelectMenuItem}
                    data-sign={`scheduleForMenuItem${index}`}
                  >
                    {userName}
                  </RcMenuItem>
                );
              })}
            </RcSelect>
          </div>
          {showAssistedUserAlert && (
            <RcAlert severity="info" icon className={styles.scheduleForAlert}>
              <RcBox
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <FormattedMessage
                  message={t('scheduleForAssistedUser')}
                  values={{
                    userName: assistedUser!.name,
                  }}
                />
                <RcIconButton
                  size="large"
                  symbol={Close}
                  variant="plain"
                  onClick={() => setShowAssistedUserAlert(false)}
                />
              </RcBox>
            </RcAlert>
          )}
        </>
      ) : null}

      <TitleWrapper data-sign="header">
        <RcTypography variant="title2">{t('meetingSettings')}</RcTypography>
        <RcTypography variant="caption1" color="neutral.b04">
          {t('meetingSettingsDescription')}
        </RcTypography>
      </TitleWrapper>

      <MeetingSettingsCard
        meeting={meeting}
        brandConfig={brandConfig}
        onPasswordChangeClick={onPasswordChangeClick}
        updateMeetingSettings={updateMeetingSettings}
        trackSettingChanges={trackSettingChanges}
        isRequirePasswordDisabled={
          meeting.usePersonalMeetingId || isRequirePasswordDisabled
        }
        isEditPasswordDisabled={meeting.usePersonalMeetingId}
        isAuthenticatedCanJoinDisabled={
          meeting.usePersonalMeetingId || isAuthenticatedCanJoinDisabled
        }
        isWaitingRoomDisabled={
          meeting.usePersonalMeetingId || isWaitingRoomDisabled
        }
        isWaitingRoomTypeDisabled={
          meeting.usePersonalMeetingId || isWaitingRoomTypeDisabled
        }
        isJoinBeforeHostDisabled={
          meeting.usePersonalMeetingId || isJoinBeforeHostDisabled
        }
        isWaitingRoomNotCoworkerDisabled={isWaitingRoomNotCoworkerDisabled}
        isWaitingRoomGuestDisabled={isWaitingRoomGuestDisabled}
        useSimpleRcv={useSimpleRcv}
      />

      {showPersonalMeeting && (
        <StyledRcCard variant="outlined">
          <StyledListItem
            data-sign="personalMeetingField"
            canHover={false}
            button={false}
          >
            <RcListItemText
              primary={
                <span title={t('usePersonalMeetingIdInstead')}>
                  {t('usePersonalMeetingIdInstead')}
                </span>
              }
              secondary={
                <>
                  <RcTypography
                    component="span"
                    display="block"
                    variant="caption1"
                    className={styles.pmiLink}
                    title={linkWithoutPassword}
                  >
                    {linkWithoutPassword}
                  </RcTypography>
                  {meeting.usePersonalMeetingId && (
                    <RcLink
                      style={{ marginTop: '4px' }}
                      variant="caption1"
                      underline
                      onClick={() => setShowEditPMI(true)}
                    >
                      {t('editSettings')}
                    </RcLink>
                  )}
                </>
              }
            />
            <RcSwitch
              data-sign="usePersonalMeetingId"
              disabled={isPersonalMeetingDisabled || disabled}
              checked={meeting.usePersonalMeetingId}
              onChange={(ev, checked) => {
                switchUsePersonalMeetingId(checked);
              }}
            />
          </StyledListItem>
        </StyledRcCard>
      )}
    </div>
  );
};
