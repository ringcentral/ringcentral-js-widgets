import {
  RcAlert,
  RcCheckbox,
  RcDatePicker,
  RcDatePickerProps,
  RcIcon,
  RcLink,
  RcMenuItem,
  RcSelect,
  RcTextField,
  RcTimePicker,
  RcTimePickerProps,
  RcTypography,
} from '@ringcentral/juno';
import classnames from 'classnames';
import { reduce } from 'ramda';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  generateRandomPassword,
  updateFullTime,
  updateFullYear,
} from 'ringcentral-integration/helpers/meetingHelper';
import {
  ASSISTED_USERS_MYSELF,
  isRecurringMeeting,
  MeetingType,
} from 'ringcentral-integration/modules/Meeting';
import {
  MeetingDelegator,
  RcMMeetingModel,
} from 'ringcentral-integration/modules/MeetingV2';

import { formatMeetingId } from '../../lib/MeetingCalendarHelper';
import { Topic } from '../InnerTopic';
import { SpinnerOverlay } from '../SpinnerOverlay';
import { ExtendedTooltip as MeetingOptionLocked } from './ExtendedTooltip';
import i18n from './i18n';
import LockSvg from './icons/icon-lock_border.svg';
import styles from './styles.scss';
import { VideoSettingGroup } from './VideoSettingGroup';

export const MINUTE_SCALE: number = 4;
export const HOUR_SCALE: number = 13;

export interface MeetingConfigsProps {
  disabled: boolean;
  showSpinnerInConfigPanel: boolean;
  personalMeetingId: string;
  updateMeetingSettings: (meeting: Partial<RcMMeetingModel>) => void;
  switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) => any;
  update?: (...args: any[]) => any;
  init: (...args: any[]) => any;
  meeting: RcMMeetingModel;
  currentLocale: string;
  recipientsSection?: React.ReactNode;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  showTopic?: boolean;
  showWhen?: boolean;
  showDuration?: boolean;
  showRecurringMeeting?: boolean;
  meetingOptionToggle?: boolean;
  showScheduleOnBehalf?: boolean;
  passwordPlaceholderEnable?: boolean;
  audioOptionToggle?: boolean;
  useTimePicker?: boolean;
  delegators: MeetingDelegator[];
  updateScheduleFor: (userExtensionId: string) => any;
  enableServiceWebSettings?: boolean;
  datePickerSize?: RcDatePickerProps['size'];
  timePickerSize?: RcTimePickerProps['size'];
  putRecurringMeetingInMiddle?: boolean;
  defaultTopic: string;
}
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
  meeting: RcMMeetingModel,
  currentLocale: string,
  isPasswordFocus: boolean,
): string {
  if (!meeting.password) {
    return i18n.getString('passwordEmptyError', currentLocale);
  }
  if (!meeting.isMeetingPasswordValid) {
    return i18n.getString('rcmPasswordInvalidError', currentLocale);
  }
  if (isPasswordFocus) {
    return i18n.getString('rcmPasswordHintText', currentLocale);
  }
  // when correct input without focus, show nothing
  return '';
}

function getCheckboxCommProps(
  labelPlacement: 'end' | 'start' | 'top' | 'bottom',
) {
  return {
    formControlLabelProps: {
      classes: {
        root:
          labelPlacement === 'end'
            ? styles.labelPlacementEnd
            : styles.labelPlacementStart,
        label: styles.fullWidthLabel,
      },
      labelPlacement,
    },
  };
}

