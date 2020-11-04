import {
  RcBoxSelect,
  RcCheckbox,
  RcDatePicker,
  RcDatePickerProps,
  RcLineSelect,
  RcMenuItem,
  RcTextField,
  RcTimePicker,
  RcTimePickerProps,
} from '@ringcentral/juno';
import { find, reduce } from 'ramda';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { RcVMeetingModel } from 'ringcentral-integration/interfaces/Rcv.model';
import { RCV_WAITING_ROOM_MODE } from 'ringcentral-integration/modules/RcVideo/videoHelper';
import {
  RcvDelegator,
  RcvWaitingRoomModeProps,
} from 'ringcentral-integration/modules/RcVideo/interface';

import { formatMeetingId } from '../../lib/MeetingCalendarHelper';
import { useDebounce } from '../../react-hooks';
import { Alert, AlertType } from '../Alert';
import i18n from './i18n';
import { SettingGroup } from './SettingGroup';
import styles from './styles.scss';
import { VideoSecuritySettingsItem } from './VideoSecuritySettingItem';

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
): string {
  if (!meeting.meetingPassword) {
    return i18n.getString('passwordEmptyError', currentLocale);
  }
  if (!meeting.isMeetingPasswordValid) {
    return i18n.getString('passwordInvalidError', currentLocale);
  }
  return i18n.getString('passwordHintText', currentLocale);
}

interface VideoConfigProps {
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
  enableJoinAfterMeCopy?: boolean;
  personalMeetingId: string;
  switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) => any;
  updateScheduleFor: (userExtensionId: string) => any;
  brandName: string;
  init: () => any;
  datePickerSize?: RcDatePickerProps['size'];
  timePickerSize?: RcTimePickerProps['size'];
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

