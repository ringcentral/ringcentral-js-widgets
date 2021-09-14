import {
  styled,
  spacing,
  RcAlert,
  RcCheckbox,
  RcDatePicker,
  RcDatePickerProps,
  RcMenuItem,
  RcSelect,
  RcTextField,
  RcTimePicker,
  RcTimePickerProps,
  RcCheckboxProps,
  RcIcon,
} from '@ringcentral/juno';
import { Info } from '@ringcentral/juno/icon';
import classnames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  updateFullTime,
  updateFullYear,
} from '@ringcentral-integration/commons/helpers/meetingHelper';
import { RcVMeetingModel } from '@ringcentral-integration/commons/interfaces/Rcv.model';
import {
  ASSISTED_USERS_MYSELF,
  RCV_WAITING_ROOM_MODE,
  RcvDelegator,
  RcvWaitingRoomModeProps,
  AUTH_USER,
  AUTH_USER_TYPE,
} from '@ringcentral-integration/commons/modules/RcVideoV2';

import { ExtendedTooltip } from '../MeetingConfigsV2/ExtendedTooltip';
import { formatMeetingId } from '../../lib/MeetingCalendarHelper';
import {
  getMinutesList,
  getHoursList,
  HOUR_SCALE,
  MINUTE_SCALE,
} from '../../lib/MeetingHelper';
import { SpinnerOverlay } from '../SpinnerOverlay';
import i18n from './i18n';
import { SettingGroup } from './SettingGroup';
import styles from './styles.scss';
import { VideoSecuritySettingItem } from './VideoSecuritySettingItem';

function getHelperTextForPasswordField(
  meeting: RcVMeetingModel,
  currentLocale: string,
  isPasswordFocus: boolean,
): string {
  if (!meeting.meetingPassword) {
    return i18n.getString('passwordEmptyError', currentLocale);
  }
  if (!meeting.isMeetingPasswordValid) {
    return i18n.getString('passwordInvalidError', currentLocale);
  }
  if (isPasswordFocus) {
    return i18n.getString('passwordHintText', currentLocale);
  }
  // when correct input without focus, show nothing
  return '';
}

// TODO: integrate with VideoPanelProps from 'GenericMeetingPanel/interface'
interface VideoConfigProps {
  disabled?: boolean;
  showScheduleOnBehalf?: boolean;
  delegators?: RcvDelegator[];
  currentLocale: string;
  meeting: RcVMeetingModel;

  updateMeetingSettings: (meeting: Partial<RcVMeetingModel>) => void;

  recipientsSection?: React.ReactNode;
  showWhen?: boolean;
  showDuration?: boolean;
  showRcvAdminLock?: boolean;
  showPmiAlert?: boolean;
  showWaitingRoom?: boolean;
  showE2EE?: boolean;
  isE2EEDisabled?: boolean;

  enablePersonalMeeting?: boolean;
  isPersonalMeetingDisabled: boolean;
  personalMeetingId: string;
  switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) => any;
  updateHasSettingsChanged: (isChanged: boolean) => void;
  updateScheduleFor: (userExtensionId: string) => any;
  init: () => any;
  e2eeInteractFunc: (e2eeValue: boolean) => void;
  datePickerSize?: RcDatePickerProps['size'];
  timePickerSize?: RcTimePickerProps['size'];
  checkboxSize?: RcCheckboxProps['size'];
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  showSpinnerInConfigPanel: boolean;
  joinBeforeHostLabel: string;
  authUserTypeValue: AUTH_USER;
  isJoinBeforeHostDisabled: boolean;
  isAuthenticatedCanJoinDisabled: boolean;
  isWaitingRoomDisabled: boolean;
  isRequirePasswordDisabled: boolean;
  isWaitingRoomNotCoworkerDisabled: boolean;
  isWaitingRoomGuestDisabled: boolean;
  isWaitingRoomAllDisabled: boolean;
  isAuthUserTypeDisabled: boolean;
  isSignedInUsersDisabled: boolean;
  isSignedInCoWorkersDisabled: boolean;
}

