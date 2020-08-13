import classnames from 'classnames';
import React, { FunctionComponent } from 'react';

import MeetingSection from '../MeetingSection';
import Switch from '../Switch';
import { PASSWORD_REGEX } from './constants';
import i18n from './i18n';
import styles from './styles.scss';

interface MeetingOptionsProps {
  update: (...args: any[]) => any;
  currentLocale: string;
  meeting: any;
  that: any;
  meetingOptionToggle: boolean;
  passwordPlaceholderEnable: boolean;
  disabled: boolean;
}

const MeetingOptions: FunctionComponent<MeetingOptionsProps> = ({
  disabled,
  currentLocale,
  meeting,
  update,
  that,
  meetingOptionToggle,
  passwordPlaceholderEnable,
}) => {
  const passwordPlaceholder = passwordPlaceholderEnable
    ? i18n.getString('password', currentLocale)
    : '';
  return (
    <MeetingSection
      title={i18n.getString('meetingOptions', currentLocale)}
      className={styles.meetingOptions}
      // when there is a default meeting password or `allowJoinBeforeHost` toggle opened
      // then expand the meeting option section
      toggle={
        meetingOptionToggle || !!meeting.password || meeting.allowJoinBeforeHost
      }
      withSwitch
    >
      <div className={styles.meetingOptionsDiv}>
        <div className={classnames(styles.spaceBetween, styles.fixTopMargin)}>
          <span className={classnames(styles.labelLight, styles.defaultShrink)}>
            {i18n.getString('requirePassword', currentLocale)}
          </span>
          <Switch
            disable={disabled}
            checked={meeting._requireMeetingPassword || !!meeting.password}
            onChange={(_requireMeetingPassword) => {
              if (_requireMeetingPassword) {
                setTimeout(() => {
                  that.password.focus();
                }, 100);
              }
              update({
                ...meeting,
                _requireMeetingPassword,
                password: '',
              });
            }}
            dataSign="requirePasswordToggle"
          />
        </div>
        {meeting._requireMeetingPassword || meeting.password ? (
          <div className={styles.passwordBox}>
            <div className={styles.labelLight}>
              {i18n.getString('password', currentLocale)}
            </div>
            <input
              type="text"
              disabled={disabled}
              placeholder={passwordPlaceholder}
              className={styles.password}
              ref={(ref) => {
                that.password = ref;
              }}
              value={meeting.password || ''}
              onChange={({ target }) => {
                if (PASSWORD_REGEX.test(target.value)) {
                  update({
                    ...meeting,
                    password: target.value,
                  });
                }
              }}
              data-sign="requirePasswordInput"
              spellCheck={false}
            />
          </div>
        ) : null}
        <div className={classnames(styles.spaceBetween, styles.fixTopMargin)}>
          <span className={classnames(styles.labelLight, styles.defaultShrink)}>
            {i18n.getString('enableJoinBeforeHost', currentLocale)}
          </span>
          <Switch
            disable={disabled}
            checked={meeting.allowJoinBeforeHost}
            onChange={(allowJoinBeforeHost) => {
              update({
                ...meeting,
                allowJoinBeforeHost,
              });
            }}
            dataSign="enableJoinToggle"
          />
        </div>
      </div>
    </MeetingSection>
  );
};

export { MeetingOptions };
