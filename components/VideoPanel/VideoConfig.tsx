import {
  RcAlert,
  RcBoxSelect,
  RcCheckbox,
  RcDatePicker,
  RcDatePickerProps,
  RcLineSelect,
  RcMenuItem,
  RcTextField,
  RcOutlineTextField,
  RcTimePicker,
  RcTimePickerProps,
} from '@ringcentral/juno';
import { find, reduce } from 'ramda';
import classnames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { RcVMeetingModel } from 'ringcentral-integration/interfaces/Rcv.model';
import {
  RcvDelegator,
  ASSISTED_USERS_MYSELF,
  RCV_WAITING_ROOM_MODE,
  RcvWaitingRoomModeProps,
} from 'ringcentral-integration/modules/RcVideo';

import {
  updateFullYear,
  updateFullTime,
} from 'ringcentral-integration/helpers/meetingHelper';
import { formatMeetingId } from '../../lib/MeetingCalendarHelper';
import { useDebounce } from '../../react-hooks';
import i18n from './i18n';
import { SettingGroup } from './SettingGroup';
import styles from './styles.scss';
import { VideoSecuritySettingsItem } from './VideoSecuritySettingItem';
import { SpinnerOverlay } from '../SpinnerOverlay';

export const MINUTE_SCALE: number = 4;
export const HOUR_SCALE: number = 13;

export function getMinutesList(MINUTE_SCALE: number) {
  return reduce(
    (result) => {
      const index = result.length;
      const value = (60 / MINUTE_SCALE) * index;
      const text = `${`${value}0`.slice(0, 2)} min`;
      return result.concat({
        value,
        text,
      });
    },
    [],
    new Array(MINUTE_SCALE),
  );
}

export function getHoursList(HOUR_SCALE: number) {
  if (HOUR_SCALE > 23) {
    throw new Error('HOUR_SCALE must be less than 23.');
  }
  return reduce(
    (result) => {
      const value = result.length;
      const text = `${`0${value}0`.slice(-3, -1)} hr`;
      return result.concat({
        value,
        text,
      });
    },
    [],
    new Array(HOUR_SCALE),
  );
}

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
interface VideoConfigProps {
  disabled?: boolean;
  showScheduleOnBehalf?: boolean;
  delegators?: RcvDelegator[];
  currentLocale: string;
  meeting: RcVMeetingModel;

  updateMeetingSettings: (meeting: Partial<RcVMeetingModel>) => void;
  validatePasswordSettings: (password: string, isSecret: boolean) => boolean;

  recipientsSection?: React.ReactNode;
  showTopic?: boolean;
  showWhen?: boolean;
  showDuration?: boolean;
  showAdminLock?: boolean;
  showPmiAlert?: boolean;
  enableWaitingRoom?: boolean;

  enablePersonalMeeting?: boolean;
  personalMeetingId: string;
  switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) => any;
  updateHasSettingsChanged: (isChanged: boolean) => void;
  updateScheduleFor: (userExtensionId: string) => any;
  init: () => any;
  datePickerSize?: RcDatePickerProps['size'];
  timePickerSize?: RcTimePickerProps['size'];
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  showSpinnerInConfigPanel: boolean;
}

