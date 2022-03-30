import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import formatMessage from 'format-message';
import classnames from 'classnames';

import {
  generateRandomPassword,
  updateFullTime,
  updateFullYear,
} from '@ringcentral-integration/commons/helpers/meetingHelper';
import {
  ASSISTED_USERS_MYSELF,
  isRecurringMeeting,
  MeetingType,
} from '@ringcentral-integration/commons/modules/Meeting';
import {
  MeetingDelegator,
  RCM_ITEM_NAME,
  RcmItemType,
  RcMMeetingModel,
} from '@ringcentral-integration/commons/modules/MeetingV2';
import {
  RcAlert,
  RcCheckbox,
  RcCheckboxProps,
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
  spacing,
  styled,
} from '@ringcentral/juno';
import { LockBorder as lockSvg } from '@ringcentral/juno/icon';

import { formatMeetingId } from '../../lib/MeetingCalendarHelper';
import {
  getHoursList,
  getMinutesList,
  HOUR_SCALE,
  MINUTE_SCALE,
} from '../../lib/MeetingHelper';
import { SpinnerOverlay } from '../SpinnerOverlay';
import { MeetingAlert, RemoveMeetingWarn } from '../MeetingAlert';
import { ExtendedTooltip as MeetingOptionLocked } from './ExtendedTooltip';
import i18n from './i18n';
import styles from './styles.scss';
import { VideoSettingGroup } from './VideoSettingGroup';

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
  trackSettingChanges?: (itemName: RcmItemType) => void;
  enableServiceWebSettings?: boolean;
  datePickerSize?: RcDatePickerProps['size'];
  timePickerSize?: RcTimePickerProps['size'];
  checkboxSize?: RcCheckboxProps['size'];
  recurringMeetingPosition?: 'middle' | 'bottom';
  defaultTopic: string;
  showIeSupportAlert?: boolean;
  showRemoveMeetingWarning?: boolean;
  brandConfig?: any;
  appName?: string;
}

function getHelperTextForPasswordField(
  meeting: RcMMeetingModel,
  currentLocale: string,
  isPasswordFocus: boolean,
) {
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

const MeetingOptionLabel: FunctionComponent<{
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
            <RcIcon
              size="small"
              className={styles.lockButton}
              color="neutral.f04"
              symbol={lockSvg}
            />
          </MeetingOptionLocked>
        </div>
      ) : null}
    </div>
  );
};

const PanelRoot = styled.div`
  ${RcCheckbox} {
    padding: ${spacing(2)};
  }
`;

export const MeetingConfigs: FunctionComponent<MeetingConfigsProps> = ({
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
  trackSettingChanges,
  labelPlacement,
  datePickerSize,
  timePickerSize,
  checkboxSize,
  showSpinnerInConfigPanel,
  enableServiceWebSettings,
  recurringMeetingPosition,
  defaultTopic,
  showIeSupportAlert,
  showRemoveMeetingWarning,
  brandConfig,
  appName,
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

  const trackItemChanges = (itemName: RcmItemType) => {
    trackSettingChanges && trackSettingChanges(itemName);
  };

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
  const enableThirdPartyAudio = meeting?.telephonyUserSettings?.thirdPartyAudio;
  const audioHelpTextMap: { [key: string]: string } = {
    Phone: 'telephonyOnly',
    ComputerAudio: 'voIPOnly',
    Phone_ComputerAudio: 'both',
    ThirdParty: 'thirdParty',
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

  const hoursList = getHoursList(HOUR_SCALE, currentLocale);
  const minutesList = getMinutesList(MINUTE_SCALE, currentLocale);

  return (
    <PanelRoot
      ref={configRef}
      className={styles.videoConfig}
      data-sign="meetingConfigsPanel"
    >
      <div className={styles.meetingContent}>
        {showSpinnerInConfigPanel ? <SpinnerOverlay /> : null}
        {showRemoveMeetingWarning && (
          <RemoveMeetingWarn
            brandConfig={brandConfig}
            currentLocale={currentLocale}
          />
        )}
        {showTopic ? (
          <div
            className={classnames(styles.meetingSection, styles.meetingTitle)}
          >
            {children}
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
                  fullWidth
                  gutterBottom
                  label={i18n.getString('date', currentLocale)}
                  data-sign="date"
                  value={startTime}
                  clearBtn={false}
                  formatString="MM/DD/YYYY"
                  size={datePickerSize}
                  locale={currentLocale}
                  todayButtonText={i18n.getString('today', currentLocale)}
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
                  fullWidth
                  gutterBottom
                  clearBtn={false}
                  size={timePickerSize}
                  label={i18n.getString('time', currentLocale)}
                  isTwelveHourSystem
                  data-sign="startTime"
                  dateMode
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
                  fullWidth
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
          {showRecurringMeeting && recurringMeetingPosition === 'middle' ? (
            <VideoSettingGroup
              dataSign="meetingIdSection"
              expandable={settingsGroupExpandable}
            >
              <RcCheckbox
                {...checkboxCommProps}
                disabled={isDisabled}
                size={checkboxSize}
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
                  disabled={disabled}
                  className={classnames(styles.boxSelect, styles.autoFullWidth)}
                  data-sign="scheduleFor"
                  onChange={(e) => {
                    updateScheduleFor(e.target.value as string);
                    trackItemChanges(RCM_ITEM_NAME.scheduleFor);
                  }}
                  value={meeting.host.id}
                >
                  {delegators.map((item: MeetingDelegator, index: number) => {
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
                        data-sign={`scheduleForMenuItem${index}`}
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
                  size={checkboxSize}
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
                          variant="inherit"
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
              size={checkboxSize}
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
                trackItemChanges(RCM_ITEM_NAME._requireMeetingPassword);
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
                    trackItemChanges(RCM_ITEM_NAME.password);
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
              size={checkboxSize}
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
              size={checkboxSize}
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
                  fullWidth
                  variant="box"
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
                  <RcMenuItem
                    data-sign="ThirdParty"
                    value="ThirdParty"
                    className={styles.boxSelectMenuItem}
                    disabled={!enableThirdPartyAudio}
                  >
                    {i18n.getString('thirdParty', currentLocale)}
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
                    <RcIcon
                      size="small"
                      symbol={lockSvg}
                      className={styles.lockButton}
                    />
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
              size={checkboxSize}
              data-sign="enableJoinToggle"
              checked={meeting.allowJoinBeforeHost}
              onChange={() => {
                update({
                  allowJoinBeforeHost: !meeting.allowJoinBeforeHost,
                });
                trackItemChanges(RCM_ITEM_NAME.allowJoinBeforeHost);
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
            {showRecurringMeeting && recurringMeetingPosition === 'bottom' ? (
              <>
                <RcCheckbox
                  {...checkboxCommProps}
                  disabled={isDisabled}
                  size={checkboxSize}
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
          {showIeSupportAlert && (
            <VideoSettingGroup dataSign="ieAlert" expandable={false}>
              <MeetingAlert
                severity="warning"
                content={formatMessage(
                  i18n.getString('ieSupportAlert', currentLocale),
                  {
                    appName,
                  },
                )}
              />
            </VideoSettingGroup>
          )}
        </div>
      </div>
    </PanelRoot>
  );
};

MeetingConfigs.defaultProps = {
  showRecurringMeeting: true,
  labelPlacement: 'start',
  datePickerSize: 'medium',
  timePickerSize: 'medium',
  checkboxSize: 'medium',
};