const MeetingOptionLabel: React.FunctionComponent<{
  children: React.ReactNode;
  isLocked?: boolean;
  currentLocale?: string;
  hasScrollBar?: boolean;
  className?: string;
  labelPlacement?: string;
  dataSign?: string;
}> = ({
  children,
  labelPlacement,
  isLocked = false,
  currentLocale,
  hasScrollBar = false,
  className = '',
  dataSign = '',
}) => {
  return (
    <div className={styles.labelContent}>
      <div
        data-sign={`${dataSign}_label`}
        className={classnames(
          styles.placementLeft,
          { [styles.optionLabel]: labelPlacement === 'start' },
          className,
        )}
      >
        {children}
      </div>
      {isLocked ? (
        <div className={styles.placementRight}>
          <MeetingOptionLocked
            data-sign={`${dataSign}_lock`}
            hasScrollBar={hasScrollBar}
            title={i18n.getString('lockedTooltip', currentLocale)}
          >
            <RcIcon size="small" symbol={LockSvg} />
          </MeetingOptionLocked>
        </div>
      ) : null}
    </div>
  );
};
export const MeetingConfigs: React.FunctionComponent<MeetingConfigsProps> = ({
  updateMeetingSettings,
  disabled,
  personalMeetingId,
  switchUsePersonalMeetingId,
  init,
  meeting,
  children,
  currentLocale,
  recipientsSection,
  showTopic,
  showWhen,
  showDuration,
  showRecurringMeeting,
  meetingOptionToggle,
  audioOptionToggle,
  useTimePicker,
  showScheduleOnBehalf,
  delegators,
  updateScheduleFor,
  labelPlacement,
  datePickerSize,
  timePickerSize,
  showSpinnerInConfigPanel,
  enableServiceWebSettings,
  putRecurringMeetingInMiddle,
  defaultTopic,
}) => {
  useEffect(() => {
    if (init) {
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (options: any) => {
    return updateMeetingSettings({
      ...meeting,
      ...options,
    });
  };

  const [topicRef, setTopicRef] = useState(null);

  const configRef = useRef<HTMLDivElement>();
  const [hasScrollBar, setHasScrollBar] = useState<boolean>(false);

  useEffect(() => {
    setHasScrollBar(
      configRef.current.scrollHeight > configRef.current.clientHeight,
    );
  }, []);

  /* Password */
  const [isPasswordFocus, setPasswordFocus] = useState<boolean>(false);

  /* AudioOptions */
  const [audioOptions, setAudioOptions] = useState<string>(
    meeting.audioOptions && meeting.audioOptions.join('_'),
  );
  const audioHelpTextMap: { [key: string]: string } = {
    Phone: 'telephonyOnly',
    ComputerAudio: 'voIPOnly',
    Phone_ComputerAudio: 'both',
  };
  const updateAudioOptions = (audioOptions: string) => {
    setAudioOptions(audioOptions);
    update({
      audioOptions: audioOptions.split('_'),
    });
  };
  useEffect(() => {
    setAudioOptions(meeting.audioOptions.join('_'));
  }, [meeting.audioOptions]);

  /* Recurring */
  const [isRecurring, setIsRecurring] = useState<boolean>(
    isRecurringMeeting(meeting.meetingType),
  );
  const toggleRecurring = (isRecurring: boolean) => {
    update({
      meetingType: isRecurring ? MeetingType.RECURRING : MeetingType.SCHEDULED,
    });
  };
  useEffect(() => {
    setIsRecurring(isRecurringMeeting(meeting.meetingType));
  }, [meeting.meetingType]);

  /* Use Personal MeetingId */
  const [isPmiConfirm, setPmiConfirm] = useState<boolean>(false);
  const onPmiChange = async (usePersonalMeetingId: boolean) => {
    setPmiConfirm(false);
    await switchUsePersonalMeetingId(usePersonalMeetingId);
  };

  /* Option Disable Status */
  const isDisabled =
    disabled || (meeting.usePersonalMeetingId && !isPmiConfirm);

  const settingsGroupExpandable = false;

  const checkboxCommProps = getCheckboxCommProps(labelPlacement);

  const startTime = useMemo(() => {
    return new Date(meeting.schedule.startTime);
  }, [meeting.schedule.startTime]);

  const hoursList = getHoursList(HOUR_SCALE);
  const minutesList = getMinutesList(MINUTE_SCALE);

  return (
    <div
      ref={configRef}
      className={styles.videoConfig}
      data-sign="meetingConfigsPanel"
    >
      <div className={styles.meetingContent}>
        {showSpinnerInConfigPanel ? <SpinnerOverlay /> : null}
        {showTopic ? (
          <div
            className={classnames(styles.meetingSection, styles.meetingTitle)}
          >
            <Topic
              name={meeting.topic}
              updateMeetingTopic={(topic) => {
                update({
                  topic,
                });
              }}
              defaultTopic={defaultTopic}
              currentLocale={currentLocale}
              setTopicRef={setTopicRef}
            />
          </div>
        ) : null}
        {recipientsSection ? (
          <div className={styles.meetingSection}>{recipientsSection}</div>
        ) : null}
        <div className={styles.meetingSettings}>
          {showWhen && !isRecurring ? (
            <div className={styles.meetingSection}>
              <div className={styles.meetingDatePicker}>
                <RcDatePicker
                  label={i18n.getString('date', currentLocale)}
                  data-sign="date"
                  date={startTime}
                  clearBtn={false}
                  formatString="MM/DD/YYYY"
                  size={datePickerSize}
                  onChange={(value) => {
                    update({
                      schedule: {
                        ...meeting.schedule,
                        startTime: updateFullYear(startTime, value),
                      },
                    });
                  }}
                />
              </div>
              <div className={styles.meetingTimePicker}>
                <RcTimePicker
                  clearBtn={false}
                  size={timePickerSize}
                  label={i18n.getString('time', currentLocale)}
                  isTwelveHourSystem
                  data-sign="startTime"
                  value={startTime}
                  onChange={(value) => {
                    update({
                      schedule: {
                        ...meeting.schedule,
                        startTime: updateFullTime(startTime, value),
                      },
                    });
                  }}
                />
              </div>
            </div>
          ) : null}
          {showDuration && !isRecurring ? (
            <div className={styles.meetingSection}>
              <div className={styles.hourDuration}>
                <RcSelect
                  gutterBottom
                  data-sign="durationHour"
                  value={Math.floor(meeting.schedule.durationInMinutes / 60)}
                  onChange={(e) => {
                    const value = +e.target.value;
                    const restMinutes = Math.floor(
                      meeting.schedule.durationInMinutes % 60,
                    );
                    const durationInMinutes = value * 60 + restMinutes;
                    update({
                      schedule: {
                        ...meeting.schedule,
                        durationInMinutes,
                      },
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
                </RcSelect>
              </div>
              <div className={styles.minuteDuration}>
                <RcSelect
                  gutterBottom
                  data-sign="durationMinute"
                  required
                  value={Math.floor(meeting.schedule.durationInMinutes % 60)}
                  onChange={(e) => {
                    const value = +e.target.value;
                    const restHours = Math.floor(
                      meeting.schedule.durationInMinutes / 60,
                    );
                    const isMax = restHours === hoursList.slice(-1)[0].value;
                    const minutes = isMax ? 0 : value;
                    const durationInMinutes = restHours * 60 + minutes;
                    update({
                      schedule: {
                        ...meeting.schedule,
                        durationInMinutes,
                      },
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
                </RcSelect>
              </div>
            </div>
          ) : null}
          {showRecurringMeeting && putRecurringMeetingInMiddle ? (
            <VideoSettingGroup
              dataSign="meetingIdSection"
              expandable={settingsGroupExpandable}
            >
              <RcCheckbox
                {...checkboxCommProps}
                disabled={isDisabled}
                data-sign="recurringMeeting"
                checked={isRecurring}
                onChange={() => {
                  toggleRecurring(!isRecurring);
                }}
                label={
                  <MeetingOptionLabel
                    dataSign="recurringMeeting"
                    labelPlacement={labelPlacement}
                  >
                    {i18n.getString('recurringMeeting', currentLocale)}
                  </MeetingOptionLabel>
                }
              />
              {isRecurring ? (
                <RcTypography
                  variant="caption1"
                  className={styles.recurringDescribe}
                >
                  {i18n.getString('recurringDescribe', currentLocale)}
                </RcTypography>
              ) : null}
            </VideoSettingGroup>
          ) : null}
          {showScheduleOnBehalf ? (
            <VideoSettingGroup
              dataSign="scheduleForPanel"
              expandable={settingsGroupExpandable}
              summary={i18n.getString('scheduleFor', currentLocale)}
            >
              <div
                className={classnames(styles.sideMargin, styles.selectOption)}
              >
                <RcSelect
                  variant="box"
                  data-test-automation-id="scheduleFor"
                  disabled={disabled}
                  className={classnames(styles.boxSelect, styles.autoFullWidth)}
                  data-sign="scheduleFor"
                  onChange={(e) => {
                    updateScheduleFor(e.target.value as string);
                  }}
                  value={meeting.host.id}
                >
                  {delegators.map((item: MeetingDelegator) => {
                    const userName =
                      item.name === ASSISTED_USERS_MYSELF
                        ? i18n.getString(item.name, currentLocale)
                        : item.name;
                    return (
                      <RcMenuItem
                        value={item.id}
                        key={item.id}
                        title={userName}
                        className={styles.boxSelectMenuItem}
                      >
                        {userName}
                      </RcMenuItem>
                    );
                  })}
                </RcSelect>
              </div>
            </VideoSettingGroup>
          ) : null}
          {personalMeetingId ? (
            <VideoSettingGroup
              dataSign="meetingIdSection"
              expandable={settingsGroupExpandable}
              summary={i18n.getString('meetingId', currentLocale)}
            >
              <>
                <RcCheckbox
                  {...checkboxCommProps}
                  data-sign="usePersonalMeetingId"
                  disabled={disabled}
                  checked={meeting.usePersonalMeetingId}
                  onChange={async () => {
                    onPmiChange(!meeting.usePersonalMeetingId);
                  }}
                  label={
                    <MeetingOptionLabel
                      dataSign="usePersonalMeetingId"
                      labelPlacement={labelPlacement}
                      className={styles.pmiLabel}
                    >
                      {i18n.getString('usePersonalMeetingId', currentLocale)}
                      &nbsp;
                      <span data-sign="personalMeetingId">
                        {formatMeetingId(personalMeetingId, '-')}
                      </span>
                    </MeetingOptionLabel>
                  }
                />
                {meeting.usePersonalMeetingId ? (
                  <RcAlert severity="info" className={styles.alertContainer}>
                    {isPmiConfirm ? (
                      i18n.getString('pmiSettingChangeAlert', currentLocale)
                    ) : (
                      <>
                        {i18n.getString('pmiChangeConfirm', currentLocale)}
                        <RcLink
                          onClick={() => setPmiConfirm(!isPmiConfirm)}
                          data-sign="setPmiConfirm"
                        >
                          {i18n.getString('changePmiSettings', currentLocale)}
                        </RcLink>
                      </>
                    )}
                  </RcAlert>
                ) : null}
              </>
            </VideoSettingGroup>
          ) : null}
          <VideoSettingGroup
            dataSign="passwordSection"
            expandable={settingsGroupExpandable}
            summary={i18n.getString('password', currentLocale)}
          >
            <RcCheckbox
              {...checkboxCommProps}
              data-sign="requirePassword"
              disabled={isDisabled || meeting._lockRequireMeetingPassword}
              checked={meeting._requireMeetingPassword}
              onChange={() => {
                let password = '';
                // checked before
                if (meeting._requireMeetingPassword) {
                  password = '';
                } else {
                  password =
                    meeting.usePersonalMeetingId && meeting._pmiPassword
                      ? meeting._pmiPassword
                      : generateRandomPassword();
                }
                update({
                  _requireMeetingPassword: !meeting._requireMeetingPassword,
                  password,
                });
              }}
              label={
                <MeetingOptionLabel
                  dataSign="requirePassword"
                  labelPlacement={labelPlacement}
                  isLocked={meeting._lockRequireMeetingPassword}
                  currentLocale={currentLocale}
                  hasScrollBar={hasScrollBar}
                >
                  {i18n.getString('requirePassword', currentLocale)}
                </MeetingOptionLabel>
              }
            />
            {meeting._requireMeetingPassword ? (
              <div
                className={classnames(
                  styles.passwordField,
                  styles.noBottomMargin,
                  {
                    [styles.subPrefixPadding]: labelPlacement === 'end',
                  },
                )}
              >
                <RcTextField
                  size="small"
                  variant="outline"
                  fullWidth
                  placeholder={i18n.getString('enterPassword', currentLocale)}
                  disabled={isDisabled}
                  error={!meeting.isMeetingPasswordValid}
                  helperText={getHelperTextForPasswordField(
                    meeting,
                    currentLocale,
                    isPasswordFocus,
                  )}
                  data-sign="password"
                  value={meeting.password}
                  inputProps={{
                    maxLength: 255,
                  }}
                  onChange={(e) => {
                    const password = e.target.value;
                    update({ password });
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
          </VideoSettingGroup>
          <VideoSettingGroup
            dataSign="videoSection"
            expandable={settingsGroupExpandable}
            summary={i18n.getString('video', currentLocale)}
          >
            <RcCheckbox
              {...checkboxCommProps}
              data-sign="turnOffCamera"
              disabled={
                isDisabled ||
                (enableServiceWebSettings &&
                  meeting.settingLock?.startParticipantsVideo)
              }
              checked={!meeting.startParticipantsVideo}
              onChange={() => {
                update({
                  startParticipantsVideo: !meeting.startParticipantsVideo,
                });
              }}
              label={
                <MeetingOptionLabel
                  dataSign="turnOffCamera"
                  labelPlacement={labelPlacement}
                  isLocked={
                    enableServiceWebSettings &&
                    meeting.settingLock?.startParticipantsVideo
                  }
                  currentLocale={currentLocale}
                  hasScrollBar={hasScrollBar}
                >
                  {i18n.getString('turnOffCamera', currentLocale)}
                </MeetingOptionLabel>
              }
            />
            <RcCheckbox
              {...checkboxCommProps}
              data-sign="turnOffHostCamera"
              disabled={
                isDisabled ||
                (enableServiceWebSettings &&
                  meeting.settingLock?.startHostVideo)
              }
              checked={!meeting.startHostVideo}
              onChange={() => {
                update({
                  startHostVideo: !meeting.startHostVideo,
                });
              }}
              label={
                <MeetingOptionLabel
                  dataSign="turnOffHostCamera"
                  labelPlacement={labelPlacement}
                  isLocked={
                    enableServiceWebSettings &&
                    meeting.settingLock?.startHostVideo
                  }
                  currentLocale={currentLocale}
                  hasScrollBar={hasScrollBar}
                >
                  {i18n.getString('turnOffHostCamera', currentLocale)}
                </MeetingOptionLabel>
              }
            />
          </VideoSettingGroup>
          <VideoSettingGroup
            dataSign="audioSection"
            expandable={settingsGroupExpandable}
            summary={i18n.getString('audio', currentLocale)}
          >
            <div
              className={classnames(
                styles.selectOption,
                styles.labelContent,
                styles.sideMargin,
              )}
            >
              <div
                className={classnames(styles.placementLeft, styles.hackWidth)}
              >
                <RcSelect
                  variant="box"
                  data-test-automation-id="audioOptions"
                  data-sign="audioOptions"
                  disabled={
                    isDisabled ||
                    (enableServiceWebSettings &&
                      meeting.settingLock?.audioOptions)
                  }
                  title={i18n.getString(
                    audioHelpTextMap[audioOptions],
                    currentLocale,
                  )}
                  classes={{
                    root: styles.boxSelectWrapper,
                  }}
                  className={classnames(styles.boxSelect, styles.autoFullWidth)}
                  onChange={(e) => {
                    updateAudioOptions(e.target.value as string);
                  }}
                  value={audioOptions}
                >
                  <RcMenuItem
                    data-sign="Phone"
                    value="Phone"
                    className={styles.boxSelectMenuItem}
                  >
                    {i18n.getString('telephonyOnly', currentLocale)}
                  </RcMenuItem>
                  <RcMenuItem
                    data-sign="ComputerAudio"
                    value="ComputerAudio"
                    className={styles.boxSelectMenuItem}
                  >
                    {i18n.getString('voIPOnly', currentLocale)}
                  </RcMenuItem>
                  <RcMenuItem
                    data-sign="Phone_ComputerAudio"
                    value="Phone_ComputerAudio"
                    className={styles.boxSelectMenuItem}
                  >
                    {i18n.getString('both', currentLocale)}
                  </RcMenuItem>
                </RcSelect>
              </div>
              {enableServiceWebSettings && meeting.settingLock?.audioOptions ? (
                <div
                  className={classnames(
                    styles.placementRight,
                    styles.lockedIcon,
                  )}
                >
                  <MeetingOptionLocked
                    data-sign="audioSection_lock"
                    hasScrollBar={hasScrollBar}
                    title={i18n.getString('lockedTooltip', currentLocale)}
                  >
                    <RcIcon size="small" symbol={LockSvg} />
                  </MeetingOptionLocked>
                </div>
              ) : null}
            </div>
          </VideoSettingGroup>
          <VideoSettingGroup
            dataSign="meetingOptionsSection"
            expandable={settingsGroupExpandable}
            summary={i18n.getString('meetingOptions', currentLocale)}
          >
            <RcCheckbox
              {...checkboxCommProps}
              disabled={
                isDisabled ||
                (enableServiceWebSettings &&
                  meeting.settingLock?.allowJoinBeforeHost)
              }
              data-sign="enableJoinToggle"
              checked={meeting.allowJoinBeforeHost}
              onChange={() => {
                update({
                  allowJoinBeforeHost: !meeting.allowJoinBeforeHost,
                });
              }}
              label={
                <MeetingOptionLabel
                  dataSign="enableJoinToggle"
                  labelPlacement={labelPlacement}
                  isLocked={
                    enableServiceWebSettings &&
                    meeting.settingLock?.allowJoinBeforeHost
                  }
                  currentLocale={currentLocale}
                  hasScrollBar={hasScrollBar}
                >
                  {i18n.getString('joinBeforeHost', currentLocale)}
                </MeetingOptionLabel>
              }
            />
            {showRecurringMeeting && !putRecurringMeetingInMiddle ? (
              <>
                <RcCheckbox
                  {...checkboxCommProps}
                  disabled={isDisabled}
                  data-sign="recurringMeeting"
                  checked={isRecurring}
                  onChange={() => {
                    toggleRecurring(!isRecurring);
                  }}
                  label={
                    <MeetingOptionLabel
                      dataSign="recurringMeeting"
                      labelPlacement={labelPlacement}
                    >
                      {i18n.getString('recurringMeeting', currentLocale)}
                    </MeetingOptionLabel>
                  }
                />
                <RcTypography
                  variant="caption1"
                  className={classnames(styles.recurringNote, {
                    [styles.subPrefixPadding]: labelPlacement === 'end',
                  })}
                >
                  {i18n.getString('recurringNote', currentLocale)}
                </RcTypography>
              </>
            ) : null}
          </VideoSettingGroup>
        </div>
      </div>
    </div>
  );
};

MeetingConfigs.defaultProps = {
  showRecurringMeeting: true,
  labelPlacement: 'start',
  datePickerSize: 'medium',
  timePickerSize: 'medium',
};