export const VideoConfig: React.FunctionComponent<VideoConfigProps> = (
  props,
) => {
  const {
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
    brandName,
    showAdminLock,
    showPmiAlert,
    enableWaitingRoom,
    enablePersonalMeeting,
    enableJoinAfterMeCopy,
    personalMeetingId,
    switchUsePersonalMeetingId,
    datePickerSize,
    timePickerSize,
    labelPlacement,
    delegators,
    showScheduleOnBehalf,
    updateScheduleFor,
  } = props;
  const hoursList = getHoursList(HOUR_SCALE);
  const minutesList = getMinutesList(MINUTE_SCALE);
  const isRCBrand = brandName === 'RingCentral';

  useEffect(() => {
    if (init) {
      init();
    }
  }, []);

  const [meetingPassword, setMeetingPassword] = useState<string>(
    meeting.meetingPassword,
  );
  useEffect(() => {
    setMeetingPassword(meeting.meetingPassword);
  }, [meeting.meetingPassword]);

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
    'joinBeforeHost' | 'onlyJoinAfterMe' | 'onlyJoinAfterHost'
  >('joinBeforeHost');
  useEffect(() => {
    if (!enableJoinAfterMeCopy) {
      setJoinBeforeHostLabel('joinBeforeHost');
      return;
    }
    const user = find(
      (item) => item.extensionId === meeting.extensionId,
      delegators || [],
    );
    if (user && !user.isLoginUser) {
      return setJoinBeforeHostLabel('onlyJoinAfterHost');
    }
    return setJoinBeforeHostLabel('onlyJoinAfterMe');
  }, [enableJoinAfterMeCopy, delegators, meeting.extensionId]);

  return (
    <div
      ref={configRef}
      className={styles.videoConfig}
      data-sign="videoConfigPanel"
    >
      <div className={styles.meetingContent}>
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
                updateMeetingSettings({
                  startTime: value,
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
                updateMeetingSettings({
                  startTime: new Date(value),
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
                  updateMeetingSettings({
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
                  updateMeetingSettings({
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
                onChange={(e) => {
                  updateScheduleFor(e.target.value as string);
                }}
                value={meeting.extensionId}
              >
                {delegators.map((item: RcvDelegator, index: number) => {
                  const userName = i18n.getString(item.name, currentLocale);
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
          summary={i18n.getString(
            isRCBrand ? 'rcMeetingSettings' : 'meetingSettings',
            currentLocale,
          )}
        >
          {enablePersonalMeeting && (
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
                  checked={meeting.usePersonalMeetingId}
                  onChange={(ev, checked) => {
                    switchUsePersonalMeetingId(checked);
                  }}
                />
              </VideoSecuritySettingsItem>
              {meeting.usePersonalMeetingId && showPmiAlert ? (
                <Alert
                  type={AlertType.INFO}
                  className={styles.pmiAlertContainer}
                  dataSign="pmiAlert"
                >
                  {i18n.getString('pmiSettingAlert', currentLocale)}
                </Alert>
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
              checked={meeting.muteAudio}
              onChange={() => {
                updateMeetingSettings({
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
              checked={meeting.muteVideo}
              onChange={() => {
                updateMeetingSettings({
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
              disabled={showAdminLock && meeting.settingLock.isMeetingSecret}
              onChange={() => {
                const next = !meeting.isMeetingSecret;
                updateMeetingSettings({
                  isMeetingSecret: next,
                });
              }}
            />
          </VideoSecuritySettingsItem>
          {meeting.isMeetingSecret ? (
            <RcTextField
              error={!meeting.isMeetingPasswordValid}
              helperText={getHelperTextForPasswordField(meeting, currentLocale)}
              className={styles.passwordInput}
              label={i18n.getString('setPassword', currentLocale)}
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
                const password = e.target.value;
                if (/^[A-Za-z0-9]{0,10}$/.test(password)) {
                  setMeetingPassword(password);
                }
              }}
            />
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
              checked={
                enableJoinAfterMeCopy
                  ? !meeting.allowJoinBeforeHost
                  : meeting.allowJoinBeforeHost
              }
              disabled={
                (showAdminLock && meeting.settingLock.allowJoinBeforeHost) ||
                (enableWaitingRoom &&
                  meeting.waitingRoomMode === RCV_WAITING_ROOM_MODE.all)
              }
              onChange={() => {
                updateMeetingSettings({
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
                label={i18n.getString('waitingRoom', currentLocale)}
              >
                <RcCheckbox
                  data-sign="enableWaitingRoom"
                  checked={!!meeting.waitingRoomMode}
                  disabled={
                    showAdminLock && meeting.settingLock.waitingRoomMode
                  }
                  onChange={(ev, checked) => {
                    updateMeetingSettings({
                      waitingRoomMode: checked
                        ? RCV_WAITING_ROOM_MODE.notcoworker
                        : RCV_WAITING_ROOM_MODE.off,
                    });
                  }}
                />
              </VideoSecuritySettingsItem>
              {meeting.waitingRoomMode ? (
                <div className={styles.boxSelectWrapper}>
                  <RcBoxSelect
                    data-sign="waitingRoom"
                    automationId="waitingRoom"
                    className={styles.boxSelect}
                    fullWidth
                    disabled={
                      showAdminLock && meeting.settingLock.waitingRoomMode
                    }
                    onChange={(e) => {
                      updateMeetingSettings({
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
              disabled={showAdminLock && meeting.settingLock.isOnlyAuthUserJoin}
              onChange={(ev, checked) => {
                updateMeetingSettings({
                  isOnlyAuthUserJoin: checked,
                  isOnlyCoworkersJoin: checked
                    ? meeting.isOnlyCoworkersJoin
                    : false,
                });
              }}
            />
          </VideoSecuritySettingsItem>
          {meeting.isOnlyAuthUserJoin ? (
            <div className={styles.boxSelectWrapper}>
              <RcBoxSelect
                data-sign="authUserType"
                automationId="authUserType"
                disabled={
                  showAdminLock && meeting.settingLock.isOnlyCoworkersJoin
                }
                className={styles.boxSelect}
                fullWidth
                onChange={(e) => {
                  setAuthUserType(e.target.value as string);
                  updateMeetingSettings({
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
              disabled={showAdminLock && meeting.settingLock.allowScreenSharing}
              onChange={() => {
                updateMeetingSettings({
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
  enableJoinAfterMeCopy: false,
  datePickerSize: 'medium',
  timePickerSize: 'medium',
  labelPlacement: 'start',
};