export const VideoConfig: React.FunctionComponent<VideoConfigProps> = (
  props,
) => {
  const {
    disabled,
    currentLocale,
    meeting,
    updateMeetingSettings,
    validatePasswordSettings,
    recipientsSection,
    init,
    children,
    showTopic,
    showWhen,
    showDuration,
    showAdminLock,
    showPmiAlert,
    enableWaitingRoom,
    enablePersonalMeeting,
    personalMeetingId,
    switchUsePersonalMeetingId,
    updateHasSettingsChanged,
    datePickerSize,
    timePickerSize,
    labelPlacement,
    delegators,
    showScheduleOnBehalf,
    updateScheduleFor,
    showSpinnerInConfigPanel,
  } = props;
  const hoursList = getHoursList(HOUR_SCALE);
  const minutesList = getMinutesList(MINUTE_SCALE);

  useEffect(() => {
    if (init) {
      init();
    }
  }, []);

  const [meetingPassword, setMeetingPassword] = useState<string>(
    meeting.meetingPassword,
  );

  /* Password */
  const [isPasswordFocus, setPasswordFocus] = useState<boolean>(false);

  useEffect(() => {
    setMeetingPassword(meeting.meetingPassword);
  }, [meeting.meetingPassword]);

  const update = (options: any) => {
    updateHasSettingsChanged(true);
    return updateMeetingSettings({
      ...meeting,
      ...options,
    });
  };

  const debouncedPassword = useDebounce<string>(meetingPassword, 200);
  useEffect(() => {
    const isMeetingPasswordValid = validatePasswordSettings(
      debouncedPassword,
      meeting.isMeetingSecret,
    );
    updateMeetingSettings({
      ...meeting,
      meetingPassword: debouncedPassword,
      isMeetingPasswordValid,
    });
  }, [debouncedPassword]);

  const startTime = useMemo(() => {
    return new Date(meeting.startTime);
  }, [meeting.startTime]);

  const authUserTypeValue = meeting.isOnlyCoworkersJoin
    ? 'signedInCoWorkers'
    : 'signedInUsers';
  const [authUserType, setAuthUserType] = useState<string>(authUserTypeValue);
  useEffect(() => {
    setAuthUserType(authUserTypeValue);
  }, [authUserTypeValue]);

  const configRef = useRef<HTMLDivElement>();
  const [hasScrollBar, setHasScrollBar] = useState<boolean>(false);

  useEffect(() => {
    setHasScrollBar(
      configRef.current.scrollHeight > configRef.current.clientHeight,
    );
  }, []);

  const settingsGroupExpandable = false;

  const [joinBeforeHostLabel, setJoinBeforeHostLabel] = useState<
    'onlyJoinAfterMe' | 'onlyJoinAfterHost'
  >('onlyJoinAfterMe');
  useEffect(() => {
    const user = find(
      (item) => item.extensionId === meeting.extensionId,
      delegators || [],
    );
    if (user && !user.isLoginUser) {
      return setJoinBeforeHostLabel('onlyJoinAfterHost');
    }
    return setJoinBeforeHostLabel('onlyJoinAfterMe');
  }, [delegators, meeting.extensionId]);

  return (
    <div
      ref={configRef}
      className={styles.videoConfig}
      data-sign="videoConfigPanel"
    >
      <div className={styles.meetingContent}>
        {showSpinnerInConfigPanel ? <SpinnerOverlay /> : null}
        <div className={styles.meetingSection}>{children}</div>
        {recipientsSection ? (
          <div className={styles.meetingSection}>{recipientsSection}</div>
        ) : null}
        {showWhen ? (
          <div className={styles.meetingSection}>
            <RcDatePicker
              label={i18n.getString('date', currentLocale)}
              data-sign="date"
              date={startTime}
              fullWidth
              clearBtn={false}
              formatString="MM/DD/YYYY"
              size={datePickerSize}
              onChange={(value) => {
                update({
                  startTime: updateFullYear(startTime, value),
                });
              }}
            />
          </div>
        ) : null}
        {showWhen ? (
          <div className={styles.meetingSection}>
            <RcTimePicker
              fullWidth
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
        ) : null}
        {showDuration ? (
          <div className={styles.meetingSection}>
            <div className={styles.hourDuration}>
              <RcLineSelect
                // size="small"
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
                classes={{
                  root: styles.select,
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
              </RcLineSelect>
            </div>
            <div className={styles.minuteDuration}>
              <RcLineSelect
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
                classes={{
                  root: styles.select,
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
              </RcLineSelect>
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
              <RcBoxSelect
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
              </RcBoxSelect>
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
              <VideoSecuritySettingsItem
                labelPlacement={labelPlacement}
                dataSign="usePersonalMeetingIdWrapper"
                hasScrollBar={hasScrollBar}
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
                  disabled={disabled}
                  checked={meeting.usePersonalMeetingId}
                  onChange={(ev, checked) => {
                    switchUsePersonalMeetingId(checked);
                    updateHasSettingsChanged(true);
                  }}
                />
              </VideoSecuritySettingsItem>
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
          <VideoSecuritySettingsItem
            labelPlacement={labelPlacement}
            dataSign="muteAudioWrapper"
            hasScrollBar={hasScrollBar}
            currentLocale={currentLocale}
            label={i18n.getString('muteAudio', currentLocale)}
          >
            <RcCheckbox
              data-sign="muteAudio"
              disabled={disabled}
              checked={meeting.muteAudio}
              onChange={() => {
                update({
                  muteAudio: !meeting.muteAudio,
                });
              }}
            />
          </VideoSecuritySettingsItem>
          <VideoSecuritySettingsItem
            labelPlacement={labelPlacement}
            dataSign="turnOffCameraWrapper"
            hasScrollBar={hasScrollBar}
            currentLocale={currentLocale}
            label={i18n.getString('turnOffCamera', currentLocale)}
          >
            <RcCheckbox
              data-sign="turnOffCamera"
              disabled={disabled}
              checked={meeting.muteVideo}
              onChange={() => {
                update({
                  muteVideo: !meeting.muteVideo,
                });
              }}
            />
          </VideoSecuritySettingsItem>
        </SettingGroup>
        <SettingGroup
          dataSign="securityPanel"
          expandable={settingsGroupExpandable}
          summary={i18n.getString('meetingSettingsSecurity', currentLocale)}
        >
          <VideoSecuritySettingsItem
            labelPlacement={labelPlacement}
            dataSign="requirePasswordWrapper"
            hasScrollBar={hasScrollBar}
            isLock={showAdminLock && meeting.settingLock.isMeetingSecret}
            currentLocale={currentLocale}
            label={i18n.getString('requirePassword', currentLocale)}
          >
            <RcCheckbox
              data-sign="requirePassword"
              checked={meeting.isMeetingSecret}
              disabled={
                disabled ||
                (showAdminLock && meeting.settingLock.isMeetingSecret)
              }
              onChange={() => {
                const next = !meeting.isMeetingSecret;
                update({
                  isMeetingSecret: next,
                });
              }}
            />
          </VideoSecuritySettingsItem>
          {meeting.isMeetingSecret ? (
            <div
              className={classnames(styles.passwordInput, {
                [styles.subPrefixPadding]: labelPlacement === 'end',
              })}
            >
              <RcOutlineTextField
                disabled={disabled}
                size="small"
                placeholder={i18n.getString('Enter Password', currentLocale)}
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
                value={meetingPassword}
                inputProps={{
                  maxLength: 255,
                }}
                onChange={(e) => {
                  setMeetingPassword(e.target.value);
                  updateHasSettingsChanged(true);
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
          <VideoSecuritySettingsItem
            labelPlacement={labelPlacement}
            dataSign="allowJoinBeforeHostWrapper"
            hasScrollBar={hasScrollBar}
            isLock={showAdminLock && meeting.settingLock.allowJoinBeforeHost}
            currentLocale={currentLocale}
            label={i18n.getString(joinBeforeHostLabel, currentLocale)}
          >
            <RcCheckbox
              data-sign="allowJoinBeforeHost"
              checked={!meeting.allowJoinBeforeHost}
              disabled={
                (showAdminLock && meeting.settingLock.allowJoinBeforeHost) ||
                (enableWaitingRoom &&
                  meeting.waitingRoomMode === RCV_WAITING_ROOM_MODE.all) ||
                disabled
              }
              onChange={() => {
                update({
                  allowJoinBeforeHost: !meeting.allowJoinBeforeHost,
                });
              }}
            />
          </VideoSecuritySettingsItem>
          {enableWaitingRoom ? (
            <>
              <VideoSecuritySettingsItem
                labelPlacement={labelPlacement}
                dataSign="isWaitingRoomWrapper"
                hasScrollBar={hasScrollBar}
                isLock={showAdminLock && meeting.settingLock.waitingRoomMode}
                currentLocale={currentLocale}
                label={i18n.getString(
                  meeting.waitingRoomMode ? 'waitingRoom' : 'enableWaitingRoom',
                  currentLocale,
                )}
              >
                <RcCheckbox
                  data-sign="enableWaitingRoom"
                  checked={!!meeting.waitingRoomMode}
                  disabled={
                    disabled ||
                    (showAdminLock && meeting.settingLock.waitingRoomMode)
                  }
                  onChange={(ev, checked) => {
                    update({
                      waitingRoomMode: checked
                        ? RCV_WAITING_ROOM_MODE.notcoworker
                        : RCV_WAITING_ROOM_MODE.off,
                    });
                  }}
                />
              </VideoSecuritySettingsItem>
              {meeting.waitingRoomMode ? (
                <div
                  className={classnames(styles.boxSelectWrapper, {
                    [styles.subPrefixPadding]: labelPlacement === 'end',
                  })}
                >
                  <RcBoxSelect
                    data-sign="waitingRoom"
                    automationId="waitingRoom"
                    className={styles.boxSelect}
                    fullWidth
                    disabled={
                      disabled ||
                      (showAdminLock && meeting.settingLock.waitingRoomMode)
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
                      disabled={meeting.isOnlyCoworkersJoin}
                      value={RCV_WAITING_ROOM_MODE.notcoworker}
                    >
                      {i18n.getString('waitingRoomNotCoworker', currentLocale)}
                    </RcMenuItem>
                    <RcMenuItem
                      data-sign="waitingRoomGuest"
                      disabled={meeting.isOnlyAuthUserJoin}
                      value={RCV_WAITING_ROOM_MODE.guests}
                    >
                      {i18n.getString('waitingRoomGuest', currentLocale)}
                    </RcMenuItem>
                    <RcMenuItem
                      data-sign="waitingRoomAll"
                      value={RCV_WAITING_ROOM_MODE.all}
                    >
                      {i18n.getString('waitingRoomAll', currentLocale)}
                    </RcMenuItem>
                  </RcBoxSelect>
                </div>
              ) : null}
            </>
          ) : null}
          <VideoSecuritySettingsItem
            labelPlacement={labelPlacement}
            dataSign="isOnlyAuthUserJoinWrapper"
            hasScrollBar={hasScrollBar}
            isLock={showAdminLock && meeting.settingLock.isOnlyAuthUserJoin}
            currentLocale={currentLocale}
            label={i18n.getString('onlyAuthUserJoin', currentLocale)}
          >
            <RcCheckbox
              data-sign="isOnlyAuthUserJoin"
              checked={meeting.isOnlyAuthUserJoin}
              disabled={
                disabled ||
                (showAdminLock && meeting.settingLock.isOnlyAuthUserJoin)
              }
              onChange={(ev, checked) => {
                update({
                  isOnlyAuthUserJoin: checked,
                  isOnlyCoworkersJoin: checked
                    ? meeting.isOnlyCoworkersJoin
                    : false,
                });
              }}
            />
          </VideoSecuritySettingsItem>
          {meeting.isOnlyAuthUserJoin ? (
            <div
              className={classnames(styles.boxSelectWrapper, {
                [styles.subPrefixPadding]: labelPlacement === 'end',
              })}
            >
              <RcBoxSelect
                data-sign="authUserType"
                automationId="authUserType"
                disabled={
                  disabled ||
                  (showAdminLock && meeting.settingLock.isOnlyCoworkersJoin)
                }
                className={styles.boxSelect}
                fullWidth
                onChange={(e) => {
                  setAuthUserType(e.target.value as string);
                  update({
                    isOnlyCoworkersJoin: e.target.value === 'signedInCoWorkers',
                  });
                }}
                value={authUserType}
              >
                <RcMenuItem value="signedInUsers">
                  {i18n.getString('signedInUsers', currentLocale)}
                </RcMenuItem>
                <RcMenuItem value="signedInCoWorkers">
                  {i18n.getString('signedInCoWorkers', currentLocale)}
                </RcMenuItem>
              </RcBoxSelect>
            </div>
          ) : null}

          <VideoSecuritySettingsItem
            labelPlacement={labelPlacement}
            dataSign="limitScreenSharingWrapper"
            hasScrollBar={hasScrollBar}
            isLock={showAdminLock && meeting.settingLock.allowScreenSharing}
            currentLocale={currentLocale}
            label={i18n.getString('limitScreenSharing', currentLocale)}
          >
            <RcCheckbox
              data-sign="limitScreenSharing"
              checked={!meeting.allowScreenSharing}
              disabled={
                disabled ||
                (showAdminLock && meeting.settingLock.allowScreenSharing)
              }
              onChange={() => {
                update({
                  allowScreenSharing: !meeting.allowScreenSharing,
                });
              }}
            />
          </VideoSecuritySettingsItem>
        </SettingGroup>
      </div>
    </div>
  );
};

const InnerTopic: React.FunctionComponent<{
  name: string;
  currentLocale: string;
  setTopicRef: (ref: any) => void;
  updateMeetingTopic: (name: string) => void;
}> = ({ name, currentLocale, setTopicRef, updateMeetingTopic }) => {
  const [topic, setTopic] = useState(name);
  const topicRef = useRef();
  useEffect(() => {
    setTopic(name);
    setTopicRef(topicRef);
  }, [name, setTopicRef]);
  return (
    <RcTextField
      ref={topicRef}
      // size="small"
      label={i18n.getString('topic', currentLocale)}
      data-sign="topic"
      fullWidth
      clearBtn={false}
      value={topic}
      inputProps={{
        maxLength: 255,
      }}
      onChange={(e) => {
        setTopic(e.target.value);
      }}
      onBlur={() => {
        updateMeetingTopic(topic);
      }}
      classes={{
        root: styles.input,
      }}
    />
  );
};

export const Topic = React.memo(
  InnerTopic,
  (prevProps, nextProps) =>
    prevProps.name === nextProps.name &&
    prevProps.currentLocale === nextProps.currentLocale,
);

VideoConfig.defaultProps = {
  recipientsSection: undefined,
  showTopic: true,
  showWhen: true,
  showDuration: true,
  showAdminLock: false,
  showPmiAlert: false,
  enablePersonalMeeting: false,
  enableWaitingRoom: false,
  datePickerSize: 'medium',
  timePickerSize: 'medium',
  labelPlacement: 'start',
};
