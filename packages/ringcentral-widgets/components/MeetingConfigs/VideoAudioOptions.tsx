import 'react-widgets/dist/css/react-widgets.css';

import React, { FunctionComponent } from 'react';

import classnames from 'classnames';

import CheckBox from '../CheckBox';
import DropdownSelect from '../DropdownSelect';
import MeetingSection from '../MeetingSection';
import Switch from '../Switch';
import i18n from './i18n';
import styles from './styles.scss';

interface VideoProps {
  disabled: boolean;
  currentLocale: string;
  meeting: any;
  update: (...args: any[]) => any;
}

const Video: FunctionComponent<VideoProps> = ({
  disabled,
  currentLocale,
  meeting,
  update,
}) => (
  <MeetingSection title={i18n.getString('video', currentLocale)} withSwitch>
    <div className={styles.videoDiv}>
      <div
        className={classnames(
          styles.labelLight,
          styles.fixTopMargin,
          styles.videoDescribe,
        )}
      >
        {i18n.getString('videoDescribe', currentLocale)}
      </div>
      <div className={classnames(styles.spaceBetween, styles.fixTopMargin)}>
        <span className={styles.labelLight}>
          {i18n.getString('host', currentLocale)}
        </span>
        <Switch
          disable={disabled}
          checked={meeting.startHostVideo}
          onChange={(startHostVideo) => {
            update({
              ...meeting,
              startHostVideo,
            });
          }}
          dataSign="videoHostToggle"
        />
      </div>
      <div className={classnames(styles.spaceBetween, styles.fixTopMargin)}>
        <span className={styles.labelLight}>
          {i18n.getString('participants', currentLocale)}
        </span>
        <Switch
          disable={disabled}
          checked={meeting.startParticipantsVideo}
          onChange={(startParticipantsVideo) => {
            update({
              ...meeting,
              startParticipantsVideo,
            });
          }}
          dataSign="videoParticipantToggle"
        />
      </div>
    </div>
  </MeetingSection>
);

interface AudioOptionsCheckboxProps {
  disabled: boolean;
  data: any;
  meeting: any;
  update: (...args: any[]) => any;
}
const AudioOptionsCheckbox: FunctionComponent<AudioOptionsCheckboxProps> = ({
  disabled,
  update,
  meeting,
  data,
}) => (
  <CheckBox
    disabled={disabled}
    onSelect={({ key }) => {
      const audioOptions = key.split('_');
      update({
        ...meeting,
        audioOptions,
      });
    }}
    valueField="key"
    textField="text"
    selected={meeting.audioOptions.join('_')}
    data={data}
  />
);

interface AudioOptionsDropdownProps {
  disabled: boolean;
  data: any;
  meeting: any;
  update: (...args: any[]) => any;
}

const AudioOptionsDropdown: FunctionComponent<AudioOptionsDropdownProps> = ({
  disabled,
  update,
  meeting,
  data,
}) => (
  <DropdownSelect
    disabled={disabled}
    className={classnames(styles.dropdownSelect)}
    value={meeting.audioOptions.join('_')}
    onChange={({ key }) => {
      const audioOptions = key.split('_');
      update({
        ...meeting,
        audioOptions,
      });
    }}
    options={data}
    valueFunction={(option) => option.text}
    renderValue={(value) => data.find((item: any) => item.key === value).text}
    renderFunction={(option) => <div title={option.text}>{option.text}</div>}
    dropdownAlign="left"
    titleEnabled
  />
);

interface AudioOptionsProps {
  update: (...args: any[]) => any;
  currentLocale: string;
  meeting: any;
  data: any;
  audioOptionToggle: boolean;
  disabled: boolean;
}

const AudioOptions: FunctionComponent<AudioOptionsProps> = ({
  disabled,
  currentLocale,
  update,
  meeting,
  data,
  audioOptionToggle,
}) => {
  const audioOptions = audioOptionToggle ? (
    <AudioOptionsDropdown
      disabled={disabled}
      update={update}
      meeting={meeting}
      data={data}
    />
  ) : (
    <AudioOptionsCheckbox
      disabled={disabled}
      update={update}
      meeting={meeting}
      data={data}
    />
  );
  return (
    <MeetingSection
      title={i18n.getString('audioOptions', currentLocale)}
      withSwitch
    >
      {audioOptions}
    </MeetingSection>
  );
};

export { AudioOptions, AudioOptionsCheckbox, AudioOptionsDropdown, Video };