const PanelRoot = styled.div`
  ${RcCheckbox} {
    padding: ${spacing(2)};
  }
`;

export const VideoConfig: React.FunctionComponent<VideoConfigProps> = (
  props,
) => {
  const {
    disabled,
    currentLocale,
    meeting,
    updateMeetingSettings,
    recipientsSection,
    init,
    children,
    showWhen,
    showDuration,
    showRcvAdminLock,
    showPmiAlert,
    showWaitingRoom,
    showE2EE,
    isE2EEDisabled,
    enablePersonalMeeting,
    isPersonalMeetingDisabled,
    personalMeetingId,
    switchUsePersonalMeetingId,
    updateHasSettingsChanged,
    e2eeInteractFunc,
    datePickerSize,
    timePickerSize,
    checkboxSize,
    labelPlacement,
    delegators,
    showScheduleOnBehalf,
    updateScheduleFor,
    showSpinnerInConfigPanel,
    joinBeforeHostLabel,
    authUserTypeValue,
    isJoinBeforeHostDisabled,
    isAuthenticatedCanJoinDisabled,
    isAuthUserTypeDisabled,
    isSignedInUsersDisabled,
    isSignedInCoWorkersDisabled,
    isWaitingRoomDisabled,
    isRequirePasswordDisabled,
    isWaitingRoomNotCoworkerDisabled,
    isWaitingRoomGuestDisabled,
    isWaitingRoomAllDisabled,
  } = props;

  const settingsGroupExpandable = false;
  const hoursList = getHoursList(HOUR_SCALE, currentLocale);
  const minutesList = getMinutesList(MINUTE_SCALE, currentLocale);

  useEffect(() => {
    if (init) {
      init();
    }
  }, []);

  const update = (options: any) => {
    updateHasSettingsChanged(true);
    return updateMeetingSettings({
      ...meeting,
      ...options,
    });
  };

  /* Password validate interaction */
  const [isPasswordFocus, setPasswordFocus] = useState<boolean>(false);

  const startTime = useMemo(() => {
    return new Date(meeting.startTime);
  }, [meeting.startTime]);

  /* Scrollbar */
  const configRef = useRef<HTMLDivElement>();
  const [hasScrollBar, setHasScrollBar] = useState<boolean>(false);

  useEffect(() => {
    setHasScrollBar(
      configRef.current.scrollHeight > configRef.current.clientHeight,
    );
  }, []);

  return (
    <PanelRoot
      ref={configRef}
      className={styles.videoConfig}
      data-sign="videoConfigsPanel"
    >
      <div className={styles.meetingContent}>
        {showSpinnerInConfigPanel ? <SpinnerOverlay /> : null}
        <div className={classnames(styles.meetingSection, styles.gutterTop)}>
          {children}
        </div>
        {recipientsSection ? (
          <div className={styles.meetingSection}>{recipientsSection}</div>
        ) : null}
        {showWhen ? (
          <div className={styles.meetingSection}>
            <div className={styles.datePicker}>
              <RcDatePicker
                fullWidth
                gutterBottom
                label={i18n.getString('date', currentLocale)}
                data-sign="date"
                date={startTime}
                clearBtn={false}
                formatString="MM/DD/YYYY"
                size={datePickerSize}
                locale={currentLocale}
                todayButtonText={i18n.getString('today', currentLocale)}
                onChange={(value) => {
                  update({
                    startTime: updateFullYear(startTime, value),
                  });
                }}
              />
            </div>
            <div className={styles.timePicker}>
              <RcTimePicker
                fullWidth
                gutterBottom
                clearBtn={false}
                size={timePickerSize}
                label={i18n.getString('startTime', currentLocale)}
                isTwelveHourSystem
                data-sign="startTime"
                value={startTime}
                onChange={(value) => {
                  update({
                    startTime: updateFullTime(startTime, value),
                  });
                }}
              />
            </div>
          </div>
        ) : null}

        {showDuration ? (
          <div className={styles.meetingSection}>
            <div className={styles.hourDuration}>
              <RcSelect
                fullWidth
                gutterBottom
                data-sign="durationHour"
                value={Math.floor(meeting.duration / 60)}
                onChange={(e) => {
                  const value = +e.target.value;
                  const restMinutes = Math.floor(meeting.duration % 60);
                  const durationInMinutes = value * 60 + restMinutes;
                  update({
                    duration: durationInMinutes,
                  });
                }}
                className={styles.select}
                label={i18n.getString('duration', currentLocale)}
              >
                {hoursList.map((item, i) => (
                  <RcMenuItem
                    key={i}
                    value={item.value}
                    data-sign={`option${i}`}
                  >
                    {item !== null ? item.text : 'defaultValue'}
                  </RcMenuItem>
                ))}
              </RcSelect>
            </div>
            <div className={styles.minuteDuration}>
              <RcSelect
                fullWidth
                gutterBottom
                data-sign="durationMinute"
                required
                value={Math.floor(meeting.duration % 60)}
                onChange={(e) => {
                  const value = +e.target.value;
                  const restHours = Math.floor(meeting.duration / 60);
                  const isMax = restHours === hoursList.slice(-1)[0].value;
                  const minutes = isMax ? 0 : value;
                  const durationInMinutes = restHours * 60 + minutes;
                  update({
                    duration: durationInMinutes,
                  });
                }}
              >
                {minutesList.map((item, i) => (
                  <RcMenuItem
                    key={i}
                    value={item.value}
                    data-sign={`option${i}`}
                  >
                    {item !== null ? item.text : 'defaultValue'}
                  </RcMenuItem>
                ))}
              </RcSelect>
            </div>
          </div>
        ) : null}
        {showScheduleOnBehalf ? (
          <SettingGroup
            dataSign="scheduleOnBehalfPanel"
            expandable={settingsGroupExpandable}
            summary={i18n.getString('scheduleFor', currentLocale)}
          >
            <div className={styles.boxSelectWrapper}>
              <RcSelect
                variant="box"
                fullWidth
                className={styles.boxSelect}
                data-sign="scheduleFor"
                disabled={disabled}
                onChange={(e) => {
                  updateScheduleFor(e.target.value as string);
                }}
                value={meeting.extensionId}
              >
                {delegators.map((item: RcvDelegator, index: number) => {
                  const userName =
                    item.name === ASSISTED_USERS_MYSELF
                      ? i18n.getString(item.name, currentLocale)
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
          </SettingGroup>
        ) : null}
        <SettingGroup
          dataSign="settingsPanel"
          expandable={settingsGroupExpandable}
          summary={i18n.getString('meetingSettings', currentLocale)}
        >
          {enablePersonalMeeting && personalMeetingId && (
            <>
              <VideoSecuritySettingItem
                labelPlacement={labelPlacement}
                dataSign="usePersonalMeetingIdWrapper"
                hasScrollBar={hasScrollBar}
                isDisabled={isPersonalMeetingDisabled}
                currentLocale={currentLocale}
                label={
                  <div className={styles.pmiLabel}>
                    {i18n.getString('usePersonalMeetingId', currentLocale)}
                    &nbsp;
                    <span data-sign="personalMeetingId">
                      {formatMeetingId(personalMeetingId, '-')}
                    </span>
                  </div>
                }
              >
                <RcCheckbox
                  data-sign="usePersonalMeetingId"
                  disabled={isPersonalMeetingDisabled || disabled}
                  size={checkboxSize}
                  checked={meeting.usePersonalMeetingId}
                  onChange={(ev, checked) => {
                    switchUsePersonalMeetingId(checked);
                    updateHasSettingsChanged(true);
                  }}
                />
              </VideoSecuritySettingItem>
              {meeting.usePersonalMeetingId && showPmiAlert ? (
                <RcAlert
                  severity="info"
                  className={styles.pmiAlertContainer}
                  data-sign="pmiAlert"
                >
                  {i18n.getString('pmiSettingAlert', currentLocale)}
                </RcAlert>
              ) : null}
            </>
          )}
          <VideoSecuritySettingItem
            labelPlacement={labelPlacement}
            dataSign="muteAudioWrapper"
            hasScrollBar={hasScrollBar}
            currentLocale={currentLocale}
            label={i18n.getString('muteAudio', currentLocale)}
          >
            <RcCheckbox
              data-sign="muteAudio"
              disabled={disabled}
              size={checkboxSize}
              checked={meeting.muteAudio}
              onChange={() => {
                update({
                  muteAudio: !meeting.muteAudio,
                });
              }}
            />
          </VideoSecuritySettingItem>
          <VideoSecuritySettingItem
            labelPlacement={labelPlacement}
            dataSign="turnOffCameraWrapper"
            hasScrollBar={hasScrollBar}
            currentLocale={currentLocale}
            label={i18n.getString('turnOffCamera', currentLocale)}
          >
            <RcCheckbox
              data-sign="turnOffCamera"
              disabled={disabled}
              size={checkboxSize}
              checked={meeting.muteVideo}
              onChange={() => {
                update({
                  muteVideo: !meeting.muteVideo,
                });
              }}
            />
          </VideoSecuritySettingItem>
        </SettingGroup>
        <SettingGroup
          dataSign="securityPanel"
          expandable={settingsGroupExpandable}
          summary={i18n.getString('meetingSettingsSecurity', currentLocale)}
        >
          {showE2EE ? (
            <VideoSecuritySettingItem
              labelPlacement={labelPlacement}
              dataSign="e2eeWrapper"
              hasScrollBar={hasScrollBar}
              isDisabled={isE2EEDisabled}
              isLock={showRcvAdminLock && meeting.settingLock.e2ee}
              currentLocale={currentLocale}
              label={
                <>
                  <span className={styles.flexVertical}>
                    {i18n.getString('useE2ee', currentLocale)}
                    <ExtendedTooltip
                      placement="top"
                      hasScrollBar={hasScrollBar}
                      title={i18n.getString('e2eeTooltip', currentLocale)}
                      data-sign="e2eeTooltip"
                    >
                      <RcIcon size="small" color="neutral.f04" symbol={Info} />
                    </ExtendedTooltip>
                  </span>
                </>
              }
            >
              <RcCheckbox
                data-sign="e2ee"
                checked={meeting.e2ee}
                disabled={isE2EEDisabled || disabled}
                size={checkboxSize}
                onChange={(ev, value) => {
                  e2eeInteractFunc(value);
                }}
              />
            </VideoSecuritySettingItem>
          ) : null}
          <VideoSecuritySettingItem
            labelPlacement={labelPlacement}
            dataSign="requirePasswordWrapper"
            hasScrollBar={hasScrollBar}
            isLock={showRcvAdminLock && meeting.settingLock.isMeetingSecret}
            currentLocale={currentLocale}
            label={i18n.getString('requirePassword', currentLocale)}
          >
            <RcCheckbox
              data-sign="requirePassword"
              checked={meeting.isMeetingSecret}
              disabled={isRequirePasswordDisabled}
              size={checkboxSize}
              onChange={() => {
                const next = !meeting.isMeetingSecret;
                update({
                  isMeetingSecret: next,
                });
              }}
            />
          </VideoSecuritySettingItem>
          {meeting.isMeetingSecret ? (
            <div
              className={classnames(styles.passwordInput, {
                [styles.subPrefixPadding]: labelPlacement === 'end',
              })}
            >
              <RcTextField
                variant="outline"
                fullWidth
                disabled={disabled}
                size="small"
                placeholder={i18n.getString('enterPassword', currentLocale)}
                error={!meeting.isMeetingPasswordValid}
                helperText={getHelperTextForPasswordField(
                  meeting,
                  currentLocale,
                  isPasswordFocus,
                )}
                InputLabelProps={{
                  className: styles.passwordLabel,
                }}
                data-sign="password"
                clearBtn
                spellCheck={false}
                value={meeting.meetingPassword}
                inputProps={{
                  maxLength: 255,
                }}
                onChange={(e) => {
                  update({
                    meetingPassword: e.target.value,
                  });
                }}
                onFocus={() => {
                  setPasswordFocus(true);
                }}
                onBlur={() => {
                  setPasswordFocus(false);
                }}
              />
            </div>
          ) : null}
          <VideoSecuritySettingItem
            labelPlacement={labelPlacement}
            dataSign="allowJoinBeforeHostWrapper"
            hasScrollBar={hasScrollBar}
            isLock={showRcvAdminLock && meeting.settingLock.allowJoinBeforeHost}
            currentLocale={currentLocale}
            label={i18n.getString(joinBeforeHostLabel, currentLocale)}
          >
            <RcCheckbox
              data-sign="allowJoinBeforeHost"
              checked={!meeting.allowJoinBeforeHost}
              disabled={isJoinBeforeHostDisabled}
              size={checkboxSize}
              onChange={() => {
                update({
                  allowJoinBeforeHost: !meeting.allowJoinBeforeHost,
                });
              }}
            />
          </VideoSecuritySettingItem>
          {showWaitingRoom ? (
            <>
              <VideoSecuritySettingItem
                labelPlacement={labelPlacement}
                dataSign="isWaitingRoomWrapper"
                hasScrollBar={hasScrollBar}
                isLock={showRcvAdminLock && meeting.settingLock.waitingRoomMode}
                currentLocale={currentLocale}
                label={i18n.getString(
                  meeting.waitingRoomMode ? 'waitingRoom' : 'enableWaitingRoom',
                  currentLocale,
                )}
              >
                <RcCheckbox
                  data-sign="enableWaitingRoom"
                  checked={!!meeting.waitingRoomMode}
                  disabled={isWaitingRoomDisabled}
                  size={checkboxSize}
                  onChange={(ev, checked) => {
                    update({
                      waitingRoomMode: checked
                        ? RCV_WAITING_ROOM_MODE.notcoworker
                        : RCV_WAITING_ROOM_MODE.off,
                    });
                  }}
                />
              </VideoSecuritySettingItem>
              {meeting.waitingRoomMode ? (
                <div
                  className={classnames(styles.boxSelectWrapper, {
                    [styles.subPrefixPadding]: labelPlacement === 'end',
                  })}
                >
                  <RcSelect
                    variant="box"
                    data-sign="waitingRoom"
                    data-test-automation-id="waitingRoom"
                    className={styles.boxSelect}
                    fullWidth
                    disabled={
                      disabled ||
                      (showRcvAdminLock && meeting.settingLock.waitingRoomMode)
                    }
                    onChange={(e) => {
                      update({
                        waitingRoomMode: e.target
                          .value as RcvWaitingRoomModeProps,
                      });
                    }}
                    value={meeting.waitingRoomMode}
                  >
                    <RcMenuItem
                      data-sign="waitingRoomNotCoworker"
                      disabled={isWaitingRoomNotCoworkerDisabled}
                      value={RCV_WAITING_ROOM_MODE.notcoworker}
                      className={styles.boxSelectMenuItem}
                    >
                      {i18n.getString('waitingRoomNotCoworker', currentLocale)}
                    </RcMenuItem>
                    <RcMenuItem
                      data-sign="waitingRoomGuest"
                      disabled={isWaitingRoomGuestDisabled}
                      value={RCV_WAITING_ROOM_MODE.guests}
                      className={styles.boxSelectMenuItem}
                    >
                      {i18n.getString('waitingRoomGuest', currentLocale)}
                    </RcMenuItem>
                    <RcMenuItem
                      data-sign="waitingRoomAll"
                      disabled={isWaitingRoomAllDisabled}
                      value={RCV_WAITING_ROOM_MODE.all}
                      className={styles.boxSelectMenuItem}
                    >
                      {i18n.getString('waitingRoomAll', currentLocale)}
                    </RcMenuItem>
                  </RcSelect>
                </div>
              ) : null}
            </>
          ) : null}
          <VideoSecuritySettingItem
            labelPlacement={labelPlacement}
            dataSign="isOnlyAuthUserJoinWrapper"
            hasScrollBar={hasScrollBar}
            isLock={showRcvAdminLock && meeting.settingLock.isOnlyAuthUserJoin}
            currentLocale={currentLocale}
            label={i18n.getString('onlyAuthUserJoin', currentLocale)}
          >
            <RcCheckbox
              data-sign="isOnlyAuthUserJoin"
              checked={meeting.isOnlyAuthUserJoin}
              disabled={isAuthenticatedCanJoinDisabled}
              size={checkboxSize}
              onChange={(ev, checked) => {
                update({
                  isOnlyAuthUserJoin: checked,
                  isOnlyCoworkersJoin: checked
                    ? meeting.isOnlyCoworkersJoin
                    : false,
                });
              }}
            />
          </VideoSecuritySettingItem>
          {meeting.isOnlyAuthUserJoin ? (
            <div
              className={classnames(styles.boxSelectWrapper, {
                [styles.subPrefixPadding]: labelPlacement === 'end',
              })}
            >
              <RcSelect
                variant="box"
                data-test-automation-id="authUserType"
                data-sign="authUserType"
                disabled={isAuthUserTypeDisabled}
                className={styles.boxSelect}
                fullWidth
                onChange={(e) => {
                  update({
                    isOnlyCoworkersJoin:
                      e.target.value === AUTH_USER_TYPE.SIGNED_IN_CO_WORKERS,
                  });
                }}
                value={authUserTypeValue}
              >
                <RcMenuItem
                  disabled={isSignedInUsersDisabled}
                  value={AUTH_USER_TYPE.SIGNED_IN_USERS}
                >
                  {i18n.getString('signedInUsers', currentLocale)}
                </RcMenuItem>
                <RcMenuItem
                  disabled={isSignedInCoWorkersDisabled}
                  value={AUTH_USER_TYPE.SIGNED_IN_CO_WORKERS}
                >
                  {i18n.getString('signedInCoWorkers', currentLocale)}
                </RcMenuItem>
              </RcSelect>
            </div>
          ) : null}

          <VideoSecuritySettingItem
            labelPlacement={labelPlacement}
            dataSign="limitScreenSharingWrapper"
            hasScrollBar={hasScrollBar}
            isLock={showRcvAdminLock && meeting.settingLock.allowScreenSharing}
            currentLocale={currentLocale}
            label={i18n.getString('limitScreenSharing', currentLocale)}
          >
            <RcCheckbox
              data-sign="limitScreenSharing"
              checked={!meeting.allowScreenSharing}
              disabled={
                disabled ||
                (showRcvAdminLock && meeting.settingLock.allowScreenSharing)
              }
              size={checkboxSize}
              onChange={() => {
                update({
                  allowScreenSharing: !meeting.allowScreenSharing,
                });
              }}
            />
          </VideoSecuritySettingItem>
        </SettingGroup>
      </div>
    </PanelRoot>
  );
};

VideoConfig.defaultProps = {
  recipientsSection: undefined,
  showWhen: true,
  showDuration: true,
  showRcvAdminLock: false,
  showPmiAlert: false,
  enablePersonalMeeting: false,
  showWaitingRoom: false,
  showE2EE: false,
  isE2EEDisabled: false,
  datePickerSize: 'medium',
  timePickerSize: 'medium',
  labelPlacement: 'start',
  checkboxSize: 'medium',
};
