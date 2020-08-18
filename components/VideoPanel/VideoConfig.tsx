import {
  RcDatePicker,
  RcFormGroup,
  RcIconButton,
  RcLineSelect,
  RcMenuItem,
  RcCheckbox,
  RcTextField,
  RcTimePicker,
  RcBoxSelect,
} from '@ringcentral-integration/rcui';
import dateSvg from '@ringcentral-integration/rcui/icons/icon-date_border.svg';
import timeSvg from '@ringcentral-integration/rcui/icons/icon-time_border.svg';
import { reduce } from 'ramda';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { RcVMeetingModel } from 'ringcentral-integration/models/rcv.model';

import { useDebounce } from '../../react-hooks';
import { VideoSettingsGroup } from './VideoSettingsGroup';
import i18n from './i18n';
import styles from './styles.scss';

export const MINUTE_SCALE = 4;
export const HOUR_SCALE = 13;

function getMinutesList(MINUTE_SCALE) {
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

function getHoursList(HOUR_SCALE) {
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
  currentLocale: string;
  meeting: RcVMeetingModel;

  updateMeetingSettings: (meeting: Partial<RcVMeetingModel>) => void;
  validatePasswordSettings: (password: string, isSecret: boolean) => boolean;

  recipientsSection?: React.ReactNode;
  showTopic?: boolean;
  showWhen?: boolean;
  showDuration?: boolean;
  brandName: string;
  init: () => any;
  personalMeetingId?: string;
  datePickerSize?: string;
  timePickerSize?: string;
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
    showWhen,
    showDuration,
    brandName,
    personalMeetingId,
    datePickerSize,
    timePickerSize,
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

  const settingsGroupExpandable = false;

  return (
    <div className={styles.videoConfig}>
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
              size={datePickerSize}
              onChange={(value) => {
                updateMeetingSettings({
                  startTime: value,
                });
              }}
              formatString="MM/DD/YYYY"
              InputProps={{
                endAdornment: (
                  <RcIconButton
                    variant="round"
                    size="medium"
                    symbol={dateSvg}
                  />
                ),
              }}
            />
          </div>
        ) : null}
        {showWhen ? (
          <div className={styles.meetingSection}>
            <RcTimePicker
              fullWidth
              size={timePickerSize}
              label={i18n.getString('startTime', currentLocale)}
              data-sign="startTime"
              value={startTime}
              onChange={(value) => {
                updateMeetingSettings({
                  startTime: new Date(value),
                });
              }}
              InputProps={{
                endAdornment: (
                  <RcIconButton
                    variant="round"
                    size="medium"
                    symbol={timeSvg}
                  />
                ),
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
        <div className={styles.meetingSettings}>
          <VideoSettingsGroup
            dateSign="settingsPanel"
            expandable={settingsGroupExpandable}
            summary={i18n.getString(
              isRCBrand ? 'rcMeetingSettings' : 'meetingSettings',
              currentLocale,
            )}
          >
            <RcFormGroup
              classes={{
                root: styles.toggleGroup,
              }}
            >
              {personalMeetingId ? (
                <RcCheckbox
                  data-sign="usePersonalMeetingId"
                  checked={meeting.usePersonalMeetingId}
                  onChange={() => {
                    updateMeetingSettings({
                      usePersonalMeetingId: !meeting.usePersonalMeetingId,
                    });
                  }}
                  label={
                    <div>
                      <div>
                        {i18n.getString('usePersonalMeetingId', currentLocale)}
                      </div>
                      <div className={styles.personMeetingInfo}>
                        {personalMeetingId}
                      </div>
                    </div>
                  }
                  classes={{ root: styles.checkInputWrapper }}
                  formControlLabelProps={{
                    classes: { root: styles.labelPlacementStart },
                    labelPlacement: 'start',
                  }}
                />
              ) : null}
              <RcCheckbox
                data-sign="muteAudio"
                checked={meeting.muteAudio}
                onChange={() => {
                  updateMeetingSettings({
                    muteAudio: !meeting.muteAudio,
                  });
                }}
                label={i18n.getString('muteAudio', currentLocale)}
                classes={{ root: styles.checkInputWrapper }}
                formControlLabelProps={{
                  classes: { root: styles.labelPlacementStart },
                  labelPlacement: 'start',
                }}
              />
              <RcCheckbox
                data-sign="turnOffCamera"
                checked={meeting.muteVideo}
                onChange={() => {
                  updateMeetingSettings({
                    muteVideo: !meeting.muteVideo,
                  });
                }}
                label={i18n.getString('turnOffCamera', currentLocale)}
                classes={{ root: styles.checkInputWrapper }}
                formControlLabelProps={{
                  classes: { root: styles.labelPlacementStart },
                  labelPlacement: 'start',
                }}
              />
            </RcFormGroup>
          </VideoSettingsGroup>
          <VideoSettingsGroup
            dateSign="securityPanel"
            expandable={settingsGroupExpandable}
            summary={i18n.getString('meetingSettingsSecurity', currentLocale)}
          >
            <RcFormGroup
              classes={{
                root: styles.toggleGroup,
              }}
            >
              <RcCheckbox
                data-sign="requirePassword"
                checked={meeting.isMeetingSecret}
                onChange={() => {
                  const next = !meeting.isMeetingSecret;
                  updateMeetingSettings({
                    isMeetingSecret: next,
                  });
                }}
                label={i18n.getString('requirePassword', currentLocale)}
                classes={{ root: styles.checkInputWrapper }}
                formControlLabelProps={{
                  classes: { root: styles.labelPlacementStart },
                  labelPlacement: 'start',
                }}
              />
              {meeting.isMeetingSecret ? (
                <div className={styles.inputArea}>
                  <RcTextField
                    error={!meeting.isMeetingPasswordValid}
                    helperText={getHelperTextForPasswordField(
                      meeting,
                      currentLocale,
                    )}
                    placeholder={i18n.getString('setPassword', currentLocale)}
                    data-sign="password"
                    fullWidth
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
                </div>
              ) : null}
              <RcCheckbox
                data-sign="allowJoinBeforeHost"
                checked={meeting.allowJoinBeforeHost}
                onChange={() => {
                  updateMeetingSettings({
                    allowJoinBeforeHost: !meeting.allowJoinBeforeHost,
                  });
                }}
                label={i18n.getString('joinBeforeHost', currentLocale)}
                classes={{ root: styles.checkInputWrapper }}
                formControlLabelProps={{
                  classes: { root: styles.labelPlacementStart },
                  labelPlacement: 'start',
                }}
              />
              <RcCheckbox
                data-sign="isOnlyAuthUserJoin"
                checked={meeting.isOnlyAuthUserJoin}
                onChange={(ev, checked) => {
                  updateMeetingSettings({
                    isOnlyAuthUserJoin: checked,
                    isOnlyCoworkersJoin: checked
                      ? meeting.isOnlyCoworkersJoin
                      : false,
                  });
                }}
                label={i18n.getString('onlyAuthUserJoin', currentLocale)}
                classes={{ root: styles.checkInputWrapper }}
                formControlLabelProps={{
                  classes: { root: styles.labelPlacementStart },
                  labelPlacement: 'start',
                }}
              />
              {meeting.isOnlyAuthUserJoin ? (
                <div className={styles.authUserType}>
                  <RcBoxSelect
                    className={styles.boxSelect}
                    isFullWidth
                    automationId="authUserType"
                    onChange={(e) => {
                      setAuthUserType(e.target.value as string);
                      updateMeetingSettings({
                        isOnlyCoworkersJoin:
                          e.target.value === 'signedInCoWorkers',
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
              <RcCheckbox
                data-sign="limitScreenSharing"
                checked={!meeting.allowScreenSharing}
                onChange={() => {
                  updateMeetingSettings({
                    allowScreenSharing: !meeting.allowScreenSharing,
                  });
                }}
                label={i18n.getString('limitScreenSharing', currentLocale)}
                classes={{ root: styles.checkInputWrapper }}
                formControlLabelProps={{
                  classes: { root: styles.labelPlacementStart },
                  labelPlacement: 'start',
                }}
              />
            </RcFormGroup>
          </VideoSettingsGroup>
        </div>
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
  personalMeetingId: undefined,
  datePickerSize: 'medium',
  timePickerSize: 'medium',
};
